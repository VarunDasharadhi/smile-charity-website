# GOTCHAS

One line each, added the moment something burns a session.

This file is an index, not an archive. It is read by every session at startup and is size-capped
(see `.githooks/pre-commit`), so anything needing more than a line or two lives in
`docs/gotchas/<slug>.md` with a pointer left here. Every gotcha is still listed, so nothing gets
rediscovered the hard way; you only pay for the detail when it is actually relevant.

- Testing the dev server via `http://127.0.0.1:3000` instead of `http://localhost:3000` breaks
  Turbopack's HMR websocket handshake and silently kills client-side interactivity (buttons render
  but `onClick` does nothing). Always verify via `localhost`; treat a "dead button" during testing
  as a possible 127.0.0.1 symptom before assuming the app itself is broken.
- Playwright browser sessions on this machine can be shared with other concurrent Claude sessions;
  pages can navigate unexpectedly mid-verification. If a screenshot looks inconsistent with what
  was just done, re-navigate and re-check before trusting it.
- The Playwright MCP browser used for verification here is touch-emulated (`hover: none`), so
  hover-dependent CSS can't be visually screenshot-verified from it. Check computed styles instead
  and treat hover effects as unverified until checked on a real device.
- The Hamilton shop is real but isn't shown anywhere on the old live site, so a future
  verify-against-the-live-site pass will wrongly flag it as fabricated. It isn't, it's just not on
  the old site.
- The boy photo in Our Story (`about-charity.jpg`) is believed to be Justin, based on page context
  pairing it with the founding story, but it is never explicitly captioned. Confirm with Stephen
  before public launch.
- Two SDD ledgers exist side by side, `.superpowers/sdd/` (structural overhaul) and
  `.superpowers/sdd-organic/` (visual system), both git-ignored scratch workspaces kept separate
  on purpose to avoid task-number collisions between the two plans.
- `components/AnimatedCounter.tsx` and `hooks/useInView.ts` have a pre-existing lint issue (a sync
  `setState` in `useEffect`, plus `exhaustive-deps` warnings) that predates both plans. Worth a
  follow-up cleanup, not urgent.
- The parent `~\repos\` directory has a stray old git repo; this project can show as
  untracked inside it. Always run git commands from inside `smile-charity-website\` itself, never
  the parent.
- The logos in `public/` were downloaded from the live site as a placeholder. Fine for a preview,
  but not the authoritative brand asset; Stephen should supply the real source files.
