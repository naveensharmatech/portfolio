# Setup Guide

1. Install Node.js 18+.
2. Clone and install:
   ```bash
   git clone https://github.com/naveensharmatech/portfolio.git
   cd portfolio
   npm install
   ```
3. Start the dev server: `npm run dev` (http://localhost:5173).
4. Build for production: `npm run build`; preview with `npm run preview`.

There is no test suite or linter; `npm run build` is the check.

To test Ella locally, build and run `npx wrangler pages dev dist` with `GROQ_API_KEY` set in a `.dev.vars` file (do not commit it).

Next: [adding projects](adding-projects.md), [updating content](updating-content.md), [deployment](../docs/DEPLOYMENT.md).
