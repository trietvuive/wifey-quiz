export interface Question {
  id: number;
  question: string;
  image?: string;  // Optional image URL
  options: string[];
  correctAnswer: number;
  difficulty: number;  // GMAT score level (500-800)
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  showResults: boolean;
  eloRating: number;
}

export interface StreakData {
  currentStreak: number;
  lastLoginDate: string;
  longestStreak: number;
}

export interface EloRating {
  rating: number;
  history: EloHistory[];
}

export interface EloHistory {
  date: string;
  rating: number;
  questionDifficulty: number;
  correct: boolean;
} 