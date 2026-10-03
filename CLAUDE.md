# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server (localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

There is no test suite and no linter configured.

## Architecture

This is a single-page React portfolio site. The entire application lives in **`src/App.jsx`** — there are no separate component files, no routing, and no state management library.

**Structure of `src/App.jsx`:**

1. **Data constants** (top of file) — all visible content is defined as plain JS arrays/objects:
   - `NAV_LINKS`, `HEADLINES`, `EXPERTISE`, `EXPERIENCES`, `CASE_STUDIES`, `SERVICES`, `PROJECTS`, `TOOL_CATEGORIES`
2. **Section components** — each section is a self-contained function component that maps over the relevant data constant
3. **`App()` default export** — assembles sections in page order: `Navbar → Hero → TrustBar → About → Expertise → Experience → CaseStudies → Services → Projects → Tools → BrandVideo → Contact → Footer`

Navigation is anchor-based (`#about`, `#expertise`, etc.) — no client-side router.

## Styling

Tailwind CSS 4 runs through `@tailwindcss/postcss`. Sources and class-based dark mode are configured in `src/index.css`, alongside custom styles. There is no `tailwind.config.js`; Autoprefixer is not needed.

Icons come exclusively from `lucide-react`.

## Static assets (`public/`)

- `freelancehub-logo.png` — navbar and footer logo
- `linkedin-cover.jpeg` — hero banner image
- `Naveen Sharma General CV.pdf` — linked as a download in Hero and Contact sections

## Content updates

To update any displayed content, edit the relevant data constant near the top of `src/App.jsx`. The components render directly from those constants — no CMS or external data source.

## Deployment

Deployed to Cloudflare Pages. Build command: `npm run build`. Output directory: `dist`. Live site: https://naveensharma.net
