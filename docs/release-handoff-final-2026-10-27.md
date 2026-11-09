# AI-Ops – finale Website, 27.10.2026

Ziel: https://elenajudith.tuni.site

Bestehender Release-Chat: `01a05e59-94fa-7903-a6e7-52a54d22809a`, aktuell **Ai-Ops :: Prozess Audit**, früher „Plan prototypes release rollout“. Derselbe Chat wie für die bisherigen Elena-Judith-Releases.

Nutzerentscheidung: „die anderen Entwürfe sollen aus de Header entkopelt werden und einfach auf der Repo archiviert werden. Nur der neue Entwurf soll auf der Webseite für Production zu sehen sein“. Frühere ausdrückliche Release-Beauftragung an genau diesen AI-Ops-Chat bleibt der Übergabeweg.

## Unveränderliches Artefakt

- Paket: `releases/elenajudith-2026-10-27-final.tar.gz`
- SHA-256: `a4aaf605cee0de861effab583b6104797c617ceddd177f8b20dc9f4d42f2d050`
- Manifest: `releases/elenajudith-2026-10-27-final.manifest.json`
- Größe: 18.866.450 Bytes; 242 Dateien; 40 HTML-Dateien (19 Seiten je Sprache plus 404).
- Archivpfade relativ zum Webroot; sämtliche Einträge nach Erstellung gegen Manifest geprüft.

Nur dieses geprüfte Paket ausliefern, nicht neu bauen oder mit alten Releases vermischen. In einen neuen Release-Ordner extrahieren und atomar aktivieren. Vorigen Release für Rollback behalten, aber nicht öffentlich als Entwurf anbieten. Projektarchiv und Quellen niemals in den Webroot kopieren.

## Routing

Die finale Fassung liegt unter `/` und `/en/`. Keine `/draft-2/`-Dateien im Artefakt.

Vor dem File-Handler und spezifisch für diesen Host:

- `/draft-2` und `/draft-2/` → `/`
- `/draft-2/<suffix>` → `/<suffix>`
- `/en/draft-2` und `/en/draft-2/` → `/en/`
- `/en/draft-2/<suffix>` → `/en/<suffix>`

Status 308, Query-String unverändert erhalten. Nicht auf die Startseite umleiten, wenn eine entsprechende Unterseite existiert. Lokaler Vorschauserver implementiert und verifiziert dieses Verhalten. Alte Source-Entwürfe sind separat unter `archive/2026-10-27-previous-drafts/` gesichert.

## Inhalt und Prüfungen

Linen mit Atelier-Bögen, kreisrunde Testimonials, keine Stil-/Entwurfswahl. Verbatim-Import aus Originalwebsite und vier aktuellen Drive-ODTs, About nur aus Drive, vollständige Originalstimmen plus neue Yoga-/Reading-Stimmen. Vergangene Termine als Rückblick, keine erfundenen kommenden Termine.

`npm run build && npm run check` erfolgreich: alle 40 Seiten, 1.850 lokale Links/Assets, Provenienz, SEO/JSON-LD/Icons, isolierter Sitemap-Test; 416 Originalblöcke, 86 Originalstimmen, 158 Drive-Absätze über beide Navigationssprachen abgeglichen. Desktop/Mobile, Navigation, Portraitform, Stimmenwechsel, Query-erhaltende Weiterleitung und Browserfehler geprüft.

Indexierung bleibt wie bisher deaktiviert; robots.txt und X-Robots-Tag/noindex-Vertrag erhalten. Keine DNS-/Mail-/Datenbank-/anderen Host-Änderungen. Originaldomain elenajudith.de bleibt außerhalb des Auftrags.

Öffentlich verifizieren: `/`, `/en/`, `/about/`, `/11-sessions/`, `/yoga-nidra/`, `/contact/`, `/impressum/`, Favicon; alte Entwurf-URLs mit Unterseite/Query; echte 404; keine sichtbare Variantenwahl, keine alten Entwurfsdateien. Infrastruktur-Freigaben nach bestehendem AI-Ops-Vertrag behandeln, keine Freigabe erfinden.

Offene clientseitige Inhalte/Anbindungen stehen in `docs/final-content-actions-2026-10-27.md`. Formulare sind persönliche E-Mail-/WhatsApp-Anfragen; kein Backendversand oder Checkout. Wortlautfehler in der Quelle bleiben entsprechend der Nutzeranweisung erhalten.

Status: Release-Auftrag am 27.10.2026 erfolgreich an denselben AI-Ops-Chat übergeben. Öffentliche Aktivierung und Verifikation noch nicht bestätigt.
