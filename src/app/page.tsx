'use client';

import React, { useEffect, useState } from 'react';
import { getDailyQuestions } from '@/utils/dailyQuestions';
import { Question, EloHistory, QuizState } from '@/types';
import QuizCard from '@/components/QuizCard';
import Results from '@/components/Results';
import StreakDisplay from '@/components/StreakDisplay';
import Logo from '@/components/Logo';
import QuizProgress from '@/components/QuizProgress';
import { calculateNewElo, getInitialElo, getEloHistory } from '@/utils/eloCalculator';
import RatingHistory from '@/components/RatingHistory';
import RatingNotification from '@/components/RatingNotification';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/utils/dateFormatter';

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
  const router = useRouter();

  useEffect(() => {
    const questions = getDailyQuestions();
    setDailyQuestions(questions);
  }, []);

  useEffect(() => {
    setRatingHistory(getEloHistory());
  }, [quizState.eloRating]);

  const handleAnswer = (isCorrect: boolean, selectedIndex: number, onRatingChange: (old: number, newRating: number) => void) => {
    const currentQuestion = dailyQuestions[quizState.currentQuestionIndex];
    const newElo = calculateNewElo(
      quizState.eloRating,
      currentQuestion.difficulty,
      isCorrect
    );

    // Save question attempt to history
    const stored = localStorage.getItem('questionHistory');
    const history = stored ? JSON.parse(stored) : { attempts: [] };
    history.attempts.push({
      date: formatDate(new Date()),
      questionId: currentQuestion.id,
      ratingChange: newElo - quizState.eloRating,
      selectedOptionIndex: selectedIndex
    });
    localStorage.setItem('questionHistory', JSON.stringify(history));

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
      router.push(`/results?score=${quizState.score}&total=${dailyQuestions.length}&rating=${newElo}&oldRating=${quizState.eloRating}`);
      return;
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
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-600">Welcome Duckey! 🦆</h2>
        </div>
        <Logo />
        <StreakDisplay />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {notification && (
              <RatingNotification
                oldRating={notification.oldRating}
                newRating={notification.newRating}
                isCorrect={notification.isCorrect}
              />
            )}
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
                eloRating={quizState.eloRating}
                completed={false}
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