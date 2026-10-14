"use client";

import React, { useState } from "react";
import { Check, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";

export interface ScopeAnswers {
  systemType: string;
  focusArea: string;
  volume: string;
  email: string;
  company: string;
}

export interface StepperProps {
  className?: string;
  onComplete?: (answers: ScopeAnswers) => void;
}

/**
 * Stepper (Section 10.2a, 10.11 & 7.9)
 * Three-step scope form stepper with signal tracing line between steps.
 * Preserves user answers across back/next navigation.
 */
export function Stepper({ className = "", onComplete }: StepperProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [answers, setAnswers] = useState<ScopeAnswers>({
    systemType: "Technical Documentation RAG Bot",
    focusArea: "Citation Accuracy & Faithfulness",
    volume: "100 to 250 evaluation pairs",
    email: "",
    company: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const steps = [
    { number: 1, title: "System Type" },
    { number: 2, title: "Audit Focus" },
    { number: 3, title: "Timeline & Contact" },
  ];

  const handleNext = () => {
    setError("");
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!answers.email || !answers.email.includes("@")) {
        setError("Please enter a valid work email address.");
        return;
      }
      setSubmitted(true);
      if (onComplete) onComplete(answers);
    }
  };

  const handleBack = () => {
    setError("");
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2);
    }
  };

  if (submitted) {
    return (
      <div className={`p-8 rounded-2xl border border-subtle bg-surface text-center space-y-4 ${className}`}>
        <div className="w-12 h-12 rounded-full border border-[#45F5C5]/30 bg-[#45F5C5]/10 flex items-center justify-center mx-auto text-[#45F5C5]">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="text-lg font-bold text-primary font-mono">Scope Request Transmitted</h3>
        <p className="text-xs sm:text-sm text-readable max-w-md mx-auto leading-relaxed">
          Reference ID <span className="font-mono text-accent-cyan">#EVA-9042</span>. Jo will review your system context and reply within 1 business day with sample rubrics and pilot schedule.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-subtle bg-surface p-6 sm:p-8 space-y-6 ${className}`}
      aria-label="3-step evaluation scope form"
    >
      {/* Stepper Header with Signal Tracing Progress */}
      <div className="relative flex items-center justify-between pb-6 border-b border-subtle">
        {/* Connector Line */}
        <div className="absolute top-4 left-6 right-6 h-0.5 bg-subtle -z-0" />
        <div
          className="absolute top-4 left-6 h-0.5 bg-accent-cyan transition-all duration-300 -z-0"
          style={{ width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%" }}
        />

        {steps.map((s) => {
          const isDone = currentStep > s.number;
          const isCurrent = currentStep === s.number;
          return (
            <div key={s.number} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-mono font-semibold transition-all ${
                  isDone
                    ? "bg-accent-cyan border-accent-cyan text-void"
                    : isCurrent
                    ? "bg-surface border-focus text-accent-cyan shadow-md"
                    : "bg-void border-subtle text-secondary"
                }`}
              >
                {isDone ? <Check size={14} className="stroke-[3]" /> : s.number}
              </div>
              <span
                className={`mt-2 text-[11px] font-mono tracking-tight ${
                  isCurrent ? "text-primary font-semibold" : "text-secondary"
                }`}
              >
                {s.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="space-y-4 min-h-[180px] text-xs font-mono">
        {currentStep === 1 && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <h4 className="text-sm font-semibold text-primary">
              Step 1: Select AI Model / Architecture Type
            </h4>
            <div className="space-y-2">
              {[
                "Technical Documentation RAG Bot",
                "Customer Support Knowledge Assistant",
                "Code Generation & Translation Engine",
                "Complex Document Extraction Pipeline",
              ].map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    answers.systemType === opt
                      ? "bg-accent-cyan/15 border-accent-cyan/40 text-primary font-semibold"
                      : "bg-void border-subtle text-readable hover:bg-elevated"
                  }`}
                >
                  <input
                    type="radio"
                    name="systemType"
                    checked={answers.systemType === opt}
                    onChange={() => setAnswers({ ...answers, systemType: opt })}
                    className="sr-only"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <h4 className="text-sm font-semibold text-primary">
              Step 2: Choose Primary Audit Focus Area
            </h4>
            <div className="space-y-2">
              {[
                "Citation Accuracy & Faithfulness (Source verification)",
                "Hallucination Detection & Negative Constraint Compliance",
                "Pairwise A/B Model Comparison & Preference Ranking",
                "Edge Case Stress Testing & Red-Teaming",
              ].map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    answers.focusArea === opt
                      ? "bg-accent-cyan/15 border-accent-cyan/40 text-primary font-semibold"
                      : "bg-void border-subtle text-readable hover:bg-elevated"
                  }`}
                >
                  <input
                    type="radio"
                    name="focusArea"
                    checked={answers.focusArea === opt}
                    onChange={() => setAnswers({ ...answers, focusArea: opt })}
                    className="sr-only"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <h4 className="text-sm font-semibold text-primary">
              Step 3: Company Details & Pilot Scope
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-secondary mb-1">Company or Product Name</label>
                <input
                  type="text"
                  value={answers.company}
                  onChange={(e) => setAnswers({ ...answers, company: e.target.value })}
                  placeholder="e.g. Acme AI"
                  className="w-full p-2.5 rounded-lg border border-subtle bg-void text-primary focus:outline-none focus:border-focus"
                />
              </div>

              <div>
                <label className="block text-secondary mb-1">Work Email Address</label>
                <input
                  type="email"
                  value={answers.email}
                  onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
                  placeholder="founder@company.com"
                  className="w-full p-2.5 rounded-lg border border-subtle bg-void text-primary focus:outline-none focus:border-focus"
                />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-2.5 rounded bg-accent-danger/10 border border-accent-danger/30 text-[#FF6B6B]">
            {error}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 border-t border-subtle flex items-center justify-between font-mono text-xs">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 rounded-lg border border-subtle text-secondary hover:text-primary flex items-center gap-1.5 btn-tactile"
          >
            <ArrowLeft size={13} />
            <span>Back</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-secondary text-[11px]">
            <ShieldCheck size={14} className="text-[#45F5C5]" />
            <span>NDA Available</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleNext}
          className="px-5 py-2.5 rounded-lg bg-accent-cyan text-void font-semibold flex items-center gap-1.5 hover:opacity-90 btn-tactile"
        >
          <span>{currentStep === 3 ? "Submit Scope" : "Continue"}</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
