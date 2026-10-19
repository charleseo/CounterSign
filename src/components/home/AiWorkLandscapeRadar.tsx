'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Code2,
  BookOpen,
  Eye,
  ShieldAlert,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  HelpCircle,
} from 'lucide-react';

interface WorkTrack {
  id: string;
  name: string;
  payRange: string;
  payoutModel: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  tone: string;
  bgLight: string;
  borderLight: string;
  description: string;
  activePlatforms: string[];
  tasks: string[];
  skillsNeeded: string[];
}

const WORK_TRACKS: WorkTrack[] = [
  {
    id: 'reasoning',
    name: 'Reasoning verification & code (RLVR)',
    payRange: '$45 to $125/hr',
    payoutModel: 'Direct hourly or per-turn milestone',
    icon: Code2,
    tone: 'text-emerald-800 dark:text-emerald-300',
    bgLight: 'bg-emerald-500/10',
    borderLight: 'border-emerald-500/25',
    description:
      'The highest-paying AI training track. Checking multi-step chains of thought, writing unit tests to verify code completions, and checking mathematical proofs against ground truth.',
    activePlatforms: ['DataAnnotation STEM', 'Outlier Reasoning', 'Alignerr Code'],
    tasks: [
      'Writing Python unit tests to execute and verify model code',
      'Checking logical deductions step-by-step for subtle errors',
      'Grading competitive programming and algorithmic puzzles',
    ],
    skillsNeeded: ['Python or TypeScript', 'Discrete math or calculus', 'Unit testing frameworks'],
  },
  {
    id: 'expert',
    name: 'Domain-expert evaluation (Law, Medicine, Finance)',
    payRange: '$35 to $65/hr',
    payoutModel: 'Weekly direct deposit or Deel',
    icon: BookOpen,
    tone: 'text-[#5A35C8]',
    bgLight: 'bg-[#5A35C8]/10',
    borderLight: 'border-[#5A35C8]/25',
    description:
      'Subject matter specialists evaluating AI responses on technical precision. Reviewers must spot fabricated case citations, incorrect medical advice, or flawed tax interpretations.',
    activePlatforms: ['Mercor', 'Outlier Expert', 'Invisible Tech'],
    tasks: [
      'Checking citations against actual legal and scientific journals',
      'Grading technical accuracy using multi-page rubrics',
      'Writing ground-truth answers for complex professional prompts',
    ],
    skillsNeeded: ['Undergraduate or master degree in field', 'Citation checking', 'Rubric adherence'],
  },
  {
    id: 'multimodal',
    name: 'Multimodal, image & voice quality',
    payRange: '$20 to $35/hr',
    payoutModel: 'Task approval within 7 days',
    icon: Eye,
    tone: 'text-teal-800 dark:text-teal-300',
    bgLight: 'bg-teal-500/10',
    borderLight: 'border-teal-500/25',
    description:
      'Evaluating whether AI models follow complex image prompts, assessing audio voice inflection and accent naturalness, and correcting spatial reasoning in computer vision tasks.',
    activePlatforms: ['Alignerr Multimodal', 'Turing Vision', 'CrowdGen'],
    tasks: [
      'Grading prompt adherence in generated images and layouts',
      'Annotating audio clips for pronunciation and cadence',
      'Comparing multiple visual generation candidates',
    ],
    skillsNeeded: ['Visual detail inspection', 'Fluent regional language', 'High-speed internet connection'],
  },
  {
    id: 'safety',
    name: 'Conversational alignment & red teaming',
    payRange: '$18 to $28/hr',
    payoutModel: 'Weekly payout via PayPal or Wise',
    icon: ShieldAlert,
    tone: 'text-amber-800 dark:text-amber-300',
    bgLight: 'bg-amber-500/10',
    borderLight: 'border-amber-500/25',
    description:
      'Testing conversational tone, checking guardrails against harmful queries, and stress-testing models with adversarial prompts to prevent deception or unsafe responses.',
    activePlatforms: ['Outlier Generalist', 'Mindrift', 'OneForma'],
    tasks: [
      'Crafting adversarial questions to test model safety rules',
      'Evaluating polite tone, persona consistency, and helpfulness',
      'Fact-checking general search and summary responses',
    ],
    skillsNeeded: ['Clear written English', 'Critical reasoning', 'Attention to prompt guidelines'],
  },
];

export function AiWorkLandscapeRadar() {
  const [activeTrackId, setActiveTrackId] = useState('reasoning');
  const [showHaircutExplainer, setShowHaircutExplainer] = useState(false);

  const activeTrack = WORK_TRACKS.find((t) => t.id === activeTrackId) || WORK_TRACKS[0];
  const IconComponent = activeTrack.icon;

  return (
    <section aria-labelledby="landscape-radar-heading" className="w-full py-12 sm:py-20 border-t border-rule bg-canvas">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule bg-sheet text-xs font-semibold text-secondary">
              <TrendingUp size={13} className="text-emerald-500" />
              <span>Independent market intelligence</span>
            </div>
            <h2
              id="landscape-radar-heading"
              className="text-2xl sm:text-4xl font-extrabold tracking-tight text-ink m-0"
            >
              The 2026 AI work landscape: what pays and who is hiring
            </h2>
            <p className="text-sm sm:text-base text-secondary leading-relaxed m-0">
              The AI industry has shifted from basic image tagging to reasoning verification and domain-expert evaluation.
              Here is what platforms actually pay and what they expect you to do.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowHaircutExplainer(!showHaircutExplainer)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-rule bg-sheet text-xs font-bold text-ink hover:bg-elevated transition-colors cursor-pointer self-start md:self-auto shrink-0"
          >
            <HelpCircle size={14} className="text-[var(--brand-ink)]" />
            <span>{showHaircutExplainer ? 'Hide pay reality notes' : 'Why headline pay differs from take-home'}</span>
          </button>
        </div>

        {/* The Friction Haircut Explainer Card (Expandable) */}
        {showHaircutExplainer && (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 sm:p-7 space-y-4 animate-in fade-in">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-ink m-0">
                  The friction haircut: why $40/hr on a job post is not $40 in your pocket
                </h3>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed m-0">
                  Platforms advertise peak hourly rates. Contributor reports show real initial earnings are 20% to 40% lower due to three factors:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-xl border border-rule bg-sheet text-xs space-y-1">
                <span className="font-bold text-ink block">1. Unpaid onboarding tests</span>
                <p className="text-[11px] text-secondary m-0 leading-normal">
                  Most platforms require 2 to 4 hours of unpaid qualification assessments and rubric reading before your first paid task.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-rule bg-sheet text-xs space-y-1">
                <span className="font-bold text-ink block">2. Task queue pauses</span>
                <p className="text-[11px] text-secondary m-0 leading-normal">
                  Projects end and new batches arrive unpredictably. During empty queue periods you earn zero unless you work on multiple platforms.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-rule bg-sheet text-xs space-y-1">
                <span className="font-bold text-ink block">3. Transfer &amp; conversion spreads</span>
                <p className="text-[11px] text-secondary m-0 leading-normal">
                  Moving USD earnings through PayPal, Wise, or local bank accounts can lose 3% to 6% in spread fees. Use our payout calculator to compare.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 text-xs font-semibold text-[var(--brand-ink)]">
              <span>Best practice:</span>
              <span className="text-secondary font-normal">
                Pass screening on at least two independent platforms to stay busy when one queue pauses.
              </span>
            </div>
          </div>
        )}

        {/* Track Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
          {WORK_TRACKS.map((track) => {
            const isSelected = track.id === activeTrackId;
            const ItemIcon = track.icon;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setActiveTrackId(track.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[110px] group cs-card-interactive ${
                  isSelected
                    ? 'border-[var(--brand-ink)] bg-sheet shadow-md ring-1 ring-[var(--brand-ink)]/30 -translate-y-0.5'
                    : 'border-rule bg-surface/50 hover:bg-sheet hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${track.bgLight} ${track.tone} group-hover:scale-115 group-hover:-rotate-6 transition-transform duration-200`}
                  >
                    <ItemIcon size={17} />
                  </div>
                  <span className="font-mono text-xs font-bold text-ink">{track.payRange}</span>
                </div>
                <div className="pt-2">
                  <span
                    className={`text-xs font-bold block line-clamp-1 transition-colors ${
                      isSelected ? 'text-[var(--brand-ink)] font-extrabold' : 'text-ink group-hover:text-[var(--brand-ink)]'
                    }`}
                  >
                    {track.name.split('(')[0].trim()}
                  </span>
                  <span className="text-[10px] text-secondary font-mono block mt-0.5">
                    {track.activePlatforms[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Track Deep-Dive Panel */}
        <div key={activeTrack.id} className="rounded-3xl border border-rule bg-sheet p-6 sm:p-8 lg:p-10 shadow-xs animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Overview and Platform Badges */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${activeTrack.bgLight} ${activeTrack.tone}`}
                >
                  <IconComponent size={24} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold text-ink m-0 leading-tight">
                    {activeTrack.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300">
                      {activeTrack.payRange}
                    </span>
                    <span className="text-secondary">·</span>
                    <span className="text-secondary">{activeTrack.payoutModel}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base text-secondary leading-relaxed m-0">
                {activeTrack.description}
              </p>

              {/* Tasks Checklist */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-ink uppercase tracking-wider block">
                  Typical daily tasks
                </span>
                <ul className="space-y-2 p-0 m-0 list-none text-xs sm:text-sm text-secondary">
                  {activeTrack.tasks.map((task, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-normal">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link
                  href="/jobs"
                  className="px-5 py-2.5 rounded-xl bg-[var(--brand-ink)] hover:opacity-90 text-white font-bold text-xs inline-flex items-center gap-2 transition-all"
                >
                  <span>Browse verified {activeTrack.name.split('(')[0].trim().toLowerCase()} roles</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/platforms"
                  className="px-4 py-2.5 rounded-xl border border-rule bg-surface hover:bg-elevated text-ink font-semibold text-xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Compare platforms</span>
                </Link>
              </div>
            </div>

            {/* Right: Where to Apply & Skills Needed */}
            <div className="lg:col-span-5 space-y-4">
              {/* Active Platforms Box */}
              <div className="p-4 sm:p-5 rounded-2xl border border-rule bg-surface space-y-3">
                <span className="text-xs font-bold text-ink uppercase tracking-wider block">
                  Where to find this work
                </span>
                <div className="space-y-2">
                  {activeTrack.activePlatforms.map((plat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-subtle bg-sheet text-xs"
                    >
                      <span className="font-bold text-ink">{plat}</span>
                      <span className="text-[11px] font-mono text-emerald-800 dark:text-emerald-300">
                        Active queues
                      </span>
                    </div>
                  ))}
                </div>
                <span className="text-[11px] text-secondary block leading-snug">
                  Apply directly on employer sites to avoid third-party agency cuts.
                </span>
              </div>

              {/* Screening & Preparation */}
              <div className="p-4 sm:p-5 rounded-2xl border border-rule bg-surface space-y-2.5">
                <span className="text-xs font-bold text-ink uppercase tracking-wider block">
                  Required skills &amp; checks
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeTrack.skillsNeeded.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg border border-rule bg-sheet text-xs font-medium text-ink"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="pt-2 border-t border-subtle flex items-center justify-between text-xs">
                  <span className="text-secondary">Want to practice?</span>
                  <Link href="/training" className="font-bold text-[var(--brand-ink)] hover:underline">
                    Take screening drill &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
