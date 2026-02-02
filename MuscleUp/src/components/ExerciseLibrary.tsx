import React from "react";
import { ExerciseCard } from "./ExerciseCard";
import { toast } from "sonner";

// Import exercise images
import pushups from "@/assets/pushups.jpg";
import squats from "@/assets/squats.jpg";
import mountainClimbers from "@/assets/mountain-climbers.jpg";
import burpees from "@/assets/burpees.jpg";

const exercises = [
  {
    id: 1,
    name: "Push-ups",
    image: pushups,
    description: "Classic upper body exercise targeting chest, shoulders, and triceps.",
    defaultSets: 3,
    defaultReps: 10,
    category: "Upper Body"
  },
  {
    id: 2,
    name: "Squats",
    image: squats,
    description: "Fundamental lower body exercise for glutes, quads, and hamstrings.",
    defaultSets: 3,
    defaultReps: 15,
    category: "Lower Body"
  },
  {
    id: 3,
    name: "Mountain Climbers",
    image: mountainClimbers,
    description: "High-intensity cardio exercise that works the entire body.",
    defaultSets: 3,
    defaultReps: 20,
    category: "Cardio"
  },
  {
    id: 4,
    name: "Burpees",
    image: burpees,
    description: "Full-body explosive exercise combining squat, plank, and jump.",
    defaultSets: 2,
    defaultReps: 8,
    category: "Full Body"
  }
];

export const ExerciseLibrary: React.FC = () => {
  const handleExerciseComplete = (exerciseName: string, sets: number, reps: number) => {
    toast(`🔥 ${exerciseName} completed! ${sets} sets × ${reps} reps`, {
      description: "Great job! Keep up the momentum!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Exercise Library</h2>
        <p className="text-muted-foreground">Choose your exercises and start building strength!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            name={exercise.name}
            image={exercise.image}
            description={exercise.description}
            defaultSets={exercise.defaultSets}
            defaultReps={exercise.defaultReps}
            category={exercise.category}
            onComplete={(sets, reps) => handleExerciseComplete(exercise.name, sets, reps)}
          />
        ))}
      </div>
    </div>
  );
};