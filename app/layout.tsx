import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { FloatingChat } from '@/components/floating-chat';
import './globals.css';

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

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL('https://pipebot.at'),
  ...(googleSiteVerification ? { verification: { google: googleSiteVerification } } : {}),
  title: {
    default: 'PipeBot – Deine Website antwortet',
    template: '%s | PipeBot',
  },
  description: 'PipeBot beantwortet Fragen direkt auf deiner Website. Ein Produkt von Pipeline AI Solutions.',
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    url: 'https://pipebot.at',
    siteName: 'PipeBot',
    title: 'PipeBot – Deine Website antwortet',
    description: 'Deine Website antwortet. Mit PipeBot von Pipeline AI Solutions.',
  },
  twitter: {
    card: 'summary',
    title: 'PipeBot – Deine Website antwortet',
    description: 'Deine Website antwortet. Mit PipeBot von Pipeline AI Solutions.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
        {children}
        <FloatingChat />
      </body>
    </html>
  );
}
