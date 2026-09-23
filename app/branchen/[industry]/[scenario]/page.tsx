import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getLandingPage, LANDING_PAGES_PER_INDUSTRY } from '@/lib/programmatic-landing-pages';

export const dynamicParams = true;

type Props = { params: Promise<{ industry: string; scenario: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry, scenario } = await params;
  const page = getLandingPage(industry, scenario);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.href },
  };
}

export default async function ScenarioLandingPage({ params }: Props) {
  const { industry: industrySlug, scenario } = await params;
  const page = getLandingPage(industrySlug, scenario);
  if (!page) notFound();

  const { industry, journey, topic } = page;
  return (
    <>
      <SiteHeader />
      <main className="scenario-page">
        <section className="scenario-hero">
          <div className="shell">
            <p className="section-label"><span /> PipeBot · {industry.category} · {journey.name}</p>
            <h1>{topic.name}<br /><em>für {industry.name}.</em></h1>
            <p className="scenario-lead">Wenn jemand {journey.context}, hilft eine klare Antwort zu {topic.name.toLowerCase()}. PipeBot kann Informationen aus freigegebenen Website-Inhalten in einem Gespräch zugänglich machen. Was beantwortet werden kann, hängt davon ab, was der Betrieb dokumentiert und aktuell hält.</p>
            <div className="scenario-actions"><a className="button-primary" href="/testen/">Mit deiner Website testen <span>↗</span></a><Link className="button-link" href={`/branchen/${industry.slug}/`}>Alle Beispiele für {industry.name} <span>↗</span></Link></div>
            <p className="scenario-breadcrumb"><Link href="/branchen/">Branchen</Link><span> / </span><Link href={`/branchen/${industry.slug}/`}>{industry.name}</Link><span> / </span>{topic.name}</p>
          </div>
        </section>

        <section className="shell scenario-main">
          <div className="scenario-copy">
            <p className="section-label"><span /> Die Frage dahinter</p>
            <h2>Was möchten Besucher<br /><em>wirklich wissen?</em></h2>
            <p>Bei {industry.name.toLowerCase()} fragen Besucher beispielsweise: <strong>„{industry.example}“</strong> {journey.context}. Auf dieser Seite geht es um {topic.focus}. Ein Chatbot kann die passende Information finden, wenn sie auf der Website klar beschrieben ist.</p>
            <div className="scenario-quote"><span>TYPISCHE FRAGE ZU {topic.name.toLocaleUpperCase('de-AT')}</span><p>„{page.question}“</p></div>
          </div>
          <aside className="scenario-side-note"><span>FÜR DIESEN ANWENDUNGSFALL</span><p>{journey.guidance}</p><a href="/contact/">Mit PipeBot besprechen <span>↗</span></a></aside>
        </section>

        <section className="scenario-checklist-section">
          <div className="shell scenario-checklist-grid">
            <div><p className="section-label"><span /> Inhalte auf der Website</p><h2>Eine gute Antwort<br /><em>beginnt mit Fakten.</em></h2><p>{industry.pageHint} Prüfe, ob diese Informationen auf deiner Website leicht zu finden und aktuell sind:</p></div>
            <ul className="scenario-checklist">
              {topic.checks.map((check, index) => <li key={check}><span>0{index + 1}</span><p>{check}.</p></li>)}
              <li><span>04</span><p>Eine Kontaktmöglichkeit für Fälle, die sich nicht allgemein beantworten lassen.</p></li>
            </ul>
          </div>
        </section>

        <section className="shell scenario-boundary">
          <div className="scenario-boundary-mark">↗</div>
          <div><p className="section-label"><span /> Eine klare Grenze</p><h2>Kein Live-Status ohne<br /><em>Live-Daten.</em></h2><p>Eine Website kann erklären, wie {industry.offer} grundsätzlich funktioniert. Ob ein Termin frei ist, ein Produkt lagernd oder ein konkreter Auftrag möglich ist, sollte PipeBot nur beantworten, wenn dafür aktuelle Daten angebunden sind. Sonst führt die Antwort zum passenden Kontaktweg.</p><p className="scenario-guardrail">{industry.pageHint}</p></div>
        </section>

        <section className="scenario-related">
          <div className="shell">
            <div className="scenario-related-head"><div><p className="section-label"><span /> Weiterstöbern</p><h2>Mehr Beispiele für<br /><em>{industry.name}.</em></h2></div><Link href={`/branchen/${industry.slug}/`}>Alle {LANDING_PAGES_PER_INDUSTRY} Beispiele <span>↗</span></Link></div>
            <div className="scenario-related-grid">
              {page.related.map((related) => <Link className="scenario-related-card" href={related.href} key={related.href}><span>{related.journey.name}</span><strong>{related.topic.name}</strong><p>{related.topic.focus}</p><i>↗</i></Link>)}
            </div>
          </div>
        </section>

        <section className="industry-detail-cta">
          <div className="shell industry-detail-cta-inner"><div><p className="section-label light"><span /> PipeBot live erleben</p><h2>Teste es mit deiner<br /><em>eigenen Website.</em></h2></div><div><p>Sieh dir an, welche Antworten aus deinen vorhandenen Website-Inhalten entstehen.</p><a className="button-primary" href="/testen/">Jetzt kostenlos testen <span>↗</span></a></div></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
