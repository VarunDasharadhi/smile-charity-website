# Agent instructions

This file is the shared contract for every harness that reads `AGENTS.md` directly, rather than
`CLAUDE.md`. Claude Code reads it too, via `CLAUDE.md`'s `@AGENTS.md` import. Keep this file
authoritative and self-contained; don't assume the reader has also seen `CLAUDE.md`.

## What this is

SMILE Children's Charity Website. Client: SMILE Children's Charity SCIO (SC053107), Larkhall,
Scotland. Free build, Varun's first consulting client; Stephen (the client) covers infrastructure
only.

## Session start

Read `STATE.md` and `GOTCHAS.md` first, both short. Git and any live dashboards outrank any prose
claim about current state; check them before trusting a claim here. `DECISIONS.md` is the
append-only dated decision log: read it before reopening a settled call, add a line when you make
a new one, never rewrite an existing dated line.

Full protocol for what to read on entry, what to write on exit, and what to do when something
unexpected happens: `~\.agents\PROTOCOL.md`.

## Stack and run commands

- Next.js 16.2.9, App Router, Turbopack. No `src/` dir.
- React 19.2.4, TypeScript.
- Tailwind v4, CSS-based config only. Tokens live in the `@theme` block in `app/globals.css`.
  There is NO `tailwind.config.js`. Use `--color-*` and `--font-*` CSS vars for brand values, do
  not add a config file.
- Fonts via `next/font/google`: Jost (headings, CSS var `--font-jost`, closest free match to
  Futura) + Inter (body, CSS var `--font-inter`), wired in `app/layout.tsx`. Poppins was swapped
  out for Jost after brand extraction; confirm with Stephen whether Futura PT is actually licensed
  for the domain.

This Next.js version is recent enough that training-data knowledge of its APIs and conventions can
be stale or simply wrong. Before writing any code against Next.js APIs, read the actual installed
docs in `node_modules/next/dist/docs/` rather than relying on memory, and check for deprecation
notices there.

Commands:
```bash
npm run dev    # starts on :3000 (or :3001 if 3000 is busy)
npm run build  # type-check + static export check, all 16 routes should pass clean
```

### Brand tokens (in `app/globals.css` @theme)

Extracted directly from the live site (smilechildrenscharity.com) via DevTools, not invented:

```
--color-yellow:       #FDD70E   (primary, backgrounds, CTAs)
--color-yellow-light: #FFE45C
--color-yellow-dark:  #E0B900
--color-black:        #2E3245   (navy, headings, dark sections, not true black)
--color-white:        #FFFFFF
--color-blue:         #164194
--color-blue-light:   #2E5BB8
--color-blue-dark:    #0F2E6E
--color-teal:         #14B8A6   (accent)
--color-teal-light:   #5EEAD4
--color-teal-dark:    #0F766E
--color-gray-50:      #FFF8EE   (cream)
--color-gray-100/600/800        (backgrounds, body text)
--font-sans:    var(--font-inter)
--font-heading: var(--font-jost)
```

Light theme only. No dark mode.

### Project layout

```
app/
  layout.tsx          Root layout, Header + main + Footer, metadata, fonts
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
  shop/page.tsx        Info page (confirmed), structure built, real shop addresses/hours/
                        marketplace links still pending
  donate/page.tsx      STUBBED, processor accounts confirmed (Stripe/JustGiving/PayPal Giving
                        Fund), primary not yet chosen
  contact/page.tsx

components/
  Header.tsx          Sticky nav, "S" logo, all nav links, persistent DonateButton
  Footer.tsx           Yellow donate strip, 3 nav columns, charity info, social links
  DonateButton.tsx     Props: size (sm/md/lg), variant (primary/outline), label
  Section.tsx          Consistent section wrapper, bg prop (white/gray/yellow/black)
```

## Verification gate

`npm run lint` (`eslint`) and `npm run build` (`next build`, which includes type-check and a
static export check across all 16 routes). There is no `test` script in `package.json`, no
automated test suite exists in this repo yet.

This gate is non-negotiable for any harness or agent making code changes here, not just Claude
Code. A change that has not run the gate clean is not done. Do not commit with `--no-verify`. If a
cap or a gate step is genuinely wrong for the content, say so and get it changed rather than
routing around it.

## Repo boundaries

This is Varun's live client project. Two absolute paths point at a different repo entirely,
`my-EA`'s own project-tracker files, and genuinely need to stay absolute (they are not
within-repo references):

- Engagement tracker: `~\my-EA\projects\smile-charity\README.md`
- PRD: `~\my-EA\projects\smile-charity\prd.md`

### What is intentionally stubbed

Stephen answered all 4 PRD Section 11 open questions on 2026-07-02 (full detail in the PRD and
engagement tracker). Status now:

- **Shop**: RESOLVED, informational page only (physical Larkhall/Hamilton shops + links out to
  eBay/Vinted/Depop resale), not e-commerce. `shop/page.tsx` is already rebuilt with this
  structure. Still pending from Stephen: real shop addresses/hours and the actual marketplace
  URLs (currently placeholders/`#`).
- **Donation processor**: PARTIALLY RESOLVED, the charity holds its own registered accounts with
  Stripe, JustGiving, and PayPal Giving Fund (not locked into Charity Hive). Stephen has not named
  a primary for the new Donate page yet, so `donate/page.tsx` correctly still shows a placeholder
  pending that choice.
- **Domain/DNS migration**: UNBLOCKED IN PRINCIPLE, no email currently exists on
  `@smilechildrenscharity.com` (they use Gmail), so there's no live mailbox to protect during the
  repoint. They want Google Workspace for Nonprofits set up fresh. The actual DNS repoint itself
  hasn't happened yet, the site is still only on the Vercel preview URL.
- **Contact form**: still fully gated. No backend wired, not addressed by Stephen's answers.
- **Sanity CMS**: still fully gated. Not part of the original 4 questions.
- **Real content**: all copy, photos, and testimonials are clearly labelled placeholders. Stephen
  supplies these.

Do NOT wire the donation processor, contact form backend, Sanity CMS, or do the real DNS repoint
without an explicit go-ahead from Stephen/Varun. Safe to fill in real shop data once Stephen
supplies it.

### Git and hosting

Own git repo (isolated from the stray repo at the `~\repos\` root, see `GOTCHAS.md`),
on branch `main`, pushed to GitHub at `github.com/VarunDasharadhi/smile-charity-website`,
currently Varun's personal account, to be transferred to a charity-owned GitHub account once
Stephen sets one up. Connected to Vercel (`team-viper/smile-charity-website`); pushes to `main`
auto-deploy to the live preview at `smile-charity-website.vercel.app`. The real domain has not
been repointed yet.

This is Varun's live client project; do not invent or embellish anything about the client
relationship beyond what is documented here, in `STATE.md`, or in the two tracker files above.

## Writing style

No em dashes anywhere (user-facing copy, comments, docs). Natural, human phrasing; errors say what
happened and what to do next. Match the surrounding code's conventions.
