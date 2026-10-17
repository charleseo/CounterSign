'use client';

import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  HelpCircle,
} from 'lucide-react';

interface MockScenario {
  id: string;
  platformFormat: string;
  title: string;
  contextPrompt: string;
  candidateA: string;
  candidateB: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  pitfallTip: string;
}

const MOCK_SCENARIOS: MockScenario[] = [
  {
    id: 'sim-1',
    platformFormat: 'Alignerr & TestGorilla format',
    title: 'Negative constraint & strict sentence count',
    contextPrompt:
      'Prompt: "Explain how photosynthesis works in exactly two sentences. Do not mention the word sun or solar."',
    candidateA:
      'Green plants absorb light energy through chlorophyll pigments located within their leaf cells. This captured energy converts water and carbon dioxide into nourishing glucose while releasing oxygen as a beneficial byproduct.',
    candidateB:
      'Photosynthesis is the natural process where vegetation captures radiant energy to generate nourishment. Solar power drives the conversion of atmospheric carbon and ground moisture into sugars for plant metabolism.',
    question: 'Which candidate obeyed all constraints, and why?',
    options: [
      {
        id: 'opt-a',
        text: 'Candidate A is superior because it strictly obeyed the two-sentence limit and did not use the forbidden words "sun" or "solar".',
        isCorrect: true,
        explanation:
          'Candidate A followed all negative constraints. Candidate B used the forbidden word "solar" in sentence two, which triggers an automatic failure on TestGorilla/Alignerr negative constraint tests.',
      },
      {
        id: 'opt-b',
        text: 'Candidate B is superior because "radiant energy" is a more sophisticated scientific phrase.',
        isCorrect: false,
        explanation:
          'Style never overrides negative constraints. Candidate B used the word "solar", which was explicitly forbidden.',
      },
      {
        id: 'opt-c',
        text: 'Both candidates failed because neither defined the chemical formula for glucose.',
        isCorrect: false,
        explanation:
          'The prompt did not request chemical formulas. Hallucinating unrequested requirements is a common evaluator trap.',
      },
    ],
    pitfallTip:
      'TestGorilla and platform pre-filters use automated regex scanners for forbidden words. A single mention of a banned word causes an immediate 0 score.',
  },
  {
    id: 'sim-2',
    platformFormat: 'Outlier RLHF pairwise format',
    title: 'Code citation & hallucinated library parameters',
    contextPrompt:
      'Prompt: "Write Python code using requests to download a file with a 10-second connection timeout."',
    candidateA:
      'import requests\nresponse = requests.get("https://example.com/file.zip", timeout=(10, 30))\nwith open("file.zip", "wb") as f:\n    f.write(response.content)',
    candidateB:
      'import requests\nresponse = requests.get("https://example.com/file.zip", connect_timeout=10)\nwith open("file.zip", "wb") as f:\n    f.write(response.content)',
    question: 'How should you evaluate Candidate B?',
    options: [
      {
        id: 'opt-2a',
        text: 'Candidate B has a hallucinated parameter (connect_timeout does not exist in requests.get; it uses a tuple or single timeout float).',
        isCorrect: true,
        explanation:
          'The requests library does not take "connect_timeout". It accepts a tuple `timeout=(connect_timeout, read_timeout)`. Candidate B will throw a TypeError at runtime.',
      },
      {
        id: 'opt-2b',
        text: 'Candidate B is fine because connect_timeout is a standard HTTP header.',
        isCorrect: false,
        explanation:
          'In requests, parameters must match the actual library API signature. Guessing parameters is a critical code hallucination.',
      },
      {
        id: 'opt-2c',
        text: 'Both are equally valid Python syntax.',
        isCorrect: false,
        explanation:
          'Passing an invalid keyword argument causes Python code to crash immediately.',
      },
    ],
    pitfallTip:
      'On coding evaluation projects, you must mentally or locally execute code calls. Hallucinated parameters in popular packages (pandas, requests, torch) are the #1 screening test fail point.',
  },
  {
    id: 'sim-3',
    platformFormat: 'DataAnnotation Tech factuality format',
    title: 'Biomedical ground-truth fact verification',
    contextPrompt:
      'Prompt: "What is the CDC and IDSA first-line oral antibiotic recommended for early localized Lyme disease?"',
    candidateA:
      'Doxycycline (100 mg orally twice daily for 10 to 14 days) is the recommended first-line agent for early localized Lyme disease.',
    candidateB:
      'Ciprofloxacin (500 mg orally twice daily for 21 days) is the first-line oral antibiotic for early localized Lyme disease.',
    question: 'What is the correct factual determination?',
    options: [
      {
        id: 'opt-3a',
        text: 'Candidate A is factually accurate per IDSA guidelines. Candidate B suggests a fluoroquinolone that is not recommended for Lyme disease.',
        isCorrect: true,
        explanation:
          'Candidate B hallucinates an inappropriate antibiotic class. Ciprofloxacin has no established efficacy for Borrelia burgdorferi.',
      },
      {
        id: 'opt-3b',
        text: 'Candidate B is correct because 21 days is a safer course of treatment.',
        isCorrect: false,
        explanation:
          'Longer courses of unindicated antibiotics cause severe drug toxicity without clinical benefit.',
      },
      {
        id: 'opt-3c',
        text: 'Neither is correct; Lyme disease is always treated with intravenous penicillin.',
        isCorrect: false,
        explanation:
          'Early localized Lyme disease is treated with oral antibiotics, primarily doxycycline, amoxicillin, or cefuroxime.',
      },
    ],
    pitfallTip:
      'Never rely on intuition for medical or legal claims. Look up the exact governing clinical guideline before rating.',
  },
];

export function AssessmentSimulator() {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(300); // 5 mins
  const [timerActive, setTimerActive] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (timerActive && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timerActive, secondsRemaining]);

  const currentScenario = MOCK_SCENARIOS[currentScenarioIndex];
  const selectedOptionId = selectedAnswers[currentScenario.id];

  const handleSelect = (optionId: string) => {
    if (showExplanation) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentScenario.id]: optionId }));
    if (!timerActive && secondsRemaining > 0) {
      setTimerActive(true);
    }
  };

  const handleReveal = () => {
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentScenarioIndex < MOCK_SCENARIOS.length - 1) {
      setCurrentScenarioIndex((prev) => prev + 1);
    } else {
      setTimerActive(false);
    }
  };

  const handleReset = () => {
    setCurrentScenarioIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setSecondsRemaining(300);
    setTimerActive(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const isLast = currentScenarioIndex === MOCK_SCENARIOS.length - 1;

  return (
    <div className="space-y-6">
      {/* Simulator Control Header */}
      <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--brand-tint)] text-[var(--brand-ink)] border border-[var(--brand-ink)]/30">
              {currentScenario.platformFormat}
            </span>
            <span className="text-xs text-secondary">
              Case {currentScenarioIndex + 1} of {MOCK_SCENARIOS.length}
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-primary">
            {currentScenario.title}
          </h2>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-rule font-mono text-xs">
            <Clock size={14} className={secondsRemaining < 60 ? 'text-red-500' : 'text-secondary'} />
            <span className={secondsRemaining < 60 ? 'text-red-500 font-bold' : 'text-primary'}>
              {formatTime(secondsRemaining)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="p-2 rounded-xl bg-surface border border-rule text-secondary hover:text-primary transition-colors"
            title="Reset simulation"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Scenario Content: Prompt & Candidates */}
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-surface border border-rule space-y-1.5">
          <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider block">
            Test Prompt &amp; Task Guidelines
          </span>
          <p className="text-xs sm:text-sm text-primary font-mono leading-relaxed">
            {currentScenario.contextPrompt}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rule bg-sheet space-y-2">
            <span className="text-xs font-bold text-primary block">Candidate Response A</span>
            <p className="text-xs text-secondary leading-relaxed font-sans whitespace-pre-wrap">
              {currentScenario.candidateA}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rule bg-sheet space-y-2">
            <span className="text-xs font-bold text-primary block">Candidate Response B</span>
            <p className="text-xs text-secondary leading-relaxed font-sans whitespace-pre-wrap">
              {currentScenario.candidateB}
            </p>
          </div>
        </div>
      </div>

      {/* Question & Options */}
      <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-6 space-y-4">
        <h3 className="text-sm font-bold text-primary">{currentScenario.question}</h3>

        <div className="space-y-2.5">
          {currentScenario.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            let optionStyles = 'border-rule bg-surface text-secondary hover:text-primary';

            if (showExplanation) {
              if (opt.isCorrect) {
                optionStyles = 'border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-semibold';
              } else if (isSelected && !opt.isCorrect) {
                optionStyles = 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-400';
              }
            } else if (isSelected) {
              optionStyles = 'border-[var(--brand-ink)] bg-[var(--brand-tint)] text-primary font-semibold';
            }

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt.id)}
                className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyles}`}
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 text-xs mt-0.5">
                  {showExplanation && opt.isCorrect ? (
                    <Check size={12} />
                  ) : isSelected ? (
                    '●'
                  ) : (
                    ''
                  )}
                </span>
                <span className="flex-1 leading-relaxed">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation & Pitfall Box */}
        {showExplanation && (
          <div className="p-4 rounded-xl border border-rule bg-surface space-y-3 animate-in fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold text-primary block">Official Assessment Rubric:</span>
              <p className="text-xs text-secondary leading-relaxed">
                {currentScenario.options.find((o) => o.isCorrect)?.explanation}
              </p>
            </div>

            <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300">
              <AlertTriangle size={15} className="shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Platform screening tip:</strong>
                <span>{currentScenario.pitfallTip}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Row */}
        <div className="pt-3 border-t border-rule flex items-center justify-between">
          <span className="text-xs text-secondary">
            {selectedOptionId ? 'Answer selected' : 'Choose an answer to continue'}
          </span>

          <div className="flex items-center gap-2">
            {!showExplanation ? (
              <button
                type="button"
                disabled={!selectedOptionId}
                onClick={handleReveal}
                className="px-4 py-2 rounded-xl bg-[var(--brand-ink)] text-white hover:bg-[var(--brand-ink-hover)] text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all min-h-[40px]"
              >
                Check my evaluation
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-primary text-canvas hover:opacity-90 text-xs font-semibold transition-all min-h-[40px] flex items-center gap-1.5"
              >
                <span>{isLast ? 'Complete practice simulation' : 'Next scenario'}</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
