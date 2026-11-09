# Search and sharing metadata

Implemented 20 October 2026 in `src/seo.mjs`, `scripts/brand-assets.mjs` and `content/seo.json`.

## Current review build

- Origin is `https://elenajudith.tuni.site`; all four draft/language trees have absolute self-canonicals and reciprocal DE/EN plus x-default alternate URLs.
- Page-specific titles and localized introductory descriptions feed Open Graph and Twitter card tags. Social images use a JPEG conversion of the approved garden photograph; dimensions and translated alt descriptions are included.
- JSON-LD contains Person (Elena Judith, alternate name Elena Fritsch), WebSite, WebPage/AboutPage/ContactPage and, where a visible breadcrumb exists, BreadcrumbList. No invented event dates, ratings, credentials or offers are emitted.
- The existing olive e. monogram is supplied as SVG, PNG (32/96/180/192/512 px), ICO and Apple touch icon. A small JSON web manifest uses browser display mode; it does not claim offline/PWA functionality.
- Charset remains the first head element. Metadata is static HTML and does not depend on client-side JavaScript. The preview server serves icon, JSON/manifest, text and XML MIME types.
- All pages remain noindex/nofollow. `robots.txt` retains the existing review-host Disallow policy. No sitemap is emitted or advertised in this mode. 404 pages have no canonical, language alternates or JSON-LD and remain actual HTTP 404 responses.

## Launch configuration

Before a separately authorized search-indexed launch, confirm the final domain. Update `origin` and `indexable` in `content/seo.json`, retain `publishedDraft: 1` for the final root routes, and rebuild. The build contains only the final website at `/` and `/en/`. Its 38 content URLs enter the launch sitemap; archived drafts are never built. AI-Ops must redirect `/draft-2/*` to `/*` and `/en/draft-2/*` to `/en/*` while preserving queries.

AI-Ops must also reconcile the deployed X-Robots-Tag and robots.txt policy. Leaving a server-wide noindex header would override an indexable HTML page. Do not submit the current review domain to Search Console. No account creation, site verification, analytics or search-engine submission was performed.

Disallow blocks crawling, whereas noindex requires a crawler to fetch the page. Their combination preserves the existing review-host contract; it is not a guarantee of removing a URL already known to search engines. If removal is required, coordinate crawl access/noindex or access control with AI-Ops.

## Validation

`npm run check` now includes `scripts/check-seo.mjs`: all 40 final HTML pages, JSON parsing and graph identity, canonical/OG URL agreement, reciprocal language alternatives, social-image dimensions and manifest icon files. An isolated temporary launch build verifies 38 final URLs in its sitemap, excludes archived drafts and 404 pages, and checks return to preview mode. The live local preview remains noindex. Browser inspection verified delivered metadata and icon links. This is code/build validation, not a guarantee of rich results or a completed Search Console audit.

## Reference specifications

- [Google favicon guidelines](https://developers.google.com/search/docs/appearance/favicon-in-search)
- [Google noindex documentation](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Open Graph protocol](https://ogp.me/)
- [Schema.org Person](https://schema.org/Person)
