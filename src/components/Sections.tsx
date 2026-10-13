import Image from "next/image";
import { aftercare, beforeVisit, faqs, process, services } from "@/content/copy";
import { portfolio, reviewMode, site } from "@/content/site";
import { ReviewNote } from "./ReviewNote";
import { ServiceArt } from "./ServiceArt";

const wrap = "mx-auto max-w-7xl px-5 sm:px-8";

export function Intro() {
  return (
    <section aria-labelledby="intro-quote" className="border-b border-ink/10 bg-skin">
      <div className={`${wrap} py-20 lg:py-28`}>
        <figure className="max-w-5xl">
          <blockquote id="intro-quote" className="display text-[clamp(2.4rem,6.4vw,5rem)] text-ink">
            “{site.bioLine}.”
          </blockquote>
          <figcaption className="mt-6 text-[0.9375rem] text-taupe">
            From the studio’s Instagram bio, where it signs off with “{site.bioSignoff}.”
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-h" className="bg-skin">
      <div className={`${wrap} py-20 lg:py-28`}>
        <div className="max-w-2xl">
          <h2 id="services-h" className="display text-[clamp(2.6rem,6vw,4.5rem)]">
            Brows, lips, eyes and hairlines
          </h2>
          <p className="mt-5 max-w-[56ch] text-ink/75">
            Start with a consultation, so shape and colour can be planned around your face, skin and hair rather than
            a template.
          </p>
        </div>

        <ul className="mt-16 lg:mt-20">
          {services.map((s, i) => (
            <li
              key={s.key}
              className="grid items-center gap-8 border-t border-ink/15 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16"
            >
              <div className={`lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
                <div className="rounded-[2px] bg-porcelain/70 px-6 py-10 sm:px-12 sm:py-14">
                  <ServiceArt name={s.key} />
                </div>
              </div>
              <div className={`lg:col-span-6 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
                <h3 className="display text-[clamp(2.25rem,4.5vw,3.5rem)]">{s.name}</h3>
                <p className="mt-4 max-w-[52ch] text-ink/80">{s.summary}</p>
                <p className="mt-4 text-[0.9375rem] text-taupe">
                  <span className="font-semibold text-ink">Good for</span> {s.goodFor.charAt(0).toLowerCase() + s.goodFor.slice(1)}
                </p>
                {s.toConfirm && <ReviewNote className="mt-5 max-w-[52ch]">{s.toConfirm}</ReviewNote>}
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-start gap-4 border-t border-ink/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[48ch] text-ink/75">For pricing, ask in your consultation message.</p>
          <a href="#book" className="rounded-full bg-ink px-7 py-4 text-center font-medium text-skin transition-colors hover:bg-ink-soft">
            Book a consultation
          </a>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" aria-labelledby="process-h" className="bg-porcelain">
      <div className={`${wrap} py-20 lg:py-28`}>
        <h2 id="process-h" className="display max-w-3xl text-[clamp(2.6rem,6vw,4.5rem)]">
          From first message to healed result
        </h2>
        <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {process.map((step, i) => (
            <li key={step.title} className="border-t border-map/50 pt-5">
              <span className="display block text-[3.25rem] leading-none text-lip" aria-hidden>
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] text-ink/75">{step.body}</p>
            </li>
          ))}
        </ol>
        <ReviewNote className="mt-12 max-w-2xl">
          These steps describe a typical permanent makeup appointment. Check they match how the studio works,
          especially touch-up timing and how SMP sessions are structured.
        </ReviewNote>
      </div>
    </section>
  );
}

export function Work() {
  const hasWork = portfolio.length > 0;
  return (
    <section id="work" aria-labelledby="work-h" className="bg-ink text-skin">
      <div className={`${wrap} py-20 lg:py-28`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="work-h" className="display text-[clamp(2.6rem,6vw,4.5rem)]">
              {hasWork ? "Recent work" : "The portfolio lives on Instagram"}
            </h2>
            <p className="mt-5 max-w-[52ch] text-skin/75">
              The studio’s Instagram, @{site.handle}, had {site.instagramStats.posts} posts and about{" "}
              {site.instagramStats.followers} followers as of {site.instagramStats.checked}. Instagram may ask you to log in to
              view the profile.
            </p>
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-skin px-7 py-4 font-medium text-ink transition-colors hover:bg-porcelain"
            >
              View @{site.handle} on Instagram
            </a>
          </div>
        </div>

        {hasWork ? (
          <ul className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-5">
            {portfolio
              .filter((p) => p.clientPermission)
              .map((p) => (
                <li key={p.src}>
                  <figure>
                    <Image
                      src={p.src}
                      alt={p.alt}
                      width={p.width}
                      height={p.height}
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className="aspect-[4/5] w-full object-cover"
                    />
                    <figcaption className="mt-2 text-[0.8125rem] text-skin/70">
                      {p.service}
                      {p.stage ? `, ${p.stage.toLowerCase()}` : ""}. Photo: {p.credit}
                    </figcaption>
                  </figure>
                </li>
              ))}
          </ul>
        ) : (
          reviewMode && (
            <div className="mt-14">
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" aria-label="Empty portfolio slots">
                {["Ombré brows", "Nude blush lips", "Eyes", "SMP hairline", "SMP density", "Healed result"].map((label) => (
                  <li
                    key={label}
                    className="flex aspect-[3/4] flex-col justify-end border border-dashed border-skin/25 p-3 text-[0.75rem] leading-snug text-skin/55"
                  >
                    <span className="text-skin/85">{label}</span>
                    <span>Client photo, added with written permission</span>
                  </li>
                ))}
              </ul>
              <ReviewNote tone="dark" className="mt-6 max-w-2xl">
                The Instagram profile is 18+ restricted, so no photos could be collected for this demo. Send originals
                you have permission to use and they go in <code>src/content/site.ts</code>. These empty slots disappear
                when review mode is off.
              </ReviewNote>
            </div>
          )
        )}
      </div>
    </section>
  );
}

export function Care() {
  return (
    <section id="care" aria-labelledby="care-h" className="bg-skin">
      <div className={`${wrap} py-20 lg:py-28`}>
        <div className="max-w-3xl">
          <h2 id="care-h" className="display text-[clamp(2.6rem,6vw,4.5rem)]">
            Safety and aftercare
          </h2>
          <p className="mt-5 max-w-[56ch] text-ink/75">
            Permanent makeup and SMP are cosmetic tattooing, so healing well matters as much as the session. This is
            general guidance; the written aftercare you receive at your appointment takes priority.
          </p>
        </div>
        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="border-b border-ink/15 pb-3 text-lg font-semibold">Before your visit</h3>
            <ul className="mt-5 space-y-4">
              {beforeVisit.map((t) => (
                <li key={t} className="flex gap-4 text-ink/80">
                  <span aria-hidden className="mt-[0.7em] h-px w-5 shrink-0 bg-map" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="border-b border-ink/15 pb-3 text-lg font-semibold">While it heals</h3>
            <ul className="mt-5 space-y-4">
              {aftercare.map((t) => (
                <li key={t} className="flex gap-4 text-ink/80">
                  <span aria-hidden className="mt-[0.7em] h-px w-5 shrink-0 bg-map" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ReviewNote className="mt-12 max-w-2xl">
          Add the studio’s own aftercare sheet and any licensing or health-permit details here once provided. None were
          published on Instagram, so none are stated.
        </ReviewNote>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-h" className="bg-porcelain">
      <div className={`${wrap} grid gap-12 py-20 lg:grid-cols-12 lg:py-28`}>
        <div className="lg:col-span-4">
          <h2 id="faq-h" className="display text-[clamp(2.6rem,6vw,4.5rem)]">
            Questions
          </h2>
          <p className="mt-5 max-w-[34ch] text-ink/75">Anything else, ask in your Instagram message.</p>
        </div>
        <div className="lg:col-span-8">
          {faqs.map((f) => (
            <details key={f.q} className="group border-t border-ink/15 last:border-b">
              <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 text-lg font-medium">
                <span>{f.q}</span>
                <span
                  aria-hidden
                  className="faq-plus relative mt-2 h-3.5 w-3.5 shrink-0 transition-transform duration-300 before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:bg-ink after:absolute after:left-1/2 after:top-0 after:h-full after:w-px after:bg-ink"
                />
              </summary>
              <div className="pb-7 pr-10">
                <p className="max-w-[60ch] text-ink/80">{f.a}</p>
                {f.toConfirm && <ReviewNote className="mt-4 max-w-[60ch]">{f.toConfirm}</ReviewNote>}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const hasAddress = Boolean(site.streetAddress);
  return (
    <footer className="bg-ink text-skin/75">
      <div className={`${wrap} grid gap-10 py-14 md:grid-cols-3`}>
        <div>
          <p className="display text-[2.25rem] text-skin">pm_usa77</p>
          <p className="mt-2 text-[0.9375rem]">Permanent makeup and SMP in {site.city}, New Jersey.</p>
        </div>
        <address className="text-[0.9375rem] not-italic">
          {hasAddress && (
            <p>
              {site.streetAddress}
              <br />
              {site.city}, {site.region} {site.postalCode}
            </p>
          )}
          {site.phone && (
            <p className="mt-2">
              <a href={`tel:${site.phone}`} className="hover:text-skin">
                {site.phone}
              </a>
            </p>
          )}
          {site.email && (
            <p className="mt-2">
              <a href={`mailto:${site.email}`} className="hover:text-skin">
                {site.email}
              </a>
            </p>
          )}
          <p className={hasAddress || site.phone || site.email ? "mt-2" : ""}>
            <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-skin hover:underline">
              Instagram: @{site.handle}
            </a>
          </p>
          {site.hours && <p className="mt-2">{site.hours}</p>}
        </address>
        <nav aria-label="Footer" className="text-[0.9375rem]">
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
                <a href={href} className="hover:text-skin">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={`${wrap} border-t border-skin/10 py-6 text-[0.8125rem] text-skin/50`}>
        <p>
          © 2026 @{site.handle}.
          {reviewMode && " Website preview. Some details are awaiting confirmation from the studio."}
        </p>
      </div>
    </footer>
  );
}
