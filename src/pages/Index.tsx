
import { Phone, MessageSquare, Users, CheckCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";

const Index = () => {
  const statsData = [
    {
      title: "Total Calls",
      value: "1,234",
      icon: <Phone className="h-6 w-6" />,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Live Chats",
      value: "456",
      icon: <MessageSquare className="h-6 w-6" />,
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Active Agents",
      value: "45",
      icon: <Users className="h-6 w-6" />,
      trend: { value: 5, isPositive: false },
    },
    {
      title: "Average QA Score",
      value: "92%",
      icon: <CheckCircle className="h-6 w-6" />,
      trend: { value: 3, isPositive: true },
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-2 text-gray-600">Monitor real-time contact center performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatsCard
              key={stat.title}
              {...stat}
              className="transition-all hover:scale-105"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Today's Performance</h2>
            {/* Placeholder for charts - will be implemented in next iteration */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              Performance Chart Coming Soon
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Agent Status</h2>
            {/* Placeholder for agent status - will be implemented in next iteration */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              Agent Status Overview Coming Soon
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
