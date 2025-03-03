
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Upload, Filter, Edit2, Save, Plus, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';
import { useCSRStats } from "@/hooks/useCSRStats";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useShiftRoster } from "@/hooks/useShiftRoster";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CSRStats = () => {
  const [startDate, setStartDate] = useState<string>(
    new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<any>(null);
  const [isAddPerformanceOpen, setIsAddPerformanceOpen] = useState(false);
  const [newPerformanceData, setNewPerformanceData] = useState({
    date: new Date().toISOString().split('T')[0],
    tickets: {
      ticketsReceived: 0,
      ticketsResolved: 0,
      casesEscalated: 0
    },
    calls: {
      callsReceived: 0,
      callsAnswered: 0,
      callsSLA: 0,
      callsCAR: 0
    },
    liveChat: {
      liveChatReceived: 0,
      liveChatAnswered: 0,
      liveChatSLA: 0,
      liveChatLT: 0
    },
    email: {
      emailsReceived: 0,
      emailsResponse: "1st Response",
      emailsResolved: 0,
      emailsFRR: 0
    },
    social: {
      socialResolved: 0
    },
    walkIns: 0,
    totalIssues: 0,
    ticketToCalls: 0,
    dialoguesClassification: 0,
    majorOutages: 0,
    systemDowntime: "0h 0m"
  });

  const { data: stats, isLoading, mutate: updateStats } = useCSRStats({ startDate, endDate });
  const { data: shiftRoster, createShift, updateShift } = useShiftRoster();

  const handleExport = () => {
    if (!stats) return;
    const ws = XLSX.utils.json_to_sheet(stats);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CSR Stats");
    XLSX.writeFile(wb, `csr_stats_${startDate}_${endDate}.xlsx`);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        toast({
          title: "Success",
          description: `Imported ${jsonData.length} records successfully`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to import file",
          variant: "destructive",
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleEdit = (stat: any) => {
    setEditingId(stat.id);
    setEditedData({ ...stat });
  };

  const handleSave = async () => {
    try {
      if (!editedData) return;
      
      await updateStats({
        ...editedData,
        date: new Date().toISOString().split('T')[0]
      });

      setEditingId(null);
      setEditedData(null);
      
      toast({
        title: "Success",
        description: "Statistics updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update statistics",
        variant: "destructive",
      });
    }
  };

  const handleAddPerformanceEntry = () => {
    // Calculate total issues
    const totalIssues = 
      newPerformanceData.tickets.ticketsReceived + 
      newPerformanceData.calls.callsReceived + 
      newPerformanceData.liveChat.liveChatReceived + 
      newPerformanceData.email.emailsReceived + 
      newPerformanceData.walkIns;
    
    // Calculate ticket to calls ratio
    const ticketToCalls = newPerformanceData.calls.callsReceived > 0 
      ? Number((newPerformanceData.tickets.ticketsReceived / newPerformanceData.calls.callsReceived).toFixed(2))
      : 0;
    
    const updatedData = {
      ...newPerformanceData,
      totalIssues,
      ticketToCalls
    };
    
    // Here you would typically save this to your database
    // For now, we'll just show a success message
    toast({
      title: "Success",
      description: "Performance entry added successfully",
    });
    
    setIsAddPerformanceOpen(false);
    setNewPerformanceData({
      date: new Date().toISOString().split('T')[0],
      tickets: {
        ticketsReceived: 0,
        ticketsResolved: 0,
        casesEscalated: 0
      },
      calls: {
        callsReceived: 0,
        callsAnswered: 0,
        callsSLA: 0,
        callsCAR: 0
      },
      liveChat: {
        liveChatReceived: 0,
        liveChatAnswered: 0,
        liveChatSLA: 0,
        liveChatLT: 0
      },
      email: {
        emailsReceived: 0,
        emailsResponse: "1st Response",
        emailsResolved: 0,
        emailsFRR: 0
      },
      social: {
        socialResolved: 0
      },
      walkIns: 0,
      totalIssues: 0,
      ticketToCalls: 0,
      dialoguesClassification: 0,
      majorOutages: 0,
      systemDowntime: "0h 0m"
    });
  };

  // SLA pie chart data
  const slaPieData = [
    { name: "Phone SLA", value: 95, color: "#8884d8" },
    { name: "Chat SLA", value: 88, color: "#82ca9d" },
    { name: "Email SLA", value: 92, color: "#ffc658" }
  ];

  // Mock data for Call Center Metrics table
  const callCenterMetricsData = [
    {
      date: "2023-07-01",
      tickets: { ticketsReceived: 245, ticketsResolved: 230, casesEscalated: 15 },
      calls: { callsReceived: 350, callsAnswered: 330, callsSLA: 95, callsCAR: 94 },
      liveChat: { liveChatReceived: 120, liveChatAnswered: 115, liveChatSLA: 96, liveChatLT: 89 },
      email: { emailsReceived: 230, emailsResponseTime: "2h 15m", emailsResolved: 210, emailsFRR: 91 },
      social: { socialResolved: 45 },
      walkIns: 25,
      totalIssues: 770,
      ticketToCalls: 0.69,
      dialoguesClassification: 98,
      majorOutages: 1,
      systemDowntime: "0h 45m"
    },
    {
      date: "2023-07-02",
      tickets: { ticketsReceived: 230, ticketsResolved: 210, casesEscalated: 20 },
      calls: { callsReceived: 320, callsAnswered: 300, callsSLA: 94, callsCAR: 93 },
      liveChat: { liveChatReceived: 110, liveChatAnswered: 105, liveChatSLA: 95, liveChatLT: 88 },
      email: { emailsReceived: 210, emailsResponseTime: "2h 30m", emailsResolved: 190, emailsFRR: 90 },
      social: { socialResolved: 40 },
      walkIns: 20,
      totalIssues: 700,
      ticketToCalls: 0.72,
      dialoguesClassification: 97,
      majorOutages: 0,
      systemDowntime: "0h 0m"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CSR Statistics</h1>
            <p className="mt-2 text-gray-600">Monitor agent performance metrics and manage shifts</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <div className="relative">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleImport}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="stats">
          <TabsList>
            <TabsTrigger value="stats">Performance Statistics</TabsTrigger>
            <TabsTrigger value="shifts">Shift Roster</TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 items-end">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Actions</TableHead>
                          <TableHead>Agent</TableHead>
                          <TableHead>Group</TableHead>
                          <TableHead>Shift Type</TableHead>
                          <TableHead>Helpdesk Tickets</TableHead>
                          <TableHead>Calls</TableHead>
                          <TableHead>Live Chat</TableHead>
                          <TableHead>Support DNS Emails</TableHead>
                          <TableHead>Social Tickets</TableHead>
                          <TableHead>Billing Tickets</TableHead>
                          <TableHead>Walk-ins</TableHead>
                          <TableHead>Total Issues</TableHead>
                          <TableHead>Satisfaction Score</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {stats?.map((stat) => (
                          <TableRow key={stat.agent_id}>
                            <TableCell>
                              {editingId === stat.id ? (
                                <Button size="sm" onClick={handleSave}>
                                  <Save className="h-4 w-4" />
                                </Button>
                              ) : (
                                <Button size="sm" variant="ghost" onClick={() => handleEdit(stat)}>
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                              )}
                            </TableCell>
                            <TableCell>{stat.name || stat.email}</TableCell>
                            <TableCell>{stat.group}</TableCell>
                            <TableCell>{stat.shift_type}</TableCell>
                            <TableCell>
                              {editingId === stat.id ? (
                                <Input
                                  type="number"
                                  value={editedData.helpdesk_tickets}
                                  onChange={(e) => setEditedData({
                                    ...editedData,
                                    helpdesk_tickets: parseInt(e.target.value)
                                  })}
                                  className="w-20"
                                />
                              ) : (
                                stat.helpdesk_tickets
                              )}
                            </TableCell>
                            <TableCell>{stat.calls}</TableCell>
                            <TableCell>{stat.live_chat}</TableCell>
                            <TableCell>{stat.support_dns_emails}</TableCell>
                            <TableCell>{stat.social_tickets}</TableCell>
                            <TableCell>{stat.billing_tickets}</TableCell>
                            <TableCell>{stat.walk_ins}</TableCell>
                            <TableCell>{stat.total_issues_handled}</TableCell>
                            <TableCell>N/A</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>CC Performance</CardTitle>
                  <Button onClick={() => setIsAddPerformanceOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Entry
                  </Button>
                </div>
                <CardDescription>Call center performance metrics across channels</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Tickets Received</TableHead>
                        <TableHead>Tickets Resolved</TableHead>
                        <TableHead>Cases Escalated</TableHead>
                        <TableHead>Calls Received</TableHead>
                        <TableHead>Calls Answered</TableHead>
                        <TableHead>Calls SLA</TableHead>
                        <TableHead>Calls CAR</TableHead>
                        <TableHead>LiveChat Received</TableHead>
                        <TableHead>LiveChat Answered</TableHead>
                        <TableHead>LiveChat SLA</TableHead>
                        <TableHead>LiveChat L/T</TableHead>
                        <TableHead>Emails Received</TableHead>
                        <TableHead>1st Response</TableHead>
                        <TableHead>Emails Resolved</TableHead>
                        <TableHead>Emails FRR</TableHead>
                        <TableHead>Social Resolved</TableHead>
                        <TableHead>Walk-Ins</TableHead>
                        <TableHead>Total Issues</TableHead>
                        <TableHead>Ticket to Calls</TableHead>
                        <TableHead>Dialogue Classif</TableHead>
                        <TableHead>Major Network Outages</TableHead>
                        <TableHead>System Downtime</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {callCenterMetricsData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>{item.tickets.ticketsReceived}</TableCell>
                          <TableCell>{item.tickets.ticketsResolved}</TableCell>
                          <TableCell>{item.tickets.casesEscalated}</TableCell>
                          <TableCell>{item.calls.callsReceived}</TableCell>
                          <TableCell>{item.calls.callsAnswered}</TableCell>
                          <TableCell>{item.calls.callsSLA}%</TableCell>
                          <TableCell>{item.calls.callsCAR}%</TableCell>
                          <TableCell>{item.liveChat.liveChatReceived}</TableCell>
                          <TableCell>{item.liveChat.liveChatAnswered}</TableCell>
                          <TableCell>{item.liveChat.liveChatSLA}%</TableCell>
                          <TableCell>{item.liveChat.liveChatLT}%</TableCell>
                          <TableCell>{item.email.emailsReceived}</TableCell>
                          <TableCell>{item.email.emailsResponseTime}</TableCell>
                          <TableCell>{item.email.emailsResolved}</TableCell>
                          <TableCell>{item.email.emailsFRR}%</TableCell>
                          <TableCell>{item.social.socialResolved}</TableCell>
                          <TableCell>{item.walkIns}</TableCell>
                          <TableCell>{item.totalIssues}</TableCell>
                          <TableCell>{item.ticketToCalls}</TableCell>
                          <TableCell>{item.dialoguesClassification}%</TableCell>
                          <TableCell>{item.majorOutages}</TableCell>
                          <TableCell>{item.systemDowntime}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shifts">
            <Card>
              <CardHeader>
                <CardTitle>Shift Roster Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Agent</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select agent" />
                        </SelectTrigger>
                        <SelectContent>
                          {stats?.map((stat) => (
                            <SelectItem key={stat.agent_id} value={stat.agent_id}>
                              {stat.email}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Shift Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select shift type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning</SelectItem>
                          <SelectItem value="afternoon">Afternoon</SelectItem>
                          <SelectItem value="night">Night</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="self-end">Assign Shift</Button>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Agent</TableHead>
                        <TableHead>Current Shift</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {shiftRoster?.map((shift: any) => (
                        <TableRow key={shift.id}>
                          <TableCell>{shift.email}</TableCell>
                          <TableCell>{shift.shift_type}</TableCell>
                          <TableCell>{shift.shift_status}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Performance Entry Dialog */}
      <Dialog open={isAddPerformanceOpen} onOpenChange={setIsAddPerformanceOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Add CC Performance Entry</DialogTitle>
            <DialogDescription>
              Enter the performance metrics for this period.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  type="date" 
                  value={newPerformanceData.date}
                  onChange={(e) => setNewPerformanceData({...newPerformanceData, date: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Tickets</h4>
                <div className="space-y-2">
                  <Label htmlFor="ticketsReceived">Tickets Received</Label>
                  <Input 
                    id="ticketsReceived" 
                    type="number" 
                    value={newPerformanceData.tickets.ticketsReceived}
                    onChange={(e) => setNewPerformanceData({
                      ...newPerformanceData, 
                      tickets: {
                        ...newPerformanceData.tickets,
                        ticketsReceived: parseInt(e.target.value)
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ticketsResolved">Tickets Resolved</Label>
                  <Input 
                    id="ticketsResolved" 
                    type="number"
                    value={newPerformanceData.tickets.ticketsResolved}
                    onChange={(e) => setNewPerformanceData({
                      ...newPerformanceData, 
                      tickets: {
                        ...newPerformanceData.tickets,
                        ticketsResolved: parseInt(e.target.value)
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="casesEscalated">Cases Escalated</Label>
                  <Input 
                    id="casesEscalated" 
                    type="number"
                    value={newPerformanceData.tickets.casesEscalated}
                    onChange={(e) => setNewPerformanceData({
                      ...newPerformanceData, 
                      tickets: {
                        ...newPerformanceData.tickets,
                        casesEscalated: parseInt(e.target.value)
                      }
                    })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Calls</h4>
                <div className="space-y-2">
                  <Label htmlFor="callsReceived">Calls Received</Label>
                  <Input 
                    id="callsReceived" 
                    type="number"
                    value={newPerformanceData.calls.callsReceived}
                    onChange={(e) => setNewPerformanceData({
                      ...newPerformanceData, 
                      calls: {
                        ...newPerformanceData.calls,
                        callsReceived: parseInt(e.target.value)
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="callsAnswered">Calls Answered</Label>
                  <Input 
                    id="callsAnswered" 
                    type="number"
                    value={newPerformanceData.calls.callsAnswered}
                    onChange={(e) => setNewPerformanceData({
                      ...newPerformanceData, 
                      calls: {
                        ...newPerformanceData.calls,
                        callsAnswered: parseInt(e.target.value)
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="callsSLA">Calls SLA (%)</Label>
                  <Input 
                    id="callsSLA" 
                    type="number"
                    value={newPerformanceData.calls.callsSLA}
                    onChange={(e) => setNewPerformanceData({
                      ...newPerformanceData, 
                      calls: {
                        ...newPerformanceData.calls,
                        callsSLA: parseInt(e.target.value)
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="callsCAR">Calls CAR (%)</Label>
                  <Input 
                    id="callsCAR" 
                    type="number"
                    value={newPerformanceData.calls.callsCAR}
                    onChange={(e) => setNewPerformanceData({
                      ...newPerformanceData, 
                      calls: {
                        ...newPerformanceData.calls,
                        callsCAR: parseInt(e.target.value)
                      }
                    })}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Live Chat</h4>
                <div className="space-y-2">
                  <Label htmlFor="liveChatReceived">Live Chat Received</Label>
                  <Input 
                    id="liveChatReceived" 
                    type="number"
                    value={newPerformanceData.liveChat.liveChatReceived}
                    onChange={(e) => setNewPerformanceData({
                      ...newPerformanceData, 
                      liveChat: {
                        ...newPerformanceData.liveChat,
                        liveChatReceived: parseInt(e.target.value)
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="liveChatAnswered">Live Chat Answered</Label>
                  <Input 
                    id="liveChatAnswered" 
                    type="number"
                    value={newPerformanceData.liveChat.liveChatAnswered}
                    onChange={(e) => setNewPerformanceData({
                      ...newPerformanceData, 
                      liveChat: {
                        ...newPerformanceData.liveChat,
                        liveChatAnswered: parseInt(e.target.value)
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="liveChatSLA">Live Chat SLA (%)</Label>
                  <Input 
                    id="liveChatSLA" 
                    type="number"
                    value={newPerformanceData.liveChat.liveChatSLA}
                    onChange={(e) => setNewPerformanceData({
                      ...newPerformanceData, 
                      liveChat: {
                        ...newPerformanceData.liveChat,
                        liveChatSLA: parseInt(e.target.value)
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="liveChatLT">Live Chat L/T (%)</Label>
                  <Input 
                    id="liveChatLT" 
                    type="number"
                    value={newPerformanceData.liveChat.liveChatLT}
                    onChange={(e) => setNewPerformanceData({
                      ...newPerformanceData, 
                      liveChat: {
                        ...newPerformanceData.liveChat,
                        liveChatLT: parseInt(e.target.value)
                      }
                    })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Email & Others</h4>
                <div className="space-y-2">
                  <Label htmlFor="emailsReceived">Emails Received</Label>
                  <Input 
                    id="emailsReceived" 
                    type="number"
                    value={newPerformanceData.email.emailsReceived}
                    onChange={(e) => setNewPerformanceData({
                      ...newPerformanceData, 
                      email: {
                        ...newPerformanceData.email,
                        emailsReceived: parseInt(e.target.value)
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailsResolved">Emails Resolved</Label>
                  <Input 
                    id="emailsResolved" 
                    type="number"
                    value={newPerformanceData.email.emailsResolved}
                    onChange={(e) => setNewPerformanceData({
                      ...newPerformanceData, 
                      email: {
                        ...newPerformanceData.email,
                        emailsResolved: parseInt(e.target.value)
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailsFRR">Emails FRR (%)</Label>
                  <Input 
                    id="emailsFRR" 
                    type="number"
                    value={newPerformanceData.email.emailsFRR}
                    onChange={(e) => setNewPerformanceData({
                      ...newPerformanceData, 
                      email: {
                        ...newPerformanceData.email,
                        emailsFRR: parseInt(e.target.value)
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="socialResolved">Social Resolved</Label>
                  <Input 
                    id="socialResolved" 
                    type="number"
                    value={newPerformanceData.social.socialResolved}
                    onChange={(e) => setNewPerformanceData({
                      ...newPerformanceData, 
                      social: {
                        ...newPerformanceData.social,
                        socialResolved: parseInt(e.target.value)
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="walkIns">Walk-Ins</Label>
                  <Input 
                    id="walkIns" 
                    type="number"
                    value={newPerformanceData.walkIns}
                    onChange={(e) => setNewPerformanceData({
                      ...newPerformanceData, 
                      walkIns: parseInt(e.target.value)
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dialoguesClassification">Dialogues Classification (%)</Label>
              <Input 
                id="dialoguesClassification" 
                type="number"
                value={newPerformanceData.dialoguesClassification}
                onChange={(e) => setNewPerformanceData({
                  ...newPerformanceData, 
                  dialoguesClassification: parseInt(e.target.value)
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="majorOutages">Major Network Outages</Label>
              <Input 
                id="majorOutages" 
                type="number"
                value={newPerformanceData.majorOutages}
                onChange={(e) => setNewPerformanceData({
                  ...newPerformanceData, 
                  majorOutages: parseInt(e.target.value)
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="systemDowntime">System Downtime (e.g., 1h 30m)</Label>
              <Input 
                id="systemDowntime" 
                value={newPerformanceData.systemDowntime}
                onChange={(e) => setNewPerformanceData({
                  ...newPerformanceData, 
                  systemDowntime: e.target.value
                })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPerformanceOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPerformanceEntry}>
              Add Entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default CSRStats;

