import Image from "next/image";
import { aftercare, beforeVisit, services } from "@/content/copy";
import { portfolio, reviewMode, site } from "@/content/site";
import { CountUp, FadeIn, Magnetic, RevealHeading, WordReveal } from "./motion";
import { ReviewNote } from "./ReviewNote";

const wrap = "mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12";

function BrowGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 24" aria-hidden className={className}>
      <path
        d="M2 18 C1.5 15 3.5 13.5 8 13 C20 11 30 8 40 6 C47 4.8 55 6.5 62 12 C55 10 48 9.6 42 10.6 C31 12.4 20 15.6 10 18.4 C5.5 19.6 2.3 20 2 18 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Marquee() {
  const items = services.map((s) => s.name);
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className="display px-6 text-[clamp(2.75rem,7vw,6rem)] leading-none text-ink lg:px-10">{t}</span>
          <BrowGlyph className="h-5 w-12 text-lip-deep lg:h-7 lg:w-16" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee overflow-hidden border-y border-ink/10 bg-skin py-6 lg:py-8">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export function Statement() {
  return (
    <section aria-label="From the studio" className="bg-skin">
      <div className={`${wrap} py-16 lg:py-24`}>
        <figure>
          <blockquote>
            <WordReveal
              text={`“${site.bioLine}.”`}
              className="display max-w-[16ch] text-[clamp(3rem,8.6vw,8.25rem)] leading-[0.95] text-ink"
            />
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4 text-[1.0625rem] text-taupe">
            <span aria-hidden className="h-px w-12 bg-lip-deep" />
            From the studio’s Instagram bio, signed off “{site.bioSignoff}.”
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function Work() {
  const items = portfolio.filter((p) => p.clientPermission);
  const hasWork = items.length > 0;
  return (
    <section id="work" aria-labelledby="work-h" className="grain relative isolate overflow-hidden bg-ink-deep text-skin">
      <Image src="/art/pigment-dark.webp" alt="" fill sizes="100vw" className="-z-10 scale-x-[-1] object-cover opacity-70" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-deep/40 via-ink-deep/60 to-ink-deep" />
      <div className={`${wrap} py-16 lg:py-24`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <RevealHeading
              id="work-h"
              lines={hasWork ? ["Recent work"] : ["See the work", "on Instagram"]}
              className="display text-[clamp(3.25rem,8vw,7rem)]"
            />
            <p className="mt-6 max-w-[44ch] text-[1.1875rem] text-skin/80 lg:text-[1.3125rem]">
              Fresh and healed results are posted at @{site.handle}. Instagram may ask you to log in to view the profile.
            </p>
            <div className="mt-8">
              <Magnetic>
                <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-skin">
                  Open @{site.handle}
                </a>
              </Magnetic>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-6 border-t border-skin/15 pt-6 lg:col-span-4">
            <div>
              <dt className="text-[0.9375rem] text-skin/60">Posts</dt>
              <dd className="display mt-1 text-[clamp(3.5rem,7vw,5.5rem)] leading-none">
                <CountUp value={site.instagramStats.posts} />
              </dd>
            </div>
            <div>
              <dt className="text-[0.9375rem] text-skin/60">Followers</dt>
              <dd className="display mt-1 text-[clamp(3.5rem,7vw,5.5rem)] leading-none">
                <CountUp value={site.instagramStats.followers} />
              </dd>
            </div>
            <p className="col-span-2 text-[0.875rem] text-skin/50">On Instagram as of {site.instagramStats.checked}.</p>
          </dl>
        </div>

        {hasWork ? (
          <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
            {items.map((p) => (
              <li key={p.src}>
                <figure className="group overflow-hidden">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <figcaption className="mt-2 text-[0.875rem] text-skin/70">
                    {p.service}
                    {p.stage ? `, ${p.stage.toLowerCase()}` : ""}. Photo: {p.credit}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          reviewMode && (
            <FadeIn className="mt-12">
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:gap-3" aria-label="Empty portfolio slots">
                {["Ombré brows", "Nude blush lips", "Eyes", "SMP hairline", "SMP density", "Healed result"].map((label) => (
                  <li
                    key={label}
                    className="flex aspect-square flex-col justify-end rounded-[3px] border border-dashed border-skin/25 bg-ink-deep/40 p-3 text-[0.75rem] leading-snug text-skin/60 backdrop-blur-sm"
                  >
                    <span className="text-skin/90">{label}</span>
                    <span>Client photo, with permission</span>
                  </li>
                ))}
              </ul>
              <ReviewNote tone="dark" className="mt-4 max-w-2xl">
                The Instagram profile is 18+ restricted, so no photos could be collected. Send originals you have
                permission to use and they go in <code>src/content/site.ts</code>. These slots disappear when review mode
                is off.
              </ReviewNote>
            </FadeIn>
          )
        )}
      </div>
    </section>
  );
}

export function Care() {
  return (
    <section id="care" aria-labelledby="care-h" className="bg-skin">
      <div className={`${wrap} grid gap-10 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24`}>
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <RevealHeading id="care-h" lines={["Safety &", "aftercare"]} className="display text-[clamp(3.25rem,8vw,7rem)]" />
            <p className="mt-6 max-w-[40ch] text-[1.1875rem] text-ink/80 lg:text-[1.3125rem]">
              Permanent makeup and SMP are cosmetic tattooing, so healing well matters as much as the session. The written
              aftercare you get at your appointment comes first.
            </p>
            <div className="relative mt-8 hidden aspect-[5/3] overflow-hidden rounded-[3px] lg:block">
              <Image src="/art/pigment-lip.webp" alt="" fill sizes="40vw" className="object-cover" />
            </div>
          </div>
        </div>
        <div className="grid gap-4 lg:col-span-7">
          {[
            { title: "Before your visit", items: beforeVisit },
            { title: "While it heals", items: aftercare },
          ].map((group) => (
            <FadeIn key={group.title}>
              <div className="rounded-[3px] bg-porcelain p-6 lg:p-9">
                <h3 className="display text-[2.5rem] leading-none lg:text-[3rem]">{group.title}</h3>
                <ul className="mt-6 divide-y divide-ink/10">
                  {group.items.map((t) => (
                    <li key={t} className="flex gap-4 py-4 text-[1.0625rem] leading-relaxed text-ink/85 lg:text-[1.125rem]">
                      <BrowGlyph className="mt-[0.45em] h-3 w-8 shrink-0 text-lip-deep" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
          <ReviewNote className="max-w-2xl">
            Add the studio’s own aftercare sheet and any licensing or health-permit details once provided. None were
            published on Instagram, so none are stated.
          </ReviewNote>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const hasAddress = Boolean(site.streetAddress);
  return (
    <footer className="overflow-hidden bg-ink-deep text-skin/75">
      <div className={`${wrap} grid gap-10 pt-14 md:grid-cols-12`}>
        <p className="max-w-[28ch] text-[1.1875rem] text-skin md:col-span-5">
          Permanent makeup and scalp micropigmentation in {site.city}, New Jersey.
        </p>
        <address className="text-[1rem] not-italic md:col-span-4">
          {hasAddress && (
            <p>
              {site.streetAddress}
              <br />
              {site.city}, {site.region} {site.postalCode}
            </p>
          )}
          {site.phone && (
            <p className="mt-2">
              <a href={`tel:${site.phone}`} className="ulink hover:text-skin">
                {site.phone}
              </a>
            </p>
          )}
          {site.email && (
            <p className="mt-2">
              <a href={`mailto:${site.email}`} className="ulink hover:text-skin">
                {site.email}
              </a>
            </p>
          )}
          <p className={hasAddress || site.phone || site.email ? "mt-2" : ""}>
            <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="ulink hover:text-skin">
              Instagram: @{site.handle}
            </a>
          </p>
          {site.hours && <p className="mt-2">{site.hours}</p>}
        </address>
        <nav aria-label="Footer" className="text-[1rem] md:col-span-3">
          <ul className="grid grid-cols-2 gap-2">
            {[
              ["#services", "Services"],
              ["#process", "Process"],
              ["#work", "Work"],
              ["#care", "Care"],
              ["#faq", "FAQ"],
              ["#book", "Book"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="ulink hover:text-skin">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p aria-hidden className="display select-none whitespace-nowrap px-3 pt-8 text-center text-[24vw] leading-[0.78] text-skin/[0.07]">
        pm_usa77
      </p>
      <div className={`${wrap} border-t border-skin/10 py-5 text-[0.875rem] text-skin/50`}>
        <p>
          © 2026 @{site.handle}.
          {reviewMode && " Website preview. Some details are awaiting confirmation from the studio."}
        </p>
      </div>
    </footer>
  );
}
