# PipeBot Website

Eigenständige Produkt-Website für PipeBot, den KI-Chatbot von Pipeline AI Solutions. Die Website enthält einen serverseitig angebundenen Live-Chat und eine kostenlose, website-spezifische Testversion über die OpenAI-kompatible Neokens-V2-API.

## Lokal starten

```bash
npm install
npm run dev
```

Die lokale Website läuft anschließend unter `http://localhost:3000`.

## Chat konfigurieren

`.env.example` nach `.env.local` kopieren und folgende Werte setzen:

```env
NEOKENS_API_KEY=...
NEOKENS_BASE_URL=https://api.v2.neokens.com/v1
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...
```

Der API-Schlüssel darf ausschließlich serverseitig als Umgebungsvariable gespeichert werden. `.env.local` wird nicht versioniert.

## Missbrauchsschutz

In Produktion benötigt die Website zusätzlich die Variablen aus `.env.example` für Upstash Redis, den IP-HMAC-Schlüssel und Cloudflare Turnstile. Lege sie in Railway als Service-Variablen an; `NEXT_PUBLIC_TURNSTILE_SITE_KEY` muss bereits beim Build gesetzt sein. Erstelle in Cloudflare ein Turnstile-Widget für `pipebot.at` und `www.pipebot.at`, und trage die erlaubten Hostnamen exakt in `TURNSTILE_ALLOWED_HOSTNAMES` ein.

Die API prüft Turnstile serverseitig mit Einmal-Token und erwartet die Aktion `trial_analyze`. Die Testkonfiguration wird an die beim Anlegen ermittelte Client-IP gebunden. Rate Limits werden atomar und gemeinsam für alle Instanzen in Upstash Redis gespeichert; Anfragen werden bei fehlender oder nicht erreichbarer Schutzkonfiguration in Produktion abgewiesen. Railway muss dafür seine dokumentierte `X-Real-IP`-Headerinformation liefern. In der lokalen Entwicklung bleibt die Sicherheitsprüfung ohne externe Zugangsdaten deaktiviert.

Aktuelle Grenzen: drei Website-Analysen pro IP und Stunde, 30 Chat-Anfragen pro IP in zehn Minuten sowie acht Fragen je Testprofil. Cloudflare Turnstile, IP-Limits und Railway-Netzwerkschutz reduzieren Botting deutlich, verhindern gezielte Umgehung oder volumetrische Angriffe aber nicht vollständig. Für zusätzliche Abwehr auf der Netzwerkkante müssen WAF-/Bot-Regeln beim Hosting- oder DNS-Anbieter aktiviert werden.

## Produktion

```bash
npm run build
```

Das Projekt nutzt dynamische Next.js-Routen unter `/api/chat`, `/api/trial/analyze` und `/api/trial/chat`. `NEOKENS_API_KEY` und optional `NEOKENS_BASE_URL` müssen in der jeweiligen Server-Umgebung hinterlegt werden.

Die Testversion unter `/testen/` analysiert ausschließlich öffentlich erreichbare Websites, übernimmt das erkannte Farbsystem und erstellt einen temporären Chatbot. Ein Testprofil bleibt maximal 30 Minuten im Arbeitsspeicher, ist an die ermittelte Client-IP gebunden, erlaubt acht Fragen und wird nicht dauerhaft gespeichert. Die Modellreihenfolge ist Claude Sonnet 5, GPT 5.6 Luna und Gemini 3.8 Flash.

## Deployment-Vorgabe

Dieses Projekt wird ausschließlich über GitHub gepflegt und gepusht:
`https://github.com/benbraunsperger-sys/pipebot-website`

Kein Netlify-Deployment und keine Netlify-Verknüpfung verwenden.

Für die Domaintrennung, Weiterleitungen und den Go-live gibt es eine konkrete Arbeitsliste unter [docs/PIPEBOT-MIGRATION.md](docs/PIPEBOT-MIGRATION.md).

## Aktueller Produktionsstatus

- Anbieter: Pipeline AI Solutions, Einzelunternehmen von Paul Hölzl
- Hosting: Railway
- KI-Schnittstelle: Neokens V2, serverseitig angebunden
- Produktkontakt: `office@pipeline-solutions.at` und `+43 681 207 64 203`
- Sitemap: PipeBot-Kernseiten sowie 40.000 Branchen-, Kundenkontext- und Informationsthema-Seiten
- Optional: Google-Search-Console-Token als `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` setzen

## Anwendungsseiten

Die Branchenübersicht unter `/branchen/` verknüpft 100 Geschäftstypen mit 20 Kundensituationen und 20 Informationsthemen. Daraus entstehen 40.000 serverseitig gerenderte Beispielseiten mit individuellen Titeln, Texten, Fragen, Checklisten und selbstreferenzierenden Canonicals. Die Seiten sind in der XML-Sitemap enthalten und über Branchenübersichten intern verlinkt.

Die Sitemap enthält derzeit weniger als die dokumentierte Grenze von 50.000 URLs pro Datei. Eine Sitemap-Datei kann dadurch genutzt werden; wenn der Bestand diese Grenze überschreitet, muss die Sitemap in Teile und einen Sitemap-Index aufgeteilt werden. Technische Indexierbarkeit ist keine Garantie für eine Aufnahme oder Platzierung in Suchmaschinen.

Externe Betriebsaufgaben wie DNS, Schlüsselrotation und eine abschließende Rechtsprüfung werden in `docs/PIPEBOT-MIGRATION.md` geführt.
