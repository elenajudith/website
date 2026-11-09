# Verifikation · 14. Oktober 2026

Besucher finden über Startseite und Navigation ein Angebot, öffnen dessen eigene Seite und gelangen zu einer Kontaktanfrage mit vorausgewähltem Thema.

| Prüfung | Ergebnis |
| --- | --- |
| Build | Tailwind CSS 4.1.14, 16 Seiten plus 404 erfolgreich gebaut |
| Statische Integrität | 17 HTML-Dateien, 583 lokale Links/Assets, Sprungmarken, H1, IDs und Disclosure-Ziele geprüft |
| Bildquellen | 31 freigegebene Fotos, jeweils drei lokal erzeugte WebP-Dateien; Quellen in content/images.json |
| Desktop | Startseite bei 1280 px visuell geprüft; Header, Hero, Angebotsbereich und Stimmen |
| Mobile | Startseite, Menü und Kursdetail bei 390 px; Kontakt bei 320 px |
| Schmale Seiten | Alle 16 Routen auf horizontale Überbreite bei 320 px geprüft. Zwei lange Überschriften auf Über-Elena/Schamanisches-Retreat korrigiert und anschließend geprüft |
| Navigation | Desktop-Untermenü öffnet, Escape schließt. Mobile Unterrubrik Onlinekurse öffnet Übersicht am passenden Anker und Menü schließt |
| Teilnehmerstimmen | Weiter-Schaltfläche zeigt Jonas und aktualisiert Zähler auf 02 / 03 |
| Kontakt | Kurs aus URL korrekt vorausgewählt; Textfeld befüllbar, native Validität korrekt |
| JavaScript | Syntaxchecks erfolgreich, bei Browserprüfung keine Console-Warnungen/-Fehler |
| Reduzierte Bewegung | CSS/JS berücksichtigen prefers-reduced-motion; ohne JS bleibt Inhalt sichtbar (Codeprüfung) |

Kontaktversand wurde nicht ausgelöst. Das Formular bereitet ausschließlich einen mailto-Link vor; tatsächlicher Versand erfolgt im E-Mail-Programm des Besuchers. Keine Backend-, CMS- oder Veröffentlichungstests, da diese Integrationen noch nicht angeschlossen sind. Keine vollständige Barrierefreiheitszertifizierung oder Prüfung externer Social-Plattformen.

Vorschau: http://127.0.0.1:4178/

## Erweiterung: Englisch · 14. Oktober 2026

- 32 Inhaltsseiten und zwei sprachspezifische 404-Seiten erfolgreich gebaut.
- 1.302 lokale Links/Assets sowie Sprachattribute, Sprachalternativen, Navigation innerhalb der Sprachversion und ursprüngliche Social-Links geprüft.
- DE → EN auf der Kontaktseite im Browser erfolgreich; englisches Mobilmenü öffnet/schließt mit korrekten Beschriftungen, Untermenü und Escape funktionieren.
- `Kraft meiner Wurzeln` bleibt als stabiler Themenwert erhalten und erscheint als `The Strength of My Roots` im englischen Kontaktformular. DE-Rücklink erhält die Anfrageparameter.
- Alle 16 englischen Seiten bei 320 px ohne horizontale Überbreite; Navigation bei 901 px visuell geprüft.
- Keine externe Nachrichtenübermittlung ausgelöst.

## Testimonials: Porträts und Überblendung

Porträts auf Desktop 200 × 240 px, Namen 42 px; Mobil 128 × 154 px und Namen 36 px. Gemeinsame Überblendung von Porträt, Zitat und Name über 800 ms, automatischer Wechsel im sichtbaren Bereich im Abstand von neun Sekunden. Pause/Abspielen und Vor/Zurück sind auf Deutsch und Englisch verfügbar. Automatik pausiert bei Maus über dem Zitat, Tastaturfokus und ausgeblendetem Tab; bei reduzierter Bewegung nur manueller Wechsel ohne Animation. Die Höhe richtet sich nach der höchsten Stimme, um Layoutsprünge zu vermeiden. Jonas hat kein zugeordnetes Foto und erscheint mit einer klar erkennbaren Initiale.

Build, Übersetzungsvollständigkeit, 1.302 lokale Links/Assets und JavaScript-Syntax erfolgreich geprüft.


## Zweiter Entwurf · 20. Oktober 2026

- Bildpipeline und Build erfolgreich: 44 freigegebene Bilder mit drei WebP-Größen, 68 Inhaltsseiten und vier 404-Seiten über beide Entwürfe und Sprachen.
- `npm run check`: 72 HTML-Dateien und 3.066 lokale Links/Assets erfolgreich geprüft. Zusätzliche Prüfungen umfassen Entwurfsgrenzen, Sprachwechsel, exakten Bannertext, gültige Anfragethemen/-arten, fehlende vorzeitig geladene SoundCloud-Iframes und die Zuordnung der Retreat-Stimmen.
- Desktop: deutsche und englische Startseite bei 1280 px visuell geprüft; Entwurf 2 → Entwurf 1 → Entwurf 2 und Sprachwechsel erfolgreich.
- Mobil: tatsächliche Browserbreite 390 px. Startseite, Angebote, Über Elena, Musik, Fotografie und das umbenannte Retreat ohne horizontale Überbreite oder defekte geladene Bilder. Mobile Navigation einschließlich Entwurfsauswahl, Untermenü und Escape geprüft. Für Entwurf 2 wird kein 320-px-Browsertest behauptet.
- Inner Child: Galerie-Weiter-Schaltfläche zeigt Bild 02 / 04; Testimonials lassen sich pausieren und zu Lisa bzw. Sabrina mit zugehörigem Porträt wechseln. Alle drei Stimmen stammen aus Retreat-Kontexten.
- Revolution-Banner mobil visuell geprüft. Klick auf einem Retreat öffnet die passende Sprach-/Entwurfs-Kontaktseite mit vorausgewähltem Thema und Anfrageart. Der Sprachwechsel erhält diese Werte.
- Kontaktformular mit harmloser Beispielnachricht geprüft: WhatsApp-Link enthält die Nachricht und das Angebot; keine Nachricht versendet und kein externer Senden-Button betätigt.
- SoundCloud: vor dem Klick kein Player-Iframe; danach tatsächlicher Cambia-Player mit Titel und Bedienelementen sichtbar. Keine Audiowiedergabe ausgelöst.
- Abschließende Browserdiagnostik meldete keine Warnungen/Fehler. Reduzierte Bewegung wird durch CSS/JS berücksichtigt; dies ist eine Codeprüfung, keine Prüfung mit geänderter Betriebssystemeinstellung.
- Vorschau läuft lokal. Keine Backend-, Zahlungs-, Newsletter-, CMS- oder Produktionsprüfung; diese Integrationen sind nicht angeschlossen.

Screenshots in `docs/screenshots/`:

- `draft2-home-desktop.jpg`: deutsche Desktop-Startseite.
- `draft2-home-english.jpg`: englische Desktop-Startseite.
- `draft2-home-mobile.jpg`: englische mobile Startseite.
- `draft2-banner-mobile.jpg`: vollständiger mobiler CTA mit Footer.
- `draft2-testimonials-mobile.jpg`: vergrößertes Sabrina-Porträt, Name und Zitat.

## Stil-Auswahl und runde Porträts · 20. Oktober 2026

- Drei unabhängig vom Inhaltsentwurf wählbare CSS-Stile: Linen, Atelier und Gallery. Vorlage für das Interaktionsmuster: IMAEGO, `website/js/themes.js` und `website/js/layout.js`.
- Build und JavaScript-Syntax erfolgreich; bestehende Integritätsprüfung: 72 HTML-Dateien und 3.138 lokale Links/Assets.
- Browser: alle drei Optionen schalten tatsächlich Schrift und Palette um. Desktop-Dropdown bei 1280 px und mobiles Menü bei 390 px geprüft; aktuelle Auswahl eindeutig markiert.
- Auswahl bleibt nach Navigation DE → EN und Entwurf 2 → Entwurf 1 erhalten. Der abschließende lokale Preview steht auf Atelier.
- Langes Retreat-Heading in allen drei Stilen bei 390 px ohne horizontale Überbreite; Gallery und Atelier auf der englischen Desktop-Startseite ebenfalls ohne Überbreite.
- Porträts in Entwurf 2 gemessen: Desktop 220 × 220 px, Mobil 140 × 140 px, jeweils 50 % Radius. Im Browser sichtbar kreisförmig; Fade-Steuerung bleibt unverändert.
- Keine Console-Warnungen/-Fehler in der abschließenden Browserabfrage. Temporäre Viewport-Vorgabe zurückgesetzt.
- Screenshots: `screenshots/style-selector-gallery.jpg`, `screenshots/styles-circular-testimonial.jpg`.
