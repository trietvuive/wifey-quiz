import React, { useState, useEffect } from 'react';

interface QuizTimerProps {
  onTimeUp: () => void;
}

export default function QuizTimer({ onTimeUp }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds

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
  const seconds = timeLeft % 60;

  return (
    <div className="text-sm text-gray-600 mb-4">
      Time remaining: {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
} 