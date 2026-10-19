import { chromium, Page } from 'playwright-core';
import fs from 'fs';

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';

// List of all known public and workbench routes across the entire site
const ALL_ROUTES = [
  // Core
  '/',
  '/jobs',
  '/jobs/sample-mercor-llm-researcher',
  '/jobs/sample-tracebase-managed-vbt-author',
  '/jobs/outlier-ai-generalist-evaluator',
  '/platforms',
  '/platforms/outlier',
  '/platforms/alignerr',
  '/platforms/outlier/ng',
  '/platforms/outlier/report',
  '/compare',
  '/guides',
  '/guides/how-to-tell-if-an-ai-work-listing-is-real',
  '/guides/getting-paid-in-usd-from-nigeria',
  '/scam-check',
  '/scams-this-week',
  '/scams-this-week/telegram-advance-fee-recruitment-scheme',

  // Contributor Workbench (Tools)
  '/task-check',
  '/payout-calculator',
  '/rates',
  '/rates/submit',
  '/cv-builder',
  '/training',
  '/training/drills',
  '/appeals',
  '/benchmark',
  '/glossary',
  '/w8ben',
  '/invoice',

  // Verification & Registry
  '/verify/TB-2026-A101',
  '/verify/TB-2026-B204',
  '/verify/CS-2026-A101',

  // Evaluation Studio
  '/evaluation',
  '/evaluation/methodology',
  '/evaluation/sample-audit',
  '/evaluation/evaluators',
  '/evaluation/estimator',
  '/evaluation/demo',
  '/evaluation/whitepaper',
  '/evaluation/scope',
  '/evaluation/services/rag-and-citation-audit',
  '/evaluation/services/technical-documentation-truth-audit',
  '/evaluation/services/negative-constraint-and-refusal-boundary-analysis',

  // Country Regional Hubs
  '/countries',
  '/countries/us',
  '/countries/gb',
  '/countries/ca',
  '/countries/nigeria',
  '/countries/kenya',
  '/countries/ghana',

  // Public Transparency & Trust
  '/about',
  '/methodology',
  '/privacy',
  '/privacy/request',
  '/terms',
  '/corrections',
  '/disclosure',
  '/official-channels',
  '/changes',
  '/contact',
  '/gallery',

  // Account / Admin Entry (Public interfaces)
  '/account/login',
  '/account/alerts',
  '/account/saved',
  '/admin/login'
];

// Banned words per AGENTS.md
const BANNED_WORDS = [
  'jurisdiction',
  'immutable',
  'forensic',
  'telemetry',
  'nexus',
  'utility',
  'protocol',
  'instrument',
  'leverage',
  'seamless',
  'cutting-edge',
  'revolutionary',
  'world-class',
  'robust',
  'empower',
  'unlock',
  'synergy',
  'ecosystem',
  'frictionless',
  'best-in-class',
  'guaranteed'
];

interface PageBug {
  route: string;
  type: 'CRASH' | 'HTTP_ERROR' | 'CONSOLE_ERROR' | 'HYDRATION_ERROR' | 'OVERFLOW' | 'BROKEN_LINK' | 'BANNED_WORD' | 'EM_DASH';
  message: string;
  detail?: string;
}

async function runComprehensiveSiteAudit() {
  console.log(`\n============================================================`);
  console.log(`EXHAUSTIVE AUDIT ACROSS ALL ${ALL_ROUTES.length} SITE PAGES`);
  console.log(`Target: ${BASE_URL}`);
  console.log(`Browser: ${CHROME_PATH}`);
  console.log(`============================================================\n`);

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const bugs: PageBug[] = [];
  let checkedCount = 0;

  for (const route of ALL_ROUTES) {
    checkedCount++;
    const url = `${BASE_URL}${route}`;
    process.stdout.write(`[${checkedCount}/${ALL_ROUTES.length}] Testing ${route.padEnd(45, ' ')} `);

    const context = await browser.newContext({
      viewport: { width: 360, height: 800 }, // Mobile-first audit per AGENTS.md
      userAgent: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
    });

    const page = await context.newPage();

    const pageErrors: string[] = [];
    const consoleErrors: string[] = [];

    page.on('pageerror', (err) => {
      pageErrors.push(err.message);
    });

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Ignore favicon or standard 404 test probes if any
        if (!text.includes('favicon.ico')) {
          consoleErrors.push(text);
        }
      }
    });

    let httpStatus = 0;
    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      httpStatus = response ? response.status() : 0;
    } catch (gotoErr: any) {
      bugs.push({
        route,
        type: 'HTTP_ERROR',
        message: `Navigation failed: ${gotoErr.message}`
      });
      console.log(`❌ FAIL (Navigation error)`);
      await context.close();
      continue;
    }

    if (httpStatus >= 400) {
      bugs.push({
        route,
        type: 'HTTP_ERROR',
        message: `HTTP ${httpStatus} returned`
      });
      console.log(`❌ FAIL (HTTP ${httpStatus})`);
      await context.close();
      continue;
    }

    // Give client React components a moment to hydrate and run effects
    await page.waitForTimeout(350);

    // Check for unhandled JS errors
    if (pageErrors.length > 0) {
      for (const err of pageErrors) {
        bugs.push({
          route,
          type: 'CRASH',
          message: `Client crash: ${err}`
        });
      }
    }

    // Check for console errors (hydration mismatch, runtime exceptions)
    if (consoleErrors.length > 0) {
      for (const msg of consoleErrors) {
        const isHydration = msg.includes('Hydration') || msg.includes('did not match') || msg.includes('React error');
        bugs.push({
          route,
          type: isHydration ? 'HYDRATION_ERROR' : 'CONSOLE_ERROR',
          message: msg
        });
      }
    }

    // Check for crash screen or empty body
    const bodyText = await page.evaluate(() => document.body ? document.body.innerText : '');
    if (!bodyText || bodyText.trim().length === 0) {
      bugs.push({
        route,
        type: 'CRASH',
        message: 'Blank page: document body is completely empty'
      });
    } else if (bodyText.includes('Application error: a client-side exception has occurred') || bodyText.includes('Unhandled Runtime Error')) {
      bugs.push({
        route,
        type: 'CRASH',
        message: 'Next.js client crash screen rendered'
      });
    }

    // Check horizontal overflow at 360px viewport
    const overflowInfo = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth;
      const bodyWidth = document.body ? document.body.scrollWidth : 0;
      const winWidth = window.innerWidth;
      const isOverflowing = docWidth > winWidth + 1 || bodyWidth > winWidth + 1;
      return { isOverflowing, docWidth, winWidth };
    });

    if (overflowInfo.isOverflowing) {
      bugs.push({
        route,
        type: 'OVERFLOW',
        message: `Horizontal overflow at 360px (scrollWidth: ${overflowInfo.docWidth}px > window: ${overflowInfo.winWidth}px)`
      });
    }

    // Check for broken links on the page (href="undefined", href="[object Object]")
    const brokenHrefs = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href]'));
      const invalid = links
        .map((a) => a.getAttribute('href') || '')
        .filter((href) => href.includes('undefined') || href.includes('[object') || href === 'null');
      return invalid;
    });

    if (brokenHrefs.length > 0) {
      bugs.push({
        route,
        type: 'BROKEN_LINK',
        message: `Malformed link href(s) found: ${brokenHrefs.join(', ')}`
      });
    }

    // Check copy rules on visible page content
    // 1. Em dash rule: No em dashes in copy
    if (bodyText.includes('—')) {
      // Find a snippet with the em dash
      const emDashIdx = bodyText.indexOf('—');
      const snippet = bodyText.substring(Math.max(0, emDashIdx - 30), Math.min(bodyText.length, emDashIdx + 30)).replace(/\n/g, ' ');
      bugs.push({
        route,
        type: 'EM_DASH',
        message: `Em dash found in rendered text: "...${snippet}..."`
      });
    }

    // 2. Banned words rule
    const lowerBody = bodyText.toLowerCase();
    for (const banned of BANNED_WORDS) {
      // Regex word boundary search
      const regex = new RegExp(`\\b${banned}(s|es)?\\b`, 'i');
      if (regex.test(lowerBody)) {
        // Find snippet
        const match = lowerBody.match(regex);
        const matchIdx = match ? match.index || 0 : 0;
        const snippet = bodyText.substring(Math.max(0, matchIdx - 25), Math.min(bodyText.length, matchIdx + 35)).replace(/\n/g, ' ');
        bugs.push({
          route,
          type: 'BANNED_WORD',
          message: `Banned word "${banned}" found: "...${snippet}..."`
        });
      }
    }

    const pageBugsCount = bugs.filter((b) => b.route === route).length;
    if (pageBugsCount === 0) {
      console.log(`✓ OK (200, clean)`);
    } else {
      console.log(`⚠️ ${pageBugsCount} bug(s) flagged`);
    }

    await context.close();
  }

  await browser.close();

  console.log(`\n============================================================`);
  console.log(`AUDIT SUMMARY: ${checkedCount} ROUTES CHECKED`);
  console.log(`TOTAL BUGS FLAGGED: ${bugs.length}`);
  console.log(`============================================================\n`);

  if (bugs.length === 0) {
    console.log(`🏆 ZERO BUGS FOUND! Every page is completely clean and operational.\n`);
    return;
  }

  // Group bugs by type
  const grouped: Record<string, PageBug[]> = {};
  for (const bug of bugs) {
    grouped[bug.type] = grouped[bug.type] || [];
    grouped[bug.type].push(bug);
  }

  for (const [type, list] of Object.entries(grouped)) {
    console.log(`\n--- [${type}] (${list.length} occurrences) ---`);
    for (const item of list) {
      console.log(`  • ${item.route}: ${item.message}`);
    }
  }

  console.log('\n');
}

runComprehensiveSiteAudit().catch((err) => {
  console.error('Fatal error during site audit:', err);
  process.exit(1);
});
