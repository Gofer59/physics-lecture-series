#!/usr/bin/env node
// capture.mjs — Deterministic frame capture: drive Stage time per frame,
// pipe JPEGs to ffmpeg, mux with pre-built audio.m4a.
//
// Usage: node capture.mjs <render_html> <audio_m4a> <out_mp4> [--fps 24]
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
if (args.length < 3) {
  console.error('usage: capture.mjs <render_html> <audio_m4a> <out_mp4> [--fps 24]');
  process.exit(1);
}
const RENDER_HTML = resolve(args[0]);
const AUDIO = resolve(args[1]);
const OUT = resolve(args[2]);
const fpsIdx = args.indexOf('--fps');
const FPS = fpsIdx >= 0 ? Number(args[fpsIdx + 1]) : 24;

const W = 1920, H = 1080;
const JPEG_QUALITY = 90;

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.on('pageerror', (e) => console.error('PAGE ERROR:', e.message));
page.on('console', (m) => { if (m.type() === 'error') console.error('CONSOLE:', m.text()); });

console.error('[cap] loading', RENDER_HTML);
await page.goto('file://' + RENDER_HTML, { waitUntil: 'load', timeout: 180000 });
await page.waitForFunction(() => window.__stage && window.__stage.ready, null, { timeout: 180000 });
const DUR = await page.evaluate(() => window.__stage.duration);
console.error(`[cap] stage ready. duration=${DUR}s fps=${FPS}`);
await page.evaluate(() => window.__stage.setPlaying(false));

const TOTAL = Math.round(DUR * FPS);
const ff = spawn('ffmpeg', [
  '-y', '-hide_banner', '-loglevel', 'warning',
  '-f', 'image2pipe', '-vcodec', 'mjpeg', '-framerate', String(FPS), '-i', '-',
  '-i', AUDIO,
  '-map', '0:v', '-map', '1:a',
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart',
  '-c:a', 'aac', '-b:a', '192k',
  '-shortest',
  OUT,
], { stdio: ['pipe', 'inherit', 'inherit'] });
ff.on('error', (e) => { console.error('ffmpeg spawn error:', e); process.exit(1); });

const t0 = Date.now();
for (let i = 0; i < TOTAL; i++) {
  const t = i / FPS;
  await page.evaluate((t) => window.__stage.setTime(t), t);
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
  const buf = await page.screenshot({ type: 'jpeg', quality: JPEG_QUALITY });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  if (i % 60 === 0 || i === TOTAL - 1) {
    const elapsed = (Date.now() - t0) / 1000;
    const fpsNow = (i + 1) / elapsed;
    const eta = (TOTAL - i - 1) / fpsNow;
    process.stderr.write(
      `\r[cap] ${i+1}/${TOTAL} t=${t.toFixed(1)}s  ${fpsNow.toFixed(1)} fps  eta ${Math.round(eta)}s    `
    );
  }
}
process.stderr.write('\n[cap] flushing...\n');
ff.stdin.end();
await new Promise((res, rej) => { ff.on('exit', (c) => c === 0 ? res() : rej(new Error('ffmpeg exit ' + c))); });
await browser.close();
console.error('[cap] done ->', OUT);
