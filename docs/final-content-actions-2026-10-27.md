# Finale Fassung – Quellen und Maßnahmen vom 27.10.2026

## Verbindliche Gestaltung und Auslieferung

Bestätigt: **Linen + Atelier: oben abgerundete, bogenförmige Fotos**. Testimonial-Porträts bleiben rund, Namen groß. Header und mobile Navigation enthalten keine Entwurfs- oder Stilwahl. Alte gespeicherte Stilpräferenzen werden nicht mehr geladen.

`dist/` enthält ausschließlich die finale Website unter `/` und `/en/`: 19 Seiten pro Sprache, dazu zwei 404-Seiten. Die bisherigen Entwürfe liegen als wiederherstellbare Quellsicherung unter `archive/2026-10-27-previous-drafts/`; frühere Release-Pakete bleiben erhalten. Das Archiv wird nicht ausgeliefert. Der lokale Projektordner ist kein Git-Checkout; kein Commit wurde erzeugt.

## Drive-Struktur und Verwendung

Quelle: [Website-Ordner](https://drive.google.com/drive/folders/13TcjBH7K9PHv_8CvNmtejhUaiTgp3DcR), [Checkliste](https://docs.google.com/document/d/1IMz2B0YfLxThDjNMhbKVYNnH5TLy3QPNFnhQpNDNcpk/edit). Gesicherte Metadaten: `content/drive-audit-2026-10-27.json`; vollständige Checkliste: `content/checklist-2026-10-27.txt`.

13 Themenordner, unverändert 327 Bilddateien einschließlich Duplikaten und vier neue ODT-Dokumente. Der zuvor geprüfte Unterordner Fotos Orgiva ist leer. Die Bestandsaufnahme ist ein Snapshot, keine laufende Synchronisation.

| Ordner | Bilder | Textdokumente | Zuordnung |
| --- | ---: | ---: | --- |
| about me website | 45 | 1 | Startseiten-Vorstellung und vollständige About-Seite |
| Astrologie & Human Design | 0 | 2 | Englischer Originaltext und vier Reading-Stimmen auf `/11-sessions/` |
| Yoga Nidra | 32 | 1 | Yoga-Seite mit Originaltext und vier neuen englischen Stimmen |
| Wise In Her Ways Retreat | 85 | 0 | Retreat-Seite, Übersicht, Galerie |
| Musik | 54 | 0 | Musikseite, Startseite, Galerie |
| inner child retreat | 36 | 0 | Retreat-Seite und Galerie |
| Schamanisches Retreat | 27 | 0 | Anzeige „We´re the ones we´ve been waiting for“, kompatible URL bleibt |
| song of the soul retreat | 24 | 0 | Retreat-Seite und Galerie |
| Schweigewochenende | 12 | 0 | Retreat-Seite und Galerie |
| Kambo | 7 | 0 | Kambo-Seite; zusätzliche Auswahl/Froschfreistellung noch offen |
| mood pics für irgendwo auf der website | 5 | 0 | Freigegebene ergänzende Bildauswahl |
| Dreaming Reality online Kurs | 0 | 0 | Originaltexte und vorhandene freigegebene Bilder |
| Kraft meiner Wurzeln Retreat | 0 | 0 | Originaltexte und vorhandene freigegebene Bilder |

Die Bilder werden kuratiert verwendet, nicht vollständig als 327-Dateien-Galerie importiert. Zuordnung und Provenienz der tatsächlich vorbereiteten Bilder stehen in `content/images.json`. Alle zusätzlichen Testimonial-Porträts stammen aus dem jeweils zugehörigen HTML der Originalwebsite. Gleichnamige Personen in neuen Drive-Stimmen erhalten ohne Beleg kein altes Porträt.

## Umgesetzt

- Vier ODT-Dokumente vollständig extrahiert und als Quellen gespeichert. 44 About-Absätze einschließlich der versehentlich als Tabelle formatierten Schlusszeilen werden als normaler Text dargestellt.
- Alte persönliche Elena-Biografien, auch innerhalb von Retreat-/Kursseiten, durch Drive ersetzt. Gemeinsame Kursvorstellung mit Katharina und Steffens Vorstellung bleiben Originalmaterial.
- 15 Originalseiten erfasst. 208 unterschiedliche relevante Textblöcke und 43 vollständige Testimonials je Navigationssprache übernommen. Identische responsive Duplikate, dekorative Widgets und nicht funktionierende Plugin-Shortcodes werden nicht wiederholt.
- Yoga- und Reading-Stimmen aus Drive auf den passenden Seiten ergänzt. Vollständige Texte statt der früheren redaktionellen Auszüge. Der sanfte Wechsel bleibt verfügbar; lange Stimmen starten manuell, damit sie in Ruhe gelesen werden können.
- Ursprüngliche Texte behalten ihre Sprache und auch eventuelle Tippfehler. DE/EN übersetzt die Navigation und Bedienung, nicht die neu importierten Inhalte. Für neue Übersetzungen braucht es freigegebene Texte.
- Vergangene Retreats als Rückblick gekennzeichnet; historische Datumsblöcke ausklappbar. Keine erfundenen neuen Termine.
- Ungeprüfte redaktionelle Retreat-Zusammenfassungen entfernt; bis zu neuen Zusammenfassungen zeigen Karten Titel, Kategorie, Foto und Link.
- Header-Motto, Social-Links, Etsy-Link, SoundCloud auf Klick, Kontaktformular mit E-Mail/WhatsApp und kontextuelle Kurs-/Retreat-Anfragen erhalten. Englischer Revolution-Banner auf allen Inhaltsseiten, mit dem direkt vom Nutzer bestätigten Wortlaut.
- Impressum, TuniSite-Copyright-Link, Favicons, JSON-LD, Sprachverweise und SEO-Metadaten erhalten. Kunden-Vorschau bleibt noindex.

## Maßnahmen aus der Checkliste, die noch offen sind

| Thema | Nächster konkreter Schritt | Grund / Status |
| --- | --- | --- |
| Reading-Text | Kundin korrigiert Absatz 4 im ODT (Index 3), danach erneut wortgetreu importieren | Satz bricht bei „then how could thhave been working…“ ab; absichtlich nicht eigenmächtig korrigiert |
| Neue Termine | Bestätigte Veranstaltung, Datum, Ort, Preis/Anfrageweg liefern | Derzeit keine bestätigten kommenden Termine in den Quellen |
| Retreat-Kurztexte | Neue Zusammenfassungen der Kundin importieren | Checkliste kündigt Überarbeitung an |
| Photography | Finalen Text, Portfolio und zugehörige Stimmen liefern | Aktuell bleibt die knappe Anfrage-Seite; kein erfundenes Portfolio |
| Telegram | Echte Kanal-URL liefern | Originalwebsite verknüpft „WhatsApp / Telegram“ mit einer Telefonnummer, nicht mit einem Kanal |
| Newsletter | Anbieter, Liste, Einwilligungstext und Versandprozess festlegen | Bisher Frage in der Checkliste, keine bestehende Integration; keine vorgetäuschte Anmeldung |
| Instagram-Vorschau | Konkrete Posts bzw. autorisierte Feed-Integration festlegen | Profil verlinkt; kein Scraping und kein ungefragter externer Feed |
| Logo | Finale Logo-Datei ohne „astraljourney“ zuordnen | Typografischer Name und vorhandenes EJ-Favicon bleiben bis dahin |
| Kambo | Froschmotiv auswählen/freistellen und Kambo-spezifische Stimmen liefern | Freistellung nicht umgesetzt; keine Reading-/Retreat-Stimmen als Kambo-Erfahrung dargestellt |
| Fotografie-Stimmen | Freigegebene Zitate mit Zuordnung liefern | Noch nicht vorhanden |
| YouTube / Konzerte | Gewünschte Videos und bestätigte Konzert-/DJ-Termine liefern | Kanal verlinkt; SoundCloud-Vorschau auf Klick vorhanden |
| Kauf / Warteliste | Bei Bedarf tatsächlichen Zahlungs-/Listenprozess definieren | Aktuell ehrliche persönliche Anfrage, keine automatische Buchung oder Zahlung |

## Verifikation und Release-Grenze

`npm run build && npm run check` erfolgreich: 40 HTML-Dateien, 1.850 lokale Links/Assets, Bilderherkunft, eindeutige Überschriften/IDs, Navigation ohne Entwürfe, SEO/JSON-LD/Icons und isolierter Launch-Sitemap-Test. Wortlautvergleich: 416 Originalblöcke, 86 Originalstimmen, 158 Drive-Absätze über beide Sprachfassungen.

Browserprüfung: Desktop-Startseite, mobile Navigation bei 390 px, Reading-Seite, Testimonial-Wechsel und runde Porträts. Alte lokale `/draft-2/yoga-nidra/?check=redirect`-Adresse leitet auf `/yoga-nidra/?check=redirect` weiter. Die Serverregeln müssen beim Release zusätzlich eingerichtet werden.
