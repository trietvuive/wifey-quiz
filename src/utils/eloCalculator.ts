import { EloHistory, EloRating, QuestionAttempt } from '@/types';
import { formatDate } from './dateFormatter';

const K_FACTOR = 32; // How quickly the rating changes

export function calculateNewElo(
  currentElo: number,
  questionDifficulty: number,
  isCorrect: boolean
): number {
  // Expected score based on rating difference
  const expectedScore = 1 / (1 + Math.pow(10, (questionDifficulty - currentElo) / 400));
  
  // Actual score (1 for win, 0 for loss)
  const actualScore = isCorrect ? 1 : 0;
  
  // New rating calculation
  const newRating = Math.round(currentElo + K_FACTOR * (actualScore - expectedScore));
  
  // Ensure rating stays within GMAT bounds (200-800)
  return Math.min(Math.max(newRating, 200), 800);
}

function isClient(): boolean {
  return typeof window !== 'undefined';
}

export function getInitialElo(): number {
  if (!isClient()) return 600;
  
  const stored = localStorage.getItem('eloRating');
  if (stored) {
    const eloData: EloRating = JSON.parse(stored);
    return eloData.rating;
  }
  return 600;
}

export function getEloHistory(): EloHistory[] {
  if (!isClient()) return [];
  
  const stored = localStorage.getItem('questionHistory');
  if (!stored) return [];

  const { attempts } = JSON.parse(stored);
  const historyMap = new Map<string, EloHistory>();

  let currentElo = 600; // Starting ELO
  
  attempts.forEach((attempt: QuestionAttempt) => {
    const date = attempt.date;
    
    if (!historyMap.has(date)) {
      historyMap.set(date, {
        date,
        rating: currentElo,
        correctCount: 0,
        totalCount: 0
      });
    }

    const entry = historyMap.get(date)!;
    currentElo += attempt.ratingChange;
    entry.rating = currentElo;
    entry.correctCount += attempt.ratingChange > 0 ? 1 : 0;
    entry.totalCount += 1;
  });

  return Array.from(historyMap.values());
} 