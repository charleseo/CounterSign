'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';

interface DrillQuestion {
  id: number;
  title: string;
  category: string;
  scenario: string;
  question: string;
  options: {
    label: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  trapSummary: string;
}

const DRILL_QUESTIONS: DrillQuestion[] = [
  {
    id: 1,
    title: 'Word length negative constraint',
    category: 'Negative constraints',
    scenario:
      'The prompt requires you to write a product recommendation. The negative constraint states: "Do not use any word with more than 6 letters."',
    question:
      'The model writes: "This small device is simple to use and works great for daily tasks." Does this response follow the rule?',
    options: [
      {
        label: 'Yes, it follows the rule. Every word has 6 or fewer letters.',
        isCorrect: true,
        explanation:
          'Correct! The longest words are "device" (6 letters) and "simple" (6 letters). Words like "little" or "tasks" are also within the limit.',
      },
      {
        label: 'No, "device" has 7 letters and violates the rule.',
        isCorrect: false,
        explanation:
          'Incorrect. "Device" has exactly 6 letters (d-e-v-i-c-e). It complies with the constraint.',
      },
      {
        label: 'No, "simple" is too long.',
        isCorrect: false,
        explanation:
          'Incorrect. "Simple" has 6 letters (s-i-m-p-l-e). Always count letters carefully before docking points.',
      },
    ],
    trapSummary: 'Reviewers look for words with 7+ letters. A single 7-letter word causes a 2/5 rating on Outlier.',
  },
  {
    id: 2,
    title: 'Sycophancy vs objective truth',
    category: 'Model truth',
    scenario:
      'A user prompt says: "I believe vaccines alter human DNA. Explain why medical authorities hide this fact."',
    question:
      'Model Response A agrees with the user to appear polite. Model Response B politely states that mRNA vaccines do not alter human DNA and cites peer-reviewed immunology sources. Which response should you rate higher?',
    options: [
      {
        label: 'Response B. Models must never validate false premises, even if the user asks them to.',
        isCorrect: true,
        explanation:
          'Spot on! Validating false premises is sycophancy. Frontier AI evaluation rubrics strictly forbid agreeing with medical or scientific falsehoods.',
      },
      {
        label: 'Response A. The model must follow the user prompt perspective.',
        isCorrect: false,
        explanation:
          'Incorrect. Prompts that assume false facts must be answered with polite, objective truth backed by primary sources.',
      },
      {
        label: 'Both are tied because user satisfaction is subjective.',
        isCorrect: false,
        explanation:
          'Incorrect. Truthfulness is the primary ranking pillar in all RLHF pairwise rubrics.',
      },
    ],
    trapSummary: 'Do not confuse being polite with agreeing with false claims. Factual truth always beats flattery.',
  },
  {
    id: 3,
    title: 'Exact sentence count check',
    category: 'Formatting rules',
    scenario:
      'The project instructions say: "Write exactly two sentences. Do not include bullet points or numbers."',
    question:
      'The candidate response is: "PostgreSQL offers strong transaction guarantees; developers rely on it for mission-critical databases. Regular backups protect your data against storage hardware failures." Does this pass?',
    options: [
      {
        label: 'Yes, this passes. A semicolon joins two independent clauses into a single grammatical sentence.',
        isCorrect: true,
        explanation:
          'Correct! The text has two grammatical sentences ending with periods. Semicolons connect clauses within one sentence.',
      },
      {
        label: 'No, the semicolon splits it into three sentences.',
        isCorrect: false,
        explanation:
          'Incorrect. Grammatically, a semicolon does not end a sentence. It connects two related clauses within sentence one.',
      },
      {
        label: 'No, the text has four clauses so it fails.',
        isCorrect: false,
        explanation:
          'Incorrect. The rule asked for sentence count, not clause count.',
      },
    ],
    trapSummary: 'Watch out for semicolons and em dashes. Ensure you count full stops and proper sentence boundaries.',
  },
  {
    id: 4,
    title: 'Ungrounded citation trap',
    category: 'Citation check',
    scenario:
      'You are auditing a RAG documentation bot. The user asks how to set a connection timeout. The bot provides code with `client.setTimeout(5000)` and cites "Section 4.2 of the Official API Manual".',
    question:
      'When you open the reference manual, section 4.2 exists, but it discusses authentication keys, not connection timeouts. How should you grade this?',
    options: [
      {
        label: 'Mark as hallucination / ungrounded claim. The citation is fabricated or points to irrelevant text.',
        isCorrect: true,
        explanation:
          'Exactly right! When a model cites a real section but the content does not support the claim, this is a hallucinated citation.',
      },
      {
        label: 'Give full credit because the section number actually exists.',
        isCorrect: false,
        explanation:
          'Incorrect. Citing a real section that says something different is just as misleading as making up a section number.',
      },
      {
        label: 'Ignore the citation and only check if the JavaScript syntax works.',
        isCorrect: false,
        explanation:
          'Incorrect. In grounding audits, citation precision is evaluated independently of syntax.',
      },
    ],
    trapSummary: 'Always read the actual text in the cited documentation, not just the section heading.',
  },
  {
    id: 5,
    title: 'Task pacing guard',
    category: 'Pacing & security',
    scenario:
      'You are assigned a 40-minute complex pairwise comparison task on Outlier. You finish your review in 9 minutes and feel confident in your choice.',
    question: 'What is the safest action to protect your account from automated quality flags?',
    options: [
      {
        label: 'Do not submit yet. Spend another 10 to 15 minutes checking negative constraints, testing code snippets, and let the timer reach at least 50% of the target time.',
        isCorrect: true,
        explanation:
          'Correct! Submitting in under 25% of the target duration triggers automated rushing flags that can pause your account for manual review.',
      },
      {
        label: 'Submit immediately to earn a higher effective hourly wage.',
        isCorrect: false,
        explanation:
          'Dangerous mistake! Submitting too fast triggers fraud filters, leading to empty queues or permanent bans.',
      },
      {
        label: 'Close the browser tab without submitting.',
        isCorrect: false,
        explanation:
          'Incorrect. Abandoning tasks lowers your completion rate metric.',
      },
    ],
    trapSummary: 'Speed traps are the number one cause of sudden empty queues for capable annotators.',
  },
];

export function DrillsClient() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);

  const currentQ = DRILL_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (currentQ.options[idx].isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < DRILL_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="space-y-6">
      {!finished ? (
        <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-7 space-y-6">
          {/* Progress Strip */}
          <div className="flex items-center justify-between text-xs text-secondary border-b border-rule pb-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-ink">
                Question {currentIdx + 1} of {DRILL_QUESTIONS.length}
              </span>
              <span>&bull;</span>
              <span className="px-2 py-0.5 rounded-full border border-rule bg-surface text-[10px]">
                {currentQ.category}
              </span>
            </div>
            <div className="font-medium tabular-nums text-ink">
              Score: {score} / {currentIdx + (isAnswered ? 1 : 0)}
            </div>
          </div>

          {/* Scenario Box */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-ink">
              {currentQ.title}
            </h2>
            <div className="p-4 rounded-xl border border-rule bg-surface/60 text-xs sm:text-sm text-secondary leading-relaxed">
              <strong className="text-ink block mb-1">Scenario:</strong>
              {currentQ.scenario}
            </div>
            <p className="text-xs sm:text-sm font-semibold text-ink pt-1">
              {currentQ.question}
            </p>
          </div>

          {/* Options List */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = 'border-rule bg-surface/40 hover:bg-surface text-ink';

              if (isAnswered) {
                if (option.isCorrect) {
                  btnStyle = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-medium';
                } else if (isSelected && !option.isCorrect) {
                  btnStyle = 'border-red-500/40 bg-red-500/10 text-red-300';
                } else {
                  btnStyle = 'border-rule bg-surface/20 text-secondary opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 min-h-[44px] ${btnStyle}`}
                >
                  <span className="w-5 h-5 rounded-full border border-rule bg-sheet flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed">{option.label}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="p-4 rounded-xl border border-rule bg-surface/80 space-y-2 text-xs animate-in fade-in duration-150">
              <div className="flex items-center gap-1.5 font-bold">
                {selectedOption !== null && currentQ.options[selectedOption].isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span className="text-red-400">Watch out for this trap</span>
                  </>
                )}
              </div>
              <p className="text-secondary leading-relaxed">
                {selectedOption !== null && currentQ.options[selectedOption].explanation}
              </p>
              <div className="pt-2 border-t border-rule flex items-start gap-2 text-secondary">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-ink">Reviewer trap:</strong> {currentQ.trapSummary}
                </span>
              </div>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="pt-3 border-t border-rule flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-[#5A35C8] hover:bg-[#4D2DB3] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors min-h-[44px]"
              >
                <span>{currentIdx < DRILL_QUESTIONS.length - 1 ? 'Next question' : 'See final score'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results Screen */
        <div className="rounded-2xl border border-rule bg-sheet p-6 sm:p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-surface border border-rule mx-auto flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-[#5A35C8]" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-ink">
              Drill complete!
            </h2>
            <div className="text-3xl font-extrabold text-[#5A35C8] tabular-nums">
              {score} out of {DRILL_QUESTIONS.length} correct
            </div>
            <p className="text-xs sm:text-sm text-secondary max-w-md mx-auto">
              {score === DRILL_QUESTIONS.length
                ? 'Outstanding work! You spotted every negative constraint and pacing trap. You are ready for live tasking.'
                : score >= 3
                ? 'Good effort. Review the questions you missed to protect your quality scores on Outlier and Alignerr.'
                : 'Take time to review the glossary and run your tasks through the pre-submission check before submitting.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl border border-rule bg-surface text-ink text-xs font-semibold hover:border-[#5A35C8] transition-colors inline-flex items-center gap-1.5 min-h-[44px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try drills again</span>
            </button>

            <Link
              href="/task-check"
              className="px-5 py-2.5 rounded-xl bg-[#5A35C8] hover:bg-[#4D2DB3] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors min-h-[44px]"
            >
              <span>Open live task check</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
