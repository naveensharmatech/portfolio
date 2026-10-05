"use client";

import { RestoredContent, EllaChat, Approach, AboutDetails, WorkflowGallery } from "./RestoredContent";

import { useState, useEffect, useRef } from "react";
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
    linkLabel: "View source & setup",
    workflowHref: "#inquiry-workflow",
  },
  {
    number: "02",
    type: "Data extraction · Published product",
    title: "B2B Lead Generator",
    description: "A published Apify actor for discovering businesses and structuring publicly available company contact data.",
    stack: ["Apify", "Crawlee", "Node.js"],
    linkLabel: "Open Apify actor",
    href: "https://apify.com/opility/b2b-leads-scraper-1-5-1k-leads-emails-phones",
  },
  {
    number: "03",
    type: "Data extraction · Published product",
    title: "Shopify Store Lead Extractor",
    description: "A published actor that gathers public store details and organizes them for research workflows.",
    stack: ["Python", "Apify", "BeautifulSoup"],
    linkLabel: "Open Apify actor",
    href: "https://apify.com/opility/shopify-store-lead-extractor-emails-catalog-size-apps",
  },
];

const capabilities = [
  { icon: Bot, title: "AI & workflow automation", text: "Build practical automations and assistants that connect business processes.", source: "Projects & practical builds", skills: ["AI Automation","Workflow Automation","AI Agents","No-Code Development"] },
  { icon: Workflow, title: "SaaS implementation & integration", text: "Configure intake workflows, map fields, and connect systems around agency requirements.", source: "Bolt Healthcare", skills: ["SaaS Implementation","System Configuration","Data Mapping & Schema Design","REST APIs"] },
  { icon: FileCheck2, title: "Workflow QA & validation", text: "Test forms, dropdowns, mappings, and document outputs; track defects before handoff.", source: "Bolt Healthcare & QA learning", skills: ["Quality Assurance (QA/UAT)","Functional Testing","Regression Testing","Defect Management"] },
  { icon: Code2, title: "Technical operations & quality", text: "Manage institute operations and lab systems, and follow production quality procedures.", source: "Shivam Institute & Vishay", skills: ["IT Operations","Operations Management","Quality Control","Standard Operating Procedure (SOP)"] },
  { icon: FileCheck2, title: "Administration & governance", text: "Apply concepts studied across Zapier Academy’s administration, security, and MCP courses.", source: "Completed Zapier Academy learning", skills: ["Zapier Administration","Monitoring and Alerting","AI Governance","Model Context Protocol (MCP)"] },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expertiseOpen, setExpertiseOpen] = useState(false);
  const [mobileExpertiseOpen, setMobileExpertiseOpen] = useState(false);

  const expertiseRef = useRef(null);
  const expertiseButtonRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);
  useEffect(() => {
    if (!expertiseOpen) return;
    const closeOutside = event => { if (!expertiseRef.current?.contains(event.target)) setExpertiseOpen(false); };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [expertiseOpen]);

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setMobileExpertiseOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f7f4] text-[#172321] selection:bg-[#c5f16b] selection:text-[#172321]">
      <a href="#top" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:p-4">Skip to content</a>
      <header onKeyDown={event => { if (event.key === "Escape") { if (menuOpen) { closeMobileMenu(); mobileMenuButtonRef.current?.focus(); } else if (expertiseOpen) { setExpertiseOpen(false); expertiseButtonRef.current?.focus(); } } }} className="sticky top-0 z-50 border-b border-[#172321]/10 bg-[#f6f7f4]/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 md:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="Naveen Sharma home">
            <img src="/favicon.png" alt="Naveen Sharma" width="40" height="40" className="h-10 w-10 rounded-full object-cover" />
            <span className="text-sm font-semibold tracking-tight">Naveen Sharma<span className="ml-2 text-[#5c6d65]">/ Portfolio</span></span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            <a href="#projects" className="text-sm text-[#52615c] transition hover:text-[#172321]">Projects</a>
            <a href="#experience" className="text-sm text-[#52615c] transition hover:text-[#172321]">Experience</a>
            <div ref={expertiseRef} className="relative">
              <button ref={expertiseButtonRef} aria-controls="expertise-links" type="button" className="flex items-center gap-1 text-sm text-[#52615c] transition hover:text-[#172321]" aria-expanded={expertiseOpen} onClick={() => setExpertiseOpen(!expertiseOpen)}>
                Expertise <ChevronDown size={15} className={`transition-transform ${expertiseOpen ? "rotate-180" : ""}`}/>
              </button>
              {expertiseOpen && <div id="expertise-links" className="absolute left-0 top-full z-20 mt-3 w-48 rounded-xl border border-[#172321]/10 bg-white p-2 shadow-lg">
                {[["Workflows", "#workflow-references"], ["Work demos", "#demos"], ["Capabilities", "#capabilities"], ["Tools & Platforms", "#tools"], ["Qualifications", "#qualifications"]].map(([label, href]) => <a key={href} href={href} onClick={() => setExpertiseOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-[#52615c] hover:bg-[#f0f3ef] hover:text-[#172321]">{label}</a>)}
              </div>}
            </div>
            <a href="#about" className="text-sm text-[#52615c] transition hover:text-[#172321]">About</a>
            <a href="#contact" className="text-sm text-[#52615c] transition hover:text-[#172321]">Contact</a>
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <a href="https://www.linkedin.com/in/naveensharmatech" target="_blank" rel="noreferrer" className="rounded-full p-2 text-[#52615c] hover:bg-white" aria-label="LinkedIn"><Linkedin size={18}/></a>
            <a href="/Naveen_Sharma_CV.pdf" className="rounded-full bg-[#172321] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#30443e]">View résumé <ArrowUpRight className="ml-1 inline" size={15}/></a>
          </div>
          <button ref={mobileMenuButtonRef} aria-controls="mobile-navigation" className="rounded-lg p-2 lg:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => { setMenuOpen(!menuOpen); setMobileExpertiseOpen(false); }}>{menuOpen ? <X/> : <Menu/>}</button>
        </div>
        {menuOpen && <nav id="mobile-navigation" className="flex flex-col gap-1 border-t border-[#172321]/10 px-5 py-4 lg:hidden" aria-label="Mobile navigation">
          <a href="#projects" onClick={closeMobileMenu} className="rounded-lg px-3 py-3 text-sm hover:bg-white">Projects</a>
          <a href="#experience" onClick={closeMobileMenu} className="rounded-lg px-3 py-3 text-sm hover:bg-white">Experience</a>
          <button type="button" className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm hover:bg-white" aria-expanded={mobileExpertiseOpen} onClick={() => setMobileExpertiseOpen(!mobileExpertiseOpen)}>
            Expertise <ChevronDown size={16} className={`transition-transform ${mobileExpertiseOpen ? "rotate-180" : ""}`}/>
          </button>
          {mobileExpertiseOpen && <div className="ml-3 flex flex-col border-l border-[#172321]/10 pl-3">
            {[["Workflows", "#workflow-references"], ["Work demos", "#demos"], ["Capabilities", "#capabilities"], ["Tools & Platforms", "#tools"], ["Qualifications", "#qualifications"]].map(([label, href]) => <a key={href} href={href} onClick={closeMobileMenu} className="rounded-lg px-3 py-2 text-sm text-[#52615c] hover:bg-white">{label}</a>)}
          </div>}
          <a href="#about" onClick={closeMobileMenu} className="rounded-lg px-3 py-3 text-sm hover:bg-white">About</a>
          <a href="#contact" onClick={closeMobileMenu} className="rounded-lg px-3 py-3 text-sm hover:bg-white">Contact</a>
          <a href="/Naveen_Sharma_CV.pdf" onClick={closeMobileMenu} className="mt-2 rounded-lg bg-[#172321] px-4 py-3 text-center text-sm font-semibold text-white">View résumé</a>
        </nav>}
      </header>

      <main id="top" tabIndex={-1}>
        <section aria-labelledby="hero-title" className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-14 md:px-10 md:py-24 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-14">
          <div className="min-w-0">
            <p className="mb-7 max-w-2xl text-sm font-semibold leading-6 text-[#52615c]">AI Automation &amp; Integration Engineer <span aria-hidden="true">|</span> SaaS Implementation Specialist <span aria-hidden="true">|</span> Workflow Automation</p>
            <h1 id="hero-title" className="max-w-3xl text-5xl font-semibold leading-[1.06] tracking-[-.055em] sm:text-6xl lg:text-7xl">Turning curiosity into <span className="underline decoration-[#a7d94f] decoration-[6px] underline-offset-[8px]">practical AI solutions.</span></h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#52615c]">I’m Naveen—a lifelong technology enthusiast building with no-code tools and AI assistance. I combine SaaS implementation and technical problem-solving experience with hands-on projects in automation, assistants and websites, while expanding into AI agents and apps.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#projects" className="rounded-full bg-[#172321] px-6 py-4 text-sm font-semibold text-white hover:bg-[#30443e]">Explore my work <ArrowDown className="ml-2 inline" size={16}/></a>
              <a href="mailto:contact@naveensharma.net" className="rounded-full border border-[#172321]/20 px-6 py-4 text-sm font-semibold hover:bg-white">Let’s connect <ArrowUpRight className="ml-2 inline" size={16}/></a>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] border border-[#172321]/10 bg-white">
            <img src="/images/naveen-ai-builder.jpeg" alt="Illustration of Naveen connecting an inquiry, AI processing, routing and a CRM, surrounded by workflow and SaaS tools." width="1254" height="1254" fetchPriority="high" className="aspect-square w-full object-contain"/>
            <figcaption className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <div className="flex items-center gap-3"><img src="/profile-canva.png" alt="Naveen Sharma" width="40" height="40" className="h-10 w-10 rounded-full object-cover"/><div><p className="text-sm font-semibold">Ideas. Systems. Possibilities.</p></div></div>
              <a href="https://opility.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold">Opility <ArrowUpRight size={15}/></a>
            </figcaption>
          </figure>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6"><div><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#5c6d65]">Selected work</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em]">Projects you can inspect.</h2></div><p className="max-w-md text-sm leading-6 text-[#52615c]">Public builds and published products. Client work is described at a high level to respect privacy.</p><a href="#workflow-references" className="inline-flex items-center gap-2 rounded-full bg-[#172321] px-5 py-3 text-sm font-semibold text-[#c5f16b]">Explore workflow gallery <ArrowDown size={16}/></a></div>
          <div className="grid gap-4">{projects.map(project => <article key={project.number} className="grid gap-5 rounded-3xl border border-[#172321]/10 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg md:grid-cols-[70px_1fr_auto] md:items-center md:p-8"><span className="text-sm font-semibold text-[#5c6d65]">{project.number}</span><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#5c6d65]">{project.type}</p><h3 className="mt-2 text-2xl font-semibold">{project.title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-[#52615c]">{project.description}</p><div className="mt-4 flex flex-wrap gap-2">{project.stack.map(item => <span key={item} className="rounded-full bg-[#f0f3ef] px-3 py-1 text-xs text-[#52615c]">{item}</span>)}</div></div><div className="flex flex-wrap gap-4 md:flex-col">{project.workflowHref && <a href={project.workflowHref} className="inline-flex items-center gap-2 text-sm font-semibold">Inspect workflow <ArrowDown size={16}/></a>}<a href={project.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold">{project.linkLabel} <ArrowUpRight size={16}/></a></div></article>)}</div>
          <section id="demos" aria-labelledby="demos-title" className="mt-14 scroll-mt-24"><h3 id="demos-title" className="text-2xl font-semibold tracking-tight">Explore the work firsthand.</h3><p className="mt-3 text-sm leading-6 text-[#52615c]">Try sample-data demonstrations or explore the academy experience. Project source, documents and Apify products have separate links.</p><div className="mt-6 grid gap-4 lg:grid-cols-3">{[{title:"Intake & Mapping Workbench",text:"Fill sample fields, test mappings and inspect a populated document.",href:"/intake-builder-demo",label:"Launch interactive demo"},{title:"Manufacturing Shift Handoff",text:"Load a sample shift and generate a validated handoff summary.",href:"/manufacturing-demo",label:"Launch interactive demo"},{title:"Academy Operations",text:"Explore my institute responsibilities and academy photo gallery.",href:"/institute-demo",label:"Explore experience gallery"}].map(item => <article key={item.href} className="flex flex-col rounded-3xl border border-[#172321]/10 bg-white p-6"><h4 className="text-xl font-semibold">{item.title}</h4><p className="mt-3 flex-1 text-sm leading-6 text-[#52615c]">{item.text}</p><a href={item.href} aria-label={`${item.label}: ${item.title}`} className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#172321] px-5 py-3 text-sm font-semibold text-[#c5f16b]">{item.label} <ArrowUpRight size={16}/></a></article>)}</div></section>
          <RestoredContent />
          <WorkflowGallery />
        </section>

        <section id="experience" className="border-y border-[#172321]/10 bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#5c6d65]">Experience</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">Grounded in delivery.</h2>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {[
                {"demoHref":"/intake-builder-demo","demoLabel":"Try intake & mapping demo","company":"Bolt Healthcare","role":"SaaS Implementation Specialist & Workflow QA","context":"Aug 2022 – May 2026","points":["Enterprise SaaS Implementation: Architected and deployed digital onboarding pipelines for 25+ healthcare agencies, translating legacy paper intake into HIPAA-compliant SaaS workflows that cut client onboarding turnaround time by 40%.","Form Logic & Data Mapping: Engineered complex dynamic forms, conditional visibility rules, and field-level validation throughout intake and referral workflows, enforcing strict data integrity gates to eliminate clinical submission errors.","Document Automation & eSignatures: Configured dynamic document pipelines, mapping form tokens to regulatory PDFs and structuring multi-party sequential eSignature routing (patient, clinician, administrator), eliminating 15+ hours of weekly paperwork per agency.","QA, UAT & Defect Triage: Executed end-to-end User Acceptance Testing (UAT), functional validation, and regression suites on workflow forms and document outputs; triaged mapping defects alongside engineering to maintain 99.5%+ workflow uptime.","SOPs & Governance: Authored platform configuration guides, clinical intake playbooks, and validation checklists for agency stakeholders, standardizing operations within multi-tenant agency accounts."]},
{"demoHref":"/manufacturing-demo","demoLabel":"Explore manufacturing demo","company":"Vishay Intertechnology, Inc.","role":"Technical Operator (Process Operations & Quality Control)","context":"Nov 2021 – May 2022 · 7 mos · Be'er Sheva, South District, Israel","points":["Precision Machine Operations: Operated high-precision component manufacturing equipment within a controlled cleanroom environment, verifying machine parameters and calibration standards prior to active production runs.","Quality Control & Component Inspection: Conducted multi-stage physical, optical, and functional quality control checks on electronic components, catching manufacturing discrepancies to prevent defect leakage.","Traceability & Compliance Logging: Maintained detailed operational logs, equipment calibration metrics, and batch traveler records, ensuring complete component traceability under ISO manufacturing standards.","Process Adherence & Defect Escalation: Enforced strict Standard Operating Procedures (SOPs) throughout high-volume production cycles, escalating material anomalies to line engineers to protect throughput yield.","Cleanroom Governance: Followed electrostatic discharge (ESD) prevention protocols and cleanroom operating guidelines, sustaining zero-contamination standards and equipment uptime across shift handovers."]},
{"demoHref":"/institute-demo","demoLabel":"View academy experience","company":"Shivam Institute for Vocational Trainings","role":"Franchise Owner & Technical Operations Lead","context":"Aug 2012 – Sep 2015 · 3 yrs 2 mos · India","points":["Center Operations & Business Governance: Directed operational management for an authorized vocational IT institute franchise, coordinating administrative workflows, staff scheduling, and facility standards to support 300+ students annually.","IT Infrastructure & Lab Systems: Administered computer lab network infrastructure across 20+ workstations, overseeing hardware maintenance, OS deployment, and software provisioning to sustain 99%+ lab uptime.","Technical Curriculum & Training Delivery: Led instructor teams in delivering vocational coursework spanning software applications, networking fundamentals, and computer hardware, driving an 88% program completion rate.","Quality Standards & Regulatory Compliance: Enforced ISO 9001:2008 quality management guidelines and technical certification protocols, ensuring total audit readiness and regulatory alignment for state-recognized programs.","Student Lifecycle & Service Delivery: Supervised end-to-end student onboarding, enrollment pipelines, and academic support, establishing standardized communication touchpoints that increased student referral volume by 25%."]},
              ].map(({ company, role, context, points, demoHref, demoLabel }) => <article key={company} className="rounded-3xl border border-[#172321]/10 bg-[#f6f7f4] p-6"><p className="text-sm font-semibold text-[#5c6d65]">{company}</p><h3 className="mt-2 text-xl font-semibold">{role}</h3><p className="mt-3 text-xs leading-6 text-[#52615c]">{context}</p><ul className="mt-5 space-y-3">{points.map(point => <li key={point} className="border-t border-[#172321]/10 pt-3 text-sm leading-6 text-[#52615c]">{point}</li>)}</ul><a href={demoHref} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#172321] px-5 py-3 text-sm font-semibold text-[#c5f16b]">{demoLabel} <ArrowUpRight size={16}/></a></article>)}
            </div>
          </div>
        </section>

        <section id="tools" className="mx-auto max-w-7xl px-5 py-24 md:px-10">
          <div className="mb-10"><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#5c6d65]">Tools & Platforms</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em]">The stack behind the work.</h2></div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" aria-label="Tools and platforms I use">
            {tools.map(tool => <li key={tool.name} className="flex min-h-[136px] flex-col items-center justify-center gap-4 rounded-2xl border border-[#172321]/10 bg-white px-3 py-5 text-center">
              <div className="flex h-12 w-24 items-center justify-center"><img src={tool.logo} alt="" aria-hidden="true" width="80" height="48" loading="lazy" className="max-h-12 max-w-full object-contain" /></div>
              <span className="text-sm font-medium leading-5 text-[#172321]">{tool.name}</span>
            </li>)}
          </ul>
          <section aria-labelledby="platform-concepts-title" className="mt-8 overflow-hidden rounded-3xl border border-[#172321]/10 bg-white p-5 md:p-7">
            <h3 id="platform-concepts-title" className="text-xl font-semibold">Zapier, n8n &amp; Make — visual concepts</h3>
            <figure className="mt-6">
              <a href="/images/automation-platform-concepts.png" target="_blank" rel="noreferrer" aria-label="Open automation platform comparison at full size"><img src="/images/automation-platform-concepts.png" alt="Visual comparison of a Zapier Zap with triggers, paths and steps; an n8n workflow with nodes; and a Make scenario with modules and a router." width="2000" height="938" loading="lazy" className="h-auto w-full rounded-xl"/></a>
              <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-[#52615c]">A visual reference for the platforms I’m building with and learning.</p><a href="/images/automation-platform-concepts.png" target="_blank" rel="noreferrer" className="text-sm font-semibold underline underline-offset-4">View full-size comparison <ArrowUpRight size={14} className="inline"/></a></figcaption>
            </figure>
          </section>
        </section>

        <section id="capabilities" className="bg-[#172321] py-24 text-white md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-10"><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#c5f16b]">Capabilities</p><div className="mt-5 grid gap-12 md:grid-cols-[.65fr_1.35fr]"><div><h2 className="text-4xl font-semibold tracking-[-.04em]">Practical systems.<br/>Clear outcomes.</h2><img src="/images/connected-systems.jpeg" alt="" aria-hidden="true" width="1536" height="596" loading="lazy" className="mt-8 h-auto w-full rounded-2xl border border-white/10"/></div><div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">{capabilities.map(({icon: Icon,title,text,source,skills}) => <article key={title} className="border-t border-white/20 pt-5"><Icon className="text-[#c5f16b]" size={22}/><h3 className="mt-4 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/65">{text}</p><ul className="mt-4 flex flex-wrap gap-2" aria-label={`${title} skills`}>{skills.map(skill => <li key={skill} className="rounded-full border border-white/20 px-3 py-1.5 text-xs leading-5 text-white/90">{skill}</li>)}</ul><p className="mt-4 text-xs leading-5 text-[#c5f16b]">{source}</p></article>)}</div></div></div>
          <div className="mx-auto max-w-7xl px-5 md:px-10"><Approach /></div>
        </section>

        <section id="qualifications" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-28">
          <div className="mb-12"><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#5c6d65]">Qualifications</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em]">Learning through practice.</h2></div>
          <div className="grid gap-5 md:grid-cols-3">
            {qualifications.map(({ category, items }) => <article key={category} className="rounded-3xl border border-[#172321]/10 bg-white p-6 md:p-7">
              <h3 className="mb-5 text-lg font-semibold">{category}</h3>
              <div className="space-y-5">{items.map(({ title, organization, status }) => <div key={title} className="border-t border-[#172321]/10 pt-5">
                <span className="inline-flex rounded-full bg-[#eaf3dc] px-3 py-1 text-xs font-semibold text-[#40572d]">{status}</span>
                <h4 className="mt-3 font-semibold">{title}</h4>
                <p className="mt-1 text-sm text-[#5c6d65]">{organization}</p>
              </div>)}</div>
            </article>)}
          </div>
          <details className="mt-6 rounded-2xl border border-[#172321]/10 bg-white p-6"><summary className="cursor-pointer font-semibold">Zapier Academy — completed courses</summary><ul className="mt-5 grid gap-3 text-sm text-[#52615c] sm:grid-cols-2">{["Jumpstart", "Building Basic Zaps", "Building Intermediate Zaps", "Building AI Agents", "What is Zapier MCP?", "Using Zapier MCP", "Governing Zapier MCP", "Account Setup", "Monitoring and Operations", "Security and Governance"].map(course => <li key={course}>✓ {course}</li>)}</ul></details>
        </section>

        <section id="about" aria-labelledby="about-title" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#5c6d65]">The story behind the work</p>
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
            <figure className="mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] border border-[#172321]/10 bg-white lg:sticky lg:top-28">
              <img src="/images/naveen-people-and-systems.jpeg" alt="Illustration of Naveen planning a workflow that connects a form, data mapping, integration and a usable screen." width="1254" height="1254" loading="lazy" className="aspect-square w-full object-contain"/>
              <figcaption className="px-5 py-4"><p className="font-semibold">Make it work for people.</p></figcaption>
            </figure>
            <div className="min-w-0">
              <h2 id="about-title" className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-.04em] md:text-5xl">Technology has always made me curious. AI has given that curiosity a new way to build.</h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#52615c]">Growing up through the transition from everyday paperwork to computers and connected tools, I saw how technology could make difficult tasks simpler. I wanted to understand it, solve problems with it and eventually create something of my own.</p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#52615c]">In 2012, that ambition led me to open a S.I.V.T. computer-training franchise centre. Managing the centre, its operations and technical needs gave me experience working with people, systems and the practical problems behind them. Later, my SaaS implementation work strengthened my skills in configuration, data mapping, workflow validation and troubleshooting.</p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#52615c]">My route into building has been through no-code platforms and AI assistance. I bring the ideas, requirements, design choices and persistence; AI tools help me turn those ideas into working projects. That approach helped me create my portfolio, develop Opility, build assistants and explore automation and data-extraction tools.</p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#52615c]">I’ve always wanted to become an engineer—to understand how technology works, solve problems and build something useful. Traditional programming wasn’t the path that suited me, but my interest in technology never faded. AI and no-code tools have opened a practical route for me to pursue that ambition.</p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#52615c]">Today, my focus is AI automation and integration engineering: understanding a process, connecting systems, configuring workflows and checking how they behave. I bring SaaS implementation and technical problem-solving experience, skills developed in Zapier, and growing capabilities with Make, n8n, HubSpot, Salesforce, Airtable and Postman. I’m expanding into WhatsApp chatbots, AI agents and apps through practical projects and continuous learning.</p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#52615c]">People around me call me “mini Google” because I enjoy researching, finding answers and figuring out why something isn’t working. That same curiosity drives my work: understand the problem, explore the options, build a solution and keep improving it.</p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#52615c]">Opility is my next chapter in creating something of my own—a venture I’m developing around practical AI, automation and digital tools. I’m looking for opportunities to bring that curiosity and problem-solving approach to a team while continuing to grow.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://www.linkedin.com/in/naveensharmatech" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#172321]/20 px-5 py-3 text-sm font-semibold hover:bg-white"><Linkedin size={16}/> LinkedIn</a>
                <a href="https://github.com/naveensharmatech" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#172321]/20 px-5 py-3 text-sm font-semibold hover:bg-white"><Github size={16}/> GitHub</a>
                <a href="/Naveen_Sharma_CV.pdf" className="inline-flex items-center gap-2 rounded-full border border-[#172321]/20 px-5 py-3 text-sm font-semibold hover:bg-white">Résumé <ArrowUpRight size={15}/></a>
              </div>
              <AboutDetails />
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#c5f16b] px-5 py-20 md:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="text-xs font-semibold uppercase tracking-[.22em]">Next step</p><h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-.04em] md:text-6xl">Have a role or workflow to discuss?</h2><p className="mt-5 max-w-xl text-sm leading-6">Open to remote roles that can hire in Israel, suitable local hybrid roles, B2B contracts and freelance projects.</p><a href="mailto:contact@naveensharma.net" className="mt-3 inline-block break-all font-semibold underline underline-offset-4">contact@naveensharma.net</a></div><a href="mailto:contact@naveensharma.net" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#172321] px-6 py-4 text-sm font-semibold text-white hover:bg-[#30443e]">Get in touch <ArrowRight size={17}/></a></div></section>
      </main>
      <EllaChat />
      <footer className="bg-[#172321] px-5 py-7 text-sm text-white/60 md:px-10"><div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3"><span>© {new Date().getFullYear()} Naveen Sharma</span><a href="https://opility.com" target="_blank" rel="noreferrer" className="hover:text-white">Opility — business services <ArrowUpRight className="ml-1 inline" size={13}/></a></div></footer>
    </div>
  );
}
