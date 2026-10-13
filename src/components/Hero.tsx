import Image from "next/image";
import { services } from "@/content/copy";
import { site } from "@/content/site";
import { Magnetic, RevealHeading } from "./motion";
import { PigmentCanvas } from "./PigmentCanvas";

const BROW =
  "M104 206 C98 184 114 168 150 161 C232 146 330 121 402 106 C452 97 512 114 560 152 C510 140 452 136 406 144 C330 157 232 181 160 201 C130 209 108 214 104 206 Z";

const guides: { d: string; delay: number }[] = [
  { d: "M104 34 V326", delay: 0.5 },
  { d: "M402 34 V326", delay: 0.65 },
  { d: "M560 34 V326", delay: 0.8 },
  { d: "M40 104 H612", delay: 0.95 },
  { d: "M40 212 H612", delay: 1.05 },
  { d: "M70 346 L612 130", delay: 1.15 },
];

function BrowMap() {
  return (
    <svg viewBox="0 0 640 360" className="h-auto w-full" role="img" aria-labelledby="browmap-title">
      <title id="browmap-title">
        Brow mapping: guide lines mark where the brow starts, arches and ends, then an ombré brow fills in from soft to
        defined.
      </title>
      <defs>
        <linearGradient id="ombre" x1="104" x2="560" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="0.3" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.65" stopColor="#fff" stopOpacity="0.92" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <pattern id="powder" width="4.5" height="4.5" patternUnits="userSpaceOnUse">
          <circle cx="2.25" cy="2.25" r="1.05" fill="#e2c3b5" />
        </pattern>
        <mask id="ombre-mask" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="640" height="360" fill="url(#ombre)" />
        </mask>
        <clipPath id="brow-clip">
          <path d={BROW} />
        </clipPath>
      </defs>
      <g fill="none" stroke="#d24e63" strokeWidth="1" strokeLinecap="round" opacity="0.9">
        {guides.map((l) => (
          <path key={l.d} d={l.d} pathLength={1} className="map-line" style={{ animationDelay: `${l.delay}s` }} />
        ))}
      </g>
      <g clipPath="url(#brow-clip)" mask="url(#ombre-mask)">
        <g className="brow-wipe">
          <rect x="90" y="90" width="480" height="130" fill="#9c786b" />
          <rect x="90" y="90" width="480" height="130" fill="url(#powder)" />
        </g>
      </g>
      <path d={BROW} fill="none" stroke="#d24e63" strokeWidth="1.1" pathLength={1} className="map-line" style={{ animationDelay: "1.3s", animationDuration: "1.5s" }} />
      <g fill="#d24e63" className="map-label" style={{ animationDelay: "1.5s" }}>
        <circle cx="104" cy="196" r="3.2" />
        <circle cx="402" cy="106" r="3.2" />
        <circle cx="560" cy="152" r="3.2" />
      </g>
      <g className="map-label" fill="#e7d2c6" fontSize="14" fontStyle="italic" fontFamily="var(--font-hanken), sans-serif" style={{ animationDelay: "1.7s" }}>
        <text x="112" y="44">start</text>
        <text x="410" y="44">arch</text>
        <text x="568" y="44">tail</text>
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section id="top" className="grain relative isolate overflow-hidden bg-ink-deep text-skin">
      <Image src="/art/pigment-dark.webp" alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-90" />
      <PigmentCanvas className="absolute inset-0 -z-10 h-full w-full" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-deep/80 via-ink-deep/30 to-transparent" />

      <div className="mx-auto flex max-w-[1500px] flex-col px-5 pb-8 pt-24 lg:min-h-[100svh] sm:px-8 lg:px-12 lg:pb-10 lg:pt-28">
        <div className="grid flex-1 items-center gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <RevealHeading
              as="h1"
              immediate
              lines={["Wake up with", "your brows", "already done."]}
              className="display text-[clamp(3.4rem,9.2vw,8.75rem)] leading-[0.9]"
            />
            <p className="fade-in is-in mt-6 max-w-[30ch] text-[1.25rem] leading-snug text-skin/85 lg:mt-8 lg:text-[1.5rem]">
              Ombré brows, nude blush lips, eye definition and scalp micropigmentation in {site.city}, {site.region}.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-10">
              <Magnetic>
                <a href="#book" className="btn btn-skin w-full sm:w-auto">
                  Book a consultation
                </a>
              </Magnetic>
              <Magnetic>
                <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light w-full sm:w-auto">
                  See the work on Instagram
                </a>
              </Magnetic>
            </div>
          </div>
          <div className="relative -mx-3 mt-4 lg:col-span-4 lg:mx-0 lg:mt-0">
            <BrowMap />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-t border-skin/15 pt-5 text-[0.9375rem] text-skin/70">
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {services.map((s) => (
              <li key={s.key}>
                <a href={`#service-${s.key}`} className="ulink hover:text-skin">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
          <p>{site.city}, New Jersey</p>
        </div>
      </div>
    </section>
  );
}
