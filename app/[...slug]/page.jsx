import { notFound } from "next/navigation";
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
  const title = slug.length === 1 ? pages[slug[0]]?.[1] : item?.title;
  return {
    title: title || "Page not found",
    description: item?.description || item?.summary,
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
