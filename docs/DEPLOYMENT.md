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

The current portfolio UI is static and needs no API key. The retained
`functions/api/chat.js` endpoint requires a server-side `GROQ_API_KEY` only if that
endpoint is used; never expose it to the client.
