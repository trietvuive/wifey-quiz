import { QuestionCategory } from "./QuestionEnums";

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: number;
  category: QuestionCategory;
  tags?: string[];
  image?: string;
} 