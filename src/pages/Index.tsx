import DashboardLayout from "@/components/DashboardLayout";
import { useCSRStats } from "@/hooks/useCSRStats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/StatsCard";
import { 
  Clock, ThumbsUp, PhoneCall, Calendar, Phone, ExternalLink, Users, 
  MessageSquare, AlertTriangle, Server, Network, Ticket, PlugZap, 
  ChartLine, BarChart2, Table as TableIcon, Plus,
  Activity, TrendingUp, TrendingDown, Info
} from "lucide-react";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const Home = () => {
  const { data: csrStats } = useCSRStats();
  const [timeFilter, setTimeFilter] = useState("Last Week");
  const [agentFilter, setAgentFilter] = useState("All Agents");
  const [chartType, setChartType] = useState("pie");
  const [insightsTab, setInsightsTab] = useState("network");
  const [mainTab, setMainTab] = useState("dashboard");
  
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

  const callReasonData = [
    { name: "Technical Issues", value: 29, color: "#8884d8" },
    { name: "Billing Questions", value: 21, color: "#82b1ff" },
    { name: "Account Management", value: 17, color: "#81d4fa" },
    { name: "Product Information", value: 15, color: "#4caf50" },
    { name: "Service Outage", value: 10, color: "#cddc39" },
    { name: "Other", value: 8, color: "#ffeb3b" },
  ];

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

  const outageData = [
    {
      id: "INC12345",
      reason: "Database Server Down",
      severity: "critical",
      startTime: "2023-05-15 08:30 AM",
      affectedServices: ["CRM", "Billing System"],
      estimatedResolution: "2023-05-15 12:30 PM",
      updates: "Engineers working on restoring service. Backup systems engaged."
    },
    {
      id: "INC12346",
      reason: "Internet Connectivity Issue",
      severity: "high",
      startTime: "2023-05-15 09:15 AM",
      affectedServices: ["Email", "VoIP"],
      estimatedResolution: "2023-05-15 11:00 AM",
      updates: "Internet service provider notified. Estimated fix in 2 hours."
    },
    {
      id: "INC12347",
      reason: "VPN Connection Failure",
      severity: "medium",
      startTime: "2023-05-15 10:00 AM",
      affectedServices: ["Remote Access"],
      estimatedResolution: "2023-05-15 02:00 PM",
      updates: "Troubleshooting in progress."
    }
  ];

  const slaData = [
    { 
      month: "Jan", 
      phone: 95, 
      chat: 92, 
      email: 88, 
      target: 90 
    },
    { 
      month: "Feb", 
      phone: 94, 
      chat: 91, 
      email: 89, 
      target: 90 
    },
    { 
      month: "Mar", 
      phone: 96, 
      chat: 94, 
      email: 91, 
      target: 90 
    },
    { 
      month: "Apr", 
      phone: 93, 
      chat: 90, 
      email: 87, 
      target: 90 
    },
    { 
      month: "May", 
      phone: 92, 
      chat: 89, 
      email: 85, 
      target: 90 
    }
  ];

  const carData = [
    {
      id: "CAR0001",
      ticketRef: "INC12340",
      issue: "Repeated CRM timeouts",
      rootCause: "Database query optimization needed",
      actions: "Implemented query caching and indexing",
      responsible: "IT Infrastructure",
      completion: "2023-04-28",
      status: "Closed"
    },
    {
      id: "CAR0002",
      ticketRef: "INC12341",
      issue: "Customer data not syncing",
      rootCause: "API rate limiting",
      actions: "Implemented batch processing",
      responsible: "Development Team",
      completion: "2023-05-10",
      status: "Open"
    },
    {
      id: "CAR0003",
      ticketRef: "INC12342",
      issue: "Call transfer failures",
      rootCause: "VoIP server configuration",
      actions: "Updated SIP settings",
      responsible: "Telecom Team",
      completion: "2023-05-12",
      status: "Pending"
    }
  ];

  const chatSlaMetrics = {
    avgWaitTime: "45s",
    avgHandleTime: "8m 20s",
    meetingSla: "88%",
    activeChats: 24,
    waitingChats: 5
  };

  const emailSlaMetrics = {
    avgResponseTime: "2h 15m",
    meetingSla: "92%",
    inQueue: 42,
    resolved: 156
  };

  const getSeverityClass = (severity) => {
    switch (severity) {
      case "critical":
        return "bg-red-500 text-white";
      case "high":
        return "bg-orange-500 text-white";
      case "medium":
        return "bg-yellow-500 text-black";
      case "low":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const slaPieData = [
    { name: "Phone SLA", value: 95, color: "#8884d8" },
    { name: "Chat SLA", value: 88, color: "#82ca9d" },
    { name: "Email SLA", value: 92, color: "#ffc658" }
  ];

  const callCenterMetricsData = [
    {
      date: "2023-07-01",
      tickets: { 
        ticketsReceived: 245, 
        ticketsResolved: 230, 
        casesEscalated: 15 
      },
      calls: { 
        callsReceived: 350, 
        callsAnswered: 330, 
        callsSLA: 95, 
        callsCAR: 94 
      },
      liveChat: { 
        liveChatReceived: 120, 
        liveChatAnswered: 115, 
        liveChatSLA: 96, 
        liveChatLT: 89 
      },
      email: { 
        emailsReceived: 230, 
        emailsResponse: "1st Response", 
        emailsResolved: 210, 
        emailsFRR: 91 
      },
      social: { 
        socialResolved: 45 
      },
      walkIns: 25,
      totalIssues: 770,
      ticketToCalls: 0.69,
      dialoguesClassification: 98,
      majorOutages: 1,
      systemDowntime: "0h 45m"
    },
    {
      date: "2023-07-02",
      tickets: { 
        ticketsReceived: 230, 
        ticketsResolved: 210, 
        casesEscalated: 20 
      },
      calls: { 
        callsReceived: 320, 
        callsAnswered: 300, 
        callsSLA: 94, 
        callsCAR: 93 
      },
      liveChat: { 
        liveChatReceived: 110, 
        liveChatAnswered: 105, 
        liveChatSLA: 95, 
        liveChatLT: 88 
      },
      email: { 
        emailsReceived: 210, 
        emailsResponse: "1st Response", 
        emailsResolved: 190, 
        emailsFRR: 90 
      },
      social: { 
        socialResolved: 40 
      },
      walkIns: 20,
      totalIssues: 700,
      ticketToCalls: 0.72,
      dialoguesClassification: 97,
      majorOutages: 0,
      systemDowntime: "0h 0m"
    }
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

        <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="dashboard">Main Dashboard</TabsTrigger>
            <TabsTrigger value="insights">Contact Center Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
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
                    {chartType === 'pie' ? (
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
                    ) : (
                      <BarChart
                        data={callReasonData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                        <Bar dataKey="value" name="Percentage" fill="#8884d8">
                          {callReasonData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </Card>
            </section>

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
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="mb-4">
              <Tabs value={insightsTab} onValueChange={setInsightsTab}>
                <TabsList>
                  <TabsTrigger value="network">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Network/System Outages
                  </TabsTrigger>
                  <TabsTrigger value="sla">
                    <Activity className="w-4 h-4 mr-2" />
                    SLA & Call Answer Rate
                  </TabsTrigger>
                  <TabsTrigger value="live">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Live SLA Monitoring
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="network" className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Active Outages</h3>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Outage
                    </Button>
                  </div>
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {outageData.map((outage) => (
                          <div key={outage.id} className="border rounded-lg overflow-hidden">
                            <div className={`flex justify-between items-center p-4 ${getSeverityClass(outage.severity)}`}>
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5" />
                                <span className="font-semibold">{outage.reason}</span>
                              </div>
                              <span className="text-sm font-medium px-2 py-1 bg-white/20 rounded">
                                {outage.id}
                              </span>
                            </div>
                            <div className="p-4 bg-white">
                              <div className="grid grid-cols-2 gap-4 mb-2">
                                <div>
                                  <p className="text-sm text-gray-500">Start Time</p>
                                  <p className="font-medium">{outage.startTime}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Est. Resolution</p>
                                  <p className="font-medium">{outage.estimatedResolution}</p>
                                </div>
                              </div>
                              <div className="mb-2">
                                <p className="text-sm text-gray-500">Affected Services</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {outage.affectedServices.map((service, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-sm">
                                      {service}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Updates</p>
                                <p className="text-sm mt-1">{outage.updates}</p>
                              </div>
                              <Button variant="outline" className="mt-3 w-full">View Details</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="sla" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>SLA Performance</CardTitle>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Configure SLA
                        </Button>
                      </div>
                      <CardDescription>Performance across channels for selected period</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={slaData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="phone" name="Phone" fill="#8884d8" />
                              <Bar dataKey="chat" name="Chat" fill="#82ca9d" />
                              <Bar dataKey="email" name="Email" fill="#ffc658" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={slaPieData}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({name, percent}) => `${name}: ${percent.toFixed(0)}%`}
                              >
                                {slaPieData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => `${value}%`} />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="space-y-2 w-1/3">
                            <label className="text-sm font-medium">Start Date</label>
                            <Input type="date" />
                          </div>
                          <div className="space-y-2 w-1/3">
                            <label className="text-sm font-medium">End Date</label>
                            <Input type="date" />
                          </div>
                          <div className="space-y-2 w-1/3 ml-2">
                            <label className="text-sm font-medium">Channel</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="All Channels" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Channels</SelectItem>
                                <SelectItem value="phone">Phone</SelectItem>
                                <SelectItem value="chat">Chat</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button className="w-full mt-2">Apply Filters</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Key Metrics Summary</CardTitle>
                      <CardDescription>Overview of important contact center metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Total Tickets</div>
                          <div className="text-2xl font-bold">475</div>
                          <div className="text-sm text-green-500">+5% from last period</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Call Answer Rate</div>
                          <div className="text-2xl font-bold">93.5%</div>
                          <div className="text-sm text-green-500">+2.1% from last period</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">First Response Rate</div>
                          <div className="text-2xl font-bold">90.5%</div>
                          <div className="text-sm text-red-500">-1.2% from last period</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Resolution Time</div>
                          <div className="text-2xl font-bold">1.8 days</div>
                          <div className="text-sm text-green-500">-0.2 days from last period</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Call Answer Rate</CardTitle>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add CAR
                        </Button>
                      </div>
                      <CardDescription>Call answer rate metrics</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Tickets Received</TableHead>
                              <TableHead>Tickets Resolved</TableHead>
                              <TableHead>Cases Escalated</TableHead>
                              <TableHead>Calls Received</TableHead>
                              <TableHead>Calls Answered</TableHead>
                              <TableHead>Calls SLA</TableHead>
                              <TableHead>Calls CAR</TableHead>
                              <TableHead>LiveChat Received</TableHead>
                              <TableHead>LiveChat Answered</TableHead>
                              <TableHead>LiveChat SLA</TableHead>
                              <TableHead>LiveChat L/T</TableHead>
                              <TableHead>Emails Received</TableHead>
                              <TableHead>1st Response</TableHead>
                              <TableHead>Emails Resolved</TableHead>
                              <TableHead>Emails FRR</TableHead>
                              <TableHead>Social Resolved</TableHead>
                              <TableHead>Walk-Ins</TableHead>
                              <TableHead>Total Issues</TableHead>
                              <TableHead>Ticket to Calls</TableHead>
                              <TableHead>Dialogue Classif</TableHead>
                              <TableHead>Major Network Outages</TableHead>
                              <TableHead>System Downtime</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {callCenterMetricsData.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>{item.tickets.ticketsReceived}</TableCell>
                                <TableCell>{item.tickets.ticketsResolved}</TableCell>
                                <TableCell>{item.tickets.casesEscalated}</TableCell>
                                <TableCell>{item.calls.callsReceived}</TableCell>
                                <TableCell>{item.calls.callsAnswered}</TableCell>
                                <TableCell>{item.calls.callsSLA}%</TableCell>
                                <TableCell>{item.calls.callsCAR}%</TableCell>
                                <TableCell>{item.liveChat.liveChatReceived}</TableCell>
                                <TableCell>{item.liveChat.liveChatAnswered}</TableCell>
                                <TableCell>{item.liveChat.liveChatSLA}%</TableCell>
                                <TableCell>{item.liveChat.liveChatLT}%</TableCell>
                                <TableCell>{item.email.emailsReceived}</TableCell>
                                <TableCell>{item.email.emailsResponse}</TableCell>
                                <TableCell>{item.email.emailsResolved}</TableCell>
                                <TableCell>{item.email.emailsFRR}%</TableCell>
                                <TableCell>{item.social.socialResolved}</TableCell>
                                <TableCell>{item.walkIns}</TableCell>
                                <TableCell>{item.totalIssues}</TableCell>
                                <TableCell>{item.ticketToCalls}</TableCell>
                                <TableCell>{item.dialoguesClassification}%</TableCell>
                                <TableCell>{item.majorOutages}</TableCell>
                                <TableCell>{item.systemDowntime}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="live" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <MessageSquare className="h-5 w-5 mr-2" />
                          Live Chat SLA
                        </CardTitle>
                        <CardDescription>Real-time chat performance metrics</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border rounded-lg p-4">
                            <p className="text-sm text-gray-500 mb-1">Average Wait Time</p>
                            <p className="text-2xl font-bold">{chatSlaMetrics.avgWaitTime}</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <p className="text-sm text-gray-500 mb-1">Average Handle Time</p>
                            <p className="text-2xl font-bold">{chatSlaMetrics.avgHandleTime}</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <p className="text-sm text-gray-500 mb-1">Meeting SLA</p>
                            <p className="text-2xl font-bold">{chatSlaMetrics.meetingSla}</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <p className="text-sm text-gray-500 mb-1">Active Chats</p>
                            <div className="flex items-end gap-2">
                              <p className="text-2xl font-bold">{chatSlaMetrics.activeChats}</p>
                              <p className="text-sm text-gray-500">
                                ({chatSlaMetrics.waitingChats} waiting)
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <ExternalLink className="h-5 w-5 mr-2" />
                          Email SLA
                        </CardTitle>
                        <CardDescription>Real-time email performance metrics</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border rounded-lg p-4">
                            <p className="text-sm text-gray-500 mb-1">Average Response Time</p>
                            <p className="text-2xl font-bold">{emailSlaMetrics.avgResponseTime}</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <p className="text-sm text-gray-500 mb-1">Meeting SLA</p>
                            <p className="text-2xl font-bold">{emailSlaMetrics.meetingSla}</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <p className="text-sm text-gray-500 mb-1">Emails in Queue</p>
                            <p className="text-2xl font-bold">{emailSlaMetrics.inQueue}</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <p className="text-sm text-gray-500 mb-1">Resolved Today</p>
                            <p className="text-2xl font-bold">{emailSlaMetrics.resolved}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="mt-4">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Live Agent Performance</CardTitle>
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Channel" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Channels</SelectItem>
                            <SelectItem value="chat">Live Chat</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Phone</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Agent</TableHead>
                            <TableHead>Channel</TableHead>
                            <TableHead>Active</TableHead>
                            <TableHead>Completed</TableHead>
                            <TableHead>Avg Time</TableHead>
                            <TableHead>SLA Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Sarah Johnson</TableCell>
                            <TableCell>
                              <span className="flex items-center">
                                <MessageSquare className="h-4 w-4 mr-1" /> Chat
                              </span>
                            </TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>24</TableCell>
                            <TableCell>6m 40s</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                Meeting SLA
                              </span>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Michael Chen</TableCell>
                            <TableCell>
                              <span className="flex items-center">
                                <ExternalLink className="h-4 w-4 mr-1" /> Email
                              </span>
                            </TableCell>
                            <TableCell>12</TableCell>
                            <TableCell>31</TableCell>
                            <TableCell>1h 45m</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                                At Risk
                              </span>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Jessica Smith</TableCell>
                            <TableCell>
                              <span className="flex items-center">
                                <Phone className="h-4 w-4 mr-1" /> Phone
                              </span>
                            </TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>18</TableCell>
                            <TableCell>4m 20s</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                Meeting SLA
                              </span>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Home;
