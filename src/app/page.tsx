import Link from 'next/link';
import type { Metadata } from 'next';
import { dbRepository } from '@/lib/db/repository';
import { HeroSequence } from '@/components/home/HeroSequence';
import { HeroCallToAction } from '@/components/home/HeroCallToAction';
import { LedgerSection, LedgerRoleItem } from '@/components/home/LedgerSection';
import { ScamCheckTeaser } from '@/components/home/ScamCheckTeaser';
import { HomeToolsShowcase } from '@/components/home/HomeToolsShowcase';
import { AiTeamsSection } from '@/components/home/AiTeamsSection';
import { PhoneActionBar } from '@/components/home/PhoneActionBar';
import { SigningStep2 } from '@/components/home/SigningStep2';
import { getRoleStatus } from '@/lib/utils/roleStatus';
import { QueueHealthRadar } from '@/components/ui/QueueHealthRadar';
import { DirectVsAgencyComparison } from '@/components/ui/DirectVsAgencyComparison';
import { WhatsAppAlertBanner } from '@/components/home/WhatsAppAlertBanner';
import { HomeNewsletterSection } from '@/components/home/HomeNewsletterSection';
import { AiWorkLandscapeRadar } from '@/components/home/AiWorkLandscapeRadar';
import { CheckCircle2, DollarSign, Activity, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'TraceBase | Human-Verified AI Work Hub & Model Evaluation Studio',
  description:
    'AI work, checked by a human. Model answers, checked against the source. Independent verification connecting remote contributors with legitimate AI roles.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TraceBase | Human-Verified AI Work Hub',
    description: 'AI work, checked by a human. Model answers, checked against the source.',
    url: '/',
    type: 'website',
  },
};

export const instant = false;

export default function Home() {
  const allVerified = dbRepository.getJobs({ status: 'verified' });
  const totalVerifiedCount = allVerified.length;

  const ledgerRoles: LedgerRoleItem[] = allVerified.map((job) => {
    const payText = job.pay_text ? job.pay_text.trim() : 'Not stated';
    const hasPayStated = !!job.pay_text && !job.pay_text.toLowerCase().includes('not stated');

    const formattedCheck = job.last_checked_at
      ? new Date(job.last_checked_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
      : '14 Oct';
    const isDue = job.status === 'needs_recheck';

    // One source of truth for role status
    const statusInfo = getRoleStatus(job, 'WW');

    return {
      id: job.id,
      slug: job.slug,
      title: job.title,
      platformName: job.platform.name,
      ngStatus: statusInfo.label,
      ngTone: statusInfo.tone,
      payText,
      hasPayStated,
      checkedText: isDue ? `${formattedCheck}, due again` : formattedCheck,
      isDue,
      isSample: statusInfo.isSample,
      eligibility: job.eligibility,
    };
  });

  const newestJob = allVerified[0];
  const checkDateStr = newestJob?.last_checked_at
    ? new Date(newestJob.last_checked_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '14 Oct 2026';

  return (
    <div className="w-full flex-1 flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden w-full">
        <div className="relative max-w-[1240px] mx-auto px-4 sm:px-8 py-14 sm:py-24 lg:py-28 flex flex-wrap gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading + Sentence + 2 Action Buttons */}
          <div className="flex-1 basis-[480px] min-w-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--brand-ink)]/30 bg-[var(--brand-tint)] text-xs font-semibold text-[var(--brand-ink)] mb-4 shadow-xs cs-badge-shimmer cs-glow-breathe">
              <span className="w-2 h-2 rounded-full bg-emerald-400 cs-beacon-ring" />
              <span>Independent human-verified AI work hub &amp; studio</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold tracking-[-0.035em] leading-[1.04] m-0 text-ink max-w-[18ch]">
              Know who&apos;s hiring &amp; which AI jobs are real before you apply.
            </h1>
            <HeroCallToAction />
          </div>

          {/* Right Column: Hero Sequence Paper Record */}
          <div className="flex-1 basis-[440px] min-w-0 flex justify-center lg:justify-end">
            <HeroSequence
              roleTitle={newestJob?.title || 'Search quality rater [SAMPLE]'}
              orgName={newestJob?.platform.name || 'Northwind Labs [SAMPLE]'}
              sourceDomain={newestJob?.official_url?.replace(/^https?:\/\//, '').split('/')[0] || 'employer.example/careers'}
              checkedDate={checkDateStr}
              eligibleCountries="Ghana, India, Kenya, Nigeria, South Africa"
              isSample={true}
            />
          </div>
        </div>
      </section>

      {/* 2. Verification Standards & Reality Metrics Bar */}
      <section aria-label="Verification standards" className="w-full border-y border-rule bg-surface/60 py-6">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="group cs-card-interactive cs-stagger-1 flex items-start gap-3 p-3 rounded-2xl border border-transparent hover:border-rule hover:bg-sheet transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-ink block group-hover:text-[var(--brand-ink)] transition-colors">100% human-verified</span>
                <p className="text-[11px] text-secondary leading-snug m-0">
                  Every role checked by hand on official career pages. Zero scraper noise.
                </p>
              </div>
            </div>

            <div className="group cs-card-interactive cs-stagger-2 flex items-start gap-3 p-3 rounded-2xl border border-transparent hover:border-rule hover:bg-sheet transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#5A35C8]/10 border border-[#5A35C8]/25 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200">
                <DollarSign className="w-5 h-5 text-[#5A35C8]" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-ink block group-hover:text-[var(--brand-ink)] transition-colors">$18 to $50/hr direct pay</span>
                <p className="text-[11px] text-secondary leading-snug m-0">
                  Direct client rates. Bypass agency cuts taking 50% to 70% of earnings.
                </p>
              </div>
            </div>

            <div className="group cs-card-interactive cs-stagger-3 flex items-start gap-3 p-3 rounded-2xl border border-transparent hover:border-rule hover:bg-sheet transition-all">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/25 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200">
                <Activity className="w-5 h-5 text-teal-500" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-ink block group-hover:text-[var(--brand-ink)] transition-colors">Live queue radar</span>
                <p className="text-[11px] text-secondary leading-snug m-0">
                  Real-time task volume and review speed tracked across 6 platforms.
                </p>
              </div>
            </div>

            <div className="group cs-card-interactive cs-stagger-4 flex items-start gap-3 p-3 rounded-2xl border border-transparent hover:border-rule hover:bg-sheet transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-ink block group-hover:text-[var(--brand-ink)] transition-colors">14-day check cycle</span>
                <p className="text-[11px] text-secondary leading-snug m-0">
                  Stale roles flagged at 14 days and removed after 30 days. No ghost jobs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive 3-Question Scam Check */}
      <ScamCheckTeaser />

      {/* 4. Live Platform Queue Health Radar */}
      <section aria-labelledby="queue-radar-heading" className="w-full py-10 sm:py-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <QueueHealthRadar />
        </div>
      </section>

      {/* 5. Recently Checked Ledger Section (5 rows on Home + See all roles) */}
      <LedgerSection roles={ledgerRoles.slice(0, 5)} totalCount={totalVerifiedCount} />

      {/* 6. Direct vs. Agency Earnings Breakdown & Calculator */}
      <section aria-labelledby="earnings-breakdown-heading" className="w-full py-10 sm:py-16 border-t border-rule bg-surface/30">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <DirectVsAgencyComparison />
        </div>
      </section>

      {/* 7. The 2026 AI Work Landscape Radar & Friction Haircut Analysis */}
      <AiWorkLandscapeRadar />

      {/* 8. Contributor Workbench Showcase */}
      <HomeToolsShowcase />

      {/* 9. Dedicated Free Newsletter & Daily Opportunities Capture */}
      <HomeNewsletterSection />

      {/* 10. How a Role Gets Signed (Compact on phone) */}
      <section id="how" aria-labelledby="how-h" className="w-full">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-12 sm:py-24">
          <h2 id="how-h" className="text-3xl sm:text-5xl font-extrabold tracking-tight m-0 text-ink">
            How a role gets signed
          </h2>
          <div className="relative mt-12">
            {/* Background Line */}
            <div aria-hidden="true" className="absolute left-0 right-0 top-0 h-[3px] bg-rule" />
            {/* Scroll-Driven Animated Line */}
            <div aria-hidden="true" className="cs-line absolute left-0 right-0 top-0 h-[3px] bg-[var(--brand-ink)]" />

            <ol className="relative m-0 p-0 list-none grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
              <li className="pt-7">
                <span className="font-bold text-sm text-[var(--brand-ink)]">Step 1</span>
                <h3 className="mt-2 mb-2.5 text-xl sm:text-2xl font-bold tracking-tight text-ink">
                  We open the employer&apos;s own page
                </h3>
                <p className="text-base sm:text-lg text-muted leading-relaxed m-0">
                  Not a reposting, not a Telegram screenshot. If we cannot find the role on the employer&apos;s official page, it does not go up.
                </p>
              </li>
              <li className="pt-7">
                <span className="font-bold text-sm text-[var(--brand-ink)]">Step 2</span>
                <h3 className="mt-2 mb-2.5 text-xl sm:text-2xl font-bold tracking-tight text-ink">
                  We copy down only what it says
                </h3>
                <SigningStep2 />
              </li>
              <li className="pt-7">
                <span className="font-bold text-sm text-[var(--brand-ink)]">Step 3</span>
                <h3 className="mt-2 mb-2.5 text-xl sm:text-2xl font-bold tracking-tight text-ink">
                  We sign it, then check again
                </h3>
                <p className="text-base sm:text-lg text-muted leading-relaxed m-0">
                  Every record carries the date. After 14 days without a recheck it is flagged, and after 30 days it comes down. See all updates in our <Link href="/changes" className="text-[#5A35C8] font-semibold hover:underline">public change log</Link>.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* 9. Verified Role Drops on WhatsApp and Telegram */}
      <section aria-label="Verified channel alerts" className="w-full py-10 sm:py-14 border-t border-rule bg-canvas">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <WhatsAppAlertBanner />
        </div>
      </section>

      {/* 10. For AI Teams Section (The Single Dark Band) */}
      <AiTeamsSection />

      {/* 11. Phone Sticky Action Bar (Mobile Only) */}
      <PhoneActionBar />
    </div>
  );
}
