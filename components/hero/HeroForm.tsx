'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import type { WaitlistFormData, FormErrors } from '@/lib/types';

const ROLE_OPTIONS = [
  { value: '', label: 'Select your interest' },
  { value: 'seeker', label: 'Find a home (Tenant)' },
  { value: 'owner', label: 'List property (Landlord)' },
  { value: 'both', label: 'Both' },
];

const AREA_OPTIONS = [
  { value: '', label: 'Select preferred area' },
  { value: 'lekki', label: 'Lekki' },
  { value: 'ikeja', label: 'Ikeja' },
  { value: 'vi', label: 'Victoria Island' },
  { value: 'yaba', label: 'Yaba' },
  { value: 'ikoyi', label: 'Ikoyi' },
  { value: 'surulere', label: 'Surulere' },
  { value: 'ajah', label: 'Ajah' },
  { value: 'maryland', label: 'Maryland' },
  { value: 'festac', label: 'Festac' },
  { value: 'other', label: 'Other Lagos area' },
];

const APARTMENT_TYPE = [
  { value: '', label: 'Select apartment type' },
  { value: 'Mini-flat', label: 'Mini-flat' },
  { value: 'serviced-apartment', label: 'Serviced Apartment' },
  { value: 'duplex', label: 'Duplex' },
  { value: 'flat', label: 'Flat' },
  { value: 'detached-house', label: 'Detached House' },
  { value: 'semi-detached-house', label: 'Semi-Detached House' },
  { value: 'terraced-house', label: 'Terraced House' },
  { value: 'other', label: 'Other' },
  { value: 'studio-apartment', label: 'Studio Apartment' },
    
]

export default function HeroForm() {
  const [formData, setFormData] = useState<WaitlistFormData>({
    name: '',
    email: '',
    role: '',
    area: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [spotNumber, setSpotNumber] = useState<number | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setServerError(data.error || 'Something went wrong. Please try again.');
        }
        return;
      }

      setSpotNumber(data.spotNumber);
      setSubmitted(true);
      setFormData({ name: '', email: '', role: '', area: '' });
      
      setTimeout(() => {
        setSubmitted(false);
        setSpotNumber(null);
      }, 8000);

    } catch (error) {
      setServerError('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card variant="elevated" className="max-w-xl mx-auto p-6">
      <div className="space-y-2 mb-6">
        <h2 className="text-heading-h3 text-neutral-900">Join the waitlist</h2>
        <p className="text-body-base text-neutral-700">
          Early members receive 50% off their first transaction (normally 7% of rent value).
        </p>
      </div>
      
      {submitted && spotNumber && (
        <div className="mb-6 p-4 bg-semantic-success-bg border border-semantic-success rounded">
          <p className="text-body-base font-medium text-neutral-900">
            Confirmed. You're spot #{spotNumber} on the waitlist.
          </p>
          <p className="text-body-small text-neutral-700 mt-1">
            Check your email for next steps.
          </p>
        </div>
      )}

      {serverError && (
        <div className="mb-6 p-4 bg-semantic-error-bg border border-semantic-error rounded">
          <p className="text-body-small text-neutral-900">{serverError}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          disabled={isSubmitting}
          required
        />
        
        <Input
          label="Email address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isSubmitting}
          required
        />
        
        <Select
          label="Your interest"
          name="role"
          value={formData.role}
          onChange={handleChange}
          options={ROLE_OPTIONS}
          error={errors.role}
          disabled={isSubmitting}
          required
        />
        
        <Select
          label="Preferred area"
          name="area"
          value={formData.area}
          onChange={handleChange}
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
          disabled={submitted}
        >
          {submitted ? 'Confirmed' : 'Join waitlist'}
        </Button>

        <p className="text-body-tiny text-neutral-700 text-center">
          NDPR compliant. Unsubscribe anytime.
        </p>
      </form>
    </Card>
  );
}