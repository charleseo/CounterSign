import React from 'react';
import Link from 'next/link';
import { dbRepository } from '@/lib/db/repository';
import { JobsListTable } from './JobsListTable';
import { PlusCircle, Briefcase } from 'lucide-react';
import { connection } from 'next/server';

export default async function AdminJobsPage() {
  await connection();
  const jobs = dbRepository.getJobs();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)] flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[var(--color-accent)]" />
            <span>Human-Verified AI Roles</span>
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-0.5">
            Manage listings, track 14-day freshness, and conduct instant mobile verification checks.
          </p>
        </div>

        <Link
          href="/admin/jobs/new"
          className="px-3.5 py-2 rounded-xl bg-[var(--color-accent)] text-[var(--color-accent-fg)] font-medium text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Role (&lt;2 min)</span>
        </Link>
      </div>

      <JobsListTable initialJobs={jobs} />
    </div>
  );
}
