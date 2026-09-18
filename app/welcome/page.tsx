'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import type { FormErrors } from '@/lib/types';

const ROLE_OPTIONS = [
  { value: '', label: 'Select your interest' },
  { value: 'seeker', label: 'Find a home' },
  { value: 'owner', label: 'List property' },
  { value: 'both', label: 'Both' },
];

const AREA_OPTIONS = [
  { value: '', label: 'Preferred area' },
  { value: 'lekki', label: 'Lekki' },
  { value: 'vi', label: 'Victoria Island' },
  { value: 'ikoyi', label: 'Ikoyi' },
  { value: 'yaba', label: 'Yaba' },
  { value: 'ikeja', label: 'Ikeja' },
  { value: 'ajah', label: 'Ajah' },
  { value: 'surulere', label: 'Surulere' },
  { value: 'maryland', label: 'Maryland' },
  { value: 'other', label: 'Other Lagos area' },
];

function WelcomeContent() {
  const searchParams = useSearchParams();
  const [spotNumber, setSpotNumber] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [area, setArea] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileDone, setProfileDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    const spot = searchParams.get('spot');
    const ref = searchParams.get('ref');
    if (spot) setSpotNumber(spot);
    if (ref) setReferralCode(ref);

    if (typeof window !== 'undefined') {
      const storedEmail = sessionStorage.getItem('sp_email');
      const storedSpot = sessionStorage.getItem('sp_spot');
      const storedRef = sessionStorage.getItem('sp_ref');
      if (storedEmail) setEmail(storedEmail);
      if (storedSpot && !spot) setSpotNumber(storedSpot);
      if (storedRef && !ref) setReferralCode(storedRef);
    }
  }, [searchParams]);

  const shareUrl =
    typeof window !== 'undefined' && referralCode
      ? `${window.location.origin}/?ref=${referralCode}`
      : '';

  const handleCopy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerError(null);
    setErrors({});

    if (!name || name.length < 2) {
      setErrors({ name: 'Enter your name' });
      setIsSubmitting(false);
      return;
    }
    if (!role) {
      setErrors({ role: 'Select your interest' });
      setIsSubmitting(false);
      return;
    }
    if (!area) {
      setErrors({ area: 'Select an area' });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, role, area }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.error || 'Something went wrong');
        return;
      }

      setProfileDone(true);
      if (data.referralCode) setReferralCode(data.referralCode);
    } catch {
      setServerError('Network error. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-md mx-auto px-5 py-16 sm:py-24">
        <div className="text-center mb-12 space-y-3">
          <p className="text-[13px] tracking-[0.12em] uppercase text-white/35">
            Founding member
          </p>
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            You are in
          </h1>
          {spotNumber && (
            <p className="text-[15px] text-white/45">
              Spot #{spotNumber} of 500
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 mb-6">
          <p className="text-[12px] tracking-wider uppercase text-white/30 mb-4">
            Locked in
          </p>
          <ul className="space-y-3 text-[15px] text-white/70">
            <li>Priority access when we open</li>
            <li>Founding member rate</li>
            <li>First look at verified listings</li>
          </ul>
        </div>

        {!profileDone ? (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 mb-6">
            <h2 className="text-lg font-semibold text-white tracking-tight mb-1">
              Complete your profile
            </h2>
            <p className="text-[14px] text-white/40 mb-6">
              So we can match you properly.
            </p>

            {serverError && (
              <p className="mb-4 text-[13px] text-red-400">{serverError}</p>
            )}

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full h-12 px-4 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-[15px] placeholder:text-white/30 focus:outline-none focus:border-white/25"
                />
                {errors.name && (
                  <p className="mt-1.5 text-[13px] text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full h-12 px-4 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-[15px] focus:outline-none focus:border-white/25 appearance-none"
                >
                  {ROLE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value} className="bg-neutral-900">
                      {o.label}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <p className="mt-1.5 text-[13px] text-red-400">{errors.role}</p>
                )}
              </div>

              <div>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full h-12 px-4 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-[15px] focus:outline-none focus:border-white/25 appearance-none"
                >
                  {AREA_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value} className="bg-neutral-900">
                      {o.label}
                    </option>
                  ))}
                </select>
                {errors.area && (
                  <p className="mt-1.5 text-[13px] text-red-400">{errors.area}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-full bg-white text-black text-[15px] font-medium hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save and get referral link'}
              </button>
            </form>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 mb-6 text-center">
            <p className="text-[15px] text-white/70">Profile saved</p>
          </div>
        )}

        {referralCode && (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6">
            <h2 className="text-lg font-semibold text-white tracking-tight mb-1">
              Earn inspection credits
            </h2>
            <p className="text-[14px] text-white/40 mb-5">
              Every friend who joins with your link gives you 1 free inspection credit.
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 h-11 px-4 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white/70 text-[13px] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="h-11 px-5 rounded-full bg-white text-black text-[13px] font-medium hover:bg-white/90 transition-colors shrink-0"
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <p className="mt-4 text-[12px] text-white/25 text-center">
              Share on WhatsApp, X, or LinkedIn
            </p>
          </div>
        )}

        <p className="mt-10 text-center">
          <a href="/" className="text-[13px] text-white/30 hover:text-white/50 transition-colors">
            Back to home
          </a>
        </p>
      </div>
    </main>
  );
}

export default function WelcomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black">
          <p className="text-white/40 text-sm">Loading...</p>
        </div>
      }
    >
      <WelcomeContent />
    </Suspense>
  );
}
