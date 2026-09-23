import Link from 'next/link';
import { Logo } from './logo';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand">
          <Logo compact />
          <p>PipeBot beantwortet Fragen direkt auf deiner Website. Ein Produkt von Pipeline AI Solutions.</p>
          <a className="footer-company-link" href="https://pipeline-solutions.at" target="_blank" rel="noreferrer">Zur Pipeline-Hauptseite <span>↗</span></a>
        </div>
        <div className="footer-links">
          <div>
            <strong>PipeBot</strong>
            <Link href="/testen/">Gratis testen</Link>
            <Link href="/branchen/">Anwendungsbeispiele nach Branche</Link>
            <a href="/#system">System</a>
            <a href="/#warum">Kontrolle</a>
            <Link href="/contact/">Kontakt</Link>
          </div>
          <div>
            <strong>Unternehmen</strong>
            <a href="https://pipeline-solutions.at" target="_blank" rel="noreferrer">Hauptseite öffnen ↗</a>
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
        <span>© 2026 Pipeline AI Solutions</span>
        <span>PipeBot · ein Produkt von Pipeline AI Solutions</span>
      </div>
    </footer>
  );
}
