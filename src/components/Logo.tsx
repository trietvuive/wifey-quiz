import React from 'react';
import Link from 'next/link';

export default function Logo() {
  return (
    <div className="flex items-center justify-between mb-4">
      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className="bg-white text-white w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold">
          🦆
        </div>
        <div className="text-2xl font-bold text-indigo-600">
          Wifey GMAT Prep
        </div>
      </Link>
      <Link 
        href="/history" 
        className="text-indigo-600 hover:text-indigo-800 font-medium"
      >
        View History
      </Link>
    </div>
  );
}