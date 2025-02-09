'use client';

import React, { useEffect, useState } from 'react';
import { getDailyQuestions } from '@/utils/dailyQuestions';
import { Question } from '@/types/quiz';
import QuizCard from '@/components/QuizCard';
import Results from '@/components/Results';
import { QuizState } from '@/types/quiz';
import StreakDisplay from '@/components/StreakDisplay';
import Logo from '@/components/Logo';

export default function Home() {
  const [dailyQuestions, setDailyQuestions] = useState<Question[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    showResults: false,
  });

  useEffect(() => {
    setDailyQuestions(getDailyQuestions());
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    setTimeout(() => {
      if (isCorrect) {
        setQuizState(prev => ({ ...prev, score: prev.score + 1 }));
      }

      if (quizState.currentQuestionIndex < dailyQuestions.length - 1) {
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
        <Logo />
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">Wifey GMAT Prep</h1>
        <StreakDisplay />
        {!quizState.showResults ? (
          <>
            <div className="text-center mb-6 text-lg text-gray-600">
              Question {quizState.currentQuestionIndex + 1} of {dailyQuestions.length}
            </div>
            {dailyQuestions.length > 0 && (
              <QuizCard
                question={dailyQuestions[quizState.currentQuestionIndex]}
                onAnswer={handleAnswer}
              />
            )}
          </>
        ) : (
          <Results
            score={quizState.score}
            totalQuestions={dailyQuestions.length}
            onRestart={handleRestart}
          />
        )}
      </div>
    </main>
  );
} 