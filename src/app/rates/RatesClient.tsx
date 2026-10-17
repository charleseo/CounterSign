'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Clock,
  ArrowRight,
  Filter,
  Info,
  AlertTriangle,
  ChevronDown,
  Calculator,
  Search,
  ExternalLink,
} from 'lucide-react';

export interface RateItem {
  id: string;
  platform: string;
  domain: 'Coding' | 'Math & STEM' | 'Multilingual' | 'General RLHF';
  roleTitle: string;
  hourlyLow: number;
  hourlyHigh: number;
  paymentModel: string;
  payoutFrequency: string;
  screeningFormat: string;
  primaryRail: string;
  reviewPenaltyPolicy: string;
  reportedNotes: string;
}

const RATE_DATA: RateItem[] = [
  {
    id: 'da-coding',
    platform: 'DataAnnotation Tech',
    domain: 'Coding',
    roleTitle: 'Software engineering & code evaluation (Python, JS, C++)',
    hourlyLow: 40,
    hourlyHigh: 45,
    paymentModel: 'Hourly timer (logged per task)',
    payoutFrequency: 'Every 3 days (on demand)',
    screeningFormat: 'Unpaid initial 45-minute coding assessment',
    primaryRail: 'PayPal (USD)',
    reviewPenaltyPolicy: 'Repeated syntax or test failures silently drop project availability from dashboard.',
    reportedNotes: 'Consistent $40/hr baseline for verified coders. Extra $45/hr qualification sprints appear during frontier model releases.',
  },
  {
    id: 'outlier-coding',
    platform: 'Outlier AI',
    domain: 'Coding',
    roleTitle: 'Code reasoning and bug fixing evaluation',
    hourlyLow: 35,
    hourlyHigh: 50,
    paymentModel: 'Hourly task timer with max caps',
    payoutFrequency: 'Weekly (Tuesday cycle)',
    screeningFormat: 'Screening tasks with partial compensation upon passing',
    primaryRail: 'PayPal, AirTM',
    reviewPenaltyPolicy: 'Review scores below 3.5 out of 5 throttle task queues or shift contributors to lower-tier pools.',
    reportedNotes: 'Rate depends on tier (Tier 1 to Tier 3) and region. Tier 3 senior software evaluators receive up to $50/hr on specialized tasks.',
  },
  {
    id: 'alignerr-coding',
    platform: 'Alignerr',
    domain: 'Coding',
    roleTitle: 'Software engineer & technical prompt evaluator',
    hourlyLow: 40,
    hourlyHigh: 50,
    paymentModel: 'Hourly rate tracked via Labelbox/Deel',
    payoutFrequency: 'Weekly via Deel',
    screeningFormat: 'TestGorilla technical screening (unpaid)',
    primaryRail: 'Deel (Direct ACH, local bank, crypto)',
    reviewPenaltyPolicy: 'Audit team conducts random peer reviews. Scores below 80% lead to project removal.',
    reportedNotes: 'Deel rail eliminates high PayPal cross-border spreads for international contributors.',
  },
  {
    id: 'mercor-eng',
    platform: 'Mercor',
    domain: 'Coding',
    roleTitle: 'Long-term AI software engineer contractor',
    hourlyLow: 45,
    hourlyHigh: 65,
    paymentModel: 'Contract hourly or monthly retainer',
    payoutFrequency: 'Bi-weekly or monthly',
    screeningFormat: 'Automated 20-minute AI technical video interview & GitHub review',
    primaryRail: 'Stripe, Wise',
    reviewPenaltyPolicy: 'Direct client review. Performance below client milestones results in contract non-renewal.',
    reportedNotes: 'High hourly rate but requires full-time or 20+ hours per week commitments with enterprise clients.',
  },
  {
    id: 'outlier-math',
    platform: 'Outlier AI',
    domain: 'Math & STEM',
    roleTitle: 'Advanced mathematics, physics & reasoning',
    hourlyLow: 30,
    hourlyHigh: 45,
    paymentModel: 'Hourly timer with task limits',
    payoutFrequency: 'Weekly (Tuesday cycle)',
    screeningFormat: 'Subject verification test with step-by-step LaTeX proof questions',
    primaryRail: 'PayPal, AirTM',
    reviewPenaltyPolicy: 'Failing to explain proof steps in plain terms lowers reviewer score.',
    reportedNotes: 'Requires verified degree in mathematics, statistics, or physics during initial onboarding.',
  },
  {
    id: 'alignerr-math',
    platform: 'Alignerr',
    domain: 'Math & STEM',
    roleTitle: 'Advanced STEM reasoning specialist',
    hourlyLow: 35,
    hourlyHigh: 45,
    paymentModel: 'Hourly rate via Deel',
    payoutFrequency: 'Weekly via Deel',
    screeningFormat: 'TestGorilla mathematics reasoning test',
    primaryRail: 'Deel',
    reviewPenaltyPolicy: 'Peer review audits require high agreement score on step-by-step logic.',
    reportedNotes: 'Consistent project flow when frontier labs run math benchmark evaluations.',
  },
  {
    id: 'da-general',
    platform: 'DataAnnotation Tech',
    domain: 'General RLHF',
    roleTitle: 'Core AI training & creative writing evaluation',
    hourlyLow: 20,
    hourlyHigh: 22,
    paymentModel: 'Hourly timer (logged per task)',
    payoutFrequency: 'Every 3 days (on demand)',
    screeningFormat: 'Unpaid starter assessment evaluating factuality and grammar',
    primaryRail: 'PayPal (USD)',
    reviewPenaltyPolicy: 'Hallucinated citations or unverified assertions result in immediate queue loss.',
    reportedNotes: 'Standard $20/hr baseline across all non-coding projects with occasional $22/hr priority tasks.',
  },
  {
    id: 'outlier-general',
    platform: 'Outlier AI',
    domain: 'General RLHF',
    roleTitle: 'Conversational AI & prompt response evaluator',
    hourlyLow: 15,
    hourlyHigh: 22,
    paymentModel: 'Hourly timer per task',
    payoutFrequency: 'Weekly',
    screeningFormat: 'Introductory onboarding module with simulated feedback tasks',
    primaryRail: 'PayPal, AirTM',
    reviewPenaltyPolicy: 'Review scores below 3.0 out of 5 trigger automated queue suspension.',
    reportedNotes: 'Subject to sudden project transitions as clients adjust model tuning schedules.',
  },
  {
    id: 'alignerr-multilingual',
    platform: 'Alignerr',
    domain: 'Multilingual',
    roleTitle: 'Language expert & localized prompt evaluator',
    hourlyLow: 22,
    hourlyHigh: 32,
    paymentModel: 'Hourly tracked via Deel',
    payoutFrequency: 'Weekly via Deel',
    screeningFormat: 'Language proficiency screening via TestGorilla',
    primaryRail: 'Deel',
    reviewPenaltyPolicy: 'Native fluency checks by regional leads.',
    reportedNotes: 'High demand for non-English European, Asian, and African languages with certified proficiency.',
  },
  {
    id: 'invisible-general',
    platform: 'Invisible Technologies',
    domain: 'General RLHF',
    roleTitle: 'Advanced AI trainer & operations associate',
    hourlyLow: 18,
    hourlyHigh: 25,
    paymentModel: 'Hourly contract',
    payoutFrequency: 'Bi-weekly via Deel',
    screeningFormat: 'Structured written application and practical task simulation',
    primaryRail: 'Deel, Direct Wire',
    reviewPenaltyPolicy: 'Quality managers conduct weekly score calibration sessions.',
    reportedNotes: 'Offers more predictable weekly hour commitments compared to open task pool platforms.',
  },
  {
    id: 'prolific-studies',
    platform: 'Prolific',
    domain: 'General RLHF',
    roleTitle: 'Academic and conversational AI model study participant',
    hourlyLow: 12,
    hourlyHigh: 18,
    paymentModel: 'Per-study payment (minimum $8/hr floor)',
    payoutFrequency: 'On demand after 4 completed submissions',
    screeningFormat: 'Instant onboarding with profile demographic matching',
    primaryRail: 'PayPal',
    reviewPenaltyPolicy: 'Submissions rejected only for attention check failures or premature completion.',
    reportedNotes: 'Zero risk of sudden account bans for subjective writing. Excellent supplementary income.',
  },
];

export function RatesClient() {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredRates = useMemo(() => {
    return RATE_DATA.filter((item) => {
      const matchesDomain = selectedDomain === 'All' || item.domain === selectedDomain;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.platform.toLowerCase().includes(q) ||
        item.roleTitle.toLowerCase().includes(q) ||
        item.primaryRail.toLowerCase().includes(q) ||
        item.domain.toLowerCase().includes(q);
      return matchesDomain && matchesSearch;
    });
  }, [selectedDomain, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8">
      {/* Search and Domain Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Domain Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {['All', 'Coding', 'Math & STEM', 'Multilingual', 'General RLHF'].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setSelectedDomain(d)}
              className={`px-3 py-1.5 rounded-lg border transition-colors whitespace-nowrap min-h-[36px] ${
                selectedDomain === d
                  ? 'border-[#5A35C8] bg-[#5A35C8]/10 text-ink font-semibold'
                  : 'border-rule bg-sheet text-secondary hover:text-ink'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search platform or role..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-rule bg-sheet text-xs text-ink placeholder:text-secondary focus:outline-none focus:border-[#5A35C8] transition-colors"
          />
        </div>
      </div>

      {/* Overview Stat Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-xl border border-rule bg-sheet p-3.5 space-y-1">
          <span className="text-[11px] text-secondary">Coding high</span>
          <div className="text-xl font-bold text-ink tabular-nums">$40 – $65/hr</div>
          <span className="text-[10px] text-emerald-400">Python & TypeScript</span>
        </div>
        <div className="rounded-xl border border-rule bg-sheet p-3.5 space-y-1">
          <span className="text-[11px] text-secondary">STEM & Math high</span>
          <div className="text-xl font-bold text-ink tabular-nums">$30 – $50/hr</div>
          <span className="text-[10px] text-secondary">Proofs & LaTeX</span>
        </div>
        <div className="rounded-xl border border-rule bg-sheet p-3.5 space-y-1">
          <span className="text-[11px] text-secondary">General RLHF</span>
          <div className="text-xl font-bold text-ink tabular-nums">$15 – $22/hr</div>
          <span className="text-[10px] text-secondary">Fact & tone checks</span>
        </div>
        <div className="rounded-xl border border-rule bg-sheet p-3.5 space-y-1">
          <span className="text-[11px] text-secondary">Fastest payout</span>
          <div className="text-xl font-bold text-ink">3 days</div>
          <span className="text-[10px] text-[#5A35C8]">DataAnnotation</span>
        </div>
      </div>

      {/* Main Rate Comparison Table */}
      <div className="rounded-xl border border-rule bg-sheet overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-rule bg-surface/50 text-secondary">
                <th className="py-3 px-4 font-semibold">Platform & Role</th>
                <th className="py-3 px-4 font-semibold">Domain</th>
                <th className="py-3 px-4 font-semibold">Reported Hourly</th>
                <th className="py-3 px-4 font-semibold">Payment Rail</th>
                <th className="py-3 px-4 font-semibold">Payout Schedule</th>
                <th className="py-3 px-4 font-semibold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule text-ink">
              {filteredRates.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-secondary">
                    No roles matched your search. Try adjusting your filters.
                  </td>
                </tr>
              ) : (
                filteredRates.map((item) => {
                  const isExpanded = expandedId === item.id;
                  return (
                    <React.Fragment key={item.id}>
                      <tr
                        onClick={() => toggleExpand(item.id)}
                        className="hover:bg-surface/50 cursor-pointer transition-colors"
                      >
                        <td className="py-3.5 px-4 font-medium">
                          <div className="text-ink font-semibold">{item.platform}</div>
                          <div className="text-[11px] text-secondary truncate max-w-xs">
                            {item.roleTitle}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded border border-rule bg-surface text-[10px] font-medium text-secondary">
                            {item.domain}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-emerald-400 tabular-nums">
                            ${item.hourlyLow} – ${item.hourlyHigh}/hr
                          </div>
                          <div className="text-[10px] text-secondary">{item.paymentModel}</div>
                        </td>
                        <td className="py-3.5 px-4 text-secondary">{item.primaryRail}</td>
                        <td className="py-3.5 px-4 text-secondary">{item.payoutFrequency}</td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            aria-label="Expand role details"
                            className="p-1 rounded hover:bg-surface text-secondary transition-colors"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            />
                          </button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="bg-surface/30">
                          <td colSpan={6} className="p-4 space-y-3 border-b border-rule">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              <div className="space-y-1.5">
                                <span className="font-semibold text-ink flex items-center gap-1.5">
                                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                                  Review grade penalty policy
                                </span>
                                <p className="text-secondary leading-relaxed">
                                  {item.reviewPenaltyPolicy}
                                </p>
                              </div>
                              <div className="space-y-1.5">
                                <span className="font-semibold text-ink flex items-center gap-1.5">
                                  <Info className="w-3.5 h-3.5 text-[#5A35C8]" />
                                  Contributor notes & screening format
                                </span>
                                <p className="text-secondary leading-relaxed">
                                  Screening: {item.screeningFormat}. {item.reportedNotes}
                                </p>
                              </div>
                            </div>

                            <div className="pt-2 flex flex-wrap items-center gap-3">
                              <Link
                                href={`/payout-calculator?rate=${item.hourlyLow}&hours=20`}
                                className="inline-flex items-center gap-1 text-[11px] font-medium text-[#5A35C8] hover:underline"
                              >
                                <Calculator className="w-3.5 h-3.5" />
                                Calculate take-home net on this rate
                              </Link>
                              <Link
                                href={`/task-check`}
                                className="inline-flex items-center gap-1 text-[11px] font-medium text-secondary hover:text-ink"
                              >
                                <ShieldCheck className="w-3.5 h-3.5" />
                                Run pre-submission task check
                              </Link>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Practical Guidance on Maximizing Hourly Yield */}
      <div className="rounded-xl border border-rule bg-sheet p-5 space-y-4">
        <h2 className="text-base font-bold text-ink">
          Three golden rules for preserving your hourly rate
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5 p-3 rounded-lg border border-rule bg-surface/50">
            <span className="font-semibold text-ink">1. Never rush submissions</span>
            <p className="text-secondary leading-relaxed">
              Submitting a 30-minute task in 5 minutes flags automated rushing filters. Platforms assume copy-paste spam and suspend project allocations.
            </p>
          </div>
          <div className="space-y-1.5 p-3 rounded-lg border border-rule bg-surface/50">
            <span className="font-semibold text-ink">2. Obey negative constraints</span>
            <p className="text-secondary leading-relaxed">
              Reviewers prioritize negative constraints (e.g. &apos;Do not use bullet points&apos;) above all else. One slip reduces your audit score from 5 to 2.
            </p>
          </div>
          <div className="space-y-1.5 p-3 rounded-lg border border-rule bg-surface/50">
            <span className="font-semibold text-ink">3. Avoid PayPal cross-border fees</span>
            <p className="text-secondary leading-relaxed">
              When working from Nigeria, Ghana, or Kenya, use Deel or AirTM to withdraw to Geegpay or USD accounts to save up to 4% in hidden currency conversion spreads.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
