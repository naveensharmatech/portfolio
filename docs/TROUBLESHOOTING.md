# Troubleshooting

| Problem | Fix |
|---------|-----|
| `npm run dev` fails | Use Node 18+, delete `node_modules`, rerun `npm install`. |
| Port 5173 in use | Vite picks the next port, or run `npm run dev -- --port 3000`. |
| Cloudflare build fails | Confirm build command `npm run build`, output `dist`, and Node 18+. Check the build log. |
| Ella doesn't respond | Confirm `GROQ_API_KEY` is set for the right environment (Production/Preview) and redeploy. Check the Pages Functions logs. `/api/chat` doesn't exist under plain `vite dev`; use `npx wrangler pages dev dist` to test it locally. |
| Content change not visible | Hard-refresh; confirm the deployment finished in Cloudflare. |
| Missing image or CV | Check the filename and case in `public/`. |
| Anchor link doesn't scroll | Ensure the section `id` matches the `href` in `NAV_LINKS`. |
