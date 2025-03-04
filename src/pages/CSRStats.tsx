
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';
import { useCSRStats } from "@/hooks/useCSRStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useShiftRoster } from "@/hooks/useShiftRoster";
import FilterCard from "@/components/csr/FilterCard";
import PerformanceOverview from "@/components/csr/PerformanceOverview";
import ShiftRoster from "@/components/csr/ShiftRoster";

const CSRStats = () => {
  const [startDate, setStartDate] = useState<string>(
    new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const { toast } = useToast();

  const { data: stats, isLoading, mutate: updateStats } = useCSRStats({ startDate, endDate });
  const { data: shiftRoster, createShift, updateShift } = useShiftRoster();

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
        <div className="header-gradient mb-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold">Greetings!</h1>
            <p className="mt-2 text-gray-100 max-w-2xl">
              Follow the setup wizard that will guide you through the remaining steps to your first sale
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">CSR Statistics</h1>
            <p className="mt-1 text-gray-600">Monitor agent performance metrics and manage shifts</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleExport} variant="outline" className="border-gray-300 bg-white hover:bg-gray-50">
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
              <Button variant="outline" className="border-gray-300 bg-white hover:bg-gray-50">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="stats" className="mt-6">
          <TabsList className="mb-4 bg-white border border-gray-200">
            <TabsTrigger value="stats" className="data-[state=active]:bg-primary-500 data-[state=active]:text-white">
              Performance Statistics
            </TabsTrigger>
            <TabsTrigger value="shifts" className="data-[state=active]:bg-primary-500 data-[state=active]:text-white">
              Shift Roster
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-6">
            <FilterCard 
              startDate={startDate} 
              endDate={endDate} 
              setStartDate={setStartDate} 
              setEndDate={setEndDate} 
            />

            <PerformanceOverview 
              stats={stats} 
              isLoading={isLoading} 
              updateStats={updateStats} 
            />
          </TabsContent>

          <TabsContent value="shifts" className="space-y-6">
            <ShiftRoster 
              stats={stats} 
              shiftRoster={shiftRoster} 
              createShift={createShift} 
              updateShift={updateShift} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CSRStats;
