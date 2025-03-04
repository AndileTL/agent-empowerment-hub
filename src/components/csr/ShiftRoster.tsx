
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Plus } from "lucide-react";
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
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Shift Roster Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Agent</label>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger className="border-gray-300 bg-white">
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
              <label className="text-sm font-medium text-gray-700">Shift Type</label>
              <Select value={selectedShiftType} onValueChange={setSelectedShiftType}>
                <SelectTrigger className="border-gray-300 bg-white">
                  <SelectValue placeholder="Select shift type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="night">Night</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                className="bg-primary-500 hover:bg-primary-600 text-white w-full" 
                onClick={handleAssignShift}
              >
                <Plus className="h-4 w-4 mr-2" /> Assign Shift
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto -mx-6">
            <Table className="w-full border-collapse">
              <TableHeader className="bg-gray-50">
                <TableRow className="border-b border-gray-200">
                  <TableHead className="py-3 px-4 text-left font-medium text-gray-600">Agent</TableHead>
                  <TableHead className="py-3 px-4 text-left font-medium text-gray-600">Current Shift</TableHead>
                  <TableHead className="py-3 px-4 text-left font-medium text-gray-600">Status</TableHead>
                  <TableHead className="py-3 px-4 text-left font-medium text-gray-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shiftRoster?.map((shift: any) => (
                  <TableRow key={shift.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <TableCell className="py-3 px-4 font-medium">{shift.email}</TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="capitalize">{shift.shift_type}</span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        shift.shift_status === 'active' 
                          ? 'bg-success-100 text-success-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {shift.shift_status}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <Edit2 className="h-4 w-4 text-gray-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {(!shiftRoster || shiftRoster.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={4} className="py-6 text-center text-gray-500">
                      No shifts assigned yet. Use the form above to assign shifts.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShiftRoster;
