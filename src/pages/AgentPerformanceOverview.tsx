
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AgentPerformanceDetails from "@/components/dashboard/AgentPerformanceDetails";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCSRStats } from "@/hooks/useCSRStats";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { subDays } from "date-fns";

const AgentPerformanceOverview = () => {
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  
  // Convert date objects to ISO string format for the API
  const startDate = dateRange.from ? dateRange.from.toISOString().split('T')[0] : undefined;
  const endDate = dateRange.to ? dateRange.to.toISOString().split('T')[0] : undefined;
  
  // Use the date range for filtering agent data
  const { data: agents, isLoading } = useCSRStats({
    startDate,
    endDate
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Agent Performance Overview</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              View detailed performance metrics for all agents
            </p>
          </div>
          <div className="flex-shrink-0">
            <DateRangePicker
              date={dateRange}
              onDateChange={setDateRange}
            />
          </div>
        </div>

        <Card className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
          <CardHeader>
            <CardTitle>Team Performance Metrics</CardTitle>
            <CardDescription className="dark:text-gray-300">
              Track overall performance metrics for your contact center team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="kpi" className="w-full">
              <TabsList className="mb-6 dark:bg-gray-700">
                <TabsTrigger value="kpi">Key Performance Indicators</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
              </TabsList>
              
              <TabsContent value="kpi">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-1">Avg. Handling Time</h3>
                    <p className="text-2xl font-bold text-primary-600">4m 32s</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">2% below target</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-1">Satisfaction Score</h3>
                    <p className="text-2xl font-bold text-primary-600">92%</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">+3% from last month</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-1">Resolution Rate</h3>
                    <p className="text-2xl font-bold text-primary-600">87%</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">+5% from last month</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="trends">
                <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">Performance trend charts will appear here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="benchmarks">
                <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">Team performance benchmarks will appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
          <CardHeader>
            <CardTitle>Individual Agent Details</CardTitle>
            <CardDescription className="dark:text-gray-300">
              View performance metrics for each agent
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center p-8">
                <p className="text-gray-500 dark:text-gray-400">Loading agent data...</p>
              </div>
            ) : (
              <AgentPerformanceDetails agents={agents} />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AgentPerformanceOverview;
