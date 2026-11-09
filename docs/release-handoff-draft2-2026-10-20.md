# AI-Ops handoff: updated prototype · 20 October 2026

User authorization: “now ask AI-Ops to release this new version”, followed by “make sure the request goes to the same chat which released the first draft”.

Request sent to **Plan prototypes release rollout**, thread `01a05e59-94fa-7903-a6e7-52a54d22809a`, the same chat whose completed first activation was confirmed from its release evidence.

Target: https://elenajudith.tuni.site

Artifact: `releases/elenajudith-2026-10-20-draft2.tar.gz`

SHA-256: `1674ff061e85ab156ba809f98f82d8a415aa4e6efcb82a6c48213df5cf926cde`

Manifest: `releases/elenajudith-2026-10-20-draft2.manifest.json`

216 files, 14,923,725 archive bytes, 76 HTML pages. Every archive entry re-read and verified against its manifest checksum. Archive paths are relative to the static web root.

Scope: preserve Draft 1 at `/` and `/en/`; add Draft 2 at `/draft-2/` and `/en/draft-2/`, including the style selector, circular testimonial portraits and Impressum in both drafts and languages. Preserve noindex, cache handling, co-hosts and rollback. The original elenajudith.de domain is outside scope.

Status: request delivered. Publication and public verification remain the responsibility of the existing AI-Ops release chat; delivery is not confirmation of deployment.

## SEO follow-up

The user subsequently requested favicon, JSON and SEO additions. A new package was sent to the same AI-Ops chat for the authorized release sequence, without overwriting the bound earlier archive:

- Artifact: `releases/elenajudith-2026-10-20-draft2-seo.tar.gz`
- Manifest: `releases/elenajudith-2026-10-20-draft2-seo.manifest.json`
- SHA-256: `40ac6e198dca5bcd5b6fe65bb7aea789e6c9224aba45822ba37197f2472ccc34`
- 225 files; 15,194,284 bytes; 76 HTML pages. Entry contents verified against the manifest.
- Noindex/robots policy unchanged; no launch sitemap in this artifact. See `docs/seo.md`.

AI-Ops was instructed to use a separate replacement transaction if the preceding release is already applying/live, preserving immutable release bindings and rollback. Status: request delivered; public rollout of these additions not yet confirmed.
