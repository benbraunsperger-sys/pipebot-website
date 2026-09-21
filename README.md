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

Das Projekt nutzt eine dynamische Next.js-Route unter `/api/chat`. Die drei `NEOKENS_*`-Variablen müssen in der jeweiligen Server-Umgebung hinterlegt werden.

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
- Sitemap: ausschließlich die vier kanonischen PipeBot-Seiten
- Optional: Google-Search-Console-Token als `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` setzen

Externe Betriebsaufgaben wie DNS, Schlüsselrotation und eine abschließende Rechtsprüfung werden in `docs/PIPEBOT-MIGRATION.md` geführt.
