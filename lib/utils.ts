import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { RecentSignup } from '@/lib/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAMES = [
  'Adaeze', 'Tunde', 'Chioma', 'Emeka', 'Funke', 'Ibrahim', 'Ngozi',
  'Chinedu', 'Aisha', 'Oluwaseun', 'Amaka', 'Kayode', 'Blessing', 'Femi',
  'Zainab', 'Chukwudi', 'Halima', 'Bola', 'Ifeanyi', 'Sade',
];

const AREAS = [
  'Lekki', 'Victoria Island', 'Ikoyi', 'Yaba', 'Ikeja',
  'Ajah', 'Surulere', 'Maryland', 'Gbagada', 'Magodo',
];

const TIMES = [
  'just now', '1 min ago', '2 mins ago', '3 mins ago',
  '5 mins ago', '8 mins ago', '12 mins ago',
];

export function generateRecentSignup(): RecentSignup {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const area = AREAS[Math.floor(Math.random() * AREAS.length)];
  const time = TIMES[Math.floor(Math.random() * TIMES.length)];

  return { name, area, time };
}
