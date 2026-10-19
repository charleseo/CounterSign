"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, DollarSign, Activity, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export function HomeBentoGrid() {
  // Bento Card 2 interactive earnings slider state
  const [hourlyRate, setHourlyRate] = useState<number>(35);
  const [weeklyHours, setWeeklyHours] = useState<number>(25);

  const directMonthly = Math.round(hourlyRate * weeklyHours * 4.33);
  // Intermediary agencies typically take 50% to 60%
  const agencyMonthly = Math.round(directMonthly * 0.45);
  const agencyLossMonthly = directMonthly - agencyMonthly;
  const yearlyKept = agencyLossMonthly * 12;

  return (
    <section aria-label="Verification standards" className="w-full border-y border-rule bg-surface/50 py-12 sm:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-medium text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Verification standards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight m-0">
              Built like an audit network. Not a job board.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-secondary max-w-[34em] m-0">
            Four engineering rules protect your time and pay. Zero scrapers, zero ghost listings, zero middleman cuts.
          </p>
        </div>

        {/* 4-Card Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5">
          {/* Bento Card 1: Standards & Live Terminal (Col span 3 on lg) */}
          <div className="ts-card p-6 flex flex-col justify-between gap-5 sm:col-span-2 lg:col-span-3">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-subtle">
                <span className="font-mono text-[11px] tracking-wide text-secondary font-semibold">
                  Audit standard
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-800 dark:text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live check
                </span>
              </div>
              <div className="mt-4 space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold text-ink m-0 tracking-tight">
                  100% human-verified on official career pages
                </h3>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed m-0">
                  We open every role directly on the employer&apos;s official domain, verify country eligibility, test the application link, and sign the record. Zero scrapers, zero ghost jobs.
                </p>
              </div>
            </div>

            {/* Embedded Live CLI Inspector Stream */}
            <div className="p-3.5 rounded-xl bg-canvas border border-rule font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-muted text-[11px] pb-1.5 border-b border-rule">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-ink font-semibold">tracebase check outlier.ai/careers</span>
                </span>
                <span className="text-emerald-800 dark:text-emerald-400 font-semibold">200 OK</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-secondary">Country clearance</span>
                <span className="text-ink font-semibold">Confirmed (NG, KE, US, UK, CA)</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-secondary">Direct compensation</span>
                <span className="text-emerald-800 dark:text-emerald-400 font-semibold">$18 to $45/hr direct</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-secondary">Auditor signature</span>
                <span className="text-ink font-semibold">Auditor #0142 verified</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Interactive Pay Calculator (Col span 3 on lg) */}
          <div className="ts-card p-6 flex flex-col justify-between gap-5 sm:col-span-2 lg:col-span-3">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-subtle">
                <span className="font-mono text-[11px] tracking-wide text-secondary font-semibold">
                  Compensation
                </span>
                <span className="font-mono text-[11px] text-emerald-800 dark:text-emerald-400 font-semibold">
                  0% agency cut
                </span>
              </div>
              <div className="mt-4 space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold text-ink m-0 tracking-tight">
                  Direct client pay vs intermediary agencies
                </h3>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed m-0">
                  Intermediary staffing agencies routinely keep 50% to 60% of worker earnings. TraceBase lists only direct contracts so you keep 100% of your rate.
                </p>
              </div>
            </div>

            {/* Interactive Calculator Slider Widget */}
            <div className="p-3.5 rounded-xl bg-canvas border border-rule space-y-3 font-mono text-xs">
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-secondary">Direct client rate:</span>
                  <span className="text-ink font-bold text-xs">${hourlyRate}/hr</span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="80"
                  step="1"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full accent-[#111827] dark:accent-white cursor-pointer h-1.5 bg-subtle rounded-lg"
                  aria-label="Direct hourly rate"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-rule text-[11px]">
                <div className="p-2 rounded-lg bg-sheet border border-emerald-500/30">
                  <span className="text-[10px] text-secondary block font-sans">Direct contract</span>
                  <span className="text-emerald-800 dark:text-emerald-400 font-bold text-sm">
                    ${directMonthly.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-muted block font-sans">/ month (100% kept)</span>
                </div>
                <div className="p-2 rounded-lg bg-sheet border border-rule">
                  <span className="text-[10px] text-secondary block font-sans">Via agency</span>
                  <span className="text-secondary font-bold text-sm line-through">
                    ${agencyMonthly.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-rose-800 dark:text-rose-400 block font-sans">
                    -${agencyLossMonthly.toLocaleString()} cut
                  </span>
                </div>
              </div>

              <div className="text-center pt-1 text-[11px] font-sans font-medium text-emerald-800 dark:text-emerald-400">
                You retain <span className="font-bold font-mono">+${yearlyKept.toLocaleString()} / year</span> by applying directly
              </div>
            </div>
          </div>

          {/* Bento Card 3: Live Flow Monitor (Col span 3 on lg) */}
          <div className="ts-card p-6 flex flex-col justify-between gap-5 sm:col-span-2 lg:col-span-3">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-subtle">
                <span className="font-mono text-[11px] tracking-wide text-secondary font-semibold">
                  Queue flow monitor
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-teal-800 dark:text-teal-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  Hourly updates
                </span>
              </div>
              <div className="mt-4 space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold text-ink m-0 tracking-tight">
                  Real-time queue signals across 6 hubs
                </h3>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed m-0">
                  Real contributor reports on review speeds and batch volume so you never waste hours waiting on paused queues.
                </p>
              </div>
            </div>

            {/* Embedded Queue Health Signals */}
            <div className="p-3.5 rounded-xl bg-canvas border border-rule font-mono text-xs space-y-2.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-ink font-semibold">Outlier AI</span>
                <span className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active tasks
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-ink font-semibold">DataAnnotation</span>
                <span className="flex items-center gap-1.5 text-teal-800 dark:text-teal-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  Steady flow
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-ink font-semibold">Mercor</span>
                <span className="flex items-center gap-1.5 text-indigo-800 dark:text-indigo-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  Selective interviews
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-ink font-semibold">Alignerr</span>
                <span className="flex items-center gap-1.5 text-amber-800 dark:text-amber-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Multimodal queue
                </span>
              </div>
            </div>
          </div>

          {/* Bento Card 4: Integrity Retention Cycle (Col span 3 on lg) */}
          <div className="ts-card p-6 flex flex-col justify-between gap-5 sm:col-span-2 lg:col-span-3">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-subtle">
                <span className="font-mono text-[11px] tracking-wide text-secondary font-semibold">
                  Retention rule
                </span>
                <span className="font-mono text-[11px] text-amber-800 dark:text-amber-400 font-semibold">
                  Max 30d lifecycle
                </span>
              </div>
              <div className="mt-4 space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold text-ink m-0 tracking-tight">
                  14-day check cycle with auto-prune
                </h3>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed m-0">
                  Stale roles are flagged at 14 days and removed after 30 days without confirmation. If a platform closes a role, it leaves our index immediately.
                </p>
              </div>
            </div>

            {/* Embedded Timeline Widget */}
            <div className="p-3.5 rounded-xl bg-canvas border border-rule font-mono text-xs">
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] sm:text-[11px]">
                <div className="p-2.5 rounded-lg bg-sheet border border-rule">
                  <span className="block font-bold text-ink">Day 0</span>
                  <span className="text-emerald-800 dark:text-emerald-400 font-semibold">Checked by hand</span>
                </div>
                <div className="p-2.5 rounded-lg bg-sheet border border-rule">
                  <span className="block font-bold text-ink">Day 14</span>
                  <span className="text-amber-800 dark:text-amber-400 font-semibold">Recheck review</span>
                </div>
                <div className="p-2.5 rounded-lg bg-sheet border border-rule">
                  <span className="block font-bold text-ink">Day 30</span>
                  <span className="text-secondary font-semibold">Auto-prune</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
