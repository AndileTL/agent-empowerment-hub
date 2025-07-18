
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCard from "@/components/StatsCard";
import SupervisorMonitoring from "@/components/SupervisorMonitoring";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ClipboardCheck, Target, TrendingUp } from "lucide-react";
import { format } from "date-fns";

interface QAEvaluation {
  id: string;
  evaluation_date: string;
  total_score: number;
  interaction_type: string;
  feedback: string;
  agent_id: string;
  evaluator_id: string;
}

const QAScoring = () => {
  const { data: evaluations, isLoading } = useQuery({
    queryKey: ['qa-evaluations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('qa_evaluations')
        .select('*')
        .order('evaluation_date', { ascending: false });
      
      if (error) {
        console.error('Error fetching QA evaluations:', error);
        throw error;
      }
      return data as QAEvaluation[];
    },
  });

  // Calculate average score
  const averageScore = evaluations?.length 
    ? Math.round(evaluations.reduce((acc, eval_) => acc + eval_.total_score, 0) / evaluations.length)
    : 0;

  // Format data for the line chart
  const chartData = evaluations?.map(eval_ => ({
    date: format(new Date(eval_.evaluation_date), 'MMM dd'),
    score: eval_.total_score
  })) || [];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">QA Scoring</h1>
          <p className="mt-2 text-gray-600">Monitor and improve your performance</p>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard
                title="Average Score"
                value={`${averageScore}%`}
                icon={<Target className="h-6 w-6" />}
                trend={{ value: 5, isPositive: true }}
              />
              <StatsCard
                title="Evaluations"
                value={evaluations?.length || 0}
                icon={<ClipboardCheck className="h-6 w-6" />}
              />
              <StatsCard
                title="Monthly Trend"
                value="+8%"
                icon={<TrendingUp className="h-6 w-6" />}
                trend={{ value: 8, isPositive: true }}
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Score Trend</CardTitle>
                <CardDescription>Your QA performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#10b981" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Recent Evaluations</h2>
              {evaluations?.map((evaluation) => (
                <Card key={evaluation.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{evaluation.interaction_type}</p>
                        <p className="text-sm text-gray-600">
                          {format(new Date(evaluation.evaluation_date), 'PP')}
                        </p>
                        {evaluation.feedback && (
                          <p className="mt-2 text-gray-600">{evaluation.feedback}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-600">{evaluation.total_score}%</p>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monitoring">
            <SupervisorMonitoring />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default QAScoring;
