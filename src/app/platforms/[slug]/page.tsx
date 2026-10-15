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

export const instant = false;

export async function generateStaticParams() {
  const platforms = dbRepository.getPlatforms();
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
      title: 'Platform Not Found | Countersign',
      description: 'The requested platform reality profile could not be found.',
    };
  }

  const cleanName = platform.name.replace(/\[SAMPLE\]/g, '').trim();

  return {
    title: `${cleanName} Reality Profile | Payouts, Assessment & Onboarding | Countersign`,
    description: `Independent reality check for ${cleanName}. Verified payout rails, onboarding timeline, and active evaluation opportunities.`,
    alternates: {
      canonical: `/platforms/${slug}`,
    },
    openGraph: {
      title: `${cleanName} Reality Profile | Countersign`,
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
      ? platformSteps.map((s) => ({
          number: s.position,
          title: s.title,
          duration: s.position === 1 ? '10 to 15 mins' : s.position === 2 ? '1 to 2 business days' : s.position === 3 ? '1.5 to 3 hours (unpaid)' : s.position === 4 ? '2 to 5 days' : 'Varies by project demand',
          sourceType: s.label === 'official' ? 'official' : s.label === 'reported' ? 'reported' : 'unconfirmed',
          description: s.detail || 'Standard platform operational procedure verified by contributor reports.',
          sourceName: s.source_url ? 'Official platform policy' : 'Community contributor logs',
          sourceUrl: s.source_url || undefined,
        }))
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
          className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary hover:text-accent-cyan transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to platforms directory</span>
        </Link>
      </div>

      {/* 1. Platform Header */}
      <div className="space-y-4 pb-6 border-b border-subtle">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl border border-subtle bg-surface flex items-center justify-center font-mono font-bold text-accent-cyan text-lg">
              {platform.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-primary">
                {platform.name}
              </h1>
              <div className="flex items-center gap-2 text-xs font-mono text-secondary mt-1">
                <span>
                  Reviewed: {platform.last_reviewed_at ? new Date(platform.last_reviewed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}
                </span>
                <span aria-hidden="true">&bull;</span>
                <span className="text-accent-cyan">Independent Review</span>
              </div>
            </div>
          </div>

          <a
            href={platform.official_url}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-subtle bg-surface hover:bg-elevated text-xs font-mono font-semibold text-primary transition-colors"
          >
            <span>Visit official site</span>
            <ExternalLink size={13} />
          </a>
        </div>

        {/* Independence Notice */}
        <p className="text-xs text-secondary leading-relaxed bg-void p-3 rounded-lg border border-subtle">
          <strong>Independence Statement:</strong> Countersign is an independent verification studio. We are not employed by, affiliated with, or paid by {platform.name} to write this review. All facts are verified against official policies or labeled as contributor reports.
        </p>
      </div>

      {/* 2. Quick Facts Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-subtle bg-surface space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-accent-cyan uppercase tracking-wider">
            <Building2 size={14} />
            <span>What They Do</span>
          </div>
          <p className="text-xs sm:text-sm text-readable leading-relaxed">
            {platform.description}
          </p>
        </div>

        <div className="p-5 rounded-xl border border-subtle bg-surface space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-accent-emerald uppercase tracking-wider">
            <GraduationCap size={14} />
            <span>Who It Suits</span>
          </div>
          <p className="text-xs sm:text-sm text-readable leading-relaxed">
            {platform.who_it_suits}
          </p>
        </div>

        <div className="p-5 rounded-xl border border-subtle bg-surface space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-primary uppercase tracking-wider">
            <DollarSign size={14} className="text-accent-emerald" />
            <span>Verified Payout Methods</span>
          </div>
          <p className="text-xs sm:text-sm text-readable leading-relaxed font-mono">
            {platform.payout_methods}
          </p>
          <span className="text-[11px] text-secondary font-mono block">
            Official payout rails verified against contributor documentation.
          </span>
        </div>

        <div className="p-5 rounded-xl border border-subtle bg-surface space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-accent-cyan uppercase tracking-wider">
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
          platformName={platform.name}
        />
      </section>

      {/* 4. Aggregated Community Experience Block (Section 13.5) */}
      <section className="p-5 rounded-xl border border-subtle bg-surface space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-subtle pb-3">
          <div>
            <h2 className="text-sm font-semibold font-mono text-primary uppercase tracking-wider">
              Community Experience Reality
            </h2>
            <p className="text-xs text-secondary mt-0.5">
              Moderated self-reports from active contributors. Unverified claims are filtered.
            </p>
          </div>
          <Link
            href={`/platforms/${platform.slug}/report`}
            className="px-3 py-1.5 rounded-lg border border-subtle hover:border-focus bg-void text-xs font-medium text-accent-cyan transition-colors"
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
                  <div className="p-3.5 rounded-lg border border-subtle bg-void space-y-1">
                    <span className="text-[11px] font-mono text-secondary uppercase">
                      Task Availability
                    </span>
                    <div className="text-base font-bold text-primary font-mono">
                      {experience.tasks_regular_percent}% Regular
                    </div>
                    <span className="text-[10px] text-secondary block">
                      {experience.tasks_intermittent_percent}% intermittent, {experience.tasks_empty_queue_percent}% empty queue
                    </span>
                  </div>

                  <div className="p-3.5 rounded-lg border border-subtle bg-void space-y-1">
                    <span className="text-[11px] font-mono text-secondary uppercase">
                      Onboarding Pay
                    </span>
                    <div className="text-base font-bold text-primary font-mono">
                      {experience.onboarding_paid_percent}% Paid
                    </div>
                    <span className="text-[10px] text-secondary block">
                      {100 - experience.onboarding_paid_percent}% report unpaid testing
                    </span>
                  </div>

                  <div className="p-3.5 rounded-lg border border-subtle bg-void space-y-1">
                    <span className="text-[11px] font-mono text-secondary uppercase">
                      Sudden Deactivations
                    </span>
                    <div className="text-base font-bold text-accent-warning font-mono">
                      {experience.removed_without_explanation_percent}% Removed
                    </div>
                    <span className="text-[10px] text-secondary block">
                      Without specific reviewer feedback
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-secondary font-mono">
                  Sample: {experience.sample_size} moderated self-reports ({experience.earliest_period} &ndash; {experience.latest_period}).
                </p>
              </div>
            );
          } else {
            return (
              <div className="p-4 rounded-lg border border-subtle bg-void text-xs text-secondary space-y-1">
                <p className="font-medium text-primary">Awaiting Sufficient Community Reports</p>
                <p>
                  Countersign requires a minimum of 3 moderated contributor reports before calculating aggregated queue availability and removal metrics.
                </p>
              </div>
            );
          }
        })()}
      </section>

      {/* 5. Country Eligibility Breakdown */}
      <section className="p-4 rounded-xl border border-subtle bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-semibold text-primary block">
            Applying from Nigeria or West Africa?
          </span>
          <span className="text-secondary">
            Check payout methods, degree recognition, and verified regional status for {cleanName}.
          </span>
        </div>
        <Link
          href={`/platforms/${platform.slug}/ng`}
          className="px-3 py-1.5 rounded-lg bg-accent-cyan/15 hover:bg-accent-cyan/25 text-accent-cyan font-medium transition-colors shrink-0"
        >
          {cleanName} in Nigeria &rarr;
        </Link>
      </section>

      {/* 6. Open Verified Roles on this Platform */}
      <section className="space-y-4 pt-4 border-t border-subtle">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold font-mono text-primary uppercase tracking-wider">
            Open Verified Roles at {cleanName}
          </h2>
          <span className="text-xs font-mono text-secondary">
            {openJobs.length} active
          </span>
        </div>

        {openJobs.length === 0 ? (
          <div className="p-6 rounded-xl border border-subtle bg-surface text-center text-xs text-secondary">
            No active openings currently verified on this platform. Check back after our next 14-day sweep.
          </div>
        ) : (
          <div className="space-y-3">
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

      {/* 5. Referral Disclosure & Corrections Link */}
      <section className="p-5 rounded-xl border border-subtle bg-void space-y-3 text-xs text-secondary">
        <div className="flex items-center gap-2 text-primary font-mono font-semibold">
          <HelpCircle size={15} className="text-accent-cyan" />
          <span>Platform Representation & Takedown Path</span>
        </div>
        <p className="leading-relaxed">
          Are you an authorized representative of {platform.name}? We welcome factual corrections, updated payout policies, or links to official career documentation. Submit corrections through our verified feedback channel.
        </p>
        <Link
          href="/corrections"
          className="inline-flex items-center gap-1.5 text-accent-cyan font-mono hover:underline pt-1"
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
          { name: platform.name.replace(/\[SAMPLE\]/g, '').trim(), item: `/platforms/${platform.slug}` },
        ]}
      />
    </div>
  );
}
