import React from 'react';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

export default function QuizProgress({ currentQuestion, totalQuestions }: QuizProgressProps) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Question {currentQuestion + 1} of {totalQuestions}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-600 transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
} 