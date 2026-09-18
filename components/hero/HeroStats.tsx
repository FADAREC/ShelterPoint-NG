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
      <div className="inline-flex items-center gap-8 rounded-2xl border border-white/10 bg-white/5 px-8 py-4">
        <div className="text-center">
          <div className="text-2xl font-semibold text-white tracking-tight">-</div>
          <div className="text-xs text-white/40 mt-0.5">Members</div>
        </div>
        <div className="w-px h-8 bg-white/10" aria-hidden="true" />
        <div className="text-center">
          <div className="text-2xl font-semibold text-white tracking-tight">500</div>
          <div className="text-xs text-white/40 mt-0.5">Spots left</div>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-8 rounded-2xl border border-white/10 bg-white/5 px-8 py-4">
      <div className="text-center">
        <div className="text-2xl font-semibold text-white tracking-tight">{stats.signupCount}</div>
        <div className="text-xs text-white/40 mt-0.5">Members</div>
      </div>
      <div className="w-px h-8 bg-white/10" aria-hidden="true" />
      <div className="text-center">
        <div className="text-2xl font-semibold text-white tracking-tight">{stats.spotsLeft}</div>
        <div className="text-xs text-white/40 mt-0.5">Spots left</div>
      </div>
    </div>
  );
}
