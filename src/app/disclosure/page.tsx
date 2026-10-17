import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { getSiteHost } from '@/lib/utils/siteUrl';
import { SponsoredBadge } from '@/components/ui/SponsoredBadge';

export const metadata: Metadata = {
  title: 'Referral disclosure and neutrality pledge | TraceBase',
  description: 'How TraceBase labels direct vs referral links, how we may earn compensation, and our strict pledge that referral earnings never alter ranking, freshness, or verification status.',
};

export default function ReferralDisclosurePage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-rule bg-sheet text-xs text-secondary font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-ink" />
          <span>Transparency standard, version 1.0</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
          Referral and commercial disclosure
        </h1>
        <p className="text-sm sm:text-base text-secondary leading-relaxed">
          At TraceBase, trust is our primary asset. We believe job seekers and enterprise clients deserve complete, upfront clarity regarding how our service is funded and how external platform links are handled.
        </p>
        <div className="flex items-center gap-4 text-xs text-secondary pt-2 border-t border-rule">
          <span>Effective date: 14 October 2026</span>
          <span>&bull;</span>
          <span>Audited policy</span>
        </div>
      </div>

      {/* The Neutrality Pledge */}
      <div className="rounded-xl p-6 space-y-3 bg-sheet border border-rule border-l-4 border-l-emerald-600 dark:border-l-emerald-400">
        <div className="flex items-center gap-2 text-base font-bold text-primary">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
          <span>The TraceBase neutrality pledge</span>
        </div>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          Referral compensation <strong className="text-primary">never</strong> alters a role&apos;s search ranking, verification status, freshness badge, or eligibility assessment. We list roles because they are verified opportunities for talent, never because a platform offers a commission.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10 text-sm text-primary leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs tabular-nums px-2 py-0.5 rounded border border-rule bg-surface text-secondary font-medium">01</span>
            How links are labeled
          </h2>
          <p className="text-secondary">
            Every outbound link on TraceBase is clearly categorized on both the job card and the detail page:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Direct Link */}
            <div className="rounded-xl p-4 space-y-2 bg-sheet border border-rule">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2 py-0.5 rounded border border-rule bg-surface text-primary">
                  Direct link
                </span>
                <span className="text-[11px] text-secondary">No commission</span>
              </div>
              <p className="text-xs font-semibold text-primary">
                Direct link. No referral.
              </p>
              <p className="text-xs text-secondary">
                Points directly to the employer&apos;s official careers portal (Ashby, Greenhouse, Lever, or direct site). TraceBase receives zero financial compensation if you apply or get hired.
              </p>
            </div>

            {/* Referral Link */}
            <div className="rounded-xl p-4 space-y-2 bg-sheet border border-rule">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300">
                  Referral link
                </span>
                <span className="text-[11px] text-secondary">Bonus possible</span>
              </div>
              <p className="text-xs font-semibold text-primary">
                Referral link: we may earn a bonus if you qualify. It costs you nothing.
              </p>
              <p className="text-xs text-secondary">
                Where an authorized community referral or talent partner program exists, clicking this link may generate a referral credit or bonus to TraceBase if you pass platform screening and complete qualifying work tasks.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs tabular-nums px-2 py-0.5 rounded border border-rule bg-surface text-secondary font-medium">02</span>
            No cost to candidates
          </h2>
          <p className="text-secondary">
            Using a referral link will <strong className="text-primary">never</strong> increase fees, decrease your hourly pay rate, or impose any cost on you as a candidate:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-secondary">
            <li>Your compensation is paid 100% by the hiring platform at their standard rates.</li>
            <li>Referral bonuses are paid directly from the platform&apos;s recruiting or community acquisition budget.</li>
            <li>TraceBase will never charge you for application access, guides, cheat sheets, or interview tips.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs tabular-nums px-2 py-0.5 rounded border border-rule bg-surface text-secondary font-medium">03</span>
            How TraceBase pays its bills
          </h2>
          <p className="text-secondary">
            To ensure editorial independence, TraceBase relies on a diversified business model:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="rounded-xl p-3.5 bg-sheet border border-rule">
              <div className="font-semibold text-xs text-primary">The evaluation studio (primary revenue)</div>
              <p className="text-xs text-secondary mt-1">
                We perform paid technical documentation citation audits, RAG evaluation, and benchmark analysis for AI startups. This commercial studio cross-subsidizes our free community job hub.
              </p>
            </div>
            <div className="rounded-xl p-3.5 bg-sheet border border-rule">
              <div className="font-semibold text-xs text-primary">Referral credits (secondary)</div>
              <p className="text-xs text-secondary mt-1">
                Occasional referral bonuses earned when candidates successfully onboard onto vetted partner platforms.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs tabular-nums px-2 py-0.5 rounded border border-rule bg-surface text-secondary font-medium">04</span>
            Sponsored roles and paid placements
          </h2>
          <p className="text-secondary">
            TraceBase does not sell sponsored placements, promoted cards, or priority search rankings to employers or platforms. Every role in our directory passed the exact same human checks before being published.
          </p>
          <p className="text-secondary">
            If we ever accept commercial sponsorships or sponsored job posts in the future, we will adhere to strict editorial boundaries:
          </p>
          <div className="rounded-xl p-4 bg-sheet border border-rule space-y-3">
            <div className="flex items-center gap-3">
              <SponsoredBadge />
              <span className="text-xs text-secondary font-medium">Explicit visual indicator</span>
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-secondary">
              <li>Any sponsored listing will prominently display the amber Sponsored badge shown above.</li>
              <li>Sponsored listings will be placed in a clearly demarcated section separate from organic verified roles.</li>
              <li>Commercial payment will never buy a pass through our verification checks. If a role does not pass our checklist, it will not be listed at any price.</li>
            </ul>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs tabular-nums px-2 py-0.5 rounded border border-rule bg-surface text-secondary font-medium">05</span>
            Questions or corrections
          </h2>
          <p className="text-secondary">
            If you represent an AI training platform and wish to update your referral policy, provide a direct feed, or correct any listing detail, please consult our <Link href="/corrections" className="text-brand-ink underline">corrections procedure</Link> or email our editorial desk at <a href={`mailto:corrections@${getSiteHost()}`} className="text-brand-ink underline">corrections@{getSiteHost()}</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
