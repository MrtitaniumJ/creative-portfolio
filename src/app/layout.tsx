import type { Metadata } from 'next';
import { Inter, Noto_Serif } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/layout/CustomCursor';
import FloatingDock from '@/components/layout/FloatingDock';
import SmoothScroll from '@/components/layout/SmoothScroll';
import AmbientLayer from '@/components/layout/AmbientLayer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const notoSerif = Noto_Serif({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-serif' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Jatin Sharma | Full Stack Software Engineer',
  description: 'Premium portfolio of Jatin Sharma, showcasing Full Stack engineering and creative design.',
  openGraph: {
    title: 'Jatin Sharma | Full Stack Software Engineer',
    description: 'Scalable SaaS, automation, and premium web experiences.',
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
      <body className={`${inter.variable} ${notoSerif.variable} antialiased min-h-screen relative font-sans text-foreground selection:bg-violet-200 selection:text-violet-900`}>
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
