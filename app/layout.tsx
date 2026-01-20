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
  title: 'ShelterPoint NG - Verified Lagos Housing in 14 Days',
  description: 'Connect directly with verified property owners in Lagos. Transparent pricing, verified listings, 2-week move-in guarantee. Join 500+ Lagosians on the waitlist.',
  keywords: ['Lagos housing', 'Nigeria rentals', 'property Lagos', 'house hunting Lagos', 'verified rentals Nigeria', 'affordable housing Lagos', 'Lekki apartments', 'VI rentals'],
  authors: [{ name: 'ShelterPoint NG' }],
  openGraph: {
    title: 'ShelterPoint NG - Verified Lagos Housing',
    description: 'Connect directly with verified property owners. 2-week move-in guarantee.',
    type: 'website',
    locale: 'en_NG',
    siteName: 'ShelterPoint NG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShelterPoint NG - Verified Lagos Housing',
    description: 'Direct owner connections. 2-week move-in guarantee.',
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