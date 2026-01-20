'use client';

import { useEffect, useState } from 'react';
import type { RecentSignup } from '@/lib/types';
import { generateRecentSignup } from '@/lib/utils';

export default function RecentSignupToast() {
  const [recentSignups, setRecentSignups] = useState<RecentSignup[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show first signup after 3 seconds
    const initialTimer = setTimeout(() => {
      setRecentSignups([generateRecentSignup()]);
      setVisible(true);
      
      // Hide after 5 seconds
      setTimeout(() => setVisible(false), 5000);
    }, 3000);

    // Generate new signups periodically
    const interval = setInterval(() => {
      const newSignup = generateRecentSignup();
      setRecentSignups([newSignup]);
      setVisible(true);
      
      setTimeout(() => setVisible(false), 5000);
    }, 25000); // Every 25 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!visible || recentSignups.length === 0) return null;

  const signup = recentSignups[0];

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-xs">
      <div
        className="bg-white rounded-lg shadow-lg p-3 border-l-4 border-green-600 flex items-center gap-3 animate-slide-in"
        role="status"
        aria-live="polite"
      >
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold" aria-hidden="true">
          {signup.name.charAt(0)}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">{signup.name} just joined</p>
          <p className="text-xs text-gray-600">{signup.area} • {signup.time}</p>
        </div>
      </div>
    </div>
  );
}