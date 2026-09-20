import { PipeBotChat } from './pipebot-chat';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

export function HomeExperience() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="simple-hero" id="top">
          <div className="shell simple-hero-inner">
            <p className="section-label">PipeBot</p>
            <h1>Deine Website<br />antwortet.</h1>
            <p className="simple-lead">Auf Fragen zu deinem Angebot. Direkt auf deiner Website.</p>
            <div className="simple-actions">
              <a className="button-dark" href="#ausprobieren">Ausprobieren</a>
              <a className="text-link" href="mailto:office@pipeline-solutions.at?subject=PipeBot%20Anfrage">Schreib uns <span>↗</span></a>
            </div>
          </div>
        </section>

        <section className="chat-section" id="ausprobieren">
          <div className="shell chat-section-inner">
            <div>
              <p className="section-label">Teste es selbst</p>
              <h2>Frag PipeBot.</h2>
              <p>So einfach fühlt es sich für deine Besucher an.</p>
            </div>
            <PipeBotChat />
          </div>
        </section>

        <section className="simple-how" id="warum">
          <div className="shell">
            <p className="section-label">So funktioniert es</p>
            <div className="simple-flow" aria-label="Deine Inhalte werden mit PipeBot zu klaren Antworten">
              <span>Deine Inhalte</span>
              <i aria-hidden="true">→</i>
              <strong>PipeBot</strong>
              <i aria-hidden="true">→</i>
              <span>Klare Antworten</span>
            </div>
          </div>
        </section>

        <section className="simple-contact" id="kontakt">
          <div className="shell">
            <p className="section-label">Nächster Schritt</p>
            <h2>Was soll PipeBot für dich beantworten?</h2>
            <a className="button-dark" href="mailto:office@pipeline-solutions.at?subject=PipeBot%20Demo">Lass uns reden</a>
            <p>PipeBot ist ein Produkt von <a href="https://pipeline-solutions.at" target="_blank" rel="noreferrer">Pipeline AI Solutions</a>.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
