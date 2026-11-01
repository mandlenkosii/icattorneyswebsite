import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { SITE } from "../data/site";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Breadcrumb label for the current page; omit to hide breadcrumbs */
  crumb?: string;
};

/** Dark heading band at the top of inner pages, over a muted skyline photo */
export default function PageHeader({ eyebrow, title, intro, crumb }: Props) {
  return (
    <section
      className="relative isolate overflow-hidden bg-ink bg-cover text-ivory"
      style={{
        backgroundImage: `linear-gradient(to right, oklch(0.22 0.004 90 / 0.97) 0%, oklch(0.22 0.004 90 / 0.88) 55%, oklch(0.22 0.004 90 / 0.7) 100%), url(${SITE.images.hero})`,
        backgroundPosition: SITE.images.heroFocus,
      }}
    >
      <div className="container-site pt-14 pb-20 sm:pt-16 sm:pb-24">
        {crumb && (
          <nav aria-label="Breadcrumb" className="hero-in mb-14 text-[11px] tracking-[0.08em] text-ivory/55 uppercase">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/" className="hover:text-ivory">
                  Home
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3" />
              </li>
              <li aria-current="page" className="text-ivory/85">
                {crumb}
              </li>
            </ol>
          </nav>
        )}
        <p className="eyebrow hero-in mb-6 text-gold" style={{ "--delay": "80ms" } as CSSProperties}>
          {eyebrow}
        </p>
        <h1
          className="hero-in max-w-4xl text-[48px] leading-[1.02] sm:text-[72px]"
          style={{ "--delay": "160ms" } as CSSProperties}
        >
          {title}
        </h1>
        {intro && (
          <div
            className="hero-in mt-7 max-w-2xl text-[15px] leading-relaxed text-ivory/70"
            style={{ "--delay": "240ms" } as CSSProperties}
          >
            {intro}
          </div>
        )}
      </div>
      {/* Thin gold hairline along the bottom edge */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-gold/70 via-gold/20 to-transparent" />
    </section>
  );
}
