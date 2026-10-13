"use client";

import { useEffect, useId, useRef, useState } from "react";
import { services } from "@/content/copy";
import { site } from "@/content/site";
import { Magnetic, RevealHeading } from "./motion";
import { ReviewNote } from "./ReviewNote";
import { PRESELECT_EVENT } from "./ServiceExplorer";

type Status =
  | { kind: "idle" }
  | { kind: "error"; message: string }
  | { kind: "ready"; text: string; copied: boolean };

const times = ["Weekdays", "Weekends", "Evenings", "I’m flexible"];

export function Booking() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [picked, setPicked] = useState<string[]>([]);
  const [time, setTime] = useState("");
  const [previous, setPrevious] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const onPreselect = (e: Event) => {
      const name = (e as CustomEvent<string>).detail;
      setPicked((p) => (p.includes(name) ? p : [...p, name]));
    };
    window.addEventListener(PRESELECT_EVENT, onPreselect);
    return () => window.removeEventListener(PRESELECT_EVENT, onPreselect);
  }, []);

  const toggle = (name: string) => setPicked((p) => (p.includes(name) ? p.filter((x) => x !== name) : [...p, name]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const notes = String(data.get("notes") ?? "").trim();

    if (!name || picked.length === 0) {
      setStatus({
        kind: "error",
        message: !name ? "Add your name so the studio knows who’s asking." : "Choose at least one service.",
      });
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }

    const ordered = services.map((s) => s.name).filter((n) => picked.includes(n));
    const text = [
      "Hi! I’d like to book a consultation.",
      `Name: ${name}`,
      `Interested in: ${ordered.join(", ")}`,
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
    "mt-2 w-full rounded-[3px] border border-skin/20 bg-skin/[0.06] px-4 py-3.5 text-[1.0625rem] text-skin placeholder:text-skin/35 transition-colors focus:border-skin/70 focus:bg-skin/10 focus:outline-none";
  const chip = (on: boolean) =>
    `rounded-full border px-5 py-3 text-[1rem] transition-all duration-300 ${
      on ? "border-skin bg-skin text-ink" : "border-skin/25 text-skin/85 hover:border-skin/60"
    }`;

  return (
    <section id="book" aria-labelledby="book-h" className="relative isolate overflow-hidden bg-ink text-skin">
      <div aria-hidden className="absolute -right-40 -top-40 -z-10 h-[38rem] w-[38rem] rounded-full bg-lip/20 blur-[120px]" />
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:py-24">
        <div className="lg:col-span-5">
          <RevealHeading id="book-h" lines={["Book a", "consultation"]} className="display text-[clamp(3rem,6.2vw,5.75rem)]" />
          <p className="mt-6 max-w-[38ch] text-[1.1875rem] text-skin/80 lg:text-[1.3125rem]">
            Requests go to the studio as an Instagram message. Fill this in and it’s copied for you, then a chat with @
            {site.handle} opens. Paste it in and send.
          </p>
          <p className="mt-4 text-[1rem] text-skin/55">Nothing you type is stored or sent by this website.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {site.bookingUrl && (
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-skin">
                Book online
              </a>
            )}
            <Magnetic>
              <a href={site.instagramDmUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
                Message on Instagram instead
              </a>
            </Magnetic>
            {site.phone && (
              <a href={`tel:${site.phone}`} className="btn btn-ghost-light">
                Call {site.phone}
              </a>
            )}
          </div>
          <ReviewNote tone="dark" className="mt-6 max-w-[42ch]">
            No phone, email or booking link was public. Add any the studio wants listed in <code>src/content/site.ts</code>{" "}
            and they appear here automatically.
          </ReviewNote>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="rounded-[4px] border border-skin/10 bg-ink-deep/60 p-5 backdrop-blur sm:p-8 lg:col-span-7 lg:p-10"
          aria-describedby={`${id}-status`}
        >
          <div className="grid gap-7">
            <fieldset>
              <legend className="text-[1.0625rem] font-medium">What are you interested in?</legend>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {services.map((s) => {
                  const on = picked.includes(s.name);
                  return (
                    <button key={s.key} type="button" aria-pressed={on} onClick={() => toggle(s.name)} className={chip(on)}>
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label htmlFor={`${id}-name`} className="text-[1.0625rem] font-medium">
                Your name
              </label>
              <input id={`${id}-name`} name="name" autoComplete="name" required className={field} />
            </div>

            <fieldset>
              <legend className="text-[1.0625rem] font-medium">Best times for you</legend>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {times.map((t) => (
                  <button key={t} type="button" aria-pressed={time === t} onClick={() => setTime(time === t ? "" : t)} className={chip(time === t)}>
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-[1.0625rem] font-medium">Had permanent makeup or SMP before?</legend>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {["Yes", "No"].map((v) => (
                  <button key={v} type="button" aria-pressed={previous === v} onClick={() => setPrevious(previous === v ? "" : v)} className={chip(previous === v)}>
                    {v}
                  </button>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor={`${id}-notes`} className="text-[1.0625rem] font-medium">
                Anything to add? <span className="font-normal text-skin/50">(optional)</span>
              </label>
              <textarea id={`${id}-notes`} name="notes" rows={3} className={field} placeholder="The look you’re after, dates that work, questions…" />
            </div>

            <div>
              <button type="submit" className="btn btn-skin w-full sm:w-auto">
                Copy request and open Instagram
              </button>
            </div>

            <div id={`${id}-status`} ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
              {status.kind === "error" && <p className="border-l-2 border-map pl-4 text-[1.0625rem]">{status.message}</p>}
              {status.kind === "ready" && (
                <div className="rounded-[3px] border border-skin/15 bg-skin/[0.06] p-5">
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
                    className="mt-3 w-full resize-none rounded-[3px] border border-skin/15 bg-ink-deep/60 p-3 text-[1rem] text-skin"
                  />
                  <a href={site.instagramDmUrl} target="_blank" rel="noopener noreferrer" className="ulink mt-3 inline-block">
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
