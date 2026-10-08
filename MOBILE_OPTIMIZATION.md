# Mobile Responsiveness & Accessibility

The mobile improvements from `fix/mobile-responsive-accessibility` have been
adapted to the current employer-focused portfolio. The newer content and locked
dependencies are preserved. The feature branch's undeclared Terser configuration
is not needed; the existing Vite production build remains in use.

## Implemented

- Device-width viewport with default scaling, user zoom enabled, and
  `viewport-fit=cover`.
- Mobile-first layouts, fluid headings, wrapping content, and full-width hero
  actions on small screens. Tablet navigation stays collapsed until 1024px.
- Tailwind's default `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), and
  `2xl` (1536px) breakpoints, extended with `xs` (320px), `3xl` (1920px), and
  `4xl` (2560px).
- Minimum 44×44 CSS pixel link/button targets, visible keyboard focus, a skip
  link, named navigation landmarks, and uniquely named project links.
- A mobile menu with an expanded state and controlled navigation region.
  Escape closes it and returns focus to its button; selecting a section moves
  focus to that section; switching to desktop closes the mobile menu.
- Light/dark color tokens follow `prefers-color-scheme`, including live system
  preference changes. No stored theme override or manual switch is required.
- Stronger muted text colors for WCAG AA contrast, and reduced-motion support
  for scrolling, transitions, and hover movement.
- Safe-area spacing around notches and the home indicator, plus anchor offsets
  for the sticky header. Layout overflow is addressed rather than hidden.

## Validation checklist

Run the build and repeatable acceptance checks:

```bash
npm ci
npm run build
npm run test:chat
npx playwright install chromium
npm run test:acceptance
```

GitHub Actions runs the same checks and uploads browser traces/reports on failures.
The Vite preview does not execute Pages Functions; chat fallback is separately
checked against the actual Function handler and the UI is checked with a mocked
fallback response.

In the production preview:

1. Check widths of 320, 375, 390, 430, 640, 768, 1024, 1280, 1920, 2560, and
   3840 CSS pixels, plus a short landscape viewport. Confirm there is no
   horizontal scrolling, clipped content, or overlapping navigation.
2. Tab from the top: the skip link should become visible and focus the main
   content. Verify every visible control has a focus indicator and a minimum
   44×44 target.
3. Open the mobile menu using Enter/Space. Check its expanded state, Tab through
   its links, select a section, reopen it, and close with Escape. Resize to
   desktop and back; it should not reopen unexpectedly.
4. Switch system light/dark preferences and confirm surfaces and text update
   without a reload. Check normal-size text for at least 4.5:1 contrast and large
   text for at least 3:1, including hover and focus states.
5. Enable reduced motion and confirm smooth scrolling and decorative movement
   are disabled. Check browser zoom at 200% and reflow at 400%.
6. Confirm the résumé opens, project/social links work, and contact links use
   `mailto:`. Check for browser console errors and failed local assets.
7. Verify notched devices in portrait/landscape on real iOS and Android hardware.
   Desktop emulation does not certify hardware safe-area behavior.

These changes target WCAG AA; this checklist is not an independent accessibility
certification or a claim of a perfect audit score. Screen-reader and real-device
checks remain part of deployment acceptance.

### Verification performed — October 8, 2026

The branch incorporates current main `3544783`, including the name-only header,
certificate links, Zapier experiment evidence, and corrected project status.

- `npm ci`, production build, and the chat Function validation/fallback test passed.
- All 30 Chromium browser acceptance tests passed on the combined version.
- All 11 widths above passed in light and dark mode without horizontal overflow
  or visible link/button/summary targets below 44 CSS pixels.
- Automated WCAG A/AA scans passed on the home page in light/dark mode, with Ella
  closed and open, and on the QA certificate, Zapier expertise, and Gmail demo pages.
- Keyboard skip navigation, Enter/Escape menu controls, section focus, desktop
  resize reset, scrollable landscape menu, and reduced-motion scrolling passed.
- Reflow at 320 CSS pixels (1280px desktop at 400% equivalent) and 200% text
  enlargement at a 390px viewport passed. Actual browser zoom gestures were not tested.
- Local linked assets responded successfully. No runtime errors occurred during
  layout checks. The UI fallback label, reply display, and input focus were tested.
- `npm audit --omit=dev` reports zero vulnerabilities. The full audit reports five
  high-severity development-tool findings through Tailwind 3's braces dependency.
  Compatible source-map-js and selector-parser fixes were applied; braces currently
  has no newer published version. A Tailwind major-version migration is separate work.

These are automated browser checks, not physical-device or screen-reader tests.
Real iOS/Android safe-area behavior, touch gestures, VoiceOver/TalkBack output,
external destinations, live AI/search accuracy, and actual browser zoom still
require manual verification. No independent WCAG certification is claimed.

## Deployment

Follow the [Cloudflare deployment guide](docs/DEPLOYMENT.md). Production is
updated only after the PR is merged into `main` and Cloudflare reports a
successful deployment. Check the deployed commit and live site before reporting
deployment complete.
