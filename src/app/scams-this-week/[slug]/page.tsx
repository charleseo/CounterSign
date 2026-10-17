import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { dbRepository } from '@/lib/db/repository';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  MessageSquare,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { ShareButton } from '@/components/ui/ShareButton';
import { ArticleJsonLd, BreadcrumbListJsonLd } from '@/components/seo/JsonLd';
import { SampleBadge } from '@/components/ui/SampleBadge';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const scams = dbRepository.getWeeklyScams(false);
  if (scams.length === 0) {
    return [{ slug: 'telegram-advance-fee-recruitment-scheme' }];
  }
  return scams.map((scam) => ({
    slug: scam.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = dbRepository.getWeeklyScamBySlug(slug);

  if (!post || !post.published) {
    return {
      title: 'Scam Alert Not Found | TraceBase',
    };
  }

  return {
    title: `${post.title} | Scams We Saw This Week | TraceBase`,
    description: `Analysis of suspicious recruitment message reported on ${post.reported_date}: what the message said, warning signs, and prevention steps.`,
    alternates: {
      canonical: `/scams-this-week/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | TraceBase Scam Radar`,
      description: `Analysis of suspicious outreach reported on ${post.reported_date}. Warning signs and what to do.`,
      url: `/scams-this-week/${post.slug}`,
      type: 'article',
    },
  };
}

export default async function WeeklyScamDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = dbRepository.getWeeklyScamBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const shareText = `Weekly scam alert on TraceBase: ${post.title}. Warning signs and what to do:`;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <BreadcrumbListJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Scams We Saw This Week', item: '/scams-this-week' },
          { name: post.title, item: `/scams-this-week/${post.slug}` },
        ]}
      />
      <ArticleJsonLd
        headline={post.title}
        description={`Analysis of suspicious recruitment message reported on ${post.reported_date}`}
        datePublished={post.created_at}
        authorName="TraceBase Scam Radar"
        url={`/scams-this-week/${post.slug}`}
      />

      {/* Back button and Meta */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/scams-this-week"
          className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-ink transition-colors font-medium"
        >
          <ArrowLeft size={14} />
          <span>All Weekly Scam Alerts</span>
        </Link>

        <ShareButton
          url={`/scams-this-week/${post.slug}`}
          title={post.title}
          text={shareText}
          pageType="scam_alert"
        />
      </div>

      {/* Header */}
      <div className="space-y-4 pb-6 border-b border-[var(--border-subtle)]">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-border-default text-xs text-[#A8322A] bg-[#A8322A]/10 font-mono">
          <ShieldAlert size={14} />
          <span>Reported {post.reported_date} &bull; Human Verified</span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-primary">
            {post.title.replace(/\[SAMPLE\]/gi, '').trim()}
          </h1>
          {post.title.includes('[SAMPLE]') && <SampleBadge />}
        </div>

        <div className="flex items-center gap-2 text-xs text-secondary">
          <Lock size={13} className="text-[#17663F]" />
          <span>Personal data stripped before publication. Verified by editorial review.</span>
        </div>
      </div>

      {/* Section 1: What the message said (paraphrased) */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-ink font-mono">
          <MessageSquare size={14} className="text-[#5A35C8]" />
          <span>What the message said (paraphrased)</span>
        </div>

        <div className="p-4 sm:p-5 rounded-xl border border-rule bg-sheet text-xs sm:text-sm text-readable leading-relaxed space-y-2">
          <p className="italic">
            &ldquo;{post.message_paraphrased}&rdquo;
          </p>
          <p className="text-[11px] text-tertiary pt-2 border-t border-rule font-mono">
            Note: Personal names, phone numbers, email addresses, and direct invitation tokens were removed to protect user privacy.
          </p>
        </div>
      </section>

      {/* Section 2: The warning signs */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#A8322A] font-mono">
          <AlertTriangle size={14} />
          <span>The warning signs</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {post.warning_signs.map((sign, index) => (
            <div
              key={index}
              className="p-3.5 sm:p-4 rounded-xl border border-[#A8322A]/20 bg-[#A8322A]/5 flex items-start gap-3 text-xs sm:text-sm text-ink"
            >
              <span className="w-5 h-5 rounded-full bg-[#A8322A]/20 text-[#A8322A] flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="leading-relaxed">{sign}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: What to do */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#17663F] font-mono">
          <CheckCircle2 size={14} />
          <span>What to do</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {post.what_to_do.map((step, index) => (
            <div
              key={index}
              className="p-3.5 sm:p-4 rounded-xl border border-[#17663F]/20 bg-[#17663F]/5 flex items-start gap-3 text-xs sm:text-sm text-ink"
            >
              <CheckCircle2 size={16} className="text-[#17663F] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Anti-impersonation & Next Steps */}
      <div className="p-5 sm:p-6 rounded-xl border border-rule bg-sheet space-y-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2 font-semibold text-ink">
          <ShieldCheck size={16} className="text-[#5A35C8]" />
          <span>Our Stand on Recruiter Impersonation</span>
        </div>
        <p className="text-secondary leading-relaxed">
          TraceBase never messages you first, never charges fees, and never requests your bank credentials, SSN, BVN, or identity cards. Anyone asking for these credentials is not us and not an official partner.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Link
            href="/scam-check"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#5A35C8] text-white font-medium text-xs hover:opacity-90 transition-opacity"
          >
            <span>Run 10-Point Scam Check</span>
          </Link>
          <Link
            href="/official-channels"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-default text-ink font-medium text-xs hover:bg-surface transition-colors"
          >
            <span>Our Official Channels Directory</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
