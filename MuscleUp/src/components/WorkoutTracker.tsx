import React, { useState } from "react";
import { WorkoutCard } from "./WorkoutCard";
import { ExerciseLibrary } from "./ExerciseLibrary";
import { Timer } from "./Timer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Dumbbell, Clock, Library } from "lucide-react";

type ViewState = "dashboard" | "exercises" | "timer" | "workout";

const workouts = [
  {
    id: 1,
    title: "Quick HIIT",
    description: "High-intensity interval training for maximum results in minimal time",
    duration: "15 min",
    exercises: 4,
    difficulty: "Intermediate" as const,
    gradient: "gradient-primary"
  },
  {
    id: 2,
    title: "Strength Builder",
    description: "Build muscle and strength with compound movements",
    duration: "30 min",
    exercises: 6,
    difficulty: "Advanced" as const,
    gradient: "gradient-secondary"
  },
  {
    id: 3,
    title: "Beginner Flow",
    description: "Perfect introduction to fitness with basic movements",
    duration: "20 min",
    exercises: 5,
    difficulty: "Beginner" as const,
    gradient: "gradient-accent"
  },
  {
    id: 4,
    title: "Cardio Blast",
    description: "Get your heart pumping with explosive cardio movements",
    duration: "25 min",
    exercises: 7,
    difficulty: "Intermediate" as const,
    gradient: "gradient-success"
  }
];

export const WorkoutTracker: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>("dashboard");

  const renderHeader = () => (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        {currentView !== "dashboard" && (
          <Button
            variant="ghost"
            onClick={() => setCurrentView("dashboard")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        )}
        
        <div className="flex-1 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2 animate-float">
            💪 FitTracker
          </h1>
          <p className="text-muted-foreground">Your personal fitness companion</p>
        </div>

        <div className="w-20" />
      </div>
    </header>
  );

  const renderNavigation = () => (
    <nav className="flex justify-center gap-4 mb-8">
      <Button
        variant={currentView === "dashboard" ? "workout" : "ghost"}
        onClick={() => setCurrentView("dashboard")}
      >
        <Dumbbell className="w-4 h-4 mr-2" />
        Workouts
      </Button>
      <Button
        variant={currentView === "exercises" ? "workout" : "ghost"}
        onClick={() => setCurrentView("exercises")}
      >
        <Library className="w-4 h-4 mr-2" />
        Exercises
      </Button>
      <Button
        variant={currentView === "timer" ? "workout" : "ghost"}
        onClick={() => setCurrentView("timer")}
      >
        <Clock className="w-4 h-4 mr-2" />
        Timer
      </Button>
    </nav>
  );

  const renderContent = () => {
    switch (currentView) {
      case "exercises":
        return <ExerciseLibrary />;
      
      case "timer":
        return (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Workout Timer</h2>
              <p className="text-muted-foreground">Set your rest intervals and stay focused</p>
            </div>
            <Timer
              initialTime={30}
              onTimeComplete={() => {
                // Play notification sound or show alert
                alert("Time's up! Ready for the next set?");
              }}
            />
          </div>
        );
      
      case "dashboard":
      default:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Choose Your Workout</h2>
              <p className="text-muted-foreground">Select a workout that matches your goals and fitness level</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workouts.map((workout) => (
                <WorkoutCard
                  key={workout.id}
                  title={workout.title}
                  description={workout.description}
                  duration={workout.duration}
                  exercises={workout.exercises}
                  difficulty={workout.difficulty}
                  gradient={workout.gradient}
                  onStart={() => setCurrentView("exercises")}
                />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {renderHeader()}
        {renderNavigation()}
        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};