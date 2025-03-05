
import React from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";

interface TeamData {
  name: string;
  aht: string;
  csat: string;
  fcr: string;
  sla: string;
  id?: string; // Optional ID for linking to agent details
}

interface TeamPerformanceProps {
  data: TeamData[];
}

const TeamPerformance: React.FC<TeamPerformanceProps> = ({ data }) => {
  return (
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
            {data.map((team, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{team.name}</TableCell>
                <TableCell>{team.aht}</TableCell>
                <TableCell>{team.csat}</TableCell>
                <TableCell>{team.fcr}</TableCell>
                <TableCell>{team.sla}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:underline">View Details</button>
                    {team.id && (
                      <Link to={`/agent-performance/${team.id}`} className="text-green-600 hover:underline">
                        Performance
                      </Link>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
};

export default TeamPerformance;
