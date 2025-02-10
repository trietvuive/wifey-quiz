import { Question } from '@/types';
import { questions as allQuestions } from '@/data/questions';

function getRandomQuestions(count: number): Question[] {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getDailyQuestions(): Question[] {
  console.log('All questions:', allQuestions); // Debug log

  const today = new Date().toDateString();
  const stored = localStorage.getItem('dailyQuestions');
  
  if (stored) {
    const { date, questions } = JSON.parse(stored);
    if (date === today) {
      console.log('Returning stored questions:', questions); // Debug log
      return questions;
    }
  }

  const dailyQuestions = getRandomQuestions(4);
  console.log('New daily questions:', dailyQuestions); // Debug log
  
  localStorage.setItem('dailyQuestions', JSON.stringify({
    date: today,
    questions: dailyQuestions
  }));
  
  return dailyQuestions;
} 