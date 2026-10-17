import React from "react";
import { StatusBadge, StatusType } from "./StatusBadge";

export interface TimelineStep {
  number: number;
  title: string;
  duration: string;
  sourceType: "official" | "reported" | "unconfirmed";
  description: string;
  sourceName?: string;
  sourceUrl?: string;
}

export interface ExpectationTimelineProps {
  steps?: TimelineStep[] | undefined;
  platformName: string;
  className?: string;
}

const DEFAULT_TIMELINE_STEPS: TimelineStep[] = [
  {
    number: 1,
    title: "Application Submission",
    duration: "10 to 15 mins",
    sourceType: "official",
    description: "Submit resume and country eligibility details via official company careers portal.",
    sourceName: "Official platform job listing",
  },
  {
    number: 2,
    title: "Identity Verification",
    duration: "1 to 2 business days",
    sourceType: "official",
    description: "Automated identity screening using government ID (International Passport / NIN in Nigeria).",
    sourceName: "Onboarding policy documentation",
  },
  {
    number: 3,
    title: "Domain Assessment",
    duration: "1.5 to 3 hours (Unpaid)",
    sourceType: "reported",
    description: "Rigorous test assessing factuality checking, citation precision, and prompt compliance.",
    sourceName: "Reported by active workers (n=42)",
  },
  {
    number: 4,
    title: "Platform Onboarding",
    duration: "2 to 5 days",
    sourceType: "reported",
    description: "Access to communication channels (Slack/Discord) and project guidelines. Queue access pending approval.",
    sourceName: "Community contributor logs",
  },
  {
    number: 5,
    title: "First Paid Task",
    duration: "Varies by project demand",
    sourceType: "unconfirmed",
    description: "Task availability fluctuates. Projects may experience empty queues between training cycles.",
    sourceName: "Queue reports from contributors",
  },
];

/**
 * ExpectationTimeline (Section 7.4 & 10.11)
 * Honest 5-step timeline showing what applicants will really experience in month 1.
 * Clearly differentiates Official company statements from Worker-Reported reality and Unknown gaps.
 */
export function ExpectationTimeline({
  steps = DEFAULT_TIMELINE_STEPS,
  platformName,
  className = "",
}: ExpectationTimelineProps) {
  return (
    <div className={`space-y-4 ${className}`} aria-label={`Expectation timeline for ${platformName}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-rule">
        <h3 className="text-sm font-semibold text-ink">
          What To Expect: First 30 Days
        </h3>
        <span className="text-xs text-secondary">
          Facts labeled Official vs Community-Reported
        </span>
      </div>

      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-rule">
        {steps.map((step) => {
          return (
            <div key={step.number} className="relative group">
              {/* Step Number Dot */}
              <div className="absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full border border-rule bg-sheet flex items-center justify-center text-xs font-semibold text-[#5A35C8] shadow-sm">
                <span className="tabular-nums">{step.number}</span>
              </div>

              {/* Step Card Content */}
              <div className="p-4 rounded-xl border border-rule bg-sheet space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-ink">
                      {step.title}
                    </span>
                    <span className="text-xs text-secondary" aria-hidden="true">&bull;</span>
                    <span className="text-xs text-secondary tabular-nums">
                      {step.duration}
                    </span>
                  </div>

                  <StatusBadge
                    status={step.sourceType as StatusType}
                    size="sm"
                    showExplanationOnClick={false}
                  />
                </div>

                <p className="text-xs text-readable leading-relaxed">
                  {step.description}
                </p>

                {step.sourceName && (
                  <div className="pt-2 border-t border-rule text-xs text-secondary">
                    <span>
                      Source:{' '}
                      {step.sourceType === 'reported' && step.sourceName?.toLowerCase().includes('official')
                        ? 'Community contributor reports'
                        : step.sourceName}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
