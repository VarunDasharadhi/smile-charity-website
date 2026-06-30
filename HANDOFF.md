# SMILE Children's Charity Website

## Latest session (2026-06-30, late evening) — Structure overhaul + organic visual system, 38 commits, score 99/100

### What was done
1. **Structural overhaul (19 tasks, commits 5da495b..04b5c6b)** -- Component library (SectionLabel, AnimatedCounter, ProgressBar, TestimonialCard, EventCard, CTABanner, PageHero, MobileNav, teal DonateButton variant), full homepage rewrite, all 15 inner pages rebuilt with PageHero + 2 CTABanners + metadata, SEO layer (sitemap, robots, metadataBase). Whole-branch review scored 89/100, 4 fixes applied (eyebrow contrast, Impact double-yellow, Our Story missing CTA, homepage metadata), re-verified.
2. **Organic visual system (17 tasks, commits c704be1..ceffbe7)** -- User felt the structurally-complete site still looked flat compared to the live site (smilechildrenscharity.com) and asked for more creative, interactive treatment. Compared 3 visual directions (Organic & Handcrafted, Bold & Editorial, Soft & Layered) via the brainstorming visual companion; user picked Organic & Handcrafted. Built 4 new components: `SectionHeading` (hand-drawn squiggle underline motif), `WaveDivider` (SVG curve seam between sections), `PhotoFrame` (rounded photo/placeholder frame with offset accent shape), `IconLinkRow` (circular quick-link badges). Added a utility bar + dropdown nav to `Header` (covers all 16 routes, up from 8), matching accordion groups in `MobileNav`, a wave seam in `Footer`, an optional image slot in `PageHero`, and deeper shadows on `TestimonialCard`/`EventCard`. Applied across the homepage and all 15 inner pages.
3. **Final whole-branch review: 99/100** -- Every `WaveDivider` color pair verified against actual section backgrounds, squiggle/wave SVG paths confirmed single-source (no drift possible), Header/MobileNav route parity confirmed exact, no content altered outside the documented homepage CTA-strip-to-IconLinkRow swap. Zero Critical/Important findings.
4. **Build** -- All 21 routes (16 pages + sitemap.xml + robots.txt + _not-found) generate clean, 0 TypeScript errors, across both plans' full commit history.

### Current state
- `feat/site-quality-overhaul` merged into `main` and pushed to GitHub: `https://github.com/VarunDasharadhi/smile-charity-website` (personal account for now -- transfer to a charity-owned account later, GitHub supports this without losing history).
- Live preview deployed: **https://smile-charity-website.vercel.app** (Vercel project `team-viper/smile-charity-website`, connected to the GitHub repo -- future pushes to `main` auto-deploy).
- All 16 routes are structured, visually polished pages with placeholder content in `[Square brackets]`. Real assets still pending Stephen.
- Intentional stubs (pending Stephen sign-off): donate processor, shop type, contact form backend, Sanity CMS, GA4 property ID.

### Next steps
1. Send Stephen the live preview link (https://smile-charity-website.vercel.app) plus the WhatsApp asset request (drafted in an earlier session): real logo vector, metrics/stats, photos, partner logos, font licensing confirmation.
2. Once Stephen replies: wire real photos into the new `PhotoFrame`/`PageHero` image slots, fill in real stats, replace placeholder copy.
3. Follow up on the 4 open questions from `prd.md` Section 11 (donation processor, shop type, contact form backend, Sanity CMS) before wiring any of those.
4. Consider a follow-up accessibility pass on the new header dropdown (currently hover-only, no keyboard focus handling -- flagged as non-blocking in the final review).
5. When the charity gets its own GitHub account, transfer repo ownership from the personal account.

### Gotchas
- Two SDD ledgers exist side by side: `.superpowers/sdd/` (structural overhaul) and `.superpowers/sdd-organic/` (visual system) — both git-ignored scratch workspaces, kept separate to avoid task-number collisions between the two plans.
- `components/AnimatedCounter.tsx` and `hooks/useInView.ts` have a pre-existing lint issue (sync `setState` in `useEffect`, plus `exhaustive-deps` warnings) that predates both plans and was not introduced by either. Worth a follow-up cleanup, not urgent.

## Latest session (2026-06-30, evening) — Brand matched to real site, copy humanised

### What was done
1. **Real brand extracted via DevTools** -- Playwright-inspected smilechildrenscharity.com to get exact computed values: yellow `#FDD70E`, navy `#2E3245`, blue `#164194`, cream `#FFF8EE`, muted text `#AAB0BC`. Previous tokens were invented and off-brand.
2. **Brand tokens rewritten** -- `app/globals.css` `@theme` block updated. Teal tokens removed entirely; replaced with brand blue. Gray-50 changed to cream. All component classes still work, no renames needed.
3. **Font swapped** -- Poppins replaced with Jost (free Futura geometric, closest available on Google Fonts). Wired in `app/layout.tsx` and `globals.css`. Stephen needs to confirm if he has futura-pt licensed.
4. **Real logos installed** -- Downloaded `logo.png` and `logo-light.png` directly from the live site into `public/`. Header and Footer updated to use `next/image` with the real PNGs. Placeholder "S" chip removed from both. Logo sized to `w-[140px] h-auto` to match the live site rendering. Header height increased from `h-16` to `h-20`.
5. **Steph corrected to Stephen** -- 13 files updated. Typo "theirs stories" fixed in `app/families/page.tsx`.
6. **Em dashes removed** -- Every em dash across all 17 routes removed and replaced with commas or periods. Includes visible copy, placeholder notes, metadata descriptions, and stat placeholder values.
7. **Copy rewritten for emotional connection** -- Home page hero, "Who we are", SMILE House appeal, testimonial section heading, footer donate strip, and newsletter section all rewritten. Before: generic and process-focused. After: speaks directly to the family experience ("When your child is seriously ill or disabled, life can feel relentless...").
8. **Dev server verified** -- Build passes all 17 routes. Screenshots confirmed logo, navy hero, yellow CTAs, cream sections all rendering correctly at localhost:3000.
9. **WhatsApp asset request drafted** -- Message ready to forward to Stephen asking only for what DevTools cannot give: vector logo, real metrics, photos with rights clearance, partner logos, and font licensing confirmation.

### Current state
- All changes are local only. No git repo inside this folder yet (see Gotchas).
- Dev server runs clean at localhost:3000. `npm run build` passes all 17 routes.
- No GitHub remote. No Vercel or public preview URL yet.
- Web PNGs from the live site are in `public/` and work fine for screen. Print-quality vector logo still needed from Stephen.
- Stat placeholders show "?" on Impact and Home pages. Real numbers pending Stephen.

### Next steps
1. Deploy a preview for Stephen: either run `vercel` from CLI inside this folder (no git needed, instant), or `git init` + push to a charity-named GitHub account + connect Vercel for a proper ongoing pipeline.
2. Send Stephen the WhatsApp asset request (drafted in session). Key asks: vector logo, metrics, photos, partner logos, font licensing.
3. Once Stephen replies: swap web PNGs for vector logo, fill in real metrics, add photos, wire partner logos.
4. Confirm font decision: if Stephen has futura-pt licensed for the domain, replace Jost. If not, stay on Jost or choose together.
5. Follow up on 4 open questions from `prd.md` Section 11 (donation processor, shop type, contact form backend, Sanity CMS) before wiring any of those.

### Gotchas
- The parent `c:\Users\varun\repos\` directory has a stray old git repo. This project shows as untracked inside it. Run `git init` INSIDE `smile-charity-website\` before any commit work. Do not use the parent repo for this project.
- The web logos in `public/` were downloaded from the live site. They are fine for a preview but Stephen should supply the source files. Do not treat the downloaded PNGs as the authoritative brand asset.
