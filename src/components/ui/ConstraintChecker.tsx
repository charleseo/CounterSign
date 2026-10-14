"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";

export interface ConstraintCheckerProps {
  maxSentences?: number;
  minSentences?: number;
  maxWords?: number;
  exercisePrompt?: string;
  modelAnswer?: string;
  rationale?: string;
  className?: string;
}

/**
 * ConstraintChecker (Section 7.7 & 10.11)
 * Interactive practice exercise widget for evaluation guides.
 * Live sentence and word count counter against strict negative constraints.
 * Never communicates limits by color alone (always icon + descriptive text).
 * Model answer cleanly tucked in an accessible <details> element.
 */
export function ConstraintChecker({
  minSentences = 1,
  maxSentences = 3,
  maxWords = 50,
  exercisePrompt = "Write a concise explanation of why LLMs hallucinate dates and numbers in RAG applications without external ground-truth retrieval.",
  modelAnswer = "LLMs predict the most statistically probable tokens based on training corpora rather than querying a verified database. Without external retrieval grounding, numerical values and specific dates are generated without factuality guarantees.",
  rationale = "Exactly 2 sentences and 33 words. Adheres strictly to the negative constraint (under 3 sentences and under 50 words) while stating the causal mechanism accurately.",
  className = "",
}: ConstraintCheckerProps) {
  const [text, setText] = useState("");

  // Sentence count parsing (matches punctuation followed by space or end)
  const sentenceMatches = text.trim() ? text.trim().match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) : [];
  const sentenceCount = sentenceMatches ? sentenceMatches.length : 0;

  // Word count parsing
  const wordMatches = text.trim() ? text.trim().split(/\s+/) : [];
  const wordCount = text.trim() ? wordMatches.length : 0;

  const isSentenceWithin = sentenceCount >= minSentences && sentenceCount <= maxSentences;
  const isWordWithin = wordCount <= maxWords;
  const isAllWithin = isSentenceWithin && isWordWithin;
  const isEmpty = text.trim().length === 0;

  return (
    <div
      className={`rounded-2xl border border-subtle bg-surface p-5 sm:p-6 space-y-4 text-xs font-mono shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between pb-3 border-b border-subtle">
        <h4 className="font-semibold text-primary uppercase tracking-wider text-sm">
          Interactive Evaluation Practice: Negative Constraint Checker
        </h4>
        <span className="text-[11px] text-secondary">Original Exercise</span>
      </div>

      <div className="p-3.5 rounded-lg border border-subtle bg-void space-y-1 font-sans text-xs">
        <span className="text-[11px] text-secondary font-mono font-semibold uppercase tracking-wider block">
          Exercise Prompt:
        </span>
        <p className="text-readable">{exercisePrompt}</p>
        <div className="text-[11px] text-accent-cyan font-mono pt-1">
          Constraint: {minSentences} to {maxSentences} sentences, maximum {maxWords} words.
        </div>
      </div>

      {/* Input Text Area */}
      <div className="space-y-2">
        <label htmlFor="constraint-textarea" className="block text-secondary font-semibold">
          Your Candidate Response:
        </label>
        <textarea
          id="constraint-textarea"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Draft your response here. Watch the live constraint telemetry beneath..."
          className="w-full p-3 rounded-lg border border-subtle bg-void text-primary font-sans text-xs focus:outline-none focus:border-focus"
        />
      </div>

      {/* Live Constraint Telemetry Indicator (Icon + Word, Never Color Alone) */}
      <div className="p-3 rounded-lg border border-subtle bg-void flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-secondary">Sentences: </span>
            <span className="font-semibold text-primary">{sentenceCount}</span>
            <span className="text-secondary"> / {maxSentences}</span>
          </div>

          <div>
            <span className="text-secondary">Words: </span>
            <span className="font-semibold text-primary">{wordCount}</span>
            <span className="text-secondary"> / {maxWords} max</span>
          </div>
        </div>

        <div>
          {isEmpty ? (
            <span className="inline-flex items-center gap-1.5 text-secondary">
              <HelpCircle size={14} aria-hidden="true" />
              <span>Awaiting input</span>
            </span>
          ) : isAllWithin ? (
            <span className="inline-flex items-center gap-1.5 text-[#45F5C5] font-semibold">
              <CheckCircle2 size={14} aria-hidden="true" />
              <span>Within limits ({sentenceCount} sentences, {wordCount} words)</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[#FF6B6B] font-semibold">
              <AlertTriangle size={14} aria-hidden="true" />
              <span>
                {!isSentenceWithin && sentenceCount > maxSentences
                  ? "Over sentence limit"
                  : !isWordWithin
                  ? "Over word limit"
                  : "Under minimum sentence length"}
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Model Answer & Explanation (Progressive Enhancement in <details>) */}
      <details className="p-3.5 rounded-lg border border-subtle bg-void cursor-pointer text-xs">
        <summary className="font-semibold text-primary hover:text-accent-cyan transition-colors">
          Reveal Reference Evaluator Model Answer & Rationale
        </summary>
        <div className="mt-3 pt-3 border-t border-subtle space-y-2 font-sans text-readable">
          <p className="italic text-primary bg-surface p-2.5 rounded border border-subtle">
            &ldquo;{modelAnswer}&rdquo;
          </p>
          <div className="text-[11px] font-mono text-secondary">
            <span className="text-accent-cyan font-semibold">Evaluator Rationale: </span>
            {rationale}
          </div>
        </div>
      </details>
    </div>
  );
}
