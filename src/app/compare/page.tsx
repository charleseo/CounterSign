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
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-10">
      {/* Ambient background glow accents */}
      <div className="absolute top-10 -left-20 w-80 h-80 bg-[radial-gradient(circle,rgba(61,235,255,0.06)_0%,transparent_70%)] pointer-events-none -z-10" />
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-[radial-gradient(circle,rgba(0,229,153,0.05)_0%,transparent_70%)] pointer-events-none -z-10" />

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-secondary">
          <Link href="/platforms" className="hover:text-accent-cyan transition-colors">
            Platforms
          </Link>
          <span>/</span>
          <span className="text-primary font-medium">Compare</span>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium glass-pill text-accent-cyan border border-cyan-500/30">
            <Scale className="w-3.5 h-3.5" />
            <span>Multi-Platform Feature Matrix & Pay Rail Audit</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-primary">
            <span className="text-gradient-cyan">Compare AI Training Platforms</span>
          </h1>
          <p className="text-sm sm:text-base text-readable max-w-3xl leading-relaxed">
            Side-by-side breakdown of up to four contributor platforms. Compare onboarding complexity, payout mechanisms, Nigerian contributor acceptance, and active job counts without marketing bias.
          </p>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-cyan-500/20 text-xs text-secondary flex items-center gap-2.5 shadow-lg">
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
