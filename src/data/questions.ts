import { Question } from '@/types/quiz';

export const questions: Question[] = [
  {
    id: 1,
    question: "What is the value of x in this equation?",
    image: "/images/equation1.png",
    options: ["2", "4", "6", "8"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
    correctAnswer: 1
  }
]; 