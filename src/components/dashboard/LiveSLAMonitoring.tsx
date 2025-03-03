
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ThumbsUp, MessageSquare, Mail, Phone, Users, RefreshCcw } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface LiveChatMetrics {
  waitTime: string;
  handleTime: string;
  slaMet: string;
  activeChats: number;
  waitingChats: number;
}

interface EmailMetrics {
  responseTime: string;
  slaMet: string;
  inQueue: number;
  resolved: number;
}

interface LiveSLAMonitoringProps {
  liveChatMetrics: LiveChatMetrics;
  emailMetrics: EmailMetrics;
}

const LiveSLAMonitoring = ({ liveChatMetrics, emailMetrics }: LiveSLAMonitoringProps) => {
  // Mock real-time data for charts
  const chatTimeData = [
    { time: "09:00", wait: 35, handle: 480 },
    { time: "10:00", wait: 42, handle: 510 },
    { time: "11:00", wait: 50, handle: 495 },
    { time: "12:00", wait: 65, handle: 520 },
    { time: "13:00", wait: 45, handle: 500 },
    { time: "14:00", wait: 48, handle: 505 },
    { time: "15:00", wait: 43, handle: 490 },
  ];

  const emailTimeData = [
    { time: "09:00", response: 180 },
    { time: "10:00", response: 195 },
    { time: "11:00", response: 210 },
    { time: "12:00", response: 240 },
    { time: "13:00", response: 225 },
    { time: "14:00", response: 200 },
    { time: "15:00", response: 190 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Live SLA Monitoring</h2>
        <Button variant="outline" className="flex items-center gap-2">
          <RefreshCcw className="h-4 w-4" />
          <span>Refresh Data</span>
        </Button>
      </div>

      {/* Live Chat SLA Section */}
      <section>
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-500" />
          Live Chat Performance
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Clock className="h-8 w-8 text-blue-500 mb-2" />
                  <p className="text-sm text-gray-500">Avg. Wait Time</p>
                  <p className="text-2xl font-bold">{liveChatMetrics.waitTime}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Clock className="h-8 w-8 text-indigo-500 mb-2" />
                  <p className="text-sm text-gray-500">Avg. Handle Time</p>
                  <p className="text-2xl font-bold">{liveChatMetrics.handleTime}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <ThumbsUp className="h-8 w-8 text-green-500 mb-2" />
                  <p className="text-sm text-gray-500">SLA Met</p>
                  <p className="text-2xl font-bold">{liveChatMetrics.slaMet}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Users className="h-8 w-8 text-purple-500 mb-2" />
                  <p className="text-sm text-gray-500">Active / Waiting</p>
                  <p className="text-2xl font-bold">{liveChatMetrics.activeChats} / {liveChatMetrics.waitingChats}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Wait & Handle Time Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chatTimeData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="wait" 
                      stackId="1"
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      name="Wait Time (s)"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="handle" 
                      stackId="2"
                      stroke="#82ca9d" 
                      fill="#82ca9d" 
                      name="Handle Time (s)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Email SLA Section */}
      <section>
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Mail className="h-5 w-5 text-blue-500" />
          Email Performance
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Clock className="h-8 w-8 text-blue-500 mb-2" />
                  <p className="text-sm text-gray-500">Avg. Response Time</p>
                  <p className="text-2xl font-bold">{emailMetrics.responseTime}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <ThumbsUp className="h-8 w-8 text-green-500 mb-2" />
                  <p className="text-sm text-gray-500">SLA Met</p>
                  <p className="text-2xl font-bold">{emailMetrics.slaMet}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Mail className="h-8 w-8 text-orange-500 mb-2" />
                  <p className="text-sm text-gray-500">In Queue</p>
                  <p className="text-2xl font-bold">{emailMetrics.inQueue}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <ThumbsUp className="h-8 w-8 text-purple-500 mb-2" />
                  <p className="text-sm text-gray-500">Resolved Today</p>
                  <p className="text-2xl font-bold">{emailMetrics.resolved}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Response Time Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={emailTimeData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="response" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      name="Response Time (s)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Form Buttons */}
      <div className="flex flex-wrap justify-end gap-3 mt-6">
        <Button variant="outline">
          Configure SLA Settings
        </Button>
        <Button>
          Add Outage/System Issue
        </Button>
        <Button>
          Create New CAR
        </Button>
      </div>
    </div>
  );
};

export default LiveSLAMonitoring;
