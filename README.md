# 💻 Naveen Sharma — Professional Portfolio

<div align="center">

[![Live Site](https://img.shields.io/badge/🌐%20Live%20Site-naveensharma.net-2563eb?style=for-the-badge)](https://naveensharma.net)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-Deployed-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)

**Healthcare SaaS Implementation Specialist · Systems Configuration · Workflow Automation · QA/UAT**

---

### 🎯 A professional portfolio built to showcase expertise, attract recruiters, and deliver B2B services through Opility.

[Explore Live Site](#-live-demo) • [Features](#-features) • [Quick Start](#-quick-start) • [Deploy](#-deployment)

</div>

---

## 🌟 About This Project

A **modern, professional portfolio website** that positions Naveen Sharma as a Healthcare SaaS Implementation Specialist while simultaneously serving as a B2B contracting platform for [Opility](https://opility.com).

### ✨ Key Positioning

- **For Recruiters:** Showcase 7+ years of SaaS implementation experience, 25+ healthcare agencies served, 500+ form workflows configured
- **For Clients:** Professional B2B services in SaaS implementation, QA, technical documentation, and career services via Opility
- **24/7 AI Support:** Ella, an AI assistant powered by Groq's Llama 3, answers visitor questions about Naveen's expertise, experience, and services

---

## 🚀 Features

### 🎨 Professional Design
- **Responsive & Mobile-First** — Works flawlessly on desktop, tablet, and mobile
- **Modern UI** — Clean, minimalist design with professional cards, smooth animations, and visual hierarchy
- **Accessibility** — Semantic HTML, ARIA labels, keyboard navigation, dark/light mode ready
- **Performance** — Optimized bundle size, lazy loading, smooth scroll-reveal effects

### 💡 Core Sections

| Section | Description |
|---------|-------------|
| **Hero** | Eye-catching introduction with orbiting role badges, headline, CTA buttons, and key stats |
| **About** | Professional summary positioning as SaaS specialist + B2B contractor |
| **Expertise** | 8 core competencies with icons and descriptions |
| **Process** | 4-step implementation methodology (Discover → Configure → Validate → Support) |
| **Experience** | Detailed work history from Bolt Healthcare, Vishay, and Shivam Institute |
| **Case Studies** | Real-world implementation challenges, solutions, and outcomes |
| **Projects** | Interactive demo, QA certifications, Django CMS, and this portfolio |
| **Tools** | Professional tooling across SaaS, dev, AI, and design |
| **Education** | Degrees, certifications, and professional training |
| **FAQ** | Common questions from recruiters and hiring managers |
| **Contact** | Email, phone, location, and social links |

### 🤖 AI Chat Assistant (Ella)

A **full-stack AI assistant** built into the bottom-right corner:

- **Powered by:** Groq's Llama 3.1 LLM
- **Frontend:** React chat widget with message history
- **Backend:** Cloudflare Pages serverless functions
- **Knowledge Base:** Custom system prompt grounded on Naveen's professional background
- **24/7 Availability:** Live, instant responses to visitor questions

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=flat)
![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white&style=flat)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white&style=flat)
![Lucide React](https://img.shields.io/badge/-Lucide%20Icons-F97316?logo=lucide&logoColor=white&style=flat)

### Backend & Infrastructure
![Cloudflare Pages](https://img.shields.io/badge/-Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white&style=flat)
![Cloudflare Workers](https://img.shields.io/badge/-Workers%20Functions-F38020?logo=cloudflare&logoColor=white&style=flat)
![Groq API](https://img.shields.io/badge/-Groq%20LLM-gray?style=flat)

### Development Tools
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=flat)
![npm](https://img.shields.io/badge/-npm-CB3837?logo=npm&logoColor=white&style=flat)
![Git](https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white&style=flat)
![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white&style=flat)

</div>

### Why This Stack?

- **React + Vite** — Fast HMR, minimal config, optimized production builds
- **Tailwind CSS** — Utility-first styling, responsive design, minimal CSS
- **Lucide React** — Crisp, customizable icons (60+ used across the site)
- **Cloudflare Pages** — Edge-hosted, automatic deployments from GitHub, serverless functions included
- **Groq API** — Fast LLM inference for real-time AI chat responses

---

## 📂 Project Structure

```
naveensharma-portfolio/
├── src/
│   ├── App.jsx                 # Main app component (entire SPA in one file)
│   ├── index.css               # Custom CSS (smooth scroll, font stack)
│   └── main.jsx                # React entry point
├── functions/
│   └── api/
│       └── chat.js             # Cloudflare Functions: Groq API integration for Ella
├── public/                      # Static assets
│   ├── headshot-round.png      # Profile photo
│   ├── linkedin-cover.jpeg     # Hero banner
│   ├── ella-avatar.png         # Ella chatbot avatar
│   ├── nav-logo.png            # Navbar logo
│   └── Naveen_Sharma_CV.pdf    # Downloadable CV
├── index.html                   # HTML entry point
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── package.json                # Dependencies & scripts
└── README.md                   # This file

```

### Single-File Architecture

The entire React application lives in **`src/App.jsx`**:

1. **Data constants** (lines 1–350) — all visible content defined as JS objects
2. **Helper components** (lines 350–700) — Reveal, Navbar, Hero, About, etc.
3. **EllaChat component** (lines 1200–1400) — AI assistant widget
4. **App export** (line 1428) — assembles the page

**Why this approach?**
- Simple, no build complexity
- Easy to update content (edit data constants)
- Smooth scroll-reveal animations
- Zero routing overhead

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 16.x
- **npm** or **pnpm**
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/naveensharmatech/naveensharma-portfolio.git
cd naveensharma-portfolio

# Install dependencies
npm install
```

### Local Development

```bash
# Start development server (http://localhost:5173)
npm run dev

# Open http://localhost:5173 in your browser
# Hot Module Replacement (HMR) enables instant updates as you edit
```

### Production Build

```bash
# Create optimized production build → dist/
npm run build

# Preview production build locally
npm run preview
```

---

## 🚢 Deployment

This site is deployed to **[Cloudflare Pages](https://pages.cloudflare.com)** for global edge performance.

### Deployment Settings

| Setting | Value |
|---------|-------|
| **Repository** | `github.com/naveensharmatech/naveensharma-portfolio` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Framework** | Vite (React) |
| **Node.js Version** | 18.x |

### Auto-Deploy from GitHub

Every push to `main` triggers an automatic rebuild and deployment:

```bash
git add .
git commit -m "Update: [description]"
git push origin main
# → Cloudflare Pages automatically builds and deploys within 1-2 minutes
```

### Environment Variables (for Ella AI Chat)

To enable the AI chat assistant, configure these environment variables in Cloudflare Pages:

```
GROQ_API_KEY=your-groq-api-key-here
```

**How to get a Groq API key:**
1. Sign up at [console.groq.com](https://console.groq.com)
2. Navigate to **API Keys**
3. Create a new API key
4. Add it to Cloudflare Pages **Settings → Environment Variables**

---

## 🤖 Ella: The AI Chat Assistant

### How It Works

```
User Message
    ↓
React Chat Widget (App.jsx)
    ↓
POST /api/chat (Browser)
    ↓
Cloudflare Workers Function (functions/api/chat.js)
    ↓
Groq API (Llama 3.1 LLM)
    ↓
Streamed Response
    ↓
Chat Display (Real-time UI update)
```

### System Prompt

Ella is grounded on a comprehensive knowledge base covering:

- Naveen's professional background, skills, and experience
- Case studies and real-world project details
- Opility services and B2B offerings
- Contact information and availability
- Frequently asked questions

### Customization

To update Ella's personality or knowledge base:

1. Edit the `SYSTEM_PROMPT` constant in `functions/api/chat.js`
2. Redeploy to Cloudflare Pages
3. Changes are live immediately

---

## 📊 Key Stats

| Metric | Value |
|--------|-------|
| **Professional Experience** | 7+ years |
| **Healthcare SaaS Years** | ~4 years |
| **Form Workflows Deployed** | 500+ |
| **Healthcare Agencies Served** | 25+ |
| **Supported Service Lines** | Home Care, ABA, HCBS, Developmental Disability |
| **Support Tier** | Tier 2/3 Technical Support |
| **Availability** | Full-time, Hybrid, Remote |
| **Tech Certifications** | 6+ (QA, Software Engineering, Automation, etc.) |

---

## 🔗 Related Projects

- **[Opility](https://opility.com)** — B2B services platform (SaaS implementation, QA, career services)
- **[hub.naveensharma.net](https://hub.naveensharma.net)** — Opility learning & courses platform (Next.js, PWA)
- **[Implementation Workbench](https://naveensharma.net/intake-builder-demo.html)** — Interactive SaaS demo
- **[Customer Inquiry Router](https://github.com/naveensharmatech/customer-inquiry-router-zapier)** — Zapier + Node.js integration

---

## 📝 Content Management

All visible content is defined as **data constants** at the top of `src/App.jsx`. To update:

### Update Navigation Links
```javascript
const NAV_LINKS = [
  { label: "About", href: "#about", icon: Search, color: "indigo" },
  // ... add more links
];
```

### Update Experience Section
```javascript
const EXPERIENCES = [
  {
    company: "Your Company",
    period: "2024 – Present",
    roles: ["Your Role"],
    points: [{ label: "Achievement", text: "Description" }],
  },
];
```

### Update Projects
```javascript
const PROJECTS = [
  {
    icon: Code2,
    title: "Project Title",
    tag: "Project Type",
    desc: "Description",
    skills: ["Skill1", "Skill2"],
    links: [{ href: "url", label: "View" }],
  },
];
```

All components automatically render from these constants — **no need to touch JSX**.

---

## 🎯 Best Practices

### Performance
- ✅ Lazy-loaded images with fallbacks
- ✅ Minimal JavaScript bundle (React + Vite = ~35KB gzipped)
- ✅ Tailwind CSS purging unused styles
- ✅ Edge-cached globally via Cloudflare

### Accessibility
- ✅ Semantic HTML (`<section>`, `<nav>`, `<article>`)
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation throughout
- ✅ Color contrast ratios meet WCAG AA

### SEO
- ✅ Meta tags for OpenGraph (social sharing)
- ✅ Canonical URLs
- ✅ Structured headings hierarchy
- ✅ Fast Core Web Vitals (Cloudflare edge)

### Security
- ✅ CSP headers configured via Cloudflare
- ✅ No third-party trackers or ads
- ✅ HTTPS enforced globally
- ✅ Secrets stored in Cloudflare environment variables (never in code)

---

## 🤝 Contributing

This is a personal portfolio, but feedback is welcome!

### Suggestions?

- Report bugs: [contact@naveensharma.net](mailto:contact@naveensharma.net)
- Connect on LinkedIn: [@naveensharmatech](https://linkedin.com/in/naveensharmatech)
- Follow on GitHub: [@naveensharmatech](https://github.com/naveensharmatech)

---

## 📄 License & Attribution

**© 2026 Naveen Sharma. All Rights Reserved.**

This portfolio and its code are the intellectual property of Naveen Sharma. Reproduction or reuse without prior written permission is prohibited.

**Built with:**
- 💙 React 18 + Vite
- 🎨 Tailwind CSS
- 🤖 Groq Llama 3.1 LLM
- ☁️ Cloudflare Pages

---

## 💬 Let's Connect

<div align="center">

| Channel | Link |
|---------|------|
| 📧 **Email** | [contact@naveensharma.net](mailto:contact.naveensharma@gmail.com) |
| 🌐 **Portfolio** | [naveensharma.net](https://naveensharma.net) |
| 💼 **B2B Services** | [opility.com](https://opility.com) |
| 💼 **LinkedIn** | [@naveensharmatech](https://linkedin.com/in/naveensharmatech) |
| 🐙 **GitHub** | [@naveensharmatech](https://github.com/naveensharmatech) |
| 🐦 **X (Twitter)** | [@NaveenSharmaX](https://x.com/NaveenSharmaX) |
| 📱 **Phone** | [+972-58-789-6289](tel:+972587896289) |

</div>

---

<div align="center">

### 🌟 Built by Naveen Sharma — AI Automation Eng SaaS Implementation Specialist

**Available for full-time, hybrid, and remote roles. Interested in B2B services?** Visit [Opility](https://opility.com)

</div>
