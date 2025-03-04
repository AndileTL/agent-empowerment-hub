
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CSRStatsData } from "@/hooks/useCSRStats";
import { useToast } from "@/hooks/use-toast";

interface ShiftRosterProps {
  stats: CSRStatsData[] | undefined;
  shiftRoster: any[] | undefined;
  createShift: (data: any) => Promise<any>;
  updateShift: (id: string, data: any) => Promise<any>;
}

const ShiftRoster = ({ stats, shiftRoster, createShift, updateShift }: ShiftRosterProps) => {
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [selectedShiftType, setSelectedShiftType] = useState<string>("");
  const { toast } = useToast();

  const handleAssignShift = async () => {
    if (!selectedAgent || !selectedShiftType) {
      toast({
        title: "Error",
        description: "Please select both an agent and shift type",
        variant: "destructive",
      });
      return;
    }

    try {
      const agent = stats?.find(stat => stat.agent_id === selectedAgent);
      if (!agent) return;

      await createShift({
        agent_id: selectedAgent,
        email: agent.email,
        shift_type: selectedShiftType,
        shift_status: "active",
        date: new Date().toISOString().split('T')[0]
      });

      setSelectedAgent("");
      setSelectedShiftType("");

      toast({
        title: "Success",
        description: "Shift assigned successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign shift",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shift Roster Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Agent</label>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger>
                  <SelectValue placeholder="Select agent" />
                </SelectTrigger>
                <SelectContent>
                  {stats?.map((stat) => (
                    <SelectItem key={stat.agent_id} value={stat.agent_id}>
                      {stat.name || stat.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Shift Type</label>
              <Select value={selectedShiftType} onValueChange={setSelectedShiftType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select shift type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="night">Night</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="self-end" onClick={handleAssignShift}>Assign Shift</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Current Shift</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shiftRoster?.map((shift: any) => (
                <TableRow key={shift.id}>
                  <TableCell>{shift.email}</TableCell>
                  <TableCell>{shift.shift_type}</TableCell>
                  <TableCell>{shift.shift_status}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShiftRoster;
