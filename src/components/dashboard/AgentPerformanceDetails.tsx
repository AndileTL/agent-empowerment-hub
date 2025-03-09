
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CSRStatsData } from "@/hooks/useCSRStats";

interface AgentPerformanceDetailsProps {
  agents?: CSRStatsData[];
}

const AgentPerformanceDetails = ({ agents = [] }: AgentPerformanceDetailsProps) => {
  // Process agent data for chart display
  const chartData = agents.map(agent => ({
    name: agent.name || agent.email.split('@')[0],
    tickets: agent.helpdesk_tickets || 0,
    calls: agent.calls || 0,
    chats: agent.live_chat || 0,
    total: agent.total_issues_handled || 0
  })).slice(0, 10); // Limit to top 10 agents for better visualization

  return (
    <div className="space-y-8">
      {chartData.length > 0 ? (
        <>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tickets" fill="#8884d8" name="Tickets" />
                <Bar dataKey="calls" fill="#82ca9d" name="Calls" />
                <Bar dataKey="chats" fill="#ffc658" name="Chats" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead className="text-right">Tickets</TableHead>
                  <TableHead className="text-right">Calls</TableHead>
                  <TableHead className="text-right">Chats</TableHead>
                  <TableHead className="text-right">Total Issues</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow key={agent.agent_id}>
                    <TableCell className="font-medium">
                      {agent.name || agent.email.split('@')[0]}
                    </TableCell>
                    <TableCell className="text-right">{agent.helpdesk_tickets || 0}</TableCell>
                    <TableCell className="text-right">{agent.calls || 0}</TableCell>
                    <TableCell className="text-right">{agent.live_chat || 0}</TableCell>
                    <TableCell className="text-right">{agent.total_issues_handled || 0}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center p-12 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No agent data available for the selected date range.</p>
        </div>
      )}
    </div>
  );
};

export default AgentPerformanceDetails;
