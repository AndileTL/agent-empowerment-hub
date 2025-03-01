
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

const ShiftRoster = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Shift Roster</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-1">
          <h2 className="text-lg font-semibold mb-4">Select Date</h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </Card>
        
        <Card className="p-6 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Shifts for {date?.toLocaleDateString()}</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Shift Type</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>Morning</TableCell>
                <TableCell>8:00 AM</TableCell>
                <TableCell>4:00 PM</TableCell>
                <TableCell>Scheduled</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jane Smith</TableCell>
                <TableCell>Evening</TableCell>
                <TableCell>4:00 PM</TableCell>
                <TableCell>12:00 AM</TableCell>
                <TableCell>Scheduled</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default ShiftRoster;
