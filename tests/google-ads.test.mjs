import test from "node:test";
import assert from "node:assert/strict";

async function trackingModule(suffix) {
  try { return await import(`../app/google-ads.js?${suffix}`); }
  catch (error) { if (error.code !== "ERR_MODULE_NOT_FOUND") throw error; return {}; }
}

test("Google Ads queues initialization once and counts only a successful unique request", async () => {
  const tracking = await trackingModule("production");
  assert.equal(typeof tracking.trackAppointmentRequest, "function", "Successful appointment tracking is missing");
  globalThis.window = { location: { hostname: "vspa.ca", pathname: "/schedule" } };
  try {
    tracking.initializeGoogleAds();
    tracking.initializeGoogleAds();
    assert.equal(window.dataLayer.filter(args => args[0] === "config").length, 1);
    assert.equal(window.dataLayer.filter(args => args[0] === "event").length, 0);
    const id = "d0f3c07b-b50a-40b6-bc77-2079ec05a55a";
    assert.equal(tracking.trackAppointmentRequest({ success: false }, id), false);
    assert.equal(tracking.trackAppointmentRequest({}, id), false);
    assert.equal(tracking.trackAppointmentRequest({ success: true, email: "private@example.com", notes: "private" }, id), true);
    assert.equal(tracking.trackAppointmentRequest({ success: true }, id), false);
    const events = window.dataLayer.filter(args => args[0] === "event");
    assert.equal(events.length, 1);
    assert.equal(events[0][1], "conversion");
    assert.deepEqual(events[0][2], {
      send_to: "AW-17660567185/IeDHCNykrLEdEJG9m-VB",
      transaction_id: id,
    });
    window.gtag = () => { throw new Error("Blocked tag"); };
    assert.doesNotThrow(() => tracking.trackAppointmentRequest({ success: true }, "a0f3c07b-b50a-40b6-bc77-2079ec05a55a"));
  } finally { delete globalThis.window; }
});

test("Local previews, admin pages and server rendering never send Ads events", async () => {
  const tracking = await trackingModule("nonproduction");
  assert.equal(typeof tracking.initializeGoogleAds, "function", "Google tag initialization is missing");
  assert.equal(tracking.initializeGoogleAds(), false);
  for (const [hostname, pathname] of [["localhost", "/schedule"], ["127.0.0.1", "/"], ["vspa-eight.vercel.app", "/schedule"], ["vspa.ca.evil.example", "/"], ["vspa.ca", "/manage-photos"]]) {
    globalThis.window = { location: { hostname, pathname } };
    assert.equal(tracking.initializeGoogleAds(), false);
    assert.equal(tracking.trackAppointmentRequest({ success: true }, "d0f3c07b-b50a-40b6-bc77-2079ec05a55a"), false);
    assert.equal(window.dataLayer, undefined);
  }
  delete globalThis.window;
});
