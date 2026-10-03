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

There is no automated test suite or linter configured. Use the existing commands:

```bash
npm ci
npm run build
npm run preview
```

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

### Verification performed

- `npm ci` and `npm run build` succeeded with the existing lockfile.
- Chrome production-preview checks passed at all 11 widths listed above in both
  light and dark modes: no horizontal overflow and no visible target below 44px.
- Measured text contrast after theme transitions settled was at least 5.19:1 in
  light mode and 6.65:1 in dark mode.
- Keyboard skip navigation, Enter/Escape menu behavior, section focus, desktop
  resize reset, touch activation, a scrollable 667×320 landscape menu, reduced
  motion, 200% mobile page scaling, and local image/PDF responses passed.
- No runtime errors were observed during viewport checks.

These are browser-emulation results, not physical-device or screen-reader tests.
The existing development dependency audit reports five high-severity findings;
the runtime-only audit reports none. Dependencies were not changed by this work.

## Deployment

Follow the [Cloudflare deployment guide](docs/DEPLOYMENT.md). Production is
updated only after the PR is merged into `main` and Cloudflare reports a
successful deployment. Check the deployed commit and live site before reporting
deployment complete.
