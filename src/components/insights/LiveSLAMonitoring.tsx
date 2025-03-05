
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageSquare, ExternalLink, Phone } from "lucide-react";

interface ChatSLAMetrics {
  avgWaitTime: string;
  avgHandleTime: string;
  meetingSla: string;
  activeChats: number;
  waitingChats: number;
}

interface EmailSLAMetrics {
  avgResponseTime: string;
  meetingSla: string;
  inQueue: number;
  resolved: number;
}

interface LiveSLAMonitoringProps {
  chatSlaMetrics: ChatSLAMetrics;
  emailSlaMetrics: EmailSLAMetrics;
}

const LiveSLAMonitoring: React.FC<LiveSLAMonitoringProps> = ({ 
  chatSlaMetrics, 
  emailSlaMetrics 
}) => {
  return (
    <div className="mt-4">
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
    </div>
  );
};

export default LiveSLAMonitoring;
