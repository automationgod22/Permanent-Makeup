"use client";

import { createElement, useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Adds `is-in` to the element the first time it scrolls into view. */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

type Tag = "h1" | "h2" | "h3" | "p" | "div";

/** Heading whose lines slide up out of a mask when it enters the viewport. */
export function RevealHeading({
  as = "h2",
  lines,
  className = "",
  id,
  immediate = false,
}: {
  as?: Tag;
  lines: string[];
  className?: string;
  id?: string;
  immediate?: boolean;
}) {
  const [ref, inView] = useInView<HTMLElement>(0.3);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!immediate) return;
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, [immediate]);
  const on = immediate ? mounted : inView;
  return createElement(
    as,
    { ref, id, className: `${className} ${on ? "is-in" : ""}` },
    <>
      <span className="sr-only">{lines.join(" ")}</span>
      {lines.map((l, i) => (
        <span key={i} className="line-mask" aria-hidden>
          <span>{l}</span>
        </span>
      ))}
    </>,
  );
}

/** Wrapper that fades its children in on first view. */
export function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className={`fade-in ${inView ? "is-in" : ""} ${className}`}>
      {children}
    </div>
  );
}

/** Pulls its child gently toward the pointer (fine pointers only). */
export function Magnetic({ children, strength = 0.28 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const leave = () => {
      el.style.transform = "";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [reduced, strength]);
  return (
    <span ref={ref} className="inline-flex transition-transform duration-500 ease-[var(--ease-out-soft)] will-change-transform">
      {children}
    </span>
  );
}

/** Scroll-linked word reveal: words brighten as the block moves up the screen. */
export function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-w]"));
    if (reduced) {
      spans.forEach((s) => (s.style.opacity = "1"));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.55 + r.height * 0.6)));
      const lit = p * spans.length;
      spans.forEach((s, i) => {
        s.style.opacity = String(0.16 + 0.84 * Math.min(1, Math.max(0, lit - i)));
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <span key={i} data-w className="transition-opacity duration-300" style={{ opacity: 0.16 }}>
            {w}{" "}
          </span>
        ))}
      </span>
    </p>
  );
}

/** Counts up to a number once visible. Keeps any suffix (e.g. "12K"). */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.5);
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const hasMatch = Boolean(match);
  const [n, setN] = useState(0);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (!inView || !hasMatch || reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / 1600);
      setN(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, target, hasMatch]);
  if (!match) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      <span aria-hidden>
        {reduced && inView ? target : n}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
