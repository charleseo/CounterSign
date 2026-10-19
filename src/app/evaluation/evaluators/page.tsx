import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { EvaluatorApplicationForm } from "./EvaluatorApplicationForm";
import { ShieldCheck, Scale, Clock, ArrowRight } from "lucide-react";
import { absoluteUrl } from "@/lib/utils/siteUrl";

export const metadata: Metadata = {
  title: "Join the Evaluator Network | TraceBase Studio",
  description:
    "Apply to join TraceBase's specialist human evaluation network. Paid sprints for physicians, attorneys, software engineers, and domain researchers checking frontier AI model accuracy.",
  alternates: {
    canonical: absoluteUrl("/evaluation/evaluators"),
  },
};

export default function EvaluatorsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs text-secondary">
          <li>
            <Link href="/evaluation" className="hover:text-ink transition-colors">
              Evaluation Studio
            </Link>
          </li>
          <li aria-hidden="true" className="text-muted">/</li>
          <li className="text-ink font-medium">Evaluator Network</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="space-y-4 border-b border-rule pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-violet-50 text-brand-violet border border-violet-200">
          Domain Specialists & Peer Reviewers
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
          Join the TraceBase Evaluator Network
        </h1>
        <p className="text-sm text-secondary max-w-2xl leading-relaxed">
          TraceBase delivers independent model evaluation and technical citation audits for enterprise AI teams. When high-volume audits require specialized domain verification, we partner with vetted physicians, engineers, lawyers, and researchers.
        </p>
      </div>

      {/* Value Pillars for Specialists */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-rule bg-sheet space-y-2">
          <div className="flex items-center gap-2 text-brand-violet font-semibold text-sm">
            <ShieldCheck size={18} />
            <span>Honest Scope & Clear Rubrics</span>
          </div>
          <p className="text-xs text-secondary leading-relaxed">
            Every audit has explicit rubrics and reproducible source documents. You evaluate answers against verified ground truth, never subjective guesswork.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-rule bg-sheet space-y-2">
          <div className="flex items-center gap-2 text-brand-violet font-semibold text-sm">
            <Clock size={18} />
            <span>Flexible Remote Sprints</span>
          </div>
          <p className="text-xs text-secondary leading-relaxed">
            Participate in 10 to 40 hour evaluation batches that fit around your academic, clinical, or engineering schedule.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-rule bg-sheet space-y-2">
          <div className="flex items-center gap-2 text-brand-violet font-semibold text-sm">
            <Scale size={18} />
            <span>Direct Payouts</span>
          </div>
          <p className="text-xs text-secondary leading-relaxed">
            Transparent compensation agreed prior to each sprint, delivered via direct bank wire, virtual USD ACH, or Deel. Zero middleman cuts.
          </p>
        </div>
      </div>

      {/* Application Form */}
      <div className="p-6 sm:p-8 rounded-xl border border-rule bg-sheet space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-ink">
            Register Your Specialist Credentials
          </h2>
          <p className="text-xs text-secondary leading-relaxed">
            Tell us about your background and verified qualifications. Ebubechukwu Okeke reviews every application personally before project allocation.
          </p>
        </div>

        <EvaluatorApplicationForm />
      </div>

      {/* Methodological Link */}
      <div className="p-4 rounded-xl border border-rule bg-surface text-xs text-secondary flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <p className="font-semibold text-ink">Curious how we evaluate models?</p>
          <p>Read our public methodology on citation tracking, pairwise grading, and error taxonomies.</p>
        </div>
        <Link
          href="/evaluation/methodology"
          className="text-xs font-medium text-brand-violet hover:underline inline-flex items-center gap-1 shrink-0"
        >
          <span>Studio Methodology</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
