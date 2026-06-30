# Organic Visual System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat, stacked-rectangle visual language across all 16 pages with the "Organic & Handcrafted" system (hand-drawn squiggle heading motif, wave section dividers, layered photo frames, header dropdown nav) approved in `docs/superpowers/specs/2026-06-30-organic-visual-system-design.md`.

**Architecture:** Build 4 new presentational components (`SectionHeading`, `WaveDivider`, `PhotoFrame`, `IconLinkRow`), update `Header`/`MobileNav`/`Footer` for navigation and polish, then apply the new components across the homepage and all 15 inner pages via targeted find/replace edits — no page is rewritten from scratch, no content or copy changes.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind v4 (CSS-only config in `app/globals.css`), `next/image`, `next/link`.

## Global Constraints

- Tailwind v4 — no `tailwind.config.js`. All tokens in `app/globals.css` `@theme` block. Use `bg-yellow`, `text-black`, `bg-teal` etc.
- `--color-black` is navy `#2E3245`, not pure black. This is correct — do not change it.
- No external animation libraries or icon packages. Use CSS + inline SVG only.
- No `src/` directory. All app code at root level. Components in `components/`.
- `"use client"` required on any component using `useState`, `useEffect`, or browser APIs.
- Run `npm run build` after each task to verify TypeScript compilation — all 21 routes (16 pages + sitemap.xml + robots.txt + `_not-found`) must pass clean.
- Brand hex reference (use these exact values when a component takes a raw color prop, e.g. `WaveDivider`):
  - Yellow: `#FDD70E`
  - Navy (the `black` token): `#2E3245`
  - Teal: `#14B8A6`
  - White: `#FFFFFF`
  - Cream (the `gray`/`gray-50` token): `#FFF8EE`
- Squiggle motif path (used inside `SectionHeading`, fixed value, do not vary per page): `M4 9 Q 30 1, 56 8 T 106 8 T 166 5`, `stroke="#FDD70E"`, `strokeWidth="4"`, `fill="none"`, `strokeLinecap="round"`, viewBox `0 0 170 14`.
- Wave divider path (used inside `WaveDivider`, fixed value): `M0,50 C 360,95 1080,10 1440,50 L1440,100 L0,100 Z`, viewBox `0 0 1440 100`.
- No payment processor, contact form backend, or Sanity CMS wiring — this plan is visual-only. Placeholder text stays in `[Square brackets]` exactly as it already is.
- Real phone/email are not yet known. The new header utility bar uses the placeholder convention: `[Phone number. Stephen to supply]` / `[Email address. Stephen to supply]`.

---

### Task 1: `WaveDivider` component

**Files:**
- Create: `components/WaveDivider.tsx`

**Interfaces:**
- Produces: `WaveDivider({ fromColor: string, toColor: string, flip?: boolean })` — a self-contained SVG seam between two stacked sections. `fromColor` fills the top portion, `toColor` fills the curved bottom portion. Self-contained (uses an explicit `<rect>` for the top fill) so it never depends on whatever background happens to sit behind it.

- [ ] **Step 1: Create the component**

```tsx
// components/WaveDivider.tsx
interface WaveDividerProps {
  fromColor: string;
  toColor: string;
  flip?: boolean;
}

export default function WaveDivider({ fromColor, toColor, flip = false }: WaveDividerProps) {
  return (
    <div aria-hidden="true" className="block w-full leading-none">
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className={`block w-full h-[40px] md:h-[64px] ${flip ? "-scale-y-100" : ""}`}
      >
        <rect width="1440" height="100" fill={fromColor} />
        <path d="M0,50 C 360,95 1080,10 1440,50 L1440,100 L0,100 Z" fill={toColor} />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: compiles clean (the component isn't used anywhere yet, so this only checks the file itself is valid TypeScript/JSX).

- [ ] **Step 3: Commit**

```bash
git add components/WaveDivider.tsx
git commit -m "feat: add WaveDivider component"
```

---

### Task 2: `PhotoFrame` component

**Files:**
- Create: `components/PhotoFrame.tsx`

**Interfaces:**
- Produces: `PhotoFrame({ src?: string, alt: string, placeholder?: string, accentPosition?: "top-left" | "bottom-right", accentColor?: "yellow" | "teal", aspect?: "square" | "video" })` — wraps a photo (or a placeholder) in the rounded frame + offset accent shape + shadow treatment. Renders `next/image` when `src` is given; otherwise renders the existing gray placeholder box (still inside the same frame) showing `placeholder` text.

- [ ] **Step 1: Create the component**

```tsx
// components/PhotoFrame.tsx
import Image from "next/image";

interface PhotoFrameProps {
  src?: string;
  alt: string;
  placeholder?: string;
  accentPosition?: "top-left" | "bottom-right";
  accentColor?: "yellow" | "teal";
  aspect?: "square" | "video";
}

export default function PhotoFrame({
  src,
  alt,
  placeholder,
  accentPosition = "top-left",
  accentColor = "yellow",
  aspect = "square",
}: PhotoFrameProps) {
  const aspectClass = aspect === "video" ? "aspect-video" : "aspect-square";
  const accentBg =
    accentColor === "teal"
      ? "bg-gradient-to-br from-teal-light to-teal"
      : "bg-[repeating-linear-gradient(45deg,#FDD70E_0,#FDD70E_5px,transparent_5px,transparent_14px)]";
  const accentPositionClasses =
    accentPosition === "bottom-right" ? "-bottom-4 -right-4" : "-top-4 -left-4";

  return (
    <div className="relative">
      <div
        className={`absolute ${accentPositionClasses} w-2/3 h-2/3 rounded-3xl opacity-50 ${accentBg}`}
        aria-hidden="true"
      />
      <div
        className={`relative ${aspectClass} rounded-3xl overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.18)]`}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm italic p-4 text-center">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: compiles clean.

- [ ] **Step 3: Commit**

```bash
git add components/PhotoFrame.tsx
git commit -m "feat: add PhotoFrame component"
```

---

### Task 3: `SectionHeading` component

**Files:**
- Create: `components/SectionHeading.tsx`

**Interfaces:**
- Consumes: `SectionLabel` (`components/SectionLabel.tsx`, props `{ children: React.ReactNode }`, unchanged).
- Produces: `SectionHeading({ eyebrow?: string, title: string, centered?: boolean, dark?: boolean })` — renders the eyebrow (via `SectionLabel`) + an `h2` + the squiggle SVG beneath it. `centered` defaults to `true`. `dark` defaults to `false` and switches the heading text from black to white for use inside navy sections.

- [ ] **Step 1: Create the component**

```tsx
// components/SectionHeading.tsx
import SectionLabel from "./SectionLabel";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  centered?: boolean;
  dark?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  centered = true,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
      <h2
        className={`font-heading text-3xl md:text-4xl font-bold inline-block ${
          dark ? "text-white" : "text-black"
        }`}
      >
        {title}
      </h2>
      <svg
        width="170"
        height="14"
        viewBox="0 0 170 14"
        className={`block mt-2 ${centered ? "mx-auto" : ""}`}
        aria-hidden="true"
      >
        <path
          d="M4 9 Q 30 1, 56 8 T 106 8 T 166 5"
          stroke="#FDD70E"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: compiles clean.

- [ ] **Step 3: Commit**

```bash
git add components/SectionHeading.tsx
git commit -m "feat: add SectionHeading component with squiggle motif"
```

---

### Task 4: `IconLinkRow` component

**Files:**
- Create: `components/IconLinkRow.tsx`

**Interfaces:**
- Produces: `IconLinkRow({ links: { icon: React.ReactNode, label: string, href: string, tone: "yellow" | "teal" | "navy" }[] })` — a row of circular icon badges with a label beneath each, tone-colored per item.

- [ ] **Step 1: Create the component**

```tsx
// components/IconLinkRow.tsx
import Link from "next/link";

interface IconLink {
  icon: React.ReactNode;
  label: string;
  href: string;
  tone: "yellow" | "teal" | "navy";
}

interface IconLinkRowProps {
  links: IconLink[];
}

export default function IconLinkRow({ links }: IconLinkRowProps) {
  const toneClasses = {
    yellow: "bg-yellow text-black",
    teal: "bg-teal text-white",
    navy: "bg-black text-white",
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-10">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="flex flex-col items-center gap-2 group"
        >
          <span
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0_14px_30px_rgba(0,0,0,0.15)] transition-transform group-hover:-translate-y-1 ${toneClasses[link.tone]}`}
          >
            {link.icon}
          </span>
          <span className="text-xs font-semibold text-black">{link.label}</span>
        </Link>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: compiles clean.

- [ ] **Step 3: Commit**

```bash
git add components/IconLinkRow.tsx
git commit -m "feat: add IconLinkRow component"
```

---

### Task 5: TestimonialCard + EventCard shadow polish

**Files:**
- Modify: `components/TestimonialCard.tsx:25`
- Modify: `components/EventCard.tsx:23`

**Interfaces:** No prop or signature changes — visual polish only. `CTABanner.tsx` is assessed against this same spec requirement (`docs/superpowers/specs/2026-06-30-organic-visual-system-design.md`, "Updated Components") and intentionally left unchanged: it is a full-bleed banner section with no card surface, so there is no radius/shadow to deepen.

- [ ] **Step 1: Deepen TestimonialCard's shadow**

In `components/TestimonialCard.tsx`, change:

```tsx
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col">
```

to:

```tsx
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex flex-col">
```

- [ ] **Step 2: Add a resting shadow to EventCard**

In `components/EventCard.tsx`, change:

```tsx
      className="flex gap-4 p-5 border border-gray-100 rounded-2xl hover:shadow-md transition-all hover:-translate-y-0.5 group"
```

to:

```tsx
      className="flex gap-4 p-5 border border-gray-100 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-0.5 group"
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: compiles clean.

- [ ] **Step 4: Commit**

```bash
git add components/TestimonialCard.tsx components/EventCard.tsx
git commit -m "feat: deepen shadows on TestimonialCard and EventCard"
```

---

### Task 6: PageHero — optional layered image slot

**Files:**
- Modify: `components/PageHero.tsx` (full replacement, shown below)

**Interfaces:**
- Consumes: `PhotoFrame` (Task 2).
- Produces: `PageHero` gains two new optional props, `imageSrc?: string` and `imageAlt?: string`. All existing props (`eyebrow?`, `title`, `subtitle?`, `ctaLabel?`, `ctaHref?`, `bg?`) are unchanged. No inner page currently passes `imageSrc` (no real photos exist yet), so this task changes the component's capability without changing how any of the 15 inner pages render today — verify this by confirming the build output is visually identical to before this task for every `PageHero` usage.

- [ ] **Step 1: Replace the full file**

```tsx
// components/PageHero.tsx
import Link from "next/link";
import PhotoFrame from "./PhotoFrame";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  bg?: "yellow" | "navy" | "teal" | "white";
  imageSrc?: string;
  imageAlt?: string;
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  bg = "yellow",
  imageSrc,
  imageAlt,
}: PageHeroProps) {
  const bgClasses = {
    yellow: "bg-yellow",
    navy: "bg-black",
    teal: "bg-teal",
    white: "bg-white border-b border-gray-100",
  };
  const isDark = bg === "navy" || bg === "teal";
  const titleColor = isDark ? "text-white" : "text-black";
  const subtitleColor = isDark ? "text-white/80" : "text-black/70";
  const btnClasses = isDark
    ? "bg-yellow text-black hover:bg-yellow-dark"
    : "bg-black text-white hover:bg-gray-800";

  const content = (
    <div>
      {eyebrow && (
        <p className={`font-heading font-semibold text-sm uppercase tracking-widest mb-3 ${
          isDark ? "text-yellow" : "text-black/60"
        }`}>
          {eyebrow}
        </p>
      )}
      <h1
        className={`font-heading text-4xl md:text-5xl font-bold ${titleColor} mb-4 max-w-2xl`}
      >
        {title}
      </h1>
      {subtitle && (
        <p className={`${subtitleColor} text-lg max-w-xl${ctaLabel ? " mb-8" : ""}`}>
          {subtitle}
        </p>
      )}
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className={`inline-block mt-6 px-6 py-3 rounded-full font-bold transition-all ${btnClasses}`}
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );

  return (
    <section className={`py-16 md:py-24 ${bgClasses[bg]}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {imageSrc ? (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {content}
            <PhotoFrame src={imageSrc} alt={imageAlt ?? title} accentColor={isDark ? "yellow" : "teal"} />
          </div>
        ) : (
          content
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: compiles clean, all 21 routes generated. Spot-check (visually, via `npm run dev`) that two or three `PageHero` pages — e.g. `/about` (bg yellow, no image) and `/smile-house` (bg navy, no image) — render identically to before this task, since neither passes `imageSrc`.

- [ ] **Step 3: Commit**

```bash
git add components/PageHero.tsx
git commit -m "feat: add optional layered image slot to PageHero"
```

---

### Task 7: Header — utility bar + dropdown nav

**Files:**
- Modify: `components/Header.tsx` (full replacement, shown below)

**Interfaces:**
- Consumes: `DonateButton` (unchanged), `MobileNav` (its props change in Task 8 — `isOpen`/`onClose` stay the same, so `Header`'s usage is unaffected).
- Produces: no new exports consumed elsewhere; this is the root nav structure. Final nav coverage (all 16 routes reachable from the header): **About** dropdown (About Us, Our Story, Our Impact, Meet Our Families), **Get Involved** dropdown (SMILE House, Family Support, Fundraising, Corporate Partnerships, Legacy Giving, Volunteer), flat links (Events, News, Shop, Contact), Donate button (unchanged, links to `/donate`), logo (links to `/`).

- [ ] **Step 1: Replace the full file**

```tsx
// components/Header.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DonateButton from "./DonateButton";
import MobileNav from "./MobileNav";

interface NavGroup {
  label: string;
  items: { label: string; href: string }[];
}

const navGroups: NavGroup[] = [
  {
    label: "About",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Our Story", href: "/our-story" },
      { label: "Our Impact", href: "/impact" },
      { label: "Meet Our Families", href: "/families" },
    ],
  },
  {
    label: "Get Involved",
    items: [
      { label: "SMILE House", href: "/smile-house" },
      { label: "Family Support", href: "/family-support" },
      { label: "Fundraising", href: "/fundraising" },
      { label: "Corporate Partnerships", href: "/corporate" },
      { label: "Legacy Giving", href: "/legacy" },
      { label: "Volunteer", href: "/volunteer" },
    ],
  },
];

const flatLinks = [
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <>
      <div className="hidden lg:block bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <span className="text-white/70">[Phone number. Stephen to supply]</span>
            <span className="text-white/70">[Email address. Stephen to supply]</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="https://facebook.com" className="text-white/70 hover:text-yellow transition-colors">
              Facebook
            </Link>
            <Link href="https://instagram.com" className="text-white/70 hover:text-yellow transition-colors">
              Instagram
            </Link>
            <Link href="https://linkedin.com" className="text-white/70 hover:text-yellow transition-colors">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" aria-label="SMILE Children's Charity — home">
              <Image
                src="/logo.png"
                alt="SMILE Children's Charity"
                width={140}
                height={64}
                priority
                className="w-[140px] h-auto"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
              {navGroups.map((group) => (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(group.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className="flex items-center gap-1 text-sm font-medium text-gray-800 hover:text-yellow-dark transition-colors py-2"
                    aria-haspopup="true"
                    aria-expanded={openDropdown === group.label}
                  >
                    {group.label}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`absolute top-full left-0 w-56 bg-white rounded-2xl shadow-[0_24px_50px_rgba(0,0,0,0.15)] border border-gray-100 py-2 transition-all ${
                      openDropdown === group.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 hover:text-yellow-dark transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              {flatLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-800 hover:text-yellow-dark transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <DonateButton size="sm" />
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-black transition-colors"
                aria-label="Open navigation menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: compiles clean. `MobileNav` still accepts `isOpen`/`onClose` at this point (Task 8 changes its internals, not its props), so this builds even before Task 8 runs.

- [ ] **Step 3: Commit**

```bash
git add components/Header.tsx
git commit -m "feat: add header utility bar and dropdown navigation"
```

---

### Task 8: MobileNav — matching accordion groups

**Files:**
- Modify: `components/MobileNav.tsx` (full replacement, shown below)

**Interfaces:**
- Consumes: `DonateButton` (unchanged).
- Produces: `MobileNav({ isOpen: boolean, onClose: () => void })` — same props as before. Internal nav structure now mirrors Task 5's `navGroups`/`flatLinks` exactly (About/Get Involved as expandable accordion sections, plus the same 4 flat links), so desktop and mobile expose the same site map.

- [ ] **Step 1: Replace the full file**

```tsx
// components/MobileNav.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DonateButton from "./DonateButton";

interface NavGroup {
  label: string;
  items: { label: string; href: string }[];
}

const navGroups: NavGroup[] = [
  {
    label: "About",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Our Story", href: "/our-story" },
      { label: "Our Impact", href: "/impact" },
      { label: "Meet Our Families", href: "/families" },
    ],
  },
  {
    label: "Get Involved",
    items: [
      { label: "SMILE House", href: "/smile-house" },
      { label: "Family Support", href: "/family-support" },
      { label: "Fundraising", href: "/fundraising" },
      { label: "Corporate Partnerships", href: "/corporate" },
      { label: "Legacy Giving", href: "/legacy" },
      { label: "Volunteer", href: "/volunteer" },
    ],
  },
];

const flatLinks = [
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`fixed top-0 right-0 h-full w-72 bg-white z-50 lg:hidden flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="font-heading font-bold text-black">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-black transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navGroups.map((group) => (
              <li key={group.label}>
                <button
                  onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                  aria-expanded={openGroup === group.label}
                >
                  {group.label}
                  <svg
                    className={`w-4 h-4 transition-transform ${openGroup === group.label ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openGroup === group.label && (
                  <ul className="pl-4 space-y-1 mt-1">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="block px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            {flatLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block px-3 py-3 rounded-lg text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-black transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <DonateButton size="md" />
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: compiles clean, all 21 routes generated.

- [ ] **Step 3: Commit**

```bash
git add components/MobileNav.tsx
git commit -m "feat: add matching accordion groups to MobileNav"
```

---

### Task 9: Footer polish — wave seam into the nav columns

**Files:**
- Modify: `components/Footer.tsx:1-44` (import + insert one component between the donate strip and the nav columns)

**Interfaces:**
- Consumes: `WaveDivider` from Task 1 (`{ fromColor: string, toColor: string }`).

- [ ] **Step 1: Add the import**

In `components/Footer.tsx`, change:

```tsx
import Link from "next/link";
import Image from "next/image";
import DonateButton from "./DonateButton";
```

to:

```tsx
import Link from "next/link";
import Image from "next/image";
import DonateButton from "./DonateButton";
import WaveDivider from "./WaveDivider";
```

- [ ] **Step 2: Insert the divider between the donate strip and the main footer**

Change:

```tsx
      {/* Donate strip */}
      <div className="bg-yellow py-8 text-center">
        <p className="font-heading font-bold text-black text-xl mb-4">
          Your support gives a family in Lanarkshire the break they really need.
        </p>
        <DonateButton size="lg" />
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
```

to:

```tsx
      {/* Donate strip */}
      <div className="bg-yellow py-8 text-center">
        <p className="font-heading font-bold text-black text-xl mb-4">
          Your support gives a family in Lanarkshire the break they really need.
        </p>
        <DonateButton size="lg" />
      </div>

      <WaveDivider fromColor="#FDD70E" toColor="#2E3245" />

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: compiles clean, all 21 routes generated.

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add wave divider seam to footer"
```

---

### Task 10: Homepage — full visual application

**Files:**
- Modify: `app/page.tsx` (full replacement, shown below)

**Interfaces:**
- Consumes: `SectionHeading`, `WaveDivider`, `PhotoFrame`, `IconLinkRow` (Tasks 1-4), plus existing `Section`, `SectionLabel`, `DonateButton`, `AnimatedCounter`, `ProgressBar`, `TestimonialCard`, `EventCard` (unchanged).
- No content changes: every string, stat, testimonial, and event placeholder stays exactly as it is today. Only structure/visual wrapping changes.

- [ ] **Step 1: Replace the full file**

```tsx
// app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import SectionHeading from "@/components/SectionHeading";
import WaveDivider from "@/components/WaveDivider";
import PhotoFrame from "@/components/PhotoFrame";
import IconLinkRow from "@/components/IconLinkRow";
import DonateButton from "@/components/DonateButton";
import AnimatedCounter from "@/components/AnimatedCounter";
import ProgressBar from "@/components/ProgressBar";
import TestimonialCard from "@/components/TestimonialCard";
import EventCard from "@/components/EventCard";

export const metadata: Metadata = {
  title: "SMILE Children's Charity | Supporting Families in Larkhall",
  description: "SMILE Children's Charity SCIO supports seriously ill and disabled children and their families across Larkhall and South Lanarkshire. Donate, volunteer, or get involved.",
  openGraph: {
    title: "SMILE Children's Charity | Supporting Families in Larkhall",
    description: "SMILE Children's Charity SCIO supports seriously ill and disabled children and their families across Larkhall and South Lanarkshire.",
    type: "website",
  },
};

const impactStats = [
  { value: "250+", label: "Families supported" },
  { value: "40+", label: "Events this year" },
  { value: "120+", label: "Volunteers" },
  { value: "?", label: "Raised for SMILE House" },
];

const testimonials = [
  {
    quote: "SMILE gave our family the break we so desperately needed. We finally felt like we weren't alone.",
    name: "Family name",
    location: "Lanarkshire",
  },
  {
    quote: "The support we received changed everything. Our children got to just be children again.",
    name: "Family name",
    location: "Lanarkshire",
  },
  {
    quote: "I didn't think anyone understood what we were going through. SMILE did. They still do.",
    name: "Family name",
    location: "Lanarkshire",
  },
];

const events = [
  { day: "TBC", month: "2026", title: "[Event name. Stephen to supply]", location: "[Location TBC]", href: "/events" },
  { day: "TBC", month: "2026", title: "[Event name. Stephen to supply]", location: "[Location TBC]", href: "/events" },
  { day: "TBC", month: "2026", title: "[Event name. Stephen to supply]", location: "[Location TBC]", href: "/events" },
];

const quickLinks = [
  {
    label: "Donate",
    href: "/donate",
    tone: "yellow" as const,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    label: "Fundraise",
    href: "/fundraising",
    tone: "teal" as const,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13l4 4L19 5" />
      </svg>
    ),
  },
  {
    label: "Volunteer",
    href: "/volunteer",
    tone: "navy" as const,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4" />
      </svg>
    ),
  },
  {
    label: "Corporate",
    href: "/corporate",
    tone: "yellow" as const,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-black text-white min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm italic pointer-events-none select-none">
          [Hero image. Stephen to supply]
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <SectionLabel>SMILE Children&apos;s Charity</SectionLabel>
          <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 max-w-3xl">
            Every child deserves to smile.
          </h1>
          <p className="text-gray-200 text-xl max-w-xl mb-10 leading-relaxed">
            When your child is seriously ill or disabled, life can feel relentless.
            SMILE is here for families across Lanarkshire. Real support. Real community.
            People who genuinely care.
          </p>
          <div className="flex flex-wrap gap-4">
            <DonateButton size="lg" />
            <DonateButton size="lg" variant="outline" label="Become a Monthly Supporter" />
          </div>
        </div>
        <div className="relative flex justify-center pb-8">
          <div className="animate-bounce text-white/40" aria-hidden="true">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#2E3245" toColor="#FFFFFF" />

      {/* Quick links */}
      <Section>
        <IconLinkRow links={quickLinks} />
      </Section>

      {/* Who we are */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading eyebrow="Who We Are" title="Supporting families who need it most." centered={false} />
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              SMILE was started by people who know exactly how hard this can be.
              Families of children with serious illness or disability carry a weight most people never see.
              We&apos;re here to lighten that load, even if just for a little while.
              Because no family should carry it alone.
            </p>
            <Link
              href="/about"
              className="inline-block font-bold text-black underline underline-offset-4 hover:text-yellow-dark transition-colors"
            >
              More about us
            </Link>
          </div>
          <PhotoFrame alt="Family supported by SMILE" placeholder="[Photo. Stephen to supply]" accentColor="yellow" />
        </div>
      </Section>

      <WaveDivider fromColor="#FFFFFF" toColor="#2E3245" />

      {/* Our Story */}
      <Section bg="black">
        <div className="max-w-3xl mx-auto">
          <SectionHeading eyebrow="Our Story" title="Born from love. Built for families." dark />
          <p className="text-gray-300 text-lg leading-relaxed mb-8 text-center">
            [Justin and Charlotte&apos;s story. Stephen to supply the founding story and photos.]
          </p>
          <div className="text-center">
            <Link
              href="/our-story"
              className="inline-block px-6 py-3 rounded-full border-2 border-teal text-teal font-bold hover:bg-teal hover:text-white transition-all"
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </Section>

      <WaveDivider fromColor="#2E3245" toColor="#FDD70E" />

      {/* Impact stats */}
      <Section bg="yellow">
        <SectionHeading title="The difference your support makes." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {impactStats.map((stat) => (
            <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/impact"
            className="font-bold text-black underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            See our full impact
          </Link>
        </div>
      </Section>

      <WaveDivider fromColor="#FDD70E" toColor="#FFFFFF" />

      {/* SMILE House appeal */}
      <Section>
        <div className="bg-black rounded-3xl p-8 md:p-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <SectionLabel>Current Appeal</SectionLabel>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              Help us build SMILE House.
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              SMILE House will give families a proper place to breathe.
              Somewhere to rest, recharge, and spend time with people who truly understand.
              We&apos;re building it together, and every donation brings it closer.
            </p>
            <div className="mb-8">
              <ProgressBar raised={null} target={null} />
            </div>
            <DonateButton size="lg" label="Support SMILE House" />
          </div>
          <PhotoFrame
            alt="SMILE House"
            placeholder="[SMILE House image. Stephen to supply]"
            aspect="video"
            accentColor="teal"
            accentPosition="bottom-right"
          />
        </div>
      </Section>

      <WaveDivider fromColor="#FFFFFF" toColor="#FFF8EE" />

      {/* Family stories */}
      <Section bg="gray">
        <SectionHeading eyebrow="Family Stories" title="Stories from the families we support." />
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={i}
              quote={t.quote}
              name={t.name}
              location={t.location}
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/families"
            className="font-bold text-black underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            Meet more families
          </Link>
        </div>
      </Section>

      <WaveDivider fromColor="#FFF8EE" toColor="#FFFFFF" />

      {/* Upcoming events */}
      <Section>
        <div className="flex items-end justify-between mb-8">
          <SectionHeading title="Upcoming Events" centered={false} />
          <Link
            href="/events"
            className="text-sm font-bold text-black underline underline-offset-4 hover:opacity-70"
          >
            See all events
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {events.map((e, i) => (
            <EventCard
              key={i}
              day={e.day}
              month={e.month}
              title={e.title}
              location={e.location}
              href={e.href}
            />
          ))}
        </div>
      </Section>

      <WaveDivider fromColor="#FFFFFF" toColor="#FFF8EE" />

      {/* Corporate supporters */}
      <Section bg="gray">
        <SectionHeading title="Supported by" />
        <p className="text-gray-500 text-sm text-center -mt-8 mb-10">[Corporate supporter logos. Stephen to supply]</p>
        <div className="flex flex-wrap gap-8 justify-center items-center opacity-40">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-28 h-12 bg-gray-300 rounded-lg" />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/corporate"
            className="inline-block px-6 py-3 rounded-full border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all"
          >
            Become a Partner
          </Link>
        </div>
      </Section>

      <WaveDivider fromColor="#FFF8EE" toColor="#FDD70E" />

      {/* Newsletter */}
      <Section bg="yellow">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold text-black mb-4">Stay connected.</h2>
          <p className="text-black/70 mb-8">
            Get updates from SMILE. News, events, and stories from the families we support.
            Nothing you didn&apos;t ask for.
          </p>
          <form className="flex gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-full border-2 border-black text-black placeholder:text-black/40 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)] focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-colors shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Section>
    </>
  );
}
```

Note: the old flat "CTA strip" section (5 text-link pills: Donate Now / Monthly Giving / Fundraise / Volunteer / Corporate) is replaced by the `IconLinkRow` quick-links section. This is an intentional spec change (`docs/superpowers/specs/2026-06-30-organic-visual-system-design.md`, `IconLinkRow` section) — content intent (drive donation/fundraising/volunteer/corporate actions) is preserved, only the visual treatment changes from flat pills to icon badges.

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: compiles clean, all 21 routes generated, zero TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: apply organic visual system to homepage"
```

---

### Task 11: About + Our Story pages

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/our-story/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading`, `PhotoFrame`, `WaveDivider` (Tasks 1-3).

- [ ] **Step 1: `app/about/page.tsx` — update imports**

Change:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
```

to:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import PhotoFrame from "@/components/PhotoFrame";
```

- [ ] **Step 2: `app/about/page.tsx` — Our Mission section**

Change:

```tsx
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel>Our Mission</SectionLabel>
            <h2 className="font-heading text-3xl font-bold text-black mb-6">
              Why SMILE exists.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              [Mission statement. Stephen to supply.]
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              [Additional mission copy. Stephen to supply.]
            </p>
          </div>
          <div className="bg-gray-100 rounded-2xl aspect-video flex items-center justify-center text-gray-400 text-sm italic">
            [Team or charity photo. Stephen to supply]
          </div>
        </div>
      </Section>

      <Section bg="gray">
        <div className="text-center mb-12">
          <SectionLabel>Our Values</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            What guides everything we do.
          </h2>
        </div>
```

to:

```tsx
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading eyebrow="Our Mission" title="Why SMILE exists." centered={false} />
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              [Mission statement. Stephen to supply.]
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              [Additional mission copy. Stephen to supply.]
            </p>
          </div>
          <PhotoFrame alt="The SMILE team" placeholder="[Team or charity photo. Stephen to supply]" aspect="video" accentColor="yellow" />
        </div>
      </Section>

      <WaveDivider fromColor="#FFFFFF" toColor="#FFF8EE" />

      <Section bg="gray">
        <SectionHeading eyebrow="Our Values" title="What guides everything we do." />
```

Note: this introduces `WaveDivider` — add the import from Step 1's edit (already includes it implicitly? No — re-check Step 1's new import block does NOT include `WaveDivider`. Add it now.) Update the Step 1 import block instead to:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import PhotoFrame from "@/components/PhotoFrame";
import WaveDivider from "@/components/WaveDivider";
```

- [ ] **Step 3: `app/about/page.tsx` — Our Team section**

Change:

```tsx
      <Section>
        <div className="text-center mb-12">
          <SectionLabel>Our Team</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            The people behind SMILE.
          </h2>
        </div>
```

to:

```tsx
      <Section>
        <SectionHeading eyebrow="Our Team" title="The people behind SMILE." />
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: compiles clean. (If `SectionLabel` is now unused in `app/about/page.tsx`, TypeScript will not error — Next.js does not fail the build on unused imports by default — but remove the now-unused `SectionLabel` import if you didn't already replace it in Step 1; the Step 1 replacement already drops it, so there is nothing left to do here.)

- [ ] **Step 5: `app/our-story/page.tsx` — update imports**

Change:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
```

to:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import PhotoFrame from "@/components/PhotoFrame";
import WaveDivider from "@/components/WaveDivider";
```

- [ ] **Step 6: `app/our-story/page.tsx` — How It Started section**

Change:

```tsx
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center text-gray-400 text-sm italic">
            [Justin and Charlotte photo. Stephen to supply]
          </div>
          <div>
            <SectionLabel>How It Started</SectionLabel>
            <h2 className="font-heading text-3xl font-bold text-black mb-6">
              [Founding story heading. Stephen to supply]
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              [Justin and Charlotte founding story paragraph 1. Stephen to supply]
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              [Founding story paragraph 2. Stephen to supply]
            </p>
          </div>
        </div>
      </Section>

      <Section bg="gray">
        <div className="text-center mb-12">
          <SectionLabel>Our Journey</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            From idea to impact.
          </h2>
        </div>
```

to:

```tsx
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <PhotoFrame alt="Justin and Charlotte, SMILE founders" placeholder="[Justin and Charlotte photo. Stephen to supply]" accentColor="teal" />
          <div>
            <SectionHeading eyebrow="How It Started" title="[Founding story heading. Stephen to supply]" centered={false} />
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              [Justin and Charlotte founding story paragraph 1. Stephen to supply]
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              [Founding story paragraph 2. Stephen to supply]
            </p>
          </div>
        </div>
      </Section>

      <WaveDivider fromColor="#FFFFFF" toColor="#FFF8EE" />

      <Section bg="gray">
        <SectionHeading eyebrow="Our Journey" title="From idea to impact." />
```

- [ ] **Step 7: `app/our-story/page.tsx` — photo grid section**

Change:

```tsx
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center text-gray-400 text-xs italic">
              [Photo {i}. Stephen to supply]
            </div>
          ))}
        </div>
      </Section>
```

to:

```tsx
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <PhotoFrame
              key={i}
              alt={`SMILE moment ${i}`}
              placeholder={`[Photo ${i}. Stephen to supply]`}
              accentColor={i % 2 === 0 ? "teal" : "yellow"}
              accentPosition={i % 2 === 0 ? "bottom-right" : "top-left"}
            />
          ))}
        </div>
      </Section>
```

- [ ] **Step 8: Verify build**

```bash
npm run build
```

Expected: compiles clean, all 21 routes generated.

- [ ] **Step 9: Commit**

```bash
git add app/about/page.tsx app/our-story/page.tsx
git commit -m "feat: apply organic visual system to About and Our Story pages"
```

---

### Task 12: Families + Impact pages

**Files:**
- Modify: `app/families/page.tsx`
- Modify: `app/impact/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading` (Task 3).

- [ ] **Step 1: `app/families/page.tsx` — update imports**

Change:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
import TestimonialCard from "@/components/TestimonialCard";
```

to:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";
```

- [ ] **Step 2: `app/families/page.tsx` — What We Offer heading**

Change:

```tsx
      <Section>
        <div className="text-center mb-12">
          <SectionLabel>What We Offer</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            How SMILE supports your family.
          </h2>
        </div>
```

to:

```tsx
      <Section>
        <SectionHeading eyebrow="What We Offer" title="How SMILE supports your family." />
```

- [ ] **Step 3: `app/families/page.tsx` — Family Stories heading**

Change:

```tsx
      <Section bg="gray">
        <div className="text-center mb-12">
          <SectionLabel>Family Stories</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Hear from the families we support.
          </h2>
        </div>
```

to:

```tsx
      <Section bg="gray">
        <SectionHeading eyebrow="Family Stories" title="Hear from the families we support." />
```

- [ ] **Step 4: `app/impact/page.tsx` — update imports**

Change:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
import AnimatedCounter from "@/components/AnimatedCounter";
```

to:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import WaveDivider from "@/components/WaveDivider";
import AnimatedCounter from "@/components/AnimatedCounter";
```

- [ ] **Step 5: `app/impact/page.tsx` — By Service heading + dividers around the white counters block**

Change:

```tsx
      <Section bg="white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.slice(0, 4).map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center mb-12">
          <SectionLabel>By Service</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Where your support goes.
          </h2>
        </div>
```

to:

```tsx
      <Section bg="white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.slice(0, 4).map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="By Service" title="Where your support goes." />
```

(This page's `PageHero bg="yellow"` is directly followed by `Section bg="white"`, so no divider is needed at the very top — `PageHero` and `Section` already use different background tones without a hard color clash. No divider is needed between `Section bg="white"` and the following plain `Section` either, since both default to white.)

- [ ] **Step 6: `app/impact/page.tsx` — divider into the gray stats block**

Change:

```tsx
      <Section bg="gray">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.slice(4).map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Section>
```

to:

```tsx
      <WaveDivider fromColor="#FFFFFF" toColor="#FFF8EE" />

      <Section bg="gray">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.slice(4).map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Section>
```

- [ ] **Step 7: Verify build**

```bash
npm run build
```

Expected: compiles clean, all 21 routes generated.

- [ ] **Step 8: Commit**

```bash
git add app/families/page.tsx app/impact/page.tsx
git commit -m "feat: apply organic visual system to Families and Impact pages"
```

---

### Task 13: SMILE House + Family Support pages

**Files:**
- Modify: `app/smile-house/page.tsx`
- Modify: `app/family-support/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading`, `PhotoFrame`, `WaveDivider` (Tasks 1-3).

- [ ] **Step 1: `app/smile-house/page.tsx` — update imports**

Change:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
import ProgressBar from "@/components/ProgressBar";
import DonateButton from "@/components/DonateButton";
```

to:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import SectionLabel from "@/components/SectionLabel";
import PhotoFrame from "@/components/PhotoFrame";
import WaveDivider from "@/components/WaveDivider";
import ProgressBar from "@/components/ProgressBar";
import DonateButton from "@/components/DonateButton";
```

(`SectionLabel` stays imported — the Fundraising Progress section below uses it standalone, not through `SectionHeading`, because that section's heading is followed directly by a `ProgressBar`, not by body copy, and keeping the existing manual layout there is simplest. `SectionHeading` is added for the two sections that do match the eyebrow+title+squiggle pattern.)

- [ ] **Step 2: `app/smile-house/page.tsx` — The Vision section**

Change:

```tsx
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel>The Vision</SectionLabel>
            <h2 className="font-heading text-3xl font-bold text-black mb-6">
              Why SMILE House matters.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              [SMILE House vision paragraph 1. Stephen to supply]
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              [SMILE House vision paragraph 2. Stephen to supply]
            </p>
          </div>
          <div className="bg-gray-100 rounded-2xl aspect-video flex items-center justify-center text-gray-400 text-sm italic">
            [SMILE House render or image. Stephen to supply]
          </div>
        </div>
      </Section>

      <Section bg="black">
        <div className="max-w-2xl mx-auto text-center">
          <SectionLabel>Fundraising Progress</SectionLabel>
```

to:

```tsx
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading eyebrow="The Vision" title="Why SMILE House matters." centered={false} />
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              [SMILE House vision paragraph 1. Stephen to supply]
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              [SMILE House vision paragraph 2. Stephen to supply]
            </p>
          </div>
          <PhotoFrame alt="SMILE House" placeholder="[SMILE House render or image. Stephen to supply]" aspect="video" accentColor="teal" accentPosition="bottom-right" />
        </div>
      </Section>

      <WaveDivider fromColor="#FFFFFF" toColor="#2E3245" />

      <Section bg="black">
        <div className="max-w-2xl mx-auto text-center">
          <SectionLabel>Fundraising Progress</SectionLabel>
```

- [ ] **Step 3: `app/smile-house/page.tsx` — Build Timeline section**

Change:

```tsx
      <Section>
        <div className="text-center mb-12">
          <SectionLabel>Build Timeline</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Our plan to make it happen.
          </h2>
        </div>
```

to:

```tsx
      <Section>
        <SectionHeading eyebrow="Build Timeline" title="Our plan to make it happen." />
```

- [ ] **Step 4: `app/family-support/page.tsx` — update imports**

Change:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
```

to:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
```

- [ ] **Step 5: `app/family-support/page.tsx` — Our Services heading**

Change:

```tsx
      <Section>
        <div className="text-center mb-12">
          <SectionLabel>Our Services</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            What SMILE can provide.
          </h2>
        </div>
```

to:

```tsx
      <Section>
        <SectionHeading eyebrow="Our Services" title="What SMILE can provide." />
```

- [ ] **Step 6: `app/family-support/page.tsx` — How to Access Support heading**

Change:

```tsx
      <Section bg="gray">
        <div className="text-center mb-12">
          <SectionLabel>How to Access Support</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Three simple steps.
          </h2>
        </div>
```

to:

```tsx
      <Section bg="gray">
        <SectionHeading eyebrow="How to Access Support" title="Three simple steps." />
```

- [ ] **Step 7: Verify build**

```bash
npm run build
```

Expected: compiles clean, all 21 routes generated.

- [ ] **Step 8: Commit**

```bash
git add app/smile-house/page.tsx app/family-support/page.tsx
git commit -m "feat: apply organic visual system to SMILE House and Family Support pages"
```

---

### Task 14: Events + News pages

**Files:**
- Modify: `app/events/page.tsx`
- Modify: `app/news/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading`, `PhotoFrame` (Tasks 2-3).

- [ ] **Step 1: `app/events/page.tsx` — update imports**

Change:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
import EventCard from "@/components/EventCard";
```

to:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import PhotoFrame from "@/components/PhotoFrame";
import EventCard from "@/components/EventCard";
```

- [ ] **Step 2: `app/events/page.tsx` — Upcoming heading**

Change:

```tsx
      <Section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <SectionLabel>Upcoming</SectionLabel>
            <h2 className="font-heading text-3xl font-bold text-black">Events coming up.</h2>
          </div>
        </div>
```

to:

```tsx
      <Section>
        <SectionHeading eyebrow="Upcoming" title="Events coming up." centered={false} />
```

- [ ] **Step 3: `app/events/page.tsx` — Past Events section**

Change:

```tsx
      <Section bg="gray">
        <div className="text-center mb-8">
          <SectionLabel>Past Events</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            What we have done together.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl aspect-video flex items-center justify-center text-gray-400 text-xs italic shadow-sm">
              [Past event photo {i}. Stephen to supply]
            </div>
          ))}
        </div>
      </Section>
```

to:

```tsx
      <Section bg="gray">
        <SectionHeading eyebrow="Past Events" title="What we have done together." />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <PhotoFrame
              key={i}
              alt={`Past SMILE event ${i}`}
              placeholder={`[Past event photo ${i}. Stephen to supply]`}
              aspect="video"
              accentColor={i % 2 === 0 ? "teal" : "yellow"}
              accentPosition={i % 2 === 0 ? "bottom-right" : "top-left"}
            />
          ))}
        </div>
      </Section>
```

- [ ] **Step 4: `app/news/page.tsx` — update imports**

Change:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
```

to:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import PhotoFrame from "@/components/PhotoFrame";
```

(News has no eyebrow+heading section to swap — the only section is the category filter + article grid, which has no `SectionLabel`/`h2` heading at all. Only the article image placeholder changes.)

- [ ] **Step 5: `app/news/page.tsx` — article image placeholder**

Change:

```tsx
            <Link key={i} href="/news" className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-all">
              <div className="bg-gray-100 aspect-video flex items-center justify-center text-gray-400 text-xs italic">
                [Article image. Stephen to supply]
              </div>
              <div className="p-5">
```

to:

```tsx
            <Link key={i} href="/news" className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-all">
              <PhotoFrame alt={a.title} placeholder="[Article image. Stephen to supply]" aspect="video" accentColor="yellow" />
              <div className="p-5">
```

- [ ] **Step 6: Verify build**

```bash
npm run build
```

Expected: compiles clean, all 21 routes generated.

- [ ] **Step 7: Commit**

```bash
git add app/events/page.tsx app/news/page.tsx
git commit -m "feat: apply organic visual system to Events and News pages"
```

---

### Task 15: Fundraising + Corporate pages

**Files:**
- Modify: `app/fundraising/page.tsx`
- Modify: `app/corporate/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading`, `PhotoFrame`, `WaveDivider` (Tasks 1-3).

- [ ] **Step 1: `app/fundraising/page.tsx` — update imports**

Change:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
```

to:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import PhotoFrame from "@/components/PhotoFrame";
import WaveDivider from "@/components/WaveDivider";
```

- [ ] **Step 2: `app/fundraising/page.tsx` — How to Get Started heading**

Change:

```tsx
      <Section>
        <div className="text-center mb-12">
          <SectionLabel>How to Get Started</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Pick an idea. We handle the rest.
          </h2>
        </div>
```

to:

```tsx
      <Section>
        <SectionHeading eyebrow="How to Get Started" title="Pick an idea. We handle the rest." />
```

- [ ] **Step 3: `app/fundraising/page.tsx` — Fundraising Pack section**

Change:

```tsx
      <Section bg="gray">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel>Fundraising Pack</SectionLabel>
            <h2 className="font-heading text-3xl font-bold text-black mb-6">
              Everything you need in one place.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Our fundraising pack includes SMILE branding, collection sheets, poster templates,
              and guidance on how to set up an online giving page. Everything you need to hit the ground running.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-all"
            >
              Request a Pack
            </Link>
          </div>
          <div className="bg-gray-100 rounded-2xl aspect-video flex items-center justify-center text-gray-400 text-sm italic">
            [Fundraising pack preview image. Stephen to supply]
          </div>
        </div>
      </Section>
```

to:

```tsx
      <WaveDivider fromColor="#FFFFFF" toColor="#FFF8EE" />

      <Section bg="gray">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading eyebrow="Fundraising Pack" title="Everything you need in one place." centered={false} />
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Our fundraising pack includes SMILE branding, collection sheets, poster templates,
              and guidance on how to set up an online giving page. Everything you need to hit the ground running.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-all"
            >
              Request a Pack
            </Link>
          </div>
          <PhotoFrame alt="Fundraising pack" placeholder="[Fundraising pack preview image. Stephen to supply]" aspect="video" accentColor="teal" accentPosition="bottom-right" />
        </div>
      </Section>
```

- [ ] **Step 4: `app/corporate/page.tsx` — update imports**

Change:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
```

to:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
```

- [ ] **Step 5: `app/corporate/page.tsx` — Why Partner With Us heading**

Change:

```tsx
      <Section>
        <div className="text-center mb-12">
          <SectionLabel>Why Partner With Us</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Good for your business. Great for families.
          </h2>
        </div>
```

to:

```tsx
      <Section>
        <SectionHeading eyebrow="Why Partner With Us" title="Good for your business. Great for families." />
```

- [ ] **Step 6: `app/corporate/page.tsx` — Partnership Tiers heading**

Change:

```tsx
      <Section bg="gray">
        <div className="text-center mb-12">
          <SectionLabel>Partnership Tiers</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Find the right level for your business.
          </h2>
        </div>
```

to:

```tsx
      <Section bg="gray">
        <SectionHeading eyebrow="Partnership Tiers" title="Find the right level for your business." />
```

- [ ] **Step 7: `app/corporate/page.tsx` — Our Partners heading**

Change:

```tsx
      <Section>
        <div className="text-center mb-10">
          <SectionLabel>Our Partners</SectionLabel>
          <h2 className="font-heading text-2xl font-bold text-black mb-2">
            Businesses that already support SMILE.
          </h2>
          <p className="text-gray-500 text-sm">[Partner logos. Stephen to supply]</p>
        </div>
```

to:

```tsx
      <Section>
        <SectionHeading eyebrow="Our Partners" title="Businesses that already support SMILE." />
        <p className="text-gray-500 text-sm text-center -mt-8 mb-10">[Partner logos. Stephen to supply]</p>
```

- [ ] **Step 8: Verify build**

```bash
npm run build
```

Expected: compiles clean, all 21 routes generated.

- [ ] **Step 9: Commit**

```bash
git add app/fundraising/page.tsx app/corporate/page.tsx
git commit -m "feat: apply organic visual system to Fundraising and Corporate pages"
```

---

### Task 16: Legacy + Volunteer pages

**Files:**
- Modify: `app/legacy/page.tsx`
- Modify: `app/volunteer/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading`, `PhotoFrame` (Tasks 2-3).

- [ ] **Step 1: `app/legacy/page.tsx` — update imports**

Change:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
```

to:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import SectionLabel from "@/components/SectionLabel";
import PhotoFrame from "@/components/PhotoFrame";
```

(`SectionLabel` stays imported — the Legal Information card uses it standalone next to an `h3`, not through `SectionHeading`, since that block is a small inset card rather than a full section header.)

- [ ] **Step 2: `app/legacy/page.tsx` — Why Leave a Legacy section**

Change:

```tsx
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel>Why Leave a Legacy</SectionLabel>
            <h2 className="font-heading text-3xl font-bold text-black mb-6">
              A gift that outlasts us all.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Legacy gifts are one of the most powerful ways to support SMILE.
              They allow us to plan for the future, invest in long-term projects like SMILE House,
              and keep helping families no matter what the fundraising climate looks like year to year.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Every gift, however large or small, makes a difference. There is no minimum amount.
            </p>
          </div>
          <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center text-gray-400 text-sm italic">
            [Legacy section image. Stephen to supply]
          </div>
        </div>
      </Section>

      <Section bg="gray">
        <div className="text-center mb-12">
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Three simple steps.
          </h2>
        </div>
```

to:

```tsx
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading eyebrow="Why Leave a Legacy" title="A gift that outlasts us all." centered={false} />
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Legacy gifts are one of the most powerful ways to support SMILE.
              They allow us to plan for the future, invest in long-term projects like SMILE House,
              and keep helping families no matter what the fundraising climate looks like year to year.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Every gift, however large or small, makes a difference. There is no minimum amount.
            </p>
          </div>
          <PhotoFrame alt="Legacy giving" placeholder="[Legacy section image. Stephen to supply]" accentColor="yellow" />
        </div>
      </Section>

      <Section bg="gray">
        <SectionHeading eyebrow="How It Works" title="Three simple steps." />
```

- [ ] **Step 3: `app/volunteer/page.tsx` — update imports**

Change:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
```

to:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import PhotoFrame from "@/components/PhotoFrame";
```

- [ ] **Step 4: `app/volunteer/page.tsx` — Why Volunteer section**

Change:

```tsx
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel>Why Volunteer</SectionLabel>
            <h2 className="font-heading text-3xl font-bold text-black mb-6">
              More than just giving time.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Volunteering with SMILE connects you to families doing something remarkable.
              You will meet people, build skills, and know that what you are doing genuinely matters.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              [Additional volunteering copy. Stephen to supply]
            </p>
          </div>
          <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center text-gray-400 text-sm italic">
            [Volunteer photo. Stephen to supply]
          </div>
        </div>
      </Section>

      <Section bg="gray">
        <div className="text-center mb-12">
          <SectionLabel>Volunteer Roles</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Find the right role for you.
          </h2>
        </div>
```

to:

```tsx
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading eyebrow="Why Volunteer" title="More than just giving time." centered={false} />
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Volunteering with SMILE connects you to families doing something remarkable.
              You will meet people, build skills, and know that what you are doing genuinely matters.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              [Additional volunteering copy. Stephen to supply]
            </p>
          </div>
          <PhotoFrame alt="SMILE volunteer" placeholder="[Volunteer photo. Stephen to supply]" accentColor="teal" />
        </div>
      </Section>

      <Section bg="gray">
        <SectionHeading eyebrow="Volunteer Roles" title="Find the right role for you." />
```

- [ ] **Step 5: `app/volunteer/page.tsx` — How to Apply heading**

Change:

```tsx
      <Section>
        <div className="text-center mb-12">
          <SectionLabel>How to Apply</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Three simple steps.
          </h2>
        </div>
```

to:

```tsx
      <Section>
        <SectionHeading eyebrow="How to Apply" title="Three simple steps." />
```

- [ ] **Step 6: Verify build**

```bash
npm run build
```

Expected: compiles clean, all 21 routes generated.

- [ ] **Step 7: Commit**

```bash
git add app/legacy/page.tsx app/volunteer/page.tsx
git commit -m "feat: apply organic visual system to Legacy and Volunteer pages"
```

---

### Task 17: Shop + Donate + Contact pages — visual application and forms polish

**Files:**
- Modify: `app/shop/page.tsx`
- Modify: `app/donate/page.tsx`
- Modify: `app/contact/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading`, `PhotoFrame` (Tasks 2-3).

- [ ] **Step 1: `app/shop/page.tsx` — newsletter input polish**

Change:

```tsx
          <form className="flex gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-full border-2 border-black text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              Notify me
            </button>
          </form>
```

to:

```tsx
          <form className="flex gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-5 py-3 rounded-full border-2 border-black text-black placeholder:text-black/40 shadow-[0_8px_20px_rgba(0,0,0,0.06)] focus:outline-none focus:ring-2 focus:ring-yellow"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-colors whitespace-nowrap shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
            >
              Notify me
            </button>
          </form>
```

(Shop has no `SectionLabel`/`h2` heading pattern to swap — its single content section is just the intro paragraph and the form.)

- [ ] **Step 2: `app/donate/page.tsx` — update imports**

Change:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
```

to:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
```

- [ ] **Step 3: `app/donate/page.tsx` — Choose an amount heading + amount grid + processor placeholder polish**

Change:

```tsx
      <Section>
        <div className="max-w-xl mx-auto">
          <SectionLabel>Choose an amount</SectionLabel>
          <h2 className="font-heading text-2xl font-bold text-black mb-8">
            How much would you like to give?
          </h2>

          {/* Frequency toggle */}
          <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-full w-fit">
            <button className="px-5 py-2 rounded-full bg-black text-white text-sm font-bold">
              One-off
            </button>
            <button className="px-5 py-2 rounded-full text-gray-600 text-sm font-semibold hover:text-black transition-colors">
              Monthly
            </button>
          </div>

          {/* Amount grid */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {amounts.map((a) => (
              <button
                key={a}
                className={`py-4 rounded-2xl font-heading font-bold text-lg transition-all border-2 ${
                  a === "£25"
                    ? "bg-yellow border-yellow text-black"
                    : "bg-white border-gray-200 text-black hover:border-yellow"
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          {/* Processor placeholder */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-sm italic">
              [Payment processor to be integrated. Stripe / PayPal Giving Fund / JustGiving — pending Stephen&apos;s confirmation]
            </p>
          </div>
        </div>
      </Section>

      <Section bg="gray">
        <div className="text-center mb-10">
          <SectionLabel>Your Impact</SectionLabel>
          <h2 className="font-heading text-2xl font-bold text-black">What your donation does.</h2>
        </div>
```

to:

```tsx
      <Section>
        <div className="max-w-xl mx-auto">
          <SectionHeading eyebrow="Choose an amount" title="How much would you like to give?" centered={false} />

          {/* Frequency toggle */}
          <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-full w-fit shadow-inner">
            <button className="px-5 py-2 rounded-full bg-black text-white text-sm font-bold">
              One-off
            </button>
            <button className="px-5 py-2 rounded-full text-gray-600 text-sm font-semibold hover:text-black transition-colors">
              Monthly
            </button>
          </div>

          {/* Amount grid */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {amounts.map((a) => (
              <button
                key={a}
                className={`py-4 rounded-2xl font-heading font-bold text-lg transition-all border-2 ${
                  a === "£25"
                    ? "bg-yellow border-yellow text-black shadow-[0_12px_24px_rgba(253,215,14,0.3)]"
                    : "bg-white border-gray-200 text-black hover:border-yellow"
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          {/* Processor placeholder */}
          <div className="bg-gray-50 rounded-3xl p-8 text-center border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-sm italic">
              [Payment processor to be integrated. Stripe / PayPal Giving Fund / JustGiving — pending Stephen&apos;s confirmation]
            </p>
          </div>
        </div>
      </Section>

      <Section bg="gray">
        <SectionHeading eyebrow="Your Impact" title="What your donation does." />
```

- [ ] **Step 4: `app/contact/page.tsx` — update imports**

Change:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
```

to:

```tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
import PhotoFrame from "@/components/PhotoFrame";
```

(`SectionLabel` stays imported here — both "Our Details" and "Send a Message" are short inline headings beside `dl`/form content, not full section headers, so they keep the existing manual `SectionLabel` + `h2` layout. Only the map placeholder and the form-stub card get the new treatment.)

- [ ] **Step 5: `app/contact/page.tsx` — map placeholder**

Change:

```tsx
            <div className="mt-8 bg-gray-100 rounded-2xl aspect-video flex items-center justify-center text-gray-400 text-sm italic">
              [Map or location image. Stephen to supply]
            </div>
```

to:

```tsx
            <div className="mt-8">
              <PhotoFrame alt="SMILE office location" placeholder="[Map or location image. Stephen to supply]" aspect="video" accentColor="yellow" />
            </div>
```

- [ ] **Step 6: `app/contact/page.tsx` — form-coming-soon card polish**

Change:

```tsx
            <div className="bg-gray-50 rounded-2xl p-8 border-2 border-dashed border-gray-200 text-center">
              <p className="text-gray-500 text-sm italic mb-4">
                The contact form is being set up. In the meantime, please reach us by phone or email above.
              </p>
              <p className="text-gray-400 text-xs">
                [Form backend to be configured — pending Stephen&apos;s sign-off]
              </p>
            </div>
```

to:

```tsx
            <div className="bg-gray-50 rounded-3xl p-8 border-2 border-dashed border-gray-200 text-center">
              <p className="text-gray-500 text-sm italic mb-4">
                The contact form is being set up. In the meantime, please reach us by phone or email above.
              </p>
              <p className="text-gray-400 text-xs">
                [Form backend to be configured — pending Stephen&apos;s sign-off]
              </p>
            </div>
```

- [ ] **Step 7: Verify build**

```bash
npm run build
```

Expected: compiles clean, all 21 routes generated, zero TypeScript errors.

- [ ] **Step 8: Commit**

```bash
git add app/shop/page.tsx app/donate/page.tsx app/contact/page.tsx
git commit -m "feat: apply organic visual system to Shop, Donate, and Contact pages"
```

---

## Final Review

After Task 17, dispatch a final whole-branch code review (per `superpowers:subagent-driven-development`) covering the full diff from this plan's first commit to its last. Re-score against the same 5-dimension rubric used in `docs/superpowers/specs/2026-06-30-site-quality-overhaul-design.md` (Visual polish, Mobile, CTAs, Page completeness, SEO + technical — 20 points each, target 90+), with particular attention to:

- Every `WaveDivider` insertion has matching `fromColor`/`toColor` with the actual adjacent section backgrounds (a mismatched pair would create a visible color seam)
- Every `SectionHeading` usage that replaced a `dark`-context heading (white text on navy) passed `dark` correctly
- No page lost a heading, CTA, or piece of content during the find/replace edits — content must be byte-identical to before this plan, only the wrapping markup changes
- Mobile nav accordion groups and desktop dropdown groups expose the identical set of links
