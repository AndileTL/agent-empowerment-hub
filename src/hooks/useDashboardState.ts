
import { useState } from "react";

export const useDashboardState = () => {
  const [timeFilter, setTimeFilter] = useState("Last Week");
  const [agentFilter, setAgentFilter] = useState("All Agents");
  const [chartType, setChartType] = useState("pie");
  const [insightsTab, setInsightsTab] = useState("sla");
  const [mainTab, setMainTab] = useState("dashboard");

  return {
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
  };
};
