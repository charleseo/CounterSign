import { Suspense } from 'react';
import type { Metadata } from 'next';
import { dbRepository } from '@/lib/db/repository';
import { JobsExplorer } from './JobsExplorer';

export const metadata: Metadata = {
  title: 'Verified Remote AI Work | Human-Checked Roles | Countersign',
  description:
    'Discover legitimate remote AI training, model evaluation, and RLHF roles. Every opportunity is human-verified against official feeds with transparent country eligibility and pay.',
  alternates: {
    canonical: '/jobs',
  },
  openGraph: {
    title: 'Verified Remote AI Work | Countersign',
    description:
      'Human-verified remote AI training, RLHF, and model evaluation opportunities. Transparent country eligibility and pay.',
    url: '/jobs',
    type: 'website',
  },
};

export default function JobsPage() {
  const jobs = dbRepository.getJobs({ status: 'all' });
  const countries = dbRepository.getCountries();

  return (
    <Suspense
      fallback={
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="h-8 w-64 bg-surface rounded animate-pulse mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            <div className="h-96 bg-surface rounded-xl hidden lg:block animate-pulse" />
            <div className="space-y-4">
              <div className="h-44 bg-surface rounded-xl animate-pulse" />
              <div className="h-44 bg-surface rounded-xl animate-pulse" />
              <div className="h-44 bg-surface rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      }
    >
      <JobsExplorer initialJobs={jobs} countries={countries} />
    </Suspense>
  );
}
