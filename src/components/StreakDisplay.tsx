import React from 'react';
import { StreakData } from '@/types';
import { useEffect, useState } from 'react';
import { formatDate } from '@/utils/dateFormatter';

export default function StreakDisplay() {
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    lastLoginDate: formatDate(new Date()),
    longestStreak: 0
  });

  useEffect(() => {
    // Load streak data from localStorage
    const loadStreak = () => {
      const savedStreak = localStorage.getItem('quizStreak');
      if (savedStreak) {
        const streakData: StreakData = JSON.parse(savedStreak);
        const today = formatDate(new Date());
        const lastLogin = streakData.lastLoginDate;
        
        if (today === lastLogin) {
          // Already logged in today
          setStreak(streakData);
        } else if (new Date(lastLogin).getTime() + 86400000 >= new Date().getTime()) {
          // Consecutive day
          const newStreak = {
            currentStreak: streakData.currentStreak + 1,
            lastLoginDate: today,
            longestStreak: Math.max(streakData.longestStreak, streakData.currentStreak + 1)
          };
          setStreak(newStreak);
          localStorage.setItem('quizStreak', JSON.stringify(newStreak));
        } else {
          // Streak broken
          const newStreak = {
            currentStreak: 1,
            lastLoginDate: today,
            longestStreak: streakData.longestStreak
          };
          setStreak(newStreak);
          localStorage.setItem('quizStreak', JSON.stringify(newStreak));
        }
      } else {
        // First time login
        const newStreak = {
          currentStreak: 1,
          lastLoginDate: formatDate(new Date()),
          longestStreak: 1
        };
        setStreak(newStreak);
        localStorage.setItem('quizStreak', JSON.stringify(newStreak));
      }
    };

    loadStreak();
  }, []);

  return (
    <div className="flex items-center justify-center gap-4 mb-6 text-center">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="text-3xl font-bold text-indigo-600">🔥 {streak.currentStreak}</div>
        <div className="text-sm text-gray-600">Day Streak</div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="text-3xl font-bold text-indigo-600">🏆 {streak.longestStreak}</div>
        <div className="text-sm text-gray-600">Best Streak</div>
      </div>
    </div>
  );
} 