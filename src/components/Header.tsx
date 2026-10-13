"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Magnetic } from "./motion";
import { getLenis } from "./SmoothScroll";

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
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
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
    document.documentElement.style.overflow = "hidden";
    getLenis()?.stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.documentElement.style.overflow = "";
      getLenis()?.start();
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-500 ${
        scrolled || open ? "bg-ink-deep/95 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-porcelain focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:h-[4.5rem] lg:px-12">
        <a href="#top" className="flex items-baseline gap-3 text-skin" aria-label={`@${site.handle}, back to top`}>
          <span className="display text-[2rem] leading-none lg:text-[2.25rem]">pm_usa77</span>
          <span className="hidden text-[0.875rem] text-mist md:inline">Permanent makeup &amp; SMP, Jersey City</span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-[1rem] text-skin/80">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="ulink pb-0.5 transition-colors hover:text-skin">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Magnetic strength={0.2}>
                <a href="#book" className="btn btn-skin !px-6 !py-3 !text-[0.95rem]">
                  Book a consultation
                </a>
              </Magnetic>
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
          <span aria-hidden className="relative block h-3 w-7">
            <span className={`absolute left-0 h-px w-7 bg-current transition-transform duration-500 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-px bg-current transition-all duration-500 ${open ? "top-1.5 w-7 -rotate-45" : "top-3 w-5"}`} />
          </span>
        </button>
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-skin/5">
        <div ref={barRef} className="h-full origin-left bg-lip" style={{ transform: "scaleX(0)" }} />
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto bg-ink px-5 pb-10 pt-4 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul>
            {links.map((l, i) => (
              <li key={l.href} className="border-b border-skin/10">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="display flex items-baseline justify-between py-4 text-[3.25rem] text-skin"
                >
                  {l.label}
                  <span className="font-sans text-[0.875rem] text-mist">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <a href="#book" onClick={() => setOpen(false)} className="btn btn-skin w-full">
              Book a consultation
            </a>
            <a href={site.instagramDmUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light w-full">
              Message on Instagram
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
