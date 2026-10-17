import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ExternalLink,
  Building2,
  DollarSign,
  GraduationCap,
  Clock,
  ArrowUpRight,
  HelpCircle,
} from 'lucide-react';
import { dbRepository } from '@/lib/db/repository';
import { ExpectationTimeline, TimelineStep } from '@/components/ui/ExpectationTimeline';
import { JobCard } from '@/components/ui/JobCard';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';
import { SampleBadge } from '@/components/ui/SampleBadge';
import { ShareButton } from '@/components/ui/ShareButton';

export const instant = false;

export async function generateStaticParams() {
  const platforms = dbRepository.getPlatforms({ includeSample: true });
  if (platforms.length === 0) {
    return [{ slug: 'outlier' }];
  }
  return platforms.map((p) => ({ slug: p.slug }));
}

interface PlatformDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PlatformDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const platform = dbRepository.getPlatformBySlug(slug);

  if (!platform) {
    return {
      title: 'Platform Not Found | TraceBase',
      description: 'The requested platform reality profile could not be found.',
    };
  }

  const cleanName = platform.name.replace(/\[SAMPLE\]/g, '').trim();

  return {
    title: `${cleanName} Reality Profile | Payouts, Assessment & Onboarding | TraceBase`,
    description: `Independent reality check for ${cleanName}. Verified payout rails, onboarding timeline, and active evaluation opportunities.`,
    alternates: {
      canonical: `/platforms/${slug}`,
    },
    openGraph: {
      title: `${cleanName} Reality Profile | TraceBase`,
      description: `Independent breakdown of ${cleanName}: verified payouts, assessment style, and month one expectations.`,
      url: `/platforms/${slug}`,
      type: 'article',
    },
  };
}

export default async function PlatformDetailPage({ params }: PlatformDetailPageProps) {
  const { slug } = await params;
  const platform = dbRepository.getPlatformBySlug(slug);

  if (!platform) {
    notFound();
  }

  const cleanName = platform.name.replace(/\[SAMPLE\]/g, '').trim();

  // Fetch platform expectation timeline steps
  const platformSteps = dbRepository.getPlatformSteps(platform.id);
  const expectationSteps: TimelineStep[] | undefined =
    platformSteps.length > 0
      ? platformSteps.map((s) => {
          const sourceType =
            s.label === 'official' ? 'official' : s.label === 'reported' ? 'reported' : 'unconfirmed';
          const sourceName =
            sourceType === 'official'
              ? (s.source_url ? 'Official platform policy' : 'Official documentation')
              : sourceType === 'reported'
              ? 'Community contributor reports'
              : 'Unconfirmed contributor reports';

          return {
            number: s.position,
            title: s.title,
            duration:
              s.position === 1
                ? '10 to 15 mins'
                : s.position === 2
                ? '1 to 2 business days'
                : s.position === 3
                ? '1.5 to 3 hours (unpaid)'
                : s.position === 4
                ? '2 to 5 days'
                : 'Varies by project demand',
            sourceType,
            description: s.detail || 'Standard platform operational procedure verified by contributor reports.',
            sourceName,
            sourceUrl: sourceType === 'official' ? s.source_url || undefined : undefined,
          };
        })
      : undefined;

  // Fetch open jobs for this platform
  const openJobs = dbRepository
    .getJobs()
    .filter((j) => j.platform_id === platform.id);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Back to Platforms Link */}
      <div>
        <Link
          href="/platforms"
          className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-[#5A35C8] transition-colors min-h-[44px]"
        >
          <ArrowLeft size={14} />
          <span>Back to platforms directory</span>
        </Link>
      </div>

      {/* 1. Platform Header */}
      <div className="space-y-4 pb-6 border-b border-rule">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl border border-rule bg-surface flex items-center justify-center font-bold text-[#5A35C8] text-lg">
              {cleanName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink">
                  {cleanName}
                </h1>
                {platform.name.includes('[SAMPLE]') && <SampleBadge />}
              </div>
              <div className="flex items-center gap-2 text-xs text-secondary mt-1">
                <span className="tabular-nums">
                  Reviewed: {platform.last_reviewed_at ? new Date(platform.last_reviewed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}
                </span>
                <span aria-hidden="true">&bull;</span>
                <span className="text-ink font-medium">Independent Review</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ShareButton
              title={`${cleanName} Reality Profile | TraceBase`}
              shareText={`${cleanName} independent reality check on TraceBase: payouts, tests and month one expectations:`}
              url={`/platforms/${slug}`}
              pageType="platform"
              buttonText="Share"
            />
            <a
              href={platform.official_url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-rule bg-sheet hover:bg-surface text-xs font-medium text-ink transition-colors min-h-[44px]"
            >
              <span>Visit official site</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Independence Notice */}
        <p className="text-xs text-secondary leading-relaxed bg-surface p-3.5 rounded-xl border border-rule">
          <strong>Independence Statement:</strong> TraceBase is an independent verification studio. We are not employed by, affiliated with, or paid by {cleanName} to write this review. All facts are verified against official policies or labeled as contributor reports.
        </p>
      </div>

      {/* 2. Quick Facts Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-rule bg-sheet space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-[#5A35C8]">
            <Building2 size={14} />
            <span>What They Do</span>
          </div>
          <p className="text-xs sm:text-sm text-readable leading-relaxed">
            {platform.description}
          </p>
        </div>

        <div className="p-5 rounded-xl border border-rule bg-sheet space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-[#17663F]">
            <GraduationCap size={14} />
            <span>Who It Suits</span>
          </div>
          <p className="text-xs sm:text-sm text-readable leading-relaxed">
            {platform.who_it_suits}
          </p>
        </div>

        <div className="p-5 rounded-xl border border-rule bg-sheet space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-ink">
            <DollarSign size={14} className="text-[#17663F]" />
            <span>Verified Payout Methods</span>
          </div>
          <p className="text-xs sm:text-sm text-readable leading-relaxed">
            {platform.payout_methods}
          </p>
          <span className="text-xs text-secondary block">
            Official payout rails verified against contributor documentation.
          </span>
        </div>

        <div className="p-5 rounded-xl border border-rule bg-sheet space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-[#5A35C8]">
            <Clock size={14} />
            <span>Assessment Style</span>
          </div>
          <p className="text-xs sm:text-sm text-readable leading-relaxed">
            {platform.assessment_style}
          </p>
        </div>
      </section>

      {/* 3. Expectation Timeline Block */}
      <section className="space-y-4">
        <ExpectationTimeline
          {...(expectationSteps ? { steps: expectationSteps } : {})}
          platformName={cleanName}
        />
      </section>

      {/* 4. Aggregated Community Experience Block */}
      <section className="p-5 rounded-xl border border-rule bg-sheet space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
          <div>
            <h2 className="text-sm font-semibold text-ink">
              Community Experience Reality
            </h2>
            <p className="text-xs text-secondary mt-0.5">
              Moderated self-reports from active contributors. Unverified claims are filtered.
            </p>
          </div>
          <Link
            href={`/platforms/${platform.slug}/report`}
            className="px-3 py-1.5 rounded-lg border border-rule hover:border-[#5A35C8] bg-surface text-xs font-medium text-[#5A35C8] transition-colors min-h-[44px] inline-flex items-center"
          >
            Submit Experience Report &rarr;
          </Link>
        </div>

        {(() => {
          const experience = dbRepository.getAggregatedPlatformExperience(platform.id);
          if (experience.has_sufficient_reports) {
            return (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-lg border border-rule bg-surface space-y-1">
                    <span className="text-xs text-secondary">
                      Task Availability
                    </span>
                    <div className="text-base font-bold text-ink tabular-nums">
                      {experience.sample_size < 20
                        ? `${experience.tasks_regular_count} of ${experience.sample_size} reports`
                        : `${experience.tasks_regular_percent}% Regular`}
                    </div>
                    <span className="text-[11px] text-secondary block tabular-nums">
                      {experience.sample_size < 20
                        ? `${experience.tasks_intermittent_count} intermittent, ${experience.tasks_empty_queue_count} empty queue`
                        : `${experience.tasks_intermittent_percent}% intermittent, ${experience.tasks_empty_queue_percent}% empty queue`}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-lg border border-rule bg-surface space-y-1">
                    <span className="text-xs text-secondary">
                      Onboarding Pay
                    </span>
                    <div className="text-base font-bold text-ink tabular-nums">
                      {experience.sample_size < 20
                        ? `${experience.onboarding_paid_count} of ${experience.sample_size} reports`
                        : `${experience.onboarding_paid_percent}% Paid`}
                    </div>
                    <span className="text-[11px] text-secondary block tabular-nums">
                      {experience.sample_size < 20
                        ? `${experience.sample_size - experience.onboarding_paid_count} of ${experience.sample_size} report unpaid testing`
                        : `${100 - experience.onboarding_paid_percent}% report unpaid testing`}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-lg border border-rule bg-surface space-y-1">
                    <span className="text-xs text-secondary">
                      Sudden Deactivations
                    </span>
                    <div className="text-base font-bold text-[#A8322A] tabular-nums">
                      {experience.sample_size < 20
                        ? `${experience.removed_without_explanation_count} of ${experience.sample_size} reports`
                        : `${experience.removed_without_explanation_percent}% Removed`}
                    </div>
                    <span className="text-[11px] text-secondary block">
                      Without specific reviewer feedback
                    </span>
                  </div>
                </div>

                <p className="text-xs text-secondary tabular-nums">
                  Sample: {experience.sample_size} moderated self-reports ({experience.earliest_period} &ndash; {experience.latest_period}).
                </p>
              </div>
            );
          } else {
            return (
              <div className="p-4 rounded-lg border border-rule bg-surface text-xs text-secondary space-y-1">
                <p className="font-medium text-ink">Awaiting Sufficient Community Reports</p>
                <p>
                  TraceBase requires a minimum of 3 moderated contributor reports before calculating aggregated queue availability and removal metrics.
                </p>
              </div>
            );
          }
        })()}
      </section>

      {/* 5. Country Eligibility Breakdown */}
      <section className="p-4 rounded-xl border border-rule bg-sheet flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-semibold text-ink block">
            Applying from Nigeria or West Africa?
          </span>
          <span className="text-secondary">
            Check payout methods, degree recognition, and verified regional status for {cleanName}.
          </span>
        </div>
        <Link
          href={`/platforms/${platform.slug}/ng`}
          className="px-3.5 py-2 rounded-xl bg-[#5A35C8]/10 hover:bg-[#5A35C8]/20 text-[#5A35C8] font-medium transition-colors shrink-0 min-h-[44px] inline-flex items-center"
        >
          {cleanName} in Nigeria &rarr;
        </Link>
      </section>

      {/* 6. Open Roles on this Platform */}
      <section className="space-y-4 pt-4 border-t border-rule">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">
            Open Roles at {cleanName}
          </h2>
          <span className="text-xs text-secondary tabular-nums">
            {openJobs.length} active
          </span>
        </div>

        {openJobs.length === 0 ? (
          <div className="p-6 rounded-xl border border-rule bg-sheet text-center text-xs text-secondary">
            No active openings currently verified on this platform. Check back after our next 14-day sweep.
          </div>
        ) : (
          <div className="space-y-2">
            {openJobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                slug={job.slug}
                title={job.title}
                platform={cleanName}
                workType={job.work_type}
                countryEligibility="accepted"
                verifiedPay={job.pay_verified ? job.pay_text || undefined : undefined}
                daysAgo={job.daysAgo ?? 0}
                status={job.status}
              />
            ))}
          </div>
        )}
      </section>

      {/* 7. Platform Representation & Takedown Path */}
      <section className="p-5 rounded-xl border border-rule bg-surface space-y-3 text-xs text-secondary">
        <div className="flex items-center gap-2 text-ink font-semibold">
          <HelpCircle size={15} className="text-[#5A35C8]" />
          <span>Platform Representation & Takedown Path</span>
        </div>
        <p className="leading-relaxed">
          Are you an authorized representative of {cleanName}? We welcome factual corrections, updated payout policies, or links to official career documentation. Submit corrections through our verified feedback channel.
        </p>
        <Link
          href="/corrections"
          className="inline-flex items-center gap-1.5 text-[#5A35C8] hover:underline pt-1 min-h-[44px]"
        >
          <span>Submit a platform correction or update request</span>
          <ArrowUpRight size={13} />
        </Link>
      </section>

      {/* Structured Data: Breadcrumbs */}
      <BreadcrumbListJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Platforms', item: '/platforms' },
          { name: cleanName, item: `/platforms/${platform.slug}` },
        ]}
      />
    </div>
  );
}
