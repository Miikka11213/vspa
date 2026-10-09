# Categories and team schedule

The English menu follows the owner's October 2 Word document: Body Rituals & Therapy (30/45/60 minutes at $120/$150/$160), Luxury 4-Hand Hot Stone & Oil Ritual (30/45/60 minutes at $240/$280/$300; two therapists treating one guest), and Spoil Me Package ($349 per person, 2.5 hours). The original three massage URLs remain valid with the revised names and content.

Spoil Me includes a 45-minute Swedish or deep tissue massage, a 20-minute body scrub, and either a body-grooming add-on or a 20-minute facial, plus a 30-minute foot massage, singing bowl, hot stone, and a relaxing finishing ritual. The calculator defaults to Swedish massage and facial; the customer can change either choice. Included treatments never add separate charges. The server validates the same quote before generating the appointment email. Package start times end at 6:30 PM to fit the 2.5-hour visit before the 9 PM closing. Shared calculation rules are in app/booking-menu.js; meaningful price and mocked-email checks are in tests/booking-menu.test.mjs.

Edit category wording and fallback photos in app/treatment-categories.js. Edit staff names and the seven-day roster in app/site-data.js. The roster was updated from the owner's October 6 instructions. Existing Elizabeth spelling is retained.

Team profiles: Amira, Ayasha, Bella, Elizabeth, Kim, Judy, Mona and Eliza. Amira remains on the team with a name/initial placeholder. Bella has no days assigned in the current roster. Each person is listed once per day. Suki is removed from the team and photo manager, and her three published photos and matching temp/staff source copies are removed. Warda is removed from the team, weekly schedule and photo manager, and her three published photos are removed. Amy and Nazima are no longer listed or offered in the photo manager. Other source image files are preserved. The owner-selected photos of Bella, Kim and Eliza, plus Mona’s second and third photos, are removed along with matching temp/staff source copies. Bella, Kim and Eliza remain on the team; Kim and Eliza have days assigned in the current schedule. Bella uses the existing name/initial placeholder. Eliza has a new owner-provided portrait with a pink flower overlay in public/images/team/eliza-flower-portrait.jpg as of October 7. Her previous seated portrait remains unpublished, with its local source copy kept in temp/staff/eliza-portrait.jpg. Kim has a new owner-provided waterfront portrait in public/images/team/kim-portrait.jpg. Ayasha has two photos; Kim and Eliza have one each. Amira, Elizabeth, Judy and Mona use name/initial placeholders after the October 9 imagery review. Their previous images and the obsolete grooming image are archived locally outside the website checkout and are not publicly served. Owner-provided nationality/background labels appear beside names on the attendants page: Ayasha — Nepal; Bella — Bahamas; Elizabeth — Jamaica; Kim — Brazilian; Judy — Asian; Mona — Persian; Eliza — Greece. These labels are stored in the nationality field in app/site-data.js using the owner’s wording. Warda remains removed. Name and day links use /attendants#name anchors.

Use local /manage-photos to replace category images or edit active staff galleries. Published images and app/photo-data.json must be committed and pushed.

Facial is a 20-minute, $30 add-on to a massage and remains an included finishing choice in Spoil Me. The built-in ImageGen tool updated the embedded badge in public/images/services/facial.png from STANDALONE to ADD-ON.

Current weekly roster (October 6, 2026):

- Monday: Eliza, Ayasha, Elizabeth
- Tuesday: Amira, Elizabeth, Judy
- Wednesday: Eliza, Amira, Mona
- Thursday: Kim, Ayasha, Eliza
- Friday: Mona, Ayasha
- Saturday: Amira, Ayasha
- Sunday: Eliza, Judy

October 9 website revision: the owner confirmed general grooming is offered for back, chest/torso, arms, legs and full body. General grooming uses “Price confirmed when booking” because its starting price is unconfirmed. Non-package estimates show a known subtotal excluding that unpriced add-on; the booking email says the same. Spoil Me still includes either body grooming or facial for $349, with no separate finishing charge. The services page, guide articles, metadata, footer links and 301 redirects follow the owner’s VSPA Google Ads Website Compliance Revision v1.0 brief. Website edits do not certify or guarantee Google Ads approval.
