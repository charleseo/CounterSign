import React from 'react';

interface PartnerReferralBadgeProps {
  className?: string;
  showTooltip?: boolean;
}

/**
 * PartnerReferralBadge
 * Follows AGENTS.md rules: sentence case, plain language, no all-caps, no em dashes.
 * Clearly labels verified partner referral links.
 */
export function PartnerReferralBadge({ className = '' }: PartnerReferralBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border border-teal-500/30 bg-teal-500/10 text-teal-300 ${className}`}
      title="Verified partner link: applying through this link supports our independent verification work at no extra cost to you. Rankings and checks are never sold."
    >
      Verified partner link
    </span>
  );
}

export function ManagedRoleBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border border-[var(--brand-ink)]/40 bg-[var(--brand-ink)]/15 text-[var(--brand-ink)] ${className}`}
      title="TraceBase managed sprint: direct candidate intake and quality coordination by TraceBase."
    >
      TraceBase managed
    </span>
  );
}
