# PipeBot Website

Eigenständige Produkt-Website für PipeBot, den KI-Chatbot von Pipeline AI Solutions. Die Website enthält einen serverseitig angebundenen Live-Chat über die OpenAI-kompatible Neokens-V2-API.

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
NEOKENS_MODEL=gpt-5.6-sol
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...
```

Der API-Schlüssel darf ausschließlich serverseitig als Umgebungsvariable gespeichert werden. `.env.local` wird nicht versioniert.

## Produktion

```bash
npm run build
```

Das Projekt nutzt eine dynamische Next.js-Route unter `/api/chat`. Für Netlify ist das offizielle Next.js-Plugin konfiguriert. Die drei `NEOKENS_*`-Variablen müssen vor dem Deployment in Netlify hinterlegt werden.

Für die Domaintrennung, Weiterleitungen und den Go-live gibt es eine konkrete Arbeitsliste unter [docs/PIPEBOT-MIGRATION.md](docs/PIPEBOT-MIGRATION.md).

## Vor Veröffentlichung ausfüllen

- Anschrift im Impressum
- Firmenbuchnummer
- USt-ID
- Datenschutzangaben und Auftragsverarbeitung prüfen, sobald Hosting und KI-Dienste final feststehen
- optional: Google-Search-Console-Token als `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Netlify setzen
