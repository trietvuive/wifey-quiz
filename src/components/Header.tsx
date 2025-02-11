import React from 'react';
import Logo from './Logo';
import Link from 'next/link';

export default function Header({ title }: { title?: string }) {
  return (
    <div className="mb-6">
      <div className="text-center mb-6">
        <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
          <h2 className="text-2xl font-bold text-indigo-600">Welcome Duckey! 🦆</h2>
        </Link>
      </div>
      <Logo />
      {title && <h1 className="text-2xl font-bold mt-6">{title}</h1>}
    </div>
  );
} 