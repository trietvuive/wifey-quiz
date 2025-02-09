import React from 'react';

interface RatingChangeProps {
  oldRating: number;
  newRating: number;
}

export default function RatingChange({ oldRating, newRating }: RatingChangeProps) {
  const difference = newRating - oldRating;
  const isPositive = difference > 0;

  return (
    <div className="absolute top-4 right-4 animate-fade-in">
      <div className={`px-4 py-2 rounded-lg font-bold ${
        isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {isPositive ? '+' : ''}{difference} points
      </div>
    </div>
  );
} 