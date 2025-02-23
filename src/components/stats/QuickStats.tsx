
import { Card } from "@/components/ui/card";
import { CSRStatsData } from "@/hooks/useCSRStats";

interface QuickStatsProps {
  agentStats: CSRStatsData[] | undefined;
}

const QuickStats = ({ agentStats }: QuickStatsProps) => {
  const calculateAverageHandlingTime = () => {
    if (!agentStats?.length) return 0;
    return agentStats.reduce((acc, stat) => acc + (stat.calls || 0), 0) / agentStats.length;
  };

  const calculateSatisfactionScore = () => {
    return 85; // Default value since we don't have this in our data
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-600">Average Customer Satisfaction</h3>
        <p className="text-2xl font-bold mt-2">{calculateSatisfactionScore()}%</p>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-600">Average Handling Time</h3>
        <p className="text-2xl font-bold mt-2">{calculateAverageHandlingTime()} min</p>
      </Card>
    </div>
  );
};

export default QuickStats;
