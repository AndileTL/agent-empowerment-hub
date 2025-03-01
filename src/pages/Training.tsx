
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import TrainingModule from "@/components/TrainingModule";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, BookOpen, Award } from "lucide-react";
import { useState, useEffect } from "react";

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
}

const Training = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);

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

  // Extract unique categories when modules data is loaded
  useEffect(() => {
    if (modules && modules.length > 0) {
      const uniqueCategories = Array.from(new Set(modules.map(module => module.category)));
      setCategories(uniqueCategories);
    }
  }, [modules]);

  // Filter modules based on active tab
  const filteredModules = activeTab === "all" 
    ? modules 
    : modules?.filter(module => module.category === activeTab);

  if (isLoading) {
    return <DashboardLayout>Loading...</DashboardLayout>;
  }

  // Calculate overall progress (placeholder - in a real app this would come from user data)
  const overallProgress = 75;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Training Lounge</h1>
          <p className="mt-2 text-gray-600">Enhance your skills with our training modules</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6 flex items-center gap-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-900">{modules?.length || 0}</p>
                <p className="text-blue-700">Available Modules</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6 flex items-center gap-4">
              <Clock className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-900">
                  {modules?.reduce((acc, module) => acc + module.duration, 0) || 0}min
                </p>
                <p className="text-green-700">Total Duration</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6 flex items-center gap-4">
              <Award className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-900">{overallProgress}%</p>
                <p className="text-purple-700">Overall Progress</p>
                <div className="w-full mt-2">
                  <Progress value={overallProgress} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Training Modules</CardTitle>
            <CardDescription>Browse available training content by category</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Modules</TabsTrigger>
                {categories.map(category => (
                  <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={activeTab} className="space-y-4">
                {filteredModules?.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No training modules found for this category.</p>
                ) : (
                  <div className="space-y-6">
                    {filteredModules?.map((module) => (
                      <TrainingModule
                        key={module.id}
                        id={module.id}
                        title={module.title}
                        description={module.description}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Training;
