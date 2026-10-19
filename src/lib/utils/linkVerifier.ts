export interface LinkCheckResult {
  jobId: string;
  title: string;
  url: string;
  httpStatus: number | null;
  ok: boolean;
  flaggedForReview: boolean;
  issueDescription: string | null;
  redirectUrl?: string | null;
}

export async function checkUrlStatus(targetUrl: string): Promise<{
  httpStatus: number | null;
  ok: boolean;
  isRedirect: boolean;
  redirectUrl: string | null;
  error: string | null;
}> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    let res: Response;
    try {
      res = await fetch(targetUrl, {
        method: 'HEAD',
        redirect: 'manual',
        headers: {
          'User-Agent': 'TraceBaseLinkVerifier/1.0 (+https://tracebase.work)',
          Accept: 'text/html,application/xhtml+xml',
        },
        signal: controller.signal,
      });

      // Some ATS career portals return 405 Method Not Allowed to HEAD requests
      if (res.status === 405) {
        res = await fetch(targetUrl, {
          method: 'GET',
          redirect: 'manual',
          headers: {
            'User-Agent': 'TraceBaseLinkVerifier/1.0 (+https://tracebase.work)',
            Accept: 'text/html,application/xhtml+xml',
          },
          signal: controller.signal,
        });
      }
    } finally {
      clearTimeout(timeout);
    }

    const isRedirect = [301, 302, 303, 307, 308].includes(res.status);
    const redirectUrl = isRedirect ? res.headers.get('location') : null;
    const ok = res.status >= 200 && res.status < 400 && !isRedirect;

    return {
      httpStatus: res.status,
      ok,
      isRedirect,
      redirectUrl,
      error: null,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Connection failed';
    return {
      httpStatus: null,
      ok: false,
      isRedirect: false,
      redirectUrl: null,
      error: message,
    };
  }
}
