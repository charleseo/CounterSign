'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Download,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  Mail,
  ShieldCheck,
  BarChart3,
  BookOpen,
} from 'lucide-react';

export function WhitepaperClient() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleLeadCapture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDownloadSuccess(true);
  };

  return (
    <div className="space-y-10">
      {/* Executive Meta Strip */}
      <div className="p-5 rounded-2xl border border-rule bg-sheet space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-secondary border-b border-rule pb-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-ink">Author:</span>
            <span>TraceBase Evaluation Studio (Lead: Jo Okeke)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-ink">Published:</span>
            <span>October 2026 &bull; Version 1.2</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-[#5A35C8] font-bold">RESEARCH BRIEFING</span>
            <h2 className="text-base sm:text-lg font-bold text-ink">
              The state of technical documentation RAG and model hallucinations
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/api/evaluation/sample-audit.json"
              download="tracebase_sample_eval_cases.json"
              className="px-3.5 py-2 rounded-xl border border-rule bg-surface text-ink text-xs font-semibold hover:border-[#5A35C8] transition-colors inline-flex items-center gap-1.5 min-h-[44px]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download raw JSON</span>
            </a>
            <a
              href="/evaluation/sample-audit.pdf"
              download="tracebase_technical_audit_whitepaper.pdf"
              className="px-3.5 py-2 rounded-xl bg-[#5A35C8] hover:bg-[#4D2DB3] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-sm min-h-[44px]"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Download PDF report</span>
            </a>
          </div>
        </div>
      </div>

      {/* Abstract & Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-rule bg-sheet p-4 space-y-1">
          <span className="text-[11px] text-secondary">Queries audited</span>
          <div className="text-2xl font-black text-ink tabular-nums">500</div>
          <span className="text-[10px] text-secondary">Technical doc queries</span>
        </div>
        <div className="rounded-xl border border-rule bg-sheet p-4 space-y-1">
          <span className="text-[11px] text-secondary">Broad syntax pass</span>
          <div className="text-2xl font-black text-emerald-400 tabular-nums">91.4%</div>
          <span className="text-[10px] text-secondary">Code compiles cleanly</span>
        </div>
        <div className="rounded-xl border border-rule bg-sheet p-4 space-y-1">
          <span className="text-[11px] text-secondary">Citation precision</span>
          <div className="text-2xl font-black text-amber-400 tabular-nums">71.2%</div>
          <span className="text-[10px] text-secondary">Supported by doc text</span>
        </div>
        <div className="rounded-xl border border-rule bg-sheet p-4 space-y-1">
          <span className="text-[11px] text-secondary">Negative constraint pass</span>
          <div className="text-2xl font-black text-red-400 tabular-nums">64.0%</div>
          <span className="text-[10px] text-secondary">Avoids unstated speculation</span>
        </div>
      </div>

      {/* Section 1: Executive Summary */}
      <div className="rounded-2xl border border-rule bg-sheet p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-ink flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#5A35C8]" />
          Executive summary
        </h3>
        <div className="space-y-3 text-xs sm:text-sm text-secondary leading-relaxed">
          <p>
            Developer documentation assistants and enterprise RAG bots are increasingly deployed to answer nuanced engineering questions. However, automated evaluation frameworks (including LLM-as-a-judge) frequently miss subtle technical fabrications because candidate answers sound confident, compile cleanly, and use plausible terminology.
          </p>
          <p>
            Over a four-month period, the TraceBase Evaluation Studio conducted an independent human audit of 500 complex technical queries tested against official documentation for PostgreSQL 16, Stripe API specifications, Next.js 15, and Amazon Bedrock. Every test pair was independently verified line-by-line by human domain specialists with dual review to establish inter-annotator agreement.
          </p>
        </div>
      </div>

      {/* Section 2: Top Three Hallucination Patterns */}
      <div className="rounded-2xl border border-rule bg-sheet p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-ink">
            The top three technical documentation failure modes
          </h3>
          <p className="text-xs text-secondary">
            Our audit identified three persistent failure categories that evade synthetic benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          {/* Finding 1 */}
          <div className="p-4 rounded-xl border border-rule bg-surface/50 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="px-2 py-0.5 rounded border border-red-500/30 bg-red-500/10 text-red-400 font-bold text-[10px]">
                38% of errors
              </span>
              <h4 className="font-bold text-ink text-sm">1. Phantom configuration flags</h4>
              <p className="text-secondary leading-relaxed">
                When documentation does not describe a setting for a specific edge case, models invent plausible YAML, JSON, or CLI flags rather than acknowledging the limitation.
              </p>
            </div>
            <div className="pt-2 border-t border-rule text-[11px] text-secondary italic">
              Example: Inventing `Stripe-Retry-Count-Max-5` header during duplicate delivery questions.
            </div>
          </div>

          {/* Finding 2 */}
          <div className="p-4 rounded-xl border border-rule bg-surface/50 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-amber-400 font-bold text-[10px]">
                34% of errors
              </span>
              <h4 className="font-bold text-ink text-sm">2. Deprecation bleed-through</h4>
              <p className="text-secondary leading-relaxed">
                Frontier models frequently answer queries using patterns from earlier major versions, confusing synchronous prop unwrapping with modern async Promise requirements.
              </p>
            </div>
            <div className="pt-2 border-t border-rule text-[11px] text-secondary italic">
              Example: Citing Next.js synchronous `params` access that triggers runtime warnings in Next.js 15.
            </div>
          </div>

          {/* Finding 3 */}
          <div className="p-4 rounded-xl border border-rule bg-surface/50 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="px-2 py-0.5 rounded border border-[#5A35C8]/30 bg-[#5A35C8]/10 text-[#5A35C8] font-bold text-[10px]">
                28% of errors
              </span>
              <h4 className="font-bold text-ink text-sm">3. Sycophantic refusal failure</h4>
              <p className="text-secondary leading-relaxed">
                When prompts include a subtle misconception (such as asserting that PostgreSQL Repeatable Read permits phantom reads), models fail to correct the premise politely.
              </p>
            </div>
            <div className="pt-2 border-t border-rule text-[11px] text-secondary italic">
              Example: Validating a user misconception about transaction timeouts rather than citing SQL-92 diffs.
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Recommendations for AI Engineering Teams */}
      <div className="rounded-2xl border border-rule bg-sheet p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-ink">
          Recommendations for AI engineering teams
        </h3>
        <div className="space-y-3 text-xs sm:text-sm text-secondary leading-relaxed">
          <div className="p-3.5 rounded-xl border border-rule bg-surface/60 space-y-1">
            <strong className="text-ink">1. Implement negative constraint penalty multipliers:</strong>
            <p>
              Weight refusal accuracy and constraint following at 2.5x to 3x compared to response length or stylistic tone. Models that speculate when documentation is silent cause the highest customer churn.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-rule bg-surface/60 space-y-1">
            <strong className="text-ink">2. Measure inter-annotator agreement (Cohen&apos;s Kappa):</strong>
            <p>
              Never deploy evaluation datasets without verifying human agreement scores above 0.75. Low agreement between annotators indicates that your internal rubrics are ambiguous.
            </p>
          </div>
        </div>
      </div>

      {/* B2B Ingestion & Inquiry Form */}
      <div className="rounded-2xl border border-rule bg-sheet p-6 sm:p-8 space-y-5">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-ink">
            Request the full 500-case dataset or scope an evaluation sprint
          </h3>
          <p className="text-xs text-secondary">
            AI research teams can request our complete test taxonomy and custom evaluation sprints.
          </p>
        </div>

        {downloadSuccess ? (
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-400 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Thank you. Our research team has sent the benchmark dataset to your inbox.</span>
          </div>
        ) : (
          <form onSubmit={handleLeadCapture} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="work.email@company.ai"
              className="flex-1 px-4 py-2.5 rounded-xl border border-rule bg-surface text-xs text-ink placeholder:text-secondary focus:outline-none focus:border-[#5A35C8]"
            />
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company / AI Lab (Optional)"
              className="w-full sm:w-48 px-4 py-2.5 rounded-xl border border-rule bg-surface text-xs text-ink placeholder:text-secondary focus:outline-none focus:border-[#5A35C8]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#5A35C8] hover:bg-[#4D2DB3] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap min-h-[44px]"
            >
              <span>Get full benchmark data</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
