"use client";

import { RestoredContent, EllaChat, Approach, AboutDetails } from "./RestoredContent";

import { useState } from "react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Bot, ChevronDown, Code2, FileCheck2,
  Github, Linkedin, Menu, Workflow, X,
} from "lucide-react";

const tools = [
  {
    "name": "Zapier",
    "logo": "/tool-logos/zapier.svg"
  },
  {
    "name": "Claude",
    "logo": "/tool-logos/claude.svg"
  },
  {
    "name": "HubSpot",
    "logo": "/tool-logos/hubspot.svg"
  },
  {
    "name": "GitHub",
    "logo": "/tool-logos/github.svg"
  },
  {
    "name": "Cloudflare",
    "logo": "/tool-logos/cloudflare.svg"
  },
  {
    "name": "Apify",
    "logo": "/tool-logos/apify_logo.svg"
  },
  {
    "name": "GitHub Copilot",
    "logo": "/tool-logos/github-copilot.svg"
  },
  {
    "name": "Google AI Studio",
    "logo": "/tool-logos/google-aistudio.svg"
  },
  {
    "name": "Basecamp",
    "logo": "/tool-logos/basecamp.svg"
  },
  {
    "name": "Make",
    "logo": "/tool-logos/make-color.svg"
  },
  {
    "name": "n8n",
    "logo": "/tool-logos/n8n.svg"
  },
  {
    "name": "Crawlee",
    "logo": "/tool-logos/crawlee-logo.svg"
  },
  {
    "name": "BeautifulSoup",
    "logo": "/tool-logos/beautifulsoup.jpg"
  },
  {
    "name": "ChatGPT",
    "logo": "/tool-logos/openai.svg"
  },
  {
    "name": "Google Gemini",
    "logo": "/tool-logos/google-gemini.svg"
  },
  {
    "name": "ElevenLabs",
    "logo": "/tool-logos/elevenlabs.svg"
  },
  {
    "name": "Gmail",
    "logo": "/tool-logos/google-gmail.svg"
  },
  {
    "name": "Jira",
    "logo": "/tool-logos/jira.svg"
  },
  {
    "name": "Google Workspace",
    "logo": "/tool-logos/google-workspace.svg"
  },
  {
    "name": "Canva",
    "logo": "/tool-logos/canva.svg"
  },
  {
    "name": "Postman",
    "logo": "/tool-logos/postman.svg"
  },
  {
    "name": "Firebase",
    "logo": "/tool-logos/firebase.svg"
  },
  {
    "name": "Python (AI-assisted)",
    "logo": "/tool-logos/python.svg"
  },
  {
    "name": "JavaScript (AI-assisted)",
    "logo": "/tool-logos/javascript.svg"
  },
  {
    "name": "Node.js (AI-assisted)",
    "logo": "/tool-logos/nodejs.svg"
  },
  {
    "name": "JSON",
    "logo": "/tool-logos/json.svg"
  }
];

const qualifications = [
  {
    "category": "Education",
    "items": [
      {
        "title": "Bachelor of Computer Applications (BCA)",
        "organization": "Amity University Online",
        "status": "Completed"
      }
    ]
  },
  {
    "category": "Certifications",
    "items": [
      {
        "title": "Zapier Academy — all courses completed",
        "organization": "AI Builder · MCP · Account Admin Essentials",
        "status": "Completed"
      },
      {
        "title": "QA qualification",
        "organization": "Smart College",
        "status": "Completed"
      },
      {
        "title": "JSM Fundamentals with AI",
        "organization": "Atlassian",
        "status": "Completed"
      }
    ]
  },
  {
    "category": "Currently Learning",
    "items": [
      {
        "title": "Make Academy · n8n Academy · HubSpot",
        "organization": "Automation and CRM",
        "status": "In progress"
      },
      {
        "title": "OpenAI · Anthropic · Postman",
        "organization": "AI tools and API testing",
        "status": "In progress"
      },
      {
        "title": "Airtable · Salesforce · Asana",
        "organization": "Business platforms",
        "status": "In progress"
      },
      {
        "title": "Microsoft Learn · GitHub Learn · Google Skills · Coursera",
        "organization": "Continuing professional development",
        "status": "In progress"
      }
    ]
  }
];

const projects = [
  {
    number: "01",
    type: "Workflow automation · Public project",
    title: "Customer Inquiry Router",
    description: "A published project that classifies incoming inquiries and routes them to the right follow-up workflow.",
    stack: ["Zapier", "Claude API", "HubSpot", "JavaScript"],
    href: "https://github.com/naveensharmatech/customer-inquiry-router-zapier",
  },
  {
    number: "02",
    type: "Data extraction · Published product",
    title: "B2B Lead Generator",
    description: "A published Apify actor for discovering businesses and structuring publicly available company contact data.",
    stack: ["Apify", "Crawlee", "Node.js"],
    href: "https://apify.com/opility/b2b-leads-scraper-1-5-1k-leads-emails-phones",
  },
  {
    number: "03",
    type: "Data extraction · Published product",
    title: "Shopify Store Lead Extractor",
    description: "A published actor that gathers public store details and organizes them for research workflows.",
    stack: ["Python", "Apify", "BeautifulSoup"],
    href: "https://apify.com/opility/shopify-store-lead-extractor-emails-catalog-size-apps",
  },
];

const capabilities = [
  { icon: Workflow, title: "SaaS implementation", text: "Configure forms, workflows, integrations, and data mappings around real operating requirements." },
  { icon: FileCheck2, title: "QA & UAT", text: "Check workflow behavior, validate outputs, document acceptance scenarios, and communicate issues clearly." },
  { icon: Bot, title: "Workflow automation", text: "Connect business tools with practical automations using platforms such as Zapier, Make, and n8n." },
  { icon: Code2, title: "Technical operations", text: "Document systems, validate APIs, troubleshoot issues, and make handoffs easier to maintain." },
  { icon: Code2, title: "API & System Integration", text: "Connect applications and services through APIs, webhooks, and reliable data flows." },
  { icon: Bot, title: "AI Chatbots & Assistants", text: "Build useful AI-powered assistants that answer questions and support repeatable workflows." },
  { icon: Code2, title: "AI-Assisted Development", text: "Use AI development tools to prototype, build, and improve practical software solutions." },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expertiseOpen, setExpertiseOpen] = useState(false);
  const [mobileExpertiseOpen, setMobileExpertiseOpen] = useState(false);

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setMobileExpertiseOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f7f4] text-[#172321] selection:bg-[#c5f16b] selection:text-[#172321]">
      <a href="#top" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:p-4">Skip to content</a>
      <header className="sticky top-0 z-50 border-b border-[#172321]/10 bg-[#f6f7f4]/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 md:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="Naveen Sharma home">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#172321] text-sm font-bold text-[#c5f16b]">NS</span>
            <span className="text-sm font-semibold tracking-tight">Naveen Sharma<span className="ml-2 text-[#71807b]">/ Portfolio</span></span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            <a href="#projects" className="text-sm text-[#52615c] transition hover:text-[#172321]">Projects</a>
            <a href="#experience" className="text-sm text-[#52615c] transition hover:text-[#172321]">Experience</a>
            <div className="relative">
              <button type="button" className="flex items-center gap-1 text-sm text-[#52615c] transition hover:text-[#172321]" aria-expanded={expertiseOpen} onClick={() => setExpertiseOpen(!expertiseOpen)}>
                Expertise <ChevronDown size={15} className={`transition-transform ${expertiseOpen ? "rotate-180" : ""}`}/>
              </button>
              {expertiseOpen && <div className="absolute left-0 top-full z-20 mt-3 w-48 rounded-xl border border-[#172321]/10 bg-white p-2 shadow-lg">
                {[["Capabilities", "#capabilities"], ["Tools & Platforms", "#tools"], ["Qualifications", "#qualifications"]].map(([label, href]) => <a key={href} href={href} onClick={() => setExpertiseOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-[#52615c] hover:bg-[#f0f3ef] hover:text-[#172321]">{label}</a>)}
              </div>}
            </div>
            <a href="#about" className="text-sm text-[#52615c] transition hover:text-[#172321]">About</a>
            <a href="#contact" className="text-sm text-[#52615c] transition hover:text-[#172321]">Contact</a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a href="https://www.linkedin.com/in/naveensharmatech" target="_blank" rel="noreferrer" className="rounded-full p-2 text-[#52615c] hover:bg-white" aria-label="LinkedIn"><Linkedin size={18}/></a>
            <a href="/Naveen_Sharma_CV.pdf" className="rounded-full bg-[#172321] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#30443e]">View résumé <ArrowUpRight className="ml-1 inline" size={15}/></a>
          </div>
          <button className="rounded-lg p-2 md:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => { setMenuOpen(!menuOpen); setMobileExpertiseOpen(false); }}>{menuOpen ? <X/> : <Menu/>}</button>
        </div>
        {menuOpen && <nav className="flex flex-col gap-1 border-t border-[#172321]/10 px-5 py-4 md:hidden" aria-label="Mobile navigation">
          <a href="#projects" onClick={closeMobileMenu} className="rounded-lg px-3 py-3 text-sm hover:bg-white">Projects</a>
          <a href="#experience" onClick={closeMobileMenu} className="rounded-lg px-3 py-3 text-sm hover:bg-white">Experience</a>
          <button type="button" className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm hover:bg-white" aria-expanded={mobileExpertiseOpen} onClick={() => setMobileExpertiseOpen(!mobileExpertiseOpen)}>
            Expertise <ChevronDown size={16} className={`transition-transform ${mobileExpertiseOpen ? "rotate-180" : ""}`}/>
          </button>
          {mobileExpertiseOpen && <div className="ml-3 flex flex-col border-l border-[#172321]/10 pl-3">
            {[["Capabilities", "#capabilities"], ["Tools & Platforms", "#tools"], ["Qualifications", "#qualifications"]].map(([label, href]) => <a key={href} href={href} onClick={closeMobileMenu} className="rounded-lg px-3 py-2 text-sm text-[#52615c] hover:bg-white">{label}</a>)}
          </div>}
          <a href="#about" onClick={closeMobileMenu} className="rounded-lg px-3 py-3 text-sm hover:bg-white">About</a>
          <a href="#contact" onClick={closeMobileMenu} className="rounded-lg px-3 py-3 text-sm hover:bg-white">Contact</a>
          <a href="/Naveen_Sharma_CV.pdf" onClick={closeMobileMenu} className="mt-2 rounded-lg bg-[#172321] px-4 py-3 text-center text-sm font-semibold text-white">View résumé</a>
        </nav>}
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-20 md:grid-cols-[1.2fr_.8fr] md:items-end md:px-10 md:pb-32 md:pt-28">
          <div>
            <p className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.22em] text-[#52615c]"><span className="h-px w-8 bg-[#52615c]"/> SaaS implementation · QA · automation</p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-.055em] sm:text-6xl lg:text-8xl">I make complex workflows <span className="underline decoration-[#a7d94f] decoration-[8px] underline-offset-[8px]">work better.</span></h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#52615c]">I’m Naveen, a SaaS implementation specialist focused on configuring business systems, validating workflows, and connecting tools so teams can use them with confidence.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#projects" className="rounded-full bg-[#172321] px-6 py-4 text-sm font-semibold text-white hover:bg-[#30443e]">Explore selected work <ArrowDown className="ml-2 inline" size={16}/></a>
              <a href="mailto:contact@naveensharma.net" className="rounded-full border border-[#172321]/20 px-6 py-4 text-sm font-semibold hover:bg-white">Contact me <ArrowUpRight className="ml-2 inline" size={16}/></a>
            </div>
          </div>
          <aside className="relative overflow-hidden rounded-[2rem] bg-[#dfe8dd] p-8 md:p-10">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border border-[#172321]/10"/><div className="absolute -right-2 -top-2 h-32 w-32 rounded-full border border-[#172321]/10"/>
            <div className="relative">
              <div className="mb-10 flex items-center gap-4"><img src="/profile-canva.png" alt="Naveen Sharma" className="h-16 w-16 shrink-0 rounded-full object-cover"/><div><p className="font-semibold">Naveen Sharma</p><p className="mt-2 text-sm leading-6 text-[#52615c]">AI Automation &amp; Integration Engineer | SaaS Implementation Specialist | Workflow Automation</p></div></div>
              <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#52615c]">How I approach the work</p>
              <ol className="mt-5 space-y-4">{["Understand the process", "Configure the system", "Test with real users", "Document the handoff"].map((item, i) => <li key={item} className="flex items-center gap-3 border-b border-[#172321]/10 pb-4 text-sm"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#c5f16b] text-xs font-bold">0{i+1}</span>{item}</li>)}</ol>
              <a href="https://opility.com" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Business services at Opility <ArrowUpRight size={15}/></a>
            </div>
          </aside>
        </section>

        <section id="experience" className="border-y border-[#172321]/10 bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#71807b]">Experience</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">Grounded in delivery.</h2>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {[
                {"demoHref":"/intake-builder-demo","demoLabel":"Try intake & mapping demo","company":"Bolt Healthcare","role":"SaaS Implementation Specialist & Workflow QA","context":"Aug 2022 – Present","points":["Enterprise SaaS Implementation: Architected and deployed digital onboarding pipelines for 25+ healthcare agencies, translating legacy paper intake into HIPAA-compliant SaaS workflows that cut client onboarding turnaround time by 40%.","Form Logic & Data Mapping: Engineered complex dynamic forms, conditional visibility rules, and field-level validation throughout intake and referral workflows, enforcing strict data integrity gates to eliminate clinical submission errors.","Document Automation & eSignatures: Configured dynamic document pipelines, mapping form tokens to regulatory PDFs and structuring multi-party sequential eSignature routing (patient, clinician, administrator), eliminating 15+ hours of weekly paperwork per agency.","QA, UAT & Defect Triage: Executed end-to-end User Acceptance Testing (UAT), functional validation, and regression suites on workflow forms and document outputs; triaged mapping defects alongside engineering to maintain 99.5%+ workflow uptime.","SOPs & Governance: Authored platform configuration guides, clinical intake playbooks, and validation checklists for agency stakeholders, standardizing operations within multi-tenant agency accounts."]},
{"demoHref":"/manufacturing-demo","demoLabel":"Explore manufacturing demo","company":"Vishay Intertechnology, Inc.","role":"Technical Operator (Process Operations & Quality Control)","context":"Nov 2021 – Dec 2022 · 1 yr 2 mos · Be'er Sheva, South District, Israel","points":["Precision Machine Operations: Operated high-precision component manufacturing equipment within a controlled cleanroom environment, verifying machine parameters and calibration standards prior to active production runs.","Quality Control & Component Inspection: Conducted multi-stage physical, optical, and functional quality control checks on electronic components, catching manufacturing discrepancies to prevent defect leakage.","Traceability & Compliance Logging: Maintained detailed operational logs, equipment calibration metrics, and batch traveler records, ensuring complete component traceability under ISO manufacturing standards.","Process Adherence & Defect Escalation: Enforced strict Standard Operating Procedures (SOPs) throughout high-volume production cycles, escalating material anomalies to line engineers to protect throughput yield.","Cleanroom Governance: Followed electrostatic discharge (ESD) prevention protocols and cleanroom operating guidelines, sustaining zero-contamination standards and equipment uptime across shift handovers."]},
{"demoHref":"/institute-demo","demoLabel":"View academy experience","company":"Shivam Institute for Vocational Trainings","role":"Franchise Owner & Technical Operations Lead","context":"Aug 2012 – Sep 2015 · 3 yrs 2 mos · India","points":["Center Operations & Business Governance: Directed operational management for an authorized vocational IT institute franchise, coordinating administrative workflows, staff scheduling, and facility standards to support 300+ students annually.","IT Infrastructure & Lab Systems: Administered computer lab network infrastructure across 20+ workstations, overseeing hardware maintenance, OS deployment, and software provisioning to sustain 99%+ lab uptime.","Technical Curriculum & Training Delivery: Led instructor teams in delivering vocational coursework spanning software applications, networking fundamentals, and computer hardware, driving an 88% program completion rate.","Quality Standards & Regulatory Compliance: Enforced ISO 9001:2008 quality management guidelines and technical certification protocols, ensuring total audit readiness and regulatory alignment for state-recognized programs.","Student Lifecycle & Service Delivery: Supervised end-to-end student onboarding, enrollment pipelines, and academic support, establishing standardized communication touchpoints that increased student referral volume by 25%."]},
              ].map(({ company, role, context, points, demoHref, demoLabel }) => <article key={company} className="rounded-3xl border border-[#172321]/10 bg-[#f6f7f4] p-6"><p className="text-sm font-semibold text-[#71807b]">{company}</p><h3 className="mt-2 text-xl font-semibold">{role}</h3><p className="mt-3 text-xs leading-6 text-[#52615c]">{context}</p><ul className="mt-5 space-y-3">{points.map(point => <li key={point} className="border-t border-[#172321]/10 pt-3 text-sm leading-6 text-[#52615c]">{point}</li>)}</ul><a href={demoHref} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#172321] px-5 py-3 text-sm font-semibold text-[#c5f16b]">{demoLabel} <ArrowUpRight size={16}/></a></article>)}
            </div>
          </div>
        </section>

        <section id="tools" className="mx-auto max-w-7xl px-5 py-24 md:px-10">
          <div className="mb-10"><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#71807b]">Tools & Platforms</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em]">The stack behind the work.</h2></div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" aria-label="Tools and platforms I use">
            {tools.map(tool => <li key={tool.name} className="flex min-h-[136px] flex-col items-center justify-center gap-4 rounded-2xl border border-[#172321]/10 bg-white px-3 py-5 text-center">
              <div className="flex h-12 w-24 items-center justify-center"><img src={tool.logo} alt="" aria-hidden="true" width="80" height="48" loading="lazy" className="max-h-12 max-w-full object-contain" /></div>
              <span className="text-sm font-medium leading-5 text-[#172321]">{tool.name}</span>
            </li>)}
          </ul>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6"><div><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#71807b]">Selected work</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em]">Projects you can inspect.</h2></div><p className="max-w-md text-sm leading-6 text-[#52615c]">Public builds and published products. Client work is described at a high level to respect privacy.</p></div>
          <div className="grid gap-4">{projects.map(project => <article key={project.number} className="grid gap-5 rounded-3xl border border-[#172321]/10 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg md:grid-cols-[70px_1fr_auto] md:items-center md:p-8"><span className="text-sm font-semibold text-[#71807b]">{project.number}</span><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#71807b]">{project.type}</p><h3 className="mt-2 text-2xl font-semibold">{project.title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-[#52615c]">{project.description}</p><div className="mt-4 flex flex-wrap gap-2">{project.stack.map(item => <span key={item} className="rounded-full bg-[#f0f3ef] px-3 py-1 text-xs text-[#52615c]">{item}</span>)}</div></div><a href={project.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold">View project <ArrowUpRight size={16}/></a></article>)}</div>
          <RestoredContent />
        </section>

        <section id="capabilities" className="bg-[#172321] py-24 text-white md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-10"><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#c5f16b]">Capabilities</p><div className="mt-5 grid gap-12 md:grid-cols-[.65fr_1.35fr]"><h2 className="text-4xl font-semibold tracking-[-.04em]">Practical systems.<br/>Clear outcomes.</h2><div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">{capabilities.map(({icon: Icon,title,text}) => <article key={title} className="border-t border-white/20 pt-5"><Icon className="text-[#c5f16b]" size={22}/><h3 className="mt-4 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/65">{text}</p></article>)}</div></div></div>
          <div className="mx-auto max-w-7xl px-5 md:px-10"><Approach /></div>
        </section>

        <section id="qualifications" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-28">
          <div className="mb-12"><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#71807b]">Qualifications</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em]">Learning through practice.</h2></div>
          <div className="grid gap-5 md:grid-cols-3">
            {qualifications.map(({ category, items }) => <article key={category} className="rounded-3xl border border-[#172321]/10 bg-white p-6 md:p-7">
              <h3 className="mb-5 text-lg font-semibold">{category}</h3>
              <div className="space-y-5">{items.map(({ title, organization, status }) => <div key={title} className="border-t border-[#172321]/10 pt-5">
                <span className="inline-flex rounded-full bg-[#eaf3dc] px-3 py-1 text-xs font-semibold text-[#40572d]">{status}</span>
                <h4 className="mt-3 font-semibold">{title}</h4>
                <p className="mt-1 text-sm text-[#71807b]">{organization}</p>
              </div>)}</div>
            </article>)}
          </div>
          <details className="mt-6 rounded-2xl border border-[#172321]/10 bg-white p-6"><summary className="cursor-pointer font-semibold">Zapier Academy — completed courses</summary><ul className="mt-5 grid gap-3 text-sm text-[#52615c] sm:grid-cols-2">{["Jumpstart", "Building Basic Zaps", "Building Intermediate Zaps", "Building AI Agents", "What is Zapier MCP?", "Using Zapier MCP", "Governing Zapier MCP", "Account Setup", "Monitoring and Operations", "Security and Governance"].map(course => <li key={course}>✓ {course}</li>)}</ul></details>
        </section>

        <section id="about" className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[.65fr_1.35fr] md:px-10 md:py-28"><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#71807b]">A little about me</p><div><h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-.04em] md:text-5xl">I bridge the gap between how a tool is configured and how a team actually needs to use it.</h2><p className="mt-6 max-w-3xl text-base leading-8 text-[#52615c]">My work connects SaaS implementation, AI integration, and workflow automation. I build with no-code platforms and AI assistance, bringing a practical approach to configuration and validation. I value clear requirements, reliable data, thoughtful testing, and documentation that helps the next person succeed.</p><p className="mt-4 max-w-3xl text-base leading-8 text-[#52615c]">I use Zapier, Make, n8n, and HubSpot to connect business workflows, working with REST APIs and webhooks where needed. My practical work also includes AI agents and assistants, workflow testing, and QA / UAT to check that systems behave as intended.</p><div className="mt-8 flex flex-wrap gap-3"><a href="https://www.linkedin.com/in/naveensharmatech" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#172321]/20 px-5 py-3 text-sm font-semibold hover:bg-white"><Linkedin size={16}/> LinkedIn</a><a href="https://github.com/naveensharmatech" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#172321]/20 px-5 py-3 text-sm font-semibold hover:bg-white"><Github size={16}/> GitHub</a><a href="/Naveen_Sharma_CV.pdf" className="inline-flex items-center gap-2 rounded-full border border-[#172321]/20 px-5 py-3 text-sm font-semibold hover:bg-white">Résumé <ArrowUpRight size={15}/></a></div><AboutDetails /></div></section>

        <section id="contact" className="bg-[#c5f16b] px-5 py-20 md:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="text-xs font-semibold uppercase tracking-[.22em]">Next step</p><h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-.04em] md:text-6xl">Have a role or workflow to discuss?</h2></div><a href="mailto:contact@naveensharma.net" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#172321] px-6 py-4 text-sm font-semibold text-white hover:bg-[#30443e]">Get in touch <ArrowRight size={17}/></a></div></section>
      </main>
      <EllaChat />
      <footer className="bg-[#172321] px-5 py-7 text-sm text-white/60 md:px-10"><div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3"><span>© {new Date().getFullYear()} Naveen Sharma</span><a href="https://opility.com" target="_blank" rel="noreferrer" className="hover:text-white">Opility — business services <ArrowUpRight className="ml-1 inline" size={13}/></a></div></footer>
    </div>
  );
}
