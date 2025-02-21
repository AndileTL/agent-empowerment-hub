
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Upload, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import * as XLSX from 'xlsx';

interface CSRStats {
  agent_id: string;
  email: string;
  total_calls: number;
  total_chats: number;
  total_tickets: number;
  average_handling_time: number;
  satisfaction_score: number;
  date: string;
}

const CSRStats = () => {
  const [startDate, setStartDate] = useState<string>(
    new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const { toast } = useToast();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['csr-stats', startDate, endDate],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('agent_tickets')
        .select('*')
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: false });

      if (error) throw error;

      // Aggregate stats by agent
      const aggregatedStats = data.reduce((acc: { [key: string]: any }, curr) => {
        if (!acc[curr.email]) {
          acc[curr.email] = {
            agent_id: curr.agent_id,
            email: curr.email,
            total_calls: 0,
            total_chats: 0,
            total_tickets: 0,
            total_handling_time: 0,
            count: 0
          };
        }

        acc[curr.email].total_calls += curr.calls || 0;
        acc[curr.email].total_chats += curr.live_chat || 0;
        acc[curr.email].total_tickets += (
          (curr.helpdesk_tickets || 0) +
          (curr.social_tickets || 0) +
          (curr.billing_tickets || 0)
        );
        acc[curr.email].count += 1;

        return acc;
      }, {});

      return Object.values(aggregatedStats).map((stat: any) => ({
        ...stat,
        average_handling_time: stat.total_handling_time / stat.count,
        satisfaction_score: Math.round(Math.random() * 20 + 80) // Placeholder for demo
      }));
    },
  });

  const handleExport = () => {
    if (!stats) return;

    const ws = XLSX.utils.json_to_sheet(stats);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CSR Stats");
    XLSX.writeFile(wb, `csr_stats_${startDate}_${endDate}.xlsx`);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Process and upload the data
        // Note: This is a placeholder. You would need to validate and transform the data
        toast({
          title: "Success",
          description: `Imported ${jsonData.length} records successfully`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to import file",
          variant: "destructive",
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CSR Statistics</h1>
            <p className="mt-2 text-gray-600">Monitor agent performance metrics</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <div className="relative">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleImport}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
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
                      <TableHead>Agent</TableHead>
                      <TableHead>Total Calls</TableHead>
                      <TableHead>Total Chats</TableHead>
                      <TableHead>Total Tickets</TableHead>
                      <TableHead>Avg. Handling Time</TableHead>
                      <TableHead>Satisfaction Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats?.map((stat) => (
                      <TableRow key={stat.agent_id}>
                        <TableCell>{stat.email}</TableCell>
                        <TableCell>{stat.total_calls}</TableCell>
                        <TableCell>{stat.total_chats}</TableCell>
                        <TableCell>{stat.total_tickets}</TableCell>
                        <TableCell>{stat.average_handling_time.toFixed(2)} min</TableCell>
                        <TableCell>{stat.satisfaction_score}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CSRStats;
