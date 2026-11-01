import type { LucideIcon } from "lucide-react";
import { Eye, HandHeart, Scale, ShieldCheck } from "lucide-react";

/**
 * Editable copy that appears on more than one page, or is likely to be
 * updated over time. Page-specific prose lives in src/pages/*.tsx.
 */

export type Value = { icon: LucideIcon; title: string; text: string };

export const VALUES: Value[] = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    text: "Honest advice, even when it is not what you hoped to hear, and conduct you can rely on.",
  },
  {
    icon: Eye,
    title: "Discretion",
    text: "Your affairs are treated with the strictest confidentiality from the first conversation.",
  },
  {
    icon: HandHeart,
    title: "Personal attention",
    text: "You deal directly with the attorney handling your matter — not a call centre or a queue.",
  },
  {
    icon: Scale,
    title: "Excellence",
    text: "Careful preparation and attention to detail in every document, opinion and appearance.",
  },
];

export const APPROACH = [
  {
    title: "Listen",
    text: "We begin by understanding your circumstances, your concerns and what you want to achieve.",
  },
  {
    title: "Advise",
    text: "We explain your rights, your options and the likely costs and risks — in plain language.",
  },
  {
    title: "Act",
    text: "We carry your matter forward diligently and keep you informed at every stage until it is resolved.",
  },
];

/** Shown on the home page between sections */
export const PHILOSOPHY =
  "The law should never feel out of reach. Our role is to make it clear — and to stand beside you until your matter is resolved.";

export const FAQS = [
  {
    q: "How do I arrange a consultation?",
    a: "Send an enquiry using the form on this page, message us on WhatsApp, email us or call during office hours. We will respond to confirm a suitable time.",
  },
  {
    q: "What should I bring to my first consultation?",
    a: "Bring your identity document and any documents relevant to your matter — for example contracts, letters, court papers, policies or correspondence. A short written timeline of events is also helpful.",
  },
  {
    q: "Is my enquiry confidential?",
    a: "Yes. Everything you share with us is treated in confidence. Because the form on this site opens WhatsApp or your own email app, only you and the firm see your message.",
  },
  {
    q: "What happens after I send an enquiry?",
    a: "We review your message and contact you on the details you provided, usually to ask a few questions and arrange a consultation.",
  },
];
