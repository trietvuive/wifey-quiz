'use client';

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Results from '@/components/Results';
import { useSearchParams } from 'next/navigation';
import Logo from '@/components/Logo';
import StreakDisplay from '@/components/StreakDisplay';
import RatingNotification from '@/components/RatingNotification';

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const score = Number(searchParams.get('score'));
  const total = Number(searchParams.get('total'));
  const rating = Number(searchParams.get('rating'));
  const oldRating = Number(searchParams.get('oldRating'));

  // Prevent direct access to results page
  if (!searchParams.has('score')) {
    router.push('/');
    return null;
  }

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-600">Welcome Duckey! 🦆</h2>
        </div>
        <Logo />
        <StreakDisplay />
        <RatingNotification 
          oldRating={oldRating}
          newRating={rating}
          isCorrect={score > 0}
        />
        <Results
          score={score}
          totalQuestions={total}
          eloRating={rating}
          completed={true}
        />
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
} 