import { services, addons } from "./site-data.js";

export const massageStyles = ["Swedish Massage", "Deep Tissue Massage"];
export const packageChoices = ["facials", "body-grooming"];
export const addonLabel = addon => addon.title;
export const addonPriceLabel = addon => addon.price == null ? "Price confirmed when booking" : `$${addon.price}`;

// One source of truth for the calculator and the server-generated email.
export function getBookingQuote({ service: slug, addons: selected = [], massageStyle }) {
  const service = services.find(item => item.slug === slug);
  if (!service || !Array.isArray(selected) || new Set(selected).size !== selected.length || selected.some(id => !addons.some(item => item.slug === id))) {
    throw new Error("Please choose valid services.");
  }
  if (service.isPackage && (!massageStyles.includes(massageStyle) || selected.length !== 2 || !selected.includes("body-scrub") || selected.filter(id => packageChoices.includes(id)).length !== 1)) {
    throw new Error("Choose Swedish or deep tissue massage, body scrub, and either body grooming or facial for your package.");
  }
  const extras = addons.filter(item => selected.includes(item.slug));
  const requiresPriceConfirmation = !service.isPackage && extras.some(item => item.price == null);
  return {
    requiresPriceConfirmation,
    service, extras, massageStyle: service.isPackage ? massageStyle : null,
    total: service.price + (service.isPackage ? 0 : extras.reduce((sum, item) => sum + (item.price ?? 0), 0)),
    durationMinutes: service.durationMinutes + (service.isPackage ? 0 : extras.reduce((sum, item) => sum + (item.durationMinutes || 0), 0)),
    note: service.isPackage
      ? "Allow 2.5 hours. Selected treatments, a 30-minute foot massage, singing bowl, hot stone, and a relaxing finishing ritual are included in the $349 per-person package."
      : "Add-ons extend the visit. Our team will confirm the total appointment length, areas requested, preparation requirements and final price before the appointment is confirmed." + (requiresPriceConfirmation ? " The shown subtotal excludes body grooming; its price is confirmed when booking." : ""),
  };
}

export function getBookingTimes(durationMinutes) {
  const lastStart = Math.min(20 * 60, 21 * 60 - durationMinutes);
  return Array.from({ length: Math.max(0, Math.floor((lastStart - 10 * 60) / 30) + 1) }, (_, index) => {
    const minutes = 10 * 60 + index * 30;
    return `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, "0")}`;
  });
}
