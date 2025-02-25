import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCSRStats } from "@/hooks/useCSRStats";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, MonitorCheck, Award, AlertCircle } from "lucide-react";
import SupervisorMonitoring from "@/components/SupervisorMonitoring";
import { supabase } from "@/integrations/supabase/client";

type PerformanceType = "merit" | "demerit";

interface PerformanceRecord {
  id: string;
  agent_id: string;
  type: PerformanceType;
  description: string;
  date: string;
  created_at: string;
}

const mockAttendance = {
  present: 22,
  late: 3,
  absent: 1,
  rate: "85%"
};

const mockCertifications = [
  {
    name: "Customer Service Fundamentals",
    completedDate: "2024-01-15",
    status: "completed",
    progress: 100
  },
  {
    name: "Advanced Support Techniques",
    completedDate: null,
    status: "in_progress",
    progress: 60
  }
];

const AgentDetails = () => {
  const { id } = useParams();
  const { data: agentStatsData, isLoading, mutate } = useCSRStats({ agentId: id });
  const latestStats = agentStatsData?.[0];
  const { toast } = useToast();

  const [performanceRecords, setPerformanceRecords] = useState<PerformanceRecord[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMeritOpen, setIsMeritOpen] = useState(false);
  const [isMonitoringOpen, setIsMonitoringOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: latestStats?.name || "",
    email: latestStats?.email || "",
    group: latestStats?.group || "",
    shift_type: latestStats?.shift_type || "",
    team_lead_group: latestStats?.team_lead_group || "",
  });
  const [meritForm, setMeritForm] = useState({
    type: "merit" as PerformanceType,
    description: "",
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (id) {
      fetchPerformanceRecords();
    }
  }, [id]);

  const fetchPerformanceRecords = async () => {
    const { data, error } = await supabase
      .from('agent_performance')
      .select('*')
      .eq('agent_id', id)
      .order('date', { ascending: false });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch performance records",
      });
      return;
    }

    setPerformanceRecords(data.map(record => ({
      ...record,
      type: record.type as 'merit' | 'demerit'
    })));
  };

  const handleUpdateAgent = async () => {
    if (!id || !editForm.email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Missing required fields",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('agent_tickets')
        .update({
          name: editForm.name,
          email: editForm.email,
          group: editForm.group,
          shift_type: editForm.shift_type,
          team_lead_group: editForm.team_lead_group,
        })
        .eq('agent_id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Agent details updated successfully",
      });
      setIsEditOpen(false);
      
      mutate({ agent_id: id, email: editForm.email });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update agent details",
      });
    }
  };

  const handleAddMerit = async () => {
    if (!meritForm.description || !id) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please provide a description",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('agent_performance')
        .insert({
          agent_id: id,
          type: meritForm.type,
          description: meritForm.description,
          date: meritForm.date,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: `${meritForm.type === 'merit' ? 'Merit' : 'Demerit'} added successfully`,
      });
      
      setMeritForm({
        type: "merit" as PerformanceType,
        description: "",
        date: new Date().toISOString().split('T')[0],
      });
      setIsMeritOpen(false);
      fetchPerformanceRecords();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add performance record",
      });
    }
  };

  const performanceData = [
    { date: '2023-10', score: 85 },
    { date: '2023-11', score: 88 },
    { date: '2023-12', score: 86 },
    { date: '2024-01', score: 92 },
    { date: '2024-02', score: 90 },
    { date: '2024-03', score: 94 }
  ];

  const satisfactionData = [
    { date: '2023-10', score: 88 },
    { date: '2023-11', score: 92 },
    { date: '2023-12', score: 91 },
    { date: '2024-01', score: 94 },
    { date: '2024-02', score: 93 },
    { date: '2024-03', score: 95 }
  ];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!latestStats) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Card className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">Agent Not Found</h1>
            <p className="mt-2 text-gray-600">The requested agent could not be found.</p>
            <a href="/agents" className="mt-4 text-primary-600 hover:text-primary-700">
              Return to Agent Management
            </a>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6">
              <Avatar className="h-20 w-20">
                <img src="/placeholder.svg" alt={latestStats.email} />
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{latestStats.name || latestStats.email}</h1>
                <p className="text-gray-600">Customer Support Agent</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Calls</p>
                    <p className="text-xl font-semibold">{latestStats.calls || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Chats</p>
                    <p className="text-xl font-semibold">{latestStats.live_chat || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Tickets</p>
                    <p className="text-xl font-semibold">
                      {(latestStats.helpdesk_tickets || 0) + 
                       (latestStats.social_tickets || 0) + 
                       (latestStats.billing_tickets || 0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Issues</p>
                    <p className="text-xl font-semibold">{latestStats.total_issues_handled || 0}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-x-4">
              <Button onClick={() => setIsEditOpen(true)}>
                Edit Agent
              </Button>
              <Button onClick={() => setIsMeritOpen(true)}>
                Add Merit/Demerit
              </Button>
              <Button onClick={() => setIsMonitoringOpen(true)}>
                Supervisor Tools
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Performance Trend</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#10b981" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Customer Satisfaction Trend</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={satisfactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#6366f1" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Attendance Record</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-success-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-success-600">{mockAttendance.present}</p>
              <p className="text-sm text-success-700">Present Days</p>
            </div>
            <div className="bg-warning-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-warning-600">{mockAttendance.late}</p>
              <p className="text-sm text-warning-700">Late Days</p>
            </div>
            <div className="bg-error-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-error-600">{mockAttendance.absent}</p>
              <p className="text-sm text-error-700">Absent Days</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Attendance Rate</p>
            <div className="mt-2 h-2 rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-success-500"
                style={{ width: mockAttendance.rate }}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Certifications</h2>
          <div className="space-y-4">
            {mockCertifications.map((cert, index) => (
              <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{cert.name}</h3>
                    {cert.completedDate && (
                      <p className="text-sm text-gray-600">
                        Completed: {new Date(cert.completedDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    cert.status === 'completed' ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700'
                  }`}>
                    {cert.status === 'completed' ? 'Completed' : `${cert.progress}%`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Performance Notes</h2>
          <div className="space-y-4">
            {performanceRecords.map((record) => (
              <div key={record.id} className={`p-4 rounded-lg ${
                record.type === 'merit' ? 'bg-success-50' : 'bg-error-50'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{record.description}</p>
                    <p className="text-sm text-gray-600">{new Date(record.date).toLocaleDateString()}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    record.type === 'merit' ? 'bg-success-100 text-success-700' : 'bg-error-100 text-error-700'
                  }`}>
                    {record.type === 'merit' ? 'Merit' : 'Demerit'}
                  </div>
                </div>
              </div>
            ))}
            {performanceRecords.length === 0 && (
              <p className="text-gray-500 text-center py-4">No performance records found</p>
            )}
          </div>
        </Card>

        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Agent Details</DialogTitle>
              <DialogDescription>
                Update the agent's information below.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="group">Group</Label>
                <Input
                  id="group"
                  value={editForm.group}
                  onChange={(e) => setEditForm({ ...editForm, group: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shift_type">Shift Type</Label>
                <Select
                  value={editForm.shift_type}
                  onValueChange={(value) => setEditForm({ ...editForm, shift_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day Shift</SelectItem>
                    <SelectItem value="night">Night Shift</SelectItem>
                    <SelectItem value="flex">Flex Shift</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="team_lead_group">Team Lead Group</Label>
                <Input
                  id="team_lead_group"
                  value={editForm.team_lead_group}
                  onChange={(e) => setEditForm({ ...editForm, team_lead_group: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateAgent}>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isMeritOpen} onOpenChange={setIsMeritOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Merit/Demerit</DialogTitle>
              <DialogDescription>
                Record a merit or demerit for this agent.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={meritForm.type}
                  onValueChange={(value: PerformanceType) => setMeritForm({ ...meritForm, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="merit">Merit</SelectItem>
                    <SelectItem value="demerit">Demerit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={meritForm.description}
                  onChange={(e) => setMeritForm({ ...meritForm, description: e.target.value })}
                  placeholder="Enter the reason..."
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={meritForm.date}
                  onChange={(e) => setMeritForm({ ...meritForm, date: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <Button variant="outline" onClick={() => setIsMeritOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMerit}>
                  Add {meritForm.type === 'merit' ? 'Merit' : 'Demerit'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isMonitoringOpen} onOpenChange={setIsMonitoringOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Supervisor Tools</DialogTitle>
              <DialogDescription>
                Manage monitoring and data uploads for this agent.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <SupervisorMonitoring />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AgentDetails;
