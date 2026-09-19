import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

const features = [
  {
    number: '01',
    title: 'Individuelle Wissensbasis',
    text: 'PipeBot antwortet auf Basis der Inhalte, Leistungen und Abläufe Ihres Unternehmens – nicht mit beliebigen Standardantworten.',
  },
  {
    number: '02',
    title: 'Rund um die Uhr erreichbar',
    text: 'Häufige Fragen werden auch außerhalb Ihrer Geschäftszeiten direkt auf der Website beantwortet.',
  },
  {
    number: '03',
    title: 'Schnell eingebunden',
    text: 'PipeBot wird passend zu Ihrer Website vorbereitet und anschließend in das bestehende System integriert.',
  },
  {
    number: '04',
    title: 'Mehrsprachig nutzbar',
    text: 'Je nach Projekt kann PipeBot Anfragen in mehreren Sprachen verstehen und beantworten.',
  },
  {
    number: '05',
    title: 'Sauber formatierte Antworten',
    text: 'Links, Listen und strukturierte Inhalte werden verständlich dargestellt, damit Antworten schnell erfassbar bleiben.',
  },
  {
    number: '06',
    title: 'Transparent als KI erkennbar',
    text: 'PipeBot wird klar als KI-gestützter Assistent gekennzeichnet. Das schafft Orientierung und vermeidet falsche Erwartungen.',
  },
];

const steps = [
  ['Anfrage', 'Sie beschreiben kurz, welche Fragen PipeBot übernehmen soll und auf welcher Website er eingesetzt wird.'],
  ['Einrichtung', 'Wir strukturieren die Wissensbasis, Tonalität und Regeln für die passenden Antworten.'],
  ['Integration', 'PipeBot wird in Ihr bestehendes Website- oder Kundensystem eingebunden und gemeinsam geprüft.'],
  ['Go-live', 'Nach Ihrer Freigabe geht PipeBot online. Inhalte und Antworten können später weiterentwickelt werden.'],
];

const faqs = [
  ['Was kostet PipeBot?', 'Der Preis richtet sich nach Umfang, Wissensbasis und gewünschter Integration. Nach einem kurzen Gespräch erhalten Sie ein individuelles Angebot – ohne pauschale Preisversprechen.'],
  ['Wie schnell ist PipeBot startklar?', 'Das hängt vom Umfang der Inhalte und der technischen Einbindung ab. Nach der Anfrage nennen wir einen realistischen Zeitrahmen für Ihr Projekt.'],
  ['Ist PipeBot DSGVO-konform?', 'Wir planen die Einrichtung datensparsam und prüfen vor dem Go-live die eingesetzten Dienste, Hosting-Variante und erforderlichen Vereinbarungen. Die konkrete Datenschutzkonfiguration wird für jedes Projekt einzeln festgelegt.'],
  ['Kann PipeBot an unsere Marke angepasst werden?', 'Ja. Sprache, Tonalität, Farben, Begrüßung und sichtbare Elemente werden passend zu Ihrem Unternehmen vorbereitet.'],
  ['Woher kennt PipeBot unsere Antworten?', 'Die Grundlage bilden die von Ihnen freigegebenen Inhalte – etwa Website-Texte, Leistungsbeschreibungen, häufige Fragen und interne Vorgaben.'],
  ['Ersetzt PipeBot persönliche Ansprechpartner?', 'Nein. PipeBot übernimmt wiederkehrende Erstfragen und führt bei Bedarf gezielt zum persönlichen Kontakt weiter.'],
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero" id="top">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">KI-Chatbot von Pipeline AI Solutions</span>
              <h1><span>PipeBot.</span><br />Antworten, wenn Kunden fragen.</h1>
              <p>PipeBot ist ein KI-gestützter Chatbot für Websites. Er beantwortet wiederkehrende Kundenfragen automatisch, nutzt das Wissen Ihres Unternehmens und ist rund um die Uhr erreichbar.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="mailto:office@pipeline-solutions.at?subject=PipeBot%20Demo%20anfragen">Demo anfragen <span aria-hidden="true">↗</span></a>
                <a className="button button-secondary" href="#produkt">PipeBot kennenlernen <span aria-hidden="true">↓</span></a>
              </div>
              <p className="hero-owner">Entwickelt und angeboten von <a href="https://pipeline-solutions.at" target="_blank" rel="noreferrer">Pipeline AI Solutions</a>.</p>
            </div>

            {/* TODO(pipebot-live-demo): Ein echtes Demo-Widget wird in einem eigenen Auftrag integriert. */}
            <div className="product-visual" aria-label="Schematische Darstellung von PipeBot">
              <div className="visual-topline"><span>PIPEBOT / WEBSITE-ASSISTENT</span><span>KI</span></div>
              <div className="visual-body">
                <div className="question-card"><small>KUNDENFRAGE</small><p>Welche Leistung passt zu meinem Projekt?</p></div>
                <div className="flow-line" aria-hidden="true"><i /><span>WISSENSBASIS</span><i /></div>
                <div className="answer-card"><div className="answer-head"><span className="mini-mark">P</span><strong>PipeBot</strong><small>KI-ASSISTENT</small></div><p>Ich helfe Ihnen bei der Einordnung und zeige den passenden nächsten Schritt.</p><div className="answer-actions"><span>Leistungen ansehen</span><span>Kontakt aufnehmen</span></div></div>
              </div>
              <div className="visual-footer"><span>Individuell eingerichtet</span><span>Von Pipeline AI Solutions</span></div>
            </div>
          </div>
        </section>

        <section className="section product-section" id="produkt">
          <div className="shell split-heading">
            <div><span className="eyebrow">01 — Was ist PipeBot</span><h2>Ein KI-Chatbot, der Ihr Unternehmen kennt.</h2></div>
            <div className="section-copy"><p>PipeBot wird auf Ihrer Website eingebunden und beantwortet Kundenanfragen auf Grundlage Ihrer freigegebenen Informationen.</p><p>So erhalten Besucher schneller Orientierung, während Ihr Team bei wiederkehrenden Fragen entlastet wird. Wenn persönliche Unterstützung nötig ist, führt PipeBot gezielt zum richtigen Kontakt.</p></div>
          </div>
          <div className="shell fact-row" aria-label="PipeBot Kurzbeschreibung">
            <div><span>01</span><strong>Produkt</strong><p>KI-Chatbot für Websites</p></div>
            <div><span>02</span><strong>Aufgabe</strong><p>Kundenfragen beantworten</p></div>
            <div><span>03</span><strong>Anbieter</strong><p>Pipeline AI Solutions</p></div>
          </div>
        </section>

        <section className="section soft-section" id="vorteile">
          <div className="shell section-heading">
            <span className="eyebrow">02 — Funktionen und Vorteile</span>
            <h2>Das Wesentliche, sauber gelöst.</h2>
            <p>Keine überladene Plattform. PipeBot konzentriert sich auf verständliche Antworten, eine klare Einbindung und Inhalte, die zu Ihrem Unternehmen passen.</p>
          </div>
          <div className="shell feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.number}>
                <span>{feature.number}</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
          <div className="shell privacy-note">
            <span className="eyebrow">Datenschutz</span>
            <p>Hosting, Datenflüsse und Auftragsverarbeitung werden vor dem Go-live für das konkrete Projekt geprüft. Verbindliche Aussagen richten sich nach der gewählten technischen Konfiguration.</p>
          </div>
        </section>

        <section className="section" id="ablauf">
          <div className="shell process-grid">
            <div className="process-heading"><span className="eyebrow">03 — So funktioniert&apos;s</span><h2>Vom ersten Gespräch bis zum Go-live.</h2><p>Der Ablauf bleibt überschaubar. Sie liefern das Wissen über Ihr Unternehmen, wir kümmern uns um Struktur, Einrichtung und technische Einbindung.</p></div>
            <div className="steps">
              {steps.map(([title, text], index) => (
                <article className="step" key={title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section price-section" id="preise">
          <div className="shell price-card">
            <div><span className="eyebrow">04 — Preise</span><h2>Individuell nach Aufwand.</h2></div>
            <div><p>Umfang, Wissensbasis und technische Integration unterscheiden sich von Projekt zu Projekt. Deshalb nennen wir keine pauschalen Preise, sondern erstellen nach einem kurzen Austausch ein passendes Angebot.</p><a className="text-link" href="mailto:office@pipeline-solutions.at?subject=Angebot%20f%C3%BCr%20PipeBot">Angebot anfragen <span aria-hidden="true">↗</span></a></div>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="shell faq-grid">
            <div className="faq-heading"><span className="eyebrow">05 — Häufige Fragen</span><h2>Kurz und konkret.</h2></div>
            <div className="faq-list">
              {faqs.map(([question, answer], index) => (
                <details key={question} open={index === 0}>
                  <summary><span>{question}</span><i aria-hidden="true">+</i></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="kontakt">
          <div className="shell contact-card">
            <span className="eyebrow">06 — Kontakt</span>
            <h2>Passt PipeBot zu Ihrer Website?</h2>
            <p>Schreiben Sie uns kurz, welche Fragen Ihre Kunden häufig stellen. Wir sagen Ihnen ehrlich, ob und wie PipeBot dabei sinnvoll unterstützen kann.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="mailto:office@pipeline-solutions.at?subject=PipeBot%20Anfrage">office@pipeline-solutions.at <span aria-hidden="true">↗</span></a>
              <a className="button button-secondary" href="https://pipeline-solutions.at" target="_blank" rel="noreferrer">Mehr über Pipeline AI Solutions</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
