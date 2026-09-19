# PipeBot: Go-live und Domaintrennung

## Zielbild

| Aufgabe | Domain | Eigentümer |
| --- | --- | --- |
| Unternehmen, Leistungen, Team, allgemeiner Kontakt | `pipeline-solutions.at` | Pipeline AI Solutions UG |
| PipeBot erklären, testen und anfragen | `pipebot.at` | Produkt von Pipeline AI Solutions UG |

`pipeline-solutions.at` bleibt die Unternehmensseite. Nur Seiten, deren primäres Thema PipeBot ist, werden auf `pipebot.at` weitergeleitet.

## Bereits vorbereitet

- [x] Eigenständige PipeBot-Website inklusive Chat und mobiler Variante
- [x] Produkt- und Unternehmenszuordnung auf PipeBot-Seite und im Footer
- [x] Sitemap, Robots-Datei, Canonical-URLs und Open-Graph-Metadaten
- [x] Netlify-Konfiguration mit Next.js-Plugin und Sicherheitsheadern
- [x] PipeBot-Link in der Navigation und im Footer von `pipeline-solutions.at`
- [x] Bestehende Pipeline-Weiterleitung `/tryout/*` auf den PipeBot-Testbereich vorbereitet

## Redirect-Map

| Alte URL auf pipeline-solutions.at | Ziel | Status |
| --- | --- | --- |
| `/tryout/*` | `https://pipebot.at/#ausprobieren` | im Repository vorbereitet |
| PipeBot-spezifische alte Kampagnen-URLs | passende PipeBot-Section oder `https://pipebot.at/` | nach Analytics-/Search-Console-Export ergänzen |
| Unternehmens-, Leistungs- und Rechteseiten | auf `pipeline-solutions.at` belassen | keine Weiterleitung |

Nach dem Go-live müssen die Weiterleitungen mit `curl -I` oder dem Netlify-Redirect-Tester auf Status `301` geprüft werden.

## Netlify: Reihenfolge

1. Neues Netlify-Projekt mit dem PipeBot-Repository verbinden.
2. Produktionsdomain `pipebot.at` und `www.pipebot.at` hinterlegen; eine Variante als primär definieren.
3. DNS-Einträge beim Domainanbieter auf die von Netlify genannten Werte setzen.
4. In Netlify die Variablen `NEOKENS_API_KEY`, `NEOKENS_BASE_URL` und `NEOKENS_MODEL` setzen.
5. Optional den Search-Console-Token als `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` setzen.
6. Deploy ausführen und den sichtbaren Chat testen.
7. Erst danach die Pipeline-Weiterleitung für `/tryout/*` veröffentlichen.

## Search und Messung

1. `https://pipebot.at` als eigene Property in Google Search Console anlegen und verifizieren.
2. `https://pipebot.at/sitemap.xml` einreichen.
3. Die alte Pipeline-Property öffnen und alle URLs mit Impressionen/Klicks exportieren.
4. Jede exportierte PipeBot-URL in die Redirect-Map aufnehmen; keine Sammelweiterleitung auf die Startseite verwenden.
5. Nach 7, 30 und 90 Tagen Indexabdeckung, 404-Fehler und Suchanfragen kontrollieren.

## Inhalte und Kommunikation

- E-Mail-Signaturen und Angebotsvorlagen: „PipeBot ist ein Produkt von Pipeline AI Solutions.“
- Pipeline-Seite verlinkt sichtbar auf PipeBot; PipeBot verlinkt sichtbar zurück auf Pipeline AI Solutions.
- Social-Profile, Google-Unternehmensprofil und relevante Partnerprofile auf `pipebot.at` aktualisieren.
- Bestehende Kunden erhalten eine kurze Information über die neue Produktdomain, nicht über eine Unternehmensumbenennung.

## Vor dem öffentlichen Launch

- [ ] Anschrift, Firmenbuchnummer und USt-ID in Impressum eintragen
- [ ] Datenschutz mit tatsächlichem Hosting, Auftragsverarbeitung und Drittlandtransfer rechtlich prüfen
- [ ] Den im Chat geteilten Neokens-API-Key widerrufen/rotieren und ausschließlich als Netlify-Umgebungsvariable hinterlegen
- [ ] E-Mail-Adresse für Produktanfragen verbindlich festlegen und testen
- [ ] DNS, TLS-Zertifikat und beide Domainvarianten testen
- [ ] Redirect-Map anhand echter Search-Console- und Analytics-Daten vervollständigen
