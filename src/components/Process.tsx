"use client";

import { useEffect, useRef } from "react";
import { process } from "@/content/copy";
import { RevealHeading, usePrefersReducedMotion } from "./motion";
import { ReviewNote } from "./ReviewNote";

/** Five steps on a line that fills as the section scrolls through. */
export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;
    if (reduced) {
      line.style.transform = "scaleX(1)";
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / (r.height * 0.7)));
      line.style.transform = `scaleX(${p})`;
      section.querySelectorAll<HTMLElement>("[data-step]").forEach((el, i, all) => {
        el.dataset.on = String(p >= (i + 0.35) / all.length);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section id="process" ref={sectionRef} aria-labelledby="process-h" className="bg-porcelain">
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <RevealHeading
            id="process-h"
            lines={["From first message", "to healed result"]}
            className="display text-[clamp(3.25rem,8vw,7rem)] lg:col-span-9"
          />
          <p className="max-w-[30ch] text-[1.1875rem] text-ink/75 lg:col-span-3 lg:pb-3">
            What to expect, from your first message to the touch-up.
          </p>
        </div>

        <div className="relative mt-10 lg:mt-16">
          <div aria-hidden className="absolute left-0 right-0 top-[1.9rem] hidden h-px bg-ink/10 lg:block">
            <div ref={lineRef} className="h-full origin-left bg-lip-deep" style={{ transform: "scaleX(0)" }} />
          </div>
          <ol className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-8 lg:overflow-visible lg:px-0">
            {process.map((step, i) => (
              <li
                key={step.title}
                data-step
                data-on={reduced ? "true" : "false"}
                className="group relative w-[78%] shrink-0 snap-start rounded-[3px] bg-skin/60 p-6 sm:w-[46%] lg:w-auto lg:bg-transparent lg:p-0"
              >
                <span
                  aria-hidden
                  className="display relative z-10 inline-flex h-[3.8rem] w-[3.8rem] items-center justify-center rounded-full border border-ink/20 bg-porcelain text-[2rem] text-ink/40 transition-all duration-700 group-data-[on=true]:border-lip-deep group-data-[on=true]:bg-lip-deep group-data-[on=true]:text-porcelain"
                >
                  {i + 1}
                </span>
                <h3 className="mt-5 text-[1.375rem] font-semibold leading-tight lg:text-[1.5rem]">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink/75">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[0.875rem] text-taupe lg:hidden" aria-hidden>
            Swipe for all five steps
          </p>
        </div>
        <ReviewNote className="mt-8 max-w-2xl">
          These steps describe a typical permanent makeup appointment. Check they match how the studio works, especially
          touch-up timing and how SMP sessions are structured.
        </ReviewNote>
      </div>
    </section>
  );
}
