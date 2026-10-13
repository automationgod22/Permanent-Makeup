"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#care", label: "Care" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-ink/95 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-porcelain focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-20">
        <a href="#top" className="group flex items-baseline gap-3 text-skin" aria-label={`@${site.handle}, back to top`}>
          <span className="display text-[1.75rem] leading-none lg:text-[2rem]">pm_usa77</span>
          <span className="hidden text-[0.8125rem] text-mist sm:inline">Permanent makeup &amp; SMP, Jersey City</span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.9375rem] text-skin/80">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-skin">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#book"
                className="rounded-full border border-skin/40 px-5 py-2.5 text-skin transition-colors hover:border-skin hover:bg-skin hover:text-ink"
              >
                Book a consultation
              </a>
            </li>
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="relative -mr-2 flex h-11 w-11 items-center justify-center text-skin lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="relative block h-3 w-6">
            <span
              className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto bg-ink px-5 pb-10 pt-6 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="display block py-3 text-[2.75rem] text-skin"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3">
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="rounded-full bg-skin px-6 py-4 text-center font-medium text-ink"
            >
              Book a consultation
            </a>
            <a
              href={site.instagramDmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-skin/40 px-6 py-4 text-center text-skin"
            >
              Message on Instagram
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
