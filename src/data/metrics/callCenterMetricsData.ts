
import { MetricsData } from "@/types/dashboard";

export const getCallCenterMetricsData = (): MetricsData[] => [
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
