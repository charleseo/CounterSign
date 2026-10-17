import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { dbRepository } from "@/lib/db/repository";
import { cleanRoleTitle, cleanOrgName } from "@/lib/utils/roleStatus";
import { ChangesClient, ChangeEntry } from "./ChangesClient";
import { History, ShieldCheck } from "lucide-react";
import { BreadcrumbListJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Public Verification Change Log | TraceBase",
  description:
    "Real-time transparent record of human rechecks, role closures, eligibility updates, and sweep actions across all monitored AI contractor platforms.",
  alternates: {
    canonical: "/changes",
  },
};

export default function ChangesPage() {
  const isProd = process.env.NODE_ENV === "production";
  const allLogs = dbRepository.getCheckLogs(undefined, 100);
  const allJobs = dbRepository.getJobs({ status: "all" });
  const allPlatforms = dbRepository.getPlatforms();

  const rawEntries = allLogs
    .map((log) => {
      const job = allJobs.find((j) => j.id === log.job_id);
      const platform = allPlatforms.find((p) => p.id === log.platform_id) || job?.platform;

      const isSample =
        Boolean(job?.is_sample) ||
        (job ? job.title.includes("[SAMPLE]") : false) ||
        log.note.includes("SAMPLE");

      if (isProd && isSample) {
        return null;
      }

      const roleTitle = job ? cleanRoleTitle(job.title) : "AI Evaluation Role";
      const platformName = platform ? cleanOrgName(platform.name) : "Platform";
      const jobSlug = job ? job.slug : "jobs";
      const platformSlug = platform ? platform.slug : "platforms";

      const actionText =
        log.result === "closed"
          ? "Closed"
          : log.result === "verified"
          ? "Verified"
          : "Recheck Due";

      const supportedCountries = job
        ? job.eligibility.filter((e) => e.status === "accepted").map((e) => e.country_code)
        : [];

      const formattedDate = new Date(log.checked_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      const entry: ChangeEntry = {
        id: log.id,
        jobId: log.job_id,
        jobSlug,
        roleTitle,
        platformName,
        platformSlug,
        result: log.result as "verified" | "needs_recheck" | "closed",
        actionText,
        note: log.note.replace(/\[SAMPLE\]/g, "").replace(/^SAMPLE human check:\s*/i, "").trim(),
        checkedBy: log.checked_by || "CO",
        checkedAt: log.checked_at,
        formattedDate,
        isSample,
        supportedCountries,
      };
      return entry;
    });

  const entries: ChangeEntry[] = rawEntries.filter(
    (entry): entry is ChangeEntry => entry !== null
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-10 w-full min-w-0">
      <BreadcrumbListJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Changes", item: "/changes" },
        ]}
      />

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-secondary">
          <Link href="/" className="hover:text-ink transition-colors min-h-[44px] inline-flex items-center">
            Home
          </Link>
          <span>/</span>
          <span className="text-ink font-medium">Changes</span>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule bg-sheet text-xs text-secondary">
            <History className="w-3.5 h-3.5 text-[#5A35C8]" />
            <span>Change log</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink">
            Public change log
          </h1>
          <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
            Every listing on TraceBase is rechecked by hand every 14 days. When a role closes, country eligibility expands, or pay changes, it is written here with a timestamp.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-rule bg-sheet text-xs text-secondary flex items-center gap-2.5">
          <ShieldCheck size={16} className="text-[#5A35C8] shrink-0" />
          <span>
            Automated sweepers flag stale listings at 14 days. Staff confirm status by visiting official career ATS links directly.
          </span>
        </div>
      </div>

      {/* Interactive Filterable Client */}
      <ChangesClient initialEntries={entries} />
    </div>
  );
}
