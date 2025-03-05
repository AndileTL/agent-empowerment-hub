
import React from "react";
import { Card } from "@/components/ui/card";

interface ActivityItem {
  type: string;
  message: string;
  timestamp: string;
}

interface RecentActivitiesProps {
  activities: ActivityItem[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
      <Card className="p-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
};

export default RecentActivities;
