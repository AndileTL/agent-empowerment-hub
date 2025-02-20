
import { useState } from "react";
import { Search, Filter, Plus, MoreVertical } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AgentCard from "@/components/AgentCard";
import AgentStatusPie from "@/components/AgentStatusPie";

const AgentManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - would come from backend in real implementation
  const agents = [
    {
      id: 1,
      name: "John Smith",
      avatar: "/placeholder.svg",
      role: "Senior Agent",
      status: "online",
      performance: {
        callsHandled: 145,
        satisfaction: 98,
        avgHandleTime: "5:23",
      },
      metrics: {
        daily: 92,
        weekly: 89,
        monthly: 94,
      },
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      role: "Customer Service Agent",
      status: "busy",
      performance: {
        callsHandled: 128,
        satisfaction: 96,
        avgHandleTime: "6:12",
      },
      metrics: {
        daily: 88,
        weekly: 92,
        monthly: 90,
      },
    },
    {
      id: 3,
      name: "Michael Brown",
      avatar: "/placeholder.svg",
      role: "Technical Support",
      status: "offline",
      performance: {
        callsHandled: 98,
        satisfaction: 94,
        avgHandleTime: "8:45",
      },
      metrics: {
        daily: 85,
        weekly: 87,
        monthly: 86,
      },
    },
  ];

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
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
              <Input
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
                prefix={<Search className="h-4 w-4 text-gray-400" />}
              />
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
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
                  <p className="text-2xl font-semibold text-success-600">94%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Handle Time</p>
                  <p className="text-2xl font-semibold">6:45</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Active Agents</p>
                  <p className="text-2xl font-semibold">36</p>
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
