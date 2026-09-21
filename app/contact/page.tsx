import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Demo anfragen',
  description: 'Sprich mit Pipeline AI Solutions über PipeBot für deine Website.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="contact-page">
        <section className="contact-hero">
          <div className="shell contact-hero-inner">
            <p className="section-label"><span /> Kontakt</p>
            <h1>Zeig uns deine Website.</h1>
            <p>Schick uns den Link und ein, zwei typische Kundenfragen. Wir melden uns persönlich mit einer ehrlichen Einschätzung.</p>
          </div>
        </section>
        <section className="shell contact-options" aria-label="Kontaktmöglichkeiten">
          <a className="contact-card" href="mailto:office@pipeline-solutions.at?subject=PipeBot%20Demo&amp;body=Hallo%20Pipeline%20AI%20Solutions%2C%0A%0Aunsere%20Website%3A%20%0Atypische%20Kundenfragen%3A%20%0A%0AViele%20Gr%C3%BC%C3%9Fe">
            <span>01 · E-Mail</span>
            <strong>Demo anfragen</strong>
            <p>office@pipeline-solutions.at</p>
            <i>↗</i>
          </a>
          <a className="contact-card" href="tel:+4368120764203">
            <span>02 · Telefon</span>
            <strong>Direkt sprechen</strong>
            <p>+43 681 207 64 203</p>
            <i>↗</i>
          </a>
        </section>
        <section className="shell contact-context">
          <p>PipeBot ist ein Produkt von <a href="https://pipeline-solutions.at" target="_blank" rel="noreferrer">Pipeline AI Solutions ↗</a>, dem Einzelunternehmen von Paul Hölzl.</p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
