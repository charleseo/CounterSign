"use client";

import React, { useState } from "react";
import Link from "next/link";

import { useSelectedCountry } from "@/components/ui/CountrySelector";

interface QuestionItem {
  id: string;
  text: string;
}

export function ScamCheckTeaser() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const countryCode = useSelectedCountry();

  let idQuestionText = "Did they ask for your SSN, National Insurance number or SIN, bank login or a card code?";
  let idWarningText = "Do not pay, and do not share your SSN, SIN, National Insurance or government ID numbers. Send the offer to us.";

  if (countryCode === "NG") {
    idQuestionText = "Did they ask for your BVN, bank login or a card code?";
    idWarningText = "Do not pay, and do not share your BVN or ID. Send the offer to us.";
  } else if (countryCode === "US") {
    idQuestionText = "Did they ask for your SSN, bank login or a card code?";
    idWarningText = "Do not pay, and do not share your SSN or ID. Send the offer to us.";
  } else if (countryCode === "GB") {
    idQuestionText = "Did they ask for your National Insurance number, bank login or a card code?";
    idWarningText = "Do not pay, and do not share your National Insurance number or ID. Send the offer to us.";
  } else if (countryCode === "CA") {
    idQuestionText = "Did they ask for your SIN, bank login or a card code?";
    idWarningText = "Do not pay, and do not share your SIN or ID. Send the offer to us.";
  }

  const questions: QuestionItem[] = [
    {
      id: "q1",
      text: 'Did they ask you to pay for anything, like training, a kit or an "activation fee"?',
    },
    {
      id: "q2",
      text: "Did the first message come on WhatsApp or Telegram instead of a company email?",
    },
    {
      id: "q3",
      text: idQuestionText,
    },
  ];

  const handleAnswer = (id: string, val: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const yesCount = Object.values(answers).filter((v) => v === true).length;
  const answeredCount = Object.keys(answers).length;

  let verdictTitle = "Answer the questions";
  let verdictText = "Your result shows here. Nothing you click is sent anywhere.";
  let verdictColor = "text-ink";
  let segmentColor = "bg-subtle";
  let boxBorder = "border-rule";
  let boxBg = "bg-sheet";

  if (yesCount >= 2) {
    verdictTitle = "Stop. This looks like a scam.";
    verdictText = `Two or more warning signs. ${idWarningText}`;
    verdictColor = "text-[var(--status-not-accepted)]";
    segmentColor = "bg-[var(--status-not-accepted)]";
    boxBorder = "border-[var(--status-not-accepted)]";
    boxBg = "bg-[var(--status-not-accepted-bg)]";
  } else if (yesCount === 1) {
    verdictTitle = "One warning sign. Be careful.";
    verdictText = "Answer the other seven questions before you reply to them.";
    verdictColor = "text-[var(--status-recheck)]";
    segmentColor = "bg-[var(--status-recheck)]";
    boxBorder = "border-[var(--status-recheck)]";
    boxBg = "bg-[var(--status-recheck-bg)]";
  } else if (answeredCount === 3) {
    verdictTitle = "No warning signs so far.";
    verdictText = "Good start. The full check has seven more questions.";
    verdictColor = "text-[var(--status-accepted)]";
    segmentColor = "bg-[var(--status-accepted)]";
    boxBorder = "border-[var(--status-accepted)]";
    boxBg = "bg-[var(--status-accepted-bg)]";
  }

  return (
    <section id="check" aria-labelledby="check-h" className="w-full">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-20 sm:py-24 flex flex-wrap gap-12 sm:gap-16 items-start">
        {/* Left Column: Heading + Live Verdict Card */}
        <div className="flex-1 basis-[340px] min-w-0">
          <h2 id="check-h" className="text-3xl sm:text-5xl font-extrabold tracking-tight m-0 text-ink leading-[1.05]">
            Got a job offer on WhatsApp?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-secondary leading-relaxed max-w-[28em]">
            Answer three quick questions here. The full check has ten. A real person reads every report you send us.
          </p>

          {/* Live Verdict Status Box (aria-live="polite") */}
          <div
            role="status"
            aria-live="polite"
            className={`cs-verdict mt-8 p-5 sm:p-6 rounded-2xl border-2 ${boxBorder} ${boxBg} max-w-[30em] transition-all duration-300 ${
              yesCount >= 2 ? 'shadow-lg shadow-rose-500/10' : yesCount === 1 ? 'shadow-md shadow-amber-500/10' : ''
            }`}
          >
            {/* 3 Progress Segments */}
            <div className="flex gap-1.5" aria-hidden="true">
              {[0, 1, 2].map((i) => {
                const isFilled = i < (yesCount > 0 ? yesCount : answeredCount);
                return (
                  <span
                    key={i}
                    className={`cs-seg flex-1 h-2 rounded-full transition-colors ${
                      isFilled ? segmentColor : "bg-subtle"
                    }`}
                  />
                );
              })}
            </div>

            <p className={`mt-3.5 text-lg sm:text-xl font-bold m-0 ${verdictColor}`}>
              {verdictTitle}
            </p>
            <p className="mt-1.5 text-sm sm:text-base text-secondary leading-normal m-0">
              {verdictText}
            </p>
          </div>
        </div>

        {/* Right Column: 3 Question Rows */}
        <ol className="flex-1 basis-[480px] min-w-0 m-0 p-0 list-none text-base sm:text-lg leading-snug">
          {questions.map((q, i) => {
            const currentAns = answers[q.id];
            return (
              <li
                key={q.id}
                className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 py-5 border-t border-rule"
              >
                <div className="flex items-start gap-3 flex-1 min-w-[240px]">
                  <span className="font-extrabold text-[var(--brand-ink)] shrink-0 w-5 tabular-nums">
                    {i + 1}
                  </span>
                  <span className="text-ink font-medium">{q.text}</span>
                </div>

                {/* Yes/No Toggle (≥44px tap targets) */}
                <div
                  role="group"
                  aria-label={`Answer to question ${i + 1}`}
                  className="inline-flex border-2 border-ink rounded-md overflow-hidden shrink-0"
                >
                  <button
                    type="button"
                    aria-pressed={currentAns === true}
                    onClick={() => handleAnswer(q.id, true)}
                    className={`min-w-[64px] min-h-[44px] px-3 font-bold text-sm sm:text-base cursor-pointer select-none transition-colors ${
                      currentAns === true
                        ? "bg-[var(--status-not-accepted)] text-white"
                        : "bg-sheet text-ink hover:bg-elevated"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    aria-pressed={currentAns === false}
                    onClick={() => handleAnswer(q.id, false)}
                    className={`min-w-[64px] min-h-[44px] px-3 font-bold text-sm sm:text-base border-l-2 border-ink cursor-pointer select-none transition-colors ${
                      currentAns === false
                        ? "bg-ink text-white"
                        : "bg-sheet text-ink hover:bg-elevated"
                    }`}
                  >
                    No
                  </button>
                </div>
              </li>
            );
          })}

          <li className="flex items-center gap-3 py-5 border-t border-b border-rule">
            <span className="font-extrabold text-secondary w-5">+</span>
            <Link
              href="/scam-check"
              className="font-bold text-ink hover:text-[var(--brand-ink)] min-h-[44px] inline-flex items-center"
            >
              Answer the other seven on the full check →
            </Link>
          </li>
        </ol>
      </div>
    </section>
  );
}
