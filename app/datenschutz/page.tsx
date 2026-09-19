import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: 'Datenschutzhinweise für die PipeBot-Website von Pipeline AI Solutions UG (haftungsbeschränkt).',
  alternates: { canonical: '/datenschutz/' },
};

export default function DatenschutzPage() {
  return (
    <LegalPage eyebrow="Rechtliches" title="Datenschutz" intro="Informationen zur Verarbeitung personenbezogener Daten auf pipebot.at.">
      <section>
        <h2>1. Verantwortlicher</h2>
        <p><strong>Pipeline AI Solutions UG (haftungsbeschränkt)</strong><br />[ADRESSE]<br />E-Mail: <a href="mailto:office@pipeline-solutions.at">office@pipeline-solutions.at</a></p>
      </section>
      <section>
        <h2>2. Bereitstellung der Website</h2>
        <p>Beim Aufruf dieser Website können technisch erforderliche Zugriffsdaten verarbeitet werden, insbesondere IP-Adresse, Zeitpunkt des Aufrufs, angeforderte Seite, Browser- und Geräteinformationen sowie Fehler- und Sicherheitsprotokolle.</p>
        <p>Die Verarbeitung erfolgt zur sicheren und zuverlässigen Bereitstellung der Website auf Grundlage unseres berechtigten Interesses gemäß Art. 6 Abs. 1 lit. f DSGVO.</p>
      </section>
      <section>
        <h2>3. Kontaktaufnahme</h2>
        <p>Wenn Sie per E-Mail Kontakt aufnehmen, verarbeiten wir Ihre Angaben zur Bearbeitung der Anfrage und für mögliche Anschlussfragen. Rechtsgrundlage ist je nach Inhalt der Anfrage Art. 6 Abs. 1 lit. b oder lit. f DSGVO.</p>
      </section>
      <section>
        <h2>4. Cookies und Analyse</h2>
        <p>Diese Version der Website setzt keine eigenen Analyse- oder Marketing-Cookies ein. Sollte sich das ändern, werden diese Hinweise vor dem Einsatz entsprechend ergänzt.</p>
      </section>
      <section>
        <h2>5. Ihre Rechte</h2>
        <p>Sie haben – soweit die gesetzlichen Voraussetzungen vorliegen – das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Zur Ausübung Ihrer Rechte schreiben Sie an <a href="mailto:office@pipeline-solutions.at">office@pipeline-solutions.at</a>.</p>
        <p>Außerdem haben Sie das Recht, Beschwerde bei einer zuständigen Datenschutzaufsichtsbehörde einzulegen. In Österreich ist dies die Österreichische Datenschutzbehörde.</p>
      </section>
      <aside className="todo-note"><strong>TODO vor Veröffentlichung:</strong> Hosting-Anbieter, tatsächliche technische Dienste, Speicherdauer und gegebenenfalls Datenübermittlungen nach finaler Netlify-Konfiguration prüfen und ergänzen.</aside>
    </LegalPage>
  );
}
