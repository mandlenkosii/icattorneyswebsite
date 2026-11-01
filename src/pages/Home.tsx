import type { CSSProperties } from "react";
import { Link } from "react-router";
import { ArrowRight, Clock, GraduationCap, HandHeart, Lock, MapPin, MessageCircle, Scale } from "lucide-react";
import Seo from "../components/Seo";
import Logo from "../components/Logo";
import Reveal from "../components/Reveal";
import PracticeCard from "../components/PracticeCard";
import ConsultationBand from "../components/ConsultationBand";
import { SITE, formatHours, whatsappUrl } from "../data/site";
import { FEATURED_PRACTICES } from "../data/practices";
import { APPROACH, PHILOSOPHY } from "../data/content";

const d = SITE.director;
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

const TRUST = [
  {
    icon: GraduationCap,
    title: `${d.qualification}, ${d.universityShort}`,
    text: `Qualified at the ${d.university}.`,
  },
  {
    icon: Scale,
    title: `Admitted attorney, ${d.admitted}`,
    text: `Admitted as an attorney in South Africa in ${d.admitted}.`,
  },
  {
    icon: HandHeart,
    title: "A personal approach",
    text: "Your matter is handled directly, with discretion and care.",
  },
];

export default function Home() {
  const weekdays = SITE.hours[0];

  return (
    <>
      <Seo
        path="/"
        description={`${SITE.name} — Johannesburg attorneys. ${SITE.slogan}. Commercial, corporate, labour, family, property, estates, insurance and litigation services.`}
      />

      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="relative isolate overflow-hidden bg-ink bg-cover text-ivory"
        style={{ backgroundImage: `var(--hero-overlay), url(${SITE.images.hero})`, backgroundPosition: SITE.images.heroFocus }}
      >
        <div className="container-site flex min-h-[calc(100svh-7rem)] flex-col justify-between pt-24 pb-10 lg:min-h-[760px]">
          <div className="max-w-3xl">
            <p className="eyebrow hero-in mb-8 text-gold">Johannesburg-based attorneys</p>
            <h1
              id="hero-heading"
              className="hero-in text-[66px] leading-[0.92] tracking-[-0.01em] sm:text-[104px] lg:text-[128px]"
              style={delay(120)}
            >
              {SITE.wordmark}
              <br />
              <span className="text-ivory/95">{SITE.wordmarkSuffix}.</span>
            </h1>
            <div className="hero-in mt-10 flex items-center gap-5" style={delay(260)}>
              <span aria-hidden className="h-px w-14 bg-gold" />
              <p className="font-serif text-[26px] text-gold italic sm:text-[30px]">{SITE.slogan}</p>
            </div>
            <p className="hero-in mt-3 max-w-md pl-[4.75rem] text-[16px] text-ivory/75" style={delay(320)}>
              {SITE.tagline}
            </p>
            <div className="hero-in mt-12 flex flex-wrap items-center gap-x-10 gap-y-5" style={delay(420)}>
              <Link to="/contact" className="btn btn-gold px-8 py-4">
                Request a Consultation
              </Link>
              <Link to="/practice-areas" className="link-line text-ivory">
                Our practice areas <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>

          {/* Key facts along the bottom of the hero */}
          <div className="hero-in mt-20" style={delay(560)}>
            <p className="mb-6 inline-flex items-center gap-2 text-[12px] tracking-[0.04em] text-ivory/60">
              <Lock aria-hidden className="size-3.5 text-gold" />
              {SITE.promise}
            </p>
            <dl className="grid gap-px overflow-hidden border-t border-ivory/15 text-[12px] sm:grid-cols-3">
              <div className="flex items-center gap-3 py-5 sm:pr-6">
                <MapPin aria-hidden className="size-4 text-gold" />
                <div>
                  <dt className="text-[10px] tracking-[0.18em] text-ivory/45 uppercase">Office</dt>
                  <dd className="text-ivory/85">
                    {SITE.address.street}, {SITE.address.suburb}
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-3 py-5 sm:border-l sm:border-ivory/15 sm:px-6">
                <Clock aria-hidden className="size-4 text-gold" />
                <div>
                  <dt className="text-[10px] tracking-[0.18em] text-ivory/45 uppercase">Hours</dt>
                  <dd className="text-ivory/85">
                    {weekdays.label}, {formatHours(weekdays)}
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-3 py-5 sm:border-l sm:border-ivory/15 sm:pl-6">
                <MessageCircle aria-hidden className="size-4 text-gold" />
                <div>
                  <dt className="text-[10px] tracking-[0.18em] text-ivory/45 uppercase">WhatsApp</dt>
                  <dd>
                    <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="text-ivory/85 hover:text-gold">
                      {SITE.phone.display}
                      <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Trust band */}
      <section aria-label="Credentials" className="border-b border-line bg-white">
        <ul className="container-site grid gap-10 py-14 md:grid-cols-3 md:gap-0">
          {TRUST.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 120}
              className={`flex items-start gap-5 md:px-10 ${i > 0 ? "md:border-l md:border-line" : "md:pl-0"}`}
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/40">
                <Icon aria-hidden strokeWidth={1.3} className="size-5 text-gold-deep" />
              </span>
              <div>
                <p className="font-serif text-[24px] leading-tight">{title}</p>
                <p className="mt-1.5 text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Practice areas */}
      <section aria-labelledby="practices-heading" className="py-28">
        <div className="container-site">
          <Reveal className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-5 text-gold-deep">Practice areas</p>
              <h2 id="practices-heading" className="max-w-xl text-[44px] leading-[1.05] sm:text-[56px]">
                Legal services, <em className="italic">thoughtfully</em> delivered
              </h2>
            </div>
            <div className="max-w-sm md:text-right">
              <p className="mb-5 text-muted">
                Focused advice for individuals, families and businesses — from everyday agreements to contested
                disputes.
              </p>
              <Link to="/practice-areas" className="link-line text-ink">
                View All Practice Areas <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PRACTICES.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 90}>
                <PracticeCard practice={p} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Director band */}
      <section aria-labelledby="director-heading" className="border-y border-line bg-white py-28">
        <div className="container-site grid items-center gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-24">
          <Reveal className="relative mx-auto w-full max-w-sm">
            {/* Offset gold frame behind the emblem */}
            <span aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 border border-gold/50" />
            <div className="relative border border-line bg-white p-5 shadow-soft">
              <Logo className="w-full" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow mb-5 text-gold-deep">
              {d.name}, {d.title}
            </p>
            <h2 id="director-heading" className="text-[42px] leading-[1.05] sm:text-[56px]">
              Professional in approach. <em className="text-gold-deep italic">Personal in commitment.</em>
            </h2>
            <p className="mt-8 text-[15px] leading-relaxed text-muted">
              {SITE.name} is led by {d.name}, who holds an {d.qualification} from the {d.university} and was
              admitted as an attorney in {d.admitted}. Every client deals directly with the attorney handling
              their matter.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              We take time to understand your circumstances, explain your options in plain language, and act
              with discretion at every stage — whether the matter is personal or commercial.
            </p>
            <Link to="/about" className="link-line mt-10 text-ink">
              About the firm <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section aria-label="Our philosophy" className="py-28">
        <Reveal className="container-site max-w-4xl text-center">
          <div className="ornament mx-auto mb-10 max-w-[12rem]" aria-hidden>
            <span className="size-1.5 rotate-45 bg-gold" />
          </div>
          <blockquote>
            <p className="font-serif text-[30px] leading-[1.3] italic sm:text-[40px]">&ldquo;{PHILOSOPHY}&rdquo;</p>
            <footer className="mt-8 text-[11px] font-semibold tracking-[0.2em] text-gold-deep uppercase">
              {SITE.name}
            </footer>
          </blockquote>
        </Reveal>
      </section>

      {/* How we work */}
      <section aria-labelledby="approach-heading" className="border-t border-line bg-white py-28">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow mb-5 text-gold-deep">How we work</p>
            <h2 id="approach-heading" className="mb-16 max-w-2xl text-[42px] leading-[1.05] sm:text-[52px]">
              Clear steps, from first call to resolution
            </h2>
          </Reveal>
          <ol className="grid gap-12 md:grid-cols-3 md:gap-10">
            {APPROACH.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 120} className="relative border-t border-line pt-8">
                <span aria-hidden className="absolute -top-px left-0 h-px w-16 bg-gold" />
                <span className="font-serif text-[56px] leading-none text-gold/70 italic">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[32px]">{a.title}</h3>
                <p className="mt-3 text-muted">{a.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <ConsultationBand />
    </>
  );
}
