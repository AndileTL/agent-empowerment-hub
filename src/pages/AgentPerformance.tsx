
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import AgentPerformanceDetails from "@/components/dashboard/AgentPerformanceDetails";

const AgentPerformance = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agent Performance Details</h1>
            <p className="mt-1 text-gray-600">View detailed performance metrics for individual agents</p>
          </div>
        </div>
        
        <AgentPerformanceDetails />
      </div>
    </DashboardLayout>
  );
};

export default AgentPerformance;
