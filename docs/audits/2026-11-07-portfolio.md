# Portfolio audit — 7 November 2026

## Verdict

The portfolio's main navigation, chat API and core demo workflows work in the tested candidate. The site is **not fully clean**: supporting pages have reproducible accessibility defects, and Firefox exposes a real reset defect. Production API requests passed, but production browser automation was challenged by Cloudflare; challenge-page results are excluded from product pass/fail conclusions.

No production code was changed or deployed during this audit. Test harnesses were added only on `audit/portfolio-2026-11-07`. The movable Ella design remains in PR #35, not production.

## Tested versions and evidence

- Production: https://naveensharma.net/ — release `3e6634b`.
- Candidate: https://762f4c55.naveensharma-portfolio.pages.dev/ — `bb677c5`, PR #35.
- Browser/API run: https://github.com/naveensharmatech/portfolio/actions/runs/42385051130
- Lighthouse run: https://github.com/naveensharmatech/portfolio/actions/runs/42385242826
- Importable Postman collection: [portfolio.postman_collection.json](../../audit/portfolio.postman_collection.json).
- Browser suite: [site.spec.js](../../audit/site.spec.js).
- Raw JSON, screenshots and traces are in the workflow artifacts, retained for 14 days.

## Coverage and results

| Check | Result |
|---|---|
| Postman/Newman production | 12 requests, 24 assertions passed |
| Postman/Newman candidate | 12 requests, 24 assertions passed |
| Candidate Chromium | 15 scenario tests passed, 12 failed |
| Candidate WebKit | 15 passed, 12 failed |
| Candidate Firefox | 14 passed, 13 failed |
| Candidate responsive matrix | 9 routes × 2 themes × 6 widths × 3 engines = 324 route/theme/width combinations; no horizontal overflow in the Chromium evidence; supporting-page accessibility failures remain |
| Candidate local resources | All 82 unique collected same-origin resource URLs returned successfully in Chromium; PDF signatures and asset MIME checks passed |
| Production browser matrix | Cloudflare “Just a moment...” / HTTP 403 pages blocked reliable end-to-end checks; not counted as product failures |
| Regression suite before this expanded audit | 50 Chromium tests passed, including Ella elastic docking and touch dragging without footer scroll |
| Manual inspection by agent | Movable Ella preview, spring return, side switching, chat opening, standalone-page assistant, footer/contact links checked in remote desktop Chrome |

The 27 scenario groups per browser contain multiple assertions. A failed accessibility group does not mean every layout or every flow on that page failed.

Routes: home, intake builder, manufacturing, institute, QA certificates, Zapier expertise, Gmail demo, English HTML CV, Hebrew HTML CV. Additional certificate query variants were checked. Widths: 320, 390, 768, 1024, 1440, 1920 CSS pixels.

## What worked in the candidate

- Homepage layouts in both themes; no uncaught JavaScript errors in the Chromium route matrix.
- Desktop/mobile menus, expertise links, skip link, accordion controls and Ella Escape/focus behavior.
- Chat error handling, disabled send while pending, Markdown rendering and rejection of a javascript: reply link.
- Intake required fields, impossible/future date rejection, email rejection, conditional chronic-condition details, typed signature, mapped data, save result and Chromium/WebKit reset.
- Manufacturing sample handoff, accepted-share calculation, inconsistent-count rejection and editing.
- Certificate groups and referenced PDF documents.
- HTML CV print controls and assistant hidden for print.
- Real AI replies for a public professional question, a general webhook question and a Hindi greeting on both deployments. API health, malformed JSON, null body, missing/invalid/blank messages, privileged-only input and assistant-final messages behaved as expected. Responses were no-store.

## Confirmed findings and exact corrective actions

| Priority | Finding | Evidence | Corrective action |
|---|---|---|---|
| P1 | Dark-mode text becomes nearly unreadable on supporting pages | Institute cards: light text on white, about 1.1:1; Zapier certificate sections about 1.1–1.46:1; Gmail blockquote about 1.02:1. Intake and manufacturing also have failing labels/badges. Reproduced across the candidate's three engines. | Replace hard-coded white/pale surfaces and fixed dark text with paired light/dark theme colors; check selected tabs, rail headings, badges, required indicators and blockquotes. Rerun axe on each page in both themes. |
| P2 | Intake Reset fails in Firefox | After save → Reset, `#f_first` remains “Jordan” instead of empty. Existing handler uses `location.reload()`, which permits browser form restoration. | Explicitly reset field values, signature/canvas state, validation errors and result state. Do not rely solely on reload. Rerun the same Firefox scenario. |
| P2 | Manufacturing buttons use unsupported aria-selected | Three `button[data-tab]` elements are plain buttons carrying `aria-selected`; axe reports `aria-allowed-attr`. This is an accessibility failure, not a production-equipment risk. | Use a complete accessible tab pattern with roles and keyboard behavior, or use aria-pressed on the existing toggle buttons. |
| P2 | English/Hebrew HTML CV inline links rely on subtle color | axe `link-in-text-block` on the three selected-project links, in both themes. | Underline those inline links and provide a visible focus style without changing printed page dimensions unnecessarily. |
| P2 | Unknown URLs return the homepage with HTTP 200 | Request to `/__portfolio_audit_missing_20261107` returned 200 on both targets via HTTP checks. | Add a real 404 page and route handling while keeping known extensionless pages working. |
| P2 | Some homepage link accessible names omit the visible label | Lighthouse identifies “View full-size reference” links whose aria-label uses different wording. | Include the full visible wording in the accessible name, followed by the descriptive workflow name. |
| P2/P3 | Mobile lab responsiveness/image delivery needs improvement | Candidate Lighthouse performance 84, total blocking time 670 ms; image-delivery estimate about 1,042 KiB. Main artwork ~555 KB, systems image ~360 KB, Ella avatar ~220 KB despite small display size. | Produce appropriately sized WebP/AVIF variants, responsive srcset/sizes, and a small avatar/icon variant; profile/lazy-load noncritical JavaScript. Measure again under the same lab conditions. |
| P3 | HSTS is disabled on custom-domain response | Production header `Strict-Transport-Security: max-age=0; includeSubDomains`. Preview does not advertise HSTS. | Review HTTPS configuration and safely enable a suitable positive HSTS policy after confirming required subdomains support HTTPS. This audit did not change account security settings. |
| P3 | Supporting-page SEO metadata is incomplete | Candidate supporting pages lack canonical/social metadata; several lack descriptions; no structured data detected. | Add route-specific canonical URLs and descriptions, consistent social metadata, and appropriate factual structured data. Keep preview noindex enabled. |
| Verification gap | Production browser jobs are challenged | HTTP 403 and “Just a moment...” page title; axe meta-refresh and missing-control failures on those pages belong to the challenge, not the portfolio. | Establish an authorized test route/session or account-level automation policy with Cloudflare, then repeat the production smoke tests. Do not disable protections merely to obtain a green run. |

## Lighthouse: one mobile laboratory run per target

| Target | Performance | Accessibility score | Best practices | SEO | LCP | Blocking time | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| Production | 78 | 100 | 81 | 100 | 1.0 s | 1,030 ms | 0 |
| Candidate | 84 | 100 | 100 | 69 | 0.9 s | 670 ms | 0 |

These are single synthetic measurements, not real-user Core Web Vitals or a WCAG certificate. Production loaded its real application in this separate Lighthouse run, but Cloudflare's injected scripts contributed substantial execution time and deprecation warnings. The candidate SEO deduction is primarily its intentional `X-Robots-Tag: noindex`; this is correct for a preview and must not be treated as a production SEO regression. Lighthouse's homepage accessibility score does not cancel supporting-page axe findings or all unweighted manual checks.

## Limits and next action

This is a bounded functional/accessibility/performance/API audit, not load testing, penetration testing, authenticated third-party workflow execution or certification of physical iPhone Safari. External links were inventoried; third-party account actions, paid Apify runs, actual email delivery, and client/employer systems were not executed. Browser printing controls and print CSS were checked; no physical printer was used. Cloudflare account rules and provider billing/rate limits were not independently inspected. The handler has input checks but no visible in-code per-visitor rate limiter; any edge protection remains unverified.

**Next action:** fix the confirmed supporting-page contrast and Firefox Reset defects first, then ARIA/link/404 issues; rerun failed scenarios before merging PR #35. Retain this suite as the broader quality gate. No additional manual testing by Naveen is required to reproduce these defects.
