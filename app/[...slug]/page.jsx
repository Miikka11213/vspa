import { notFound } from "next/navigation";
import { pageSeoTitles, guideSeo } from "../seo-metadata";
import { services, addons, guides } from "../site-data";
import {
  Services,
  Pricing,
  ServiceDetail,
  Appointments,
  Team,
  Experience,
  Contact,
  About,
  Hiring,
  Guides,
  GuideDetail,
} from "../views";
const pages = {
  services: [Services, "Massage & Body Care"],
  pricing: [Pricing, "Prices"],
  schedule: [Appointments, "Appointments"],
  attendants: [Team, "Our Team"],
  experience: [Experience, "The Experience"],
  contact: [Contact, "Contact & Directions"],
  about: [About, "About Us"],
  hiring: [Hiring, "Join Our Team"],
  guides: [Guides, "Spa Guides"],
};
const pageDescriptions = {
  services: "Explore relaxation massage, facials and professional body grooming at V Spa in Midtown Toronto. View services and plan your visit at 525 Eglinton Ave W.",
  pricing: "View V Spa's massage, spa package and body-care prices in Midtown Toronto. Choose your service and confirm appointment details with our team.",
  schedule: "Request an appointment at V Spa in Midtown Toronto. Check the weekly team schedule, choose your services and send your preferred day and time.",
  attendants: "Meet the V Spa team and see their scheduled days in Midtown Toronto. Contact us to confirm availability for your next massage or spa visit.",
  experience: "Discover V Spa's private treatment rooms and calm Midtown Toronto setting. Plan a visit for relaxation massage, skincare and body care.",
  contact: "Find V Spa at 525 Eglinton Ave W, Second Floor, Toronto. Call or text 647-857-1226 for appointments. Open daily from 10 AM to 9 PM.",
  about: "Learn about V Spa, a Midtown Toronto spa offering relaxation massage, skincare and professional body care in private treatment rooms.",
  hiring: "Explore opportunities to join the V Spa team in Midtown Toronto. Share your experience and availability through our application form.",
  guides: "Read V Spa's Toronto guides to choosing a massage, planning your appointment, body grooming, skincare add-ons and private spa rooms.",
};
export const dynamicParams = false;
export function generateStaticParams() {
  return [
    ...Object.keys(pages).map((p) => ({ slug: [p] })),
    ...[...services, ...addons].map((s) => ({ slug: ["services", s.slug] })),
    ...guides.map((g) => ({ slug: ["guides", g.slug] })),
  ];
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item =
    slug[0] === "services"
      ? [...services, ...addons].find((s) => s.slug === slug[1])
      : guides.find((g) => g.slug === slug[1]);
  const guide = slug[0] === "guides" ? guideSeo[slug[1]] : null;
  const serviceTitle = slug[0] === "services" && item
    ? item.categoryId === "four-hand"
      ? item.durationMinutes + "-Minute Four-Hand Hot Stone & Oil Massage in Toronto"
      : item.categoryId === "body-rituals"
        ? item.durationMinutes + "-Minute Relaxation Massage in Toronto"
        : item.title + " in Toronto"
    : null;
  const title = slug.length === 1 ? pageSeoTitles[slug[0]] || pages[slug[0]]?.[1] : guide?.[0] || serviceTitle || item?.title;
  return {
    title: title || "Page not found",
    description: guide?.[1] || item?.description || item?.summary || pageDescriptions[slug[0]],
    alternates: { canonical: "/" + slug.join("/") },
  };
}
export default async function Page({ params }) {
  const { slug } = await params;
  if (slug.length === 1 && pages[slug[0]]) {
    const Component = pages[slug[0]][0];
    return <Component />;
  }
  if (slug[0] === "services") {
    const service = [...services, ...addons].find((s) => s.slug === slug[1]);
    if (service) return <ServiceDetail service={service} />;
  }
  if (slug[0] === "guides") {
    const guide = guides.find((g) => g.slug === slug[1]);
    if (guide) return <GuideDetail guide={guide} />;
  }
  notFound();
}
