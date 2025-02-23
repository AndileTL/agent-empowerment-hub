
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { CSRStatsData } from "@/hooks/useCSRStats";

interface MetricCardProps {
  label: string;
  value: string | number;
  color?: string;
}

const MetricCard = ({ label, value, color = "text-primary" }: MetricCardProps) => (
  <div className="text-center">
    <h3 className={`text-4xl font-bold ${color}`}>{value}</h3>
    <p className="text-sm text-gray-600 mt-1">{label}</p>
  </div>
);

interface CallCenterMetricsProps {
  agentStats: CSRStatsData[] | undefined;
}

const CallCenterMetrics = ({ agentStats }: CallCenterMetricsProps) => {
  // Calculate metrics from agentStats
  const incomingCalls = agentStats?.reduce((sum, stat) => sum + (stat.calls || 0), 0) || 0;
  const totalAgents = new Set(agentStats?.map(stat => stat.agent_id)).size;
  const avgCallsPerAgent = totalAgents ? Math.round(incomingCalls / totalAgents) : 0;
  const fcr = 47; // First Contact Resolution - mock data
  const aht = 324; // Average Handle Time - mock data
  const satisfaction = 3.4; // Customer Satisfaction - mock data

  // Mock data for the hourly chart
  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    calls: Math.floor(Math.random() * 50) + 10,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="p-4">
          <MetricCard label="Incoming Calls" value={incomingCalls} />
        </Card>
        <Card className="p-4">
          <MetricCard label="Forecasted Calls" value="774" />
        </Card>
        <Card className="p-4">
          <MetricCard label="Nb of Agents" value={totalAgents} />
        </Card>
        <Card className="p-4">
          <MetricCard label="Calls per Agent" value={avgCallsPerAgent} />
        </Card>
        <Card className="p-4">
          <MetricCard label="FCR %" value={`${fcr}%`} />
        </Card>
        <Card className="p-4">
          <MetricCard label="AHT" value={`${aht}s`} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2 p-6">
          <h3 className="text-lg font-semibold mb-4">Hourly View</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <XAxis dataKey="hour" />
                <YAxis />
                <Line 
                  type="monotone" 
                  dataKey="calls" 
                  stroke="#8884d8" 
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Call Reasons</h3>
          <div className="space-y-4">
            {[
              { reason: "Technical Issues", count: 15 },
              { reason: "Internet Outage", count: 10 },
              { reason: "Billing Questions", count: 7 },
              { reason: "Product/Service Problems", count: 4 },
            ].map((item) => (
              <div key={item.reason} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{item.reason}</span>
                <span className="font-semibold">{item.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CallCenterMetrics;
