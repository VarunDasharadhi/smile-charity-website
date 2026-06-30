# SMILE Charity Website — Organic Visual System

**Date:** 2026-06-30
**Goal:** Replace the flat, stacked-rectangle visual language from the structural overhaul with a creative, interactive "Organic & Handcrafted" system, applied to every component and every page. Structure (16 pages, content, copy) does not change. Only the visual treatment changes.

**Context:** The prior overhaul (`docs/superpowers/specs/2026-06-30-site-quality-overhaul-design.md`) made the site structurally complete (90+/100 on the structure rubric) but every section is a solid-color block with centered text — no imagery, no curves, no recurring visual signature. This spec closes that gap. Direction was chosen by comparing three full visual systems (Organic & Handcrafted, Bold & Editorial, Soft & Layered) rendered as realistic browser mockups; Organic & Handcrafted was selected.

---

## Visual Language

**Signature motif:** a hand-drawn-style wavy underline (SVG path, `stroke="#FDD70E" stroke-width="4"`) beneath every section heading, sitewide. This is the one element a visitor will subconsciously recognize as "this site's signature," the same way the live site's underline squiggle works.

**Depth treatment:** every photo or photo placeholder sits inside a `PhotoFrame` — a rounded-corner frame (24-32px radius) with an offset accent shape behind it (a diagonal-stripe block in yellow, partially visible top-left or bottom-right) and a soft drop shadow (`0 24-30px 50-60px rgba(0,0,0,0.15-0.35)` depending on background). This applies even to placeholder boxes that say "[Photo: Stephen to supply]" — the frame and accent shape render regardless of whether a real image exists yet, so placeholders look designed, not empty.

**Section rhythm:** a single gentle wave divider (`WaveDivider`, one SVG curve, no multi-curve blob) at every background color transition between stacked sections (hero→white, white→cream, yellow→navy, etc.). Consistent everywhere — this was chosen over an organic blob curve (more visual noise) or curves-only-into-dark-sections (inconsistent, harder to reason about as a rule).

**Color rhythm:** the icon-badge / quick-link pattern (homepage only) cycles through yellow, teal, and navy circles rather than all-yellow, so the palette reads as a full system rather than one repeated tone.

---

## New Components

**`SectionHeading.tsx`**
- Props: `eyebrow?: string`, `title: string`, `centered?: boolean` (default `true`)
- Renders the existing `SectionLabel` eyebrow treatment (unchanged) + an `h2` + the squiggle SVG beneath it
- Replaces the repeated `<SectionLabel>...</SectionLabel><h2>...</h2>` pattern that currently appears at the top of nearly every section, on every page
- This is the single highest-leverage change in this spec: one component edit shows up everywhere a section heading appears

**`WaveDivider.tsx`**
- Props: `fromColor: string`, `toColor: string` (CSS color values, e.g. `"#2E3245"`), `flip?: boolean`
- Renders a single SVG wave (`viewBox="0 0 1440 70"`, one smooth curve, not a multi-curve blob) filled with `toColor`, sitting on top of `fromColor`
- Placed between two `Section` (or full-bleed) blocks wherever the background color changes
- Pure presentational, no client JS needed

**`PhotoFrame.tsx`**
- Props: `src?: string`, `alt: string`, `placeholder?: string` (the bracketed placeholder text, e.g. `"[Family photo. Stephen to supply]"`), `accentPosition?: "top-left" | "bottom-right"` (default `"top-left"`), `accentColor?: "yellow" | "teal"` (default `"yellow"`)
- Callers may pass `accentPosition="bottom-right"` for visual variety in image-heavy pages (e.g. alternating left/right on a page with several `PhotoFrame` instances in sequence) — this is an implementer judgment call per page, not a strict alternating rule
- If `src` is provided, renders the image via `next/image` inside the rounded frame
- If no `src`, renders the existing gray placeholder box but still wrapped in the same frame + offset accent shape, so it visually matches what the real photo will look like later
- Replaces every bare `<div className="bg-gray-100">[Photo: ...]</div>` placeholder pattern currently used across all 16 pages

**`IconLinkRow.tsx`** (homepage only)
- Props: `links: { icon: ReactNode, label: string, href: string, tone: "yellow" | "teal" | "navy" }[]`
- Renders a row of circular icon badges (72px, cycling tone per item) with a label beneath each, matching the quick-links row in the validated mockup
- Used once, directly under the homepage hero, replacing the current flat "CTA Strip" text-link bar

---

## Updated Components (in place, not rebuilt)

**`PageHero.tsx`** — gains an optional `image` slot using `PhotoFrame`. When no image is supplied yet (current state for all inner pages), falls back to today's solid-color treatment but with the new `SectionHeading`-style eyebrow/title spacing for visual consistency. Background color props (`yellow`/`navy`/`teal`/`white`) and the eyebrow-contrast fix from the prior review stay as-is.

**`CTABanner.tsx`, `TestimonialCard.tsx`, `EventCard.tsx`** — radius, shadow, and spacing values updated to match the new system (rounded-2xl, soft layered shadows). No prop or structural changes; this is a visual polish pass on existing markup.

**`Section.tsx`** — no prop changes. `WaveDivider` is composed between adjacent `Section` instances at the page level, not inside `Section` itself, so `Section` stays a simple, dumb wrapper.

**`Header.tsx`**
- New slim top utility bar above the main nav: phone, email, and social icons. Phone/email use the project's existing placeholder convention (`[Phone number. Stephen to supply]`) until Stephen provides real contact details, consistent with how the Contact and Donate pages already handle unconfirmed info.
- Main nav gains dropdown submenus for two groupings: **"About"** (About, Our Story, Impact) and **"Get Involved"** (Fundraising, Volunteer, Corporate, Legacy, Donate). Remaining top-level items (SMILE House, Events, News, Contact) stay flat.
- `MobileNav` gets matching expandable groups (accordion-style) for the same two groupings, so mobile and desktop navigation structure match.
- This is real interactivity added (not just paint): dropdown open/close on hover (desktop) and tap-to-expand (mobile), closing on outside click — same pattern already proven in `MobileNav`'s existing open/close handling.

**`Footer.tsx`** — stays navy (kept for contrast against the yellow donate strip above it). Radius and shadow values updated to match the new system's language. No structural or color change.

**Forms** (`donate/page.tsx` amount grid, homepage/footer newsletter input, `contact/page.tsx` stub) — visual polish only: consistent pill radius on inputs and buttons, softer shadows matching the new card system. No structural or backend changes — these remain intentional stubs per `CLAUDE.md` (no payment processor, no form backend) until Stephen's sign-off.

---

## Application Scope

Every one of the 16 pages is touched, because `SectionHeading`, `WaveDivider`, and `PhotoFrame` are used on every page that has a section heading or a photo placeholder — which is all of them. This is not a new page-by-page rebuild; it's a visual-language pass applied through the same shared components every page already imports.

**Rollout order** (mirrors the proven component-first → page-by-page strategy from the prior overhaul):

1. Build the 4 new components (`SectionHeading`, `WaveDivider`, `PhotoFrame`, `IconLinkRow`)
2. Update `Header.tsx` + `MobileNav.tsx` (utility bar + dropdowns) and `Footer.tsx` (polish pass)
3. Apply to the homepage (hero layered-photo treatment, swap heading patterns, insert dividers, wrap photo placeholders, add `IconLinkRow`)
4. Apply to all 15 inner pages, batched 2 pages per task as before: swap heading patterns to `SectionHeading`, insert `WaveDivider` at color transitions, wrap photo placeholders in `PhotoFrame`
5. Forms polish pass (Donate, Newsletter, Contact)

---

## What is NOT in scope

- Real photos (Stephen to supply — `PhotoFrame` placeholder state handles this until then)
- Payment processor, contact form backend, Sanity CMS — all remain stubs per `CLAUDE.md`
- Changing page structure, copy, or content — this spec is visual treatment only
- Real phone/email for the new header utility bar — uses the placeholder convention until Stephen confirms

---

## Loop Scoring

Re-score against the same 5-dimension rubric used previously (`docs/superpowers/specs/2026-06-30-site-quality-overhaul-design.md` Phase 5), target 90+. The prior pass already scored ~92-93 on structure; this pass should raise **Visual polish** specifically (previously 19/20, capped mainly by flat sections and lack of imagery treatment) without regressing the other four dimensions.
