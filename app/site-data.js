// Edit business information, services, prices and team names here.
export const business = {
  name: "V Spa",
  phone: "647-857-1226",
  tel: "+16478571226",
  email: "vspa.help@gmail.com",
  address: "525 Eglinton Ave W, Second Floor",
  city: "Toronto, ON M5N 1B1",
  hours: "Daily, 10 AM – 9 PM",
  map: "https://www.google.com/maps/search/?api=1&query=525+Eglinton+Ave+W+Toronto",
};
export const services = [
  {
    slug: "30-minute-focused-relief-massage",
    categoryId: "body-rituals",
    photoSlot: "service-focused",
    title: "Pure Serenity",
    duration: "30 min",
    durationMinutes: 30,
    price: 120,
    image: "/images/services/focused.jpg",
    alt: "A relaxation massage with a wooden massage roller",
    description: "A botanical oil ritual for a quick, calming reset. Smooth, flowing strokes and rhythmic glides ease everyday tension and leave you feeling refreshed.",
    details:
      "Designed for busy days, this 30-minute treatment uses premium botanical oils and broad, flowing strokes. Share your preferred pressure and focus areas with your therapist for a restful pause that fits your day.",
    features: [
      "Botanical oil touch ritual",
      "Smooth, rhythmic massage strokes",
      "Pressure tailored to your comfort",
    ],
  },
  {
    slug: "45-minute-signature-flow-massage",
    categoryId: "body-rituals",
    photoSlot: "service-signature",
    title: "Chrono-Relaxing",
    duration: "45 min",
    durationMinutes: 45,
    price: 150,
    image: "/images/services/signature.jpg",
    alt: "Hands applying focused pressure during a back massage",
    description:
      "Classic Swedish massage with a flowing, rhythmic pace. Long strokes and focused attention ease the tension that builds up through sitting, travel and busy days.",
    details:
      "Our 45-minute full-body botanical oil treatment combines classic Swedish long strokes with a steady, unhurried rhythm. Your therapist balances flowing movements with focused work on the areas that need attention, adjusting pressure to your comfort.",
    features: [
      "Swedish rhythmic massage",
      "Full-body botanical oil care",
      "Focused attention for everyday tension",
    ],
  },
  {
    slug: "60-minute-total-immersion-massage",
    categoryId: "body-rituals",
    photoSlot: "service-immersion",
    title: "Twilight Symphony",
    duration: "60 min",
    durationMinutes: 60,
    price: 160,
    image: "/images/services/immersion.jpg",
    alt: "A gentle shoulder treatment on a massage table",
    description:
      "An immersive full-body oil massage with the resonant tones of Himalayan singing bowls. Soft light, flowing touch and sound create space to slow down and settle into relaxation.",
    details:
      "Spend an hour unwinding in a softly lit, tranquil setting. A smooth full-body oil massage pairs with Himalayan singing bowl sounds, bringing thoughtful attention to tense muscle groups and a quiet moment for your mind.",
    features: [
      "Immersive full-body oil massage",
      "Himalayan singing bowl sounds",
      "A softly lit, tranquil setting",
    ],
  },
];
// New rituals join the existing service URLs, so previous links remain valid.
services.push(
  ...[
    { minutes: 30, price: 240 },
    { minutes: 45, price: 280 },
    { minutes: 60, price: 300 },
  ].map(({ minutes, price }) => ({
    slug: `${minutes}-minute-four-hand-hot-stone-oil-ritual`,
    categoryId: "four-hand", photoSlot: "category-four-hand",
    title: "Luxury 4-Hand Hot Stone & Oil Ritual",
    duration: `${minutes} min`, durationMinutes: minutes, price,
    image: "/images/services/four-hand-ritual.png",
    alt: "Two therapists providing a synchronized four-hand massage to one guest",
    description: "Two therapists, one guest, and a perfectly shared rhythm. Synchronized oil massage and warming hot stones create an immersive experience of deep relaxation.",
    details: "Two therapists work together in a synchronized, flowing four-hand massage, combining premium botanical oils with the warmth of Himalayan volcanic hot stones. Coordinated strokes and thoughtful pressure make this a luxurious pause for body and mind. This is a treatment for one guest, served by two therapists.",
    features: ["Two therapists treating one guest", "Synchronized four-hand botanical oil massage", "Warming Himalayan volcanic hot stones"],
  })),
  {
    slug: "spoil-me-package", categoryId: "spoil-me",
    photoSlot: "category-spoil-me", title: "Spoil Me Package",
    duration: "2 hours", durationMinutes: 120, price: 399, isPackage: true,
    image: "/images/spa-still-life.png", alt: "Botanical oil, spa towels and orchids prepared for a relaxing spa visit",
    description: "Two hours of thoughtful care, just for you. Enjoy your choice of Swedish or deep tissue massage, a body scrub, and either private shaving or a facial, with a soothing touch ritual to complete your visit.",
    details: "Allow two hours for this $399 package, priced per person. Your visit includes a 45-minute Swedish or deep tissue massage, a 20-minute body scrub, and your choice of private shaving or a 20-minute facial. A calming touch ritual rounds out the experience. These treatments are included in the package price; our team will confirm the sequence and details before your visit.",
    features: ["45-minute Swedish or deep tissue massage", "20-minute body scrub", "Choose private shaving or a 20-minute facial", "Soothing touch ritual", "2-hour visit · $399 per person"],
  },
);
export const addons = [
  {
    slug: "body-scrub",
    photoSlot: "addon-body-scrub",
    image: "/images/services/body-scrub.png",
    alt: "Body scrub applied to the back during a spa treatment",
    title: "Body Scrub",
    durationMinutes: 20,
    price: 25,
    description: "Gentle exfoliation and warm towels for soft, refreshed skin.",
  },
  {
    slug: "facials",
    photoSlot: "addon-facials",
    image: "/images/services/facial.png",
    alt: "A facial mask applied with a soft brush",
    title: "Facial",
    durationMinutes: 20,
    price: 30,
    description: "Cleansing, exfoliation, a soothing mask and hydration.",
  },
  {
    slug: "back-shaving",
    photoSlot: "addon-back-shaving",
    image: "/images/services/back-grooming.jpg",
    alt: "A selection of razors and shaving brushes",
    title: "Back Grooming",
    price: 40,
    description:
      "Careful skin preparation, back shaving and soothing aftercare.",
  },
  {
    slug: "intimate-shaving",
    photoSlot: "addon-intimate-shaving",
    image: "/images/services/intimate-grooming.png",
    alt: "Personal grooming with a razor at the waistline",
    title: "Intimate Grooming",
    price: 55,
    description:
      "Personal grooming with clear boundaries, careful preparation and skin aftercare.",
  },
  {
    slug: "full-body-shaving",
    photoSlot: "addon-full-body-shaving",
    image: "/images/services/full-grooming.jpg",
    alt: "Shaving brush and razor prepared for grooming",
    title: "Full-Body Grooming",
    price: 220,
    description:
      "A complete grooming session with skin preparation and aftercare. Confirm areas and appointment length when booking.",
  },
];
// Update the weekly roster here. Names must match the team list below.
export const weeklySchedule = [
  { day: "Monday", names: ["Ayasha", "Warda", "Bella"] },
  { day: "Tuesday", names: ["Elizabeth", "Kim", "Warda"] },
  { day: "Wednesday", names: ["Elizabeth", "Judy"] },
  { day: "Thursday", names: ["Elizabeth", "Kim", "Ayasha"] },
  { day: "Friday", names: ["Ayasha", "Mona", "Warda"] },
  { day: "Saturday", names: ["Ayasha", "Suki", "Eliza"] },
  { day: "Sunday", names: ["Suki", "Bella", "Ayasha"] },
];
export const team = [
  { name: "Ayasha", specialty: "Relaxation massage" },
  { name: "Warda", specialty: "Spa team" },
  { name: "Bella", specialty: "Massage & spa care" },
  { name: "Elizabeth", specialty: "Massage & bodywork" },
  { name: "Kim", specialty: "Spa team" },
  { name: "Judy", specialty: "Facials & grooming" },
  { name: "Mona", specialty: "Relaxation & Swedish massage" },
  { name: "Suki", specialty: "Spa team" },
];
export const guides = [
  {
    slug: "choosing-massage-toronto",
    title: "Find your ideal massage",
    summary: "A little guidance on time, pressure, and your first visit.",
    sections: [
      [
        "Choose your time",
        "Try 30 minutes when you want to focus on one or two areas, 45 minutes for a balanced full-body session, or 60 minutes for a slower pace.",
      ],
      [
        "Talk about pressure",
        "Tell your attendant what feels comfortable. You can ask for lighter pressure, a pause, or a change at any point.",
      ],
      [
        "Before you arrive",
        "Confirm your appointment, share any relevant sensitivities, and ask about products or fragrance-free options. Contact a qualified healthcare professional if you are unsure whether massage is appropriate for you.",
      ],
    ],
  },
  {
    slug: "massage-addons-toronto",
    title: "The finishing touches",
    summary: "Explore body scrubs, facials, and personal grooming.",
    sections: [
      [
        "Body scrubs",
        "Gentle exfoliation can be added to a spa visit. Mention skin sensitivities and ask which products will be used.",
      ],
      [
        "Facials",
        "A facial adds time for cleansing and hydration. Share allergies and preferences before treatment.",
      ],
      [
        "Grooming",
        "Discuss the areas you want treated and the time required. The team will confirm pricing and clear service boundaries before your appointment.",
      ],
    ],
  },
  {
    slug: "midtown-toronto-massage-spa-guide",
    title: "Your Midtown spa visit",
    summary: "Directions, appointment planning, and what to expect.",
    sections: [
      [
        "Find us on Eglinton",
        "V Spa is at 525 Eglinton Ave W, on the second floor. Check the contact page for directions and call if you need help finding the entrance.",
      ],
      [
        "Reserve ahead",
        "Call or text with your preferred day, time, and massage length. Your appointment is confirmed only when the team replies.",
      ],
      [
        "Make yourself comfortable",
        "Let us know your pressure, music, fragrance, and lighting preferences. Ask any questions before your session begins.",
      ],
    ],
  },
  {
    slug: "evening-massage-toronto-after-work",
    title: "Make space after work",
    summary: "Plan a quiet pause at the end of your day.",
    sections: [
      [
        "Evening appointments",
        "The spa is open until 9 PM daily. Contact the team in advance to confirm the last available appointment for your chosen service.",
      ],
      [
        "Choose your session",
        "A focused session can fit into a busy evening. A longer massage gives you more time to unwind.",
      ],
      [
        "Confirm before travelling",
        "Same-day availability varies. Call or text before you set out so we can confirm the time and service.",
      ],
    ],
  },
  {
    slug: "private-spa-rooms-toronto-gta",
    title: "A little room to unwind",
    summary: "A comfortable, private setting for your spa appointment.",
    sections: [
      [
        "Your own space",
        "Private treatment rooms help you settle into your appointment without distractions.",
      ],
      [
        "Your preferences",
        "Ask about the room, products, and treatment before you book. Share any preferences for lighting, music, or fragrance.",
      ],
      [
        "Respectful care",
        "Your comfort guides your visit. Communicate your boundaries and tell your attendant if you would like to change or stop a treatment.",
      ],
    ],
  },
];
export const navigation = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Pricing", "/pricing"],
  ["Attendants", "/attendants"],
  ["Schedule", "/schedule"],
  ["Experience", "/experience"],
  ["Contact", "/contact"],
];
export const faq = [
  [
    "Where is V Spa?",
    "Find us at 525 Eglinton Ave W, Second Floor, in Midtown Toronto. We are open daily from 10 AM to 9 PM.",
  ],
  [
    "How do I book?",
    "Call or text 647-857-1226 with your preferred day, time and service. Your appointment is confirmed when our team replies.",
  ],
  [
    "Can I add a facial or body scrub?",
    "Yes. Mention any add-ons when you contact us so we can confirm the price and reserve enough time.",
  ],
  [
    "Are same-day visits available?",
    "Availability changes throughout the day. Please call or text before travelling to the spa.",
  ],
];
