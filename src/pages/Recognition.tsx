
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, Star } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  badge_url: string;
  criteria: string;
  awarded_at?: string;
}

const Recognition = () => {
  const { data: achievements, isLoading } = useQuery({
    queryKey: ['achievements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('achievements')
        .select('*');
      
      if (error) throw error;
      return data as Achievement[];
    },
  });

  if (isLoading) {
    return <DashboardLayout>Loading...</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recognition & Achievements</h1>
          <p className="mt-2 text-gray-600">Celebrate your accomplishments and milestones</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <CardContent className="p-6 flex items-center gap-4">
              <Trophy className="h-8 w-8 text-amber-600" />
              <div>
                <p className="text-2xl font-bold text-amber-900">12</p>
                <p className="text-amber-700">Total Achievements</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6 flex items-center gap-4">
              <Star className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-900">5</p>
                <p className="text-purple-700">This Month</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6 flex items-center gap-4">
              <Award className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-900">Gold</p>
                <p className="text-blue-700">Current Tier</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements?.map((achievement) => (
            <Card key={achievement.id} className={achievement.awarded_at ? 'border-success-200' : ''}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="flex items-center gap-2">
                    {achievement.name}
                    {achievement.awarded_at && (
                      <Badge variant="success" className="ml-2">Achieved</Badge>
                    )}
                  </CardTitle>
                </div>
                <CardDescription>{achievement.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <img
                      src={achievement.badge_url || '/placeholder.svg'}
                      alt={achievement.name}
                      className="w-24 h-24"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Criteria:</strong> {achievement.criteria}
                  </p>
                  {achievement.awarded_at && (
                    <p className="text-sm text-success-600">
                      Awarded on {new Date(achievement.awarded_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Recognition;
