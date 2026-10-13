import { site } from "@/content/site";

const BROW =
  "M104 206 C98 184 114 168 150 161 C232 146 330 121 402 106 C452 97 512 114 560 152 C510 140 452 136 406 144 C330 157 232 181 160 201 C130 209 108 214 104 206 Z";

const lines: { d: string; delay: number }[] = [
  { d: "M104 34 V326", delay: 0.1 },
  { d: "M402 34 V326", delay: 0.25 },
  { d: "M560 34 V326", delay: 0.4 },
  { d: "M40 104 H612", delay: 0.55 },
  { d: "M40 212 H612", delay: 0.65 },
  { d: "M70 346 L612 130", delay: 0.75 },
];

function BrowMap() {
  return (
    <svg
      viewBox="0 0 640 360"
      className="h-auto w-full"
      role="img"
      aria-labelledby="browmap-title"
    >
      <title id="browmap-title">
        Illustration of brow mapping: guide lines mark where the brow starts, arches and ends, then an ombré brow fills in from light to dense.
      </title>
      <defs>
        <linearGradient id="ombre" x1="104" x2="560" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity="0.12" />
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

      {/* mapping guides */}
      <g fill="none" stroke="#d24e63" strokeWidth="1" strokeLinecap="round" opacity="0.85">
        {lines.map((l) => (
          <path key={l.d} d={l.d} pathLength={1} className="map-line" style={{ animationDelay: `${l.delay}s` }} />
        ))}
      </g>

      {/* the brow: pigment powder built up front-to-tail */}
      <g clipPath="url(#brow-clip)" mask="url(#ombre-mask)">
        <g className="brow-wipe">
          <rect x="90" y="90" width="480" height="130" fill="#9c786b" />
          <rect x="90" y="90" width="480" height="130" fill="url(#powder)" />
        </g>
      </g>
      <path
        d={BROW}
        fill="none"
        stroke="#d24e63"
        strokeWidth="1.1"
        pathLength={1}
        className="map-line"
        style={{ animationDelay: "0.9s", animationDuration: "1.4s" }}
      />

      {/* intersection points */}
      <g fill="#d24e63" className="map-label" style={{ animationDelay: "1.1s" }}>
        <circle cx="104" cy="196" r="3" />
        <circle cx="402" cy="106" r="3" />
        <circle cx="560" cy="152" r="3" />
      </g>

      <g
        className="map-label"
        fill="#b9a7a6"
        fontSize="13"
        fontStyle="italic"
        fontFamily="var(--font-hanken), sans-serif"
        style={{ animationDelay: "1.3s" }}
      >
        <text x="112" y="44">start</text>
        <text x="410" y="44">arch</text>
        <text x="568" y="44">tail</text>
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink text-skin">
      <div className="mx-auto grid max-w-7xl items-end gap-10 lg:items-center px-5 pb-16 pt-28 sm:px-8 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-6 lg:pb-24 lg:pt-36">
        <div className="lg:order-2 lg:col-span-6 lg:self-center">
          <div className="-mx-4 sm:mx-0">
            <BrowMap />
          </div>
        </div>

        <div className="hero-copy lg:order-1 lg:col-span-6">
          <h1 className="display text-[clamp(3.1rem,11vw,6rem)] lg:pr-6" style={{ animationDelay: "0.2s" }}>
            Wake up with your brows already done.
          </h1>
          <p className="mt-6 max-w-[34ch] text-lg text-skin/80" style={{ animationDelay: "0.45s" }}>
            Ombré brows, nude blush lips, eye definition and scalp micropigmentation in {site.city}, {site.region}.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.65s" }}>
            <a
              href="#book"
              className="rounded-full bg-skin px-7 py-4 text-center font-medium text-ink transition-colors hover:bg-porcelain"
            >
              Book a consultation
            </a>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-skin/35 px-7 py-4 text-center text-skin transition-colors hover:border-skin"
            >
              See the work on Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
