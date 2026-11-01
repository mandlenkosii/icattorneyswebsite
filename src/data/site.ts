/**
 * Firm details — the single source of truth.
 *
 * The top bar, header, footer, contact page and the JSON-LD on the About page
 * all read from this file, so the address, hours and contact details never drift.
 * Edit here and every page updates.
 */

export type OpeningHours = {
  /** Text shown on the site, e.g. "Monday – Friday" */
  label: string;
  /** Short form for compact places like the top bar, e.g. "Mon–Fri" */
  short: string;
  /** schema.org day names, used for structured data */
  days: string[];
  /** 24h "HH:MM"; omit both for closed days */
  opens?: string;
  closes?: string;
};

export const SITE = {
  name: "Ivirn Chauke Inc",
  /** Header wordmark is rendered as `{wordmark} <gold italic>{wordmarkSuffix}</>` */
  wordmark: "Ivirn Chauke",
  wordmarkSuffix: "Inc",
  slogan: "Dedicated to legal excellence",
  tagline: "Your rights. Our commitment.",
  promise: "Discretion. Integrity. Personal attention.",
  description:
    "Ivirn Chauke Inc is a Johannesburg law firm offering personal, discreet legal services in commercial, corporate, labour, family, property, estates, insurance and litigation matters.",
  url: "https://icattorneys.co.za",

  director: {
    name: "Irvin Chauke",
    title: "Director",
    qualification: "LLB",
    university: "University of the Witwatersrand",
    universityShort: "Wits",
    admitted: 2018,
  },

  phone: {
    display: "+27 78 962 2026",
    /** International format, used in structured data */
    e164: "+27789622026",
    /** Used for https://wa.me/<number> — digits only, no "+" */
    whatsapp: "27789622026",
  },
  email: "ivirn@icattorneys.co.za",
  social: {
    /** Displayed as given by the firm. Add a `url` here once the profile link is confirmed. */
    xHandle: "Irvin@icattorneys",
    xUrl: "" as string,
  },

  address: {
    street: "8 Hillside Rd",
    suburb: "Parktown",
    city: "Johannesburg",
    postalCode: "2193",
    province: "Gauteng",
    country: "South Africa",
    countryCode: "ZA",
  },

  hours: [
    {
      label: "Monday – Friday",
      short: "Mon–Fri",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    {
      label: "Saturday & Sunday",
      short: "Sat–Sun",
      days: ["Saturday", "Sunday"],
    },
  ] as OpeningHours[],
  hoursNote: "All times South African Standard Time",

  /** Images live in /public. */
  images: {
    logo: "/logo.jpeg",
    hero: "/hero-johannesburg.jpg",
    /** CSS background-position for the hero photo — which part of the image stays in frame */
    heroFocus: "66% 30%",
    /** Social share image (og:image), 1200×630 */
    share: "/og-image.jpg",
  },

  /** Credit line shown in the footer if the hero photo requires attribution, e.g. { text: "Photo: …", url: "…" } */
  photoCredit: null as { text: string; url: string } | null,
} as const;

/** "8 Hillside Rd, Parktown, Johannesburg, 2193" */
export function addressLine(includeCountry = false): string {
  const a = SITE.address;
  const parts: string[] = [a.street, a.suburb, a.city, a.postalCode];
  if (includeCountry) parts.push(a.province, a.country);
  return parts.join(", ");
}

/** "08:00–17:00" or "Closed" */
export function formatHours(h: OpeningHours): string {
  return h.opens && h.closes ? `${h.opens}–${h.closes}` : "Closed";
}

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  addressLine(true),
)}`;

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${SITE.phone.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/practice-areas", label: "Practice Areas" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;
