
import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Clock, Star, CheckSquare, User } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PerformancePoint {
  date: string;
  value: number;
}

interface AgentPerformanceDetailsProps {
  agent?: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    position: string;
  };
  metrics?: {
    handlingTime: {
      current: string;
      average: string;
      trend: PerformancePoint[];
    };
    satisfaction: {
      current: number;
      average: number;
      trend: PerformancePoint[];
    };
    resolution: {
      current: number;
      average: number;
      trend: PerformancePoint[];
    };
    recentInteractions: Array<{
      id: string;
      date: string;
      type: string;
      duration: string;
      status: string;
      satisfaction: number;
    }>;
  };
}

const AgentPerformanceDetails: React.FC<AgentPerformanceDetailsProps> = ({ agent, metrics }) => {
  const { id } = useParams();
  
  // Mock data for demo purposes - in a real app, this would come from props or a data fetch
  const mockAgent = agent || {
    id: id || "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "/placeholder.svg",
    position: "Senior Customer Support"
  };

  const mockMetrics = metrics || {
    handlingTime: {
      current: "5m 24s",
      average: "6m 12s",
      trend: [
        { date: "Jan", value: 380 },
        { date: "Feb", value: 350 },
        { date: "Mar", value: 365 },
        { date: "Apr", value: 340 },
        { date: "May", value: 325 },
        { date: "Jun", value: 324 }
      ]
    },
    satisfaction: {
      current: 93,
      average: 89,
      trend: [
        { date: "Jan", value: 87 },
        { date: "Feb", value: 88 },
        { date: "Mar", value: 90 },
        { date: "Apr", value: 91 },
        { date: "May", value: 92 },
        { date: "Jun", value: 93 }
      ]
    },
    resolution: {
      current: 91,
      average: 85,
      trend: [
        { date: "Jan", value: 82 },
        { date: "Feb", value: 84 },
        { date: "Mar", value: 86 },
        { date: "Apr", value: 88 },
        { date: "May", value: 90 },
        { date: "Jun", value: 91 }
      ]
    },
    recentInteractions: [
      { id: "INT-1001", date: "2025-03-04", type: "Phone Call", duration: "4m 32s", status: "Resolved", satisfaction: 95 },
      { id: "INT-1002", date: "2025-03-04", type: "Live Chat", duration: "6m 15s", status: "Resolved", satisfaction: 90 },
      { id: "INT-1003", date: "2025-03-03", type: "Email", duration: "N/A", status: "Resolved", satisfaction: 92 },
      { id: "INT-1004", date: "2025-03-03", type: "Phone Call", duration: "7m 08s", status: "Escalated", satisfaction: 80 },
      { id: "INT-1005", date: "2025-03-02", type: "Live Chat", duration: "5m 47s", status: "Resolved", satisfaction: 94 }
    ]
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-16 w-16">
              <img src={mockAgent.avatar} alt={mockAgent.name} />
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{mockAgent.name}</h2>
              <p className="text-gray-500">{mockAgent.position}</p>
              <p className="text-gray-500">{mockAgent.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Average Handling Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.handlingTime.current}</div>
            <p className="text-xs text-gray-500">
              Avg: {mockMetrics.handlingTime.average}
            </p>
            <div className="h-20 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockMetrics.handlingTime.trend}>
                  <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Star className="mr-2 h-4 w-4" />
              Customer Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.satisfaction.current}%</div>
            <p className="text-xs text-gray-500">
              Avg: {mockMetrics.satisfaction.average}%
            </p>
            <div className="h-20 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockMetrics.satisfaction.trend}>
                  <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckSquare className="mr-2 h-4 w-4" />
              First Contact Resolution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.resolution.current}%</div>
            <p className="text-xs text-gray-500">
              Avg: {mockMetrics.resolution.average}%
            </p>
            <div className="h-20 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockMetrics.resolution.trend}>
                  <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[...Array(6)].map((_, i) => ({
                date: mockMetrics.handlingTime.trend[i].date,
                'Handling Time': mockMetrics.handlingTime.trend[i].value / 60,
                'Satisfaction': mockMetrics.satisfaction.trend[i].value,
                'Resolution': mockMetrics.resolution.trend[i].value
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="Handling Time" stroke="#10b981" activeDot={{ r: 8 }} name="Handling Time (mins)" />
                <Line yAxisId="right" type="monotone" dataKey="Satisfaction" stroke="#6366f1" name="Satisfaction (%)" />
                <Line yAxisId="right" type="monotone" dataKey="Resolution" stroke="#f59e0b" name="Resolution (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Interactions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Satisfaction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMetrics.recentInteractions.map((interaction) => (
                <TableRow key={interaction.id}>
                  <TableCell>{interaction.id}</TableCell>
                  <TableCell>{interaction.date}</TableCell>
                  <TableCell>{interaction.type}</TableCell>
                  <TableCell>{interaction.duration}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      interaction.status === 'Resolved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {interaction.status}
                    </span>
                  </TableCell>
                  <TableCell>{interaction.satisfaction}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentPerformanceDetails;
