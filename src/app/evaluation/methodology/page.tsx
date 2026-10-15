import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Layers,
  Search,
  GitBranch,
  Scale,
} from 'lucide-react';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Studio Evaluation Methodology & Rubric Standards | Countersign',
  description:
    'How Countersign audits AI models: version-locked rubrics, line-level source verification, dual-reviewer consensus, and full finding traceability.',
  alternates: {
    canonical: '/evaluation/methodology',
  },
  openGraph: {
    title: 'Studio Evaluation Methodology | Countersign',
    description:
      'Scientific rigor for AI model evaluation: immutable rubrics, source checking, and reproducible failure taxonomies.',
    url: '/evaluation/methodology',
    type: 'article',
  },
};

export default function StudioMethodologyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Back Link */}
      <div>
        <Link
          href="/evaluation"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary hover:text-accent-cyan transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Evaluation Studio</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4 pb-6 border-b border-subtle">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-subtle bg-surface text-xs font-mono text-secondary">
          <ShieldCheck size={14} className="text-accent-cyan" />
          <span>Section 7.9b Evaluation Protocol</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-primary">
          Studio Evaluation Methodology
        </h1>
        <p className="text-base sm:text-lg text-secondary leading-relaxed">
          How we test model outputs against developer documentation: version-locked rubrics, dual-annotator adjudication, and end-to-end finding traceability.
        </p>
      </div>

      {/* Pillar 1: Immutable Rubrics */}
      <section id="rubrics" className="space-y-4 scroll-mt-24">
        <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs font-semibold uppercase">
          <Layers size={16} />
          <span>Protocol Component 1</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          1. Version-Locked Rubric Architecture
        </h2>
        <div className="p-5 rounded-xl border border-subtle bg-surface space-y-3 text-xs sm:text-sm text-readable leading-relaxed">
          <p>
            An evaluation is only scientifically valid if the scoring rules remain immutable throughout the measurement sprint. In our studio, all rubrics are explicitly versioned (e.g. <code className="font-mono text-accent-cyan bg-void px-1.5 py-0.5 rounded">v1.0.0</code>).
          </p>
          <p>
            Once a pilot evaluation commences, the criteria cannot be edited or loosened. Any refinement in definition or scoring edge-case triggers a new rubric version tag, guaranteeing that client deliverables are mathematically reproducible.
          </p>
        </div>
      </section>

      {/* Pillar 2: Line-Level Source Checking */}
      <section id="citations" className="space-y-4 scroll-mt-24">
        <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs font-semibold uppercase">
          <Search size={16} />
          <span>Protocol Component 2</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          2. Ground-Truth Source Verification
        </h2>
        <div className="p-5 rounded-xl border border-subtle bg-surface space-y-3 text-xs sm:text-sm text-readable leading-relaxed">
          <p>
            Every single audited assertion is mapped to an authoritative source excerpt with an access date, URL, and specific document heading.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
            <div className="p-3 rounded-lg bg-void border border-subtle">
              <span className="text-accent-emerald font-semibold block uppercase text-[11px] mb-1">
                Supported Verdict
              </span>
              <p className="text-secondary font-sans">
                The model assertion is directly proven by the cited document span without unwarranted extrapolation.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-void border border-subtle">
              <span className="text-accent-danger font-semibold block uppercase text-[11px] mb-1">
                Contradicted Verdict
              </span>
              <p className="text-secondary font-sans">
                The model assertion contradicts official API mechanics, concurrency boundaries, or syntax constraints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 3: Reviewer Consensus & Disagreement */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs font-semibold uppercase">
          <Scale size={16} />
          <span>Protocol Component 3</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          3. Dual Reviewers &amp; Disagreement Resolution
        </h2>
        <div className="p-5 rounded-xl border border-subtle bg-surface space-y-3 text-xs sm:text-sm text-readable leading-relaxed">
          <p>
            For pilot batches exceeding 200 items, a 20% random overlap sample is checked independently by a secondary domain evaluator.
          </p>
          <div className="p-4 rounded-xl border border-accent-amber/40 bg-accent-amber/10 space-y-1.5 text-readable">
            <span className="text-xs font-mono font-bold text-[#FF6B6B] uppercase block">
              Fundamental Epistemic Rule:
            </span>
            <p className="text-xs">
              Agreement between reviewers does not by itself prove an answer is factually correct. Both reviewers must provide the identical documentation excerpt justifying their verdict. Where disagreement occurs, the item is escalated to principal review, and the divergent rationales are recorded in the export audit trail.
            </p>
          </div>
        </div>
      </section>

      {/* Pillar 4: Complete Traceability Example */}
      <section id="traceability" className="space-y-4 scroll-mt-24">
        <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs font-semibold uppercase">
          <GitBranch size={16} />
          <span>Protocol Component 4</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          4. End-to-End Finding Traceability Trail
        </h2>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          Here is how one finding travels through our evaluation pipeline from client query to engineering fix:
        </p>

        <div className="p-5 rounded-2xl border border-subtle bg-void space-y-4 font-mono text-xs">
          <div className="space-y-1 pb-3 border-b border-subtle">
            <span className="text-accent-cyan font-bold block uppercase text-[10px]">
              Step A: Prompt Ingestion
            </span>
            <p className="text-primary font-sans text-xs">
              &quot;Does READ COMMITTED in PostgreSQL 16 prevent phantom reads with advisory locks?&quot;
            </p>
          </div>

          <div className="space-y-1 pb-3 border-b border-subtle">
            <span className="text-accent-violet font-bold block uppercase text-[10px]">
              Step B: Model Output Capture
            </span>
            <p className="text-[#FF6B6B] font-sans text-xs">
              &quot;Yes, pg_advisory_xact_lock() ensures transaction-level snapshot isolation...&quot;
            </p>
          </div>

          <div className="space-y-1 pb-3 border-b border-subtle">
            <span className="text-accent-cyan font-bold block uppercase text-[10px]">
              Step C: Source Retrieval Check
            </span>
            <p className="text-readable font-sans text-xs">
              Retrieved PostgreSQL 16 Section 13.2.1: &quot;A SELECT query sees a snapshot as of the instant query begins... phantom reads remain possible.&quot;
            </p>
          </div>

          <div className="space-y-1 pb-3 border-b border-subtle">
            <span className="text-accent-danger font-bold block uppercase text-[10px]">
              Step D: Human Verdict &amp; Diagnosis
            </span>
            <p className="text-readable font-sans text-xs">
              Verdict: <strong className="text-accent-danger">Contradicted</strong>. Root Cause: Model conflated session lock mutual exclusion with MVCC statement snapshot boundaries.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-accent-emerald font-bold block uppercase text-[10px]">
              Step E: Actionable Engineering Fix
            </span>
            <p className="text-readable font-sans text-xs">
              Require retriever to surface MVCC snapshot lifecycle rules whenever queries touch concurrency keywords.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="p-6 sm:p-8 rounded-2xl border border-accent-cyan/40 bg-void text-center space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          Audit Your AI System With This Methodology
        </h2>
        <p className="text-xs sm:text-sm text-secondary max-w-lg mx-auto leading-relaxed">
          Request a 100 to 300 pair pilot evaluation to benchmark your developer documentation assistant against ground-truth technical specifications.
        </p>
        <div>
          <Link
            href="/evaluation/scope"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-cyan text-black font-semibold text-xs tracking-wider uppercase hover:shadow-[0_0_25px_rgba(61,235,255,0.4)] transition-all"
          >
            <span>Scope an Audit</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Structured Data: Breadcrumbs */}
      <BreadcrumbListJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Evaluation Studio', item: '/evaluation' },
          { name: 'Methodology', item: '/evaluation/methodology' },
        ]}
      />
    </div>
  );
}
