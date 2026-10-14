"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Archive,
  Check,
  Ban,
  HelpCircle,
  ShieldCheck,
  Users,
} from "lucide-react";

export type StatusType =
  | "verified"
  | "needs-recheck"
  | "needs_recheck"
  | "closed"
  | "accepted"
  | "not-accepted"
  | "not_accepted"
  | "unconfirmed"
  | "official"
  | "reported";

export interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  size?: "sm" | "md";
  date?: string;
  sourceUrl?: string;
  sourceName?: string;
  showExplanationOnClick?: boolean;
}

interface StatusConfig {
  word: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  meaning: string;
}

const baseStatusConfigs: Record<string, StatusConfig> = {
  verified: {
    word: "Verified",
    icon: CheckCircle2,
    colorClass: "text-[#45F5C5]",
    bgClass: "bg-[#45F5C5]/10",
    borderClass: "border-[#45F5C5]/30",
    meaning: "Official employer source checked within 14 days by human staff.",
  },
  "needs-recheck": {
    word: "Needs recheck",
    icon: Clock,
    colorClass: "text-[#FFC66D]",
    bgClass: "bg-[#FFC66D]/10",
    borderClass: "border-[#FFC66D]/30",
    meaning: "14 to 30 days since last human recheck. Verify on official site before applying.",
  },
  closed: {
    word: "Closed",
    icon: Archive,
    colorClass: "text-[#FF6B6B]",
    bgClass: "bg-[#FF6B6B]/10",
    borderClass: "border-[#FF6B6B]/30",
    meaning: "Role confirmed closed or official link dead. Archived for market reference.",
  },
  accepted: {
    word: "Accepted",
    icon: Check,
    colorClass: "text-[#45F5C5]",
    bgClass: "bg-[#45F5C5]/10",
    borderClass: "border-[#45F5C5]/30",
    meaning: "Country officially accepted according to employer job posting or terms.",
  },
  "not-accepted": {
    word: "Not accepted",
    icon: Ban,
    colorClass: "text-[#FF6B6B]",
    bgClass: "bg-[#FF6B6B]/10",
    borderClass: "border-[#FF6B6B]/30",
    meaning: "Country not eligible according to official employer terms.",
  },
  unconfirmed: {
    word: "Unconfirmed",
    icon: HelpCircle,
    colorClass: "text-[#FFC66D]",
    bgClass: "bg-[#FFC66D]/10",
    borderClass: "border-[#FFC66D]/30",
    meaning: "Official page is silent on this country. Applying may depend on screening.",
  },
  official: {
    word: "Official",
    icon: ShieldCheck,
    colorClass: "text-[#3DEBFF]",
    bgClass: "bg-[#3DEBFF]/10",
    borderClass: "border-[#3DEBFF]/30",
    meaning: "Fact verified directly from platform's official documentation or feed.",
  },
  reported: {
    word: "Reported",
    icon: Users,
    colorClass: "text-[#FFC66D]",
    bgClass: "bg-[#FFC66D]/10",
    borderClass: "border-[#FFC66D]/30",
    meaning: "Community reported by active workers. Not yet formally confirmed by company.",
  },
};

const statusConfigs: Record<StatusType, StatusConfig> = {
  ...baseStatusConfigs,
  needs_recheck: baseStatusConfigs["needs-recheck"],
  not_accepted: baseStatusConfigs["not-accepted"],
} as Record<StatusType, StatusConfig>;

/**
 * StatusBadge (Section 10.7)
 * Never communicates status by color alone: always pairs icon + word + accessible tooltip/popover.
 */
export function StatusBadge({
  status,
  className = "",
  size = "md",
  date,
  sourceUrl,
  sourceName,
  showExplanationOnClick = true,
}: StatusBadgeProps) {
  const [open, setOpen] = useState(false);
  const normalizedKey = status.replace('_', '-') as StatusType;
  const config = statusConfigs[status] || statusConfigs[normalizedKey] || statusConfigs.unconfirmed;
  const IconComponent = config.icon;

  const sizeClasses =
    size === "sm"
      ? "text-[11px] px-2 py-0.5 gap-1.5"
      : "text-xs px-2.5 py-1 gap-1.5";

  const iconSize = size === "sm" ? 13 : 15;

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => showExplanationOnClick && setOpen(!open)}
        className={`inline-flex items-center font-medium rounded-full border transition-all ${config.bgClass} ${config.borderClass} ${config.colorClass} ${sizeClasses} ${
          showExplanationOnClick ? "cursor-pointer hover:opacity-90" : "cursor-default"
        } ${className}`}
        aria-expanded={showExplanationOnClick ? open : undefined}
        title={`${config.word}: ${config.meaning}`}
      >
        <IconComponent size={iconSize} className="flex-shrink-0" />
        <span className="font-mono tracking-tight">{config.word}</span>
      </button>

      {/* Accessible Detail Popover */}
      {open && showExplanationOnClick && (
        <div
          role="dialog"
          aria-label={`Status details: ${config.word}`}
          className="absolute left-0 mt-2 z-30 w-72 p-3.5 rounded-lg border border-subtle bg-surface shadow-xl text-xs space-y-2 text-left"
        >
          <div className="flex items-center justify-between pb-1.5 border-b border-subtle">
            <div className="flex items-center gap-1.5">
              <IconComponent size={14} className={config.colorClass} />
              <span className={`font-semibold font-mono ${config.colorClass}`}>
                {config.word}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-secondary hover:text-primary p-0.5 text-[11px]"
              aria-label="Close status explanation"
            >
              &#x2715;
            </button>
          </div>

          <p className="text-readable leading-relaxed">{config.meaning}</p>

          {(date || sourceName || sourceUrl) && (
            <div className="pt-1.5 border-t border-subtle space-y-1 text-[11px] font-mono text-secondary">
              {date && <div>Last checked: {date}</div>}
              {sourceName && (
                <div>
                  Source:{" "}
                  {sourceUrl ? (
                    <a
                      href={sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-cyan hover:underline inline-flex items-center gap-1"
                    >
                      {sourceName}
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  ) : (
                    <span>{sourceName}</span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
