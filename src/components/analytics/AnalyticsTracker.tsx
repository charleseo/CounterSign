'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics/tracker';

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (pathname === lastPathRef.current) return;
    lastPathRef.current = pathname;

    // Map route to Section 18.1 events
    if (pathname === '/') {
      trackEvent('home_view');
    } else if (pathname === '/evaluation') {
      trackEvent('studio_view');
    } else if (pathname === '/evaluation/sample-audit') {
      trackEvent('sample_audit_open');
    } else if (pathname === '/scam-check') {
      trackEvent('scam_check_view');
    } else if (pathname.startsWith('/platforms')) {
      trackEvent('platform_view', { slug: pathname.split('/')[2] || null });
    } else if (pathname.startsWith('/jobs/') && pathname !== '/jobs') {
      trackEvent('job_view', { slug: pathname.split('/')[2] || null });
    } else if (pathname.startsWith('/evaluation/services')) {
      trackEvent('service_page_view', { service: pathname.split('/')[3] || null });
    }
  }, [pathname]);

  return null;
}
