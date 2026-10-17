import React from "react";
import { Globe, DollarSign, Clock, ShieldCheck, ExternalLink } from "lucide-react";

export interface TruthStripCell {
  label: "ELIGIBILITY" | "PAY BASIS" | "ONBOARDING" | "LAST CHECKED";
  value: string;
  sourceUrl?: string;
  sourceName?: string;
  isConfirmed?: boolean;
}

export interface TruthStripProps {
  eligibility: string;
  payBasis: string;
  onboarding: string;
  lastChecked: string;
  eligibilitySourceUrl?: string;
  paySourceUrl?: string;
  onboardingSourceUrl?: string;
  lastCheckedSourceUrl?: string;
  isClosed?: boolean;
  className?: string;
}

/**
 * TruthStrip (Section 10.3, 10.5 & 10.11)
 * Four critical decision facts: Eligibility, Pay basis, Onboarding, Last checked.
 * 2x2 grid on mobile (< 640px), 4-column row on desktop.
 * Each cell includes an icon, value, and verified source link.
 */
export function TruthStrip({
  eligibility,
  payBasis,
  onboarding,
  lastChecked,
  eligibilitySourceUrl,
  paySourceUrl,
  onboardingSourceUrl,
  lastCheckedSourceUrl,
  isClosed = false,
  className = "",
}: TruthStripProps) {
  const cells = [
    {
      label: "ELIGIBILITY",
      icon: Globe,
      value: eligibility,
      sourceUrl: eligibilitySourceUrl,
      sourceName: "Official eligibility requirements",
      isConfirmed: !eligibility.toLowerCase().includes("unconfirmed"),
    },
    {
      label: "PAY BASIS",
      icon: DollarSign,
      value: payBasis,
      sourceUrl: paySourceUrl,
      sourceName: "Verified pay structure",
      isConfirmed: !payBasis.toLowerCase().includes("not confirmed"),
    },
    {
      label: "ONBOARDING",
      icon: Clock,
      value: onboarding,
      sourceUrl: onboardingSourceUrl,
      sourceName: "Onboarding reality report",
      isConfirmed: !onboarding.toLowerCase().includes("unknown"),
    },
    {
      label: "LAST CHECKED",
      icon: ShieldCheck,
      value: lastChecked,
      sourceUrl: lastCheckedSourceUrl,
      sourceName: "Human verification record",
      isConfirmed: true,
    },
  ];

  return (
    <div
      className={`rounded-lg border border-subtle bg-surface p-3.5 sm:p-4 ${
        isClosed ? "opacity-70 bg-void" : ""
      } ${className}`}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-subtle">
        {cells.map((cell, idx) => {
          const Icon = cell.icon;
          return (
            <div
              key={cell.label}
              className={`flex flex-col justify-between ${
                idx > 0 ? "pt-2 sm:pt-0 sm:pl-4" : ""
              }`}
            >
              <div className="flex items-center gap-1.5 text-secondary mb-1">
                <Icon size={13} className="text-secondary flex-shrink-0" aria-hidden="true" />
                <span className="text-[10px] font-mono font-semibold text-secondary">
                  {cell.label}
                </span>
              </div>

              <div className="font-mono text-xs sm:text-sm font-medium text-primary leading-tight">
                {cell.value}
              </div>

              {cell.sourceUrl ? (
                <div className="mt-1.5">
                  <a
                    href={cell.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-accent-cyan hover:underline font-mono"
                    title={`Source: ${cell.sourceName}`}
                  >
                    <span>Source</span>
                    <ExternalLink size={10} aria-hidden="true" />
                  </a>
                </div>
              ) : (
                <div className="mt-1.5 text-[11px] font-mono text-secondary">
                  {cell.isConfirmed ? "Verified source" : "Not yet verified"}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
