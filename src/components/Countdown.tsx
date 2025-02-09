import React, { useEffect, useState } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState('');
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const totalMillisInDay = 24 * 60 * 60 * 1000;
      
      // Calculate progress percentage
      const progressPercent = (diff / totalMillisInDay) * 100;
      setProgress(progressPercent);
      
      // Calculate time components
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      return `${hours}h ${minutes}m ${seconds}s`;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center mt-6 p-4 bg-indigo-50 rounded-lg">
      <div className="text-sm text-gray-600 mb-2">Next questions in</div>
      <div className="text-xl font-mono font-bold text-indigo-600 mb-3">{timeLeft}</div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-600 transition-all duration-1000 ease-linear rounded-full"
          style={{ 
            width: `${progress}%`,
            transition: 'width 1s linear'
          }}
        />
      </div>
    </div>
  );
} 