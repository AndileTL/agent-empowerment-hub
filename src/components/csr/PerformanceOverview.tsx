
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
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Actions</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Shift Type</TableHead>
                  <TableHead>Helpdesk Tickets</TableHead>
                  <TableHead>Calls</TableHead>
                  <TableHead>Live Chat</TableHead>
                  <TableHead>Support DNS Emails</TableHead>
                  <TableHead>Social Tickets</TableHead>
                  <TableHead>Billing Tickets</TableHead>
                  <TableHead>Walk-ins</TableHead>
                  <TableHead>Total Issues</TableHead>
                  <TableHead>Satisfaction Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats?.map((stat) => (
                  <TableRow key={stat.agent_id}>
                    <TableCell>
                      {editingId === stat.id ? (
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(stat)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>{stat.name || stat.email}</TableCell>
                    <TableCell>{stat.group}</TableCell>
                    <TableCell>{stat.shift_type}</TableCell>
                    <TableCell>
                      {editingId === stat.id ? (
                        <Input
                          type="number"
                          value={editedData.helpdesk_tickets}
                          onChange={(e) => setEditedData({
                            ...editedData,
                            helpdesk_tickets: parseInt(e.target.value)
                          })}
                          className="w-20"
                        />
                      ) : (
                        stat.helpdesk_tickets
                      )}
                    </TableCell>
                    <TableCell>{stat.calls}</TableCell>
                    <TableCell>{stat.live_chat}</TableCell>
                    <TableCell>{stat.support_dns_emails}</TableCell>
                    <TableCell>{stat.social_tickets}</TableCell>
                    <TableCell>{stat.billing_tickets}</TableCell>
                    <TableCell>{stat.walk_ins}</TableCell>
                    <TableCell>{stat.total_issues_handled}</TableCell>
                    <TableCell>N/A</TableCell>
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
