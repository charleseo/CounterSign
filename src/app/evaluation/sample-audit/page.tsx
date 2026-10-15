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
  Shield,
  Layers,
  ArrowRight,
  BookOpen,
  Code2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sample Evaluation Audit Report | Technical Docs RAG Benchmark | Countersign',
  description:
    'Empirical 5-case technical documentation evaluation benchmark auditing frontier models against PostgreSQL, Stripe, Next.js, Bedrock, and Tailwind CSS specs.',
};

export default function SampleAuditPage() {
  const cases = SAMPLE_AUDIT_CASES;

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Top Header / Breadcrumb */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)]/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[var(--color-muted)] overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-[var(--color-text)]">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href="/evaluation" className="hover:text-[var(--color-text)]">
              Evaluation Studio
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[var(--color-text)] font-medium">Sample Audit Report</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/evaluation/scope"
              className="px-3 py-1.5 rounded-lg bg-[var(--color-accent)] text-[var(--color-accent-fg)] text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              <span>Scope Your Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Anchor Navigation Bar */}
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-2 sm:gap-4 overflow-x-auto text-xs border-t border-[var(--color-border)]">
          <span className="text-[var(--color-muted)] font-mono text-[11px] uppercase tracking-wider hidden sm:inline">
            Jump to:
          </span>
          <a
            href="#setup"
            className="px-2.5 py-1 rounded-md text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            1. Setup &amp; Methodology
          </a>
          <a
            href="#cases"
            className="px-2.5 py-1 rounded-md text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            2. Audited Cases (5)
          </a>
          <a
            href="#findings"
            className="px-2.5 py-1 rounded-md text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            3. Summary Findings
          </a>
          <a
            href="#limitations"
            className="px-2.5 py-1 rounded-md text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            4. Scope Limitations
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-12">
        {/* Title & Introduction */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-accent)]">
            <Shield className="w-3.5 h-3.5" />
            <span>Empirical Benchmark • Rubric {SAMPLE_AUDIT_METADATA.rubricVersion}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-text)]">
            Technical Documentation RAG &amp; Citation Audit
          </h1>

          <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
            {SAMPLE_AUDIT_METADATA.summary} Every verdict below is supported by direct excerpt
            citations from official developer documentation, identifying precise root causes and
            corrective prompt engineering or ingestion fixes.
          </p>

          {/* Action Row & Downloads */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="/api/evaluation/sample-audit.csv"
              download="countersign-sample-audit-v1.0.0.csv"
              className="px-3.5 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-xs font-mono text-[var(--color-text)] flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>Download CSV</span>
            </a>

            <a
              href="/api/evaluation/sample-audit.json"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-xs font-mono text-[var(--color-text)] flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>Download JSON</span>
            </a>

            <span className="text-xs text-[var(--color-muted)] pl-2">
              Audited by {SAMPLE_AUDIT_METADATA.leadEvaluator} on {SAMPLE_AUDIT_METADATA.auditDate}
            </span>
          </div>
        </div>

        {/* Section 1: Setup & Methodology */}
        <section id="setup" className="space-y-4 pt-4 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--color-accent)]" />
            <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text)]">
              1. Setup, Environment &amp; Rubric
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2">
              <span className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider">
                Models Audited
              </span>
              <ul className="text-xs space-y-1.5 font-mono text-[var(--color-text)]">
                <li>• Claude 3.5 Sonnet (20241022)</li>
                <li>• GPT-4o (2024-08-06)</li>
                <li>• Llama 3.1 70B Instruct</li>
              </ul>
              <p className="text-[11px] text-[var(--color-muted)] pt-1">
                Zero temperature, system instructions locked to technical documentation retrieval.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2">
              <span className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider">
                Ground-Truth Sources
              </span>
              <ul className="text-xs space-y-1.5 text-[var(--color-text)]">
                <li>• PostgreSQL 16 Official Manual</li>
                <li>• Stripe API Subscription Specs</li>
                <li>• Next.js 15 App Router Docs</li>
                <li>• AWS Bedrock Official SLA</li>
                <li>• Tailwind CSS v4 Reference</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2">
              <span className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider">
                Evaluation Rubric
              </span>
              <div className="text-xs space-y-1 text-[var(--color-muted)]">
                <p>
                  <strong className="text-emerald-400 font-mono">Supported:</strong> Claims follow
                  directly from the retrieved documentation excerpt.
                </p>
                <p>
                  <strong className="text-rose-400 font-mono">Contradicted:</strong> Output makes
                  claims directly opposed to official source text.
                </p>
                <p>
                  <strong className="text-amber-400 font-mono">Not in Source:</strong> Output invents
                  specifications absent from the source.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Audited Cases */}
        <section id="cases" className="space-y-6 pt-4 border-t border-[var(--color-border)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[var(--color-accent)]" />
                <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text)]">
                  2. Audited Evaluation Cases
                </h2>
              </div>
              <p className="text-xs text-[var(--color-muted)] mt-0.5">
                Each card shows the prompt, official source citation, model response, diagnostic
                verdict, and actionable engineering fix.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted)]">
              <span>Showing all 5 cases</span>
            </div>
          </div>

          <div className="space-y-6">
            {cases.map((audit) => {
              const isSupported = audit.verdict === 'supported';
              const isContradicted = audit.verdict === 'contradicted';
              const isNotInSource = audit.verdict === 'not_in_source';

              return (
                <article
                  key={audit.id}
                  id={audit.id.toLowerCase()}
                  className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5 sm:p-7 space-y-6 shadow-sm hover:border-[var(--color-border-hover)] transition-colors"
                >
                  {/* Case Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--color-border)]">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-md bg-[var(--color-surface-hover)] font-mono text-xs font-bold text-[var(--color-accent)] border border-[var(--color-border)]">
                        {audit.id}
                      </span>
                      <span className="text-xs font-semibold text-[var(--color-text)]">
                        Case {audit.caseNumber} of {cases.length}
                      </span>
                      <span className="text-xs text-[var(--color-muted)] hidden sm:inline">•</span>
                      <span className="text-xs font-mono text-[var(--color-muted)]">
                        {audit.model.name} ({audit.model.version})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-mono border ${
                          isSupported
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : isContradicted
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}
                      >
                        {isSupported && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {isContradicted && <XCircle className="w-3.5 h-3.5" />}
                        {isNotInSource && <AlertTriangle className="w-3.5 h-3.5" />}
                        <span>{audit.verdictLabel}</span>
                      </span>

                      <span className="text-[11px] font-mono text-[var(--color-muted)] px-2 py-0.5 rounded bg-[var(--color-surface-hover)]">
                        Run: {audit.model.runDate}
                      </span>
                    </div>
                  </div>

                  {/* Prompt */}
                  <div className="space-y-1.5">
                    <div className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider flex items-center gap-1.5">
                      <span>User Prompt</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[var(--color-surface-hover)]/60 border border-[var(--color-border)] text-xs sm:text-sm font-medium text-[var(--color-text)] leading-relaxed">
                      {audit.prompt}
                    </div>
                  </div>

                  {/* Two Columns: Ground-Truth Citation vs Model Output */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Official Source Excerpt */}
                    <div className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Official Source Excerpt</span>
                        </span>
                        <a
                          href={audit.source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[var(--color-muted)] hover:text-[var(--color-accent)] flex items-center gap-1 transition-colors"
                        >
                          <span>{audit.source.section}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="text-xs text-[var(--color-muted)] font-mono leading-relaxed bg-[var(--color-surface)]/80 p-3 rounded-lg border border-[var(--color-border)] italic">
                        &quot;{audit.source.excerpt}&quot;
                      </div>

                      <div className="text-[11px] text-[var(--color-muted)] flex items-center justify-between">
                        <span>Document: {audit.source.documentTitle}</span>
                        <span>Accessed: {audit.source.accessDate}</span>
                      </div>
                    </div>

                    {/* Model Output */}
                    <div className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 ${
                            isSupported
                              ? 'text-emerald-400'
                              : isContradicted
                              ? 'text-rose-400'
                              : 'text-amber-400'
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
                        <span className="text-[11px] font-mono text-[var(--color-muted)]">
                          Severity: {audit.severity}
                        </span>
                      </div>

                      <div className="text-xs sm:text-sm text-[var(--color-text)] leading-relaxed bg-[var(--color-surface)]/80 p-3 rounded-lg border border-[var(--color-border)] font-mono">
                        {audit.modelOutput}
                      </div>
                    </div>
                  </div>

                  {/* Evaluator Diagnostic Breakdown */}
                  <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-[var(--color-surface-hover)]/40 border border-[var(--color-border)] space-y-1">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)]">
                        Root Cause Diagnosis
                      </span>
                      <p className="text-xs text-[var(--color-text)] leading-relaxed">
                        {audit.rootCause}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                        Recommended Fix (Ingestion &amp; Prompting)
                      </span>
                      <p className="text-xs text-emerald-200/90 leading-relaxed">
                        {audit.recommendedFix}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 3: Summary Findings */}
        <section id="findings" className="space-y-4 pt-4 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text)]">
              3. Summary Audit Findings
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center space-y-1">
              <span className="text-2xl font-bold font-mono text-emerald-400">1 / 5</span>
              <p className="text-xs text-[var(--color-muted)]">
                Fully Supported (Numerical property extraction without extrapolation)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center space-y-1">
              <span className="text-2xl font-bold font-mono text-rose-400">3 / 5</span>
              <p className="text-xs text-[var(--color-muted)]">
                Direct Contradictions (Prior knowledge overrides framework-specific constraints)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center space-y-1">
              <span className="text-2xl font-bold font-mono text-amber-400">1 / 5</span>
              <p className="text-xs text-[var(--color-muted)]">
                Absent Hallucinations (Inventing quantitative contractual guarantees)
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3">
            <h3 className="text-sm font-semibold text-[var(--color-text)]">
              Primary Root Causes Observed in Technical RAG Bots
            </h3>
            <ul className="text-xs text-[var(--color-muted)] space-y-2 list-disc pl-5 leading-relaxed">
              <li>
                <strong className="text-[var(--color-text)]">Pre-training Prior Collision:</strong>{' '}
                Frontier models frequently override exact retrieved context with dominant historical
                training priors (e.g. suggesting standard Node try/catch blocks over Next.js thrown
                redirect tokens).
              </li>
              <li>
                <strong className="text-[var(--color-text)]">Temporal Version Anchoring:</strong> In
                fast-moving developer ecosystems (Tailwind v4, Next.js 15), legacy configuration
                patterns remain sticky unless explicit version-boundary negative constraints are
                enforced.
              </li>
              <li>
                <strong className="text-[var(--color-text)]">
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
        <section
          id="limitations"
          className="p-5 sm:p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3"
        >
          <div className="flex items-center gap-2 text-amber-400">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <h2 className="text-base font-bold">4. Scope Limitations &amp; Ethical Disclosure</h2>
          </div>

          <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
            {SAMPLE_AUDIT_METADATA.limitations} This report demonstrates our evaluation
            methodology, citation validation protocols, and root-cause taxonomy. For client audits,
            sample sizes typically range from 100 to 500 query-document pairs to produce statistically
            rigorous accuracy distributions.
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs">
            <Link
              href="/evaluation/methodology"
              className="text-[var(--color-accent)] hover:underline flex items-center gap-1 font-medium"
            >
              <span>Read our full Studio Methodology</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Bottom CTA Block */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-[var(--color-text)]">
              Need your documentation bot or RAG system audited?
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-muted)]">
              We diagnose hallucination modes, citation drift, and negative-constraint failures on
              your actual knowledge base.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/evaluation/scope"
              className="px-4 py-2.5 rounded-xl bg-[var(--color-accent)] text-[var(--color-accent-fg)] text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm whitespace-nowrap"
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
