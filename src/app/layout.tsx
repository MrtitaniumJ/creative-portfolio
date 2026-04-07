import type { Metadata } from 'next';
import { Fraunces, Noto_Serif, Plus_Jakarta_Sans, Space_Mono, Syne } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/layout/CustomCursor';
import FloatingDock from '@/components/layout/FloatingDock';
import SmoothScroll from '@/components/layout/SmoothScroll';
import AmbientLayer from '@/components/layout/AmbientLayer';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700', '800'],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-accent',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Jatin Sharma | Full-stack engineer & builder',
  description:
    'Personal site of Jatin Sharma—product-minded engineer who enjoys interfaces that feel obvious and systems that stay trustworthy after launch.',
  openGraph: {
    title: 'Jatin Sharma | Full-stack engineer & builder',
    description:
      'Portfolio, projects, and notes from someone who ships career tools, mentors peers, and sweats the details.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="relative">
      <body
        className={`${syne.variable} ${plusJakarta.variable} ${notoSerif.variable} ${spaceMono.variable} ${fraunces.variable} antialiased min-h-screen relative font-sans text-foreground selection:bg-violet-200 selection:text-violet-900`}
      >
        <div className="noise-overlay" />
        <SmoothScroll>
          <AmbientLayer />
          <CustomCursor />
          {children}
          <FloatingDock />
        </SmoothScroll>
      </body>
    </html>
  );
}
