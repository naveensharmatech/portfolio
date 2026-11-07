import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {readdirSync} from 'node:fs';import {join,relative} from 'node:path';
const root=join(process.env.OPILITY_SOURCE_DIR,'out');
function walk(d){return readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(d,e.name)):[join(d,e.name)]);}
const routes=walk(root).filter(p=>p.endsWith('.html')).map(p=>'/'+relative(root,p).replace(/\.html$/,'')).filter(p=>!['/email-signature','/credentials','/about/founder','/digital','/404'].includes(p)).map(p=>p==='/index'?'/':p);
async function record(info,name,data){await info.attach(name,{body:JSON.stringify(data,null,2),contentType:'application/json'});}
for(const scheme of ['light','dark'])for(const width of [320,390,768,1440]){
 test('all exported routes '+scheme+' '+width+'px',async({page},info)=>{
  test.setTimeout(480000);
  await page.setViewportSize({width,height:900});await page.emulateMedia({colorScheme:scheme});
  await page.goto('/');
  const toggle=page.getByRole('button',{name:scheme==='dark'?'Switch to dark theme':'Switch to light theme',exact:true});
  if(await toggle.isVisible())await toggle.click();
  const rows=[],errors=[];page.on('pageerror',e=>errors.push({route:page.url(),message:e.message}));
  for(const route of routes){
   const response=await page.goto(route);await expect(page.locator('main')).toBeVisible();
   const row=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,lang:document.documentElement.lang,theme:document.documentElement.dataset.theme,brokenVisibleImages:[...document.images].filter(i=>i.complete&&i.naturalWidth===0&&i.getBoundingClientRect().top<innerHeight).map(i=>i.getAttribute('src'))}));
   rows.push({route,status:response.status(),...row});
   expect.soft(response.status(),route).toBe(200);expect.soft(row.scrollWidth,route+' horizontal overflow').toBeLessThanOrEqual(width+1);
   expect.soft(row.h1,route+' heading').toBe(1);expect.soft(row.lang,route+' language').toBe('en');expect.soft(row.brokenVisibleImages,route+' images').toEqual([]);
  }
  await record(info,'routes',rows);await record(info,'runtime-errors',errors);expect.soft(errors,'uncaught errors').toEqual([]);
 });
}
for(const route of ['/','/products','/services','/contact','/resources','/divisions/ai','/divisions/qa','/login','/cart','/checkout'])for(const scheme of ['light','dark']){
 test('accessibility '+route+' '+scheme,async({page},info)=>{
  await page.emulateMedia({colorScheme:scheme});await page.goto(route);
  const toggle=page.getByRole('button',{name:scheme==='dark'?'Switch to dark theme':'Switch to light theme',exact:true});if(await toggle.isVisible())await toggle.click();
  const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();await record(info,'axe',a.violations);
  expect(a.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
 });
}
test('navigation, theme persistence, FAQ and product filtering',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Open navigation',exact:true}).click();
 const nav=page.getByRole('navigation',{name:'Mobile navigation'});
 await nav.getByRole('button',{name:'Services',exact:true}).click();await nav.getByRole('link',{name:/Opility QA/}).click();await expect(page).toHaveURL(/\/divisions\/qa/);
 const dark=page.getByRole('button',{name:'Switch to dark theme',exact:true});if(await dark.isVisible())await dark.click();
 await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
 await page.goto('/faq');await page.locator('summary').first().focus();await page.keyboard.press('Enter');await expect(page.locator('details').first()).toHaveAttribute('open','');
 await page.goto('/products');await page.getByLabel('Show upcoming downloads').check();
 await page.getByRole('textbox',{name:'Search products'}).fill('audit-no-match-20261107');await expect(page.getByRole('heading',{name:'No matching listings'})).toBeVisible();
 await page.getByRole('button',{name:'Clear search'}).click();expect(await page.locator('.product-card').count()).toBeGreaterThan(0);
});
test('contact drafts without sending email and Ella saved knowledge',async({page})=>{
 await page.goto('/contact?subject=Ella%20Business%20AI%20Assistant');
 await page.getByLabel('Your name',{exact:true}).fill('Fictional QA Test');await page.getByLabel('Reply email',{exact:true}).fill('qa@example.com');
 await page.getByLabel('What would you like to build or improve?').fill('Local audit only. No message is sent.');
 await page.getByRole('button',{name:'Prepare my enquiry'}).click();await expect(page.locator('.enquiry-preview')).toContainText('Fictional QA Test');
 await expect(page.getByRole('link',{name:'Open email draft'})).toHaveAttribute('href',/^mailto:hello@opility.com\?subject=/);await expect(page.locator('p[role=status]')).toContainText('nothing has been sent');
 await page.getByRole('button',{name:'Chat with Ella',exact:true}).click();await page.getByRole('textbox',{name:'Your message'}).fill('What does QA do?');
 await page.getByRole('button',{name:'Send message',exact:true}).click();await expect(page.locator('.ella-messages')).toContainText('Opility QA');
 await page.getByRole('textbox',{name:'Your message'}).press('Escape');await expect(page.getByRole('button',{name:'Chat with Ella',exact:true})).toBeVisible();
});
test('language chooser search and Escape',async({page})=>{
 await page.goto('/services');await expect(page.locator('html')).toHaveAttribute('lang','en');
 await page.getByRole('button',{name:'Choose language',exact:true}).click();
 const search=page.getByRole('searchbox',{name:'Search languages',exact:true});await expect(search).toBeFocused();
 await search.fill('audit-no-language');await expect(page.getByText('No matching language. Try its English or native name.')).toBeVisible();
 await search.press('Escape');await expect(page.getByRole('button',{name:'Choose language',exact:true})).toBeFocused();
});
test('anonymous account and protected delivery HTTP contracts',async({request},info)=>{
 const rows=[],cases=[['GET','/api/account-config',200],['GET','/api/studio-catalog',200],['GET','/api/account/entitlements',401],['GET','/api/download?product=not-a-product',404],['POST','/api/verify-purchase',401],['GET','/downloads/unknown.pdf',404],['GET','/admin',410],['GET','/api/auth/unknown',410],['GET','/__opility_audit_missing_20261107',404]];
 for(const [method,path,status] of cases){const r=await request.fetch(path,{method,data:method==='POST'?{}:undefined});rows.push({method,path,status:r.status(),body:(await r.text()).slice(0,1500)});expect.soft(r.status(),path).toBe(status);}
 await record(info,'http-contracts',rows);
 const health=await request.get('/api/opility-chat');expect(health.status()).toBe(200);await record(info,'chat-health',await health.json());
 const origin=new URL(process.env.AUDIT_URL).origin;
 expect((await request.post('/api/opility-chat',{headers:{Origin:origin},data:{messages:[]}})).status()).toBe(400);
 expect((await request.post('/api/opility-chat',{headers:{Origin:'https://example.com'},data:{messages:[{role:'user',content:'hello'}]}})).status()).toBe(403);
 expect((await request.post('/api/verify-turnstile',{headers:{Origin:origin},data:{}})).status()).toBe(400);
});
