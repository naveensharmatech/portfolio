# Repository guidance

## Commands

Use Node.js 22.12+ and `npm ci`. Run `npm run build`, `npm run test:chat`, and
`npm run test:acceptance`. The acceptance suite uses Chromium and axe.

## Architecture

`src/App.jsx` contains the main portfolio layout and content.
`src/RestoredContent.jsx` contains additional sections and Ella's UI.
`src/index.css` and `tailwind.config.js` define the system light/dark theme.
Navigation uses section anchors; interactive demos and certificate pages live
in `public/`. Do not replace the current design with archived implementations.

Ella's Cloudflare Pages Function is `functions/api/chat.js`; public knowledge
lives in `data/ella-knowledge.js`. Keep it aligned with site content and
`docs/career/experience-source-of-truth.md`. Never invent career metrics or secrets.

## Release

Commit changes to `main` after validation. Cloudflare Pages builds with
`npm run build` and serves `dist`. Confirm the deployment check and custom-domain
result before reporting release complete. See `docs/DEPLOYMENT.md`.
