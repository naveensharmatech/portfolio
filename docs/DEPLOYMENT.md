# Portfolio Deployment Guide

## Cloudflare Pages Setup

1. Connect GitHub repo to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output: `dist`
4. Add environment variable: `GROQ_API_KEY`

## Auto-Deploy

Every push to main triggers automatic rebuild:

```bash
git push origin main
# → Deployed in 1-2 minutes
```

## Environment Variables

- `GROQ_API_KEY` - For Ella AI assistant
