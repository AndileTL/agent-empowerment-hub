
import { ReactNode } from "react";

export interface PerformanceMetric {
  value: string;
  target?: string;
  trend: {
    value: number;
    isPositive: boolean;
  };
}

export interface PerformanceMetrics {
  handlingTime: PerformanceMetric;
  customerSatisfaction: PerformanceMetric;
  firstCallResolution: PerformanceMetric;
  scheduleAdherence: PerformanceMetric;
  callVolume: PerformanceMetric;
  serviceLevel: PerformanceMetric;
}

export interface CallReasonItem {
  name: string;
  value: number;
  color: string;
}

export interface TeamData {
  name: string;
  aht: string;
  csat: string;
  fcr: string;
  sla: string;
}

export interface ChannelData {
  channel: string;
  icon: ReactNode;
  aht: string;
  csat: string;
  fcr: string;
  sla: string;
  volume: string;
  topPerformer: string;
}

export interface ActivityItem {
  type: string;
  message: string;
  timestamp: string;
}

export interface OutageData {
  id: string;
  reason: string;
  severity: string;
  startTime: string;
  affectedServices: string[];
  estimatedResolution: string;
  updates: string;
}

export interface SLAData {
  month: string;
  phone: number;
  chat: number;
  email: number;
  target: number;
}

export interface ChatSLAMetrics {
  avgWaitTime: string;
  avgHandleTime: string;
  meetingSla: string;
  activeChats: number;
  waitingChats: number;
}

export interface EmailSLAMetrics {
  avgResponseTime: string;
  meetingSla: string;
  inQueue: number;
  resolved: number;
}

export interface MetricsDataTickets {
  ticketsReceived: number;
  ticketsResolved: number;
  casesEscalated: number;
}

export interface MetricsDataCalls {
  callsReceived: number;
  callsAnswered: number;
  callsSLA: number;
  callsCAR: number;
}

export interface MetricsDataLiveChat {
  liveChatReceived: number;
  liveChatAnswered: number;
  liveChatSLA: number;
  liveChatLT: number;
}

export interface MetricsDataEmail {
  emailsReceived: number;
  emailsResponse: string;
  emailsResolved: number;
  emailsFRR: number;
}

export interface MetricsDataSocial {
  socialResolved: number;
}

export interface MetricsData {
  date: string;
  tickets: MetricsDataTickets;
  calls: MetricsDataCalls;
  liveChat: MetricsDataLiveChat;
  email: MetricsDataEmail;
  social: MetricsDataSocial;
  walkIns: number;
  totalIssues: number;
  ticketToCalls: number;
  dialoguesClassification: number;
  majorOutages: number;
  systemDowntime: string;
}
