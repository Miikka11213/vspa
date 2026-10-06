import { services } from "./site-data";

// Durations and prices come from the shared service menu.
export const treatmentCategories = [
  {
    id: "body-rituals", title: "Body Rituals & Therapy",
    description: "Our signature escape for restorative body care. With 100% pure botanical oils, flowing rhythmic strokes and gentle warmth, our therapists help ease muscle tension and everyday fatigue. A tranquil pause for busy lives, leaving you feeling refreshed and light.",
    photoSlot: "category-body-rituals", image: "/images/services/signature.jpg", alt: "Hands working gently along the back during a botanical oil massage",
  },
  {
    id: "four-hand", title: "Luxury 4-Hand Hot Stone & Oil Ritual",
    description: "Two therapists work in unison, like a synchronized duet, delivering a flowing four-hand oil massage to one guest. Premium botanical oils and warming Himalayan volcanic hot stones make this a luxurious, immersive ritual for deep relaxation.",
    photoSlot: "category-four-hand", image: "/images/services/four-hand-ritual.png", alt: "Two therapists massaging one guest in a synchronized four-hand treatment",
  },
  {
    id: "spoil-me", title: "Spoil Me Package",
    description: "Allow two and a half hours of care, just for you. Your $349 package includes a 45-minute Swedish or deep tissue massage, a 20-minute body scrub, either private shaving or a 20-minute facial, a 30-minute foot massage, singing bowl, hot stone, and a soothing touch ritual. Priced per person.",
    photoSlot: "category-spoil-me", image: "/images/spa-still-life.png", alt: "Spa oils, folded towels and orchids in soft light",
  },
].map(category => ({ ...category, options: services.filter(service => service.categoryId === category.id) }));
