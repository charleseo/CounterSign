import { chromium } from 'playwright-core';
import fs from 'fs';

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const VIEWPORTS = [
  { width: 360, height: 800, name: '360px (Small Mobile)' },
  { width: 375, height: 812, name: '375px (iPhone SE / X)' },
  { width: 390, height: 844, name: '390px (iPhone 12/13/14)' },
];

const PUBLIC_PAGES = [
  '/',
  '/jobs',
  '/jobs/outlier-ai-generalist-evaluator',
  '/platforms',
  '/platforms/outlier',
  '/platforms/outlier/NG',
  '/compare',
  '/countries/nigeria',
  '/guides',
  '/guides/how-to-tell-if-an-ai-work-listing-is-real',
  '/scam-check',
  '/evaluation',
  '/evaluation/methodology',
  '/evaluation/sample-audit',
  '/about',
  '/methodology',
  '/privacy',
  '/terms',
  '/corrections',
];

interface OverflowViolation {
  page: string;
  viewport: string;
  viewportWidth: number;
  docScrollWidth: number;
  bodyScrollWidth: number;
  overflowingElements: Array<{
    tag: string;
    id: string;
    className: string;
    rectRight: number;
    rectWidth: number;
  }>;
}

async function runViewportAudit() {
  console.log(`\n============================================================`);
  console.log(`RUNNING VIEWPORT OVERFLOW AUDIT AT 360, 375, AND 390 PX`);
  console.log(`Browser executable: ${CHROME_PATH}`);
  console.log(`============================================================\n`);

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const violations: OverflowViolation[] = [];
  let totalChecks = 0;

  try {
    // Warm up the server
    const warmupContext = await browser.newContext();
    const warmupPage = await warmupContext.newPage();
    try {
      await warmupPage.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch {}
    await warmupContext.close();

    for (const vp of VIEWPORTS) {
      console.log(`\nTesting Viewport: ${vp.name} (${vp.width}x${vp.height})...`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1',
      });
      const page = await context.newPage();

      for (const path of PUBLIC_PAGES) {
        totalChecks++;
        try {
          const targetUrl = `http://localhost:3000${path}`;
          let navAttempts = 0;
          while (navAttempts < 2) {
            try {
              navAttempts++;
              await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
              break;
            } catch (navErr) {
              if (navAttempts >= 2) throw navErr;
              await page.waitForTimeout(1000);
            }
          }
          await page.waitForTimeout(400);

          const result = await page.evaluate((expectedWidth) => {
            const docWidth = document.documentElement.scrollWidth;
            const bodyWidth = document.body ? document.body.scrollWidth : 0;
            const clientWidth = document.documentElement.clientWidth;
            const windowInner = window.innerWidth;

            const overflowing: Array<{
              tag: string;
              id: string;
              className: string;
              rectRight: number;
              rectWidth: number;
            }> = [];

            if (docWidth > expectedWidth || bodyWidth > expectedWidth) {
              const allElements = document.querySelectorAll('*');
              for (const el of Array.from(allElements)) {
                const rect = el.getBoundingClientRect();
                if (rect.right > expectedWidth + 1) {
                  overflowing.push({
                    tag: el.tagName.toLowerCase(),
                    id: el.id,
                    className: el.className ? String(el.className).slice(0, 80) : '',
                    rectRight: Math.round(rect.right),
                    rectWidth: Math.round(rect.width),
                  });
                  if (overflowing.length >= 5) break;
                }
              }
            }

            return {
              docWidth,
              bodyWidth,
              clientWidth,
              windowInner,
              hasOverflow: docWidth > expectedWidth || bodyWidth > expectedWidth,
              overflowing,
            };
          }, vp.width);

          if (result.hasOverflow) {
            console.error(`  FAIL [${vp.width}px] ${path}: docScrollWidth=${result.docWidth}, bodyScrollWidth=${result.bodyWidth} (max ${vp.width})`);
            violations.push({
              page: path,
              viewport: vp.name,
              viewportWidth: vp.width,
              docScrollWidth: result.docWidth,
              bodyScrollWidth: result.bodyWidth,
              overflowingElements: result.overflowing,
            });
          } else {
            console.log(`  PASS [${vp.width}px] ${path} (scrollWidth: ${result.docWidth}px <= ${vp.width}px)`);
          }
        } catch (err: unknown) {
          const errorMsg = err instanceof Error ? err.message : String(err);
          console.error(`  ERROR testing ${path} at ${vp.width}px: ${errorMsg}`);
          violations.push({
            page: path,
            viewport: vp.name,
            viewportWidth: vp.width,
            docScrollWidth: 9999,
            bodyScrollWidth: 9999,
            overflowingElements: [{ tag: 'error', id: '', className: errorMsg, rectRight: 0, rectWidth: 0 }],
          });
        }
      }

      await context.close();
    }
  } finally {
    await browser.close();
  }

  console.log(`\n============================================================`);
  console.log(`AUDIT RESULTS: ${totalChecks - violations.length}/${totalChecks} tests passed`);
  console.log(`============================================================`);

  if (violations.length > 0) {
    console.error(`\nFAILED: Found ${violations.length} horizontal overflow violations:`);
    for (const v of violations) {
      console.error(`\n- [${v.viewport}] Page: ${v.page}`);
      console.error(`  docScrollWidth: ${v.docScrollWidth}px, max allowed: ${v.viewportWidth}px`);
      if (v.overflowingElements.length > 0) {
        console.error(`  Sample overflowing elements:`);
        for (const el of v.overflowingElements) {
          console.error(`    <${el.tag} id="${el.id}" class="${el.className}"> -> rectRight: ${el.rectRight}px, width: ${el.rectWidth}px`);
        }
      }
    }
    process.exit(1);
  } else {
    console.log(`\nSUCCESS: All public pages have 0 horizontal overflow at 360, 375, and 390 px!\n`);
    process.exit(0);
  }
}

runViewportAudit();
