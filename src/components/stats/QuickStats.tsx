
import { CSRStatsData } from "@/hooks/useCSRStats";

interface QuickStatsProps {
  agentStats: CSRStatsData[] | undefined;
}

const QuickStats = ({ agentStats }: QuickStatsProps) => {
  return (
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
  );
};

export default QuickStats;
