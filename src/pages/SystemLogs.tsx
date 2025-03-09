
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  component: string;
}

const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    level: 'error',
    message: 'Failed to fetch agent data: Network error',
    component: 'AgentManagement'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    level: 'warning',
    message: 'Slow response time from analytics API',
    component: 'Dashboard'
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    level: 'info',
    message: 'User session started',
    component: 'Authentication'
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    level: 'info',
    message: 'Data successfully synced with backend',
    component: 'DataSync'
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    level: 'error',
    message: 'Unable to update agent profile: Validation error',
    component: 'ProfileManager'
  }
];

const SystemLogs = () => {
  const [logs] = useState<LogEntry[]>(mockLogs);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Logs</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Monitor system errors and activities
          </p>
        </div>

        <Card className="overflow-hidden border border-gray-200 dark:border-gray-700">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead className="w-[100px]">Level</TableHead>
                <TableHead className="w-[150px]">Component</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">
                    {new Date(log.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      log.level === 'error' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                        : log.level === 'warning'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}>
                      {log.level}
                    </span>
                  </TableCell>
                  <TableCell>{log.component}</TableCell>
                  <TableCell>{log.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SystemLogs;
