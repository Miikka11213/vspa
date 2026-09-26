import originalGuides from "./original-guides.json";
import { services, addons, guides } from "./site-data";
export default function sitemap() {
  const paths = [
    "",
    "services",
    "pricing",
    "attendants",
    "schedule",
    "experience",
    "contact",
    "about",
    "hiring",
    "guides",
    ...[...services, ...addons].map((s) => "services/" + s.slug),
    ...guides.map((g) => "guides/" + g.slug),
    ...originalGuides.map((g) => g.path.slice(1)),
  ];
  return paths.map((p) => ({
    url: "https://vspa.ca/" + p,
    changeFrequency: p ? "monthly" : "weekly",
    priority: p ? 0.7 : 1,
  }));
}
