import { useEffect, useId, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "../data/site";
import Logo from "./Logo";
import Wordmark from "./Wordmark";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `relative py-2 text-[12px] font-semibold tracking-[0.08em] uppercase transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-gold after:transition-transform ${
    isActive ? "text-ink after:scale-x-100" : "text-muted hover:text-ink after:scale-x-0"
  }`;

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const menuId = useId();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation and on Escape
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-ivory transition-shadow duration-300 ${
        scrolled ? "border-transparent shadow-soft" : "border-line"
      }`}
    >
      <div
        className={`container-site flex items-center justify-between gap-6 transition-[height] duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <Link to="/" className="flex items-center gap-3" aria-label={`${SITE.name} — home`}>
          <Logo alt="" variant="mark" className={`transition-all duration-300 ${scrolled ? "size-10" : "size-12"}`} />
          <Wordmark className="text-[26px] sm:text-[30px]" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 nav:flex">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/contact" className="btn btn-dark hidden lg:inline-flex">
          Request a Consultation
        </Link>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-xs border border-line nav:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
        </button>
      </div>

      <nav id={menuId} aria-label="Mobile" hidden={!open} className="border-t border-line bg-ivory nav:hidden">
        <ul className="container-site flex flex-col py-4">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `block border-b border-line py-3.5 font-serif text-[22px] ${isActive ? "text-ink" : "text-muted"}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <li className="pt-5">
            <Link to="/contact" className="btn btn-dark w-full">
              Request a Consultation
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
