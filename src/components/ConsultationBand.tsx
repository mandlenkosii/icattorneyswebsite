import { Link } from "react-router";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { SITE, whatsappUrl } from "../data/site";
import Reveal from "./Reveal";

type Props = {
  heading?: string;
  text?: string;
};

/** Full-width dark call-to-action band */
export default function ConsultationBand({
  heading = "Discuss your matter in confidence.",
  text = "Arrange a consultation and receive clear, considered advice on where you stand and what comes next.",
}: Props) {
  return (
    <section
      aria-labelledby="consultation-heading"
      className="relative isolate overflow-hidden bg-ink text-ivory"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 60% 120% at 100% 50%, oklch(0.72 0.105 80 / 0.14), transparent 70%)",
      }}
    >
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent" />
      <Reveal className="container-site grid items-center gap-12 py-24 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div>
          <p className="eyebrow mb-5 text-gold">Request a consultation</p>
          <h2 id="consultation-heading" className="text-[42px] leading-[1.05] sm:text-[56px]">
            {heading}
          </h2>
          <p className="mt-5 max-w-xl text-[15px] text-ivory/65">{text}</p>
        </div>
        <div className="flex flex-col gap-6 md:items-end">
          <Link to="/contact" className="btn btn-gold px-8 py-4">
            Request a Consultation <ArrowRight aria-hidden className="size-4" />
          </Link>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-ivory/60">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-ivory">
              <MessageCircle aria-hidden className="size-3.5 text-gold" /> {SITE.phone.display}
              <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
            </a>
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 hover:text-ivory">
              <Mail aria-hidden className="size-3.5 text-gold" /> {SITE.email}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
