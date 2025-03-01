import DashboardLayout from "@/components/DashboardLayout";
import { useCSRStats } from "@/hooks/useCSRStats";
import { Card } from "@/components/ui/card";
import StatsCard from "@/components/StatsCard";
import { Clock, ThumbsUp, PhoneCall, Calendar, Phone, ExternalLink, Users, MessageSquare } from "lucide-react";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Home = () => {
  const { data: csrStats } = useCSRStats();
  const [timeFilter, setTimeFilter] = useState("Last Week");
  const [agentFilter, setAgentFilter] = useState("All Agents");
  const [chartType, setChartType] = useState("pie");
  
  // Key metrics data
  const performanceMetrics = {
    handlingTime: {
      value: "280s",
      target: "300s",
      trend: { value: 5, isPositive: true }
    },
    customerSatisfaction: {
      value: "92",
      target: "90%",
      trend: { value: 2, isPositive: true }
    },
    firstCallResolution: {
      value: "85",
      target: "80%",
      trend: { value: 3, isPositive: false }
    },
    scheduleAdherence: {
      value: "95",
      target: "95%",
      trend: { value: 1, isPositive: true }
    },
    callVolume: {
      value: "1,200",
      trend: { value: 8, isPositive: true }
    },
    serviceLevel: {
      value: "80%",
      trend: { value: 2, isPositive: false }
    }
  };

  // Call reason data for pie chart
  const callReasonData = [
    { name: "Technical Issues", value: 29, color: "#8884d8" },
    { name: "Billing Questions", value: 21, color: "#82b1ff" },
    { name: "Account Management", value: 17, color: "#81d4fa" },
    { name: "Product Information", value: 15, color: "#4caf50" },
    { name: "Service Outage", value: 10, color: "#cddc39" },
    { name: "Other", value: 8, color: "#ffeb3b" },
  ];

  // Team performance data
  const teamPerformance = [
    {
      name: "Team Alpha",
      aht: "275s",
      csat: "94%",
      fcr: "87%",
      sla: "82%"
    },
    {
      name: "Team Beta",
      aht: "290s",
      csat: "91%",
      fcr: "82%",
      sla: "78%"
    },
    {
      name: "Team Gamma",
      aht: "285s",
      csat: "89%",
      fcr: "84%",
      sla: "81%"
    },
  ];

  // Channel performance data
  const channelPerformance = [
    {
      channel: "Voice",
      icon: <Phone size={16} />,
      aht: "310s",
      csat: "88%",
      fcr: "79%",
      sla: "75%",
      volume: "650",
      topPerformer: "Sarah Johnson"
    },
    {
      channel: "Email",
      icon: <ExternalLink size={16} />,
      aht: "720s",
      csat: "92%",
      fcr: "87%",
      sla: "85%",
      volume: "320",
      topPerformer: "Michael Chen"
    },
    {
      channel: "Chat",
      icon: <MessageSquare size={16} />,
      aht: "420s",
      csat: "94%",
      fcr: "90%",
      sla: "82%",
      volume: "230",
      topPerformer: "Jessica Smith"
    },
  ];

  // Recent activities - keeping this from the original dashboard
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

        {/* Key Metrics Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <StatsCard
              title="Average Handling Time"
              value={performanceMetrics.handlingTime.value}
              icon={<Clock />}
              trend={performanceMetrics.handlingTime.trend}
              className="bg-white"
            />
            <StatsCard
              title="Customer Satisfaction"
              value={performanceMetrics.customerSatisfaction.value + "%"}
              icon={<ThumbsUp />}
              trend={performanceMetrics.customerSatisfaction.trend}
              className="bg-white"
            />
            <StatsCard
              title="First Call Resolution"
              value={performanceMetrics.firstCallResolution.value + "%"}
              icon={<PhoneCall />}
              trend={performanceMetrics.firstCallResolution.trend}
              className="bg-white"
            />
            <StatsCard
              title="Schedule Adherence"
              value={performanceMetrics.scheduleAdherence.value + "%"}
              icon={<Calendar />}
              trend={performanceMetrics.scheduleAdherence.trend}
              className="bg-white"
            />
            <StatsCard
              title="Call Volume"
              value={performanceMetrics.callVolume.value}
              icon={<Phone />}
              trend={performanceMetrics.callVolume.trend}
              className="bg-white"
            />
            <StatsCard
              title="Service Level"
              value={performanceMetrics.serviceLevel.value}
              icon={<Users />}
              trend={performanceMetrics.serviceLevel.trend}
              className="bg-white"
            />
          </div>
        </section>

        {/* Call Reason Analysis Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Call Reason Analysis</h2>
            <div className="flex gap-2">
              <button 
                className={`px-3 py-1 rounded-md ${chartType === 'pie' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setChartType('pie')}
              >
                Pie Chart
              </button>
              <button 
                className={`px-3 py-1 rounded-md ${chartType === 'bar' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setChartType('bar')}
              >
                Bar Chart
              </button>
            </div>
          </div>
          <Card className="p-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={callReasonData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {callReasonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend layout="vertical" verticalAlign="middle" align="right" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        {/* Team Performance Table */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Team Performance</h2>
          <Card className="p-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Name</TableHead>
                  <TableHead>Average Handling Time</TableHead>
                  <TableHead>Customer Satisfaction</TableHead>
                  <TableHead>First Call Resolution</TableHead>
                  <TableHead>Service Level Agreement</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamPerformance.map((team, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell>{team.aht}</TableCell>
                    <TableCell>{team.csat}</TableCell>
                    <TableCell>{team.fcr}</TableCell>
                    <TableCell>{team.sla}</TableCell>
                    <TableCell>
                      <button className="text-blue-600 hover:underline">View Details</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>

        {/* Channel Performance */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Channel Performance</h2>
          <Card className="p-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Channel</TableHead>
                  <TableHead>Average Handling Time</TableHead>
                  <TableHead>Customer Satisfaction</TableHead>
                  <TableHead>First Call Resolution</TableHead>
                  <TableHead>Service Level Agreement</TableHead>
                  <TableHead>Call Volume</TableHead>
                  <TableHead>Top Performer Agent</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {channelPerformance.map((channel, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {channel.icon}
                        {channel.channel}
                      </div>
                    </TableCell>
                    <TableCell>{channel.aht}</TableCell>
                    <TableCell>{channel.csat}</TableCell>
                    <TableCell>{channel.fcr}</TableCell>
                    <TableCell>{channel.sla}</TableCell>
                    <TableCell>{channel.volume}</TableCell>
                    <TableCell>{channel.topPerformer}</TableCell>
                    <TableCell>
                      <button className="text-blue-600 hover:underline">View Details</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>

        {/* Recent Activities - keeping this from the original dashboard */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <Card className="p-6">
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
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Home;
