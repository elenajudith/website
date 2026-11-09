# Elena Judith – editorialer Website-Entwurf

Lokaler, responsiver Entwurf in Tailwind CSS 4 und Vanilla JavaScript. Keine Sites-Abhängigkeit, kein React, keine externe Schrift- oder Bildauslieferung. Entwurf 1 umfasst die 16 bisherigen Routen; Entwurf 2 erweitert sie um Musik und Fotografie auf 18 Routen, jeweils auf Deutsch und Englisch. Entwurf 2 ist lokal implementiert und noch nicht an cms.xms angeschlossen oder veröffentlicht.

## Starten

```sh
npm ci
npm run images
npm run build
npm run check
npm run dev
```

Vorschau: http://127.0.0.1:4178/ (lokal). Nach Änderungen neu bauen und Browser neu laden. Optional anderer Port: `PORT=4179 npm run dev`.

## Bearbeiten

Die Anforderungen für den zweiten Entwurf stehen in [docs/second-draft.md](docs/second-draft.md): Drive-Ordnerstruktur und Bildverwendung, Entwurfsauswahl im Header sowie das wiederverwendbare „Ready for a revolution?“-CTA-Banner. Die Umsetzung ist lokal verfügbar: [Entwurf 2 Deutsch](http://127.0.0.1:4178/draft-2/) und [Draft 2 English](http://127.0.0.1:4178/en/draft-2/). Der Header enthält einen sprach- und seitenbewussten Entwurfswechsel.

- `content/site.json`: Navigation, Kontakt, Hero, Retreats, Kurse, Stimmen.
- `src/render.mjs`: gemeinsame Komponenten, Seitenstruktur und weitere redaktionelle Texte.
- `src/draft2.mjs`: zweite redaktionelle Gestaltung, Galerien, Musik, Fotografie und wiederverwendbares CTA-Banner.
- `src/drafts.mjs`: Entwurfsauswahl mit passender Unterseite und Sprachversion.
- `content/draft2.json`: Banner, Galeriezuordnung, zweisprachige Bildtexte und zusätzliche Retreat-Stimmen.
- `content/draft2-assets.json`: Quellen der 11 ausgewählten Drive-Originale und zwei zusätzlichen Porträts von der Originalwebsite.
- `src/styles.css`: Tailwind-Import, Design-Tokens, Komponenten und responsive Regeln.
- `src/main.js`: Menüs, Einblendung, Stimmenwechsel, Fotogalerien, optionaler SoundCloud-Player und E-Mail-/WhatsApp-Vorbereitung.
- `content/images.json`: Herkunft jedes verwendeten Fotos und optimierte Bildvarianten.
- `content/effects.json`: nachvollziehbare CMS-Katalog-Bindings und Anpassungen der Effektmuster.
- `content/source-pages.json`: Recherche-Snapshot der bisherigen Website.

## Inhalt & Gestaltung

Warme Naturtöne, großzügige Bildflächen, Serifentypografie und zurückhaltende Bewegung. Bestehende Angebote bleiben inhaltlich erkennbar. Die neuen Texte sind redaktionelle Entwürfe auf Basis der bestehenden Website und vor Veröffentlichung mit Elena abzustimmen.

Die Startseite zeigt Person/Haltung, individuelle und gemeinsame Angebote, drei Retreat-Formate, Teilnehmerstimmen, Musik und Kontakt. Vergangene Veranstaltungen erscheinen als Rückblicke; keine abgelaufenen Buchungsfristen oder erfundenen neuen Termine.

Fotos stammen ausschließlich aus elenajudith.de und den freigegebenen Drive-Ordnern. Entwurf 2 nutzt elf zusätzlich ausgewählte Drive-Originale, darunter die Gartenaufnahme in voller Auflösung, sowie die zugeordneten Retreat-Porträts von Lisa und Sabrina aus der Originalwebsite. Insgesamt sind 44 freigegebene Fotos mit jeweils drei lokal optimierten WebP-Varianten verfügbar. `assets/originals` bewahrt die Ausgangsdateien, `content/images.json` die Quellen. Keine KI- oder zusätzlichen Stockbilder.

## Effekte und XMS-Übergabe

Der untersuchte zentrale XMS-Effektbereich ist noch geplant. Verwendet werden zwei konkrete, im vorhandenen Content-Katalog gebundene Muster aus Waszählt-Komponenten: 450-ms-Einblendung und 400-ms-Bildbewegung. Die Bewegung wurde für diese Seite reduziert. Dies sind dokumentierte Adaptionen, keine bereits angeschlossenen XMS-Registry-Module.

`data-section` markiert die Startseiten-Bausteine, `data-effect` die Einblendungen. Für den späteren XMS-Import: Navigation und Listen aus `content/site.json` auf Collections abbilden; gemeinsame Template-Bausteine in `src/render.mjs` als Renderer übertragen; weitere Seitentexte aus den Templates in CMS-Felder verschieben; Bilder anhand `content/images.json` importieren. Design-Tokens und JavaScript sind unabhängig nutzbar.

## Kontakt und Veröffentlichungsstand

Das Formular bereitet eine E-Mail im lokalen E-Mail-Programm vor; Entwurf 2 bietet zusätzlich einen WhatsApp-Nachrichtenentwurf. Es gibt keinen Backend-Versand und keine Speicherung, Newsletter-Anmeldung oder Zahlungsabwicklung. Der SoundCloud-Player lädt erst nach ausdrücklichem Klick und startet nicht automatisch. Die vorhandenen öffentlichen Kontakt- und Social-Links sind integriert. Vor einer Veröffentlichung folgen der tatsächliche XMS-Anschluss, finale Textfreigabe und die vom Kunden gelieferten Rechtstexte. Alle erzeugten Seiten sind aktuell `noindex,nofollow`.

## Prüfungen

`npm run check` prüft erzeugte Seiten, lokale Links und Assets, Sprungmarken, eindeutige IDs, H1-Struktur, Bildherkunft und Disclosure-Ziele. Die Browserprüfung ist in `docs/verification.md` festgehalten.

## Sprachen: Deutsch und Englisch

Alle 16 Seiten werden in beiden Sprachen gebaut: Deutsch unter `/`, Englisch unter `/en/`. Der DE/EN-Schalter führt zur entsprechenden Unterseite; Sprungmarken und vorausgewählte Anfragethemen bleiben erhalten. Externe Social-Links und Bilddateien sind für beide Versionen identisch.

`content/locales/en.json` enthält die redaktionelle englische Übersetzung einschließlich Metadaten, Alternativtexten und Bedienhinweisen. `src/localize.mjs` wendet sie beim Build auf die gemeinsamen Templates an. Neue deutsche Texte benötigen einen passenden Eintrag im Übersetzungswörterbuch; der Build meldet fehlende Übersetzungen ausdrücklich. Die Übersetzungen werden als fertiges HTML ausgeliefert, ohne Übersetzungsdienst im Browser. Teilnehmerstimmen sind als Übersetzungen gekennzeichnet. Für den späteren XMS-Import sind beide Sprachfassungen als lokalisierte Inhaltsfelder zu übernehmen.


Entwurf 2 verwendet dieselbe Sprachgrundlage plus explizite DE/EN-Texte in `src/draft2.mjs` und `content/draft2.json`. Seine 18 Seiten liegen unter `/draft-2/` und `/en/draft-2/`; der Sprachwechsel erhält auch den Entwurf. Das gemeinsame Revolution-Banner bleibt auf beiden Sprachfassungen auf Englisch. Insgesamt entstehen 68 Inhaltsseiten und vier passende 404-Seiten.

## Gestaltungsstile

Der Header bietet zusätzlich zur Entwurfsauswahl einen Stil-Schalter mit Farbfeldern: **Linen** (bestehende Creme-/Olive-Gestaltung), **Atelier** (Georgia, Ton/Rosé, gerundete Buttons und Bogenbilder) und **Gallery** (DM Sans, Kreide/Schiefer, klare rechteckige Bildflächen). Das Bedienmuster orientiert sich an `imaego/website/js/themes.js`; die Umsetzung bleibt eigenständiges Vanilla JavaScript mit lokal ausgelieferten Schriften bzw. Systemschriften.

Ohne gespeicherte Auswahl startet Entwurf 1 in Linen und Entwurf 2 in Atelier. Eine explizite Auswahl gilt für beide Entwürfe und Sprachen und wird unter `elena-judith-style` im Browser gespeichert. `src/styles-select.js` stellt sie vor dem ersten CSS-Paint wieder her; bei blockiertem Speicher funktioniert der Wechsel weiterhin auf der aktuellen Seite. CSS-Presets stehen am Ende von `src/styles.css`, Auswahlmarkierung und Interaktion in `src/main.js`, Header-Markup in `src/drafts.mjs`.

Teilnehmerporträts sind in beiden Entwürfen und allen Stilen kreisförmig. Namen, Zuordnung und bestehende Überblendung bleiben erhalten.

## Favicon, JSON-LD und SEO

[docs/seo.md](docs/seo.md) dokumentiert Favicons, Webmanifest, Canonicals, Sprachalternativen, Social-Metadaten, strukturierte Daten und die spätere Sitemap-Freigabe. Die Einstellungen stehen in `content/seo.json`. Der aktuelle Review-Build bleibt **noindex**; die Veröffentlichung dieses Updates aktiviert keine Suchmaschinenindexierung. `npm run check` umfasst auch die SEO-Prüfung.
