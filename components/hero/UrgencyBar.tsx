'use client';

import { useEffect, useState } from 'react';

export default function UrgencyBar() {
  const [spotsLeft, setSpotsLeft] = useState(500);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    fetch('/api/waitlist')
      .then(res => res.json())
      .then(data => {
        if (typeof data.spotsLeft === 'number') {
          setSpotsLeft(data.spotsLeft);
        }
      })
      .catch(() => {});
  }, []);

  if (!mounted) {
    return (
      <div className="sticky top-0 z-50 bg-brand-primary text-white py-2.5 px-4 text-center text-sm font-medium">
        Founding member spots are limited. Priority access for the first 500 only.
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-50 bg-brand-primary text-white py-2.5 px-4 text-center text-sm font-medium">
      {spotsLeft > 0
        ? `Only ${spotsLeft} founding member spots left. Priority access and preferred rate for early members.`
        : 'Founding member list is full. Join the general waitlist for future access.'}
    </div>
  );
}
