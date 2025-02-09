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

export function getInitialElo(): number {
  const stored = localStorage.getItem('eloRating');
  if (stored) {
    const eloData: EloRating = JSON.parse(stored);
    return eloData.rating;
  }
  return 500; // Starting Elo
}

export function updateEloHistory(
  currentElo: number,
  newElo: number,
  questionDifficulty: number,
  correct: boolean
) {
  const stored = localStorage.getItem('eloRating');
  const eloData: EloRating = stored ? JSON.parse(stored) : { rating: currentElo, history: [] };
  
  eloData.rating = newElo;
  eloData.history.push({
    date: new Date().toISOString(),
    rating: newElo,
    questionDifficulty,
    correct
  });
  
  localStorage.setItem('eloRating', JSON.stringify(eloData));
} 