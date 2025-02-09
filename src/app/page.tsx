'use client';

import React from 'react';
import { useState } from 'react';
import { questions } from '@/data/questions';
import QuizCard from '@/components/QuizCard';
import Results from '@/components/Results';
import { QuizState } from '@/types/quiz';
import StreakDisplay from '@/components/StreakDisplay';

export default function Home() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    showResults: false,
  });

  const handleAnswer = (isCorrect: boolean) => {
    setTimeout(() => {
      if (isCorrect) {
        setQuizState(prev => ({ ...prev, score: prev.score + 1 }));
      }

      if (quizState.currentQuestionIndex < questions.length - 1) {
        setQuizState(prev => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
        }));
      } else {
        setQuizState(prev => ({ ...prev, showResults: true }));
      }
    }, 1000);
  };

  const handleRestart = () => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      showResults: false,
    });
  };

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="quiz-container">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">Wifey GMAT Prep</h1>
        <StreakDisplay />
        {!quizState.showResults ? (
          <>
            <div className="text-center mb-6 text-lg text-gray-600">
              Question {quizState.currentQuestionIndex + 1} of {questions.length}
            </div>
            <QuizCard
              question={questions[quizState.currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
          </>
        ) : (
          <Results
            score={quizState.score}
            totalQuestions={questions.length}
            onRestart={handleRestart}
          />
        )}
      </div>
    </main>
  );
} 