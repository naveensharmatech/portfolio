"use client";

import { useState } from "react";
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

  return (
    <div className="min-h-screen bg-[#f6f7f4] text-[#172321] selection:bg-[#c5f16b] selection:text-[#172321]">
      <header className="sticky top-0 z-50 border-b border-[#172321]/10 bg-[#f6f7f4]/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 md:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="Naveen Sharma home">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#172321] text-sm font-bold text-[#c5f16b]">NS</span>
            <span className="text-sm font-semibold tracking-tight">Naveen Sharma<span className="ml-2 text-[#71807b]">/ Portfolio</span></span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {navItems.map(([label, href]) => <a key={href} href={href} className="text-sm text-[#52615c] transition hover:text-[#172321]">{label}</a>)}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a href="https://www.linkedin.com/in/naveensharmatech" target="_blank" rel="noreferrer" className="rounded-full p-2 text-[#52615c] hover:bg-white" aria-label="LinkedIn"><Linkedin size={18}/></a>
            <a href="/Naveen_Sharma_CV.pdf" className="rounded-full bg-[#172321] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#30443e]">View résumé <ArrowUpRight className="ml-1 inline" size={15}/></a>
          </div>
          <button className="rounded-lg p-2 md:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
        </div>
        {menuOpen && <nav className="flex flex-col gap-1 border-t border-[#172321]/10 px-5 py-4 md:hidden" aria-label="Mobile navigation">{navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm hover:bg-white">{label}</a>)}<a href="/Naveen_Sharma_CV.pdf" className="mt-2 rounded-lg bg-[#172321] px-4 py-3 text-center text-sm font-semibold text-white">View résumé</a></nav>}
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-20 md:grid-cols-[1.2fr_.8fr] md:items-end md:px-10 md:pb-32 md:pt-28">
          <div>
            <p className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.22em] text-[#52615c]"><span className="h-px w-8 bg-[#52615c]"/> SaaS implementation · QA · automation</p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-.055em] sm:text-6xl lg:text-8xl">I make complex workflows <span className="underline decoration-[#a7d94f] decoration-[8px] underline-offset-[8px]">work better.</span></h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#52615c]">I’m Naveen, a SaaS implementation specialist focused on configuring business systems, validating workflows, and connecting tools so teams can use them with confidence.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#work" className="rounded-full bg-[#172321] px-6 py-4 text-sm font-semibold text-white hover:bg-[#30443e]">Explore selected work <ArrowDown className="ml-2 inline" size={16}/></a>
              <a href="mailto:contact@naveensharma.net" className="rounded-full border border-[#172321]/20 px-6 py-4 text-sm font-semibold hover:bg-white">Contact me <ArrowUpRight className="ml-2 inline" size={16}/></a>
            </div>
          </div>
          <aside className="relative overflow-hidden rounded-[2rem] bg-[#dfe8dd] p-8 md:p-10">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border border-[#172321]/10"/><div className="absolute -right-2 -top-2 h-32 w-32 rounded-full border border-[#172321]/10"/>
            <div className="relative">
              <div className="mb-10 flex items-center gap-4"><img src="/headshot-round.png" alt="Naveen Sharma" className="h-16 w-16 rounded-full object-cover"/><div><p className="font-semibold">Naveen Sharma</p><p className="mt-1 text-sm text-[#52615c]">Implementation Specialist</p></div></div>
              <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#52615c]">How I approach the work</p>
              <ol className="mt-5 space-y-4">{["Understand the process", "Configure the system", "Test with real users", "Document the handoff"].map((item, i) => <li key={item} className="flex items-center gap-3 border-b border-[#172321]/10 pb-4 text-sm"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#c5f16b] text-xs font-bold">0{i+1}</span>{item}</li>)}</ol>
              <a href="https://opility.com" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Business services at Opility <ArrowUpRight size={15}/></a>
            </div>
          </aside>
        </section>

        <section id="experience" className="border-y border-[#172321]/10 bg-white py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[.55fr_1fr] md:px-10">
            <div><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#71807b]">Experience</p><h2 className="mt-4 text-3xl font-semibold tracking-tight">Grounded in delivery.</h2></div>
            <div className="grid gap-8 md:grid-cols-2">
              <article><p className="text-sm font-semibold text-[#71807b]">Healthcare SaaS</p><h3 className="mt-2 text-xl font-semibold">Implementation Specialist</h3><p className="mt-3 leading-7 text-[#52615c]">Hands-on implementation work across system configuration, dynamic forms, workflow setup, data mapping, user acceptance testing, and technical support.</p></article>
              <article><p className="text-sm font-semibold text-[#71807b]">Quality & operations</p><h3 className="mt-2 text-xl font-semibold">Testing, training, process support</h3><p className="mt-3 leading-7 text-[#52615c]">Earlier experience in manufacturing QA and training/operations support informs a practical, detail-oriented approach to system changes and handoffs.</p></article>
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6"><div><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#71807b]">Selected work</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em]">Projects you can inspect.</h2></div><p className="max-w-md text-sm leading-6 text-[#52615c]">Public builds and published products. Client work is described at a high level to respect privacy.</p></div>
          <div className="grid gap-4">{projects.map(project => <article key={project.number} className="grid gap-5 rounded-3xl border border-[#172321]/10 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg md:grid-cols-[70px_1fr_auto] md:items-center md:p-8"><span className="text-sm font-semibold text-[#71807b]">{project.number}</span><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#71807b]">{project.type}</p><h3 className="mt-2 text-2xl font-semibold">{project.title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-[#52615c]">{project.description}</p><div className="mt-4 flex flex-wrap gap-2">{project.stack.map(item => <span key={item} className="rounded-full bg-[#f0f3ef] px-3 py-1 text-xs text-[#52615c]">{item}</span>)}</div></div><a href={project.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold">View project <ArrowUpRight size={16}/></a></article>)}</div>
        </section>

        <section id="capabilities" className="bg-[#172321] py-24 text-white md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-10"><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#c5f16b]">Capabilities</p><div className="mt-5 grid gap-12 md:grid-cols-[.65fr_1.35fr]"><h2 className="text-4xl font-semibold tracking-[-.04em]">Practical systems.<br/>Clear outcomes.</h2><div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">{capabilities.map(({icon: Icon,title,text}) => <article key={title} className="border-t border-white/20 pt-5"><Icon className="text-[#c5f16b]" size={22}/><h3 className="mt-4 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/65">{text}</p></article>)}</div></div></div>
        </section>

        <section id="about" className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[.65fr_1.35fr] md:px-10 md:py-28"><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#71807b]">A little about me</p><div><h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-.04em] md:text-5xl">I bridge the gap between how a tool is configured and how a team actually needs to use it.</h2><p className="mt-6 max-w-3xl text-base leading-8 text-[#52615c]">My work sits at the intersection of SaaS implementation, quality assurance, and workflow automation. I value clear requirements, reliable data, thoughtful testing, and documentation that helps the next person succeed.</p><div className="mt-8 flex flex-wrap gap-3"><a href="https://www.linkedin.com/in/naveensharmatech" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#172321]/20 px-5 py-3 text-sm font-semibold hover:bg-white"><Linkedin size={16}/> LinkedIn</a><a href="https://github.com/naveensharmatech" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#172321]/20 px-5 py-3 text-sm font-semibold hover:bg-white"><Github size={16}/> GitHub</a><a href="/Naveen_Sharma_CV.pdf" className="inline-flex items-center gap-2 rounded-full border border-[#172321]/20 px-5 py-3 text-sm font-semibold hover:bg-white">Résumé <ArrowUpRight size={15}/></a></div></div></section>

        <section id="contact" className="bg-[#c5f16b] px-5 py-20 md:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="text-xs font-semibold uppercase tracking-[.22em]">Next step</p><h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-.04em] md:text-6xl">Have a role or workflow to discuss?</h2></div><a href="mailto:contact@naveensharma.net" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#172321] px-6 py-4 text-sm font-semibold text-white hover:bg-[#30443e]">Get in touch <ArrowRight size={17}/></a></div></section>
      </main>
      <footer className="bg-[#172321] px-5 py-7 text-sm text-white/60 md:px-10"><div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3"><span>© {new Date().getFullYear()} Naveen Sharma</span><a href="https://opility.com" target="_blank" rel="noreferrer" className="hover:text-white">Opility — business services <ArrowUpRight className="ml-1 inline" size={13}/></a></div></footer>
    </div>
  );
}
