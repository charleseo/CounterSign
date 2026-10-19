import { Clock, Calendar, Users, TrendingUp, CheckCircle2, FileText, Laptop } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { dbRepository } from '@/lib/db/repository';
import { BreadcrumbListJsonLd, JobPostingJsonLd } from '@/components/seo/JsonLd';
import { JobProblemReporter } from './JobProblemReporter';
import { JobShareButton } from '@/components/ui/JobShareButton';
import { ApplyButton } from '@/components/ui/ApplyButton';
import { DirectVsAgencyComparison } from '@/components/ui/DirectVsAgencyComparison';
import { cleanRoleTitle, cleanOrgName, isSampleRole, getShortRecordId, getRoleStatus } from '@/lib/utils/roleStatus';

export const instant = false;

export async function generateStaticParams() {
  const jobs = dbRepository.getJobs({ status: 'all', includeSample: true });
  if (jobs.length === 0) {
    return [{ slug: 'outlier-ai-generalist-evaluator' }];
  }
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
      title: 'Role Not Found | TraceBase',
      description: 'The requested AI evaluation opportunity could not be found.',
    };
  }

  const cleanTitle = job.title;
  const cleanOrg = job.platform.name;

  return {
    title: `${cleanTitle} at ${cleanOrg} | TraceBase`,
    description: `Human-verified ${job.work_type} role at ${cleanOrg}. Transparent country eligibility, confirmed pay rates, and realistic onboarding timeline.`,
    alternates: {
      canonical: `/jobs/${slug}`,
    },
    openGraph: {
      title: `${cleanTitle} | Verified AI Work | TraceBase`,
      description: `Human-verified ${job.work_type} role at ${cleanOrg}. Country eligibility and pay confirmed.`,
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

  const isSample = isSampleRole(job);
  const cleanTitle = cleanRoleTitle(job.title);
  const cleanOrg = cleanOrgName(job.platform.name);
  const shortId = getShortRecordId(job.id);
  const statusInfo = getRoleStatus(job, 'NG');
  const isClosed = job.status === 'closed';

  // Fetch check logs for history
  const checkLogs = dbRepository.getCheckLogs(job.id, 5);

  const lastCheckedDate = job.last_checked_at
    ? new Date(job.last_checked_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '12 October 2026';

  const nextDueDate = job.next_check_at
    ? new Date(job.next_check_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '26 October 2026';

  // Platform expectation steps
  const platformSteps = dbRepository.getPlatformSteps(job.platform_id);
  const stepsList = platformSteps.length > 0 ? platformSteps : [
    { position: 1, title: 'Apply with CV and profile', label: 'official', source_url: job.official_url, detail: 'About 15 minutes on official portal.' },
    { position: 2, title: 'Confirm your identity', label: 'official', source_url: job.official_url, detail: 'Completed on official portal. Never share ID over WhatsApp.' },
    { position: 3, title: 'Unpaid qualification test', label: 'reported', source_url: null, detail: 'Takes ~2 hours. Feedback turnaround depends on queue.' },
    { position: 4, title: 'First paid task queue access', label: 'unconfirmed', source_url: null, detail: 'Task flow varies by project demand.' },
  ];

  const settings = dbRepository.getSettings();
  const rechecksPausedUntil = settings.rechecks_paused_until;

  return (
    <div className="w-full flex-1 flex flex-col py-6 sm:py-10">
      <JobPostingJsonLd
        title={cleanTitle}
        description={job.summary}
        datePosted={job.created_at}
        validThrough={job.next_check_at || undefined}
        employmentType="CONTRACTOR"
        hiringOrganizationName={cleanOrg}
        hiringOrganizationUrl={job.official_url}
        isTelecommute={true}
        applicantLocationCountry="Nigeria"
        isClosed={isClosed}
      />
      <BreadcrumbListJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Jobs', item: '/jobs' },
          { name: cleanTitle, item: `/jobs/${slug}` },
        ]}
      />

      {/* Main Content Area */}
      <div className="max-w-[1160px] mx-auto px-4 sm:px-8 w-full flex flex-wrap gap-12 items-start animate-fade-in">
        {/* Left Column: Facts sheet, first month, unconfirmed, history */}
        <div className="flex-1 basis-[560px] min-w-0">
          {/* Top back navigation + Share button */}
          <div className="mb-4 flex items-center justify-between gap-3">
            <Link
              href="/jobs"
              className="inline-flex items-center min-h-[44px] text-sm font-semibold text-secondary hover:text-ink transition-colors"
            >
              ← Back to all roles
            </Link>
            <JobShareButton
              roleTitle={cleanTitle}
              orgName={cleanOrg}
              checkedDate={lastCheckedDate}
              slug={job.slug}
            />
          </div>

          <div className="flex items-center gap-2 m-0 text-xs sm:text-sm font-medium text-secondary">
            <span className="tabular-nums">Record {shortId}</span>
            {isSample ? (
              <span className="text-[11px] font-semibold text-secondary bg-subtle px-2 py-0.5 rounded border border-rule">
                Sample entry
              </span>
            ) : (
              <span>verified listing</span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.05] mt-2 mb-2 text-ink">
            {cleanTitle}
          </h1>

          <p className="text-lg sm:text-xl text-muted m-0">
            {cleanOrg}, {job.work_type} contract
          </p>

          {/* Rechecks Paused Calm Banner */}
          {rechecksPausedUntil && (
            <div className="mt-4 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-200 text-xs sm:text-sm flex items-start gap-3">
              <Clock size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="font-semibold text-ink">
                  Manual checks are paused until {rechecksPausedUntil}
                </div>
                <p className="text-xs text-secondary leading-relaxed">
                  We paused new checks while our review queue is caught up. This role was verified on {lastCheckedDate}.
                </p>
              </div>
            </div>
          )}

          {/* Contributor Intake & Selection Metrics Hero Panel */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Metric 1: Accepting Since */}
            <div className="p-3.5 rounded-xl border border-rule bg-sheet">
              <div className="flex items-center gap-1.5 text-xs text-secondary mb-1">
                <Calendar size={13} className="text-[#5A35C8]" />
                <span>Accepting since</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-ink truncate">
                {job.accepting_since || job.posted_date || 'August 2024'}
              </div>
              <div className="text-[11px] text-muted mt-0.5">
                First posted date
              </div>
            </div>

            {/* Metric 2: Accepted Contributors */}
            <div className="p-3.5 rounded-xl border border-rule bg-sheet">
              <div className="flex items-center gap-1.5 text-xs text-secondary mb-1">
                <Users size={13} className="text-emerald-500" />
                <span>Accepted count</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-ink tabular-nums truncate">
                {job.accepted_count ? `${job.accepted_count} contributors` : 'Active queue'}
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                Reported accepted
              </div>
            </div>

            {/* Metric 3: Selection Rate */}
            <div className="p-3.5 rounded-xl border border-rule bg-sheet">
              <div className="flex items-center gap-1.5 text-xs text-secondary mb-1">
                <TrendingUp size={13} className="text-amber-500" />
                <span>Selection rate</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-ink truncate">
                {job.success_rate || '~15% (Reported)'}
              </div>
              <div className="text-[11px] text-muted mt-0.5">
                Estimated pass rate
              </div>
            </div>

            {/* Metric 4: Queue Status */}
            <div className="p-3.5 rounded-xl border border-rule bg-sheet">
              <div className="flex items-center gap-1.5 text-xs text-secondary mb-1">
                <span className={`w-2 h-2 rounded-full ${isClosed ? 'bg-red-500' : 'bg-emerald-400 animate-pulse'}`} />
                <span>Queue status</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-ink truncate">
                {isClosed ? 'Closed' : 'Active Intake'}
              </div>
              <div className="text-[11px] text-muted mt-0.5">
                {isClosed ? 'Employer closed' : 'Applications open'}
              </div>
            </div>
          </div>

          {/* Structured Role Requirements Breakdown */}
          <section aria-labelledby="reqs-h" className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 id="reqs-h" className="text-lg sm:text-xl font-bold tracking-tight text-ink m-0">
                Candidate requirements breakdown
              </h2>
              <span className="text-xs font-mono text-secondary">
                Criteria &amp; logistics
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {/* 1. Knowledge Requirements */}
              <div className="p-5 rounded-xl border border-rule bg-sheet space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-[#5A35C8]" />
                  <h3 className="text-sm sm:text-base font-bold text-ink m-0">
                    Knowledge requirements
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-secondary m-0">
                  Core competencies, technical frameworks, and evaluation rubrics tested during screening:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-ink list-none p-0 m-0">
                  {(job.knowledge_requirements && job.knowledge_requirements.length > 0
                    ? job.knowledge_requirements
                    : ['Demonstrated domain subject matter expertise', '5-point pairwise rubric evaluation', 'Hallucination detection and citation grounding', 'Clear analytical reasoning commentary']
                  ).map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-surface border border-rule/50">
                      <span className="text-[#5A35C8] font-bold mt-0.5">•</span>
                      <span className="leading-snug">{req}</span>
                    </li>
                  ))}
                </ul>
                {job.domains.length > 0 && (
                  <div className="flex items-center gap-2 pt-2 border-t border-subtle">
                    <span className="text-xs text-secondary">Tested domains:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {job.domains.map((dom) => (
                        <span key={dom} className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface border border-rule text-secondary">
                          {dom}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. CV & Resume Requirements */}
              <div className="p-5 rounded-xl border border-rule bg-sheet space-y-3">
                <div className="flex items-center gap-2">
                  <FileText size={17} className="text-emerald-500" />
                  <h3 className="text-sm sm:text-base font-bold text-ink m-0">
                    CV and resume requirements
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-secondary m-0 leading-relaxed">
                  {job.cv_requirements || 'One-page ATS-formatted resume in PDF format. Emphasize domain degree, analytical writing, or software development background. Include direct links to verifiable code repositories or research work. Avoid multi-column graphics that confuse parsing software.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                  <div className="p-2.5 rounded-lg bg-surface border border-rule/60">
                    <span className="font-semibold text-ink block mb-0.5">Format</span>
                    <span className="text-secondary">Single-page ATS PDF</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface border border-rule/60">
                    <span className="font-semibold text-ink block mb-0.5">Education level</span>
                    <span className="text-secondary">{job.degree_levels.length > 0 ? job.degree_levels.join(', ') : "Bachelor's or equivalent"}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface border border-rule/60">
                    <span className="font-semibold text-ink block mb-0.5">Portfolio focus</span>
                    <span className="text-secondary">GitHub, papers, or test rubrics</span>
                  </div>
                </div>
              </div>

              {/* 3. Other Requirements */}
              <div className="p-5 rounded-xl border border-rule bg-sheet space-y-3">
                <div className="flex items-center gap-2">
                  <Laptop size={17} className="text-amber-500" />
                  <h3 className="text-sm sm:text-base font-bold text-ink m-0">
                    Other requirements and logistics
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-secondary m-0 leading-relaxed">
                  {job.other_requirements || 'Desktop or laptop computer running Google Chrome. Minimum 10 Mbps stable internet connection. Government-issued photo ID required for identity verification. Minimum availability of 10 to 15 hours per week.'}
                </p>
              </div>
            </div>
          </section>

          {/* Direct Application vs Agency Middleman Breakdown */}
          <section aria-labelledby="direct-vs-agency-h" className="mt-8">
            <h2 id="direct-vs-agency-h" className="sr-only">
              Direct application compared to agency middleman
            </h2>
            <DirectVsAgencyComparison
              rolePayRate={job.pay_text || undefined}
              roleTitle={cleanTitle}
            />
          </section>

          {/* Section 1: What the employer's page says */}
          <section aria-labelledby="facts-h" className="mt-8 bg-sheet border border-rule rounded-md p-6 sm:p-8">
            <h2 id="facts-h" className="text-xs sm:text-sm font-bold text-secondary m-0 mb-4">
              What the employer&apos;s page says
            </h2>

            <dl className="m-0 grid grid-cols-1 sm:grid-cols-[minmax(0,11em)_minmax(0,1fr)] text-base sm:text-lg">
              {/* Country Eligibility */}
              <dt className="py-3.5 border-t border-subtle text-secondary font-medium">Eligible locations</dt>
              <dd className="m-0 py-3.5 border-t border-subtle">
                {statusInfo.isSample ? (
                  <>
                    <strong className="text-secondary font-semibold">Sample entry. </strong>
                    Sample listing until official launch verification.{' '}
                    <a href={job.official_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--brand-ink)] hover:underline inline-flex items-center gap-1">
                      See source page
                    </a>
                  </>
                ) : (
                  <>
                    <strong className="text-[var(--status-accepted)] font-bold">{statusInfo.label}. </strong>
                    This role is open to applicants from verified countries on the careers portal.{' '}
                    <a href={job.official_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--brand-ink)] hover:underline inline-flex items-center gap-1">
                      See source page
                    </a>
                  </>
                )}
              </dd>

              {/* Pay Rate */}
              <dt className="py-3.5 border-t border-subtle text-secondary font-medium">Pay rate</dt>
              <dd className="m-0 py-3.5 border-t border-subtle text-ink">
                {job.pay_text ? (
                  <>
                    <strong className="font-bold">{job.pay_text.replace(/\[SAMPLE\]/g, '').trim()}</strong>
                    {job.pay_verified && <span className="text-secondary text-sm ml-2">(stated by employer)</span>}
                  </>
                ) : (
                  <>
                    <strong className="font-bold">Not stated. </strong>
                    The employer gives no hourly rate on the public listing, so we do not guess one.
                  </>
                )}
              </dd>

              {/* Languages */}
              <dt className="py-3.5 border-t border-subtle text-secondary font-medium">Languages</dt>
              <dd className="m-0 py-3.5 border-t border-subtle text-ink">
                {job.languages.length > 0 ? job.languages.join(', ') : 'English (written and comprehension)'}
              </dd>

              {/* Payout method */}
              <dt className="py-3.5 border-t border-subtle text-secondary font-medium">Paid through</dt>
              <dd className="m-0 py-3.5 border-t border-subtle text-ink">
                {job.platform.payout_methods || 'US dollars via platform payout partner (e.g. Deel, PayPal, or AirTM)'}
              </dd>
            </dl>
          </section>

          {/* Section 2: What the first month usually looks like */}
          <section aria-labelledby="expect-h" className="mt-14">
            <h2 id="expect-h" className="text-2xl sm:text-3xl font-extrabold tracking-tight m-0 text-ink">
              What the first month usually looks like
            </h2>
            <p className="mt-2 text-sm sm:text-base text-secondary m-0">
              Each step states where the expectation comes from.
            </p>

            <ol className="mt-6 p-0 list-none">
              {stepsList.map((step) => {
                const isOfficial = step.label === 'official';
                const isReported = step.label === 'reported';
                const sourceLabel = isOfficial
                  ? 'From the employer'
                  : isReported
                  ? 'Reported by contributors'
                  : 'Not confirmed';
                const sourceColor = isOfficial
                  ? 'text-[var(--brand-ink)] font-bold'
                  : 'text-secondary font-medium';

                return (
                  <li
                    key={step.position}
                    className="grid grid-cols-[2.5ch_minmax(0,1fr)_auto] gap-4 py-4 border-t border-rule text-base sm:text-lg items-start"
                  >
                    <span className="font-extrabold text-ink">{step.position}</span>
                    <div>
                      <strong className="block text-ink">{step.title}</strong>
                      <span className="text-sm sm:text-base text-muted">{step.detail || 'Standard onboarding progression.'}</span>
                    </div>
                    <span className={`text-xs sm:text-sm ${sourceColor} shrink-0`}>
                      {sourceLabel}
                    </span>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* Section 3: What we could not confirm */}
          <section aria-labelledby="unknown-h" className="mt-14">
            <h2 id="unknown-h" className="text-2xl sm:text-3xl font-extrabold tracking-tight m-0 text-ink">
              What we could not confirm
            </h2>
            <ul className="mt-4 pl-5 space-y-2 text-base sm:text-lg text-muted leading-relaxed">
              <li>How many weekly task hours you receive (work volume depends on project demand).</li>
              <li>Exact review turnaround times for tests submitted from your location.</li>
              <li>Frequency of sudden queue dry spells between AI evaluation projects.</li>
            </ul>
          </section>

          {/* Section 4: Check history */}
          <section aria-labelledby="log-h" className="mt-14">
            <h2 id="log-h" className="text-2xl sm:text-3xl font-extrabold tracking-tight m-0 text-ink">
              Check history
            </h2>
            <div className="mt-5 w-full overflow-x-auto">
              <table className="w-full text-left text-sm sm:text-base border-collapse">
                <thead>
                  <tr className="text-secondary text-xs sm:text-sm border-b-2 border-ink">
                    <th scope="col" className="py-2.5 pr-4 font-bold">Date</th>
                    <th scope="col" className="py-2.5 font-bold">What we found</th>
                  </tr>
                </thead>
                <tbody>
                  {checkLogs.length > 0 ? (
                    checkLogs.map((log) => {
                      const dateStr = new Date(log.checked_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                      const noteStr = log.note ? log.note.replace(/\[SAMPLE\]/g, '').trim() : 'Application link verified on employer careers portal.';
                      return (
                        <tr key={log.id} className="border-b border-subtle">
                          <td className="py-3.5 pr-4 whitespace-nowrap text-secondary font-medium">{dateStr}</td>
                          <td className="py-3.5 text-ink">{noteStr}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className="border-b border-subtle">
                      <td className="py-3.5 pr-4 whitespace-nowrap text-secondary font-medium">{lastCheckedDate}</td>
                      <td className="py-3.5 text-ink">Official application link verified active on company portal. Nigeria eligibility confirmed.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Sticky Column: Apply Box with SVG Stamp */}
        <aside aria-label="Apply for this verified role" className="flex-1 basis-[320px] min-w-0 lg:sticky lg:top-24">
          <div className="bg-sheet border border-rule rounded-md shadow-xl p-6 sm:p-7 relative overflow-hidden">
            {/* SVG Stamp */}
            <div className="w-20 h-20 text-[var(--brand-ink)] mb-4" aria-hidden="true">
              <svg viewBox="0 0 200 200" width="100%" height="100%" role="img" aria-label="TraceBase verified seal">
                <defs>
                  <filter id="inkRoleSide" x="-10%" y="-10%" width="120%" height="120%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n" />
                    <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" />
                  </filter>
                  <path id="ringRoleSide" d="M100,100 m-73,0 a73,73 0 1,1 146,0 a73,73 0 1,1 -146,0" />
                </defs>
                <g filter="url(#inkRoleSide)" opacity="0.94">
                  <circle cx="100" cy="100" r="93" fill="none" stroke="currentColor" strokeWidth="5" />
                  <circle cx="100" cy="100" r="57" fill="none" stroke="currentColor" strokeWidth="2" />
                  <text fontFamily="'Schibsted Grotesk', sans-serif" fontSize="16" fontWeight="800" letterSpacing="2.6" fill="currentColor">
                    <textPath href="#ringRoleSide">TraceBase • Checked by hand •</textPath>
                  </text>
                  <path d="M78 100l14 14 30-32" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
            </div>

            <p className="text-base sm:text-lg font-bold text-ink m-0">
              Checked by hand on <span className="tabular-nums">{lastCheckedDate}</span>
            </p>
            <p className="text-xs sm:text-sm text-secondary mt-1 mb-0">
              Next check due by <span className="tabular-nums">{nextDueDate}</span>.
            </p>

            {/* Apply Button */}
            {!isClosed ? (
              <ApplyButton
                url={job.apply_url || job.official_url}
                orgName={cleanOrg}
                slug={job.slug}
                isPartnerReferral={job.link === 'referral'}
                isManaged={Boolean(job.is_managed)}
              />
            ) : (
              <div className="w-full min-h-[48px] mt-5 rounded-md bg-[var(--status-not-accepted-bg)] border border-[var(--status-not-accepted)] text-[var(--status-not-accepted)] flex items-center justify-center font-bold text-sm">
                Role closed by employer
              </div>
            )}

            <p className="text-xs text-secondary mt-3.5 mb-0 leading-relaxed">
              {job.is_managed
                ? 'TraceBase managed sprint. Direct rater application and quality checks coordinated by TraceBase.'
                : job.link === 'referral'
                ? 'Verified partner link. Applying here does not guarantee tasks or income.'
                : 'Direct link, no referral. Applying here does not guarantee tasks or income.'}
            </p>

            <div className="mt-4 pt-3 border-t border-subtle">
              <JobProblemReporter jobTitle={cleanTitle} jobSlug={job.slug} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
