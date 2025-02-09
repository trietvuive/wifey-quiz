import { Question } from '@/types/quiz';
import { questions as allQuestions } from '@/data/questions';

function getRandomQuestions(count: number): Question[] {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getDailyQuestions(): Question[] {
  const today = new Date().toDateString();
  const stored = localStorage.getItem('dailyQuestions');
  
  if (stored) {
    const { date, questions } = JSON.parse(stored);
    if (date === today) {
      return questions;
    }
  }

  const dailyQuestions = getRandomQuestions(4);
  localStorage.setItem('dailyQuestions', JSON.stringify({
    date: today,
    questions: dailyQuestions
  }));
  
  return dailyQuestions;
} 