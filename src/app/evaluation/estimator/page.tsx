import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calculator } from 'lucide-react';
import { StudioSprintEstimator } from '@/components/evaluation/StudioSprintEstimator';

export const metadata: Metadata = {
  title: 'Evaluation Sprint Estimator | AI Teams & Model Labs | TraceBase',
  description:
    'Calculate reviewer capacity, timeline SLAs, and statistical rigor targets for your AI evaluation sprint. Self-serve scope estimator for engineering teams.',
  alternates: {
    canonical: '/evaluation/estimator',
  },
  openGraph: {
    title: 'Evaluation Sprint Estimator | TraceBase Studio',
    description:
      'Estimate reviewer capacity, Cohen’s kappa benchmarks, and turn-around times for AI ground-truth audits.',
    url: '/evaluation/estimator',
    type: 'website',
  },
};

export default function EstimatorPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Back Link */}
      <div>
        <Link
          href="/evaluation"
          className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-[var(--brand-ink)] font-medium transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Evaluation Studio</span>
        </Link>
      </div>

      {/* Interactive Estimator */}
      <StudioSprintEstimator />
    </div>
  );
}
