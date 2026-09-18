'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
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
    if (ref) {
      setReferredBy(ref);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerError(null);
    setErrors({});

    if (!email || !email.includes('@')) {
      setErrors({ email: 'Please enter a valid email address' });
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
        setServerError(data.message || 'Something went wrong. Please try again.');
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
      setServerError('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted && spotNumber !== null) {
    return (
      <Card variant="elevated" className="p-8 text-center space-y-6">
        <div className="w-12 h-12 mx-auto rounded-full bg-neutral-900 flex items-center justify-center">
          <span className="text-white text-lg">✓</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-neutral-900 tracking-tight">
            You are on the list
          </h2>
          <p className="text-neutral-500">
            Founding member{' '}
            <span className="font-semibold text-neutral-900">#{spotNumber}</span>
          </p>
        </div>

        <div className="bg-neutral-50 rounded-xl p-4 text-left space-y-2">
          <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
            Locked in
          </p>
          <ul className="text-sm text-neutral-700 space-y-1.5">
            <li>Priority access at launch</li>
            <li>Founding member rate</li>
            <li>First look at verified listings</li>
          </ul>
        </div>

        <div className="space-y-3 pt-1">
          <p className="text-sm text-neutral-500">
            Complete your profile, then invite friends for free inspection credits.
          </p>
          <a
            href={`/welcome?spot=${spotNumber}&ref=${referralCode}`}
            className="inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-5 py-3.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
          >
            Complete profile
          </a>
        </div>

        <p className="text-xs text-neutral-400">Check your email for confirmation.</p>
      </Card>
    );
  }

  return (
    <Card variant="elevated" className="p-8">
      <div className="space-y-1 mb-6 text-center">
        <h2 className="text-xl font-semibold text-neutral-900 tracking-tight">
          Claim your founding spot
        </h2>
        <p className="text-sm text-neutral-500">
          Priority access and preferred rate for early members
        </p>
      </div>

      {serverError && (
        <div className="mb-4 p-3 bg-red-50 rounded-xl">
          <p className="text-sm text-red-700">{serverError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email address"
          name="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({});
            setServerError(null);
          }}
          error={errors.email}
          disabled={isSubmitting}
          placeholder="you@email.com"
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isSubmitting}
        >
          Join the private waitlist
        </Button>

        <p className="text-xs text-center text-neutral-400">
          500 founding member spots only
        </p>
      </form>
    </Card>
  );
}
