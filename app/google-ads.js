// Verified against the original site archive and the owner's Google Ads account.
export const GOOGLE_ADS_ID = "AW-17660567185";
const APPOINTMENT_CONVERSION = `${GOOGLE_ADS_ID}/IeDHCNykrLEdEJG9m-VB`;
let initialized = false;
const sentRequests = new Set();

function isPublicWebsite() {
  return typeof window !== "undefined"
    && ["vspa.ca", "www.vspa.ca"].includes(window.location.hostname)
    && !window.location.pathname.startsWith("/manage-photos");
}

export function initializeGoogleAds() {
  if (!isPublicWebsite()) return false;
  if (!initialized) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("set", "allow_ad_personalization_signals", false);
    window.gtag("js", new Date());
    window.gtag("config", GOOGLE_ADS_ID, { allow_enhanced_conversions: false });
    initialized = true;
  }
  return true;
}

export function trackAppointmentRequest(result, requestId) {
  if (result?.success !== true || !/^[a-f0-9-]{36}$/i.test(requestId || "") || sentRequests.has(requestId)) return false;
  try {
    if (!initializeGoogleAds()) return false;
    window.gtag("event", "conversion", { send_to: APPOINTMENT_CONVERSION, transaction_id: requestId });
    sentRequests.add(requestId);
    return true;
  } catch { return false; } // Measurement must never interrupt a successful booking request.
}
