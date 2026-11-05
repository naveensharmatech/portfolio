# Current portfolio features

- Green light/dark theme, readable type, responsive navigation and résumé links.
- Dimensional navigation and card hover/focus feedback, with reduced-motion support.
- Personal projects, paid implementation experience, learning references and work in progress labelled separately.
- Interactive fictional-data intake/mapping/signature demo, manufacturing handoff and academy experience pages.
- Qualification pages, original supporting certificates and academic documents.
- Ella’s React UI calls `/api/chat`, implemented by Cloudflare Pages Functions.
- The current AI model is `openai/gpt-oss-20b` through Groq. Live responses/search depend on provider configuration and availability.
- When live AI fails, the endpoint returns explicitly labelled saved public knowledge. No uptime or universal answer-quality guarantee is claimed.

The main app and standalone pages share the green visual direction. Standalone pages load `public/portfolio-theme.css`; they do not inherit React CSS automatically. README graphics illustrate the work; they do not run website JavaScript.
