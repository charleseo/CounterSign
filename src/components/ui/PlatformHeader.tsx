import React from "react";
import { ExternalLink, ShieldCheck } from "lucide-react";

export interface PlatformHeaderProps {
  name: string;
  officialUrl: string;
  lastReviewed: string;
  referralStatus: "direct" | "referral_disclosed" | "none";
  openRoleCount: number;
  countrySummary?: string;
  className?: string;
}

/**
 * PlatformHeader (Section 7.4 & 10.11)
 * Header for platform reality profiles with monogram tile, official careers link,
 * explicit referral disclosure, last reviewed date, and independence statement.
 */
export function PlatformHeader({
  name,
  officialUrl,
  lastReviewed,
  referralStatus,
  openRoleCount,
  countrySummary = "Accepted in Nigeria, Ghana, Kenya, US, UK, and 45+ others",
  className = "",
}: PlatformHeaderProps) {
  // Generate a clean monogram letter
  const monogram = name.charAt(0).toUpperCase();

  return (
    <div
      className={`rounded-2xl border border-subtle bg-surface p-5 sm:p-6 space-y-4 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Monogram Tile + Title + Country Scope */}
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-xl border border-subtle bg-void flex items-center justify-center text-xl font-bold font-mono text-accent-cyan flex-shrink-0 shadow-inner"
            aria-hidden="true"
          >
            {monogram}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
                {name}
              </h1>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-subtle bg-void text-secondary">
                {openRoleCount} verified {openRoleCount === 1 ? "role" : "roles"}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-readable mt-1">
              {countrySummary}
            </p>
          </div>
        </div>

        {/* Right: Official Portal Link */}
        <a
          href={officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-subtle bg-void hover:border-focus text-xs font-mono text-primary transition-colors btn-tactile self-start sm:self-auto"
        >
          <span>Official Portal</span>
          <ExternalLink size={13} aria-hidden="true" />
        </a>
      </div>

      {/* Independence Statement & Referral Status Strip */}
      <div className="pt-3 border-t border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-secondary">
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-[#45F5C5]" aria-hidden="true" />
          <span>Independent review. Last reviewed {lastReviewed}.</span>
        </div>

        <div>
          {referralStatus === "referral_disclosed" ? (
            <span className="text-[#FFC66D] bg-[#FFC66D]/10 px-2 py-0.5 rounded border border-[#FFC66D]/30">
              Referral link active (fully disclosed per policy)
            </span>
          ) : (
            <span className="text-secondary">
              Direct official link (no referral compensation)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
