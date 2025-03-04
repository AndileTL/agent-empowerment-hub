
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CSRStatsData } from "@/hooks/useCSRStats";
import { useToast } from "@/hooks/use-toast";

interface PerformanceOverviewProps {
  stats: CSRStatsData[] | undefined;
  isLoading: boolean;
  updateStats: (data: any) => Promise<any>;
}

const PerformanceOverview = ({ stats, isLoading, updateStats }: PerformanceOverviewProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<any>(null);
  const { toast } = useToast();

  const handleEdit = (stat: any) => {
    setEditingId(stat.id);
    setEditedData({ ...stat });
  };

  const handleSave = async () => {
    try {
      if (!editedData) return;
      
      await updateStats({
        ...editedData,
        date: new Date().toISOString().split('T')[0]
      });

      setEditingId(null);
      setEditedData(null);
      
      toast({
        title: "Success",
        description: "Statistics updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update statistics",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-6">
            <Table className="w-full border-collapse">
              <TableHeader className="bg-gray-50">
                <TableRow className="border-b border-gray-200">
                  <TableHead className="py-3 px-4 text-left font-medium text-gray-600">Actions</TableHead>
                  <TableHead className="py-3 px-4 text-left font-medium text-gray-600">Agent</TableHead>
                  <TableHead className="py-3 px-4 text-left font-medium text-gray-600">Group</TableHead>
                  <TableHead className="py-3 px-4 text-left font-medium text-gray-600">Shift Type</TableHead>
                  <TableHead className="py-3 px-4 text-left font-medium text-gray-600">Helpdesk Tickets</TableHead>
                  <TableHead className="py-3 px-4 text-left font-medium text-gray-600">Calls</TableHead>
                  <TableHead className="py-3 px-4 text-left font-medium text-gray-600">Live Chat</TableHead>
                  <TableHead className="py-3 px-4 text-left font-medium text-gray-600">Support Emails</TableHead>
                  <TableHead className="py-3 px-4 text-left font-medium text-gray-600">Social Tickets</TableHead>
                  <TableHead className="py-3 px-4 text-left font-medium text-gray-600">Billing Tickets</TableHead>
                  <TableHead className="py-3 px-4 text-left font-medium text-gray-600">Walk-ins</TableHead>
                  <TableHead className="py-3 px-4 text-left font-medium text-gray-600">Total Issues</TableHead>
                  <TableHead className="py-3 px-4 text-left font-medium text-gray-600">Satisfaction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats?.map((stat) => (
                  <TableRow key={stat.agent_id} className="border-b border-gray-200 hover:bg-gray-50">
                    <TableCell className="py-3 px-4">
                      {editingId === stat.id ? (
                        <Button size="sm" onClick={handleSave} className="bg-primary-500 hover:bg-primary-600 text-white">
                          <Save className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(stat)}>
                          <Edit2 className="h-4 w-4 text-gray-500" />
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="py-3 px-4 font-medium">{stat.name || stat.email}</TableCell>
                    <TableCell className="py-3 px-4">{stat.group}</TableCell>
                    <TableCell className="py-3 px-4">{stat.shift_type}</TableCell>
                    <TableCell className="py-3 px-4">
                      {editingId === stat.id ? (
                        <Input
                          type="number"
                          value={editedData.helpdesk_tickets}
                          onChange={(e) => setEditedData({
                            ...editedData,
                            helpdesk_tickets: parseInt(e.target.value)
                          })}
                          className="w-20 h-8 text-sm"
                        />
                      ) : (
                        stat.helpdesk_tickets
                      )}
                    </TableCell>
                    <TableCell className="py-3 px-4">{stat.calls}</TableCell>
                    <TableCell className="py-3 px-4">{stat.live_chat}</TableCell>
                    <TableCell className="py-3 px-4">{stat.support_dns_emails}</TableCell>
                    <TableCell className="py-3 px-4">{stat.social_tickets}</TableCell>
                    <TableCell className="py-3 px-4">{stat.billing_tickets}</TableCell>
                    <TableCell className="py-3 px-4">{stat.walk_ins}</TableCell>
                    <TableCell className="py-3 px-4 font-medium">{stat.total_issues_handled}</TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-800">95%</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceOverview;
