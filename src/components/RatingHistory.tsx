import React from 'react';
import { EloHistory } from '@/types/quiz';
import RatingGraph from './RatingGraph';

interface RatingHistoryProps {
  history: EloHistory[];
}

export default function RatingHistory({ history }: RatingHistoryProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 h-fit mt-[60px]">
      <h3 className="text-lg font-bold mb-4">Rating History</h3>
      <RatingGraph history={history} />
      <div className="space-y-2 max-h-[400px] overflow-y-auto mt-4">
        {history.slice().reverse().map((entry, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
          >
            <div>
              <div className="text-sm text-gray-600">
                {new Date(entry.date).toLocaleDateString()}
              </div>
              <div className="font-medium">
                Rating: {entry.rating}
              </div>
            </div>
            <div className={`text-sm text-gray-600`}>
              {entry.totalCount > 0 
                ? `${Math.round((entry.correctCount / entry.totalCount) * 100)}% accuracy` 
                : '0% accuracy'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 