
import React from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ChannelData {
  channel: string;
  icon: React.ReactNode;
  aht: string;
  csat: string;
  fcr: string;
  sla: string;
  volume: string;
  topPerformer: string;
}

interface ChannelPerformanceProps {
  data: ChannelData[];
}

const ChannelPerformance: React.FC<ChannelPerformanceProps> = ({ data }) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Channel Performance</h2>
      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Channel</TableHead>
              <TableHead>Average Handling Time</TableHead>
              <TableHead>Customer Satisfaction</TableHead>
              <TableHead>First Call Resolution</TableHead>
              <TableHead>Service Level Agreement</TableHead>
              <TableHead>Call Volume</TableHead>
              <TableHead>Top Performer Agent</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((channel, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {channel.icon}
                    {channel.channel}
                  </div>
                </TableCell>
                <TableCell>{channel.aht}</TableCell>
                <TableCell>{channel.csat}</TableCell>
                <TableCell>{channel.fcr}</TableCell>
                <TableCell>{channel.sla}</TableCell>
                <TableCell>{channel.volume}</TableCell>
                <TableCell>{channel.topPerformer}</TableCell>
                <TableCell>
                  <button className="text-blue-600 hover:underline">View Details</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
};

export default ChannelPerformance;
