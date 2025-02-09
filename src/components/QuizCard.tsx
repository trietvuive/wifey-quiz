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

  return (
    <div className="quiz-card">
      <h2 className="text-2xl font-bold mb-6">{question.question}</h2>
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