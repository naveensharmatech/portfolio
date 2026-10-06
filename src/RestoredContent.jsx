import { useEffect, useRef, useState } from 'react';
import { X, Send } from 'lucide-react';

const earlierProjects = [
  { title: 'Iterative Array Data Transformer', type: 'Make · Personal project in development', text: 'A workflow design for normalizing records, validating inputs, checking duplicates and routing results into separate Google Sheets outputs.', href: 'https://github.com/naveensharmatech/Iterative-Array-Data-Transformer', link: 'View project repository' },
  { title: 'Professional Portfolio Website', type: 'AI-assisted website build', text: 'This React and Cloudflare portfolio brings together career experience, project documentation and an assistant that answers questions about my work.', href: 'https://github.com/naveensharmatech/portfolio', link: 'View website source' },
  { title: 'Django Blogging CMS', type: 'BCA academic project', text: 'Academic documentation covering a blogging application with authentication, content management and an admin interface.', href: '/docs/Django-Blogging-CMS-Project.pdf', link: 'View project document' },
  { title: 'Streaming Platform Test Plan', type: 'QA learning project', text: 'Test-planning documentation covering methodology, risks and planned validation scenarios.', href: '/docs/Netflix-Subscription-Test-Plan.docx', link: 'Download test plan' },
  { title: 'Warehouse Management System Test Plan', type: 'QA learning project', text: 'A structured test plan covering validation strategy, risks and regression scenarios.', href: '/docs/Warehouse-Management-System-Test-Plan.pdf', link: 'View test plan' },
];

export function RestoredContent() {
  return <div className="mt-14"><h3 className="text-2xl font-semibold tracking-tight">More projects & learning work</h3><div className="mt-6 grid gap-4 md:grid-cols-2">{earlierProjects.map(p => <article key={p.title} className="rounded-3xl border border-[#172321]/10 bg-white p-6"><p className="text-xs font-semibold text-[#5c6d65]">{p.type}</p><h4 className="mt-2 text-xl font-semibold">{p.title}</h4><p className="mt-3 text-sm leading-6 text-[#52615c]">{p.text}</p><a href={p.href} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-semibold underline underline-offset-4">{p.link} ↗</a></article>)}</div><section id="inquiry-workflow" aria-labelledby="inquiry-workflow-title" className="mt-8 scroll-mt-24 rounded-2xl border border-[#172321]/10 bg-white p-5 md:p-7"><h3 id="inquiry-workflow-title" className="text-2xl font-semibold">Customer Inquiry Router — workflow &amp; case study</h3><p className="mt-4 text-sm leading-7 text-[#52615c]">Gmail input → filtering → Claude classification and structured logic → priority routing → HubSpot CRM → email action. This is a personal project, separate from my BOLT employment.</p><ol aria-label="Customer Inquiry Router workflow" className="my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"><li className="flex items-center gap-3 rounded-2xl border border-[#172321]/10 bg-[#f6f7f4] p-4"><span className="text-xs font-semibold text-[#5c6d65]">01</span><img src="/tool-logos/google-gmail.svg" alt="" aria-hidden="true" width="28" height="28" className="h-7 w-7 object-contain"/><div><p className="text-sm font-semibold">Gmail</p><p className="mt-1 text-xs text-[#52615c]">Inquiry received</p></div></li><li className="flex items-center gap-3 rounded-2xl border border-[#172321]/10 bg-[#f6f7f4] p-4"><span className="text-xs font-semibold text-[#5c6d65]">02</span><img src="/tool-logos/zapier.svg" alt="" aria-hidden="true" width="28" height="28" className="h-7 w-7 object-contain"/><div><p className="text-sm font-semibold">Filtering</p><p className="mt-1 text-xs text-[#52615c]">Check spam and loops</p></div></li><li className="flex items-center gap-3 rounded-2xl border border-[#172321]/10 bg-[#f6f7f4] p-4"><span className="text-xs font-semibold text-[#5c6d65]">03</span><img src="/tool-logos/claude.svg" alt="" aria-hidden="true" width="28" height="28" className="h-7 w-7 object-contain"/><div><p className="text-sm font-semibold">Claude</p><p className="mt-1 text-xs text-[#52615c]">Classify the inquiry</p></div></li><li className="flex items-center gap-3 rounded-2xl border border-[#172321]/10 bg-[#f6f7f4] p-4"><span className="text-xs font-semibold text-[#5c6d65]">04</span><img src="/tool-logos/zapier.svg" alt="" aria-hidden="true" width="28" height="28" className="h-7 w-7 object-contain"/><div><p className="text-sm font-semibold">Zapier Paths</p><p className="mt-1 text-xs text-[#52615c]">Route by priority</p></div></li><li className="flex items-center gap-3 rounded-2xl border border-[#172321]/10 bg-[#f6f7f4] p-4"><span className="text-xs font-semibold text-[#5c6d65]">05</span><img src="/tool-logos/hubspot.svg" alt="" aria-hidden="true" width="28" height="28" className="h-7 w-7 object-contain"/><div><p className="text-sm font-semibold">HubSpot</p><p className="mt-1 text-xs text-[#52615c]">Update the CRM</p></div></li><li className="flex items-center gap-3 rounded-2xl border border-[#172321]/10 bg-[#f6f7f4] p-4"><span className="text-xs font-semibold text-[#5c6d65]">06</span><img src="/tool-logos/google-gmail.svg" alt="" aria-hidden="true" width="28" height="28" className="h-7 w-7 object-contain"/><div><p className="text-sm font-semibold">Gmail</p><p className="mt-1 text-xs text-[#52615c]">Follow-up action</p></div></li></ol><a href="https://www.linkedin.com/pulse/from-zapier-certification-production-how-i-built-email-naveen-sharma-ziyrf/" target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold underline">Read the LinkedIn case study ↗</a></section></div>;
}

export function Approach() {
  return <div className="mt-14 border-t border-white/20 pt-8"><h3 className="text-2xl font-semibold">How I build a workflow</h3><ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{[['Understand','Map the process, inputs, users and desired outcome.'],['Design','Define triggers, actions, routing and exceptions.'],['Build','Configure suitable no-code tools and AI-assisted components.'],['Integrate','Connect applications, APIs, webhooks and data.'],['Validate','Check mappings, branches, invalid inputs and failure behavior.'],['Document','Explain the setup, handoff and ongoing checks.']].map(([title,text],i)=><li key={title}><p className="font-semibold text-[#c5f16b]">0{i+1} · {title}</p><p className="mt-2 text-sm leading-6 text-white/75">{text}</p></li>)}</ol></div>;
}


export function WorkflowGallery() {
  return <section id="workflow-references" aria-labelledby="workflow-gallery-title" className="mt-14 scroll-mt-24 rounded-3xl border border-[#172321]/10 bg-white p-5 md:p-8">
    <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#5c6d65]">Zapier · Make · n8n</p><h3 id="workflow-gallery-title" className="mt-3 text-3xl font-semibold tracking-tight">Automation workflows, at a glance.</h3>
    <p className="mt-4 max-w-3xl text-sm leading-7 text-[#52615c]">Examples I’m exploring alongside my automation learning. Open each image to inspect the workflow in detail.</p>
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      <figure className="overflow-hidden rounded-2xl border border-[#172321]/10">
        <a href="/images/appointment-workflow-reference.jpeg" target="_blank" rel="noreferrer" aria-label="Open appointment workflow reference at full size"><img src="/images/appointment-workflow-reference.jpeg" alt="Practice workflow diagram showing inquiry routing, staff notifications, appointment availability, calendar actions and reminder branches." width="1280" height="800" loading="lazy" className="aspect-[16/10] w-full bg-[#202020] object-contain"/></a>
        <figcaption className="p-5"><h4 className="font-semibold">Appointment routing &amp; reminders</h4><p className="mt-2 text-sm leading-6 text-[#52615c]">Practice workflow reference connecting routing, calendars, notifications and follow-up actions.</p><a href="/images/appointment-workflow-reference.jpeg" target="_blank" rel="noreferrer" aria-label="View full-size Appointment routing and reminders workflow" className="mt-3 inline-block text-sm font-semibold underline underline-offset-4">View full-size workflow ↗</a></figcaption>
      </figure>
      <figure className="overflow-hidden rounded-2xl border border-[#172321]/10">
        <a href="/images/ai-lead-routing-reference.jpeg?v=cropped-0b26a44" target="_blank" rel="noreferrer" aria-label="Open AI lead-routing reference at full size"><img src="/images/ai-lead-routing-reference.jpeg?v=cropped-0b26a44" alt="n8n AI lead-routing guide credited to Hisham Sarwar, showing webhook input, preparation, AI analysis, conditional routing, Slack, CRM, Gmail and Google Sheets." width="1920" height="953" loading="lazy" className="h-auto w-full bg-[#202020]"/></a>
        <figcaption className="p-5"><h4 className="font-semibold">AI lead routing — workflow reference</h4><p className="mt-2 text-sm leading-6 text-[#52615c]">A reference for exploring AI analysis, decision logic and connected business tools. Graphic credit: Hisham Sarwar.</p><a href="/images/ai-lead-routing-reference.jpeg?v=cropped-0b26a44" target="_blank" rel="noreferrer" aria-label="View full-size AI lead routing workflow" className="mt-3 inline-block text-sm font-semibold underline underline-offset-4">View full-size reference ↗</a></figcaption>
      </figure>

      <figure className="overflow-hidden rounded-2xl border border-[#172321]/10">
        <a href="/images/agent-onboarding-reference.png" target="_blank" rel="noreferrer" aria-label="Open ai agent onboarding reference at full size"><img src="/images/agent-onboarding-reference.png" alt="Workflow reference showing a form feeding an AI agent with an Anthropic model, Postgres memory, Microsoft Entra ID and Jira tools, followed by conditional Slack actions." width="1114" height="627" loading="lazy" className="aspect-[16/10] w-full bg-[#f0f3ef] object-contain"/></a>
        <figcaption className="p-5"><h4 className="font-semibold">AI agent onboarding</h4><p className="mt-2 text-sm leading-6 text-[#52615c]">Workflow reference connecting a form, an agent, memory, business tools and conditional Slack actions.</p><a href="/images/agent-onboarding-reference.png" target="_blank" rel="noreferrer" aria-label="View full-size AI agent onboarding workflow" className="mt-3 inline-block text-sm font-semibold underline underline-offset-4">View full-size reference ↗</a></figcaption>
      </figure>

      <figure className="overflow-hidden rounded-2xl border border-[#172321]/10">
        <a href="/images/social-analytics-reference.png" target="_blank" rel="noreferrer" aria-label="Open social analytics reporting reference at full size"><img src="/images/social-analytics-reference.png" alt="Weekly workflow reference gathering Facebook, X and LinkedIn analytics, formatting and merging metrics, then writing to Google Sheets and sending a Gmail report." width="1024" height="418" loading="lazy" className="aspect-[16/10] w-full bg-[#f0f3ef] object-contain"/></a>
        <figcaption className="p-5"><h4 className="font-semibold">Social analytics reporting</h4><p className="mt-2 text-sm leading-6 text-[#52615c]">Workflow reference bringing platform metrics together for a spreadsheet and email report.</p><a href="/images/social-analytics-reference.png" target="_blank" rel="noreferrer" aria-label="View full-size Social analytics reporting workflow" className="mt-3 inline-block text-sm font-semibold underline underline-offset-4">View full-size reference ↗</a></figcaption>
      </figure>

      <figure className="overflow-hidden rounded-2xl border border-[#172321]/10">
        <a href="/images/make-order-notifications-reference.png" target="_blank" rel="noreferrer" aria-label="Open order notifications in make reference at full size"><img src="/images/make-order-notifications-reference.png" alt="Make scenario reference connecting Shopify orders to Google Sheets and a router with Telegram and SendPulse WhatsApp notification branches." width="1366" height="768" loading="lazy" className="aspect-[16/10] w-full bg-[#f0f3ef] object-contain"/></a>
        <figcaption className="p-5"><h4 className="font-semibold">Order notifications in Make</h4><p className="mt-2 text-sm leading-6 text-[#52615c]">Scenario reference connecting Shopify orders, Google Sheets and routed team and customer notifications.</p><a href="/images/make-order-notifications-reference.png" target="_blank" rel="noreferrer" aria-label="View full-size Make order notifications workflow" className="mt-3 inline-block text-sm font-semibold underline underline-offset-4">View full-size reference ↗</a></figcaption>
      </figure>

      <figure className="overflow-hidden rounded-2xl border border-[#172321]/10">
        <a href="/images/make-airtable-routing-reference.png" target="_blank" rel="noreferrer" aria-label="Open Make Airtable routing reference at full size"><img src="/images/make-airtable-routing-reference.png" alt="Make scenario reference routing Airtable records into meeting creation, email messages, record updates and an HTTP branch." width="1480" height="987" loading="lazy" className="aspect-[16/10] w-full bg-[#f0f3ef] object-contain"/></a>
        <figcaption className="p-5"><h4 className="font-semibold">Airtable routing in Make</h4><p className="mt-2 text-sm leading-6 text-[#52615c]">Scenario reference exploring record-based routing, meeting setup, email actions and Airtable updates.</p><a href="/images/make-airtable-routing-reference.png" target="_blank" rel="noreferrer" aria-label="View full-size Make Airtable routing workflow" className="mt-3 inline-block text-sm font-semibold underline underline-offset-4">View full-size reference ↗</a></figcaption>
      </figure>
    </div>
  </section>;
}

export function AboutDetails() {
  return <div className="mt-10"><p className="text-sm leading-7 text-[#52615c]">Based in Be’er Sheva, Israel. Hindi is my native language; I use English professionally and speak conversational Hebrew. I’m open to remote roles that can hire in Israel, suitable local hybrid roles, B2B contracts and freelance projects.</p><div className="mt-6 space-y-3">{[['What kind of work are you looking for?','AI and workflow automation, SaaS implementation, technical onboarding and integration support. I focus on practical no-code solutions and AI-assisted builds.'],['Do you build websites and assistants?','Yes. My work includes AI-assisted websites, chatbots, business assistants and bounded agents, alongside workflows and data integrations.'],['What is Opility?','Opility is my commercial venture: Build • Automate • Grow. Its scope covers Dev, AI, QA and Studio. Visit opility.com to discuss a business project.']].map(([q,a])=><details key={q} className="rounded-2xl border border-[#172321]/10 bg-white p-5"><summary className="cursor-pointer text-sm font-semibold">{q}</summary><p className="mt-3 text-sm leading-7 text-[#52615c]">{a}</p></details>)}</div></div>;
}

function ChatText({ text }) {
  return text.split(/(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s<>]+)/g).map((part, index) => {
    const markdown = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    if (markdown) return <a key={index} href={markdown[2]} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{markdown[1]}</a>;
    if (/^https?:\/\//.test(part)) {
      const url = part.replace(/[.,;]+$/, '');
      return <span key={index}><a href={url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{url}</a>{part.slice(url.length)}</span>;
    }
    return part;
  });
}

export function EllaChat() {
  const [open,setOpen]=useState(false);
  const [messages,setMessages]=useState([{role:'assistant',content:'Hi, I’m Ella, Naveen Sharma’s Personal Assistant. Ask me about him—or explore AI, automation, careers and learning.'}]);
  const [input,setInput]=useState('');
  const [busy,setBusy]=useState(false);
  const [connectionMode,setConnectionMode]=useState('');
  const inputRef=useRef(null), endRef=useRef(null), toggleRef=useRef(null);
  useEffect(()=>{if(open) inputRef.current?.focus();},[open]);
  useEffect(()=>{if(open) endRef.current?.scrollIntoView({block:'nearest'});},[messages,busy,open]);
  function close(){setOpen(false);toggleRef.current?.focus();}
  async function send(event){
    event.preventDefault(); const question=input.trim(); if(!question||busy)return;
    const next=[...messages,{role:'user',content:question}];setMessages(next);setInput('');setBusy(true);
    const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),55000);
    try {
      const response=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:next.slice(-10)}),signal:controller.signal});
      if(!response.ok)throw new Error('Chat unavailable');
      const data=await response.json();if(typeof data.reply!=='string'||!data.reply.trim())throw new Error('Empty reply');
      setConnectionMode(data.mode === 'saved-knowledge' ? 'Saved profile knowledge · live AI temporarily unavailable' : '');
      setMessages([...next,{role:'assistant',content:data.reply}]);
    }catch{setMessages([...next,{role:'assistant',content:'I couldn’t connect just now. Please try again, or use the Contact section to reach Naveen.'}]);}
    finally{clearTimeout(timer);setBusy(false);inputRef.current?.focus();}
  }
  return <div className="fixed bottom-5 right-5 z-[60]">
    {open&&<section id="ella-panel" role="dialog" aria-labelledby="ella-title" onKeyDown={e=>{if(e.key==='Escape')close();}} className="mb-3 flex h-[min(520px,70dvh)] w-[min(370px,calc(100vw-40px))] flex-col overflow-hidden rounded-3xl border border-[#172321]/15 bg-white text-[#172321] shadow-2xl">
      <header className="flex items-center justify-between bg-[#172321] p-4 text-white"><div className="flex items-center gap-3"><img src="/ella-avatar.png" alt="Ella" width="48" height="48" className="h-12 w-12 shrink-0 rounded-full object-cover"/><div><h2 id="ella-title" className="font-semibold">Ella</h2><p className="text-xs text-white/75">Naveen Sharma’s Personal Assistant</p></div></div><button type="button" onClick={close} aria-label="Close Ella chat" className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10"><X size={20}/></button></header>
      <div className="flex-1 overflow-y-auto p-4" aria-live="polite" aria-relevant="additions" aria-busy={busy}>{messages.map((m,i)=><p key={i} className={`mb-3 whitespace-pre-wrap break-words rounded-2xl p-3 text-sm leading-6 ${m.role==='user'?'ml-7 bg-[#eaf3dc]':'mr-7 bg-[#f0f3ef]'}`}><span className="sr-only">{m.role==='user'?'You':'Ella'}: </span><ChatText text={m.content}/></p>)}{busy&&<p className="text-sm text-[#52615c]">Ella is replying…</p>}<div ref={endRef}/></div>
      {connectionMode && <p role="status" className="border-t border-[#172321]/10 px-4 py-2 text-xs leading-5 text-[#52615c]">{connectionMode}</p>}
      <form onSubmit={send} className="flex gap-2 border-t border-[#172321]/10 p-3"><label htmlFor="ella-input" className="sr-only">Ask Ella a question</label><input ref={inputRef} id="ella-input" maxLength={1500} value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask me about Naveen…" className="min-w-0 flex-1 rounded-xl border border-[#172321]/20 px-3 py-3 text-sm"/><button type="submit" disabled={busy||!input.trim()} aria-label="Send message" className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#172321] text-white disabled:opacity-40"><Send size={18}/></button></form>
    </section>}
    <button ref={toggleRef} type="button" aria-expanded={open} aria-controls="ella-panel" onClick={()=>open?close():setOpen(true)} className="ml-auto flex min-h-12 items-center gap-2 rounded-full bg-[#172321] px-5 py-3 font-semibold text-[#c5f16b] shadow-lg"><img src="/ella-avatar.png" alt="" aria-hidden="true" width="36" height="36" className="h-9 w-9 rounded-full object-cover"/>Ask Ella</button>
  </div>;
}
