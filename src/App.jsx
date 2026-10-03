"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Bot, Check, Code2, FileCheck2,
  Github, Linkedin, Menu, Workflow, X,
} from "lucide-react";

const navItems = [
  ["Work", "#work"],
  ["Experience", "#experience"],
  ["Capabilities", "#capabilities"],
  ["About", "#about"],
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
  { icon: FileCheck2, title: "QA & UAT", text: "Plan and execute functional checks, user acceptance testing, regression passes, and clear defect handoffs." },
  { icon: Bot, title: "Workflow automation", text: "Connect business tools with practical automations using platforms such as Zapier, Make, and n8n." },
  { icon: Code2, title: "Technical operations", text: "Document systems, validate APIs, troubleshoot issues, and make handoffs easier to maintain." },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    desktop.addEventListener("change", closeOnDesktop);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <div id="top" className="min-h-screen bg-canvas text-ink selection:bg-[#c5f16b] selection:text-[#172321]">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-3">Skip to content</a>
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-canvas/95 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 md:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="Naveen Sharma home">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#172321] text-sm font-bold text-[#c5f16b]">NS</span>
            <span className="text-sm font-semibold tracking-tight">Naveen Sharma<span className="ml-2 hidden text-subtle sm:inline">/ Portfolio</span></span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {navItems.map(([label, href]) => <a key={href} href={href} className="text-sm text-muted transition hover:text-ink">{label}</a>)}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <a href="https://www.linkedin.com/in/naveensharmatech" target="_blank" rel="noreferrer" className="justify-center rounded-full p-2 text-muted hover:bg-surface" aria-label="LinkedIn"><Linkedin size={18}/></a>
            <a href="/Naveen_Sharma_CV.pdf" className="rounded-full bg-[#172321] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#30443e]">View résumé <ArrowUpRight className="ml-1 inline" size={15}/></a>
          </div>
          <button ref={menuButtonRef} type="button" className="shrink-0 rounded-lg p-3 lg:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
        </div>
        <nav id="mobile-navigation" hidden={!menuOpen} className={`${menuOpen ? "flex" : "hidden"} max-h-[calc(100dvh-76px-env(safe-area-inset-top))] flex-col gap-1 overflow-y-auto border-t border-ink/10 px-5 py-4 lg:hidden`} aria-label="Mobile navigation">{navItems.map(([label, href]) => <a key={href} href={href} onClick={() => { setMenuOpen(false); document.querySelector(href)?.focus(); }} className="rounded-lg px-3 py-3 text-sm hover:bg-surface">{label}</a>)}<a href="/Naveen_Sharma_CV.pdf" className="mt-2 justify-center rounded-lg bg-[#172321] px-4 py-3 text-sm font-semibold text-white">View résumé</a></nav>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-12 sm:pb-24 sm:pt-20 md:px-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-14 lg:pb-32 lg:pt-28">
          <div className="min-w-0">
            <p className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.22em] text-muted"><span className="h-px w-8 shrink-0 bg-muted"/> SaaS implementation · QA · automation</p>
            <h1 className="max-w-4xl text-clamp-h1 font-semibold tracking-[-.055em]">I make complex workflows <span className="underline decoration-[#a7d94f] decoration-[8px] underline-offset-[8px]">work better.</span></h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">I’m Naveen, a SaaS implementation specialist focused on configuring business systems, validating workflows, and connecting tools so teams can use them with confidence.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#work" className="w-full justify-center rounded-full bg-[#172321] px-6 py-4 text-sm font-semibold text-white hover:bg-[#30443e] sm:w-auto">Explore selected work <ArrowDown className="ml-2 inline" size={16}/></a>
              <a href="mailto:contact@naveensharma.net" className="w-full justify-center rounded-full border border-ink/20 px-6 py-4 text-sm font-semibold hover:bg-surface sm:w-auto">Contact me <ArrowUpRight className="ml-2 inline" size={16}/></a>
            </div>
          </div>
          <aside className="relative min-w-0 overflow-hidden rounded-[2rem] bg-panel p-6 sm:p-8 lg:p-10">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border border-ink/10"/><div className="absolute -right-2 -top-2 h-32 w-32 rounded-full border border-ink/10"/>
            <div className="relative">
              <div className="mb-10 flex items-center gap-4"><img src="/headshot-round.png" alt="Naveen Sharma" width="64" height="64" className="h-16 w-16 shrink-0 rounded-full object-cover"/><div><p className="font-semibold">Naveen Sharma</p><p className="mt-1 text-sm text-muted">Implementation Specialist</p></div></div>
              <p className="text-xs font-semibold uppercase tracking-[.2em] text-muted">How I approach the work</p>
              <ol className="mt-5 space-y-4">{["Understand the process", "Configure the system", "Test with real users", "Document the handoff"].map((item, i) => <li key={item} className="flex items-center gap-3 border-b border-ink/10 pb-4 text-sm"><span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#c5f16b] text-xs font-bold text-[#172321]">0{i+1}</span>{item}</li>)}</ol>
              <a href="https://opility.com" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Business services at Opility <ArrowUpRight size={15}/></a>
            </div>
          </aside>
        </section>

        <section id="experience" tabIndex={-1} className="border-y border-ink/10 bg-surface py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 md:px-10 lg:grid-cols-[.55fr_1fr]">
            <div><p className="text-xs font-semibold uppercase tracking-[.22em] text-subtle">Experience</p><h2 className="mt-4 text-3xl font-semibold tracking-tight">Grounded in delivery.</h2></div>
            <div className="grid gap-8 sm:grid-cols-2">
              <article><p className="text-sm font-semibold text-subtle">Healthcare SaaS</p><h3 className="mt-2 text-xl font-semibold">Implementation Specialist</h3><p className="mt-3 leading-7 text-muted">Hands-on implementation work across system configuration, dynamic forms, workflow setup, data mapping, user acceptance testing, and technical support.</p></article>
              <article><p className="text-sm font-semibold text-subtle">Quality & operations</p><h3 className="mt-2 text-xl font-semibold">Testing, training, process support</h3><p className="mt-3 leading-7 text-muted">Earlier experience in manufacturing QA and training/operations support informs a practical, detail-oriented approach to system changes and handoffs.</p></article>
            </div>
          </div>
        </section>

        <section id="work" tabIndex={-1} className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-32">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6"><div><p className="text-xs font-semibold uppercase tracking-[.22em] text-subtle">Selected work</p><h2 className="mt-4 text-clamp-h2 font-semibold tracking-[-.04em]">Projects you can inspect.</h2></div><p className="max-w-md text-sm leading-6 text-muted">Public builds and published products. Client work is described at a high level to respect privacy.</p></div>
          <div className="grid gap-4">{projects.map(project => <article key={project.number} className="grid gap-5 rounded-3xl border border-ink/10 bg-surface p-6 transition motion-safe:hover:-translate-y-0.5 hover:shadow-lg md:grid-cols-[70px_minmax(0,1fr)_auto] md:items-center md:p-8"><span className="text-sm font-semibold text-subtle">{project.number}</span><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-subtle">{project.type}</p><h3 className="mt-2 text-2xl font-semibold">{project.title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{project.description}</p><div className="mt-4 flex flex-wrap gap-2">{project.stack.map(item => <span key={item} className="rounded-full bg-soft px-3 py-1 text-xs text-muted">{item}</span>)}</div></div><a href={project.href} target="_blank" rel="noreferrer" aria-label={`View project: ${project.title}`} className="inline-flex items-center gap-2 text-sm font-semibold">View project <ArrowUpRight size={16}/></a></article>)}</div>
        </section>

        <section id="capabilities" tabIndex={-1} className="bg-[#172321] py-16 text-white md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-10"><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#c5f16b]">Capabilities</p><div className="mt-5 grid gap-12 lg:grid-cols-[.65fr_1.35fr]"><h2 className="text-clamp-h2 font-semibold tracking-[-.04em]">Practical systems.<br/>Clear outcomes.</h2><div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">{capabilities.map(({icon: Icon,title,text}) => <article key={title} className="border-t border-white/20 pt-5"><Icon className="text-[#c5f16b]" size={22}/><h3 className="mt-4 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/75">{text}</p></article>)}</div></div></div>
        </section>

        <section id="about" tabIndex={-1} className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-10 md:py-28 lg:grid-cols-[.65fr_1.35fr]"><p className="text-xs font-semibold uppercase tracking-[.22em] text-subtle">A little about me</p><div><h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-.04em] md:text-5xl">I bridge the gap between how a tool is configured and how a team actually needs to use it.</h2><p className="mt-6 max-w-3xl text-base leading-8 text-muted">My work sits at the intersection of SaaS implementation, quality assurance, and workflow automation. I value clear requirements, reliable data, thoughtful testing, and documentation that helps the next person succeed.</p><div className="mt-8 flex flex-wrap gap-3"><a href="https://www.linkedin.com/in/naveensharmatech" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold hover:bg-surface"><Linkedin size={16}/> LinkedIn</a><a href="https://github.com/naveensharmatech" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold hover:bg-surface"><Github size={16}/> GitHub</a><a href="/Naveen_Sharma_CV.pdf" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold hover:bg-surface">Résumé <ArrowUpRight size={15}/></a></div></div></section>

        <section id="contact" className="bg-[#c5f16b] px-5 py-16 text-[#172321] md:px-10 md:py-20"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><p className="text-xs font-semibold uppercase tracking-[.22em]">Next step</p><h2 className="mt-4 max-w-2xl text-clamp-h2 font-semibold tracking-[-.04em] md:text-6xl">Have a role or workflow to discuss?</h2></div><a href="mailto:contact@naveensharma.net" className="inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#172321] px-6 py-4 text-sm font-semibold text-white hover:bg-[#30443e]">Get in touch <ArrowRight size={17}/></a></div></section>
      </main>
      <footer className="bg-[#172321] px-5 pt-7 pb-[calc(1.75rem+env(safe-area-inset-bottom))] text-sm text-white/75 md:px-10"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3"><span>© {new Date().getFullYear()} Naveen Sharma</span><a href="https://opility.com" target="_blank" rel="noreferrer" className="hover:text-white">Opility — business services <ArrowUpRight className="ml-1 inline" size={13}/></a></div></footer>
    </div>
  );
}
