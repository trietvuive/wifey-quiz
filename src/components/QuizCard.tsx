import React, { useEffect } from 'react';
import { Question } from '@/types/quiz';
import { useState } from 'react';

interface QuizCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

export default function QuizCard({ question, onAnswer }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Reset selected answer when question changes
  useEffect(() => {
    setSelectedAnswer(null);
  }, [question]);

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    const isCorrect = optionIndex === question.correctAnswer;
    onAnswer(isCorrect);
  };

  console.log('QuizCard received question:', question); // Full question object
  console.log('Question difficulty:', question?.difficulty); // Specific difficulty check

  return (
    <div className="quiz-card">
      <h2 className="text-2xl font-bold mb-2">{question.question}</h2>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-gray-500">GMAT Level:</span>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
          {question.difficulty}+ GMAT
        </span>
      </div>
      {question.image && (
        <div className="mb-6">
          <img 
            src={question.image} 
            alt="Question visual" 
            className="max-w-full rounded-lg shadow-md"
          />
        </div>
      )}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
            className={`quiz-button ${
              selectedAnswer === null 
                ? ''
                : index === question.correctAnswer
                  ? 'correct'
                  : selectedAnswer === index
                    ? 'incorrect'
                    : ''
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
} 