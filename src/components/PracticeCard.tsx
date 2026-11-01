import { useId, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { Practice } from "../data/practices";

type Props = {
  practice: Practice;
  /** Position in the list, shown as "01", "02"… */
  index: number;
  /** "summary" for the home page grid, "full" adds the expandable detail + enquire link */
  variant?: "summary" | "full";
};

export default function PracticeCard({ practice, index, variant = "summary" }: Props) {
  const [open, setOpen] = useState(false);
  const detailId = useId();
  const Icon = practice.icon;
  const href = variant === "full" ? `/contact?practice=${practice.slug}` : "/practice-areas";

  return (
    <article className="group relative flex h-full flex-col rounded-xs border border-line bg-white p-8 transition-[box-shadow,border-color] duration-300 hover:border-gold/40 hover:shadow-soft has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-gold">
      {/* Gold rule that draws across the top edge on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 -top-px h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
      />

      <div className="mb-8 flex items-start justify-between">
        <span className="flex size-12 items-center justify-center rounded-full border border-gold/40 transition-colors duration-300 group-hover:bg-gold/10">
          <Icon aria-hidden strokeWidth={1.3} className="size-5 text-gold-deep" />
        </span>
        <span aria-hidden className="font-serif text-[20px] text-line italic transition-colors group-hover:text-gold">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="text-[27px] leading-[1.1]">
        {/* The title link is stretched over the whole card so the card is clickable */}
        <Link to={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
          {practice.title}
        </Link>
      </h3>
      <p className="mt-3 text-muted">{practice.description}</p>

      {variant === "full" && (
        <div id={detailId} hidden={!open} className="relative z-10 mt-5 border-t border-line pt-5 text-muted">
          {practice.detail}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-4 pt-8">
        <span
          aria-hidden
          className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] text-ink uppercase"
        >
          {variant === "full" ? "Enquire" : "Learn more"}
          <ArrowRight className="size-3.5 text-gold-deep transition-transform duration-300 group-hover:translate-x-1" />
        </span>
        {variant === "full" && (
          <button
            type="button"
            aria-expanded={open}
            aria-controls={detailId}
            onClick={() => setOpen((o) => !o)}
            className="relative z-10 inline-flex items-center gap-1 text-[12px] text-muted hover:text-ink"
          >
            {open ? "Hide detail" : "Detail"}
            <span className="sr-only"> for {practice.title}</span>
            <ChevronDown aria-hidden className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>
    </article>
  );
}
