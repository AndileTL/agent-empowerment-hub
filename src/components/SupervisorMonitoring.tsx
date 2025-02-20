
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Upload, MonitorCheck } from "lucide-react";

interface MonitoringSettings {
  id: string;
  agent_id: string;
  monitor_frequency: string;
  last_monitored_at: string;
}

const SupervisorMonitoring = () => {
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("weekly");

  const { data: settings } = useQuery({
    queryKey: ['monitoring-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('monitoring_settings')
        .select('*');
      
      if (error) throw error;
      return data as MonitoringSettings[];
    },
  });

  const handleUpdateSettings = async () => {
    if (!selectedAgent) return;

    const { error } = await supabase
      .from('monitoring_settings')
      .upsert([
        {
          agent_id: selectedAgent,
          supervisor_id: '123', // Replace with actual supervisor ID
          monitor_frequency: frequency,
        }
      ]);

    if (error) {
      console.error('Error updating monitoring settings:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monitoring Settings</CardTitle>
        <CardDescription>Configure agent monitoring preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Agent</label>
          <Select
            value={selectedAgent}
            onValueChange={setSelectedAgent}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Agent 1</SelectItem>
              <SelectItem value="2">Agent 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Monitoring Frequency</label>
          <Select
            value={frequency}
            onValueChange={setFrequency}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Upload Calls</label>
          <div className="flex gap-4">
            <Input type="file" accept="audio/*" />
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>
        </div>

        <Button onClick={handleUpdateSettings} className="w-full">
          <MonitorCheck className="mr-2 h-4 w-4" />
          Update Monitoring Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default SupervisorMonitoring;
