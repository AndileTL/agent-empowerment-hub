
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "./VideoPlayer";
import QuizComponent from "./QuizComponent";
import { Play, FileText, CheckCircle2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface TrainingResource {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'document';
  content_url?: string;
  duration?: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: string;
}

interface TrainingModuleProps {
  id: string;
  title: string;
  description: string;
}

const TrainingModule = ({ id, title, description }: TrainingModuleProps) => {
  const [activeTab, setActiveTab] = useState("content");

  const { data: resources } = useQuery({
    queryKey: ['training-resources', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('training_resources')
        .select('*')
        .eq('module_id', id);
      
      if (error) throw error;
      return data as TrainingResource[];
    },
  });

  const { data: questions } = useQuery({
    queryKey: ['quiz-questions', id],
    queryFn: async () => {
      const quiz = resources?.find(r => r.type === 'quiz');
      if (!quiz) return [];

      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('training_resource_id', quiz.id);
      
      if (error) throw error;
      return data as QuizQuestion[];
    },
    enabled: !!resources?.some(r => r.type === 'quiz'),
  });

  const handleQuizComplete = async (score: number) => {
    const quiz = resources?.find(r => r.type === 'quiz');
    if (!quiz) return;

    // Save quiz attempt
    const { error } = await supabase
      .from('quiz_attempts')
      .insert([
        {
          training_resource_id: quiz.id,
          agent_id: '123', // Replace with actual agent ID
          score: score,
        }
      ]);

    if (error) {
      console.error('Error saving quiz attempt:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="space-y-4">
            {resources?.filter(r => r.type === 'video').map(video => (
              <VideoPlayer
                key={video.id}
                title={video.title}
                url={video.content_url || ''}
              />
            ))}
          </TabsContent>
          <TabsContent value="quiz">
            {questions && questions.length > 0 ? (
              <QuizComponent
                questions={questions}
                onComplete={handleQuizComplete}
              />
            ) : (
              <p>No quiz available for this module.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TrainingModule;
