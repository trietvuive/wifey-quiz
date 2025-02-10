import React from 'react';
import Countdown from './Countdown';
import RatingGraph from './RatingGraph';
import { useEffect, useState } from 'react';
import { EloHistory } from '@/types/quiz';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  eloRating: number;
  completed: boolean;
}

export default function Results({ score, totalQuestions, eloRating, completed }: ResultsProps) {
  const [ratingHistory, setRatingHistory] = useState<EloHistory[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('eloRating');
    if (stored) {
      const { history } = JSON.parse(stored);
      setRatingHistory(history);
    }
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Daily Quiz Complete!</h2>
        <p className="text-lg mb-4">
          You scored {score} out of {totalQuestions}
        </p>
        <p className="text-lg mb-4">
          Your GMAT Rating: {eloRating}
        </p>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">Your Progress</h3>
        <RatingGraph history={ratingHistory} />
      </div>
      {!completed && (
        <div className="text-center">
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Try Again Tomorrow
          </button>
        </div>
      )}
    </div>
  );
} 