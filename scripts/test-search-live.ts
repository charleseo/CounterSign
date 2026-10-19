import { chromium } from 'playwright-core';
import fs from 'fs';
import assert from 'node:assert';

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3001';

async function main() {
  console.log(`Testing search live at ${BASE_URL}...`);
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
  const context = await browser.newContext({ viewport: { width: 1200, height: 800 } });
  const page = await context.newPage();

  const issues: string[] = [];

  // Listen to console errors
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      issues.push(`Console error: ${msg.text()}`);
    }
  });

  // TEST 1: Direct URL search parameter (?q=python)
  console.log('\n--- TEST 1: Direct URL navigation with ?q=python ---');
  await page.goto(`${BASE_URL}/jobs?q=python`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);

  const searchVal1 = await page.locator('input[aria-label="Search roles"]').inputValue();
  console.log(`Search input value: "${searchVal1}"`);
  if (searchVal1 !== 'python') {
    issues.push(`Direct navigation: search input was "${searchVal1}" instead of "python"`);
  }

  // TEST 2: Multi-word search tests
  console.log('\n--- TEST 2: Multi-word search tests ---');
  const searchInput = page.locator('input[aria-label="Search roles"]');

  // Query 2a: "outlier reasoning" (open for Nigeria)
  await searchInput.fill('outlier reasoning');
  try {
    await page.locator('text=AI Model Reasoning').filter({ visible: true }).first().waitFor({ timeout: 3000 });
    console.log('✓ "outlier reasoning" returned matching roles');
  } catch (err) {
    issues.push(`Multi-word search "outlier reasoning" did not display matching role: ${err}`);
  }

  // Query 2b: "data annotation math" (open for Nigeria)
  await searchInput.fill('data annotation math');
  try {
    await page.locator('text=Math Reasoning').filter({ visible: true }).first().waitFor({ timeout: 3000 });
    console.log('✓ "data annotation math" returned matching roles');
  } catch (err) {
    issues.push(`Multi-word search "data annotation math" did not display matching role: ${err}`);
  }

  // Query 2c: "mercor safety" (open for Nigeria)
  await searchInput.fill('mercor safety');
  try {
    await page.locator('text=Frontier AI Safety').filter({ visible: true }).first().waitFor({ timeout: 3000 });
    console.log('✓ "mercor safety" returned matching roles');
  } catch (err) {
    issues.push(`Multi-word search "mercor safety" did not display matching role: ${err}`);
  }

  // TEST 3: Check duplicate clear buttons
  console.log('\n--- TEST 3: Duplicate clear buttons check ---');
  const inputType = await searchInput.getAttribute('type');
  const customClearBtnCount = await page.locator('button[aria-label="Clear search"]').count();
  console.log(`Input type is "${inputType}", custom clear button count: ${customClearBtnCount}`);
  if (inputType === 'search' && customClearBtnCount > 0) {
    issues.push(`Both native type="search" cancel button and custom clear button are present, causing duplicate "×" buttons`);
  }

  // TEST 4: Navigation from Command Palette while on /jobs
  console.log('\n--- TEST 4: Command Palette "Search in jobs" while on /jobs ---');
  // Open palette via shortcut or header
  await page.keyboard.press('Control+KeyK');
  await page.waitForTimeout(400);

  const paletteInput = page.locator('input[placeholder*="Type to search roles"]');
  const isPaletteVisible = await paletteInput.isVisible();
  console.log(`Palette visible: ${isPaletteVisible}`);

  if (isPaletteVisible) {
    await paletteInput.fill('Mercor');
    await page.waitForTimeout(400);

    const searchInJobsBtn = page.locator('button:has-text("Search in jobs")');
    if (await searchInJobsBtn.isVisible()) {
      await searchInJobsBtn.click();
      await page.waitForTimeout(800);

      const urlAfterPalette = page.url();
      const currentQueryVal = await page.locator('input[aria-label="Search roles"]').inputValue();
      console.log(`URL after clicking "Search in jobs": ${urlAfterPalette}`);
      console.log(`Input value after clicking "Search in jobs": "${currentQueryVal}"`);

      if (!urlAfterPalette.includes('q=Mercor') && !urlAfterPalette.includes('q=mercor')) {
        issues.push(`Command Palette "Search in jobs" did not preserve query in URL: ${urlAfterPalette}`);
      }
      if (currentQueryVal.toLowerCase() !== 'mercor') {
        issues.push(`Command Palette "Search in jobs" did not update search input value on /jobs: got "${currentQueryVal}"`);
      }
    }
  }

  // TEST 5: Command Palette multi-word query
  console.log('\n--- TEST 5: Command Palette multi-word query ("outlier rlhf") ---');
  await page.keyboard.press('Control+KeyK');
  await page.waitForTimeout(400);
  if (await paletteInput.isVisible()) {
    await paletteInput.fill('outlier rlhf');
    await page.waitForTimeout(400);
    const noResultsText = await page.locator('text=No verified items found matching').isVisible();
    console.log(`Palette "outlier rlhf" noResultsText: ${noResultsText}`);
    if (noResultsText) {
      issues.push(`Command Palette returned no results for multi-word query "outlier rlhf"`);
    }
  }

  // TEST 6: Clear button ('X') clears search input and restores listings
  console.log('\n--- TEST 6: Clear button click ---');
  await page.keyboard.press('Escape'); // close palette
  await page.waitForTimeout(300);

  const clearBtn = page.locator('button[aria-label="Clear search"]');
  if (await clearBtn.isVisible()) {
    await clearBtn.click();
    await page.waitForTimeout(500);

    const clearedVal = await page.locator('input[aria-label="Search roles"]').inputValue();
    console.log(`Input value after clicking clear button: "${clearedVal}"`);
    if (clearedVal !== '') {
      issues.push(`Clear button did not reset search input: still "${clearedVal}"`);
    } else {
      console.log('✓ Clear button reset search input');
    }
  }

  // TEST 7: Escape key clears search
  console.log('\n--- TEST 7: Escape key clears search input ---');
  const rolesInput = page.locator('input[aria-label="Search roles"]');
  await rolesInput.fill('temporary test query');
  await page.waitForTimeout(300);
  await rolesInput.press('Escape');
  await page.waitForTimeout(300);
  const valAfterEscape = await rolesInput.inputValue();
  console.log(`Input value after Escape key: "${valAfterEscape}"`);
  if (valAfterEscape !== '') {
    issues.push(`Escape key did not clear search input: got "${valAfterEscape}"`);
  } else {
    console.log('✓ Escape key successfully cleared search input');
  }

  // TEST 8: CountrySelector alias search ("USA")
  console.log('\n--- TEST 8: CountrySelector alias search ("USA") ---');
  const countryBtn = page.locator('button[title*="Country set to"]').first();
  await countryBtn.click();
  await page.waitForTimeout(400);

  const countrySearchInput = page.locator('input[placeholder*="Search country"]');
  if (await countrySearchInput.isVisible()) {
    await countrySearchInput.fill('USA');
    await page.waitForTimeout(400);

    const hasUnitedStates = await page.locator('button:has-text("United States")').isVisible();
    console.log(`Searching "USA" shows "United States": ${hasUnitedStates}`);
    if (!hasUnitedStates) {
      issues.push('Country search for alias "USA" did not find United States');
    } else {
      console.log('✓ Country alias search for "USA" found United States');
    }
    // Close country dialog
    await page.keyboard.press('Escape');
  }

  await browser.close();

  console.log('\n============================================================');
  console.log(`TEST COMPLETED: ${issues.length} issues found:`);
  issues.forEach((issue, idx) => {
    console.log(`${idx + 1}. ${issue}`);
  });
  console.log('============================================================\n');
}

main().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
