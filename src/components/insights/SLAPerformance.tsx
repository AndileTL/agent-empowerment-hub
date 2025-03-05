
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SLAData {
  month: string;
  phone: number;
  chat: number;
  email: number;
  target: number;
}

interface PieData {
  name: string;
  value: number;
  color: string;
}

interface MetricsData {
  date: string;
  tickets: {
    ticketsReceived: number;
    ticketsResolved: number;
    casesEscalated: number;
  };
  calls: {
    callsReceived: number;
    callsAnswered: number;
    callsSLA: number;
    callsCAR: number;
  };
  liveChat: {
    liveChatReceived: number;
    liveChatAnswered: number;
    liveChatSLA: number;
    liveChatLT: number;
  };
  email: {
    emailsReceived: number;
    emailsResponse: string;
    emailsResolved: number;
    emailsFRR: number;
  };
  social: {
    socialResolved: number;
  };
  walkIns: number;
  totalIssues: number;
  ticketToCalls: number;
  dialoguesClassification: number;
  majorOutages: number;
  systemDowntime: string;
}

interface SLAPerformanceProps {
  slaData: SLAData[];
  slaPieData: PieData[];
  callCenterMetricsData: MetricsData[];
}

const SLAPerformance: React.FC<SLAPerformanceProps> = ({ 
  slaData, 
  slaPieData, 
  callCenterMetricsData 
}) => {
  return (
    <div className="space-y-4 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>SLA Performance</CardTitle>
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
          <CardTitle>Contact Centre Insights Report</CardTitle>
          <CardDescription>CC Metrics</CardDescription>
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
    </div>
  );
};

export default SLAPerformance;
