import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Seite nicht gefunden',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="not-found-page">
        <div className="shell not-found-inner">
          <span className="eyebrow">404 · Nicht gefunden</span>
          <h1>Hier antwortet nichts.</h1>
          <p>Die gesuchte Seite gibt es nicht mehr oder die Adresse ist falsch.</p>
          <Link className="button-primary" href="/">Zurück zu PipeBot <span>↗</span></Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
