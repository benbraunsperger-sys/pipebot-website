import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum der PipeBot-Website. PipeBot ist ein Produkt von Pipeline AI Solutions UG (haftungsbeschränkt).',
  alternates: { canonical: '/impressum/' },
};

export default function ImpressumPage() {
  return (
    <LegalPage eyebrow="Rechtliches" title="Impressum" intro="Anbieterkennzeichnung für pipebot.at. Noch fehlende Unternehmensdaten sind klar als Platzhalter markiert.">
      <section>
        <h2>Medieninhaber und Diensteanbieter</h2>
        <p><strong>Pipeline AI Solutions UG (haftungsbeschränkt)</strong><br />[ADRESSE]<br />Österreich</p>
        <p>Firmenbuchnummer: [FIRMENBUCHNUMMER]<br />USt-ID: [UST-ID]</p>
        <p>E-Mail: <a href="mailto:office@pipeline-solutions.at">office@pipeline-solutions.at</a><br />Website des Unternehmens: <a href="https://pipeline-solutions.at" target="_blank" rel="noreferrer">pipeline-solutions.at</a></p>
      </section>
      <section>
        <h2>Produktinformation</h2>
        <p>PipeBot ist ein KI-gestützter Chatbot für Websites und ein Produkt von Pipeline AI Solutions UG (haftungsbeschränkt).</p>
      </section>
      <section>
        <h2>Unternehmensgegenstand</h2>
        <p>Entwicklung und Bereitstellung digitaler Lösungen, Software und KI-gestützter Systeme.</p>
      </section>
      <section>
        <h2>Haftung für Inhalte und Links</h2>
        <p>Die Inhalte dieser Website werden mit Sorgfalt erstellt und regelmäßig geprüft. Für die Inhalte externer Websites, auf die verlinkt wird, sind ausschließlich deren Betreiber verantwortlich.</p>
      </section>
      <aside className="todo-note"><strong>TODO vor Veröffentlichung:</strong> [ADRESSE], [FIRMENBUCHNUMMER] und [UST-ID] durch die vollständigen Unternehmensdaten ersetzen und die rechtlichen Angaben prüfen.</aside>
    </LegalPage>
  );
}
