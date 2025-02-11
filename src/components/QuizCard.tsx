import React, { useEffect } from 'react';
import { Question } from '@/types';
import { useState } from 'react';
import RatingChange from './RatingChange';
import QuizTimer from './QuizTimer';

interface QuizCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean, selectedIndex: number, callback: (oldRating: number, newRating: number) => void) => void;
}

export default function QuizCard({ question, onAnswer }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [ratingChange, setRatingChange] = useState<{old: number, new: number} | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
    setRatingChange(null);
  }, [question]);

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    const isCorrect = optionIndex === question.correctAnswer;
    onAnswer(isCorrect, optionIndex, (oldRating, newRating) => {
      setRatingChange({ old: oldRating, new: newRating });
    });
  };

  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      handleAnswer(-1); // -1 indicates timeout
    }
  };

  return (
    <div className="quiz-card relative">
      <QuizTimer onTimeUp={handleTimeUp} questionId={question.id} seconds={120} />
      {ratingChange && (
        <RatingChange oldRating={ratingChange.old} newRating={ratingChange.new} />
      )}
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