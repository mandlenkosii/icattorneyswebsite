import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { SITE, addressLine, formatHours, whatsappUrl } from "../data/site";

export default function TopBar() {
  const weekdays = SITE.hours[0];
  return (
    <div className="bg-ink text-[10px] tracking-[0.06em] text-ivory/75">
      <div className="container-site flex min-h-9 flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <span className="hidden items-center gap-2 sm:inline-flex">
            <MapPin aria-hidden className="size-3 text-gold" />
            {addressLine()}
          </span>
          <span className="hidden items-center gap-2 lg:inline-flex">
            <Clock aria-hidden className="size-3 text-gold" />
            {weekdays.short} {formatHours(weekdays)}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-ivory">
            <MessageCircle aria-hidden className="size-3 text-gold" />
            {SITE.phone.display}
            <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
          </a>
          <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 hover:text-ivory">
            <Mail aria-hidden className="size-3 text-gold" />
            {SITE.email}
          </a>
        </div>
      </div>
    </div>
  );
}
