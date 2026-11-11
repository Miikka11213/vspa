import { business } from "./site-data.js";

// Verified against the original site archive and the owner's Google Ads account.
export const GOOGLE_ADS_ID = "AW-17660567185";
const APPOINTMENT_CONVERSION = `${GOOGLE_ADS_ID}/IeDHCNykrLEdEJG9m-VB`;
const WEBSITE_CALL_CONVERSION = `${GOOGLE_ADS_ID}/C4ZxCOWOs7YdEJG9m-VB`;
let initialized = false;
const sentRequests = new Set();
const businessPhone = { phone: business.phone, tel: business.tel };
let phoneNumber = businessPhone;
const phoneListeners = new Set();

export const getBusinessPhone = () => businessPhone;
export const getPhoneNumber = () => phoneNumber;

export function subscribeToPhoneNumber(listener) {
  phoneListeners.add(listener);
  return () => phoneListeners.delete(listener);
}

function setForwardingNumber(phone, tel) {
  if (typeof phone !== "string" || !phone.trim() || typeof tel !== "string" || !/^\+?\d{10,15}$/.test(tel)) return;
  phoneNumber = { phone, tel };
  phoneListeners.forEach(listener => listener());
}

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
    window.gtag("config", WEBSITE_CALL_CONVERSION, {
      phone_conversion_number: business.phone,
      phone_conversion_callback: setForwardingNumber,
    });
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
