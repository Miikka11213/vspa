# V Spa website

This is your independent Next.js / React website. The working copy is Desktop/vspa. It does not connect to the previous developer's hosting, database, analytics or admin account.

## Run on your computer

Install Node.js LTS. From a terminal opened in this folder:

    npm install
    npm run dev

Open http://localhost:3000. Leave the terminal running while you edit.

## Where to make changes

- `app/site-data.js`: business contact details, hours, service descriptions, prices and team names.
- `app/views.jsx`: page content and layout.
- `app/ui.jsx`: mobile navigation, treatment selector, appointment request and hiring email form.
- `app/globals.css`: colors, spacing, fonts and responsive styling.
- `public/images`: website images. Paths beginning `/images/` point here.

## What works

The site includes home, services, treatment details, pricing, team, appointments, experience, contact, hiring, about and five spa guides. Phone links open a dialer. Text requests open a messaging app. Hiring creates an email draft. Nothing is submitted silently, and selecting an appointment date does not reserve a slot.

There is no database, admin dashboard, automatic booking calendar, email delivery service or payment system. Availability is confirmed manually by the spa. Published team information and prices must be checked by the owner before the domain switch.

## Deploy on your own Vercel account

1. Commit and push this repository to GitHub.
2. In Vercel, Add New > Project > import Miikka11213/vspa.
3. Framework: Next.js. Root directory: repository root. Use automatic build settings.
4. Deploy and check the provided vercel.app address.
5. When ready to replace the live site, add vspa.ca and www.vspa.ca under Project Settings > Domains.
6. If Vercel requests ownership verification because of the previous account, add the exact TXT record it supplies in Namecheap Advanced DNS.
7. Use the exact A record for @ and CNAME for www shown by this Vercel project. Preserve email records and unrelated verification records.
8. Test both domains and HTTPS after Vercel reports Valid Configuration.

Do not change Namecheap nameservers merely to connect this site. The existing Namecheap DNS can remain in use.

## Updating the live website

Edit your files, check the local preview, then commit and push to `main`. Once GitHub is connected, Vercel builds and publishes those updates automatically.

## Content and images

This version is for nonsexual massage, skincare and personal grooming. It excludes the original escort content and its tracking tags. Team portraits are not copied; the page uses initials until you provide suitable staff photos.

The V Spa logo was retrieved from the business's public website. `public/images/spa-still-life.png` was generated with the built-in image-generation tool. It is decorative imagery, not a photograph of the premises. Prompt: premium realistic still life of folded ivory spa towels, an unlabeled amber massage oil bottle, dark stones, an orchid and candlelight on walnut; deep plum shadows, warm side light, objects on the right and negative space on the left; no people, text, logos or watermarks.

## Build check

    npm run build

No environment variables or secrets are required for this version.
