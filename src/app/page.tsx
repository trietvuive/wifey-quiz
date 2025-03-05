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
import Header from '@/components/Header';

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

    // Update score based on correctness
    setQuizState(prev => {
      const updatedScore = isCorrect ? prev.score + 1 : prev.score; // Increment score if the answer is correct
      return {
        ...prev,
        score: updatedScore,
        eloRating: newElo,
        currentQuestionIndex: prev.currentQuestionIndex < dailyQuestions.length - 1 ? 
                              prev.currentQuestionIndex + 1 : 
                              prev.currentQuestionIndex
      };
    });

    // Redirect to results if it's the last question
    if (quizState.currentQuestionIndex >= dailyQuestions.length - 1) {
      router.push(`/results?score=${quizState.score + (isCorrect ? 1 : 0)}&total=${dailyQuestions.length}&rating=${newElo}&oldRating=${quizState.eloRating}`);
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
        <Header />
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