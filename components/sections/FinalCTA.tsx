'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';

export default function FinalCTA() {
  const [stats, setStats] = useState({ signupCount: 0, spotsLeft: 500 });

  useEffect(() => {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-2xl mx-auto px-5 text-center">
        <p className="text-xs font-medium tracking-widest text-white/40 uppercase mb-4">
          Founding member access
        </p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4 leading-tight">
          Limited spots. Preferred rate. Priority access.
        </h2>
        <p className="text-white/50 mb-10 max-w-md mx-auto leading-relaxed">
          {stats.signupCount > 0
            ? `${stats.signupCount} founding members have joined. ${stats.spotsLeft} preferred spots remain.`
            : 'Join the private list for Lagos professionals who refuse agent wahala.'}
        </p>
        <Button variant="secondary" size="lg" onClick={scrollToTop}>
          Claim your founding spot
        </Button>
        <p className="text-xs text-white/30 mt-6">
          No payment required. Early members lock the better rate.
        </p>
      </div>
    </section>
  );
}
