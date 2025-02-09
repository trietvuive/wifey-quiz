import React from 'react';
import Countdown from './Countdown';
import RatingGraph from './RatingGraph';
import { EloHistory } from '@/types/quiz';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  eloRating: number;
  ratingHistory: EloHistory[];
}

export default function Results({ score, totalQuestions, onRestart, eloRating, ratingHistory }: ResultsProps) {
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="quiz-card text-center">
      <h2 className="text-3xl font-bold mb-6">Quiz Complete! 🎉</h2>
      <p className="text-2xl mb-4">
        Your score: <span className="font-bold text-indigo-600">{score}</span> out of {totalQuestions}
      </p>
      <p className="text-xl mb-8">
        Your GMAT Level: <span className="font-bold text-indigo-600">{Math.round(eloRating)}</span>
      </p>
      <RatingGraph history={ratingHistory} />
      <button
        onClick={onRestart}
        className="primary-button"
      >
        Try Again
      </button>
      <Countdown />
    </div>
  );
} 