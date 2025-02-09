'use client';

import React, { useEffect, useState } from 'react';
import { getDailyQuestions } from '@/utils/dailyQuestions';
import { Question, EloHistory } from '@/types/quiz';
import QuizCard from '@/components/QuizCard';
import Results from '@/components/Results';
import { QuizState } from '@/types/quiz';
import StreakDisplay from '@/components/StreakDisplay';
import Logo from '@/components/Logo';
import QuizProgress from '@/components/QuizProgress';
import { calculateNewElo, getInitialElo, updateEloHistory } from '@/utils/eloCalculator';

export default function Home() {
  const [dailyQuestions, setDailyQuestions] = useState<Question[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    showResults: false,
    eloRating: getInitialElo()
  });
  const [ratingHistory, setRatingHistory] = useState<EloHistory[]>([]);

  useEffect(() => {
    const questions = getDailyQuestions();
    console.log('Setting daily questions:', questions); // Debug log
    setDailyQuestions(questions);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('eloRating');
    if (stored) {
      const { history } = JSON.parse(stored);
      setRatingHistory(history);
    }
  }, [quizState.eloRating]);

  const handleAnswer = (isCorrect: boolean) => {
    setTimeout(() => {
      const currentQuestion = dailyQuestions[quizState.currentQuestionIndex];
      const newElo = calculateNewElo(
        quizState.eloRating,
        currentQuestion.difficulty,
        isCorrect
      );

      updateEloHistory(
        quizState.eloRating,
        newElo,
        currentQuestion.difficulty,
        isCorrect
      );

      if (isCorrect) {
        setQuizState(prev => ({ 
          ...prev, 
          score: prev.score + 1,
          eloRating: newElo
        }));
      } else {
        setQuizState(prev => ({ 
          ...prev,
          eloRating: newElo
        }));
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
      eloRating: getInitialElo()
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
            <QuizProgress 
              currentQuestion={quizState.currentQuestionIndex}
              totalQuestions={dailyQuestions.length}
            />
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
            eloRating={quizState.eloRating}
            ratingHistory={ratingHistory}
          />
        )}
      </div>
    </main>
  );
} 