# smile-charity-website STATE

Git and any live dashboards outrank this file; check them before trusting a claim here.

This file holds only what is true right now. History and session narrative live in
`docs/journal/`, settled calls live in `DECISIONS.md`, gotcha detail lives in `docs/gotchas/`. It
is size-capped by `.githooks/pre-commit` (see `PROTOCOL.md`); move content out rather than
deleting it. Never describe uncommitted work here, `git status` covers that live and accurately.

## What this is

SMILE Children's Charity Website. Client: SMILE Children's Charity SCIO (SC053107), Larkhall,
Scotland, Varun's first consulting client, a free build where Stephen covers infrastructure only.
Next.js 16.2.9 (App Router, Turbopack) + React 19.2.4 + TypeScript + Tailwind v4. Own GitHub
remote (`VarunDasharadhi/smile-charity-website`, currently Varun's personal account), auto-deploys
to Vercel preview at `smile-charity-website.vercel.app` on every push to `main`. Real domain not
yet repointed. Cross-repo trackers live in `my-EA`: engagement tracker at
`my-EA/projects/smile-charity/README.md`, PRD at `my-EA/projects/smile-charity/prd.md`.

## Where the code stands

`main` is at `ab4aca4` ("docs: HANDOFF entry for 2026-07-14 QA pass and bug-fix session"), all
commits pushed and live on the Vercel preview. The most recent real session (2026-07-14) did a
full-site QA sweep across all 16 routes and fixed 5 real bugs: a stat-counter suffix bug (repeated
digits like "200+" rendering as "2000+"), the donate page's amount/frequency buttons having no
state or click handlers, the news page's category filters doing nothing plus articles being out of
chronological order, garbled testimonial initials from bracketed placeholder names, and the header
dropdown becoming keyboard-accessible (focus/blur, click toggle, Escape to close).

Still pending from Stephen, unchanged since then: donation processor choice (accounts exist with
Stripe/JustGiving/PayPal Giving Fund, no primary named), contact form backend, Sanity CMS, the
real DNS repoint, real shop addresses/hours/marketplace links, and real content (copy/photos/
testimonials are all placeholders). See `AGENTS.md`'s "What is intentionally stubbed" section for
the full picture.

Verification gate: `npm run lint` (`eslint`) and `npm run build` (`next build`, includes
type-check and a static export check across all 16 routes). No `test` script exists, no automated
test suite exists in this repo yet.

Last verified: 2026-09-09
