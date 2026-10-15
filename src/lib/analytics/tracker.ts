'use client';

import type { AnalyticsEventType } from '@/lib/db/types';

/**
 * Privacy-Friendly Analytics Event Tracker (Section 18.1)
 * Zero cookies, zero personal data, respects Do Not Track (DNT).
 */
export function trackEvent(
  event: AnalyticsEventType | string,
  properties?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;

  // Respect Do Not Track
  if (navigator.doNotTrack === '1' || (window as unknown as { doNotTrack?: string }).doNotTrack === '1') {
    return;
  }

  const payload = {
    event,
    path: window.location.pathname,
    properties: {
      ...properties,
      tier: document.documentElement.getAttribute('data-capability') || 'full',
      country_code: localStorage.getItem('cs_country') || null,
    },
  };

  try {
    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics', blob);
    } else {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        // Silently catch network errors
      });
    }
  } catch {
    // Non-blocking telemetry
  }
}
