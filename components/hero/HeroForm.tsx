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

    } catch (error) {
      setServerError('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted && spotNumber !== null) {
    return (
      <Card variant="elevated" className="p-6 sm:p-8 text-center space-y-5">
        <div className="w-14 h-14 mx-auto rounded-full bg-semantic-success/15 flex items-center justify-center">
          <span className="text-2xl">✓</span>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-neutral-900">
            You are on the list
          </h2>
          <p className="text-neutral-700">
            You are founding member <span className="font-semibold text-brand-primary">#{spotNumber}</span>
          </p>
        </div>

        <div className="bg-neutral-100 rounded-lg p-4 text-left space-y-1">
          <p className="text-sm font-medium text-neutral-900">What you locked in:</p>
          <ul className="text-sm text-neutral-700 space-y-1">
            <li>• Priority access at launch</li>
            <li>• Founding member rate</li>
            <li>• First look at verified listings</li>
          </ul>
        </div>

        <div className="pt-2 space-y-3">
          <p className="text-sm text-neutral-600">
            Complete your profile so we can match you better, then invite friends for free inspection credits.
          </p>
          <a
            href={`/welcome?spot=${spotNumber}&ref=${referralCode}`}
            className="inline-flex w-full items-center justify-center rounded-lg bg-brand-primary px-5 py-3 text-sm font-semibold text-white hover:bg-brand-primary-dark transition-colors"
          >
            Complete profile and get referral link
          </a>
        </div>

        <p className="text-xs text-neutral-500">
          Check your email for confirmation.
        </p>
      </Card>
    );
  }

  return (
    <Card variant="elevated" className="p-6 sm:p-8">
      <div className="space-y-1 mb-5 text-center">
        <h2 className="text-lg font-semibold text-neutral-900">
          Claim your founding spot
        </h2>
        <p className="text-sm text-neutral-600">
          Priority access + preferred rate for early members
        </p>
      </div>

      {serverError && (
        <div className="mb-4 p-3 bg-semantic-error-bg border border-semantic-error/30 rounded-lg">
          <p className="text-sm text-neutral-900">{serverError}</p>
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

        <p className="text-xs text-center text-neutral-500">
          Only 500 founding member spots available
        </p>
      </form>
    </Card>
  );
}
