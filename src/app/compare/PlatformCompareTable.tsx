"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Platform, PlatformStep, AggregatedPlatformExperience } from "@/lib/db/types";
import { FreshnessStamp } from "@/components/ui/FreshnessStamp";
import { Check, HelpCircle, ExternalLink, ArrowRight, Plus } from "lucide-react";
import { useSelectedCountry } from "@/components/ui/CountrySelector";
import { countryLabel } from "@/lib/utils/country";

interface CompareData {
  platform: Platform;
  steps: PlatformStep[];
  openRolesCount: number;
  experience: AggregatedPlatformExperience;
  nigeriaAccepted: boolean;
  hasCheckLogAndSource?: boolean;
  eligibilityByCountry?: Record<string, { status: string; hasLogAndSource: boolean }>;
}

interface PlatformCompareTableProps {
  initialPlatforms: CompareData[];
  allPlatforms: Array<{ id: string; slug: string; name: string }>;
}

export function PlatformCompareTable({
  initialPlatforms,
  allPlatforms,
}: PlatformCompareTableProps) {
  const selectedCountryCode = useSelectedCountry();
  const countryName = countryLabel(selectedCountryCode, "name");
  const countryTitle = selectedCountryCode === "WW" ? "Location eligibility" : `${countryName} eligibility`;

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
    <div className="space-y-6 w-full min-w-0 max-w-full">
      {/* Platform Selector Chips */}
      <div className="p-5 sm:p-6 rounded-2xl border border-rule bg-sheet space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-secondary">
            Select Platforms to Compare (2 to 4)
          </span>
          <span className="text-xs text-[#5A35C8] font-semibold tabular-nums">
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
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer min-h-[44px] ${
                  isSelected
                    ? "bg-[#5A35C8] text-white shadow-sm"
                    : "border border-rule bg-surface text-secondary hover:text-ink hover:border-[#5A35C8]"
                }`}
              >
                {isSelected ? <Check size={13} className="text-white" /> : <Plus size={13} />}
                <span>{cleanName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix */}
      <div className="w-full max-w-full min-w-0 overflow-hidden border border-rule rounded-2xl bg-sheet shadow-sm">
        <div className="w-full max-w-full overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-rule bg-surface/80">
              <th className="p-4 sm:p-5 font-semibold text-ink w-40 sm:w-56 sticky left-0 backdrop-blur-md bg-surface/90 z-10 border-r border-rule">
                Attribute
              </th>
              {activeData.map((d) => (
                <th
                  key={d.platform.id}
                  className="p-4 sm:p-5 font-semibold text-ink min-w-[220px] max-w-[280px] border-r border-rule last:border-r-0"
                >
                  <div className="space-y-1.5">
                    <div className="text-base font-bold text-ink">
                      {d.platform.name.replace(/\[SAMPLE\]/g, "").trim()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/platforms/${d.platform.slug}`}
                        className="text-[#5A35C8] hover:underline text-xs flex items-center gap-1 font-medium min-h-[44px]"
                      >
                        <span>Reality Profile</span>
                        <ArrowRight size={10} />
                      </Link>
                      <span className="text-secondary">&bull;</span>
                      <a
                        href={d.platform.official_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-ink text-xs flex items-center gap-1 min-h-[44px]"
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
          <tbody className="divide-y divide-rule">
            {/* Primary Focus */}
            <tr className="hover:bg-surface/50 transition-colors">
              <td className="p-4 sm:p-5 font-medium text-secondary sticky left-0 backdrop-blur-md bg-surface/90 z-10 border-r border-rule">
                Target Candidates
              </td>
              {activeData.map((d) => (
                <td
                  key={d.platform.id}
                  className="p-4 sm:p-5 text-readable border-r border-rule last:border-r-0 leading-relaxed"
                >
                  {d.platform.who_it_suits || "Not confirmed"}
                </td>
              ))}
            </tr>

            {/* Assessment Style */}
            <tr className="hover:bg-surface/50 transition-colors">
              <td className="p-4 sm:p-5 font-medium text-secondary sticky left-0 backdrop-blur-md bg-surface/90 z-10 border-r border-rule">
                Assessment Style
              </td>
              {activeData.map((d) => (
                <td
                  key={d.platform.id}
                  className="p-4 sm:p-5 text-readable border-r border-rule last:border-r-0 leading-relaxed"
                >
                  {d.platform.assessment_style || "Not confirmed"}
                </td>
              ))}
            </tr>

            {/* Onboarding Steps */}
            <tr className="hover:bg-surface/50 transition-colors">
              <td className="p-4 sm:p-5 font-medium text-secondary sticky left-0 backdrop-blur-md bg-surface/90 z-10 border-r border-rule">
                Onboarding Pipeline
              </td>
              {activeData.map((d) => (
                <td
                  key={d.platform.id}
                  className="p-4 sm:p-5 text-readable border-r border-rule last:border-r-0 space-y-2"
                >
                  <div className="text-[#5A35C8] font-semibold text-xs tabular-nums">
                    {d.steps.length} sequential stages
                  </div>
                  <ol className="list-decimal pl-4 space-y-1 text-secondary text-xs">
                    {d.steps.map((s) => (
                      <li key={s.id}>{s.title}</li>
                    ))}
                  </ol>
                </td>
              ))}
            </tr>

            {/* Supported Payout Rails */}
            <tr className="hover:bg-surface/50 transition-colors">
              <td className="p-4 sm:p-5 font-medium text-secondary sticky left-0 backdrop-blur-md bg-surface/90 z-10 border-r border-rule">
                Payout Methods
              </td>
              {activeData.map((d) => (
                <td
                  key={d.platform.id}
                  className="p-4 sm:p-5 text-readable border-r border-rule last:border-r-0 font-medium"
                >
                  {d.platform.payout_methods || "Not confirmed"}
                </td>
              ))}
            </tr>

            {/* Country Contributor Eligibility */}
            <tr className="hover:bg-surface/50 transition-colors">
              <td className="p-4 sm:p-5 font-medium text-secondary sticky left-0 backdrop-blur-md bg-surface/90 z-10 border-r border-rule">
                {countryTitle}
              </td>
              {activeData.map((d) => {
                const isSample =
                  d.platform.name.includes("[SAMPLE]") ||
                  Boolean((d.platform as { is_sample?: boolean }).is_sample);
                const elData =
                  d.eligibilityByCountry?.[selectedCountryCode] ||
                  d.eligibilityByCountry?.[selectedCountryCode.toUpperCase()] || {
                    status: d.nigeriaAccepted ? "accepted" : "unconfirmed",
                    hasLogAndSource: Boolean(d.hasCheckLogAndSource),
                  };
                const isAccepted = elData.status === "accepted";
                const hasVerification = Boolean(elData.hasLogAndSource);

                return (
                  <td
                    key={d.platform.id}
                    className="p-4 sm:p-5 border-r border-rule last:border-r-0"
                  >
                    {isSample ? (
                      <div className="inline-flex items-center gap-1.5 text-secondary font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        <span>Sample entry</span>
                      </div>
                    ) : isAccepted && hasVerification ? (
                      <div className="inline-flex items-center gap-1.5 text-[#17663F] font-semibold">
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
                        href={
                          selectedCountryCode === "WW" || selectedCountryCode === "ALL"
                            ? `/platforms/${d.platform.slug}`
                            : `/platforms/${d.platform.slug}/${selectedCountryCode.toLowerCase()}`
                        }
                        className="text-xs text-[#5A35C8] hover:underline font-medium min-h-[44px] inline-flex items-center"
                      >
                        View {selectedCountryCode === "WW" || selectedCountryCode === "ALL" ? "platform" : countryName} analysis &rarr;
                      </Link>
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* Open Roles */}
            <tr className="hover:bg-surface/50 transition-colors">
              <td className="p-4 sm:p-5 font-medium text-secondary sticky left-0 backdrop-blur-md bg-surface/90 z-10 border-r border-rule">
                Open Roles
              </td>
              {activeData.map((d) => (
                <td
                  key={d.platform.id}
                  className="p-4 sm:p-5 border-r border-rule last:border-r-0"
                >
                  <div className="text-sm font-semibold text-ink tabular-nums">
                    {d.openRolesCount} roles
                  </div>
                  <Link
                    href={`/jobs?platform=${d.platform.slug}`}
                    className="text-xs text-secondary hover:text-[#5A35C8] hover:underline inline-flex items-center mt-1 font-medium transition-colors min-h-[44px]"
                  >
                    Browse jobs &rarr;
                  </Link>
                </td>
              ))}
            </tr>

            {/* Referral Policy */}
            <tr className="hover:bg-surface/50 transition-colors">
              <td className="p-4 sm:p-5 font-medium text-secondary sticky left-0 backdrop-blur-md bg-surface/90 z-10 border-r border-rule">
                Referral Policy
              </td>
              {activeData.map((d) => (
                <td
                  key={d.platform.id}
                  className="p-4 sm:p-5 text-secondary text-xs border-r border-rule last:border-r-0"
                >
                  <span className="capitalize text-ink font-medium">
                    {d.platform.referral.replace(/_/g, " ")}
                  </span>
                  <p className="mt-1 text-secondary text-[11px] leading-relaxed">
                    Independent verification. Referral bonuses never influence ranking.
                  </p>
                </td>
              ))}
            </tr>

            {/* Community Reports Summary */}
            <tr className="hover:bg-surface/50 transition-colors">
              <td className="p-4 sm:p-5 font-medium text-secondary sticky left-0 backdrop-blur-md bg-surface/90 z-10 border-r border-rule">
                Community Reality
              </td>
              {activeData.map((d) => (
                <td
                  key={d.platform.id}
                  className="p-4 sm:p-5 text-xs border-r border-rule last:border-r-0 space-y-1"
                >
                  {d.experience.has_sufficient_reports ? (
                    <>
                      <div className="text-readable font-medium tabular-nums">
                        {d.experience.sample_size < 20
                          ? `${d.experience.tasks_regular_count} of ${d.experience.sample_size} reports regular tasks`
                          : `${d.experience.tasks_regular_percent}% report regular tasks`}
                      </div>
                      <div className="text-xs text-secondary tabular-nums">
                        {d.experience.sample_size < 20
                          ? `${d.experience.onboarding_paid_count} of ${d.experience.sample_size} reports onboarding paid`
                          : `${d.experience.onboarding_paid_percent}% onboarding paid`}
                      </div>
                      <div className="text-xs text-secondary tabular-nums">
                        (Sample: {d.experience.sample_size} self-reports)
                      </div>
                    </>
                  ) : (
                    <span className="text-xs text-secondary">
                      Awaiting minimum community reports
                    </span>
                  )}
                  <div className="pt-1.5">
                    <Link
                      href={`/platforms/${d.platform.slug}/report`}
                      className="text-xs text-[#5A35C8] hover:underline font-medium min-h-[44px] inline-flex items-center"
                    >
                      Submit report &rarr;
                    </Link>
                  </div>
                </td>
              ))}
            </tr>

            {/* Last Checked */}
            <tr className="hover:bg-surface/50 transition-colors">
              <td className="p-4 sm:p-5 font-medium text-secondary sticky left-0 backdrop-blur-md bg-surface/90 z-10 border-r border-rule">
                Last Verified
              </td>
              {activeData.map((d) => (
                <td
                  key={d.platform.id}
                  className="p-4 sm:p-5 text-xs border-r border-rule last:border-r-0"
                >
                  <FreshnessStamp daysAgo={3} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
