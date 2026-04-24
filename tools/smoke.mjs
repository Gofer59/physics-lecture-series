import { chromium } from 'playwright';
const RENDER = '/home/gofer/physics-lecture-series/series/C_lqcd/01_foundations/render/render.html';
const browser = await chromium.launch({ headless: true });
const page = await browser.newContext({ viewport: { width: 1920, height: 1080 } }).then(c => c.newPage());
page.on('pageerror', e => console.error('PAGE ERROR:', e.message));
page.on('console', m => { if (m.type()==='error') console.error('CONSOLE:', m.text()); });
await page.goto('file://' + RENDER, { waitUntil: 'load', timeout: 60000 });
try {
  await page.waitForFunction(() => window.__stage && window.__stage.ready, null, { timeout: 30000 });
  const dur = await page.evaluate(() => window.__stage.duration);
  console.log('OK stage ready, duration=', dur);
  await page.evaluate(() => window.__stage.setTime(30));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/smoke_lqcd_t30.jpg', type: 'jpeg', quality: 85 });
  console.log('wrote /tmp/smoke_lqcd_t30.jpg');
} catch (e) {
  console.error('FAIL:', e.message);
  await page.screenshot({ path: '/tmp/smoke_lqcd_fail.jpg', type: 'jpeg' });
}
await browser.close();
