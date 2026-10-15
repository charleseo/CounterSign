import Link from 'next/link';
import type { Metadata } from 'next';
import { BookOpen, Clock, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { getAllGuides } from '@/content/guides';

export const metadata: Metadata = {
  title: 'Practical Guides for Remote AI Work | Countersign',
  description:
    'Forensic guides, payout playbooks, and citation evaluation methods for remote AI evaluators and alignment specialists.',
  alternates: {
    canonical: '/guides',
  },
  openGraph: {
    title: 'Practical Guides for Remote AI Work | Countersign',
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
        <div className="glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-secondary">
          <BookOpen size={14} className="text-[var(--accent-cyan)]" />
          <span>Section 7.7 Practical Playbooks</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gradient-cyan">
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
            className="glass-card rounded-xl p-5 sm:p-6 flex flex-col justify-between gap-5 group relative overflow-hidden"
          >
            {/* Ambient corner glow */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-[radial-gradient(circle,rgba(139,124,255,0.08)_0%,transparent_70%)] pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity" />

            <div className="space-y-3 relative">
              {/* Meta & Reading Time */}
              <div className="flex items-center justify-between text-[11px] font-mono text-secondary">
                <div className="flex items-center gap-1.5">
                  <Clock size={12} className="text-[var(--accent-cyan)]" />
                  <span>{guide.readingTime}</span>
                </div>
                <span>
                  {new Date(guide.lastUpdated).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1.5">
                <h2 className="text-base sm:text-lg font-bold text-primary group-hover:text-[var(--accent-cyan)] transition-colors leading-snug">
                  <Link href={`/guides/${guide.slug}`} className="focus:outline-none">
                    {guide.title}
                  </Link>
                </h2>
                <p className="text-xs text-readable line-clamp-3 leading-relaxed">
                  {guide.subtitle}
                </p>
              </div>

              {/* Topic Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border-subtle)]">
                {guide.topicTags.map((tag) => (
                  <span
                    key={tag}
                    className="glass-pill inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded text-secondary"
                  >
                    <Tag size={10} />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Read Guide Link */}
            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between relative">
              <span className="text-[11px] font-mono text-secondary">
                By {guide.author.name}
              </span>
              <Link
                href={`/guides/${guide.slug}`}
                className="shimmer-sweep inline-flex items-center gap-1 text-xs font-mono font-semibold text-[var(--accent-cyan)] hover:underline px-2 py-1 rounded-lg"
              >
                <span>Read guide</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Trust Notice */}
      <div className="glass-panel rounded-xl p-5 text-xs text-secondary leading-relaxed flex items-start gap-3">
        <ShieldCheck size={18} className="text-[var(--accent-cyan)] shrink-0 mt-0.5" />
        <div>
          <strong className="text-primary font-mono uppercase tracking-wider block mb-1">
            Editorial Standard
          </strong>
          Every guide published on Countersign is authored by real evaluators based on active platform workflows. We do not accept sponsored content, and every factual claim links to an official policy or verifiable source.
        </div>
      </div>
    </div>
  );
}
