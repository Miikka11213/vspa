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
  services: "Explore 30-, 45- and 60-minute massage, four-hand rituals and spa packages at V Spa, 525 Eglinton Ave W, Toronto. View room fees, add-ons and availability.",
  pricing: "Compare V Spa's massage room fees, four-hand room fees, $349 spa package and add-on prices on Eglinton West, Toronto. View details before booking.",
  schedule: "Request a V Spa appointment on Eglinton West, Toronto. Choose your service, check the staff schedule and send a preferred time. Open daily 10 AM–9 PM.",
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
    ? item.seoTitle || item.title + " in Toronto"
    : null;
  const title = slug.length === 1 ? pageSeoTitles[slug[0]] || pages[slug[0]]?.[1] : guide?.[0] || serviceTitle || item?.title;
  return {
    title: title || "Page not found",
    description: guide?.[1] || item?.seoDescription || item?.description || item?.summary || pageDescriptions[slug[0]],
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
