
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, PlayCircle, CheckCircle2 } from "lucide-react";

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
}

const Training = () => {
  const { data: modules, isLoading } = useQuery({
    queryKey: ['training-modules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('training_modules')
        .select('*');
      
      if (error) throw error;
      return data as TrainingModule[];
    },
  });

  if (isLoading) {
    return <DashboardLayout>Loading...</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Training Lounge</h1>
          <p className="mt-2 text-gray-600">Enhance your skills with our training modules</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules?.map((module) => (
            <Card key={module.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{module.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <Progress value={33} className="flex-1" />
                  </div>
                  <Button className="w-full">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Start Module
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Training;
