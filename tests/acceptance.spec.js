import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const widths = [320,375,390,430,640,768,1024,1280,1920,2560,3840];
for (const colorScheme of ['light','dark']) {
  for (const width of widths) {
    test(`${colorScheme} layout ${width}px`, async ({page}) => {
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      await page.setViewportSize({width,height:900});await page.emulateMedia({colorScheme});
      await page.goto('/');await expect(page.locator('#hero-title')).toBeVisible();
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      const small=await page.locator('a,button,summary').evaluateAll(elements=>elements.filter(e=>{
        const r=e.getBoundingClientRect(),s=getComputedStyle(e);
        return r.width && r.height && s.visibility!=='hidden' && !e.classList.contains('sr-only') && (r.width<43.9||r.height<43.9);
      }).map(e=>({text:e.textContent.trim().slice(0,60),width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})));
      expect(small).toEqual([]);expect(errors).toEqual([]);
    });
  }
  test(`${colorScheme} accessibility and chat`,async({page})=>{
    await page.emulateMedia({colorScheme});await page.goto('/');
    expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
    await page.getByRole('button',{name:'Ask Ella'}).click();
    expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
    await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Ask Ella'})).toBeFocused();
  });
}
test('keyboard navigation, landscape menu and reduced motion',async({page})=>{
  await page.setViewportSize({width:667,height:320});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
  await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();
  await page.keyboard.press('Enter');await expect(page.locator('#main-content')).toBeFocused();
  const menu=page.getByRole('button',{name:/^(Open|Close) navigation$/});await menu.focus();await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded','true');
  const nav=page.locator('#mobile-navigation');expect(await nav.evaluate(e=>e.clientHeight<=innerHeight-76)).toBe(true);
  await page.keyboard.press('Escape');await expect(menu).toBeFocused();await expect(menu).toHaveAttribute('aria-expanded','false');
  await menu.click();await nav.getByRole('link',{name:'Contact',exact:true}).click();await expect(page.locator('#contact')).toBeFocused();
  await menu.click();await page.setViewportSize({width:1280,height:900});await page.setViewportSize({width:390,height:844});await expect(nav).toBeHidden();
  expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});
test('400% equivalent reflow, newest content and local assets',async({page,request})=>{
  // WCAG reflow: 1280 CSS-pixel desktop at 400% becomes a 320 CSS-pixel viewport.
  await page.setViewportSize({width:320,height:720});await page.goto('/');
  await expect(page.getByRole('link',{name:'Naveen Sharma home'})).toHaveText('Naveen Sharma');
  await expect(page.getByText('Workflow automation · Inactive prototype')).toBeVisible();
  await expect(page.getByRole('link',{name:'Zapier Expertise ↗'})).toBeVisible();
  const paths=await page.locator('[href],[src]').evaluateAll(es=>[...new Set(es.flatMap(e=>[e.getAttribute('href'),e.getAttribute('src')]).filter(v=>v?.startsWith('/')&&!v.startsWith('//')))]);
  for(const path of paths)expect((await request.get(path)).ok(),path).toBe(true);
});
for(const path of ['/certifications.html?group=qa','/zapier-expertise.html','/docs/gmail-acknowledgment-demo.html']) {
  test(`new page reflow ${path}`,async({page})=>{
    await page.setViewportSize({width:320,height:720});await page.goto(path);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
  });
}

test('200% text enlargement and chat fallback interaction',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto('/');
  await page.addStyleTag({content:'html { font-size: 200%; }'});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.route('**/api/chat',route=>route.fulfill({json:{reply:'**Saved public profile reply**\n[Portfolio](https://naveensharma.net/)',mode:'saved-knowledge'}}));
  await page.getByRole('button',{name:'Ask Ella'}).click();
  const input=page.getByRole('textbox',{name:'Ask Ella a question'});await input.fill('Who is Naveen?');
  await page.getByRole('button',{name:'Send message'}).click();
  await expect(page.locator('#ella-panel strong')).toHaveText('Saved public profile reply');
  await expect(page.locator('#ella-panel').getByRole('link',{name:'Portfolio',exact:true})).toHaveAttribute('href','https://naveensharma.net/');
  await expect(page.getByRole('status')).toHaveText('Saved profile knowledge · live AI temporarily unavailable');
  await expect(input).toBeFocused();
});
