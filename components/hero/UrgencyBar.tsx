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

  return (
    <div className="sticky top-0 z-50 bg-neutral-900 border-b border-white/5 text-white/80 py-2.5 px-4 text-center text-xs sm:text-sm tracking-wide">
      {mounted && spotsLeft > 0
        ? `${spotsLeft} founding spots remaining. Priority access and preferred rate for early members.`
        : 'Founding member access is limited. Priority rate for early members only.'}
    </div>
  );
}
