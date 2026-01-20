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
          signupCount: data.signupCount,
          spotsLeft: data.spotsLeft,
        });
      })
      .catch(() => {
        // Fail silently
      });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-10 bg-brand-primary">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-heading-h2 text-white mb-3">
          Join the waitlist today
        </h2>
        <p className="text-body-large text-white opacity-90 mb-6 max-w-2xl mx-auto">
          {stats.signupCount > 0 
            ? `${stats.signupCount} members have already joined. ${stats.spotsLeft} spots remain for early access benefits.`
            : 'Be among the first to access verified Lagos housing with transparent pricing and guaranteed timelines.'}
        </p>
        <Button
          variant="secondary"
          size="lg"
          onClick={scrollToTop}
        >
          Return to form
        </Button>
        <p className="text-body-small text-white opacity-80 mt-4">
          No payment required. Launch targeted for March 2026.
        </p>
      </div>
    </section>
  );
}