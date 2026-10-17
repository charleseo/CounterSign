import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  SlidersHorizontal,
} from 'lucide-react';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Negative-Constraint & Refusal Boundary Analysis | TraceBase Studio',
  description:
    'Audits adherence to negative directives: ensuring models acknowledge unstated facts rather than speculating. Boundary failure taxonomy and prompt engineering fixes.',
  alternates: {
    canonical: '/evaluation/services/negative-constraint-and-refusal-boundary-analysis',
  },
  openGraph: {
    title: 'Negative-Constraint & Refusal Boundary Analysis | TraceBase Studio',
    description:
      'Human evaluation of negative-constraint compliance, out-of-scope refusals, and boundary leakage in technical AI systems.',
    url: '/evaluation/services/negative-constraint-and-refusal-boundary-analysis',
    type: 'article',
  },
};

export default function NegativeConstraintBoundaryAnalysisPage() {
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
          <SlidersHorizontal size={14} className="text-[#5A35C8]" />
          <span>Enterprise Service Specification</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink">
          Negative-Constraint &amp; Refusal Boundary Analysis
        </h1>
        <p className="text-base sm:text-lg text-secondary leading-relaxed">
          Systematic auditing of whether your model honors negative constraints, refuses to speculate when information is absent, and avoids creating fabricated answers under user pressure.
        </p>
      </div>

      {/* Section 1: Who it is for & When to use it */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-ink">
          1. Who It Is For &amp; When to Use It
        </h2>
        <div className="p-5 rounded-xl border border-rule bg-sheet space-y-3 text-xs sm:text-sm text-secondary leading-relaxed">
          <p>
            Designed for <strong className="text-ink">AI safety teams, enterprise compliance leads, and production RAG operators</strong> who need verified adherence to strict boundaries and refusal criteria.
          </p>
          <div className="pt-2 border-t border-rule grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-semibold text-[#5A35C8] block mb-1">
                When to deploy this audit:
              </span>
              <ul className="space-y-1 text-xs text-secondary list-disc list-inside">
                <li>When testing domain boundaries (e.g. legal, financial, or medical guardrails)</li>
                <li>When models must say &quot;I do not have access to that information&quot; rather than extrapolate</li>
                <li>To benchmark adversarial prompt resistance against negative constraint bypasses</li>
              </ul>
            </div>
            <div>
              <span className="text-xs font-semibold text-[#A8322A] block mb-1">
                What this is not:
              </span>
              <ul className="space-y-1 text-xs text-secondary list-disc list-inside">
                <li>Not generic red-teaming for offensive language</li>
                <li>Not simple regex refusal pattern matching</li>
                <li>Not an automated jailbreak leaderboard</li>
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
            <div className="text-xs font-semibold text-ink">1 Boundary Challenge</div>
            <p className="text-xs text-secondary leading-relaxed">
              Target query probing unstated capabilities, negative constraints, or out-of-scope knowledge.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rule bg-sheet space-y-2">
            <span className="text-xs text-[#5A35C8] font-semibold block">
              Required Inputs
            </span>
            <div className="text-xs font-semibold text-ink">Guardrail Specs</div>
            <p className="text-xs text-secondary leading-relaxed">
              System instructions, policy guardrails, and model response batches across edge cases.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rule bg-sheet space-y-2">
            <span className="text-xs text-[#5A35C8] font-semibold block">
              Final Deliverables
            </span>
            <div className="text-xs font-semibold text-ink">Boundary Taxonomy</div>
            <p className="text-xs text-secondary leading-relaxed">
              Refusal compliance scorecard, sycophancy index, and system prompt engineering fixes.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Handling Uncertainty & Disagreement */}
      <section className="p-6 rounded-2xl border border-rule bg-sheet space-y-3">
        <div className="flex items-center gap-2 text-[#5A35C8] text-xs font-semibold">
          <ShieldAlert size={15} />
          <span>Honest Boundary Principle</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-ink">
          A correct refusal is a successful answer.
        </h3>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          In high-stakes enterprise systems, an eager hallucination is far more harmful than a calibrated refusal. We measure whether your model accurately identifies the edges of its context window and gracefully declines to guess.
        </p>
      </section>

      {/* Section 4: Action Button */}
      <section className="p-6 sm:p-8 rounded-2xl border border-rule bg-sheet text-center space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-ink">
          Scope a Boundary &amp; Refusal Analysis
        </h2>
        <p className="text-xs sm:text-sm text-secondary max-w-lg mx-auto leading-relaxed">
          Ensure your production assistants never speculate beyond official documentation boundaries.
        </p>
        <div>
          <Link
            href="/evaluation/scope?service=negative_constraint_analysis"
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
          { name: 'Boundary Analysis', item: '/evaluation/services/negative-constraint-and-refusal-boundary-analysis' },
        ]}
      />
    </div>
  );
}
