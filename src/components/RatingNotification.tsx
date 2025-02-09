import React from 'react';

interface RatingNotificationProps {
  oldRating: number;
  newRating: number;
  isCorrect: boolean;
}

export default function RatingNotification({ oldRating, newRating, isCorrect }: RatingNotificationProps) {
  const difference = newRating - oldRating;

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className={`p-4 rounded-lg shadow-lg ${
        isCorrect ? 'bg-green-100' : 'bg-red-100'
      }`}>
        <div className={`text-lg font-bold ${
          isCorrect ? 'text-green-800' : 'text-red-800'
        }`}>
          {isCorrect ? 'Correct! 🎉' : 'Incorrect ❌'}
        </div>
        <div className="text-sm mt-1">
          Rating change: <span className="font-bold">{difference > 0 ? '+' : ''}{difference}</span>
        </div>
      </div>
    </div>
  );
} 