import { treatmentCategories } from "./treatment-categories";
import { addons, team } from "./site-data";
export const photoSlots = [
  {
    id: "hero",
    label: "Homepage banner",
    hint: "A wide landscape photo works best.",
    limit: 1,
  },
  {
    id: "experience",
    label: "Experience page",
    hint: "A room, spa or treatment photo.",
    limit: 1,
  },
  {
    id: "service-focused",
    label: "Focused Relief massage",
    hint: "The featured service photo.",
    limit: 1,
  },
  {
    id: "service-signature",
    label: "Signature Flow massage",
    hint: "The featured service photo.",
    limit: 1,
  },
  {
    id: "service-immersion",
    label: "Total Immersion massage",
    hint: "The featured service photo.",
    limit: 1,
  },
  ...treatmentCategories.map((category) => ({
    id: category.photoSlot, label: category.title + " category",
    hint: "A landscape photo for the main category cards.", limit: 1,
  })),
  ...addons.map((addon) => ({
    id: addon.photoSlot,
    label: addon.title + " treatment",
    hint: "Shown in the services menu and on the treatment page. A landscape photo works best.",
    limit: 1,
  })),
  ...team.map(({ name }) => ({
    id: "team-" + name.toLowerCase(),
    label: name + " gallery",
    hint: "The first photo is used on the homepage. Add up to 8 photos.",
    limit: 8,
  })),
];
