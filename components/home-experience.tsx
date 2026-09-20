'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { PipeBotChat } from './pipebot-chat';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.7, ease }}
    >
      {children}
    </motion.div>
  );
}

const steps = [
  {
    number: '01',
    title: 'Deine Inhalte.',
    text: 'Wir machen aus deiner Website und deinen Unterlagen eine klare Wissensbasis.',
  },
  {
    number: '02',
    title: 'Klare Antworten.',
    text: 'PipeBot beantwortet konkrete Fragen direkt auf deiner Website.',
  },
  {
    number: '03',
    title: 'Der richtige Kontakt.',
    text: 'Wenn es persönlich wird, führt PipeBot das Gespräch zu dir weiter.',
  },
];

export function HomeExperience() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <SiteHeader />
      <main className="minimal-home">
        <section className="minimal-hero" id="top">
          <div className="minimal-wash" aria-hidden="true" />
          <motion.div
            className="shell minimal-hero-inner"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="hero-copy">
              <div className="hero-kicker">
                <span className="hero-kicker-mark" aria-hidden="true">P</span>
                <span>Ein Produkt von</span>
                <a href="https://pipeline-solutions.at" target="_blank" rel="noreferrer">Pipeline AI Solutions <span>↗</span></a>
              </div>
              <h1>Deine Website<br />sollte antworten.</h1>
              <p>PipeBot beantwortet Fragen zu deinem Angebot – direkt dort, wo sie entstehen.</p>
              <div className="minimal-actions">
                <a className="text-link primary-link" href="#ausprobieren">Selbst ausprobieren <span>↓</span></a>
                <a className="text-link" href="https://pipeline-solutions.at" target="_blank" rel="noreferrer">Zur Pipeline-Hauptseite <span>↗</span></a>
                <a className="text-link" href="mailto:office@pipeline-solutions.at?subject=PipeBot%20Anfrage">Schreib uns <span>↗</span></a>
              </div>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <span className="visual-question">?</span>
              <span className="visual-path"><i /><i /><i /></span>
              <span className="visual-answer">Antwort.</span>
            </div>
          </motion.div>
        </section>

        <section className="try-section" id="ausprobieren">
          <div className="shell try-layout">
            <Reveal className="try-copy">
              <span className="section-label">PipeBot ausprobieren</span>
              <h2>Frag einfach.</h2>
              <p>Du bekommst sofort eine Antwort.</p>
            </Reveal>
            <div className="chat-stage">
              <PipeBotChat />
            </div>
          </div>
        </section>

        <section className="pipeline-bridge">
          <div className="shell pipeline-bridge-inner">
            <div className="pipeline-bridge-mark" aria-hidden="true">P</div>
            <div className="pipeline-bridge-copy">
              <span className="section-label">Das Unternehmen dahinter</span>
              <h2>Pipeline AI Solutions.</h2>
              <p>PipeBot ist ein Produkt von Pipeline AI Solutions. Auf der Hauptseite findest du Websites, digitale Systeme und weitere Lösungen aus einer Hand.</p>
            </div>
            <a className="text-link primary-link" href="https://pipeline-solutions.at" target="_blank" rel="noreferrer">Pipeline-Hauptseite öffnen <span>↗</span></a>
          </div>
        </section>

        <section className="how-section" id="warum">
          <div className="shell how-head">
            <Reveal>
              <span className="section-label">So funktioniert es</span>
              <h2>So arbeitet PipeBot für dich.</h2>
            </Reveal>
          </div>
          <div className="shell process-list">
            {steps.map((step, index) => (
              <Reveal className="process-item" key={step.number}>
                <span className="process-number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                {index < steps.length - 1 && <span className="process-arrow" aria-hidden="true">→</span>}
              </Reveal>
            ))}
          </div>
          <div className="shell process-visual" aria-hidden="true">
            <span>Inhalt</span><i><b /></i><strong>PipeBot</strong><i><b /></i><span>Gespräch</span>
          </div>
        </section>

        <section className="minimal-contact" id="kontakt">
          <Reveal className="shell contact-inner">
            <h2>Was soll PipeBot für dich beantworten?</h2>
            <a className="text-link primary-link" href="mailto:office@pipeline-solutions.at?subject=PipeBot%20Demo">Lass es uns herausfinden <span>↗</span></a>
            <p>Mehr über das Unternehmen, Websites und digitale Systeme: <a href="https://pipeline-solutions.at" target="_blank" rel="noreferrer">pipeline-solutions.at ↗</a></p>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
