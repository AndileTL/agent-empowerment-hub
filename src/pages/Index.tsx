
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Clock, ThumbsUp, PhoneCall, Calendar, BarChart2, Phone, 
  MessageSquare, Mail, Award, ActivitySquare 
} from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const Home = () => {
  // State for filters
  const [timeFilter, setTimeFilter] = useState("Last Week");
  const [agentFilter, setAgentFilter] = useState("All Agents");
  const [chartType, setChartType] = useState("pie");
  
  // Dashboard data (placeholder - would be replaced with real data from API)
  const performanceMetrics = {
    handlingTime: {
      value: "280s",
      target: "300s",
      trend: { value: 5, isPositive: true }
    },
    customerSatisfaction: {
      value: "92%",
      target: "90%",
      trend: { value: 2, isPositive: true }
    },
    firstCallResolution: {
      value: "85%",
      target: "80%",
      trend: { value: 3, isPositive: false }
    },
    scheduleAdherence: {
      value: "95%",
      target: "95%",
      trend: { value: 1, isPositive: true }
    },
    callVolume: {
      value: "1,200",
      trend: { value: 8, isPositive: true }
    },
    serviceLevel: {
      value: "80%",
      target: "85%",
      trend: { value: 2, isPositive: false }
    }
  };

  // Call reason data
  const callReasonData = [
    { name: "Technical Issues", value: 350, fill: "#8884d8" },
    { name: "Billing Questions", value: 250, fill: "#83a6ed" },
    { name: "Account Management", value: 200, fill: "#8dd1e1" },
    { name: "Product Information", value: 180, fill: "#82ca9d" },
    { name: "Service Outage", value: 120, fill: "#a4de6c" },
    { name: "Other", value: 100, fill: "#d0ed57" }
  ];

  // Team performance data
  const teamPerformanceData = [
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
    }
  ];

  // Channel performance data
  const channelPerformanceData = [
    {
      channel: "Voice",
      aht: "310s",
      csat: "88%",
      fcr: "79%",
      sla: "75%",
      volume: "650",
      topPerformer: "Sarah Johnson"
    },
    {
      channel: "Email",
      aht: "720s",
      csat: "92%",
      fcr: "87%",
      sla: "85%",
      volume: "320",
      topPerformer: "Michael Chen"
    },
    {
      channel: "Chat",
      aht: "420s",
      csat: "94%",
      fcr: "90%",
      sla: "82%",
      volume: "230",
      topPerformer: "Jessica Williams"
    }
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-8 animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Contact Center Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, John Smith</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Last Week">Last Week</SelectItem>
                <SelectItem value="This Week">This Week</SelectItem>
                <SelectItem value="Last Month">Last Month</SelectItem>
                <SelectItem value="Custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            <Select value={agentFilter} onValueChange={setAgentFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select agent/team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Agents">All Agents</SelectItem>
                <SelectItem value="Team Alpha">Team Alpha</SelectItem>
                <SelectItem value="Team Beta">Team Beta</SelectItem>
                <SelectItem value="Individual Agents...">Individual Agents...</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Key Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            <StatsCard
              title="Average Handling Time"
              value={performanceMetrics.handlingTime.value}
              icon={<Clock />}
              trend={performanceMetrics.handlingTime.trend}
              className="bg-white"
              description="Average time taken to handle a customer interaction"
            />
            <StatsCard
              title="Customer Satisfaction"
              value={performanceMetrics.customerSatisfaction.value}
              icon={<ThumbsUp />}
              trend={performanceMetrics.customerSatisfaction.trend}
              className="bg-white"
              description="Customer satisfaction rating based on post-call surveys"
            />
            <StatsCard
              title="First Call Resolution"
              value={performanceMetrics.firstCallResolution.value}
              icon={<PhoneCall />}
              trend={performanceMetrics.firstCallResolution.trend}
              className="bg-white"
              description="Percentage of issues resolved in the first call"
            />
            <StatsCard
              title="Schedule Adherence"
              value={performanceMetrics.scheduleAdherence.value}
              icon={<Calendar />}
              trend={performanceMetrics.scheduleAdherence.trend}
              className="bg-white"
              description="Percentage of time agents follow their scheduled activities"
            />
            <StatsCard
              title="Call Volume"
              value={performanceMetrics.callVolume.value}
              icon={<ActivitySquare />}
              trend={performanceMetrics.callVolume.trend}
              className="bg-white"
              description="Total number of calls handled during the selected period"
            />
            <StatsCard
              title="Service Level"
              value={performanceMetrics.serviceLevel.value}
              icon={<Award />}
              trend={performanceMetrics.serviceLevel.trend}
              className="bg-white"
              description="Percentage of calls answered within the target time"
            />
          </div>
        </section>

        {/* Call Reason Analysis Section */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Call Reason Analysis</h2>
            <Tabs defaultValue="pie" value={chartType} onValueChange={setChartType}>
              <TabsList>
                <TabsTrigger value="pie">Pie Chart</TabsTrigger>
                <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <Card className="p-6 bg-white">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "pie" ? (
                  <PieChart>
                    <Pie
                      data={callReasonData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {callReasonData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} calls`, 'Count']} />
                    <Legend />
                  </PieChart>
                ) : (
                  <BarChart
                    data={callReasonData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
                  >
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} calls`, 'Count']} />
                    <Legend verticalAlign="top" />
                    <Bar dataKey="value" name="Call Count" fill="#8884d8" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        {/* Team Performance Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Team Performance</h2>
          <Card className="bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team Name</TableHead>
                    <TableHead>Average Handling Time</TableHead>
                    <TableHead>Customer Satisfaction</TableHead>
                    <TableHead>First Call Resolution</TableHead>
                    <TableHead>Service Level Agreement</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamPerformanceData.map((team, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell>{team.aht}</TableCell>
                      <TableCell>{team.csat}</TableCell>
                      <TableCell>{team.fcr}</TableCell>
                      <TableCell>{team.sla}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </section>

        {/* Channel Performance Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Channel Performance</h2>
          <Card className="bg-white overflow-hidden">
            <div className="overflow-x-auto">
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
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {channelPerformanceData.map((channel, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {channel.channel === "Voice" && <Phone className="h-4 w-4" />}
                          {channel.channel === "Email" && <Mail className="h-4 w-4" />}
                          {channel.channel === "Chat" && <MessageSquare className="h-4 w-4" />}
                          {channel.channel}
                        </div>
                      </TableCell>
                      <TableCell>{channel.aht}</TableCell>
                      <TableCell>{channel.csat}</TableCell>
                      <TableCell>{channel.fcr}</TableCell>
                      <TableCell>{channel.sla}</TableCell>
                      <TableCell>{channel.volume}</TableCell>
                      <TableCell>{channel.topPerformer}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Home;
