# Original website URL comparison

Compared against the public sitemap and internal links on https://vspa.ca/ on 2026-09-26.

As of October 9, 2026, 22 original page URLs are preserved directly; three legacy pages have 301 redirects to replacement pages. The excluded offering below still returns 404.

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
| `/mens-intimate-spa` | 301 → `/body-grooming-toronto` |
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
| `/services/intimate-shaving` | 301 → `/services/body-grooming` |
| `/toronto-adult-massage-guide` | 301 → `/massage-wellness-guide-toronto` |
| `/toronto-escort-services` | 404 — excluded offering; no equivalent page |

Homepage staff links use `/attendants#name` for the current team.

## Editing the replacement guides

- `app/body-grooming-toronto/page.jsx` and `app/massage-wellness-guide-toronto/page.jsx` contain route metadata and canonical URLs.
- `app/original-guides.json` contains the replacement article copy.
- `app/views.jsx` renders articles and guide cards.
- `app/sitemap.js` lists the new public URLs.
- `next.config.mjs` holds the three 301 redirects, preserving query parameters.

The legacy page components and old public labels have been removed. Old URLs are retained only as redirect sources, not in the sitemap or navigation.
