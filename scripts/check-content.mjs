import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, relative } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const read = path => readFileSync(resolve(root,path),'utf8');
const walk = dir => readdirSync(resolve(root,dir),{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${dir}/${e.name}`):[`${dir}/${e.name}`]);
assert(!existsSync(resolve(root,'archive')), 'Superseded files must not remain in an archive folder.');
const app=read('src/App.jsx'), knowledge=read('data/ella-knowledge.js'), handler=read('functions/api/chat.js');
assert(app.includes('Turning Curiosity Into') && app.includes('Practical AI Solutions.'));
assert(!knowledge.includes('All ten Zapier') && !knowledge.includes('all courses completed'), 'Use completed paths consistently.');
assert(!knowledge.includes('do not describe him as a classroom teacher'), 'Avoid contradictory Shivam role directives.');
for(const path of ['src/App.jsx','data/ella-knowledge.js','docs/career/experience-source-of-truth.md','public/cv.html','public/intake-builder-demo.html']) {
 const text=read(path);
 assert(!/SaaS Implementation Specialist &(?:amp;)? Workflow QA/.test(text), `${path}: implementation is the primary title.`);
 assert(!text.includes('500+ dynamic forms'),`${path}: unverified metric returned.`);
}
assert(handler.includes("knowledge_updated: '2026-11-05'"));
for(const path of walk('public').filter(p=>p.endsWith('.html'))) assert(read(path).includes('/portfolio-theme.css'),`${path}: shared theme missing.`);
for(const path of ['public/cv.html','public/cv-he.html']) assert(!/Franchise Owner &amp; Trainer|בעל סניף בזכיינות ומדריך/.test(read(path)),`${path}: old title.`);
assert(read('README.md').includes('docs/assets/portfolio-banner.svg'));
assert(read('README.md').includes('docs/assets/workflow-motion.gif'));
for(const path of ['docs/assets/portfolio-banner.svg','docs/assets/workflow-motion.gif']) assert(existsSync(resolve(root,path)));
// Resolve current literal public links, including Cloudflare's extensionless HTML routes.
for(const path of [...walk('src'),...walk('public')].filter(p=>/\.(jsx|js|html|css)$/.test(p))) {
 for(const match of read(path).matchAll(/(?:href|src|logo|demoHref)\s*[:=]\s*["'](\/[^"'<>\n]+)["']/g)) {
  const url=match[1].split(/[?#]/)[0]; if(url==='/'||url.startsWith('//')||url.startsWith('/api/'))continue;
  const target=resolve(root,'public',decodeURIComponent(url).slice(1));
  assert(existsSync(target)||existsSync(target+'.html'),`${relative(root,resolve(root,path))}: missing ${url}`);
 }
}
if(existsSync(resolve(root,'dist'))) {
 assert(!existsSync(resolve(root,'dist/archive')),'Archive must not ship.');
 assert(!existsSync(resolve(root,'dist/intake-demo.js')),'Retired engine must not ship.');
}
console.log('Content, active routes, README assets and archive boundaries passed.');
