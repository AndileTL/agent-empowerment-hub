
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const ContactCenterPerformance = () => {
  const [startDate, setStartDate] = useState<string>(
    new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const { toast } = useToast();
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

  // SLA pie chart data
  const slaPieData = [
    { name: "Phone SLA", value: 95, color: "#8884d8" },
    { name: "Chat SLA", value: 88, color: "#82ca9d" },
    { name: "Email SLA", value: 92, color: "#ffc658" }
  ];

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

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contact Center Performance</h1>
            <p className="mt-2 text-gray-600">Track and analyze contact center metrics across all channels</p>
          </div>
        </div>

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

        {/* SLA Performance Card - Moved up */}
        <Card>
          <CardHeader>
            <CardTitle>SLA Performance</CardTitle>
            <CardDescription>Service level agreement performance across channels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={slaPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {slaPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={36} />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics Summary Card - Moved up */}
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics Summary</CardTitle>
            <CardDescription>Overview of important contact center metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Total Tickets</div>
                <div className="text-2xl font-bold">475</div>
                <div className="text-sm text-green-500">+5% from last period</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Call Answer Rate</div>
                <div className="text-2xl font-bold">93.5%</div>
                <div className="text-sm text-green-500">+2.1% from last period</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">First Response Rate</div>
                <div className="text-2xl font-bold">90.5%</div>
                <div className="text-sm text-red-500">-1.2% from last period</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Resolution Time</div>
                <div className="text-2xl font-bold">1.8 days</div>
                <div className="text-sm text-green-500">-0.2 days from last period</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CC Performance Table - Moved down */}
        <Card>
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
                type="value"
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

export default ContactCenterPerformance;
