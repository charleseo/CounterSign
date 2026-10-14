import React from "react";
import { Check, HelpCircle, X } from "lucide-react";

export interface PlatformCompareData {
  id: string;
  name: string;
  nigeriaAccepted: "yes" | "no" | "unconfirmed";
  workTypes: string[];
  assessmentStyle: string;
  payoutMethods: string[];
  queueReality: string;
  payRange: string;
  lastReviewed: string;
}

export interface CompareTableProps {
  platforms: PlatformCompareData[];
  isLoading?: boolean;
  className?: string;
}

/**
 * CompareTable (Section 7.6 & 10.11)
 * Compares up to 4 platforms side by side.
 * Sticky first column, horizontal mobile scroll with edge cues.
 * Unknown values read "Not confirmed", never blank.
 */
export function CompareTable({
  platforms,
  isLoading = false,
  className = "",
}: CompareTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-subtle bg-surface p-6 font-mono text-xs text-secondary animate-pulse">
        Loading platform comparison data...
      </div>
    );
  }

  const rows: Array<{
    label: string;
    renderValue: (p: PlatformCompareData) => React.ReactNode;
  }> = [
    {
      label: "Nigeria Accepted",
      renderValue: (p) => {
        if (p.nigeriaAccepted === "yes") {
          return (
            <span className="inline-flex items-center gap-1 text-[#45F5C5] font-semibold">
              <Check size={14} aria-hidden="true" /> Accepted
            </span>
          );
        }
        if (p.nigeriaAccepted === "no") {
          return (
            <span className="inline-flex items-center gap-1 text-[#FF6B6B] font-semibold">
              <X size={14} aria-hidden="true" /> Not accepted
            </span>
          );
        }
        return (
          <span className="inline-flex items-center gap-1 text-[#FFC66D] font-semibold">
            <HelpCircle size={14} aria-hidden="true" /> Not confirmed
          </span>
        );
      },
    },
    {
      label: "Typical Pay (Verified)",
      renderValue: (p) => p.payRange || "Not confirmed",
    },
    {
      label: "Primary Work Types",
      renderValue: (p) => p.workTypes.join(", ") || "Not confirmed",
    },
    {
      label: "Screening Assessment",
      renderValue: (p) => p.assessmentStyle || "Not confirmed",
    },
    {
      label: "Payout Channels",
      renderValue: (p) => p.payoutMethods.join(", ") || "Not confirmed",
    },
    {
      label: "Task Queue Reality",
      renderValue: (p) => p.queueReality || "Not confirmed",
    },
    {
      label: "Last Reviewed",
      renderValue: (p) => p.lastReviewed || "Not confirmed",
    },
  ];

  return (
    <div
      className={`rounded-2xl border border-subtle bg-surface overflow-hidden shadow-sm ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-subtle bg-void">
              {/* Sticky first column */}
              <th className="sticky left-0 z-20 bg-void p-3.5 sm:p-4 text-secondary uppercase tracking-wider text-[11px] font-semibold border-r border-subtle min-w-[150px] sm:min-w-[180px]">
                Platform Feature
              </th>
              {platforms.map((p) => (
                <th
                  key={p.id}
                  className="p-3.5 sm:p-4 text-primary font-bold text-sm min-w-[170px] sm:min-w-[200px]"
                >
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-subtle">
            {rows.map((row, rIdx) => (
              <tr
                key={row.label}
                className={rIdx % 2 === 0 ? "bg-surface" : "bg-surface/50"}
              >
                {/* Sticky Header Label */}
                <th className="sticky left-0 z-10 bg-inherit p-3.5 sm:p-4 text-secondary font-medium border-r border-subtle text-[11px] sm:text-xs">
                  {row.label}
                </th>

                {/* Values */}
                {platforms.map((p) => (
                  <td key={p.id} className="p-3.5 sm:p-4 text-readable leading-relaxed">
                    {row.renderValue(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-2.5 bg-void border-t border-subtle text-[11px] text-secondary font-mono flex items-center justify-between">
        <span>&larr; Scroll horizontally on mobile to view all platforms &rarr;</span>
        <span>All data sourced from official documentation and worker reports.</span>
      </div>
    </div>
  );
}
