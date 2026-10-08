# Portfolio Deployment Guide

## Cloudflare Pages Setup

1. Connect `naveensharmatech/portfolio` to Cloudflare Pages using Git integration.
2. Select `main` as the production branch and Vite as the framework preset.
3. Leave the root directory at the repository root.
4. Set build command: `npm run build`.
5. Set build output directory: `dist`.
6. Use Node.js 22.12+ (the current Vite toolchain requires it).
7. Keep credentials in Cloudflare environment variables, never in source or
   `VITE_*` variables, which are included in browser bundles.

## Auto-Deploy

After reviewing and merging the mobile optimization PR into `main`, a connected
Cloudflare Pages project with automatic deployments enabled rebuilds production.
This requires the existing Cloudflare project to be connected; merging alone
does not configure it.

```bash
npm ci
npm run build
npm run preview
```

Feature-branch preview deployments can be enabled in Cloudflare Pages to verify
changes before merging. No Wrangler install or Vite minifier changes are needed.

## Production Verification

1. Confirm the production deployment succeeded in Cloudflare Pages and corresponds
   to the merged commit.
2. Open https://naveensharma.net and verify the navigation, résumé, project links,
   and contact links.
3. Follow the [mobile and accessibility checklist](../MOBILE_OPTIMIZATION.md),
   including light/dark preferences and keyboard navigation.
4. Check real iOS/Android devices, including landscape orientation and safe areas.
5. If verification fails, use Cloudflare Pages' rollback to the last successful
   production deployment.

## Ella chat

The React UI calls the Cloudflare Pages Function at `/api/chat`. Vite's local
preview serves static files only and does not run this endpoint. Deploy the
repository with Pages Functions, including `functions/` and `data/`, to test it.

Set `GROQ_API_KEY` as a server-side secret separately for preview and production
for live AI replies. Without a working key or when the provider fails, the
endpoint returns saved public profile knowledge; the UI labels that fallback.
Never expose the key through `VITE_*` variables or browser source.

Verify GET `/api/chat` returns JSON, then send a public profile question from
Ella's UI. Check that a reply arrives, the send button recovers, and keyboard
focus returns to the input. Test fallback locally with the Function handler and
no key; do not remove production secrets to simulate failure.
