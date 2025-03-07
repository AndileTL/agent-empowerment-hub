
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

  const handleInputChange = (field: string, value: string | number) => {
    // Convert string to number for numeric fields
    const numericValue = typeof value === 'string' && !isNaN(Number(value)) 
      ? parseInt(value, 10) 
      : value;
    
    setEditedData({
      ...editedData,
      [field]: numericValue
    });
  };

  return (
    <Card className="shadow-sm border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium dark:text-white">Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4">
            <Table className="w-full border-collapse">
              <TableHeader className="bg-gray-50 dark:bg-gray-700">
                <TableRow className="border-b border-gray-200 dark:border-gray-600">
                  <TableHead className="py-3 px-3 text-left font-medium text-gray-600 dark:text-gray-300">Actions</TableHead>
                  <TableHead className="py-3 px-3 text-left font-medium text-gray-600 dark:text-gray-300">Agent</TableHead>
                  <TableHead className="py-3 px-3 text-left font-medium text-gray-600 dark:text-gray-300">Group</TableHead>
                  <TableHead className="py-3 px-3 text-left font-medium text-gray-600 dark:text-gray-300">Shift Type</TableHead>
                  <TableHead className="py-3 px-3 text-left font-medium text-gray-600 dark:text-gray-300">Helpdesk</TableHead>
                  <TableHead className="py-3 px-3 text-left font-medium text-gray-600 dark:text-gray-300">Calls</TableHead>
                  <TableHead className="py-3 px-3 text-left font-medium text-gray-600 dark:text-gray-300">Chat</TableHead>
                  <TableHead className="py-3 px-3 text-left font-medium text-gray-600 dark:text-gray-300">Emails</TableHead>
                  <TableHead className="py-3 px-3 text-left font-medium text-gray-600 dark:text-gray-300">Social</TableHead>
                  <TableHead className="py-3 px-3 text-left font-medium text-gray-600 dark:text-gray-300">Billing</TableHead>
                  <TableHead className="py-3 px-3 text-left font-medium text-gray-600 dark:text-gray-300">Walk-ins</TableHead>
                  <TableHead className="py-3 px-3 text-left font-medium text-gray-600 dark:text-gray-300">Total</TableHead>
                  <TableHead className="py-3 px-3 text-left font-medium text-gray-600 dark:text-gray-300">Satisfaction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats?.map((stat) => (
                  <TableRow key={stat.agent_id} className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <TableCell className="py-2 px-3">
                      {editingId === stat.id ? (
                        <Button size="sm" onClick={handleSave} className="bg-primary-500 hover:bg-primary-600 text-white">
                          <Save className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(stat)}>
                          <Edit2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="py-2 px-3 font-medium dark:text-white">{stat.name || stat.email}</TableCell>
                    <TableCell className="py-2 px-3 dark:text-gray-300">{stat.group}</TableCell>
                    <TableCell className="py-2 px-3 dark:text-gray-300">{stat.shift_type}</TableCell>
                    <TableCell className="py-2 px-3 dark:text-gray-300">
                      {editingId === stat.id ? (
                        <Input
                          type="number"
                          value={editedData.helpdesk_tickets}
                          onChange={(e) => handleInputChange('helpdesk_tickets', e.target.value)}
                          className="w-16 h-8 text-sm dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        stat.helpdesk_tickets
                      )}
                    </TableCell>
                    <TableCell className="py-2 px-3 dark:text-gray-300">
                      {editingId === stat.id ? (
                        <Input
                          type="number"
                          value={editedData.calls}
                          onChange={(e) => handleInputChange('calls', e.target.value)}
                          className="w-16 h-8 text-sm dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        stat.calls
                      )}
                    </TableCell>
                    <TableCell className="py-2 px-3 dark:text-gray-300">
                      {editingId === stat.id ? (
                        <Input
                          type="number"
                          value={editedData.live_chat}
                          onChange={(e) => handleInputChange('live_chat', e.target.value)}
                          className="w-16 h-8 text-sm dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        stat.live_chat
                      )}
                    </TableCell>
                    <TableCell className="py-2 px-3 dark:text-gray-300">
                      {editingId === stat.id ? (
                        <Input
                          type="number"
                          value={editedData.support_dns_emails}
                          onChange={(e) => handleInputChange('support_dns_emails', e.target.value)}
                          className="w-16 h-8 text-sm dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        stat.support_dns_emails
                      )}
                    </TableCell>
                    <TableCell className="py-2 px-3 dark:text-gray-300">
                      {editingId === stat.id ? (
                        <Input
                          type="number"
                          value={editedData.social_tickets}
                          onChange={(e) => handleInputChange('social_tickets', e.target.value)}
                          className="w-16 h-8 text-sm dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        stat.social_tickets
                      )}
                    </TableCell>
                    <TableCell className="py-2 px-3 dark:text-gray-300">
                      {editingId === stat.id ? (
                        <Input
                          type="number"
                          value={editedData.billing_tickets}
                          onChange={(e) => handleInputChange('billing_tickets', e.target.value)}
                          className="w-16 h-8 text-sm dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        stat.billing_tickets
                      )}
                    </TableCell>
                    <TableCell className="py-2 px-3 dark:text-gray-300">
                      {editingId === stat.id ? (
                        <Input
                          type="number"
                          value={editedData.walk_ins}
                          onChange={(e) => handleInputChange('walk_ins', e.target.value)}
                          className="w-16 h-8 text-sm dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        stat.walk_ins
                      )}
                    </TableCell>
                    <TableCell className="py-2 px-3 font-medium dark:text-white">{stat.total_issues_handled}</TableCell>
                    <TableCell className="py-2 px-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200">95%</span>
                    </TableCell>
                  </TableRow>
                ))}
                {(!stats || stats.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={13} className="py-4 text-center text-gray-500 dark:text-gray-400">
                      No statistics available for the selected period.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceOverview;
