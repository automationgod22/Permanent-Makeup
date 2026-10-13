import type { ServiceKey } from "@/content/copy";

/* Fine-line illustrations, one per service. Pure SVG, no photos implied. */

const TAUPE = "#6e5a52";
const LIP = "#c98b83";
const MAP = "#d24e63";

function Brows() {
  const d =
    "M44 128 C40 114 50 104 72 100 C122 91 182 76 226 67 C258 61 294 72 322 96 C292 88 258 86 230 91 C182 99 122 114 78 126 C60 131 46 134 44 128 Z";
  return (
    <svg viewBox="0 0 360 200" aria-hidden className="h-auto w-full">
      <defs>
        <linearGradient id="sv-brow-g" x1="44" x2="322" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.65" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="sv-brow-m" maskUnits="userSpaceOnUse">
          <rect width="360" height="200" fill="url(#sv-brow-g)" />
        </mask>
        <pattern id="sv-brow-p" width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.05" fill={TAUPE} />
        </pattern>
        <clipPath id="sv-brow-c">
          <path d={d} />
        </clipPath>
      </defs>
      <g clipPath="url(#sv-brow-c)" mask="url(#sv-brow-m)">
        <rect width="360" height="200" fill={TAUPE} opacity="0.35" />
        <rect width="360" height="200" fill="url(#sv-brow-p)" />
      </g>
      <path d="M44 40 V170 M226 40 V170 M322 40 V170" stroke={MAP} strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}

function Lips() {
  const outline =
    "M40 104 C70 80 108 62 140 66 C156 68 168 76 180 84 C192 76 204 68 220 66 C252 62 290 80 320 104 C286 132 236 152 180 152 C124 152 74 132 40 104 Z";
  return (
    <svg viewBox="0 0 360 200" aria-hidden className="h-auto w-full">
      <defs>
        <radialGradient id="sv-lip-g" cx="0.5" cy="0.55" r="0.6">
          <stop offset="0" stopColor={LIP} stopOpacity="0.75" />
          <stop offset="0.7" stopColor={LIP} stopOpacity="0.5" />
          <stop offset="1" stopColor={LIP} stopOpacity="0.2" />
        </radialGradient>
      </defs>
      <path d={outline} fill="url(#sv-lip-g)" />
      <path d={outline} fill="none" stroke={TAUPE} strokeWidth="1" />
      <path d="M44 104 C100 112 140 108 180 104 C220 108 260 112 316 104" fill="none" stroke={TAUPE} strokeWidth="0.9" />
    </svg>
  );
}

function Eyes() {
  const lashes = Array.from({ length: 13 }, (_, i) => {
    const t = (i + 1) / 14;
    const x = 60 + t * 240;
    const y = 112 - Math.sin(t * Math.PI) * 38;
    const len = 10 + Math.sin(t * Math.PI) * 10;
    const tilt = (t - 0.5) * 18;
    return `M${x.toFixed(1)} ${y.toFixed(1)} l${tilt.toFixed(1)} ${(-len).toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 360 200" aria-hidden className="h-auto w-full">
      <path d="M52 114 C120 52 240 52 308 114" fill="none" stroke={TAUPE} strokeWidth="5" strokeLinecap="round" />
      <path d="M52 114 C120 52 240 52 308 114" fill="none" stroke={TAUPE} strokeWidth="1" />
      <path d={lashes} stroke={TAUPE} strokeWidth="1" strokeLinecap="round" />
      <path d="M52 114 C120 160 240 160 308 114" fill="none" stroke={TAUPE} strokeWidth="0.9" opacity="0.7" />
      <path d="M308 114 l18 -8" stroke={MAP} strokeWidth="0.9" />
    </svg>
  );
}

/** Deterministic pseudo-random so server and client render the same dots. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function Smp() {
  const rand = seeded(77);
  const dots: { x: number; y: number; r: number }[] = [];
  for (let i = 0; i < 3200; i++) {
    const x = 6 + rand() * 348;
    const y = 4 + rand() * 192;
    // hairline curve: denser above it, fading out toward the forehead
    const hairline = 112 + Math.cos(((x - 180) / 160) * Math.PI) * 30;
    const dist = y - hairline;
    const edge = Math.min(1, y / 70) * Math.min(1, x / 60) * Math.min(1, (360 - x) / 60);
    const keep = (dist < 0 ? 0.95 : Math.max(0, 0.95 - dist / 22)) * edge;
    if (rand() < keep) dots.push({ x, y, r: 0.7 + rand() * 0.6 });
  }
  return (
    <svg viewBox="0 0 360 200" aria-hidden className="h-auto w-full">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r={d.r.toFixed(2)} fill={TAUPE} />
      ))}
      <path
        d="M20 82 C90 154 270 154 340 82"
        fill="none"
        stroke={MAP}
        strokeWidth="0.9"
        strokeDasharray="3 5"
        opacity="0.8"
      />
    </svg>
  );
}

export function ServiceArt({ name }: { name: ServiceKey }) {
  switch (name) {
    case "brows":
      return <Brows />;
    case "lips":
      return <Lips />;
    case "eyes":
      return <Eyes />;
    case "smp":
      return <Smp />;
  }
}
