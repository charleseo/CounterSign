"use client";

import React, { useState, useTransition } from "react";
import { CommunityExperienceReport, Report, ReportStatus } from "@/lib/db/types";
import { moderateCommunityReportAction } from "@/lib/actions/communityReport";
import { moderateDirectReportAction } from "@/lib/actions/report";
import { publishToWeeklyScamsAction } from "@/lib/actions/weeklyScams";
import { stripPersonalData } from "@/lib/utils/privacy";
import { Check, X, MessageSquare, ShieldAlert, Send } from "lucide-react";

interface ReportModerationClientProps {
  initialCommunityReports: CommunityExperienceReport[];
  initialDirectReports: Report[];
}

export function ReportModerationClient({
  initialCommunityReports,
  initialDirectReports,
}: ReportModerationClientProps) {
  const [activeSection, setActiveSection] = useState<"community" | "scams">("scams");
  const [communityReports, setCommunityReports] =
    useState<CommunityExperienceReport[]>(initialCommunityReports);
  const [directReports, setDirectReports] = useState<Report[]>(initialDirectReports);
  const [isPending, startTransition] = useTransition();
  const [filterStatus, setFilterStatus] = useState<"pending" | "approved" | "rejected">("pending");

  // Publishing form modal/state
  const [publishingReport, setPublishingReport] = useState<Report | null>(null);
  const [scamTitle, setScamTitle] = useState("");
  const [scamParaphrase, setScamParaphrase] = useState("");
  const [scamWarningSigns, setScamWarningSigns] = useState<string>("");
  const [scamWhatToDo, setScamWhatToDo] = useState<string>("");
  const [publishFeedback, setPublishFeedback] = useState<string | null>(null);

  // Moderate Community Report
  const handleModerateCommunity = (id: string, status: ReportStatus) => {
    startTransition(async () => {
      await moderateCommunityReportAction(id, status);
      setCommunityReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    });
  };

  // Moderate Direct Report
  const handleModerateDirect = (id: string, status: ReportStatus) => {
    startTransition(async () => {
      await moderateDirectReportAction(id, status);
      setDirectReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    });
  };

  // Open Publish to Weekly Scams Drawer
  const handleOpenPublish = (report: Report) => {
    setPublishingReport(report);
    setScamTitle("Unsolicited Recruitment Outreach via Messaging Channels");
    // Pre-strip personal data automatically
    const sanitized = stripPersonalData(report.body);
    setScamParaphrase(sanitized);
    setScamWarningSigns(
      "Unsolicited job offer via messaging platform\nRequest for upfront payment or bank login credentials\nNo official company corporate email domain"
    );
    setScamWhatToDo(
      "Never transfer funds or buy equipment upfront.\nVerify recruiter identity on the employer official portal.\nCease communication and block the sender."
    );
    setPublishFeedback(null);
  };

  // Handle Publish Submission
  const handlePublishWeeklyScam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!publishingReport) return;

    startTransition(async () => {
      const res = await publishToWeeklyScamsAction({
        reportId: publishingReport.id,
        title: scamTitle,
        paraphrasedMessage: scamParaphrase,
        warningSigns: scamWarningSigns.split("\n").filter((s) => s.trim().length > 0),
        whatToDo: scamWhatToDo.split("\n").filter((s) => s.trim().length > 0),
      });

      if (res.success) {
        setDirectReports((prev) =>
          prev.map((r) =>
            r.id === publishingReport.id ? { ...r, status: "approved" } : r
          )
        );
        setPublishFeedback("Published to Scams We Saw This Week. Personal data stripped.");
        setTimeout(() => {
          setPublishingReport(null);
          setPublishFeedback(null);
        }, 2000);
      } else {
        setPublishFeedback(res.message);
      }
    });
  };

  const displayedCommunity = communityReports.filter((r) => r.status === filterStatus);
  const displayedDirect = directReports.filter((r) => r.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Top Main Section Switcher */}
      <div className="flex flex-wrap gap-2 p-1 rounded-xl bg-sheet border border-subtle">
        <button
          type="button"
          onClick={() => setActiveSection("scams")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 ${
            activeSection === "scams"
              ? "bg-[#5A35C8] text-white shadow-sm"
              : "text-secondary hover:text-primary"
          }`}
        >
          <ShieldAlert size={14} />
          <span>Scam &amp; Listing Reports</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 text-white font-mono">
            {directReports.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection("community")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 ${
            activeSection === "community"
              ? "bg-[#5A35C8] text-white shadow-sm"
              : "text-secondary hover:text-primary"
          }`}
        >
          <MessageSquare size={14} />
          <span>Platform Experience Reports</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 text-white font-mono">
            {communityReports.length}
          </span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-subtle gap-4 text-xs font-mono font-medium">
        {(["pending", "approved", "rejected"] as const).map((s) => {
          const count =
            activeSection === "scams"
              ? directReports.filter((r) => r.status === s).length
              : communityReports.filter((r) => r.status === s).length;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setFilterStatus(s)}
              className={`pb-3 border-b-2 capitalize transition-colors flex items-center gap-1.5 ${
                filterStatus === s
                  ? "border-[#5A35C8] text-[#5A35C8] font-semibold"
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

      {/* Publish to Weekly Scams Modal/Drawer */}
      {publishingReport && (
        <div className="p-5 rounded-xl border border-[#5A35C8]/40 bg-sheet shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-subtle pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#5A35C8]">
              <ShieldAlert size={16} />
              <span>Publish to &quot;Scams We Saw This Week&quot;</span>
            </div>
            <button
              type="button"
              onClick={() => setPublishingReport(null)}
              className="text-secondary hover:text-primary text-xs"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handlePublishWeeklyScam} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-primary block">
                Public Title
              </label>
              <input
                type="text"
                value={scamTitle}
                onChange={(e) => setScamTitle(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-subtle bg-surface text-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-primary block">
                What the message said (Paraphrased &bull; PII automatically stripped)
              </label>
              <textarea
                value={scamParaphrase}
                onChange={(e) => setScamParaphrase(e.target.value)}
                required
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-subtle bg-surface text-primary"
              />
              <span className="text-[10px] text-secondary">
                Ensure names, phone numbers, and account details are completely sanitized.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-primary block">
                  Warning Signs (One per line)
                </label>
                <textarea
                  value={scamWarningSigns}
                  onChange={(e) => setScamWarningSigns(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-subtle bg-surface text-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-primary block">
                  What To Do (One per line)
                </label>
                <textarea
                  value={scamWhatToDo}
                  onChange={(e) => setScamWhatToDo(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-subtle bg-surface text-primary"
                />
              </div>
            </div>

            {publishFeedback && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium">
                {publishFeedback}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPublishingReport(null)}
                className="px-3 py-1.5 rounded-lg border border-subtle text-secondary hover:text-primary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-1.5 rounded-lg bg-[#5A35C8] text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer"
              >
                <Send size={13} />
                <span>{isPending ? "Publishing..." : "Publish Stripping All PII"}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SECTION 1: Scam & Listing Direct Reports */}
      {activeSection === "scams" && (
        <>
          {displayedDirect.length > 0 ? (
            <div className="space-y-3">
              {displayedDirect.map((report) => (
                <div
                  key={report.id}
                  className="p-4 sm:p-5 rounded-xl border border-subtle bg-surface space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-subtle pb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded uppercase ${
                          report.kind === "scam"
                            ? "bg-red-500/15 text-red-400 border border-red-500/30"
                            : "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        {report.kind}
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

                      {report.kind === "scam" && report.status !== "approved" && (
                        <button
                          type="button"
                          onClick={() => handleOpenPublish(report)}
                          className="px-2.5 py-1 rounded bg-[#5A35C8]/15 hover:bg-[#5A35C8]/25 text-[#5A35C8] text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <ShieldAlert size={13} />
                          <span>Publish to Weekly Scams</span>
                        </button>
                      )}

                      {report.status === "pending" && (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleModerateDirect(report.id, "approved")}
                            disabled={isPending}
                            className="px-2 py-1 rounded bg-accent-emerald/15 hover:bg-accent-emerald/25 text-accent-emerald text-xs font-medium transition-colors flex items-center gap-1"
                          >
                            <Check size={13} />
                            <span>Approve</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleModerateDirect(report.id, "rejected")}
                            disabled={isPending}
                            className="px-2 py-1 rounded bg-accent-danger/15 hover:bg-accent-danger/25 text-accent-danger text-xs font-medium transition-colors flex items-center gap-1"
                          >
                            <X size={13} />
                            <span>Reject</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Body & Target */}
                  <div className="p-3 rounded-lg border border-subtle bg-void text-xs space-y-2">
                    {report.target_id && (
                      <div className="text-secondary font-mono text-[11px]">
                        Target: {report.target_id}
                      </div>
                    )}
                    <p className="text-primary leading-relaxed whitespace-pre-wrap">
                      {report.body}
                    </p>
                  </div>

                  {report.contact_email && (
                    <div className="text-[11px] font-mono text-secondary">
                      Reporter Contact (Private): {report.contact_email}
                    </div>
                  )}

                  {report.moderation_notes && (
                    <div className="text-[11px] font-mono text-accent-emerald">
                      Note: {report.moderation_notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-subtle bg-surface text-center space-y-2 text-xs text-secondary">
              <ShieldAlert className="mx-auto text-secondary" size={24} />
              <p className="font-semibold text-primary">No {filterStatus} reports</p>
              <p>Reports submitted on the Scam Check and listing detail pages will appear here.</p>
            </div>
          )}
        </>
      )}

      {/* SECTION 2: Platform Community Experience Reports */}
      {activeSection === "community" && (
        <>
          {displayedCommunity.length > 0 ? (
            <div className="space-y-3">
              {displayedCommunity.map((report) => (
                <div
                  key={report.id}
                  className="p-4 sm:p-5 rounded-xl border border-subtle bg-surface space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-subtle pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-[#5A35C8]">
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
                            onClick={() => handleModerateCommunity(report.id, "approved")}
                            disabled={isPending}
                            className="px-2.5 py-1 rounded bg-accent-emerald/15 hover:bg-accent-emerald/25 text-accent-emerald text-xs font-medium transition-colors flex items-center gap-1"
                          >
                            <Check size={13} />
                            <span>Approve</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleModerateCommunity(report.id, "rejected")}
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
        </>
      )}
    </div>
  );
}
