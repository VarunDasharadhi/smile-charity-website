# SMILE Charity Website

**Client:** SMILE Children's Charity SCIO (SC053107), Larkhall, Scotland.
**Engagement tracker:** `c:\Users\varun\my-EA\projects\smile-charity\README.md`
**PRD:** `c:\Users\varun\my-EA\projects\smile-charity\prd.md`

Free build (Varun's first consulting client). Stephen covers infrastructure only.

---

## Stack

- **Next.js 16.2.9** — App Router, Turbopack. No `src/` dir.
- **React 19.2.4**, TypeScript
- **Tailwind v4** — CSS-based config only. Tokens live in the `@theme` block in `app/globals.css`. There is NO `tailwind.config.js`. Use `--color-*` and `--font-*` CSS vars for brand values; do not add a config file.
- **Fonts** — `next/font/google`: Poppins (headings, CSS var `--font-poppins`) + Inter (body, CSS var `--font-inter`). Wired in `app/layout.tsx`.

---

## Brand Tokens (in `app/globals.css` @theme)

```
--color-yellow:       #FFC300   (primary, backgrounds, CTAs)
--color-yellow-light: #FFD966
--color-yellow-dark:  #E6A800
--color-black:        #111111   (headings, dark sections)
--color-white:        #FFFFFF
--color-teal:         #14B8A6   (accent)
--color-teal-light:   #5EEAD4
--color-teal-dark:    #0F766E
--color-gray-50/100/600/800     (backgrounds, body text)
--font-sans:    var(--font-inter)
--font-heading: var(--font-poppins)
```

Light theme only. No dark mode.

---

## Project Layout

```
app/
  layout.tsx          Root layout — Header + main + Footer, metadata, fonts
  globals.css         Tailwind @import + @theme brand tokens
  page.tsx            Home page (full section stack)
  about/page.tsx
  our-story/page.tsx
  families/page.tsx
  impact/page.tsx
  smile-house/page.tsx
  family-support/page.tsx
  events/page.tsx
  news/page.tsx
  fundraising/page.tsx
  corporate/page.tsx
  legacy/page.tsx
  volunteer/page.tsx
  shop/page.tsx        STUBBED — shop type not confirmed
  donate/page.tsx      STUBBED — payment processor not confirmed
  contact/page.tsx

components/
  Header.tsx          Sticky nav, "S" logo, all nav links, persistent DonateButton
  Footer.tsx          Yellow donate strip, 3 nav columns, charity info, social links
  DonateButton.tsx    Props: size (sm/md/lg), variant (primary/outline), label
  Section.tsx         Consistent section wrapper — bg prop (white/gray/yellow/black)
```

---

## What Is Intentionally Stubbed

These are gated on Stephen's answers to the 4 open questions (in `prd.md` Section 11):

- **Donation processor** — Stripe vs PayPal Giving Fund vs JustGiving. `donate/page.tsx` shows a placeholder form only.
- **Shop** — info page vs e-commerce. `shop/page.tsx` is a placeholder.
- **Contact form** — shows "coming soon." No backend wired.
- **Sanity CMS** — schema sketched in the PRD but not installed or connected.
- **Domain/DNS migration** — must confirm whether `@smilechildrenscharity.com` domain email is in use before repointing.
- **Real content** — all copy, photos, and testimonials are clearly labelled placeholders. Stephen supplies these.

Do NOT wire any of the above until Stephen's sign-off and question answers are in.

---

## Git Status

Local only. No GitHub remote. The `c:\Users\varun\repos\` directory has a stray git repo at its root (old uk-immigration-compass history), so this site currently has no git repo of its own. Before doing any commit work here, run `git init` inside this folder to create an isolated repo. When setting up a remote, use a GitHub account in the charity's name, not Varun's personal account.

---

## Dev

```bash
npm run dev    # starts on :3000 (or :3001 if 3000 is busy)
npm run build  # type-check + static export check — all 16 routes should pass clean
```
