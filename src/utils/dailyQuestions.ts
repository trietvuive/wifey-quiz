import { Question } from '@/types';
import { questions as allQuestions } from '@/data/questions';
import { formatDate } from './dateFormatter';

function getRandomQuestions(count: number): number[] {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(q => q.id);
}

export function getDailyQuestions(): Question[] {
  const today = formatDate(new Date());
  const stored = localStorage.getItem('dailyQuestions');
  
  if (stored) {
    const { date, questionIds } = JSON.parse(stored);
    if (date === today) {
      return JSON.parse(stored).questionIds.map((id: number) => allQuestions.find(q => q.id === id)!);
    }
  }

  const dailyQuestionIds = getRandomQuestions(4);
  localStorage.setItem('dailyQuestions', JSON.stringify({
    date: today,
    questionIds: dailyQuestionIds
  }));
  
  return dailyQuestionIds.map((id: number) => allQuestions.find(q => q.id === id)!);
} 