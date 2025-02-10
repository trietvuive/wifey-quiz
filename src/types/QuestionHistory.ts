export interface QuestionAttempt {
  date: string;
  question: string;
  isCorrect: boolean;
  ratingChange: number;
  difficulty: number;
  selectedOption?: string;
  correctOption?: string;
  options?: string[];
}

export interface QuestionHistory {
  attempts: QuestionAttempt[];
} 