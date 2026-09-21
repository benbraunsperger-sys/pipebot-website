import type { CSSProperties } from 'react';
import { PipeBotChat } from './pipebot-chat';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

const sourceItems = ['Leistungen', 'Preise', 'Abläufe'];

export function HomeExperience() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero" id="top">
          <div className="hero-grid shell">
            <div className="hero-copy">
              <p className="section-label"><span /> PipeBot · KI-Assistent für Websites</p>
              <h1>Deine Website<br /><em>kennt</em> die Antwort.</h1>
              <p className="hero-lead">PipeBot versteht dein Angebot und beantwortet Fragen genau dort, wo sie entstehen.</p>
              <div className="hero-actions">
                <a className="button-primary" href="/testen/">Mit deiner Website testen <span>↗</span></a>
                <a className="button-link" href="/contact/">Demo anfragen <span>↗</span></a>
              </div>
              <p className="hero-company">Ein Produkt von <a href="https://pipeline-solutions.at" target="_blank" rel="noreferrer">Pipeline AI Solutions</a></p>
            </div>

            <div className="answer-console" aria-label="Beispiel für eine Antwort von PipeBot">
              <div className="console-bar">
                <span>ANFRAGE · 0142</span>
                <span className="console-status"><i /> LIVE</span>
                <span>00:01.8</span>
              </div>
              <div className="console-progress"><span /></div>
              <div className="console-body">
                <div className="console-question">
                  <small>FRAGE</small>
                  <p>Passt PipeBot auch zu unserem Unternehmen?</p>
                </div>
                <div className="console-route">
                  <div className="route-label"><span>01</span> Inhalte werden geprüft</div>
                  <div className="source-list">
                    {sourceItems.map((item, index) => (
                      <div className="source-item" key={item} style={{ '--delay': `${index * 0.18}s` } as CSSProperties}>
                        <span>{item}</span><b>gefunden</b>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="console-answer">
                  <div className="route-label"><span>02</span> Antwort</div>
                  <p>Ja. PipeBot wird mit deinen Inhalten eingerichtet und antwortet in deiner Sprache – klar, direkt und rund um die Uhr.</p>
                  <div className="answer-meta"><span>QUELLEN 3</span><span>STATUS · BEREIT</span></div>
                </div>
              </div>
              <div className="console-footer"><span>PIPEBOT ENGINE</span><span>MANUELLE SCHRITTE · 0</span></div>
            </div>
          </div>
          <div className="signal-strip" aria-hidden="true">
            <div><span>FRAGE</span><i>→</i><span>VERSTEHEN</span><i>→</i><span>PRÜFEN</span><i>→</i><strong>ANTWORTEN</strong><i>→</i></div>
            <div><span>FRAGE</span><i>→</i><span>VERSTEHEN</span><i>→</i><span>PRÜFEN</span><i>→</i><strong>ANTWORTEN</strong><i>→</i></div>
          </div>
        </section>

        <section className="demo-section" id="ausprobieren">
          <div className="shell demo-grid">
            <div className="demo-copy">
              <p className="section-label light"><span /> Live auf dieser Seite</p>
              <h2>Frag nicht uns.<br /><em>Frag PipeBot.</em></h2>
              <p>Stell eine echte Frage. Die Antwort kommt direkt aus dem Produkt, nicht aus einer vorbereiteten Demo.</p>
              <div className="demo-note"><span>01</span><p>Schreib, was du über PipeBot wissen willst.</p></div>
              <div className="demo-note"><span>02</span><p>Erhalte sofort eine klare Antwort.</p></div>
            </div>
            <PipeBotChat idPrefix="pipebot-inline" />
          </div>
        </section>

        <section className="system-section" id="system">
          <div className="shell">
            <div className="section-head">
              <div>
                <p className="section-label"><span /> Das System</p>
                <h2>Ein Gespräch.<br /><em>Drei klare Schritte.</em></h2>
              </div>
              <p>PipeBot macht aus deinen bestehenden Inhalten eine direkte, brauchbare Antwort.</p>
            </div>

            <div className="system-map" aria-label="So verarbeitet PipeBot eine Frage">
              <article>
                <div className="station-top"><span>01</span><i /></div>
                <h3>Die Frage.</h3>
                <p>Ein Besucher fragt so, wie Menschen eben fragen.</p>
                <div className="question-sample">„Was kostet das für uns?“</div>
              </article>
              <article className="station-main">
                <div className="station-top"><span>02</span><i /></div>
                <h3>Dein Wissen.</h3>
                <p>PipeBot findet den relevanten Kontext in deinen freigegebenen Inhalten.</p>
                <div className="knowledge-orbit">
                  <span>Website</span><span>PDFs</span><span>FAQ</span><strong>PipeBot</strong>
                </div>
              </article>
              <article>
                <div className="station-top"><span>03</span><i /></div>
                <h3>Die Antwort.</h3>
                <p>Kurz, verständlich und mit dem richtigen nächsten Schritt.</p>
                <div className="answer-sample"><i /> Beantwortet</div>
              </article>
            </div>
          </div>
        </section>

        <section className="control-section" id="warum">
          <div className="shell control-grid">
            <div className="control-copy">
              <p className="section-label"><span /> Kontrolle</p>
              <h2>Er weiß viel.<br /><em>Aber nur über dich.</em></h2>
              <p>Du bestimmst die Inhalte. PipeBot bleibt bei deinem Angebot und macht aus Wissen kein Ratespiel.</p>
              <a className="button-link" href="/contact/">Über deine Inhalte sprechen <span>↗</span></a>
            </div>
            <div className="control-panel">
              <div className="control-panel-head"><span>BEISPIEL-WISSENSBASIS</span><span>AKTIV</span></div>
              <div className="control-stack">
                <div><span>Website</span><b>verbunden</b><i>bereit</i></div>
                <div><span>Leistungen</span><b>eingeordnet</b><i>bereit</i></div>
                <div><span>Fragen</span><b>vorbereitet</b><i>bereit</i></div>
                <div><span>Ton & Regeln</span><b>Deine Sprache</b><i>gesetzt</i></div>
              </div>
              <div className="control-output"><span>ERGEBNIS</span><strong>Eine Antwort, die zu deinem Unternehmen passt.</strong></div>
            </div>
          </div>
        </section>

        <section className="final-cta" id="kontakt">
          <div className="shell final-card">
            <p className="section-label"><span /> Bereit</p>
            <h2>Deine Website kann<br /><em>mehr als warten.</em></h2>
            <div className="final-row">
              <p>Zeig uns deine Website. Wir zeigen dir, was PipeBot daraus machen kann.</p>
              <a className="button-primary" href="/contact/">Demo anfragen <span>↗</span></a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
