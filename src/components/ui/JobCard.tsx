"use client";

import React from "react";
import Link from "next/link";
import { cleanRoleTitle, cleanOrgName, getRoleStatus, getShortRecordId, isSampleRole } from "@/lib/utils/roleStatus";
import { PartnerReferralBadge, ManagedRoleBadge } from "./PartnerReferralBadge";

export interface JobCardProps {
  id: string;
  slug: string;
  title: string;
  platform: string;
  workType?: string;
  countryEligibility?: "accepted" | "not-accepted" | "not_accepted" | "unconfirmed" | "due";
  countryName?: string;
  countryCode?: string;
  verifiedPay?: string | null;
  daysAgo?: number;
  status?: string;
  isClosed?: boolean;
  initialSaved?: boolean;
  onSaveToggle?: (id: string, saved: boolean) => void;
  className?: string;
  checkedDateText?: string;
  linkType?: 'direct' | 'referral';
  isManaged?: boolean;
}

/**
 * JobCard - Unified Ledger Row
 * Renders as a stacked record row on phones (title full width, status/pay/date on one line)
 * and a 4-column ledger row on desktop.
 */
export function JobCard({
  id,
  slug,
  title,
  platform,
  countryCode = "NG",
  verifiedPay,
  daysAgo = 2,
  status,
  isClosed = false,
  className = "",
  checkedDateText,
  linkType = 'direct',
  isManaged = false,
}: JobCardProps) {
  const shortId = getShortRecordId(id);
  const cleanTitle = cleanRoleTitle(title);
  const cleanPlatform = cleanOrgName(platform);
  const isSample = isSampleRole({ title, platform: { name: platform }, id });

  const statusInfo = getRoleStatus(
    { title, platform: { name: platform }, id, status },
    countryCode
  );

  const payDisplay = verifiedPay && !verifiedPay.toLowerCase().includes("not stated")
    ? verifiedPay
    : "Not stated";

  const checkedDisplay = checkedDateText || (daysAgo === 0 ? "Today" : `${daysAgo}d ago`);

  return (
    <Link
      href={`/jobs/${slug}`}
      role="row"
      className={`cs-row cs-row-link block w-full px-4 py-4 sm:py-5 border-b border-subtle bg-sheet hover:bg-elevated/40 text-ink no-underline focus-visible:outline-offset-2 transition-colors ${
        isClosed ? "opacity-60" : ""
      } ${className}`}
    >
      {/* Mobile Stacked Record Row (Phones < 640px) */}
      <div className="sm:hidden space-y-2">
        <div className="flex items-start justify-between gap-2">
          <span className="font-bold text-base text-ink line-clamp-2 leading-snug">
            {cleanTitle}
          </span>
          <div className="flex items-center gap-1 shrink-0 flex-wrap justify-end">
            {isManaged && <ManagedRoleBadge />}
            {!isManaged && linkType === 'referral' && <PartnerReferralBadge />}
            {isSample && (
              <span className="text-[10px] font-semibold text-secondary bg-subtle border border-rule px-1.5 py-0.5 rounded">
                Sample entry
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-secondary">
          <span>{cleanPlatform}</span>
          <span aria-hidden="true">&bull;</span>
          <span className="tabular-nums font-medium text-muted">Record {shortId}</span>
        </div>
        {/* Status, Pay and Date on one line */}
        <div className="flex items-center justify-between text-xs text-secondary pt-1.5 border-t border-subtle/60">
          <span className={`font-semibold ${statusInfo.colorClass}`}>
            {statusInfo.label}
          </span>
          <span className="tabular-nums font-medium text-ink">{payDisplay}</span>
          <span className="tabular-nums text-secondary">{checkedDisplay}</span>
        </div>
      </div>

      {/* Desktop 4-Column Table Row (sm: >= 640px) */}
      <div className="hidden sm:grid sm:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)_minmax(0,1fr)_120px] items-center gap-4">
        {/* Col 1: Role Title + Platform + Record ID */}
        <div className="min-w-0 pr-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-base lg:text-lg text-ink truncate group-hover:text-[var(--brand-ink)] transition-colors">
              {cleanTitle}
            </span>
            {isManaged && <ManagedRoleBadge />}
            {!isManaged && linkType === 'referral' && <PartnerReferralBadge />}
            {isSample && (
              <span className="shrink-0 text-[10px] font-semibold text-secondary bg-subtle border border-rule px-1.5 py-0.5 rounded">
                Sample entry
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-secondary mt-0.5">
            <span>{cleanPlatform}</span>
            <span aria-hidden="true">&bull;</span>
            <span className="tabular-nums font-medium text-muted">Record {shortId}</span>
          </div>
        </div>

        {/* Col 2: Eligibility Status */}
        <div>
          <span className={`font-semibold text-sm ${statusInfo.colorClass}`}>
            {statusInfo.label}
          </span>
        </div>

        {/* Col 3: Pay Claim */}
        <div>
          <span className="text-sm text-secondary tabular-nums">
            {payDisplay}
          </span>
        </div>

        {/* Col 4: Checked Date & Mini Hover Stamp */}
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="tabular-nums text-secondary">
            {checkedDisplay}
          </span>

          <svg
            className="cs-mini text-[var(--brand-ink)] shrink-0"
            width="26"
            height="26"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <circle cx="16" cy="16" r="13.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
            <path d="M10.5 16.4l3.6 3.6 7-7.4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
