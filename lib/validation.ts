import type { WaitlistFormData, FormErrors } from './types';

export function validateForm(data: WaitlistFormData): FormErrors {
  const errors: FormErrors = {};
  
  if (!data.name.trim()) {
    errors.name = 'Please enter your name';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email';
  }
  
  if (!data.role) {
    errors.role = 'Please select an option';
  }
  
  if (!data.area) {
    errors.area = 'Please select your area';
  }
  
  return errors;
}