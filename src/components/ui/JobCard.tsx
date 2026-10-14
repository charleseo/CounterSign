"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Bookmark, BookmarkCheck, ArrowUpRight } from "lucide-react";
import { StatusBadge, StatusType } from "./StatusBadge";
import { FreshnessStamp } from "./FreshnessStamp";

export interface JobCardProps {
  id: string;
  slug: string;
  title: string;
  platform: string;
  workType: string;
  countryEligibility: "accepted" | "not-accepted" | "unconfirmed";
  countryName?: string;
  verifiedPay?: string;
  daysAgo: number;
  status: StatusType;
  isClosed?: boolean;
  initialSaved?: boolean;
  onSaveToggle?: (id: string, saved: boolean) => void;
  className?: string;
}

/**
 * JobCard (Section 10.11, 7.2, 10.2a)
 * Whole card tappable, accessible focus ring, scale(0.98) on press,
 * spotlight edge on fine pointers in Full tier, complete metadata visible without clicking.
 */
export function JobCard({
  id,
  slug,
  title,
  platform,
  workType,
  countryEligibility,
  countryName = "Nigeria",
  verifiedPay,
  daysAgo,
  status,
  isClosed = false,
  initialSaved = false,
  onSaveToggle,
  className = "",
}: JobCardProps) {
  const [saved, setSaved] = useState(initialSaved);
  const cardRef = useRef<HTMLDivElement>(null);

  // Spotlight edge mouse tracking for Full tier
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextSaved = !saved;
    setSaved(nextSaved);
    if (onSaveToggle) {
      onSaveToggle(id, nextSaved);
    }
  };

  const eligibilityConfig = {
    accepted: { label: `${countryName}: Accepted`, status: "accepted" as StatusType },
    "not-accepted": { label: `${countryName}: Not accepted`, status: "not-accepted" as StatusType },
    unconfirmed: { label: `${countryName}: Unconfirmed`, status: "unconfirmed" as StatusType },
  }[countryEligibility];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-xl border border-subtle bg-surface spotlight-card card-interactive card-press transition-all ${
        isClosed ? "opacity-60 bg-void border-dashed" : "hover:border-focus"
      } ${className}`}
    >
      <div className="p-4 sm:p-5 flex flex-col justify-between gap-3 min-h-[170px]">
        {/* Top Meta Row: Platform + Work Type + Status Badges */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-semibold text-accent-cyan uppercase tracking-wider">
              {platform}
            </span>
            <span className="text-secondary text-xs" aria-hidden="true">&bull;</span>
            <span className="text-xs text-secondary">{workType}</span>
            {isClosed && (
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-accent-danger/10 text-[#FF6B6B] border border-accent-danger/30">
                Closed
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <StatusBadge status={status} size="sm" />
            <button
              type="button"
              onClick={handleSaveClick}
              aria-label={saved ? `Remove ${title} from saved jobs` : `Save ${title}`}
              aria-pressed={saved}
              className="p-1.5 rounded text-secondary hover:text-primary hover:bg-elevated transition-colors"
            >
              {saved ? (
                <BookmarkCheck size={16} className="text-accent-cyan" />
              ) : (
                <Bookmark size={16} />
              )}
            </button>
          </div>
        </div>

        {/* Main Title Row */}
        <div>
          <Link
            href={`/jobs/${slug}`}
            className="block focus:outline-none"
            tabIndex={0}
          >
            <h3 className="text-base sm:text-lg font-semibold text-primary group-hover:text-accent-cyan transition-colors flex items-start justify-between gap-2">
              <span className="line-clamp-2 leading-snug">{title}</span>
              <ArrowUpRight
                size={18}
                className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
            </h3>
          </Link>
        </div>

        {/* Bottom Details Row: Eligibility Chip + Verified Pay + Freshness Stamp */}
        <div className="pt-2 border-t border-subtle flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge
              status={eligibilityConfig.status}
              size="sm"
              showExplanationOnClick={false}
            />
            <span className="text-xs font-mono text-readable">
              {verifiedPay ? (
                <span className="text-primary font-medium">{verifiedPay}</span>
              ) : (
                <span className="text-secondary">Pay: not confirmed</span>
              )}
            </span>
          </div>

          <FreshnessStamp daysAgo={daysAgo} />
        </div>
      </div>
    </div>
  );
}
