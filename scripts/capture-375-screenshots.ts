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

  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
  });

  const page = await context.newPage();

  const captures = [
    { url: 'http://localhost:3000/', filename: '01_home_hero_375px.png', fullPage: false },
    { url: 'http://localhost:3000/#roles', filename: '02_home_roles_375px.png', fullPage: false, scrollDown: 850 },
    { url: 'http://localhost:3000/jobs', filename: '03_jobs_ledger_375px.png', fullPage: false },
    { url: 'http://localhost:3000/jobs?q=nonexistent_xyz_role', filename: '04_jobs_empty_state_375px.png', fullPage: false },
    { url: 'http://localhost:3000/jobs/outlier-ai-generalist-evaluator', filename: '05_job_detail_375px.png', fullPage: false },
    { url: 'http://localhost:3000/platforms', filename: '06_platforms_list_375px.png', fullPage: false },
    { url: 'http://localhost:3000/platforms/outlier', filename: '07_platform_detail_375px.png', fullPage: false },
    { url: 'http://localhost:3000/compare', filename: '08_compare_375px.png', fullPage: false },
    { url: 'http://localhost:3000/scam-check', filename: '09_scam_check_375px.png', fullPage: false },
    { url: 'http://localhost:3000/evaluation', filename: '10_evaluation_studio_375px.png', fullPage: false },
    { url: 'http://localhost:3000/evaluation/sample-audit', filename: '11_evaluation_sample_audit_375px.png', fullPage: false },
  ];

  for (const item of captures) {
    console.log(`Navigating to ${item.url}...`);
    await page.goto(item.url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(600);

    if (item.scrollDown) {
      await page.evaluate((y) => window.scrollTo(0, y), item.scrollDown);
      await page.waitForTimeout(400);
    }

    const savePath = path.join(OUT_DIR, item.filename);
    await page.screenshot({ path: savePath, fullPage: item.fullPage });
    console.log(`Saved screenshot to ${savePath}`);
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
