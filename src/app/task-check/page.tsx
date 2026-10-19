import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, Sliders, ArrowRight } from 'lucide-react';
import { TaskCheckClient } from './TaskCheckClient';

export const metadata: Metadata = {
  title: 'Task Pre-Submission Check | AI Contributor Verifier | TraceBase',
  description:
    'Verify AI model evaluation tasks and contributor rationales before submitting. Check word count limits, negative constraints, and formatting rules.',
  alternates: {
    canonical: '/task-check',
  },
  openGraph: {
    title: 'Task Pre-Submission Check | TraceBase',
    description:
      'Audit your AI evaluation tasks against negative constraints, word count caps, and style rules before you click submit.',
    url: '/task-check',
    type: 'website',
  },
};

export default function TaskCheckPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-rule">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule bg-sheet text-xs text-secondary">
          <ShieldCheck size={14} className="text-[var(--brand-ink)]" />
          <span>Pre-Submission Quality Verifier</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink">
          Task Pre-Submission Check
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          Check your AI evaluation tasks, model answers, and review rationales before submitting to Outlier, Alignerr, or DataAnnotation. Verify negative constraints, word counts, and formatting to protect your quality rating.
        </p>
      </div>

      {/* Interactive Tool */}
      <TaskCheckClient />

      {/* Training Simulator Cross-link */}
      <section aria-labelledby="drills-crosslink-h" className="p-5 sm:p-6 rounded-2xl border border-rule bg-sheet flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#5A35C8] uppercase tracking-wider">
              Practice before real tasks
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
              6 interactive drills
            </span>
          </div>
          <h2 id="drills-crosslink-h" className="text-base sm:text-lg font-bold text-ink m-0">
            Take mock evaluation screening tests
          </h2>
          <p className="text-xs text-secondary leading-relaxed m-0">
            Practice spotting chain of thought arithmetic slips, fabricated statutory citations, and sycophantic justifications on our free evaluation simulator.
          </p>
        </div>

        <Link
          href="/training?tab=simulator"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#5A35C8] text-white hover:bg-[#4D2BAE] text-xs font-bold transition-colors min-h-[40px] shrink-0"
        >
          <span>Open mock screening drills</span>
          <ArrowRight size={14} />
        </Link>
      </section>
    </div>
  );
}
