
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Plus } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import AgentCard from "@/components/AgentCard";
import AgentStatusPie from "@/components/AgentStatusPie";
import { useCSRStats } from "@/hooks/useCSRStats";
import { supabase } from "@/integrations/supabase/client";

const AgentManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    group: "",
    shift_type: "",
    team_lead_group: "",
  });
  const { toast } = useToast();
  const { data: agentStats, refetch } = useCSRStats();

  const shiftTypes = [
    { value: "day", label: "Day Shift" },
    { value: "night", label: "Night Shift" },
    { value: "flex", label: "Flex Shift" },
  ];

  // Filter agents based on search query
  const filteredAgents = agentStats?.filter(agent =>
    agent.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddAgent = async () => {
    try {
      if (!newAgent.name || !newAgent.email || !newAgent.group || !newAgent.shift_type || !newAgent.team_lead_group) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please fill in all required fields.",
        });
        return;
      }

      // First, create a user entry
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([{ email: newAgent.email }])
        .select()
        .single();

      if (userError) {
        console.error('Error creating user:', userError);
        toast({
          variant: "destructive",
          title: "Error",
          description: userError.message === 'duplicate key value violates unique constraint "users_email_key"'
            ? "An agent with this email already exists."
            : "Failed to create user. Please try again.",
        });
        return;
      }

      // Then create the agent ticket using the new user's ID
      const { error: agentError } = await supabase
        .from('agent_tickets')
        .insert({
          agent_id: userData.id,
          name: newAgent.name,
          email: newAgent.email,
          group: newAgent.group,
          shift_type: newAgent.shift_type,
          team_lead_group: newAgent.team_lead_group,
          shift_status: 'active',
          date: new Date().toISOString().split('T')[0],
          calls: 0,
          live_chat: 0,
          helpdesk_tickets: 0,
          social_tickets: 0,
          billing_tickets: 0,
          walk_ins: 0,
          total_issues_handled: 0,
        });

      if (agentError) {
        console.error('Error creating agent ticket:', agentError);
        // Clean up the user entry if agent ticket creation fails
        await supabase
          .from('users')
          .delete()
          .eq('id', userData.id);

        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create agent ticket. Please try again.",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Agent has been added successfully",
      });

      // Reset form and close dialog
      setNewAgent({
        name: "",
        email: "",
        group: "",
        shift_type: "",
        team_lead_group: "",
      });
      setIsAddDialogOpen(false);

      // Refresh the agents list
      refetch();
    } catch (error) {
      console.error('Error adding agent:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add agent. Please try again.",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agent Management</h1>
            <p className="mt-2 text-gray-600">Manage and monitor agent performance</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Agent
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredAgents?.map((agent) => (
                <div key={agent.agent_id} onClick={() => navigate(`/agents/${agent.agent_id}`)} className="cursor-pointer">
                  <AgentCard
                    agent={{
                      id: agent.agent_id,
                      name: agent.email,
                      avatar: "/placeholder.svg",
                      role: "Customer Service Agent",
                      status: "online",
                      performance: {
                        callsHandled: agent.total_calls,
                        satisfaction: agent.satisfaction_score,
                        avgHandleTime: agent.average_handling_time.toFixed(2),
                      },
                      metrics: {
                        daily: Math.round(agent.total_calls / 30),
                        weekly: Math.round(agent.total_chats / 4),
                        monthly: agent.total_tickets,
                      },
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Agent Status Overview</h2>
              <AgentStatusPie
                data={[
                  { status: "Online", value: 24, color: "#10b981" },
                  { status: "Busy", value: 12, color: "#f59e0b" },
                  { status: "Offline", value: 8, color: "#6b7280" },
                ]}
              />
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Average Satisfaction</p>
                  <p className="text-2xl font-semibold text-success-600">
                    {agentStats 
                      ? `${Math.round(
                          agentStats.reduce((acc, curr) => acc + curr.satisfaction_score, 0) / 
                          agentStats.length
                        )}%`
                      : "..."}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Handle Time</p>
                  <p className="text-2xl font-semibold">
                    {agentStats
                      ? `${Math.round(
                          agentStats.reduce((acc, curr) => acc + curr.average_handling_time, 0) / 
                          agentStats.length
                        )}m`
                      : "..."}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Active Agents</p>
                  <p className="text-2xl font-semibold">
                    {agentStats?.length || "..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Agent</DialogTitle>
              <DialogDescription>
                Enter the details of the new agent below.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Agent Name</Label>
                <Input
                  id="name"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newAgent.email}
                  onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
                  placeholder="agent@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="group">Group</Label>
                <Input
                  id="group"
                  value={newAgent.group}
                  onChange={(e) => setNewAgent({ ...newAgent, group: e.target.value })}
                  placeholder="Support Group"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shift_type">Shift Type</Label>
                <Select
                  value={newAgent.shift_type}
                  onValueChange={(value) => setNewAgent({ ...newAgent, shift_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift type" />
                  </SelectTrigger>
                  <SelectContent>
                    {shiftTypes.map((shift) => (
                      <SelectItem key={shift.value} value={shift.value}>
                        {shift.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="team_lead_group">Team Lead Group</Label>
                <Input
                  id="team_lead_group"
                  value={newAgent.team_lead_group}
                  onChange={(e) => setNewAgent({ ...newAgent, team_lead_group: e.target.value })}
                  placeholder="Team Lead Group"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAgent}>
                Add Agent
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AgentManagement;
