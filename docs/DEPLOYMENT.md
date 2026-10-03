# Deployment

The site is deployed to Cloudflare Pages at https://naveensharma.net.

## Settings

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Output directory | `dist` |
| Framework preset | Vite (React) |
| Node.js | 18+ |

## Procedure

1. Push to `main`. Cloudflare Pages builds and deploys automatically (1–2 minutes).
2. Pull requests and other branches get preview URLs.
3. Verify locally first: `npm run build && npm run preview`.

## Environment variables

| Name | Purpose |
|------|---------|
| `GROQ_API_KEY` | Used by `functions/api/chat.js` (Ella chat). Set under Pages → Settings → Environment variables. Never commit it. |

## Rollback

In Cloudflare Pages → Deployments, pick a previous successful deployment and choose **Rollback**, or revert the commit on `main`.

## Custom domain

Add the domain under Pages → Custom domains. DNS is managed in Cloudflare.
