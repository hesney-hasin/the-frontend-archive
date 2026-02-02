import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, RotateCcw, Target } from "lucide-react";

interface ExerciseCardProps {
  name: string;
  image: string;
  description: string;
  defaultSets: number;
  defaultReps: number;
  category: string;
  onComplete: (sets: number, reps: number) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  name,
  image,
  description,
  defaultSets,
  defaultReps,
  category,
  onComplete,
}) => {
  const [sets, setSets] = useState(defaultSets);
  const [reps, setReps] = useState(defaultReps);
  const [currentSet, setCurrentSet] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const handleComplete = () => {
    if (currentSet < sets - 1) {
      setCurrentSet(prev => prev + 1);
    } else {
      onComplete(sets, reps);
      setCurrentSet(0);
      setIsActive(false);
    }
  };

  const resetExercise = () => {
    setCurrentSet(0);
    setIsActive(false);
  };

  return (
    <Card className="exercise-button overflow-hidden">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover animate-exercise-demo"
        />
        <Badge className="absolute top-4 right-4 gradient-primary border-0">
          {category}
        </Badge>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Sets</label>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSets(Math.max(1, sets - 1))}
                className="h-8 w-8"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-bold animate-counter-bounce">
                {sets}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSets(sets + 1)}
                className="h-8 w-8"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Reps</label>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setReps(Math.max(1, reps - 1))}
                className="h-8 w-8"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-bold animate-counter-bounce">
                {reps}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setReps(reps + 1)}
                className="h-8 w-8"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {isActive && (
          <div className="mb-4 p-3 gradient-accent rounded-lg text-white">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Set {currentSet + 1} of {sets}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetExercise}
                className="text-white hover:bg-white/20"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
            <div className="mt-2">
              <span className="text-lg font-bold">{reps} reps</span>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {!isActive ? (
            <Button
              variant="exercise"
              onClick={() => setIsActive(true)}
              className="flex-1"
            >
              <Target className="w-4 h-4 mr-2" />
              Start Exercise
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={handleComplete}
              className="flex-1"
            >
              Complete Set {currentSet + 1}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};