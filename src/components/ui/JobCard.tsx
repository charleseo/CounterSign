"use client";

import React from "react";
import Link from "next/link";
import { Users, Calendar, TrendingUp } from "lucide-react";
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
  summary?: string;
  acceptingSince?: string | null;
  acceptedCount?: number | null;
  successRate?: string | null;
  knowledgeRequirements?: string[];
  domains?: string[];
}

/**
 * JobCard - Unified Ledger Row with Role Brief & Intake Metrics
 * Renders as a rich, stacked card on phones with brief, intake dates, and accepted count,
 * and an expanded 4-column structured ledger on desktop.
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
  summary,
  acceptingSince,
  acceptedCount,
  successRate,
  domains = [],
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
      className={`group cs-row-link block w-full px-4 py-4 sm:py-5 border-b border-subtle last:border-b-0 bg-sheet hover:bg-elevated/50 text-ink no-underline focus-visible:outline-offset-2 transition-all duration-200 hover:shadow-[0_4px_20px_-8px_rgba(90,53,200,0.15)] ${
        isClosed ? "opacity-60" : ""
      } ${className}`}
    >
      {/* Mobile Stacked Record Row (Phones < 640px) */}
      <div className="sm:hidden space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <span className="font-bold text-base text-ink line-clamp-2 leading-snug group-hover:text-[var(--brand-ink)] transition-colors">
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
          <span className="font-medium text-ink">{cleanPlatform}</span>
          <span aria-hidden="true">&bull;</span>
          <span className="tabular-nums font-mono text-muted">Record {shortId}</span>
        </div>

        {/* Role Brief Summary */}
        {summary && (
          <p className="text-xs text-secondary leading-relaxed line-clamp-2 m-0">
            {summary.replace(/\[SAMPLE\]/g, '').trim()}
          </p>
        )}

        {/* Intake & Selection Metrics Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {acceptingSince && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-rule text-[11px] text-secondary">
              <Calendar size={11} className="text-[#5A35C8] shrink-0" />
              <span>Accepting since {acceptingSince}</span>
            </span>
          )}
          {typeof acceptedCount === 'number' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-rule text-[11px] text-secondary tabular-nums">
              <Users size={11} className="text-emerald-500 shrink-0" />
              <span>{acceptedCount} accepted (Reported)</span>
            </span>
          )}
          {successRate && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-rule text-[11px] text-secondary">
              <TrendingUp size={11} className="text-amber-500 shrink-0" />
              <span>{successRate}</span>
            </span>
          )}
        </div>

        {/* Status, Pay and Date on one line */}
        <div className="flex items-center justify-between text-xs text-secondary pt-2 border-t border-subtle/60">
          <span className={`font-semibold ${statusInfo.colorClass}`}>
            {statusInfo.label}
          </span>
          <span className="tabular-nums font-semibold text-ink">{payDisplay}</span>
          <span className="tabular-nums text-secondary font-mono">{checkedDisplay}</span>
        </div>
      </div>

      {/* Desktop 4-Column Table Row (sm: >= 640px) */}
      <div className="hidden sm:grid sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_120px] items-start gap-4">
        {/* Col 1: Role Title + Platform + Role Brief + Key Metrics & Domains */}
        <div className="min-w-0 pr-2 space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-base lg:text-lg text-ink line-clamp-1 leading-snug group-hover:text-[var(--brand-ink)] transition-colors">
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

          <div className="flex items-center gap-2 text-xs text-secondary">
            <span className="font-medium text-ink">{cleanPlatform}</span>
            <span aria-hidden="true">&bull;</span>
            <span className="tabular-nums font-mono text-muted">Record {shortId}</span>
          </div>

          {/* Role Brief Summary */}
          {summary && (
            <p className="text-xs text-secondary line-clamp-2 leading-relaxed m-0">
              {summary.replace(/\[SAMPLE\]/g, '').trim()}
            </p>
          )}

          {/* Intake Metrics & Requirements Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            {acceptingSince && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface border border-rule text-[11px] text-secondary">
                <Calendar size={11} className="text-[#5A35C8] shrink-0" />
                <span>Accepting since {acceptingSince}</span>
              </span>
            )}
            {typeof acceptedCount === 'number' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface border border-rule text-[11px] text-secondary tabular-nums">
                <Users size={11} className="text-emerald-500 shrink-0" />
                <span>{acceptedCount} accepted (Reported)</span>
              </span>
            )}
            {successRate && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface border border-rule text-[11px] text-secondary">
                <TrendingUp size={11} className="text-amber-500 shrink-0" />
                <span>{successRate}</span>
              </span>
            )}
            {domains.slice(0, 2).map((dom) => (
              <span
                key={dom}
                className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono text-secondary bg-subtle border border-rule/60"
              >
                {dom}
              </span>
            ))}
          </div>
        </div>

        {/* Col 2: Eligibility Status */}
        <div className="pt-0.5">
          <span className={`font-semibold text-sm ${statusInfo.colorClass}`}>
            {statusInfo.label}
          </span>
        </div>

        {/* Col 3: Pay Claim */}
        <div className="pt-0.5">
          <span className="text-sm font-semibold text-ink tabular-nums block">
            {payDisplay}
          </span>
          {verifiedPay && (
            <span className="text-[11px] text-secondary block mt-0.5">
              Verified employer listing
            </span>
          )}
        </div>

        {/* Col 4: Checked Date & Mini Hover Stamp */}
        <div className="flex items-center justify-between gap-2 text-sm pt-0.5">
          <span className="tabular-nums text-secondary font-mono text-xs">
            {checkedDisplay}
          </span>

          <svg
            className="cs-mini text-[var(--brand-ink)] shrink-0 group-hover:scale-110 transition-transform"
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
