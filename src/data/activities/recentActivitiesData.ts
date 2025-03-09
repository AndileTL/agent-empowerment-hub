
import { ActivityItem } from "@/types/dashboard";

export const getRecentActivities = (): ActivityItem[] => [
  {
    type: "new-agent",
    message: "New agent Sarah Johnson joined Team Alpha",
    timestamp: "2h ago"
  },
  {
    type: "target-exceeded",
    message: "Team Beta exceeded CSAT target for Q1",
    timestamp: "3h ago"
  },
  {
    type: "update",
    message: "Updated AHT targets for all teams",
    timestamp: "5h ago"
  },
  {
    type: "training",
    message: "Mark Wilson completed advanced training",
    timestamp: "1d ago"
  }
];
