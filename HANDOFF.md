# SMILE Children's Charity Website

## Latest session (2026-07-14, afternoon) — Full-site QA pass, 5 real bugs fixed + keyboard accessibility, 6 commits

### What was done
1. **Full-site QA sweep** -- swept all 16 routes at desktop and mobile viewports checking console errors, broken images, and layout. Along the way, ruled out two false positives specific to headless browser automation (rAF throttling stalling the homepage stat counter, JS-injected scrollTo not moving the real scroll position for a reveal animation) by cross-checking against a production build and real mouse-wheel input, confirming both were test-harness artifacts rather than app bugs.
2. **AnimatedCounter suffix bug fixed** -- `indexOf(char)` for the trailing digit found the wrong occurrence whenever a digit repeated ("200+" rendered as "2000+", "100+" as "1000+"). Previously logged as a comma-parsing bug; the real root cause was any repeated boundary digit, not specifically commas. Fixed by locating the digit run with a regex match instead of a character search. Commit `cd7e57b`.
3. **Donate page amount and frequency buttons made interactive** -- found while reading the page during testing: the £5/£10/£25/£50/£100/Other grid and One-off/Monthly toggle had no state and no click handlers at all, "£25" was hardcoded as visually selected regardless of what was clicked. Extracted a `DonationAmountPicker` client component so the page can keep its metadata export. Commit `cf4e330`.
4. **News page category filters made interactive, articles reordered chronologically** -- user reported the All/Appeal/Events/Impact/Volunteer filter buttons did nothing, same root cause as the donate buttons. Extracted a `NewsFilter` client component that actually filters, with an empty-state message for categories with no articles yet. Articles array also reordered to true newest-first (it had drifted out of date order). Commit `e842438`.
5. **Testimonial avatar initials fixed for placeholder names** -- names like "[Family name]" produced garbled "[N" initials because brackets were counted as characters; strip non-letters before computing initials. Commit `513d0d3`.
6. **Header dropdown made keyboard-accessible** -- outstanding gap flagged across at least 3 prior sessions: About/Get Involved dropdowns only opened on mouse hover, and their links stayed tab-focusable while visually hidden. Added focus/blur handling (opens when focus enters the group, closes only when focus truly leaves), a click toggle, and Escape to close and return focus to the trigger. Commit `ebaefd4`.

### Current state
- All 6 commits pushed to GitHub (`1b6d4be..ebaefd4`), Vercel auto-deploying to https://smile-charity-website.vercel.app.
- Donate page's amount and frequency selection now works, but there is still no backend behind it, the processor placeholder note is unchanged and still pending Stephen's choice.
- News category filters work correctly. Volunteer shows the empty-state message since no news article is currently tagged that way.
- Header dropdown keyboard accessibility confirmed via focus/blur/Escape testing in Playwright, not yet checked with a real screen reader.
- Same gates as before: donation processor choice, contact form backend, Sanity CMS, DNS repoint all still pending Stephen.

### Next steps
1. Confirm whether Varun has sent the WhatsApp message to Steph yet (drafted several sessions ago, includes the Justin-photo confirmation ask).
2. When Stephen sends a Volunteer-tagged news item, the News page's Volunteer filter will show it correctly with no further code change needed.
3. Consider auditing other pages for the same "decorative button with no state" pattern found on donate and news (nothing else confirmed yet, just a pattern worth watching for).

### Gotchas
- Testing this dev server via `http://127.0.0.1:3000` instead of `http://localhost:3000` breaks Turbopack's HMR websocket handshake in a way that also kills client-side interactivity (buttons render but onClick does nothing), even on a fresh page load with no HMR update involved. The 127.0.0.1 workaround was needed earlier in this session when another concurrent project's dev server was squatting on port 3000 via the IPv6 loopback interface; once that collision cleared, plain `localhost:3000` worked correctly again. Always verify via `localhost`, and if a "dead button" shows up during testing, check whether the test was accidentally going through 127.0.0.1 before assuming the app itself is broken.

## Latest session (2026-07-04) — Vercel Analytics installed

### What was done
1. **Vercel Analytics installed** -- `@vercel/analytics` added, `<Analytics />` wired into `app/layout.tsx`. Zero-config page view and Web Vitals tracking, active on production deployments only (not localhost or previews). Commit `1b6d4be`.

### Current state
- Pushed to GitHub (`a1423f5..1b6d4be`), Vercel auto-deploying to https://smile-charity-website.vercel.app.
- Analytics data will appear in the Vercel dashboard's Analytics tab once this deploys; may need a one-click "Enable" there the first time, not yet confirmed as enabled.

### Next steps
1. Check the Vercel dashboard's Analytics tab after this deploy lands, enable it if prompted.
2. Confirm whether Varun has sent the WhatsApp message to Steph yet (drafted two sessions ago, includes the Justin-photo confirmation ask).
3. Fix `AnimatedCounter` comma-parsing bug flagged two sessions ago (still pending, worked around with "£30k+" instead of "£30,000+").
4. Accessibility pass on header dropdown (hover-only, no keyboard focus handling) still outstanding.

## Latest session (2026-07-03/04) — Polish pass: copy cleanup, senior UI/UX audit, icon hover bug fix, 9 commits

### What was done
1. **Copy and icon cleanup** -- removed every remaining long dash site-wide, replaced with commas/periods (commit `5fde09b`). Homepage quick-link icons recolored/reworked for context (`4ae70be`).
2. **Hero text wrapping fixed** -- `PageHero` capped titles/subtitles too narrow (`max-w-2xl`/`max-w-xl`), causing sentences to wrap early with most of the banner empty on desktop. Widened to `max-w-5xl`/`max-w-3xl`, added `text-balance`/`text-pretty` across `PageHero`, `SectionHeading`, `CTABanner`. Events page title forced to break at its sentence boundary since `text-balance` alone still split it mid-word. Commit `e9cf376`.
3. **Family Support page enriched** -- each service card now leads with a real photo, splits eligibility from how-to-access, and shows a funder badge where relevant. Commit `7dc0bc3`. Removed the duplicated services teaser from Meet Our Families (was showing the same 2 services as a brief blurb); replaced with a one-line pointer + button to Family Support so each page has one clear job (stories vs services). Commit `c1ce1a4`.
4. **Full senior-designer UI/UX audit performed** -- screenshotted all 16 pages at desktop and mobile width, found and fixed 7 real issues in one pass (commit `0123a2c`): mobile horizontal scroll bug (off-canvas nav drawer had no `overflow-x: hidden` guard so its translated-off-screen geometry still counted toward page width), mobile menu's large empty gap (filled with phone/email/socials, matching desktop's utility bar), homepage hero's overlay darkening the entire photo including the 40% with no text on it (changed to a left-to-right gradient), the same child's photo appearing 3 times across Home/About/Our Story (removed from Home and About, kept only in Our Story where it's paired with Justin's story), partner logos with wildly inconsistent visual weight (Rocca's source file had far more internal padding than Co-op's; auto-cropped it), a dead-space alignment issue on the homepage Who-We-Are section (`items-center` on a mismatched-height grid switched to `items-start`), and Volunteer role cards all showing an identical uninformative "Flexible" tag (removed until real per-role data exists). Two claims from the initial audit were self-corrected after re-checking with devtools rather than trusting a screenshot: the mobile nav backdrop already existed (just subtle against an already-dark hero), and Donate's "three stacked CTAs" was actually one page CTA plus the site-wide footer strip every page has.
5. **Donate vs Volunteer icon confusion fixed twice** -- first pass swapped Donate away from its original `HandHeart` (user preferred to keep it) and changed Volunteer to `Users` instead, a clearly distinct two-person mark. Commit `3ffa53f`.
6. **Icon hover "bulge" effect added, then actually debugged** -- first attempt used Tailwind's `group-hover:scale-*` utilities (commit `1a8bf7e`), which the user reported as not working even after confirming the correct dev server was serving the page. Root cause found: Tailwind v4 wraps every `hover:`/`group-hover:` utility in `@media (hover: hover) and (pointer: fine)`, which many touchscreen-capable Windows laptops fail even while actively using a mouse, silently disabling the whole rule. Rewrote as plain unconditional CSS (`a:hover .icon-badge`) with no media gate. Commit `a1423f5`. User confirmed it now works.

### Current state
- All 9 commits pushed to GitHub (`e54358b..a1423f5`), Vercel auto-deploying to https://smile-charity-website.vercel.app.
- Site now has no known layout bugs from the audit pass; all fixes verified via build + devtools inspection (and now one confirmed live by the user).
- Same gates as before: donation processor choice, contact form backend, Sanity CMS, DNS repoint all still pending Stephen.
- WhatsApp message to Steph from the previous session was drafted but sending status not confirmed this session.

### Next steps
1. Confirm whether Varun has sent the WhatsApp message to Steph yet (drafted last session, includes the Justin-photo confirmation ask).
2. Any future Tailwind `hover:`/`group-hover:` effect added to this site should be checked against the same touchscreen/`(hover: hover)` gotcha found this session, either test on Varun's actual laptop or write it as plain CSS like `.icon-badge`.
3. Fix `AnimatedCounter` comma-parsing bug flagged last session (still pending, worked around with "£30k+" instead of "£30,000+").
4. Accessibility pass on header dropdown (hover-only, no keyboard focus handling) still outstanding from two sessions ago.

### Gotchas
- Playwright browser sessions on this machine can be shared/contended with other concurrent Claude sessions or the user's own testing; pages navigated unexpectedly mid-verification this session. If a screenshot looks inconsistent with what was just done, re-navigate and re-check before trusting it, or ask the user to verify directly.
- The Playwright MCP browser used for verification in this environment reports `(hover: none)` (touch-emulated), so hover-dependent CSS cannot be visually screenshot-verified from that tool. Verify hover effects via computed-style/stylesheet inspection instead, and treat "confirmed working" as pending until the user checks on a real device.

## Latest session (2026-07-02, night) — Steph's answers actioned + full real-content pass from public sources, 15 commits

### What was done
1. **Steph answered all 4 PRD open questions** (shop type, recurring donors, domain email, donation processor). CLAUDE.md synced to match, including two other stale sections found in the same pass (brand tokens still showed invented colors/Poppins, git status said "no remote"). Commit `c7049ac`. Answers also captured in auto-memory and the engagement tracker.
2. **Shop page rebuilt as confirmed info page** -- Larkhall (real address 101 Union Street, Tue-Sat from 10am) + Hamilton (a NEW branch not on the old site yet, placeholder details), eBay/Vinted/Depop buttons with real brand logos, "Get directions" Google Maps button. Commits `36f2c45`, `34b0dda`, `2da2415`, `af7465e`.
3. **Fabricated content caught and fixed** -- "Justin and Charlotte" as co-founders was invented (real story: founded Feb 2024 by Wendy and Stephen Meek in memory of son Justin; Charlotte is their daughter with complex needs, not a founder). Also removed an invented Hamilton shop (then restored when Varun confirmed it is real, just new), impossible "10+ years" stat, unsourced 250+/40+/120+ numbers, and 4 invented service categories. Commits `dbd734d`, `3fa25c6`, `69b4642`.
4. **Full real-content pass from public sources** -- everything findable on smilechildrenscharity.com pulled in: real contact info (01698 642411, gmail), all 6 news articles with matched images, real events (4 Kiltwalks 2026 with dates, Race Night, Pantomime), real partners (Rocca Hamilton, Co-op, National Lottery Community Fund) with logos and linked cards, full 8-trustee team with 6 photos, Kenny McLean ambassador section, full Canderavon/SMILE House detail, real founding-story milestones, real social links (Facebook URL was broken on their own site, found the real page via search; LinkedIn does not exist, replaced with X).
5. **Visual/interactive upgrades** -- icon-based top utility bar (clickable tel:/mailto:, brand-colored circular social icons), real hero image, live embedded Google Map on Contact, animated nav underlines, SectionHeading accent prop fixing an invisible yellow-on-yellow squiggle, placeholder stats restored as presentable "illustrative figures" with a visible disclaimer note.
6. **AnimatedCounter comma bug found** -- values like "£30,000+" render as "£30,000,000+" (suffix parsing finds first digit match, not last). Worked around with "£30k+"; component fix still pending.
7. **WhatsApp message for Steph drafted and refined** (final version in session transcript): preview link, Stripe vs PayPal Giving Fund question, eBay/Vinted/Depop existence check, Hamilton address ask, real-numbers ask, and a gentle check that the boy photo used in Our Story is actually Justin.

### Current state
- All 15 commits pushed to GitHub (`c02e0ee..302f4c5`), Vercel auto-deploying to https://smile-charity-website.vercel.app.
- Site now carries real content everywhere it publicly exists; placeholders remain only for things genuinely unavailable (family stories needing consent, Hamilton shop details, sponsorship tier amounts, marketplace URLs, some photos, real stats).
- Still gated pending Stephen: donation processor choice (accounts exist for Stripe/JustGiving/PayPal Giving Fund, no primary picked), contact form backend, Sanity CMS, DNS repoint.
- WhatsApp message ready to send, not yet sent.

### Next steps
1. Varun sends the WhatsApp message to Steph (includes the sensitive Justin-photo confirmation, do not skip that check).
2. On Steph's reply: wire the chosen donate processor decision into planning (PRD recommends PayPal Giving Fund primary, Stripe fallback), fill Hamilton shop details, marketplace URLs, real stats.
3. Fix AnimatedCounter comma parsing properly (suffix should anchor to the last digit, not first match).
4. Consider reserving the boy's photo for Our Story only (currently also on homepage Who-we-are) once Stephen confirms identity and sends more photos.
5. Accessibility pass on header dropdown (hover-only) still outstanding from the previous session.

### Gotchas
- The Hamilton shop is real but NOT on the old site anywhere, a future "verify against the live site" pass will wrongly flag it as fabricated (this nearly happened). Recorded in auto-memory too.
- The boy photo in Our Story (`about-charity.jpg`) is believed to be Justin because the live About page pairs it with the founding story, but it is never explicitly captioned. Confirm with Stephen before public launch.

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
