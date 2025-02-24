
import DashboardLayout from "@/components/DashboardLayout";
import { useCSRStats } from "@/hooks/useCSRStats";
import { Card } from "@/components/ui/card";
import StatsCard from "@/components/StatsCard";
import { Clock, ThumbsUp, PhoneCall, Calendar } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const { data: csrStats } = useCSRStats();
  const [timeFilter, setTimeFilter] = useState("Last Week");
  const [agentFilter, setAgentFilter] = useState("All Agents");
  
  // Placeholder data - replace with real data later
  const performanceMetrics = {
    handlingTime: {
      value: "280s",
      target: "300s",
    },
    customerSatisfaction: {
      value: "92",
      target: "90%",
    },
    firstCallResolution: {
      value: "85",
      target: "80%",
    },
    scheduleAdherence: {
      value: "95",
      target: "95%",
    },
  };

  const recentActivities = [
    {
      type: "new-agent",
      message: "New agent Sarah Johnson joined Team Alpha",
      timestamp: "2h ago",
    },
    {
      type: "target-exceeded",
      message: "Team Beta exceeded CSAT target for Q1",
      timestamp: "3h ago",
    },
    {
      type: "update",
      message: "Updated AHT targets for all teams",
      timestamp: "5h ago",
    },
    {
      type: "training",
      message: "Mark Wilson completed advanced training",
      timestamp: "1d ago",
    },
  ];

  const teamPerformance = [
    {
      name: "Team Alpha",
      aht: "275s",
      csat: "94%",
    },
    {
      name: "Team Beta",
      aht: "290s",
      csat: "91%",
    },
    {
      name: "Team Gamma",
      aht: "285s",
      csat: "89%",
    },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Contact Center Dashboard</h1>
            <p className="text-gray-600">Welcome back, John Smith</p>
          </div>
          <div className="flex gap-4">
            <select 
              className="border rounded-md p-2"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option>Last Week</option>
              <option>Last Month</option>
              <option>Last Quarter</option>
            </select>
            <select
              className="border rounded-md p-2"
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
            >
              <option>All Agents</option>
              <option>Team Alpha</option>
              <option>Team Beta</option>
              <option>Team Gamma</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Average Handling Time"
            value={performanceMetrics.handlingTime.value}
            icon={<Clock />}
            trend={{ value: 5, isPositive: true }}
            className="bg-white"
          />
          <StatsCard
            title="Customer Satisfaction"
            value={performanceMetrics.customerSatisfaction.value}
            icon={<ThumbsUp />}
            trend={{ value: 2, isPositive: true }}
            className="bg-white"
          />
          <StatsCard
            title="First Call Resolution"
            value={performanceMetrics.firstCallResolution.value}
            icon={<PhoneCall />}
            trend={{ value: 3, isPositive: false }}
            className="bg-white"
          />
          <StatsCard
            title="Schedule Adherence"
            value={performanceMetrics.scheduleAdherence.value}
            icon={<Calendar />}
            trend={{ value: 1, isPositive: true }}
            className="bg-white"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Team Performance</h2>
            <div className="space-y-4">
              {teamPerformance.map((team, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{team.name}</h3>
                    <div className="text-sm text-gray-500">
                      AHT: {team.aht} | CSAT: {team.csat}
                    </div>
                  </div>
                  <button className="text-blue-600 text-sm hover:underline">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
