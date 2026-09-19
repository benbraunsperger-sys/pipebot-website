import type { ReactNode } from 'react';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export function LegalPage({ eyebrow, title, intro, children }: LegalPageProps) {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="legal-hero">
          <div className="shell legal-hero-inner">
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{intro}</p>
          </div>
        </section>
        <div className="shell legal-content">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
