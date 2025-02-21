
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Plus } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AgentCard from "@/components/AgentCard";
import AgentStatusPie from "@/components/AgentStatusPie";
import { useCSRStats } from "@/hooks/useCSRStats";

const AgentManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: agentStats } = useCSRStats();

  // Filter agents based on search query
  const filteredAgents = agentStats?.filter(agent =>
    agent.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agent Management</h1>
            <p className="mt-2 text-gray-600">Manage and monitor agent performance</p>
          </div>
          <Button>
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
                        daily: Math.round(agent.total_calls / 30), // Simplified average
                        weekly: Math.round(agent.total_chats / 4), // Simplified average
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
      </div>
    </DashboardLayout>
  );
};

export default AgentManagement;
