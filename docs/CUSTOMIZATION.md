# Updating the current portfolio

| Change | Source |
| --- | --- |
| Hero, nav, projects, experience, qualifications, tools | `src/App.jsx` (lowercase `projects`, `qualifications`, `tools`, plus inline experience records) |
| Workflow gallery, experiments, additional work, story details, Ella UI | `src/RestoredContent.jsx` |
| Main theme, type and motion | `src/index.css`, `tailwind.config.js` |
| Standalone page theme and motion | `public/portfolio-theme.css` |
| Intake demo and its actual interaction code | `public/intake-builder-demo.html` (inline script) |
| Manufacturing interaction | `public/manufacturing-demo.html`, `public/experience-demo.js`, `public/experience-demo-model.js` |
| Academy experience | `public/institute-demo.html` |
| Certificate navigation | `public/certifications.html`, `public/zapier-expertise.html` |
| Ella’s facts | `data/ella-knowledge.js` |
| Ella behavior/provider/fallback | `functions/api/chat.js` |
| Public résumé text | `public/cv.html`, `public/cv-he.html`, plus both corresponding PDF files |
| README visuals | `docs/assets/portfolio-banner.svg`, `docs/assets/workflow-motion.gif`; both repo and profile READMEs |

Before changing biography, consult `docs/career/experience-source-of-truth.md` and the user’s latest corrections. Keep implementation as Bolt’s primary function; retain genuine validation duties. Never invent metrics. Use completed Zapier paths rather than a certification count.

When a career fact changes, update main content, Ella, CV HTML/PDF files and both READMEs together where applicable. Original certificate and academic evidence should remain original. PDF downloads are static; `npm run build` does not regenerate them.

Run `npm run check:content`, `npm run build`, `npm run test:chat` and `npm run test:acceptance`. Follow `docs/DEPLOYMENT.md` for preview and release checks. Superseded code and unused media are removed rather than archived. Git commit history retains prior revisions.
