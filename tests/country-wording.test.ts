import assert from 'node:assert';
import fs from 'fs';
import http from 'http';
import { chromium } from 'playwright-core';
import { COUNTRIES } from '../src/lib/utils/country';

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

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

/**
 * Filter out sample source text: citations of sample data, platform links, or data disclaimer blocks
 */
function stripSampleSourceText(text: string): string {
  return text
    .replace(/\[SAMPLE\].*$/gim, '')
    .replace(/Source:.*$/gim, '')
    .replace(/Sample entry.*$/gim, '');
}

async function runCountryWordingTests() {
  console.log('\n============================================================');
  console.log('RUNNING COUNTRY WORDING VERIFICATION TEST (Part 1.1)');
  console.log('============================================================\n');

  // 1. Verify country utilities configuration
  console.log('1. Checking country metadata configuration...');
  assert.strictEqual(COUNTRIES.US.idNumberName, 'Social Security number (SSN)');
  assert.strictEqual(COUNTRIES.GB.idNumberName, 'National Insurance (NI) number');
  assert.strictEqual(COUNTRIES.CA.idNumberName, 'Social Insurance Number (SIN)');
  assert.ok(COUNTRIES.NG.idNumberName.includes('BVN'));
  console.log('Passed: Country metadata idNumberName correct for US, GB, CA, and NG.\n');

  // 2. Playwright full page verification if dev/prod server is running
  const isServerUp = await checkServerRunning(3000);
  if (!isServerUp) {
    console.log('Server is not running on port 3000. Skipping browser crawl step (browser test requires running server).');
    console.log('To run browser verification, launch server and run: npx tsx tests/country-wording.test.ts\n');
    return;
  }

  console.log('2. Server running on port 3000. Starting Chromium browser verification...');
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const testCountries = [
    { param: 'US', code: 'US', name: 'United States' },
    { param: 'GB', code: 'GB', name: 'United Kingdom' },
    { param: 'UK', code: 'GB', name: 'United Kingdom (alias UK)' },
    { param: 'CA', code: 'CA', name: 'Canada' },
  ];

  try {
    for (const target of testCountries) {
      console.log(`\nTesting Home page with country=${target.param}...`);
      const context = await browser.newContext();
      const page = await context.newPage();

      await page.goto(`http://localhost:3000/?country=${target.param}`, {
        waitUntil: 'networkidle',
        timeout: 15000,
      });

      // Wait a moment for React hydration
      await page.waitForTimeout(500);

      // Extract all user-facing text from page, excluding sample badge / sample citations
      const pageContent = await page.evaluate(() => {
        // Remove known sample cards if any
        const sampleElements = document.querySelectorAll('[data-sample="true"], .sample-source');
        sampleElements.forEach((el) => el.remove());
        return document.body.innerText;
      });

      const cleanedContent = stripSampleSourceText(pageContent);

      // Assertions: Neither "Nigeria" nor "BVN" should appear in user-facing copy
      const lines = cleanedContent.split('\n').map((l) => l.trim()).filter(Boolean);
      const offendingNigeriaLines = lines.filter((l) =>
        /\bNigeria\b/i.test(l) &&
        !l.includes('[SAMPLE]') &&
        !l.toLowerCase().includes('sample') &&
        !l.toLowerCase().includes('central bank of nigeria') // sample citation
      );

      const offendingBvnLines = lines.filter((l) =>
        /\bBVN\b/i.test(l) &&
        !l.includes('[SAMPLE]') &&
        !l.toLowerCase().includes('sample')
      );

      if (offendingNigeriaLines.length > 0) {
        console.error(`FAILED for country=${target.param}: Found unexpected "Nigeria" in visible copy:`);
        offendingNigeriaLines.forEach((l) => console.error(`  -> "${l}"`));
      }
      assert.strictEqual(
        offendingNigeriaLines.length,
        0,
        `Page with country=${target.param} must not contain "Nigeria" outside sample data.`
      );

      if (offendingBvnLines.length > 0) {
        console.error(`FAILED for country=${target.param}: Found unexpected "BVN" in visible copy:`);
        offendingBvnLines.forEach((l) => console.error(`  -> "${l}"`));
      }
      assert.strictEqual(
        offendingBvnLines.length,
        0,
        `Page with country=${target.param} must not contain "BVN" outside sample data.`
      );

      // Verify correct regional terms appear
      if (target.code === 'US') {
        assert.ok(
          cleanedContent.includes('Social Security number') || cleanedContent.includes('SSN'),
          'US page must mention SSN / Social Security number in scam check'
        );
      } else if (target.code === 'GB') {
        assert.ok(
          cleanedContent.includes('National Insurance'),
          'UK / GB page must mention National Insurance in scam check'
        );
      } else if (target.code === 'CA') {
        assert.ok(
          cleanedContent.includes('Social Insurance Number') || cleanedContent.includes('SIN'),
          'CA page must mention Social Insurance Number (SIN) in scam check'
        );
      }

      // Verify Nigeria hub link is NOT in the footer
      const footerNigeriaLink = await page.$('footer a[href="/countries/nigeria"]');
      assert.strictEqual(footerNigeriaLink, null, `Footer must not link to Nigeria hub when country=${target.param}`);

      console.log(`Passed: country=${target.param} has no Nigeria/BVN wording and displays correct regional copy.`);
      await context.close();
    }

    // 3. Test with country=NG
    console.log('\nTesting Home page with country=NG...');
    const ngContext = await browser.newContext();
    const ngPage = await ngContext.newPage();
    await ngPage.goto('http://localhost:3000/?country=NG', {
      waitUntil: 'networkidle',
      timeout: 15000,
    });
    await ngPage.waitForTimeout(500);

    const ngText = await ngPage.evaluate(() => document.body.innerText);
    assert.ok(
      ngText.includes('BVN') || ngText.includes('NIN'),
      'Nigeria page must mention BVN or NIN in scam check'
    );
    assert.ok(
      ngText.includes('open to Nigeria'),
      'Nigeria page step 2 must mention open to Nigeria'
    );

    // Verify Nigeria hub link IS in the footer for Nigeria
    const footerNigeriaLink = await ngPage.$('footer a[href="/countries/nigeria"]');
    assert.ok(footerNigeriaLink !== null, 'Footer MUST link to Nigeria hub when country=NG');
    console.log('Passed: country=NG correctly displays BVN and Nigeria footer hub link.\n');
    await ngContext.close();

    console.log('ALL COUNTRY WORDING TESTS PASSED SUCCESSFULLY!');
  } finally {
    await browser.close();
  }
}

runCountryWordingTests().catch((err) => {
  console.error('Country wording test failed:', err);
  process.exit(1);
});
