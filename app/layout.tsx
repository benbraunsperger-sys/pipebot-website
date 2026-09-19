import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
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

export const metadata: Metadata = {
  metadataBase: new URL('https://pipebot.at'),
  title: {
    default: 'PipeBot – KI-Chatbot von Pipeline AI Solutions',
    template: '%s | PipeBot',
  },
  description: 'PipeBot ist der KI-Chatbot von Pipeline AI Solutions. Er beantwortet Kundenfragen direkt auf Ihrer Website – rund um die Uhr und auf Basis Ihres Unternehmenswissens.',
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    url: 'https://pipebot.at',
    siteName: 'PipeBot',
    title: 'PipeBot – KI-Chatbot von Pipeline AI Solutions',
    description: 'Der KI-Chatbot für Websites. Entwickelt und angeboten von Pipeline AI Solutions.',
  },
  twitter: {
    card: 'summary',
    title: 'PipeBot – KI-Chatbot von Pipeline AI Solutions',
    description: 'Der KI-Chatbot für Websites. Entwickelt und angeboten von Pipeline AI Solutions.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>{children}</body>
    </html>
  );
}
