import test from "node:test";
import assert from "node:assert/strict";
import { getBookingQuote, getBookingTimes } from "../app/booking-menu.js";
import { POST } from "../app/api/appointments/route.js";

test("menu uses the owner's revised prices", () => {
  for (const [service, price] of [
    ["30-minute-focused-relief-massage", 120], ["45-minute-signature-flow-massage", 150],
    ["60-minute-total-immersion-massage", 160], ["30-minute-four-hand-hot-stone-oil-ritual", 240],
    ["45-minute-four-hand-hot-stone-oil-ritual", 280], ["60-minute-four-hand-hot-stone-oil-ritual", 300],
  ]) assert.equal(getBookingQuote({ service, addons: [] }).total, price);
  assert.equal(getBookingQuote({ service: "45-minute-signature-flow-massage", addons: ["body-scrub", "facials"] }).total, 205);
});

test("package keeps either finishing choice at $349 and 150 minutes", () => {
  for (const finishing of ["facials", "intimate-shaving"]) for (const massageStyle of ["Swedish Massage", "Deep Tissue Massage"]) {
    const quote = getBookingQuote({ service: "spoil-me-package", addons: ["body-scrub", finishing], massageStyle });
    assert.equal(quote.total, 349);
    assert.equal(quote.durationMinutes, 150);
    assert.deepEqual(quote.service.includedTreatments, ["30-minute foot massage", "Singing bowl", "Hot stone", "Soothing touch ritual"]);
    assert.equal(getBookingTimes(quote.durationMinutes).at(-1), "18:30");
  }
  assert.equal(getBookingTimes(60).at(-1), "20:00");
});

test("invalid or duplicate package inclusions cannot reach an email", () => {
  for (const selected of [[], ["body-scrub"], ["body-scrub", "facials", "intimate-shaving"], ["body-scrub", "body-scrub"], ["body-scrub", "back-shaving"]]) {
    assert.throws(() => getBookingQuote({ service: "spoil-me-package", addons: selected, massageStyle: "Swedish Massage" }));
  }
  assert.throws(() => getBookingQuote({ service: "spoil-me-package", addons: ["body-scrub", "facials"], massageStyle: "Unknown" }));
});

test("server email matches the fixed package quote without sending real mail", async () => {
  const originalFetch = globalThis.fetch;
  const previousKey = process.env.RESEND_API_KEY;
  const previousSender = process.env.BOOKING_FROM_EMAIL;
  process.env.RESEND_API_KEY = "test-only";
  process.env.BOOKING_FROM_EMAIL = "test@example.com";
  let email;
  globalThis.fetch = async (_, options) => { email = JSON.parse(options.body); return Response.json({ id: "mock-email" }); };
  try {
    const input = { name: "Preview Test", email: "test@example.com", phone: "4165550100", date: new Date(Date.now() + 86400000).toISOString().slice(0,10), time: "12:00", requestId: "d092fe9a-2f22-4bd3-98c0-0a4fbc3cb944", service: "spoil-me-package", addons: ["body-scrub", "intimate-shaving"], massageStyle: "Deep Tissue Massage", total: 1 };
    const request = data => new Request("http://localhost:3000/api/appointments", { method: "POST", headers: { origin: "http://localhost:3000", "content-type": "application/json" }, body: JSON.stringify(data) });
    assert.equal((await POST(request(input))).status, 200);
    assert.match(email.text, /Included massage: Deep Tissue Massage — 45 min/);
    assert.match(email.text, /Private Shaving — Included/);
    assert.match(email.text, /Spoil Me Package — 2\.5 hours/);
    assert.match(email.text, /Included: 30-minute foot massage/);
    assert.match(email.text, /Included: Singing bowl/);
    assert.match(email.text, /Included: Hot stone/);
    assert.match(email.text, /Package price: \$349 CAD per person/);
    assert.doesNotMatch(email.text, /\$55|\$25|\$1 CAD/);
    assert.equal((await POST(request({ ...input, time: "18:30" }))).status, 200);
    assert.equal((await POST(request({ ...input, time: "19:00" }))).status, 400);
    assert.equal((await POST(request({ ...input, time: "20:00" }))).status, 400);
    assert.equal((await POST(request({ ...input, addons: ["body-scrub", "facials", "intimate-shaving"] }))).status, 400);
  } finally {
    globalThis.fetch = originalFetch;
    if (previousKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = previousKey;
    if (previousSender === undefined) delete process.env.BOOKING_FROM_EMAIL; else process.env.BOOKING_FROM_EMAIL = previousSender;
  }
});
