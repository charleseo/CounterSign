import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  ShieldCheck,
  ArrowRight,
  FileCheck2,
  Lock,
  Sparkles,
  ChevronDown,
  Clock,
} from 'lucide-react';
import { EvaluationGraph } from '@/components/evaluation/EvaluationGraph';
import { InteractiveComparisonPanel } from '@/components/evaluation/InteractiveComparisonPanel';

export const metadata: Metadata = {
  title: 'AI Model Evaluation Studio | RAG & Citation Audits | TraceBase',
  description:
    'Evidence-first audits of developer documentation bots and RAG assistants: citation accuracy, hallucinations, and negative-constraint failures.',
  alternates: {
    canonical: '/evaluation',
  },
  openGraph: {
    title: 'AI Model Evaluation Studio | TraceBase',
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
    slug: 'technical-documentation-truth-audit',
    description: 'Rigorous factuality checks across official API reference documentation, SDK manuals, and migration guides.',
    deliverable: 'Complete ground-truth adherence audit with root-cause categorization.',
    isAvailable: true,
  },
  {
    title: 'Negative-Constraint & Refusal Boundary Analysis',
    slug: 'negative-constraint-and-refusal-boundary-analysis',
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
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || 'https://cal.com/countersign/audit-intro';
  const pilotPriceText = process.env.NEXT_PUBLIC_PILOT_PRICE_TEXT || 'Pilots start at $1,500';

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16">
      {/* 1. Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-rule bg-sheet text-xs text-secondary">
            <Sparkles size={14} className="text-[#5A35C8]" />
            <span>AI Evaluation Studio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink leading-tight">
            Model answers, checked against the source.
          </h1>

          <p className="text-base sm:text-lg text-secondary leading-relaxed">
            Evidence-first audits of developer documentation bots, API assistants, and RAG pipelines. Every verdict backed by exact line-level citations.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#5A35C8] text-white font-medium text-xs tracking-normal hover:bg-[#4D2BAE] transition-all shadow-sm min-h-[44px]"
            >
              <span>Book a 20-minute call</span>
              <ArrowRight size={15} />
            </a>

            <Link
              href="/evaluation/demo"
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl border border-rule bg-sheet text-ink text-xs font-medium hover:border-[#5A35C8] transition-colors min-h-[44px]"
            >
              <Sparkles size={15} className="text-amber-500" />
              <span>Try live audit demo</span>
            </Link>

            <Link
              href="/evaluation/estimator"
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl border border-rule bg-sheet text-ink text-xs font-medium hover:border-[#5A35C8] transition-colors min-h-[44px]"
            >
              <span>Sprint estimator</span>
            </Link>

            <Link
              href="/evaluation/scope"
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl border border-rule bg-sheet text-ink text-xs font-medium hover:border-[#5A35C8] transition-colors min-h-[44px]"
            >
              <span>Scope an audit</span>
            </Link>

            <Link
              href="/evaluation/sample-audit"
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl border border-rule bg-surface text-secondary hover:text-ink hover:border-[#5A35C8] text-xs font-medium transition-colors min-h-[44px]"
            >
              <FileCheck2 size={15} className="text-[#5A35C8]" />
              <span>Sample report (PDF &amp; Web)</span>
            </Link>
          </div>

          <div className="pt-1 text-xs text-secondary font-mono">
            {pilotPriceText} &bull; 5 working day turnaround &bull; Direct founder evaluation
          </div>
        </div>

        {/* Evaluation Graph */}
        <div>
          <EvaluationGraph />
        </div>
      </section>

      {/* 2. Proof Pillars Strip */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROOF_PILLARS.map((pillar) => (
            <Link
              key={pillar.title}
              href={pillar.link}
              className="group p-5 sm:p-6 rounded-xl border border-rule bg-sheet transition-all flex flex-col justify-between hover:border-[#5A35C8]"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-ink group-hover:text-[#5A35C8] transition-colors">
                    {pillar.title}
                  </h3>
                  <ArrowRight
                    size={14}
                    className="text-secondary group-hover:text-[#5A35C8] group-hover:translate-x-1 transition-all"
                  />
                </div>
                <p className="text-xs text-secondary leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <span className="text-xs text-[#5A35C8] pt-3 inline-block font-medium">
                See methodology →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Three Buyer Problems */}
      <section className="space-y-6">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-semibold text-[#5A35C8]">
            Common Failure Modes
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
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
              className="p-5 sm:p-6 rounded-xl border border-rule bg-sheet space-y-4 flex flex-col justify-between hover:border-[#A8322A]/50 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#A8322A]/10 text-[#A8322A] text-xs font-semibold tabular-nums flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="text-sm font-semibold text-ink leading-snug">
                    {prob.title}
                  </h3>
                </div>
                <p className="text-xs text-secondary leading-relaxed">
                  {prob.symptom}
                </p>
              </div>

              <div className="pt-3 border-t border-rule text-xs text-[#A8322A] leading-relaxed">
                <span className="font-semibold">Impact: </span>
                {prob.consequence}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 48-Hour Startup Pilot Sprint Package */}
      <section aria-labelledby="sprint-package-h" className="p-6 sm:p-8 rounded-2xl border-2 border-[#5A35C8]/40 bg-[#5A35C8]/5 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#5A35C8]/20">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-[#5A35C8]/40 bg-[#5A35C8]/10 text-xs font-semibold text-[#5A35C8]">
              <Clock size={13} />
              <span>48-hour pilot turnaround</span>
            </div>
            <h2 id="sprint-package-h" className="text-xl sm:text-3xl font-extrabold tracking-tight text-ink m-0">
              48-hour RAG truth and citation audit sprint
            </h2>
            <p className="text-xs sm:text-sm text-secondary m-0">
              A rapid, focused pilot package for AI startups shipping developer assistants, documentation bots, or search retrieval systems.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#5A35C8]/30 bg-sheet shrink-0 text-center sm:text-right">
            <span className="text-[11px] font-semibold text-secondary block">Flat pilot fee</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-ink tabular-nums">$1,500</span>
            <span className="text-[11px] text-emerald-800 dark:text-emerald-400 font-semibold block">100 outputs audited</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-rule bg-sheet space-y-1.5">
            <span className="font-bold text-ink block">100 Test pairs audited</span>
            <p className="text-secondary leading-relaxed m-0">
              Line-by-line verification of model answers against your official ground-truth technical documentation chunks.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rule bg-sheet space-y-1.5">
            <span className="font-bold text-ink block">48-Hour turnaround</span>
            <p className="text-secondary leading-relaxed m-0">
              Delivered within 48 business hours from dataset receipt. Ideal for immediate pre-launch sanity checks.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rule bg-sheet space-y-1.5">
            <span className="font-bold text-ink block">Principal evaluator lead</span>
            <p className="text-secondary leading-relaxed m-0">
              Led directly by founder Ebubechukwu Okeke. Every citation defect verified against source documentation.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rule bg-sheet space-y-1.5">
            <span className="font-bold text-ink block">Actionable audit pack</span>
            <p className="text-secondary leading-relaxed m-0">
              Clean CSV and JSON defect logs, hallucination taxonomy, prompt fixes, and signed verification certificate.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-secondary flex items-center gap-2">
            <ShieldCheck size={15} className="text-[#5A35C8] shrink-0" />
            <span>Mutual NDA signed before data transfer. Your data is never used to train external models.</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-rule bg-sheet hover:bg-surface text-ink text-xs font-semibold transition-colors min-h-[40px]"
            >
              <span>Book 20-minute prep call</span>
              <ArrowRight size={13} />
            </a>
            <Link
              href="/evaluation/scope"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#5A35C8] text-white hover:bg-[#4D2BAE] text-xs font-bold transition-colors min-h-[40px]"
            >
              <span>Scope 48-hour sprint ($1,500)</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Service Cards */}
      <section className="space-y-6">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-semibold text-[#5A35C8]">
            Our Audit Services
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
            Structured audits for production RAG.
          </h2>
          <p className="text-sm text-secondary leading-relaxed">
            Every audit delivers machine-readable findings with stable case IDs, exact documentation citations, and reproducible failure taxonomies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((srv) => (
            <div
              key={srv.title}
              className="p-5 sm:p-6 rounded-xl border border-rule bg-sheet space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-ink leading-snug">
                  {srv.title}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="space-y-4 pt-3 border-t border-rule">
                <div className="text-xs text-secondary">
                  <span className="text-[11px] text-[#5A35C8] font-semibold block mb-1">
                    Deliverable:
                  </span>
                  {srv.deliverable}
                </div>

                <Link
                  href={`/evaluation/services/${srv.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs text-[#5A35C8] hover:underline font-semibold"
                >
                  <span>Explore service spec</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4b. RAG & Citation Audit Pipeline Architecture Diagram */}
      <section className="space-y-4" aria-label="Evaluation pipeline architecture">
        <div className="w-full rounded-2xl overflow-hidden border border-rule bg-sheet shadow-sm">
          <div className="px-4 py-3 bg-elevated/70 border-b border-rule flex items-center justify-between font-mono text-xs text-secondary">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-ink font-semibold">End-to-end RAG verification pipeline</span>
            </div>
            <span className="text-[11px] text-muted hidden sm:inline">Version-locked human audit standard</span>
          </div>
          <div className="p-3 sm:p-5 bg-canvas/40 flex justify-center">
            <img
              src="/images/evaluation/rag-citation-architecture.svg"
              alt="End-to-end RAG verification pipeline architecture diagram"
              className="w-full h-auto rounded-xl border border-rule max-w-[1100px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 5. Interactive Comparison Panel */}
      <section className="space-y-4">
        <InteractiveComparisonPanel />
      </section>

      {/* 6. How a Pilot Runs */}
      <section className="p-6 sm:p-8 rounded-2xl border border-rule bg-sheet space-y-6">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-semibold text-[#5A35C8]">
            Operational Blueprint
          </div>
          <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-ink">
            How a pilot audit runs.
          </h2>
          <p className="text-sm text-secondary leading-relaxed">
            We operate in focused sprints with zero enterprise overhead. You share inputs; we deliver the diagnostic report and clean datasets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-surface border border-rule space-y-2">
            <span className="text-xs text-[#5A35C8] font-semibold block">
              1. Scope &amp; Sample
            </span>
            <h3 className="text-sm font-semibold text-ink">100 to 300 Pairs</h3>
            <p className="text-xs text-secondary leading-relaxed">
              We extract a representative sample of user queries or generate boundary tests across your documentation corpus.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-rule space-y-2">
            <span className="text-xs text-[#5A35C8] font-semibold block">
              2. Rubric Locking
            </span>
            <h3 className="text-sm font-semibold text-ink">Version-Locked Rubric</h3>
            <p className="text-xs text-secondary leading-relaxed">
              We agree on explicit pass/fail standards and negative-constraint refusal rules before checking the first record.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-rule space-y-2">
            <span className="text-xs text-[#5A35C8] font-semibold block">
              3. Human Audit
            </span>
            <h3 className="text-sm font-semibold text-ink">5-Day Turnaround</h3>
            <p className="text-xs text-secondary leading-relaxed">
              Every prompt, completion, and source citation is manually inspected and cross-referenced by domain evaluators.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-rule space-y-2">
            <span className="text-xs text-[#5A35C8] font-semibold block">
              4. Deliverables
            </span>
            <h3 className="text-sm font-semibold text-ink">JSON, CSV &amp; Report</h3>
            <p className="text-xs text-secondary leading-relaxed">
              You receive an executive summary, complete CSV/JSON export logs, and concrete retriever/prompt fixes.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Data Handling & Confidentiality */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="p-6 rounded-2xl border border-rule bg-sheet space-y-3.5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#17663F] text-xs font-semibold">
              <Lock size={15} />
              <span>Confidentiality &amp; Security</span>
            </div>
            <h3 className="text-lg font-bold text-ink">Your data never trains an outside model.</h3>
            <p className="text-xs text-secondary leading-relaxed">
              We never upload client test pairs, proprietary documentation, or query logs to external public LLM APIs. Evaluation happens in secure, ephemeral environments with zero public persistence.
            </p>
          </div>
          <ul className="space-y-1.5 text-xs text-secondary pt-2 border-t border-rule">
            <li>• Standard mutual NDA provided prior to data exchange</li>
            <li>• Encrypted short-lived signed transmission links</li>
            <li>• Complete data erasure after delivery confirmation</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl border border-rule bg-sheet space-y-3.5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#5A35C8] text-xs font-semibold">
              <ShieldCheck size={15} />
              <span>About the Evaluator</span>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-rule shadow-xs shrink-0 bg-surface">
                <Image
                  src="/images/founder/ebube-okeke.jpg"
                  alt="Ebubechukwu Okeke, Principal Evaluator"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-ink m-0">Ebubechukwu Okeke</h3>
                <p className="text-xs text-secondary font-mono m-0 mt-0.5">Principal Evaluator &amp; Founder</p>
              </div>
            </div>
            <p className="text-xs text-secondary leading-relaxed m-0">
              Experienced technical AI evaluator and software engineer. I operate as a solo specialist for preliminary scoping and calibration, bringing in vetted domain reviewers when batch volumes require dual-annotator consensus.
            </p>
          </div>
          <div className="pt-2 border-t border-rule flex items-center justify-between text-xs text-secondary">
            <span>Location: Lagos, Nigeria</span>
            <Link href="/about" className="text-[#5A35C8] hover:underline font-medium">
              Read founder bio →
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Studio FAQs */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-secondary">
            Common questions from technical founders and AI product teams.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-rule bg-sheet p-4 transition-all"
            >
              <summary className="cursor-pointer font-semibold text-xs sm:text-sm text-ink flex items-center justify-between list-none select-none min-h-[44px]">
                <span className="pr-4">{faq.q}</span>
                <ChevronDown className="w-4 h-4 text-secondary shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div className="pt-3 text-xs text-secondary leading-relaxed border-t border-rule mt-3">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* 9. Final CTA Strip */}
      <section className="p-8 sm:p-10 rounded-2xl border border-rule bg-sheet text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-ink">
          Ready to verify your AI assistant&apos;s ground truth?
        </h2>
        <p className="text-sm text-secondary max-w-xl mx-auto leading-relaxed">
          {pilotPriceText}. Book a 20-minute intro call or submit a scope request to receive an official reference ID within seconds.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#5A35C8] text-white font-medium text-xs tracking-normal hover:bg-[#4D2BAE] transition-all shadow-sm min-h-[44px]"
          >
            <span>Book a 20-minute call</span>
            <ArrowRight size={14} />
          </a>
          <Link
            href="/evaluation/scope"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-rule bg-surface text-ink font-medium text-xs tracking-normal hover:border-[#5A35C8] transition-all min-h-[44px]"
          >
            <span>Scope an audit</span>
          </Link>
          <a
            href="/evaluation/sample-audit.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl border border-rule bg-surface text-secondary hover:text-ink text-xs font-medium transition-all min-h-[44px]"
          >
            <span>Download sample PDF</span>
          </a>
        </div>
      </section>
    </div>
  );
}
