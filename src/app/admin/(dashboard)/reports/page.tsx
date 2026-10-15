import React from "react";
import { Metadata } from "next";
import { dbRepository } from "@/lib/db/repository";
import { ReportModerationClient } from "./ReportModerationClient";

export const metadata: Metadata = {
  title: "Community Experience Reports Moderation | Countersign Admin",
  description: "Review and moderate contributor experience reports before aggregation.",
};

export default function AdminReportsPage() {
  const reports = dbRepository.getCommunityReports();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
          Community Experience Reports
        </h1>
        <p className="text-xs text-secondary mt-1">
          Review contributor reports on onboarding pay, task availability, and unexpected removals before inclusion in aggregated statistics.
        </p>
      </div>

      <ReportModerationClient initialReports={reports} />
    </div>
  );
}
