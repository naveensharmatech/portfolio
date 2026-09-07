import { useState, useEffect, useRef } from "react";
import {
  Menu, X, Mail, Github, MapPin, Globe, ArrowRight, CheckCircle2,
  Workflow, Headset, ShieldCheck, FileText, Layers, Database,
  ClipboardCheck, Code2, ExternalLink, Phone, Linkedin, Facebook, ChevronDown, Youtube, Briefcase,
  MessageCircle, Send, GraduationCap, Award, ExternalLink as LinkOut, FileDown,
  Search, Settings2, FlaskConical, LifeBuoy, Quote, Star,
} from "lucide-react";

/* ─── SCROLL-REVEAL WRAPPER ──────────────────────────────────── */
function Reveal({ as: Tag = "div", stagger = false, className = "", children, ...rest }) {
  const ref = useRef(null);
  const revealedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => {
      if (revealedRef.current) return;
      revealedRef.current = true;
      el.classList.add("is-visible");
    };

    const inViewport = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 1.05 && r.bottom > -50;
    };

    if (inViewport()) { reveal(); return; }

    let io;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) reveal(); }),
        { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
      );
      io.observe(el);
    }

    const onScroll = () => { if (inViewport()) reveal(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const failsafe = setTimeout(reveal, 2500);

    return () => {
      if (io) io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <Tag ref={ref} className={`${stagger ? "reveal-stagger" : "reveal"} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

function XIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ─── DATA ───────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Projects",       href: "#projects",       icon: Code2,         color: "amber"   },
  { label: "Experience",     href: "#experience",     icon: Briefcase,     color: "cyan"    },
  { label: "Certifications", href: "#certifications", icon: Award,         color: "rose"    },
  { label: "About",          href: "#about",          icon: Search,        color: "indigo"  },
  { label: "Contact",        href: "#contact",        icon: Mail,          color: "pink"    },
];

const NAV_COLOR_STYLES = {
  indigo:  { active: "bg-indigo-600 text-white shadow-md shadow-indigo-200",   hover: "hover:bg-indigo-50 hover:text-indigo-700"   },
  violet:  { active: "bg-violet-600 text-white shadow-md shadow-violet-200",   hover: "hover:bg-violet-50 hover:text-violet-700"   },
  sky:     { active: "bg-sky-600 text-white shadow-md shadow-sky-200",         hover: "hover:bg-sky-50 hover:text-sky-700"         },
  cyan:    { active: "bg-cyan-600 text-white shadow-md shadow-cyan-200",       hover: "hover:bg-cyan-50 hover:text-cyan-700"       },
  emerald: { active: "bg-emerald-600 text-white shadow-md shadow-emerald-200", hover: "hover:bg-emerald-50 hover:text-emerald-700" },
  amber:   { active: "bg-amber-500 text-white shadow-md shadow-amber-200",    hover: "hover:bg-amber-50 hover:text-amber-700"     },
  rose:    { active: "bg-rose-600 text-white shadow-md shadow-rose-200",      hover: "hover:bg-rose-50 hover:text-rose-700"       },
  pink:    { active: "bg-pink-600 text-white shadow-md shadow-pink-200",      hover: "hover:bg-pink-50 hover:text-pink-700"       },
};

const NAV_ICON_TEXT_COLOR = {
  indigo: "text-indigo-600", violet: "text-violet-600", sky: "text-sky-600", cyan: "text-cyan-600",
  emerald: "text-emerald-600", amber: "text-amber-600", rose: "text-rose-600", pink: "text-pink-600",
};

const EYEBROW_COLOR = {
  indigo: "text-indigo-600", violet: "text-violet-600", sky: "text-sky-600", cyan: "text-cyan-600",
  emerald: "text-emerald-600", amber: "text-amber-600", rose: "text-rose-600", pink: "text-pink-600",
  blue: "text-blue-600", gray: "text-gray-500",
};

const PILLARS = [
  {
    label: "BUILD",
    title: "AI & Workflow Automation",
    desc: "Design multi-step business automations using no-code/low-code platforms, workflow logic, conditional routing, CRM actions and integrations.",
    skills: ["Zapier", "AI Automation", "Workflow Automation", "No-Code Development", "HubSpot"],
    color: "blue",
  },
  {
    label: "IMPLEMENT",
    title: "SaaS Implementation",
    desc: "Configure workflows, forms, documents, data mappings and client-specific SaaS processes.",
    skills: ["SaaS Implementation", "System Configuration", "Data Mapping", "Workflow Configuration", "UAT"],
    color: "indigo",
  },
  {
    label: "VALIDATE",
    title: "QA & Workflow Validation",
    desc: "Test workflow paths, routing conditions, mappings, edge cases and failure scenarios before deployment.",
    skills: ["UAT", "Functional Testing", "Regression Testing", "Workflow Validation", "Software Testing"],
    color: "violet",
  },
];

const PILLAR_STYLES = {
  blue: { badge: "bg-blue-50 text-blue-600 border border-blue-100", border: "hover:border-blue-200" },
  indigo: { badge: "bg-indigo-50 text-indigo-600 border border-indigo-100", border: "hover:border-indigo-200" },
  violet: { badge: "bg-violet-50 text-violet-600 border border-violet-100", border: "hover:border-violet-200" },
};

const AUTOMATION_APPROACH = [
  { step: "01", title: "Understand", desc: "Map the business process, inputs, users and desired outcome.", icon: Search },
  { step: "02", title: "Design", desc: "Define triggers, actions, logic, routing and exceptions.", icon: Settings2 },
  { step: "03", title: "Build", desc: "Configure the workflow using suitable no-code/low-code tools.", icon: Workflow },
  { step: "04", title: "Integrate", desc: "Connect SaaS platforms, CRM systems, APIs and data.", icon: Database },
  { step: "05", title: "Test", desc: "Validate mappings, branches, inputs, edge cases and failures.", icon: FlaskConical },
  { step: "06", title: "Monitor", desc: "Document, observe and improve the workflow after deployment.", icon: LifeBuoy },
];

const EXPERIENCES = [
  {
    company: "Bolt Healthcare",
    period: "Aug 2022 – May 2026 · 3 yrs 10 mos",
    context: "Healthcare SaaS · Contract · Remote (NY, United States)",
    roles: ["Implementation Specialist"],
    summary: "SaaS implementation experience involving workflow configuration, dynamic forms and documents, data mapping, UAT, functional validation, troubleshooting and technical coordination.",
    skills: ["SaaS Implementation", "Workflow Automation", "System Configuration", "Data Mapping & Schema Design", "User Acceptance Testing"],
    callout: {
      title: "What this experience adds to my automation work",
      text: "Real-world SaaS implementation taught me that reliable automation depends on configuration accuracy, data integrity, user requirements, validation and failure handling — not simply connecting applications.",
    },
    endorsement: {
      quote: "Naveen is an invaluable asset to any team. Throughout our time working together, I have consistently been impressed by his dedication, professionalism, and exceptional work ethic. One of Naveen's standout qualities is his ability to tackle challenges head-on with a positive attitude. In addition to his strong work ethic, Naveen possesses excellent communication skills. He is adept at clearly articulating ideas, collaborating with team members, and effectively managing projects.",
      author: "Dovi Brackman",
      role: "Customer Experience Specialist at BOLT Healthcare",
      relationship: "Managed Naveen directly",
      date: "March 2024",
      linkedin: "https://www.linkedin.com/in/dovi-brackman/",
    },
    points: [
      { label: "Workflow Configuration & Automation", text: "Designed and deployed 500+ dynamic intake workflows for 25+ enterprise healthcare agency clients, converting manual paper-based processes into fully automated, compliant digital systems. Built complex conditional logic and data-binding schemas." },
      { label: "Data Mapping & Schema Configuration", text: "Built backend data-mapping schemas and configured field-level validation rules across diverse regulatory, referral, eligibility, and compliance form types." },
      { label: "QA & System Validation", text: "Executed UAT and regression testing on production forms; performed root-cause analysis on mapping logic failures to resolve production defects." },
      { label: "SaaS Platform Administration", text: "Utilized Super-Admin access to configure dynamic workflows, manage dropdown logic, and enable multi-tenant agency clients to operate independently across the platform." },
      { label: "Technical Coordination", text: "Managed technical issue triage via Basecamp, prioritizing by business impact and coordinating cross-functional resolution." },
    ],
  },
  {
    company: "Vishay Intertechnology, Inc.",
    period: "Nov 2021 – Dec 2022 · 1 yr 2 mos",
    context: "Electronics Manufacturing · Full-time · On-site (Be'er Sheva, Israel)",
    roles: ["Technical Operator — Quality Control & Validation"],
    summary: "Experience in operational quality checks, process validation, documentation and troubleshooting strengthened a systematic approach to validation and quality.",
    skills: ["Quality Control", "Process Validation", "Technical Documentation", "Troubleshooting"],
    points: [
      { label: "Process Validation & Equipment Operation", text: "Operated and maintained specialized precision manufacturing systems in a cleanroom environment, ensuring continuous high-integrity output through rigorous calibration and adherence to complex machine protocols." },
      { label: "Quality Engineering & Inspection", text: "Performed critical functional checks and quality control gates on chip resistor components; utilized automated machinery to identify microscopic discrepancies and maintain strict compliance with global industry standards." },
      { label: "Technical Reporting & Efficiency", text: "Managed detailed operational records utilizing machine performance data to facilitate process improvements and maintain high throughput across enterprise manufacturing operations." },
    ],
  },
  {
    company: "Shivam Institute for Vocational Trainings",
    period: "Aug 2012 – Sep 2015 · 3 yrs 2 mos",
    context: "Technical Training Centre · Self-employed · On-site (Dharamshala, India)",
    roles: ["Franchisee Owner — Operations & Technical Management"],
    summary: "Managed day-to-day operations of a vocational training center, including administration, technical resources, staff coordination, course delivery and student services.",
    skills: ["Operations Management", "Team Leadership", "Business Operations", "IT Operations"],
    supportingLine: "This experience built an early understanding of how people, systems and business processes must work together.",
    points: [
      { label: "Operational Leadership", text: "Managed end-to-end operations for a vocational training center franchise; drove growth in student enrollment through optimized course delivery and technical curriculum development." },
      { label: "IT Infrastructure Management", text: "Supervised maintenance of IT infrastructure and lab equipment; ensured high uptime for student workstations and training software across all operational hours." },
      { label: "Team Leadership & Training", text: "Led an instructor team to implement standardized training modules; achieved improvement in student certification success rates through structured curriculum delivery." },
    ],
  },
];

const FEATURED_PROJECTS = [
  {
    title: "AI-Powered Customer Inquiry Router",
    tag: "Flagship Automation",
    desc: "Multi-step customer inquiry automation that processes incoming messages, applies filtering and JavaScript logic, routes requests based on priority using Zapier Paths, and triggers HubSpot CRM and automated communication actions.",
    architecture: ["Gmail / Webhook", "Filter", "JavaScript Logic", "Zapier Paths", "HubSpot CRM", "Email Action"],
    skills: ["Zapier", "HubSpot", "JavaScript", "Workflow Automation", "Conditional Routing"],
    links: [
      { href: "https://www.linkedin.com/pulse/from-zapier-certification-production-how-i-built-email-naveen-sharma-ziyrf/", label: "Read Case Study (LinkedIn)", type: "site", icon: "linkedin" },
      { href: "https://github.com/naveensharmatech/customer-inquiry-router-zapier", label: "GitHub Repository & Setup", type: "code" },
    ],
  },
  {
    title: "B2B Leads Scraper — Verified Emails & Phones",
    tag: "Apify Actor · $1.50 / 1k Leads",
    desc: "Automated B2B lead-generation workflow that discovers businesses by category and location, crawls websites with Crawlee, extracts verified decision-maker emails, phones, and social coordinates, and outputs structured Apify Datasets.",
    architecture: ["Business Discovery", "Crawl (Crawlee)", "Extract (Emails/Phones)", "Deduplicate", "Apify Dataset"],
    skills: ["Apify", "Crawlee", "JavaScript/Node.js", "Web Data Extraction", "Workflow Automation"],
    links: [
      { href: "https://apify.com/opility/b2b-leads-scraper-1-5-1k-leads-emails-phones", label: "Live Actor on Apify", type: "site" },
      { href: "https://www.linkedin.com/posts/naveensharmatech_b2b-lead-generator-for-verified-emails-and-activity-7496760139144929280-pVeb", label: "LinkedIn Overview", type: "linkedin" },
      { href: "https://github.com/naveensharmatech", label: "GitHub Profile", type: "code" },
    ],
  },
  {
    title: "Shopify Store Lead Extractor — Emails, Catalog Size & Apps",
    tag: "Apify Actor · Data Automation",
    desc: "Python-based Apify Actor that discovers Shopify stores by niche, extracts business emails and Instagram/TikTok profiles, inspects /products.json catalog signals, detects supported ecommerce apps (Klaviyo, Yotpo, Gorgias, Recharge), and exports structured lead records.",
    architecture: ["Store Discovery", "Crawl", "Contact Extraction", "App Fingerprinting", "Catalog Signals", "Apify Dataset"],
    skills: ["Python", "Apify SDK", "Web Data Extraction", "Store Discovery", "HTTPX", "BeautifulSoup"],
    links: [
      { href: "https://apify.com/opility/shopify-store-lead-extractor-emails-catalog-size-apps", label: "Live Actor on Apify", type: "site" },
      { href: "https://apify.com/opility/shopify-store-lead-extractor-emails-catalog-size-apps/examples/shopify-store-lead-extractor-task", label: "Configured Task Example", type: "example" },
      { href: "https://github.com/naveensharmatech", label: "GitHub Profile", type: "code" },
    ],
  },
];

const EARLIER_PROJECTS = [
  {
    title: "Professional Portfolio Website",
    tag: "Personal Project",
    desc: "Designed, built, and deployed this professional portfolio site end-to-end using React, Vite, Tailwind CSS, and Cloudflare Pages.",
    skills: ["React", "Vite", "Tailwind CSS", "Cloudflare Pages"],
    links: [
      { href: "https://naveensharma.net", label: "Visit live site", type: "site" },
      { href: "https://github.com/naveensharmatech/naveensharma-portfolio", label: "GitHub", type: "code" },
    ],
  },
  {
    title: "Django Blogging CMS — BCA Academic Project",
    tag: "Academic Project",
    desc: "A content management system demonstrating authentication, CRUD operations, category management, and an admin dashboard.",
    skills: ["Python", "Django", "MySQL", "Bootstrap"],
    file: "/docs/Django-Blogging-CMS-Project.pdf",
    fileLabel: "View project doc (PDF)",
  },
  {
    title: "Streaming Platform — Software Test Plan",
    tag: "QA Certification Project",
    desc: "Structured QA documentation covering methodology, risk assessment, and test execution planning.",
    skills: ["Test Documentation", "QA Methodology", "Risk Assessment"],
    file: "/docs/Netflix-Subscription-Test-Plan.docx",
    fileLabel: "Download test plan (DOCX)",
  },
  {
    title: "Warehouse Management System — Software Test Plan",
    tag: "QA Certification Project",
    desc: "Test planning and strategy demonstrating risk analysis, regression and sanity testing, and the full defect lifecycle.",
    skills: ["Test Planning", "Risk Analysis", "Regression Testing"],
    file: "/docs/Warehouse-Management-System-Test-Plan.pdf",
    fileLabel: "View test plan (PDF)",
  },
];

const CERTIFICATIONS = [
  {
    group: "AI & Automation",
    badge: "10 Credentials",
    highlight: {
      label: "Zapier AI Agent Certification Path Breakdown",
      desc: "Read Naveen's systems architecture breakdown on LinkedIn",
      href: "https://www.linkedin.com/posts/naveensharmatech_zapier-aiautomation-nocode-activity-7499675350231351296-wy2J",
    },
    items: [
      { institution: "Zapier Academy", degree: "Jumpstart", type: "Certification" },
      { institution: "Zapier Academy", degree: "Building Basic Zaps", type: "Certification" },
      { institution: "Zapier Academy", degree: "Building Intermediate Zaps", type: "Certification" },
      { institution: "Zapier Academy", degree: "Building AI Agents", type: "Certification" },
      { institution: "Zapier Academy", degree: "What is Zapier MCP?", type: "Certification" },
      { institution: "Zapier Academy", degree: "Using Zapier MCP", type: "Certification" },
      { institution: "Zapier Academy", degree: "Governing Zapier MCP", type: "Certification" },
      { institution: "Zapier Academy", degree: "Account Setup", type: "Certification" },
      { institution: "Zapier Academy", degree: "Security and Governance", type: "Certification" },
      { institution: "Zapier Academy", degree: "Monitoring and Operations", type: "Certification" },
    ],
  },
  {
    group: "QA & Testing",
    items: [
      { institution: "Smart College", degree: "QA Engineering Certification (Web & Mobile)", type: "Professional Certification" },
      { institution: "Great Learning", degree: "Automation Testing", type: "Certification" },
      { institution: "Programming Hub", degree: "Software Engineering", type: "Certification" },
    ],
  },
  {
    group: "SaaS / Service Management",
    items: [
      { institution: "Atlassian", degree: "Jira Service Management Fundamentals", type: "Certification" },
      { institution: "HP LIFE", degree: "Customer Relationship Management", type: "Certification" },
    ],
  },
  {
    group: "Currently Learning",
    items: [
      { institution: "Make.com", degree: "Make.com Automation", type: "In Progress" },
      { institution: "n8n", degree: "n8n Workflow Automation", type: "In Progress" },
      { institution: "HubSpot Academy", degree: "HubSpot Certification", type: "In Progress" },
    ],
  },
];

const EDUCATION_DEGREE = {
  institution: "Amity University Online",
  degree: "BCA — Bachelor of Computer Applications",
  focus: "Cloud Computing & Security",
  period: "Jan 2022 – Jan 2025",
};

const SKILL_GROUPS = [
  {
    label: "AI & Automation",
    skills: ["AI Automation", "Workflow Automation", "Zapier", "AI Agents", "No-Code Development", "Low-Code Development", "Model Context Protocol (MCP)"],
  },
  {
    label: "SaaS & Integrations",
    skills: ["SaaS Implementation", "HubSpot", "API Integration", "System Configuration", "Data Mapping & Schema Design"],
  },
  {
    label: "QA & Validation",
    skills: ["User Acceptance Testing", "Functional Testing", "Regression Testing", "Software Testing", "Quality Assurance (QA/UAT)"],
  },
  {
    label: "Platforms & Tools",
    skills: ["Zapier", "HubSpot", "Make.com", "n8n", "Apify", "GitHub", "Anthropic Claude"],
  },
];

const CAREER_TIMELINE = [
  { company: "Shivam Institute", role: "Operations & Technical Management", colorClass: "bg-rose-500" },
  { company: "Vishay Intertechnology", role: "Process Quality & Validation", colorClass: "bg-amber-500" },
  { company: "Bolt Healthcare", role: "SaaS Implementation + QA/UAT", colorClass: "bg-cyan-500" },
  { company: "Current", role: "AI & Workflow Automation", colorClass: "bg-blue-600" },
];

const LINKEDIN_REVIEWS = [
  {
    name: "Dovi Brackman",
    role: "Customer Experience Specialist at BOLT Healthcare",
    service: "SaaS Development & QA",
    rating: 5,
    date: "July 2026",
    text: "I had the pleasure of working with Naveen on SaaS implementations and QA. They were consistently detail-oriented, reliable, and committed to delivering a great client experience. Their ability to identify issues, collaborate across teams, and ensure smooth implementations made them a valuable teammate. I would gladly work with them again and highly recommend them to any organization.",
  },
  {
    name: "Marc Mutterperl",
    role: "Novelist | Healthcare Ops + Tech | Transforming Agencies Through Data, Systems & Leadership",
    service: "Software Testing",
    rating: 5,
    date: "July 2026",
    text: "It was a pleasurable experience working with Naveen.",
  },
];

const FAQS = [
  {
    q: "What kind of roles are you looking for?",
    a: "I'm looking for roles in AI Automation, Workflow Automation, SaaS Implementation and related no-code/low-code opportunities. I'm open to full-time, hybrid, or remote positions in Israel and internationally.",
  },
  {
    q: "What automation tools do you use?",
    a: "I primarily work with Zapier for workflow automation, and I'm expanding into Make.com and n8n. I also use Apify for web data extraction and HubSpot for CRM workflows. My approach is platform-agnostic — I choose the right tool for each business process.",
  },
  {
    q: "What was your role at Bolt Healthcare?",
    a: "I was an Implementation Specialist, configuring SaaS form workflows, data mapping schemas, and validation testing for a healthcare intake platform used by 25+ agencies. This gave me deep experience in workflow configuration, system validation, and process automation.",
  },
  {
    q: "Are you available for remote or international work?",
    a: "Yes — I work fully remote and am available for international roles and contracts. I'm based in Be'er Sheva, Israel, and have worked with US-based teams. I'm also open to hybrid or on-site roles within Israel.",
  },
  {
    q: "Do you offer B2B services or contracting?",
    a: "Yes — B2B services including automation consulting, SaaS implementation, and QA services are offered through Opility, my registered IT services business. Visit opility.com or email hello@opility.com for enquiries.",
  },
  {
    q: "How do I get in touch?",
    a: "Email me at contact@naveensharma.net, connect on LinkedIn at linkedin.com/in/naveensharmatech, or call 058-789-6289. I typically respond within one business day.",
  },
];

const QUICK_QUESTIONS = [
  "What automation tools do you use?",
  "What was your role at Bolt Healthcare?",
  "Are you open to remote work?",
  "What certifications do you have?",
  "Do you offer B2B / contract services?",
  "How do I get in touch?",
];

/* ─── COMPONENTS ─────────────────────────────────────────────── */

function SectionHeading({ eyebrow, title, description, center, color }) {
  const eyebrowColor = EYEBROW_COLOR[color] || "text-blue-600";
  return (
    <Reveal className={`mb-16 ${center ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}`}>
      {eyebrow && (
        <p className={`mb-3 text-base font-bold uppercase tracking-widest ${eyebrowColor}`}>{eyebrow}</p>
      )}
      <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{title}</h2>
      {description && (
        <p className="mt-5 text-xl leading-relaxed text-gray-600">{description}</p>
      )}
    </Reveal>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-sm border-b border-gray-100 bg-white/95 backdrop-blur" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#top" className="flex items-center gap-3 group">
          <img
            src="/nav-logo.png"
            alt="Naveen Sharma"
            className="h-10 w-10 rounded-full object-cover shadow-md transition-transform group-hover:scale-110"
          />
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-gray-100 bg-gray-50 p-1.5 lg:flex">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const styles = NAV_COLOR_STYLES[link.color];
            const isActive = activeNav === link.href;
            return (
              <a key={link.href} href={link.href}
                onClick={() => setActiveNav(link.href)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive ? styles.active : `text-gray-600 ${styles.hover}`
                }`}>
                <Icon size={15} />
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="https://opility.com" target="_blank" rel="noreferrer"
            className="text-sm font-semibold text-blue-600 transition hover:text-blue-700 flex items-center gap-1 whitespace-nowrap">
            Opility <LinkOut size={12} />
          </a>
          <a href="#contact"
            className="whitespace-nowrap rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 shadow-sm">
            Get in touch
          </a>
        </div>

        <button onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 lg:hidden"
          aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-gray-100 bg-white lg:hidden">
          <div className="mx-auto flex max-w-5xl flex-col px-4 py-2 sm:px-6">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const iconColor = NAV_ICON_TEXT_COLOR[link.color];
              return (
                <a key={link.href} href={link.href} onClick={() => { setOpen(false); setActiveNav(link.href); }}
                  className="flex items-center gap-2.5 border-b border-gray-100 py-3 text-base font-medium text-gray-700 transition hover:text-blue-600">
                  <Icon size={17} className={iconColor} />
                  {link.label}
                </a>
              );
            })}
            <a href="https://opility.com" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}
              className="border-b border-gray-100 py-3 text-base font-medium text-blue-600 flex items-center gap-1">
              Opility <LinkOut size={12} />
            </a>
            <a href="#contact" onClick={() => setOpen(false)}
              className="mt-3 mb-2 rounded-lg bg-blue-600 px-4 py-3 text-center text-base font-semibold text-white">
              Get in touch
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <div className="orb h-72 w-72 bg-blue-300/40" style={{ top: "-40px", right: "6%" }} />
      <div className="orb h-64 w-64 bg-indigo-200/30" style={{ top: "180px", left: "2%", animationDelay: "3s" }} />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 text-center">
        <Reveal className="mb-6 flex justify-center">
          <span className="rounded-full bg-blue-50 px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-600 border border-blue-100 shadow-sm">
            AI AUTOMATION • SAAS IMPLEMENTATION • QA/UAT
          </span>
        </Reveal>

        <Reveal as="h1" className="gradient-text text-5xl font-extrabold tracking-tight sm:text-7xl mb-4 mt-2">
          AI Automation Engineer
        </Reveal>

        <Reveal as="p" className="text-xl font-bold text-gray-800 sm:text-3xl mb-6">
          Building Practical Automations for Real Business Processes
        </Reveal>

        <Reveal as="p" className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 mb-8">
          I build and validate practical business automations using no-code/low-code platforms, workflow logic, CRM integrations and SaaS systems. My background in SaaS implementation and QA/UAT helps me design workflows that work beyond the happy path.
        </Reveal>

        <Reveal className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {["Zapier", "No-Code/Low-Code", "HubSpot", "Workflow Automation", "SaaS Implementation", "QA/UAT"].map(skill => (
            <span key={skill} className="rounded-full bg-gray-50 px-4 py-1.5 text-xs sm:text-sm font-semibold text-gray-700 border border-gray-200 shadow-2xl">
              {skill}
            </span>
          ))}
        </Reveal>

        {/* Workflow Architecture Diagram */}
        <Reveal className="mx-auto max-w-4xl mb-12 rounded-2xl border border-gray-200 bg-gray-50/80 p-6 sm:p-8 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 text-center">
            Workflow Architecture &amp; Execution Framework
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-2 items-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center p-3 rounded-xl bg-white border border-gray-200 shadow-sm w-full">
              <span className="text-xs font-bold uppercase text-gray-400">Trigger</span>
              <span className="text-sm font-extrabold text-gray-900 mt-1">INPUT</span>
              <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mt-2">CAPTURE</span>
            </div>

            <div className="hidden sm:flex justify-center text-blue-400">
              <ArrowRight size={20} />
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center p-3 rounded-xl bg-white border border-blue-200 shadow-sm w-full">
              <span className="text-xs font-bold uppercase text-gray-400">Processing</span>
              <span className="text-sm font-extrabold text-blue-700 mt-1">AI / LOGIC</span>
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded mt-2">VALIDATE &amp; ROUTE</span>
            </div>

            <div className="hidden sm:flex justify-center text-blue-400">
              <ArrowRight size={20} />
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center p-3 rounded-xl bg-white border border-gray-200 shadow-sm w-full">
              <span className="text-xs font-bold uppercase text-gray-400">Execution</span>
              <span className="text-sm font-extrabold text-gray-900 mt-1">CRM / SaaS</span>
              <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded mt-2">ACTION &amp; MONITOR</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-gray-500 pt-4 border-t border-gray-200/60">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={13} className="text-emerald-500" /> Validation Gates</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={13} className="text-blue-500" /> Conditional Routing</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={13} className="text-indigo-500" /> Automated Testing</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={13} className="text-purple-500" /> Error Monitoring</span>
          </div>
        </Reveal>

        <Reveal className="flex flex-wrap items-center justify-center gap-4">
          <a href="#projects"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-base sm:text-lg font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl">
            View Automation Projects <ArrowRight size={18} />
          </a>
          <a href="https://github.com/naveensharmatech" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-8 py-3.5 text-base sm:text-lg font-semibold text-gray-700 transition hover:-translate-y-0.5 hover:border-gray-300 hover:text-gray-900">
            <Github size={18} /> View GitHub
          </a>
        </Reveal>
        
        <Reveal className="mt-6">
          <a href="/Naveen_Sharma_CV.pdf" download
            className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-blue-600 hover:underline">
            <FileDown size={16} /> Download Resume (PDF)
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function TrustBar() {
  const tools = ["Zapier", "HubSpot", "Apify", "Make.com", "n8n", "GitHub"];
  return (
    <div className="border-y border-gray-100 bg-gray-50 py-6">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="mb-4 text-center text-xs sm:text-sm font-semibold uppercase tracking-widest text-gray-400">
          Automation platforms &amp; tools
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {tools.map((t) => (
            <span key={t} className="text-base font-semibold text-gray-600">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Pillars() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading eyebrow="About" center color="indigo" title="What I Do" />
        
        <Reveal stagger className="grid gap-6 md:grid-cols-3 mb-12">
          {PILLARS.map((pillar) => {
            const styles = PILLAR_STYLES[pillar.color] || PILLAR_STYLES.blue;
            return (
              <div key={pillar.title} className={`tilt-card flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm ${styles.border}`}>
                <span className={`inline-block self-start rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4 ${styles.badge}`}>
                  {pillar.label}
                </span>
                <h3 className="text-xl font-extrabold text-gray-900 mb-3">{pillar.title}</h3>
                <p className="flex-1 text-base leading-relaxed text-gray-600 mb-6">{pillar.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {pillar.skills.map((skill) => (
                    <span key={skill} className="rounded-md bg-gray-50 border border-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </Reveal>
        
        <Reveal className="flex items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-widest">
          <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-md">BUILD</span>
          <ArrowRight size={14} className="text-gray-400" />
          <span className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md">IMPLEMENT</span>
          <ArrowRight size={14} className="text-gray-400" />
          <span className="text-violet-600 bg-violet-50 px-3 py-1 rounded-md">VALIDATE</span>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  return (
    <section id="projects" className="bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading eyebrow="Projects" title="Featured Automation Projects" color="amber" 
          description="Production and prototype workflows engineered with conditional routing, data extraction, and CRM actions." />
        
        <Reveal className="mb-10 -mt-2 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-blue-200/90 bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-white p-5 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <Workflow size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">AI Agent &amp; Model Context Protocol (MCP) Ready</p>
              <p className="text-xs text-gray-600 mt-0.5">Both Apify data extractors are equipped for direct invocation by LLM agents via the Model Context Protocol.</p>
            </div>
          </div>
          <a href="https://mcp.apify.com/?tools=actors,docs,opility/shopify-store-lead-extractor-emails-catalog-size-apps,opility/b2b-leads-scraper-1-5-1k-leads-emails-phones"
            target="_blank" rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white border border-blue-200 px-4 py-2 text-xs font-bold text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition shadow-xs">
            Connect via Apify MCP <ExternalLink size={13} />
          </a>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-1 mb-16">
          {FEATURED_PROJECTS.map((project) => (
            <div key={project.title} className="tilt-card rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-700 border border-amber-200">
                  {project.tag}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{project.title}</h3>
              <p className="text-base sm:text-lg leading-relaxed text-gray-600 mb-6">{project.desc}</p>
              
              {/* Architecture diagram */}
              <div className="mb-6 rounded-xl bg-gray-50 p-4 border border-gray-200/80 overflow-x-auto">
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Pipeline Flow</p>
                <div className="flex items-center gap-2 min-w-max">
                  {project.architecture.map((node, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm font-semibold text-gray-800 shadow-sm">
                        {node}
                      </span>
                      {i < project.architecture.length - 1 && <ArrowRight size={14} className="text-gray-400 shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.skills.map((skill) => (
                  <span key={skill} className="rounded-lg bg-gray-100 px-3 py-1 text-xs sm:text-sm font-semibold text-gray-700">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                {project.links.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                      link.type === 'site' 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' 
                        : 'border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:text-gray-900 bg-white'
                    }`}>
                    {link.type === "code" || link.icon === "github" ? (
                      <Github size={16} />
                    ) : link.type === "linkedin" || link.icon === "linkedin" ? (
                      <Linkedin size={16} className={link.type === 'site' ? 'text-white' : 'text-[#0A66C2]'} />
                    ) : (
                      <ExternalLink size={16} />
                    )}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Earlier Projects */}
        <div className="pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-extrabold text-gray-900 mb-6">Earlier Technical Projects</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {EARLIER_PROJECTS.map((project) => (
              <div key={project.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">{project.tag}</span>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.skills.map((skill) => (
                      <span key={skill} className="rounded-md bg-gray-50 border border-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                  {project.links && project.links.map(link => (
                    <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1">
                      {link.type === "code" ? <Github size={14} /> : <ExternalLink size={14} />} {link.label}
                    </a>
                  ))}
                  {project.file && (
                    <a href={project.file} target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1">
                      <FileDown size={14} /> {project.fileLabel}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AutomationApproach() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading eyebrow="Approach" center color="sky" title="How I Build Automations"
          description="A structured engineering framework applied to every workflow to ensure data reliability and prevent breakages." />
        
        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AUTOMATION_APPROACH.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.step} className="relative" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="tilt-card relative z-10 rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-600/20">
                    <Icon size={24} />
                  </div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-widest text-sky-600">Step {p.step}</p>
                  <h3 className="mt-1 text-lg font-extrabold text-gray-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading eyebrow="Experience" title="Professional Experience" color="cyan" />
        <div className="space-y-8">
          {EXPERIENCES.map((exp) => (
            <div key={exp.company} className="tilt-card rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900">{exp.company}</h3>
                  <p className="mt-1 text-base font-semibold text-cyan-700">{exp.context}</p>
                </div>
                <span className="rounded-full bg-cyan-50 px-4 py-1.5 text-sm font-bold text-cyan-700 border border-cyan-100">
                  {exp.period}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {exp.roles.map((role) => (
                  <span key={role} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-bold text-gray-800">
                    {role}
                  </span>
                ))}
              </div>
              
              <p className="text-base sm:text-lg text-gray-600 mb-6">{exp.summary}</p>
              
              <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-gray-100">
                {exp.skills.map((skill) => (
                  <span key={skill} className="rounded-md bg-cyan-50 text-cyan-800 px-2.5 py-1 text-xs font-semibold border border-cyan-100">
                    {skill}
                  </span>
                ))}
              </div>

              <ul className="space-y-4 mb-6">
                {exp.points.map((point, i) => (
                  <li key={i} className="flex gap-3 text-base leading-relaxed text-gray-600">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-cyan-600" />
                    <span>
                      <span className="font-semibold text-gray-900">{point.label}: </span>
                      {point.text}
                    </span>
                  </li>
                ))}
              </ul>
              
              {exp.callout && (
                <div className="rounded-xl bg-blue-50 border border-blue-100 p-5 mt-4">
                  <h4 className="text-sm font-bold text-blue-900 mb-1">{exp.callout.title}</h4>
                  <p className="text-sm text-blue-800 leading-relaxed">{exp.callout.text}</p>
                </div>
              )}

              {exp.endorsement && (
                <div className="mt-5 rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/30 p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
                        <Quote size={16} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-950">
                        Direct Manager Endorsement · LinkedIn
                      </span>
                    </div>
                    {exp.endorsement.linkedin && (
                      <a href={exp.endorsement.linkedin} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition">
                        <Linkedin size={13} className="text-[#0A66C2]" /> LinkedIn <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                  <blockquote className="text-sm sm:text-base italic leading-relaxed text-gray-700 mb-4">
                    "{exp.endorsement.quote}"
                  </blockquote>
                  <div className="pt-3 border-t border-blue-100/80 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-extrabold text-gray-900">{exp.endorsement.author}</p>
                      <p className="text-xs text-gray-500">{exp.endorsement.role} · <span className="font-semibold text-blue-700">{exp.endorsement.relationship}</span></p>
                    </div>
                  </div>
                </div>
              )}

              {exp.supportingLine && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-500 italic">{exp.supportingLine}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading 
          eyebrow="Testimonials" 
          center 
          title="Client & Colleague Endorsements" 
          color="emerald"
          description="Verified 5.0 / 5.0 client feedback on LinkedIn Services across project quality, technical knowledge, communication, and timeliness."
        />

        {/* Rating summary bar */}
        <Reveal className="mb-12 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6 text-center sm:gap-10 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-extrabold text-gray-900">5.0</span>
            <div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-xs font-bold text-gray-500 mt-0.5">LinkedIn Services Rating</p>
            </div>
          </div>

          <div className="hidden sm:block h-10 w-px bg-emerald-200/60"></div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-semibold text-gray-700">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-emerald-600" /> Project Satisfaction: 5.0</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-emerald-600" /> Knowledge: 5.0</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-emerald-600" /> Communication: 5.0</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-emerald-600" /> Timeliness: 5.0</span>
          </div>
        </Reveal>

        {/* Reviews Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {LINKEDIN_REVIEWS.map((rev) => (
            <div key={rev.name} className="tilt-card flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-100 flex items-center gap-1">
                    <Linkedin size={12} className="text-[#0A66C2]" /> {rev.service}
                  </span>
                </div>
                <blockquote className="text-sm sm:text-base italic leading-relaxed text-gray-700 mb-6">
                  "{rev.text}"
                </blockquote>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-extrabold text-gray-900">{rev.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{rev.role}</p>
                </div>
                <span className="text-xs text-gray-400 font-medium shrink-0">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="https://linkedin.com/in/naveensharmatech" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition">
            <Linkedin size={16} className="text-[#0A66C2]" /> View full recommendations &amp; services on LinkedIn <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}

function CareerJourney() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading eyebrow="Journey" center title="From Operations to Intelligent Automation" color="blue" />
        
        <div className="relative pl-6 sm:pl-0">
          <div className="absolute left-6 sm:left-1/2 top-2 bottom-2 w-0.5 bg-gray-200 -translate-x-1/2"></div>
          <div className="space-y-10">
            {CAREER_TIMELINE.map((step, i) => (
              <div key={i} className={`relative flex sm:justify-between items-center w-full ${i % 2 === 0 ? "sm:flex-row-reverse" : ""}`}>
                <div className="hidden sm:block w-5/12"></div>
                <div className={`absolute left-0 sm:left-1/2 h-4 w-4 rounded-full border-4 border-white shadow-sm -translate-x-1/2 ${step.colorClass}`}></div>
                <div className={`w-full sm:w-5/12 ${i % 2 === 0 ? "sm:text-left ml-6 sm:ml-0" : "sm:text-right ml-6 sm:ml-0"}`}>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{step.company}</p>
                  <p className="text-base sm:text-lg font-extrabold text-gray-900 mt-0.5">{step.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-2xl bg-gray-50 border border-gray-100 p-6 text-center">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            "My career has progressively moved closer to the systems behind business operations — from managing processes, to validating them, to implementing SaaS workflows, and now to automating them."
          </p>
        </div>
      </div>
    </section>
  );
}

function CertificationsSection() {
  return (
    <section id="certifications" className="bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading eyebrow="Learning" title="Certifications &amp; Learning" color="rose" />
        
        {/* Degree */}
        <div className="mb-10 tilt-card rounded-2xl border border-rose-200 bg-white p-8 shadow-sm flex flex-col md:flex-row items-start gap-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
            <GraduationCap size={28} />
          </div>
          <div>
            <span className="rounded-full bg-rose-50 text-rose-700 text-xs font-bold px-3 py-1 mb-2 inline-block border border-rose-100">
              Degree
            </span>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-1">{EDUCATION_DEGREE.degree}</h3>
            <p className="text-base font-semibold text-gray-700">{EDUCATION_DEGREE.institution}</p>
            <p className="text-sm text-gray-500 mt-1">{EDUCATION_DEGREE.focus} · {EDUCATION_DEGREE.period}</p>
          </div>
        </div>

        {/* Certification Groups */}
        <div className="grid gap-6 md:grid-cols-2 mb-10">
          {CERTIFICATIONS.map((group) => (
            <div key={group.group} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <h3 className="text-lg font-extrabold text-gray-900">{group.group}</h3>
                  {group.badge && (
                    <span className="rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold px-2.5 py-0.5 border border-blue-100">
                      {group.badge}
                    </span>
                  )}
                </div>
                <ul className="space-y-3">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-sm font-bold text-gray-800">{item.degree}</p>
                        <p className="text-xs text-gray-500">{item.institution}</p>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0 ${
                        item.type === 'In Progress' 
                          ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.type}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {group.highlight && (
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <a href={group.highlight.href} target="_blank" rel="noreferrer"
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-blue-50/70 hover:bg-blue-100/70 border border-blue-100 text-blue-700 transition group">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="h-7 w-7 rounded-lg bg-white border border-blue-200 flex items-center justify-center shrink-0 shadow-xs">
                        <Linkedin size={15} className="text-[#0A66C2]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-gray-900 truncate group-hover:text-blue-700 transition">{group.highlight.label}</p>
                        <p className="text-[11px] text-gray-500 truncate">{group.highlight.desc}</p>
                      </div>
                    </div>
                    <ExternalLink size={13} className="text-blue-500 group-hover:translate-x-0.5 transition shrink-0" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Languages */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-extrabold text-gray-900 mb-4">Languages</h3>
          <div className="flex flex-wrap gap-4">
            {[
              { lang: "Hindi", level: "Native / bilingual proficiency" },
              { lang: "English", level: "Professional working proficiency" },
              { lang: "Hebrew", level: "Elementary proficiency" },
            ].map((l) => (
              <div key={l.lang} className="rounded-xl bg-gray-50 px-4 py-2.5 border border-gray-200">
                <p className="text-sm font-bold text-gray-900">{l.lang}</p>
                <p className="text-xs text-gray-500">{l.level}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading eyebrow="Tools" center title="Technical Skills"
          description="Grouped competencies across automation, SaaS integrations, quality assurance, and platforms." />
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label} className="tilt-card rounded-2xl border border-gray-100 bg-gray-50 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-extrabold text-gray-900 mb-4">{group.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="rounded-md bg-white border border-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-gray-50">
      <div className="orb h-72 w-72 bg-indigo-300/40" style={{ top: "-30px", left: "4%" }} />
      <div className="orb h-64 w-64 bg-rose-300/30" style={{ bottom: "0%", right: "3%", animationDelay: "2s" }} />
      
      <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading eyebrow="Contact" center color="pink"
          title="Need Help Automating a Business Process?"
          description="I'm open to AI Automation, Workflow Automation, SaaS Implementation and related no-code/low-code opportunities." />

        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <a href="mailto:contact@naveensharma.net"
              className="rounded-full bg-blue-600 px-7 py-3 text-base font-bold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700 hover:shadow-lg">
              Contact Me
            </a>
            <a href="https://linkedin.com/in/naveensharmatech" target="_blank" rel="noreferrer"
              className="rounded-full border-2 border-gray-200 bg-white px-7 py-3 text-base font-bold text-gray-700 transition hover:border-blue-400 hover:text-blue-600 shadow-sm">
              LinkedIn
            </a>
            <a href="https://github.com/naveensharmatech" target="_blank" rel="noreferrer"
              className="rounded-full border-2 border-gray-200 bg-white px-7 py-3 text-base font-bold text-gray-700 transition hover:border-blue-400 hover:text-blue-600 shadow-sm">
              GitHub
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { href: "mailto:contact@naveensharma.net",               icon: Mail,     label: "Email",    text: "contact@naveensharma.net",         external: false, link: true,  color: "indigo"  },
              { href: "tel:+972587896289",                              icon: Phone,    label: "Phone",    text: "058-789-6289",                      external: false, link: true,  color: "emerald" },
              { href: null,                                             icon: MapPin,   label: "Location", text: "Be'er Sheva, Israel",              external: false, link: false, color: "rose"    },
            ].map(({ href, icon: Icon, label, text, external, link, color }) => {
              const classes = "tilt-card flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-white p-5 hover:border-gray-200 text-center shadow-sm";
              const iconBg = {
                indigo: "bg-indigo-50 text-indigo-600",
                emerald: "bg-emerald-50 text-emerald-600",
                rose: "bg-rose-50 text-rose-600",
              }[color];
              const inner = (
                <>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
                    <Icon size={18} />
                  </div>
                  <div className="w-full">
                    <p className="text-xs font-semibold text-gray-400">{label}</p>
                    <p className="truncate text-sm font-bold text-gray-900 mt-0.5">{text}</p>
                  </div>
                  {external && <ExternalLink size={13} className="shrink-0 text-gray-300" />}
                </>
              );
              return link ? (
                <a key={label} href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className={classes}>
                  {inner}
                </a>
              ) : (
                <div key={label} className={classes}>{inner}</div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4">
            <a href="/Naveen_Sharma_CV.pdf" target="_blank" rel="noreferrer"
              className="text-sm font-semibold text-blue-600 hover:underline">
              View CV
            </a>
            <span className="text-gray-300">·</span>
            <a href="/Naveen_Sharma_CV.pdf" download
              className="text-sm font-semibold text-blue-600 hover:underline">
              Download CV (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const LEGAL_DOCS = {
  privacy: {
    title: "Privacy & Data Policy",
    content: [
      { heading: "Who we are", body: "naveensharma.net is the personal professional website of Naveen Sharma, based in Be'er Sheva, Israel. B2B services are provided through Opility (opility.com), a separate registered business. Contact: contact@naveensharma.net" },
      { heading: "What personal data we collect", body: "This is a static informational website. We do not operate contact forms, user accounts, or server-side data collection of any kind.\n\nIf you contact me directly by email, LinkedIn, phone, or any other channel, I collect only the information you choose to provide (name, company, email address, message content). That data is used exclusively to respond to your enquiry and is never sold, rented, or shared with third parties." },
      { heading: "Legal basis for processing (GDPR)", body: "Where applicable, personal data is processed on the basis of legitimate interest (responding to business enquiries) or pre-contractual steps. Data is retained only as long as necessary to fulfil the purpose for which it was provided, or as required by Israeli or EU law." },
      { heading: "Your rights", body: "If you are located in the EU/EEA or Israel, you have the right to:\n• Access the personal data held about you\n• Request correction or erasure of that data\n• Object to processing or request restriction\n• Lodge a complaint with your local data protection authority\n\nTo exercise any of these rights, contact contact@naveensharma.net. I will respond within 30 days." },
      { heading: "Cookies & third-party embeds", body: "This site does not set its own cookies or use tracking pixels, advertising networks, or analytics services. This site may embed YouTube videos. If you interact with a YouTube player, Google may set cookies subject to their Privacy Policy." },
      { heading: "Hosting & infrastructure", body: "This site is hosted on Cloudflare Pages (Cloudflare, Inc., USA). Cloudflare may process standard server request data for security and performance purposes, subject to Cloudflare's Privacy Policy." },
      { heading: "Changes to this policy", body: "This policy may be updated periodically. The current version is always available at naveensharma.net. Last updated: June 2026." },
    ],
  },
  legal: {
    title: "Legal Notice",
    content: [
      { heading: "About this website", body: "naveensharma.net is the personal professional website of Naveen Sharma. It is not the website of Opility. B2B services and client engagements are handled through Opility (opility.com)." },
      { heading: "Personal contact", body: "Naveen Sharma\nBe'er Sheva, Israel\nEmail: contact@naveensharma.net\nPhone: 058-789-6289" },
      { heading: "Business registration", body: "B2B services are provided through Opility, registered as an Authorised Dealer under the Israel Tax Authority.\nRegistration date: 01 April 2025\n\nFor invoicing, contract, and tax purposes, please contact: hello@opility.com" },
      { heading: "Intellectual property", body: "All content on this website — including text, design, code, and branding — is the property of Naveen Sharma. Reproduction or reuse without prior written permission is prohibited." },
      { heading: "Disclaimer", body: "The information on this site is provided for general informational purposes in good faith. Naveen Sharma accepts no liability for decisions made solely based on website content." },
      { heading: "Governing law & jurisdiction", body: "This website is governed by the laws of the State of Israel. Any disputes shall be subject to the exclusive jurisdiction of the competent courts of Be'er Sheva, Israel." },
    ],
  },
  terms: {
    title: "Terms of Service",
    content: [
      { heading: "Scope", body: "These terms apply to B2B engagements handled through Opility (Naveen Sharma, Authorised Dealer, Israel). For full terms, please visit opility.com or contact hello@opility.com." },
      { heading: "Services & rates", body: "Services are provided through Opility at standard professional rates. Final rates are confirmed in a written agreement before work begins." },
      { heading: "Payment terms", body: "Project work: 50% deposit required before work begins for new clients; balance due upon delivery and acceptance.\n\nOngoing retainer / support contracts: invoiced monthly in arrears; payment due within 14 days of invoice date." },
      { heading: "Engagement process", body: "No work begins without a confirmed written agreement. Typical process:\n1. Initial consultation (free, up to 30 minutes)\n2. Proposal & Statement of Work issued\n3. Agreement signed\n4. Deposit invoice paid\n5. Work commences\n6. Delivery, review, and final payment" },
      { heading: "Confidentiality", body: "All client information — business data, systems access, workflows, and communications — is treated as strictly confidential and will not be disclosed to any third party without written consent." },
      { heading: "Contact", body: "For service enquiries: hello@opility.com\nFor support: support@opility.com\nPersonal contact: contact@naveensharma.net" },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    content: [
      { heading: "Overview", body: "This Cookie Policy explains how naveensharma.net uses cookies. In short: this site does not set its own cookies." },
      { heading: "Cookies we set", body: "None. This website does not set any first-party cookies, tracking pixels, fingerprinting scripts, or analytics beacons." },
      { heading: "YouTube embed cookies", body: "This site may include embedded YouTube video players. YouTube (Google LLC) may set cookies on your device when you interact with a video player, subject to Google's Privacy Policy. These are outside our control." },
      { heading: "Cloudflare security cookies", body: "Hosting provider Cloudflare may set strictly necessary cookies (e.g. __cf_bm) for bot detection and security. These do not track you for advertising purposes." },
      { heading: "No analytics or advertising", body: "This website does not use Google Analytics, Facebook Pixel, LinkedIn Insight Tag, Hotjar, or any other analytics or advertising tracking technology." },
      { heading: "Managing cookies", body: "You can control, block, or delete cookies at any time through your browser settings." },
      { heading: "Contact", body: "For cookie or privacy queries: contact@naveensharma.net" },
    ],
  },
};

function LegalBodyText({ text }) {
  return (
    <p className="text-base leading-relaxed text-gray-600 whitespace-pre-line">
      {text.split(/(mailto:[^\s]+|https?:\/\/[^\s]+|[\w.+-]+@[\w-]+\.[\w.]+)/g).map((part, i) => {
        if (/^mailto:/.test(part)) {
          return <a key={i} href={part} className="text-blue-600 hover:underline break-all">{part.replace("mailto:", "")}</a>;
        }
        if (/^https?:\/\//.test(part)) {
          return <a key={i} href={part} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">{part}</a>;
        }
        if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) {
          return <a key={i} href={`mailto:${part}`} className="text-blue-600 hover:underline">{part}</a>;
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

function LegalModal({ doc, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-white w-full sm:max-w-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-gray-900">{doc.title}</h2>
          <button onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition">
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5 space-y-5">
          {doc.content.map(({ heading, body }) => (
            <div key={heading}>
              <h3 className="text-base font-bold text-gray-900 mb-1">{heading}</h3>
              <LegalBodyText text={body} />
            </div>
          ))}
          <p className="text-sm text-gray-400 pt-2">Naveen Sharma · naveensharma.net</p>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const [activeDoc, setActiveDoc] = useState(null);
  return (
    <>
      {activeDoc && <LegalModal doc={LEGAL_DOCS[activeDoc]} onClose={() => setActiveDoc(null)} />}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <img
              src="/headshot-round.png"
              alt="Naveen Sharma"
              className="h-16 w-16 rounded-full object-cover ring-2 ring-blue-100"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <p className="font-extrabold text-gray-900">Naveen Sharma</p>
            <p className="text-base text-gray-600 font-medium">AI Automation · Workflow Automation · SaaS Implementation · QA/UAT</p>
            <p className="text-sm text-gray-400">
              B2B services &amp; contracting →{" "}
              <a href="https://opility.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium">opility.com</a>
            </p>
            <div className="flex items-center justify-center gap-3 mt-1">
              {[
                { href: "https://linkedin.com/in/naveensharmatech",      icon: Linkedin, label: "LinkedIn", bg: "#0A66C2" },
                { href: "https://github.com/naveensharmatech",           icon: Github,   label: "GitHub",   bg: "#181717" },
                { href: "https://x.com/NaveenSharmaX",                   icon: XIcon,    label: "X (Twitter)", bg: "#000000" },
                { href: "https://www.facebook.com/NaveenSharmaTech",     icon: Facebook, label: "Facebook", bg: "#1877F2" },
                { href: "https://www.youtube.com/@naveensharmatech",     icon: Youtube,  label: "YouTube",  bg: "#FF0000" },
                { href: "mailto:contact@naveensharma.net",               icon: Mail,     label: "Email",    bg: "#34A853" },
              ].map(({ href, icon: Icon, label, bg }) => (
                <a key={label} href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  style={{ backgroundColor: bg }}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white transition opacity-90 hover:opacity-100 hover:scale-110 shadow-sm">
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 mt-2">
              {[
                { key: "privacy",  label: "Privacy & Data Policy" },
                { key: "legal",    label: "Legal Notice" },
                { key: "terms",    label: "Terms of Service" },
                { key: "cookies",  label: "Cookie Policy" },
              ].map(({ key, label }) => (
                <button key={key} onClick={() => setActiveDoc(key)}
                  className="text-sm text-gray-400 hover:text-blue-600 transition underline-offset-2 hover:underline text-center">
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">© 2026 Naveen Sharma. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" className="bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading eyebrow="FAQ" center title="Frequently Asked Questions"
          description="Common questions regarding my automation expertise, implementation experience, and availability." />
        <div className="mx-auto max-w-3xl space-y-3">
          {FAQS.map((item, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-gray-50"
              >
                <span className="text-base sm:text-lg font-bold text-gray-900 pr-4">{item.q}</span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-blue-600 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-base leading-relaxed text-gray-600">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EllaChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi! I'm Ella, Naveen's AI assistant. Ask me anything about his automation projects, SaaS implementation experience, or skills!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const toSafeHttpUrl = (raw) => {
    try {
      const parsed = new URL(raw);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        return parsed.href;
      }
      return null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async (override) => {
    const text = (override ?? input).trim();
    if (!text || loading) return;
    const userMsg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: "Sorry, I'm unable to answer that right now. Please reach Naveen directly at contact@naveensharma.net 📧" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const showChips = messages.length === 1 && !loading;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex w-80 sm:w-96 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
          style={{ height: "500px" }}>
          <div className="flex items-center justify-between bg-blue-600 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full overflow-hidden ring-2 ring-white/30">
                <img src="/ella-avatar.png" alt="Ella" className="h-full w-full object-cover object-center" />
              </div>
              <div>
                <p className="text-base font-bold text-white">Ella</p>
                <p className="text-xs text-blue-100">Naveen's AI Assistant</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)}
              className="text-white/70 transition hover:text-white" aria-label="Close chat">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm sm:text-base leading-relaxed ${
                  m.role === "user"
                    ? "rounded-br-sm bg-blue-600 text-white"
                    : "rounded-bl-sm bg-gray-100 text-gray-800"
                }`}>
                  {m.content.split(/(https?:\/\/[^\s]+)/g).map((part, j) => {
                    if (/^https?:\/\//.test(part)) {
                      const url = part.replace(/[.,!?:;)>"'\]]+$/, "");
                      const safeUrl = toSafeHttpUrl(url);
                      if (!safeUrl) return <span key={j}>{url}</span>;
                      return (
                        <a key={j} href={safeUrl} target="_blank" rel="noopener noreferrer"
                          className="block underline break-all cursor-pointer mt-0.5 text-blue-700"
                          style={{ touchAction: "manipulation", WebkitTapHighlightColor: "rgba(0,0,0,0.1)" }}>
                          {safeUrl}
                        </a>
                      );
                    }
                    return <span key={j}>{part}</span>;
                  })}
                </div>
              </div>
            ))}
            {showChips && (
              <div className="flex flex-col items-start gap-2 pt-1">
                <p className="px-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Popular questions</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100 text-left">
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 150, 300].map((delay) => (
                      <span key={delay}
                        className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: `${delay}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-gray-100 p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask me anything…"
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className="flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-40"
                aria-label="Send message">
                <Send size={16} />
              </button>
            </div>
            <p className="mt-2 text-center text-xs text-gray-400">AI by Groq · Powered by Opility</p>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-full bg-blue-600 px-5 py-3.5 text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl"
        aria-label="Chat with Ella">
        {open ? <X size={20} /> : (
          <div className="h-6 w-6 rounded-full overflow-hidden ring-2 ring-white/40">
            <img src="/ella-avatar.png" alt="Ella" className="h-full w-full object-cover object-top" />
          </div>
        )}
        <span className="text-base font-semibold">{open ? "Close" : "Ask Ella"}</span>
      </button>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Pillars />
        <FeaturedProjects />
        <AutomationApproach />
        <Experience />
        <Reviews />
        <CareerJourney />
        <CertificationsSection />
        <Skills />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <EllaChat />
    </div>
  );
}
