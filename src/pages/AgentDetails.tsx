import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCSRStats } from "@/hooks/useCSRStats";

const AgentDetails = () => {
  const { id } = useParams();
  const { data: agentStatsData } = useCSRStats({ agentId: id });
  const agentStats = agentStatsData?.[0]; // Get the first (and should be only) result

  // If no agent data is found, show a message
  if (!agentStats) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Card className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">Agent Not Found</h1>
            <p className="mt-2 text-gray-600">The requested agent could not be found.</p>
            <a href="/agents" className="mt-4 text-primary-600 hover:text-primary-700">
              Return to Agent Management
            </a>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // Mock data for performance trend - would be replaced with real data
  const performanceData = [
    { date: '2024-01', score: 85 },
    { date: '2024-02', score: 88 },
    { date: '2024-03', score: 86 },
    { date: '2024-04', score: 92 },
    { date: '2024-05', score: 90 }
  ];

  // Mock data for satisfaction trend - would be replaced with real data
  const satisfactionData = [
    { date: '2024-01', score: 90 },
    { date: '2024-02', score: 92 },
    { date: '2024-03', score: 91 },
    { date: '2024-04', score: 94 },
    { date: '2024-05', score: 95 }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <Card className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <img src="/placeholder.svg" alt={agentStats.email} />
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{agentStats.email}</h1>
              <p className="text-gray-600">Customer Support Agent</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total Calls</p>
                  <p className="text-xl font-semibold">{agentStats.total_calls}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Chats</p>
                  <p className="text-xl font-semibold">{agentStats.total_chats}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Tickets</p>
                  <p className="text-xl font-semibold">{agentStats.total_tickets}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Satisfaction Score</p>
                  <p className="text-xl font-semibold">{agentStats.satisfaction_score}%</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Performance Trend</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#10b981" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Customer Satisfaction Trend</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={satisfactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#6366f1" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Attendance Record</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-success-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-success-600">{agentStats.attendance.present}</p>
              <p className="text-sm text-success-700">Present Days</p>
            </div>
            <div className="bg-warning-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-warning-600">{agentStats.attendance.late}</p>
              <p className="text-sm text-warning-700">Late Days</p>
            </div>
            <div className="bg-error-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-error-600">{agentStats.attendance.absent}</p>
              <p className="text-sm text-error-700">Absent Days</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Attendance Rate</p>
            <div className="mt-2 h-2 rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-success-500"
                style={{ width: agentStats.attendance.rate }}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Certifications</h2>
          <div className="space-y-4">
            {agentStats.certifications.map((cert, index) => (
              <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{cert.name}</h3>
                    {cert.completedDate && (
                      <p className="text-sm text-gray-600">
                        Completed: {new Date(cert.completedDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    cert.status === 'completed' ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700'
                  }`}>
                    {cert.status === 'completed' ? 'Completed' : `${cert.progress}%`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Performance Notes</h2>
          <div className="space-y-4">
            {agentStats.performance.map((note, index) => (
              <div key={index} className={`p-4 rounded-lg ${
                note.type === 'merit' ? 'bg-success-50' : 'bg-error-50'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{note.description}</p>
                    <p className="text-sm text-gray-600">{new Date(note.date).toLocaleDateString()}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    note.type === 'merit' ? 'bg-success-100 text-success-700' : 'bg-error-100 text-error-700'
                  }`}>
                    {note.type === 'merit' ? 'Merit' : 'Demerit'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AgentDetails;
