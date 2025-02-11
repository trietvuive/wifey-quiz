import React, { useState, useEffect } from 'react';

interface QuizTimerProps {
  onTimeUp: () => void;
  questionId: number;
  seconds: number;
}

export default function QuizTimer({ onTimeUp, questionId, seconds }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds);
  }, [questionId, seconds]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft % 60;

  return (
    <div className="text-sm text-gray-600 mb-4">
      Time remaining: {minutes}:{secondsLeft.toString().padStart(2, '0')}
    </div>
  );
} 