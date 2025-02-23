
import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AgentCard from "@/components/AgentCard";
import { CSRStatsData } from "@/hooks/useCSRStats";
import { useState } from "react";

interface AgentsListProps {
  agents: CSRStatsData[] | undefined;
}

const AgentsList = ({ agents }: AgentsListProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter agents based on search query
  const filteredAgents = agents?.filter(agent =>
    agent.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
                id: agent.agent_id, // Now correctly passing string ID
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
  );
};

export default AgentsList;
