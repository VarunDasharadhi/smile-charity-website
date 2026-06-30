# SMILE Charity Website — Design and Structure Quality Overhaul

**Date:** 2026-06-30
**Goal:** Raise the site from its current state to a 9/10 design and structure quality score (90/100) before real content arrives from Stephen.
**Approach:** Component-first. Build a rich component library, then apply uniformly across all 16 pages. Real photos, stats, and copy slot in later without structural changes.

---

## Brand Tokens

No new fonts. Keep Jost (free Futura PT alternative) pending Stephen confirming futura-pt licence.

Changes to `app/globals.css`:
- Restore teal accent (Stephen's brief explicitly lists it). Add `--color-teal: #14B8A6`, `--color-teal-light: #5EEAD4`, `--color-teal-dark: #0F766E`.
- Keep "black" as current navy `#2E3245` — reads warmer, suits charity tone.
- Keep yellow `#FDD70E` as primary.

---

## Phase 1: Component Library

All new components go in `components/`. Existing components (`Section.tsx`, `DonateButton.tsx`) get targeted improvements only — no rewrites.

### New components

**`MobileNav.tsx`**
- Hamburger icon button (top right on mobile, hidden on lg+)
- Slide-out drawer from the right, full height
- All nav links stacked vertically
- Donate button at the bottom of the drawer
- Close on link click or outside tap
- Wired into `Header.tsx` — hamburger replaces the current empty space on mobile

**`AnimatedCounter.tsx`**
- Props: `value: string`, `label: string`
- Uses Intersection Observer to detect when the element enters the viewport
- Counts up from 0 to the numeric value over 1.5s (easeOut)
- If value contains non-numeric characters (e.g. "?" or "£50k"), renders statically — no crash
- Used in Impact Stats section on homepage and Impact page

**`ProgressBar.tsx`**
- Props: `raised: number | null`, `target: number | null`, `label?: string`
- Renders a yellow filled bar on a gray track
- Shows "£X raised of £Y target" text below
- If either value is null, renders a placeholder bar at 0% with "Target TBC" label
- Used in SMILE House section on homepage and SMILE House page

**`TestimonialCard.tsx`**
- Props: `quote: string`, `name: string`, `location?: string`, `avatarSrc?: string`
- Large yellow quotation mark at top
- Quote text in italic
- Avatar circle (image if provided, else initials from name)
- Name and location below
- White card, subtle shadow, rounded corners

**`EventCard.tsx`**
- Props: `day: string`, `month: string`, `title: string`, `location: string`, `description?: string`, `href: string`
- Left: date badge (yellow background, bold day, small month)
- Right: title, location, short description
- Full card is a link
- Hover: subtle lift shadow

**`CTABanner.tsx`**
- Props: `heading: string`, `subtext?: string`, `primaryLabel: string`, `primaryHref: string`, `secondaryLabel?: string`, `secondaryHref?: string`, `bg?: 'yellow' | 'navy' | 'teal'`
- Full-width section with centred content
- Used between sections on inner pages to prevent long stretches without a CTA

**`PageHero.tsx`**
- Props: `eyebrow?: string`, `title: string`, `subtitle?: string`, `ctaLabel?: string`, `ctaHref?: string`, `bg?: 'yellow' | 'navy' | 'teal' | 'white'`
- Replaces the manual `<Section bg="yellow"><h1>...</h1></Section>` pattern on inner pages
- Consistent padding, typography scale, and optional CTA button
- Used at the top of all 15 inner pages

**`SectionLabel.tsx`**
- Props: `children: React.ReactNode`
- Renders the small yellow uppercase tracking-widest label above section headings
- Replaces the repeated `<p className="text-yellow font-heading font-semibold text-sm uppercase tracking-widest mb-3">` pattern

### Targeted improvements to existing components

**`Header.tsx`**
- Add hamburger button (visible on mobile, hidden on `lg:`)
- Import and render `MobileNav` with open/closed state
- No other changes

**`DonateButton.tsx`**
- Add `teal` variant alongside existing `primary` and `outline`
- No other changes

---

## Phase 2: Homepage Overhaul

Replace all inline sections with component-driven equivalents. Section order:

1. **Hero** — Full viewport (`min-h-screen`). Image placeholder with dark overlay. Yellow eyebrow via `SectionLabel`. Large h1. 2-line subtext. 2 `DonateButton` components. Animated scroll-down chevron (CSS pulse).

2. **CTA Strip** — Yellow bar. 5 quick-action links. Horizontally scrollable on mobile.

3. **Who We Are** — Two-column. `SectionLabel` + h2 + copy + link. Image placeholder right.

4. **Our Story** — Navy bg. Centred. `SectionLabel` + h2 + teaser + outline button (teal hover).

5. **Impact Stats** — Yellow bg. 4 `AnimatedCounter` components in a responsive grid.

6. **SMILE House Appeal** — Navy card inside white section. Left: `SectionLabel` + h2 + copy + `DonateButton`. Right: image placeholder + `ProgressBar`.

7. **Family Stories** — Gray bg. 3 `TestimonialCard` components in a grid.

8. **Upcoming Events** — White bg. 3 `EventCard` components in a grid.

9. **Corporate Supporters** — Gray bg. Logo placeholder strip + "Become a Partner" button.

10. **Newsletter** — Yellow bg. Email input + subscribe button.

---

## Phase 3: Inner Pages

Every inner page uses `PageHero` at top. Every page has at least 2 `CTABanner` placements. No page is a stub.

| Page | Hero bg | Key sections |
|---|---|---|
| About | yellow | Mission statement, values 3-col, trustees grid, charity registration |
| Our Story | navy | Origin timeline, milestone moments, photo grid |
| Families | teal | What families receive, 3 story cards, referral info |
| Impact | yellow | Full animated stats, year achievements, breakdown by service |
| SMILE House | navy | Project vision, ProgressBar, how it helps, timeline |
| Family Support | teal | Services list, how to access, eligibility |
| Events | yellow | EventCard grid, past events teaser |
| News | white | Article card grid, category filter strip |
| Fundraising | yellow | Ways to fundraise, fundraising pack placeholder |
| Corporate | navy | Why partner, partnership tiers, current partners logos |
| Legacy | navy | Why leave a legacy, 3-step how-it-works, legal note |
| Volunteer | teal | Why volunteer, roles grid, 3-step apply |
| Shop | yellow | Coming soon stub, email capture |
| Donate | yellow | Amount selector, one-off vs monthly toggle, processor placeholder |
| Contact | white | Address/phone/email/hours, map placeholder, form coming soon |

---

## Phase 4: SEO + Technical

**`app/layout.tsx`**
- Add `metadataBase: new URL('https://www.smilechildrenscharity.com')`
- Add default `openGraph` block (siteName, locale, type)
- Add GA4 placeholder comment: `{/* GA4: drop <Script> tag here when Stephen supplies G-XXXXXXXX property ID */}`

**Per-page metadata** — Every page gets expanded `metadata` export:
```ts
export const metadata: Metadata = {
  title: "Page Title | SMILE Children's Charity",
  description: "...",
  openGraph: {
    title: "...",
    description: "...",
    type: "website",
  },
}
```

**`app/sitemap.ts`** — Auto-generates sitemap for all 16 routes. Next.js native.

**`app/robots.ts`** — Allows all crawlers, points to sitemap.

**Scroll animations** — `hooks/useInView.ts`: a small Intersection Observer hook. Import in any component to trigger a fade-up class when the element scrolls into view. No external library.

**Images** — All above-fold images get `priority`. All below-fold images get `loading="lazy"`. Already using `next/image` throughout.

---

## Phase 5: Loop Scoring Rubric

Score out of 100. Target is 90 (9/10). Evaluate after each build iteration.

| Dimension | Max points | How to score |
|---|---|---|
| Visual polish | 20 | Typography scale consistent, spacing even, colour use purposeful, no clunky sections |
| Mobile | 20 | Nav works (hamburger), all sections readable, no overflow, CTAs accessible |
| CTAs | 20 | Every page has 2+ CTAs, they are prominent and contextually relevant |
| Page completeness | 20 | All 16 pages are real structured pages, not stubs |
| SEO + technical | 20 | All pages have metadata, build passes clean, sitemap and robots present |

**Loop exit condition:** Total score 90 or above across all 5 dimensions.

---

## What is NOT in scope

- Real photos (Stephen to supply)
- Real stats and numbers (Stephen to supply)
- Real testimonial quotes (Stephen to supply)
- Donation processor wiring (pending Stephen's choice)
- Contact form backend (pending Stephen's sign-off)
- Sanity CMS (pending Stephen's sign-off)
- GA4 property ID (Stephen to create)
- Font swap to futura-pt (Stephen to confirm licence)
