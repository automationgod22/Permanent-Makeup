"use client";

import { createElement, Fragment, useEffect, useRef, useState } from "react";

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

/**
 * Words rise into place once, when the text scrolls into view, and stay at full
 * contrast. Words wrap naturally at any width.
 */
export function WordRise({ text, className = "" }: { text: string; className?: string }) {
  const [ref, inView] = useInView<HTMLParagraphElement>(0.3);
  const words = text.split(" ");
  return (
    <p ref={ref} className={`${className} ${inView ? "is-in" : ""}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="word-rise">
              <span style={{ transitionDelay: `${i * 55}ms` }}>{w}</span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </span>
    </p>
  );
}
