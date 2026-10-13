"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { services, type ServiceKey } from "@/content/copy";
import { Magnetic, RevealHeading, usePrefersReducedMotion } from "./motion";
import { ReviewNote } from "./ReviewNote";
import { ServiceArt } from "./ServiceArt";

const art: Record<ServiceKey, string> = {
  brows: "/art/pigment-powder.webp",
  lips: "/art/pigment-lip.webp",
  eyes: "/art/pigment-eye.webp",
  smp: "/art/pigment-smp.webp",
};

const ctaLabel: Record<ServiceKey, string> = {
  brows: "Ask about ombré brows",
  lips: "Ask about nude blush lips",
  eyes: "Ask about eye definition",
  smp: "Ask about SMP",
};

export const PRESELECT_EVENT = "pm:preselect";

export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();
  const s = services[active];

  // Links like #service-lips (from the hero) select that service.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#service-"]');
      if (!a) return;
      const key = a.getAttribute("href")!.replace("#service-", "");
      const i = services.findIndex((x) => x.key === key);
      if (i >= 0) setActive(i);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Gentle 3D tilt of the image stage toward the pointer.
  useEffect(() => {
    const el = stageRef.current;
    if (!el || reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1200px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    };
    const leave = () => (el.style.transform = "");
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [reduced]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + services.length) % services.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="services" aria-labelledby="services-h" className="relative bg-surface">
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <RevealHeading
            id="services-h"
            lines={["Brows, lips,", "eyes & hairlines"]}
            className="display text-[clamp(3.25rem,8vw,7rem)] lg:col-span-8"
          />
          <p className="max-w-[38ch] text-[1.1875rem] text-fg/75 lg:col-span-4 lg:pb-3 lg:text-[1.3125rem]">
            Every treatment starts with a consultation, so shape and colour are planned around your face, skin and hair.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          {/* image stage */}
          <div className="lg:order-2 lg:col-span-6">
            <div className="lg:sticky lg:top-24">
              <div
                ref={stageRef}
                className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-surface-3 shadow-[0_40px_80px_-40px_rgba(42,29,36,0.45)] dark:shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-[var(--ease-out-soft)] sm:aspect-[5/4] lg:aspect-[4/5]"
              >
                {services.map((x, i) => (
                  <Image
                    key={x.key}
                    src={art[x.key]}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="stage-img object-cover dark:brightness-[0.86]"
                    data-active={i === active}
                  />
                ))}
                <div className="absolute inset-x-4 bottom-4 rounded-[3px] bg-porcelain/70 px-6 py-5 backdrop-blur-md sm:inset-x-6 sm:bottom-6 lg:px-8 lg:py-7">
                  <div key={s.key} className="mx-auto max-w-[360px] animate-[fade_0.8s_ease_forwards] opacity-0">
                    <ServiceArt name={s.key} />
                  </div>
                </div>
                <p className="absolute left-5 top-4 rounded-full bg-ink/70 px-3 py-1 text-[0.75rem] text-skin/85 backdrop-blur sm:left-6 sm:top-6">
                  Illustration
                </p>
              </div>
            </div>
          </div>

          {/* list */}
          <div className="lg:order-1 lg:col-span-6">
            <div role="tablist" aria-label="Services" aria-orientation="vertical" onKeyDown={onKeyDown} className="border-t border-fg/15">
              {services.map((x, i) => {
                const on = i === active;
                return (
                  <button
                    key={x.key}
                    id={`service-${x.key}`}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    type="button"
                    aria-selected={on}
                    aria-controls="service-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                    className="group relative flex w-full scroll-mt-24 items-baseline justify-between gap-4 border-b border-fg/15 py-4 text-left lg:py-5"
                  >
                    <span
                      aria-hidden
                      className={`absolute bottom-[-1px] left-0 h-px bg-fg transition-[width] duration-700 ease-[var(--ease-out-soft)] ${on ? "w-full" : "w-0"}`}
                    />
                    <span
                      className={`display text-[clamp(2.25rem,4.2vw,4rem)] transition-[color,transform] duration-500 ease-[var(--ease-out-soft)] ${
                        on ? "translate-x-0 text-fg" : "text-fg/30 group-hover:text-fg/60"
                      } ${on ? "lg:translate-x-3" : ""}`}
                    >
                      {x.name}
                    </span>
                    <span
                      aria-hidden
                      className={`h-3 w-3 shrink-0 rounded-full border border-fg transition-all duration-500 ${on ? "scale-100 bg-accent" : "scale-75 bg-transparent opacity-40"}`}
                    />
                  </button>
                );
              })}
            </div>

            <div id="service-panel" role="tabpanel" aria-labelledby={`service-${s.key}`} className="pt-7">
              <div key={s.key} className="animate-[fade_0.7s_ease_forwards] opacity-0">
                <p className="max-w-[46ch] text-[1.1875rem] leading-relaxed text-fg/85 lg:text-[1.3125rem]">{s.summary}</p>
                <p className="mt-4 text-[1.0625rem] text-fg-muted">
                  <span className="font-semibold text-fg">Good for</span>{" "}
                  {s.goodFor.charAt(0).toLowerCase() + s.goodFor.slice(1)}
                </p>
                {s.toConfirm && <ReviewNote className="mt-4 max-w-[46ch]">{s.toConfirm}</ReviewNote>}
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Magnetic>
                    <a
                      href="#book"
                      onClick={() => window.dispatchEvent(new CustomEvent(PRESELECT_EVENT, { detail: s.name }))}
                      className="btn btn-ink"
                    >
                      {ctaLabel[s.key]}
                    </a>
                  </Magnetic>
                  <p className="text-[1rem] text-fg-muted">Pricing is quoted at consultation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
