import React from "react";
import { CheckCircle2, XCircle, AlertCircle, Quote, Sparkles, Terminal } from "lucide-react";

export interface SampleAuditCardProps {
  caseId: string;
  query: string;
  groundTruthExcerpt: string;
  citedSpan?: string;
  modelOutput: string;
  verdict: "pass" | "fail" | "uncertain";
  verdictLabel: string;
  rootCause: string;
  remedy: string;
  className?: string;
}

/**
 * SampleAuditCard (Section 7.9 & 10.11)
 * Audit case card demonstrating human citation verification for AI models.
 * Shows Prompt, Reference Ground-Truth with highlighted excerpt, Model Answer,
 * Verdict badge (Pass, Fail, Uncertain), Root Cause, and Recommended Prompt/RAG fix.
 */
export function SampleAuditCard({
  caseId,
  query,
  groundTruthExcerpt,
  citedSpan,
  modelOutput,
  verdict,
  verdictLabel,
  rootCause,
  remedy,
  className = "",
}: SampleAuditCardProps) {
  const verdictConfig = {
    pass: {
      color: "text-[#45F5C5]",
      border: "border-[#45F5C5]/30",
      bg: "bg-[#45F5C5]/10",
      icon: CheckCircle2,
      title: "Passed Verification",
    },
    fail: {
      color: "text-[#FF6B6B]",
      border: "border-[#FF6B6B]/30",
      bg: "bg-[#FF6B6B]/10",
      icon: XCircle,
      title: "Citation Failure / Hallucination",
    },
    uncertain: {
      color: "text-[#FFC66D]",
      border: "border-[#FFC66D]/30",
      bg: "bg-[#FFC66D]/10",
      icon: AlertCircle,
      title: "Ambiguous / Partial Compliance",
    },
  }[verdict];

  const VerdictIcon = verdictConfig.icon;

  return (
    <div
      className={`rounded-2xl border border-subtle bg-surface p-5 sm:p-6 space-y-5 text-xs font-mono shadow-sm ${className}`}
    >
      {/* Header: Case ID + Verdict Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-subtle">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-accent-cyan" aria-hidden="true" />
          <span className="font-semibold text-primary">AUDIT CASE {caseId}</span>
        </div>

        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold ${verdictConfig.bg} ${verdictConfig.border} ${verdictConfig.color}`}
        >
          <VerdictIcon size={13} aria-hidden="true" />
          <span>{verdictLabel}</span>
        </div>
      </div>

      {/* 1. Prompt / User Query */}
      <div className="space-y-1">
        <span className="text-secondary text-[11px] uppercase tracking-wider">
          Input Query / User Prompt:
        </span>
        <div className="p-3 rounded-lg border border-subtle bg-void text-primary font-sans text-xs sm:text-sm">
          &ldquo;{query}&rdquo;
        </div>
      </div>

      {/* 2. Ground Truth Context & Citation Check */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] text-secondary uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Quote size={12} aria-hidden="true" />
            <span>Ground-Truth Source Excerpt:</span>
          </span>
          <span className="text-accent-cyan font-semibold">CITED REFERENCE</span>
        </div>
        <div className="p-3 rounded-lg border border-subtle bg-void text-readable font-sans text-xs leading-relaxed">
          {groundTruthExcerpt}
          {citedSpan && (
            <mark className="ml-1 bg-accent-violet/30 text-primary px-1 py-0.5 rounded border border-accent-violet/40">
              {citedSpan}
            </mark>
          )}
        </div>
      </div>

      {/* 3. Model Completion */}
      <div className="space-y-1">
        <span className="text-secondary text-[11px] uppercase tracking-wider">
          AI Model Answer:
        </span>
        <div
          className={`p-3 rounded-lg border bg-void text-readable font-sans text-xs leading-relaxed ${
            verdict === "fail"
              ? "border-accent-danger/40 bg-accent-danger/5"
              : "border-subtle"
          }`}
        >
          {modelOutput}
        </div>
      </div>

      {/* 4. Human Auditor Findings & Remedy */}
      <div className="pt-3 border-t border-subtle grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
        <div className="p-3 rounded-lg border border-subtle bg-void space-y-1">
          <span className="text-[#FFC66D] font-semibold block uppercase tracking-wider">
            Root Cause Diagnosis
          </span>
          <p className="text-readable font-sans text-xs">{rootCause}</p>
        </div>

        <div className="p-3 rounded-lg border border-subtle bg-void space-y-1">
          <span className="text-[#45F5C5] font-semibold flex items-center gap-1 uppercase tracking-wider">
            <Sparkles size={12} aria-hidden="true" />
            <span>Recommended Correction</span>
          </span>
          <p className="text-readable font-sans text-xs">{remedy}</p>
        </div>
      </div>
    </div>
  );
}
