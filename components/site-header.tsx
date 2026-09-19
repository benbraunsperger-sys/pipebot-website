'use client';

import { useEffect, useState } from 'react';
import { Logo } from './logo';

type Theme = 'light' | 'dark';

function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === 'dark') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 15.4A8.5 8.5 0 0 1 8.6 3.5 8.7 8.7 0 1 0 20.5 15.4Z" />
    </svg>
  );
}

export function SiteHeader() {
  const [theme, setTheme] = useState<Theme>('light');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('pipebot-theme');
    const initialTheme: Theme = savedTheme === 'dark' || savedTheme === 'light'
      ? savedTheme
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

    document.documentElement.dataset.theme = initialTheme;
    setTheme(initialTheme);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('pipebot-theme', nextTheme);
    setTheme(nextTheme);
  }

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Logo />
        <nav className={`main-nav${open ? ' is-open' : ''}`} aria-label="Hauptnavigation">
          <a href="/#warum" onClick={() => setOpen(false)}>Warum PipeBot</a>
          <a href="/#ausprobieren" onClick={() => setOpen(false)}>Ausprobieren</a>
          <a href="/#kontakt" onClick={() => setOpen(false)}>Kontakt</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button" type="button" onClick={toggleTheme} aria-label={theme === 'light' ? 'Dunkles Farbschema aktivieren' : 'Helles Farbschema aktivieren'}>
            <ThemeIcon theme={theme} />
          </button>
          <a className="header-mail" href="mailto:office@pipeline-solutions.at?subject=PipeBot%20Anfrage">Kontakt</a>
          <button className="menu-button" type="button" aria-label={open ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
