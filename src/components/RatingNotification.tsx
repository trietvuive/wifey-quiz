import React from 'react';

interface RatingNotificationProps {
  oldRating: number;
  newRating: number;
  isCorrect: boolean;
}

export default function RatingNotification({ oldRating, newRating, isCorrect }: RatingNotificationProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-bold">
            {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
          </div>
          <div className="text-sm text-gray-600">
            Rating: {oldRating} → {newRating}
          </div>
        </div>
        <div className={`text-lg font-bold ${
          newRating > oldRating ? 'text-green-600' : 'text-red-600'
        }`}>
          {newRating > oldRating ? '+' : ''}{newRating - oldRating}
        </div>
      </div>
    </div>
  );
} 