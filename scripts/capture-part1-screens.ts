import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const OUT_DIR = 'C:\\Users\\user\\.gemini\\antigravity-ide\\brain\\2093f3b3-ea89-48fa-8e91-b88834178b14\\screenshots';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function main() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  // Mobile 375px
  const mobileCtx = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15',
  });
  const mPage = await mobileCtx.newPage();

  // Desktop 1280px
  const deskCtx = await browser.newContext({
    viewport: { width: 1280, height: 850 },
    deviceScaleFactor: 1,
  });
  const dPage = await deskCtx.newPage();

  const pages = [
    { url: 'http://localhost:3000/', name: 'home_hero' },
    { url: 'http://localhost:3000/#roles', name: 'home_roles', scroll: 800 },
    { url: 'http://localhost:3000/compare', name: 'compare' },
    { url: 'http://localhost:3000/countries/nigeria', name: 'countries_nigeria' },
    { url: 'http://localhost:3000/platforms/outlier', name: 'platform_outlier' },
  ];

  for (const item of pages) {
    // 375px capture
    await mPage.goto(item.url, { waitUntil: 'networkidle', timeout: 30000 });
    if (item.scroll) await mPage.evaluate((y) => window.scrollTo(0, y), item.scroll);
    await mPage.waitForTimeout(600);
    const mPath = path.join(OUT_DIR, `${item.name}_375px.png`);
    await mPage.screenshot({ path: mPath });
    console.log(`Saved: ${mPath}`);

    // 1280px capture
    await dPage.goto(item.url, { waitUntil: 'networkidle', timeout: 30000 });
    if (item.scroll) await dPage.evaluate((y) => window.scrollTo(0, y), item.scroll);
    await dPage.waitForTimeout(600);
    const dPath = path.join(OUT_DIR, `${item.name}_1280px.png`);
    await dPage.screenshot({ path: dPath });
    console.log(`Saved: ${dPath}`);
  }

  await browser.close();
  console.log('Finished capturing screenshots!');
}

main().catch(console.error);
