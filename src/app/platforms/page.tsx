import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import { dbRepository } from '@/lib/db/repository';
import { PlatformsCombinedExplorer } from '@/components/platforms/PlatformsCombinedExplorer';
import { QueueHealthRadar } from '@/components/ui/QueueHealthRadar';

export const metadata: Metadata = {
  title: 'Platforms and Pay Rates Directory | TraceBase',
  description:
    'Honest, independent reality checks and verified hourly pay rates on remote AI evaluation platforms including Outlier, Alignerr, DataAnnotation, and Mercor.',
  alternates: {
    canonical: '/platforms',
  },
  openGraph: {
    title: 'Platforms and Pay Rates Directory | TraceBase',
    description: 'Independent profiles and pay rates of remote AI evaluation platforms.',
    url: '/platforms',
    type: 'website',
  },
};

export default async function PlatformsPage(props: { searchParams?: Promise<{ tab?: string }> }) {
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  const initialTab = searchParams?.tab === 'rates' ? 'rates' : 'platforms';
  const platforms = dbRepository.getPlatforms();
  const allJobs = dbRepository.getJobs();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Directory Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule bg-sheet text-xs text-secondary">
          <ShieldCheck size={14} className="text-[#5A35C8]" />
          <span>Verified platform & pay rate directory</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink">
          Platforms and pay rates
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          Independent reality checks on major AI evaluation platforms alongside verified contributor hourly rates. We report real onboarding timelines, payment rails, and review penalty standards.
        </p>
      </div>

      {/* Live Queue Health Radar */}
      <section aria-labelledby="queue-health-radar-h">
        <h2 id="queue-health-radar-h" className="sr-only">
          Live queue health radar
        </h2>
        <QueueHealthRadar />
      </section>

      {/* Unified Platforms and Rates Client */}
      <PlatformsCombinedExplorer
        platforms={platforms}
        allJobs={allJobs}
        initialTab={initialTab}
      />
    </div>
  );
}
