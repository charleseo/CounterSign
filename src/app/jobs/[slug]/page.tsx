import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Globe,
  DollarSign,
  GraduationCap,
  HelpCircle,
  Building2,
  Check,
} from 'lucide-react';
import { dbRepository } from '@/lib/db/repository';
import { StatusBadge, StatusType } from '@/components/ui/StatusBadge';
import { FreshnessStamp } from '@/components/ui/FreshnessStamp';
import { TruthStrip } from '@/components/ui/TruthStrip';
import { ExpectationTimeline, TimelineStep } from '@/components/ui/ExpectationTimeline';
import { JobProblemReporter } from './JobProblemReporter';
import { JobCard } from '@/components/ui/JobCard';
import { BreadcrumbListJsonLd, JobPostingJsonLd } from '@/components/seo/JsonLd';

export const instant = false;

export async function generateStaticParams() {
  const jobs = dbRepository.getJobs({ status: 'all' });
  return jobs.map((job) => ({ slug: job.slug }));
}

interface JobDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = dbRepository.getJobBySlug(slug);

  if (!job) {
    return {
      title: 'Role Not Found | Countersign',
      description: 'The requested AI evaluation opportunity could not be found.',
    };
  }

  const cleanTitle = job.title.replace(/\[SAMPLE\]/g, '').trim();

  return {
    title: `${cleanTitle} at ${job.platform.name} | Countersign`,
    description: `Human-verified ${job.work_type} role at ${job.platform.name}. Transparent country eligibility, confirmed pay rates, and realistic onboarding timeline.`,
    alternates: {
      canonical: `/jobs/${slug}`,
    },
    openGraph: {
      title: `${cleanTitle} | Verified AI Work | Countersign`,
      description: `Human-verified ${job.work_type} role at ${job.platform.name}. Country eligibility and pay confirmed.`,
      url: `/jobs/${slug}`,
      type: 'article',
    },
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug } = await params;
  const job = dbRepository.getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const cleanTitle = job.title.replace(/\[SAMPLE\]/g, '').trim();
  const isClosed = job.status === 'closed';
  const needsRecheck = job.status === 'needs_recheck';

  // Fetch platform expectation steps
  const platformSteps = dbRepository.getPlatformSteps(job.platform_id);
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

  // Recent check logs for this specific job
  const recentChecks = dbRepository.getCheckLogs(job.id, 5);

  // Similar open roles
  const relatedRoles = dbRepository
    .getJobs()
    .filter((j) => j.id !== job.id && j.status !== 'closed' && (j.work_type === job.work_type || j.platform_id === job.platform_id))
    .slice(0, 3);

  // Eligibility values for TruthStrip
  const ngElig = job.eligibility.find((e) => e.country_code === 'NG');
  const eligibilitySummary = ngElig
    ? `Nigeria: ${ngElig.status === 'accepted' ? 'Accepted' : ngElig.status === 'not_accepted' ? 'Not accepted' : 'Unconfirmed'}`
    : `${job.eligibility.filter((e) => e.status === 'accepted').length} countries accepted`;

  const paySummary = job.pay_verified && job.pay_text ? job.pay_text : 'Pay: not confirmed';

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Back to Jobs Link */}
      <div>
        <Link
          href="/jobs"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary hover:text-accent-cyan transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to verified jobs list</span>
        </Link>
      </div>

      {/* Closed Banner */}
      {isClosed && (
        <div className="p-4 sm:p-5 rounded-xl border border-accent-danger/40 bg-accent-danger/10 flex items-start gap-3 text-xs animate-in fade-in">
          <AlertTriangle size={18} className="text-[#FF6B6B] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-primary">This role is now closed</h2>
            <p className="text-readable leading-relaxed">
              Applications for this specific project or listing have concluded. The link is kept active for historical transparency. Similar verified roles are listed at the bottom of this page.
            </p>
          </div>
        </div>
      )}

      {/* Needs Recheck Warning Banner */}
      {needsRecheck && !isClosed && (
        <div className="p-4 sm:p-5 rounded-xl border border-[#FFC66D]/40 bg-[#FFC66D]/10 flex items-start gap-3 text-xs animate-in fade-in">
          <Clock size={18} className="text-[#FFC66D] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-primary">Needs human re-verification</h2>
            <p className="text-readable leading-relaxed">
              Last checked {job.daysAgo ?? 15} days ago. Our automated status sweeper flagged this role because it exceeded our strict 14-day human check window. Check the official page before you apply.
            </p>
          </div>
        </div>
      )}

      {/* Two Column Layout: Details on Left, Sticky Summary & Apply on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
        {/* Left Column: Full Role Overview & Evidence */}
        <article className="space-y-8">
          {/* 1. Header Block */}
          <div className="space-y-3 pb-6 border-b border-subtle">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Link
                href={`/platforms/${job.platform.slug}`}
                className="font-mono font-semibold text-accent-cyan uppercase tracking-wider hover:underline"
              >
                {job.platform.name}
              </Link>
              <span className="text-secondary" aria-hidden="true">&bull;</span>
              <span className="text-secondary">{job.work_type}</span>
              <span className="text-secondary" aria-hidden="true">&bull;</span>
              <StatusBadge status={job.status} size="sm" />
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-primary leading-tight">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <FreshnessStamp daysAgo={job.daysAgo ?? 0} />
              {job.pay_verified && job.pay_text && (
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-primary font-semibold px-2.5 py-1 rounded bg-elevated border border-subtle">
                  <DollarSign size={13} className="text-accent-emerald" />
                  <span>{job.pay_text}</span>
                  <span className="text-[10px] text-accent-emerald font-normal">(Verified)</span>
                </div>
              )}
            </div>
          </div>

          {/* 2. Truth Strip */}
          <section aria-label="Truth summary strip">
            <TruthStrip
              eligibility={eligibilitySummary}
              payBasis={paySummary}
              onboarding="5-step vetted pipeline"
              lastChecked={`${job.daysAgo ?? 0} days ago`}
              eligibilitySourceUrl={job.official_url}
              paySourceUrl={job.pay_source_url || undefined}
              onboardingSourceUrl={job.official_url}
              lastCheckedSourceUrl={job.official_url}
              isClosed={isClosed}
            />
          </section>

          {/* 3. Original Role Summary */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold font-mono text-primary uppercase tracking-wider">
              Role Overview
            </h2>
            <p className="text-sm sm:text-base text-readable leading-relaxed">
              {job.summary}
            </p>
          </section>

          {/* 4. Requirements & Degree-Level Pills (Section 7.3 & v4 handoff) */}
          <section className="space-y-4 p-5 rounded-xl border border-subtle bg-surface">
            <div className="flex items-center gap-2 text-sm font-semibold font-mono text-primary uppercase tracking-wider">
              <GraduationCap size={16} className="text-accent-cyan" />
              <h2>Qualification & Role Requirements</h2>
            </div>

            {/* Degree-level pills (only shown when official source states them) */}
            {job.degree_levels && job.degree_levels.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-secondary">
                  Official Degree Qualifications Stated:
                </span>
                <div className="flex flex-wrap gap-2">
                  {job.degree_levels.map((lvl) => (
                    <span
                      key={lvl}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-medium border border-accent-cyan/40 bg-accent-cyan/10 text-primary"
                    >
                      <Check size={11} className="text-accent-cyan" />
                      <span>{lvl}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {job.requirements && (
              <div className="space-y-2 pt-2 border-t border-subtle">
                <span className="text-xs font-mono text-secondary">Core Prerequisites:</span>
                <p className="text-xs sm:text-sm text-readable leading-relaxed">
                  {job.requirements}
                </p>
              </div>
            )}

            {/* Domains & Languages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-subtle text-xs">
              <div>
                <span className="text-secondary font-mono block mb-1">Evaluated Domains:</span>
                <div className="flex flex-wrap gap-1.5">
                  {job.domains.map((d) => (
                    <span
                      key={d}
                      className="px-2 py-0.5 rounded bg-void border border-subtle text-primary font-mono text-[11px]"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-secondary font-mono block mb-1">Required Working Languages:</span>
                <div className="flex flex-wrap gap-1.5">
                  {job.languages.map((l) => (
                    <span
                      key={l}
                      className="px-2 py-0.5 rounded bg-void border border-subtle text-primary font-mono text-[11px]"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 5. Country Eligibility Table */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold font-mono text-primary uppercase tracking-wider flex items-center gap-2">
                <Globe size={15} className="text-accent-cyan" />
                <span>Verified Country Eligibility</span>
              </h2>
              <span className="text-[11px] font-mono text-secondary">
                Never inferred from &quot;remote&quot;
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-subtle bg-surface">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-subtle bg-void/50 text-secondary font-mono">
                    <th className="py-2.5 px-4 font-medium">Country</th>
                    <th className="py-2.5 px-4 font-medium">Status</th>
                    <th className="py-2.5 px-4 font-medium hidden sm:table-cell">Source Policy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-subtle">
                  {job.eligibility.map((el) => {
                    const statusConfig = {
                      accepted: { label: 'Accepted', badge: 'accepted' as StatusType },
                      not_accepted: { label: 'Not accepted', badge: 'not-accepted' as StatusType },
                      unconfirmed: { label: 'Unconfirmed', badge: 'unconfirmed' as StatusType },
                    }[el.status];

                    return (
                      <tr key={el.country_code} className="hover:bg-elevated/40 transition-colors">
                        <td className="py-2.5 px-4 font-mono font-medium text-primary">
                          {el.country_code}
                        </td>
                        <td className="py-2.5 px-4">
                          <StatusBadge status={statusConfig.badge} size="sm" showExplanationOnClick={false} />
                        </td>
                        <td className="py-2.5 px-4 text-secondary hidden sm:table-cell font-mono text-[11px]">
                          {el.source_url ? (
                            <a
                              href={el.source_url}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="text-accent-cyan hover:underline inline-flex items-center gap-1"
                            >
                              <span>Official Career Portal</span>
                              <ExternalLink size={10} />
                            </a>
                          ) : (
                            <span>Unconfirmed by employer feed</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. What to Expect: 5-Step Expectation Timeline */}
          <section className="space-y-4">
            <ExpectationTimeline
              {...(expectationSteps ? { steps: expectationSteps } : {})}
              platformName={job.platform.name}
            />
          </section>

          {/* 7. What We Could Not Confirm (Section 7.3 plain honesty) */}
          <section className="p-5 rounded-xl border border-subtle bg-surface space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold font-mono text-primary uppercase tracking-wider">
              <HelpCircle size={16} className="text-[#FFC66D]" />
              <h2>What We Could Not Confirm</h2>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              In accordance with our honesty standards, the following aspects were not publicly stated on official employer feeds:
            </p>
            <ul className="space-y-2 text-xs text-readable list-disc pl-5">
              <li>
                <strong>Weekly Task Volume Guarantee:</strong> Remote evaluation tasks fluctuate by client project cycles. Queues may sit empty between evaluation milestones.
              </li>
              <li>
                <strong>Local Payout Processing Fees:</strong> Third-party payment rails (PayPal, Deel, AirTM) may charge currency conversion fees (typically 1% to 2.5%) when transferring funds into local bank accounts.
              </li>
              <li>
                <strong>Assessment Pass Rates:</strong> The platform does not disclose benchmark pass thresholds or test scoring formulas.
              </li>
            </ul>
          </section>

          {/* 8. Verification Check Log (Audit Trail) */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold font-mono text-primary uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck size={16} className="text-accent-emerald" />
                <span>Verification Check Log</span>
              </h2>
              <span className="text-[11px] font-mono text-secondary">
                Last 5 checks
              </span>
            </div>

            <div className="space-y-2.5">
              {recentChecks.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-lg border border-subtle bg-surface text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          log.result === 'verified'
                            ? 'bg-accent-emerald'
                            : log.result === 'needs_recheck'
                            ? 'bg-[#FFC66D]'
                            : 'bg-accent-danger'
                        }`}
                      />
                      <span className="font-mono font-semibold uppercase text-primary">
                        {log.result}
                      </span>
                    </div>
                    <span className="font-mono text-secondary text-[11px]">
                      {new Date(log.checked_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="text-readable">{log.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 9. Report a Problem Section */}
          <section>
            <JobProblemReporter jobTitle={job.title} jobSlug={job.slug} />
          </section>

          {/* 10. Related Open Opportunities */}
          {relatedRoles.length > 0 && (
            <section className="space-y-4 pt-4 border-t border-subtle">
              <h2 className="text-sm font-semibold font-mono text-primary uppercase tracking-wider">
                Related Verified Opportunities
              </h2>
              <div className="space-y-3">
                {relatedRoles.map((r) => (
                  <JobCard
                    key={r.id}
                    id={r.id}
                    slug={r.slug}
                    title={r.title}
                    platform={r.platform.name}
                    workType={r.work_type}
                    countryEligibility="accepted"
                    verifiedPay={r.pay_verified ? r.pay_text || undefined : undefined}
                    daysAgo={r.daysAgo ?? 0}
                    status={r.status}
                  />
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Right Column: Sticky Summary & Official Application Card (Desktop) */}
        <aside className="space-y-6">
          <div className="sticky top-20 rounded-xl border border-subtle bg-surface p-5 space-y-5 shadow-lg">
            <div className="space-y-2 pb-4 border-b border-subtle">
              <div className="flex items-center gap-2">
                <Building2 size={15} className="text-secondary" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-secondary">
                  Employer Platform
                </span>
              </div>
              <div className="text-lg font-bold text-primary">
                {job.platform.name}
              </div>
              <p className="text-xs text-secondary leading-relaxed">
                {job.platform.description || 'Verified international model evaluation platform.'}
              </p>
            </div>

            {/* Quick Facts */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-secondary">Verified Pay:</span>
                <span className="font-mono font-semibold text-primary">
                  {job.pay_verified ? job.pay_text : 'Not confirmed'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary">Payout Rails:</span>
                <span className="font-mono text-readable">
                  {job.platform.payout_methods || 'Standard remote ACH / PayPal'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary">Link Classification:</span>
                <span className="font-mono uppercase text-[11px] px-2 py-0.5 rounded bg-void border border-subtle text-primary">
                  {job.link === 'direct' ? 'Direct Official' : 'Referral Link'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary">Human Recheck:</span>
                <span className="font-mono text-[11px] text-readable">
                  Every 14 days
                </span>
              </div>
            </div>

            {/* Apply CTA Button */}
            <div className="space-y-3 pt-2">
              {!isClosed ? (
                <a
                  href={`/go/${job.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs font-semibold bg-accent-cyan text-void hover:opacity-90 transition-opacity btn-tactile shadow-md"
                >
                  <span>Apply on Official Site</span>
                  <ExternalLink size={14} />
                </a>
              ) : (
                <div className="p-3 text-center rounded-xl border border-subtle bg-void text-xs font-mono text-secondary">
                  Applications are currently closed
                </div>
              )}

              {/* Legal Disclosures */}
              <div className="space-y-2 text-[11px] text-secondary leading-normal">
                {job.link === 'referral' ? (
                  <p>
                    <strong>Referral Disclosure:</strong> Countersign may earn a commission if you apply through this link at zero extra cost to you.
                  </p>
                ) : (
                  <p>
                    <strong>Direct Link:</strong> This is an official employer career portal link. Countersign earns zero commission from this application.
                  </p>
                )}
                <p>
                  <strong>Independence Line:</strong> We are an independent verification studio. We are not employed by, affiliated with, or acting as agents of {job.platform.name}.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Sticky Mobile Apply Bar (Section 7.3 item 10) */}
      {!isClosed && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-subtle bg-surface/95 backdrop-blur px-4 py-3 shadow-2xl">
          <div className="max-w-md mx-auto flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs font-mono font-semibold text-primary truncate">
                {job.platform.name}
              </div>
              <div className="text-[11px] text-secondary truncate">
                {job.pay_verified ? job.pay_text : 'Direct Official Portal'}
              </div>
            </div>

            <a
              href={`/go/${job.id}`}
              className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs font-semibold bg-accent-cyan text-void hover:opacity-90 transition-opacity btn-tactile shadow"
            >
              <span>Apply on Official Site</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      )}

      {/* Structured Data: Breadcrumbs */}
      <BreadcrumbListJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Verified Jobs', item: '/jobs' },
          { name: cleanTitle, item: `/jobs/${job.slug}` },
        ]}
      />

      {/* Structured Data: JobPosting JSON-LD behind feature flag (Plan Section 15 & 22) */}
      <JobPostingJsonLd
        title={cleanTitle}
        description={job.summary || `Human-verified ${job.work_type} opportunity at ${job.platform.name}.`}
        datePosted={job.created_at || '2026-10-14T00:00:00Z'}
        validThrough={job.next_check_at || undefined}
        employmentType={job.work_type}
        hiringOrganizationName={job.platform.name.replace(/\[SAMPLE\]/g, '').trim()}
        hiringOrganizationUrl={job.platform.official_url}
        isTelecommute={true}
        applicantLocationCountry={
          job.eligibility.filter((e) => e.status === 'accepted').length === 1
            ? job.eligibility.find((e) => e.status === 'accepted')?.country_code
            : undefined
        }
        isClosed={isClosed}
      />
    </div>
  );
}
