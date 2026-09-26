# Original website URL comparison

Compared against the public sitemap and internal links on https://vspa.ca/ on 2026-09-26.

25 of the 26 discovered original page URLs are preserved directly. No redirect is required for those URLs because their addresses have not changed.

The existing local project excludes the escort-services offering. `/toronto-escort-services` remains a 404 and is not listed in the new sitemap. It has no equivalent page in this version; do not redirect it to an unrelated page.

This is a URL inventory, not a guarantee that all historical Google-indexed URLs have been discovered or that all original SEO content/settings match. Search Console access is needed to check older indexed pages. Image asset URLs have not been migrated in this pass.

| Original path | Local result |
| --- | --- |
| `/` | Same URL — already present |
| `/about` | Same URL — already present |
| `/attendants` | Same URL — already present |
| `/contact` | Same URL — already present |
| `/experience` | Same URL — already present |
| `/guides` | Same URL — already present |
| `/guides/choosing-massage-toronto` | Same URL — already present |
| `/guides/evening-massage-toronto-after-work` | Same URL — already present |
| `/guides/massage-addons-toronto` | Same URL — already present |
| `/guides/midtown-toronto-massage-spa-guide` | Same URL — already present |
| `/guides/private-spa-rooms-toronto-gta` | Same URL — already present |
| `/hiring` | Same URL — already present |
| `/mens-intimate-spa` | Same URL — guide restored |
| `/pricing` | Same URL — already present |
| `/schedule` | Same URL — already present |
| `/services` | Same URL — already present |
| `/services/30-minute-focused-relief-massage` | Same URL — already present |
| `/services/45-minute-signature-flow-massage` | Same URL — already present |
| `/services/60-minute-total-immersion-massage` | Same URL — already present |
| `/services/back-shaving` | Same URL — already present |
| `/services/body-scrub` | Same URL — already present |
| `/services/facials` | Same URL — already present |
| `/services/full-body-shaving` | Same URL — already present |
| `/services/intimate-shaving` | Same URL — already present |
| `/toronto-adult-massage-guide` | Same URL — guide restored |
| `/toronto-escort-services` | 404 — excluded offering; no equivalent page |

Homepage staff links use `/attendants#name`; all eight original homepage anchors are retained.

## Editing the restored guides

- `app/mens-intimate-spa/page.jsx`: route and original metadata.
- `app/toronto-adult-massage-guide/page.jsx`: route and original metadata.
- `app/original-guides.json`: article headings and paragraphs taken from the original public guides, excluding their promotional/related-links sections.
- `app/views.jsx`: shared article layout and guide cards.
- `app/sitemap.js`: includes both restored public URLs.

## Local verification

Production build passed. HTTP checks confirmed 25 original URLs return 200, the excluded URL returns 404, all 25 canonical URLs and sitemap entries match their intended public addresses, the two restored pages retain their original titles/descriptions, and all eight homepage staff anchors resolve. Unknown URLs return 404. Nothing was deployed.

