import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Building2,
  FileText,
  Gavel,
  HeartPulse,
  KeyRound,
  PenLine,
  ScrollText,
  ShieldCheck,
  Users,
} from "lucide-react";

/**
 * Practice areas — used by the home page, practice areas page, contact form
 * dropdown and footer. To add a practice, append an object to this array.
 */
export type Practice = {
  /** URL-safe id, used in /contact?practice=<slug> */
  slug: string;
  /** Short title shown on cards */
  title: string;
  /** Full name used in the contact form and enquiry messages */
  fullName: string;
  icon: LucideIcon;
  /** One line, shown on every card */
  description: string;
  /** Longer paragraph, revealed on the Practice Areas page */
  detail: string;
  /** Show on the home page grid (aim for a multiple of 4) */
  featured?: boolean;
};

export const PRACTICES: Practice[] = [
  {
    slug: "commercial-contracts",
    title: "Commercial Contracts",
    fullName: "Commercial Contracts & Legal Opinions",
    icon: FileText,
    description: "Clear agreements and considered legal opinions to support your business decisions.",
    detail:
      "We draft and review commercial agreements and provide legal opinions on contractual rights, obligations and risk, so that you understand exactly what you are signing and where you stand.",
    featured: true,
  },
  {
    slug: "corporate-law",
    title: "Corporate Law",
    fullName: "Corporate & Company Law",
    icon: Building2,
    description: "Practical legal guidance for businesses at every stage.",
    detail:
      "From choosing the right company structure to governance, shareholder arrangements and transactions, we advise founders, directors and shareholders with a practical, commercial outlook.",
    featured: true,
  },
  {
    slug: "labour-employment",
    title: "Labour & Employment",
    fullName: "Labour & Employment Law",
    icon: Briefcase,
    description: "Protecting rights and resolving disputes in the South African workplace.",
    detail:
      "We assist employers and employees with employment contracts, workplace disputes, disciplinary processes and dismissals, with careful attention to South African labour legislation.",
    featured: true,
  },
  {
    slug: "family-divorce",
    title: "Family & Divorce",
    fullName: "Family Law & Divorce",
    icon: Users,
    description: "Thoughtful representation through sensitive personal matters.",
    detail:
      "Divorce, maintenance and children's matters call for discretion and care. We guide you through each step with clear advice and steady representation.",
    featured: true,
  },
  {
    slug: "deceased-estates",
    title: "Deceased Estates",
    fullName: "Deceased Estates Administration",
    icon: ScrollText,
    description: "Careful guidance through the administration of a loved one's estate.",
    detail:
      "We assist families with reporting an estate and explain the executor's responsibilities, helping the administration proceed properly and with as little added strain as possible.",
    featured: true,
  },
  {
    slug: "property-law",
    title: "Property Law",
    fullName: "Property Law",
    icon: KeyRound,
    description: "Sound advice on property agreements, rights and disputes.",
    detail:
      "We advise on property agreements, leases and ownership issues for both residential and commercial property, and assist where disputes arise.",
    featured: true,
  },
  {
    slug: "wills-estate-planning",
    title: "Wills & Estate Planning",
    fullName: "Wills & Estate Planning",
    icon: PenLine,
    description: "Plan with clarity and protect what matters.",
    detail:
      "We prepare and review wills and help you plan how your estate will be distributed, so that your wishes are clearly recorded and your family is provided for.",
    featured: true,
  },
  {
    slug: "personal-injury",
    title: "Personal Injury",
    fullName: "Personal Injury Claims",
    icon: HeartPulse,
    description: "Legal guidance when an injury has affected your life.",
    detail:
      "We assess potential claims, explain the evidence and requirements involved, and guide you through the process so that you can make informed decisions.",
  },
  {
    slug: "insurance-law",
    title: "Insurance Law",
    fullName: "Insurance Law & Disputes",
    icon: ShieldCheck,
    description: "Clarity on policy obligations, claims and insurance disputes.",
    detail:
      "We assist with policy interpretation, claims and disputes between policyholders and insurers, helping you understand your cover and enforce your rights.",
  },
  {
    slug: "litigation",
    title: "Litigation",
    fullName: "Civil & Commercial Litigation",
    icon: Gavel,
    description: "Focused representation in civil and commercial disputes.",
    detail:
      "We advise on the strengths of your position and pursue the right route — negotiation, settlement or litigation — with focus and determination.",
    featured: true,
  },
];

export const FEATURED_PRACTICES = PRACTICES.filter((p) => p.featured);

export const findPractice = (slug: string | null | undefined) =>
  PRACTICES.find((p) => p.slug === slug);
