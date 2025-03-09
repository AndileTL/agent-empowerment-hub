
import { SLAData, ChatSLAMetrics, EmailSLAMetrics } from "@/types/dashboard";

export const getSLAData = (): SLAData[] => [
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

export const getChatSLAMetrics = (): ChatSLAMetrics => ({
  avgWaitTime: "45s",
  avgHandleTime: "8m 20s",
  meetingSla: "88%",
  activeChats: 24,
  waitingChats: 5
});

export const getEmailSLAMetrics = (): EmailSLAMetrics => ({
  avgResponseTime: "2h 15m",
  meetingSla: "92%",
  inQueue: 42,
  resolved: 156
});

export const getSLAPieData = () => [
  { name: "Phone SLA", value: 95, color: "#8884d8" },
  { name: "Chat SLA", value: 88, color: "#82ca9d" },
  { name: "Email SLA", value: 92, color: "#ffc658" }
];
