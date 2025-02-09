export interface Question {
  id: number;
  question: string;
  image?: string;  // Optional image URL
  options: string[];
  correctAnswer: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  showResults: boolean;
}

export interface StreakData {
  currentStreak: number;
  lastLoginDate: string;
  longestStreak: number;
} 