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

export const instant = false;

export async function generateStaticParams() {
  const guides = getAllGuides();
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
      title: 'Guide Not Found | Countersign',
      description: 'The requested guide could not be found.',
    };
  }

  return {
    title: `${guide.title} | Countersign Guides`,
    description: guide.subtitle,
    alternates: {
      canonical: `/guides/${slug}`,
    },
    openGraph: {
      title: `${guide.title} | Countersign`,
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

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Back to Guides link */}
      <div>
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary hover:text-accent-cyan transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to all guides</span>
        </Link>
      </div>

      {/* Guide Header */}
      <header className="space-y-4 pb-6 border-b border-subtle">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-secondary">
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-accent-cyan" />
            <span>{guide.readingTime}</span>
          </div>
          <span aria-hidden="true">&bull;</span>
          <div className="flex items-center gap-1.5">
            <Calendar size={13} />
            <span>
              Updated:{' '}
              {new Date(guide.lastUpdated).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <span aria-hidden="true">&bull;</span>
          <div className="flex items-center gap-1.5 text-primary">
            <UserCheck size={13} className="text-accent-emerald" />
            <span>By {guide.author.name}</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-primary leading-tight">
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
              className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-surface border border-subtle text-secondary"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Main Reading Column (Max 680px for optimal readability per plan Section 7.7) */}
      <div className="max-w-[680px] mx-auto space-y-10">
        {/* Key Takeaways Summary Box */}
        <div className="rounded-xl border border-accent-cyan/30 bg-surface p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent-cyan uppercase tracking-wider">
            <ShieldCheck size={16} />
            <span>Key Takeaways at a Glance</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-readable leading-relaxed">
            {guide.summaryPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-accent-cyan shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Table of Contents */}
        <nav
          aria-label="Table of contents"
          className="rounded-lg border border-subtle bg-void p-4 space-y-2 text-xs font-mono"
        >
          <div className="text-secondary font-semibold uppercase tracking-wider">
            Table of Contents
          </div>
          <ol className="space-y-1.5 list-decimal list-inside text-readable">
            {guide.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="hover:text-accent-cyan hover:underline transition-colors"
                >
                  {section.heading}
                </a>
              </li>
            ))}
            {guide.practiceExercise && (
              <li>
                <a
                  href="#practice-exercise"
                  className="hover:text-accent-cyan hover:underline transition-colors"
                >
                  Practice Exercise
                </a>
              </li>
            )}
            <li>
              <a
                href="#sources"
                className="hover:text-accent-cyan hover:underline transition-colors"
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
              <h2 className="text-lg sm:text-xl font-bold text-primary tracking-tight">
                {section.heading}
              </h2>

              <div className="text-xs sm:text-sm text-readable leading-relaxed whitespace-pre-line space-y-3">
                {section.content}
              </div>

              {/* Optional Section Callout */}
              {section.callout && (
                <div
                  className={`rounded-lg border p-4 space-y-1 text-xs leading-relaxed ${
                    section.callout.type === 'warning'
                      ? 'border-accent-rose/30 bg-accent-rose/10 text-accent-rose'
                      : section.callout.type === 'tip'
                      ? 'border-accent-emerald/30 bg-accent-emerald/10 text-accent-emerald'
                      : 'border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-mono font-bold uppercase tracking-wider text-[11px]">
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

        {/* Section 7.7 [v4] Interactive Practice Exercise */}
        {guide.practiceExercise && (
          <section id="practice-exercise" className="scroll-mt-20 pt-4">
            <ConstraintCheckerExercise exercise={guide.practiceExercise} />
          </section>
        )}

        {/* Sources and References */}
        <section
          id="sources"
          className="scroll-mt-20 rounded-xl border border-subtle bg-surface p-5 sm:p-6 space-y-4"
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary uppercase tracking-wider">
            <ShieldCheck size={16} className="text-accent-emerald" />
            <span>Official Sources & Regulatory References</span>
          </div>

          <div className="space-y-3">
            {guide.sources.map((src, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-subtle bg-void space-y-1 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-semibold text-primary hover:text-accent-cyan transition-colors inline-flex items-center gap-1"
                  >
                    <span>{src.title}</span>
                    <ExternalLink size={12} />
                  </a>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider ${
                      src.label === 'official'
                        ? 'bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20'
                        : src.label === 'statute'
                        ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20'
                        : 'bg-accent-amber/10 text-accent-amber border border-accent-amber/20'
                    }`}
                  >
                    {src.label}
                  </span>
                </div>
                {src.notes && (
                  <p className="text-secondary text-[11px] leading-relaxed">
                    {src.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* "Checked By" Sign-Off (Plan Section 7.7) */}
        <div className="rounded-xl border border-subtle bg-void p-5 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="text-[11px] font-mono text-secondary">
              Fact-Checked & Authored by:
            </div>
            <div className="text-sm font-bold text-primary">
              {guide.author.name}
            </div>
            <div className="text-xs text-secondary font-mono">
              {guide.author.title}
            </div>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-accent-emerald px-2.5 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/20">
              <ShieldCheck size={12} />
              <span>Independent Review</span>
            </span>
          </div>
        </div>

        {/* Related Roles */}
        {relatedJobs.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-subtle">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono font-bold text-primary uppercase tracking-wider">
                Related Verified Roles
              </h3>
              <Link
                href="/jobs"
                className="text-xs font-mono text-accent-cyan hover:underline"
              >
                View all roles
              </Link>
            </div>
            <div className="space-y-3">
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
        <div className="pt-6 border-t border-subtle">
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
