
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KeyMetrics from "./KeyMetrics";
import CallReasonAnalysis from "./CallReasonAnalysis";
import TeamPerformance from "./TeamPerformance";
import ChannelPerformance from "./ChannelPerformance";
import RecentActivities from "./RecentActivities";
import SLAPerformance from "../insights/SLAPerformance";
import LiveSLAMonitoring from "../insights/LiveSLAMonitoring";
import { PerformanceMetrics, CallReasonItem, TeamData, ChannelData, ActivityItem, SLAData, ChatSLAMetrics, EmailSLAMetrics, MetricsData } from "@/types/dashboard";
import { Activity, TrendingUp } from "lucide-react";

interface DashboardProps {
  performanceMetrics: PerformanceMetrics;
  callReasonData: CallReasonItem[];
  teamPerformance: TeamData[];
  channelPerformance: ChannelData[];
  recentActivities: ActivityItem[];
  slaData: SLAData[];
  slaPieData: { name: string; value: number; color: string; }[];
  chatSlaMetrics: ChatSLAMetrics;
  emailSlaMetrics: EmailSLAMetrics;
  callCenterMetricsData: MetricsData[];
  timeFilter: string;
  agentFilter: string;
  chartType: string;
  insightsTab: string;
  mainTab: string;
  onTimeFilterChange: (filter: string) => void;
  onAgentFilterChange: (filter: string) => void;
  onChartTypeChange: (type: string) => void;
  onInsightsTabChange: (tab: string) => void;
  onMainTabChange: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  performanceMetrics,
  callReasonData,
  teamPerformance,
  channelPerformance,
  recentActivities,
  slaData,
  slaPieData,
  chatSlaMetrics,
  emailSlaMetrics,
  callCenterMetricsData,
  timeFilter,
  agentFilter,
  chartType,
  insightsTab,
  mainTab,
  onTimeFilterChange,
  onAgentFilterChange,
  onChartTypeChange,
  onInsightsTabChange,
  onMainTabChange
}) => {
  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Contact Center Dashboard</h1>
          <p className="text-gray-600">Welcome back, John Smith</p>
        </div>
        <div className="flex gap-4">
          <select 
            className="border rounded-md p-2"
            value={timeFilter}
            onChange={(e) => onTimeFilterChange(e.target.value)}
          >
            <option>Last Week</option>
            <option>Last Month</option>
            <option>Last Quarter</option>
          </select>
          <select
            className="border rounded-md p-2"
            value={agentFilter}
            onChange={(e) => onAgentFilterChange(e.target.value)}
          >
            <option>All Agents</option>
            <option>Team Alpha</option>
            <option>Team Beta</option>
            <option>Team Gamma</option>
          </select>
        </div>
      </div>

      <Tabs value={mainTab} onValueChange={onMainTabChange} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Main Dashboard</TabsTrigger>
          <TabsTrigger value="insights">Contact Center Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <KeyMetrics metrics={performanceMetrics} />
          <CallReasonAnalysis 
            data={callReasonData} 
            chartType={chartType} 
            onChartTypeChange={onChartTypeChange} 
          />
          <TeamPerformance data={teamPerformance} />
          <ChannelPerformance data={channelPerformance} />
          <RecentActivities activities={recentActivities} />
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="mb-4">
            <Tabs value={insightsTab} onValueChange={onInsightsTabChange}>
              <TabsList>
                <TabsTrigger value="sla">
                  <Activity className="w-4 h-4 mr-2" />
                  SLA & Call Answer Rate
                </TabsTrigger>
                <TabsTrigger value="live">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Live SLA Monitoring
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="sla">
                <SLAPerformance 
                  slaData={slaData} 
                  slaPieData={slaPieData} 
                  callCenterMetricsData={callCenterMetricsData} 
                />
              </TabsContent>
              
              <TabsContent value="live">
                <LiveSLAMonitoring 
                  chatSlaMetrics={chatSlaMetrics} 
                  emailSlaMetrics={emailSlaMetrics} 
                />
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
