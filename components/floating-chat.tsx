'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PipeBotChat } from './pipebot-chat';

export function FloatingChat() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="floating-chat">
      <AnimatePresence>
        {open && (
          <motion.div
            className="floating-chat-panel"
            role="dialog"
            aria-label="PipeBot-Chat"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            <button className="floating-chat-close" type="button" onClick={() => setOpen(false)} aria-label="PipeBot-Chat schließen">×</button>
            <PipeBotChat />
          </motion.div>
        )}
      </AnimatePresence>
      <button className="floating-chat-trigger" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        {open ? 'Schließen' : 'PipeBot fragen'}
      </button>
    </div>
  );
}
