# Änderungswünsche Website elenajudith.tuni.site

**Auftraggeberin:** Elena Judith
**Stand:** 28.10.2026 – Startseite, Header, Menü und Footer umgesetzt (Branch `elena-aenderungen`); weitere Seiten folgen
**Website:** https://elenajudith.tuni.site (DE + EN)

---

## So ist dieses Dokument aufgebaut

- Jede Änderung hat eine Nummer (z. B. `A-01`), damit wir uns in Rückfragen darauf beziehen können.
- **Priorität:** `Hoch` = vor dem nächsten Livegang, `Mittel` = bald, `Niedrig` = wenn Zeit ist.
- **Status:** `Offen` · `In Arbeit` · `Erledigt` · `Rückfrage`
- Alle Textänderungen gelten für **beide Sprachversionen (DE und EN)**, sofern nicht anders angegeben. Fehlt eine englische Übersetzung, ist das vermerkt.
- Fotos liegen im Google-Drive-Ordner **„Website“**: https://drive.google.com/drive/folders/13TcjBH7K9PHv_8CvNmtejhUaiTgp3DcR (Unterordner je Thema). Dateinamen im Dokument beziehen sich auf diesen Ordner. Elena gibt den Ordner für den Programmierer frei.

---

## Aktuelle Seitenstruktur (zur Orientierung)

| Seite | URL |
|---|---|
| Startseite | `/` |
| Über Elena | `/about/` |
| 1:1 Begleitung (Astrologie & Human Design) | `/11-sessions/` |
| Yoga Nidra | `/yoga-nidra/` |
| Kambo | `/kambo/` |
| Fotografie | `/photography/` |
| Retreats & Kurse | `/services/` (Unterseiten: `/wise-in-her-ways-1/`, `/inner-child/`, `/song-of-the-soul/`) |
| Kunst & Musik | `/my-art/`, `/music/` |
| Kontakt | `/contact/` |
| Impressum | `/impressum/` |

---

## 1. Rechtliches (bitte zuerst)

### A-01 · Datenschutzerklärung anlegen
- **Priorität:** Hoch · **Status:** Offen
- **Ist:** Es gibt keine Datenschutzseite und keinen Link dazu im Footer. Die Website nutzt aber ein Kontaktformular, einen SoundCloud-Player und Links zu Instagram/YouTube.
- **Soll:** Eigene Seite `/datenschutz/` (DE) und `/en/privacy/` (EN), verlinkt im Footer neben „Impressum“. Hinweis beim Kontaktformular („Mit dem Absenden stimmst du der Verarbeitung deiner Daten gemäß Datenschutzerklärung zu“ + Link).
- **Text:** liefert Elena (z. B. über einen Datenschutz-Generator) – `[offen]`

### A-02 · Impressum prüfen
- **Priorität:** Hoch · **Status:** Rückfrage
- **Ist:** Das Impressum ist sehr kurz.
- **Soll:** Vollständige Angaben nach § 5 DDG (Name, ladungsfähige Anschrift, E-Mail, ggf. Telefon, ggf. USt-IdNr.). Inhalt liefert Elena – `[offen]`

---

## 2. Startseite

### B-01 · Spruch in der Kopfzeile: Punkt ergänzen
- **Priorität:** Niedrig · **Status:** Erledigt (28.10.2026, Branch `elena-aenderungen`)
- **Wo:** Kopfzeile unter dem Menü – **auf jeder einzelnen Seite** (DE und EN, inkl. aller Unterseiten wie Retreat-Seiten, Impressum, Datenschutz). Bitte prüfen, dass er wirklich überall erscheint.
- **Ist:** „Alles ist Liebe oder der Schrei nach ihr“
- **Soll:** „Alles ist Liebe oder der Schrei nach ihr.“
- **EN:** „All is love or the cry for love.“

### B-02 · Begrüßung: Untertitel mit Berufsbezeichnungen ergänzen
- **Priorität:** Hoch · **Status:** Erledigt (28.10.2026, Branch `elena-aenderungen`)
- **Wo:** Startseite, erster Abschnitt (großes Foto im rostroten Kleid)
- **Ist:** Überschrift „Hallo du ! Ich bin Elena Judith“, darunter direkt die Buttons
- **Soll:**
  - Überschrift: „Hallo du! Ich bin Elena Judith“ (Leerzeichen vor dem Ausrufezeichen entfernen)
  - Neu direkt darunter, kleiner als die Überschrift: **„Anthropologin, Therapeutin, multidisziplinäre Künstlerin, Journalistin und Wegbegleiterin“**
  - Neu darunter, als kurzer Fließtext: **„In meiner Arbeit verbinde ich klassische Therapie mit spirituellen Ansätzen und helfe Menschen dabei, sich zu erinnern, wer sie immer schon gewesen sind.“**
  - Buttons: siehe B-03
  - Foto im rostroten Kleid bleibt unverändert
- **EN:** „Anthropologist, therapist, multidisciplinary artist, journalist and psychospiritual mentor“
- **EN Fließtext (Vorschlag, bitte von Elena bestätigen):** „In my work, I combine classical therapy with spiritual approaches and help people remember who they have always been.“
- **Hinweis:** Auf dem Handy prüfen, dass der Untertitel sauber umbricht und nicht zu viel Platz über dem Foto einnimmt.

### B-03 · Begrüßung: Buttons umbenennen
- **Priorität:** Hoch · **Status:** Erledigt (28.10.2026, Branch `elena-aenderungen`)
- **Wo:** Startseite, erster Abschnitt, die zwei Buttons unter dem Text
- **Ist:** „Entdecke meine Welt“ (springt zum Abschnitt „Was dich zu mir führt“) und „Über Elena“ (führt zu `/about/`)
- **Soll:** zwei Buttons in dieser Reihenfolge:
  1. **„Über mich“** → Link auf die Seite `/about/` (dort steht der ganze Text)
  2. **„Meine Arbeit“** → springt weiter unten auf der Startseite zum Abschnitt „Was dich zu mir führt“ (`#wege`), wo 1:1 Begleitung, Retreats & Kurse und Kunst & Musik zusammengefasst sind
- **Gestaltung:** Beide Buttons gleich stark hervorheben, als gefüllte Buttons in zwei unterschiedlichen Grüntönen (z. B. das bisherige Dunkelgrün für „Über mich“ und ein helleres, zur Website passendes Grün für „Meine Arbeit“). Schrift auf beiden gut lesbar (Kontrast prüfen).
- **EN:** „About me“ → `/en/about/` · „My work“ → `#wege` auf der englischen Startseite

### B-04 · Bereich „Kunst & Musik“ in „Kunst“ umbenennen
- **Priorität:** Mittel · **Status:** Erledigt (28.10.2026, Branch `elena-aenderungen`)
- **Wo:**
  1. Startseite, Abschnitt „Was dich zu mir führt“, dritte Kachel (aktuell Bezeichnung „KUNST & MUSIK“)
  2. Hauptmenü auf allen Seiten (aktuell Menüpunkt „Kunst & Musik“ mit Untermenü „Musik“ und „Kleidung & Etsy“)
- **Soll:**
  - Kachel-Bezeichnung: **„KUNST“** (Überschrift „Was in mir klingt.“ und Button bleiben)
  - Menüpunkt: **„Kunst“**, Untermenü mit **„Kleidung“** und **„Musik“** (in dieser Reihenfolge)
  - Links: „Kunst“ → `/my-art/` (bleibt), „Musik“ → `/music/` (bleibt), **„Kleidung“ → direkt zum Etsy-Shop „aestheticmattersshop“**: `https://www.etsy.com/shop/aestheticmattersshop` (Link bitte einmal prüfen; öffnet sich in neuem Tab)
- **EN:** „Art“ mit Untermenü „Clothing“ und „Music“ (gleiche Links)

### B-05 · Abschnitt „Namaste and Shalom,“ entfernen
- **Priorität:** Mittel · **Status:** Erledigt (28.10.2026, Branch `elena-aenderungen`)
- **Wo:** Startseite, Abschnitt direkt nach der kurzen Vorstellung („Geboren bin ich in Freiburg …“)
- **Soll:** Den kompletten Abschnitt mit der Überschrift „Namaste and Shalom,“ und dem Link „Mehr über mich“ ersatzlos löschen. Die Vorstellung davor bleibt.
- **EN:** entsprechenden Abschnitt ebenfalls entfernen

### B-06 · Kurze Vorstellung: Link-Text ändern
- **Priorität:** Mittel · **Status:** Erledigt (28.10.2026, Branch `elena-aenderungen`)
- **Wo:** Startseite, Abschnitt mit Porträt am Baumstamm und Text „Geboren bin ich in Freiburg …“
- **Ist:** Link „Meine Geschichte kennenlernen“
- **Soll:** **„Mehr über mich und meinen Weg“** → Link auf `/about/`. Text und Foto bleiben unverändert.
- **EN:** „More about me and my path“ → `/en/about/`

### B-07 · Über den drei Kacheln: nur noch „MEINE ARBEIT“
- **Priorität:** Mittel · **Status:** Erledigt (28.10.2026, Branch `elena-aenderungen`)
- **Wo:** Startseite, Abschnitt mit den drei Kacheln (Sprungziel `#wege` des Buttons „Meine Arbeit“ aus B-03)
- **Ist:** Kleine Abschnittsbezeichnung „WAS DICH ZU MIR FÜHRT“ und Überschrift „Es gibt nicht nur einen Weg.“
- **Soll:**
  - Kleine Abschnittsbezeichnung ändern in **„MEINE ARBEIT“** (dezent, gleicher Stil wie bisher, passend zum Button in der Begrüßung)
  - Überschrift „Es gibt nicht nur einen Weg.“ ersatzlos löschen
  - Sonst kein Text über den Kacheln. Das Sprungziel `#wege` muss erhalten bleiben.
- **EN:** „MY WORK“, Überschrift ebenfalls löschen

### B-08 · Kachel-Überschriften größer und auffälliger
- **Priorität:** Mittel · **Status:** Erledigt (28.10.2026, Branch `elena-aenderungen`)
- **Wo:** Startseite, die drei Kacheln (ehemals Abschnitt „Was dich zu mir führt“)
- **Ist:** Die Kategorienamen („1:1 BEGLEITUNG“, „RETREATS & KURSE“, „KUNST“) stehen sehr klein über den Sätzen „Ein Raum für dich.“, „Gemeinsame Erfahrungen.“, „Was in mir klingt.“
- **Soll:** Die Kategorienamen werden die eigentlichen Überschriften der Kacheln: deutlich größer, gut sichtbar, sie sollen als Erstes ins Auge fallen. Darunter, kleiner, neue Unterzeilen:
  - 1:1 Begleitung → „Ein Raum für dich.“ (bleibt)
  - Retreats & Kurse → „Ein Raum für uns.“ (neu)
  - Kunst → „Ein Raum für Ausdruck.“ (neu)
- **Buttons in den Kacheln einheitlich benennen:** alle drei heißen nur noch **„Entdecken“**
  - 1:1 Begleitung: „Begleitung entdecken“ → „Entdecken“ (→ `/11-sessions/`)
  - Retreats & Kurse: „Die Formate kennenlernen“ → „Entdecken“ (→ `/services/`)
  - Kunst: „Kreativität entdecken“ → „Entdecken“ (→ `/my-art/`)
  - EN: jeweils „Explore“
  - Barrierefreiheit: für Screenreader eindeutige Beschriftung hinterlegen (z. B. aria-label „1:1 Begleitung entdecken“), da drei gleichlautende Links

### B-09 · Retreat-Abschnitt: Überschrift ändern
- **Priorität:** Mittel · **Status:** Erledigt (28.10.2026, Branch `elena-aenderungen`)
- **Wo:** Startseite, Abschnitt mit den Retreat-Karten (Wise In Her Ways, Inner Child, Song of the Soul)
- **Ist:** „Erfahrungen, die bleiben.“
- **Soll:** **„Erfahrungen, die nachwirken.“** (Gestaltung wie bisher, „nachwirken.“ hervorgehoben wie zuvor „bleiben.“)
- Fotos und Retreats bleiben unverändert.
- Buttons unter den drei Retreat-Karten: „Das Format entdecken“ → **„Entdecken“** (EN: „Explore“), mit eindeutigem aria-label je Retreat (z. B. „Song of the Soul entdecken“)
- Link „Alle Retreats & Kurse“ (→ `/services/`) bleibt.
- Satz unter den Karten „Einblicke in bisherige Veranstaltungen und die Themen, die uns verbinden.“ **ersatzlos löschen** (EN ebenso).

### B-10 · Großes Gruppenfoto entfernen
- **Priorität:** Mittel · **Status:** Erledigt (28.10.2026, Branch `elena-aenderungen`)
- **Wo:** Startseite, Abschnitt direkt nach den Retreat-Karten
- **Ist:** Großes Foto „Eine Gruppe zwischen Felsen und weitem Himmel“ mit „EINBLICKE AUS VERGANGENEN RETREATS“ und „Zeit, die wir miteinander teilen.“
- **Soll:** Kompletten Abschnitt ersatzlos löschen. Nach den Retreat-Karten folgen direkt die Teilnehmerstimmen.
- **EN:** ebenso

### B-11 · Teilnehmerstimmen: neue Überschrift, mehr Stimmen, automatisch laufendes Karussell
- **Priorität:** Hoch · **Status:** Erledigt (28.10.2026, Branch `elena-aenderungen`)
- **Wo:** Startseite, Abschnitt mit den Teilnehmerstimmen (aktuell Jasmin, Melanie, Mareike, Jonas)
- **Überschrift:**
  - Kleine Zeile „TEILNEHMERSTIMMEN“ löschen
  - Überschrift „Erfahrungen.“ → **„Stimmen meiner TeilnehmerInnen.“**
  - EN: „Voices of my participants.“
- **Inhalt:** Neue, längere Liste von Teilnehmerstimmen – siehe Abschnitt „Teilnehmerstimmen (Texte)“ weiter unten. Die bisherigen vier bleiben, sofern nicht anders angegeben.
- **Verhalten des Karussells:**
  - Läuft **automatisch** durch (ohne dass man auf „Start“ klicken muss), in ruhigem Tempo, damit man jeden Text lesen kann
  - **Bleibt stehen, solange der Mauszeiger darauf ist**, und läuft weiter, wenn er weg ist
  - Auf Handy/Tablet: bleibt stehen, solange man es berührt; Wischen zum Blättern möglich
  - Pfeile zum manuellen Vor- und Zurückblättern bleiben
  - Zähler bleibt sichtbar (z. B. „03 / 12“), damit man sofort sieht, wie viele Stimmen es gibt
  - **Lange Texte:** Im Karussell werden pro Stimme nur die ersten ca. 50–60 Wörter angezeigt, danach „… Weiterlesen“. Ein Klick klappt den ganzen Text in der Karte auf (oder öffnet ihn in einem Overlay); solange ein Text geöffnet ist, hält das Karussell an. Alle Karten gleich hoch, damit die Seite beim Wechsel nicht springt.
  - **Sprache:** Stimmen in Originalsprache anzeigen (deutsche und englische Texte auf beiden Sprachversionen), sofern Elena nichts anderes entscheidet.
  - Barrierefreiheit: auch beim Ansteuern per Tastatur anhalten; bei der Systemeinstellung „Bewegung reduzieren“ nicht automatisch laufen
- **Fotos:** Neben jedem Text ein rundes bzw. einheitlich zugeschnittenes Foto der Person. Bei allen Stimmen Platz dafür vorsehen. Fehlende Fotos reicht Elena nach; bis dahin dezenter Platzhalter (z. B. Initiale auf farbigem Hintergrund), kein leeres Feld. Vorhandene Fotos (z. B. Jasmin) bleiben.

### B-12 · Musik-Abschnitt: Bildunterschrift weg, SoundCloud-Player vereinfachen
- **Priorität:** Mittel · **Status:** Erledigt (28.10.2026, Branch `elena-aenderungen`)
- **Wo:** Startseite, Abschnitt „Manches möchte gesungen werden.“
- **Foto** (Elena mit Gitarre neben dem Cellisten) bleibt.
- **Bildunterschrift** „Stimme, Saiten und ein gemeinsamer Moment.“ ersatzlos löschen.
- **SoundCloud-Bereich – Ist:** Zwei Elemente untereinander: (1) Zeile „Cambia“ mit Play-Kreis und Pfeil, die SoundCloud extern öffnet, (2) Kasten „SoundCloud-Player hier laden“ mit zweitem Play-Symbol und Erklärtext. Wirkt doppelt und verwirrend.
- **Soll:**
  - Nur noch **ein Element**: „Cambia“ mit einem Play-Knopf, im Stil der Website
  - Klick darauf lädt den SoundCloud-Player **an genau dieser Stelle** (ersetzt das Element) und startet den Song – Zwei-Klick-Lösung für den Datenschutz bleibt also erhalten, SoundCloud wird erst nach dem Klick geladen
  - Darunter nur eine dezente kleine Zeile: „Mit dem Klick wird SoundCloud geladen.“ (EN: „Clicking loads SoundCloud.“)
  - Pfeil/Link nach SoundCloud in diesem Element entfernen
  - Überschrift „Manches möchte gesungen werden.“ und Button „Meine Musik entdecken“ bleiben
- **Text – Ist:** „Meine Stimme ist ein Teil meiner Geschichte. In Liedern, auf der Bühne und in Momenten, die wir miteinander teilen.“
- **Text – Soll:** „**Meine Mutter sagt, ich habe gesungen, bevor ich gesprochen habe.** Meine Stimme ist ein Teil meiner Geschichte. In Liedern, auf der Bühne und in Momenten, die wir miteinander teilen.“
- **EN (Vorschlag, bitte von Elena bestätigen):** „My mother says I sang before I spoke.“ + bisheriger englischer Text

### B-13 · Social-Media-Icons oben auf jeder Seite
- **Priorität:** Mittel · **Status:** Erledigt (28.10.2026, Branch `elena-aenderungen`)
- **Wo:** Kopfzeile, zweite Zeile mit dem Spruch „Alles ist Liebe oder der Schrei nach ihr.“ – rechts, dort wo aktuell das ✳-Symbol steht (Hauptmenüzeile ist schon voll)
- **Soll:** Drei gut erkennbare Icons nebeneinander: **Instagram** (https://www.instagram.com/aestheticmatters/), **SoundCloud** (https://soundcloud.com/elena-judith), **YouTube** (https://www.youtube.com/channel/UCFYaXrnHty3oEImfCGH6WUw). Öffnen in neuem Tab, Farbe passend zur Website, Hover-Effekt, aria-labels („Instagram“ usw.).
- **Mobil:** Icons zusätzlich gut sichtbar im aufgeklappten Menü
- **EN:** ebenso

### B-14 · Social-Media-Abschnitt neu: „Folge mir auf meinen Kanälen.“
- **Priorität:** Mittel · **Status:** Teilweise erledigt (28.10.2026) – Icons und Überschrift umgesetzt; Instagram-Live-Feed noch offen (Tool-Auswahl)
- **Wo:** Startseite, Abschnitt „Ein bisschen näher.“ (vor dem Abschluss „being yourself is a revolutionary act.“)
- **Ist:** Kleine Zeile „ZWISCHEN UNS“, Überschrift „Ein bisschen näher.“, Satz „Bilder, Gedanken und Musik. Auch zwischen unseren Begegnungen.“, drei Text-Links
- **Soll:**
  - Kleine Zeile und Satz löschen
  - Überschrift: **„Folge mir auf meinen Kanälen.“** (EN: „Follow me on my channels.“)
  - Darunter **große, gut sichtbare Icons** für Instagram, SoundCloud, YouTube (gleiche Links wie B-13)
  - **Instagram-Vorschau (Live-Feed)** von @aestheticmatters unter den Icons:
    - Zeigt automatisch die neuesten Beiträge (z. B. 6 Bilder als Raster, auf dem Handy 2 × 3 oder wischbar), jedes Bild verlinkt auf den Beitrag bei Instagram
    - Darunter Button „Auf Instagram folgen“ (EN: „Follow on Instagram“)
    - Umsetzung über ein Feed-Tool bzw. die offizielle Instagram-Schnittstelle; Programmierer schlägt eine datenschutzfreundliche Lösung vor und nennt ggf. laufende Kosten, bevor er sie einrichtet
    - **Datenschutz:** Bilder erst nach Klick laden (wie beim SoundCloud-Player, B-12), vorher ein ruhiger Platzhalter mit „Instagram-Beiträge anzeigen“; in der Datenschutzerklärung (A-01) aufnehmen
    - Elena muss ggf. ihr Instagram-Konto einmalig mit dem Tool verbinden (Business- bzw. Creator-Konto)

### B-15 · Abschluss-Sätze als fester Teil des Footers, ohne Button
- **Priorität:** Mittel · **Status:** Erledigt (28.10.2026, Branch `elena-aenderungen`)
- **Wo:** Alle Seiten (DE und EN). Aktuell steht der Abschluss als eigener Abschnitt über dem Footer, mit Button „Ready for a revolution?“, der zum Kontaktformular führt.
- **Soll:**
  - Den bisherigen Abschluss-Abschnitt entfernen und die beiden Sätze **in den Footer integrieren**, sodass sie auf jeder Seite einheitlich ganz unten stehen:
    - „In a world that constantly tells you that you are too much or not enough – **being yourself is a revolutionary act.**“
    - „Ready for a revolution?“
  - Texte bleiben unverändert (auch auf der deutschen Seite auf Englisch)
  - **„Ready for a revolution?“ ist reiner Text**: kein Button, kein Link, führt nirgendwohin
  - Gestaltung: ruhig, gut lesbar, als oberer Teil des Footers über Social-Icons, Impressum/Datenschutz und Copyright

### B-16 · Menü: „Über Elena“ → „Über mich“
- **Priorität:** Mittel · **Status:** Erledigt (28.10.2026, Branch `elena-aenderungen`)
- **Wo:** Hauptmenü auf allen Seiten (Desktop und Handy) sowie überall, wo die Seite noch „Über Elena“ heißt (z. B. kleine Zeile „ÜBER ELENA“ oben auf der Seite `/about/`, Seitentitel im Browser-Tab)
- **Soll:** einheitlich **„Über mich“** (EN: „About me“), passend zum Button auf der Startseite (B-03). URL `/about/` bleibt.
- **EN:** „Experiences that linger.“
- Gleiches Prinzip auf der englischen Seite.


### B-17 · Footer: Einladung und Social-Media-Icons zusammen
- **Priorität:** Mittel · **Status:** Erledigt (28.10.2026, Branch `elena-aenderungen`)
- **Wo:** Footer auf allen Seiten
- **Ist:** „In Verbindung bleiben.“ steht allein in der Mitte, kleine Textlinks Instagram/SoundCloud/YouTube rechts – Zusammenhang unklar
- **Soll:** **„Lass uns in Verbindung bleiben.“** direkt über den runden Icons (Instagram, SoundCloud, YouTube), rechts im Footer; auf dem Handy linksbündig untereinander
- **EN:** „Let’s stay connected.“
- **Außerdem (B-15):** erster Satz „In a world that …“ deutlich größer, in derselben Schrift wie „being yourself is a revolutionary act.“

### B-18 · Startseite: Pfeile und Nummerierung entfernt
- **Priorität:** Niedrig · **Status:** Erledigt (29.10.2026, Branch `elena-aenderungen`)
- Kacheln (1:1 Begleitung, Retreats & Kurse, Kunst): Nummern 01/02/03 und Pfeile ↗ entfernt, auch hinter „Entdecken“
- Retreat-Karten: Nummern 01/02/03, runder Pfeil auf dem Foto und Pfeil hinter „Entdecken“ entfernt
- Auf Elenas Wunsch **auf der ganzen Website keine Pfeile** mehr an Buttons und Links (auch Kontakt-Button, Untermenüs, „Nach oben“); „01 / ANKOMMEN ↓“ in der Begrüßung entfernt. Die Pfeile zum Blättern in Karussells bleiben, weil sie Bedienelemente sind.
---

## 3. Über Elena

### C-01 · Text gliedern: Zwischenüberschriften und hervorgehobene Sätze
- **Priorität:** Mittel · **Status:** Erledigt (28.10.2026, Branch `elena-aenderungen`)
- **Ist:** Ein langer Fließtext ohne Zwischenüberschriften.
- **Soll / umgesetzt:** Text bleibt wortgleich und in Elenas bewusst nicht-klassischem Aufbau. **Keine Zwischenüberschriften** (passen nicht zum Aufbau, Elenas Entscheidung). Stattdessen beginnt ein neuer Gedanke mit einem **größer gesetzten ersten Satz** und einem kleinen Strich darüber, z. B. „Was auch immer ich tue - Singen ist ein Teil davon.“, „Ich glaube tief daran, dass ALLES LIEBE ODER DER SCHREI NACH LIEBE IST.“, „Dass ich andere heilen kann, glaube ich nicht.“, „Ich bin höchst hochsensibel …“, „Schön, dass du da bist!“. „Ich bin…“ (aus dem Originaltext) als Überschrift.
- „In einer Welt, die dir ständig einredet …“ und „Also- ready for a revolution ??“ als großes Zitat; Grammatik geglättet: „…ist es ein Akt der Revolution, du selbst zu sein!“; „Also- ready for a revolution ??“ → „So – are you ready for a revolution?“ (beides von Elena freigegeben).
- **„Meine Arbeit richtet sich an Menschen …“** als hervorgehobener Kasten, **„I feel you!“** darin besonders groß, der Satz „Du bist zu weltlich für den Ashram, aber zu spirituell für den Mainstream?“ fett; Tippfehler „sprituellen“ → „spirituellen“ und Komma „Ashram, aber“ korrigiert.
- **Sternzeichen, Human Design, Enneagramm** („Jungfrau / Schütze / Steinbock“, „Emotionaler Generator 3/5“, „Enneagramm: 4“) als hervorgehobene Elemente.
- Umsetzung: `src/final.mjs` (ABOUT_HEADINGS, ABOUT_LEADS …)

### C-04 · Fotos auf „Über mich“: Einzelfotos und Karussell
- **Priorität:** Hoch · **Status:** Erledigt (28.10.2026, Branch `elena-aenderungen`)
- **Quelle:** Drive-Ordner „about me website“; Auswahl von Elena bestätigt (kann später geändert werden)
- **Foto oben** neben „Hallo du! Ich bin Elena Judith“: Schwarz-Weiß-Porträt mit Apfel (das bisherige Porträt steht schon auf der Startseite)
- **6 Einzelfotos** zwischen den Abschnitten, abwechselnd links/rechts in verschiedenen Formen (Bogen, Rechteck, Oval, Kreis), eines breit (Wüste): Dschungel/Blick nach oben, Singen mit Gitarre, Gebet am Baum, Hände auf dem Herzen, Wüste von oben, Porträt am Olivenbaum
- **Karussell mit 13 Fotos** (Apfel-Porträt ist nach oben gewandert; Indien-Foto ersetzt durch Rahmentrommel auf der Terrasse; neu: mit dem Esel, im mintgrünen Kleid vor dem Steinhaus) in der Mitte der Seite, ohne Überschrift (die Bilder sprechen für sich), läuft langsam von selbst, hält an bei Maus/Berührung/Tastatur, Pause-Knopf, Wischen auf dem Handy; ersetzt die bisherige Galerie unten
- **Bildnachweis:** Auf den Wüstenfotos steht „Carmi & Yarmi“ – als „Foto: Carmi & Yarmi“ genannt. **Rückfrage:** Nutzungsrecht bitte bei den Fotografen bestätigen.
- Fotos ändern: `content/about-photos.json` anpassen, Originale in `assets/originals/`, dann `npm run images:about`

### C-02 · Tippfehler korrigieren
- **Priorität:** Mittel · **Status:** Erledigt (28.10.2026, Branch `elena-aenderungen`)
- „Hallo du !“ → „Hallo du!“ (auch auf der Startseite)
- „durch die begleitung der menschen“ → „durch die Begleitung der Menschen“
- „das Gute jedem Menschen zu sehen“ → „das Gute in jedem Menschen zu sehen“
- Im selben Absatz zusätzlich: „ebene“ → „Ebene“, „glauben“ → „Glauben“, „ripple effekte“ → „Ripple-Effekte“, „zeremoiniellen“ → „zeremoniellen“, „ist- und“ → „ist – und“
- Umsetzung: `content/elena-corrections.json` (wird im Build und in der Prüfung angewendet)
- *(weitere Fundstellen werden ergänzt)*

### C-03 · Vorgemerkter Satz (Platzierung noch offen)
- **Priorität:** Niedrig · **Status:** Rückfrage
- **Text:** „… und begleite Menschen zurück in ihre Kraft, damit sie voller Vertrauen ihren Platz in dieser Welt einnehmen.“
- **Wo:** Über Elena oder 1:1 Begleitung – wird noch entschieden

---

## 4. 1:1 Begleitung / Yoga Nidra / Kambo / Fotografie

### D-01 · Seite „1:1 Begleitung“ neu gestaltet
- **Priorität:** Hoch · **Status:** Erledigt (29.10.2026, Branch `elena-aenderungen`) – Preisangabe wartet auf Elenas Entscheidung (siehe D-02)
- Header und Footer wie auf allen Seiten; der englische Text steht nicht mehr auf der deutschen Seite, sondern auf `/en/11-sessions/`
- **Aufbau:** Einstieg mit Foto (Elena mit Astrologie-Buch) und Knöpfen „Sitzung anfragen“ / „Die Sitzungen“ → die sieben Fragen als ruhiges Band → Astrologie- und Human-Design-Text mit größeren Leitsätzen, Zitaten und hervorgehobenen Listen → Sitzungskarten → Stimmen → Anfrageformular
- **Entfernt:** der Absatz „Allen Menschen, die darüber lachen … unseren emotionalen Körper?“ und der Preis „108 Euro“
- **Fotos:** drei aus dem Ordner (zwei Uhren von Pexels mit Bildnachweis „Shlok Rana / Pexels“ und „Paul / Pexels“, Wiese) plus zwei noch nicht benutzte aus „about me“ (Astrologie-Buch, Nahporträt)
- **Kleine Korrekturen:** „uralte System“, „menschliche DNA“, „…ist es ein revolutionärer Akt, wir selbst zu sein.“
- **Stimmen meiner KlientInnen.** – gleicher Stil wie auf der Startseite: Jonas, Lisa, Kim, Johannes, Mareike (Reading) sowie Heather, Sabrina, Thomas, Pete
- **Anfrageformular** (Name, Sitzung, online/vor Ort, Geburtsdatum/-zeit/-ort, Wunschtermine, Nachricht): bereitet eine E-Mail oder WhatsApp-Nachricht vor; keine Online-Buchung. Ein automatischer Versand braucht später einen Formulardienst (abhängig vom Hosting).
- Texte: `content/sessions.json`, Fotos: `content/sessions-photos.json`

### D-02 · Preis
- **Status:** Erledigt (29.10.2026): „Preis: ab 150 €“ (EN „from €150“); den genauen Preis bespricht Elena persönlich

### D-03 · Feinschliff 1:1 Begleitung
- **Status:** Erledigt (29.10.2026)
- Abschnitt „Was zu dir passt“ (Yoga Nidra, Kambo) entfernt
- Kleine Planeten-Zeichnungen auf den drei Sitzungskarten (eigene Linienzeichnungen)
- Fragen: „Hast du Schwierigkeiten, deine Richtung im Leben zu finden?“ → „Tust du dich schwer, deine Richtung im Leben zu finden?“
- Oben: „Finde heraus …“ kleiner, „WESTLICHER ASTROLOGIE und HUMAN DESIGN“ groß
- „Lesung“ → „Reading“: Das Grundlagen-Reading, Das erweiterte Reading, Das Genschlüssel-Reading

### D-04 · Astrologie-Readings ergänzt
- **Status:** Erledigt (29.10.2026) – Beschreibungen sind Vorschläge, Elena prüft sie
- Bisher war nur Human Design buchbar. Die Sitzungen sind jetzt in zwei Gruppen aufgeteilt:
  - **Westliche Astrologie:** „Das Basic-Reading“ (wichtigste Konstellationen: Planeten, Zeichen, Häuser) und „Das erweiterte Reading“ (ein gewünschter Lebensbereich, z. B. Beruf, Beziehungen, Familie)
  - **Human Design:** Grundlagen-Reading, erweitertes Reading, Genschlüssel-Reading
- Unter jeder Gruppe ein erklärender Satz („Diese drei Readings drehen sich um dein Human Design.“)
- Zeichnungen: Astrologie: Horoskop-Rad mit 12 Häusern, beim erweiterten Reading ein Haus hervorgehoben (Elena hat Option A gewählt); Human Design: Bodygraph (Grundlagen), Bodygraph mit definierten Zentren und gefetteten Kanälen (erweitert), DNA-Doppelhelix (Genschlüssel)
- Im Anfrageformular sind die Readings nach diesen Gruppen sortiert; in der E-Mail steht z. B. „Westliche Astrologie: Das Basic-Reading“

### D-05 · „1:1 Begleitung“ als Übersicht
- **Status:** Erledigt (29.10.2026) – Kurztexte und Fotos sind Vorschläge
- `/11-sessions/` ist jetzt eine Übersicht „Ein Raum für dich.“ mit vier Kacheln: Astrologie & Human Design, Yoga Nidra, Kambo, Fotosessions; darunter „Nicht sicher, was zu dir passt?“ mit Link zum Kontakt
- Die bisherige Astrologie- und Human-Design-Seite liegt jetzt unter `/astrologie-human-design/` (Menü: 1:1 Begleitung → Astrologie & Human Design)
- Texte und Fotos der Übersicht: `content/sessions-overview.json`
- Nachtrag 29.10.: Yoga Nidra „Eine geführte Tiefenmeditation, ähnlich einer Hypnosetherapie, die dich in dein Unterbewusstsein führt.“; Kambo-Kachel mit dem Frosch-Foto (Drive „Kambo“, IMG_8770); Fotosessions-Kachel mit DSC_0064 (Drive „fotografie“)
- Alle Kacheln einheitlich in Bogenform (Elena 29.10.)
- Menü: alle Einzelangebote stehen als Unterpunkte von „1:1 Begleitung“, kein eigener Hauptpunkt
- Hinweis für den Programmierer: Falls die alte Adresse `/11-sessions/#readings` irgendwo verlinkt ist, führt sie jetzt zur Übersicht

### C-05 · Nur normale Bindestriche
- **Status:** Erledigt (29.10.2026), gilt dauerhaft für alle Seiten
- Elena: keine langen Gedankenstriche (– oder —), überall nur der normale Bindestrich (-)
- Umsetzung: `plainDashes()` in `src/final.mjs` ersetzt lange Striche beim Build automatisch in Texten, Bildbeschreibungen und Metadaten; die Trennlinie im Footer ist jetzt eine feine Linie statt eines Strichs

### A-03 · Zahl der begleiteten Menschen hervorheben (vorgemerkt)
- **Status:** Wartet auf Elenas Zahl (sie schätzt noch)
- Elena möchte deutlich zeigen, mit wie vielen Menschen sie schon gearbeitet hat – regelmäßig auf der Website, vielleicht im Header
- Sobald die Zahl feststeht: Platzierung vorschlagen (z. B. Mottoleiste im Header, Startseite, 1:1-Übersicht, Retreats)

### D-06 · Kambo-Seite neu
- **Status:** Erledigt (29.10.2026) – auf Elenas Wunsch vorsichtiger formuliert: keine Heilversprechen mehr, Erfahrungen statt Wirkungen, Hinweis „ersetzt keine ärztliche Behandlung“ und Gespräch über die Gesundheit vorab; kein Preis; Fotos mit Klient:innen sind freigegeben
- Nachtrag 29.10.: Satz ergänzt, dass viele mit psychischen Beschwerden, chronischen Schmerzen oder Suchtthemen kommen (kein Heilversprechen); neu: „Bei jeder Zeremonie singe ich Icaros der Shipibo …“; Fotos mit Menschen farblich gedämpft und wärmer (`*-sanft.jpg`); Foto von Elena im Wald (web-15) wieder dabei; oben wieder Elenas Original „Der natürliche Booster für dein Immunsystem!“; Fotos etwas weniger gedämpft
- Umsetzung: `content/kambo.json` (DE = Übersetzung des Flyers, EN = Flyer-Text), Fotos in `content/sessions-photos.json` (`sessions-kambo-*`), Frosch freigestellt: `assets/originals/kambo-frosch.png`
- Anfrageformular (Name, Ort, Wunschtermine, Nachricht inkl. Frage nach gesundheitlichen Themen) wie bei Astrologie & Human Design
- Hinweis (erledigt): Der Flyer enthielt Heilversprechen (z. B. „stärkstes natürliches Antibiotikum“, „Behandlung bei psychischen Erkrankungen und Sucht“, „senkt den Blutdruck“). In Deutschland regelt das Heilmittelwerbegesetz, was so beworben werden darf – vor dem Livegang rechtlich prüfen lassen.
- Ursprüngliche Wünsche:
- Frosch-Foto aus Drive „Kambo“ freigestellt (ohne Hintergrund), so dass der Frosch über der Seite „hängt“ bzw. klettert
- Text neu nach Elenas Flyer (liegt im Drive-Ordner „Kambo“)
- Keine Überschriften wie „Einblicke in die Arbeit“ und keine Bildbeschreibungen – die Fotos sprechen für sich
- Fotos aus Drive „Kambo“

### D-07 · Yoga-Nidra-Seite neu
- **Status:** Erledigt (29.10.2026) – Elena prüft
- Aufbau wie die anderen 1:1-Seiten: Einstieg mit Waldfoto und „Eine geführte Tiefenmeditation, ähnlich einer Hypnosetherapie, die dich in dein Unterbewusstsein führt.“, Text mit größeren Leitsätzen, Zitat und Zwischenüberschriften, Themen der Nidra-Reisen als Kästchen, Fotos ohne Beschreibung, „Stimmen meiner TeilnehmerInnen.“ (8 Stimmen, Alice je Seite in der passenden Sprache), Anfrageformular (Einzelsitzung oder Gruppe, online oder vor Ort)
- Nachtrag 29.10.: Elenas neuer Text (ohne den Absatz zu DNA/Zellen), neue Zwischenüberschrift „Hypnosetherapie meets Luzides Träumen meets Epigenetik meets Manifestation, die funktioniert“; eigene Fotos aus Drive „Yoga Nidra“: 4 einzeln, 17 im Karussell (3 davon Pexels aus dem Ordner); unscharfe/doppelte Fotos weggelassen (IMG_1143, IMG_4803, 255BA8D2 = Variante von 40AFA0B0); Waldfotos (web-16, web-05, web-01, web-02) entfernt; neue Reisen „Finde dein Krafttier“, „Treffe deine Ahnen“; Satz zur maßgeschneiderten Reise in Einzelsitzungen; Formular nur für Einzelsitzungen, ohne Preis; gut sichtbares Band unter dem Einstieg: „Seit fast 20 Jahren · Tausende TeilnehmerInnen“ mit Kursen, Workshops, Retreats, Festivals (Ozora, MoDem), Einzelsessions und online; Gruppensessions werden angekündigt, sobald es feste Termine gibt
- Elenas bisheriger Text, nur Tippfehler korrigiert (z. B. „jahrtausendealten“, „Theta-Wellen“, „ins Unterbewusstsein“, „zellulärer“, fehlende Leerzeichen nach Satzenden)
- Neue Zwischenüberschriften (Vorschlag): „Direkter Zugang zu deinem Unterbewusstsein“, „Eine ganzheitliche Therapie- und Heilmethode“, „Meine Nidra-Reisen“
- EN-Seite: Übersetzung als Vorschlag
- Texte: `content/yoga-nidra.json`

### D-08 · Feinschliff 1:1-Seiten am Computer
- **Status:** Erledigt (29.10.2026)
- Einzelfotos stehen am Computer direkt neben dem folgenden Text (kein leerer Platz mehr), am Handy weiter untereinander – gilt für Astrologie & Human Design, Kambo und Yoga Nidra
- Foto im schwarzen Kleid: auf der Astrologie-Seite jetzt ganz zu sehen (mit Buch und Kristall), als Rechteck mit weichen Ecken; Kachel auf der Übersicht: Ausschnitt nach oben verschoben, der ganze Kopf ist zu sehen
- Yoga-Nidra-Karussell: Farben der Fotos aneinander angeglichen (`*-angepasst.jpg`)

### D-09 · Fotografie-Seite
- **Status:** Text, Ort und Formular fertig (29.10.2026); **Fotos für die Karussells fehlen noch** (Elena lädt sie in Drive „fotografie“)
- Aktueller Ort: „Órgiva, Andalusien“ – steht oben und neben dem Formular; ändern in `content/photography.json` → `location`
- Kleine Korrektur: „haben berichten“ → „berichten“; Übersicht-Kachel Astrologie bleibt wie sie ist (Elena: Option 2)
- Aufbau: Überschrift „Dein persönliches Fotoshooting“, Elenas Text, dann Karussells mit ihren Fotos, dann Anfrageformular; daneben steht immer, wo Elena sich gerade befindet

### B-19 · Abschluss-Satz im Footer auf Deutsch
- **Status:** Erledigt (29.10.2026) – deutsche Seiten: „In einer Welt, die dir ständig sagt, dass du zu viel oder nicht genug bist – ist es ein Akt der Revolution, du selbst zu sein. Ready for a revolution?“ (letzter Satz bleibt Englisch); englische Seiten unverändert

---

## 5. Retreats & Kurse

### E-04 · Song of the Soul Retreat neu
- **Status:** Erledigt (30.10.2026) – Elena prüft
- Text von der alten Seite ohne „Reset und Initiation“ und ohne „Über uns“; Steffen ist nicht mehr dabei: überall „ich“ statt „wir“, wo es um die Leitung geht („Ich bin Therapeutin und Künstlerin …“, „Ich freue mich darauf, dich kennenzulernen“, „Mit all meiner Liebe, Elena Judith“); „wir“ bleibt, wo die Gruppe gemeint ist
- Fotos nur aus Drive „song of the soul retreat“ (keine Fotos der alten Website): 8 einzeln, 25 im Karussell; zwei doppelte kleine JPGs (IMG_7880, IMG_7881) weggelassen
- Gedicht von Kahlil Gibran nicht übernommen: die englische Übersetzung ist urheberrechtlich geschützt
- Stimmen aller Retreats (Song-of-the-Soul-Stimmen zuerst), Formular für die Warteliste, „for all genders“
- Elena 30.10.: „Nächster Termin in Planung · Warteliste“ bleibt; Ecstatic Dance bleibt, „Musikproduktion mit Healing Frequencies (Ableton-Template)“ entfernt; oberes Foto: Holzhaus am Hang (Datei_002), Kreis ums Feuer jetzt im Karussell
- Texte: `content/song-of-the-soul.json`

### A-04 · Logo in Kopf- und Fußzeile
- **Status:** Erledigt (03.11.2026)
- Logo „Elena Judith“ von der alten Website (web-08) ausgeschnitten, ohne „astraljourney“, als transparentes PNG: dunkel im Header, hell im Footer (`public/assets/brand/`)

### E-06 · Kraft meiner Wurzeln neu
- **Status:** Erstfassung (03.11.2026)
- Text von elenajudith.de übernommen, nur Tippfehler korrigiert (z. B. „wir wir alte Wunden“ → „wie wir alte Wunden“, „gehe können“ → „gehen können“, „Erdbewusstein“ → „Erdbewusstsein“)
- Oben: „Nächster Termin in Planung · Warteliste“, Fragen „Kennst du deine Wurzeln?“ als Farbband, Schlussfragen „Bist du bereit …?“ im grünen Band
- Fotos: drei der alten Website (Wurzeln, Hände auf Baumstamm, Waldweg) und sechs aus dem Drive-Ordner (03.11.): Runde auf der Wiese, Gitarre am Feuer, Gruppe am Altar als Einzelfotos; Feuer mit Trommel, Runde ums Feuer, Trommel bei Nacht im Karussell
- Stimmen: Stefanie, Anna, Rike, Sophia S., Marcel (alte Seite) zuerst, danach alle Retreat-Stimmen

### E-05 · Schamanisches Retreat neu
- **Status:** Erledigt (30.10.2026), Rückfragen offen
- Text von elenajudith.de übernommen, nur Tippfehler korrigiert (z. B. „Authenthische“ → „Authentische“, „Tiefenpsychologe“ → „Tiefenpsychologie“, „Gaben und Geschenke“ → „Gaben und Geschenken“, „gehe können“ → „gehen können“, „Reflektion“ → „Reflexion“)
- Oben: Titel „We are the ones we've been waiting for“, „Nächster Termin in Planung · Warteliste“, Fragen als Farbband
- Einzelfotos: Fotos der alten Website (Tipi innen, Kreis in Kindhaltung `web-42`, Feuer, Bienen, Zeremonien) und aus dem Drive-Ordner „Schamanisches Retreat“; zwei Karussells mit weiteren Fotos aus dem Drive-Ordner
- Stimmen: Alex, Nina, Imad (alte Seite) zuerst, danach alle Retreat-Stimmen (ohne Readings und Onlinekurse); Jasmin ist schon in Elenas Liste enthalten
- Elena 30.10.: Gruppe vor dem Felsen, Wanderung und Elena mit Stab aus dem Karussell entfernt; Mann mit Gitarre ins Karussell, stattdessen Knien am Feuer (`web-43`) als Einzelfoto; Erdmandala als rundes Einzelfoto bei „Zeit, uns wahrhaft zu begegnen“; Tipi im Tipi nur noch als Einzelfoto; Tipi hinter Kirschzweigen in kühleren Farben
- Elena 30.10.: neue Fragen („Wie erlebst du persönlich die aktuellen Zeiten?“, „Wie können wir alle unseren Beitrag dazu leisten …?“), danach hervorgehoben „Nicht nur reden, sondern handeln … Gemeinsam schaffen wir das!“; neuer Abschnitt „Lasst uns niemals die Wirkkraft … unterschätzen …“ mit „Let's be the change …“ beim Tipi-Foto; „durch die Pandemie“ → „in den letzten Jahren“ (Vorschlag); späteres doppeltes „Gemeinsam schaffen wir das.“ entfernt
- Elena 03.11.: „… wie sie unsere größte Quelle der Heilung sein kann“ → „… wie sie uns in unserem Prozess trägt und unterstützt“; Absatz „Mein Verständnis und Zugang zu Heilung …“ und „Ich glaube an“ in Ich-Form
- Elena 03.11.: Text in Ich-Form, wo Elena als Leitung gemeint ist („meiner bisherigen Retreats“, „da ich … arbeite“); „wir“ als Gruppe bleibt. Neu nach „Und im Individuum.“: Zitat „Politischer Aktivismus ohne Spiritualität ist seelenlos …“ und hervorgehoben „Spiritueller Aktivismus ist kraftvoll!“. Einzelfoto nach „… Harmonie mit Mutter Natur“ jetzt Zeremonie im Garten (IMG_3648), Kreis ums Feuer (IMG_5603) ins Karussell, farblich angeglichen. Alle Einzelfotos etwas kühler, Tipi hinter Kirschzweigen noch kühler; Kerze am Feuer (IMG_5602) im Karussell farblich an den Kreis ums Feuer angeglichen; „We're the ones we've been waiting for.“ abgesetzt und fett Ort? Fotos IMG_4975, IMG_0118, IMG_8408, IMG_5675 der alten Seite fehlen (nicht im Drive, alte Website nicht ladbar)

### E-03 · Schweigewochenende / Silent Retreat neu
- **Status:** Erledigt (30.10.2026)
- Name im Menü und in den Kacheln: „Schweigewochenende“ (englisch „Silent Retreat“); Titel oben auf der Seite: „Schweigen im Schwarzwald“ – „Ein Wochenende in Stille“
- Text von der alten Seite übernommen (nur Tippfehler korrigiert); Abschnitt „Über Elena“ entfernt
- Oben: Elena mit Trommel vor dem Kuppelzelt, „Nächster Termin in Planung · Warteliste“
- Scharfe Fotos aus dem Drive-Ordner „Schweigewochenende“ einzeln neben dem Text (u. a. „Yoga vor dem Kuppelzelt“ `ic-yoga-kuppel`, wie gewünscht); ältere, unscharfe Fotos der alten Website nur im Karussell
- Stimmen: Denise, Amelia und Katrin von der alten Schweigewochenende-Seite zuerst, danach alle Retreat-Stimmen (ohne Readings und Onlinekurse)
- „Spürst du den Ruf?“ → Formular für die Warteliste (E-Mail oder WhatsApp)
- Elena 30.10.: Das Foto mit der Gruppe im Kreis in der Child's Pose (`web-42`) gehört nicht hierher, sondern zum Schamanischen Retreat → dort verwenden
- Elena 30.10. (Fotos): Titelfoto jetzt die offene Küche (IMG_1417), danach das Kuppelzelt-Dach (IMG_2615); die beiden Fotos von Elena mit Trommel laufen im Karussell. Entfernt: Altar auf weißem Tuch (IMG_5717), Runde mit Karten (2e8684fe), Umarmung (web-24), Runde vor den Felsen (v2-rocks). Neu: Yoga Nidra vor dem Kuppelzelt (40AFA0B0) beim Rückblick
- Elena 30.10. (Text): Rückblick jetzt im Präsens („In der Stille sind wir ganz“, „Ein ganzes Wochenende lang hören wir genau hin …“), nur „… das in mein Leben kam“ bleibt in der Vergangenheit; „All das Neue, was wir in den letzten Monaten gelernt …“ → „All das, was wir ständig über uns selbst und die Welt dazulernen …“
- Elena 30.10. (weitere Fotos): alle Fotos aus dem Drive-Ordner „Schweigewochenende“ übernommen (ohne Doppelte; 18 doppelt hochgeladene Dateien in den Drive-Papierkorb verschoben). Statt eines großen Karussells jetzt drei: Ort & Gelände (nach „Also suitable…“), Yoga & Altäre (nach dem Yoga-Nidra-Teil), Gemeinsam unterwegs (am Ende). Kühe auf der Weide als Einzelfoto beim Abschnitt „Wie viel wir kommunizieren“. Bilder laden erst beim Ansehen (lazy loading)
- Elena 30.10.: Titelfoto jetzt die Außenküche mit pinken Astern (IMG_1413) als Rechteck im Querformat; das Kuppelzelt-Dach daneben als Rechteck statt Oval (vorher zu stark beschnitten); die Küche ohne Blumen (IMG_1417) läuft im Karussell
- Elena 30.10.: Zweites Küchen-Foto oben (PHOTO-2018, Sonnendach) durch Gruppenfoto vor dem Wald (IMG_2262) ersetzt, das alte läuft im Karussell; „Yoga vor dem Kuppelzelt“ farblich beruhigt (weniger grelles Grün, weniger Kontrast) – gilt auch auf der Inner-Child-Seite
- Elena 30.10.: kursiver Untertitel „Ein Wochenende in Stille“ entfernt; breites Foto (Blick durch Tannen ins Tal, IMG_2434) über dem Zitat „Open your mouth…“; Gruppenfoto mit der Frau in blauer Jacke (IMG_2262) ins Karussell, stattdessen Gruppe auf der Wiese (IMG_2460)
- Elena 30.10.: Desktop wirkte unruhig, weil Textblöcke weiter rechts begannen als die Fotos → Text, Einzelfotos und breite Fotos beginnen jetzt an derselben linken Kante (gilt für alle neu aufgebauten Seiten: 1:1, Astrologie, Kambo, Yoga Nidra, Fotografie, Inner Child, Song of the Soul, Schweigewochenende)
- Elena 30.10.: Gruppenfoto neben „Ein Wochenende in Stille“ jetzt die Runde im Wald (IMG_7751); runder Altar (IMG_1412) ins Karussell, stattdessen Altar mit Wildblumen und Kristallen (IMG_6862)
- Elena 30.10.: Kuh-Foto zu blau → Himmel gedämpft, etwas wärmer. Foto „jemand füttert die Kuh“ ist nicht unter den ladbaren Dateien – vermutlich bei den zu großen DSCF-Fotos
- Elena 30.10. (Nachlieferung, verkleinerte Fotos): 18 neue Fotos eingebaut, 12 erneut hochgeladene Doppelte in den Drive-Papierkorb. Einzelfoto beim Abschnitt „Wie viel wir kommunizieren“ jetzt Elena zwischen den Ruhenden mit Kühen im Hintergrund; das Kuh-Foto läuft im Karussell. Neu u. a.: Singkreis mit Gitarre, gemeinsames Essen, großes Gruppenfoto, Kuppelzelt bei Nacht
- Elena 30.10.: Singkreis mit Gitarre statt Runde im Wald neben „Ein Wochenende in Stille“
- Elena 30.10.: Daniel ist nicht mehr dabei → Text in Ich-Form (nur dort, wo Elena als Leitung gemeint ist; „wir“ als Gruppe bleibt). In den Stimmen bleibt Daniel erwähnt. Ort „SägenDomel bei St. Peter“ ist aktuell. Link zum Artikel von Verena bleibt draußen.

### E-02 · Inner Child Retreat neu
- **Status:** Erledigt (30.10.2026) – Elena lädt noch weitere Fotos hoch
- Text von der alten Seite übernommen (nur Tippfehler korrigiert, z. B. „Badham“ → „Baldham“, „Ayva“ → „Eywa“, „überwältig&erschüttert“ → „überwältigt & erschüttert“)
- Oben: Baumfoto (Klettern im MAMA TREE), „Nächster Termin: Frühjahr · Baldham bei München“, Knopf „Auf die Warteliste“
- Aufbau: Fragen als Farbband → Text mit Leitsätzen, Zitaten und Fotos neben dem Text → „4 Tage in Mutter Natur“ als Kästchen → Yoga-Nidra-Teil mit Link zur Yoga-Nidra-Seite → Karussell (22 Fotos aus Drive) → Stimmen aller Retreats (ohne Readings und Onlinekurse), Inner-Child-Stimmen zuerst → „Bist du bereit?“ → Formular für die Warteliste
- Fotos von der alten Website: Baum (oben), Efeu-Runde, Elena & Daniel vor dem Baum; die übrigen alten Fotos konnten nicht heruntergeladen werden (Elena legt sie bei Bedarf in den Drive)
- Nicht verwendet (zu groß zum Herunterladen, über 10 MB): IMG_2943, IMG_2955, IMG_1059, IMG_1063, IMG_1056, IMG_1060; nicht passend: IMG_0188, 3A7D68FE (Akt-/Porträtfotos), IMG_6519 (schon bei Yoga Nidra)
- Nachtrag 30.10.: Einzelfotos 2-4 (Efeu-Runde, Elena & Daniel, Meditation vor dem Kuppelzelt) laufen jetzt nur im Karussell; einzeln stattdessen: Elena mit Gitarre, drei Frauen am Baum, Singkreis bei Kerzenlicht
- Nachtrag 30.10. (2): Einzelfotos zeigen jetzt vor allem Gruppen (Gruppe zwischen Felsen, Waldkreis, Runde mit Karten und Blumen, Yoga vor dem Kuppelzelt, ausgelassene Gruppe auf der Wiese, Singkreis, Lagerfeuer) plus Elena mit Gitarre; mehr Einzelfotos. Kristall-im-Baum-Foto: noch nicht gefunden, Elena lädt es hoch; Foto „Elena an einem Baum im Gras“ (IMG_1046) ganz entfernt; großer Kreis auf der Frühlingswiese (IMG_0726): Grün gedämpft
- Nachtrag 30.10. (3): weitere Fotos aus Elenas Drive (lagen im Hauptordner, nicht im Inner-Child-Ordner): Kristall im Baum (einzeln), Gruppe vor dem Baum mit Trommel und Gitarre (einzeln), fünf Frauen am Baum (einzeln), Gruppe im Efeu, Altar, Klettern im Baum, Sonne im Baum (Karussell). Tipi-Foto (web-19) einzeln; Altar und Sepia-Foto (Elena am Baum) als weitere Einzelfotos; Yoga vor dem Kuppelzelt ins Karussell
- Texte: `content/inner-child.json`

### E-01 · Termine und Preise sichtbar machen (Vorschlag)
- **Priorität:** Mittel · **Status:** Rückfrage
- **Ist:** Die Retreats werden beschrieben, es stehen aber keine Termine, Orte oder Preise dabei.
- **Soll (Vorschlag):** Pro Retreat ein kurzer Infoblock: nächster Termin, Ort, Preis bzw. „ab … €“, Button „Platz anfragen“. Wenn kein Termin feststeht: „Nächster Termin in Planung – trag dich für Infos ein“.

---

## 6. Kunst & Musik

*(Elenas Wünsche folgen)*

---

## 7. Kontakt

*(Elenas Wünsche folgen)*

---

## 8. Neue Fotos

| Nr. | Datei im Drive | Wo einsetzen | Ersetzt / neu | Bildbeschreibung (Alt-Text) |
|---|---|---|---|---|
| F-01 | `[Dateiname]` | `[Seite, Abschnitt]` | `[ersetzt … / neu]` | `[kurze Beschreibung]` |

**Allgemein für Fotos:** Bilder bitte fürs Web komprimieren (WebP, max. ca. 300 KB), Alt-Text in DE und EN pflegen.

---

## Teilnehmerstimmen (Texte)

Gilt für das Karussell auf der Startseite (B-11). Reihenfolge wie hier aufgeführt.
Texte sind redaktionell vereinheitlicht: Großbuchstaben in normale Schreibweise gesetzt, Tipp- und Kommafehler korrigiert, Emojis entfernt, Anreden/Grußformeln von Briefen weggelassen. Inhaltlich unverändert.
**Foto:** Bei allen „folgt“, außer wo anders angegeben – Elena reicht die Fotos nach.
**Status:** `bereit` = kann so eingebaut werden · `Rückfrage` = erst nach Klärung einbauen

---

**T-01 · Kirstin** – Inner Child Retreat · Foto: folgt · Status: bereit

> Elena ist ein wundervoller Herzensmensch, der es schafft, mit ihrer warmen und ruhigen Ausstrahlung einen geschützten Raum zu schaffen, um zur Ruhe zu kommen und bei sich selbst anzukommen. Das Inner Child Retreat hat mir sehr geholfen, vieles und vor allem mich selbst in einem neuen, positiveren und verständnisvolleren Licht zu sehen. Ich sehe jetzt vieles klarer und habe in mir selbst viele neue Stärken und Talente entdecken können.
> Die Energie der Gruppe war unglaublich schön, und obwohl es mir sonst eher schwerfällt, mich anderen wirklich zu öffnen, fiel es mir hier sofort leicht. Ich habe erlebt, wie befreiend es sein kann und wie liebevoll und ermutigend diese Gemeinschaft und vor allem Elena geholfen haben, weiter zu mir zu finden und meine Stärken zu sehen und zu leben.
> Emotional hat sich bei mir viel bewegt, aber neben den aufwühlenden Stunden, in denen wir uns mithilfe der Fragen, die Elena uns jeden Tag mitgegeben hat, in Ruhe mit eigenen Themen beschäftigen konnten, gab es auch sehr viel Freude, Leichtigkeit und Lachen beim Tanzen, Singen, Klettern und im Zusammensein. Elena hat eine ganz wundervolle Balance erschaffen und mit ihrer wunderschönen Stimme meine Liebe zur Musik auch wieder ganz neu erweckt. Ich habe gefühlt, wie sehr sie das liebt, was sie macht, und wie sehr sie es auch selbst lebt.
> Ich freue mich schon auf das nächste Retreat mit ihr und kann sie aus tiefstem Herzen nur weiterempfehlen.

**T-02 · Nadine** – Inner Child Retreat, April 2026 · Foto: folgt · Status: bereit · *(es gibt mehrere Teilnehmerinnen namens Nadine – Fotos bitte genau zuordnen)*

> Ich habe im April 2026 das Inner Child Retreat mit Elena besucht.
> Die ganz unterschiedlichen Übungen, die teilweise wirklich tief gingen, der Ablauf des Retreats und wie alles aufeinander aufgebaut war, ihre Art, den Raum für Themen zu öffnen und zu halten, ihr Know-how in vielen Bereichen, ihre Beobachtungsgabe, Offenheit und Flexibilität und auch die Empathie, mit der sie auf mich und uns eingegangen ist, haben mir sehr gutgetan. Ich habe mich in der Gruppe unwahrscheinlich wohl und gesehen gefühlt, konnte mich mit meinen Themen auseinandersetzen, neue Erkenntnisse entdecken, mich besser kennenlernen und traute mich immer mehr, mich zu zeigen, meinen Platz einzunehmen und Schritte auf meiner Heilungsreise weiterzugehen.
> Danke dir von Herzen, Elena! Aho!

**T-03 · Melissa** – Retreat · Foto: folgt · Status: bereit

> Ich möchte mich an dieser Stelle für das wundervolle Retreat bedanken. Es hat mich sehr bewegt, und vieles kam emotional und ganz tief in mir drinnen zum Vorschein. Danke, dass du den Raum und die Möglichkeit dafür geschaffen hast. Danke dafür, dass ich hinsehen, fühlen, heilen und transformieren konnte. Ich denke immer wieder daran zurück und habe einige Erkenntnisse für mein weiteres Leben mitgenommen. Allein dafür bin ich dir sehr dankbar.

**T-04 · Soraya** – Elements of Life Retreat · Foto: folgt · Status: bereit

> Das Elements of Life Retreat war eine unglaublich schöne und tiefe Reise in mein Selbst und in meine Umwelt. Ich habe Ruhe, Selbstreflexion, eine tiefe Verbundenheit und Öffnung auf einem ganz besonderen Fleck Erde erfahren.
> Die Tage waren emotional sehr intensiv. Die Größe der Gruppe war für mich persönlich angenehm, um sich schnell öffnen sowie fallen lassen zu können, und hat allen Teilnehmern genug Raum geboten, um sich auszudrücken und gehört zu werden. Ich habe durch die Übungen super liebe und unterschiedliche Menschen in kürzester Zeit sehr echt kennenlernen können. Es war wirklich schön, dass Elena und Daniel sich so persönlich mit in den Heilungsprozess eingebracht haben und wir sie authentisch erleben konnten. Beide haben einen sehr geschützten Raum erschaffen, danke dafür! Wir haben viel gelacht, geweint, geteilt, geschrien, geschwiegen, gesungen, getanzt und konnten zusammen heilen.
> Mir hat die Struktur, die sich an den jeweiligen Chakren orientiert hat, besonders gefallen. Jeden Tag wurde die Praxis thematisch passend abgeändert, sodass man Zugang zu vielen neuen Praktiken und Zeremonien gefunden hat. Für mich die perfekte Mischung aus heilender Routine und neuem Input und Inspiration. Ich habe viele neue Methoden kennengelernt, die mit mir resoniert haben und die ich nun in meinen Alltag integrieren kann.
> Ich danke euch von ganzem Herzen für diese bewegende Erfahrung und hoffe, dass ihr euer Wissen und eure Arbeit in Zukunft noch mit vielen Leuten teilt.

**T-05 · Kristina** – Song of the Soul Retreat (Englisch) · Foto: folgt · Status: bereit

> Thank you, Elena, for the Song of the Soul retreat. I'm glad I attended this beautiful event. I felt that I was in the right place at the right time, going through my life transformations. All three days we spent in our women's circle were magical for me. I really enjoyed singing and participating in songwriting with you. It was a completely new and heartwarming experience for me. Whenever I'm in Guatemala again, I would love to connect again. Thank you very much again.

**T-06 · Elena** – Song of the Soul Retreat (Englisch) · Foto: folgt · Status: bereit

> Elena is a person of very strong and directive energy. She holds so many powerful tools in her pocket and really wants you to make the most of them. She sees and lives the world from the different perspectives of various cultures, which allows her to have a bigger picture. In this manner, she is able to support you from a rather holistic approach! I love her singing; it's beautiful and can go so deep. I joined her 3-day retreat, which helped me to find my space and shift from being very shy to singing a song in front of the retreat group. Thank you so much for the out-of-comfort-zone challenges, space holding and voice practices!

**T-07 · Kathi** – Inner Child Retreat · Foto: folgt · Status: bereit

> Das Inner Child Retreat, das Elena für unsere kleine, aber feine Gruppe veranstaltet hat, hat mich wieder mehr zu mir und meinem tiefsten Inneren zurückfinden lassen. Ich habe mich sehr schnell in der Gruppe und an dem Ort wohlgefühlt, was Elenas durchdachtem Programm zu verdanken ist. Dadurch fiel es mir auch nicht schwer, mich zu öffnen und meinen tiefsten Gedanken und Gefühlen Raum zu lassen. Durch den gut aufeinander abgestimmten Tagesablauf mit Yoga, Meditation, Breathwork, Singen, Tanzen, Redekreisen, aber auch mal Zeit für sich, um alles nochmal zu reflektieren und sich Gedanken zu den Themen zu machen, fühlte ich mich direkt gut aufgehoben. Am intensivsten waren für mich Yoga Nidra und das holotrope Atmen, was nochmal ganz tief in die Seele hineinging.
> Ich bin gestärkt, motiviert, mit neuen Freunden und voller Vorfreude auf mein neues Ich aus dem Retreat herausgegangen. Ich habe viele Dinge für mich mitnehmen können, die mich auch weiterhin auf meinem Weg begleiten. Ich danke dir, liebe Elena, für diese wunderschönen Tage im Dornenreich und bin so froh, dass ich meinem Impuls gefolgt bin, daran teilzunehmen.

**T-08 · Laura** – Elements of Life Retreat · Foto: folgt · Status: bereit

> Ich habe das Elements of Life Retreat mit Elena und Daniel besucht und eine erholsame und inputreiche Zeit im Schwarzwald verbracht. Der Ort war absolut wunderbar ausgewählt: Blumenwiesen, ein fließendes Bächlein, Tannen und nur der nötigste Handyempfang. Ich befand mich in einer Zeit, in der ich neue Gewohnheiten (wie Meditation, regelmäßige körperliche Übungen und weniger Internetnutzung) in meinem Leben etablieren wollte, jedoch noch nicht diszipliniert genug war, dies aus eigener Motivation zu bewältigen. Das Retreat gab mir den nötigen Schub! Mit täglicher Yoga-Praxis, Meditationen und dem kaum vorhandenen Handyempfang konnte ich neue Kraft und Energie schöpfen.
> Es gab viele Einblicke in spirituelle Riten und Praxen, Astrologie, Elementenlehre, Reflexionsfragen für die Mittagspause und wunderbare Gesprächsrunden am Lagerfeuer. Elena und Daniel strotzen nur so vor persönlicher Erfahrung und Wissensdurst! Ein Sprungbrett in neue Welten! Elena versteht es wirklich gut, diverse Praktiken, Philosophien und Lehren zu verknüpfen und zu ihrem eigenen, sehr inspirierenden Moodboard des Lebens zusammenzufügen. Ihre Yoga-Nidra-Praxis ist pure Magie.
> Daniel hat uns mit leckerem Essen versorgt und ist auch auf Allergien und spezielle Wünsche eingegangen. Meine liebsten Pausen habe ich gern bei einem kleinen Plausch in der Outdoorküche mit ihm verbracht.

**T-09 · Gabriel** – Silent Retreat (Schweigewochenende), Juni 2018 · Foto: folgt · Status: bereit

> Das Schweigewochenende im Schwarzwald im Juni 2018 war eine ganz besondere Erfahrung. Das Schweigen hat mich sehr konzentriert werden lassen. Durch die liebevolle Begleitung von Elena und Daniel habe ich mich angenehmerweise nicht in meinen Gedanken verloren. Die Kombination aus Yoga-Asanas, Meditation und Yoga Nidra bildete eine wunderbare Grundlage. Elena hat uns sehr professionell und verständlich durch die Übungen geführt. Sie hat dafür auch eine wundervolle Stimme. Das Wochenende war sehr anregend und hat vieles bei mir in Gang gesetzt.

**T-10 · Sabine** – Silent Retreat · Foto: folgt · Status: bereit

> Die Gegend war extrem passend und traumhaft schön. Eure Einführung und die kurze Gruppenrunde vor dem Schweigen haben mir auch sehr gut gefallen. Das Schweigen war anfangs sehr ungewohnt und unerwartet laut mit so vielen Dingen im Kopf, die man im Alltag eher abschalten kann. Die Yogaeinheiten fand ich super und sehr kräftigend, um in den Tag zu starten. Ich fand euch als Team und Paar sehr stark und inspirierend. Ihr habt alles sehr bemüht, mit vollem Herzen und im Einklang gemacht. Am stärksten ist mir mein Gefühl am Ende in Erinnerung geblieben. Ich habe mich sehr befreit und glücklich gefühlt und sehr lange danach noch morgens das Lied angehört, mit dem du uns geweckt hast. Alles in allem fand ich, dass es sehr stimmig war und viel Positives in mir ausgelöst hat. Es war einfach eine tolle und besondere Erfahrung.

**T-11 · Elena Valeska** – Silent Retreat · Foto: folgt · Status: bereit

> Das Schweigeretreat mit Elena und Daniel war eine heilsame und wundervolle Erfahrung. Der Ort war absolut magisch und die liebevolle und authentische Art der beiden ganz bezaubernd, ich habe mich sehr getragen gefühlt. In die Stille zu gehen hat so gutgetan und ist mir überhaupt nicht schwergefallen, obwohl ich sonst sehr gerne viele Worte benutze. Die inneren Stimmen sind ja schon laut genug, wurden aber in tiefer Verbundenheit mit Pachamama von Tag zu Tag leiser. Ich kann jedem nur ans Herz legen, diese Erfahrung mitzunehmen und wieder ein Stück tiefer mit sich und seiner Seele in Berührung zu kommen.

**T-12 · Franzi** – Silent Retreat · Foto: folgt · Status: bereit

> In dem Schweigeretreat im schönen Schwarzwald, angeleitet von Elena, fand ich genau das, wonach ich mich den Sommer über gesehnt hatte: innere Ruhe und zu mir finden, ein wundervolles Naturerlebnis, Geborgenheit, Dialog mit mir, einfühlsame Begleiter*innen und zahlreiche mir die Augen öffnende Übungen.
> Ich bin sehr glücklich darüber, mich auf dieses neue Erlebnis eingelassen zu haben, und profitiere noch ein halbes Jahr später von dieser für mich besonderen Zeit. Die Location ist wunderschön, denn man lebt richtig im Grünen zwischen Kühen, einem Bächlein, einer großen Outdoorküche und einem gemütlichen Gemeinschaftszelt. Trotz teilweise ungemütlichen Wetters habe ich mich immer wohlgefühlt und die Nähe zur Natur genossen. Elenas persönliche Art hat mir von Anfang an sehr geholfen, mich direkt in der Gruppe fallen lassen zu können, mich zu öffnen und geborgen zu fühlen. Besonders beeindruckt hat mich ihre liebevolle Anleitung des Yoga Nidras.
> Ich würde fast jeder und jedem ein Schweigeretreat mit Elena ans Herz legen, die/der mal etwas Neues erleben und sich etwas Gutes tun möchte.

**T-13 · Rina** – Wise In Her Ways · Foto: folgt · Status: bereit

> Der Aufruf zum Retreat „Wise In Her Ways“ hat mich förmlich umarmt. Aus jedem einzelnen Wort der Einladung strömte mir so viel Wärme und Liebe entgegen, dass ich wusste, ich will dort sein. Noch einen Tag vor der Abreise fragten verschiedene Widrigkeiten (Arbeit, Zugverkehr) bei mir an, wie ernst es mir mit dem Plan sei. Und ich habe diese Frage mit Entschlossenheit beantwortet. Was ich dafür zurückbekam, ist kaum in Worte zu fassen. Begegnungen mit wundervollen, einzigartigen Menschen. Jede Frau auf ihre Weise, mit jedem Blick, jeder geteilten Geschichte, jedem Lächeln ein Geschenk. Ich war so erfüllt, dass ich dachte, ich könnte gleich losfliegen. Elena hat uns mit all ihren Erfahrungen, mit ihrer wunderschönen Musik und ihrem Blick für das Leuchten in jedem Menschen und in der Welt zusammengeführt, und wir sind (für mich so gefühlt) zweieinhalb Tage in einem Kuschelhaufen aus bunten, strömenden Energien, verbunden durch kalte Nächte und sonnige Tage, getanzt. Ich habe das Leben eingeatmet und gefühlt: Wir sind eins. Wir sind miteinander und füreinander da. Das ist so schön, und das Gefühl trage ich mit mir in meinem Herzen.

**T-14 · Steffi** – Elements of Life Retreat · Foto: folgt · Status: bereit

> Das Elements of Life Retreat ist inzwischen schon ein Dreivierteljahr her – wenn ich an diese Zeit zurückdenke, bin ich so sehr froh, sie erlebt zu haben. Es hat mich in vielen Formen gestärkt, und gegenseitig haben wir uns genährt sowie inspiriert. Elena und Daniel waren super lieb und sind allen Teilnehmern auf Augenhöhe begegnet. Bis heute habe ich Kontakt zu ihnen. Ich kann jedem, der mehr zu sich selbst kommen möchte, nur empfehlen, an einem ihrer wunderschön gestalteten Retreats teilzunehmen. Aho und unglaubliche Dankbarkeit.

**T-15 · Sibel** – Elements of Life Retreat · Foto: folgt · Status: bereit

> Es war sehr schön, in die wunderbare Landschaft im Schwarzwald einzutauchen und gemeinsam in der Gruppe diese intensiven Tage zu erleben. Das gegenseitige Vertrauen war schnell da, und jede*r konnte sich einbringen und seinen Prozess mitteilen. Es gab viel persönlichen Austausch und Rituale. Dabei haben wir uns gegenseitig gestärkt. Das Programm war abwechslungsreich und inspirierend. Das Morgen-Yoga und die dazugehörige Chakren-Arbeit waren sehr kraftvoll. Auch die von Elena angeleiteten Seelenreisen waren für mich eine heilsame Erfahrung und ermöglichten mir, ein Tor zu meinem Unterbewusstsein zu öffnen. Ich fühlte mich nach diesen Tagen sehr ausgeglichen, da wir uns ganzheitlich mit den vier Elementen auseinandergesetzt haben. Schön war es, zu jedem Element passend ein Ritual oder eine Zeremonie zu gestalten. Auch das Essen war wunderbar, nährend für Körper und Seele. Ich schätzte die Herzlichkeit und die authentische Art, wie Elena und Daniel das Retreat geleitet haben. Es ist spürbar, dass sie ihre Vision leben und mit ihrer ganzen Leidenschaft dabei sind!

**T-16 · Silja** – Wise In Her Ways · Foto: folgt · Status: bereit

> Das Wochenende unter uns Schwestern an diesem erholsamen, wunderbaren Platz weit draußen, geführt und begleitet von Elena und den lebenden Kräften, war ganz schön magisch für mich. Eintauchen in tiefe Themen, im Feingefühl mit dem Flow gehen, atmen, sein, Unterstützung fühlend, erinnert werden. Erneuerung finden in Verkörperung der drei Farben, Erlaubnis für Wandlung. Die Vielseitigkeit und das Wissen von Elena überraschen mich immer wieder. Das Wasser tat unglaublich gut, und die Verbindung aus Meditation, Singen, Redekreisen und rituellen Momenten schenkte mir Heilung, neue Kraft und Möglichkeiten zur Reflexion und Spiegel im Miteinander! Danke für die Zeit!

**T-17 · Silja** – Medizin-Retreat mit Yawanawa & Ashaninka, begleitet von Elena · Foto: folgt · Status: Rückfrage (siehe Hinweis)

> Von Beginn an im Eröffnungskreis haben mir Elenas Kraft und ihr liebevolles Singen sehr viel Vertrauen und Dankbarkeit geschenkt, mich wohl und sicher zu wissen, was auch passiert, gehalten zu sein. Während der Reise waren die Phasen ihrer Gesänge so tragend, weich und öffnend für mich, sodass ich Weite, Verbindung und immer wieder tiefe Unterstützung fühlen durfte! Danke! Dafür Liebe.

**T-18 · Imad** – Retreat (Englisch) · Foto: folgt · Status: bereit

> To put into words the wonder of what I've experienced is not really possible. But wonder-ful would be a good way to put it, with the full implications of that expression. I can say with certainty that the experience I had in the retreat with Elena and Daniel and the other wonderful souls that came together was one of the significant experiences I've had in my life, and its effect and memory are still present and brilliant in my heart and mind.
> I can tell you about the bright, heartfelt smile and the very big hug I first received from Daniel when he came to pick us up; it made me feel so welcome and opened the gate for me to the journey into this wonderful "other world" that I was seeking. Such a loving, wonderful, caring soul with a treasure in his heart. Then there was Elena. She is the one who took us along the ride and helped us open our eyes towards the wonderful, to find our connection to nature and to one another, to Mother Earth, and opening our hearts to love and the healing we seek. The first thing we did was to create an altar of symbols and pieces of nature after she showed us how, and I was all of a sudden transformed into a new space of wonder and harmony and beauty. She has such a sense of the aesthetic, a strong connection to nature and beauty, and a keen ability to see and help us see the wonder in front of our eyes, be it hidden in the sight of a wild flower or created by everybody dancing to music over earth and chipped wood.
> The community of all of us who came together through this process, a communitas of love and communication from the heart, a unique gathering of wonderful souls at a point in time, created a living thing with the power of healing and joy that can propagate and leave a lasting effect. This experience of the other world was truly "this world rightly seen". I'm thankful for this revelation.

**T-19 · Chris** – Inner Child Retreat · Foto: folgt · Status: bereit

> Das Retreat hat mir mega geholfen. Ich habe im Laufe der Tage und auch danach so viel über mich erfahren. Ich habe so viel positive Wut rauslassen können, die ich sonst eher gleichgültig ignoriere. Es gab fruchtbare Konfrontationen bzw. Auseinandersetzungen mit Kollegen und Vorgesetzten. Ich weiß, dass ich mehr persönliche Verantwortung übernehmen und mehr für den Veganismus tun möchte. Ich habe während des Retreats davon geträumt, dass ich einem Menschen in meinem Leben gesagt habe, dass ich ihn liebe – obwohl ich das so noch nie gesagt habe. So super viel ist passiert, echt der Wahnsinn! In der Natur und in der Begegnung mit unseren inneren Kindern kommen Antworten, und ich bin euch so dankbar für das Wochenende! Das war so wertvoll! Ganz liebe Grüße und Gottes Segen.

**T-20 · Swantje** – Wise In Her Ways (Teilnehmerin und Fotografin) · Foto: folgt · Status: bereit

> Ich bin von Herzen dankbar für diese Erfahrung. Das Retreat war für mich ein Raum voller Heilung, Tiefe und ehrlicher Begegnungen, getragen von Elenas intuitiver Weisheit und liebevoller Präsenz.
> Elena schafft mit ihrer authentischen Art einen sicheren, nährenden Raum, in dem jede Frau eingeladen ist, sich selbst wiederzuentdecken. Ihre Rituale, ihre Stimme und ihr Blick für das Wesentliche berühren die Seele. Ich konnte nicht nur wundervolle Momente mit der Kamera festhalten, sondern wurde selbst Teil einer Bewegung, die das Menschsein feiert – wild, weich, wahrhaftig.
> Die Verbindung mit der Natur, das gemeinsame Singen, das Teilen im Kreis – all das hat mich inspiriert und gestärkt. Ich reise mit einem offenen Herzen ab, tief verbunden mit großartigen Menschen, neuen Impulsen und einer Portion Sternenstaub im Gepäck.
> Liebe Elena, danke für deine Hingabe, deinen Mut und deine Magie. Du hast etwas Einzigartiges geschaffen – und ich freue mich schon jetzt auf die nächste Reise mit dir.

**T-21 · Jasmin** – Retreat (gleiche Person wie T-28, war bei mehreren Retreats) · Foto: vorhanden (wie bisher) · Status: bereit

> Man muss sich einfach nur darauf einlassen, dann entsteht etwas ganz Magisches! Ich bin unglaublich dankbar für diese Erfahrung: meine Ängste anzuschauen und anzufangen, sie zu überwinden, Neues auszuprobieren, einfach im Hier und Jetzt zu sein. Ich fühle mich wieder bei mir angekommen, ich fühle Liebe, Leichtigkeit und pures Vertrauen in die Zukunft. Ich fühle mich gestärkt, und genau das möchte ich nach außen tragen und dadurch andere Menschen inspirieren und sie motivieren, tiefer zu schauen, mehr hinzuschauen bei sich selbst und auch andere anzuschauen – wahrhaftig!
> Ich habe Liebe zu geben! Sobald der richtige Mensch vor mir steht, bin ich bereit dafür, wenn ich ganz bei mir bin und wie beim Retreat auf mich achte. Dann habe ich Energie für andere. Es kommt alles zu seiner Zeit – ich habe jetzt wieder die Gewissheit, dass ich bereit dafür bin.
> Danke für diese Erfahrung! Danke für die neuen Bekanntschaften! Danke für den wundervollen, magischen Rahmen! Danke, dass ich mich selbst wieder besser kennenlernen und lieben durfte! Und danke, dass ich wieder weiß, wie schön ich bin – vor allem meine Seele!

**T-22 · Andrew** – Inner Child Retreat · Foto: folgt · Status: bereit

> Dieses Retreat hat mir die Augen für die Kraft der Spiritualität, des Bewusstseins und der Liebe geöffnet. Es war beruhigend zu wissen, dass so viele wunderbare Seelen auf der Erde leben. Das Zusammenkommen, wenn auch aus unterschiedlichen Lebensbereichen kommend, unter der Leitung von Elena, offenbarte mir die Kraft eines Tribes. Ich bin für immer dankbar für diese Erfahrung, denn sie hat mich in einem Zustand glückseliger Erinnerung und immer noch andauernder Transformation zurückgelassen. Es hat ein Gefühl der Bestimmung geweckt: zu fühlen! Und dafür bin ich ewig in Dankbarkeit. Man kann mit Sicherheit sagen, dass Elena ein neues Mitglied ihres Tribes gefunden hat, und ich werde diesem gerne folgen, wohin ihn seine Wege führen mögen.

**T-23 · Melanie** – Inner Child Retreat · Foto: vorhanden (wie bisher) · Status: bereit · *ersetzt den bisherigen Text von Melanie*

> Das Inner Child Retreat hat mir sehr dabei geholfen, mich besser kennenzulernen, besser auf meine Bedürfnisse zu hören und somit ein glücklicheres Leben zu führen. Ich habe viele neue Menschen kennengelernt, wir haben viel geweint und gelacht, getanzt und gesungen. Es war einfach unvergesslich, und wenn ich an die Zeit zurückdenke, fühlt es sich an wie ein Wendepunkt, wie ein Neuanfang, eine neue Zeit. Seither dürfen mein inneres Kind und ich wieder Hand in Hand gehen. Das Retreat würde ich jederzeit jedem weiterempfehlen!
> Es ist so schön, dass es Menschen wie dich gibt. Menschen, die die Sprache des Herzens verlernt haben, finden durch dich wieder den richtigen Weg, den Weg, der zum Glück führt. Vielen, vielen Dank!

**T-24 · Tamara** – Retreat im Schwarzwald · Foto: folgt · Status: bereit

> Das Retreat war wie ein wahrgewordener Traum. Elena ist eine unfassbar inspirierende und weise Seele, die einen unglaublichen Erfahrungs- und Wissensschatz besitzt und diesen gerne weitergeben will. Sie versteht es, den Menschen auf eine empathische und einfühlsame Art zu begegnen, ohne sie zu verurteilen. Auch hat sie viel Persönliches mit uns geteilt und jede Frage ausnahmslos beantwortet, was sie so authentisch und nahbar macht. Sie lebt eben genau das, was sie tut! Und das spürt man auch. Außerdem hat sie eine wunderschöne Stimme; wenn sie Gitarre spielt und dabei singt, fühlt man ihren Vibe und ihre ansteckende Energie total.
> Wir haben in der Sonne getanzt, Yoga praktiziert, meditiert und uns mit Mutter Erde verbunden. Wir hatten auch viele Circles, diese waren so unbeschreiblich tiefgründig und kraftvoll und haben mir so viel gegeben. Weiterhin waren wir so eine wundervolle Gemeinschaft, in der jeder seinen Platz innehatte.
> Ich bin mehr als dankbar, dass ich diese einmalige Erfahrung machen durfte, es war einfach magisch! Ich kann jedem, der sich tiefgehend seinen Themen im Rahmen eines verbundenen Tribes widmen und vor allem ins Spüren kommen möchte, die Retreats von Elena aus tiefstem Herzen empfehlen!

**T-25 · Lea** – Elements of Life Retreat in Indien · Foto: folgt · Status: bereit

> Ich war mit Elena und Daniel auf dem Elements of Life Retreat in Indien. Wir hatten dort eine magische Zeit, und ich schöpfe heute noch Kraft aus diesen Tagen. Elena und Daniel bilden zusammen ein unschlagbares Team; sie haben dafür gesorgt, dass wir körperlich und seelisch eine unvergesslich gute Zeit hatten. Es war ein herzlicher Umgang, in dem jeder so aufgenommen wurde, wie er ist, und sich mit den ganz eigenen Sorgen, Ängsten und Wünschen der ganzen Gruppe öffnen konnte. Wir haben zusammen gelacht und geweint und sind zuletzt zusammengewachsen. Ich würde jederzeit wieder mitmachen!

**T-26 · Leonie** – Retreat · Foto: folgt · Status: bereit

> Das Retreat hat mir wirklich viel gebracht – ich habe in kürzester Zeit tief in mich hineingespürt, viel reflektiert und einige sehr berührende Momente erlebt. Die Umgebung war wunderschön, die Stille heilsam, und die Meditationen, das Yoga Nidra und auch das Breathwork waren tiefgehend und sehr gut angeleitet. Die Gruppe war angenehm und wertschätzend, und ich habe mich in vielem gesehen und getragen gefühlt.
> Was mich besonders beeindruckt hat, bist du als Mensch: Du strahlst Authentizität und Präsenz aus, hast eine besondere Energie und bringst unglaublich viel Herz in deine Arbeit. Man spürt, dass das hier kein „Programm“ ist, sondern echtes Engagement und Tiefe.
> Du bist eine beeindruckende Frau mit einer besonderen Gabe, Menschen zu begleiten. Ich wünsche dir weiterhin viel Kraft und Freude auf deinem weiteren Weg. Ganz viel Liebe.

**T-27 · Annetta** – Frauenretreat im Schwarzwald · Foto: folgt · Status: bereit

> Das Retreat im Schwarzwald bei Elena war für mich eine tief transformierende Erfahrung. Wir haben mitten im Grünen übernachtet, und ein sanft plätschernder Bach floss zwischen unseren Schlafplätzen. Allein dieses Setting hat so viel Ruhe und Erdung gebracht. Wir haben gemeinsam meditiert, getanzt, Yoga gemacht und kraftvolle Rituale gefeiert. So viel Verbundenheit, Vertrauen und weibliche Kraft in einem Raum zu spüren, war unbeschreiblich schön.
> Ich habe mich mit wunderbaren Frauen aus allen Altersklassen verbunden. Jede Begegnung war besonders und auf ihre Weise heilsam. Durch das ganze Wochenende habe ich mich tief mit der Natur verbunden gefühlt – mit den Bäumen, dem Wasser, dem Wind. Mutter Natur hat mich getragen und mir so viel Kraft geschenkt.
> Ich bin unendlich dankbar für diese Erfahrung. Es war magisch, heilend und stärkend. Danke, liebe Elena, von ganzem Herzen, für diesen heiligen Raum. Du hast mich inspiriert, mir die Tür geöffnet für eine andere Ebene! Dafür werde ich dir immer dankbar sein. Ich wünsche dir von Herzen alles, alles Gute und viel Liebe! Du bist wirklich eine Bereicherung für uns Frauen!

**T-28 · Jasmin** – Retreat im Schwarzwald · Foto: vorhanden (wie bisher) · Status: bereit · *ersetzt den bisherigen Text von Jasmin*

> Mitten im wunderschönen Schwarzwald hat Elena einen Raum kreiert, in dem sich unterschiedliche Menschen kennenlernen, verbinden und zusammen heilen durften. Wir haben zusammen gelacht, geweint, gesungen und geschwiegen und uns dabei so angenommen, wie wir sind. Wir haben Geschichten geteilt, uns in den anderen wiedererkannt und unterstützt. Jeder Einzelne hat seine eigene Weisheit mitgebracht und geteilt, und es war wunderschön, ein Teil davon zu sein. Dabei hat uns Elena durch ihre Rituale, die Workshops, das Yoga, das Journaling und ihre Magie begleitet, sodass wir uns voll entfalten konnten. Vielen Dank, Ahey.

**T-29 · Nadine** – Silent Retreat · Foto: folgt · Status: Rückfrage (Brief-Einleitung weggelassen – ok?)

> Ich hatte mich schon, seit ich dir zugesagt hatte, auf das Wochenende gefreut, auf die Erlebnisse in Stille in der Gruppe und in mir – in der Natur. Bei dem Ort hast du wirklich nicht zu viel versprochen, so ein magischer Platz!
> Du hast ein so vielfältiges Programm geboten, mit ganz unterschiedlichen Methoden, Übungen und Ritualen. Ich fand den Mix aus Zeit in der Gruppe und Zeit für sich allein sehr ausgeglichen, das tat sehr gut. Die Reflexionsfragen zur Stille allein und mit anderen Menschen fand ich sehr, sehr spannend.
> Sehr schöne, verbindende Momente waren für mich das Eye Gazing, sich begegnen in der Bewegung und das ganz bewusste Wahrnehmen des Körpers, dabei viel Achtsamkeit. Auch den Lagerfeuerabend, an dem wir die Zettel mit den Ängsten herumgegeben und dann verbrannt haben, fand ich einen sehr besonderen Moment. Am Ende des Retreats fand ich die Medizinwanderung und die anschließende „warme Dusche“ mit lieben Worten an die anderen super schön.
> Sehr inspirierend und immer noch nachwirkend fand ich die Message des Retreats, mehr Stille in den Alltag zu integrieren, für sich, aber auch mehr Stille mit anderen Menschen zuzulassen und offen seine Bedürfnisse (z. B. nach Stille und im Hier und Jetzt sein) auszusprechen.
> Ich war und bin sehr beeindruckt, welchen Ort du dort mitgestaltet hast, wie viel Liebe du für Mutter Erde hast, wie sehr du dich authentisch gezeigt hast und wie viel du bisher schon gelernt hast und weitergibst. Man spürt sehr, wie wichtig dir die unterschiedlichen Themen sind und dass du so viel Energie in deine Retreats steckst. Danke für dein Gestalten, Kreieren, Dasein, deine Liebe und Energie und die vielen Erfahrungen, die ich auf verschiedensten Ebenen mit nach Hause nehmen konnte.

**T-30 · Hannes** – Silent Retreat · Foto: folgt · Status: bereit

> Das Schweigewochenende im Schwarzwald war für mich eine der intensivsten und gleichzeitig heilsamsten Erfahrungen der letzten Jahre. Elena und Daniel haben diesen Raum mit so viel Authentizität, Klarheit und Herz gehalten, dass ich mich vom ersten Moment an sicher und getragen gefühlt habe. Nichts wirkte aufgesetzt oder inszeniert – alles war echt, ruhig und voller Tiefe.
> Was mich bis heute am meisten beeindruckt, ist, was passiert, wenn man wirklich ein ganzes Wochenende in Stille verbringt. Es verändert alles. Der Geschmack des Essens wird intensiver, Gespräche werden durch Blicke ersetzt, und plötzlich entsteht eine Form von Verbundenheit, die ohne Worte tiefer geht als viele Gespräche. In dieser Stille begegnet man sich selbst auf eine ehrliche Weise – mit allem, was da ist. Und genau darin liegt so viel Selbstakzeptanz und Heilung.
> Trotz der Stille war so viel Nähe in der Gruppe spürbar. Elena und Daniel haben das mit einer unglaublichen Feinfühligkeit begleitet. Ich spreche heute – Jahre später – noch davon, weil es nachhaltig etwas in mir bewegt hat.
> Und dann dieser Ort: das Grundstück, die Natur, die Weite des Schwarzwalds – es hatte etwas Magisches. So kraftvoll und gleichzeitig so friedlich. Es war der perfekte Rahmen, um wirklich bei sich selbst anzukommen. Eine grandiose Erfahrung, die ich jedem nur empfehlen kann, der sich selbst wieder ein Stück näherkommen möchte.

**T-31 · Issi** – Elements of Life Retreat · Foto: folgt · Status: bereit

> Was für eine unbeschreiblich weiterbringende Zeit ich mit euch hatte! Gerne möchte ich erst einmal ein großes „Danke“ an euch senden, für eure Zeit, eure Ideen und eure Energie, die gefüllt war mit Offenheit, Präsenz und Authentizität.
> Euer täglich gleich strukturierter Tagesablauf hat mir immer wieder Sicherheit gegeben und die Orientierung, was am Tag passiert. So konnte ich mich jeden Tag mehr und mehr darauf einstellen und Struktur finden. Ich sage Danke dafür, dass ihr uns viel Raum für unsere Stimmen gegeben habt und dadurch Tag für Tag ein spannender Austausch stattfinden konnte. Ich spürte sofort, dass ich in einem Raum angekommen bin, der mir Zeit und Schutz gab, mich intensiv mit mir zu beschäftigen und dies auch am Ende des Tages mit allen teilen zu können. Denn dadurch hatte ich nach längerer Zeit mal wieder die Chance, Stärken und auch Schwächen von mir wahrzunehmen und diese zu akzeptieren, aber auch neu auf all die Kenntnisse zu schauen. Und eines ist mir dabei sehr klar geworden: „Ich bin gut und genug, so wie ich bin.“ Diese Erkenntnis wieder ins Gedächtnis zu rufen, war auf jeden Fall eines der wichtigsten Ergebnisse dieses Retreats.
> Durch die gut geleiteten Yoga-Nidra-Sessions wurden viele verschiedene Dinge in mir hervorgerufen, die mich haben weinen, aber auch lachen lassen. Meine erste Erfahrung mit Yoga Nidra hat mich weiter gebracht, als ich gedacht hätte. Danke dafür! Und auch wieder zur Natur zu finden, sich mit ihr zu verbinden und seinen westlichen Lebensstandard hinter sich zu lassen, war ein wichtiger Aspekt dieser Reise und hat mich wieder zu Mutter Erde und Mutter Natur zurückgeführt.
> Meine Resümees, die ich durch euch und eure intensive Arbeit erlangt habe: „Vergleiche dich nicht, du bist gut so, wie du bist.“ – „Ich muss nicht so sein wie andere.“ – „Ich bin eine Macherin. In meinem eigenen Tempo.“ – „Ich besitze emotionale Intelligenz.“ – „Ich kann alles schaffen, wenn ich will.“
> Nach dem Retreat bin ich gefühlt wie ein neuer Mensch in die rasante Welt zurückgekehrt und mit einem neuen (Selbst-)Bewusstsein aufgetreten. Durch all die Notizen, die ich mir gemacht habe, und eure täglich unterschiedlichen Fragen, die wir uns stellen sollten, kann ich jederzeit in die Zeit zurückkehren und mich immer wieder daran erinnern, welche Erkenntnisse ich gewonnen habe. Und das gibt mir Kraft und Sicherheit, meine positiven Energien immer wieder aufrufen zu können.
> Ich danke euch für eure Offenheit, diesen wundervollen, schönen Ort, die Kraft gebende Atmosphäre, eure Impulse und dafür, dass ihr einfach da wart, so wie ihr seid. Aho!

**T-32 · Sabrina** – Frauenretreat · Foto: folgt · Status: bereit

> Ich bin dir von Herzen dankbar, dass du solche wunderschönen Räume zum Wachsen wie das Frauenretreat schaffst. Auch jetzt, ein paar Wochen später, spüre ich noch, was diese Tage und das gemeinsame Erleben in mir bewirkt haben. Wie viel feinfühliger ich zu mir selbst, der Natur und meinen Mitmenschen bin. Aber auch, wie viel stärker ich für all das einstehen kann, was mir wichtig ist. Die gemeinsamen Meditationen, Gespräche, das Tanzen und Singen klingen noch immer in mir nach. Ich freue mich schon auf unser nächstes Wiedersehen.

**T-33 · Mareike** – Reading (1:1) · Foto: wie bei ihrer Onlinekurs-Stimme · Status: bereit (privater Schlusssatz weggelassen, von Elena bestätigt)

> Von Herzen vielen, vielen lieben Dank, Elena! Ich bin ganz beseelt und erfüllt von dem wundervollen Reading und deinen Worten. Du bist eine so besondere Frau mit einer ganz faszinierenden Aura und Anziehungskraft! Du hast so viele Gaben – die Welt braucht dich und dein Wirken! Ich bin sehr glücklich, zu dir – und mit den beiden ganz besonderen Readings auch immer mehr zu mir – gefunden zu haben. Danke!

**T-34 · Nadine** – Inner Child Retreat · Foto: folgt · Status: bereit · *(nicht dieselbe Stimme wie T-29)*

> Mein inneres Kind ist immer noch präsent und lacht eher mal mit als vorher und macht Quatsch. Das tut mir echt gut. Hab das Gefühl, dass etwas mehr Leichtigkeit und innere Ruhe seit dem Retreat da ist … und hoffe sehr, dass ich damit in Verbindung bleiben kann … Es gab, auch rückblickend, echt ein paar wichtige Momente in der Zeit mit euch, wo ich Erlebnisse transformieren konnte … zumindest scheint es im Moment so zu sein.

**T-35 · Paula** – Retreat · Foto: folgt · Status: bereit

> Unser Retreat letztes Jahr hat vieles in meinem Leben geändert, war ein richtiger Wendepunkt.

**Bisher schon auf der Website, bleiben unverändert:**
- **Mareike** (Text „Elena hat eine wunderbare Gabe …“, zum Onlinekurs) – bleibt, zusätzlich zu ihrer Reading-Stimme T-33
- **Jonas** (Text „Das Reading mit Elena war eine sehr besondere Erfahrung …“) – bleibt

### Nicht ins Karussell übernommen (Vorschlag)
Persönliche Nachrichten, keine Erfahrungsberichte: Tatjana („Hallo Elena! Ist erledigt …“), Melanies Nachricht zur Heilpraktiker-Ausbildung (der Dank daraus ist in T-23 enthalten). Aus den Nachrichten von Nadine („Liebe Schwestern! …“) und Paula sind nur die Ausschnitte in T-34 und T-35 übernommen.

### Hinweise
- **Einverständnis:** Für alle Stimmen mit Namen und Foto liegt idealerweise eine kurze Zustimmung der Person vor (Datenschutz). Elena klärt das.
- **T-17 (Medizin-Retreat):** Elena entscheidet, ob dieses Format auf der Startseite erscheinen soll.

---

## Offene Fragen an den Programmierer

- Ist die Website im Moment nur unter `elenajudith.tuni.site` erreichbar, und soll sie später unter `elenajudith.de` laufen?

## E-07 Wise In Her Ways (03.11.2026)
- New page from content/wise.json, text from elenajudith.de with typos fixed only (Geschenken, gehen, Menschheit).
- Left out: the Baldham, MAMA TREE and winter paragraphs and "Lass uns das Neue Jahr bewusst beginnen". They contradict St. Peter and the May date. The Stevy Want poem is left out for copyright reasons.
- Single photos and three carousels from the Drive folder. Song of the Soul duplicates removed.

## E-08 Retreat- und Kursübersicht (03.11.2026)
- /services/ now has tiles showing a real photo from each retreat and course, plus short teaser texts (content/overview.json).

## E-09 Onlinekurse (03.11.2026)
- Dreaming Reality and Archetypes (content/courses.json): texts from elenajudith.de, photos from elenajudith.de only, and the Katharina section removed. The Archetypes course is translated into German.
