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
import { HomeBentoGrid } from '@/components/home/HomeBentoGrid';
import { TailscaleLogoGrid } from '@/components/home/TailscaleLogoGrid';
import { CheckCircle2 } from 'lucide-react';

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
    : '18 Oct 2026';

  return (
    <div className="w-full flex-1 flex flex-col">
      {/* 1. Hero Section with Tailscale Micro-dot Texture */}
      <section className="relative overflow-hidden w-full bg-dot-pattern">
        <div className="relative max-w-[1240px] mx-auto px-4 sm:px-8 py-12 sm:py-20 lg:py-24 flex flex-wrap gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading + Sentence + 2 Action Buttons */}
          <div className="flex-1 basis-[480px] min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule bg-sheet text-xs font-mono font-medium text-ink mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Independent human-verified AI work hub &amp; studio</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold tracking-[-0.035em] leading-[1.05] m-0 text-ink max-w-[18ch]">
              Know who&apos;s hiring &amp; which AI jobs are real before you apply.
            </h1>
            <HeroCallToAction />
          </div>

          {/* Right Column: Hero Sequence Tailscale Console */}
          <div className="flex-1 basis-[440px] min-w-0 flex justify-center lg:justify-end">
            <HeroSequence
              roleTitle={newestJob?.title || 'Search quality rater [SAMPLE]'}
              orgName={newestJob?.platform.name || 'Northwind Labs [SAMPLE]'}
              sourceDomain={newestJob?.official_url?.replace(/^https?:\/\//, '').split('/')[0] || 'outlier.ai/careers'}
              checkedDate={checkDateStr}
              eligibleCountries="Ghana, India, Kenya, Nigeria, South Africa"
              isSample={true}
            />
          </div>
        </div>
      </section>

      {/* 2. Tailscale Trust & Verification Strip */}
      <div className="w-full border-b border-rule bg-surface/70 py-3.5 px-4 sm:px-8 select-none">
        <div className="max-w-[1240px] mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-6 text-xs font-mono text-secondary">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-800 dark:text-emerald-400 shrink-0" />
            <span>100% official career pages</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-800 dark:text-emerald-400 shrink-0" />
            <span>14-day mandatory recheck cycle</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-800 dark:text-emerald-400 shrink-0" />
            <span>0% intermediary agency haircut</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-800 dark:text-emerald-400 shrink-0" />
            <span>Direct client pay: $18 to $110/hr</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-800 dark:text-emerald-400 shrink-0" />
            <span>Scam recruiter detection</span>
          </div>
        </div>
      </div>

      {/* 2b. Tailscale-Style Ecosystem & Platform Directory Grid */}
      <TailscaleLogoGrid />

      {/* 3. Verification Standards Bento Grid (Tailscale 4-Pillar Architecture) */}
      <HomeBentoGrid />

      {/* 4. Recently Checked Ledger Section (The Central Product Experience) */}
      <LedgerSection roles={ledgerRoles.slice(0, 5)} totalCount={totalVerifiedCount} />

      {/* 5. Interactive 3-Question Scam Check */}
      <ScamCheckTeaser />

      {/* 6. Live Platform Queue Health Radar */}
      <section aria-labelledby="queue-radar-heading" className="w-full py-10 sm:py-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <QueueHealthRadar />
        </div>
      </section>

      {/* 7. Direct vs. Agency Earnings Breakdown & Calculator */}
      <section aria-labelledby="earnings-breakdown-heading" className="w-full py-10 sm:py-16 border-t border-rule bg-surface/30">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <DirectVsAgencyComparison />
        </div>
      </section>

      {/* 8. The 2026 AI Work Landscape Radar & Friction Haircut Analysis */}
      <AiWorkLandscapeRadar />

      {/* 9. Contributor Workbench Showcase */}
      <HomeToolsShowcase />

      {/* 10. Dedicated Free Newsletter & Daily Opportunities Capture */}
      <HomeNewsletterSection />

      {/* 11. How a Role Gets Signed (Compact on phone) */}
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

      {/* 12. Verified Role Drops on WhatsApp and Telegram */}
      <section aria-label="Verified channel alerts" className="w-full py-10 sm:py-14 border-t border-rule bg-canvas">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <WhatsAppAlertBanner />
        </div>
      </section>

      {/* 13. For AI Teams Section (The Single Dark Band) */}
      <AiTeamsSection />

      {/* 14. Phone Sticky Action Bar (Mobile Only) */}
      <PhoneActionBar />
    </div>
  );
}
