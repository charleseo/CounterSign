import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  SAMPLE_AUDIT_CASES,
  SAMPLE_AUDIT_METADATA,
} from '@/content/evaluation/sample-audit';
import {
  Download,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronDown,
  Layers,
  ArrowRight,
  BookOpen,
  Code2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sample Evaluation Audit Report | Technical Docs RAG Benchmark | TraceBase',
  description:
    'Illustrative 5-case technical documentation evaluation benchmark auditing frontier models against PostgreSQL, Stripe, Next.js, Bedrock, and Tailwind CSS specs.',
};

export default function SampleAuditPage() {
  const cases = SAMPLE_AUDIT_CASES;
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || 'https://cal.com/countersign/audit-intro';
  const pilotPriceText = process.env.NEXT_PUBLIC_PILOT_PRICE_TEXT || 'Pilots start at $1,500';

  return (
    <div className="min-h-screen bg-surface text-ink">
      {/* Top Header / Breadcrumb */}
      <div className="border-b border-rule bg-sheet/95 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-secondary overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href="/evaluation" className="hover:text-ink">
              Evaluation Studio
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-ink font-medium">Sample Audit Report</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-secondary hidden md:inline font-mono">
              {pilotPriceText}
            </span>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-rule bg-surface text-ink text-xs font-semibold hover:border-[#5A35C8] transition-colors"
            >
              Book a 20-minute call
            </a>
            <Link
              href="/evaluation/scope"
              className="px-3.5 py-1.5 rounded-lg bg-[#5A35C8] text-white text-xs font-semibold hover:bg-[#4D2BAE] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Scope Your Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Anchor Navigation Bar */}
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-2 sm:gap-4 overflow-x-auto text-xs border-t border-rule">
          <span className="text-secondary text-xs hidden sm:inline">
            Jump to:
          </span>
          <a
            href="#setup"
            className="px-2.5 py-1 rounded-md text-secondary hover:text-[#5A35C8] hover:bg-surface transition-colors"
          >
            1. Setup &amp; Methodology
          </a>
          <a
            href="#cases"
            className="px-2.5 py-1 rounded-md text-secondary hover:text-[#5A35C8] hover:bg-surface transition-colors"
          >
            2. Audited Cases (5)
          </a>
          <a
            href="#findings"
            className="px-2.5 py-1 rounded-md text-secondary hover:text-[#5A35C8] hover:bg-surface transition-colors"
          >
            3. Summary Findings
          </a>
          <a
            href="#limitations"
            className="px-2.5 py-1 rounded-md text-secondary hover:text-[#5A35C8] hover:bg-surface transition-colors"
          >
            4. Scope Limitations
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-12">
        {/* Title & Introduction */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#8A5300]/10 border border-[#8A5300]/20 text-[#8A5300]">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Illustrative, not real runs • Rubric {SAMPLE_AUDIT_METADATA.rubricVersion}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-ink">
            Technical Documentation RAG &amp; Citation Audit
          </h1>

          <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-secondary text-xs sm:text-sm flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#8A5300]" />
            <div>
              <span className="font-semibold text-ink">Illustrative, not real runs:</span> The model outputs and verdicts shown below are sample demonstrations of our evaluation rubric and diagnostic methodology. They are illustrative examples, not live model runs.
            </div>
          </div>

          <p className="text-sm sm:text-base text-secondary leading-relaxed">
            {SAMPLE_AUDIT_METADATA.summary} Every verdict below is supported by direct excerpt
            citations from official developer documentation, identifying precise root causes and
            corrective prompt engineering or ingestion fixes.
          </p>

          {/* Action Row & Downloads */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="/evaluation/sample-audit.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-sheet border border-rule hover:border-[#5A35C8] text-xs text-ink flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#5A35C8]" />
              <span>Download PDF (1-page)</span>
            </a>

            <a
              href="/api/evaluation/sample-audit.csv"
              download="countersign-sample-audit-v1.0.0.csv"
              className="px-3.5 py-2 rounded-xl bg-sheet border border-rule hover:border-[#5A35C8] text-xs text-ink flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#5A35C8]" />
              <span>Download CSV</span>
            </a>

            <a
              href="/api/evaluation/sample-audit.json"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-sheet border border-rule hover:border-[#5A35C8] text-xs text-ink flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5 text-[#5A35C8]" />
              <span>Download JSON</span>
            </a>

            <span className="text-xs text-secondary pl-2">
              Rubric version {SAMPLE_AUDIT_METADATA.rubricVersion}
            </span>
          </div>
        </div>

        {/* Section 1: Setup & Methodology */}
        <section id="setup" className="space-y-4 pt-4 border-t border-rule">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#5A35C8]" />
            <h2 className="text-lg sm:text-xl font-bold text-ink">
              1. Setup, Environment &amp; Rubric
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-sheet border border-rule space-y-2">
              <span className="text-xs text-secondary font-semibold">
                Models Audited
              </span>
              <ul className="text-xs space-y-1.5 text-ink">
                <li>• Claude 3.5 Sonnet (20241022)</li>
                <li>• GPT-4o (2024-08-06)</li>
                <li>• Llama 3.1 70B Instruct</li>
              </ul>
              <p className="text-[11px] text-secondary pt-1">
                Zero temperature, system instructions locked to technical documentation retrieval.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-sheet border border-rule space-y-2">
              <span className="text-xs text-secondary font-semibold">
                Ground-Truth Sources
              </span>
              <ul className="text-xs space-y-1.5 text-ink">
                <li>• PostgreSQL 16 Official Manual</li>
                <li>• Stripe API Subscription Specs</li>
                <li>• Next.js 15 App Router Docs</li>
                <li>• AWS Bedrock Official SLA</li>
                <li>• Tailwind CSS v4 Reference</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-sheet border border-rule space-y-2">
              <span className="text-xs text-secondary font-semibold">
                Evaluation Rubric
              </span>
              <div className="text-xs space-y-1 text-secondary">
                <p>
                  <strong className="text-[#17663F]">Supported:</strong> Claims follow
                  directly from the retrieved documentation excerpt.
                </p>
                <p>
                  <strong className="text-[#A8322A]">Contradicted:</strong> Output makes
                  claims directly opposed to official source text.
                </p>
                <p>
                  <strong className="text-[#8A5300]">Not in Source:</strong> Output invents
                  specifications absent from the source.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Audited Cases */}
        <section id="cases" className="space-y-6 pt-4 border-t border-rule">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#5A35C8]" />
                <h2 className="text-lg sm:text-xl font-bold text-ink">
                  2. Audited Evaluation Cases
                </h2>
              </div>
              <p className="text-xs text-secondary mt-0.5">
                Each card shows the prompt, official source citation, model response, diagnostic
                verdict, and actionable engineering fix.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-secondary">
              <span>Showing all 5 cases</span>
            </div>
          </div>

          <div className="space-y-6">
            {cases.map((audit) => {
              const isSupported = audit.verdict === 'supported';
              const isContradicted = audit.verdict === 'contradicted';
              const isNotInSource = audit.verdict === 'not_in_source';

              return (
                <details
                  key={audit.id}
                  id={audit.id.toLowerCase()}
                  open={audit.caseNumber <= 2}
                  className="group rounded-2xl bg-sheet border border-rule p-5 sm:p-7 space-y-6 shadow-sm hover:border-[#5A35C8] transition-colors"
                >
                  {/* Case Header as Summary */}
                  <summary className="cursor-pointer list-none select-none flex flex-wrap items-center justify-between gap-3 min-h-[44px]">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="px-2.5 py-1 rounded-md bg-surface text-xs font-semibold text-[#5A35C8] border border-rule">
                        {audit.id}
                      </span>
                      <span className="text-xs font-semibold text-ink">
                        Case {audit.caseNumber} of {cases.length}
                      </span>
                      <span className="text-xs text-secondary hidden sm:inline">•</span>
                      <span className="text-xs text-secondary">
                        {audit.model.name} ({audit.model.version})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                          isSupported
                            ? 'bg-[#17663F]/10 text-[#17663F] border-[#17663F]/20'
                            : isContradicted
                            ? 'bg-[#A8322A]/10 text-[#A8322A] border-[#A8322A]/20'
                            : 'bg-[#8A5300]/10 text-[#8A5300] border-[#8A5300]/20'
                        }`}
                      >
                        {isSupported && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {isContradicted && <XCircle className="w-3.5 h-3.5" />}
                        {isNotInSource && <AlertTriangle className="w-3.5 h-3.5" />}
                        <span>{audit.verdictLabel}</span>
                      </span>

                      <span className="text-[11px] text-secondary px-2 py-0.5 rounded bg-surface hidden sm:inline">
                        Run: {audit.model.runDate}
                      </span>

                      <ChevronDown className="w-4 h-4 text-secondary transition-transform group-open:rotate-180 ml-1 shrink-0" />
                    </div>
                  </summary>

                  <div className="pt-4 border-t border-rule space-y-6">
                    {/* Prompt */}
                    <div className="space-y-1.5">
                      <div className="text-xs text-secondary font-semibold flex items-center gap-1.5">
                        <span>User Prompt</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-surface border border-rule text-xs sm:text-sm font-medium text-ink leading-relaxed">
                        {audit.prompt}
                      </div>
                    </div>

                    {/* Two Columns: Ground-Truth Citation vs Model Output */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Official Source Excerpt */}
                      <div className="p-4 rounded-xl bg-surface border border-rule space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs text-[#17663F] font-semibold flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Official Source Excerpt</span>
                          </span>
                          <a
                            href={audit.source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-[#5A35C8] hover:underline flex items-center gap-1 transition-colors"
                          >
                            <span>{audit.source.section}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        <div className="text-xs text-secondary leading-relaxed bg-sheet p-3 rounded-lg border border-rule italic">
                          &quot;{audit.source.excerpt}&quot;
                        </div>

                        <div className="text-[11px] text-secondary flex items-center justify-between">
                          <span>Document: {audit.source.documentTitle}</span>
                          <span>Accessed: {audit.source.accessDate}</span>
                        </div>
                      </div>

                      {/* Model Output */}
                      <div className="p-4 rounded-xl bg-surface border border-rule space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-xs font-semibold flex items-center gap-1.5 ${
                              isSupported
                                ? 'text-[#17663F]'
                                : isContradicted
                                ? 'text-[#A8322A]'
                                : 'text-[#8A5300]'
                            }`}
                          >
                            {isSupported ? (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : isContradicted ? (
                              <XCircle className="w-3.5 h-3.5" />
                            ) : (
                              <AlertTriangle className="w-3.5 h-3.5" />
                            )}
                            <span>Model Output ({audit.model.name})</span>
                          </span>
                          <span className="text-[11px] text-secondary">
                            Severity: {audit.severity}
                          </span>
                        </div>

                        <div className="text-xs sm:text-sm text-ink leading-relaxed bg-sheet p-3 rounded-lg border border-rule">
                          {audit.modelOutput}
                        </div>
                      </div>
                    </div>

                    {/* Evaluator Diagnostic Breakdown */}
                    <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-xl bg-surface border border-rule space-y-1">
                        <span className="text-[11px] font-semibold text-secondary">
                          Root Cause Diagnosis
                        </span>
                        <p className="text-xs text-ink leading-relaxed">
                          {audit.rootCause}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-sheet border border-rule space-y-1">
                        <span className="text-[11px] font-semibold text-[#17663F]">
                          Recommended Fix (Ingestion &amp; Prompting)
                        </span>
                        <p className="text-xs text-secondary leading-relaxed">
                          {audit.recommendedFix}
                        </p>
                      </div>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </section>

        {/* Section 3: Summary Findings */}
        <section id="findings" className="space-y-4 pt-4 border-t border-rule">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#17663F]" />
            <h2 className="text-lg sm:text-xl font-bold text-ink">
              3. Summary Audit Findings
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-sheet border border-rule text-center space-y-1">
              <span className="text-2xl font-bold text-[#17663F] tabular-nums">1 / 5</span>
              <p className="text-xs text-secondary">
                Fully Supported (Numerical property extraction without extrapolation)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-sheet border border-rule text-center space-y-1">
              <span className="text-2xl font-bold text-[#A8322A] tabular-nums">3 / 5</span>
              <p className="text-xs text-secondary">
                Direct Contradictions (Prior knowledge overrides framework-specific constraints)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-sheet border border-rule text-center space-y-1">
              <span className="text-2xl font-bold text-[#8A5300] tabular-nums">1 / 5</span>
              <p className="text-xs text-secondary">
                Absent Hallucinations (Inventing quantitative contractual guarantees)
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-sheet border border-rule space-y-3">
            <h3 className="text-sm font-semibold text-ink">
              Primary Root Causes Observed in Technical RAG Bots
            </h3>
            <ul className="text-xs text-secondary space-y-2 list-disc pl-5 leading-relaxed">
              <li>
                <strong className="text-ink">Pre-training Prior Collision:</strong>{' '}
                Frontier models frequently override exact retrieved context with dominant historical
                training priors (e.g. suggesting standard Node try/catch blocks over Next.js thrown
                redirect tokens).
              </li>
              <li>
                <strong className="text-ink">Temporal Version Anchoring:</strong> In
                fast-moving developer ecosystems (Tailwind v4, Next.js 15), legacy configuration
                patterns remain sticky unless explicit version-boundary negative constraints are
                enforced.
              </li>
              <li>
                <strong className="text-ink">
                  Absence Extrapolation (Silent Guessing):
                </strong>{' '}
                When a parameter (such as a latency SLA) is absent from the contract, models default
                to inventing plausible enterprise numbers rather than emitting a &quot;not in source&quot;
                verdict.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4: Limitations Box */}
        <details
          id="limitations"
          className="group p-5 sm:p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3"
        >
          <summary className="cursor-pointer list-none select-none flex items-center justify-between text-[#8A5300] min-h-[44px]">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h2 className="text-base font-bold text-ink">4. Scope Limitations &amp; Ethical Disclosure</h2>
            </div>
            <ChevronDown className="w-4 h-4 text-secondary transition-transform group-open:rotate-180 shrink-0 ml-2" />
          </summary>

          <div className="pt-2 space-y-3 border-t border-amber-500/20 mt-3">
            <p className="text-xs sm:text-sm text-secondary leading-relaxed">
              {SAMPLE_AUDIT_METADATA.limitations} This report demonstrates our evaluation
              methodology, citation validation methods, and root-cause taxonomy. For client audits,
              sample sizes typically range from 100 to 500 query-document pairs to produce statistically
              rigorous accuracy distributions.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs">
              <Link
                href="/evaluation/methodology"
                className="text-[#5A35C8] hover:underline flex items-center gap-1 font-medium min-h-[44px] inline-flex items-center"
              >
                <span>Read our full Studio Methodology</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </details>

        {/* Bottom CTA Block */}
        <div className="p-6 sm:p-8 rounded-2xl bg-sheet border border-rule flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-ink">
              Need your documentation bot or RAG system audited?
            </h3>
            <p className="text-xs sm:text-sm text-secondary">
              We diagnose hallucination modes, citation drift, and negative-constraint failures on
              your actual knowledge base.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/evaluation/scope"
              className="px-4 py-2.5 rounded-xl bg-[#5A35C8] text-white text-xs font-semibold hover:bg-[#4D2BAE] transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
            >
              <span>Scope Your Audit (3 Steps)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
