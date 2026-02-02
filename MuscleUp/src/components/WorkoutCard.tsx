import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Clock, Target } from "lucide-react";

interface WorkoutCardProps {
  title: string;
  description: string;
  duration: string;
  exercises: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  gradient: string;
  onStart: () => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({
  title,
  description,
  duration,
  exercises,
  difficulty,
  gradient,
  onStart,
}) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "Beginner": return "text-success";
      case "Intermediate": return "text-warning";
      case "Advanced": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Card className="workout-card p-6 animate-float">
      <div className={`absolute inset-0 ${gradient} opacity-10 rounded-2xl`} />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-background/20 ${getDifficultyColor()}`}>
            {difficulty}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4" />
            <span>{exercises} exercises</span>
          </div>
        </div>

        <Button 
          variant="workout" 
          size="lg" 
          onClick={onStart}
          className="w-full"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Workout
        </Button>
      </div>
    </Card>
  );
};