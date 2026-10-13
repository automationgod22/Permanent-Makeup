"use client";

import { useId, useState } from "react";
import { faqs } from "@/content/copy";
import { RevealHeading } from "./motion";
import { ReviewNote } from "./ReviewNote";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <section id="faq" aria-labelledby="faq-h" className="bg-surface-2 dark:border-t dark:border-fg/[0.07]">
      <div className="mx-auto grid max-w-[1500px] gap-8 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:py-24">
        <div className="lg:col-span-4">
          <RevealHeading id="faq-h" lines={["Questions"]} className="display text-[clamp(3.25rem,8vw,7rem)]" />
          <p className="mt-5 max-w-[30ch] text-[1.1875rem] text-fg/75">Anything else, ask in your Instagram message.</p>
        </div>
        <div className="border-t border-fg/15 lg:col-span-8">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const btn = `${base}-q${i}`;
            const panel = `${base}-a${i}`;
            return (
              <div key={f.q} className="border-b border-fg/15">
                <h3>
                  <button
                    id={btn}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left lg:py-6"
                  >
                    <span className={`text-[1.3125rem] font-medium leading-snug transition-colors lg:text-[1.625rem] ${isOpen ? "text-fg" : "text-fg/80 group-hover:text-fg"}`}>
                      {f.q}
                    </span>
                    <span
                      aria-hidden
                      className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                        isOpen ? "rotate-45 border-fg bg-fg text-surface" : "border-fg/25 text-fg group-hover:border-fg"
                      }`}
                    >
                      <span className="absolute h-px w-4 bg-current" />
                      <span className="absolute h-4 w-px bg-current" />
                    </span>
                  </button>
                </h3>
                <div id={panel} role="region" aria-labelledby={btn} className="acc-panel" data-open={isOpen} inert={!isOpen}>
                  <div>
                    <div className="pb-6 pr-14">
                      <p className="max-w-[60ch] text-[1.125rem] leading-relaxed text-fg/80">{f.a}</p>
                      {f.toConfirm && <ReviewNote className="mt-4 max-w-[60ch]">{f.toConfirm}</ReviewNote>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
