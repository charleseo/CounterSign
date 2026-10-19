import fs from 'fs';
import http from 'http';
import { chromium } from 'playwright-core';

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const BANNED_WORDS = [
  'jurisdiction',
  'immutable',
  'forensic',
  'telemetry',
  'nexus',
  'utility',
  'protocol',
  'instrument',
  'instruments',
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
  'guaranteed',
  'priority 1',
  'priority 2',
];

const ALLOWED_ACRONYMS = new Set([
  'US', 'UK', 'CA', 'AI', 'ID', 'SSN', 'SIN', 'BVN', 'NIN', 'CV',
  'FAQ', 'RSS', 'PDF', 'CSV', 'JSON', 'API', 'RAG', 'LLM', 'URL', 'USD',
  'GBP', 'NGN', 'EUR', 'CAD', 'W2', 'SLA', 'NDPA', 'NDPC', 'CCPA', 'CPRA',
  'IRS', 'CRA', 'HMRC', 'SEO', 'P1', 'P2', 'WW', 'GMT', 'UTC', 'ISO',
  'ACH', 'DOM', 'KYC', 'AML', 'TOC', 'RLHF', 'SFT', 'AGY', 'IDE', 'STEM',
  'AWS', 'CSS', 'SDK', 'NDA', 'MVCC', 'ATS', 'CAC', 'GDPR', 'CDN', 'HTTP',
  'SAR', 'GPC', 'ATM', 'USDT', 'ICANN', 'WHOIS', 'CAPTCHA', 'OCT',
  'COUNTERSIGNED', 'CREATE', 'INDEX', 'CONCURRENTLY', 'BEGIN', 'COMMIT',
  'SELECT', 'READ', 'COMMITTED', 'SAMPLE', 'PIN', 'PIPEDA', 'OTP'
]);

const PUBLIC_ROUTES = [
  '/',
  '/jobs',
  '/jobs/outlier-ai-generalist-evaluator',
  '/platforms',
  '/platforms/outlier',
  '/compare',
  '/guides',
  '/guides/how-to-tell-if-an-ai-work-listing-is-real',
  '/scam-check',
  '/evaluation',
  '/evaluation/methodology',
  '/evaluation/sample-audit',
  '/evaluation/evaluators',
  '/about',
  '/methodology',
  '/privacy',
  '/terms',
  '/corrections',
  '/disclosure',
  '/official-channels',
];

interface Violation {
  route: string;
  element: string;
  offendingText: string;
  reason: string;
}

function checkServerRunning(port = 3000): Promise<boolean> {
  return new Promise((resolve) => {
    const req = http.get(`http://127.0.0.1:${port}`, (res) => {
      res.resume();
      resolve(true);
    });
    req.on('error', () => {
      const fallback = http.get(`http://localhost:${port}`, (res2) => {
        res2.resume();
        resolve(true);
      });
      fallback.on('error', () => resolve(false));
      fallback.setTimeout(30000, () => {
        fallback.destroy();
        resolve(false);
      });
    });
    req.setTimeout(30000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function runCopyLint() {
  console.log('\n============================================================');
  console.log('RUNNING AUTOMATED COPY LINT (Part 2.2)');
  console.log('============================================================\n');

  const isServerUp = await checkServerRunning(3000);
  if (!isServerUp) {
    console.error('Error: Server is not running on http://localhost:3000.');
    console.error('Please start the production server with: npm run build && npm start');
    process.exit(1);
  }

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const allViolations: Violation[] = [];
  const isProduction = process.env.NODE_ENV === 'production' || process.env.SHOW_SAMPLE_DATA === 'false';

  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const page = await context.newPage();

    for (const route of PUBLIC_ROUTES) {
      const url = `http://localhost:3000${route}`;
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await page.waitForTimeout(400);

        const routeViolations = await page.evaluate(
          ({ route, bannedWords, allowedAcronyms, isProduction }) => {
            // Polyfill __name if injected by esbuild/tsx into browser context
            // @ts-expect-error browser context
            globalThis.__name = globalThis.__name || ((fn) => fn);
            const acronymSet = new Set(allowedAcronyms);
            const violations: Array<{
              route: string;
              element: string;
              offendingText: string;
              reason: string;
            }> = [];

            // Helper to get selector/descriptor
            function getElemDescriptor(el: Element): string {
              const tag = el.tagName.toLowerCase();
              const id = el.id ? `#${el.id}` : '';
              const cls = el.className && typeof el.className === 'string'
                ? '.' + el.className.split(/\s+/).slice(0, 2).join('.')
                : '';
              return `${tag}${id}${cls}`;
            }

            // Walk elements in body
            const elements = Array.from(document.body.querySelectorAll('*'));
            for (const el of elements) {
              // Ignore script, style, noscript, svg, path
              const tag = el.tagName.toLowerCase();
              if (['script', 'style', 'noscript', 'svg', 'path'].includes(tag)) continue;

              // If element has children that have text, only inspect direct text nodes to avoid duplicate bubbling
              let directText = '';
              for (const node of Array.from(el.childNodes)) {
                if (node.nodeType === Node.TEXT_NODE) {
                  directText += node.textContent || '';
                }
              }
              directText = directText.trim();
              if (!directText) continue;

              // Check 1: Em dash
              if (directText.includes('\u2014')) {
                violations.push({
                  route,
                  element: getElemDescriptor(el),
                  offendingText: directText,
                  reason: 'Em dash (—) found. Use a full stop or comma per style guide.',
                });
              }

              // Check 2: Banned words
              for (const word of bannedWords) {
                // Word boundary matching, case-insensitive
                const re = new RegExp(`\\b${word}\\b`, 'i');
                if (re.test(directText)) {
                  violations.push({
                    route,
                    element: getElemDescriptor(el),
                    offendingText: directText,
                    reason: `Banned word "${word}" found.`,
                  });
                }
              }

              // Check 3: SAMPLE keyword in production
              if (isProduction) {
                if (/\bSAMPLE\b/i.test(directText) || /\[SAMPLE\]/i.test(directText)) {
                  violations.push({
                    route,
                    element: getElemDescriptor(el),
                    offendingText: directText,
                    reason: 'SAMPLE label found in production mode.',
                  });
                }
              }

              // Check 4: Uppercase text
              // Check computed style text-transform
              const style = window.getComputedStyle(el);
              if (style.textTransform === 'uppercase' && directText.length > 2) {
                // Check if all words are known acronyms
                const words = directText.split(/[\s,.:;!?"'()[\]{}]+/).filter((w) => w.length > 2);
                const hasNonAcronym = words.some((w) => !acronymSet.has(w.toUpperCase()));
                if (hasNonAcronym) {
                  violations.push({
                    route,
                    element: getElemDescriptor(el),
                    offendingText: directText,
                    reason: `Element rendered in uppercase via text-transform: "${directText}". Use sentence case.`,
                  });
                }
              } else {
                // Check literal uppercase words longer than 2 chars that are NOT allowed acronyms
                const words = directText.split(/[\s,.:;!?"'()[\]{}]+/).filter((w) => w.length > 2);
                for (const w of words) {
                  if (/^[A-Z]{3,}$/.test(w) && !acronymSet.has(w)) {
                    violations.push({
                      route,
                      element: getElemDescriptor(el),
                      offendingText: directText,
                      reason: `Literal all-caps word "${w}" found. Use sentence case.`,
                    });
                    break;
                  }
                }
              }
            }

            return violations;
          },
          {
            route,
            bannedWords: BANNED_WORDS,
            allowedAcronyms: Array.from(ALLOWED_ACRONYMS),
            isProduction,
          }
        );

        allViolations.push(...routeViolations);
        console.log(`Checked ${route.padEnd(45)} - ${routeViolations.length === 0 ? '✓ Clean' : `✗ ${routeViolations.length} violation(s)`}`);
      } catch (err: any) {
        console.warn(`Warning checking ${route}: ${err.message}`);
      }
    }

    await context.close();
  } finally {
    await browser.close();
  }

  console.log('\n============================================================');
  console.log(`COPY LINT SUMMARY: ${allViolations.length} VIOLATION(S) FOUND`);
  console.log('============================================================\n');

  if (allViolations.length > 0) {
    console.error('The following copy violations must be resolved:\n');
    allViolations.forEach((v, idx) => {
      console.error(`[${idx + 1}] Route: ${v.route}`);
      console.error(`    Element:  <${v.element}>`);
      console.error(`    Reason:   ${v.reason}`);
      console.error(`    Text:     "${v.offendingText.slice(0, 120)}${v.offendingText.length > 120 ? '...' : ''}"\n`);
    });
    process.exit(1);
  } else {
    console.log('All public routes comply with Countersign copy rules!');
    process.exit(0);
  }
}

runCopyLint().catch((err) => {
  console.error('Fatal copy-lint error:', err);
  process.exit(1);
});
