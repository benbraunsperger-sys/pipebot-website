'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { PipeBotChat } from './pipebot-chat';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

const ease = [0.22, 1, 0.36, 1] as const;

const capabilities = [
  {
    code: 'KNOWLEDGE',
    title: 'Kennt Ihre Inhalte.',
    text: 'Leistungen, Abläufe und häufige Fragen werden zur individuellen Wissensbasis von PipeBot.',
    className: 'wide',
    visual: <div className="knowledge-visual" aria-hidden="true"><span>Website</span><i /><span>Dokumente</span><i /><span>FAQ</span></div>,
  },
  {
    code: 'ALWAYS ON',
    title: 'Antwortet, wenn gefragt wird.',
    text: 'Auch außerhalb Ihrer Geschäftszeiten erhalten Besucher eine erste klare Orientierung.',
    className: 'tall',
    visual: <div className="pulse-visual" aria-hidden="true"><i /><span>24 / 7</span></div>,
  },
  {
    code: 'BRAND VOICE',
    title: 'Klingt nach Ihrem Unternehmen.',
    text: 'Tonalität, Begrüßung und Antwortstil werden projektbezogen vorbereitet.',
    className: '',
    visual: <div className="voice-visual" aria-hidden="true"><i /><i /><i /><i /><i /></div>,
  },
  {
    code: 'HANDOVER',
    title: 'Kennt den richtigen nächsten Schritt.',
    text: 'PipeBot führt zu Kontakt, Anfrage oder persönlicher Beratung weiter, sobald ein Mensch gefragt ist.',
    className: 'wide accent-card',
    visual: <div className="handover-visual" aria-hidden="true"><span>KI</span><i /><span>Mensch</span></div>,
  },
  {
    code: 'LANGUAGE',
    title: 'Spricht mehr als eine Sprache.',
    text: 'Je nach Projekt kann PipeBot Anfragen in mehreren Sprachen verstehen und beantworten.',
    className: '',
    visual: <div className="language-visual" aria-hidden="true"><span>DE</span><span>EN</span><span>+</span></div>,
  },
];

const steps = [
  ['01', 'Verstehen', 'Wir klären Fragen, Zielgruppe, Inhalte und den sinnvollen Einsatzbereich.'],
  ['02', 'Einrichten', 'Wissensbasis, Tonalität und Übergaben werden für Ihr Unternehmen vorbereitet.'],
  ['03', 'Integrieren', 'PipeBot wird in Ihre Website oder das vorgesehene Kundensystem eingebunden.'],
  ['04', 'Verbessern', 'Nach dem Go-live werden Inhalte bei Bedarf ergänzt und Antworten weiterentwickelt.'],
];

const faqs = [
  ['Was kostet PipeBot?', 'Der Preis richtet sich nach Wissensbasis, Funktionsumfang und technischer Integration. Nach einem kurzen Gespräch erhalten Sie ein individuelles Angebot.'],
  ['Wie schnell ist PipeBot einsatzbereit?', 'Das hängt von Umfang und vorhandenen Inhalten ab. Nach der ersten Abstimmung nennen wir einen realistischen Zeitrahmen für Ihr Projekt.'],
  ['Ist PipeBot DSGVO-konform?', 'Wir planen die Einrichtung datensparsam und prüfen Hosting, Datenflüsse sowie erforderliche Vereinbarungen projektbezogen vor dem Go-live. Eine pauschale Aussage ohne konkrete Konfiguration wäre unseriös.'],
  ['Kann PipeBot an unsere Marke angepasst werden?', 'Ja. Sprache, Tonalität, Farben, Begrüßung und sichtbare Elemente werden passend zu Ihrem Unternehmen vorbereitet.'],
  ['Ersetzt PipeBot persönliche Ansprechpartner?', 'Nein. PipeBot übernimmt wiederkehrende Erstfragen und führt bei Bedarf gezielt zu einem persönlichen Kontakt weiter.'],
];

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: .7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function HomeExperience() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const auraY = useTransform(scrollYProgress, [0, .35], [0, reduceMotion ? 0 : 140]);
  const lineScale = useTransform(scrollYProgress, [.28, .76], [0, 1]);

  return (
    <>
      <SiteHeader />
      <main className="neo-home">
        <section className="neo-hero" id="top">
          <motion.div className="hero-aura" style={{ y: auraY }} aria-hidden="true" />
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="shell neo-hero-grid">
            <motion.div className="neo-hero-copy" initial={reduceMotion ? false : 'hidden'} animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: .09 } } }}>
              <motion.div className="neo-kicker" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: .55, ease } } }}>
                <span><i /> LIVE PRODUKT</span>
                <span>VON PIPELINE AI SOLUTIONS</span>
              </motion.div>
              <h1 aria-label="Fragen kommen. PipeBot antwortet.">
                {['Fragen', 'kommen.'].map((word) => <motion.span key={word} variants={{ hidden: { opacity: 0, y: 50, rotate: 2 }, show: { opacity: 1, y: 0, rotate: 0, transition: { duration: .75, ease } } }}>{word}</motion.span>)}
                <motion.span className="accent-line" variants={{ hidden: { opacity: 0, y: 50, rotate: 2 }, show: { opacity: 1, y: 0, rotate: 0, transition: { duration: .75, ease } } }}>PipeBot antwortet.</motion.span>
              </h1>
              <motion.p variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: .6, ease } } }}>Der KI-Chatbot für Websites, der Ihr Unternehmenswissen in klare Antworten verwandelt – entwickelt von <strong>Pipeline AI Solutions</strong>.</motion.p>
              <motion.div className="neo-hero-actions" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: .6, ease } } }}>
                <a className="neo-button primary" href="#live-chat">PipeBot testen <span>↘</span></a>
                <a className="neo-button quiet" href="mailto:office@pipeline-solutions.at?subject=PipeBot%20Demo">Demo anfragen <span>↗</span></a>
              </motion.div>
              <motion.div className="hero-meta" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: .6 } } }}>
                <span>01 / WEBSITE-CHATBOT</span><span>02 / EIGENE WISSENSBASIS</span><span>03 / PERSÖNLICHE ÜBERGABE</span>
              </motion.div>
            </motion.div>

            <div id="live-chat" className="chat-stage">
              <div className="stage-orbit one" aria-hidden="true" /><div className="stage-orbit two" aria-hidden="true" />
              <PipeBotChat />
            </div>
          </div>
          <div className="signal-strip" aria-label="PipeBot Einsatzbereiche">
            <div className="signal-track">
              {[...Array(2)].flatMap((_, group) => ['PRODUKTFRAGEN', 'ERSTBERATUNG', 'LEISTUNGEN', 'WEITERLEITUNG', 'MEHRSPRACHIG', '24/7 ERREICHBAR'].map((item) => <span key={`${group}-${item}`}>{item}<i /></span>))}
            </div>
          </div>
        </section>

        <section className="neo-section intro-section" id="produkt">
          <div className="shell intro-grid">
            <Reveal className="section-index"><span>01</span><p>WAS IST PIPEBOT</p></Reveal>
            <Reveal className="intro-statement" delay={.06}><h2>Ein Gespräch statt sieben Klicks.</h2></Reveal>
            <Reveal className="intro-copy" delay={.12}><p>PipeBot sitzt direkt auf Ihrer Website. Besucher stellen ihre Frage in eigenen Worten und erhalten eine Antwort aus Ihrer freigegebenen Wissensbasis.</p><p>Wenn das Gespräch persönlich werden soll, führt PipeBot ohne Umweg zum richtigen Kontakt.</p></Reveal>
          </div>
          <div className="shell role-line">
            <Reveal className="role-item"><small>PRODUKT</small><strong>PipeBot</strong><span>KI-Chatbot für Websites</span></Reveal>
            <Reveal className="role-arrow" delay={.08}><i /><span>entwickelt von</span><i /></Reveal>
            <Reveal className="role-item company" delay={.16}><small>UNTERNEHMEN</small><strong>Pipeline AI Solutions</strong><span>Hersteller und Anbieter</span></Reveal>
          </div>
        </section>

        <section className="neo-section capabilities-section" id="vorteile">
          <div className="shell neo-section-head">
            <Reveal className="section-index"><span>02</span><p>WAS PIPEBOT KANN</p></Reveal>
            <Reveal><h2>Nicht mehr Chat.<br />Mehr Orientierung.</h2></Reveal>
            <Reveal className="section-lead"><p>PipeBot konzentriert sich auf das, was auf einer Unternehmenswebsite zählt: verstehen, konkret antworten und den nächsten Schritt zeigen.</p></Reveal>
          </div>
          <div className="shell capability-grid">
            {capabilities.map((item, index) => (
              <motion.article className={`capability ${item.className}`} key={item.code} initial={reduceMotion ? false : { opacity: 0, y: 30 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: .65, delay: index * .05, ease }} whileHover={reduceMotion ? undefined : { y: -5 }}>
                <div className="capability-top"><span>{item.code}</span><b>0{index + 1}</b></div>
                {item.visual}
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </motion.article>
            ))}
          </div>
          <Reveal className="shell compliance-ribbon">
            <div><span>TRANSPARENZ</span><strong>Als KI klar gekennzeichnet.</strong></div>
            <p>Hosting, Datenflüsse und Auftragsverarbeitung werden vor dem Go-live für das konkrete Projekt geprüft.</p>
          </Reveal>
        </section>

        <section className="neo-section process-section" id="ablauf">
          <motion.div className="process-progress" style={{ scaleY: lineScale }} aria-hidden="true" />
          <div className="shell process-layout">
            <Reveal className="process-title"><span className="eyebrow">03 — VOM START ZUM SYSTEM</span><h2>Vier Schritte.<br />Ein klarer Ablauf.</h2><p>Keine Blackbox: Sie wissen bei jedem Schritt, woran wir arbeiten und was PipeBot anschließend übernimmt.</p></Reveal>
            <div className="neo-steps">
              {steps.map(([number, title, text], index) => (
                <Reveal className="neo-step" key={number} delay={index * .06}>
                  <span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><i aria-hidden="true">↘</i>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="neo-section offer-section" id="preise">
          <div className="offer-orbit" aria-hidden="true" />
          <div className="shell offer-grid">
            <Reveal><span className="eyebrow">04 — INVESTITION</span><h2>So individuell wie Ihr Wissen.</h2></Reveal>
            <Reveal className="offer-copy" delay={.1}><p>Umfang, Inhalte und Integration unterscheiden sich von Projekt zu Projekt. Deshalb gibt es keine pauschale Zahl, sondern ein nachvollziehbares Angebot nach einem kurzen Gespräch.</p><a className="neo-button inverted" href="mailto:office@pipeline-solutions.at?subject=Angebot%20f%C3%BCr%20PipeBot">Angebot anfragen <span>↗</span></a></Reveal>
          </div>
        </section>

        <section className="neo-section faq-section" id="faq">
          <div className="shell faq-layout">
            <Reveal className="faq-title"><span className="eyebrow">05 — FAQ</span><h2>Noch Fragen?</h2><p>Fragen Sie PipeBot direkt oben – oder öffnen Sie hier die häufigsten Antworten.</p></Reveal>
            <div className="neo-faq-list">
              {faqs.map(([question, answer], index) => (
                <motion.details key={question} initial={reduceMotion ? false : { opacity: 0, x: 20 }} whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .5, delay: index * .04 }}>
                  <summary><span><i>0{index + 1}</i>{question}</span><b>+</b></summary><p>{answer}</p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        <section className="neo-contact" id="kontakt">
          <div className="contact-grid-bg" aria-hidden="true" />
          <div className="shell neo-contact-inner">
            <Reveal><span className="eyebrow">06 — NÄCHSTER SCHRITT</span><h2>Aus Interesse<br />wird ein Gespräch.</h2></Reveal>
            <Reveal className="neo-contact-side" delay={.1}><p>Schreiben Sie uns, welche Fragen Ihre Kunden regelmäßig stellen. Wir zeigen Ihnen, wie PipeBot diese Aufgabe sinnvoll übernehmen kann.</p><a className="neo-button primary" href="mailto:office@pipeline-solutions.at?subject=PipeBot%20Anfrage">office@pipeline-solutions.at <span>↗</span></a><a className="company-link" href="https://pipeline-solutions.at" target="_blank" rel="noreferrer">Mehr über Pipeline AI Solutions →</a></Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
