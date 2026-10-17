import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const OUT_DIR = 'C:\\Users\\user\\.gemini\\antigravity-ide\\brain\\2093f3b3-ea89-48fa-8e91-b88834178b14\\screenshots\\part3';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const PAGES = [
  { path: '/', name: 'home' },
  { path: '/official-channels', name: 'official-channels' },
  { path: '/about', name: 'about' },
  { path: '/changes', name: 'changes' },
  { path: '/scam-check', name: 'scam-check' },
];

async function main() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  for (const pageInfo of PAGES) {
    // 375 px mobile
    const contextMobile = await browser.newContext({
      viewport: { width: 375, height: 812 },
      deviceScaleFactor: 2,
    });
    const pageMobile = await contextMobile.newPage();
    try {
      await pageMobile.goto(`http://localhost:3000${pageInfo.path}`, { waitUntil: 'networkidle' });
      const mobilePath = path.join(OUT_DIR, `${pageInfo.name}-375px.png`);
      await pageMobile.screenshot({ path: mobilePath, fullPage: false });
      console.log(`Saved: ${mobilePath}`);
    } catch (e) {
      console.error(`Failed ${pageInfo.path} 375px:`, e);
    } finally {
      await contextMobile.close();
    }

    // 1280 px desktop
    const contextDesktop = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 1.5,
    });
    const pageDesktop = await contextDesktop.newPage();
    try {
      await pageDesktop.goto(`http://localhost:3000${pageInfo.path}`, { waitUntil: 'networkidle' });
      const desktopPath = path.join(OUT_DIR, `${pageInfo.name}-1280px.png`);
      await pageDesktop.screenshot({ path: desktopPath, fullPage: false });
      console.log(`Saved: ${desktopPath}`);
    } catch (e) {
      console.error(`Failed ${pageInfo.path} 1280px:`, e);
    } finally {
      await contextDesktop.close();
    }
  }

  await browser.close();
}

main().catch(console.error);
