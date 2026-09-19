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
        <h2>4. Nutzung des PipeBot-Chats</h2>
        <p>Wenn Sie den PipeBot-Chat verwenden, werden Ihre eingegebenen Nachrichten und der für die Antwort erforderliche Gesprächsverlauf an den API-Dienst Neokens, Inc., USA, übermittelt. Neokens leitet die Anfrage zur Erstellung der Antwort an den ausgewählten KI-Anbieter weiter. Für diese Website wird derzeit ein Modell von OpenAI verwendet.</p>
        <p>Die Verarbeitung erfolgt zur Beantwortung Ihrer freiwillig gestellten Anfrage. Rechtsgrundlage ist je nach Inhalt Art. 6 Abs. 1 lit. b oder lit. f DSGVO. Unser berechtigtes Interesse liegt in der unmittelbaren Beantwortung von Produkt- und Kontaktfragen.</p>
        <p>Diese Website speichert den Chatverlauf nicht dauerhaft. Nach Angaben von Neokens werden Inhalte von Anfragen und Antworten nur vorübergehend zur Weiterleitung verarbeitet; Nutzungsmetadaten können für Abrechnung, Sicherheit und Missbrauchserkennung gespeichert werden. Weitere Informationen finden Sie in der <a href="https://v2.neokens.com/legal/privacy" target="_blank" rel="noreferrer">Datenschutzerklärung von Neokens</a>.</p>
        <p>Geben Sie im Chat keine vertraulichen, besonderen oder nicht erforderlichen personenbezogenen Daten ein.</p>
      </section>
      <section>
        <h2>5. Cookies, lokale Speicherung und Analyse</h2>
        <p>Diese Version der Website setzt keine eigenen Analyse- oder Marketing-Cookies ein. Die Auswahl des hellen oder dunklen Farbschemas wird ausschließlich lokal in Ihrem Browser gespeichert.</p>
      </section>
      <section>
        <h2>6. Ihre Rechte</h2>
        <p>Sie haben – soweit die gesetzlichen Voraussetzungen vorliegen – das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Zur Ausübung Ihrer Rechte schreiben Sie an <a href="mailto:office@pipeline-solutions.at">office@pipeline-solutions.at</a>.</p>
        <p>Außerdem haben Sie das Recht, Beschwerde bei einer zuständigen Datenschutzaufsichtsbehörde einzulegen. In Österreich ist dies die Österreichische Datenschutzbehörde.</p>
      </section>
      <aside className="todo-note"><strong>TODO vor Veröffentlichung:</strong> Hosting-Anbieter, Auftragsverarbeitungsverträge, Drittlandübermittlungen und tatsächliche technische Dienste nach der finalen Netlify- und Neokens-Konfiguration rechtlich prüfen und gegebenenfalls ergänzen.</aside>
    </LegalPage>
  );
}
