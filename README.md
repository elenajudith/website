# Elena Judith – finale Website

Tailwind CSS 4 und Vanilla JavaScript, vorbereitet für die spätere Übernahme in cms.xms. Einzige Gestaltung: **Linen mit den bogenförmigen Atelier-Fotos**, kreisrunde Testimonial-Porträts. Keine Sites-Abhängigkeit und keine Entwurfs- oder Stil-Auswahl.

Quellcode-Repository: [Tunisite/elenajudith](https://github.com/Tunisite/elenajudith) (privat). Fotos, Inhaltsquellen und archivierte Entwürfe gehören zum Repository. Generierte Dateien in `dist/`, Abhängigkeiten und Release-Tarballs werden nicht eingecheckt; Release-Manifeste bleiben nachvollziehbar versioniert. Ein Push veröffentlicht die Website nicht automatisch; die Auslieferung erfolgt weiterhin über AI-Ops.

## Lokal arbeiten

```sh
npm ci
npm run build
npm run check
npm run dev
```

Vorschau: http://127.0.0.1:4178/ und http://127.0.0.1:4178/en/. Der Build enthält 19 Seiten pro Navigation-Sprache und zwei 404-Seiten. Alte `/draft-2/`-Adressen werden im Vorschauserver auf die finale Entsprechung umgeleitet. Beim Release müssen dieselben Regeln am Webserver eingerichtet werden.

## Quellen und Bearbeitung

- `src/final.mjs`: finale Zusammenstellung und unveränderte Quelltexte.
- `src/design.mjs`, `src/render.mjs`, `src/localize.mjs`: gemeinsame Layout-Bausteine, Galerien und lokalisierte Bedienoberfläche; kein separater Entwurfs-Build.
- `src/styles.css`, `src/main.js`: Linen, Fotoformen, Navigation, Galerien, Testimonials, Kontaktaktionen.
- `content/original-2026-10-27.json`: Textblöcke der 15 Originalseiten. Alte persönliche Biografien werden durch Drive ersetzt.
- `content/drive-texts-2026-10-27.json`: vier ODT-Dokumente, wortgetreu extrahiert. Die versehentliche Tabelle im About-Dokument wird als Text dargestellt.
- `content/source-testimonials.json`: vollständige Originalstimmen mit belegter Porträt-Zuordnung.
- `content/images.json`: Herkunft und lokale WebP-Varianten aller verfügbaren Fotos.
- `content/sources/`: unveränderte HTML- und ODT-Quellen.
- `docs/final-content-actions-2026-10-27.md`: Drive-Struktur, umgesetzte Maßnahmen und offene Inhalte.
- `archive/2026-10-27-previous-drafts/`: wiederherstellbare Sicherung der bisherigen Entwürfe, außerhalb von `dist`.

Die aktuelle Anweisung „Texte ohne Veränderung“ hat Vorrang vor den früheren Übersetzungsentwürfen: Navigation und Bedienung sind DE/EN; importierte Inhalte behalten ihre Originalsprache. Neue Übersetzungen benötigen eigene freigegebene Quelltexte.

## Prüfen und veröffentlichen

`npm run check` prüft lokale Links, Bilderherkunft, Header ohne Variantenwahl, Sprachwechsel, JSON-LD, Icons, SEO und wortgetreue Übereinstimmung mit den erfassten Quellen. Indexierung bleibt für die Kunden-Vorschau deaktiviert. Der isolierte SEO-Test prüft zusätzlich den späteren 38-URL-Sitemap-Build.

Nur `dist/` deployen. Alte Releases nicht überschreiben, sondern einen neuen vollständigen Release-Ordner aktivieren; sonst könnten veraltete Entwurfsdateien auf dem Server verbleiben. Das Archiv niemals in den öffentlichen Webroot kopieren.

Formulare bereiten E-Mail/WhatsApp vor. Keine Zahlungsabwicklung, automatische Warteliste oder Newsletter-Speicherung. SoundCloud wird erst nach Klick geladen. Social-Links und Impressum bleiben erhalten.

Bekannter Darstellungsfehler, festgestellt am 28.10.2026: Auf `/services/` können ausgeblendete lange Testimonials den scrollbaren Bereich bis unter den Footer verlängern. Dieser Repository-Import enthält den bestehenden Stand; die Korrektur ist noch offen.
