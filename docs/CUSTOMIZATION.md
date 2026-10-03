# Customization

All content lives in data constants near the top of `src/App.jsx`; section components render directly from them.

| What to change | Constant |
|----------------|----------|
| Navigation | `NAV_LINKS` |
| Work history | `EXPERIENCES` |
| Flagship projects / case studies | `FEATURED_PROJECTS` |
| Smaller projects | `EARLIER_PROJECTS` |
| Certifications | `CERTIFICATIONS` |
| Skills | `SKILL_GROUPS` |
| Reviews | `LINKEDIN_REVIEWS` |
| FAQs | `FAQS` |
| Ella quick-question chips | `QUICK_QUESTIONS` |
| Legal pages | `LEGAL_DOCS` |

## Styling

Tailwind utility classes only. Global CSS (smooth scroll, system font stack) is in `src/index.css`. Theme extensions go in `tailwind.config.js`. Icons come from `lucide-react`.

## Static assets

Files in `public/` (logo, cover image, CV PDF) are served from the site root. Replace a file with the same name to update it.

## Ella

Edit the system prompt in `functions/api/chat.js`, and keep it consistent with the site content. See [FEATURES.md](FEATURES.md).
