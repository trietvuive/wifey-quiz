import React from 'react';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export default function Results({ score, totalQuestions, onRestart }: ResultsProps) {
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="quiz-card text-center">
      <h2 className="text-3xl font-bold mb-6">Quiz Complete! 🎉</h2>
      <p className="text-2xl mb-8">
        Your score: <span className="font-bold text-indigo-600">{score}</span> out of {totalQuestions} ({percentage.toFixed(1)}%)
      </p>
      <button
        onClick={onRestart}
        className="primary-button"
      >
        Try Again
      </button>
    </div>
  );
} 