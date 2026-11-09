> Historischer Stand vom 20.10.2026. Seit 27.10.2026 ersetzt durch [die finale Fassung](final-content-actions-2026-10-27.md); Variantenwahl und parallele Entwürfe sind archiviert.

# Elena Judith second draft

This brief defines how the client’s shared Google Drive material will inform the second website draft, how visitors will switch between drafts, and how the recurring invitation banner will work. The second draft will retain the soft, considered editorial style, Tailwind CSS and vanilla JavaScript foundation, and German and English versions, with reusable content prepared for cms.xms.

Status: implemented locally on 20 October 2026. Both drafts remain available; Draft 2 has 18 pages per language, including Music and Photography. The header selector, shared CTA banner, curated galleries, contextual enquiries and retreat testimonial pool are implemented. This document records the content model and implementation boundaries; it does not confirm publication or CMS integration.

## Sources and decisions

- [Client Website folder](https://drive.google.com/drive/folders/13TcjBH7K9PHv_8CvNmtejhUaiTgp3DcR).
- [Client website checklist](https://docs.google.com/document/d/1IMz2B0YfLxThDjNMhbKVYNnH5TLy3QPNFnhQpNDNcpk/edit).
- [Detailed local inventory](drive-audit-2026-10-20.json), audited on 20 October 2026.
- The user’s second-draft instructions add a header dropdown linking to the second draft and a reusable CTA banner. The exact banner wording below supersedes the older wording in the checklist.

The folder inventory covers all twelve direct subfolders and the nested Fotos Orgiva folder. The checklist was read in full; representative photos were visually reviewed. Eleven Drive originals were selected and visually reviewed for this prototype; two further attributed testimonial portraits were sourced from the original website. The full archive has not been imported or individually curated.

## Shared Google Drive structure

The root folder, Website, holds the checklist and twelve subject folders. It contains 327 image files, including duplicates, and one Google Doc. No separate audio or video files were found in the audited tree.

| Folder in Drive | Image files | Use in the second draft |
| --- | ---: | --- |
| [about me website](https://drive.google.com/drive/folders/1ibLKXgpSr02mq2wDcasMz3zwULslZN2Y) | 45 | Homepage portrait, short introduction, About page portrait sequence and contact imagery. This is the previously shared portrait folder. |
| ↳ [Fotos Orgiva](https://drive.google.com/drive/folders/1OG23JgZwjj0wWweJHs8byLCEJP9j1Tho) | 0 | Nested within About me; reserve for future additions. |
| [Wise In Her Ways Retreat](https://drive.google.com/drive/folders/1LDlPiVg7DlhgfjRFuA1wReIU6_4VkOII) | 85 | Featured retreat card, dedicated page, selected group and setting photographs. |
| [Musik](https://drive.google.com/drive/folders/1F1E1nKTVVwhm0BH2SZGqT_yihNzUisQy) | 54 | Homepage music feature and a music gallery alongside SoundCloud and selected YouTube links or embeds. |
| [inner child retreat](https://drive.google.com/drive/folders/1UzObSahYI3b6loMU19qvNnZ-IacOEvei) | 36 | Dedicated retreat page, documentary gallery and selected overview imagery. |
| [Yoga Nidra](https://drive.google.com/drive/folders/1yUhARCs68O-kIFGtLl1mfWc6eu3lMD_v) | 32 | Session page, individual-session overview and relevant course imagery. |
| [Schamanisches Retreat](https://drive.google.com/drive/folders/1vQ_o4kL0YPoQ9krdbgIKz0Aiq0sqLSi3) | 27 | Page displayed as “We’re the ones we’ve been waiting for,” following the checklist. Retain compatibility with the existing route. |
| [song of the soul retreat](https://drive.google.com/drive/folders/1LfV_qssQi0tR1p7vukfXnnna9z8H-y0U) | 24 | Dedicated creative retreat page, shared experiences and music-related scenes. |
| [Schweigewochenende](https://drive.google.com/drive/folders/1xFOAeRyIf9nD30gS71atwZl5-O2KL7-X) | 12 | Silent Retreat page, landscape, setting and atmosphere. |
| [Kambo](https://drive.google.com/drive/folders/115dNhOHUujA6LJDY4pdDYXC2b83bmRIX) | 7 | Kambo information page. The checklist also requests a cutout of the supplied frog photograph; the exact asset needs to be identified during selection. |
| [mood pics für irgendwo auf der website](https://drive.google.com/drive/folders/1-oB-uzNRiSuEeEn6AUhc8HbGBDLimEYt) | 5 | Occasional editorial images between sections, selected for relevance and visual restraint. |
| [Dreaming Reality online Kurs](https://drive.google.com/drive/folders/1yeI0vakDfcldXy4_ZhSykQ5B-ViGplK2) | 0 | Retain approved original-site images until the client adds course-specific material. |
| [Kraft meiner Wurzeln Retreat](https://drive.google.com/drive/folders/1H62MIps2XhN6TqS2fCHlFYNkoKqEAhQk) | 0 | Retain approved original-site images until the client adds material. |

Counts describe the audit snapshot, not a live synchronization. The checklist still describes some photos as pending although Inner Child and Schamanisches Retreat already contain images.

The inventory reports 260 JPEG MIME entries, 65 HEIC/HEIF entries and two Nikon RAW files, approximately 839 MB altogether. Some filename extensions differ from the reported MIME type. There are 259 distinct case-insensitive filename-and-size combinations; the remaining 68 entries are candidate duplicates, not hash-verified duplicates. Music alone has 54 entries but only 25 such combinations.

## How the folders become website content

The Drive folders provide subject groupings for a media library. They do not need to become twelve main navigation entries. A photograph can support several pages while retaining its original source and accurate context.

| Website area | Source groups | Content and behavior |
| --- | --- | --- |
| Homepage | About me, selected retreat folders, Musik | Personal introduction, three clear paths into individual sessions, retreats and courses, and art and music; large testimonials; selected announcements; recurring CTA. |
| About Elena | About me and selected Mood pictures | Longer introduction and a small, curated portrait sequence. Keep the client’s full professional description readable within the introduction. |
| Individual sessions | Yoga Nidra, Kambo, existing site material | Offering-specific content, testimonials and enquiry links. Add Photography to this group when its copy and portfolio are supplied; retain Human Design and Astrology. |
| Retreats and courses | Six retreat folders, Dreaming Reality, existing course material | Overview cards and dedicated pages with distinct images, experience descriptions, relevant testimonials and enquiry or waiting-list actions. Keep Archetypes of the Goddess despite the absence of a dedicated folder. |
| Art and music | Musik and existing artwork material | A fuller music feature, concert photography, SoundCloud, selected videos and confirmed concert or DJ announcements. Clothing links to the existing Etsy shop. |
| Contact | About me and existing contact information | Contact options, relevant social channels and contextual enquiries. Telegram requires the actual channel URL. |

Select one lead image and roughly four to six complementary images per retreat, rather than displaying every upload. Pair portraits, people, activities and places to communicate the experience. Use symbolic or ceremonial images in their relevant page context; keep the overall presentation calm and grounded.

Past dates and photographs remain clearly identified as previous experiences. Display upcoming dates only when confirmed; otherwise invite interest in the next edition. Folder names and upload timestamps do not establish the event, place or date depicted.

Retain the large testimonial portraits and names with gentle fades. Use service-specific testimonial selections for individual sessions and the shared retreat testimonial pool permitted by the client. Keep each testimonial’s actual context visible, and do not assign a name or quotation to an unidentified person in a group photo.

## Media preparation and cms.xms mapping

1. Preserve the Drive folder and file IDs as provenance. Keep the client’s cloud organization intact.
2. Compare checksums when importing candidate duplicates. Reuse one local asset with multiple subject tags where appropriate.
3. Convert selected HEIC and RAW material into browser-ready images; correct orientation and generate responsive variants. Deliver optimized local assets rather than embedding Drive preview links.
4. Record the source URL, subject tags, accurate caption, credits where supplied, German and English alt text, and crop focal point for each selected image.
5. Assign images to roles such as hero, overview card, portrait and gallery, with a curated order for each page.

Suggested CMS collections are Media, Pages, Offerings, Event Editions and Testimonials. Keep event dates and booking status separate from the evergreen retreat description. Pages reference selected media and shared sections; an image’s folder provenance remains metadata.

Extend the existing `content/images.json` provenance approach and structured offering data. Shared galleries, testimonial sections and the invitation banner should use one renderer each, with editable content and per-page configuration.

## Header dropdown for draft selection

The second draft is accessible through a draft selector in the header navbar. Keep this separate from the main content navigation and the DE/EN language selector.

- German label: **Entwürfe**, with **Entwurf 1** and **Entwurf 2**.
- English label: **Drafts**, with **Draft 1** and **Draft 2**.
- Mark the currently selected draft.
- Make the menu available on desktop and within the mobile navigation, with keyboard operation, visible focus and an explicit expanded state.

Implemented local route layout:

| Version | German homepage | English homepage |
| --- | --- | --- |
| Draft 1 | `/` | `/en/` |
| Draft 2 | `/draft-2/` | `/en/draft-2/` |

Second-draft subpages remain within the same version, for example `/draft-2/about/` and `/en/draft-2/about/`. The draft selector should preserve the current language and equivalent page when available; otherwise it should open the chosen draft’s homepage in the current language. The language selector should preserve the current draft.

These routes and dropdown links exist in the local build. They are not yet deployed. Both drafts remain noindex,nofollow. The selector preserves the equivalent page and language, falling back to the selected draft’s homepage for pages unique to Draft 2.

## Reusable revolution CTA banner

Use the client’s wording exactly:

> In a world that constantly tells you that you are too much or not enough
>
> -
>
> being yourself is a revolutionary act.
>
> Ready for a revolution?

Keep the complete banner in English on both German and English pages, consistent with the client’s earlier English-only instruction for this statement.

### Presentation

Use the existing editorial serif typography, generous space and a restrained cream or deep olive background. Give “being yourself is a revolutionary act.” the strongest visual emphasis. Treat the separating dash as decoration and hide it from assistive technology.

Present **Ready for a revolution?** as the action link, styled as a button. Keep the copy as real HTML text. The banner should adapt naturally to narrow screens, use a clear focus state and retain readable contrast. A subtle existing reveal effect may be used; honor reduced-motion preferences.

Start with a text-led banner so it works across multiple pages without repeatedly reusing the same photograph. It should feel like a personal invitation.

### Placement and destinations

The following placements guide the implemented second draft. Use at most one full banner per page.

| Page | Placement | Action destination |
| --- | --- | --- |
| Homepage | After testimonials and the main offering sections, before the footer | Second-draft contact page |
| About Elena | After the longer introduction and portrait sequence | Second-draft contact page |
| Individual-session overview | After the offering summaries and relevant testimonials | Contact or enquiry section |
| Retreat overview | After the selected formats and past-experience section | Retreat interest enquiry |
| Individual retreat pages | After the gallery and testimonials | That retreat’s interest or waiting-list form |
| Selected session or course pages | After the main explanation, where a closing invitation adds value | Enquiry or ordering section for that specific offering |

Do not place a banner on the contact page that links back to the same contact page. Keep concrete actions such as “Request a session” or “Join the waiting list” near the offering details so visitors understand what happens next.

On pages with the full banner, avoid immediately repeating the same quotation in the footer. Keep the copyright, TuniSite credit and social links. If the quotation is also used in the footer on other pages, manage it from the same shared content record.

### Shared content and behavior

Create one shared section, provisionally `revolution-cta`, with the quotation, action label and fixed English content language. Per-page configuration supplies its placement, visual theme, destination and optional enquiry topic. Draft and locale routing must resolve links into the correct version.

The banner should navigate to an actual page or form. It does not itself submit an enquiry, join a waiting list or buy a course. The prototype prepares an email or WhatsApp message; any stored signup or payment flow requires its own working integration and accurate confirmation messages.

## Remaining content and implementation checks

Remaining inputs include the logo master without “astraljourney,” Telegram URL, Photography and updated Reading copy, clearly attributed service testimonials and portraits, confirmed future event dates, and newsletter or course-ordering arrangements.

Before presenting the second draft:

- Verify image selections against the relevant offering and preserve source records.
- Check the draft selector on desktop, mobile and keyboard, including switching languages and equivalent subpages.
- Verify every banner destination, selected enquiry topic and draft prefix.
- Confirm exact English banner wording in both language versions, responsive typography and reduced-motion behavior.
- Confirm that past events cannot be mistaken for upcoming dates and that forms describe their actual behavior.
- Check the prominent testimonial treatment and avoid repeating the full banner and footer quotation on the same page.


## Implementation record · 20 October 2026

- `src/draft2.mjs` supplies the second editorial layout while reusing the original route/content foundation. `src/drafts.mjs` supplies the shared header switcher.
- `content/draft2.json` stores the exact English banner, offering-specific gallery sequences, bilingual image descriptions, additional testimonials and the verified SoundCloud player reference. The banner renderer accepts the enquiry topic and intent, so the selected offering carries into the contact form.
- `content/draft2-assets.json` records eleven Drive file IDs/source folders and two original-site portrait URLs. The image pipeline generates three WebP sizes for each approved original and records dimensions/provenance in `content/images.json`. No HEIC/RAW import was necessary for this selection; unselected originals remain in Drive.
- Retreat pages use the shared, attributed Jasmin/Lisa/Sabrina pool. Lisa and Sabrina are clearly identified as excerpts from Wise In Her Ways; English quotes are labelled translations. Course feedback and Reading feedback remain in their appropriate contexts.
- Manual photo sequences support buttons, swipe/scroll and keyboard arrows. Testimonials retain large names/portraits, automatic gentle fading with pause/manual controls, and reduced-motion handling.
- The original SoundCloud track, Cambia, is available through a click-to-load player on the homepage, Music and Contact. No player iframe loads before the visitor requests it; audio does not autoplay.
- Photography has a restrained service introduction and enquiry link. A professional portfolio and detailed offer have not been invented. The wordmark is typographic until the client supplies the logo master.
- The supplied motto appears below the header. The Schamanisches Retreat page now displays “We’re the ones we’ve been waiting for” while retaining its existing route and stable enquiry value.
- The original social destinations and TuniSite footer link are preserved. Telegram is omitted until a real channel URL is supplied; the original site’s telephone link is not relabelled as Telegram.
- Awaiting client input/integration: logo master, Photography portfolio/copy, revised Reading copy, further attributed service testimonials, future dates, Telegram URL, newsletter/waitlist storage, course payments, CMS connection and final editorial/legal approval. The requested frog cutout is also deferred until the intended asset is identified; no cutout was fabricated.

Validation results and screenshots are recorded in [verification.md](verification.md). This completes the local second prototype; production release remains a separate step.
