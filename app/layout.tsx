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
  title: 'ShelterPoint NG | Founding Member Access',
  description: 'Private waitlist for verified Lagos housing. Priority access, founding member rates, zero fake listings. For professionals who refuse agent wahala.',
  keywords: ['Lagos housing', 'verified rentals Lagos', 'Lekki apartments', 'Victoria Island rentals', 'no agent fees', 'founding member housing', 'Lagos professionals'],
  authors: [{ name: 'ShelterPoint NG' }],
  openGraph: {
    title: 'ShelterPoint NG | Founding Member Access',
    description: 'Priority access to verified Lagos homes. Founding member rates. Limited spots.',
    type: 'website',
    locale: 'en_NG',
    siteName: 'ShelterPoint NG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShelterPoint NG | Founding Member Access',
    description: 'Verified Lagos homes for people who refuse agent wahala. Limited founding spots.',
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
      <body className="font-body bg-neutral-50 text-neutral-900 antialiased">{children}</body>
    </html>
  );
}
