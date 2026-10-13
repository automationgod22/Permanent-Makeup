"use client";

import { useId, useRef, useState } from "react";
import { services } from "@/content/copy";
import { site } from "@/content/site";
import { ReviewNote } from "./ReviewNote";

type Status =
  | { kind: "idle" }
  | { kind: "error"; message: string }
  | { kind: "ready"; text: string; copied: boolean };

const times = ["Weekdays", "Weekends", "Evenings", "I’m flexible"];

export function Booking() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const statusRef = useRef<HTMLDivElement>(null);
  const id = useId();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const picked = data.getAll("service").map(String);
    const time = String(data.get("time") ?? "");
    const previous = String(data.get("previous") ?? "");
    const notes = String(data.get("notes") ?? "").trim();

    if (!name || picked.length === 0) {
      setStatus({
        kind: "error",
        message: !name ? "Add your name so the studio knows who’s asking." : "Choose at least one service.",
      });
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }

    const text = [
      "Hi! I’d like to book a consultation.",
      `Name: ${name}`,
      `Interested in: ${picked.join(", ")}`,
      time && `Best times: ${time}`,
      previous && `Previous permanent makeup or SMP: ${previous}`,
      notes && `Notes: ${notes}`,
    ]
      .filter(Boolean)
      .join("\n");

    let copied = false;
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      copied = false;
    }
    // With noopener the return value is always null, so the status panel always offers the link as a fallback.
    window.open(site.instagramDmUrl, "_blank", "noopener,noreferrer");
    setStatus({ kind: "ready", text, copied });
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const field =
    "mt-2 w-full rounded-[2px] border border-ink/25 bg-porcelain px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-map";

  return (
    <section id="book" aria-labelledby="book-h" className="bg-skin-deep">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-5">
          <h2 id="book-h" className="display text-[clamp(2.6rem,6vw,4.5rem)]">
            Book a consultation
          </h2>
          <p className="mt-5 max-w-[42ch] text-ink/80">
            Requests go to the studio as an Instagram message. Fill this in and it’s copied for you, then a chat
            with @{site.handle} opens. Paste it in and send.
          </p>
          <p className="mt-4 max-w-[42ch] text-[0.9375rem] text-taupe">
            Nothing you type is stored or sent by this website.
          </p>
          <ReviewNote className="mt-6 max-w-[42ch]">
            No phone, email or booking link was public. Add any the studio wants listed in <code>src/content/site.ts</code> and
            they appear here automatically.
          </ReviewNote>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            {site.bookingUrl && (
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-ink px-7 py-4 text-center font-medium text-skin"
              >
                Book online
              </a>
            )}
            <a
              href={site.instagramDmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-ink/35 px-7 py-4 text-center transition-colors hover:border-ink"
            >
              Message on Instagram instead
            </a>
            {site.phone && (
              <a href={`tel:${site.phone}`} className="rounded-full border border-ink/35 px-7 py-4 text-center">
                Call {site.phone}
              </a>
            )}
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="lg:col-span-7" aria-describedby={`${id}-status`}>
          <div className="grid gap-7">
            <div>
              <label htmlFor={`${id}-name`} className="font-medium">
                Your name
              </label>
              <input id={`${id}-name`} name="name" autoComplete="name" required className={field} />
            </div>

            <fieldset>
              <legend className="font-medium">What are you interested in?</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {services.map((s) => (
                  <label
                    key={s.key}
                    className="flex cursor-pointer items-center gap-3 rounded-[2px] border border-ink/20 bg-porcelain/60 px-4 py-3 has-[:checked]:border-ink has-[:checked]:bg-porcelain"
                  >
                    <input type="checkbox" name="service" value={s.name} className="h-4 w-4 accent-ink" />
                    <span>{s.name}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-7 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-time`} className="font-medium">
                  Best times for you
                </label>
                <select id={`${id}-time`} name="time" className={field} defaultValue="">
                  <option value="">No preference</option>
                  {times.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <fieldset>
                <legend className="font-medium">Had permanent makeup or SMP before?</legend>
                <div className="mt-3 flex gap-6">
                  {["Yes", "No"].map((v) => (
                    <label key={v} className="flex cursor-pointer items-center gap-2 py-2">
                      <input type="radio" name="previous" value={v} className="h-4 w-4 accent-ink" />
                      {v}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <div>
              <label htmlFor={`${id}-notes`} className="font-medium">
                Anything to add? <span className="font-normal text-taupe">(optional)</span>
              </label>
              <textarea
                id={`${id}-notes`}
                name="notes"
                rows={4}
                className={field}
                placeholder="The look you’re after, dates that work, questions…"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full rounded-full bg-ink px-8 py-4 font-medium text-skin transition-colors hover:bg-ink-soft sm:w-auto"
              >
                Copy request and open Instagram
              </button>
            </div>

            <div id={`${id}-status`} ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
              {status.kind === "error" && (
                <p className="border-l-2 border-map pl-4 text-ink">{status.message}</p>
              )}
              {status.kind === "ready" && (
                <div className="rounded-[2px] border border-ink/20 bg-porcelain p-5">
                  <p className="font-medium">
                    {status.copied
                      ? "Request copied. Paste it into the Instagram chat and send."
                      : "Copy the request below, then paste it into the Instagram chat."}
                  </p>
                  <label htmlFor={`${id}-out`} className="sr-only">
                    Your request
                  </label>
                  <textarea
                    id={`${id}-out`}
                    readOnly
                    value={status.text}
                    rows={6}
                    onFocus={(e) => e.currentTarget.select()}
                    className="mt-3 w-full resize-none rounded-[2px] border border-ink/15 bg-skin/40 p-3 text-[0.9375rem]"
                  />
                  <a
                    href={site.instagramDmUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block underline underline-offset-4"
                  >
                    Open the Instagram chat with @{site.handle}
                  </a>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
