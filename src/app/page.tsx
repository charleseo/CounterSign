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
    const statusInfo = getRoleStatus(job, 'NG');

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
            <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-extrabold tracking-[-0.045em] leading-[0.98] m-0 text-ink max-w-[13ch]">
              Know which AI jobs are real before you apply.
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

      {/* 2. Interactive 3-Question Scam Check (Order: Hero -> Scam Check -> Recently Checked on phones) */}
      <ScamCheckTeaser />

      {/* 3. Recently Checked Ledger Section (5 rows on Home + See all roles) */}
      <LedgerSection roles={ledgerRoles.slice(0, 5)} totalCount={totalVerifiedCount} />

      {/* 4. Contributor Workbench Showcase */}
      <HomeToolsShowcase />

      {/* 5. How a Role Gets Signed (Compact on phone) */}
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

      {/* 5. For AI Teams Section (The Single Dark Band) */}
      <AiTeamsSection />

      {/* 6. Phone Sticky Action Bar (Mobile Only) */}
      <PhoneActionBar />
    </div>
  );
}
