import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { dbRepository } from "@/lib/db/repository";
import { PlatformCompareTable } from "./PlatformCompareTable";
import { DirectVsAgencyComparison } from "@/components/ui/DirectVsAgencyComparison";
import { ShieldCheck, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Compare AI evaluation platforms | TraceBase",
  description:
    "Side-by-side comparison of AI model training platforms: work types, country eligibility, assessment style, onboarding steps, payout methods, and community reality.",
  alternates: {
    canonical: "/compare",
  },
};

export default function ComparePlatformsPage() {
  const platforms = dbRepository.getPlatforms();
  const allJobs = dbRepository.getJobs({ status: "verified" });

  const allCheckLogs = dbRepository.getCheckLogs();

  const compareData = platforms.map((platform) => {
    const steps = dbRepository.getPlatformSteps(platform.id);
    const openRoles = allJobs.filter((j) => j.platform_id === platform.id);
    const experience = dbRepository.getAggregatedPlatformExperience(platform.id);
    const ngEligibility = dbRepository.getPlatformCountryEligibility(platform.slug, "NG");

    const platformVerifiedLogs = allCheckLogs.filter(
      (c) =>
        (c.platform_id === platform.id || openRoles.some((r) => r.id === c.job_id)) &&
        c.result === "verified"
    );
    const hasVerifiedCheckLog = platformVerifiedLogs.length > 0;
    const hasNgSourceUrl = Boolean(ngEligibility?.sourceUrl);

    const eligibilityByCountry: Record<string, { status: string; hasLogAndSource: boolean }> = {};
    const supportedCountryCodes = ["US", "GB", "CA", "NG", "GH", "KE", "ZA", "IN", "PH", "WW"];

    for (const code of supportedCountryCodes) {
      const el = dbRepository.getPlatformCountryEligibility(platform.slug, code);
      const hasSrc = Boolean(el?.sourceUrl);
      eligibilityByCountry[code] = {
        status: el?.eligibilityStatus || "unconfirmed",
        hasLogAndSource: hasVerifiedCheckLog && hasSrc,
      };
    }

    return {
      platform,
      steps,
      openRolesCount: openRoles.length,
      experience,
      nigeriaAccepted: ngEligibility?.eligibilityStatus === "accepted",
      hasCheckLogAndSource: hasVerifiedCheckLog && hasNgSourceUrl,
      eligibilityByCountry,
    };
  });

  const platformSummaries = platforms.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-10 w-full min-w-0">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-secondary">
          <Link href="/platforms" className="hover:text-ink transition-colors min-h-[44px] inline-flex items-center">
            Platforms
          </Link>
          <span>/</span>
          <span className="text-ink font-medium">Compare</span>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule bg-sheet text-xs text-secondary">
            <Scale className="w-3.5 h-3.5 text-[#5A35C8]" />
            <span>Multi-Platform Feature Matrix & Pay Rail Audit</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink">
            Compare AI Training Platforms
          </h1>
          <p className="text-sm sm:text-base text-secondary max-w-3xl leading-relaxed">
            Side-by-side breakdown of up to four contributor platforms. Compare onboarding complexity, payout mechanisms, Nigerian contributor acceptance, and active job counts without marketing bias.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-rule bg-sheet text-xs text-secondary flex items-center gap-2.5">
          <ShieldCheck size={16} className="text-[#5A35C8] shrink-0" />
          <span>
            Every data point is human-checked against official documentation within 14 days. Unconfirmed data points state &quot;Not confirmed&quot; rather than guessing.
          </span>
        </div>
      </div>

      {/* Interactive Comparison Table */}
      <PlatformCompareTable
        initialPlatforms={compareData}
        allPlatforms={platformSummaries}
      />

      {/* Direct Application vs Agency Middleman Breakdown */}
      <section aria-labelledby="direct-vs-agency-compare-h" className="pt-4">
        <h2 id="direct-vs-agency-compare-h" className="sr-only">
          Direct application compared to agency middleman
        </h2>
        <DirectVsAgencyComparison />
      </section>
    </div>
  );
}
