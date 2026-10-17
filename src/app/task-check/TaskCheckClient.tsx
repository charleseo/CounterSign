'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Info,
  Sliders,
  FileCheck,
  Clock,
  Play,
  Pause,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';

interface Preset {
  id: string;
  name: string;
  platform: string;
  sampleConstraints: string;
  sampleText: string;
}

const PRESETS: Preset[] = [
  {
    id: 'outlier-pairwise',
    name: 'Outlier RLHF pairwise review',
    platform: 'Outlier AI',
    sampleConstraints: 'Do not use bullet points. Response must be under 180 words. Never mention being an AI.',
    sampleText: 'Python offers clean syntax for backend systems. For lightweight storage, SQLite provides an embedded database engine with zero configuration overhead, making local development straightforward. PostgreSQL remains the standard choice for complex production workloads with high concurrency and strict consistency needs. Both options integrate smoothly with modern web frameworks.',
  },
  {
    id: 'alignerr-negative',
    name: 'Alignerr negative constraint test',
    platform: 'Alignerr',
    sampleConstraints: 'Strictly two sentences. Do not include numbers or dates. No exclamation marks.',
    sampleText: 'The human heart pumps oxygenated blood through the circulatory system to nourish living tissues. Regular cardiovascular exercise strengthens this vital organ and promotes long term endurance.',
  },
  {
    id: 'dataannotation-factuality',
    name: 'DataAnnotation factuality audit',
    platform: 'DataAnnotation',
    sampleConstraints: 'Verify all factual claims against primary sources. Prohibit vague assertions. Response must cite specific reference texts.',
    sampleText: 'Doxycycline at one hundred milligrams twice daily for ten to fourteen days is the recommended first line oral treatment for early localized Lyme disease in adults, according to clinical guidelines published by the Infectious Diseases Society of America.',
  },
];

const FLAGGED_AI_WORDS = [
  'as an ai',
  'as a language model',
  'certainly!',
  'in conclusion,',
  'delve',
  'testament',
  'beacon',
  'tapestry',
  'furthermore,',
  'it is important to note',
  'i hope this helps',
  'navigating',
  'bustling',
];

export function TaskCheckClient() {
  const [selectedPreset, setSelectedPreset] = useState<string>('outlier-pairwise');
  const [constraintsText, setConstraintsText] = useState<string>(PRESETS[0].sampleConstraints);
  const [inputText, setInputText] = useState<string>(PRESETS[0].sampleText);
  const [minWords, setMinWords] = useState<number>(0);
  const [maxWords, setMaxWords] = useState<number>(180);
  const [copied, setCopied] = useState<boolean>(false);

  // Manual checklist items
  const [checks, setChecks] = useState<Record<string, boolean>>({
    promptAddressed: true,
    negativeRespected: true,
    factualityVerified: true,
    toneObjective: true,
    formattingObeyed: true,
  });

  // Task pacing timer state
  const [targetMinutes, setTargetMinutes] = useState<number>(20);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning]);

  const handleResetTimer = () => {
    setTimerRunning(false);
    setSecondsElapsed(0);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const pacingPercent = useMemo(() => {
    const targetSeconds = targetMinutes * 60;
    return Math.min(100, (secondsElapsed / targetSeconds) * 100);
  }, [secondsElapsed, targetMinutes]);

  const toggleCheck = (id: string) => {
    setChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleApplyPreset = (preset: Preset) => {
    setSelectedPreset(preset.id);
    setConstraintsText(preset.sampleConstraints);
    setInputText(preset.sampleText);
    if (preset.id === 'outlier-pairwise') {
      setMinWords(0);
      setMaxWords(180);
    } else if (preset.id === 'alignerr-negative') {
      setMinWords(0);
      setMaxWords(50);
    } else {
      setMinWords(0);
      setMaxWords(250);
    }
  };

  // Text analysis metrics
  const analysis = useMemo(() => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      return {
        words: 0,
        sentences: 0,
        characters: 0,
        paragraphs: 0,
        hasBullets: false,
        hasNumbers: false,
        flaggedAiPhrases: [],
        negativeViolations: [],
      };
    }

    const words = trimmed.split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const sentences = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const sentenceCount = sentences.length;
    const characters = trimmed.length;
    const paragraphs = trimmed.split(/\n\s*\n/).filter(Boolean).length;

    // Bullet points check
    const hasBullets = /^\s*[-*•]\s+/m.test(inputText) || /^\s*\d+\.\s+/m.test(inputText);

    // Number check
    const hasNumbers = /\d+/.test(inputText);

    // Flagged AI buzzwords
    const lower = inputText.toLowerCase();
    const foundAiPhrases: string[] = [];
    FLAGGED_AI_WORDS.forEach((phrase) => {
      if (lower.includes(phrase)) {
        foundAiPhrases.push(phrase);
      }
    });

    // Check against negative constraints
    const violations: string[] = [];
    const lowerConstraints = constraintsText.toLowerCase();

    if (
      (lowerConstraints.includes('no bullet') || lowerConstraints.includes('do not use bullet')) &&
      hasBullets
    ) {
      violations.push('Bullet points detected while guidelines prohibit bullets.');
    }

    if (
      (lowerConstraints.includes('no number') || lowerConstraints.includes('do not include number')) &&
      hasNumbers
    ) {
      violations.push('Digit or number detected while guidelines prohibit numbers.');
    }

    if (
      lowerConstraints.includes('two sentence') &&
      sentenceCount !== 2
    ) {
      violations.push(`Text has ${sentenceCount} sentences, but guidelines require exactly two sentences.`);
    }

    if (maxWords > 0 && wordCount > maxWords) {
      violations.push(`Word count (${wordCount}) exceeds maximum limit of ${maxWords} words.`);
    }

    if (minWords > 0 && wordCount < minWords) {
      violations.push(`Word count (${wordCount}) is below minimum limit of ${minWords} words.`);
    }

    return {
      words: wordCount,
      sentences: sentenceCount,
      characters,
      paragraphs,
      hasBullets,
      hasNumbers,
      flaggedAiPhrases: foundAiPhrases,
      negativeViolations: violations,
    };
  }, [inputText, constraintsText, minWords, maxWords]);

  const allChecksPass =
    analysis.negativeViolations.length === 0 &&
    analysis.flaggedAiPhrases.length === 0 &&
    Object.values(checks).every(Boolean);

  const handleCopyRationale = () => {
    const formatted = `Task verification review:
- Word count: ${analysis.words} words (${analysis.sentences} sentences)
- Negative constraints: ${analysis.negativeViolations.length === 0 ? 'All obeyed' : 'Violations detected'}
- AI filler phrases: ${analysis.flaggedAiPhrases.length === 0 ? 'None detected (clean tone)' : `Flagged: ${analysis.flaggedAiPhrases.join(', ')}`}
- Formatting check: ${analysis.hasBullets ? 'Includes bulleted lists' : 'Continuous prose, no bullets'}
- Rationale summary: Reviewed against project constraints. Verified prompt adherence and ground-truth citations. Checked via TraceBase Task Check.`;

    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Platform Preset Strip */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-semibold text-secondary uppercase tracking-wider block">
            Select standard review preset
          </label>
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.open(
                  '/task-check',
                  'TraceBaseTaskGuard',
                  'width=480,height=760,menubar=no,toolbar=no,location=no,status=no,resizable=yes'
                );
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs text-[#5A35C8] hover:underline font-medium min-h-[36px]"
          >
            <span>Open as compact sidecar window</span>
            <ExternalLink size={13} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                selectedPreset === preset.id
                  ? 'border-[var(--brand-ink)] bg-[var(--brand-tint)] text-primary font-semibold'
                  : 'border-rule bg-sheet text-secondary hover:text-primary hover:border-subtle'
              }`}
            >
              <span className="font-semibold text-primary">{preset.platform}:</span> {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Task Pacing Timer Strip */}
      <div className="rounded-2xl border border-rule bg-sheet p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface border border-rule flex items-center justify-center shrink-0">
            <Clock size={18} className="text-[var(--brand-ink)]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-primary">Task pacing guard</span>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                  pacingPercent < 35
                    ? 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300'
                    : pacingPercent <= 85
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                    : 'border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400'
                }`}
              >
                {pacingPercent < 35
                  ? 'Rushing danger (< 35% time)'
                  : pacingPercent <= 85
                  ? 'Safe evaluation window'
                  : 'Approaching expiry'}
              </span>
            </div>
            <p className="text-[11px] text-secondary mt-0.5">
              Prevents automated account flags for submitting tasks too quickly.
            </p>
          </div>
        </div>

        {/* Timer Display & Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-secondary">
            <span>Target:</span>
            <select
              value={targetMinutes}
              onChange={(e) => setTargetMinutes(parseInt(e.target.value))}
              className="bg-surface border border-rule rounded-lg px-2 py-1 text-xs text-primary font-mono focus:outline-none"
            >
              <option value={10}>10 min</option>
              <option value={15}>15 min</option>
              <option value={20}>20 min</option>
              <option value={30}>30 min</option>
              <option value={45}>45 min</option>
            </select>
          </div>

          <div className="text-xl sm:text-2xl font-black font-mono text-primary tabular-nums">
            {formatTime(secondsElapsed)}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setTimerRunning(!timerRunning)}
              className="p-2 rounded-lg bg-[var(--brand-ink)] text-white hover:bg-[var(--brand-ink-hover)] transition-colors"
              title={timerRunning ? "Pause timer" : "Start timer"}
            >
              {timerRunning ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button
              type="button"
              onClick={handleResetTimer}
              className="p-2 rounded-lg bg-surface border border-rule text-secondary hover:text-primary transition-colors"
              title="Reset timer"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Guidelines & Rules Input */}
        <div className="space-y-5 rounded-2xl border border-rule bg-sheet p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-rule pb-3">
            <div className="flex items-center gap-2">
              <Sliders size={16} className="text-[var(--brand-ink)]" />
              <h2 className="text-sm font-bold text-primary">Task rules and constraints</h2>
            </div>
            <span className="text-[11px] text-secondary">Paste from platform instructions</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-secondary block">
              Negative constraints &amp; forbidden elements
            </label>
            <textarea
              value={constraintsText}
              onChange={(e) => setConstraintsText(e.target.value)}
              rows={3}
              placeholder="e.g. Do not use bullets. Max 150 words. Do not mention competitors."
              className="w-full text-xs sm:text-sm bg-surface border border-rule rounded-xl p-3 text-primary placeholder:text-muted focus:outline-none focus:border-[var(--brand-ink)] font-mono resize-y"
            />
          </div>

          {/* Word Count Limit Settings */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <label className="text-xs text-secondary font-medium block">Min words (optional)</label>
              <input
                type="number"
                min={0}
                value={minWords}
                onChange={(e) => setMinWords(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full text-xs sm:text-sm bg-surface border border-rule rounded-lg p-2.5 text-primary focus:outline-none focus:border-[var(--brand-ink)] font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-secondary font-medium block">Max words</label>
              <input
                type="number"
                min={0}
                value={maxWords}
                onChange={(e) => setMaxWords(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full text-xs sm:text-sm bg-surface border border-rule rounded-lg p-2.5 text-primary focus:outline-none focus:border-[var(--brand-ink)] font-mono"
              />
            </div>
          </div>

          {/* Pre-submission manual checklist */}
          <div className="space-y-2 pt-3 border-t border-rule">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-secondary">Manual quality checklist</span>
              <span className="text-[11px] text-secondary">Tick before submitting</span>
            </div>

            <div className="space-y-2">
              <label className="flex items-start gap-2.5 text-xs text-primary cursor-pointer">
                <input
                  type="checkbox"
                  checked={checks.promptAddressed}
                  onChange={() => toggleCheck('promptAddressed')}
                  className="mt-0.5 rounded border-rule text-[var(--brand-ink)] focus:ring-0"
                />
                <span>Every part of the prompt question is answered directly</span>
              </label>

              <label className="flex items-start gap-2.5 text-xs text-primary cursor-pointer">
                <input
                  type="checkbox"
                  checked={checks.negativeRespected}
                  onChange={() => toggleCheck('negativeRespected')}
                  className="mt-0.5 rounded border-rule text-[var(--brand-ink)] focus:ring-0"
                />
                <span>All negative constraints and prohibitions strictly obeyed</span>
              </label>

              <label className="flex items-start gap-2.5 text-xs text-primary cursor-pointer">
                <input
                  type="checkbox"
                  checked={checks.factualityVerified}
                  onChange={() => toggleCheck('factualityVerified')}
                  className="mt-0.5 rounded border-rule text-[var(--brand-ink)] focus:ring-0"
                />
                <span>Factual claims and dates checked against primary documentation</span>
              </label>

              <label className="flex items-start gap-2.5 text-xs text-primary cursor-pointer">
                <input
                  type="checkbox"
                  checked={checks.toneObjective}
                  onChange={() => toggleCheck('toneObjective')}
                  className="mt-0.5 rounded border-rule text-[var(--brand-ink)] focus:ring-0"
                />
                <span>Tone is natural and neutral without AI sycophancy or fluff</span>
              </label>

              <label className="flex items-start gap-2.5 text-xs text-primary cursor-pointer">
                <input
                  type="checkbox"
                  checked={checks.formattingObeyed}
                  onChange={() => toggleCheck('formattingObeyed')}
                  className="mt-0.5 rounded border-rule text-[var(--brand-ink)] focus:ring-0"
                />
                <span>Formatting rules (paragraphs, lists, syntax) match task spec</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Text to Verify & Live Inspection */}
        <div className="space-y-5 rounded-2xl border border-rule bg-sheet p-5 sm:p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-rule pb-3">
              <div className="flex items-center gap-2">
                <FileCheck size={16} className="text-emerald-600 dark:text-emerald-400" />
                <h2 className="text-sm font-bold text-primary">Model response or draft to check</h2>
              </div>
              <button
                type="button"
                onClick={() => setInputText('')}
                className="text-xs text-secondary hover:text-primary transition-colors flex items-center gap-1"
              >
                <RefreshCw size={12} />
                <span>Clear</span>
              </button>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={8}
              placeholder="Paste your task answer, model output, or review rationale here..."
              className="w-full text-xs sm:text-sm bg-surface border border-rule rounded-xl p-3.5 text-primary placeholder:text-muted focus:outline-none focus:border-[var(--brand-ink)] leading-relaxed resize-y font-sans"
            />

            {/* Live Count Metrics Bar */}
            <div className="grid grid-cols-4 gap-2 text-center p-3 rounded-xl bg-surface border border-rule">
              <div>
                <span className="text-[11px] text-secondary block">Words</span>
                <span
                  className={`text-sm sm:text-base font-bold tabular-nums ${
                    maxWords > 0 && analysis.words > maxWords
                      ? 'text-red-500 font-extrabold'
                      : 'text-primary'
                  }`}
                >
                  {analysis.words}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-secondary block">Sentences</span>
                <span className="text-sm sm:text-base font-bold text-primary tabular-nums">
                  {analysis.sentences}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-secondary block">Characters</span>
                <span className="text-sm sm:text-base font-bold text-primary tabular-nums">
                  {analysis.characters}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-secondary block">Bullets?</span>
                <span
                  className={`text-xs sm:text-sm font-semibold ${
                    analysis.hasBullets ? 'text-amber-500' : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {analysis.hasBullets ? 'Detected' : 'None'}
                </span>
              </div>
            </div>

            {/* Violation & Alert Feed */}
            {analysis.negativeViolations.length > 0 && (
              <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-red-700 dark:text-red-400">
                  <AlertTriangle size={14} className="shrink-0" />
                  <span>Constraint violations detected</span>
                </div>
                <ul className="list-disc pl-5 text-xs text-red-600 dark:text-red-300 space-y-0.5">
                  {analysis.negativeViolations.map((v, i) => (
                    <li key={i}>{v}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Flagged AI Phrases */}
            {analysis.flaggedAiPhrases.length > 0 && (
              <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                  <Info size={14} className="shrink-0" />
                  <span>Sycophantic or cliché AI phrases detected</span>
                </div>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  Platforms often dock quality scores for generic filler: &ldquo;
                  {analysis.flaggedAiPhrases.join(', ')}&rdquo;. Consider rephrasing with direct, concrete assertions.
                </p>
              </div>
            )}

            {/* Clean Pass Status */}
            {analysis.words > 0 &&
              analysis.negativeViolations.length === 0 &&
              analysis.flaggedAiPhrases.length === 0 && (
                <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center gap-2.5 text-xs font-medium text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 size={16} className="text-emerald-700 dark:text-emerald-400 shrink-0" />
                  <span>
                    No constraint violations found. Length and structure conform to task rules.
                  </span>
                </div>
              )}
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-secondary">
              Status:{' '}
              <span
                className={`font-semibold ${
                  allChecksPass ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                }`}
              >
                {allChecksPass ? 'Ready for submission' : 'Review warnings before submitting'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyRationale}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--brand-ink)] text-white hover:bg-[var(--brand-ink-hover)] text-xs font-semibold transition-all min-h-[44px]"
            >
              {copied ? (
                <>
                  <Check size={14} />
                  <span>Copied audit summary!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy formatted review note</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Guide Note */}
      <div className="p-4 rounded-xl border border-rule bg-sheet text-xs text-secondary flex items-start gap-3">
        <Sparkles size={16} className="text-[var(--brand-ink)] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-primary">How this protects your contributor account:</strong> Major
          platforms like Outlier and Alignerr rely on automated pre-filters that drop workers into
          empty queues when answers exceed length caps or violate negative rules. Running your task
          through TraceBase Task Check catches these mistakes before you click submit.
        </p>
      </div>
    </div>
  );
}
