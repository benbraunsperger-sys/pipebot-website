import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum von PipeBot, einem Produkt von Pipeline AI Solutions.',
  alternates: { canonical: '/impressum/' },
};

export default function ImpressumPage() {
  return (
    <LegalPage eyebrow="Rechtliches" title="Impressum von PipeBot." intro="Angaben nach § 5 ECG und § 25 MedienG für PipeBot, ein Produkt von Pipeline AI Solutions.">
      <section>
        <h2>Angaben zum Unternehmen.</h2>
        <dl>
          <dt>Medieninhaber und Diensteanbieter</dt><dd>Paul Hölzl, Pipeline AI Solutions</dd>
          <dt>Rechtsform</dt><dd>Einzelunternehmen</dd>
          <dt>Anschrift</dt><dd>Edholz 10, 4115 Kleinzell im Mühlkreis, Österreich</dd>
          <dt>Unternehmensgegenstand</dt><dd>Multimedia-Agentur</dd>
          <dt>GISA-Zahl</dt><dd>39317261</dd>
          <dt>UID-Nummer</dt><dd>keine, Kleinunternehmer</dd>
          <dt>Umsatzsteuer</dt><dd>Umsatzsteuerbefreit – Kleinunternehmer gem. § 6 Abs. 1 Z 27 UStG</dd>
          <dt>Gewerbebehörde</dt><dd>Bezirkshauptmannschaft Rohrbach</dd>
          <dt>Kammerzugehörigkeit</dt><dd>Wirtschaftskammer Oberösterreich, Fachgruppe Werbung und Marktkommunikation</dd>
          <dt>E-Mail</dt><dd><a href="mailto:office@pipeline-solutions.at">office@pipeline-solutions.at</a></dd>
          <dt>Telefon</dt><dd><a href="tel:+4368120764203">+43 681 207 64 203</a></dd>
          <dt>Anwendbare Rechtsvorschriften</dt><dd>Gewerbeordnung, abrufbar unter <a href="https://www.ris.bka.gv.at" target="_blank" rel="noreferrer">www.ris.bka.gv.at</a></dd>
        </dl>
      </section>
      <section><h2>Offenlegung nach § 25 MedienG.</h2><p>Medieninhaber dieser Website ist Paul Hölzl, Edholz 10, 4115 Kleinzell im Mühlkreis, Österreich.</p><p>Grundlegende Richtung: Information über PipeBot und die damit verbundenen digitalen Dienstleistungen von Pipeline AI Solutions.</p></section>
      <section><h2>PipeBot.</h2><p>PipeBot ist ein Produkt von Pipeline AI Solutions und unterstützt Unternehmen dabei, Fragen zu ihrem Angebot direkt auf ihrer Website zu beantworten.</p></section>
      <section><h2>Streitbeilegung.</h2><p>Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p></section>
      <section><h2>Haftung und Urheberrecht.</h2><p>Wir haben die Inhalte dieser Website sorgfältig erstellt, übernehmen aber keine Gewähr für Richtigkeit, Vollständigkeit und Aktualität. Für Inhalte verlinkter Websites sind ausschließlich deren Betreiber verantwortlich.</p><p>Texte und Gestaltung dieser Website sind urheberrechtlich geschützt. Die Namen genannter Produkte und Dienste gehören ihren jeweiligen Inhabern.</p></section>
      <section><h2>Nachweise.</h2><p><strong>Logo und Grafiken:</strong> Die verwendeten PipeBot-Grafiken stammen aus dem Projekt.</p><p><strong>Schriften:</strong> Die Website nutzt lokal eingebundene Schriften und lädt keine externen Schriftarten nach.</p></section>
      <section><h2>Auch rechtlich relevant.</h2><ul className="legal-list"><li><a href="/datenschutz/">Datenschutzerklärung</a><span>Was verarbeitet wird, von wem, wie lange, und welche Rechte du hast.</span></li><li><a href="https://pipeline-solutions.at" target="_blank" rel="noreferrer">Pipeline AI Solutions</a><span>Das Unternehmen hinter PipeBot.</span></li><li><a href="mailto:office@pipeline-solutions.at">Kontakt</a><span>Für Fragen zu PipeBot und möglichen Projekten.</span></li></ul></section>
    </LegalPage>
  );
}
