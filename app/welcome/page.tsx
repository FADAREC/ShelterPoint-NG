'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import type { FormErrors } from '@/lib/types';

const ROLE_OPTIONS = [
  { value: '', label: 'Select your interest' },
  { value: 'seeker', label: 'Find a home (Tenant)' },
  { value: 'owner', label: 'List property (Landlord)' },
  { value: 'both', label: 'Both' },
];

const AREA_OPTIONS = [
  { value: '', label: 'Select preferred area' },
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

  const shareUrl = typeof window !== 'undefined' && referralCode
    ? `${window.location.origin}/?ref=${referralCode}`
    : '';

  const handleCopy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerError(null);
    setErrors({});

    if (!name || name.length < 2) {
      setErrors({ name: 'Please enter your name' });
      setIsSubmitting(false);
      return;
    }
    if (!role) {
      setErrors({ role: 'Please select your interest' });
      setIsSubmitting(false);
      return;
    }
    if (!area) {
      setErrors({ area: 'Please select an area' });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          role,
          area,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.error || 'Something went wrong');
        return;
      }

      setProfileDone(true);
      if (data.referralCode) setReferralCode(data.referralCode);
    } catch {
      setServerError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="max-w-lg mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-brand-primary">FOUNDING MEMBER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            You are in
          </h1>
          {spotNumber && (
            <p className="text-lg text-neutral-700">
              Spot <span className="font-semibold text-brand-primary">#{spotNumber}</span> of 500
            </p>
          )}
        </div>

        {/* What they locked */}
        <Card variant="elevated" className="p-5 mb-6">
          <p className="text-sm font-medium text-neutral-900 mb-3">Your founding benefits</p>
          <ul className="space-y-2 text-sm text-neutral-700">
            <li className="flex gap-2">
              <span className="text-brand-primary">✓</span>
              Priority access when we open
            </li>
            <li className="flex gap-2">
              <span className="text-brand-primary">✓</span>
              Founding member rate (better than standard 7%)
            </li>
            <li className="flex gap-2">
              <span className="text-brand-primary">✓</span>
              First look at verified listings in Lekki, VI, Ikoyi and more
            </li>
          </ul>
        </Card>

        {/* Profile form */}
        {!profileDone ? (
          <Card variant="elevated" className="p-5 mb-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-1">
              Complete your profile
            </h2>
            <p className="text-sm text-neutral-600 mb-5">
              So we can match you with the right homes or landlords.
            </p>

            {serverError && (
              <div className="mb-4 p-3 bg-semantic-error-bg rounded-lg">
                <p className="text-sm text-neutral-900">{serverError}</p>
              </div>
            )}

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <Input
                label="Full name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                disabled={isSubmitting}
                required
              />
              <Select
                label="Your interest"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                options={ROLE_OPTIONS}
                error={errors.role}
                disabled={isSubmitting}
                required
              />
              <Select
                label="Preferred area"
                name="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                options={AREA_OPTIONS}
                error={errors.area}
                disabled={isSubmitting}
                required
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isSubmitting}
              >
                Save and get referral link
              </Button>
            </form>
          </Card>
        ) : (
          <Card variant="elevated" className="p-5 mb-6 text-center">
            <p className="text-sm font-medium text-semantic-success mb-1">Profile saved</p>
            <p className="text-sm text-neutral-600">We will use this to match you better.</p>
          </Card>
        )}

        {/* Referral section */}
        {referralCode && (
          <Card variant="elevated" className="p-5">
            <h2 className="text-lg font-semibold text-neutral-900 mb-1">
              Earn free inspection credits
            </h2>
            <p className="text-sm text-neutral-600 mb-4">
              Share your link. Every friend who joins gives you 1 free inspection credit when we launch.
            </p>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-800"
              />
              <Button
                type="button"
                variant="primary"
                onClick={handleCopy}
                className="shrink-0"
              >
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>

            <p className="text-xs text-neutral-500 text-center">
              Share on WhatsApp, X, or LinkedIn. Premium access is limited.
            </p>
          </Card>
        )}

        <p className="mt-8 text-center text-sm text-neutral-500">
          <a href="/" className="text-brand-primary hover:underline">
            Back to home
          </a>
        </p>
      </div>
    </main>
  );
}

export default function WelcomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <p className="text-neutral-600">Loading...</p>
      </div>
    }>
      <WelcomeContent />
    </Suspense>
  );
}
