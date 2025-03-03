
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChartLine, TableIcon, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SLAData {
  date: string;
  phone: number;
  email: number;
  chat: number;
  target: number;
}

interface SLAViewerProps {
  slaData: SLAData[];
}

const SLAViewer = ({ slaData }: SLAViewerProps) => {
  const [viewType, setViewType] = useState("chart");
  const [serviceType, setServiceType] = useState("all");
  const [slaType, setSLAType] = useState("response");

  // Mock CAR data
  const carData = [
    {
      id: "CAR-001",
      ticketRef: "INC12345",
      issue: "Extended chat wait times",
      rootCause: "Understaffing during peak hours",
      actions: "Adjusted workforce scheduling, added flexible shifts",
      responsible: "Team Alpha",
      status: "Closed"
    },
    {
      id: "CAR-002",
      ticketRef: "INC12350",
      issue: "Email response SLA breaches",
      rootCause: "Email routing configuration error",
      actions: "Reconfigured routing rules, implemented alert system",
      responsible: "IT Support",
      status: "Open"
    },
    {
      id: "CAR-003",
      ticketRef: "INC12355",
      issue: "Call abandonment rate increase",
      rootCause: "IVR menu too complex",
      actions: "Simplified IVR options, added callback feature",
      responsible: "Team Beta",
      status: "Pending"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold">SLA & CAR Viewer</h2>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Oct 10 - Oct 15, 2023</span>
          </div>
          
          <Select value={serviceType} onValueChange={setServiceType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Service Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="chat">Live Chat</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={slaType} onValueChange={setSLAType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="SLA Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="response">Response Time</SelectItem>
              <SelectItem value="resolution">Resolution Time</SelectItem>
              <SelectItem value="satisfaction">Satisfaction Rate</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-2">
            <Button 
              variant={viewType === "chart" ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewType("chart")}
              className="flex items-center gap-1"
            >
              <ChartLine className="h-4 w-4" />
              <span>Chart</span>
            </Button>
            <Button 
              variant={viewType === "table" ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewType("table")}
              className="flex items-center gap-1"
            >
              <TableIcon className="h-4 w-4" />
              <span>Table</span>
            </Button>
          </div>
          
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* SLA Performance Chart/Table */}
      <Card>
        <CardHeader>
          <CardTitle>SLA Performance</CardTitle>
        </CardHeader>
        <CardContent>
          {viewType === "chart" ? (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={slaData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                    strokeDasharray="5 5"
                    name="Target"
                  />
                  {(serviceType === "all" || serviceType === "phone") && (
                    <Line type="monotone" dataKey="phone" stroke="#8884d8" name="Phone" />
                  )}
                  {(serviceType === "all" || serviceType === "email") && (
                    <Line type="monotone" dataKey="email" stroke="#82ca9d" name="Email" />
                  )}
                  {(serviceType === "all" || serviceType === "chat") && (
                    <Line type="monotone" dataKey="chat" stroke="#ffc658" name="Chat" />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    {(serviceType === "all" || serviceType === "phone") && <TableHead>Phone</TableHead>}
                    {(serviceType === "all" || serviceType === "email") && <TableHead>Email</TableHead>}
                    {(serviceType === "all" || serviceType === "chat") && <TableHead>Chat</TableHead>}
                    <TableHead>Target</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {slaData.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{entry.date}</TableCell>
                      {(serviceType === "all" || serviceType === "phone") && (
                        <TableCell className={entry.phone >= entry.target ? "text-green-600" : "text-red-600"}>
                          {entry.phone}%
                        </TableCell>
                      )}
                      {(serviceType === "all" || serviceType === "email") && (
                        <TableCell className={entry.email >= entry.target ? "text-green-600" : "text-red-600"}>
                          {entry.email}%
                        </TableCell>
                      )}
                      {(serviceType === "all" || serviceType === "chat") && (
                        <TableCell className={entry.chat >= entry.target ? "text-green-600" : "text-red-600"}>
                          {entry.chat}%
                        </TableCell>
                      )}
                      <TableCell>{entry.target}%</TableCell>
                      <TableCell>
                        {((serviceType === "phone" && entry.phone >= entry.target) ||
                          (serviceType === "email" && entry.email >= entry.target) ||
                          (serviceType === "chat" && entry.chat >= entry.target) ||
                          (serviceType === "all" && (entry.phone + entry.email + entry.chat) / 3 >= entry.target)) ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Met
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Missed
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* CAR Table */}
      <Card>
        <CardHeader>
          <CardTitle>Corrective Action Reports (CAR)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>CAR ID</TableHead>
                  <TableHead>Ticket Ref</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Root Cause</TableHead>
                  <TableHead>Actions Taken</TableHead>
                  <TableHead>Responsible</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {carData.map((car) => (
                  <TableRow key={car.id}>
                    <TableCell className="font-medium">{car.id}</TableCell>
                    <TableCell>{car.ticketRef}</TableCell>
                    <TableCell>{car.issue}</TableCell>
                    <TableCell>{car.rootCause}</TableCell>
                    <TableCell>{car.actions}</TableCell>
                    <TableCell>{car.responsible}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${car.status === 'Open' ? 'bg-blue-100 text-blue-800' : 
                          car.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'}`}>
                        {car.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex justify-end">
            <Button>
              Create New CAR
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SLAViewer;
