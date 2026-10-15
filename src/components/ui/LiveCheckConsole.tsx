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
      className={`rounded-2xl glass-panel overflow-hidden text-xs font-mono shadow-[0_12px_40px_rgba(0,0,0,0.5),_inset_0_1px_0_rgba(61,235,255,0.12)] border border-cyan-500/20 ${className}`}
      aria-label="Live verification log console"
    >
      {/* Console Title Bar */}
      <div className="px-4 py-2.5 border-b border-white/[0.08] bg-white/[0.03] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2 h-2 rounded-full bg-rose-500/60" />
            <span className="w-2 h-2 rounded-full bg-amber-500/60" />
            <span className="w-2 h-2 rounded-full bg-cyan-400/80 shadow-[0_0_8px_rgba(61,235,255,0.6)]" />
          </div>
          <span className="font-semibold text-primary tracking-wider uppercase text-[11px] flex items-center gap-1.5">
            <Terminal size={13} className="text-accent-cyan" aria-hidden="true" />
            Live Check Telemetry
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-secondary">
          <span
            className="w-2 h-2 rounded-full bg-[#45F5C5] radar-dot"
            aria-hidden="true"
          />
          <span className="text-accent-emerald font-medium">Continuous feed</span>
        </div>
      </div>

      {/* Events Stream */}
      <ul className="p-3.5 space-y-2 divide-y divide-subtle/50">
        {events.map((event, idx) => {
          const isTop = idx === 0;
          return (
            <li
              key={event.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] ${
                idx > 0 ? "pt-2" : ""
              } ${isTop ? "text-primary animate-telemetry-pulse" : "text-readable"}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-secondary">{event.timestamp}</span>
                <span className="text-accent-cyan font-medium">{event.platform}</span>
                <span className="text-secondary" aria-hidden="true">&bull;</span>
                <span className="truncate max-w-[200px] sm:max-w-[280px]">
                  {event.roleTitle}
                </span>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
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
            </li>
          );
        })}
      </ul>
    </div>
  );
}
