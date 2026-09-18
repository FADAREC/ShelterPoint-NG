'use client';

import { useState, useEffect } from 'react';
import type { FormErrors, SignupResponse } from '@/lib/types';

export default function HeroForm() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [spotNumber, setSpotNumber] = useState<number | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [referredBy, setReferredBy] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) setReferredBy(ref);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerError(null);
    setErrors({});

    if (!email || !email.includes('@')) {
      setErrors({ email: 'Enter a valid email' });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          referralCode: referredBy || undefined,
        }),
      });

      const data: SignupResponse = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setSpotNumber(data.spotNumber || 0);
          setReferralCode(data.referralCode || null);
          setSubmitted(true);
          return;
        }
        setServerError(data.message || 'Something went wrong');
        return;
      }

      setSpotNumber(data.spotNumber);
      setReferralCode(data.referralCode);
      setSubmitted(true);

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('sp_email', email.trim().toLowerCase());
        sessionStorage.setItem('sp_spot', String(data.spotNumber));
        sessionStorage.setItem('sp_ref', data.referralCode);
      }
    } catch {
      setServerError('Network error. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted && spotNumber !== null) {
    return (
      <div className="w-full max-w-md mx-auto text-center space-y-6">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-black text-lg font-medium">
          ✓
        </div>
        <div className="space-y-2">
          <p className="text-xl font-semibold text-white tracking-tight">
            You are in
          </p>
          <p className="text-[15px] text-white/50">
            Founding member #{spotNumber}
          </p>
        </div>
        <div className="text-[14px] text-white/40 space-y-1">
          <p>Priority access · Preferred rate · First listings</p>
        </div>
        <a
          href={`/welcome?spot=${spotNumber}&ref=${referralCode}`}
          className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-black text-[15px] font-medium hover:bg-white/90 transition-colors"
        >
          Continue
        </a>
        <p className="text-[12px] text-white/25">Check your email</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {serverError && (
        <p className="mb-4 text-[13px] text-red-400 text-center">{serverError}</p>
      )}
      {errors.email && (
        <p className="mb-4 text-[13px] text-red-400 text-center">{errors.email}</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({});
            setServerError(null);
          }}
          disabled={isSubmitting}
          placeholder="Email address"
          required
          className="flex-1 h-12 px-5 rounded-full bg-white/[0.08] border border-white/[0.12] text-white text-[15px] placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.1] transition-all"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-12 px-7 rounded-full bg-white text-black text-[15px] font-medium hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isSubmitting ? 'Joining...' : 'Get access'}
        </button>
      </form>

      <p className="mt-4 text-[12px] text-white/25 text-center">
        No payment. Priority when we open.
      </p>
    </div>
  );
}
