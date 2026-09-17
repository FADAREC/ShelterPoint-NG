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
    <section className="py-12 bg-neutral-900">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <p className="text-sm font-medium text-brand-primary mb-3 tracking-wide">
          FOUNDING MEMBER ACCESS
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Limited spots. Preferred rate. Priority access.
        </h2>
        <p className="text-neutral-300 mb-8 max-w-xl mx-auto">
          {stats.signupCount > 0
            ? `${stats.signupCount} founding members have already joined. ${stats.spotsLeft} preferred spots remain.`
            : 'Join the private list for Lagos professionals who refuse agent wahala.'}
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={scrollToTop}
        >
          Claim your founding spot
        </Button>
        <p className="text-sm text-neutral-400 mt-5">
          No payment required. Early members lock the better rate.
        </p>
      </div>
    </section>
  );
}
