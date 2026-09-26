# Appointment email setup

Requests go to lytxmm10086@gmail.com and vspa.help@gmail.com. The customer email is Reply-To. No customer confirmation email or payment is taken. Staff must confirm availability, appointment length and final price.

1. Create/sign in to your own Resend account and verify a sending domain (for example booking.vspa.ca). Add only the exact DNS verification records supplied by Resend after approving email DNS setup. Do not replace website A/CNAME, Google verification or existing mail records.
2. Create a sending-only API key. In Vercel > vspa > Settings > Environment Variables, add RESEND_API_KEY and BOOKING_FROM_EMAIL (for example V Spa <appointments@booking.vspa.ca>, only once that domain is verified). Keep secrets out of GitHub and chat. Set for the intended deployment environment, then redeploy.
3. For local testing, copy .env.example to .env.local, fill the values privately, and restart dev. Without these variables, the form gives an honest unavailable message and call option.
4. Submit an explicitly labeled test request and confirm BOTH inboxes receive it, including spam folders. Check Reply-To and all selections. Provider acceptance alone does not guarantee inbox delivery.
5. Before public launch, add a persistent rate limit for POST /api/appointments in Vercel Firewall (or a shared-store limiter/CAPTCHA). Code includes honeypot, origin check, body limits and a best-effort per-instance throttle; that throttle is not global across Vercel instances.

Edit services and prices in app/site-data.js. Add-ons are charged once; no add-on durations or tax calculations are shown. Server calculates prices independently of submitted totals. The email route is app/api/appointments/route.js; form is app/appointment-picker.jsx. Requests aren't stored in a database. Duplicate retries with unchanged details use the same provider idempotency key. Don't change recipients based on user-submitted input.

No Namecheap changes or external email configuration were made by adding this code.
