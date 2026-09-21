'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { PipeBotChat } from './pipebot-chat';

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      window.requestAnimationFrame(() => {
        panelRef.current?.querySelector<HTMLTextAreaElement>('textarea')?.focus();
      });
    } else if (wasOpen.current) {
      triggerRef.current?.focus();
      wasOpen.current = false;
    }
  }, [open]);

  function handleDialogKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div className="floating-chat">
      <AnimatePresence>
        {open && (
          <motion.div
            id="floating-chat-panel"
            className="floating-chat-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="floating-chat-title"
            ref={panelRef}
            onKeyDown={handleDialogKeyDown}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            <h2 className="sr-only" id="floating-chat-title">PipeBot KI-Chat</h2>
            <button className="floating-chat-close" type="button" onClick={() => setOpen(false)} aria-label="PipeBot-Chat schließen">×</button>
            <PipeBotChat idPrefix="pipebot-floating" />
          </motion.div>
        )}
      </AnimatePresence>
      <button ref={triggerRef} className="floating-chat-trigger" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="floating-chat-panel">
        {open ? 'Schließen' : 'PipeBot fragen'}
      </button>
    </div>
  );
}
