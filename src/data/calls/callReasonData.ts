
import { CallReasonItem } from "@/types/dashboard";

export const getCallReasonData = (): CallReasonItem[] => [
  { name: "Technical Issues", value: 29, color: "#8884d8" },
  { name: "Billing Questions", value: 21, color: "#82b1ff" },
  { name: "Account Management", value: 17, color: "#81d4fa" },
  { name: "Product Information", value: 15, color: "#4caf50" },
  { name: "Service Outage", value: 10, color: "#cddc39" },
  { name: "Other", value: 8, color: "#ffeb3b" }
];
