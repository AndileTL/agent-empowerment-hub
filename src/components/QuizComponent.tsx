
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: string;
}

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

const QuizComponent = ({ questions, onComplete }: QuizComponentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = calculateScore();
      setShowResults(true);
      onComplete(score);
    }
  };

  const calculateScore = () => {
    const correctAnswers = answers.filter(
      (answer, index) => answer === questions[index].correct_answer
    );
    return Math.round((correctAnswers.length / questions.length) * 100);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">{score}%</p>
            <p className="text-gray-600 mt-2">
              You answered {answers.filter((answer, index) => answer === questions[index].correct_answer).length} out of {questions.length} questions correctly
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg">{questions[currentQuestion].question}</p>
        <RadioGroup
          value={answers[currentQuestion]}
          onValueChange={handleAnswer}
          className="space-y-3"
        >
          {questions[currentQuestion].options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion]}
          className="w-full"
        >
          {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuizComponent;
