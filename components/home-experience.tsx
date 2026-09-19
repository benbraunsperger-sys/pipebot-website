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
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.75, ease }}
    >
      {children}
    </motion.div>
  );
}

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
              <h1>Deine Website<br />sollte antworten.</h1>
              <p>PipeBot kennt dein Angebot und beantwortet Fragen, bevor sie liegen bleiben.</p>
              <div className="minimal-actions">
                <a className="text-link primary-link" href="#ausprobieren">PipeBot ausprobieren <span>↓</span></a>
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

        <section className="story" id="warum">
          <div className="shell story-layout">
            <Reveal className="story-inner">
              <h2>Du erklärst dein Angebot einmal.</h2>
              <p>PipeBot macht daraus klare Antworten.</p>
            </Reveal>
            <div className="knowledge-visual" aria-hidden="true">
              <span>Website</span><i /><strong>PipeBot</strong><i /><span>Antwort</span>
            </div>
          </div>
        </section>

        <section className="story story-soft">
          <div className="shell story-layout story-layout-reverse">
            <Reveal className="story-inner">
              <h2>Deine Besucher fragen.</h2>
              <p>PipeBot antwortet direkt.</p>
            </Reveal>
            <div className="dialogue-visual" aria-hidden="true">
              <span className="dialogue-question">Kann ich direkt starten?</span>
              <span className="dialogue-answer">Ja. So funktioniert es.</span>
            </div>
          </div>
        </section>

        <section className="story">
          <div className="shell story-layout">
            <Reveal className="story-inner">
              <h2>Wenn es persönlich wird, übernimmst du.</h2>
              <p>Ohne Umwege.</p>
            </Reveal>
            <div className="handoff-visual" aria-hidden="true">
              <span>PipeBot</span><i><b /></i><span>Du</span>
            </div>
          </div>
        </section>

        <section className="try-section" id="ausprobieren">
          <div className="shell try-layout">
            <Reveal className="try-copy">
              <h2>Frag PipeBot.</h2>
              <p>Direkt hier.</p>
            </Reveal>
            <div className="chat-stage">
              <PipeBotChat />
            </div>
          </div>
        </section>

        <section className="minimal-contact" id="kontakt">
          <Reveal className="shell contact-inner">
            <h2>Was könnte PipeBot für dich beantworten?</h2>
            <a className="text-link primary-link" href="mailto:office@pipeline-solutions.at?subject=PipeBot%20Demo">Lass es uns herausfinden <span>↗</span></a>
            <p>PipeBot ist ein Produkt von <a href="https://pipeline-solutions.at" target="_blank" rel="noreferrer">Pipeline AI Solutions</a>.</p>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
