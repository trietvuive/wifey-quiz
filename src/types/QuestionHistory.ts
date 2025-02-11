export interface QuestionAttempt {
  date: string;
  questionId: number;
  ratingChange: number;
  selectedOptionIndex: number;
}

export interface QuestionHistory {
  attempts: QuestionAttempt[];
} 