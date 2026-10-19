import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3001';
const OUTPUT_DIR = 'C:\\Users\\user\\.gemini\\antigravity-ide\\brain\\e4d91512-f1d2-4d21-a59e-541acefae722\\screenshots';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const AUDIT_ROUTES = [
  { name: 'home', route: '/' },
  { name: 'jobs', route: '/jobs' },
  { name: 'platforms_combined', route: '/platforms' },
  { name: 'platforms_rates_tab', route: '/platforms?tab=rates' },
  { name: 'training', route: '/training' },
  { name: 'cv_builder', route: '/cv-builder' },
  { name: 'evaluation_studio', route: '/evaluation' },
  { name: 'payout_calculator', route: '/payout-calculator' },
  { name: 'scam_check', route: '/scam-check' },
  { name: 'task_check', route: '/task-check' },
];

async function runScreenshotAudit() {
  console.log(`Starting visual screenshot audit on ${BASE_URL}...`);
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const viewports = [
    { name: 'desktop', width: 1280, height: 800 },
    { name: 'mobile', width: 375, height: 812 },
  ];

  const results: any[] = [];

  for (const vp of viewports) {
    console.log(`\nTesting ${vp.name.toUpperCase()} (${vp.width}x${vp.height})...`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });

    const page = await context.newPage();

    for (const item of AUDIT_ROUTES) {
      const url = `${BASE_URL}${item.route}`;
      const shotPath = path.join(OUTPUT_DIR, `${item.name}_${vp.name}.png`);

      try {
        const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
        const status = res ? res.status() : 0;
        await page.waitForTimeout(400);

        // Check horizontal overflow
        const overflow = await page.evaluate(() => {
          const docW = document.documentElement.scrollWidth;
          const winW = window.innerWidth;
          return { isOverflow: docW > winW + 1, docW, winW };
        });

        // Capture screenshot
        await page.screenshot({ path: shotPath, fullPage: false });
        console.log(`  ✓ [${status}] ${item.route.padEnd(25)} -> ${path.basename(shotPath)} (Overflow: ${overflow.isOverflow ? 'FAIL ' + overflow.docW + 'px' : 'NONE'})`);

        results.push({
          route: item.route,
          viewport: vp.name,
          status,
          overflow: overflow.isOverflow,
          shotPath,
        });
      } catch (err: any) {
        console.log(`  ❌ FAIL ${item.route}: ${err.message}`);
        results.push({
          route: item.route,
          viewport: vp.name,
          status: 0,
          error: err.message,
        });
      }
    }

    await context.close();
  }

  await browser.close();
  console.log('\nVisual audit completed! Screenshots saved to:', OUTPUT_DIR);
}

runScreenshotAudit().catch(console.error);
