import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { industries, LANDING_PAGE_COUNT } from '@/lib/programmatic-landing-pages';

export const metadata: Metadata = {
  title: 'PipeBot nach Branche',
  description: 'Anwendungsbeispiele für Website-Chatbots in 100 Branchen. Entdecke typische Kundenfragen, hilfreiche Website-Inhalte und passende nächste Schritte.',
  alternates: { canonical: '/branchen/' },
};

export default function IndustriesPage() {
  const groups = [...new Set(industries.map((item) => item.category))];

  return (
    <>
      <SiteHeader />
      <main className="industry-directory">
        <section className="industry-hero">
          <div className="shell">
            <p className="section-label"><span /> PipeBot · Anwendungsbeispiele</p>
            <h1>Finde deinen<br /><em>Anwendungsfall.</em></h1>
            <p className="industry-lead">Ein Website-Chatbot ist dann hilfreich, wenn er echte Fragen mit klaren, aktuellen Informationen beantworten kann. Wähle eine Branche und sieh dir konkrete Fragen und Inhalte an, die Besucher dort suchen könnten.</p>
            <p className="industry-count">{industries.length} Branchen · {LANDING_PAGE_COUNT.toLocaleString('de-AT')} Themenbeispiele</p>
          </div>
        </section>
        <section className="shell industry-groups" aria-label="Branchen auswählen">
          {groups.map((group) => (
            <section className="industry-group" key={group}>
              <div className="industry-group-heading"><p className="section-label"><span /> Themenfeld</p><h2>{group}</h2></div>
              <div className="industry-cards">
                {industries.filter((item) => item.category === group).map((industry) => (
                  <Link className="industry-card" href={`/branchen/${industry.slug}/`} key={industry.slug}>
                    <span>{group}</span><strong>{industry.name}</strong><p>{industry.intro}</p><i aria-hidden="true">↗</i>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </section>
        <section className="industry-principles">
          <div className="shell industry-principles-grid">
            <div><p className="section-label light"><span /> Ein guter Ausgangspunkt</p><h2>Antworten brauchen<br /><em>verlässliche Quellen.</em></h2></div>
            <p>Die Beispiele zeigen, welche Website-Informationen häufig weiterhelfen. PipeBot sollte nur auf Inhalte antworten, die das Unternehmen selbst freigibt und aktuell hält. Verfügbarkeit, Preise und persönliche Einzelfälle brauchen eine Live-Abfrage oder einen direkten Kontakt.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
