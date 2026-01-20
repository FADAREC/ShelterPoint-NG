'use client';

import { useEffect, useState } from 'react';

export default function UrgencyBar() {
  const [stats, setStats] = useState({ spotsLeft: 500, days: 6, hours: 14, minutes: 33 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Fetch real stats from API
    fetch('/api/waitlist')
      .then(res => res.json())
      .then(data => {
        setStats(prev => ({ ...prev, spotsLeft: data.spotsLeft }));
      })
      .catch(err => console.error('Failed to fetch stats:', err));

    const timer = setInterval(() => {
      setStats(prev => {
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1 };
        if (prev.hours > 0) return { ...prev, days: prev.days, hours: prev.hours - 1, minutes: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        return prev;
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="sticky top-0 z-50 bg-primary text-neutral-warm py-2 px-4 text-center text-sm font-bold">
        ⚡ BETA FILLING FAST: Limited spots remaining
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-50 bg-primary text-neutral-warm py-2 px-4 text-center text-sm font-bold">
      ⚡ BETA FILLING FAST: Only {stats.spotsLeft} spots left | Early access ends in {stats.days}d {stats.hours}h {stats.minutes}m
    </div>
  );
}