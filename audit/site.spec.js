import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {mkdir,writeFile} from 'node:fs/promises';
const routes=['/','/intake-builder-demo','/manufacturing-demo','/institute-demo','/certifications.html?group=qa','/zapier-expertise.html','/docs/gmail-acknowledgment-demo.html','/cv.html','/cv-he.html'];
const widths=[320,390,768,1024,1440,1920];
const candidate=process.env.AUDIT_TARGET==='candidate';
async function record(info,name,data){
 await info.attach(name,{body:JSON.stringify(data,null,2),contentType:'application/json'});
}
for(const route of routes)for(const scheme of ['light','dark']){
 test('layout, runtime and accessibility '+route+' '+scheme,async({page},info)=>{
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.emulateMedia({colorScheme:scheme,reducedMotion:'reduce'});
   const layouts=[];
   for(const width of widths){
     await page.setViewportSize({width,height:900});
     const response=await page.goto(route);
     expect.soft(response.status(),'HTTP '+route).toBe(200);
     await expect(page.locator('h1').first()).toBeVisible();
     const result=await page.evaluate(()=>({
       width:innerWidth,scrollWidth:document.documentElement.scrollWidth,
       title:document.title,lang:document.documentElement.lang,
       headings:document.querySelectorAll('h1').length,
       overflow:[...document.querySelectorAll('body *')].filter(e=>{let r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&s.visibility!=='hidden'&&s.position!=='fixed'&&(r.right>innerWidth+1||r.left< -1)&&!e.classList.contains('sr-only')}).slice(0,12).map(e=>({tag:e.tagName,id:e.id,text:e.textContent.slice(0,60)}))
     }));
     layouts.push(result);
     expect.soft(result.scrollWidth,'horizontal reflow '+width+'px '+JSON.stringify(result.overflow)).toBeLessThanOrEqual(width);
     expect.soft(result.headings,'one h1').toBe(1);
     expect.soft(result.lang,'language set').toBeTruthy();
     if(width===390){
       const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
       await record(info,'axe-'+scheme,axe.violations);
       expect.soft(axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})),'axe '+route+' '+scheme).toEqual([]);
       const small=await page.locator('a,button,input,select,summary').evaluateAll(es=>es.filter(e=>{let r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.visibility!=='hidden'&&!e.closest('[hidden]')&&!e.classList.contains('sr-only')&&(r.width<24||r.height<24)}).map(e=>({text:e.textContent.slice(0,60),width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})));
       await record(info,'touch-targets-under-24px',small);
     }
   }
   await record(info,'layouts',layouts);
   await record(info,'runtime-errors',errors);
   expect.soft(errors,'uncaught exceptions').toEqual([]);
 });
}

test('local assets, fragment links, downloads and external link inventory',async({page,request},info)=>{
 const local=new Map(),external=new Set(),brokenFragments=[],imageFailures=[];
 for(const route of [...routes,'/certifications.html?group=jira','/certifications.html?group=ai','/certifications.html?group=crm','/certifications.html?group=testing','/certifications.html?group=invalid']){
   await page.goto(route);
   const links=await page.locator('a[href],img[src],script[src],link[rel=stylesheet],iframe[src]').evaluateAll(es=>es.map(e=>({tag:e.tagName,href:e.getAttribute('href')||e.getAttribute('src')})));
   for(const l of links){
     if(!l.href||/^(mailto:|tel:|data:|javascript:)/.test(l.href))continue;
     const u=new URL(l.href,page.url());
     if(u.origin!==new URL(page.url()).origin){external.add(u.href);continue;}
     if(u.hash&&['A'].includes(l.tag)){
       const exists=await page.evaluate(hash=>!!document.getElementById(decodeURIComponent(hash.slice(1))),u.hash);
       if(u.pathname===new URL(page.url()).pathname&&!exists)brokenFragments.push({route,href:l.href});
     }
     if(!u.hash)local.set(u.pathname+u.search,l.tag);
   }
   for(const img of await page.locator('img').all()){
     await img.scrollIntoViewIfNeeded().catch(()=>{});
     await img.evaluate(e=>new Promise(resolve=>{if(e.complete)return resolve();e.addEventListener('load',resolve,{once:true});e.addEventListener('error',resolve,{once:true});setTimeout(resolve,5000)}));
     if(!await img.evaluate(e=>e.complete&&e.naturalWidth>0))imageFailures.push({route,src:await img.getAttribute('src')});
   }
 }
 const responses=[];
 for(const [path,tag] of local){
   const r=await request.get(path,{timeout:30000});
   const body=await r.body(),type=r.headers()['content-type']||'';
   const row={path,tag,status:r.status(),type,bytes:body.length};responses.push(row);
   expect.soft(r.ok(),'asset '+path+' '+r.status()).toBeTruthy();
   if(/\.pdf$/i.test(path))expect.soft(body.subarray(0,5).toString(),'PDF signature '+path).toBe('%PDF-');
   if(/\.(png|jpe?g|svg|webp|gif|css|js|pdf|docx)(\?|$)/i.test(path))expect.soft(type,'asset is not SPA HTML '+path).not.toContain('text/html');
 }
 expect.soft(brokenFragments,'broken in-page anchors').toEqual([]);
 expect.soft(imageFailures,'failed images after lazy load').toEqual([]);
 await record(info,'local-responses',responses);await record(info,'external-links-inventory-not-end-to-end',Array.from(external));await record(info,'broken-fragments',brokenFragments);await record(info,'broken-images',imageFailures);
});

test('navigation, menus, skip link, accordion and Ella focus',async({page},info)=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('/');
 await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.locator('#main-content')).toBeFocused();
 const expertise=page.getByRole('button',{name:'Expertise',exact:true});
 await expertise.click();await expect(expertise).toHaveAttribute('aria-expanded','true');
 await page.locator('#expertise-links').getByRole('link',{name:'Qualifications',exact:true}).click();
 await expect(expertise).toHaveAttribute('aria-expanded','false');
 for(const label of ['What kind of work are you looking for?','Do you build websites and assistants?','What is Opility?']){
   const trigger=page.getByText(label,{exact:true});await trigger.click();await expect(trigger.locator('..')).toHaveAttribute('open','');await trigger.click();
 }
 await page.setViewportSize({width:390,height:844});
 const menu=page.getByRole('button',{name:'Open navigation',exact:true});await menu.click();
 await page.getByRole('button',{name:'Expertise',exact:true}).click();
 await page.locator('#mobile-navigation').getByRole('link',{name:'Tools & Platforms',exact:true}).click();
 await expect(page.locator('#mobile-navigation')).toBeHidden();
 const ella=page.getByRole('button',{name:'Ask Ella',exact:true});await ella.click();
 await expect(page.getByRole('textbox',{name:'Ask Ella a question'})).toBeFocused();
 await page.keyboard.press('Escape');await expect(ella).toBeFocused();
});

test('Ella UI transport failure, safe rendering and pending send state',async({page},info)=>{
 await page.goto('/');
 await page.route('**/api/chat',route=>route.fulfill({status:503,json:{error:'Test outage'}}));
 await page.getByRole('button',{name:'Ask Ella',exact:true}).click();
 const input=page.getByRole('textbox',{name:'Ask Ella a question'});await input.fill('Test question');await page.getByRole('button',{name:'Send message'}).click();
 await expect(page.locator('#ella-panel')).toContainText('I couldn’t connect just now.');
 await expect(input).toBeFocused();
 await page.unroute('**/api/chat');
 await page.route('**/api/chat',async route=>{await new Promise(r=>setTimeout(r,500));await route.fulfill({json:{reply:'**Test answer** <img src=x onerror=alert(1)> [unsafe](javascript:alert(1))',mode:'saved-knowledge'}});});
 await input.fill('Second test');await page.getByRole('button',{name:'Send message'}).click();
 await expect(page.getByRole('button',{name:'Send message'})).toBeDisabled();
 await expect(page.locator('#ella-panel strong')).toHaveText('Test answer');
 expect(await page.locator('#ella-panel a[href^="javascript:"]').count()).toBe(0);
 expect(await page.locator('#ella-panel img[src="x"]').count()).toBe(0);
});

test('intake validation, conditional mapping, signature, save and reset',async({page},info)=>{
 await page.goto('/intake-builder-demo');
 await page.locator('#runTest').click();await expect(page.locator('#submitBtn')).toBeDisabled();
 await expect(page.locator('#f_first')).toHaveAttribute('aria-invalid','true');
 await page.locator('#fillValid').click();await expect(page.locator('#submitBtn')).toBeEnabled();
 for(const [value,valid] of [['02/30/2020',false],['04/12/1990',true],['01/01/2099',false],['04/12/1990',true]]){
   await page.locator('#f_dob').fill(value);await page.locator('#runTest').click();
   await expect(page.locator('#f_dob')).toHaveAttribute('aria-invalid',String(!valid));
 }
 await page.locator('#f_email').fill('bad-address');await page.locator('#runTest').click();await expect(page.locator('#submitBtn')).toBeDisabled();
 await page.locator('#f_email').fill('jordan@example.com');
 await page.locator('#f_dx').selectOption({label:'Two Chronic Conditions'});await page.locator('#runTest').click();await expect(page.locator('#submitBtn')).toBeDisabled();
 await page.locator('#f_chronic').fill('Fictional condition A and B');await page.locator('#runTest').click();await expect(page.locator('#submitBtn')).toBeEnabled();
 await page.locator('#sigClear').click();await page.locator('#runTest').click();await expect(page.locator('#submitBtn')).toBeDisabled();
 await page.locator('#typedSignature').fill('Jordan Rivera');await page.locator('#sigSave').click();await page.locator('#runTest').click();await expect(page.locator('#submitBtn')).toBeEnabled();
 await page.locator('#downloadResult').click();await expect(page.locator('#mappedDataView')).toContainText('Fictional condition A and B');
 await page.locator('#submitBtn').click();await expect(page.locator('#successBox')).toBeVisible();
 await page.locator('#resetForm').click();await expect(page.locator('#f_first')).toHaveValue('');
 await page.locator('[data-view=esign]').click();
 for(let i=0;i<6&&await page.locator('#advanceSign').isEnabled();i++)await page.locator('#advanceSign').click();
 await expect(page.locator('#signState')).toContainText('Complete');
 for(const view of ['admin','qa','builder']){await page.locator('[data-view='+view+']').click();await expect(page.locator('#view-'+view)).toBeVisible();}
});

test('manufacturing invalid counts, sample handoff and edit invalidation',async({page},info)=>{
 await page.goto('/manufacturing-demo');
 await page.locator('#production-sample').click();await page.locator('[data-go=handoff]').first().click();
 await page.locator('#production-run').click();await expect(page.locator('#production-result')).toContainText('SAMPLE SHIFT HANDOFF');
 await expect(page.locator('#production-result')).toContainText('98.4%');
 await page.locator('[data-go=monitor]').last().click();await page.locator('#accepted').fill('600');
 await page.locator('[data-go=handoff]').first().click();await page.locator('#production-run').click();
 await expect(page.locator('#production-result')).toHaveClass(/error/);
});

test('certificate groups and referenced documents',async({page,request},info)=>{
 for(const group of ['qa','jira','ai','crm','testing']){
  await page.goto('/certifications.html?group='+group);
  const docs=page.locator('#documents section');
  expect(await docs.count(),group).toBeGreaterThan(0);
  for(const link of await page.locator('#documents a').all()){
    const href=await link.getAttribute('href');const r=await request.get(href);
    expect.soft(r.ok(),group+' '+href).toBeTruthy();
    expect.soft((await r.body()).subarray(0,5).toString(),href).toBe('%PDF-');
  }
 }
});

test('HTML CV print styles hide controls and Ella',async({page},info)=>{
 for(const route of ['/cv.html','/cv-he.html']){
  await page.goto(route);await page.emulateMedia({media:'print'});
  await expect(page.locator('.controls')).toBeHidden();
  if(candidate)await expect(page.getByRole('button',{name:'Ask Ella',exact:true})).toBeHidden();
  await record(info,'print-'+route,await page.evaluate(()=>({direction:getComputedStyle(document.body).direction,lang:document.documentElement.lang,text:document.body.innerText.length})));
  await page.emulateMedia({media:'screen'});
 }
});

test('HTTP headers, missing-route handling and SEO metadata evidence',async({page,request},info)=>{
 const home=await request.get('/'),headers=home.headers();
 await record(info,'response-headers',headers);
 expect.soft(headers['x-content-type-options'],'MIME sniffing prevention').toBe('nosniff');
 expect.soft(headers['strict-transport-security']||'','HSTS must have a nonzero max age').toMatch(/max-age=[1-9]\d*/);
 const missing=await request.get('/__portfolio_audit_missing_20261107');
 await record(info,'missing-route',{status:missing.status(),type:missing.headers()['content-type']});
 expect.soft(missing.status(),'unknown routes should return 404').toBe(404);
 const metadata=[];
 for(const route of routes){
  await page.goto(route);
  metadata.push(await page.evaluate(()=>({path:location.pathname,title:document.title,description:document.querySelector('meta[name=description]')?.content,canonical:document.querySelector('link[rel=canonical]')?.href,ogTitle:document.querySelector('meta[property="og:title"]')?.content,structuredData:document.querySelectorAll('script[type="application/ld+json"]').length})));
 }
 await record(info,'metadata',metadata);
 for(const path of ['/robots.txt','/sitemap.xml']){const r=await request.get(path);expect.soft(r.ok(),path).toBeTruthy();await record(info,path,{status:r.status(),content:(await r.text()).slice(0,20000)});}
});

test('lab performance and resource evidence (not field Core Web Vitals)',async({page},info)=>{
 await page.goto('/');
 const timings=await page.evaluate(()=>({
   navigation:performance.getEntriesByType('navigation').map(n=>({ttfb:n.responseStart-n.requestStart,domContentLoaded:n.domContentLoadedEventEnd,load:n.loadEventEnd,transferSize:n.transferSize})),
   paint:performance.getEntriesByType('paint').map(n=>({name:n.name,startTime:n.startTime})),
   resources:performance.getEntriesByType('resource').map(n=>({name:n.name,duration:n.duration,transferSize:n.transferSize,decodedBodySize:n.decodedBodySize})).sort((a,b)=>b.decodedBodySize-a.decodedBodySize).slice(0,20),
   images:[...document.images].map(e=>({src:e.src,naturalWidth:e.naturalWidth,displayWidth:e.clientWidth,loading:e.loading})),
   heap:performance.memory?.usedJSHeapSize
 }));
 await record(info,'lab-performance',timings);
});
