'use client';

import { useEffect, useState } from 'react';
import { getWaitlistStats, hasUserSignedUp } from '@/lib/storage';

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(122);

  useEffect(() => {
    // Don't show if user already signed up
    if (hasUserSignedUp()) return;

    setSpotsLeft(getWaitlistStats().spotsLeft);

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from top of viewport
      if (e.clientY <= 0 && !isOpen) {
        setIsOpen(true);
      }
    };

    // Add slight delay before enabling exit intent
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClaim = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-heading"
    >
      <div className="bg-white rounded-2xl p-8 max-w-md relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          aria-label="Close popup"
        >
          ×
        </button>
        <h3 id="exit-intent-heading" className="text-2xl font-bold text-gray-900 mb-4">
          Wait! Don't Miss Out 🚨
        </h3>
        <p className="text-gray-700 mb-6">
          Only <span className="font-bold text-red-600">{spotsLeft} beta spots</span> left. Early members save ₦70,000+ on their first rental. This offer disappears when we hit 500 signups.
        </p>
        <button
          onClick={handleClaim}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 rounded-lg hover:shadow-lg transition-all"
        >
          Claim My Spot Before It's Gone
        </button>
      </div>
    </div>
  );
}