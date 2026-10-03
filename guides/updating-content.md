# Updating Content

1. Find the relevant constant in `src/App.jsx` (see [CUSTOMIZATION.md](../docs/CUSTOMIZATION.md)).
2. Edit the text, keeping the object shape unchanged.
3. Run `npm run dev` and check the section.
4. Run `npm run build` to confirm it compiles.
5. Commit and push to `main`; Cloudflare Pages deploys automatically.

Tips:
- Replace the CV by overwriting the PDF in `public/` with the same filename.
- Keep Ella's system prompt (`functions/api/chat.js`) in sync with site facts.
