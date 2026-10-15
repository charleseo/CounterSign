import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ShieldCheck,
  ArrowRight,
  FileCheck2,
  Lock,
  Sparkles,
} from 'lucide-react';
import { EvaluationGraph } from '@/components/evaluation/EvaluationGraph';
import { InteractiveComparisonPanel } from '@/components/evaluation/InteractiveComparisonPanel';

export const metadata: Metadata = {
  title: 'AI Model Evaluation Studio | RAG & Citation Audits | Countersign',
  description:
    'Evidence-first audits of developer documentation bots and RAG assistants: citation accuracy, hallucinations, and negative-constraint failures.',
  alternates: {
    canonical: '/evaluation',
  },
  openGraph: {
    title: 'AI Model Evaluation Studio | Countersign',
    description:
      'Human-verified RAG and citation audits for technical AI startups. Traceable evidence, version-locked rubrics, and zero black-box scores.',
    url: '/evaluation',
    type: 'website',
  },
};

const PROOF_PILLARS = [
  {
    title: 'Defined Criteria',
    description: 'Version-locked rubrics that never shift or degrade mid-audit.',
    link: '/evaluation/methodology#rubrics',
  },
  {
    title: 'Reviewable Decisions',
    description: 'Every verdict accompanied by exact documentation citations and excerpt spans.',
    link: '/evaluation/methodology#citations',
  },
  {
    title: 'Traceable Evidence',
    description: 'Zero black-box scores. Complete input-output-source diagnostic logs.',
    link: '/evaluation/methodology#traceability',
  },
];

const BUYER_PROBLEMS = [
  {
    title: 'Answers that cite the wrong page',
    symptom: 'The assistant generates syntactically correct code, but cites documentation from an incompatible or deprecated framework version.',
    consequence: 'Developers waste hours debugging non-existent APIs, losing trust in your platform.',
  },
  {
    title: 'Answers that invent options the docs never mention',
    symptom: 'When user queries probe unstated capabilities, the model hallucinates configuration flags, SLA guarantees, or methods.',
    consequence: 'Exposes your startup to commercial liability and enterprise onboarding friction.',
  },
  {
    title: 'No repeatable way to measure either',
    symptom: 'Automated synthetic benchmarks produce volatile numeric scores without identifying where retrieval or reasoning broke down.',
    consequence: 'Engineering teams ship blind without actionable defect taxonomies.',
  },
];

const SERVICES = [
  {
    title: 'RAG & Citation Accuracy Audits',
    slug: 'rag-and-citation-audit',
    description: 'Line-by-line verification of model outputs against ground-truth technical documentation chunks.',
    deliverable: 'Line-level citation verification, hallucination index, and retrieval overlap report in CSV and JSON.',
    isAvailable: true,
  },
  {
    title: 'Technical Documentation Truth Audits',
    slug: 'rag-and-citation-audit',
    description: 'Empirical factuality checks across official API reference documentation, SDK manuals, and migration guides.',
    deliverable: 'Complete ground-truth adherence audit with root-cause categorization.',
    isAvailable: true,
  },
  {
    title: 'Negative-Constraint & Refusal Boundary Analysis',
    slug: 'rag-and-citation-audit',
    description: 'Audits adherence to negative directives: ensuring models acknowledge unstated facts rather than speculating.',
    deliverable: 'Boundary failure taxonomy and prompt engineering remediation playbook.',
    isAvailable: true,
  },
];

const FAQS = [
  {
    q: 'Why human evaluation instead of automated LLM-as-a-judge?',
    a: 'LLM-as-a-judge evaluators suffer from self-preference bias, sycophancy, and shared blind spots on technical documentation. When an answer is plausible but subtly wrong about an isolation level or error-handling requirement, only a human domain evaluator cross-referencing authoritative specifications catches the flaw.',
  },
  {
    q: 'How large is a standard pilot evaluation?',
    a: 'A typical pilot covers 100 to 300 representative test pairs sampled across your developer documentation and real user inquiry logs. This provides sufficient statistical resolution to identify systemic retrieval and prompt failures without enterprise bureaucracy.',
  },
  {
    q: 'How fast is turnaround on a pilot audit?',
    a: 'Standard pilot deliverables are completed within 5 to 7 business days from receipt of test inputs.',
  },
  {
    q: 'How is data confidentiality handled?',
    a: 'We evaluate against public documentation by default. For proprietary codebases or private knowledge bases, we execute a mutual NDA and provide a private, encrypted transmission channel. Client test data is never shared, never sent to external AI platforms, and permanently deleted upon delivery.',
  },
];

export default function EvaluationStudioPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16">
      {/* 1. Hero Section (Section 7.9 & 615) */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-subtle bg-surface text-xs font-mono text-secondary">
            <Sparkles size={14} className="text-accent-cyan" />
            <span>Section 7.9 Evaluation Studio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-primary leading-tight">
            Model answers, checked against the source.
          </h1>

          <p className="text-base sm:text-lg text-secondary leading-relaxed">
            Evidence-first audits of developer documentation bots, API assistants, and RAG pipelines. Every verdict backed by exact line-level citations.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/evaluation/scope"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 text-void font-bold text-xs tracking-wider uppercase hover:opacity-95 shadow-[0_0_25px_rgba(61,235,255,0.4)] shimmer-sweep transition-all"
            >
              <span>Scope an Audit</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/evaluation/sample-audit"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl glass-card text-primary text-xs font-mono font-medium hover:border-cyan-400/40 transition-colors"
            >
              <span>See Sample Audit Report</span>
              <FileCheck2 size={15} className="text-accent-cyan" />
            </Link>
          </div>
        </div>

        {/* Evaluation Graph (Right on desktop, below on mobile per Section 615) */}
        <div>
          <EvaluationGraph />
        </div>
      </section>

      {/* 2. Proof Pillars Strip (Section 616) */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROOF_PILLARS.map((pillar) => (
            <Link
              key={pillar.title}
              href={pillar.link}
              className="group p-6 rounded-2xl glass-card transition-all flex flex-col justify-between hover:border-cyan-400/50 hover:shadow-[0_12px_35px_rgba(61,235,255,0.15)]"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-primary group-hover:text-accent-cyan transition-colors">
                    {pillar.title}
                  </h3>
                  <ArrowRight
                    size={14}
                    className="text-secondary group-hover:text-accent-cyan group-hover:translate-x-1 transition-all"
                  />
                </div>
                <p className="text-xs text-readable leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <span className="text-[11px] font-mono text-secondary pt-3 inline-block">
                See methodology →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Three Buyer Problems (Section 617) */}
      <section className="space-y-6">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-accent-cyan">
            Common Failure Modes
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            The three problems automated evals miss.
          </h2>
          <p className="text-sm text-secondary leading-relaxed">
            Developer tools demand absolute precision. When assistants give subtle false advice, users do not file tickets: they leave.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BUYER_PROBLEMS.map((prob, idx) => (
            <div
              key={prob.title}
              className="p-6 rounded-2xl glass-card space-y-4 flex flex-col justify-between hover:border-rose-400/40 hover:shadow-[0_12px_35px_rgba(255,107,107,0.15)] transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-accent-danger/20 text-accent-danger font-mono text-[11px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="text-sm font-bold text-primary leading-snug">
                    {prob.title}
                  </h3>
                </div>
                <p className="text-xs text-readable leading-relaxed">
                  {prob.symptom}
                </p>
              </div>

              <div className="pt-3 border-t border-subtle/80 text-[11px] text-[#FF6B6B] leading-relaxed">
                <span className="font-semibold font-mono">Impact: </span>
                {prob.consequence}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Service Cards (Section 618) */}
      <section className="space-y-6">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-accent-cyan">
            Our Audit Services
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            Structured forensic audits for production RAG.
          </h2>
          <p className="text-sm text-secondary leading-relaxed">
            Every audit delivers machine-readable findings with stable case IDs, exact documentation citations, and reproducible failure taxonomies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((srv) => (
            <div
              key={srv.title}
              className="p-6 rounded-2xl border border-subtle bg-surface space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <h3 className="text-base font-bold text-primary leading-snug">
                  {srv.title}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="space-y-4 pt-3 border-t border-subtle">
                <div className="text-xs text-readable">
                  <span className="font-mono text-[10px] text-accent-cyan font-semibold block uppercase mb-1">
                    Deliverable:
                  </span>
                  {srv.deliverable}
                </div>

                <Link
                  href={`/evaluation/services/${srv.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-cyan hover:underline font-semibold"
                >
                  <span>Explore service spec</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Interactive Comparison Panel (Section 619) */}
      <section className="space-y-4">
        <InteractiveComparisonPanel />
      </section>

      {/* 6. How a Pilot Runs (Section 620) */}
      <section className="p-6 sm:p-8 rounded-2xl border border-subtle bg-surface space-y-6">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-accent-cyan">
            Operational Blueprint
          </div>
          <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-primary">
            How a pilot audit runs.
          </h2>
          <p className="text-sm text-secondary leading-relaxed">
            We operate in focused sprints with zero enterprise overhead. You share inputs; we deliver the diagnostic report and clean datasets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-void border border-subtle space-y-2">
            <span className="text-[11px] font-mono text-accent-cyan font-bold uppercase block">
              1. Scope &amp; Sample
            </span>
            <h3 className="text-sm font-semibold text-primary">100 to 300 Pairs</h3>
            <p className="text-xs text-readable leading-relaxed">
              We extract a representative sample of user queries or generate boundary tests across your documentation corpus.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-void border border-subtle space-y-2">
            <span className="text-[11px] font-mono text-accent-cyan font-bold uppercase block">
              2. Rubric Locking
            </span>
            <h3 className="text-sm font-semibold text-primary">Version-Locked Rubric</h3>
            <p className="text-xs text-readable leading-relaxed">
              We agree on explicit pass/fail standards and negative-constraint refusal rules before checking the first record.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-void border border-subtle space-y-2">
            <span className="text-[11px] font-mono text-accent-cyan font-bold uppercase block">
              3. Human Audit
            </span>
            <h3 className="text-sm font-semibold text-primary">5-Day Turnaround</h3>
            <p className="text-xs text-readable leading-relaxed">
              Every prompt, completion, and source citation is manually inspected and cross-referenced by domain evaluators.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-void border border-subtle space-y-2">
            <span className="text-[11px] font-mono text-accent-cyan font-bold uppercase block">
              4. Deliverables
            </span>
            <h3 className="text-sm font-semibold text-primary">JSON, CSV &amp; Report</h3>
            <p className="text-xs text-readable leading-relaxed">
              You receive an executive summary, complete CSV/JSON export logs, and concrete retriever/prompt fixes.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Data Handling & Confidentiality (Section 621) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="p-6 rounded-2xl border border-subtle bg-surface space-y-3.5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-accent-emerald font-mono text-xs font-semibold uppercase">
              <Lock size={15} />
              <span>Confidentiality &amp; Security</span>
            </div>
            <h3 className="text-lg font-bold text-primary">Your data never trains an outside model.</h3>
            <p className="text-xs text-readable leading-relaxed">
              We never upload client test pairs, proprietary documentation, or query logs to external public LLM APIs. Evaluation happens in secure, ephemeral environments with zero public persistence.
            </p>
          </div>
          <ul className="space-y-1.5 text-xs text-secondary font-mono pt-2 border-t border-subtle">
            <li>• Standard mutual NDA provided prior to data exchange</li>
            <li>• Encrypted short-lived signed transmission links</li>
            <li>• Complete data erasure after delivery confirmation</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl border border-subtle bg-surface space-y-3.5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs font-semibold uppercase">
              <ShieldCheck size={15} />
              <span>About the Evaluator</span>
            </div>
            <h3 className="text-lg font-bold text-primary">Jo (Ebube) Okeke, Principal</h3>
            <p className="text-xs text-readable leading-relaxed">
              Experienced technical AI evaluator and software engineer. I operate as a solo specialist for preliminary scoping and calibration, bringing in vetted domain reviewers when batch volumes require dual-annotator consensus.
            </p>
          </div>
          <div className="pt-2 border-t border-subtle flex items-center justify-between text-xs font-mono text-secondary">
            <span>Location: Lagos, Nigeria</span>
            <Link href="/about" className="text-accent-cyan hover:underline">
              Read founder bio →
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Studio FAQs (Section 621) */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-secondary">
            Common questions from technical founders and AI product teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.map((faq) => (
            <div key={faq.q} className="p-5 rounded-xl border border-subtle bg-surface space-y-2">
              <h3 className="text-xs sm:text-sm font-semibold text-primary">{faq.q}</h3>
              <p className="text-xs text-readable leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Final CTA Strip */}
      <section className="p-8 sm:p-10 rounded-2xl border border-accent-cyan/40 bg-void text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary">
          Ready to verify your AI assistant&apos;s ground truth?
        </h2>
        <p className="text-sm text-secondary max-w-xl mx-auto leading-relaxed">
          Submit your scope request to receive a reference ID within seconds. We review every project personally and reply within two working days.
        </p>
        <div className="pt-2">
          <Link
            href="/evaluation/scope"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-cyan text-black font-semibold text-xs tracking-wider uppercase hover:shadow-[0_0_25px_rgba(61,235,255,0.4)] transition-all"
          >
            <span>Scope an Audit</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
