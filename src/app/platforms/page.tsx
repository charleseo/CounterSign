import Link from 'next/link';
import type { Metadata } from 'next';
import { ExternalLink, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { dbRepository } from '@/lib/db/repository';
import { QueueHealthRadar } from '@/components/platforms/QueueHealthRadar';

export const metadata: Metadata = {
  title: 'Platform Reality Directory | Remote AI Training Companies | TraceBase',
  description:
    'Honest, independent reality checks on remote AI evaluation platforms. Verified payout rails, assessment formats, and onboarding expectations.',
  alternates: {
    canonical: '/platforms',
  },
  openGraph: {
    title: 'Platform Reality Directory | TraceBase',
    description: 'Independent profiles of remote AI evaluation platforms. Payouts and onboarding reality checks.',
    url: '/platforms',
    type: 'website',
  },
};

export default function PlatformsPage() {
  const platforms = dbRepository.getPlatforms();
  const allJobs = dbRepository.getJobs();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Directory Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule bg-sheet text-xs text-secondary">
          <ShieldCheck size={14} className="text-[var(--brand-ink)]" />
          <span>Verified Contributor Directory</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink">
          Platform Reality Profiles
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          Independent reality checks on major AI evaluation platforms. We report real onboarding timelines, verified payment rails, and what active contributors experience in month one.
        </p>
      </div>

      {/* Live Queue Health Radar */}
      <QueueHealthRadar />

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {platforms.map((platform) => {
          const platformJobs = allJobs.filter((j) => j.platform_id === platform.id);
          const activeJobsCount = platformJobs.filter((j) => j.status !== 'closed').length;
          const cleanName = platform.name.replace(/\[SAMPLE\]/g, '').trim();

          return (
            <div
              key={platform.id}
              className="rounded-xl border border-rule bg-sheet p-5 sm:p-6 flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg border border-rule bg-surface flex items-center justify-center font-bold text-[#5A35C8] text-sm">
                      {cleanName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-ink">
                        {cleanName}
                      </h2>
                      <span className="text-xs text-secondary tabular-nums">
                        Last reviewed: {platform.last_reviewed_at ? new Date(platform.last_reviewed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs px-2.5 py-1 rounded-full border border-rule bg-surface text-ink tabular-nums">
                    {activeJobsCount} {activeJobsCount === 1 ? 'role' : 'roles'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-readable line-clamp-2 leading-relaxed">
                  {platform.description}
                </p>

                <div className="space-y-1.5 text-xs pt-2 border-t border-rule">
                  <div className="flex items-center justify-between">
                    <span className="text-secondary">Payout Rails:</span>
                    <span className="text-ink font-medium">{platform.payout_methods || 'Direct ACH / PayPal'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary">Assessment Style:</span>
                    <span className="text-readable truncate max-w-[200px]">{platform.assessment_style || 'Domain testing'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-rule flex items-center justify-between gap-2">
                <a
                  href={platform.official_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-xs text-secondary hover:text-ink transition-colors min-h-[44px]"
                >
                  <span>Official site</span>
                  <ExternalLink size={12} />
                </a>

                <Link
                  href={`/platforms/${platform.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5A35C8] hover:underline px-2 py-1 rounded-lg min-h-[44px]"
                >
                  <span>View full reality profile</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
