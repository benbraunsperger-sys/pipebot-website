import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getIndustry, getIndustryLandingPaths } from '@/lib/programmatic-landing-pages';

export const dynamicParams = true;

type Props = { params: Promise<{ industry: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return {
    title: `Website-Chatbot für ${industry.name}`,
    description: `Anwendungsbeispiele für ${industry.name}: typische Kundenfragen, hilfreiche Website-Inhalte und 400 konkrete PipeBot-Szenarien.`,
    alternates: { canonical: `/branchen/${industry.slug}/` },
  };
}

export default async function IndustryPage({ params }: Props) {
  const { industry: slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const pages = getIndustryLandingPaths(industry);
  const byJourney = new Map<string, typeof pages>();
  for (const page of pages) byJourney.set(page.journey.slug, [...(byJourney.get(page.journey.slug) ?? []), page]);

  return (
    <>
      <SiteHeader />
      <main className="industry-detail">
        <section className="industry-hero">
          <div className="shell">
            <p className="section-label"><span /> <Link href="/branchen/">Branchen</Link> · {industry.category}</p>
            <h1>PipeBot für<br /><em>{industry.name}.</em></h1>
            <p className="industry-lead">{industry.intro}. Diese Übersicht zeigt, welche Fragen Besucher stellen könnten und wie klar aufbereitete Website-Inhalte dabei helfen können, eine erste Antwort zu finden.</p>
            <div className="industry-example"><span>BEISPIELFRAGE</span><p>„{industry.example}“</p></div>
          </div>
        </section>
        <section className="shell industry-content-index">
          <div className="industry-detail-head"><div><p className="section-label"><span /> {pages.length} Anwendungsszenarien</p><h2>Nach Situation<br /><em>und Thema.</em></h2></div><p>Jede Seite verbindet eine Kundensituation mit einem Informationsthema. Die Beispiele helfen, die passenden Inhalte auf der eigenen Website zu prüfen.</p></div>
          {[...byJourney.entries()].map(([slug, groupPages]) => (
            <section className="journey-group" key={slug}>
              <h3>{groupPages[0].journey.name}</h3>
              <p>{groupPages[0].journey.guidance}</p>
              <div className="scenario-links">
                {groupPages.map((page) => (
                  <Link href={page.href} key={page.href}><span>{page.topic.name}</span><strong>{page.topic.focus}</strong><i aria-hidden="true">↗</i></Link>
                ))}
              </div>
            </section>
          ))}
        </section>
        <section className="industry-detail-cta">
          <div className="shell industry-detail-cta-inner"><div><p className="section-label light"><span /> Mit deiner Website prüfen</p><h2>Welche Antworten<br /><em>liegen schon bereit?</em></h2></div><div><p>{industry.pageHint}</p><a className="button-primary" href="/testen/">Website mit PipeBot testen <span>↗</span></a></div></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
