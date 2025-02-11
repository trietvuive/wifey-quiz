'use client';

import React from 'react';
import { QuestionAttempt } from '@/types';
import Logo from '@/components/Logo';
import { questions } from '@/data/questions';

const ITEMS_PER_PAGE = 10;

export default function HistoryPage() {
  const [history, setHistory] = React.useState<QuestionAttempt[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    const stored = localStorage.getItem('questionHistory');
    if (stored) {
      const { attempts } = JSON.parse(stored);
      setHistory(attempts.reverse()); // Show newest first
    }
  }, []);

  const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedHistory = history.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Logo />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Question History</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border bg-white disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 rounded border bg-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {paginatedHistory.map((attempt, index) => {
            const question = questions.find(q => q.id === attempt.questionId);
            return (
              <div key={index} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    {new Date(attempt.date).toLocaleDateString()}
                  </span>
                  <span className={`font-bold ${
                    attempt.ratingChange > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {attempt.ratingChange > 0 ? '✅ Correct' : '❌ Incorrect'}
                  </span>
                </div>
                <p className="text-gray-800 mb-4">{question?.question || 'Question not found'}</p>
                
                {question?.options && (
                  <div className="space-y-2 mb-4">
                    {question.options.map((option, i) => (
                      <div 
                        key={i}
                        className={`p-2 rounded ${
                          i === question.correctAnswer
                            ? 'bg-green-100 border-green-500'
                            : i === attempt.selectedOptionIndex && attempt.ratingChange <= 0
                            ? 'bg-red-100 border-red-500'
                            : 'bg-gray-50'
                        } border`}
                      >
                        {i === question.correctAnswer && '✓ '}
                        {i === attempt.selectedOptionIndex && attempt.ratingChange <= 0 && '✗ '}
                        {option}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Difficulty: {question?.difficulty || 'Unknown'}</span>
                  <span className={attempt.ratingChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                    Rating change: {attempt.ratingChange >= 0 ? '+' : ''}{attempt.ratingChange}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {history.length === 0 && (
          <div className="text-center text-gray-600 py-8">
            No question history yet
          </div>
        )}
      </div>
    </main>
  );
} 