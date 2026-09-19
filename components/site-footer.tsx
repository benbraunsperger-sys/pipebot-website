import Link from 'next/link';
import { Logo } from './logo';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand">
          <Logo compact />
          <p>PipeBot ist ein Produkt von Pipeline AI Solutions UG (haftungsbeschränkt).</p>
        </div>
        <div className="footer-links">
          <div>
            <strong>PipeBot</strong>
            <a href="/#produkt">Produkt</a>
            <a href="/#vorteile">Vorteile</a>
            <a href="/#faq">FAQ</a>
          </div>
          <div>
            <strong>Unternehmen</strong>
            <a href="https://pipeline-solutions.at" target="_blank" rel="noreferrer">Pipeline AI Solutions</a>
            <a href="mailto:office@pipeline-solutions.at">office@pipeline-solutions.at</a>
          </div>
          <div>
            <strong>Rechtliches</strong>
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
          </div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 Pipeline AI Solutions UG (haftungsbeschränkt)</span>
        <span>PipeBot · KI-Chatbot für Websites</span>
      </div>
    </footer>
  );
}
