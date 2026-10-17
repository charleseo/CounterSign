'use client';

import React, { useState } from 'react';
import {
  SANDBOX_SCENARIOS,
  SandboxScenario,
} from '@/lib/training/courseData';
import {
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  HelpCircle,
  FileText,
  Sliders,
} from 'lucide-react';

export function EvaluationSandbox() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const scenario = SANDBOX_SCENARIOS[scenarioIndex];

  const [selectedVerdict, setSelectedVerdict] = useState<'model_a' | 'model_b' | 'equal' | null>(null);
  const [selectedFlaws, setSelectedFlaws] = useState<string[]>([]);
  const [justification, setJustification] = useState('');
  const [feedbackRevealed, setFeedbackRevealed] = useState(false);

  const handleToggleFlaw = (flawId: string) => {
    setSelectedFlaws((prev) =>
      prev.includes(flawId) ? prev.filter((id) => id !== flawId) : [...prev, flawId]
    );
  };

  const handleCheckEvaluation = () => {
    if (!selectedVerdict) return;
    setFeedbackRevealed(true);
  };

  const handleReset = () => {
    setSelectedVerdict(null);
    setSelectedFlaws([]);
    setJustification('');
    setFeedbackRevealed(false);
  };

  const handleNextScenario = () => {
    handleReset();
    setScenarioIndex((prev) => (prev + 1) % SANDBOX_SCENARIOS.length);
  };

  const isVerdictCorrect = selectedVerdict === scenario.idealVerdict;

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      {/* Scenario Header & Navigation Tabs */}
      <div className="rounded-2xl border border-subtle bg-surface p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-subtle">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[var(--brand-ink)]/15 text-[var(--brand-ink)] border border-[var(--brand-ink)]/30">
                {scenario.category}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-sheet border border-rule text-secondary">
                {scenario.difficulty}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight mt-2 mb-0">
              {scenario.title}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0">
            {SANDBOX_SCENARIOS.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  handleReset();
                  setScenarioIndex(idx);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer min-h-[38px] ${
                  scenarioIndex === idx
                    ? 'bg-[var(--brand-ink)] text-white'
                    : 'border border-rule bg-sheet text-secondary hover:text-ink'
                }`}
              >
                Case {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* User Prompt */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
            <HelpCircle size={14} className="text-[var(--brand-ink)]" />
            <span>User prompt and constraints</span>
          </div>
          <div className="p-3.5 rounded-xl border border-rule bg-sheet text-xs sm:text-sm font-medium text-ink leading-relaxed">
            {scenario.userPrompt}
          </div>
        </div>

        {/* Ground Truth Reference */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
            <FileText size={14} className="text-teal-400" />
            <span>Ground truth documentation excerpt</span>
          </div>
          <div className="p-3.5 rounded-xl border border-teal-500/20 bg-teal-500/5 text-xs sm:text-sm text-readable leading-relaxed">
            {scenario.groundTruthText}
          </div>
        </div>
      </div>

      {/* Side-by-Side Model Responses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Model A */}
        <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-6 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-subtle">
              <span className="font-bold text-sm text-ink">{scenario.modelA.label}</span>
              <span className="text-[11px] font-medium text-muted">Response Candidate A</span>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-ink leading-relaxed p-3.5 rounded-xl border border-subtle bg-surface">
              {scenario.modelA.text}
            </pre>
          </div>
          <button
            type="button"
            onClick={() => setSelectedVerdict('model_a')}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[44px] ${
              selectedVerdict === 'model_a'
                ? 'bg-[var(--brand-ink)] text-white shadow-md'
                : 'border border-rule bg-surface text-ink hover:border-[var(--brand-ink)]'
            }`}
          >
            {selectedVerdict === 'model_a' ? '✓ Selected: Model A is better' : 'Select Model A as better'}
          </button>
        </div>

        {/* Model B */}
        <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-6 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-subtle">
              <span className="font-bold text-sm text-ink">{scenario.modelB.label}</span>
              <span className="text-[11px] font-medium text-muted">Response Candidate B</span>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-ink leading-relaxed p-3.5 rounded-xl border border-subtle bg-surface">
              {scenario.modelB.text}
            </pre>
          </div>
          <button
            type="button"
            onClick={() => setSelectedVerdict('model_b')}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[44px] ${
              selectedVerdict === 'model_b'
                ? 'bg-[var(--brand-ink)] text-white shadow-md'
                : 'border border-rule bg-surface text-ink hover:border-[var(--brand-ink)]'
            }`}
          >
            {selectedVerdict === 'model_b' ? '✓ Selected: Model B is better' : 'Select Model B as better'}
          </button>
        </div>
      </div>

      {/* Flaw Spotting & Evaluation Checklist */}
      <div className="rounded-2xl border border-rule bg-sheet p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-subtle">
          <div className="flex items-center gap-2">
            <Sliders size={15} className="text-[var(--brand-ink)]" />
            <span className="text-sm font-bold text-ink">Spotted flaws and rubric flags</span>
          </div>
          <span className="text-xs text-secondary font-medium">Select any flaws you detected</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {scenario.flawChecklist.map((flaw) => {
            const isChecked = selectedFlaws.includes(flaw.id);
            return (
              <label
                key={flaw.id}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  isChecked
                    ? 'border-[var(--brand-ink)] bg-[var(--brand-ink)]/10 text-ink'
                    : 'border-subtle bg-surface text-secondary hover:text-ink hover:border-rule'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggleFlaw(flaw.id)}
                  className="mt-0.5 rounded border-rule text-[var(--brand-ink)] focus:ring-[var(--brand-ink)]"
                />
                <span className="text-xs font-medium leading-snug">{flaw.label}</span>
              </label>
            );
          })}
        </div>

        {/* Written Justification (Practice) */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-ink">Evaluator rationale justification</span>
            <span className="text-secondary font-mono">
              {justification.trim() ? `${justification.trim().split(/\s+/).length} words` : '0 words'}
            </span>
          </div>
          <textarea
            rows={3}
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            placeholder="Write your explanation citing specific excerpts (e.g. Model B hallucinates non-existent function purgeTag...)"
            className="w-full rounded-xl border border-rule bg-surface p-3 text-xs sm:text-sm text-ink placeholder:text-muted focus:outline-none focus:border-[var(--brand-ink)]"
          />
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-secondary hover:text-ink transition-colors cursor-pointer min-h-[44px]"
          >
            <RotateCcw size={13} />
            <span>Reset evaluation</span>
          </button>

          <button
            type="button"
            onClick={handleCheckEvaluation}
            disabled={!selectedVerdict}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px] cursor-pointer ${
              selectedVerdict
                ? 'bg-[var(--brand-ink)] text-white hover:opacity-90 shadow-md'
                : 'bg-subtle text-muted cursor-not-allowed border border-rule'
            }`}
          >
            <Sparkles size={14} />
            <span>Check my evaluation</span>
          </button>
        </div>
      </div>

      {/* REVEALED INSTANT RUBRIC FEEDBACK */}
      {feedbackRevealed && (
        <div className="rounded-2xl border-2 border-[var(--brand-ink)] bg-sheet p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-subtle">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  isVerdictCorrect
                    ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30'
                    : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                }`}
              >
                {isVerdictCorrect ? <CheckCircle2 size={22} /> : <AlertTriangle size={22} />}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-ink m-0">
                  {isVerdictCorrect
                    ? 'Evaluation calibrated accurately'
                    : 'Evaluation requires calibration'}
                </h3>
                <p className="text-xs text-secondary m-0 mt-0.5">
                  Official verdict:{' '}
                  <strong className="text-ink font-semibold">
                    {scenario.idealVerdict === 'model_a'
                      ? 'Model A is much better'
                      : scenario.idealVerdict === 'model_b'
                      ? 'Model B is much better'
                      : 'About equal'}
                  </strong>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextScenario}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-rule hover:border-[var(--brand-ink)] text-xs font-bold text-ink transition-colors cursor-pointer min-h-[44px]"
            >
              <span>Next practice case</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Rubric Breakdown Grid */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-ink uppercase tracking-wide block">
              Rubric breakdown and scoring
            </span>
            <div className="divide-y divide-subtle border border-rule rounded-xl overflow-hidden bg-surface">
              {scenario.rubricBreakdown.map((r, idx) => (
                <div key={idx} className="p-4 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-ink">{r.criterion}</span>
                    <div className="flex items-center gap-3 text-[11px] tabular-nums font-semibold">
                      <span className="text-teal-400">Model A: {r.modelAScore}/5</span>
                      <span className="text-secondary">&bull;</span>
                      <span className="text-purple-400">Model B: {r.modelBScore}/5</span>
                    </div>
                  </div>
                  <p className="text-secondary m-0 leading-relaxed">{r.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Teaching Note */}
          <div className="p-4 rounded-xl border border-rule bg-surface/60 space-y-1 text-xs">
            <span className="font-bold text-[var(--brand-ink)] block">
              Frontier evaluation guideline tip
            </span>
            <p className="text-readable m-0 leading-relaxed">{scenario.teachingNote}</p>
          </div>
        </div>
      )}
    </div>
  );
}
