'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, AlertTriangle, ArrowRight, DollarSign, UserCheck, Lock, TrendingUp, Calculator, CheckCircle2 } from 'lucide-react';

interface DirectVsAgencyComparisonProps {
  rolePayRate?: string;
  roleTitle?: string;
}

export function DirectVsAgencyComparison({
  rolePayRate,
  roleTitle,
}: DirectVsAgencyComparisonProps) {
  const [weeklyHours, setWeeklyHours] = useState<number>(20);

  // Parse approximate hourly rate if available or default to $25/hr
  const directHourlyRate = 25;
  const agencyHourlyRate = 9;

  const directMonthly = weeklyHours * 4 * directHourlyRate;
  const agencyMonthly = weeklyHours * 4 * agencyHourlyRate;
  const differenceMonthly = directMonthly - agencyMonthly;
  const differenceYearly = differenceMonthly * 12;

  return (
    <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-7 space-y-6">
      {/* Title & Badge */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
          <ShieldCheck size={13} />
          <span>Financial transparency check</span>
        </div>
        <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-ink m-0">
          Direct platform application vs. agency middleman
        </h3>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed m-0">
          Many remote workers in emerging markets lose over half their hourly earnings to third-party agency recruiters who manage pooled accounts. Here is why applying direct through verified employer links protects your income.
        </p>
      </div>

      {/* Side-by-side comparison cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Direct Card */}
        <div className="p-5 rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" aria-hidden="true" />
              <span className="text-sm font-bold text-ink">Direct via TraceBase</span>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
              0% cut taken
            </span>
          </div>

          <ul className="space-y-3 text-xs text-secondary list-none p-0 m-0">
            <li className="flex items-start gap-2.5">
              <UserCheck size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-ink font-semibold">Full account ownership</strong>
                <span>Your login credentials, profile, and payout details belong solely to you.</span>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <DollarSign size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-ink font-semibold">Direct hourly rates ($18 to $50/hr)</strong>
                <span>You keep 100% of the funds disbursed by the platform.</span>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <ShieldCheck size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-ink font-semibold">Portable contributor reputation</strong>
                <span>Pass rates, test certifications, and reviewer promotions stay on your verified profile.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Agency Middleman Card */}
        <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-red-500/20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" aria-hidden="true" />
              <span className="text-sm font-bold text-ink">Third-party agency middleman</span>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-700 dark:text-red-300">
              30% to 50% cut taken
            </span>
          </div>

          <ul className="space-y-3 text-xs text-secondary list-none p-0 m-0">
            <li className="flex items-start gap-2.5">
              <Lock size={15} className="text-red-500 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-ink font-semibold">Master account retained by agency</strong>
                <span>The recruiter controls your login. If they close the account, you lose all unpaid earnings.</span>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <AlertTriangle size={15} className="text-red-500 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-ink font-semibold">Marked-down pay ($7 to $12/hr)</strong>
                <span>The agency pockets $10 to $25+ per hour of your evaluation labor without doing the work.</span>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <AlertTriangle size={15} className="text-red-500 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-ink font-semibold">Zero personal standing</strong>
                <span>All project history is credited to the agency account, leaving you with no verifiable track record.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Interactive Monthly Earnings Calculator */}
      <div className="p-4 sm:p-5 rounded-xl border border-rule bg-surface space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-ink flex items-center gap-1.5">
              <Calculator size={15} className="text-[#5A35C8] shrink-0" aria-hidden="true" />
              <span>Calculate your earnings difference</span>
            </span>
            <span className="text-[11px] text-secondary">
              Drag the slider to adjust your estimated weekly evaluation hours:
            </span>
          </div>
          <span className="text-sm font-mono font-bold text-[#5A35C8] bg-sheet px-3 py-1 rounded-lg border border-rule self-start sm:self-auto shadow-xs">
            {weeklyHours} hours / week
          </span>
        </div>

        {/* Range Slider */}
        <div className="space-y-1">
          <input
            type="range"
            min={5}
            max={40}
            step={5}
            value={weeklyHours}
            onChange={(e) => setWeeklyHours(Number(e.target.value))}
            className="w-full accent-[#5A35C8] cursor-pointer"
            aria-label="Weekly evaluation hours"
          />
          <div className="flex justify-between text-[10px] text-muted font-mono">
            <span>5 hrs/wk</span>
            <span>20 hrs/wk</span>
            <span>40 hrs/wk</span>
          </div>
        </div>

        {/* Calculated Totals Comparison Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center">
          <div className="p-3 rounded-lg bg-sheet border border-rule">
            <span className="text-[11px] text-secondary block mb-1">Direct monthly pay</span>
            <span className="text-base sm:text-lg font-extrabold text-emerald-800 dark:text-emerald-400 tabular-nums">
              ${directMonthly.toLocaleString()}
            </span>
            <span className="text-[10px] text-muted block mt-0.5">At typical $25/hr</span>
          </div>

          <div className="p-3 rounded-lg bg-sheet border border-rule">
            <span className="text-[11px] text-secondary block mb-1">Agency monthly pay</span>
            <span className="text-base sm:text-lg font-extrabold text-red-700 dark:text-red-400 tabular-nums">
              ${agencyMonthly.toLocaleString()}
            </span>
            <span className="text-[10px] text-muted block mt-0.5">At typical $9/hr</span>
          </div>

          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold flex items-center gap-1.5 mb-1">
              <TrendingUp size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Direct contributor advantage</span>
            </span>
            <span className="text-base sm:text-lg font-extrabold text-ink tabular-nums">
              +${differenceMonthly.toLocaleString()}/mo
            </span>
            <span className="text-[10px] text-secondary block mt-0.5">
              +${differenceYearly.toLocaleString()}/year
            </span>
          </div>
        </div>
      </div>

      {/* 3 Red flags to spot a middleman agency */}
      <div className="p-4 rounded-xl border border-subtle bg-sheet space-y-2 text-xs">
        <span className="font-bold text-ink block">
          3 Warning signs you are dealing with a middleman agency:
        </span>
        <ul className="space-y-1.5 text-secondary list-disc pl-4 m-0">
          <li>They ask you to log into an existing account or profile that they created.</li>
          <li>They demand a percentage of your weekly pay, an upfront test fee, or a training deposit.</li>
          <li>They refuse to share the official direct employer careers link.</li>
        </ul>
      </div>
    </div>
  );
}
