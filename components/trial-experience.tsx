'use client';

import { FormEvent, useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TurnstileWidget } from './turnstile-widget';

type TrialProfile = {
  trialId: string;
  expiresAt: number;
  profileModel: string;
  sourceUrl: string;
  hostname: string;
  brandName: string;
  description: string;
  welcome: string;
  suggestions: string[];
  colors: {
    primary: string;
    background: string;
    foreground: string;
    surface: string;
  };
  questionsRemaining: number;
};

type TrialMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const analysisSteps = [
  'Website sicher abrufen',
  'Inhalte und Leistungen erkennen',
  'Farbsystem übernehmen',
  'KI-Assistent vorbereiten',
];

const modelLabels: Record<string, string> = {
  'claude-sonnet-5': 'Claude Sonnet 5',
  'gpt-5.6-luna': 'GPT 5.6 Luna',
  'gemini-3.8-flash': 'Gemini 3.8 Flash',
  local: 'lokale Basisanalyse',
};

export function TrialExperience() {
  const [website, setWebsite] = useState('');
  const [profile, setProfile] = useState<TrialProfile | null>(null);
  const [messages, setMessages] = useState<TrialMessage[]>([]);
  const [input, setInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [chatting, setChatting] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [error, setError] = useState('');
  const [activeModel, setActiveModel] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [turnstileError, setTurnstileError] = useState('');
  const chatLogRef = useRef<HTMLDivElement>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';
  const production = process.env.NODE_ENV === 'production';

  useEffect(() => {
    if (!analyzing) return;
    setAnalysisStep(0);
    const interval = window.setInterval(() => {
      setAnalysisStep((current) => Math.min(current + 1, analysisSteps.length - 1));
    }, 1_450);
    return () => window.clearInterval(interval);
  }, [analyzing]);

  useEffect(() => {
    chatLogRef.current?.scrollTo({ top: chatLogRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, chatting]);

  async function analyze(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!website.trim() || analyzing) return;
    if (production && !turnstileSiteKey) {
      setError('Die Sicherheitsprüfung ist nicht konfiguriert. Bitte versuche es später erneut.');
      return;
    }
    if (turnstileSiteKey && !turnstileToken) {
      setError('Bitte bestätige zuerst die Sicherheitsprüfung.');
      return;
    }

    setAnalyzing(true);
    setError('');
    setProfile(null);
    setMessages([]);
    setActiveModel('');

    try {
      const response = await fetch('/api/trial/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ website, turnstileToken: turnstileToken || undefined }),
      });
      const data = await response.json() as TrialProfile & { error?: string };
      if (!response.ok || !data.trialId) throw new Error(data.error || 'Die Website konnte nicht analysiert werden.');

      setProfile(data);
      setMessages([{ id: crypto.randomUUID(), role: 'assistant', content: data.welcome }]);
      setActiveModel(data.profileModel);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Die Website konnte nicht analysiert werden.');
    } finally {
      setAnalyzing(false);
      setTurnstileToken('');
      setTurnstileReset((current) => current + 1);
    }
  }

  async function sendMessage(value: string) {
    const content = value.trim();
    if (!profile || !content || chatting || profile.questionsRemaining <= 0) return;

    const userMessage: TrialMessage = { id: crypto.randomUUID(), role: 'user', content };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setChatting(true);
    setError('');

    try {
      const response = await fetch('/api/trial/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trialId: profile.trialId,
          messages: nextMessages.map(({ role, content: messageContent }) => ({ role, content: messageContent })),
        }),
      });
      const data = await response.json() as {
        message?: string;
        model?: string;
        questionsRemaining?: number;
        error?: string;
      };
      if (!response.ok || !data.message) throw new Error(data.error || 'Keine Antwort erhalten.');

      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: 'assistant', content: data.message as string },
      ]);
      setProfile((current) => current ? {
        ...current,
        questionsRemaining: data.questionsRemaining ?? current.questionsRemaining - 1,
      } : current);
      setActiveModel(data.model ?? activeModel);
    } catch (caughtError) {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: caughtError instanceof Error ? caughtError.message : 'Der Test-Chat ist gerade nicht erreichbar.',
        },
      ]);
    } finally {
      setChatting(false);
    }
  }

  function submitChat(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function resetTrial() {
    setProfile(null);
    setMessages([]);
    setError('');
    setInput('');
    setWebsite('');
  }

  const previewStyle = profile ? {
    '--trial-primary': profile.colors.primary,
    '--trial-background': profile.colors.background,
    '--trial-foreground': profile.colors.foreground,
    '--trial-surface': profile.colors.surface,
  } as CSSProperties : undefined;

  return (
    <main className="trial-page">
      <section className="trial-intro">
        <div className="shell trial-intro-grid">
          <div>
            <p className="section-label"><span /> Kostenlos testen</p>
            <h1>Deine Website.<br /><em>Dein Chatbot.</em></h1>
          </div>
          <div className="trial-intro-copy">
            <p>Gib deine Website ein. PipeBot liest die öffentlich sichtbaren Inhalte, übernimmt die Farben und baut dir sofort eine persönliche Testversion.</p>
            <div className="trial-facts"><span>Keine Anmeldung</span><span>8 Testfragen</span><span>30 Minuten aktiv</span></div>
          </div>
        </div>
      </section>

      <section className="trial-builder">
        <div className="shell">
          <form className="trial-url-form" onSubmit={analyze}>
            <label htmlFor="trial-website">Welche Website soll PipeBot kennenlernen?</label>
            <div className="trial-url-row">
              <span aria-hidden="true">↗</span>
              <input
                id="trial-website"
                type="text"
                inputMode="url"
                autoComplete="url"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                placeholder="deine-website.at"
                maxLength={2048}
                disabled={analyzing}
                required
              />
              <button type="submit" disabled={analyzing || !website.trim() || (production && !turnstileSiteKey) || Boolean(turnstileSiteKey && !turnstileToken)}>
                {analyzing ? 'Wird aufgebaut …' : 'Testversion bauen'}
              </button>
            </div>
            {turnstileSiteKey ? (
              <TurnstileWidget
                key={turnstileReset}
                siteKey={turnstileSiteKey}
                onToken={(token) => { setTurnstileToken(token); setTurnstileError(''); }}
                onUnavailable={() => {
                  setTurnstileToken('');
                  setTurnstileError('Die Sicherheitsprüfung konnte nicht geladen werden. Bitte lade die Seite neu.');
                }}
              />
            ) : production ? (
              <p className="trial-security-error" role="alert">Die Sicherheitsprüfung ist nicht verfügbar.</p>
            ) : (
              <p className="trial-security-note">Sicherheitsprüfung wird in der lokalen Entwicklung übersprungen.</p>
            )}
            {turnstileError && <p className="trial-security-error" role="alert">{turnstileError}</p>}
            <p>Nur öffentlich erreichbare Websites. Keine internen Systeme oder vertraulichen Adressen eingeben.</p>
          </form>

          <AnimatePresence mode="wait">
            {analyzing && (
              <motion.div className="trial-analysis" key="analysis" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="analysis-visual" aria-hidden="true">
                  <div className="analysis-core"><img src="/pipebot-logo.png" alt="" /></div>
                  <i /><i /><i />
                </div>
                <div className="analysis-steps" aria-live="polite">
                  {analysisSteps.map((step, index) => (
                    <div className={index <= analysisStep ? 'is-active' : ''} key={step}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <p>{step}</p>
                      <b>{index < analysisStep ? 'fertig' : index === analysisStep ? 'läuft' : 'wartet'}</b>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {!analyzing && error && !profile && (
              <motion.div className="trial-error" key="error" role="alert" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <strong>Das hat noch nicht geklappt.</strong>
                <p>{error}</p>
              </motion.div>
            )}

            {!analyzing && profile && (
              <motion.div className="trial-result" key={profile.trialId} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}>
                <div className="trial-result-head">
                  <div>
                    <p className="section-label"><span /> Testversion bereit</p>
                    <h2>So könnte PipeBot<br /><em>bei dir aussehen.</em></h2>
                  </div>
                  <div className="trial-result-actions">
                    <a href={profile.sourceUrl} target="_blank" rel="noreferrer">Quelle öffnen ↗</a>
                    <button type="button" onClick={resetTrial}>Andere Website</button>
                  </div>
                </div>

                <div className="trial-workspace">
                  <aside className="trial-insights">
                    <div className="insight-block">
                      <span>Erkannt</span>
                      <strong>{profile.brandName}</strong>
                      <p>{profile.hostname}</p>
                    </div>
                    <div className="insight-block">
                      <span>Farbsystem</span>
                      <div className="palette-row" aria-label="Erkannte Farben">
                        {[profile.colors.primary, profile.colors.foreground, profile.colors.background, profile.colors.surface].map((color, index) => (
                          <i key={`${color}-${index}`} style={{ background: color }} title={color} />
                        ))}
                      </div>
                    </div>
                    <div className="insight-block">
                      <span>Wissen</span>
                      <ul><li>Leistungen & Inhalte</li><li>Sprache & Tonalität</li><li>Kontakt & nächste Schritte</li></ul>
                    </div>
                    <div className="insight-block compact">
                      <span>Konfiguration</span>
                      <p>{modelLabels[profile.profileModel] ?? profile.profileModel}</p>
                    </div>
                  </aside>

                  <div className="trial-preview-wrap">
                    <div className="preview-toolbar">
                      <span>LIVE-VORSCHAU</span>
                      <div><button type="button" className={previewMode === 'desktop' ? 'is-active' : ''} onClick={() => setPreviewMode('desktop')}>Desktop</button><button type="button" className={previewMode === 'mobile' ? 'is-active' : ''} onClick={() => setPreviewMode('mobile')}>Mobil</button></div>
                    </div>
                    <div className={`trial-preview ${previewMode}`} style={previewStyle}>
                      <div className="mock-site">
                        <header><strong>{profile.brandName}</strong><nav><span>Leistungen</span><span>Über uns</span><span>Kontakt</span></nav></header>
                        <div className="mock-site-copy"><small>WILLKOMMEN</small><h3>{profile.brandName}</h3><p>{profile.description}</p><button type="button">Mehr erfahren</button></div>
                      </div>

                      <div className="trial-chatbot">
                        <div className="trial-chat-head"><div><span className="trial-brand-dot">{profile.brandName.charAt(0).toUpperCase()}</span><p><strong>{profile.brandName}</strong><small>KI-ASSISTENT · ONLINE</small></p></div><i /></div>
                        <div className="trial-chat-log" ref={chatLogRef} aria-live="polite">
                          {messages.map((message) => (
                            <div className={`trial-bubble ${message.role}`} key={message.id}>
                              {message.role === 'assistant' && <small>ASSISTENT</small>}
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                            </div>
                          ))}
                          {chatting && <div className="trial-bubble assistant trial-typing"><i /><i /><i /></div>}
                        </div>
                        {messages.length === 1 && (
                          <div className="trial-suggestions">
                            {profile.suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => void sendMessage(suggestion)}>{suggestion}</button>)}
                          </div>
                        )}
                        <form className="trial-chat-form" onSubmit={submitChat}>
                          <label className="sr-only" htmlFor="trial-chat-message">Frage an den Test-Chatbot</label>
                          <textarea id="trial-chat-message" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => {
                            if (event.key === 'Enter' && !event.shiftKey) {
                              event.preventDefault();
                              event.currentTarget.form?.requestSubmit();
                            }
                          }} rows={1} maxLength={1200} disabled={chatting || profile.questionsRemaining <= 0} placeholder={profile.questionsRemaining > 0 ? 'Frag etwas über die Website …' : 'Testfragen aufgebraucht'} />
                          <button type="submit" disabled={chatting || !input.trim() || profile.questionsRemaining <= 0} aria-label="Testfrage senden">↗</button>
                        </form>
                        <div className="trial-chat-meta"><span>{profile.questionsRemaining} Fragen übrig</span><span>{modelLabels[activeModel] ?? activeModel}</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="trial-result-footer">
                  <p><strong>Das ist eine temporäre Vorschau.</strong> Für die echte Version stimmen wir Wissen, Regeln, Design und Übergaben gemeinsam mit dir ab.</p>
                  <a className="button-primary" href="/contact/">PipeBot für meine Website <span>↗</span></a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="trial-explainer">
        <div className="shell">
          <p className="section-label"><span /> Was passiert hier?</p>
          <div className="trial-explainer-grid">
            <article><span>01</span><h2>Lesen.</h2><p>PipeBot holt nur die öffentlich sichtbare Startseite und ordnet relevante Inhalte.</p></article>
            <article><span>02</span><h2>Anpassen.</h2><p>Farben, Name, Begrüßung und typische Fragen werden automatisch vorbereitet.</p></article>
            <article><span>03</span><h2>Testen.</h2><p>Du stellst echte Fragen und siehst sofort, wie ein Chatbot für deine Website wirken kann.</p></article>
          </div>
        </div>
      </section>
    </main>
  );
}
