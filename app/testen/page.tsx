import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { TrialExperience } from '@/components/trial-experience';

export const metadata: Metadata = {
  title: 'Chatbot kostenlos testen',
  description: 'Gib deine Website ein und teste kostenlos einen automatisch angepassten PipeBot mit deinen öffentlichen Inhalten und Farben.',
  alternates: { canonical: '/testen/' },
};

export default function TestenPage() {
  return (
    <>
      <SiteHeader />
      <TrialExperience />
      <SiteFooter />
    </>
  );
}
