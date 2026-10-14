"use client";

import React, { useState } from "react";
import { CheckCircle2, ExternalLink, History } from "lucide-react";

export interface CheckLogEntry {
  date: string;
  note: string;
  checker?: string;
  sourceUrl?: string;
}

export interface FreshnessStampProps {
  daysAgo: number;
  className?: string;
  sourceName?: string;
  sourceUrl?: string;
  checkLog?: CheckLogEntry[];
  showDetailsOnClick?: boolean;
}

/**
 * FreshnessStamp (Section 10.3 & 10.11)
 * Displays "Checked X days ago" with an age dot (fresh <= 7d, aging 8-14d, stale > 14d).
 * Tap reveals the verification audit trail and official employer source.
 */
export function FreshnessStamp({
  daysAgo,
  className = "",
  sourceName = "Official job feed",
  sourceUrl,
  checkLog = [],
  showDetailsOnClick = true,
}: FreshnessStampProps) {
  const [open, setOpen] = useState(false);

  // Age tier classification
  let freshnessState: "fresh" | "aging" | "stale" = "fresh";
  let dotColor = "bg-[#45F5C5]"; // Emerald
  let stateLabel = "Fresh verification";

  if (daysAgo > 14) {
    freshnessState = "stale";
    dotColor = "bg-[#FF6B6B]"; // Red
    stateLabel = "Over 14 days since check";
  } else if (daysAgo > 7) {
    freshnessState = "aging";
    dotColor = "bg-[#FFC66D]"; // Amber
    stateLabel = "Aging check (7 to 14 days)";
  }

  const ageText =
    daysAgo === 0
      ? "Checked today"
      : daysAgo === 1
      ? "Checked yesterday"
      : `Checked ${daysAgo} days ago`;

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        data-freshness={freshnessState}
        onClick={() => showDetailsOnClick && setOpen(!open)}
        className={`inline-flex items-center gap-1.5 font-mono text-[11px] text-secondary hover:text-primary transition-colors py-0.5 px-1.5 rounded ${
          showDetailsOnClick ? "cursor-pointer hover:bg-elevated" : "cursor-default"
        }`}
        aria-expanded={showDetailsOnClick ? open : undefined}
        title={`${ageText} (${stateLabel}). Tap for verification trail.`}
      >
        <span
          className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColor}`}
          aria-hidden="true"
        />
        <span>{ageText}</span>
      </button>

      {open && showDetailsOnClick && (
        <div
          role="dialog"
          aria-label="Verification audit log"
          className="absolute left-0 mt-1.5 z-30 w-80 p-4 rounded-lg border border-subtle bg-surface shadow-xl text-xs space-y-3 text-left"
        >
          <div className="flex items-center justify-between pb-2 border-b border-subtle">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`} aria-hidden="true" />
              <span className="font-semibold text-primary font-mono">{stateLabel}</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-secondary hover:text-primary p-0.5"
              aria-label="Close verification log"
            >
              &#x2715;
            </button>
          </div>

          <div className="space-y-1">
            <div className="text-secondary text-[11px]">Primary Source:</div>
            {sourceUrl ? (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-cyan hover:underline inline-flex items-center gap-1 font-mono text-xs break-all"
              >
                <span>{sourceName}</span>
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            ) : (
              <span className="text-readable font-mono text-xs">{sourceName}</span>
            )}
          </div>

          {/* Audit History Log */}
          <div className="space-y-1.5 pt-2 border-t border-subtle">
            <div className="flex items-center gap-1 text-[11px] text-secondary uppercase tracking-wider font-mono">
              <History size={12} aria-hidden="true" />
              <span>Recent Verification Checks</span>
            </div>

            {checkLog.length > 0 ? (
              <ul className="space-y-1.5 font-mono text-[11px]">
                {checkLog.slice(0, 4).map((entry, idx) => (
                  <li
                    key={idx}
                    className="p-1.5 rounded bg-void border border-subtle flex flex-col gap-0.5"
                  >
                    <div className="flex items-center justify-between text-secondary">
                      <span>{entry.date}</span>
                      <span className="text-[#45F5C5] inline-flex items-center gap-0.5">
                        <CheckCircle2 size={10} aria-hidden="true" /> Verified
                      </span>
                    </div>
                    <p className="text-readable text-[10px]">{entry.note}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-[11px] text-secondary font-mono italic p-2 rounded bg-void border border-subtle">
                Verified against official employer feed. Next human recheck scheduled within 14 days.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
