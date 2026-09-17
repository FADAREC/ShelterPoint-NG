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
          signupCount: data.signupCount || 0,
          spotsLeft: data.spotsLeft ?? 500,
        });
      })
      .catch(() => {});
  }, []);

  if (!mounted) {
    return (
      <div className="inline-flex items-center gap-6 bg-white/10 px-5 py-3 rounded-lg backdrop-blur-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">-</div>
          <div className="text-xs text-white/70">Founding members</div>
        </div>
        <div className="w-px h-8 bg-white/20" aria-hidden="true" />
        <div className="text-center">
          <div className="text-2xl font-bold text-white">500</div>
          <div className="text-xs text-white/70">Spots left</div>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-6 bg-white/10 px-5 py-3 rounded-lg backdrop-blur-sm">
      <div className="text-center">
        <div className="text-2xl font-bold text-white">{stats.signupCount}</div>
        <div className="text-xs text-white/70">Founding members</div>
      </div>

      <div className="w-px h-8 bg-white/20" aria-hidden="true" />

      <div className="text-center">
        <div className="text-2xl font-bold text-white">{stats.spotsLeft}</div>
        <div className="text-xs text-white/70">Spots remaining</div>
      </div>
    </div>
  );
}
