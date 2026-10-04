import { useEffect, useRef, useState } from 'react';
import { Bot, X, Send } from 'lucide-react';

const earlierProjects = [
  { title: 'Iterative Array Data Transformer', type: 'Make · Personal project in development', text: 'A workflow design for normalizing records, validating inputs, checking duplicates and routing results into separate Google Sheets outputs.', href: 'https://github.com/naveensharmatech/Iterative-Array-Data-Transformer', link: 'View project repository' },
  { title: 'Professional Portfolio Website', type: 'AI-assisted website build', text: 'This React and Cloudflare portfolio brings together career experience, project documentation and an assistant that answers questions about my work.', href: 'https://github.com/naveensharmatech/portfolio', link: 'View website source' },
  { title: 'Django Blogging CMS', type: 'BCA academic project', text: 'Academic documentation covering a blogging application with authentication, content management and an admin interface.', href: '/docs/Django-Blogging-CMS-Project.pdf', link: 'View project document' },
  { title: 'Streaming Platform Test Plan', type: 'QA learning project', text: 'Test-planning documentation covering methodology, risks and planned validation scenarios.', href: '/docs/Netflix-Subscription-Test-Plan.docx', link: 'Download test plan' },
  { title: 'Warehouse Management System Test Plan', type: 'QA learning project', text: 'A structured test plan covering validation strategy, risks and regression scenarios.', href: '/docs/Warehouse-Management-System-Test-Plan.pdf', link: 'View test plan' },
  { title: 'Intake & Mapping Workbench', type: 'Synthetic implementation demonstration', text: 'An interactive recreation of configuration and mapping patterns using demonstration data.', href: '/intake-builder-demo.html', link: 'Explore demonstration' },
];

export function RestoredContent() {
  return <div className="mt-14"><h3 className="text-2xl font-semibold tracking-tight">More projects & learning work</h3><div className="mt-6 grid gap-4 md:grid-cols-2">{earlierProjects.map(p => <article key={p.title} className="rounded-3xl border border-[#172321]/10 bg-white p-6"><p className="text-xs font-semibold text-[#71807b]">{p.type}</p><h4 className="mt-2 text-xl font-semibold">{p.title}</h4><p className="mt-3 text-sm leading-6 text-[#52615c]">{p.text}</p><a href={p.href} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-semibold underline underline-offset-4">{p.link} ↗</a></article>)}</div><details className="mt-6 rounded-2xl border border-[#172321]/10 bg-white p-5"><summary className="cursor-pointer font-semibold">Customer Inquiry Router — workflow & case study</summary><p className="mt-4 text-sm leading-7 text-[#52615c]">Gmail input → filtering → Claude classification and structured logic → priority routing → HubSpot CRM → email action. This is a personal project, separate from my BOLT employment.</p><a href="https://www.linkedin.com/pulse/from-zapier-certification-production-how-i-built-email-naveen-sharma-ziyrf/" target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold underline">Read the LinkedIn case study ↗</a></details></div>;
}

export function Approach() {
  return <div className="mt-14 border-t border-white/20 pt-8"><h3 className="text-2xl font-semibold">How I build a workflow</h3><ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{[['Understand','Map the process, inputs, users and desired outcome.'],['Design','Define triggers, actions, routing and exceptions.'],['Build','Configure suitable no-code tools and AI-assisted components.'],['Integrate','Connect applications, APIs, webhooks and data.'],['Validate','Check mappings, branches, invalid inputs and failure behavior.'],['Document','Explain the setup, handoff and ongoing checks.']].map(([title,text],i)=><li key={title}><p className="font-semibold text-[#c5f16b]">0{i+1} · {title}</p><p className="mt-2 text-sm leading-6 text-white/75">{text}</p></li>)}</ol></div>;
}

export function AboutDetails() {
  return <div className="mt-10"><p className="text-sm leading-7 text-[#52615c]">Based in Be’er Sheva, Israel. Hindi is my native language; I use English professionally and speak conversational Hebrew. I’m open to remote roles that can hire in Israel, suitable local hybrid roles, B2B contracts and freelance projects.</p><div className="mt-6 space-y-3">{[['What kind of work are you looking for?','AI and workflow automation, SaaS implementation, technical onboarding and integration support. I focus on practical no-code solutions and AI-assisted builds.'],['Do you build websites and assistants?','Yes. My work includes AI-assisted websites, chatbots, business assistants and bounded agents, alongside workflows and data integrations.'],['What is Opility?','Opility is my commercial venture: Build • Automate • Grow. Its scope covers Dev, AI, QA and Studio. Visit opility.com to discuss a business project.']].map(([q,a])=><details key={q} className="rounded-2xl border border-[#172321]/10 bg-white p-5"><summary className="cursor-pointer text-sm font-semibold">{q}</summary><p className="mt-3 text-sm leading-7 text-[#52615c]">{a}</p></details>)}</div></div>;
}

export function EllaChat() {
  const [open,setOpen]=useState(false);
  const [messages,setMessages]=useState([{role:'assistant',content:'Hi, I’m Ella. Ask me about Naveen’s projects, experience or learning.'}]);
  const [input,setInput]=useState('');
  const [busy,setBusy]=useState(false);
  const inputRef=useRef(null), endRef=useRef(null), toggleRef=useRef(null);
  useEffect(()=>{if(open) inputRef.current?.focus();},[open]);
  useEffect(()=>{if(open) endRef.current?.scrollIntoView({block:'nearest'});},[messages,busy,open]);
  function close(){setOpen(false);toggleRef.current?.focus();}
  async function send(event){
    event.preventDefault(); const question=input.trim(); if(!question||busy)return;
    const next=[...messages,{role:'user',content:question}];setMessages(next);setInput('');setBusy(true);
    const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),20000);
    try {
      const response=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:next.slice(-10)}),signal:controller.signal});
      if(!response.ok)throw new Error('Chat unavailable');
      const data=await response.json();if(typeof data.reply!=='string'||!data.reply.trim())throw new Error('Empty reply');
      setMessages([...next,{role:'assistant',content:data.reply}]);
    }catch{setMessages([...next,{role:'assistant',content:'I couldn’t connect just now. Please try again, or use the Contact section to reach Naveen.'}]);}
    finally{clearTimeout(timer);setBusy(false);inputRef.current?.focus();}
  }
  return <div className="fixed bottom-5 right-5 z-[60]">
    {open&&<section id="ella-panel" role="dialog" aria-labelledby="ella-title" onKeyDown={e=>{if(e.key==='Escape')close();}} className="mb-3 flex h-[min(520px,70dvh)] w-[min(370px,calc(100vw-40px))] flex-col overflow-hidden rounded-3xl border border-[#172321]/15 bg-white text-[#172321] shadow-2xl">
      <header className="flex items-center justify-between bg-[#172321] p-4 text-white"><div className="flex items-center gap-3"><Bot size={24}/><div><h2 id="ella-title" className="font-semibold">Ella</h2><p className="text-xs text-white/75">Naveen’s portfolio assistant</p></div></div><button type="button" onClick={close} aria-label="Close Ella chat" className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10"><X size={20}/></button></header>
      <div className="flex-1 overflow-y-auto p-4" aria-live="polite" aria-relevant="additions" aria-busy={busy}>{messages.map((m,i)=><p key={i} className={`mb-3 whitespace-pre-wrap break-words rounded-2xl p-3 text-sm leading-6 ${m.role==='user'?'ml-7 bg-[#eaf3dc]':'mr-7 bg-[#f0f3ef]'}`}><span className="sr-only">{m.role==='user'?'You':'Ella'}: </span>{m.content}</p>)}{busy&&<p className="text-sm text-[#52615c]">Ella is replying…</p>}<div ref={endRef}/></div>
      <form onSubmit={send} className="flex gap-2 border-t border-[#172321]/10 p-3"><label htmlFor="ella-input" className="sr-only">Ask Ella a question</label><input ref={inputRef} id="ella-input" maxLength={1500} value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask about Naveen’s work…" className="min-w-0 flex-1 rounded-xl border border-[#172321]/20 px-3 py-3 text-sm"/><button type="submit" disabled={busy||!input.trim()} aria-label="Send message" className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#172321] text-white disabled:opacity-40"><Send size={18}/></button></form>
    </section>}
    <button ref={toggleRef} type="button" aria-expanded={open} aria-controls="ella-panel" onClick={()=>open?close():setOpen(true)} className="ml-auto flex min-h-12 items-center gap-2 rounded-full bg-[#172321] px-5 py-3 font-semibold text-[#c5f16b] shadow-lg"><Bot size={20}/>Ask Ella</button>
  </div>;
}
