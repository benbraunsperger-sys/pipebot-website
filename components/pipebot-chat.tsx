'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const initialMessages: Message[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content: 'Hallo, ich bin **PipeBot**, der KI-Assistent von Pipeline AI Solutions. Was möchtest du wissen?',
  },
];

const suggestions = [
  'Was kannst du?',
  'Wie starte ich?',
  'Wie bekomme ich eine Demo?',
];

export function PipeBotChat({ idPrefix = 'pipebot' }: { idPrefix?: string }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  async function sendMessage(content: string) {
    const cleaned = content.trim();
    if (!cleaned || busy) return;

    const userMessage: Message = { id: crypto.randomUUID(), role: 'user', content: cleaned };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setBusy(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content: messageContent }) => ({ role, content: messageContent })),
        }),
      });
      const data = await response.json() as { message?: string; error?: string };

      if (!response.ok || !data.message) {
        throw new Error(data.error || 'Keine Antwort erhalten.');
      }

      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: 'assistant', content: data.message as string },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: error instanceof Error ? error.message : 'PipeBot ist gerade nicht erreichbar. Versuch es bitte noch einmal.',
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="live-chat">
      <div className="live-chat-bar">
        <div className="chat-product"><img src="/pipebot-logo.png" width="30" height="26" alt="" /><div><strong>PipeBot</strong><small>KI-ASSISTENT</small></div></div>
        <div className="chat-model"><i /> BEREIT</div>
      </div>

      <div className="chat-messages" ref={scrollRef} aria-live="polite">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              className={`chat-message ${message.role}`}
              key={message.id}
              initial={{ opacity: 0, y: 12, scale: .98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: .3 }}
            >
              {message.role === 'assistant' && <span className="message-label">PIPEBOT</span>}
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
            </motion.div>
          ))}
        </AnimatePresence>
        {busy && (
          <motion.div className="chat-message assistant typing" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <span /><span /><span />
          </motion.div>
        )}
      </div>

      {messages.length === 1 && (
        <div className="chat-suggestions">
          {suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => void sendMessage(suggestion)}>{suggestion}</button>)}
        </div>
      )}

      <form className="chat-compose" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor={`${idPrefix}-message`}>Nachricht an PipeBot</label>
        <textarea id={`${idPrefix}-message`} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
          }
        }} maxLength={1500} rows={1} placeholder="Frage an PipeBot …" disabled={busy} />
        <button type="submit" aria-label="Nachricht senden" disabled={busy || !input.trim()}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 14-7-4.7 14-2.8-5.5L5 12Z" /><path d="m11.5 13.5 3.3-3.3" /></svg>
        </button>
      </form>
      <p className="chat-disclosure">KI-generierte Antwort. Prüfe wichtige Angaben.</p>
    </div>
  );
}
