import type { Metadata } from 'next';
import { FileText, Sparkles } from 'lucide-react';
import { CvBuilderClient } from './CvBuilderClient';

export const metadata: Metadata = {
  title: 'AI Contributor CV Builder | Remote Evaluator Resume | TraceBase',
  description:
    'Create an ATS-friendly single-page resume tailored for AI training platforms like Outlier, Alignerr, and Mercor. Embed your verified TraceBase credential and export to PDF.',
  alternates: {
    canonical: '/cv-builder',
  },
  openGraph: {
    title: 'AI Contributor CV Builder | TraceBase',
    description:
      'Build a verified AI evaluator resume on your phone or computer. Formatted for remote model training platforms.',
    url: '/cv-builder',
    type: 'website',
  },
};

export default function CvBuilderPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="space-y-3 pb-6 border-b border-rule">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule bg-sheet text-xs text-secondary">
          <FileText size={14} className="text-[var(--brand-ink)]" />
          <span>ATS-Compliant Contributor Format</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink">
          AI Contributor CV Builder
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          Create an ATS-optimized, single-page resume built specifically for remote AI evaluation, RLHF annotation, and domain specialist roles. Embed your verified TraceBase credential and print directly to PDF.
        </p>
      </div>

      {/* Interactive Tool */}
      <CvBuilderClient />
    </div>
  );
}
