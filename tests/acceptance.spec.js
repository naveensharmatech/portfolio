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
// Keep “rn” in Turning distinct instead of visually merging into “m”.
for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
  test(`hero heading stays legible at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const heading = page.locator('#hero-title');
    await expect(heading).toHaveText('Turning Curiosity Into Practical AI Solutions.');
    const layout = await heading.evaluate(element => ({
      spacing: getComputedStyle(element).letterSpacing,
      fits: element.scrollWidth <= element.clientWidth,
    }));
    expect(['normal', '0px']).toContain(layout.spacing);
    expect(layout.fits).toBe(true);
  });
}

// Standalone pages share the current theme instead of retaining old homepage styles.
for (const path of ['/intake-builder-demo','/manufacturing-demo','/institute-demo']) {
  for (const colorScheme of ['light','dark']) {
    test(`shared standalone theme ${colorScheme} ${path}`, async ({page}) => {
      await page.setViewportSize({width:320,height:800});
      await page.emulateMedia({colorScheme,reducedMotion:'reduce'});
      await page.goto(path);
      await expect(page.locator('link[href="/portfolio-theme.css"]')).toHaveCount(1);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      expect(await page.evaluate(()=>getComputedStyle(document.body).fontSize)).toBe('16px');
      expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
    });
  }
}
test('intake demo produces a sample result from current implementation', async ({page}) => {
  await page.goto('/intake-builder-demo');
  await page.getByRole('button',{name:'Auto-fill valid',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Completed sample intake document',exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Save demo result ↦',exact:true}).click();
  await expect(page.locator('#successBox')).toBeVisible();
});

test('Ella drag, bounds, tap, keyboard reset and saved placement', async ({page}) => {
  await page.setViewportSize({width:390,height:844}); await page.goto('/');
  const button=page.getByRole('button',{name:'Ask Ella',exact:true});
  let box=await button.boundingBox();
  await page.mouse.move(box.x+box.width/2,box.y+box.height/2); await page.mouse.down();
  await page.mouse.move(70,220,{steps:12}); await page.mouse.up();
  await expect(page.locator('#ella-panel')).toHaveCount(0);
  const moved=await button.boundingBox();
  expect(moved.x).toBeLessThan(box.x); expect(moved.y).toBeLessThan(box.y);
  await page.reload();
  const saved=await button.boundingBox(); expect(Math.abs(saved.x-moved.x)).toBeLessThan(2);
  expect(Math.abs(saved.y-moved.y)).toBeLessThan(2);
  await button.focus(); await page.keyboard.press('ArrowLeft');
  expect((await button.boundingBox()).x).toBeLessThan(saved.x);
  await button.click(); await expect(page.locator('#ella-panel')).toBeVisible();
  await page.keyboard.press('Escape'); await expect(button).toBeFocused();
  await page.keyboard.press('Home');
  expect((await button.boundingBox()).y).toBeGreaterThan(600);
  await page.setViewportSize({width:320,height:480});
  box=await button.boundingBox();
  await page.mouse.move(box.x+30,box.y+40); await page.mouse.down();
  await page.mouse.move(0,0,{steps:8}); await page.mouse.up();
  box=await button.boundingBox(); expect(box.x).toBeGreaterThanOrEqual(12); expect(box.y).toBeGreaterThanOrEqual(12);
  await button.click(); const panel=await page.locator('#ella-panel').boundingBox();
  expect(panel.x).toBeGreaterThanOrEqual(0); expect(panel.y).toBeGreaterThanOrEqual(0);
  expect(panel.x+panel.width).toBeLessThanOrEqual(320);
  expect(panel.y+panel.height).toBeLessThanOrEqual(480);
});

test('touch drag moves Ella without opening chat', async ({browser}) => {
  const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
  const page=await context.newPage(); await page.goto('/');
  const button=page.getByRole('button',{name:'Ask Ella',exact:true});
  const box=await button.boundingBox(), client=await context.newCDPSession(page);
  const point={x:Math.round(box.x+box.width/2),y:Math.round(box.y+box.height/2)};
  await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point]});
  await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:80,y:240}]});
  await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await expect(page.locator('#ella-panel')).toHaveCount(0);
  expect((await button.boundingBox()).y).toBeLessThan(box.y-100);
  await button.tap(); await expect(page.locator('#ella-panel')).toBeVisible();
  await context.close();
});

test('Opility footer link stays clear of the default Ella launcher', async ({page}) => {
  await page.setViewportSize({width:390,height:844}); await page.goto('/');
  const link=page.locator('footer').getByRole('link',{name:'Opility — Business Services',exact:true});
  await link.scrollIntoViewIfNeeded();
  const a=await link.boundingBox(),b=await page.getByRole('button',{name:'Ask Ella',exact:true}).boundingBox();
  expect(a.x+a.width<=b.x || b.x+b.width<=a.x || a.y+a.height<=b.y || b.y+b.height<=a.y).toBe(true);
  await expect(page.getByRole('link',{name:'Explore Opility — Business Services',exact:true})).toHaveAttribute('href','https://opility.com');
});

test('Ella works across standalone routes and keeps saved placement', async ({page}) => {
  await page.setViewportSize({width:390,height:844}); await page.goto('/');
  const button=page.getByRole('button',{name:'Ask Ella',exact:true});
  await button.focus(); await page.keyboard.press('ArrowUp');
  const position=await button.boundingBox();
  for(const path of ['/intake-builder-demo','/manufacturing-demo','/institute-demo','/certifications.html?group=qa','/zapier-expertise.html','/docs/gmail-acknowledgment-demo.html','/cv.html','/cv-he.html']) {
    await page.goto(path);
    await expect(button).toBeVisible();
    expect(Math.abs((await button.boundingBox()).x-position.x)).toBeLessThan(2);
    await button.click();
    await expect(page.getByRole('dialog',{name:'Ella',exact:true})).toBeVisible();
    await page.getByRole('button',{name:'Close Ella chat'}).click(); await expect(button).toBeFocused();
  }
});
