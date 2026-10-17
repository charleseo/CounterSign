import React from "react";
import { Terminal, ShieldCheck } from "lucide-react";

export interface CheckEvent {
  id: string;
  timestamp: string;
  platform: string;
  roleTitle: string;
  result: "VERIFIED_ACTIVE" | "ELIGIBILITY_CONFIRMED" | "ROLE_CLOSED" | "NEEDS_RECHECK";
  countryCode?: string;
  note?: string;
}

export interface LiveCheckConsoleProps {
  events?: CheckEvent[];
  state?: "live" | "quiet" | "loading";
  className?: string;
}

/**
 * LiveCheckConsole (Section 7.1 & 10.11)
 * Real recent check events in mono type, newest first, slow pulse on top line.
 * Quiet state: completely hidden or renders quiet message when no check events exist.
 * Never displays invented or synthetic fake events.
 */
export function LiveCheckConsole({
  events = [],
  state = "live",
  className = "",
}: LiveCheckConsoleProps) {
  // If quiet state or empty events, hide console per Section 7.1 rule: "never fake events"
  if (state === "quiet" || events.length === 0) {
    return null;
  }

  if (state === "loading") {
    return (
      <div
        className={`rounded-xl border border-subtle bg-void p-4 font-mono text-xs text-secondary ${className}`}
      >
        <div className="flex items-center gap-2 mb-3">
          <Terminal size={14} className="text-accent-cyan" aria-hidden="true" />
          <span>Connecting to Verification Feed...</span>
        </div>
        <div className="space-y-2 animate-pulse">
          <div className="h-4 bg-surface rounded w-3/4" />
          <div className="h-4 bg-surface rounded w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-rule bg-sheet overflow-hidden text-xs ${className}`}
      aria-label="Live verification log console"
    >
      {/* Console Title Bar */}
      <div className="px-4 py-2.5 border-b border-rule bg-surface flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2 h-2 rounded-full bg-rose-500/60" />
            <span className="w-2 h-2 rounded-full bg-amber-500/60" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
          </div>
          <span className="font-semibold text-primary text-[11px] flex items-center gap-1.5">
            <Terminal size={13} className="text-secondary" aria-hidden="true" />
            Live check status
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-secondary">
          <span
            className="w-2 h-2 rounded-full bg-emerald-500"
            aria-hidden="true"
          />
          <span className="text-secondary font-medium">Audit logs</span>
        </div>
      </div>

      {/* Events Stream */}
      <ul className="p-3.5 space-y-3 divide-y divide-subtle/50">
        {events.map((event, idx) => {
          const isTop = idx === 0;
          return (
            <li
              key={event.id}
              className={`flex flex-col gap-1.5 text-[11px] ${
                idx > 0 ? "pt-2.5" : ""
              } ${isTop ? "text-primary animate-telemetry-pulse" : "text-readable"}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex flex-wrap items-center gap-2 min-w-0">
                  <span className="text-secondary shrink-0 font-mono text-[10px] sm:text-[11px]">
                    {event.timestamp}
                  </span>
                  <span className="text-primary font-semibold shrink-0">
                    {event.platform}
                  </span>
                  <span className="text-secondary hidden sm:inline" aria-hidden="true">&bull;</span>
                  <span className="font-medium text-primary break-words">
                    {event.roleTitle}
                  </span>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  {event.countryCode && (
                    <span className="px-1.5 py-0.5 rounded bg-surface border border-subtle text-[10px] text-secondary">
                      {event.countryCode}
                    </span>
                  )}
                  <span
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                      event.result === "VERIFIED_ACTIVE"
                        ? "text-[#45F5C5] bg-[#45F5C5]/10 border border-[#45F5C5]/30"
                        : event.result === "ELIGIBILITY_CONFIRMED"
                        ? "text-[#3DEBFF] bg-[#3DEBFF]/10 border border-[#3DEBFF]/30"
                        : event.result === "NEEDS_RECHECK"
                        ? "text-[#FFC66D] bg-[#FFC66D]/10 border border-[#FFC66D]/30"
                        : "text-[#FF6B6B] bg-[#FF6B6B]/10 border border-[#FF6B6B]/30"
                    }`}
                  >
                    <ShieldCheck size={11} aria-hidden="true" />
                    <span>{event.result.replace("_", " ")}</span>
                  </span>
                </div>
              </div>

              {event.note && (
                <div className="text-[11px] text-secondary break-words leading-relaxed pl-2 border-l border-subtle font-sans">
                  {event.note}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
