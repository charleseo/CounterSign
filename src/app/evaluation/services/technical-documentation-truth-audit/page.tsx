import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  FileCheck2,
} from 'lucide-react';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Technical Documentation Truth Audits | Technical AI Evaluation | TraceBase',
  description:
    'Rigorous factuality checks across official API reference documentation, SDK manuals, and migration guides. Version-locked ground truth adherence audits.',
  alternates: {
    canonical: '/evaluation/services/technical-documentation-truth-audit',
  },
  openGraph: {
    title: 'Technical Documentation Truth Audits | TraceBase Studio',
    description:
      'Human-verified factuality and technical truth audits for developer AI assistants. Authoritative documentation ground-truth verification.',
    url: '/evaluation/services/technical-documentation-truth-audit',
    type: 'article',
  },
};

export default function TechnicalDocumentationTruthAuditPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb / Back Link */}
      <div>
        <Link
          href="/evaluation"
          className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-[#5A35C8] font-medium transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Evaluation Studio</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4 pb-6 border-b border-rule">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-rule bg-sheet text-xs text-secondary">
          <FileCheck2 size={14} className="text-[#5A35C8]" />
          <span>Enterprise Service Specification</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink">
          Technical Documentation Truth Audits
        </h1>
        <p className="text-base sm:text-lg text-secondary leading-relaxed">
          Comprehensive factuality verification across official API references, SDK documentation, and release notes to prevent hallucinated endpoints, parameters, and flags.
        </p>
      </div>

      {/* Section 1: Who it is for & When to use it */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-ink">
          1. Who It Is For &amp; When to Use It
        </h2>
        <div className="p-5 rounded-xl border border-rule bg-sheet space-y-3 text-xs sm:text-sm text-secondary leading-relaxed">
          <p>
            Designed for <strong className="text-ink">cloud providers, SaaS platforms, and enterprise devtool teams</strong> whose developer trust depends on 100% adherence to active API specifications.
          </p>
          <div className="pt-2 border-t border-rule grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-semibold text-[#5A35C8] block mb-1">
                When to deploy this audit:
              </span>
              <ul className="space-y-1 text-xs text-secondary list-disc list-inside">
                <li>Major SDK version migrations (breaking changes, deprecated arguments)</li>
                <li>When publishing conversational API code-completion agents</li>
                <li>To eliminate dangerous hallucinated parameter defaults</li>
              </ul>
            </div>
            <div>
              <span className="text-xs font-semibold text-[#A8322A] block mb-1">
                What this is not:
              </span>
              <ul className="space-y-1 text-xs text-secondary list-disc list-inside">
                <li>Not generic prose or tone-of-voice copywriting review</li>
                <li>Not automated syntactic linting without semantic validation</li>
                <li>Not a benchmark based on unverified community blog posts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Inputs, Unit of Work & Outputs */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-ink">
          2. Inputs, Unit of Work &amp; Deliverables
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-rule bg-sheet space-y-2">
            <span className="text-xs text-[#5A35C8] font-semibold block">
              Unit of Work
            </span>
            <div className="text-xs font-semibold text-ink">1 Technical Claim</div>
            <p className="text-xs text-secondary leading-relaxed">
              Every factual statement, code signature, or configuration setting extracted and cross-referenced.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rule bg-sheet space-y-2">
            <span className="text-xs text-[#5A35C8] font-semibold block">
              Required Inputs
            </span>
            <div className="text-xs font-semibold text-ink">API Specs &amp; Logs</div>
            <p className="text-xs text-secondary leading-relaxed">
              Authoritative API reference documentation, OpenAPI schemas, and prompt generation outputs.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rule bg-sheet space-y-2">
            <span className="text-xs text-[#5A35C8] font-semibold block">
              Final Deliverables
            </span>
            <div className="text-xs font-semibold text-ink">Truth Audit Matrix</div>
            <p className="text-xs text-secondary leading-relaxed">
              Categorized finding matrix with discrepancy severity, documentation anchors, and remediation guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Handling Uncertainty & Disagreement */}
      <section className="p-6 rounded-2xl border border-rule bg-sheet space-y-3">
        <div className="flex items-center gap-2 text-[#5A35C8] text-xs font-semibold">
          <HelpCircle size={15} />
          <span>Primary sources only</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-ink">
          Authoritative primary sources only.
        </h3>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          Evaluators audit model answers exclusively against pinned, versioned official developer documentation and OpenAPI contracts. Forum discussions, StackOverflow posts, and synthetic summaries are explicitly forbidden as ground truth.
        </p>
      </section>

      {/* Section 4: Action Button */}
      <section className="p-6 sm:p-8 rounded-2xl border border-rule bg-sheet text-center space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-ink">
          Scope a Technical Documentation Truth Audit
        </h2>
        <p className="text-xs sm:text-sm text-secondary max-w-lg mx-auto leading-relaxed">
          Protect developer trust with line-level truth auditing across your API documentation and code generation assistants.
        </p>
        <div>
          <Link
            href="/evaluation/scope?service=technical_docs_truth_audit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5A35C8] text-white font-medium text-xs tracking-normal hover:bg-[#4D2BAE] transition-all shadow-sm"
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
          { name: 'Technical Docs Truth Audit', item: '/evaluation/services/technical-documentation-truth-audit' },
        ]}
      />
    </div>
  );
}
