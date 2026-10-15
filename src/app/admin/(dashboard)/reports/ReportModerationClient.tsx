"use client";

import React, { useState, useTransition } from "react";
import { CommunityExperienceReport, ReportStatus } from "@/lib/db/types";
import { moderateCommunityReportAction } from "@/lib/actions/communityReport";
import { Check, X, MessageSquare } from "lucide-react";

interface ReportModerationClientProps {
  initialReports: CommunityExperienceReport[];
}

export function ReportModerationClient({
  initialReports,
}: ReportModerationClientProps) {
  const [reports, setReports] = useState<CommunityExperienceReport[]>(initialReports);
  const [isPending, startTransition] = useTransition();
  const [filterStatus, setFilterStatus] = useState<"pending" | "approved" | "rejected">("pending");

  const handleModerate = (id: string, status: ReportStatus) => {
    startTransition(async () => {
      await moderateCommunityReportAction(id, status);
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    });
  };

  const displayedReports = reports.filter((r) => r.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex border-b border-subtle gap-4 text-xs font-mono font-medium">
        {(["pending", "approved", "rejected"] as const).map((s) => {
          const count = reports.filter((r) => r.status === s).length;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setFilterStatus(s)}
              className={`pb-3 border-b-2 capitalize transition-colors flex items-center gap-1.5 ${
                filterStatus === s
                  ? "border-accent-cyan text-accent-cyan font-semibold"
                  : "border-transparent text-secondary hover:text-primary"
              }`}
            >
              <span>{s} Reports</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-elevated border border-subtle">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {displayedReports.length > 0 ? (
        <div className="space-y-3">
          {displayedReports.map((report) => (
            <div
              key={report.id}
              className="p-4 sm:p-5 rounded-xl border border-subtle bg-surface space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-subtle pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-accent-cyan">
                    Period: {report.period_month_year}
                  </span>
                  <span>&bull;</span>
                  <span className="text-xs text-secondary">
                    Submitted {new Date(report.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded capitalize ${
                      report.status === "approved"
                        ? "bg-accent-emerald/15 text-accent-emerald border border-accent-emerald/30"
                        : report.status === "rejected"
                        ? "bg-accent-danger/15 text-accent-danger border border-accent-danger/30"
                        : "bg-accent-warning/15 text-accent-warning border border-accent-warning/30"
                    }`}
                  >
                    {report.status}
                  </span>

                  {report.status === "pending" && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleModerate(report.id, "approved")}
                        disabled={isPending}
                        className="px-2.5 py-1 rounded bg-accent-emerald/15 hover:bg-accent-emerald/25 text-accent-emerald text-xs font-medium transition-colors flex items-center gap-1"
                      >
                        <Check size={13} />
                        <span>Approve</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleModerate(report.id, "rejected")}
                        disabled={isPending}
                        className="px-2.5 py-1 rounded bg-accent-danger/15 hover:bg-accent-danger/25 text-accent-danger text-xs font-medium transition-colors flex items-center gap-1"
                      >
                        <X size={13} />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Structured Attributes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded-lg border border-subtle bg-void">
                  <span className="text-secondary block font-mono text-[10px] uppercase">
                    Onboarding Compensation
                  </span>
                  <span className="font-semibold text-primary">
                    {report.onboarding_paid ? "Paid Screening" : "Unpaid Screening"}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg border border-subtle bg-void">
                  <span className="text-secondary block font-mono text-[10px] uppercase">
                    Task Queue Reality
                  </span>
                  <span className="font-semibold text-primary capitalize">
                    {report.tasks_available.replace(/_/g, " ")}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg border border-subtle bg-void">
                  <span className="text-secondary block font-mono text-[10px] uppercase">
                    Removal Without Explanation
                  </span>
                  <span
                    className={`font-semibold ${
                      report.removed_without_explanation
                        ? "text-accent-danger"
                        : "text-accent-emerald"
                    }`}
                  >
                    {report.removed_without_explanation ? "Yes, Deactivated" : "No, Unaffected"}
                  </span>
                </div>
              </div>

              {/* Factual Note */}
              {report.optional_note && (
                <div className="p-3 rounded-lg border border-subtle bg-void text-xs text-readable space-y-1">
                  <span className="font-mono text-[10px] text-secondary uppercase block">
                    Contributor Note (Private Context for Moderation):
                  </span>
                  <p className="italic leading-relaxed">{report.optional_note}</p>
                </div>
              )}

              {report.contact_email && (
                <div className="text-[11px] font-mono text-secondary">
                  Contact email: {report.contact_email}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-xl border border-subtle bg-surface text-center space-y-2 text-xs text-secondary">
          <MessageSquare className="mx-auto text-secondary" size={24} />
          <p className="font-semibold text-primary">No {filterStatus} reports</p>
          <p>Reports submitted by contributors on platform profile pages will appear here for review.</p>
        </div>
      )}
    </div>
  );
}
