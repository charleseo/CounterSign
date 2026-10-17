import React from "react";
import { Metadata } from "next";
import { dbRepository } from "@/lib/db/repository";
import { ReportModerationClient } from "./ReportModerationClient";

export const metadata: Metadata = {
  title: "Community Experience Reports Moderation | TraceBase Admin",
  description: "Review and moderate contributor experience reports before aggregation.",
};

export default function AdminReportsPage() {
  const communityReports = dbRepository.getCommunityReports();
  const directReports = dbRepository.getReports();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
          Reports &amp; Scam Moderation
        </h1>
        <p className="text-xs text-secondary mt-1">
          Review contributor experience reports and incoming scam reports. Strip personal data and publish verified warnings to &quot;Scams We Saw This Week&quot;.
        </p>
      </div>

      <ReportModerationClient
        initialCommunityReports={communityReports}
        initialDirectReports={directReports}
      />
    </div>
  );
}
