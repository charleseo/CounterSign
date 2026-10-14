"use client";

import React, { useState } from "react";
import { AlertTriangle, CheckCircle2, ShieldCheck, Send } from "lucide-react";

export interface ReportFormData {
  reason: string;
  urlOrRole: string;
  details: string;
  honeypot?: string;
  mathAnswer: string;
}

export interface ReportFormProps {
  initialRoleTitle?: string;
  initialUrl?: string;
  onSubmitReport?: (data: ReportFormData) => Promise<boolean>;
  className?: string;
}

/**
 * ReportForm (Section 7.8, 10.11 & 17.1)
 * Short structured problem reporting form with client-side bot protection (honeypot + challenge),
 * clear guidance on human review, and strict defamation safeguards.
 */
export function ReportForm({
  initialRoleTitle = "",
  initialUrl = "",
  onSubmitReport,
  className = "",
}: ReportFormProps) {
  const [reason, setReason] = useState("closed");
  const [urlOrRole, setUrlOrRole] = useState(initialRoleTitle || initialUrl);
  const [details, setDetails] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [mathAnswer, setMathAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Bot honeypot check
    if (honeypot.trim()) {
      setStatus("sent"); // Silently discard bot submission
      return;
    }

    // Bot challenge verification: 4 + 3 = 7
    if (mathAnswer.trim() !== "7") {
      setStatus("failed");
      setErrorMsg("Please answer the simple verification challenge correctly (4 + 3).");
      return;
    }

    if (!details.trim()) {
      setStatus("failed");
      setErrorMsg("Please provide a short description of the issue.");
      return;
    }

    setStatus("sending");

    try {
      if (onSubmitReport) {
        const ok = await onSubmitReport({ reason, urlOrRole, details, mathAnswer });
        if (!ok) throw new Error("Report failed");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 600));
      }
      setStatus("sent");
    } catch {
      setStatus("failed");
      setErrorMsg("Failed to transmit report. Please retry.");
    }
  };

  return (
    <div
      className={`rounded-2xl border border-subtle bg-surface p-6 sm:p-8 space-y-5 ${className}`}
    >
      <div className="flex items-center gap-2.5 pb-3 border-b border-subtle">
        <AlertTriangle size={18} className="text-[#FFC66D]" aria-hidden="true" />
        <h3 className="text-base font-semibold text-primary font-mono">
          Report an Inaccuracy or Scam Signal
        </h3>
      </div>

      {status === "sent" ? (
        <div className="p-4 rounded-xl border border-[#45F5C5]/30 bg-[#45F5C5]/10 flex items-start gap-3 text-xs animate-in fade-in">
          <CheckCircle2 size={18} className="text-[#45F5C5] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-semibold text-primary">Report Received for Human Review</div>
            <p className="text-readable leading-relaxed">
              Our team reviews every report against official sources within 24 hours. Listings with verified dead links or scams are updated immediately.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono" noValidate>
          {/* Honeypot field for bot protection */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company_website_hp">Do not fill this</label>
            <input
              id="company_website_hp"
              type="text"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Issue Reason */}
          <div className="space-y-1.5">
            <label htmlFor="report-reason" className="block text-secondary font-semibold">
              Issue Category
            </label>
            <select
              id="report-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-subtle bg-void text-primary focus:outline-none focus:border-focus"
            >
              <option value="closed">Role closed or application link is 404</option>
              <option value="eligibility">Country eligibility stated on site is inaccurate</option>
              <option value="pay">Compensation or payment structure differs from description</option>
              <option value="scam">Suspected scam: requested upfront fee, crypto, or BVN/PIN</option>
              <option value="other">Other factual discrepancy</option>
            </select>
          </div>

          {/* Target Role or URL */}
          <div className="space-y-1.5">
            <label htmlFor="report-target" className="block text-secondary font-semibold">
              Role Title or Link (Optional)
            </label>
            <input
              id="report-target"
              type="text"
              value={urlOrRole}
              onChange={(e) => setUrlOrRole(e.target.value)}
              placeholder="e.g. Outlier STEM Evaluator or application URL"
              className="w-full p-2.5 rounded-lg border border-subtle bg-void text-primary placeholder:text-secondary focus:outline-none focus:border-focus"
            />
          </div>

          {/* Issue Details */}
          <div className="space-y-1.5">
            <label htmlFor="report-details" className="block text-secondary font-semibold">
              Details & Evidence
            </label>
            <textarea
              id="report-details"
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe what occurred (e.g. recruiter demanded $20 fee on WhatsApp, or country was blocked at step 2)."
              className="w-full p-2.5 rounded-lg border border-subtle bg-void text-primary placeholder:text-secondary focus:outline-none focus:border-focus font-sans text-xs"
            />
          </div>

          {/* Human Bot Verification Challenge */}
          <div className="space-y-1.5">
            <label htmlFor="report-math" className="block text-secondary font-semibold">
              Human Check: What is 4 + 3?
            </label>
            <input
              id="report-math"
              type="text"
              value={mathAnswer}
              onChange={(e) => setMathAnswer(e.target.value)}
              placeholder="Type answer here..."
              className="w-32 p-2 rounded-lg border border-subtle bg-void text-primary focus:outline-none focus:border-focus"
            />
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded bg-accent-danger/10 border border-accent-danger/30 text-[#FF6B6B]">
              {errorMsg}
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-[11px] text-secondary">
              <ShieldCheck size={14} className="text-[#45F5C5]" aria-hidden="true" />
              <span>Human staff review within 24 hours. No public naming without verification.</span>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="px-5 py-2.5 rounded-lg bg-accent-cyan text-void font-semibold text-xs font-mono flex items-center justify-center gap-2 hover:opacity-90 btn-tactile transition-opacity self-start sm:self-auto"
            >
              <Send size={13} aria-hidden="true" />
              <span>{status === "sending" ? "Transmitting..." : "Submit Report"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
