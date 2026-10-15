import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  Search,
  HelpCircle,
} from 'lucide-react';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'RAG & Citation Accuracy Audits | Technical AI Evaluation | Countersign',
  description:
    'Forensic evaluation of technical documentation bots, API assistants, and RAG pipelines. Verified source citations, negative-constraint checking, and hallucination taxonomies.',
  alternates: {
    canonical: '/evaluation/services/rag-and-citation-audit',
  },
  openGraph: {
    title: 'RAG & Citation Accuracy Audits | Countersign Studio',
    description:
      'Human-verified factuality and citation audits for developer AI assistants. Line-level ground-truth verification.',
    url: '/evaluation/services/rag-and-citation-audit',
    type: 'article',
  },
};

export default function RagAndCitationAuditPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb / Back Link */}
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
          <Search size={14} className="text-accent-cyan" />
          <span>Section 7.9a Service Specification</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-primary">
          RAG &amp; Citation Accuracy Audits
        </h1>
        <p className="text-base sm:text-lg text-secondary leading-relaxed">
          Forensic verification of production AI documentation bots, code generators, and technical assistants against authoritative ground truth.
        </p>
      </div>

      {/* Section 1: Who it is for & When to use it */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-primary">
          1. Who It Is For &amp; When to Use It
        </h2>
        <div className="p-5 rounded-xl border border-subtle bg-surface space-y-3 text-xs sm:text-sm text-readable leading-relaxed">
          <p>
            This service is designed specifically for <strong>technical AI founders, developer tool teams, and API platform operators</strong> deploying retrieval-augmented assistants over complex technical documentation.
          </p>
          <div className="pt-2 border-t border-subtle grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="font-mono text-xs font-semibold text-accent-cyan block uppercase mb-1">
                When to deploy this audit:
              </span>
              <ul className="space-y-1 text-xs text-secondary list-disc list-inside">
                <li>Before launching a developer-facing docs assistant to public GA</li>
                <li>When upgrading foundation models or vector embedding indexes</li>
                <li>After customer complaints regarding hallucinated API parameters</li>
              </ul>
            </div>
            <div>
              <span className="font-mono text-xs font-semibold text-accent-danger block uppercase mb-1">
                What this is not:
              </span>
              <ul className="space-y-1 text-xs text-secondary list-disc list-inside">
                <li>Not a high-volume automated synthetic leaderboard</li>
                <li>Not generic conversational chit-chat evaluation</li>
                <li>Not a substitute for security penetration testing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Inputs, Unit of Work & Outputs */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-primary">
          2. Inputs, Unit of Work &amp; Deliverables
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-subtle bg-surface space-y-2">
            <span className="text-[11px] font-mono text-accent-cyan font-bold uppercase block">
              Unit of Work
            </span>
            <div className="text-xs font-semibold text-primary">1 Test Pair</div>
            <p className="text-xs text-secondary leading-relaxed">
              One prompt, the bot completion, retrieved chunks, and the target source document URL.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-subtle bg-surface space-y-2">
            <span className="text-[11px] font-mono text-accent-cyan font-bold uppercase block">
              Required Inputs
            </span>
            <div className="text-xs font-semibold text-primary">JSON / CSV Export</div>
            <p className="text-xs text-secondary leading-relaxed">
              100 to 300 representative test pairs from user logs or synthetic boundary generation.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-subtle bg-surface space-y-2">
            <span className="text-[11px] font-mono text-accent-cyan font-bold uppercase block">
              Final Deliverables
            </span>
            <div className="text-xs font-semibold text-primary">Audit Dossier</div>
            <p className="text-xs text-secondary leading-relaxed">
              Machine-readable JSON/CSV with line-level citations, failure mode taxonomy, and fix guide.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Handling Uncertainty & Disagreement */}
      <section className="p-6 rounded-2xl border border-accent-cyan/30 bg-void space-y-3">
        <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs font-semibold uppercase">
          <HelpCircle size={15} />
          <span>Strict Uncertainty Handling Protocol</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-primary">
          The &quot;Cannot Verify&quot; verdict: We never guess.
        </h3>
        <p className="text-xs sm:text-sm text-readable leading-relaxed">
          In developer documentation evaluation, an unconfirmed fact is just as dangerous as an explicit falsehood. If the retrieved documentation chunk is ambiguous or silent regarding a model claim, our evaluators assign an explicit <strong>&quot;Cannot Verify / Not in Source&quot;</strong> verdict. We never extrapolate or assume platform intent without textual proof.
        </p>
      </section>

      {/* Section 4: Annotated Example Row */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-primary">
          3. Annotated Example Row from Our Benchmark
        </h2>
        <div className="p-5 rounded-xl border border-subtle bg-surface space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-subtle text-secondary">
            <span>CASE ID: CS-AUD-001</span>
            <span className="text-[#FF6B6B]">Verdict: Contradicted</span>
          </div>
          <div className="space-y-1">
            <span className="text-secondary block">Prompt:</span>
            <div className="text-primary bg-void p-2 rounded">
              Does READ COMMITTED transaction isolation in PostgreSQL 16 prevent phantom reads with advisory locks?
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-secondary block">Bot Output:</span>
            <div className="text-[#FF6B6B] bg-void p-2 rounded border border-[#FF6B6B]/30">
              &quot;Yes, in PostgreSQL 16, using pg_advisory_xact_lock() ensures transaction-level snapshot isolation...&quot;
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-secondary block">Ground Truth Excerpt (Sec 13.2.1):</span>
            <div className="text-accent-emerald bg-void p-2 rounded border border-accent-emerald/30">
              &quot;A SELECT query sees a snapshot as of the instant query begins... phantom reads remain possible.&quot;
            </div>
          </div>
          <div className="space-y-1 pt-1">
            <span className="text-secondary block">Root Cause &amp; Fix:</span>
            <p className="text-readable font-sans text-xs">
              Model conflated session lock mutual exclusion with MVCC statement snapshot boundaries. Fix: require retrieval of statement snapshot lifecycle rules for all concurrency queries.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Metrics & Their Limits */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-primary">
          4. Metric Definitions &amp; Statistical Limits
        </h2>
        <div className="p-5 rounded-xl border border-subtle bg-surface space-y-3 text-xs text-readable leading-relaxed">
          <p>
            We measure <strong>Citation Recall</strong> (percentage of generated assertions mapped to real chunks), <strong>Faithfulness Index</strong> (absence of contradictory facts), and <strong>Negative-Constraint Refusal Accuracy</strong>.
          </p>
          <div className="p-3 rounded-lg bg-void border border-subtle text-secondary font-mono text-[11px]">
            Statistical Rigor Rule: Inter-Annotator Agreement (Cohen&apos;s Kappa) is calculated across batches of at least 30 overlapping items. Agreement statistics are never reported on single questions.
          </div>
        </div>
      </section>

      {/* Section 6: Action Button */}
      <section className="p-6 sm:p-8 rounded-2xl border border-accent-cyan/40 bg-void text-center space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          Scope a RAG &amp; Citation Audit for Your Product
        </h2>
        <p className="text-xs sm:text-sm text-secondary max-w-lg mx-auto leading-relaxed">
          Start with a standard 100 to 300 test pair pilot. Receive your reference ID and preliminary failure taxonomy within two working days.
        </p>
        <div>
          <Link
            href="/evaluation/scope?service=rag_and_citation_audit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-cyan text-black font-semibold text-xs tracking-wider uppercase hover:shadow-[0_0_25px_rgba(61,235,255,0.4)] transition-all"
          >
            <span>Scope This Service</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Structured Data: Breadcrumbs */}
      <BreadcrumbListJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Evaluation Studio', item: '/evaluation' },
          { name: 'RAG & Citation Audit', item: '/evaluation/services/rag-and-citation-audit' },
        ]}
      />
    </div>
  );
}
