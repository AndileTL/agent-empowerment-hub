
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useCSRStats } from "@/hooks/useCSRStats";
import Dashboard from "@/components/dashboard/Dashboard";
import { useDashboardState } from "@/hooks/useDashboardState";
import {
  getPerformanceMetrics,
  getCallReasonData,
  getTeamPerformance,
  getChannelPerformance,
  getRecentActivities,
  getSLAData,
  getChatSLAMetrics,
  getEmailSLAMetrics,
  getSLAPieData,
  getCallCenterMetricsData
} from "@/data/dashboardMockData";

const Home = () => {
  const { data: csrStats } = useCSRStats();
  const {
    timeFilter,
    agentFilter,
    chartType,
    insightsTab,
    mainTab,
    setTimeFilter,
    setAgentFilter,
    setChartType,
    setInsightsTab,
    setMainTab
  } = useDashboardState();
  
  const performanceMetrics = getPerformanceMetrics();
  const callReasonData = getCallReasonData();
  const teamPerformance = getTeamPerformance();
  const channelPerformance = getChannelPerformance();
  const recentActivities = getRecentActivities();
  const slaData = getSLAData();
  const chatSlaMetrics = getChatSLAMetrics();
  const emailSlaMetrics = getEmailSLAMetrics();
  const slaPieData = getSLAPieData();
  const callCenterMetricsData = getCallCenterMetricsData();

  return (
    <DashboardLayout>
      <Dashboard 
        performanceMetrics={performanceMetrics}
        callReasonData={callReasonData}
        teamPerformance={teamPerformance}
        channelPerformance={channelPerformance}
        recentActivities={recentActivities}
        slaData={slaData}
        slaPieData={slaPieData}
        chatSlaMetrics={chatSlaMetrics}
        emailSlaMetrics={emailSlaMetrics}
        callCenterMetricsData={callCenterMetricsData}
        timeFilter={timeFilter}
        agentFilter={agentFilter}
        chartType={chartType}
        insightsTab={insightsTab}
        mainTab={mainTab}
        onTimeFilterChange={setTimeFilter}
        onAgentFilterChange={setAgentFilter}
        onChartTypeChange={setChartType}
        onInsightsTabChange={setInsightsTab}
        onMainTabChange={setMainTab}
      />
    </DashboardLayout>
  );
};

export default Home;
