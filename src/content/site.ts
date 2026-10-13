/**
 * Business facts for the site.
 *
 * VERIFIED fields come from the public Instagram profile metadata for
 * @pm_usa77, checked 13 Oct 2026. The profile itself is 18+ age-restricted,
 * so posts, highlights, the bio link and contact buttons could not be viewed
 * without logging in.
 *
 * UNVERIFIED fields are intentionally empty. Every component hides a field
 * while it is empty, so nothing invented ever renders. Fill them in only with
 * details the studio has confirmed.
 */

export type PortfolioItem = {
  /** Path under /public, e.g. "/work/ombre-brows-01.jpg" */
  src: string;
  alt: string;
  service: "Ombré brows" | "Nude blush lips" | "Eyes" | "SMP";
  /** Fresh or healed — say which, never mix in someone else's work. */
  stage?: "Fresh" | "Healed";
  /** Who made the photo / where it was first posted. */
  credit: string;
  /** Set true only once the client has given written permission. */
  clientPermission: boolean;
  width: number;
  height: number;
};

export const site = {
  // ── Verified ────────────────────────────────────────────────────────────
  handle: "pm_usa77",
  instagramName: "PERMANENT MAKEUP / SMP Jersey City",
  instagramUrl: "https://www.instagram.com/pm_usa77/",
  /** Opens a direct message thread with the account. */
  instagramDmUrl: "https://ig.me/m/pm_usa77",
  city: "Jersey City",
  region: "NJ",
  country: "US",
  /** Words from the studio's own Instagram bio. */
  bioLine: "Say goodbye to overplucked brows & fading hairlines",
  bioSignoff: "Be beautiful 24/7",

  // ── Unverified: leave empty until the studio confirms ──────────────────
  artistName: "",
  streetAddress: "",
  postalCode: "",
  phone: "", // E.164, e.g. "+12015550123"
  email: "",
  bookingUrl: "", // e.g. a Square / Vagaro / Glossgenius booking page
  hours: "", // e.g. "Tue–Sat, by appointment"

  /** Production URL. Set NEXT_PUBLIC_SITE_URL in Vercel once a domain exists. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

/**
 * Real client photos go here, copied into /public/work/.
 * Add an item only when clientPermission is true.
 */
export const portfolio: PortfolioItem[] = [];

/** The "Work" section and its nav links only appear once there are permitted photos. */
export const hasPortfolio = portfolio.some((p) => p.clientPermission);

/**
 * Review mode shows small "to confirm" notes beside anything the studio still
 * needs to check. On by default for the demo; set NEXT_PUBLIC_REVIEW_MODE=false
 * for the real launch.
 */
export const reviewMode = process.env.NEXT_PUBLIC_REVIEW_MODE !== "false";

export const sources = [
  {
    label: "Instagram profile @pm_usa77 (public page metadata)",
    url: "https://www.instagram.com/pm_usa77/",
    checked: "13 Oct 2026",
  },
];
