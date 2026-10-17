import Link from 'next/link';
import type { Metadata } from 'next';
import { BookOpen, Clock, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { getAllGuides } from '@/content/guides';

export const metadata: Metadata = {
  title: 'Practical Guides for Remote AI Work | TraceBase',
  description:
    'Practical guides, payout playbooks, and citation evaluation methods for remote AI evaluators and alignment specialists.',
  alternates: {
    canonical: '/guides',
  },
  openGraph: {
    title: 'Practical Guides for Remote AI Work | TraceBase',
    description:
      'Verified guides on detecting job scams, receiving USD payouts in Nigeria, and mastering citation audits.',
    url: '/guides',
    type: 'website',
  },
};

export default function GuidesIndexPage() {
  const guides = getAllGuides();

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule bg-sheet text-xs text-secondary">
          <BookOpen size={14} className="text-[#5A35C8]" />
          <span>Practical Playbooks</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink">
          Practical Guides for Remote AI Work
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          Tactical, human-verified playbooks for candidates and evaluators: spot fake listings, route USD payouts smoothly in Nigeria, and master model factuality benchmarks.
        </p>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {guides.map((guide) => (
          <article
            key={guide.slug}
            className="rounded-xl border border-rule bg-sheet p-5 sm:p-6 flex flex-col justify-between gap-5 group"
          >
            <div className="space-y-3">
              {/* Meta & Reading Time */}
              <div className="flex items-center justify-between text-xs text-secondary">
                <div className="flex items-center gap-1.5">
                  <Clock size={12} className="text-[#5A35C8]" />
                  <span>{guide.readingTime}</span>
                </div>
                <span className="tabular-nums">
                  {new Date(guide.lastUpdated).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1.5">
                <h2 className="text-base sm:text-lg font-bold text-ink group-hover:text-[#5A35C8] transition-colors leading-snug">
                  <Link href={`/guides/${guide.slug}`} className="focus:outline-none">
                    {guide.title}
                  </Link>
                </h2>
                <p className="text-xs text-readable line-clamp-3 leading-relaxed">
                  {guide.subtitle}
                </p>
              </div>

              {/* Topic Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-rule">
                {guide.topicTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-rule bg-surface text-secondary"
                  >
                    <Tag size={10} />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Read Guide Link */}
            <div className="pt-3 border-t border-rule flex items-center justify-between">
              <span className="text-xs text-secondary">
                By {guide.author.name}
              </span>
              <Link
                href={`/guides/${guide.slug}`}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#5A35C8] hover:underline px-2 py-1 rounded-lg min-h-[44px]"
              >
                <span>Read guide</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Trust Notice */}
      <div className="rounded-xl border border-rule bg-sheet p-5 text-xs text-secondary leading-relaxed flex items-start gap-3">
        <ShieldCheck size={18} className="text-[#5A35C8] shrink-0 mt-0.5" />
        <div>
          <strong className="text-ink font-semibold block mb-1">
            Editorial Standard
          </strong>
          Every guide published on TraceBase is authored by real evaluators based on active platform workflows. We do not accept sponsored content, and every factual claim links to an official policy or verifiable source.
        </div>
      </div>
    </div>
  );
}
