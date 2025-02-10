export interface EloHistory {
  date: string;
  rating: number;
  correctCount: number;
  totalCount: number;
}

export interface EloRating {
  rating: number;
  history: EloHistory[];
} 