import { useId, useState, type FormEvent, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router";
import type { LucideIcon } from "lucide-react";
import { AtSign, Clock, ExternalLink, Info, Mail, MapPin, MessageCircle, Plus } from "lucide-react";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { SITE, addressLine, formatHours, mapsUrl, whatsappUrl } from "../data/site";
import { FAQS } from "../data/content";
import { PRACTICES, findPractice } from "../data/practices";

type Channel = "whatsapp" | "email";

type FormValues = {
  name: string;
  contact: string;
  practice: string;
  message: string;
};

function buildMessage(v: FormValues) {
  const practice = findPractice(v.practice)?.fullName ?? "General enquiry";
  return [
    `Hello ${SITE.name},`,
    "",
    `My name is ${v.name.trim()}.`,
    `Practice area: ${practice}`,
    `Contact details: ${v.contact.trim()}`,
    "",
    v.message.trim(),
  ].join("\n");
}

export default function Contact() {
  const [params] = useSearchParams();
  const preselected = findPractice(params.get("practice"))?.slug ?? "";
  const [values, setValues] = useState<FormValues>({
    name: "",
    contact: "",
    practice: preselected,
    message: "",
  });
  const [opened, setOpened] = useState<Channel | null>(null);

  // Follow ?practice= changes while already on this page (e.g. footer links)
  const [lastPreselected, setLastPreselected] = useState(preselected);
  if (lastPreselected !== preselected) {
    setLastPreselected(preselected);
    setValues((v) => ({ ...v, practice: preselected }));
  }
  const ids = useId();

  const update = (field: keyof FormValues) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  // Nothing is sent to a server: the enquiry is handed to WhatsApp or the visitor's email app.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel: Channel = submitter?.value === "email" ? "email" : "whatsapp";
    const body = buildMessage(values);

    if (channel === "whatsapp") {
      window.open(whatsappUrl(body), "_blank", "noopener,noreferrer");
    } else {
      const practice = findPractice(values.practice)?.title ?? "General enquiry";
      const subject = `Website enquiry: ${practice} — ${values.name.trim()}`;
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    setOpened(channel);
  }

  const label = "mb-2 block text-[12px] font-semibold tracking-[0.06em] uppercase";

  return (
    <>
      <Seo
        title="Contact"
        path="/contact"
        description={`Contact ${SITE.name} in ${SITE.address.suburb}, ${SITE.address.city}. Send an enquiry via WhatsApp or email, or call ${SITE.phone.display}.`}
      />

      <PageHeader
        crumb="Contact"
        eyebrow="Contact"
        title={
          <>
            Discuss your legal <em className="text-gold italic">matter</em>
          </>
        }
        intro={<p>Tell us briefly about your matter and how to reach you. Your enquiry is treated in confidence.</p>}
      />

      <section className="py-24">
        <div className="container-site grid gap-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          {/* Enquiry form */}
          <div className="relative rounded-xs border border-line bg-white p-7 shadow-soft sm:p-12">
            <span aria-hidden className="absolute inset-x-0 -top-px h-0.5 bg-gold" />
            <p className="eyebrow mb-4 text-gold-deep">Enquiry form</p>
            <h2 className="mb-10 text-[36px]">Send an enquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${ids}-name`} className={label}>
                    Full name <span className="text-gold-deep">*</span>
                  </label>
                  <input
                    id={`${ids}-name`}
                    className="field"
                    required
                    autoComplete="name"
                    value={values.name}
                    onChange={update("name")}
                  />
                </div>
                <div>
                  <label htmlFor={`${ids}-contact`} className={label}>
                    Email or phone <span className="text-gold-deep">*</span>
                  </label>
                  <input
                    id={`${ids}-contact`}
                    className="field"
                    required
                    autoComplete="email"
                    value={values.contact}
                    onChange={update("contact")}
                  />
                </div>
              </div>

              <div>
                <label htmlFor={`${ids}-practice`} className={label}>
                  Practice area
                </label>
                <select
                  id={`${ids}-practice`}
                  className="field"
                  value={values.practice}
                  onChange={update("practice")}
                >
                  <option value="">General enquiry / not sure</option>
                  {PRACTICES.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor={`${ids}-message`} className={label}>
                  Your message <span className="text-gold-deep">*</span>
                </label>
                <textarea
                  id={`${ids}-message`}
                  className="field min-h-40 resize-y"
                  required
                  rows={6}
                  value={values.message}
                  onChange={update("message")}
                  aria-describedby={`${ids}-privacy`}
                />
                <p id={`${ids}-privacy`} className="mt-2 text-[12px] text-muted">
                  Please share only the essentials here; we can discuss details in confidence.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="submit" name="channel" value="whatsapp" className="btn btn-dark">
                  <MessageCircle aria-hidden className="size-4 text-gold" /> Send via WhatsApp
                </button>
                <button type="submit" name="channel" value="email" className="btn btn-outline">
                  <Mail aria-hidden className="size-4" /> Send via Email
                </button>
              </div>

              <p className="flex gap-2 text-[12px] text-muted">
                <Info aria-hidden className="mt-0.5 size-3.5 shrink-0 text-gold-deep" />
                <span>
                  These buttons open WhatsApp or your email app with your message prefilled. Nothing is sent from
                  this website — you must press send in WhatsApp or your email app to deliver your enquiry. See our{" "}
                  <Link to="/privacy" className="underline">
                    privacy notice
                  </Link>
                  .
                </span>
              </p>

              <div role="status" aria-live="polite">
                {opened && (
                  <p className="rounded-xs border border-gold/60 bg-ivory p-4 text-[13px]">
                    {opened === "whatsapp"
                      ? "WhatsApp should now be open in a new tab with your message ready. Your enquiry has not been sent yet — please press send in WhatsApp."
                      : "Your email app should now be open with your message ready. Your enquiry has not been sent yet — please press send in your email app."}{" "}
                    If nothing opened, contact us directly at{" "}
                    <a className="underline" href={`mailto:${SITE.email}`}>
                      {SITE.email}
                    </a>{" "}
                    or on {SITE.phone.display}.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Contact details */}
          <div className="space-y-10">
            <ContactBlock icon={MapPin} title="Location">
              <address className="not-italic">
                {SITE.address.street}
                <br />
                {SITE.address.suburb}, {SITE.address.city}, {SITE.address.postalCode}
                <br />
                {SITE.address.province}, {SITE.address.country}
              </address>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 border-b border-ink pb-0.5 text-[12px] font-semibold tracking-[0.06em] text-ink uppercase hover:border-gold"
              >
                Get directions <ExternalLink aria-hidden className="size-3.5" />
                <span className="sr-only">(opens Google Maps in a new tab)</span>
              </a>
            </ContactBlock>

            <ContactBlock icon={Clock} title="Working hours">
              <dl className="space-y-1">
                {SITE.hours.map((h) => (
                  <div key={h.label} className="flex justify-between gap-6 border-b border-line pb-1">
                    <dt>{h.label}</dt>
                    <dd className="text-ink">{formatHours(h)}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-2 text-[12px]">{SITE.hoursNote}</p>
            </ContactBlock>

            <ContactBlock icon={Mail} title="Email & WhatsApp">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Mail aria-hidden className="size-3.5 text-gold-deep" />
                  <a href={`mailto:${SITE.email}`} className="text-ink hover:underline">
                    {SITE.email}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle aria-hidden className="size-3.5 text-gold-deep" />
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="text-ink hover:underline">
                    {SITE.phone.display}
                    <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
                  </a>
                  <span className="text-[12px]">(WhatsApp)</span>
                </li>
                <li className="flex items-center gap-2">
                  <AtSign aria-hidden className="size-3.5 text-gold-deep" />
                  <span>
                    X (Twitter):{" "}
                    {SITE.social.xUrl ? (
                      <a href={SITE.social.xUrl} target="_blank" rel="noopener noreferrer" className="text-ink hover:underline">
                        {SITE.social.xHandle}
                      </a>
                    ) : (
                      <span className="text-ink">{SITE.social.xHandle}</span>
                    )}
                  </span>
                </li>
              </ul>
            </ContactBlock>
          </div>
        </div>
      </section>

      <MapPanel />

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="py-28">
        <div className="container-site grid gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-24">
          <Reveal>
            <p className="eyebrow mb-5 text-gold-deep">Questions</p>
            <h2 id="faq-heading" className="text-[42px] leading-[1.05] sm:text-[52px]">
              Before you <em className="text-gold-deep italic">get in touch</em>
            </h2>
          </Reveal>
          <Reveal delay={120} className="border-t border-line">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-serif text-[22px] leading-snug [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus
                    aria-hidden
                    className="size-4 shrink-0 text-gold-deep transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}

/**
 * Google Map, loaded only when the visitor asks for it — no third-party
 * requests or cookies until then (POPIA-friendly).
 */
function MapPanel() {
  const [show, setShow] = useState(false);
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(addressLine(true))}&output=embed`;
  return (
    <section aria-label="Map" className="relative h-[420px] border-y border-line bg-ink">
      {show ? (
        <iframe
          title={`Map showing ${SITE.name} at ${addressLine()}`}
          src={embed}
          className="size-full border-0 grayscale-[0.6] sepia-[0.15]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div
          className="flex size-full items-center bg-cover"
          style={{
            backgroundImage: `linear-gradient(to right, oklch(0.22 0.004 90 / 0.95), oklch(0.22 0.004 90 / 0.75)), url(${SITE.images.hero})`,
            backgroundPosition: SITE.images.heroFocus,
          }}
        >
          <div className="container-site text-ivory">
            <p className="eyebrow mb-5 text-gold">Visit us</p>
            <p className="font-serif text-[34px] leading-tight sm:text-[44px]">
              {SITE.address.street}, {SITE.address.suburb}
            </p>
            <p className="mt-2 text-ivory/65">
              {SITE.address.city}, {SITE.address.postalCode} · {SITE.address.province}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <button type="button" onClick={() => setShow(true)} className="btn btn-gold">
                <MapPin aria-hidden className="size-4" /> Show map
              </button>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="link-line text-ivory">
                Open in Google Maps <ExternalLink aria-hidden className="size-3.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
            <p className="mt-6 text-[11px] text-ivory/45">Showing the map loads content from Google.</p>
          </div>
        </div>
      )}
    </section>
  );
}

function ContactBlock({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-5">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-white">
        <Icon aria-hidden strokeWidth={1.3} className="size-5 text-gold-deep" />
      </span>
      <div className="flex-1 text-muted">
        <h2 className="mb-2 text-[26px] text-ink">{title}</h2>
        {children}
      </div>
    </div>
  );
}
