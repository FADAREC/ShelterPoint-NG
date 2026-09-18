import type { Metadata } from 'next';
import { Inter, DM_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'ShelterPoint | Founding Access',
  description: 'Verified Lagos homes for people who refuse agent wahala. Priority access and preferred rates for founding members.',
  keywords: ['Lagos housing', 'verified rentals Lagos', 'Lekki apartments', 'Victoria Island rentals', 'founding member'],
  authors: [{ name: 'ShelterPoint' }],
  openGraph: {
    title: 'ShelterPoint | Founding Access',
    description: 'Verified Lagos homes. Priority access. Preferred rate. Limited founding spots.',
    type: 'website',
    locale: 'en_NG',
    siteName: 'ShelterPoint',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShelterPoint | Founding Access',
    description: 'Verified Lagos homes for people who refuse agent wahala.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`}>
      <body className="font-body bg-black text-white antialiased">{children}</body>
    </html>
  );
}
