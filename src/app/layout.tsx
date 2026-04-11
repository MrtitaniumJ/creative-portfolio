import type { Metadata } from 'next';
import Script from 'next/script';
import { Fraunces, Noto_Serif, Plus_Jakarta_Sans, Space_Mono, Syne } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/layout/CustomCursor';
import FloatingDock from '@/components/layout/FloatingDock';
import SmoothScroll from '@/components/layout/SmoothScroll';
import AmbientLayer from '@/components/layout/AmbientLayer';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import ThemeToggle from '@/components/layout/ThemeToggle';
import JsonLd from '@/components/seo/JsonLd';
import { getSiteUrl, SITE_DESCRIPTION, SITE_TITLE } from '@/lib/site';

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
  metadataBase: new URL(getSiteUrl()),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
        className={`${syne.variable} ${plusJakarta.variable} ${notoSerif.variable} ${spaceMono.variable} ${fraunces.variable} antialiased min-h-screen relative font-sans text-foreground selection:bg-violet-200 selection:text-violet-900 dark:selection:bg-violet-900/40 dark:selection:text-violet-100`}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var k="portfolio-theme";var s=localStorage.getItem(k);var d=s==="dark"||(s!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`}
        </Script>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-200 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-slate-900 focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-violet-600 dark:focus:bg-zinc-900 dark:focus:text-slate-100 dark:focus:outline-violet-400"
        >
          Skip to main content
        </a>
        <JsonLd />
        <div className="noise-overlay" />
        <ThemeProvider>
          <SmoothScroll>
            <AmbientLayer />
            <CustomCursor />
            {children}
            <FloatingDock />
          </SmoothScroll>
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
