
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useCSRStats } from "@/hooks/useCSRStats";
import { Phone, ExternalLink, MessageSquare } from "lucide-react";
import Dashboard from "@/components/dashboard/Dashboard";

const Home = () => {
  const { data: csrStats } = useCSRStats();
  const [timeFilter, setTimeFilter] = useState("Last Week");
  const [agentFilter, setAgentFilter] = useState("All Agents");
  const [chartType, setChartType] = useState("pie");
  const [insightsTab, setInsightsTab] = useState("sla");
  const [mainTab, setMainTab] = useState("dashboard");
  
  const performanceMetrics = {
    handlingTime: {
      value: "280s",
      target: "300s",
      trend: { value: 5, isPositive: true }
    },
    customerSatisfaction: {
      value: "92",
      target: "90%",
      trend: { value: 2, isPositive: true }
    },
    firstCallResolution: {
      value: "85",
      target: "80%",
      trend: { value: 3, isPositive: false }
    },
    scheduleAdherence: {
      value: "95",
      target: "95%",
      trend: { value: 1, isPositive: true }
    },
    callVolume: {
      value: "1,200",
      trend: { value: 8, isPositive: true }
    },
    serviceLevel: {
      value: "80%",
      trend: { value: 2, isPositive: false }
    }
  };

  const callReasonData = [
    { name: "Technical Issues", value: 29, color: "#8884d8" },
    { name: "Billing Questions", value: 21, color: "#82b1ff" },
    { name: "Account Management", value: 17, color: "#81d4fa" },
    { name: "Product Information", value: 15, color: "#4caf50" },
    { name: "Service Outage", value: 10, color: "#cddc39" },
    { name: "Other", value: 8, color: "#ffeb3b" },
  ];

  const teamPerformance = [
    {
      name: "Team Alpha",
      aht: "275s",
      csat: "94%",
      fcr: "87%",
      sla: "82%"
    },
    {
      name: "Team Beta",
      aht: "290s",
      csat: "91%",
      fcr: "82%",
      sla: "78%"
    },
    {
      name: "Team Gamma",
      aht: "285s",
      csat: "89%",
      fcr: "84%",
      sla: "81%"
    },
  ];

  const channelPerformance = [
    {
      channel: "Voice",
      icon: <Phone size={16} />,
      aht: "310s",
      csat: "88%",
      fcr: "79%",
      sla: "75%",
      volume: "650",
      topPerformer: "Sarah Johnson"
    },
    {
      channel: "Email",
      icon: <ExternalLink size={16} />,
      aht: "720s",
      csat: "92%",
      fcr: "87%",
      sla: "85%",
      volume: "320",
      topPerformer: "Michael Chen"
    },
    {
      channel: "Chat",
      icon: <MessageSquare size={16} />,
      aht: "420s",
      csat: "94%",
      fcr: "90%",
      sla: "82%",
      volume: "230",
      topPerformer: "Jessica Smith"
    },
  ];

  const recentActivities = [
    {
      type: "new-agent",
      message: "New agent Sarah Johnson joined Team Alpha",
      timestamp: "2h ago",
    },
    {
      type: "target-exceeded",
      message: "Team Beta exceeded CSAT target for Q1",
      timestamp: "3h ago",
    },
    {
      type: "update",
      message: "Updated AHT targets for all teams",
      timestamp: "5h ago",
    },
    {
      type: "training",
      message: "Mark Wilson completed advanced training",
      timestamp: "1d ago",
    },
  ];

  const slaData = [
    { 
      month: "Jan", 
      phone: 95, 
      chat: 92, 
      email: 88, 
      target: 90 
    },
    { 
      month: "Feb", 
      phone: 94, 
      chat: 91, 
      email: 89, 
      target: 90 
    },
    { 
      month: "Mar", 
      phone: 96, 
      chat: 94, 
      email: 91, 
      target: 90 
    },
    { 
      month: "Apr", 
      phone: 93, 
      chat: 90, 
      email: 87, 
      target: 90 
    },
    { 
      month: "May", 
      phone: 92, 
      chat: 89, 
      email: 85, 
      target: 90 
    }
  ];

  const chatSlaMetrics = {
    avgWaitTime: "45s",
    avgHandleTime: "8m 20s",
    meetingSla: "88%",
    activeChats: 24,
    waitingChats: 5
  };

  const emailSlaMetrics = {
    avgResponseTime: "2h 15m",
    meetingSla: "92%",
    inQueue: 42,
    resolved: 156
  };

  const slaPieData = [
    { name: "Phone SLA", value: 95, color: "#8884d8" },
    { name: "Chat SLA", value: 88, color: "#82ca9d" },
    { name: "Email SLA", value: 92, color: "#ffc658" }
  ];

  const callCenterMetricsData = [
    {
      date: "2023-07-01",
      tickets: { 
        ticketsReceived: 245, 
        ticketsResolved: 230, 
        casesEscalated: 15 
      },
      calls: { 
        callsReceived: 350, 
        callsAnswered: 330, 
        callsSLA: 95, 
        callsCAR: 94 
      },
      liveChat: { 
        liveChatReceived: 120, 
        liveChatAnswered: 115, 
        liveChatSLA: 96, 
        liveChatLT: 89 
      },
      email: { 
        emailsReceived: 230, 
        emailsResponse: "1st Response", 
        emailsResolved: 210, 
        emailsFRR: 91 
      },
      social: { 
        socialResolved: 45 
      },
      walkIns: 25,
      totalIssues: 770,
      ticketToCalls: 0.69,
      dialoguesClassification: 98,
      majorOutages: 1,
      systemDowntime: "0h 45m"
    },
    {
      date: "2023-07-02",
      tickets: { 
        ticketsReceived: 230, 
        ticketsResolved: 210, 
        casesEscalated: 20 
      },
      calls: { 
        callsReceived: 320, 
        callsAnswered: 300, 
        callsSLA: 94, 
        callsCAR: 93 
      },
      liveChat: { 
        liveChatReceived: 110, 
        liveChatAnswered: 105, 
        liveChatSLA: 95, 
        liveChatLT: 88 
      },
      email: { 
        emailsReceived: 210, 
        emailsResponse: "1st Response", 
        emailsResolved: 190, 
        emailsFRR: 90 
      },
      social: { 
        socialResolved: 40 
      },
      walkIns: 20,
      totalIssues: 700,
      ticketToCalls: 0.72,
      dialoguesClassification: 97,
      majorOutages: 0,
      systemDowntime: "0h 0m"
    }
  ];

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
