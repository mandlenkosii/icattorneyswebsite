import { Award, GraduationCap, MapPin } from "lucide-react";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import Logo from "../components/Logo";
import Reveal from "../components/Reveal";
import ConsultationBand from "../components/ConsultationBand";
import { SITE } from "../data/site";
import { APPROACH, VALUES } from "../data/content";

const d = SITE.director;

/** schema.org LegalService structured data — built from the shared site constants */
function StructuredData() {
  const a = SITE.address;
  const data = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: SITE.name,
    slogan: SITE.slogan,
    description: SITE.description,
    url: SITE.url,
    logo: `${SITE.url}${SITE.images.logo}`,
    image: `${SITE.url}${SITE.images.share}`,
    telephone: SITE.phone.e164,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: `${a.suburb}, ${a.city}`,
      addressRegion: a.province,
      postalCode: a.postalCode,
      addressCountry: a.countryCode,
    },
    openingHoursSpecification: SITE.hours
      .filter((h) => h.opens && h.closes)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
    founder: {
      "@type": "Person",
      name: d.name,
      jobTitle: d.title,
      alumniOf: { "@type": "CollegeOrUniversity", name: d.university },
    },
    areaServed: { "@type": "City", name: a.city },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

const CREDENTIALS = [
  { icon: GraduationCap, label: "Qualification", value: `${d.qualification}, ${d.university}` },
  { icon: Award, label: "Admitted", value: `Attorney, ${d.admitted}` },
  { icon: MapPin, label: "Practice", value: `${SITE.address.suburb}, ${SITE.address.city}` },
];

export default function About() {
  return (
    <>
      <Seo
        title="About the Firm"
        path="/about"
        description={`About ${SITE.name}: a Johannesburg law firm led by ${d.name}, ${d.qualification} (${d.university}), admitted as an attorney in ${d.admitted}.`}
      />
      <StructuredData />

      <PageHeader
        crumb="About"
        eyebrow="About the firm"
        title={
          <>
            Dedicated to legal <em className="text-gold italic">excellence.</em>
          </>
        }
        intro={
          <p>
            {SITE.name} is a Johannesburg law firm based in {SITE.address.suburb}. We offer individuals, families
            and businesses considered legal advice with the discretion and personal attention that sensitive
            matters deserve.
          </p>
        }
      />

      {/* Firm story */}
      <section aria-labelledby="story-heading" className="py-28">
        <div className="container-site grid gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-24">
          <Reveal>
            <p className="eyebrow mb-5 text-gold-deep">Our story</p>
            <h2 id="story-heading" className="text-[42px] leading-[1.05] sm:text-[52px]">
              A firm built on <em className="text-gold-deep italic">personal</em> service.
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-[15px] leading-relaxed text-muted">
            <p className="font-serif text-[24px] leading-snug text-ink first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-[68px] first-letter:leading-[0.8] first-letter:text-gold">
              {SITE.name} was established to provide the quality of advice associated with larger firms, delivered
              with the care and accessibility of a practice where every client knows their attorney by name.
            </p>
            <p>
              We work across commercial, corporate, labour, family, property, estates, insurance and litigation
              matters. Whether you are signing an important agreement, facing a dispute, or planning for your
              family&rsquo;s future, our aim is the same: to make the law clear and to protect your interests.
            </p>
            <p className="border-l-2 border-gold pl-5 font-serif text-[24px] text-ink italic">{SITE.tagline}</p>
          </Reveal>
        </div>
      </section>

      {/* Director profile */}
      <section aria-labelledby="director-heading" className="border-y border-line bg-white py-28">
        <div className="container-site grid items-center gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-24">
          <Reveal className="relative mx-auto w-full max-w-sm">
            <span aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 border border-gold/50" />
            <div className="relative border border-line bg-white p-5 shadow-soft">
              {/* Replace with a portrait of the director when available */}
              <Logo className="w-full" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow mb-5 text-gold-deep">{d.title}</p>
            <h2 id="director-heading" className="text-[48px] leading-none sm:text-[64px]">
              {d.name}
            </h2>
            <dl className="mt-8 grid gap-px border-y border-line sm:grid-cols-3">
              {CREDENTIALS.map(({ icon: Icon, label, value }, i) => (
                <div key={label} className={`py-4 sm:px-5 ${i === 0 ? "sm:pl-0" : "sm:border-l sm:border-line"}`}>
                  <dt className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] text-muted uppercase">
                    <Icon aria-hidden className="size-3.5 text-gold-deep" /> {label}
                  </dt>
                  <dd className="mt-1 text-[13px] text-ink">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-muted">
              <p>
                {d.name} holds an {d.qualification} from the {d.university} and was admitted as an attorney in{" "}
                {d.admitted}. {SITE.name} was founded to offer clients a practice that is professional in approach
                and personal in commitment.
              </p>
              <p>
                Clients work with {d.name.split(" ")[0]} directly, from the first consultation through to the
                resolution of their matter, and can expect clear advice, honest assessments and steady
                representation.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-heading" className="py-28">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow mb-5 text-gold-deep">Our values</p>
            <h2 id="values-heading" className="mb-14 max-w-xl text-[42px] leading-[1.05] sm:text-[52px]">
              What you can expect from us
            </h2>
          </Reveal>
          <ul className="grid gap-px overflow-hidden rounded-xs border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 90} className="bg-white p-8">
                <span className="mb-8 flex size-12 items-center justify-center rounded-full border border-gold/40">
                  <Icon aria-hidden strokeWidth={1.3} className="size-5 text-gold-deep" />
                </span>
                <h3 className="text-[27px]">{title}</h3>
                <p className="mt-3 text-muted">{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Approach */}
      <section aria-labelledby="approach-heading" className="border-t border-line bg-white py-28">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow mb-5 text-gold-deep">Our approach</p>
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
