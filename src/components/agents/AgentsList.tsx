
import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AgentCard from "@/components/AgentCard";
import { CSRStatsData } from "@/hooks/useCSRStats";
import { useState, useEffect } from "react";

interface AgentsListProps {
  agents: CSRStatsData[] | undefined;
}

const AgentsList = ({ agents }: AgentsListProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAgents, setFilteredAgents] = useState<CSRStatsData[] | undefined>(agents);

  // Update filtered agents whenever search query or agents list changes
  useEffect(() => {
    if (!agents) {
      setFilteredAgents([]);
      return;
    }
    
    if (!searchQuery.trim()) {
      setFilteredAgents(agents);
      return;
    }
    
    const lowercaseQuery = searchQuery.toLowerCase();
    const filtered = agents.filter(agent => 
      (agent.name?.toLowerCase().includes(lowercaseQuery) || 
       agent.email.toLowerCase().includes(lowercaseQuery))
    );
    
    setFilteredAgents(filtered);
  }, [agents, searchQuery]);

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
                id: agent.agent_id,
                name: agent.name || agent.email,
                avatar: "/placeholder.svg",
                role: "Customer Service Agent",
                status: agent.shift_status as "online" | "busy" | "offline",
                performance: {
                  callsHandled: agent.calls || 0,
                  satisfaction: 0, // Default value since we don't have this in our data
                  avgHandleTime: "0", // Default value since we don't have this in our data
                },
                metrics: {
                  daily: agent.calls || 0,
                  weekly: agent.live_chat || 0,
                  monthly: agent.helpdesk_tickets || 0,
                },
              }}
            />
          </div>
        ))}
        {(!filteredAgents || filteredAgents.length === 0) && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            {searchQuery ? "No agents found matching your search." : "No agents available."}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentsList;
