import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Mail, CheckCircle2, ShieldCheck, Sparkles, Bell, ArrowRight, ShieldAlert, FileText, DollarSign } from "lucide-react";
import { EmailCapture } from "@/components/ui/EmailCapture";
import { absoluteUrl } from "@/lib/utils/siteUrl";

export const metadata: Metadata = {
  title: "AI Work Newsletter & Daily Opportunity Alerts | TraceBase",
  description:
    "Receive human-checked AI evaluation jobs and platform intelligence directly in your inbox. Choose between weekly digests or daily opportunity alerts.",
  alternates: {
    canonical: absoluteUrl("/newsletter"),
  },
};

export const instant = false;

export default function NewsletterPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule bg-sheet text-xs font-semibold text-secondary">
          <Mail size={13} className="text-[#8B5CF6]" />
          <span>Email newsletter &amp; opportunity alerts</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink">
          Verified AI work delivered directly to your inbox
        </h1>

        <p className="text-sm sm:text-base text-secondary leading-relaxed">
          Choose whether you want our weekly contractor digest or daily opportunity alerts as soon as human-checked roles open in your country.
        </p>
      </div>

      {/* Subscription Card */}
      <div className="max-w-xl mx-auto">
        <EmailCapture
          title="Start receiving verified opportunities"
          description="Select your preferred cadence below. Every opportunity is checked for real pay and country eligibility."
          buttonText="Subscribe to alerts"
          className="bg-sheet border border-rule shadow-sm"
        />
      </div>

      {/* Feature Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-sheet border border-rule space-y-2">
          <div className="w-9 h-9 rounded-xl bg-[#5A35C8]/10 text-[#5A35C8] flex items-center justify-center">
            <Briefcase size={18} />
          </div>
          <h2 className="text-sm font-bold text-ink m-0">Verified roles</h2>
          <p className="text-xs text-secondary leading-relaxed m-0">
            Human-checked listings with confirmed hourly rates, test formats, and direct links.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-sheet border border-rule space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <DollarSign size={18} />
          </div>
          <h2 className="text-sm font-bold text-ink m-0">Rate benchmarks</h2>
          <p className="text-xs text-secondary leading-relaxed m-0">
            Real pay figures, payment frequency (weekly vs monthly), and local payout calculations.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-sheet border border-rule space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <ShieldAlert size={18} />
          </div>
          <h2 className="text-sm font-bold text-ink m-0">Scam radar</h2>
          <p className="text-xs text-secondary leading-relaxed m-0">
            Early warnings about fake recruiters, fraudulent screening fees, and impersonation attempts.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-sheet border border-rule space-y-2">
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <FileText size={18} />
          </div>
          <h2 className="text-sm font-bold text-ink m-0">Screening drills</h2>
          <p className="text-xs text-secondary leading-relaxed m-0">
            Free practice tests for TestGorilla, prompt constraints, and ATS CV guidelines.
          </p>
        </div>
      </div>

      {/* Sample Newsletter Issue Preview */}
      <div className="p-6 sm:p-8 rounded-2xl bg-sheet border border-rule space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rule pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface text-secondary text-xs font-mono">
              <span>Sample issue preview</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-ink m-0">
              TraceBase Weekly AI Work Digest &bull; Issue #12
            </h2>
          </div>
          <span className="text-xs text-secondary font-mono">
            Sent every Monday at 08:00 UTC
          </span>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-secondary leading-relaxed">
          <div className="p-4 rounded-xl bg-surface border border-rule space-y-2">
            <span className="font-bold text-ink block text-xs uppercase tracking-wider">
              1. Fresh roles verified this week
            </span>
            <ul className="space-y-2 m-0 pl-4 list-disc text-secondary text-xs">
              <li>
                <strong className="text-ink">Outlier AI</strong>: AI Generalist &amp; Fact-Checking Evaluator &bull;{" "}
                <span className="text-emerald-700 dark:text-emerald-400 font-mono font-medium">$25 to $40 / hr</span> &bull; Open to Nigeria, US, UK, Kenya.
              </li>
              <li>
                <strong className="text-ink">Alignerr</strong>: Multimodal &amp; Code Reasoning Evaluator &bull;{" "}
                <span className="text-emerald-700 dark:text-emerald-400 font-mono font-medium">$35 to $60 / hr</span> &bull; Open to worldwide contractors via Deel.
              </li>
              <li>
                <strong className="text-ink">DataAnnotation Tech</strong>: STEM &amp; Mathematical Reasoning Specialist &bull;{" "}
                <span className="text-emerald-700 dark:text-emerald-400 font-mono font-medium">$40 / hr</span> &bull; Verified weekly PayPal disbursements.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-300 space-y-1">
            <span className="font-bold block">2. Scam radar warning</span>
            <p className="m-0 leading-relaxed">
              Never pay for an onboarding assessment or share banking PINs over Telegram or WhatsApp. Legitimate AI platforms never charge applicants.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-rule space-y-1 text-xs">
            <span className="font-bold text-ink block">3. Evaluator tip of the week</span>
            <p className="m-0 leading-relaxed text-secondary">
              Negative constraints are the #1 screening failure point. If a prompt says &quot;explain in under 100 words without mentioning dates&quot;, any single mention of a year will disqualify your submission.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy and Data Rights Note */}
      <div className="p-5 rounded-2xl bg-surface/50 border border-rule flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-secondary">
        <div className="flex items-center gap-2.5">
          <ShieldCheck size={18} className="text-[#5A35C8] shrink-0" />
          <span>Double opt-in enforced. Zero marketing spam. Unsubscribe anytime in 1 click.</span>
        </div>
        <Link href="/privacy" className="text-[#5A35C8] font-semibold hover:underline shrink-0">
          Privacy policy &amp; NDPA 2023 rights &rarr;
        </Link>
      </div>
    </div>
  );
}

function Briefcase({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="14" x="2" y="7" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
