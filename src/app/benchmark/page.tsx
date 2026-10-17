import type { Metadata } from 'next';
import { Trophy, BarChart2 } from 'lucide-react';
import { BenchmarkClient } from './BenchmarkClient';

export const metadata: Metadata = {
  title: 'AI Model Benchmark: Negative Constraints & Citation Truth | TraceBase',
  description:
    'Independent human-audited benchmark evaluating Claude 3.5 Sonnet, GPT-4o, Gemini 2.0 Flash, DeepSeek-V3, and Llama 3.3 on strict negative constraint adherence, citation grounding, and code truth.',
  alternates: {
    canonical: '/benchmark',
  },
  openGraph: {
    title: 'AI Model Constraint & Citation Truth Benchmark | TraceBase',
    description:
      'Human ground-truth evaluation metrics measuring frontier and open models on negative rules, citation accuracy, and hallucination rates.',
    url: '/benchmark',
    type: 'website',
  },
};

export default function BenchmarkPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-8">
      {/* Page Header */}
      <div className="space-y-3 pb-6 border-b border-rule">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule bg-sheet text-xs text-secondary font-medium">
          <Trophy size={14} className="text-amber-500" />
          <span>Independent Human-Audited Index</span>
        </div>
        <h1 className="text-2xl sm:text-5xl font-extrabold tracking-tight text-ink">
          AI Model Ground-Truth &amp; Constraint Benchmark
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          Measuring how frontier and open LLMs actually obey strict negative constraints, verify factual citations, and execute clean code. Evaluated with double-blind human verification and reproducible test cases.
        </p>
      </div>

      {/* Benchmark Tool & Leaderboard */}
      <BenchmarkClient />
    </div>
  );
}
