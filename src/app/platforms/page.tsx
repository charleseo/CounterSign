import Link from 'next/link';
import type { Metadata } from 'next';
import { ExternalLink, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { dbRepository } from '@/lib/db/repository';

export const metadata: Metadata = {
  title: 'Platform Reality Directory | Remote AI Training Companies | Countersign',
  description:
    'Honest, independent reality checks on remote AI evaluation platforms. Verified payout rails, assessment formats, and onboarding expectations.',
  alternates: {
    canonical: '/platforms',
  },
  openGraph: {
    title: 'Platform Reality Directory | Countersign',
    description: 'Independent profiles of remote AI evaluation platforms. Payouts and onboarding reality checks.',
    url: '/platforms',
    type: 'website',
  },
};

export default function PlatformsPage() {
  const platforms = dbRepository.getPlatforms();
  const allJobs = dbRepository.getJobs();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Directory Header */}
      <div className="space-y-3">
        <div className="glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-secondary">
          <ShieldCheck size={14} className="text-[var(--accent-cyan)]" />
          <span>Section 7.4 Reality Profiles</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gradient-cyan">
          Platform Reality Profiles
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          Independent reality checks on major AI evaluation platforms. We report real onboarding timelines, verified payment rails, and what active contributors experience in month one.
        </p>
      </div>

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {platforms.map((platform) => {
          const platformJobs = allJobs.filter((j) => j.platform_id === platform.id);
          const activeJobsCount = platformJobs.filter((j) => j.status !== 'closed').length;

          return (
            <div
              key={platform.id}
              className="glass-card rounded-xl p-5 sm:p-6 flex flex-col justify-between gap-4 relative overflow-hidden"
            >
              {/* Ambient corner glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(61,235,255,0.06)_0%,transparent_70%)] pointer-events-none" />

              <div className="space-y-3 relative">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-void)] flex items-center justify-center font-mono font-bold text-[var(--accent-cyan)] text-sm glow-cyan-sm">
                      {platform.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-primary">
                        {platform.name}
                      </h2>
                      <span className="text-[11px] font-mono text-secondary">
                        Last reviewed: {platform.last_reviewed_at ? new Date(platform.last_reviewed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}
                      </span>
                    </div>
                  </div>

                  <span className="glass-pill text-[11px] font-mono px-2 py-0.5 rounded text-primary">
                    {activeJobsCount} {activeJobsCount === 1 ? 'role' : 'roles'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-readable line-clamp-2 leading-relaxed">
                  {platform.description}
                </p>

                <div className="space-y-1.5 text-xs font-mono pt-2 border-t border-[var(--border-subtle)]">
                  <div className="flex items-center justify-between">
                    <span className="text-secondary">Payout Rails:</span>
                    <span className="text-primary font-medium">{platform.payout_methods || 'Direct ACH / PayPal'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary">Assessment Style:</span>
                    <span className="text-readable truncate max-w-[200px]">{platform.assessment_style || 'Domain testing'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2 relative">
                <a
                  href={platform.official_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-xs font-mono text-secondary hover:text-primary transition-colors"
                >
                  <span>Official site</span>
                  <ExternalLink size={12} />
                </a>

                <Link
                  href={`/platforms/${platform.slug}`}
                  className="shimmer-sweep inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--accent-cyan)] hover:underline px-2 py-1 rounded-lg"
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
