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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://shelterpoint-ng.onrender.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'ShelterPoint | Check cost before you pay',
  description:
    'ShelterCheck shows the real move-in cost of any Lagos rent quote. Join ShelterPoint for founding access when verified homes go live.',
  keywords: [
    'Lagos rent calculator',
    'move-in cost Lagos',
    'Lagos housing',
    'ShelterCheck',
    'founding member',
  ],
  authors: [{ name: 'ShelterPoint' }],
  openGraph: {
    title: 'ShelterPoint | Check cost before you pay',
    description:
      'Free move-in cost check. Founding access for verified homes when supply is ready.',
    type: 'website',
    locale: 'en_NG',
    siteName: 'ShelterPoint',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShelterPoint | Check cost before you pay',
    description:
      'ShelterCheck: day-one cash and fees before you pay anyone in Lagos.',
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
