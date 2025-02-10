import { EloRating } from '@/types/quiz';

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

export function updateEloHistory(
  currentElo: number,
  newElo: number,
  questionDifficulty: number,
  correct: boolean
) {
  if (!isClient()) return;
  
  const stored = localStorage.getItem('eloRating');
  const eloData: EloRating = stored ? JSON.parse(stored) : { rating: currentElo, history: [] };
  const today = new Date().toLocaleDateString();

  // Find today's entry if it exists
  const todayEntry = eloData.history.find(entry => 
    new Date(entry.date).toLocaleDateString() === today
  );

  if (todayEntry) {
    // Update existing entry
    todayEntry.rating = newElo;
    todayEntry.correctCount += correct ? 1 : 0;
    todayEntry.totalCount += 1;
  } else {
    // Create new entry for today
    eloData.history.push({
      date: new Date().toISOString(),
      rating: newElo,
      correctCount: correct ? 1 : 0,
      totalCount: 1
    });
  }

  eloData.rating = newElo;
  localStorage.setItem('eloRating', JSON.stringify(eloData));
} 