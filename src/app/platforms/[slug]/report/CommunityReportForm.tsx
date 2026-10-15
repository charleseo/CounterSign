"use client";

import React, { useState } from "react";
import Link from "next/link";
import { submitCommunityReportAction } from "@/lib/actions/communityReport";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight, ShieldAlert } from "lucide-react";

interface CommunityReportFormProps {
  platformId: string;
  platformName: string;
  platformSlug: string;
}

export function CommunityReportForm({
  platformId,
  platformName,
  platformSlug,
}: CommunityReportFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const res = await submitCommunityReportAction(formData);

    if (res.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(res.error || "That did not send. Your text is still here. Try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="p-6 rounded-xl border border-accent-emerald/40 bg-accent-emerald/5 space-y-4">
        <div className="flex items-center gap-2 text-accent-emerald font-semibold text-base">
          <CheckCircle2 size={20} />
          <span>Experience Report Submitted</span>
        </div>
        <p className="text-xs sm:text-sm text-readable leading-relaxed">
          Thank you for contributing to collective transparency. Your report has been sent to our moderation queue. Once reviewed, it will be aggregated with other contributor feedback. Individual names and personal notes are never published publicly.
        </p>
        <div className="pt-2">
          <Link
            href={`/platforms/${platformSlug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-accent-cyan text-[#04080F] hover:bg-accent-cyan/90 transition-colors"
          >
            <span>Return to {platformName} Profile</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="platform_id" value={platformId} />
      <input type="text" name="organization" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {/* Period */}
      <div className="space-y-1.5">
        <label htmlFor="period_month_year" className="block text-xs font-mono font-medium text-secondary uppercase tracking-wider">
          Month and Year of Activity <span className="text-accent-cyan">*</span>
        </label>
        <input
          id="period_month_year"
          name="period_month_year"
          type="text"
          required
          placeholder="e.g. Sep 2026 or Aug - Sep 2026"
          disabled={status === "submitting"}
          className="w-full sm:w-80 px-3 py-2 rounded-lg border border-subtle bg-void text-primary placeholder:text-secondary text-xs sm:text-sm focus:outline-none focus:border-focus"
        />
      </div>

      {/* Onboarding Paid */}
      <div className="space-y-2">
        <label className="block text-xs font-mono font-medium text-secondary uppercase tracking-wider">
          Was your onboarding or qualification test paid? <span className="text-accent-cyan">*</span>
        </label>
        <div className="flex flex-wrap gap-4 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-readable">
            <input type="radio" name="onboarding_paid" value="true" required disabled={status === "submitting"} />
            <span>Yes, onboarding was paid</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-readable">
            <input type="radio" name="onboarding_paid" value="false" required defaultChecked disabled={status === "submitting"} />
            <span>No, screening was unpaid</span>
          </label>
        </div>
      </div>

      {/* Task Availability */}
      <div className="space-y-2">
        <label className="block text-xs font-mono font-medium text-secondary uppercase tracking-wider">
          Task Availability on Your Queue <span className="text-accent-cyan">*</span>
        </label>
        <div className="space-y-2 text-xs">
          <label className="p-3 rounded-lg border border-subtle bg-void flex items-start gap-3 cursor-pointer hover:border-focus">
            <input type="radio" name="tasks_available" value="regular" required disabled={status === "submitting"} className="mt-0.5" />
            <div>
              <span className="font-semibold text-primary block">Regular Tasks</span>
              <span className="text-secondary text-[11px]">Tasks were consistently available whenever I logged on to work.</span>
            </div>
          </label>

          <label className="p-3 rounded-lg border border-subtle bg-void flex items-start gap-3 cursor-pointer hover:border-focus">
            <input type="radio" name="tasks_available" value="intermittent" required defaultChecked disabled={status === "submitting"} className="mt-0.5" />
            <div>
              <span className="font-semibold text-primary block">Intermittent / Batch Sprints</span>
              <span className="text-secondary text-[11px]">Tasks arrived in batches, with occasional empty queue gaps.</span>
            </div>
          </label>

          <label className="p-3 rounded-lg border border-subtle bg-void flex items-start gap-3 cursor-pointer hover:border-focus">
            <input type="radio" name="tasks_available" value="empty_queue" required disabled={status === "submitting"} className="mt-0.5" />
            <div>
              <span className="font-semibold text-primary block">Persistent Empty Queue (EQ)</span>
              <span className="text-secondary text-[11px]">Passed screening but rarely or never received paid tasks.</span>
            </div>
          </label>
        </div>
      </div>

      {/* Sudden Removal */}
      <div className="space-y-2">
        <label className="block text-xs font-mono font-medium text-secondary uppercase tracking-wider">
          Were you removed from the platform or project without explanation? <span className="text-accent-cyan">*</span>
        </label>
        <div className="flex flex-wrap gap-4 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-readable">
            <input type="radio" name="removed_without_explanation" value="false" required defaultChecked disabled={status === "submitting"} />
            <span>No, account remains active or transition was explained</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-readable">
            <input type="radio" name="removed_without_explanation" value="true" required disabled={status === "submitting"} />
            <span>Yes, removed or deactivated without specific feedback</span>
          </label>
        </div>
      </div>

      {/* Optional Note */}
      <div className="space-y-1.5">
        <label htmlFor="optional_note" className="block text-xs font-mono font-medium text-secondary uppercase tracking-wider">
          Optional Factual Note (Max 500 characters)
        </label>
        <textarea
          id="optional_note"
          name="optional_note"
          rows={3}
          maxLength={500}
          placeholder="Keep notes factual: mention specific domains, payout speed, or communication clarity. Do not include staff personal names."
          disabled={status === "submitting"}
          className="w-full px-3 py-2 rounded-lg border border-subtle bg-void text-primary placeholder:text-secondary text-xs sm:text-sm focus:outline-none focus:border-focus leading-relaxed"
        />
        <p className="text-[11px] text-secondary">
          No individual notes are published. They are used exclusively by our editorial staff to verify aggregated statistics.
        </p>
      </div>

      {/* Contact Email */}
      <div className="space-y-1.5">
        <label htmlFor="contact_email" className="block text-xs font-mono font-medium text-secondary uppercase tracking-wider">
          Your Email (Optional, for clarification)
        </label>
        <input
          id="contact_email"
          name="contact_email"
          type="email"
          placeholder="contributor@example.com"
          disabled={status === "submitting"}
          className="w-full sm:w-80 px-3 py-2 rounded-lg border border-subtle bg-void text-primary placeholder:text-secondary text-xs sm:text-sm focus:outline-none focus:border-focus"
        />
      </div>

      {status === "error" && (
        <div className="p-3 rounded-lg border border-accent-danger/30 bg-accent-danger/5 text-xs text-accent-danger flex items-center gap-2">
          <AlertCircle size={15} />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-accent-cyan text-[#04080F] hover:bg-accent-cyan/90 transition-colors flex items-center justify-center gap-2"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Submitting Report...</span>
            </>
          ) : (
            <>
              <span>Submit Anonymous Experience Report</span>
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </div>

      <div className="p-3.5 rounded-lg border border-subtle bg-void text-xs text-secondary flex items-start gap-2">
        <ShieldAlert size={15} className="text-accent-cyan shrink-0 mt-0.5" />
        <span>
          <strong>Legal and Neutrality Safeguard:</strong> Countersign does not publish unmoderated personal rants or staff names. Only aggregated statistical percentages with sample size thresholds are displayed publicly.
        </span>
      </div>
    </form>
  );
}
