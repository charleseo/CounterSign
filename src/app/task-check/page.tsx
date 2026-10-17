import type { Metadata } from 'next';
import { ShieldCheck, Sliders } from 'lucide-react';
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
    </div>
  );
}
