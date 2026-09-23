/**
 * Editorial taxonomy for PipeBot's use-case directory.
 * 100 business types × 20 customer situations × 20 information topics = 40,000
 * distinct, server-rendered landing pages. The copy is framed as practical
 * guidance and examples; it makes no customer, performance, or integration claims.
 */

export type Industry = {
  slug: string;
  name: string;
  category: string;
  intro: string;
  offer: string;
  example: string;
  pageHint: string;
};

type Journey = { slug: string; name: string; context: string; guidance: string };
type Topic = { slug: string; name: string; focus: string; checks: [string, string, string]; question: string };

const industryGroups: Array<{ category: string; items: Array<[string, string, string, string, string, string]> }> = [
  {
    category: 'Handwerk & Haus',
    items: [
      ['installateur', 'Installateurbetriebe', 'Service, Wartung und Reparaturen an Wasser- und Haustechnik', 'Übernehmt ihr auch Reparaturen an einer bestehenden Anlage?', 'Leistungsgebiet, Notdienstzeiten und welche Anlagentypen übernommen werden', 'Klar sagen, welche Fälle vorab telefonisch abgeklärt werden müssen.'],
      ['elektriker', 'Elektrobetriebe', 'Elektroinstallationen, Prüfungen und Fehlersuche', 'Welche Angaben braucht ihr für eine erste Einschätzung zu einem Stromausfall?', 'Leistungsumfang, Einsatzgebiet und Anforderungen an eine sichere Erstbeschreibung', 'Sicherheitskritische Störungen nicht per Chat diagnostizieren lassen.'],
      ['heizungsbauer', 'Heizungsbetriebe', 'Planung, Einbau und Wartung von Heizungsanlagen', 'Welche Heizungssysteme betreut ihr und was ist vor einem Termin wichtig?', 'Betreute Systeme, Wartungsintervalle und Angaben zur vorhandenen Anlage', 'Keine Ferndiagnose versprechen; auf sichere Kontaktwege verweisen.'],
      ['dachdecker', 'Dachdeckerbetriebe', 'Dachdeckung, Reparatur und Arbeiten an der Gebäudehülle', 'Welche Fotos oder Maße helfen bei einer Anfrage zur Dachreparatur?', 'Arbeitsarten, erreichbare Orte und benötigte Angaben für eine Besichtigung', 'Bei akuten Schäden auf die vereinbarten Notfallkontakte hinweisen.'],
      ['tischlerei', 'Tischlereien', 'Möbel, Innenausbau und maßgefertigte Holzarbeiten', 'Fertigt ihr auch nach Maß und welche Maße sollte ich vorbereiten?', 'Materialien, Maßanfertigung, Planungsablauf und Beispiele abgeschlossener Arbeiten', 'Beispiele nicht als verbindliche Preis- oder Lieferzusage ausgeben.'],
      ['malerbetrieb', 'Malerbetriebe', 'Malerarbeiten, Beschichtungen und Oberflächensanierung', 'Welche Informationen braucht ihr für ein Angebot zum Ausmalen?', 'Leistungsumfang, Untergrund, Quadratmeter und mögliche Vorarbeiten', 'Nicht ohne Besichtigung einen Festpreis behaupten.'],
      ['bodenleger', 'Bodenlegerbetriebe', 'Verlegung und Sanierung unterschiedlicher Bodenbeläge', 'Welche Bodenbeläge verlegt ihr und wie läuft ein Beratungstermin ab?', 'Verfügbare Beläge, Untergrund, Vorarbeiten und Ablauf der Beratung', 'Pflege- und Eignungshinweise nur aus freigegebenen Produktinformationen nennen.'],
      ['glaserei', 'Glasereien', 'Glasreparatur, Verglasung und individuelle Glaselemente', 'Repariert ihr Glasbruch und welche Angaben helfen bei der Anfrage?', 'Glasarten, Einsatzgebiet und Angaben zu Größe und Einbausituation', 'Bei Gefahren durch Glassplitter zuerst auf sichere Kontaktaufnahme verweisen.'],
      ['schlosserei', 'Schlossereien', 'Metallbau, Reparaturen und individuelle Konstruktionen', 'Welche Metallarbeiten übernehmt ihr und braucht ihr eine Zeichnung?', 'Materialien, Maße, Zeichnungen und Ablauf bis zur Fertigung', 'Fertigungszeiten nur nennen, wenn sie aktuell auf der Website stehen.'],
      ['zimmerei', 'Zimmereibetriebe', 'Holzbau, Dachstühle und konstruktive Arbeiten', 'Welche Holzbauarbeiten gehören zu eurem Angebot?', 'Bauleistungen, Projektumfang, Planungsbedarf und benötigte Unterlagen', 'Keine statische oder baurechtliche Freigabe durch den Chat simulieren.'],
      ['fliesenleger', 'Fliesenlegerbetriebe', 'Fliesenarbeiten in Bad, Küche und Wohnräumen', 'Welche Fliesenarbeiten führt ihr aus und wie sollte der Untergrund vorbereitet sein?', 'Leistungsarten, Fläche, Untergrund und mögliche Vorarbeiten', 'Vorbereitung nicht als Ersatz für eine Prüfung vor Ort darstellen.'],
      ['kfz-werkstatt', 'Kfz-Werkstätten', 'Wartung, Reparatur und Fahrzeugservice', 'Welche Fahrzeugdaten soll ich für einen Werkstatttermin bereithalten?', 'Marke, Modell, Baujahr, Kilometerstand und angebotene Arbeiten', 'Keine sicherheitsrelevante Fahrzeugdiagnose aus der Ferne behaupten.'],
      ['fahrradwerkstatt', 'Fahrradwerkstätten', 'Service, Reparatur und Wartung von Fahrrädern', 'Repariert ihr auch E-Bikes und soll ich das Modell vorab nennen?', 'Fahrradtypen, betreute Antriebe, Terminablauf und Ersatzteilhinweise', 'Kompatibilität nur bestätigen, wenn sie dokumentiert ist.'],
      ['gartenbau', 'Garten- und Landschaftsbauer', 'Gartenplanung, Pflege und Außenanlagen', 'Übernehmt ihr Gartenpflege oder nur die Neuanlage?', 'Leistungsgebiet, saisonale Arbeiten und Größenordnung der Projekte', 'Saisonale Verfügbarkeit nicht dauerhaft voraussetzen.'],
      ['reinigung', 'Reinigungsbetriebe', 'Gebäude-, Büro- und Spezialreinigung', 'Welche Reinigungsleistungen bietet ihr für Gewerberäume an?', 'Reinigungsarten, Einsatzorte, Häufigkeit und benötigte Flächenangaben', 'Keine Reinigungsfrequenz als vereinbart darstellen, bevor sie angefragt wurde.'],
      ['schaedlingsbekaempfung', 'Schädlingsbekämpfer', 'Inspektion und Bekämpfung von Schädlingsbefall', 'Welche Informationen helfen euch, einen möglichen Befall einzuordnen?', 'Betroffene Räume, beobachtete Spuren, Einsatzgebiet und Kontaktweg', 'Keine Artbestimmung oder Gesundheitsbewertung durch den Chat versprechen.'],
      ['umzug', 'Umzugsunternehmen', 'Privat- und Firmenumzüge samt Zusatzleistungen', 'Welche Angaben braucht ihr für eine Umzugskalkulation?', 'Start und Ziel, Stockwerke, Umfang, Wunschtermin und Zusatzleistungen', 'Eine Anfrage oder Schätzung nicht mit einem fixen Angebot verwechseln.'],
      ['kuechenstudio', 'Küchenstudios', 'Küchenplanung, Beratung und Montage', 'Was sollte ich zu einem ersten Küchenberatungstermin mitbringen?', 'Raummaße, Anschlüsse, Wünsche, Budgetrahmen und Terminoptionen', 'Preis- und Planungsbeispiele als unverbindlich kennzeichnen.'],
      ['solartechnik', 'Solartechnikbetriebe', 'Planung und Installation von Photovoltaik und Solarthermie', 'Welche Angaben braucht ihr für eine erste Einschätzung zur PV-Anlage?', 'Dachfläche, Verbrauch, Standort und vorhandene elektrische Infrastruktur', 'Ertrag, Förderung und technische Eignung nicht pauschal garantieren.'],
      ['raumausstatter', 'Raumausstatter', 'Vorhänge, Polster, Sonnenschutz und Innenraumgestaltung', 'Kann ich Stoffmuster oder Maße vor einem Beratungstermin schicken?', 'Leistungsarten, Stoffe, Maße und Möglichkeit einer Vor-Ort-Beratung', 'Materialverfügbarkeit vor einer Bestellung aktuell bestätigen lassen.'],
    ],
  },
  {
    category: 'Gesundheit & Betreuung',
    items: [
      ['arztpraxis', 'Arztpraxen', 'Allgemeine medizinische Versorgung und Terminorganisation', 'Welche Unterlagen soll ich zum ersten Termin mitbringen?', 'Ordinationszeiten, Aufnahmeablauf, Kontaktwege und Unterlagen laut Praxis', 'Keine Diagnose, Therapieempfehlung oder Notfallbeurteilung per Chat.'],
      ['zahnarztpraxis', 'Zahnarztpraxen', 'Zahnmedizinische Untersuchungen und Behandlungen', 'Nehmt ihr neue Patientinnen und Patienten auf?', 'Leistungsspektrum, Aufnahme neuer Personen und Terminvereinbarung', 'Keine individuelle Diagnose oder Behandlungsempfehlung ausgeben.'],
      ['kieferorthopaedie', 'Kieferorthopädische Praxen', 'Beratung und Behandlung rund um Zahn- und Kieferfehlstellungen', 'Wie läuft ein Erstgespräch zur kieferorthopädischen Behandlung ab?', 'Ablauf des Erstgesprächs, Unterlagen und Kontakt für Terminfragen', 'Keine individuelle Eignung oder Behandlungskosten ohne Befund behaupten.'],
      ['dermatologie', 'Dermatologische Praxen', 'Hautärztliche Untersuchungen und vereinbarte Behandlungen', 'Welche Befunde oder Überweisungen brauche ich für einen Termin?', 'Terminarten, Aufnahmebedingungen und angefragte Unterlagen', 'Keine Symptome beurteilen oder medizinischen Rat ersetzen.'],
      ['physiotherapie', 'Physiotherapiepraxen', 'Physiotherapeutische Behandlungen nach individueller Abklärung', 'Brauche ich eine Verordnung und wie vereinbare ich den ersten Termin?', 'Verordnungsregeln laut Praxis, Terminablauf und mitzubringende Unterlagen', 'Keine Übungen oder Therapiepläne aus dem Chat ableiten.'],
      ['ergotherapie', 'Ergotherapiepraxen', 'Ergotherapeutische Angebote für Alltag und Handlungsfähigkeit', 'Für welche Altersgruppen und Anliegen bietet ihr Ergotherapie an?', 'Zielgruppen, angebotene Bereiche und Ablauf der Kontaktaufnahme', 'Keine Eignung für eine Behandlung individuell feststellen.'],
      ['logopaedie', 'Logopädische Praxen', 'Logopädische Diagnostik und Therapieangebote', 'Wie läuft die Anmeldung zu einer logopädischen Behandlung ab?', 'Zuweisung, Zielgruppen, Kontaktweg und Ablauf laut Praxisinformation', 'Keine Diagnose oder Prognose aus einer Chatbeschreibung ableiten.'],
      ['psychotherapie', 'Psychotherapiepraxen', 'Psychotherapeutische Erstgespräche und vereinbarte Begleitung', 'Wie kann ich ein Erstgespräch anfragen und was kostet es?', 'Kontaktweg, Honorarhinweis, Rahmenbedingungen und Terminablauf', 'Keine psychologische Beratung oder Krisenintervention durch den Chat.'],
      ['hebamme', 'Hebammenpraxen', 'Begleitung rund um Schwangerschaft, Geburt und Wochenbett', 'Welche Betreuungsangebote und Zeiträume deckt ihr ab?', 'Betreuungsumfang, Verfügbarkeit, Kostenhinweise und Kontaktmöglichkeiten', 'Keine individuelle medizinische Einschätzung oder Notfallhilfe.'],
      ['tierarztpraxis', 'Tierarztpraxen', 'Tiermedizinische Untersuchungen und vereinbarte Behandlungen', 'Welche Angaben zu meinem Tier soll ich bei der Terminvereinbarung nennen?', 'Tierart, Terminart, Öffnungszeiten und mitzubringende Dokumente', 'Keine Diagnose, Medikamentenempfehlung oder Notfallbeurteilung.'],
      ['augenoptik', 'Optikbetriebe', 'Brillenberatung, Sehtests und optische Produkte', 'Bietet ihr Sehtests an und muss ich dafür einen Termin vereinbaren?', 'Angebotene Sehtests, Terminregelung, Sortiment und Serviceleistungen', 'Keine medizinische Diagnose aus Sehstörungen ableiten.'],
      ['hoerakustik', 'Hörakustikbetriebe', 'Hörberatung, Hörtests und Hörsysteme', 'Wie läuft ein unverbindlicher Hörtest bei euch ab?', 'Testablauf, Terminoptionen, Sortiment und Kostenhinweise laut Website', 'Testergebnisse nicht medizinisch interpretieren.'],
      ['apotheke', 'Apotheken', 'Arzneimittelabgabe und dokumentierte Apothekenservices', 'Welche Services kann ich vor einem Besuch bei euch anfragen?', 'Öffnungszeiten, Services, Erreichbarkeit und offizielle Bereitschaftshinweise', 'Keine Arzneimittel-, Dosierungs- oder Wechselwirkungsberatung per Chat.'],
      ['pflegedienst', 'Mobile Pflegedienste', 'Organisierte Unterstützung und Pflegeleistungen zu Hause', 'Welche Informationen braucht ihr für eine Anfrage zur Betreuung?', 'Betreuungsgebiet, Leistungsarten, Kontaktweg und erforderliche Erstinformationen', 'Keine Pflegebedarfsfeststellung oder Notfallkoordination versprechen.'],
      ['kosmetikstudio', 'Kosmetikstudios', 'Kosmetische Behandlungen und Terminangebote', 'Welche Behandlung passt zu meinem Terminwunsch?', 'Behandlungsliste, Dauerangaben, Vorbereitung und Buchungsweg', 'Keine medizinischen Wirkungen oder Ergebnisse versprechen.'],
      ['podologie', 'Podologische Praxen', 'Podologische Fußbehandlungen und vereinbarte Leistungen', 'Welche Leistungen kann ich ohne oder mit Überweisung buchen?', 'Leistungsbeschreibung, Aufnahmeablauf und angefragte Unterlagen', 'Keine medizinische Beratung zur individuellen Beschwerde geben.'],
      ['fitnessstudio', 'Fitnessstudios', 'Trainingsangebote, Mitgliedschaften und Studiozugang', 'Welche Mitgliedschaft passt zu meinem Trainingsrhythmus?', 'Tarife, Laufzeiten, Öffnungszeiten und enthaltene Leistungen', 'Keine individuellen Gesundheits- oder Trainingspläne ausgeben.'],
      ['yogastudio', 'Yogastudios', 'Kurse, Workshops und Yoga-Angebote', 'Welcher Kurs ist für Einsteigerinnen und Einsteiger geeignet?', 'Kursniveau, Zeiten, benötigte Ausstattung und Buchungsregeln', 'Kurse nicht als medizinische Behandlung darstellen.'],
      ['massagepraxis', 'Massagepraxen', 'Massagen und dokumentierte Wohlfühlangebote', 'Welche Dauer und Vorbereitung gelten für einen Termin?', 'Angebotsbeschreibung, Dauer, Preisangaben und Terminablauf', 'Keine Heilwirkung oder Behandlung eines Krankheitsbilds versprechen.'],
      ['ernaehrungsberatung', 'Ernährungsberatungen', 'Beratung zu Ernährung und dokumentierten Begleitangeboten', 'Welche Schwerpunkte und Beratungsformate bietet ihr an?', 'Beratungsinhalte, Qualifikation, Formate und Kontaktweg', 'Keine individuelle medizinische oder diätetische Empfehlung geben.'],
    ],
  },
  {
    category: 'Gastronomie, Reisen & Freizeit',
    items: [
      ['restaurant', 'Restaurants', 'Speisekarte, Reservierungen und Besuchsinformationen', 'Gibt es vegetarische Optionen und wie reserviere ich einen Tisch?', 'Aktuelle Speisekarte, Öffnungszeiten, Reservierungsweg und dokumentierte Hinweise', 'Allergene nicht aus alten oder ungeprüften Angaben beantworten.'],
      ['cafe', 'Cafés', 'Getränke, Speisen und Informationen zum Besuch', 'Habt ihr auch Frühstück und kann ich einen Tisch reservieren?', 'Speiseangebot, Zeiten, Sitzplätze und Reservierungsmöglichkeit', 'Tagesangebote nur nennen, wenn sie aktuell gepflegt werden.'],
      ['baeckerei', 'Bäckereien', 'Brot, Gebäck und Öffnungszeiten der Filialen', 'Welche Brote gibt es und wann öffnet eure Filiale?', 'Sortiment, Filialzeiten, Vorbestellung und verfügbare Informationen zu Zutaten', 'Tagesbestand oder Allergene nicht ohne aktuelle Daten garantieren.'],
      ['konditorei', 'Konditoreien', 'Torten, Mehlspeisen und individuelle Bestellungen', 'Wie früh soll ich eine Torte für eine Feier bestellen?', 'Bestellfristen, Größen, Abholung, Dekorationsoptionen und Anfrageweg', 'Auftragsannahme und kurzfristige Verfügbarkeit nicht automatisch zusagen.'],
      ['hotel', 'Hotels', 'Zimmer, Aufenthalte und Serviceinformationen', 'Welche Check-in-Zeit gilt und sind Haustiere erlaubt?', 'Zimmerkategorien, Check-in, Hausregeln und Buchungsweg', 'Buchung, Preis und Verfügbarkeit nicht ohne Echtzeitdaten bestätigen.'],
      ['pension', 'Pensionen', 'Zimmer und persönliche Informationen für den Aufenthalt', 'Gibt es Frühstück und wie erreiche ich die Pension?', 'Ausstattung, Verpflegung, Anreise und direkte Kontaktwege', 'Freie Zimmer nicht ohne aktuelle Verfügbarkeitsabfrage versprechen.'],
      ['ferienwohnung', 'Ferienwohnungsanbieter', 'Ausstattung, Anreise und Buchungsinformationen', 'Wie viele Personen können in der Ferienwohnung übernachten?', 'Belegung, Ausstattung, Check-in und Hausregeln', 'Kalenderverfügbarkeit und Buchung nicht ohne Abgleich bestätigen.'],
      ['campingplatz', 'Campingplätze', 'Stellplätze, Ausstattung und Platzregeln', 'Welche Fahrzeuge und Zeltgrößen sind auf eurem Platz möglich?', 'Stellplatzarten, Größen, Saisonzeiten und Platzordnung', 'Aktuelle Verfügbarkeit nur mit dem Buchungssystem beantworten.'],
      ['catering', 'Cateringbetriebe', 'Speisenangebote und Verpflegung für Veranstaltungen', 'Wie plant ihr ein Catering für unsere Gästezahl?', 'Personenzahl, Menüformen, Liefergebiet und Vorlaufzeit', 'Keine Verfügbarkeit oder verbindlichen Preise ohne individuelles Angebot behaupten.'],
      ['eventlocation', 'Eventlocations', 'Räume, Ausstattung und Informationen für Veranstaltungen', 'Wie viele Gäste passen in den Raum und was ist inklusive?', 'Kapazitäten, Ausstattung, Zugänge, Zeitfenster und Anfrageablauf', 'Kapazitäts- und Preisangaben an aktuelle Raumkonfiguration knüpfen.'],
      ['reisebuero', 'Reisebüros', 'Reiseberatung, Angebote und Buchungskontakt', 'Welche Angaben braucht ihr für eine passende Reiseberatung?', 'Reisearten, Beratungszeiten, benötigte Wünsche und Buchungsweg', 'Keine Verfügbarkeit, Einreisebestimmungen oder Preise ungeprüft garantieren.'],
      ['reiseveranstalter', 'Reiseveranstalter', 'Pauschalreisen, Programme und Reisebedingungen', 'Was ist im Reisepaket enthalten und welche Fristen gelten?', 'Leistungsumfang, Termine, Bedingungen und offizielle Informationsblätter', 'Rechtlich verbindliche Reisebedingungen nicht verkürzt wiedergeben.'],
      ['museum', 'Museen', 'Ausstellungen, Öffnungszeiten und Besuchsplanung', 'Welche Ausstellungen sind derzeit zu sehen und wann habt ihr offen?', 'Aktueller Ausstellungsplan, Öffnungszeiten, Eintritt und Zugangshinweise', 'Wechselausstellungen nur mit aktuell gepflegtem Stand nennen.'],
      ['freizeitpark', 'Freizeitparks', 'Attraktionen, Besuchsregeln und Ticketinformationen', 'Welche Attraktionen eignen sich für Kinder und was kostet der Eintritt?', 'Attraktionen, Alters- oder Größenhinweise, Zeiten und Ticketbedingungen', 'Tagesbetrieb und Wartezeiten ohne Echtzeitdaten nicht versprechen.'],
      ['skischule', 'Skischulen', 'Kurse, Kursniveau und Anmeldung im Skigebiet', 'Welche Voraussetzungen gelten für einen Anfängerkurs?', 'Kursstufen, Treffpunkte, Ausrüstung und Anmeldebedingungen', 'Schnee- und Liftbedingungen als veränderliche Information markieren.'],
      ['kletterhalle', 'Kletterhallen', 'Eintritt, Kurse und Sicherheitsinformationen', 'Kann ich als Anfänger ohne eigene Ausrüstung kommen?', 'Einsteigerangebote, Leihausrüstung, Einweisung und Zutrittsregeln', 'Keine Eignung oder Sicherheitsfreigabe individuell per Chat feststellen.'],
      ['tanzschule', 'Tanzschulen', 'Kurse, Termine und Anmeldungen', 'Welche Tanzkurse gibt es für Paare ohne Vorkenntnisse?', 'Kursstufen, Starttermine, Anmeldung und benötigte Vorkenntnisse', 'Kursplätze nur bei aktueller Kapazitätsabfrage als frei bezeichnen.'],
      ['golfclub', 'Golfclubs', 'Platz, Mitgliedschaft und Greenfee-Informationen', 'Kann ich als Gast eine Startzeit buchen?', 'Gastregeln, Platzreife, Buchungsweg und dokumentierte Gebühren', 'Abschlagszeiten und Platzstatus nur mit aktuellen Daten bestätigen.'],
      ['sauna-therme', 'Thermen und Saunabetriebe', 'Eintritt, Bereiche und Besuchsregeln', 'Welche Bereiche sind im Tageseintritt enthalten?', 'Öffnungszeiten, Bereiche, Eintrittsbedingungen und Hausordnung', 'Auslastung und aktuelle Schließungen nicht ohne Echtzeitinformation angeben.'],
      ['sportverein', 'Sportvereine', 'Trainingszeiten, Mitgliedschaft und Vereinsangebote', 'Wie kann mein Kind beim Training schnuppern?', 'Altersgruppen, Trainingszeiten, Anmeldung und Vereinskontakt', 'Teilnahme nicht ohne Bestätigung des Vereins zusagen.'],
    ],
  },
  {
    category: 'Beratung & B2B',
    items: [
      ['rechtsanwaltskanzlei', 'Rechtsanwaltskanzleien', 'Rechtsgebiete, Erstkontakt und Kanzleiorganisation', 'In welchen Rechtsgebieten arbeitet eure Kanzlei?', 'Tätigkeitsschwerpunkte, Erstkontakt, benötigte Unterlagen und Terminweg', 'Keine individuelle Rechtsberatung oder Erfolgsaussage durch den Chat.'],
      ['steuerberatung', 'Steuerberatungskanzleien', 'Steuerberatung, Buchhaltung und Jahresabschlüsse', 'Betreut ihr auch kleine Unternehmen und welche Unterlagen braucht ihr?', 'Mandantengruppen, Leistungsumfang und Unterlagen laut Kanzleihinweisen', 'Keine individuelle Steuerberechnung oder Fristenberatung geben.'],
      ['buchhaltung', 'Buchhaltungsbüros', 'Laufende Buchhaltung und Belegorganisation', 'Welche Buchhaltungsunterlagen kann ich digital übermitteln?', 'Leistungsumfang, akzeptierte Formate, Übergabeweg und Aufbewahrungshinweise', 'Keine vertraulichen Daten im öffentlichen Chat abfragen.'],
      ['unternehmensberatung', 'Unternehmensberatungen', 'Beratungsfelder, Projektablauf und Erstgespräche', 'Wie läuft ein erstes Beratungsgespräch für unser Unternehmen ab?', 'Schwerpunkte, Zielgruppe, Ablauf und benötigte Erstinformationen', 'Keine Referenz oder Ergebnisgarantie erfinden.'],
      ['architekturbüro', 'Architekturbüros', 'Entwurfsplanung, Einreichung und Projektbegleitung', 'Welche Pläne sollte ich zu einem Erstgespräch mitbringen?', 'Leistungsphasen, Projektart, Unterlagen und Honorarhinweise', 'Baurechtliche Machbarkeit nicht ohne Einzelfallprüfung bestätigen.'],
      ['ingenieurbuero', 'Ingenieurbüros', 'Technische Planung und dokumentierte Fachleistungen', 'Welche technischen Angaben braucht ihr für eine Projektanfrage?', 'Fachgebiete, Projektumfang, vorhandene Pläne und Anfrageablauf', 'Normenkonformität nicht ohne Prüfung eines konkreten Projekts behaupten.'],
      ['immobilienmakler', 'Immobilienmakler', 'Vermittlung, Besichtigungen und Objektinformationen', 'Welche Unterlagen sollte ich zu einer Immobilienanfrage mitschicken?', 'Objekttyp, Suchkriterien, Besichtigungsweg und benötigte Dokumente', 'Verfügbarkeit und Objektangaben nur aus aktuellen Inseraten wiedergeben.'],
      ['hausverwaltung', 'Hausverwaltungen', 'Verwaltung von Wohn- und Gewerbeimmobilien', 'Wie erreiche ich die zuständige Stelle für mein Anliegen?', 'Zuständigkeitsbereiche, Sprechzeiten und vorgesehene Kontaktwege', 'Keine vertraulichen Miet- oder Eigentümerdaten öffentlich abfragen.'],
      ['versicherungsmakler', 'Versicherungsmakler', 'Beratung zu dokumentierten Versicherungsleistungen', 'Welche Informationen sind für ein erstes Versicherungsgespräch hilfreich?', 'Beratungsbereiche, Terminweg und allgemeine Unterlagenhinweise', 'Keine individuelle Deckungs- oder Schadenszusage formulieren.'],
      ['werbeagentur', 'Werbeagenturen', 'Strategie, Kreation und Kampagnenleistungen', 'Welche Leistungen übernehmt ihr von der Idee bis zur Kampagne?', 'Leistungspakete, Prozess, Projektbeispiele und Anfrageinformationen', 'Ergebnisse und Reichweiten nicht ohne belastbare Belege versprechen.'],
      ['webagentur', 'Webagenturen', 'Webdesign, Entwicklung und digitale Betreuung', 'Mit welchen Systemen und Website-Projekten arbeitet ihr?', 'Technologien, Projektphasen, Übergabe und Wartungsumfang', 'Kompatibilität nicht behaupten, wenn eine Technologie nicht dokumentiert ist.'],
      ['it-systemhaus', 'IT-Systemhäuser', 'IT-Betreuung, Infrastruktur und Supportleistungen', 'Welche Informationen helfen eurem Support bei einem Problem?', 'Betreute Systeme, Supportzeiten und sichere Kontaktwege', 'Keine Zugangsdaten, Passwörter oder vertrauliche Logs anfordern.'],
      ['softwareunternehmen', 'Softwareunternehmen', 'Produktfunktionen, Einführung und technischer Support', 'Welche Funktionen sind in unserem Tarif enthalten?', 'Produktumfang, Tarifhinweise, Dokumentation und Supportweg', 'Tarif- oder Verfügbarkeitsdaten nur aus aktueller Dokumentation beziehen.'],
      ['personalvermittlung', 'Personalvermittlungen', 'Vermittlung, Bewerbungsablauf und Unternehmensanfragen', 'Wie läuft die Zusammenarbeit bei einer Personalsuche ab?', 'Branchen, Prozess, benötigte Stelleninformationen und Kontaktpersonen', 'Keine Vermittlungsquote oder Besetzungsdauer ohne Beleg nennen.'],
      ['coworking', 'Coworking Spaces', 'Arbeitsplätze, Räume und Mitgliedschaftsmodelle', 'Welche Arbeitsplatzmodelle kann ich tageweise nutzen?', 'Zugangszeiten, Arbeitsplatzarten, enthaltene Leistungen und Buchungsweg', 'Freie Plätze nur mit aktuellen Verfügbarkeitsdaten bestätigen.'],
      ['fotostudio', 'Fotostudios', 'Portrait-, Produkt- und Veranstaltungsfotografie', 'Wie bereite ich mich auf ein Fotoshooting vor und was soll ich mitbringen?', 'Shootingarten, Nutzungsrechte, Ablauf und erforderliche Vorbereitung', 'Bildnutzungsrechte und Lieferumfang nur nach den aktuellen Angebotsbedingungen beschreiben.'],
      ['uebersetzungsbuero', 'Übersetzungsbüros', 'Übersetzungen, Sprachkombinationen und Beglaubigungsinformationen', 'Welche Sprachen und Fachbereiche deckt ihr ab?', 'Sprachen, Fachgebiete, Formate und Ablauf für ein Angebot', 'Keine Beglaubigung oder Lieferfrist ohne konkrete Auftragsprüfung zusagen.'],
      ['notariat', 'Notariate', 'Notarielle Tätigkeiten, Beurkundungen und Terminorganisation', 'Welche Dokumente soll ich für eine Beglaubigung vorbereiten?', 'Dokumentenhinweise, Terminweg, Öffnungszeiten und Zuständigkeitsgrenzen', 'Keine Rechtsauskunft oder verbindliche Dokumentenprüfung geben.'],
      ['finanzberatung', 'Finanzberatungen', 'Beratungsangebote und Kontaktinformationen', 'Welche Themen kann ich in einem Erstgespräch besprechen?', 'Beratungsfelder, Ablauf, Kostenhinweise und erforderliche Erstinformationen', 'Keine individuelle Anlage-, Kredit- oder Renditeempfehlung geben.'],
      ['sicherheitsdienst', 'Sicherheitsdienste', 'Bewachung, Veranstaltungsschutz und Sicherheitsplanung', 'Welche Angaben braucht ihr für ein Angebot zum Veranstaltungsschutz?', 'Veranstaltungsart, Ort, Zeit, Umfang und Kontaktweg', 'Keine Sicherheitslage oder Einsatzfähigkeit ohne Prüfung bewerten.'],
    ],
  },
  {
    category: 'Handel, Bildung & Alltag',
    items: [
      ['online-shop', 'Online-Shops', 'Sortiment, Bestellung und Versandinformationen', 'Wie kann ich meine Bestellung ändern oder zurücksenden?', 'Bestellstatus-Kontakt, Rückgabeprozess, Fristen und Versandhinweise', 'Bestell- und Lagerstatus nur nach Echtzeitabfrage nennen.'],
      ['modegeschaeft', 'Modegeschäfte', 'Kollektionen, Größenberatung und Filialservice', 'Führt ihr dieses Kleidungsstück auch in einer anderen Größe?', 'Marken, Größenhinweise, Filialen und Verfügbarkeit laut aktuellem Sortiment', 'Lagerstände ohne Verbindung zum Warenwirtschaftssystem nicht erfinden.'],
      ['schuhgeschaeft', 'Schuhgeschäfte', 'Schuhe, Größen und Beratung im Geschäft', 'Kann ich ein bestimmtes Modell in meiner Größe reservieren?', 'Marken, Größenberatung, Reservierungsregeln und Filialkontakt', 'Produktbestand nur dann bestätigen, wenn er live verfügbar ist.'],
      ['moebelhandel', 'Möbelhäuser', 'Möbel, Lieferung und Beratung für Wohnräume', 'Welche Maße brauche ich für eine passende Möbelberatung?', 'Produktmaße, Materialinformationen, Liefergebiet und Beratungsablauf', 'Liefertermine und Produktbestand aktuell verifizieren lassen.'],
      ['elektronikhandel', 'Elektronikfachhandel', 'Elektronikprodukte, Zubehör und Service', 'Ist das Zubehör mit meinem Gerätemodell kompatibel?', 'Dokumentierte Modellnummern, Produktdaten und Servicebedingungen', 'Kompatibilität nicht raten; bei fehlenden Angaben an Fachpersonal verweisen.'],
      ['sportgeschaeft', 'Sportgeschäfte', 'Sportausrüstung, Bekleidung und Serviceangebote', 'Welche Ausrüstung passt zu meinem Einsteigerkurs?', 'Sportarten, Größenangaben, Ausrüstungsservice und Kontaktmöglichkeiten', 'Keine individuelle Sicherheitsberatung für Sportausrüstung ersetzen.'],
      ['buchhandlung', 'Buchhandlungen', 'Bücher, Veranstaltungen und Bestellservice', 'Kann ich ein Buch bestellen, das ihr gerade nicht lagernd habt?', 'Bestellmöglichkeiten, Lieferhinweise, Veranstaltungen und Öffnungszeiten', 'Lieferbarkeit ohne Verlags- oder Lagerabfrage nicht bestätigen.'],
      ['spielwarenladen', 'Spielwarenläden', 'Spielwaren, Altersangaben und Sortiment', 'Welche Spiele sind für Kinder ab sechs Jahren geeignet?', 'Altersangaben der Hersteller, Sortiment und Beratungsmöglichkeiten', 'Sicherheitshinweise stets aus den Herstellerangaben übernehmen.'],
      ['fahrradhandel', 'Fahrradhändler', 'Fahrräder, Zubehör und Werkstattservice', 'Welche Fahrradtypen kann ich bei euch probefahren?', 'Fahrradtypen, Probefahrtregeln, Größenberatung und Werkstattangebote', 'Probefahrt und Modellverfügbarkeit nicht ohne Terminbestätigung zusagen.'],
      ['autohaus', 'Autohäuser', 'Fahrzeugangebote, Beratung und Werkstattkontakte', 'Welche Unterlagen brauche ich für eine Probefahrt?', 'Probefahrtbedingungen, Fahrzeugdaten, Öffnungszeiten und Ansprechpersonen', 'Angebotspreise und Verfügbarkeit anhand aktueller Inserate prüfen.'],
      ['baustoffhandel', 'Baustoffhandlungen', 'Baumaterial, Abholung und Lieferinformationen', 'Liefert ihr Baustoffe auf die Baustelle und welche Daten braucht ihr?', 'Sortiment, Liefergebiet, Zufahrt, Mengenangaben und Anfrageweg', 'Preise und Bestand nur mit aktuellem Warenwirtschaftsstand nennen.'],
      ['lebensmittelgeschaeft', 'Lebensmittelgeschäfte', 'Sortiment, Öffnungszeiten und Services vor Ort', 'Welche regionalen oder besonderen Produkte führt ihr?', 'Sortimentsbereiche, Filialen, Öffnungszeiten und dokumentierte Serviceangebote', 'Tagesbestand, Allergene und Aktionspreise aktuell verifizieren.'],
      ['parfuemerie', 'Parfümerien', 'Duft, Pflegeprodukte und Beratung im Geschäft', 'Kann ich einen Duft vor dem Kauf testen?', 'Sortiment, Testmöglichkeiten, Standorte und Kundenservice', 'Bestand und individuelle Verträglichkeit nicht ungeprüft zusagen.'],
      ['juwelier', 'Juweliere', 'Schmuck, Uhren und Serviceleistungen', 'Bietet ihr Reparaturen oder Gravuren für Schmuckstücke an?', 'Serviceumfang, Marken, Bearbeitungsablauf und benötigte Informationen', 'Wert, Echtheit oder Reparaturfähigkeit nicht ohne Prüfung bewerten.'],
      ['tierbedarf', 'Tierbedarfsgeschäfte', 'Futter, Zubehör und Beratung zum Sortiment', 'Welche Größen und Varianten eines Produkts führt ihr?', 'Marken, Größen, Produktinformationen und Filialkontakt', 'Keine tiermedizinische Futter- oder Behandlungsberatung geben.'],
      ['gartencenter', 'Gartencenter', 'Pflanzen, Gartenzubehör und saisonale Angebote', 'Welche Pflanzen eignen sich für einen schattigen Balkon?', 'Pflanzinformationen, Saisonhinweise, Standortbedingungen und Beratungskontakt', 'Pflanzenbestand und saisonale Verfügbarkeit nicht voraussetzen.'],
      ['sprachschule', 'Sprachschulen', 'Sprachkurse, Einstufung und Anmeldung', 'Welcher Sprachkurs passt zu meinem aktuellen Niveau?', 'Niveaustufen, Einstufung, Kurszeiten und Anmeldung', 'Sprachniveau nicht allein aus einer Chatnachricht zertifizieren.'],
      ['musikschule', 'Musikschulen', 'Instrumentalunterricht, Ensembles und Einschreibung', 'Kann ich ein Instrument zuerst ausprobieren?', 'Instrumente, Altersgruppen, Schnupperstunden und Einschreibungszeitraum', 'Freie Unterrichtsplätze nur mit aktueller Auskunft bestätigen.'],
      ['nachhilfeinstitut', 'Nachhilfeinstitute', 'Lernangebote, Fächer und Betreuungsmodelle', 'Für welche Fächer und Schulstufen gibt es Nachhilfe?', 'Fächer, Schulstufen, Formate, Preise und Anmeldung', 'Lernerfolge nicht garantieren oder Schülerinnen bewerten.'],
      ['fahrschule', 'Fahrschulen', 'Führerscheinkurse, Fahrstunden und Prüfungsvorbereitung', 'Welche Unterlagen brauche ich für die Anmeldung zum Führerschein?', 'Kursklassen, Voraussetzungen, Unterlagen, Kostenhinweise und Starttermine', 'Gesetzliche Anforderungen und Prüfungstermine aktuell verifizieren.'],
    ],
  },
];

export const industries: Industry[] = industryGroups.flatMap(({ category, items }) =>
  items.map(([slug, name, intro, offer, example, pageHint]) => ({ slug, name, category, intro, offer, example, pageHint })),
);

export const journeys: Journey[] = [
  { slug: 'orientierung', name: 'zur ersten Orientierung', context: 'wenn sich jemand erstmals informiert', guidance: 'Eine kurze Erklärung, für wen das Angebot gedacht ist und wo die Person die vollständigen Details findet.' },
  { slug: 'vergleich', name: 'beim Vergleichen', context: 'wenn mehrere Angebote verglichen werden', guidance: 'Vergleichbare Kriterien und klare Leistungsgrenzen helfen mehr als pauschale Qualitätsversprechen.' },
  { slug: 'auswahl', name: 'bei der Auswahl', context: 'wenn eine passende Leistung oder ein passendes Produkt gesucht wird', guidance: 'Auswahlkriterien und Unterschiede sollten auf der Website nachvollziehbar beschrieben sein.' },
  { slug: 'anfrage', name: 'vor einer Anfrage', context: 'bevor eine Anfrage abgeschickt wird', guidance: 'Die Antwort sollte klären, welche Angaben für die nächste persönliche Rückmeldung hilfreich sind.' },
  { slug: 'termin', name: 'vor einem Termin', context: 'bei der Planung eines Termins', guidance: 'Ablauf und Vorbereitungen gehören an eine gut auffindbare Stelle auf der Website.' },
  { slug: 'buchung', name: 'bei einer Buchung', context: 'während ein Besuch oder eine Leistung geplant wird', guidance: 'Buchungsregeln müssen mit dem tatsächlichen Buchungsweg übereinstimmen.' },
  { slug: 'vorbereitung', name: 'bei der Vorbereitung', context: 'wenn ein Besuch oder Auftrag vorbereitet wird', guidance: 'Eine kurze Checkliste kann Rückfragen vermeiden, sofern sie aktuell gehalten wird.' },
  { slug: 'ausserhalb-oeffnungszeiten', name: 'außerhalb der Öffnungszeiten', context: 'wenn gerade niemand persönlich erreichbar ist', guidance: 'Erreichbarkeit, Rückrufweg und realistische Antwortzeiten sollten klar ausgewiesen sein.' },
  { slug: 'bestehende-kundschaft', name: 'als bestehende Kundschaft', context: 'wenn eine bestehende Kundin oder ein bestehender Kunde Hilfe sucht', guidance: 'Allgemeine Hilfe gehört in den Chat; persönliche Auftragsdaten brauchen einen geschützten Kontaktweg.' },
  { slug: 'erstbestellung', name: 'vor der ersten Bestellung', context: 'vor einer ersten Bestellung', guidance: 'Produktangaben und Bestellbedingungen müssen zur aktuellen Produktseite passen.' },
  { slug: 'nach-bestellung', name: 'nach einer Bestellung', context: 'nach einer Bestellung oder einem Kauf', guidance: 'Für individuelle Bestellstände braucht es eine aktuelle, sichere Abfrage statt einer allgemeinen Antwort.' },
  { slug: 'nach-der-leistung', name: 'nach der Leistung', context: 'nach Abschluss eines Auftrags oder Besuchs', guidance: 'Nachsorge und weitere Kontaktwege nur nennen, wenn sie tatsächlich angeboten werden.' },
  { slug: 'bei-rueckfragen', name: 'bei einer Rückfrage', context: 'wenn eine Information auf der Website noch unklar ist', guidance: 'Die Antwort sollte die passende Informationsseite nennen oder eine persönliche Klärung anbieten.' },
  { slug: 'bei-aenderungen', name: 'bei einer Änderung', context: 'wenn ein Termin oder Auftrag angepasst werden soll', guidance: 'Änderungsfristen und Zuständigkeiten müssen eindeutig und leicht auffindbar sein.' },
  { slug: 'kurzfristig', name: 'bei kurzfristigem Bedarf', context: 'wenn eine zeitnahe Lösung gesucht wird', guidance: 'Keine sofortige Verfügbarkeit versprechen, solange der Kalender nicht live geprüft wird.' },
  { slug: 'an-standorten', name: 'bei der Standortsuche', context: 'wenn ein passender Standort gesucht wird', guidance: 'Adressen, Einzugsgebiete und Erreichbarkeit sollten je Standort getrennt gepflegt werden.' },
  { slug: 'fuer-unternehmen', name: 'als Unternehmen', context: 'wenn ein Unternehmen eine passende Lösung sucht', guidance: 'Branchen, Projektumfang und verantwortliche Kontaktpersonen konkret benennen.' },
  { slug: 'fuer-familien', name: 'als Familie', context: 'wenn ein Angebot für mehrere Personen geplant wird', guidance: 'Altersgruppen, Begleitpersonen und mögliche Einschränkungen sachlich erklären.' },
  { slug: 'bei-problemen', name: 'bei einem Problem', context: 'wenn etwas nicht wie erwartet funktioniert', guidance: 'Erste allgemeine Schritte dürfen keine Sicherheits- oder Fachprüfung ersetzen.' },
  { slug: 'naechster-schritt', name: 'vor dem nächsten Schritt', context: 'wenn die Person entscheiden möchte, wie es weitergeht', guidance: 'Ein einzelner klarer nächster Schritt ist hilfreicher als mehrere unverbundene Handlungsaufforderungen.' },
];

export const topics: Topic[] = [
  { slug: 'preise-kosten', name: 'Preise und Kosten', focus: 'welche Kosten entstehen und welche Faktoren den Preis beeinflussen', checks: ['Preise oder nachvollziehbare Preisfaktoren', 'mögliche Zusatzkosten', 'welche Angaben ein individuelles Angebot braucht'], question: 'Wie setzen sich die Kosten für {offer} zusammen?' },
  { slug: 'leistungen', name: 'Leistungen und Umfang', focus: 'welche Leistungen angeboten werden und was zum Umfang gehört', checks: ['enthaltene und nicht enthaltene Leistungen', 'Zielgruppe oder Anwendungsbereich', 'passende Detailseite oder Kontaktmöglichkeit'], question: 'Welche Leistungen rund um {offer} bietet ihr an?' },
  { slug: 'verfuegbarkeit', name: 'Verfügbarkeit', focus: 'wann ein Angebot grundsätzlich genutzt werden kann', checks: ['übliche Zeiten oder Saison', 'Weg zur verbindlichen Verfügbarkeitsabfrage', 'aktuelle Einschränkungen'], question: 'Wann kann ich {offer} bei euch in Anspruch nehmen?' },
  { slug: 'voraussetzungen', name: 'Voraussetzungen', focus: 'welche Bedingungen vor einer Buchung oder Anfrage gelten', checks: ['formale oder praktische Voraussetzungen', 'mögliche Ausnahmen', 'Kontaktweg für ungeklärte Einzelfälle'], question: 'Welche Voraussetzungen gelten für {offer}?' },
  { slug: 'ablauf', name: 'Ablauf', focus: 'wie der Weg von der ersten Anfrage bis zum Abschluss aussieht', checks: ['einzelne Schritte in der richtigen Reihenfolge', 'wer wann Kontakt aufnimmt', 'Zeitpunkt einer verbindlichen Bestätigung'], question: 'Wie läuft {offer} vom ersten Kontakt bis zum Abschluss ab?' },
  { slug: 'dauer', name: 'Dauer und Zeitrahmen', focus: 'welche Zeitangaben es gibt und wovon die Dauer abhängt', checks: ['Orientierungswerte mit Bedingungen', 'Faktoren, die den Zeitrahmen verändern', 'wann eine genaue Einschätzung möglich ist'], question: 'Wie lange dauert {offer} üblicherweise?' },
  { slug: 'standort-anfahrt', name: 'Standort und Anfahrt', focus: 'wo ein Angebot verfügbar ist und wie der Ort erreicht wird', checks: ['vollständige Adresse oder Einsatzgebiet', 'Anfahrt und Erreichbarkeit', 'standortbezogene Unterschiede'], question: 'Wo kann ich {offer} nutzen oder anfragen?' },
  { slug: 'unterlagen', name: 'Unterlagen und Angaben', focus: 'welche Informationen für eine Anfrage vorbereitet werden sollten', checks: ['benötigte Angaben oder Dokumente', 'sicherer Weg zur Übermittlung', 'was zunächst nicht benötigt wird'], question: 'Welche Unterlagen brauche ich für {offer}?' },
  { slug: 'termine', name: 'Termine', focus: 'wie Termine vereinbart und bestätigt werden', checks: ['Buchungsweg und Kontakt', 'Bestätigung und Öffnungszeiten', 'Regeln für persönliche Terminwünsche'], question: 'Wie vereinbare ich einen Termin für {offer}?' },
  { slug: 'vorbereitung', name: 'Vorbereitung', focus: 'was vor dem Besuch oder der Nutzung vorbereitet werden kann', checks: ['konkrete Vorbereitungsschritte', 'benötigte Ausstattung oder Informationen', 'Hinweise, die nur für bestimmte Fälle gelten'], question: 'Wie kann ich mich auf {offer} vorbereiten?' },
  { slug: 'zahlung-abrechnung', name: 'Zahlung und Abrechnung', focus: 'welche Zahlungs- und Abrechnungswege beschrieben sind', checks: ['akzeptierte Zahlungswege', 'Zeitpunkt der Abrechnung', 'Rechnung oder Beleg'], question: 'Wie wird {offer} verrechnet und bezahlt?' },
  { slug: 'aenderung-storno', name: 'Änderung und Storno', focus: 'wie bestehende Reservierungen oder Aufträge geändert werden', checks: ['Fristen und Bedingungen', 'vorgesehener Kontaktweg', 'mögliche Gebühren laut veröffentlichter Regelung'], question: 'Wie kann ich {offer} ändern oder stornieren?' },
  { slug: 'lieferung-abholung', name: 'Lieferung und Abholung', focus: 'ob Lieferung oder Abholung möglich ist und welche Regeln gelten', checks: ['Liefergebiet oder Abholort', 'Zeitfenster und Voraussetzungen', 'Kosten und Einschränkungen'], question: 'Kann ich {offer} liefern lassen oder abholen?' },
  { slug: 'hilfe-support', name: 'Hilfe und Support', focus: 'wie bei allgemeinen Fragen oder Problemen Hilfe gefunden wird', checks: ['erste dokumentierte Hilfeschritte', 'erreichbarer Supportkanal', 'Informationen, die eine Anfrage beschleunigen'], question: 'An wen kann ich mich wenden, wenn es bei {offer} ein Problem gibt?' },
  { slug: 'garantie-gewährleistung', name: 'Garantie und Gewährleistung', focus: 'welche veröffentlichten Bedingungen für Reklamation oder Garantie gelten', checks: ['Geltungsdauer und Voraussetzungen', 'benötigte Kauf- oder Auftragsdaten', 'zuständiger Kontaktweg'], question: 'Welche Garantie- oder Gewährleistungsbedingungen gelten für {offer}?' },
  { slug: 'pflege-wartung', name: 'Pflege und Wartung', focus: 'welche allgemeine Pflege oder Wartung dokumentiert ist', checks: ['freigegebene Pflegehinweise', 'empfohlene Intervalle mit Quelle', 'Grenze zwischen Selbsthilfe und Fachservice'], question: 'Wie sollte {offer} gepflegt oder gewartet werden?' },
  { slug: 'sicherheit-datenschutz', name: 'Sicherheit und Datenschutz', focus: 'welche Sicherheits- oder Datenschutzinformationen öffentlich erklärt werden', checks: ['relevante Sicherheitsregeln', 'Datenschutzhinweise und Verantwortlichkeit', 'Kontaktstelle für sensible Anliegen'], question: 'Wie geht ihr bei {offer} mit Sicherheit und Datenschutz um?' },
  { slug: 'barrierefreiheit', name: 'Barrierefreiheit und Zugang', focus: 'welche Zugangsinformationen Menschen bei der Planung helfen', checks: ['Stufen, Aufzug oder barrierefreie Wege', 'verfügbare Unterstützung', 'Kontakt zur Klärung individueller Anforderungen'], question: 'Ist {offer} barrierefrei zugänglich?' },
  { slug: 'kontakt-zustaendigkeit', name: 'Kontakt und Zuständigkeit', focus: 'wer für ein Anliegen zuständig ist und wie diese Person erreicht wird', checks: ['passende Abteilung oder Kontaktperson', 'Erreichbarkeit und Öffnungszeiten', 'sicherer Weg für persönliche Daten'], question: 'Wer ist für Fragen zu {offer} zuständig?' },
  { slug: 'naechste-schritte', name: 'Nächste Schritte', focus: 'welcher konkrete Schritt nach dem Lesen der Information folgt', checks: ['eine passende Handlungsoption', 'was vor der Kontaktaufnahme bereitliegen sollte', 'wie eine verbindliche Bestätigung erfolgt'], question: 'Was ist der nächste Schritt, wenn ich {offer} nutzen möchte?' },
];

export const LANDING_PAGES_PER_INDUSTRY = journeys.length * topics.length;
export const LANDING_PAGE_COUNT = industries.length * LANDING_PAGES_PER_INDUSTRY;

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

export function getIndustryLandingPaths(industry: Industry) {
  return journeys.flatMap((journey) =>
    topics.map((topic) => ({
      href: `/branchen/${industry.slug}/${journey.slug}--${topic.slug}/`,
      journey,
      topic,
    })),
  );
}

export function getLandingPage(industrySlug: string, scenarioSlug: string) {
  const industry = getIndustry(industrySlug);
  if (!industry) return undefined;

  const [journeySlug, topicSlug] = scenarioSlug.split('--');
  const journey = journeys.find((item) => item.slug === journeySlug);
  const topic = topics.find((item) => item.slug === topicSlug);
  if (!journey || !topic) return undefined;

  const offer = industry.offer;
  const related = [
    ...topics.filter((item) => item.slug !== topic.slug).slice(0, 4).map((item) => ({
      href: `/branchen/${industry.slug}/${journey.slug}--${item.slug}/`, journey, topic: item,
    })),
    ...journeys.filter((item) => item.slug !== journey.slug).slice(0, 4).map((item) => ({
      href: `/branchen/${industry.slug}/${item.slug}--${topic.slug}/`, journey: item, topic,
    })),
  ];

  return {
    industry,
    journey,
    topic,
    href: `/branchen/${industry.slug}/${journey.slug}--${topic.slug}/`,
    title: `PipeBot für ${industry.name}: ${topic.name} ${journey.name}`,
    description: `Praxisbeispiele für einen Website-Chatbot in ${industry.name}: Fragen zu ${topic.name.toLowerCase()} ${journey.context} klar mit Website-Inhalten beantworten.`,
    question: topic.question.replaceAll('{offer}', offer),
    related,
  };
}

export function getAllLandingPaths() {
  return industries.flatMap((industry) => getIndustryLandingPaths(industry).map((item) => item.href));
}
