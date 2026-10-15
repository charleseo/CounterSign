"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Platform, PlatformStep, AggregatedPlatformExperience } from "@/lib/db/types";
import { FreshnessStamp } from "@/components/ui/FreshnessStamp";
import { Check, HelpCircle, ExternalLink, ArrowRight, Plus } from "lucide-react";

interface CompareData {
  platform: Platform;
  steps: PlatformStep[];
  openRolesCount: number;
  experience: AggregatedPlatformExperience;
  nigeriaAccepted: boolean;
}

interface PlatformCompareTableProps {
  initialPlatforms: CompareData[];
  allPlatforms: Array<{ id: string; slug: string; name: string }>;
}

export function PlatformCompareTable({
  initialPlatforms,
  allPlatforms,
}: PlatformCompareTableProps) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(
    initialPlatforms.slice(0, 4).map((p) => p.platform.slug)
  );

  const togglePlatform = (slug: string) => {
    if (selectedSlugs.includes(slug)) {
      if (selectedSlugs.length > 2) {
        setSelectedSlugs(selectedSlugs.filter((s) => s !== slug));
      }
    } else {
      if (selectedSlugs.length < 4) {
        setSelectedSlugs([...selectedSlugs, slug]);
      }
    }
  };

  const activeData = initialPlatforms.filter((p) =>
    selectedSlugs.includes(p.platform.slug)
  );

  return (
    <div className="space-y-6">
      {/* Platform Selector Chips */}
      <div className="p-5 sm:p-6 rounded-2xl glass-panel relative overflow-hidden border border-cyan-500/20 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
            Select Platforms to Compare (2 to 4)
          </span>
          <span className="text-xs font-mono text-accent-cyan font-bold">
            {selectedSlugs.length} of 4 selected
          </span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {allPlatforms.map((p) => {
            const isSelected = selectedSlugs.includes(p.slug);
            const cleanName = p.name.replace(/\[SAMPLE\]/g, "").trim();
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => togglePlatform(p.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-400 to-teal-400 text-void font-bold shadow-[0_0_15px_rgba(61,235,255,0.35)]"
                    : "glass-card text-secondary hover:text-primary hover:border-cyan-400/40"
                }`}
              >
                {isSelected ? <Check size={13} className="text-void" /> : <Plus size={13} />}
                <span>{cleanName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix */}
      <div className="overflow-x-auto border border-white/[0.08] rounded-2xl glass-panel shadow-2xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-subtle bg-void/70">
              <th className="p-4 sm:p-5 font-semibold text-primary w-40 sm:w-56 sticky left-0 backdrop-blur-md bg-surface/90 z-10 border-r border-subtle">
                Attribute
              </th>
              {activeData.map((d) => (
                <th
                  key={d.platform.id}
                  className="p-4 sm:p-5 font-semibold text-primary min-w-[220px] max-w-[280px] border-r border-subtle last:border-r-0"
                >
                  <div className="space-y-1.5">
                    <div className="text-base font-bold text-primary">
                      {d.platform.name.replace(/\[SAMPLE\]/g, "").trim()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/platforms/${d.platform.slug}`}
                        className="text-accent-cyan hover:underline text-[11px] font-mono flex items-center gap-1 font-medium"
                      >
                        <span>Reality Profile</span>
                        <ArrowRight size={10} />
                      </Link>
                      <span className="text-secondary">&bull;</span>
                      <a
                        href={d.platform.official_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-primary text-[11px] flex items-center gap-1"
                      >
                        <span>Official</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-subtle">
            {/* Primary Focus */}
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="p-4 sm:p-5 font-medium text-secondary sticky left-0 backdrop-blur-md bg-surface/90 z-10 border-r border-subtle">
                Target Candidates
              </td>
              {activeData.map((d) => (
                <td
                  key={d.platform.id}
                  className="p-4 sm:p-5 text-readable border-r border-subtle last:border-r-0 leading-relaxed"
                >
                  {d.platform.who_it_suits || "Not confirmed"}
                </td>
              ))}
            </tr>

            {/* Assessment Style */}
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="p-4 sm:p-5 font-medium text-secondary sticky left-0 backdrop-blur-md bg-surface/90 z-10 border-r border-subtle">
                Assessment Style
              </td>
              {activeData.map((d) => (
                <td
                  key={d.platform.id}
                  className="p-4 sm:p-5 text-readable border-r border-subtle last:border-r-0 leading-relaxed"
                >
                  {d.platform.assessment_style || "Not confirmed"}
                </td>
              ))}
            </tr>

            {/* Onboarding Steps */}
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="p-4 sm:p-5 font-medium text-secondary sticky left-0 backdrop-blur-md bg-surface/90 z-10 border-r border-subtle">
                Onboarding Pipeline
              </td>
              {activeData.map((d) => (
                <td
                  key={d.platform.id}
                  className="p-4 sm:p-5 text-readable border-r border-subtle last:border-r-0 space-y-2"
                >
                  <div className="font-mono text-accent-cyan font-bold text-[11px]">
                    {d.steps.length} sequential stages
                  </div>
                  <ol className="list-decimal pl-4 space-y-1 text-secondary text-[11px]">
                    {d.steps.map((s) => (
                      <li key={s.id}>{s.title}</li>
                    ))}
                  </ol>
                </td>
              ))}
            </tr>

            {/* Supported Payout Rails */}
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="p-4 sm:p-5 font-medium text-secondary sticky left-0 backdrop-blur-md bg-surface/90 z-10 border-r border-subtle">
                Payout Methods
              </td>
              {activeData.map((d) => (
                <td
                  key={d.platform.id}
                  className="p-4 sm:p-5 text-readable border-r border-subtle last:border-r-0 font-medium"
                >
                  {d.platform.payout_methods || "Not confirmed"}
                </td>
              ))}
            </tr>

            {/* Nigeria Contributor Eligibility */}
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="p-4 sm:p-5 font-medium text-secondary sticky left-0 backdrop-blur-md bg-surface/90 z-10 border-r border-subtle">
                Nigeria Eligibility
              </td>
              {activeData.map((d) => (
                <td
                  key={d.platform.id}
                  className="p-4 sm:p-5 border-r border-subtle last:border-r-0"
                >
                  {d.nigeriaAccepted ? (
                    <div className="inline-flex items-center gap-1.5 text-accent-emerald font-semibold">
                      <Check size={14} />
                      <span>Accepted</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-secondary">
                      <HelpCircle size={14} />
                      <span>Not confirmed</span>
                    </div>
                  )}
                  <div className="pt-1.5">
                    <Link
                      href={`/platforms/${d.platform.slug}/ng`}
                      className="text-[11px] text-accent-cyan hover:underline font-medium"
                    >
                      View Nigeria analysis &rarr;
                    </Link>
                  </div>
                </td>
              ))}
            </tr>

            {/* Open Verified Roles */}
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="p-4 sm:p-5 font-medium text-secondary sticky left-0 backdrop-blur-md bg-surface/90 z-10 border-r border-subtle">
                Open Verified Roles
              </td>
              {activeData.map((d) => (
                <td
                  key={d.platform.id}
                  className="p-4 sm:p-5 border-r border-subtle last:border-r-0"
                >
                  <div className="text-sm font-mono font-bold text-accent-cyan">
                    {d.openRolesCount} verified roles
                  </div>
                  <Link
                    href={`/jobs?platform=${d.platform.slug}`}
                    className="text-[11px] text-secondary hover:text-accent-cyan hover:underline inline-block mt-1 font-medium transition-colors"
                  >
                    Browse jobs &rarr;
                  </Link>
                </td>
              ))}
            </tr>

            {/* Referral Policy */}
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="p-4 sm:p-5 font-medium text-secondary sticky left-0 backdrop-blur-md bg-surface/90 z-10 border-r border-subtle">
                Referral Policy
              </td>
              {activeData.map((d) => (
                <td
                  key={d.platform.id}
                  className="p-4 sm:p-5 text-secondary text-[11px] border-r border-subtle last:border-r-0"
                >
                  <span className="capitalize font-mono text-primary font-medium">
                    {d.platform.referral.replace(/_/g, " ")}
                  </span>
                  <p className="mt-1 text-secondary text-[10px] leading-relaxed">
                    Independent verification. Referral bonuses never influence ranking.
                  </p>
                </td>
              ))}
            </tr>

            {/* Community Reports Summary */}
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="p-4 sm:p-5 font-medium text-secondary sticky left-0 backdrop-blur-md bg-surface/90 z-10 border-r border-subtle">
                Community Reality
              </td>
              {activeData.map((d) => (
                <td
                  key={d.platform.id}
                  className="p-4 sm:p-5 text-xs border-r border-subtle last:border-r-0 space-y-1"
                >
                  {d.experience.has_sufficient_reports ? (
                    <>
                      <div className="text-readable font-medium">
                        {d.experience.tasks_regular_percent}% report regular tasks
                      </div>
                      <div className="text-[11px] text-secondary">
                        {d.experience.onboarding_paid_percent}% onboarding paid
                      </div>
                      <div className="text-[10px] text-secondary font-mono">
                        (Sample: {d.experience.sample_size} self-reports)
                      </div>
                    </>
                  ) : (
                    <span className="text-[11px] text-secondary">
                      Awaiting minimum community reports
                    </span>
                  )}
                  <div className="pt-1.5">
                    <Link
                      href={`/platforms/${d.platform.slug}/report`}
                      className="text-[11px] text-accent-cyan hover:underline font-medium"
                    >
                      Submit report &rarr;
                    </Link>
                  </div>
                </td>
              ))}
            </tr>

            {/* Last Checked */}
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="p-4 sm:p-5 font-medium text-secondary sticky left-0 backdrop-blur-md bg-surface/90 z-10 border-r border-subtle">
                Last Verified
              </td>
              {activeData.map((d) => (
                <td
                  key={d.platform.id}
                  className="p-4 sm:p-5 text-xs border-r border-subtle last:border-r-0"
                >
                  <FreshnessStamp daysAgo={3} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
