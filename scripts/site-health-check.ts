import http from 'http';

interface RouteTest {
  path: string;
  expectedStatus: number;
  expectedContentType?: string;
  checkContent?: (body: string) => boolean | string;
}

const ROUTES_TO_TEST: RouteTest[] = [
  // Core Public Routes
  { path: '/', expectedStatus: 200, checkContent: (b) => b.includes('<h1') },
  { path: '/jobs', expectedStatus: 200, checkContent: (b) => b.includes('JobsExplorer') || b.includes('roles') || b.includes('directory') },
  { path: '/jobs/sample-mercor-llm-researcher', expectedStatus: 200 },
  { path: '/platforms', expectedStatus: 200 },
  { path: '/platforms/outlier', expectedStatus: 200 },
  { path: '/platforms/outlier/ng', expectedStatus: 200 },
  { path: '/compare', expectedStatus: 200 },
  { path: '/guides', expectedStatus: 200 },
  { path: '/guides/how-to-tell-if-an-ai-work-listing-is-real', expectedStatus: 200 },
  { path: '/scam-check', expectedStatus: 200 },
  { path: '/scams-this-week', expectedStatus: 200 },
  { path: '/scams-this-week/telegram-advance-fee-recruitment-scheme', expectedStatus: 200 },
  { path: '/evaluation', expectedStatus: 200 },
  { path: '/evaluation/methodology', expectedStatus: 200 },
  { path: '/evaluation/sample-audit', expectedStatus: 200 },
  { path: '/evaluation/evaluators', expectedStatus: 200 },
  { path: '/about', expectedStatus: 200 },
  { path: '/methodology', expectedStatus: 200 },
  { path: '/privacy', expectedStatus: 200 },
  { path: '/privacy/request', expectedStatus: 200 },
  { path: '/terms', expectedStatus: 200 },
  { path: '/corrections', expectedStatus: 200 },
  { path: '/disclosure', expectedStatus: 200 },
  { path: '/official-channels', expectedStatus: 200 },
  { path: '/countries', expectedStatus: 200 },
  { path: '/countries/us', expectedStatus: 200 },
  { path: '/countries/gb', expectedStatus: 200 },
  { path: '/countries/ca', expectedStatus: 200 },
  { path: '/countries/ng', expectedStatus: 308 },
  { path: '/countries/nigeria', expectedStatus: 200 },
  { path: '/changes', expectedStatus: 200 },
  { path: '/contact', expectedStatus: 200 },
  { path: '/admin/login', expectedStatus: 200 },

  // Redirect check (UK to GB)
  { path: '/countries/uk', expectedStatus: 308 },

  // Data / Feeds / API Routes
  { path: '/api/jobs.json', expectedStatus: 200, expectedContentType: 'application/json' },
  { path: '/api/evaluation/sample-audit.json', expectedStatus: 200, expectedContentType: 'application/json' },
  { path: '/api/evaluation/sample-audit.csv', expectedStatus: 200, expectedContentType: 'text/csv' },
  { path: '/evaluation/sample-audit.pdf', expectedStatus: 200, expectedContentType: 'application/pdf', checkContent: (b) => b.startsWith('%PDF-1.4') },
  { path: '/robots.txt', expectedStatus: 200, checkContent: (b) => b.toLowerCase().includes('user-agent:') },
  { path: '/sitemap.xml', expectedStatus: 200, checkContent: (b) => b.includes('<urlset') },
  { path: '/rss.xml', expectedStatus: 200, checkContent: (b) => b.includes('<rss') && b.includes('version="2.0"') },

  // Non-existent route (404 test)
  { path: '/this-route-does-not-exist-at-all', expectedStatus: 404 },
];

function fetchRoute(path: string): Promise<{ statusCode: number; headers: http.IncomingHttpHeaders; body: string; duration: number }> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const req = http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode || 0,
          headers: res.headers,
          body: data,
          duration: Date.now() - startTime,
        });
      });
    });

    req.on('error', (err) => reject(err));
    req.setTimeout(20000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${path}`));
    });
  });
}

async function runSiteHealthCheck() {
  console.log('\n============================================================');
  console.log('INTENSIVE SITE HEALTH CHECK ACROSS ALL ROUTES');
  console.log('============================================================\n');

  let passed = 0;
  let failed = 0;
  const failures: string[] = [];

  for (const item of ROUTES_TO_TEST) {
    try {
      const res = await fetchRoute(item.path);
      const isStatusOk = res.statusCode === item.expectedStatus;
      let isContentOk = true;
      let contentErrMsg = '';

      if (item.expectedContentType && res.headers['content-type']) {
        if (!res.headers['content-type'].includes(item.expectedContentType)) {
          isContentOk = false;
          contentErrMsg = `Content-Type mismatch: expected ${item.expectedContentType}, got ${res.headers['content-type']}`;
        }
      }

      if (item.checkContent && isContentOk) {
        const checkResult = item.checkContent(res.body);
        if (typeof checkResult === 'string') {
          isContentOk = false;
          contentErrMsg = checkResult;
        } else if (!checkResult) {
          isContentOk = false;
          contentErrMsg = 'Custom content check failed';
        }
      }

      if (isStatusOk && isContentOk) {
        passed++;
        console.log(`✓ [${res.statusCode}] ${item.path.padEnd(50)} (${res.duration}ms, ${(res.body.length / 1024).toFixed(1)} KB)`);
      } else {
        failed++;
        const reason = !isStatusOk
          ? `Status code expected ${item.expectedStatus}, got ${res.statusCode}`
          : contentErrMsg;
        console.error(`✗ [${res.statusCode}] ${item.path.padEnd(50)} - FAIL: ${reason}`);
        failures.push(`${item.path}: ${reason}`);
      }
    } catch (err: any) {
      failed++;
      console.error(`✗ [ERR] ${item.path.padEnd(50)} - ERROR: ${err.message}`);
      failures.push(`${item.path}: ${err.message}`);
    }
  }

  console.log('\n============================================================');
  console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('============================================================\n');

  if (failed > 0) {
    console.error('The following health check routes failed:');
    failures.forEach((f) => console.error(` - ${f}`));
    process.exit(1);
  } else {
    console.log('All routes passed comprehensive site health check!');
    process.exit(0);
  }
}

runSiteHealthCheck().catch((err) => {
  console.error('Fatal health check error:', err);
  process.exit(1);
});
