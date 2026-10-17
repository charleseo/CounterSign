'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Trophy,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Download,
  ArrowRight,
  Filter,
  BarChart2,
  Info,
  Code,
  FileText,
  Sliders,
} from 'lucide-react';

interface ModelBenchmark {
  rank: number;
  name: string;
  creator: string;
  releaseDate: string;
  overallScore: number;
  negativeConstraints: number;
  citationGrounding: number;
  codeExecutionTruth: number;
  refusalPrecision: number;
  keyStrength: string;
  primaryFailureMode: string;
}

const BENCHMARK_MODELS: ModelBenchmark[] = [
  {
    rank: 1,
    name: 'Claude 3.5 Sonnet',
    creator: 'Anthropic',
    releaseDate: 'October 2024',
    overallScore: 94.6,
    negativeConstraints: 95.2,
    citationGrounding: 96.1,
    codeExecutionTruth: 95.8,
    refusalPrecision: 91.4,
    keyStrength: 'Strict adherence to negative word caps and clean, unprompted formatting.',
    primaryFailureMode: 'Occasional over-refusal on ambiguous security questions.',
  },
  {
    rank: 2,
    name: 'GPT-4o',
    creator: 'OpenAI',
    releaseDate: 'August 2024',
    overallScore: 91.8,
    negativeConstraints: 90.8,
    citationGrounding: 93.4,
    codeExecutionTruth: 93.1,
    refusalPrecision: 89.9,
    keyStrength: 'High conversational naturalness and multi-step reasoning accuracy.',
    primaryFailureMode: 'Slight tendency to exceed strict sentence limits when elaborating.',
  },
  {
    rank: 3,
    name: 'Gemini 2.0 Flash',
    creator: 'Google',
    releaseDate: 'December 2024',
    overallScore: 90.3,
    negativeConstraints: 89.4,
    citationGrounding: 92.5,
    codeExecutionTruth: 91.2,
    refusalPrecision: 88.1,
    keyStrength: 'Rapid response latency and strong multimodal grounding.',
    primaryFailureMode: 'Occasional sycophantic filler phrases ("Certainly! Here is a breakdown").',
  },
  {
    rank: 4,
    name: 'DeepSeek-V3',
    creator: 'DeepSeek',
    releaseDate: 'December 2024',
    overallScore: 89.8,
    negativeConstraints: 88.6,
    citationGrounding: 90.4,
    codeExecutionTruth: 93.9,
    refusalPrecision: 86.3,
    keyStrength: 'Exceptional mathematical derivation and raw algorithmic code generation.',
    primaryFailureMode: 'Higher variance on strict negative constraint obedience.',
  },
  {
    rank: 5,
    name: 'Llama 3.3 70B Instruct',
    creator: 'Meta',
    releaseDate: 'December 2024',
    overallScore: 86.7,
    negativeConstraints: 85.1,
    citationGrounding: 88.2,
    codeExecutionTruth: 89.0,
    refusalPrecision: 84.5,
    keyStrength: 'Open weights availability and strong baseline factual recall.',
    primaryFailureMode: 'Struggles with compound negative rules ("no bullets AND under 80 words").',
  },
];

interface TestCase {
  id: string;
  category: string;
  prompt: string;
  negativeRule: string;
  winnerModel: string;
  failingModel: string;
  auditRationale: string;
}

const AUDITED_TEST_CASES: TestCase[] = [
  {
    id: 'case-1',
    category: 'Negative Constraints',
    prompt: 'Summarize the role of mitochondria in human respiration in exactly two sentences. Do not use the word power or energy.',
    negativeRule: 'Exactly two sentences; zero occurrences of "power" or "energy".',
    winnerModel: 'Claude 3.5 Sonnet (Obeyed all constraints)',
    failingModel: 'Llama 3.3 70B (Used "cellular energy" in sentence two)',
    auditRationale: 'Claude 3.5 used "adenosine triphosphate synthesis" and "vital nourishment" without triggering the banned word regex filter. Llama defaulted to standard textbook phrasing, failing the negative rule.',
  },
  {
    id: 'case-2',
    category: 'Code Grounding',
    prompt: 'Write Python requests code downloading a 50MB file with a 10s connection timeout and 30s read timeout.',
    negativeRule: 'Must use real requests parameters; no hallucinated kwargs.',
    winnerModel: 'DeepSeek-V3 (Used timeout=(10, 30))',
    failingModel: 'Generic Model Baseline (Used connect_timeout=10, read_timeout=30)',
    auditRationale: 'The Python requests library takes a tuple for distinct connection/read timeouts. Inventing keyword arguments causes an immediate runtime TypeError.',
  },
  {
    id: 'case-3',
    category: 'Factuality & Citations',
    prompt: 'What is the recommended IDSA first-line oral treatment for early localized Lyme disease in non-pregnant adults?',
    negativeRule: 'Must cite guideline antibiotic, dosage, and duration accurately.',
    winnerModel: 'GPT-4o (Doxycycline 100mg twice daily for 10-14 days)',
    failingModel: 'Outlier Generic Model (Suggested amoxicillin 21 days as only option)',
    auditRationale: 'IDSA and CDC guidelines designate oral doxycycline for 10 to 14 days as the primary first-line standard. Amoxicillin is a secondary alternative.',
  },
];

export function BenchmarkClient() {
  const [selectedSort, setSelectedSort] = useState<'overall' | 'negative' | 'citation' | 'code'>('overall');
  const [selectedModel, setSelectedModel] = useState<ModelBenchmark>(BENCHMARK_MODELS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const sortedModels = useMemo(() => {
    return [...BENCHMARK_MODELS].sort((a, b) => {
      if (selectedSort === 'negative') return b.negativeConstraints - a.negativeConstraints;
      if (selectedSort === 'citation') return b.citationGrounding - a.citationGrounding;
      if (selectedSort === 'code') return b.codeExecutionTruth - a.codeExecutionTruth;
      return b.overallScore - a.overallScore;
    });
  }, [selectedSort]);

  const filteredCases = useMemo(() => {
    if (selectedCategory === 'All') return AUDITED_TEST_CASES;
    return AUDITED_TEST_CASES.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  const handleDownloadDataset = () => {
    const jsonStr = JSON.stringify(
      {
        benchmark: 'TraceBase Ground-Truth & Negative Constraint Index',
        version: '2026.1',
        methodology: 'Double-blind human verification with Cohen Kappa agreement >= 0.82',
        models: BENCHMARK_MODELS,
        auditedCases: AUDITED_TEST_CASES,
      },
      null,
      2
    );
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tracebase-model-benchmark-2026.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10">
      {/* Control & Filter Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-rule bg-sheet">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-secondary flex items-center gap-1.5 mr-1">
            <Sliders size={13} />
            <span>Sort metric:</span>
          </span>
          <button
            type="button"
            onClick={() => setSelectedSort('overall')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              selectedSort === 'overall'
                ? 'border-[var(--brand-ink)] bg-[var(--brand-tint)] text-primary'
                : 'border-rule bg-surface text-secondary hover:text-primary'
            }`}
          >
            TraceScore (Overall)
          </button>
          <button
            type="button"
            onClick={() => setSelectedSort('negative')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              selectedSort === 'negative'
                ? 'border-[var(--brand-ink)] bg-[var(--brand-tint)] text-primary'
                : 'border-rule bg-surface text-secondary hover:text-primary'
            }`}
          >
            Negative constraints
          </button>
          <button
            type="button"
            onClick={() => setSelectedSort('citation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              selectedSort === 'citation'
                ? 'border-[var(--brand-ink)] bg-[var(--brand-tint)] text-primary'
                : 'border-rule bg-surface text-secondary hover:text-primary'
            }`}
          >
            Citation truth
          </button>
          <button
            type="button"
            onClick={() => setSelectedSort('code')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              selectedSort === 'code'
                ? 'border-[var(--brand-ink)] bg-[var(--brand-tint)] text-primary'
                : 'border-rule bg-surface text-secondary hover:text-primary'
            }`}
          >
            Code syntax validity
          </button>
        </div>

        <button
          type="button"
          onClick={handleDownloadDataset}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface border border-rule text-xs font-semibold text-primary hover:border-subtle transition-colors shrink-0"
        >
          <Download size={13} />
          <span>Download JSON dataset</span>
        </button>
      </div>

      {/* Main Leaderboard Table */}
      <div className="rounded-2xl border border-rule bg-sheet overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-rule bg-surface text-secondary font-semibold">
                <th className="py-3 px-4 w-12 text-center">Rank</th>
                <th className="py-3 px-4">Model &amp; organization</th>
                <th className="py-3 px-3 text-right font-mono tabular-nums">TraceScore</th>
                <th className="py-3 px-3 text-right font-mono tabular-nums">Negative rules</th>
                <th className="py-3 px-3 text-right font-mono tabular-nums">Citations</th>
                <th className="py-3 px-3 text-right font-mono tabular-nums">Code truth</th>
                <th className="py-3 px-4 text-center">Inspection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {sortedModels.map((model, idx) => {
                const isSelected = selectedModel.name === model.name;
                return (
                  <tr
                    key={model.name}
                    className={`transition-colors cursor-pointer ${
                      isSelected ? 'bg-[var(--brand-tint)]' : 'hover:bg-surface/60'
                    }`}
                    onClick={() => setSelectedModel(model)}
                  >
                    <td className="py-3.5 px-4 text-center font-bold text-secondary font-mono">
                      #{idx + 1}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-primary flex items-center gap-2">
                        <span>{model.name}</span>
                        {idx === 0 && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold border border-amber-500/30">
                            <Trophy size={10} />
                            <span>Leader</span>
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-secondary">{model.creator}</span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-black text-primary font-mono tabular-nums">
                      {model.overallScore.toFixed(1)}
                    </td>
                    <td className="py-3.5 px-3 text-right text-primary font-mono tabular-nums">
                      {model.negativeConstraints.toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-3 text-right text-primary font-mono tabular-nums">
                      {model.citationGrounding.toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-3 text-right text-primary font-mono tabular-nums">
                      {model.codeExecutionTruth.toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedModel(model);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                          isSelected
                            ? 'bg-[var(--brand-ink)] text-white border-transparent'
                            : 'border-rule bg-surface text-secondary hover:text-primary'
                        }`}
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Deep-Dive Card */}
      <div className="rounded-2xl border border-[var(--brand-ink)]/30 bg-sheet p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rule pb-3">
          <div>
            <span className="text-xs text-secondary font-mono">Detailed Model Profile</span>
            <h3 className="text-lg font-bold text-primary flex items-center gap-2 mt-0.5">
              <span>{selectedModel.name}</span>
              <span className="text-xs text-secondary font-normal font-sans">
                by {selectedModel.creator} ({selectedModel.releaseDate})
              </span>
            </h3>
          </div>

          <div className="text-right">
            <span className="text-xs text-secondary block">TraceScore:</span>
            <span className="text-2xl font-black text-[var(--brand-ink)] font-mono tabular-nums">
              {selectedModel.overallScore} / 100
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 space-y-1">
            <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 size={13} />
              <span>Key Audited Strength:</span>
            </span>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed m-0">
              {selectedModel.keyStrength}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 space-y-1">
            <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <AlertTriangle size={13} />
              <span>Observed Failure Mode:</span>
            </span>
            <p className="text-amber-700 dark:text-amber-300 leading-relaxed m-0">
              {selectedModel.primaryFailureMode}
            </p>
          </div>
        </div>
      </div>

      {/* Audited Case Study Examples */}
      <div className="rounded-2xl border border-rule bg-sheet p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rule pb-3">
          <div>
            <h3 className="text-base font-bold text-primary">Audited Ground-Truth Test Cases</h3>
            <p className="text-xs text-secondary">
              Real prompts and verified failure modes inspected by TraceBase human evaluators.
            </p>
          </div>

          <div className="flex gap-1.5">
            {['All', 'Negative Constraints', 'Code Grounding', 'Factuality & Citations'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                  selectedCategory === cat
                    ? 'border-[var(--brand-ink)] bg-[var(--brand-tint)] text-primary'
                    : 'border-rule bg-surface text-secondary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredCases.map((tc) => (
            <div key={tc.id} className="p-4 rounded-xl border border-rule bg-surface space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary font-mono">{tc.category}</span>
                <span className="text-[11px] text-secondary">Case ID: {tc.id}</span>
              </div>

              <div className="p-3 rounded-lg bg-sheet border border-rule space-y-1 text-xs font-mono">
                <span className="text-secondary block">Prompt:</span>
                <p className="text-primary m-0">{tc.prompt}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 space-y-0.5">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300">Passing Response:</span>
                  <p className="text-secondary m-0">{tc.winnerModel}</p>
                </div>
                <div className="p-2.5 rounded-lg border border-red-500/20 bg-red-500/5 space-y-0.5">
                  <span className="font-bold text-red-700 dark:text-red-400">Failed Rule:</span>
                  <p className="text-secondary m-0">{tc.failingModel}</p>
                </div>
              </div>

              <p className="text-xs text-secondary leading-relaxed pt-1 border-t border-rule">
                <strong className="text-primary">Human Evaluator Rationale:</strong> {tc.auditRationale}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* B2B Studio Call to Action Banner */}
      <div className="rounded-2xl border border-[var(--brand-ink)]/30 bg-gradient-to-r from-sheet via-surface to-sheet p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[var(--brand-ink)]/30 bg-[var(--brand-tint)] text-[11px] font-bold text-[var(--brand-ink)]">
            <span>Evaluation Studio Service</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-primary">
            Audit your own model or RAG pipeline with TraceBase
          </h3>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed">
            We run high-precision human ground-truth audits, citation verification sprints, and negative constraint benchmarks for AI startups and frontier development teams.
          </p>
        </div>

        <Link
          href="/evaluation/estimator"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--brand-ink)] text-white hover:bg-[var(--brand-ink-hover)] text-xs font-bold transition-all shrink-0 min-h-[44px]"
        >
          <span>Calculate sprint scope</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
