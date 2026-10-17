'use client';

import React from 'react';
import { trackEvent } from '@/lib/analytics/tracker';

import { ManagedRoleApplicationModal } from './ManagedRoleApplicationModal';

interface ApplyButtonProps {
  url: string;
  orgName: string;
  slug: string;
  className?: string;
  isPartnerReferral?: boolean;
  isManaged?: boolean;
  onApplyManaged?: () => void;
}

export function ApplyButton({
  url,
  orgName,
  slug,
  className = '',
  isPartnerReferral = false,
  isManaged = false,
  onApplyManaged,
}: ApplyButtonProps) {
  const [showModal, setShowModal] = React.useState(false);

  const handleClick = (e: React.MouseEvent) => {
    try {
      trackEvent('apply_click', {
        slug,
        orgName,
        linkType: isManaged ? 'managed' : isPartnerReferral ? 'referral' : 'direct',
      });
    } catch {
      // Non-blocking telemetry
    }

    if (isManaged) {
      e.preventDefault();
      if (onApplyManaged) {
        onApplyManaged();
      } else {
        setShowModal(true);
      }
    }
  };

  if (isManaged) {
    return (
      <div className="w-full mt-5">
        <button
          type="button"
          onClick={handleClick}
          className={`cs-btn cs-btn-primary w-full min-h-[48px] text-base font-bold text-center inline-flex items-center justify-center cursor-pointer ${className}`}
        >
          Apply through TraceBase
        </button>
        <p className="text-[11px] text-secondary text-left mt-2 leading-relaxed">
          <span className="font-semibold text-[var(--brand-ink)]">TraceBase managed sprint:</span> applications are reviewed directly by our operations team.
        </p>

        <ManagedRoleApplicationModal
          jobTitle={orgName}
          jobSlug={slug}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      </div>
    );
  }

  return (
    <div className="w-full mt-5">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`cs-btn cs-btn-primary w-full min-h-[48px] text-base font-bold text-center inline-flex items-center justify-center ${className}`}
      >
        Apply on {orgName}&apos;s site
      </a>
      {isPartnerReferral && (
        <p className="text-[11px] text-secondary text-left mt-2 leading-relaxed">
          <span className="font-semibold text-teal-300">Verified partner link:</span> applying through this link supports our independent verification work at no extra cost to you. Platform rankings and check statuses are never sold.
        </p>
      )}
    </div>
  );
}
