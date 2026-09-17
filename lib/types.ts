export interface WaitlistEmailFormData {
  email: string;
  referralCode?: string;
}

export interface WaitlistProfileFormData {
  name: string;
  role: 'seeker' | 'owner' | 'both' | '';
  area: string;
}

export interface WaitlistFormData {
  name: string;
  email: string;
  role: 'seeker' | 'owner' | 'both' | '';
  area: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  role?: string;
  area?: string;
}

export interface RecentSignup {
  name: string;
  area: string;
  time: string;
}

export interface WaitlistStats {
  signupCount: number;
  spotsLeft: number;
  lastUpdated: number;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  spotNumber: number;
  referralCode: string;
  alreadyExists?: boolean;
}
