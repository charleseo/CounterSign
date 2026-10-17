import React from 'react';

interface SponsoredBadgeProps {
  className?: string;
}

/**
 * SponsoredBadge - Prepared for future transparent commercial labeling.
 * Follows AGENTS.md copy rules: sentence case, plain kind styling, no all-caps.
 */
export function SponsoredBadge({ className = '' }: SponsoredBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border border-amber-500/30 bg-amber-500/10 text-amber-300 ${className}`}
      title="This placement was paid for by the hiring entity. It does not affect our independent verification checks."
    >
      Sponsored
    </span>
  );
}
