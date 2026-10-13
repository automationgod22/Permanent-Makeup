# pm_usa77 — website demo

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4. One static page for the permanent makeup and SMP studio at [instagram.com/pm_usa77](https://www.instagram.com/pm_usa77/), Jersey City, NJ.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
# or the production build:
npm run build && npm start
```

Checks: `npx tsc --noEmit`, `npm run lint`, `npm run build` (all pass).

## What's verified and what isn't

Source: public metadata of the Instagram profile, checked 13 Oct 2026. The profile is **18+ age-restricted**, so posts, highlights, the bio link and contact buttons were not viewable without logging in, and no other public source (website, maps listing, directories) was found.

| Fact | Status | Where it lives |
|---|---|---|
| Handle @pm_usa77, display name "PERMANENT MAKEUP / SMP Jersey City" | Verified | `src/content/site.ts` |
| City: Jersey City | Verified (from display name) | `site.ts` |
| Services: Nude Blush Lips, Ombré Brows, Eyes, SMP for hairlines & density | Verified (bio) | `src/content/copy.ts` |
| Bio line "Say goodbye to overplucked brows & fading hairlines", "Be beautiful 24/7" | Verified (bio) | `site.ts` |
| 12K followers, 345 posts (Oct 2026) | Verified, will go stale | `site.ts` → `instagramStats` |
| Artist name, street address, phone, email, booking link, hours | **Unknown — empty, hidden on the page** | `site.ts` |
| Prices, licences/certifications, testimonials, reviews | **Unknown — not shown anywhere** | — |
| Portfolio photos | **None collected** — empty slots in review mode | `site.ts` → `portfolio` |
| What "Eyes" includes (lash enhancement / eyeliner) | **To confirm** | `copy.ts` |
| Process steps, FAQ, aftercare | General industry guidance, written neutrally; **studio should review** | `copy.ts` |

Anything left empty in `site.ts` doesn't render. Fill a field and it appears automatically (footer, booking section, structured data).

## Review mode

`NEXT_PUBLIC_REVIEW_MODE` is on unless set to `false`. In review mode the page shows dashed "To confirm" notes, empty portfolio slots, a "website preview" line in the footer, and `robots.txt` blocks indexing. Set `NEXT_PUBLIC_REVIEW_MODE=false` for the real launch.

## Adding real portfolio images

1. Get originals from the studio with **written client permission** for each photo.
2. Put them in `public/work/` (JPG/WebP, ~1600px long edge is plenty; `next/image` handles resizing and WebP).
3. Add entries to `portfolio` in `src/content/site.ts` with `alt`, `service`, `stage` (fresh/healed), `credit`, `clientPermission: true`, `width`, `height`.

Only items with `clientPermission: true` render.

## Booking flow

No backend, nothing stored. The form composes a request, copies it to the clipboard and opens `ig.me/m/pm_usa77` (Instagram DM) in a new tab, with the text shown on screen as a fallback. If the studio has a booking page or phone, set `bookingUrl` / `phone` and those buttons appear.

## SEO

- Title/description/Open Graph/Twitter metadata in `src/app/layout.tsx`
- Generated OG image: `src/app/opengraph-image.tsx`
- JSON-LD `BeautySalon` with verified fields only (`src/app/page.tsx`)
- `robots.ts`, `sitemap.ts`; set `NEXT_PUBLIC_SITE_URL` to the real domain

## Deploying to Vercel (after approval)

Nothing has been deployed or connected. When you're ready:

1. Push this folder to a new GitHub repo (`git init` is already done; `git add -A && git commit -m "Initial site" && git remote add origin … && git push -u origin main`).
2. In Vercel: **Add New → Project → Import** the repo. Framework is detected as Next.js; no build settings to change.
3. Environment variables:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com` (or the `*.vercel.app` URL)
   - `NEXT_PUBLIC_REVIEW_MODE` = `true` for a client preview, `false` for launch
4. Deploy. For a custom domain: Project → Settings → Domains.

CLI alternative: `npm i -g vercel && vercel` (preview) then `vercel --prod`.

## Design notes

- Concept: brow mapping. The hero draws the guide lines artists use to place a brow, then fills an ombré brow from light to dense. It's the only orchestrated animation; `prefers-reduced-motion` shows it static.
- Palette: aubergine ink `#2a1d24`, skin `#f2e4dc`, nude lip `#c98b83`, taupe pigment `#6e5a52`, mapping red `#d24e63` (hairlines only), porcelain `#fbf7f4`.
- Type: Italiana (display) + Hanken Grotesk (body), self-hosted from `src/app/fonts` (both SIL Open Font License).
- Illustrations are SVG and code-drawn, so they never imply a real client result.
