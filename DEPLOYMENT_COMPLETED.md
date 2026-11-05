# Historical portfolio release — 8–9 October 2026

> Archived release evidence for commit `c0e214b`. This is not the current deployment status or a summary of the current website. For today’s project overview, use the [README](README.md) and [naveensharma.net](https://naveensharma.net/). Current website source lives in [src/App.jsx](src/App.jsx), [src/RestoredContent.jsx](src/RestoredContent.jsx), [functions/api/chat.js](functions/api/chat.js) and [data/ella-knowledge.js](data/ella-knowledge.js).

PR #27 merged on 8 October 2026 at commit `c0e214b`. Cloudflare Pages check
113209859952 deployed that commit successfully. On 9 October, the custom domain
served the same JavaScript and CSS asset filenames as that deployment.

The merge commit passed the dependency audit, production build, chat handler
test, 30 Chromium acceptance tests and CodeQL. These checks do not establish
physical-device behavior or independent WCAG certification.

See [deployment guidance](docs/DEPLOYMENT.md) and
[validation coverage](MOBILE_OPTIMIZATION.md) for the actual procedure and limits.
