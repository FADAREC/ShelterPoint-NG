'use client';

import { useEffect, useState } from 'react';

export default function HeroStats() {
  const [stats, setStats] = useState({ signupCount: 0, spotsLeft: 500 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    fetch('/api/waitlist')
      .then(res => res.json())
      .then(data => {
        setStats({
          signupCount: data.signupCount,
          spotsLeft: data.spotsLeft,
        });
      })
      .catch(() => {
      });
  }, []);

  if (!mounted) return null;

  return (
    <div className="inline-flex items-center gap-6 bg-white bg-opacity-10 px-5 py-3 rounded backdrop-blur-sm">
      <div className="text-center">
        <div className="text-heading-h3 font-bold text-white">{stats.signupCount}</div>
        <div className="text-body-small text-white opacity-80">Members joined</div>
      </div>
      
      <div className="w-px h-8 bg-white opacity-20" aria-hidden="true" />
      
      <div className="text-center">
        <div className="text-heading-h3 font-bold text-white">{stats.spotsLeft}</div>
        <div className="text-body-small text-white opacity-80">Spots remaining</div>
      </div>
    </div>
  );
}