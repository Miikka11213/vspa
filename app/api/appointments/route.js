import { getBookingQuote, getBookingTimes, addonLabel, addonPriceLabel } from "../../booking-menu.js";
import { createHash } from "node:crypto";
export const runtime = "nodejs";
const recipients = ["lytxmm10086@gmail.com", "vspa.help@gmail.com"];
// Best-effort per-instance throttle. Add a Vercel Firewall rate limit before public launch.
const attempts = new Map();
const fail = (error, status = 400) => Response.json({ error }, { status });
export async function POST(request) {
  const origin = request.headers.get("origin");
  let originUrl;
  try { originUrl = new URL(origin); } catch { return fail("Please submit through the website.", 403); }
  const host = request.headers.get("host") || new URL(request.url).host;
  if (!["https:", "http:"].includes(originUrl.protocol) || originUrl.host !== host) return fail("Please submit through the website.", 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return fail("Invalid request.", 415);
  let input;
  try {
    const reader = request.body.getReader();
    const chunks = []; let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 12000) { await reader.cancel(); return fail("Request is too large.", 413); }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch { return fail("Invalid request."); }
  if (!input || typeof input !== "object" || Array.isArray(input)) return fail("Invalid request.");
  const clean = (key, max) => typeof input[key] === "string" && input[key].length <= max ? input[key].trim() : "";
  if (input.website) return fail("Unable to submit this request.");
  const name = clean("name", 100), email = clean("email", 254), phone = clean("phone", 30);
  const notes = clean("notes", 1000), date = clean("date", 10), time = clean("time", 5);
  const requestId = clean("requestId", 36);
  if (!name || /[\r\n]/.test(name) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^[+()\d .-]{7,30}$/.test(phone)) return fail("Please enter your name, valid email and phone number.");
  if (!/^[a-f0-9-]{36}$/i.test(requestId)) return fail("Please reload the page and try again.");
  if (!Array.isArray(input.addons)) return fail("Please choose valid services.");
  let quote;
  try { quote = getBookingQuote(input); } catch (error) { return fail(error.message); }
  const { service, extras, total } = quote;
  const now = new Date();
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  const currentTime = new Intl.DateTimeFormat("en-GB", { timeZone: "America/Toronto", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(now);
  const parsed = new Date(date + "T12:00:00Z");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0,10) !== date || date < today || parsed.getTime() > now.getTime() + 366 * 86400000 || !getBookingTimes(quote.durationMinutes).includes(time) || (date === today && time <= currentTime)) return fail("Choose a future date within the next year and a start time that fits your treatment before our 9 PM closing (Toronto).");
  if (!process.env.RESEND_API_KEY || !process.env.BOOKING_FROM_EMAIL) return fail("Online requests are not available yet. Please call 647-857-1226 to book.", 503);
  const ip = request.headers.get("x-vercel-forwarded-for") || request.headers.get("x-forwarded-for") || "local";
  const key = createHash("sha256").update(ip).digest("hex");
  for (const [id, entry] of attempts) if (entry.until < Date.now()) attempts.delete(id);
  const entry = attempts.get(key) || { count: 0, until: Date.now() + 600000 };
  if (entry.count >= 5 || attempts.size > 10000) return fail("Too many attempts. Please wait a few minutes or call us.", 429);
  entry.count++; attempts.set(key, entry);
  const text = ["NEW APPOINTMENT REQUEST — awaiting staff confirmation", "", `Name: ${name}`, `Email: ${email}`, `Phone: ${phone}`, `Preferred date: ${date}`, `Preferred time: ${time} (America/Toronto)`, "", `Treatment: ${service.title} — ${service.duration} — $${service.price} CAD${service.isPackage ? " per person" : ""}`,
    ...(service.isRoomFee ? [`Room Fee: $${service.price} CAD (${service.paymentNote})`] : []),
    ...(service.suiteExperience ? [service.suiteExperience] : []),
    ...(service.categoryId === "four-hand" ? ["Therapists: 2, treating 1 guest"] : []),
    ...(service.isPackage ? [`Included massage: ${quote.massageStyle} — 45 min`] : []),
    ...extras.map(a => `${service.isPackage ? "Included treatment" : "Add-on (once)"}: ${service.isPackage ? addonLabel(a) : a.title}${a.durationMinutes ? ` — ${a.durationMinutes} min` : ""} — ${service.isPackage ? "Included" : a.price == null ? addonPriceLabel(a) : `$${a.price} CAD`}`),
    ...(service.isPackage ? service.includedTreatments.map(label => `Included: ${label}`) : []),
    `${service.isPackage ? "Package price" : quote.requiresPriceConfirmation ? "Known subtotal" : "Estimated price"}: $${total} CAD${service.isPackage ? " per person" : ""}`, quote.note, "", `Notes: ${notes || "None"}`, "", `Request reference: ${requestId}`, "This is a request, not a confirmed reservation. Reply to contact the customer."].join("\n");
  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST", signal: AbortSignal.timeout(15000),
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `appointment-${requestId}` },
      body: JSON.stringify({ from: process.env.BOOKING_FROM_EMAIL, to: recipients, reply_to: email, subject: `V Spa appointment request — ${date} ${time}`, text }),
    });
    const data = await result.json();
    if (!result.ok || !data.id) return fail("We could not send your request. Please try again or call 647-857-1226.", 502);
    return Response.json({ success: true });
  } catch { return fail("We could not confirm your request was sent. Please retry with the same details or call 647-857-1226.", 502); }
}

