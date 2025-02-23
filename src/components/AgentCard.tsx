
import { MoreVertical, Phone, Star, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

interface AgentCardProps {
  agent: {
    id: string; // Changed from number to string to match UUID type
    name: string;
    avatar: string;
    role: string;
    status: "online" | "busy" | "offline";
    performance: {
      callsHandled: number;
      satisfaction: number;
      avgHandleTime: string;
    };
    metrics: {
      daily: number;
      weekly: number;
      monthly: number;
    };
  };
}

const AgentCard = ({ agent }: AgentCardProps) => {
  const statusColors = {
    online: "bg-success-500",
    busy: "bg-warning-500",
    offline: "bg-gray-400",
  };

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <Avatar className="h-12 w-12">
            <img src={agent.avatar} alt={agent.name} />
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-600">{agent.role}</p>
            <div className="flex items-center mt-2">
              <div className={`h-2 w-2 rounded-full ${statusColors[agent.status]} mr-2`} />
              <span className="text-sm capitalize">{agent.status}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-primary-500" />
          <div>
            <p className="text-sm text-gray-600">Calls</p>
            <p className="font-semibold">{agent.performance.callsHandled}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-warning-500" />
          <div>
            <p className="text-sm text-gray-600">CSAT</p>
            <p className="font-semibold">{agent.performance.satisfaction}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary-500" />
          <div>
            <p className="text-sm text-gray-600">Avg. Time</p>
            <p className="font-semibold">{agent.performance.avgHandleTime}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Performance Score</span>
          <span className="font-semibold">{agent.metrics.daily}%</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-success-500"
            style={{ width: `${agent.metrics.daily}%` }}
          />
        </div>
      </div>
    </Card>
  );
};

export default AgentCard;
