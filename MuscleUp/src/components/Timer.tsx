import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Square } from "lucide-react";

interface TimerProps {
  initialTime?: number;
  onTimeComplete?: () => void;
}

export const Timer: React.FC<TimerProps> = ({ initialTime = 30, onTimeComplete }) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && !isPaused && time > 0) {
      interval = setInterval(() => {
        setTime((time) => {
          if (time <= 1) {
            setIsActive(false);
            setIsPaused(false);
            onTimeComplete?.();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, time, onTimeComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setTime(initialTime);
    setIsActive(false);
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsActive(false);
    setIsPaused(false);
  };

  const progress = ((initialTime - time) / initialTime) * 100;

  return (
    <Card className="p-6 text-center animate-float">
      <div className="mb-6">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={339.292}
              strokeDashoffset={339.292 - (progress / 100) * 339.292}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-foreground animate-counter-bounce">
              {formatTime(time)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTime(Math.max(10, time - 10))}
            disabled={isActive}
          >
            -10s
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTime(time + 10)}
            disabled={isActive}
          >
            +10s
          </Button>
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {!isActive ? (
          <Button variant="timer" onClick={handleStart}>
            <Play className="w-4 h-4 mr-2" />
            Start
          </Button>
        ) : (
          <Button variant="timer" onClick={handlePause}>
            <Pause className="w-4 h-4 mr-2" />
            {isPaused ? "Resume" : "Pause"}
          </Button>
        )}

        <Button variant="ghost" onClick={handleReset}>
          <RotateCcw className="w-4 h-4" />
        </Button>

        {isActive && (
          <Button variant="destructive" onClick={handleStop}>
            <Square className="w-4 h-4" />
          </Button>
        )}
      </div>
    </Card>
  );
};