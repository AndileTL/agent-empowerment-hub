
import { Phone, ExternalLink, MessageSquare } from "lucide-react";
import React from "react";
import { ChannelData } from "@/types/dashboard";

export const getChannelPerformance = (): ChannelData[] => [
  {
    channel: "Voice",
    icon: React.createElement(Phone, { size: 16 }),
    aht: "310s",
    csat: "88%",
    fcr: "79%",
    sla: "75%",
    volume: "650",
    topPerformer: "Sarah Johnson"
  },
  {
    channel: "Email",
    icon: React.createElement(ExternalLink, { size: 16 }),
    aht: "720s",
    csat: "92%",
    fcr: "87%",
    sla: "85%",
    volume: "320",
    topPerformer: "Michael Chen"
  },
  {
    channel: "Chat",
    icon: React.createElement(MessageSquare, { size: 16 }),
    aht: "420s",
    csat: "94%",
    fcr: "90%",
    sla: "82%",
    volume: "230",
    topPerformer: "Jessica Smith"
  }
];
