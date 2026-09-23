import type { Metadata } from 'next';
import { Instrument_Serif, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { FloatingChat } from '@/components/floating-chat';
import './globals.css';
import './industry-pages.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

const themeScript = `try{var t=localStorage.getItem('pipebot-theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}`;

export const metadata: Metadata = {
  metadataBase: new URL('https://pipebot.at'),
  ...(googleSiteVerification ? { verification: { google: googleSiteVerification } } : {}),
  title: {
    default: 'PipeBot – Deine Website antwortet',
    template: '%s | PipeBot',
  },
  description: 'PipeBot beantwortet Fragen direkt auf deiner Website. Ein Produkt von Pipeline AI Solutions.',
  alternates: { canonical: '/' },
  icons: { icon: '/pipebot-logo.png' },
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    url: 'https://pipebot.at',
    siteName: 'PipeBot',
    title: 'PipeBot – Deine Website antwortet',
    description: 'Deine Website antwortet. Mit PipeBot von Pipeline AI Solutions.',
    images: [{ url: '/pipebot-logo.png', width: 450, height: 378, alt: 'PipeBot' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PipeBot – Deine Website antwortet',
    description: 'Deine Website antwortet. Mit PipeBot von Pipeline AI Solutions.',
    images: ['/pipebot-logo.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} ${instrumentSerif.variable}`}>
        {children}
        <FloatingChat />
      </body>
    </html>
  );
}
