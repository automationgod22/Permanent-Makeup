import { reviewMode } from "@/content/site";

/** A visible "to confirm" flag for the studio. Renders nothing when review mode is off. */
export function ReviewNote({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (!reviewMode) return null;
  const colors =
    tone === "dark"
      ? "border-map/70 text-skin/85 bg-ink-soft/60"
      : "border-map/60 text-ink/80 bg-porcelain/70";
  return (
    <p
      className={`flex gap-2 rounded-sm border border-dashed px-3 py-2 text-[0.8125rem] leading-snug ${colors} ${className}`}
    >
      <span aria-hidden className="mt-[0.35em] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-map" />
      <span>
        <span className="font-semibold">To confirm:</span> {children}
      </span>
    </p>
  );
}
