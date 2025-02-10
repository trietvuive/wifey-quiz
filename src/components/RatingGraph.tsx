import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { EloHistory } from '@/types/quiz';

interface RatingGraphProps {
  history: EloHistory[];
}

export default function RatingGraph({ history }: RatingGraphProps) {
  const data = history.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    rating: item.rating,
    accuracy: `${Math.round((item.correctCount / item.totalCount) * 100)}%`
  }));

  return (
    <div className="h-64 w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date"/>
          <YAxis domain={[200, 800]} />
          <Tooltip 
            content={({ payload }) => {
              if (!payload?.length) return null;
              const data = payload[0].payload;
              return (
                <div className="bg-white p-2 shadow-lg rounded-lg border">
                  <p className="text-sm text-gray-600">{data.date}</p>
                  <p className="font-bold text-indigo-600">Rating: {data.rating}</p>
                  <p className="text-sm text-gray-600">Accuracy: {data.accuracy}</p>
                </div>
              );
            }}
          />
          <Line 
            type="monotone" 
            dataKey="rating" 
            stroke="#4F46E5" 
            strokeWidth={2}
            dot={{ fill: '#4F46E5' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 