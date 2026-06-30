# SMILE Website Quality Overhaul — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Raise the site to 9/10 design and structure quality (90/100) before real content arrives, using a component-first approach.

**Architecture:** Build a shared component library first (Tasks 1-10), then apply to the homepage (Task 11), all 15 inner pages (Tasks 12-18), and add the SEO/technical layer (Task 19). Every page uses PageHero, CTABanner, and structured sections. Real content (photos, stats, quotes) slots in without structural changes.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind v4 (CSS-only config in `app/globals.css`), `next/font/google` (Jost + Inter), `next/image`.

## Global Constraints

- Tailwind v4 — no `tailwind.config.js`. All tokens in `app/globals.css` `@theme` block. Use `bg-yellow`, `text-black`, `bg-teal` etc.
- `--color-black` is navy `#2E3245`, not pure black. This is correct — do not change it.
- No external animation libraries. Use CSS + Intersection Observer only.
- No `src/` directory. All app code at root level.
- All components in `components/`. All hooks in `hooks/`.
- `"use client"` directive required on any component using `useState`, `useEffect`, or browser APIs.
- Run `npm run build` after each task to verify TypeScript compilation.
- Placeholder text uses `[Square brackets]` convention throughout.

---

### Task 1: Brand tokens — restore teal

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Produces: CSS variables `--color-teal`, `--color-teal-light`, `--color-teal-dark` available as Tailwind classes `bg-teal`, `text-teal`, `bg-teal-light`, `bg-teal-dark`, `text-teal-dark`, `border-teal`

- [ ] **Step 1: Update globals.css**

Replace the entire `@theme` block in `app/globals.css` with:

```css
@import "tailwindcss";

@theme inline {
  /* Brand colours */
  --color-yellow:       #FDD70E;
  --color-yellow-light: #FFE45C;
  --color-yellow-dark:  #E0B900;
  --color-black:        #2E3245;
  --color-white:        #FFFFFF;
  --color-blue:         #164194;
  --color-blue-light:   #2E5BB8;
  --color-blue-dark:    #0F2E6E;
  --color-teal:         #14B8A6;
  --color-teal-light:   #5EEAD4;
  --color-teal-dark:    #0F766E;
  --color-gray-50:      #FFF8EE;
  --color-gray-100:     #F3F4F6;
  --color-gray-600:     #AAB0BC;
  --color-gray-800:     #1F2937;

  /* Typography */
  --font-sans:    var(--font-inter);
  --font-heading: var(--font-jost);
}

/* Base styles */
body {
  background-color: var(--color-white);
  color: var(--color-black);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading), sans-serif;
  font-weight: 700;
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: Compiled successfully, 0 errors.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: restore teal brand tokens to globals.css"
```

---

### Task 2: SectionLabel component

**Files:**
- Create: `components/SectionLabel.tsx`

**Interfaces:**
- Produces: `SectionLabel({ children: React.ReactNode })` — renders a small yellow uppercase label. Used above h2 headings throughout the site.

- [ ] **Step 1: Create the component**

```tsx
// components/SectionLabel.tsx
interface SectionLabelProps {
  children: React.ReactNode;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-yellow font-heading font-semibold text-sm uppercase tracking-widest mb-3">
      {children}
    </p>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Compiled successfully.

- [ ] **Step 3: Commit**

```bash
git add components/SectionLabel.tsx
git commit -m "feat: add SectionLabel component"
```

---

### Task 3: useInView hook + AnimatedCounter component

**Files:**
- Create: `hooks/useInView.ts`
- Create: `components/AnimatedCounter.tsx`

**Interfaces:**
- Produces: `useInView(options?: IntersectionObserverInit): { ref: React.RefObject<HTMLDivElement>, inView: boolean }`
- Produces: `AnimatedCounter({ value: string, label: string })` — counts up from 0 when scrolled into view. If `value` is `"?"` or non-numeric, renders statically.

- [ ] **Step 1: Create the hook**

```ts
// hooks/useInView.ts
import { useEffect, useRef, useState } from "react";

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
```

- [ ] **Step 2: Create AnimatedCounter**

```tsx
// components/AnimatedCounter.tsx
"use client";
import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

interface AnimatedCounterProps {
  value: string;
  label: string;
}

export default function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const { ref, inView } = useInView();
  const [display, setDisplay] = useState("0");

  const digits = value.replace(/[^0-9]/g, "");
  const numericValue = parseInt(digits, 10);
  const isNumeric = digits.length > 0 && !isNaN(numericValue);
  const prefix = isNumeric ? value.slice(0, value.indexOf(digits[0])) : "";
  const suffix = isNumeric ? value.slice(value.indexOf(digits[digits.length - 1]) + 1) : "";

  useEffect(() => {
    if (!inView || !isNumeric) {
      setDisplay(value);
      return;
    }
    const duration = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numericValue);
      setDisplay(`${prefix}${current.toLocaleString()}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-heading text-5xl md:text-6xl font-extrabold text-black mb-2">
        {display}
      </p>
      <p className="text-black/70 font-medium text-sm">{label}</p>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Compiled successfully.

- [ ] **Step 4: Commit**

```bash
git add hooks/useInView.ts components/AnimatedCounter.tsx
git commit -m "feat: add useInView hook and AnimatedCounter component"
```

---

### Task 4: ProgressBar component

**Files:**
- Create: `components/ProgressBar.tsx`

**Interfaces:**
- Produces: `ProgressBar({ raised: number | null, target: number | null, label?: string })` — yellow filled bar on dark track. Shows "Target to be confirmed" when either value is null.

- [ ] **Step 1: Create the component**

```tsx
// components/ProgressBar.tsx
interface ProgressBarProps {
  raised: number | null;
  target: number | null;
  label?: string;
}

export default function ProgressBar({ raised, target, label }: ProgressBarProps) {
  const hasData = raised !== null && target !== null;
  const percent = hasData ? Math.min((raised! / target!) * 100, 100) : 0;

  return (
    <div className="w-full">
      {label && (
        <p className="text-sm font-semibold text-white mb-2">{label}</p>
      )}
      <div className="w-full bg-gray-800 rounded-full h-3">
        <div
          className="bg-yellow h-3 rounded-full transition-all duration-1000"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-sm text-gray-400 mt-2">
        {hasData
          ? `£${raised!.toLocaleString()} raised of £${target!.toLocaleString()} target`
          : "Target to be confirmed — every donation counts"}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/ProgressBar.tsx
git commit -m "feat: add ProgressBar component"
```

---

### Task 5: TestimonialCard component

**Files:**
- Create: `components/TestimonialCard.tsx`

**Interfaces:**
- Produces: `TestimonialCard({ quote: string, name: string, location?: string, avatarSrc?: string })` — white card with large yellow quote mark, italic quote, avatar (image or initials), name and location.

- [ ] **Step 1: Create the component**

```tsx
// components/TestimonialCard.tsx
import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  name: string;
  location?: string;
  avatarSrc?: string;
}

export default function TestimonialCard({
  quote,
  name,
  location,
  avatarSrc,
}: TestimonialCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col">
      <span className="text-yellow font-heading text-5xl font-extrabold leading-none mb-4 select-none">
        &ldquo;
      </span>
      <p className="text-gray-600 italic text-base leading-relaxed flex-1 mb-6">
        {quote}
      </p>
      <div className="flex items-center gap-3">
        {avatarSrc ? (
          <Image
            src={avatarSrc}
            alt={name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-yellow flex items-center justify-center text-black font-bold font-heading text-sm flex-shrink-0">
            {initials}
          </div>
        )}
        <div>
          <p className="font-heading font-bold text-black text-sm">{name}</p>
          {location && (
            <p className="text-gray-500 text-xs">{location}</p>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/TestimonialCard.tsx
git commit -m "feat: add TestimonialCard component"
```

---

### Task 6: EventCard component

**Files:**
- Create: `components/EventCard.tsx`

**Interfaces:**
- Produces: `EventCard({ day: string, month: string, title: string, location: string, description?: string, href: string })` — link card with yellow date badge, title, location, optional description. Hover lifts with shadow.

- [ ] **Step 1: Create the component**

```tsx
// components/EventCard.tsx
import Link from "next/link";

interface EventCardProps {
  day: string;
  month: string;
  title: string;
  location: string;
  description?: string;
  href: string;
}

export default function EventCard({
  day,
  month,
  title,
  location,
  description,
  href,
}: EventCardProps) {
  return (
    <Link
      href={href}
      className="flex gap-4 p-5 border border-gray-100 rounded-2xl hover:shadow-md transition-all hover:-translate-y-0.5 group"
    >
      <div className="flex-shrink-0 w-14 h-14 bg-yellow rounded-xl flex flex-col items-center justify-center">
        <span className="font-heading font-extrabold text-black text-lg leading-none">
          {day}
        </span>
        <span className="font-heading font-semibold text-black text-xs uppercase leading-none mt-0.5">
          {month}
        </span>
      </div>
      <div className="min-w-0">
        <h3 className="font-heading font-bold text-black text-base group-hover:text-yellow-dark transition-colors mb-1 line-clamp-1">
          {title}
        </h3>
        <p className="text-gray-500 text-sm mb-1">{location}</p>
        {description && (
          <p className="text-gray-400 text-sm line-clamp-2">{description}</p>
        )}
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/EventCard.tsx
git commit -m "feat: add EventCard component"
```

---

### Task 7: CTABanner component

**Files:**
- Create: `components/CTABanner.tsx`

**Interfaces:**
- Produces: `CTABanner({ heading: string, subtext?: string, primaryLabel: string, primaryHref: string, secondaryLabel?: string, secondaryHref?: string, bg?: "yellow" | "navy" | "teal" })` — full-width CTA strip used between sections on inner pages.

- [ ] **Step 1: Create the component**

```tsx
// components/CTABanner.tsx
import Link from "next/link";

interface CTABannerProps {
  heading: string;
  subtext?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  bg?: "yellow" | "navy" | "teal";
}

export default function CTABanner({
  heading,
  subtext,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  bg = "yellow",
}: CTABannerProps) {
  const bgClasses = {
    yellow: "bg-yellow",
    navy: "bg-black",
    teal: "bg-teal",
  };
  const isDark = bg !== "yellow";
  const textColor = isDark ? "text-white" : "text-black";
  const subtextColor = isDark ? "text-white/70" : "text-black/70";
  const primaryBtn = isDark
    ? "bg-yellow text-black hover:bg-yellow-dark"
    : "bg-black text-white hover:bg-gray-800";
  const secondaryBtn = isDark
    ? "border-2 border-white text-white hover:bg-white hover:text-black"
    : "border-2 border-black text-black hover:bg-black hover:text-white";

  return (
    <section className={`py-12 ${bgClasses[bg]}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={`font-heading text-2xl md:text-3xl font-bold ${textColor} mb-3`}>
          {heading}
        </h2>
        {subtext && (
          <p className={`${subtextColor} mb-8 max-w-xl mx-auto`}>{subtext}</p>
        )}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href={primaryHref}
            className={`inline-block px-6 py-3 rounded-full font-bold transition-all ${primaryBtn}`}
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className={`inline-block px-6 py-3 rounded-full font-bold transition-all ${secondaryBtn}`}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/CTABanner.tsx
git commit -m "feat: add CTABanner component"
```

---

### Task 8: PageHero component

**Files:**
- Create: `components/PageHero.tsx`

**Interfaces:**
- Consumes: `SectionLabel` from `components/SectionLabel.tsx`
- Produces: `PageHero({ eyebrow?: string, title: string, subtitle?: string, ctaLabel?: string, ctaHref?: string, bg?: "yellow" | "navy" | "teal" | "white" })` — replaces the manual `<Section bg="yellow"><h1>` pattern on all inner pages.

- [ ] **Step 1: Create the component**

```tsx
// components/PageHero.tsx
import Link from "next/link";
import SectionLabel from "./SectionLabel";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  bg?: "yellow" | "navy" | "teal" | "white";
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  bg = "yellow",
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

  return (
    <section className={`py-16 md:py-24 ${bgClasses[bg]}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
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
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/PageHero.tsx
git commit -m "feat: add PageHero component"
```

---

### Task 9: DonateButton teal variant

**Files:**
- Modify: `components/DonateButton.tsx`

**Interfaces:**
- Produces: `DonateButton` now accepts `variant?: "primary" | "outline" | "teal"`. The `teal` variant renders `bg-teal text-white hover:bg-teal-dark`.

- [ ] **Step 1: Update DonateButton.tsx**

```tsx
// components/DonateButton.tsx
import Link from "next/link";

interface DonateButtonProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline" | "teal";
  label?: string;
}

export default function DonateButton({
  size = "md",
  variant = "primary",
  label = "Donate Now",
}: DonateButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: "bg-yellow text-black hover:bg-yellow-dark font-bold",
    outline: "border-2 border-yellow text-yellow hover:bg-yellow hover:text-black font-bold",
    teal: "bg-teal text-white hover:bg-teal-dark font-bold",
  };

  return (
    <Link
      href="/donate"
      className={`inline-block rounded-full transition-all ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      {label}
    </Link>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/DonateButton.tsx
git commit -m "feat: add teal variant to DonateButton"
```

---

### Task 10: MobileNav + Header update

**Files:**
- Create: `components/MobileNav.tsx`
- Modify: `components/Header.tsx`

**Interfaces:**
- Consumes: `DonateButton` from `components/DonateButton.tsx`
- Produces: `MobileNav({ isOpen: boolean, onClose: () => void })` — slide-out drawer with all nav links and donate button. Header becomes a client component with hamburger toggle.

- [ ] **Step 1: Create MobileNav.tsx**

```tsx
// components/MobileNav.tsx
"use client";
import { useEffect } from "react";
import Link from "next/link";
import DonateButton from "./DonateButton";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Our Story", href: "/our-story" },
  { label: "Impact", href: "/impact" },
  { label: "SMILE House", href: "/smile-house" },
  { label: "Families", href: "/families" },
  { label: "Events", href: "/events" },
  { label: "Fundraising", href: "/fundraising" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Contact", href: "/contact" },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed top-0 right-0 h-full w-72 bg-white z-50 lg:hidden flex flex-col shadow-2xl">
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
            {navLinks.map((link) => (
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

- [ ] **Step 2: Update Header.tsx**

```tsx
// components/Header.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DonateButton from "./DonateButton";
import MobileNav from "./MobileNav";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Our Story", href: "/our-story" },
  { label: "Impact", href: "/impact" },
  { label: "SMILE House", href: "/smile-house" },
  { label: "Events", href: "/events" },
  { label: "Fundraising", href: "/fundraising" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
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
              {navLinks.map((link) => (
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

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Compiled successfully.

- [ ] **Step 4: Commit**

```bash
git add components/MobileNav.tsx components/Header.tsx
git commit -m "feat: add mobile hamburger nav"
```

---

### Task 11: Homepage overhaul

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `SectionLabel`, `AnimatedCounter`, `ProgressBar`, `TestimonialCard`, `EventCard`, `DonateButton`, `Section` from their respective files.

- [ ] **Step 1: Replace app/page.tsx**

```tsx
// app/page.tsx
import Link from "next/link";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import DonateButton from "@/components/DonateButton";
import AnimatedCounter from "@/components/AnimatedCounter";
import ProgressBar from "@/components/ProgressBar";
import TestimonialCard from "@/components/TestimonialCard";
import EventCard from "@/components/EventCard";

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

const ctaLinks = [
  { label: "Donate Now", href: "/donate", primary: true },
  { label: "Monthly Giving", href: "/donate", primary: false },
  { label: "Fundraise", href: "/fundraising", primary: false },
  { label: "Volunteer", href: "/volunteer", primary: false },
  { label: "Corporate", href: "/corporate", primary: false },
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

      {/* CTA strip */}
      <section className="bg-yellow py-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 items-center min-w-max md:min-w-0 md:flex-wrap md:justify-center">
            {ctaLinks.map((cta) => (
              <Link
                key={cta.label}
                href={cta.href}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  cta.primary
                    ? "bg-black text-white hover:bg-gray-800"
                    : "text-black hover:underline"
                }`}
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Who we are */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel>Who We Are</SectionLabel>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-black mb-6">
              Supporting families who need it most.
            </h2>
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
          <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center text-gray-400 text-sm italic">
            [Photo. Stephen to supply]
          </div>
        </div>
      </Section>

      {/* Our Story */}
      <Section bg="black">
        <div className="max-w-3xl mx-auto text-center">
          <SectionLabel>Our Story</SectionLabel>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
            Born from love. Built for families.
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            [Justin and Charlotte&apos;s story. Stephen to supply the founding story and photos.]
          </p>
          <Link
            href="/our-story"
            className="inline-block px-6 py-3 rounded-full border-2 border-teal text-teal font-bold hover:bg-teal hover:text-white transition-all"
          >
            Read Our Story
          </Link>
        </div>
      </Section>

      {/* Impact stats */}
      <Section bg="yellow">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-black">
            The difference your support makes.
          </h2>
        </div>
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
          <div className="bg-gray-800 rounded-2xl aspect-video flex items-center justify-center text-gray-500 text-sm italic">
            [SMILE House image. Stephen to supply]
          </div>
        </div>
      </Section>

      {/* Family stories */}
      <Section bg="gray">
        <div className="text-center mb-12">
          <SectionLabel>Family Stories</SectionLabel>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-black">
            Stories from the families we support.
          </h2>
        </div>
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

      {/* Upcoming events */}
      <Section>
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-heading text-3xl font-bold text-black">Upcoming Events</h2>
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

      {/* Corporate supporters */}
      <Section bg="gray">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl font-bold text-black mb-2">Supported by</h2>
          <p className="text-gray-500 text-sm">[Corporate supporter logos. Stephen to supply]</p>
        </div>
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
              className="flex-1 px-4 py-3 rounded-full border-2 border-black text-black placeholder:text-black/40 bg-white focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-colors"
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

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: homepage overhaul with new components and animations"
```

---

### Task 12: About + Our Story pages

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/our-story/page.tsx`

**Interfaces:**
- Consumes: `PageHero`, `CTABanner`, `Section`, `SectionLabel`, `DonateButton`

- [ ] **Step 1: Replace app/about/page.tsx**

```tsx
// app/about/page.tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about SMILE Children's Charity, our mission, values, and the team behind us.",
  openGraph: {
    title: "About Us | SMILE Children's Charity",
    description: "Learn about SMILE Children's Charity, our mission, values, and the team behind us.",
    type: "website",
  },
};

const values = [
  {
    title: "Family first",
    description: "Every decision we make starts with what is best for the families we serve.",
  },
  {
    title: "Community",
    description: "We build connections so no family ever feels isolated in what they are going through.",
  },
  {
    title: "Compassion",
    description: "We listen, we care, and we show up — because that is what families need most.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SMILE"
        title="Supporting families who need it most."
        subtitle="We support families of children with disabilities and serious illness across Lanarkshire, giving them a break, a community, and a reason to smile."
        bg="yellow"
      />

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
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v) => (
            <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-yellow mb-4" />
              <h3 className="font-heading font-bold text-black text-lg mb-2">{v.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Want to get involved?"
        subtext="There are many ways to support SMILE, from donating to volunteering to fundraising."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        secondaryLabel="Volunteer"
        secondaryHref="/volunteer"
        bg="yellow"
      />

      <Section>
        <div className="text-center mb-12">
          <SectionLabel>Our Team</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            The people behind SMILE.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <div className="w-full aspect-square bg-gray-100 rounded-2xl mb-3 flex items-center justify-center text-gray-400 text-sm italic">
                [Photo]
              </div>
              <p className="font-heading font-bold text-black text-sm">[Trustee name]</p>
              <p className="text-gray-500 text-xs">[Role]</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Registered charity SC053107"
        subtext="SMILE Children's Charity SCIO, 101 Union Street, Larkhall, ML9 1EB"
        primaryLabel="Contact Us"
        primaryHref="/contact"
        bg="navy"
      />
    </>
  );
}
```

- [ ] **Step 2: Replace app/our-story/page.tsx**

```tsx
// app/our-story/page.tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Our Story",
  description: "How SMILE was founded — the story of Justin and Charlotte and why they started SMILE Children's Charity.",
  openGraph: {
    title: "Our Story | SMILE Children's Charity",
    description: "How SMILE was founded — the story of Justin and Charlotte.",
    type: "website",
  },
};

const milestones = [
  { year: "[Year]", event: "[Founding milestone. Stephen to supply]" },
  { year: "[Year]", event: "[Growth milestone. Stephen to supply]" },
  { year: "[Year]", event: "[Impact milestone. Stephen to supply]" },
  { year: "[Year]", event: "[SMILE House announcement. Stephen to supply]" },
];

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Born from love. Built for families."
        subtitle="[One-sentence story teaser. Stephen to supply]"
        bg="navy"
      />

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
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-yellow" />
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div key={i} className="pl-12 relative">
                <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-yellow border-2 border-white" />
                <p className="text-yellow font-heading font-bold text-sm mb-1">{m.year}</p>
                <p className="text-gray-700 text-base">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CTABanner
        heading="Be part of the next chapter."
        subtext="Your support helps us reach more families and build SMILE House."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        secondaryLabel="Meet Our Families"
        secondaryHref="/families"
        bg="yellow"
      />

      <Section>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center text-gray-400 text-xs italic">
              [Photo {i}. Stephen to supply]
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add app/about/page.tsx app/our-story/page.tsx
git commit -m "feat: rebuild About and Our Story pages with full structure"
```

---

### Task 13: Families + Impact pages

**Files:**
- Modify: `app/families/page.tsx`
- Modify: `app/impact/page.tsx`

- [ ] **Step 1: Replace app/families/page.tsx**

```tsx
// app/families/page.tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
import TestimonialCard from "@/components/TestimonialCard";

export const metadata: Metadata = {
  title: "Meet Our Families",
  description: "Read stories from the families SMILE Children's Charity supports across Lanarkshire.",
  openGraph: {
    title: "Meet Our Families | SMILE Children's Charity",
    description: "Read stories from the families SMILE supports across Lanarkshire.",
    type: "website",
  },
};

const families = [
  { quote: "[Family story. Stephen to supply with consent]", name: "[Family name]", location: "Lanarkshire" },
  { quote: "[Family story. Stephen to supply with consent]", name: "[Family name]", location: "Lanarkshire" },
  { quote: "[Family story. Stephen to supply with consent]", name: "[Family name]", location: "Lanarkshire" },
  { quote: "[Family story. Stephen to supply with consent]", name: "[Family name]", location: "Lanarkshire" },
  { quote: "[Family story. Stephen to supply with consent]", name: "[Family name]", location: "Lanarkshire" },
  { quote: "[Family story. Stephen to supply with consent]", name: "[Family name]", location: "Lanarkshire" },
];

const whatWeOffer = [
  { title: "Respite breaks", description: "[Description of respite provision. Stephen to supply]" },
  { title: "Family activities", description: "[Description of activities. Stephen to supply]" },
  { title: "Community support", description: "[Description of community programmes. Stephen to supply]" },
  { title: "Practical grants", description: "[Description of grants. Stephen to supply]" },
];

export default function FamiliesPage() {
  return (
    <>
      <PageHero
        eyebrow="Meet Our Families"
        title="Real families. Real stories."
        subtitle="The families we support carry an enormous weight. These are their stories."
        bg="teal"
      />

      <Section>
        <div className="text-center mb-12">
          <SectionLabel>What We Offer</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            How SMILE supports your family.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whatWeOffer.map((item) => (
            <div key={item.title} className="border border-gray-100 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-teal mb-4" />
              <h3 className="font-heading font-bold text-black mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Know a family who needs support?"
        subtext="Reach out to us and we will help connect them with what SMILE can offer."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Donate"
        secondaryHref="/donate"
        bg="teal"
      />

      <Section bg="gray">
        <div className="text-center mb-12">
          <SectionLabel>Family Stories</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Hear from the families we support.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {families.map((f, i) => (
            <TestimonialCard key={i} quote={f.quote} name={f.name} location={f.location} />
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Help us support more families."
        subtext="Every donation means another family gets the break they need."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        secondaryLabel="Fundraise"
        secondaryHref="/fundraising"
        bg="yellow"
      />
    </>
  );
}
```

- [ ] **Step 2: Replace app/impact/page.tsx**

```tsx
// app/impact/page.tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
import AnimatedCounter from "@/components/AnimatedCounter";

export const metadata: Metadata = {
  title: "Our Impact",
  description: "See the difference SMILE Children's Charity makes for families across Lanarkshire.",
  openGraph: {
    title: "Our Impact | SMILE Children's Charity",
    description: "See the difference SMILE makes for families across Lanarkshire.",
    type: "website",
  },
};

const stats = [
  { value: "250+", label: "Families supported" },
  { value: "40+", label: "Events this year" },
  { value: "120+", label: "Volunteers" },
  { value: "10+", label: "Years making a difference" },
  { value: "?", label: "Raised for SMILE House" },
  { value: "?", label: "Children supported" },
  { value: "?", label: "Nights of respite provided" },
  { value: "?", label: "Corporate partners" },
];

const services = [
  { name: "Respite breaks", description: "[Impact of respite programme. Stephen to supply]" },
  { name: "Family activities", description: "[Impact of activities programme. Stephen to supply]" },
  { name: "Financial grants", description: "[Impact of grant programme. Stephen to supply]" },
  { name: "Community events", description: "[Impact of community events. Stephen to supply]" },
];

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Impact"
        title="The difference your support makes."
        subtitle="Every donation, every fundraiser, every volunteer hour — it all adds up to something real."
        bg="yellow"
      />

      <Section bg="yellow">
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
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s) => (
            <div key={s.name} className="border border-gray-100 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-yellow mb-4" />
              <h3 className="font-heading font-bold text-black text-xl mb-3">{s.name}</h3>
              <p className="text-gray-600 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="gray">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.slice(4).map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Add to our impact."
        subtext="Your donation directly funds the support SMILE provides to families in Lanarkshire."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        secondaryLabel="Fundraise for SMILE"
        secondaryHref="/fundraising"
        bg="yellow"
      />
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add app/families/page.tsx app/impact/page.tsx
git commit -m "feat: rebuild Families and Impact pages with full structure"
```

---

### Task 14: SMILE House + Family Support pages

**Files:**
- Modify: `app/smile-house/page.tsx`
- Modify: `app/family-support/page.tsx`

- [ ] **Step 1: Replace app/smile-house/page.tsx**

```tsx
// app/smile-house/page.tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
import ProgressBar from "@/components/ProgressBar";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "SMILE House Project",
  description: "Help us build SMILE House — a dedicated space for families supported by SMILE Children's Charity.",
  openGraph: {
    title: "SMILE House Project | SMILE Children's Charity",
    description: "Help us build SMILE House — a dedicated space for families.",
    type: "website",
  },
};

const timeline = [
  { phase: "Phase 1", title: "[Phase title. Stephen to supply]", status: "current" },
  { phase: "Phase 2", title: "[Phase title. Stephen to supply]", status: "upcoming" },
  { phase: "Phase 3", title: "[Phase title. Stephen to supply]", status: "upcoming" },
];

export default function SmileHousePage() {
  return (
    <>
      <PageHero
        eyebrow="SMILE House"
        title="A place for families to breathe."
        subtitle="SMILE House will give families the space to rest, recharge, and connect with others who truly understand."
        bg="navy"
        ctaLabel="Support SMILE House"
        ctaHref="/donate"
      />

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
          <h2 className="font-heading text-3xl font-bold text-white mb-8">
            Together we are building this.
          </h2>
          <ProgressBar raised={null} target={null} label="SMILE House Appeal" />
          <div className="mt-8">
            <DonateButton size="lg" label="Donate to SMILE House" />
          </div>
        </div>
      </Section>

      <CTABanner
        heading="Spread the word."
        subtext="Share the SMILE House appeal with your network and help us reach our target."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        secondaryLabel="Fundraise for SMILE House"
        secondaryHref="/fundraising"
        bg="yellow"
      />

      <Section>
        <div className="text-center mb-12">
          <SectionLabel>Build Timeline</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Our plan to make it happen.
          </h2>
        </div>
        <div className="max-w-2xl mx-auto space-y-6">
          {timeline.map((t) => (
            <div
              key={t.phase}
              className={`flex gap-6 p-6 rounded-2xl border ${
                t.status === "current"
                  ? "border-yellow bg-yellow/10"
                  : "border-gray-100"
              }`}
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-heading font-bold text-xs ${
                t.status === "current" ? "bg-yellow text-black" : "bg-gray-100 text-gray-500"
              }`}>
                {t.phase}
              </div>
              <div>
                <p className="font-heading font-bold text-black">{t.title}</p>
                {t.status === "current" && (
                  <p className="text-teal text-sm font-semibold mt-1">In progress</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Every donation brings SMILE House closer."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        bg="navy"
      />
    </>
  );
}
```

- [ ] **Step 2: Replace app/family-support/page.tsx**

```tsx
// app/family-support/page.tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Family Support",
  description: "Find out how SMILE Children's Charity can support your family.",
  openGraph: {
    title: "Family Support | SMILE Children's Charity",
    description: "Find out how SMILE can support your family.",
    type: "website",
  },
};

const services = [
  {
    title: "Respite breaks",
    description: "[Full description of respite provision. Stephen to supply]",
    eligibility: "[Eligibility criteria. Stephen to supply]",
  },
  {
    title: "Family activities",
    description: "[Full description of family activities. Stephen to supply]",
    eligibility: "[Eligibility criteria. Stephen to supply]",
  },
  {
    title: "Financial grants",
    description: "[Full description of grant provision. Stephen to supply]",
    eligibility: "[Eligibility criteria. Stephen to supply]",
  },
  {
    title: "Community support",
    description: "[Full description of community support. Stephen to supply]",
    eligibility: "[Eligibility criteria. Stephen to supply]",
  },
];

const steps = [
  { step: "1", title: "Get in touch", description: "Contact us by phone, email, or through the form on our Contact page." },
  { step: "2", title: "Tell us about your family", description: "We will have a conversation to understand your situation and what support would help most." },
  { step: "3", title: "We get to work", description: "Our team puts together a plan tailored to your family's needs." },
];

export default function FamilySupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Family Support"
        title="We are here for your family."
        subtitle="Find out what SMILE can offer and how to access support for your family."
        bg="teal"
      />

      <Section>
        <div className="text-center mb-12">
          <SectionLabel>Our Services</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            What SMILE can provide.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s) => (
            <div key={s.title} className="border border-gray-100 rounded-2xl p-8">
              <div className="w-10 h-10 rounded-xl bg-teal mb-4" />
              <h3 className="font-heading font-bold text-black text-xl mb-3">{s.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">{s.description}</p>
              <p className="text-sm text-gray-500 border-t border-gray-100 pt-4">
                <span className="font-semibold text-black">Who can access this:</span> {s.eligibility}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Not sure if you qualify?"
        subtext="Get in touch and we will talk through what we can do for your family. There is no obligation."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        bg="teal"
      />

      <Section bg="gray">
        <div className="text-center mb-12">
          <SectionLabel>How to Access Support</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Three simple steps.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-yellow flex items-center justify-center font-heading font-extrabold text-black text-lg mx-auto mb-4">
                {s.step}
              </div>
              <h3 className="font-heading font-bold text-black mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Help us support more families."
        subtext="Your donation funds the services families rely on."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        secondaryLabel="Volunteer"
        secondaryHref="/volunteer"
        bg="yellow"
      />
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add app/smile-house/page.tsx app/family-support/page.tsx
git commit -m "feat: rebuild SMILE House and Family Support pages"
```

---

### Task 15: Events + News pages

**Files:**
- Modify: `app/events/page.tsx`
- Modify: `app/news/page.tsx`

- [ ] **Step 1: Replace app/events/page.tsx**

```tsx
// app/events/page.tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
import EventCard from "@/components/EventCard";

export const metadata: Metadata = {
  title: "Events",
  description: "Find upcoming SMILE Children's Charity events in Lanarkshire.",
  openGraph: {
    title: "Events | SMILE Children's Charity",
    description: "Find upcoming SMILE events in Lanarkshire.",
    type: "website",
  },
};

const upcomingEvents = [
  { day: "TBC", month: "2026", title: "[Event name. Stephen to supply]", location: "[Location. Stephen to supply]", description: "[Short event description. Stephen to supply]", href: "/events" },
  { day: "TBC", month: "2026", title: "[Event name. Stephen to supply]", location: "[Location. Stephen to supply]", description: "[Short event description. Stephen to supply]", href: "/events" },
  { day: "TBC", month: "2026", title: "[Event name. Stephen to supply]", location: "[Location. Stephen to supply]", description: "[Short event description. Stephen to supply]", href: "/events" },
  { day: "TBC", month: "2026", title: "[Event name. Stephen to supply]", location: "[Location. Stephen to supply]", description: "[Short event description. Stephen to supply]", href: "/events" },
  { day: "TBC", month: "2026", title: "[Event name. Stephen to supply]", location: "[Location. Stephen to supply]", description: "[Short event description. Stephen to supply]", href: "/events" },
  { day: "TBC", month: "2026", title: "[Event name. Stephen to supply]", location: "[Location. Stephen to supply]", description: "[Short event description. Stephen to supply]", href: "/events" },
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Get involved. Have fun. Make a difference."
        subtitle="From charity runs to bake sales, every SMILE event raises money and brings people together."
        bg="yellow"
      />

      <Section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <SectionLabel>Upcoming</SectionLabel>
            <h2 className="font-heading text-3xl font-bold text-black">Events coming up.</h2>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {upcomingEvents.map((e, i) => (
            <EventCard
              key={i}
              day={e.day}
              month={e.month}
              title={e.title}
              location={e.location}
              description={e.description}
              href={e.href}
            />
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Want to run your own event for SMILE?"
        subtext="We can support you with fundraising materials, promotion, and advice."
        primaryLabel="Start Fundraising"
        primaryHref="/fundraising"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
        bg="yellow"
      />

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

      <CTABanner
        heading="Support SMILE between events."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        bg="navy"
      />
    </>
  );
}
```

- [ ] **Step 2: Replace app/news/page.tsx**

```tsx
// app/news/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "News",
  description: "The latest news and updates from SMILE Children's Charity.",
  openGraph: {
    title: "News | SMILE Children's Charity",
    description: "The latest news from SMILE Children's Charity.",
    type: "website",
  },
};

const articles = [
  { category: "Appeal", title: "[Article title. Stephen to supply]", date: "[Date]", excerpt: "[Article excerpt. Stephen to supply]" },
  { category: "Events", title: "[Article title. Stephen to supply]", date: "[Date]", excerpt: "[Article excerpt. Stephen to supply]" },
  { category: "Impact", title: "[Article title. Stephen to supply]", date: "[Date]", excerpt: "[Article excerpt. Stephen to supply]" },
  { category: "Appeal", title: "[Article title. Stephen to supply]", date: "[Date]", excerpt: "[Article excerpt. Stephen to supply]" },
  { category: "Volunteer", title: "[Article title. Stephen to supply]", date: "[Date]", excerpt: "[Article excerpt. Stephen to supply]" },
  { category: "Events", title: "[Article title. Stephen to supply]", date: "[Date]", excerpt: "[Article excerpt. Stephen to supply]" },
];

const categories = ["All", "Appeal", "Events", "Impact", "Volunteer"];

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="Latest from SMILE."
        subtitle="Updates, stories, and announcements from SMILE Children's Charity."
        bg="white"
      />

      <Section>
        <div className="flex gap-2 mb-10 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                c === "All"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((a, i) => (
            <Link key={i} href="/news" className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-all">
              <div className="bg-gray-100 aspect-video flex items-center justify-center text-gray-400 text-xs italic">
                [Article image. Stephen to supply]
              </div>
              <div className="p-5">
                <span className="inline-block px-3 py-1 rounded-full bg-yellow text-black text-xs font-bold mb-3">
                  {a.category}
                </span>
                <h3 className="font-heading font-bold text-black text-base mb-2 group-hover:text-yellow-dark transition-colors line-clamp-2">
                  {a.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-3">{a.excerpt}</p>
                <p className="text-gray-400 text-xs">{a.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Stay up to date."
        subtext="Sign up for our newsletter and never miss a story."
        primaryLabel="Subscribe"
        primaryHref="/#newsletter"
        secondaryLabel="Donate"
        secondaryHref="/donate"
        bg="yellow"
      />
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add app/events/page.tsx app/news/page.tsx
git commit -m "feat: rebuild Events and News pages with full structure"
```

---

### Task 16: Fundraising + Corporate pages

**Files:**
- Modify: `app/fundraising/page.tsx`
- Modify: `app/corporate/page.tsx`

- [ ] **Step 1: Replace app/fundraising/page.tsx**

```tsx
// app/fundraising/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Fundraising",
  description: "Fundraise for SMILE Children's Charity. Find ideas, get support, and make a difference.",
  openGraph: {
    title: "Fundraising | SMILE Children's Charity",
    description: "Fundraise for SMILE and make a difference for families in Lanarkshire.",
    type: "website",
  },
};

const ideas = [
  { title: "Challenge events", description: "Sponsored runs, cycles, or swims. Pick a challenge and ask people to back you." },
  { title: "Bake sales", description: "A classic for good reason. Easy to organise, hard to resist." },
  { title: "Collections", description: "Set up a collection tin at your workplace, school, or local business." },
  { title: "Online fundraising", description: "Create a fundraising page and share it with your network." },
  { title: "Events", description: "Quiz nights, raffles, auctions — the more creative the better." },
  { title: "Payroll giving", description: "Give a small amount each month directly from your pay, pre-tax." },
];

export default function FundraisingPage() {
  return (
    <>
      <PageHero
        eyebrow="Fundraising"
        title="Fundraise for SMILE."
        subtitle="Every pound you raise goes directly to families who need it. We will support you every step of the way."
        bg="yellow"
        ctaLabel="Get Your Fundraising Pack"
        ctaHref="/contact"
      />

      <Section>
        <div className="text-center mb-12">
          <SectionLabel>How to Get Started</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Pick an idea. We handle the rest.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <div key={idea.title} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-yellow mb-4" />
              <h3 className="font-heading font-bold text-black mb-2">{idea.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{idea.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Ready to get started?"
        subtext="Contact us and we will send you a fundraising pack with everything you need."
        primaryLabel="Get Your Pack"
        primaryHref="/contact"
        secondaryLabel="Donate Instead"
        secondaryHref="/donate"
        bg="teal"
      />

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

      <CTABanner
        heading="Can not fundraise right now? Donate directly."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        bg="yellow"
      />
    </>
  );
}
```

- [ ] **Step 2: Replace app/corporate/page.tsx**

```tsx
// app/corporate/page.tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Corporate Partnerships",
  description: "Partner with SMILE Children's Charity and support families across Lanarkshire.",
  openGraph: {
    title: "Corporate Partnerships | SMILE Children's Charity",
    description: "Partner with SMILE and support families across Lanarkshire.",
    type: "website",
  },
};

const benefits = [
  { title: "Brand association", description: "Align your brand with a trusted local charity making a real difference." },
  { title: "Staff engagement", description: "Fundraising and volunteering opportunities that bring teams together." },
  { title: "Community impact", description: "Show customers and stakeholders your commitment to the local community." },
  { title: "Recognition", description: "Logo on our website, social media mentions, and event acknowledgements." },
];

const tiers = [
  {
    name: "Bronze Partner",
    amount: "[Amount. Stephen to supply]",
    perks: ["Logo on website", "Social media mention", "Invitation to annual event"],
  },
  {
    name: "Silver Partner",
    amount: "[Amount. Stephen to supply]",
    perks: ["Everything in Bronze", "Staff volunteering day", "Newsletter feature"],
    featured: true,
  },
  {
    name: "Gold Partner",
    amount: "[Amount. Stephen to supply]",
    perks: ["Everything in Silver", "Event sponsorship", "Dedicated case study", "VIP event access"],
  },
];

export default function CorporatePage() {
  return (
    <>
      <PageHero
        eyebrow="Corporate Partnerships"
        title="Partner with SMILE."
        subtitle="Support families in Lanarkshire while showing your customers and team what your business stands for."
        bg="navy"
        ctaLabel="Become a Partner"
        ctaHref="/contact"
      />

      <Section>
        <div className="text-center mb-12">
          <SectionLabel>Why Partner With Us</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Good for your business. Great for families.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="border border-gray-100 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-yellow mb-4" />
              <h3 className="font-heading font-bold text-black mb-2">{b.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="gray">
        <div className="text-center mb-12">
          <SectionLabel>Partnership Tiers</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Find the right level for your business.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl p-8 ${
                t.featured
                  ? "bg-black text-white shadow-xl scale-105"
                  : "bg-white border border-gray-100 shadow-sm"
              }`}
            >
              {t.featured && (
                <span className="inline-block px-3 py-1 rounded-full bg-yellow text-black text-xs font-bold mb-4">
                  Most popular
                </span>
              )}
              <h3 className={`font-heading font-bold text-xl mb-2 ${t.featured ? "text-white" : "text-black"}`}>
                {t.name}
              </h3>
              <p className={`font-heading font-extrabold text-3xl mb-6 ${t.featured ? "text-yellow" : "text-black"}`}>
                {t.amount}
              </p>
              <ul className="space-y-2 mb-8">
                {t.perks.map((p) => (
                  <li key={p} className={`flex items-center gap-2 text-sm ${t.featured ? "text-gray-300" : "text-gray-600"}`}>
                    <span className="text-yellow">+</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center mb-10">
          <SectionLabel>Our Partners</SectionLabel>
          <h2 className="font-heading text-2xl font-bold text-black mb-2">
            Businesses that already support SMILE.
          </h2>
          <p className="text-gray-500 text-sm">[Partner logos. Stephen to supply]</p>
        </div>
        <div className="flex flex-wrap gap-8 justify-center items-center opacity-40">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-28 h-12 bg-gray-300 rounded-lg" />
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Ready to partner with SMILE?"
        subtext="Get in touch and we will put together a proposal tailored to your business."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        bg="yellow"
      />
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add app/fundraising/page.tsx app/corporate/page.tsx
git commit -m "feat: rebuild Fundraising and Corporate pages with full structure"
```

---

### Task 17: Legacy + Volunteer pages

**Files:**
- Modify: `app/legacy/page.tsx`
- Modify: `app/volunteer/page.tsx`

- [ ] **Step 1: Replace app/legacy/page.tsx**

```tsx
// app/legacy/page.tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Legacy Giving",
  description: "Leave a lasting gift to SMILE Children's Charity in your will.",
  openGraph: {
    title: "Legacy Giving | SMILE Children's Charity",
    description: "Leave a lasting gift to SMILE in your will.",
    type: "website",
  },
};

const steps = [
  {
    step: "1",
    title: "Speak to a solicitor",
    description: "A solicitor can help you update your will or add a codicil to include a gift to SMILE.",
  },
  {
    step: "2",
    title: "Name SMILE in your will",
    description: "Our full legal name is SMILE Children's Charity SCIO. Charity number SC053107.",
  },
  {
    step: "3",
    title: "Tell us if you wish",
    description: "You are not obligated to, but letting us know means we can thank you personally.",
  },
];

export default function LegacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legacy Giving"
        title="Leave a lasting gift."
        subtitle="A gift in your will ensures SMILE can keep supporting families for generations to come."
        bg="navy"
      />

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
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-yellow flex items-center justify-center font-heading font-extrabold text-black text-lg mx-auto mb-4">
                {s.step}
              </div>
              <h3 className="font-heading font-bold text-black mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
          <SectionLabel>Legal Information</SectionLabel>
          <h3 className="font-heading font-bold text-black text-xl mb-4">
            Details for your solicitor
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex gap-4">
              <dt className="font-semibold text-black min-w-[140px]">Full legal name</dt>
              <dd className="text-gray-600">SMILE Children&apos;s Charity SCIO</dd>
            </div>
            <div className="flex gap-4">
              <dt className="font-semibold text-black min-w-[140px]">Charity number</dt>
              <dd className="text-gray-600">SC053107</dd>
            </div>
            <div className="flex gap-4">
              <dt className="font-semibold text-black min-w-[140px]">Registered address</dt>
              <dd className="text-gray-600">101 Union Street, Larkhall, ML9 1EB</dd>
            </div>
          </dl>
        </div>
      </Section>

      <CTABanner
        heading="Want to find out more?"
        subtext="Get in touch and we can have a confidential conversation about legacy giving."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Donate Today"
        secondaryHref="/donate"
        bg="navy"
      />
    </>
  );
}
```

- [ ] **Step 2: Replace app/volunteer/page.tsx**

```tsx
// app/volunteer/page.tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Volunteer",
  description: "Volunteer with SMILE Children's Charity and help support families across Lanarkshire.",
  openGraph: {
    title: "Volunteer | SMILE Children's Charity",
    description: "Volunteer with SMILE and help support families across Lanarkshire.",
    type: "website",
  },
};

const roles = [
  { title: "Events volunteer", commitment: "[Commitment. Stephen to supply]", description: "[Role description. Stephen to supply]" },
  { title: "Family support volunteer", commitment: "[Commitment. Stephen to supply]", description: "[Role description. Stephen to supply]" },
  { title: "Admin and communications", commitment: "[Commitment. Stephen to supply]", description: "[Role description. Stephen to supply]" },
  { title: "Fundraising volunteer", commitment: "[Commitment. Stephen to supply]", description: "[Role description. Stephen to supply]" },
];

const applySteps = [
  { step: "1", title: "Fill in our form", description: "Tell us a bit about yourself and which role interests you." },
  { step: "2", title: "We get in touch", description: "A member of the SMILE team will reach out within a few days." },
  { step: "3", title: "Get started", description: "Brief induction, then you are part of the SMILE volunteer family." },
];

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow="Volunteer"
        title="Give your time. Change a family's day."
        subtitle="Our volunteers are the heartbeat of SMILE. Whatever you can give, it matters."
        bg="teal"
        ctaLabel="Apply to Volunteer"
        ctaHref="/contact"
      />

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
        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((r) => (
            <div key={r.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-heading font-bold text-black text-lg">{r.title}</h3>
                <span className="text-xs text-teal font-semibold bg-teal/10 px-3 py-1 rounded-full whitespace-nowrap ml-3">
                  {r.commitment}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{r.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Not sure which role is right for you?"
        subtext="Get in touch and we can find the best way for you to get involved."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        bg="teal"
      />

      <Section>
        <div className="text-center mb-12">
          <SectionLabel>How to Apply</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Three simple steps.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {applySteps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-yellow flex items-center justify-center font-heading font-extrabold text-black text-lg mx-auto mb-4">
                {s.step}
              </div>
              <h3 className="font-heading font-bold text-black mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Ready to volunteer?"
        primaryLabel="Apply Now"
        primaryHref="/contact"
        secondaryLabel="Donate Instead"
        secondaryHref="/donate"
        bg="yellow"
      />
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add app/legacy/page.tsx app/volunteer/page.tsx
git commit -m "feat: rebuild Legacy and Volunteer pages with full structure"
```

---

### Task 18: Shop + Donate + Contact pages

**Files:**
- Modify: `app/shop/page.tsx`
- Modify: `app/donate/page.tsx`
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: Replace app/shop/page.tsx**

```tsx
// app/shop/page.tsx
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Shop",
  description: "The SMILE Children's Charity shop — coming soon.",
  openGraph: {
    title: "Shop | SMILE Children's Charity",
    description: "The SMILE shop — coming soon.",
    type: "website",
  },
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="SMILE merchandise — coming soon."
        subtitle="Our shop is on its way. Sign up below to be the first to know when it launches."
        bg="yellow"
      />

      <Section>
        <div className="max-w-md mx-auto text-center">
          <p className="text-gray-600 text-lg mb-8">
            We are working on SMILE merchandise so you can wear your support with pride.
            Leave your email and we will let you know the moment it is live.
          </p>
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
        </div>
      </Section>

      <CTABanner
        heading="Can not wait? Support us directly."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        bg="yellow"
      />
    </>
  );
}
```

- [ ] **Step 2: Replace app/donate/page.tsx**

```tsx
// app/donate/page.tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Donate",
  description: "Donate to SMILE Children's Charity and support families across Lanarkshire.",
  openGraph: {
    title: "Donate | SMILE Children's Charity",
    description: "Donate to SMILE and support families across Lanarkshire.",
    type: "website",
  },
};

const amounts = ["£5", "£10", "£25", "£50", "£100", "Other"];

const impact = [
  { amount: "£5", description: "Covers the cost of a craft activity for a family day." },
  { amount: "£10", description: "Helps fund transport for a family to attend a SMILE event." },
  { amount: "£25", description: "Contributes to a family respite break." },
  { amount: "£100", description: "Funds a full day of activities for a family." },
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Your donation changes lives."
        subtitle="Every pound goes directly to supporting families of children with disabilities and serious illness across Lanarkshire."
        bg="yellow"
      />

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
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {impact.map((i) => (
            <div key={i.amount} className="bg-white rounded-2xl p-6 shadow-sm flex gap-4 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-yellow flex items-center justify-center font-heading font-extrabold text-black text-sm">
                {i.amount}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed pt-1">{i.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Prefer to fundraise?"
        subtext="Set up your own fundraiser and get your friends and family involved."
        primaryLabel="Start Fundraising"
        primaryHref="/fundraising"
        bg="navy"
      />
    </>
  );
}
```

- [ ] **Step 3: Replace app/contact/page.tsx**

```tsx
// app/contact/page.tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with SMILE Children's Charity.",
  openGraph: {
    title: "Contact | SMILE Children's Charity",
    description: "Get in touch with SMILE Children's Charity.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch."
        subtitle="We would love to hear from you. Whether you have a question, want to volunteer, or need support for your family."
        bg="white"
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <SectionLabel>Our Details</SectionLabel>
            <h2 className="font-heading text-2xl font-bold text-black mb-8">
              Find us here.
            </h2>
            <dl className="space-y-6">
              <div>
                <dt className="font-heading font-bold text-black text-sm uppercase tracking-wide mb-1">Address</dt>
                <dd className="text-gray-600">101 Union Street<br />Larkhall<br />ML9 1EB</dd>
              </div>
              <div>
                <dt className="font-heading font-bold text-black text-sm uppercase tracking-wide mb-1">Phone</dt>
                <dd className="text-gray-600">[Phone number. Stephen to supply]</dd>
              </div>
              <div>
                <dt className="font-heading font-bold text-black text-sm uppercase tracking-wide mb-1">Email</dt>
                <dd className="text-gray-600">[Email address. Stephen to supply]</dd>
              </div>
              <div>
                <dt className="font-heading font-bold text-black text-sm uppercase tracking-wide mb-1">Opening hours</dt>
                <dd className="text-gray-600">[Opening hours. Stephen to supply]</dd>
              </div>
            </dl>
            <div className="mt-8 bg-gray-100 rounded-2xl aspect-video flex items-center justify-center text-gray-400 text-sm italic">
              [Map or location image. Stephen to supply]
            </div>
          </div>

          <div>
            <SectionLabel>Send a Message</SectionLabel>
            <h2 className="font-heading text-2xl font-bold text-black mb-8">
              Contact form coming soon.
            </h2>
            <div className="bg-gray-50 rounded-2xl p-8 border-2 border-dashed border-gray-200 text-center">
              <p className="text-gray-500 text-sm italic mb-4">
                The contact form is being set up. In the meantime, please reach us by phone or email above.
              </p>
              <p className="text-gray-400 text-xs">
                [Form backend to be configured — pending Stephen&apos;s sign-off]
              </p>
            </div>
          </div>
        </div>
      </Section>

      <CTABanner
        heading="Registered charity SC053107"
        subtext="SMILE Children's Charity SCIO is registered with the Office of the Scottish Charity Regulator."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        bg="navy"
      />
    </>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add app/shop/page.tsx app/donate/page.tsx app/contact/page.tsx
git commit -m "feat: rebuild Shop, Donate, and Contact pages with full structure"
```

---

### Task 19: SEO + technical layer

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

- [ ] **Step 1: Update app/layout.tsx with metadataBase and GA4 placeholder**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.smilechildrenscharity.com"),
  title: {
    default: "SMILE Children's Charity | Supporting Families Across Lanarkshire",
    template: "%s | SMILE Children's Charity",
  },
  description:
    "SMILE Children's Charity supports families of children with disabilities and serious illness across Lanarkshire. Donate, volunteer, or fundraise to help build SMILE House.",
  keywords: ["children's charity", "Lanarkshire", "disability support", "SMILE House", "fundraising", "Larkhall"],
  openGraph: {
    siteName: "SMILE Children's Charity",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jost.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        {/* GA4: drop <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX" /> here when Stephen supplies property ID */}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Create app/sitemap.ts**

```ts
// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.smilechildrenscharity.com";
  const routes = [
    "",
    "/about",
    "/our-story",
    "/families",
    "/impact",
    "/smile-house",
    "/family-support",
    "/events",
    "/news",
    "/fundraising",
    "/corporate",
    "/legacy",
    "/volunteer",
    "/shop",
    "/donate",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
```

- [ ] **Step 3: Create app/robots.ts**

```ts
// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.smilechildrenscharity.com/sitemap.xml",
  };
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: Compiled successfully. All 16 routes pass. Sitemap and robots routes included.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/sitemap.ts app/robots.ts
git commit -m "feat: add metadataBase, sitemap, and robots.txt"
```

---

## Loop Scoring Rubric

Run this after all 19 tasks are complete. Score each dimension out of 20. Target is 90+.

| Dimension | Score /20 | How to assess |
|---|---|---|
| Visual polish | ? | Typography consistent, spacing even, colour purposeful, no flat sections |
| Mobile | ? | Hamburger nav works, all sections readable on 375px width, no overflow |
| CTAs | ? | Every page has 2+ CTAs, they are prominent and contextually relevant |
| Page completeness | ? | All 16 pages have real structure, not "content coming soon" stubs |
| SEO + technical | ? | All pages have openGraph metadata, build passes clean, sitemap present |
| **Total** | **?/100** | |

If total is below 90, identify the lowest-scoring dimension and open a new iteration targeting it specifically.
