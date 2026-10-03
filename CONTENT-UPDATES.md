# Categories and team schedule

The English menu follows the owner's October 2 Word document: Body Rituals & Therapy (30/45/60 minutes at $120/$150/$160), Luxury 4-Hand Hot Stone & Oil Ritual (30/45/60 minutes at $240/$280/$300; two therapists treating one guest), and Spoil Me Package ($399 per person, two hours only). The original three massage URLs remain valid with the revised names and content.

Spoil Me includes a 45-minute Swedish or deep tissue massage, a 20-minute body scrub, and either private shaving or a 20-minute facial, plus a soothing touch ritual. The calculator defaults to Swedish massage and facial; the customer can change either choice. Included treatments never add separate charges. The server validates the same quote before generating the appointment email. Package start times end at 7 PM to fit the two-hour visit before the 9 PM closing. Shared calculation rules are in app/booking-menu.js; meaningful price and mocked-email checks are in tests/booking-menu.test.mjs.

Edit category wording and fallback photos in app/treatment-categories.js. Edit staff names and the seven-day roster in app/site-data.js. Tuesday includes Elizabeth, Kim and Warda (the screenshot partly covers Kim). Existing Elizabeth spelling is retained.

Active staff: Ayasha, Warda, Bella, Elizabeth, Kim, Judy, Mona and Eliza. Eliza replaces Suki on Saturday and Sunday; each person is listed once per day. Eliza has a name placeholder until her photos are supplied. Suki is removed from the team and photo manager, and her three published photos and matching temp/staff source copies are removed. Amira, Amy and Nazima are no longer listed or offered in the photo manager. Other source image files are preserved. Warda has three photos, Kim two, Mona three, Ayasha two and Elizabeth two. Country labels embedded in the photos are not added as profile fields. Name and day links use /attendants#name anchors.

Use local /manage-photos to replace category images or edit active staff galleries. Published images and app/photo-data.json must be committed and pushed.
