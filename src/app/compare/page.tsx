import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { dbRepository } from "@/lib/db/repository";
import { PlatformCompareTable } from "./PlatformCompareTable";
import { ShieldCheck, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Compare AI Evaluation Platforms | Countersign",
  description:
    "Side-by-side comparison of AI model training platforms: work types, country eligibility, assessment style, onboarding steps, payout methods, and community reality.",
  alternates: {
    canonical: "https://countersign.ai/compare",
  },
};

export default function ComparePlatformsPage() {
  const platforms = dbRepository.getPlatforms();
  const allJobs = dbRepository.getJobs({ status: "verified" });

  const compareData = platforms.map((platform) => {
    const steps = dbRepository.getPlatformSteps(platform.id);
    const openRoles = allJobs.filter((j) => j.platform_id === platform.id);
    const experience = dbRepository.getAggregatedPlatformExperience(platform.id);
    const ngEligibility = dbRepository.getPlatformCountryEligibility(platform.slug, "NG");

    return {
      platform,
      steps,
      openRolesCount: openRoles.length,
      experience,
      nigeriaAccepted: ngEligibility?.eligibilityStatus === "accepted",
    };
  });

  const platformSummaries = platforms.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-secondary">
          <Link href="/platforms" className="hover:text-primary transition-colors">
            Platforms
          </Link>
          <span>/</span>
          <span className="text-primary font-medium">Compare</span>
        </div>

        <div className="flex items-center gap-2.5">
          <Scale className="text-accent-cyan" size={28} />
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-primary">
            <span className="text-gradient-cyan">Compare AI Training Platforms</span>
          </h1>
        </div>

        <p className="text-sm text-readable max-w-3xl leading-relaxed">
          Side-by-side breakdown of up to four contributor platforms. Compare onboarding complexity, payout mechanisms, Nigerian contributor acceptance, and active job counts without marketing bias.
        </p>

        <div className="p-3.5 rounded-xl border border-subtle bg-surface text-xs text-secondary flex items-center gap-2">
          <ShieldCheck size={16} className="text-accent-cyan shrink-0" />
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
    </div>
  );
}
