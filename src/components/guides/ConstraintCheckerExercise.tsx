'use client';

import React, { useState, useMemo } from 'react';
import { CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { PracticeExercise } from '@/content/guides/types';

interface ConstraintCheckerExerciseProps {
  exercise: PracticeExercise;
}

export function ConstraintCheckerExercise({ exercise }: ConstraintCheckerExerciseProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [rationale, setRationale] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Sentence and word counting logic
  const stats = useMemo(() => {
    const trimmed = rationale.trim();
    if (!trimmed) {
      return { words: 0, sentences: 0 };
    }

    const words = trimmed.split(/\s+/).filter(Boolean).length;
    // Count sentences ending in ., !, or ?
    const sentences = (trimmed.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length;
    // If text exists without terminal punctuation, count it as an in-progress sentence
    const hasUnterminated = /[^.!?\s]+$/.test(trimmed);
    const finalSentences = sentences + (hasUnterminated && sentences === 0 ? 1 : 0);

    return { words, sentences: finalSentences };
  }, [rationale]);

  const { minSentences, maxSentences, instructionText } = exercise.targetConstraint;

  const isWithinLimit = stats.sentences >= minSentences && stats.sentences <= maxSentences;
  const isOverLimit = stats.sentences > maxSentences;
  const isUnderLimit = stats.sentences < minSentences && stats.sentences > 0;

  let constraintStatusText = `${stats.sentences} of ${maxSentences} sentences. Waiting for input.`;
  if (stats.sentences === 0) {
    constraintStatusText = `0 of ${maxSentences} sentences. Type your rationale above.`;
  } else if (isWithinLimit) {
    constraintStatusText = `${stats.sentences} of ${maxSentences} sentences. Within the limit.`;
  } else if (isOverLimit) {
    constraintStatusText = `${stats.sentences} sentences. The limit is ${maxSentences}. Over the limit.`;
  } else if (isUnderLimit) {
    constraintStatusText = `${stats.sentences} of ${maxSentences} sentences. Requires at least ${minSentences} sentences.`;
  }

  return (
    <div className="w-full rounded-xl border border-subtle bg-surface p-5 sm:p-6 space-y-6">
      {/* Exercise Header */}
      <div className="space-y-2 border-b border-subtle pb-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
            Interactive Practice Exercise
          </span>
          <span className="text-[11px] font-mono text-secondary">
            Live Constraint Checker
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-primary">
          {exercise.title}
        </h3>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          {exercise.scenario}
        </p>
      </div>

      {/* The Prompt / Question */}
      <div className="rounded-lg border border-subtle bg-void p-4 space-y-2 font-mono text-xs">
        <div className="text-accent-cyan font-semibold">
          Task prompt:
        </div>
        <div className="text-readable whitespace-pre-wrap leading-relaxed">
          {exercise.prompt}
        </div>
      </div>

      {/* Option Choices */}
      <div className="space-y-3">
        <label className="text-xs font-mono font-semibold text-secondary block">
          Step 1: Select your preferred response
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setSelectedOption('A')}
            className={`p-4 rounded-lg border text-left transition-all ${
              selectedOption === 'A'
                ? 'border-accent-cyan bg-elevated ring-1 ring-accent-cyan'
                : 'border-subtle bg-void hover:border-focus'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold text-accent-cyan">
                {exercise.optionA.label}
              </span>
              <input
                type="radio"
                name={`exercise-${exercise.id}`}
                checked={selectedOption === 'A'}
                onChange={() => setSelectedOption('A')}
                className="accent-accent-cyan cursor-pointer"
              />
            </div>
            <p className="text-xs text-readable leading-relaxed">
              {exercise.optionA.text}
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedOption('B')}
            className={`p-4 rounded-lg border text-left transition-all ${
              selectedOption === 'B'
                ? 'border-accent-cyan bg-elevated ring-1 ring-accent-cyan'
                : 'border-subtle bg-void hover:border-focus'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold text-accent-cyan">
                {exercise.optionB.label}
              </span>
              <input
                type="radio"
                name={`exercise-${exercise.id}`}
                checked={selectedOption === 'B'}
                onChange={() => setSelectedOption('B')}
                className="accent-accent-cyan cursor-pointer"
              />
            </div>
            <p className="text-xs text-readable leading-relaxed">
              {exercise.optionB.text}
            </p>
          </button>
        </div>
      </div>

      {/* Step 2: Rationale Input with Live Constraint Checking */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label
            htmlFor={`rationale-${exercise.id}`}
            className="text-xs font-mono font-semibold text-secondary"
          >
            Step 2: Write your rationale
          </label>
          <span className="text-[11px] font-mono text-accent-cyan">
            Constraint: {instructionText}
          </span>
        </div>

        <textarea
          id={`rationale-${exercise.id}`}
          rows={3}
          value={rationale}
          onChange={(e) => setRationale(e.target.value)}
          placeholder="Write your explanation here..."
          className="w-full rounded-lg border border-subtle bg-void p-3 text-xs sm:text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-focus focus:ring-1 focus:ring-accent-cyan transition-all"
        />

        {/* Live Constraint Checker Feedback Bar */}
        <div
          role="status"
          aria-live="polite"
          className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-mono transition-colors ${
            stats.sentences === 0
              ? 'border-subtle bg-void text-secondary'
              : isWithinLimit
              ? 'border-accent-emerald/30 bg-accent-emerald/10 text-accent-emerald'
              : isOverLimit
              ? 'border-accent-rose/30 bg-accent-rose/10 text-accent-rose'
              : 'border-accent-amber/30 bg-accent-amber/10 text-accent-amber'
          }`}
        >
          <div className="flex items-center gap-2">
            {stats.sentences === 0 ? (
              <HelpCircle size={14} className="text-secondary" />
            ) : isWithinLimit ? (
              <CheckCircle2 size={14} className="text-accent-emerald" />
            ) : (
              <AlertCircle
                size={14}
                className={isOverLimit ? 'text-accent-rose' : 'text-accent-amber'}
              />
            )}
            <span className="font-semibold">{constraintStatusText}</span>
          </div>

          <div className="text-[11px] text-secondary">
            {stats.words} {stats.words === 1 ? 'word' : 'words'}
          </div>
        </div>
      </div>

      {/* Submit / Compare Button */}
      <div>
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={!selectedOption || stats.sentences === 0}
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-accent-cyan/30 bg-accent-cyan text-void font-mono font-bold text-xs hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {submitted ? 'Compare with model answer' : 'Submit practice exercise'}
        </button>
      </div>

      {/* Collapsible Model Answer (<details> fallback for Lite/JS-less environments) */}
      <details
        open={submitted}
        className="rounded-lg border border-subtle bg-void p-4 space-y-3 group"
      >
        <summary className="cursor-pointer text-xs font-mono font-bold text-accent-cyan flex items-center justify-between select-none">
          <span>Model Answer and Lead Evaluator Rationale</span>
          <span className="text-[11px] text-secondary group-open:hidden">
            (Tap to reveal)
          </span>
        </summary>

        <div className="pt-3 border-t border-subtle space-y-3 text-xs leading-relaxed">
          <div className="flex items-center gap-2 font-mono">
            <span className="text-secondary">Preferred Decision:</span>
            <span className="font-bold text-accent-emerald">
              Option {exercise.modelAnswer.preferredOption}
            </span>
          </div>

          <div className="space-y-1">
            <div className="font-mono text-secondary text-[11px]">Evaluator Rationale:</div>
            <p className="text-readable">{exercise.modelAnswer.rationale}</p>
          </div>

          <div className="p-3 rounded-lg border border-subtle bg-surface space-y-1">
            <div className="font-mono text-[11px] font-semibold text-accent-cyan">
              Key audit principle
            </div>
            <p className="text-readable text-[11px]">
              {exercise.modelAnswer.keyAuditPrinciple}
            </p>
          </div>

          <p className="text-[11px] text-secondary font-mono italic">
            Note: This exercise runs locally in your browser. No answers are transmitted or stored.
          </p>
        </div>
      </details>
    </div>
  );
}
