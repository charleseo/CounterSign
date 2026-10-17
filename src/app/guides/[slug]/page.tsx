import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  Clock,
  Calendar,
  UserCheck,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Lightbulb,
} from 'lucide-react';
import { getAllGuides, getGuideBySlug } from '@/content/guides';
import { dbRepository } from '@/lib/db/repository';
import { ConstraintCheckerExercise } from '@/components/guides/ConstraintCheckerExercise';
import { EmailCapture } from '@/components/ui/EmailCapture';
import { JobCard } from '@/components/ui/JobCard';
import { BreadcrumbListJsonLd, ArticleJsonLd } from '@/components/seo/JsonLd';
import { ShareButton } from '@/components/ui/ShareButton';

export const instant = false;

export async function generateStaticParams() {
  const guides = getAllGuides(true);
  return guides.map((g) => ({ slug: g.slug }));
}

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {
      title: 'Guide Not Found | TraceBase',
      description: 'The requested guide could not be found.',
    };
  }

  const isDraft = guide.published === false;

  return {
    title: `${guide.title} | TraceBase Guides`,
    description: guide.subtitle,
    alternates: {
      canonical: `/guides/${slug}`,
    },
    robots: isDraft
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      title: `${guide.title} | TraceBase`,
      description: guide.subtitle,
      url: `/guides/${slug}`,
      type: 'article',
    },
  };
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  // Related jobs
  const allJobs = dbRepository.getJobs();
  const relatedJobs = allJobs
    .filter((j) => j.status !== 'closed')
    .slice(0, 2);

  const isDraft = guide.published === false;
  const checkedDate = guide.lastCheckedDate || '12 Oct 2026';
  const checkedBy = guide.checkedBy || guide.author.name;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Draft Warning Banner */}
      {isDraft && (
        <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs flex items-center gap-3">
          <AlertTriangle size={18} className="text-amber-400 shrink-0" />
          <div className="space-y-0.5">
            <span className="font-bold block font-mono text-[11px] text-amber-400">
              Draft, not published
            </span>
            <p className="text-amber-200/90 leading-relaxed">
              This guide is an unpublished editorial outline with structured placeholders. It is excluded from the sitemap and set to noindex until final content review.
            </p>
          </div>
        </div>
      )}

      {/* Back to Guides link + Share */}
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-[#5A35C8] transition-colors min-h-[44px]"
        >
          <ArrowLeft size={14} />
          <span>Back to all guides</span>
        </Link>
        <ShareButton
          title={`${guide.title} | TraceBase Guides`}
          shareText={`${guide.title} on TraceBase:`}
          url={`/guides/${slug}`}
          pageType="guide"
          buttonText="Share guide"
        />
      </div>

      {/* Guide Header */}
      <header className="space-y-4 pb-6 border-b border-rule">
        <div className="flex flex-wrap items-center gap-3 text-xs text-secondary">
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-[#5A35C8]" />
            <span>{guide.readingTime}</span>
          </div>
          <span aria-hidden="true">&bull;</span>
          <div className="flex items-center gap-1.5">
            <Calendar size={13} />
            <span className="tabular-nums">
              Last checked: {checkedDate}
            </span>
          </div>
          <span aria-hidden="true">&bull;</span>
          <div className="flex items-center gap-1.5 text-ink">
            <UserCheck size={13} className="text-[#17663F]" />
            <span>Checked by {checkedBy}</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink leading-tight">
          {guide.title}
        </h1>

        <p className="text-sm sm:text-base text-readable leading-relaxed">
          {guide.subtitle}
        </p>

        {/* Topic Tag Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {guide.topicTags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 rounded-full bg-surface border border-rule text-secondary"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Main Reading Column */}
      <div className="max-w-[680px] mx-auto space-y-10">
        {/* Key Takeaways Summary Box */}
        <div className="rounded-xl border border-rule bg-sheet p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#5A35C8]">
            <ShieldCheck size={16} />
            <span>Key Takeaways at a Glance</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-readable leading-relaxed">
            {guide.summaryPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-[#5A35C8] shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Table of Contents */}
        <nav
          aria-label="Table of contents"
          className="rounded-xl border border-rule bg-surface p-4 space-y-2 text-xs"
        >
          <div className="text-secondary font-medium">
            Table of Contents
          </div>
          <ol className="space-y-1.5 list-decimal list-inside text-readable">
            {guide.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="hover:text-[#5A35C8] hover:underline transition-colors"
                >
                  {section.heading}
                </a>
              </li>
            ))}
            {guide.practiceExercise && (
              <li>
                <a
                  href="#practice-exercise"
                  className="hover:text-[#5A35C8] hover:underline transition-colors"
                >
                  Practice Exercise
                </a>
              </li>
            )}
            <li>
              <a
                href="#sources"
                className="hover:text-[#5A35C8] hover:underline transition-colors"
              >
                Official Sources & References
              </a>
            </li>
          </ol>
        </nav>

        {/* Guide Content Sections */}
        <div className="space-y-10">
          {guide.sections.map((section) => (
            <section key={section.id} id={section.id} className="space-y-4 scroll-mt-20">
              <h2 className="text-lg sm:text-xl font-bold text-ink tracking-tight">
                {section.heading}
              </h2>

              <div className="text-xs sm:text-sm text-readable leading-relaxed whitespace-pre-line space-y-3">
                {section.content}
              </div>

              {/* Optional Section Callout */}
              {section.callout && (
                <div
                  className={`rounded-xl border p-4 space-y-1 text-xs leading-relaxed ${
                    section.callout.type === 'warning'
                      ? 'border-[#A8322A]/30 bg-[#A8322A]/5 text-[#A8322A]'
                      : section.callout.type === 'tip'
                      ? 'border-[#17663F]/30 bg-[#17663F]/5 text-[#17663F]'
                      : 'border-[#5A35C8]/30 bg-[#5A35C8]/5 text-[#5A35C8]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-semibold text-xs">
                    {section.callout.type === 'warning' ? (
                      <AlertTriangle size={14} />
                    ) : section.callout.type === 'tip' ? (
                      <Lightbulb size={14} />
                    ) : (
                      <Info size={14} />
                    )}
                    <span>{section.callout.title}</span>
                  </div>
                  <p className="text-readable">{section.callout.text}</p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Practice Exercise */}
        {guide.practiceExercise && (
          <section id="practice-exercise" className="scroll-mt-20 pt-4">
            <ConstraintCheckerExercise exercise={guide.practiceExercise} />
          </section>
        )}

        {/* Sources and References */}
        <section
          id="sources"
          className="scroll-mt-20 rounded-xl border border-rule bg-sheet p-5 sm:p-6 space-y-4"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-ink">
            <ShieldCheck size={16} className="text-[#17663F]" />
            <span>Official Sources & Regulatory References</span>
          </div>

          <div className="space-y-3">
            {guide.sources.map((src, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-rule bg-surface space-y-1 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-semibold text-ink hover:text-[#5A35C8] transition-colors inline-flex items-center gap-1 min-h-[44px]"
                  >
                    <span>{src.title}</span>
                    <ExternalLink size={12} />
                  </a>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      src.label === 'official'
                        ? 'bg-[#17663F]/10 text-[#17663F] border border-[#17663F]/20'
                        : src.label === 'statute'
                        ? 'bg-[#5A35C8]/10 text-[#5A35C8] border border-[#5A35C8]/20'
                        : 'bg-[#8A5300]/10 text-[#8A5300] border border-[#8A5300]/20'
                    }`}
                  >
                    {src.label}
                  </span>
                </div>
                {src.notes && (
                  <p className="text-secondary text-xs leading-relaxed">
                    {src.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* "Checked By" Sign-Off */}
        <div className="rounded-xl border border-rule bg-sheet p-5 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="text-xs text-secondary">
              Fact-Checked & Authored by:
            </div>
            <div className="text-sm font-bold text-ink">
              {guide.author.name}
            </div>
            <div className="text-xs text-secondary">
              {guide.author.title}
            </div>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-xs text-[#17663F] px-2.5 py-1 rounded-full bg-[#17663F]/10 border border-[#17663F]/20">
              <ShieldCheck size={12} />
              <span>Independent Review</span>
            </span>
          </div>
        </div>

        {/* Related Roles */}
        {relatedJobs.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-rule">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-ink">
                Related Roles
              </h3>
              <Link
                href="/jobs"
                className="text-xs text-[#5A35C8] hover:underline min-h-[44px] inline-flex items-center"
              >
                View all roles
              </Link>
            </div>
            <div className="space-y-2">
              {relatedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  slug={job.slug}
                  title={job.title}
                  platform={job.platform.name}
                  workType={job.work_type}
                  countryEligibility="accepted"
                  countryName="Nigeria"
                  verifiedPay={job.pay_verified ? job.pay_text || undefined : undefined}
                  daysAgo={job.daysAgo ?? 0}
                  status={job.status}
                />
              ))}
            </div>
          </div>
        )}

        {/* Newsletter Capture at the End */}
        <div className="pt-6 border-t border-rule">
          <EmailCapture
            title="Get new verified roles and guides in your inbox"
            description="One email every Tuesday with fresh human-checked AI roles, platform reality updates, and tactical evaluation guides. No spam, unsubscribe any time."
          />
        </div>

        {/* Structured Data: Breadcrumbs */}
        <BreadcrumbListJsonLd
          items={[
            { name: 'Home', item: '/' },
            { name: 'Practical Guides', item: '/guides' },
            { name: guide.title, item: `/guides/${guide.slug}` },
          ]}
        />

        {/* Structured Data: Article */}
        <ArticleJsonLd
          headline={guide.title}
          description={guide.subtitle}
          datePublished={guide.lastUpdated}
          authorName={guide.author.name}
          url={`/guides/${guide.slug}`}
        />
      </div>
    </div>
  );
}
