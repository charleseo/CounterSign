"use client";

import React, { useState } from "react";
import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { ReportForm, ReportFormData } from "@/components/ui/ReportForm";
import { submitReportAction } from "@/lib/actions/report";
import { absoluteUrl } from "@/lib/utils/siteUrl";

interface JobProblemReporterProps {
  jobTitle: string;
  jobSlug: string;
}

export function JobProblemReporter({ jobTitle, jobSlug }: JobProblemReporterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: ReportFormData): Promise<boolean> => {
    const res = await submitReportAction({
      reason: data.reason as 'closed' | 'misleading' | 'scam' | 'other',
      urlOrRole: data.urlOrRole,
      details: data.details,
      honeypot: data.honeypot,
      mathAnswer: data.mathAnswer,
    });
    return res.success;
  };

  return (
    <section className="rounded-xl border border-subtle bg-surface p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <AlertTriangle size={16} className="text-[#FFC66D]" aria-hidden="true" />
          <div>
            <h3 className="text-sm font-semibold text-primary font-mono">
              Notice a problem with this role?
            </h3>
            <p className="text-xs text-secondary mt-0.5">
              Help us keep every role accurate. Report closed links, compensation changes, or scam flags.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="px-3 py-1.5 rounded-lg border border-subtle bg-void hover:bg-elevated text-xs font-mono text-primary flex items-center gap-1.5 transition-colors flex-shrink-0"
        >
          <span>{isOpen ? "Close form" : "Report issue"}</span>
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {isOpen && (
        <div className="pt-3 border-t border-subtle animate-in fade-in duration-200">
          <ReportForm
            initialRoleTitle={jobTitle}
            initialUrl={absoluteUrl(`/jobs/${jobSlug}`)}
            onSubmitReport={handleSubmit}
          />
        </div>
      )}
    </section>
  );
}
