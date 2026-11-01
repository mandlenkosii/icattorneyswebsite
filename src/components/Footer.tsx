import type { ReactNode } from "react";
import { Link } from "react-router";
import { ArrowUp, Clock, MapPin } from "lucide-react";
import { NAV_LINKS, SITE, formatHours } from "../data/site";
import { PRACTICES } from "../data/practices";
import Logo from "./Logo";
import Wordmark from "./Wordmark";

function FooterHeading({ children }: { children: ReactNode }) {
  return <h2 className="eyebrow mb-5 text-gold">{children}</h2>;
}

export default function Footer() {
  const a = SITE.address;
  return (
    <footer className="relative bg-ink text-ivory/70">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-line-dark" />
      <div className="container-site grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1.1fr]">
        <div>
          <Logo className="mb-7 w-36 rounded-xs ring-1 ring-gold/30 ring-offset-4 ring-offset-ink" />
          <Wordmark className="text-[28px] text-ivory" />
          <p className="mt-3 font-serif text-[18px] text-gold italic">{SITE.slogan}</p>
          <p className="mt-4 max-w-xs text-[13px]">{SITE.tagline}</p>
        </div>

        <div>
          <FooterHeading>Quick links</FooterHeading>
          <ul className="space-y-2.5 text-[13px]">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-ivory">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/contact" className="hover:text-ivory">
                Request a Consultation
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <FooterHeading>Practice areas</FooterHeading>
          <ul className="space-y-2.5 text-[13px]">
            {PRACTICES.map((p) => (
              <li key={p.slug}>
                <Link to={`/contact?practice=${p.slug}`} className="hover:text-ivory">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterHeading>Find us</FooterHeading>
          <address className="flex gap-3 text-[13px] not-italic">
            <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-gold" />
            <span>
              {a.street}
              <br />
              {a.suburb}, {a.city}
              <br />
              {a.province}, {a.postalCode}
              <br />
              {a.country}
            </span>
          </address>
          <div className="mt-6 flex gap-3 text-[13px]">
            <Clock aria-hidden className="mt-1 size-4 shrink-0 text-gold" />
            <div>
              <dl className="space-y-1">
                {SITE.hours.map((h) => (
                  <div key={h.label}>
                    <dt className="inline">{h.label}: </dt>
                    <dd className="inline text-ivory">{formatHours(h)}</dd>
                  </div>
                ))}
              </dl>
              <p className="pt-2 text-[11px] text-ivory/50">{SITE.hoursNote}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="container-site flex flex-col gap-4 py-7 text-[11px] text-ivory/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            <span className="mx-2" aria-hidden>
              ·
            </span>
            <Link to="/privacy" className="underline-offset-4 hover:text-ivory hover:underline">
              Privacy notice (POPIA)
            </Link>
          </p>
          <p className="md:text-center">The information on this website is general and does not constitute legal advice.</p>
          <a href="#top" className="inline-flex items-center gap-2 tracking-[0.14em] uppercase hover:text-gold">
            Back to top <ArrowUp aria-hidden className="size-3.5" />
          </a>
        </div>
        {SITE.photoCredit && (
          <p className="container-site pb-6 text-[10px] text-ivory/30">
            <a href={SITE.photoCredit.url} target="_blank" rel="noopener noreferrer" className="hover:text-ivory/60">
              {SITE.photoCredit.text}
            </a>
          </p>
        )}
      </div>
    </footer>
  );
}
