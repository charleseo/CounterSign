import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Referral Disclosure & Neutrality Pledge | Countersign',
  description: 'How Countersign labels direct vs referral links, how we may earn compensation, and our strict pledge that referral earnings never alter ranking, freshness, or verification status.',
};

export default function ReferralDisclosurePage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-secondary">
          <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-emerald)]" />
          <span>Transparency &amp; Independence Standard : Version 1.0</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient-emerald">
          Referral &amp; Commercial Disclosure
        </h1>
        <p className="text-sm sm:text-base text-secondary leading-relaxed">
          At Countersign, trust is our primary asset. We believe job seekers and enterprise clients deserve complete, upfront clarity regarding how our service is funded and how external platform links are handled.
        </p>
        <div className="flex items-center gap-4 text-xs font-mono text-secondary pt-2 border-t border-[var(--border-subtle)]">
          <span>Effective Date: 14 October 2026</span>
          <span>&bull;</span>
          <span>Audited Policy</span>
        </div>
      </div>

      {/* The Neutrality Pledge */}
      <div className="glass-panel rounded-2xl p-6 space-y-3 relative overflow-hidden" style={{ borderColor: 'rgba(69, 245, 197, 0.2)' }}>
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-[radial-gradient(circle,rgba(69,245,197,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="flex items-center gap-2 text-base font-bold text-primary relative">
          <CheckCircle2 className="w-5 h-5 text-[var(--accent-emerald)] shrink-0" />
          <span>The Countersign Neutrality Pledge</span>
        </div>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed relative">
          Referral compensation <strong className="text-primary">NEVER</strong> alters a role&apos;s search ranking, verification status, freshness badge, or eligibility assessment. We list roles because they are verified opportunities for talent, never because a platform offers a commission.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10 text-sm text-primary leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="glass-pill text-xs font-mono px-2 py-0.5 rounded text-[var(--accent-cyan)]">01</span>
            How Links Are Labeled
          </h2>
          <p className="text-secondary">
            Every outbound link on Countersign is clearly categorized on both the job card and the detail page:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Direct Link */}
            <div className="glass-card rounded-xl p-4 space-y-2 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-[radial-gradient(circle,rgba(61,235,255,0.06)_0%,transparent_70%)] pointer-events-none" />
              <div className="flex items-center justify-between relative">
                <span className="glass-pill text-xs font-mono font-semibold px-2 py-0.5 rounded text-[var(--accent-cyan)]">
                  Direct Link
                </span>
                <span className="text-[11px] text-secondary font-mono">No commission</span>
              </div>
              <p className="text-xs font-semibold text-primary relative">
                Direct link. No referral.
              </p>
              <p className="text-xs text-secondary relative">
                Points directly to the employer&apos;s official careers portal (Ashby, Greenhouse, Lever, or direct site). Countersign receives zero financial compensation if you apply or get hired.
              </p>
            </div>

            {/* Referral Link */}
            <div className="glass-card rounded-xl p-4 space-y-2 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-[radial-gradient(circle,rgba(69,245,197,0.06)_0%,transparent_70%)] pointer-events-none" />
              <div className="flex items-center justify-between relative">
                <span className="glass-pill text-xs font-mono font-semibold px-2 py-0.5 rounded text-[var(--accent-emerald)]">
                  Referral Link
                </span>
                <span className="text-[11px] text-secondary font-mono">Bonus possible</span>
              </div>
              <p className="text-xs font-semibold text-primary relative">
                Referral link: we may earn a bonus if you qualify. It costs you nothing.
              </p>
              <p className="text-xs text-secondary relative">
                Where an authorized community referral or talent partner program exists, clicking this link may generate a referral credit or bonus to Countersign if you pass platform screening and complete qualifying work tasks.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="glass-pill text-xs font-mono px-2 py-0.5 rounded text-[var(--accent-cyan)]">02</span>
            Zero Cost to Candidates Guarantee
          </h2>
          <p className="text-secondary">
            Using a referral link will <strong className="text-primary">never</strong> increase fees, decrease your hourly pay rate, or impose any cost on you as a candidate:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-secondary">
            <li>Your compensation is paid 100% by the hiring platform at their standard rates.</li>
            <li>Referral bonuses are paid directly from the platform&apos;s recruiting or community acquisition budget.</li>
            <li>Countersign will never charge you for application access, guides, cheat sheets, or interview tips.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="glass-pill text-xs font-mono px-2 py-0.5 rounded text-[var(--accent-cyan)]">03</span>
            How Countersign Sustains Itself
          </h2>
          <p className="text-secondary">
            To ensure editorial independence, Countersign relies on a diversified business model:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="glass-card rounded-xl p-3.5">
              <div className="font-semibold text-xs text-primary">The Evaluation Studio (Primary Revenue)</div>
              <p className="text-xs text-secondary mt-1">
                We perform paid technical documentation citation audits, RAG evaluation, and benchmark analysis for AI startups. This commercial studio cross-subsidizes our free community job hub.
              </p>
            </div>
            <div className="glass-card rounded-xl p-3.5">
              <div className="font-semibold text-xs text-primary">Referral Credits (Secondary)</div>
              <p className="text-xs text-secondary mt-1">
                Occasional referral bonuses earned when candidates successfully onboard onto vetted partner platforms.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="glass-pill text-xs font-mono px-2 py-0.5 rounded text-[var(--accent-cyan)]">04</span>
            Questions or Corrections
          </h2>
          <p className="text-secondary">
            If you represent an AI training platform and wish to update your referral policy, provide a direct feed, or correct any listing detail, please consult our <Link href="/corrections" className="text-[var(--accent-cyan)] underline">Corrections Procedure</Link> or email our editorial desk at <a href="mailto:corrections@countersign.ai" className="text-[var(--accent-cyan)] underline">corrections@countersign.ai</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
