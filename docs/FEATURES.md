# Features

## Ella – AI chat assistant
A chat widget in `src/App.jsx` posts to `/api/chat`, a Cloudflare Pages Function (`functions/api/chat.js`) that calls the Groq API (`llama-3.1-8b-instant`) with a system prompt grounded in Naveen's background, projects and services. `GET /api/chat` serves as a simple health check. The API key is stored as the `GROQ_API_KEY` environment variable and never reaches the browser.

## Case studies and projects
`FEATURED_PROJECTS` holds flagship work, each with a description, architecture flow, skills and links:

- **AI-Powered Customer Inquiry Router** – Zapier + HubSpot + JavaScript routing.
- **B2B Leads Scraper** – Apify Actor using Crawlee to extract verified emails and phones.
- **Shopify Store Lead Extractor** – Python Apify Actor with app fingerprinting and catalog signals.

`EARLIER_PROJECTS` lists smaller and certification projects.

## Certifications
`CERTIFICATIONS` groups Zapier Academy, QA/testing and software engineering certificates.

## Other sections
Experience, skills, career timeline, LinkedIn reviews, FAQs, legal documents, and contact with CV download.

## Navigation
Anchor-based (`#about`, `#certifications`, ...). There is no client-side router.
