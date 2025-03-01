
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { AddDailyMetricsForm } from "@/components/forms/AddDailyMetricsForm";
import { useCallCenterMetrics } from "@/hooks/useCallCenterMetrics";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";

const CallCenterMetrics = () => {
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30); // Default to last 30 days
    return date.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [isAddMetricsOpen, setIsAddMetricsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("metrics");

  const { metricsData, reasonsData, isLoading } = useCallCenterMetrics({
    startDate,
    endDate,
  });

  // Prepare call reason data for the chart
  const prepareCallReasonData = () => {
    if (!reasonsData || reasonsData.length === 0) return [];

    const totalByReason = reasonsData.reduce(
      (acc, item) => {
        acc.technical_issues += item.technical_issues || 0;
        acc.billing_questions += item.billing_questions || 0;
        acc.account_management += item.account_management || 0;
        acc.product_information += item.product_information || 0;
        acc.service_outage += item.service_outage || 0;
        acc.other += item.other || 0;
        return acc;
      },
      {
        technical_issues: 0,
        billing_questions: 0,
        account_management: 0,
        product_information: 0,
        service_outage: 0,
        other: 0,
      }
    );

    return [
      { name: "Technical Issues", value: totalByReason.technical_issues, fill: "#8884d8" },
      { name: "Billing Questions", value: totalByReason.billing_questions, fill: "#83a6ed" },
      { name: "Account Management", value: totalByReason.account_management, fill: "#8dd1e1" },
      { name: "Product Information", value: totalByReason.product_information, fill: "#82ca9d" },
      { name: "Service Outage", value: totalByReason.service_outage, fill: "#a4de6c" },
      { name: "Other", value: totalByReason.other, fill: "#d0ed57" },
    ].filter(item => item.value > 0);
  };

  // Prepare time series data for metrics
  const prepareTimeSeriesData = () => {
    if (!metricsData || metricsData.length === 0) return [];
    
    return metricsData
      .slice()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(item => ({
        date: format(new Date(item.date), 'MMM dd'),
        tickets: item.tickets_received,
        calls: item.calls_received,
        livechat: item.livechat_received,
        email: item.email_received,
        total: item.total_issues
      }));
  };

  const callReasonData = prepareCallReasonData();
  const timeSeriesData = prepareTimeSeriesData();

  // Calculate totals and averages
  const getTotalsAndAverages = () => {
    if (!metricsData || metricsData.length === 0) return {
      total_tickets: 0,
      total_calls: 0,
      total_livechat: 0,
      total_email: 0,
      total_issues: 0,
      avg_tickets: 0,
      avg_calls: 0,
      avg_livechat: 0,
      avg_email: 0,
      avg_issues: 0,
      avg_sla: 0,
      avg_frr: 0,
    };

    const totals = metricsData.reduce(
      (acc, item) => {
        acc.total_tickets += item.tickets_received || 0;
        acc.total_calls += item.calls_received || 0;
        acc.total_livechat += item.livechat_received || 0;
        acc.total_email += item.email_received || 0;
        acc.total_issues += item.total_issues || 0;
        acc.total_sla += item.calls_sla || 0;
        acc.total_frr += item.emails_frr || 0;
        acc.count++;
        return acc;
      },
      {
        total_tickets: 0,
        total_calls: 0,
        total_livechat: 0,
        total_email: 0,
        total_issues: 0,
        total_sla: 0,
        total_frr: 0,
        count: 0,
      }
    );

    return {
      ...totals,
      avg_tickets: Math.round(totals.total_tickets / totals.count) || 0,
      avg_calls: Math.round(totals.total_calls / totals.count) || 0,
      avg_livechat: Math.round(totals.total_livechat / totals.count) || 0,
      avg_email: Math.round(totals.total_email / totals.count) || 0,
      avg_issues: Math.round(totals.total_issues / totals.count) || 0,
      avg_sla: Math.round(totals.total_sla / totals.count) || 0,
      avg_frr: Math.round(totals.total_frr / totals.count) || 0,
    };
  };

  const stats = getTotalsAndAverages();

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Call Center Metrics</h1>
          <Button onClick={() => setIsAddMetricsOpen(true)}>Add Daily Metrics</Button>
        </div>

        <Dialog open={isAddMetricsOpen} onOpenChange={setIsAddMetricsOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Add Daily Metrics</DialogTitle>
              <DialogDescription>
                Enter the call center metrics for a specific day
              </DialogDescription>
            </DialogHeader>
            <AddDailyMetricsForm onSuccess={() => setIsAddMetricsOpen(false)} />
          </DialogContent>
        </Dialog>

        <Card className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium mb-1">Start Date</label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full sm:w-40"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium mb-1">End Date</label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full sm:w-40"
                />
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="metrics">Metrics Overview</TabsTrigger>
              <TabsTrigger value="reasons">Call Reasons</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="data">Raw Data</TabsTrigger>
            </TabsList>

            <TabsContent value="metrics">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="p-4">
                  <h3 className="text-sm font-medium text-gray-500">Total Tickets</h3>
                  <p className="text-2xl font-semibold mt-1">{stats.total_tickets}</p>
                  <p className="text-sm text-gray-500 mt-1">Avg: {stats.avg_tickets}/day</p>
                </Card>
                
                <Card className="p-4">
                  <h3 className="text-sm font-medium text-gray-500">Total Calls</h3>
                  <p className="text-2xl font-semibold mt-1">{stats.total_calls}</p>
                  <p className="text-sm text-gray-500 mt-1">Avg: {stats.avg_calls}/day</p>
                </Card>
                
                <Card className="p-4">
                  <h3 className="text-sm font-medium text-gray-500">Average SLA</h3>
                  <p className="text-2xl font-semibold mt-1">{stats.avg_sla}%</p>
                  <p className="text-sm text-gray-500 mt-1">Calls service level</p>
                </Card>
                
                <Card className="p-4">
                  <h3 className="text-sm font-medium text-gray-500">Average FRR</h3>
                  <p className="text-2xl font-semibold mt-1">{stats.avg_frr}%</p>
                  <p className="text-sm text-gray-500 mt-1">Email first response rate</p>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Daily Issues by Channel</h3>
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : timeSeriesData.length > 0 ? (
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={timeSeriesData}>
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="tickets" name="Tickets" fill="#8884d8" />
                          <Bar dataKey="calls" name="Calls" fill="#82ca9d" />
                          <Bar dataKey="livechat" name="LiveChat" fill="#ffc658" />
                          <Bar dataKey="email" name="Email" fill="#ff8042" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">No data available</p>
                  )}
                </Card>

                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Channel Distribution</h3>
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : metricsData.length > 0 ? (
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Tickets', value: stats.total_tickets, fill: '#8884d8' },
                              { name: 'Calls', value: stats.total_calls, fill: '#82ca9d' },
                              { name: 'LiveChat', value: stats.total_livechat, fill: '#ffc658' },
                              { name: 'Email', value: stats.total_email, fill: '#ff8042' },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          />
                          <Tooltip formatter={(value) => [`${value} issues`, 'Count']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">No data available</p>
                  )}
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reasons">
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Call Reason Analysis</h3>
                {isLoading ? (
                  <p>Loading...</p>
                ) : callReasonData.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={callReasonData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {callReasonData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} calls`, 'Count']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={callReasonData}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                        >
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" width={100} />
                          <Tooltip formatter={(value) => [`${value} calls`, 'Count']} />
                          <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500">No call reason data available</p>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="trends">
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Metrics Trends</h3>
                {isLoading ? (
                  <p>Loading...</p>
                ) : timeSeriesData.length > 0 ? (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={timeSeriesData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="total" name="Total Issues" stroke="#8884d8" strokeWidth={2} />
                        <Line type="monotone" dataKey="tickets" name="Tickets" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="calls" name="Calls" stroke="#ffc658" />
                        <Line type="monotone" dataKey="livechat" name="LiveChat" stroke="#ff8042" />
                        <Line type="monotone" dataKey="email" name="Email" stroke="#ff0000" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <p className="text-center text-gray-500">No trend data available</p>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="data">
              <Card className="overflow-auto">
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
                      <TableHead>LiveChat Received</TableHead>
                      <TableHead>Email Received</TableHead>
                      <TableHead>Total Issues</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center">Loading...</TableCell>
                      </TableRow>
                    ) : metricsData.length > 0 ? (
                      metricsData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{format(new Date(item.date), 'MMM dd, yyyy')}</TableCell>
                          <TableCell>{item.tickets_received}</TableCell>
                          <TableCell>{item.tickets_resolved}</TableCell>
                          <TableCell>{item.cases_escalated}</TableCell>
                          <TableCell>{item.calls_received}</TableCell>
                          <TableCell>{item.calls_answered}</TableCell>
                          <TableCell>{item.calls_sla}%</TableCell>
                          <TableCell>{item.livechat_received}</TableCell>
                          <TableCell>{item.email_received}</TableCell>
                          <TableCell>{item.total_issues}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center">No data available</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CallCenterMetrics;
