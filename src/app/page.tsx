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
import RatingHistory from '@/components/RatingHistory';
import RatingNotification from '@/components/RatingNotification';

export default function Home() {
  const [dailyQuestions, setDailyQuestions] = useState<Question[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    showResults: false,
    eloRating: getInitialElo()
  });
  const [ratingHistory, setRatingHistory] = useState<EloHistory[]>([]);
  const [notification, setNotification] = useState<{
    oldRating: number;
    newRating: number;
    isCorrect: boolean;
  } | null>(null);

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

  const handleAnswer = (isCorrect: boolean, onRatingChange: (old: number, newRating: number) => void) => {
    const currentQuestion = dailyQuestions[quizState.currentQuestionIndex];
    const newElo = calculateNewElo(
      quizState.eloRating,
      currentQuestion.difficulty,
      isCorrect
    );

    setNotification({
      oldRating: quizState.eloRating,
      newRating: newElo,
      isCorrect
    });

    // Clear notification after 2 seconds
    setTimeout(() => {
      setNotification(null);
    }, 2000);

    onRatingChange(quizState.eloRating, newElo);

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
      {notification && (
        <RatingNotification
          oldRating={notification.oldRating}
          newRating={notification.newRating}
          isCorrect={notification.isCorrect}
        />
      )}
      <div className="max-w-6xl mx-auto">
        <Logo />
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">
          Wifey GMAT Prep
        </h1>
        <StreakDisplay />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
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
          <div className="md:col-span-1">
            <RatingHistory history={ratingHistory} />
          </div>
        </div>
      </div>
    </main>
  );
} 