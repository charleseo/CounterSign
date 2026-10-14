import React from 'react';
import Link from 'next/link';
import { dbRepository } from '@/lib/db/repository';
import { JobForm } from './JobForm';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import { connection } from 'next/server';

export default async function NewJobPage() {
  await connection();
  const platforms = dbRepository.getPlatforms();
  const countries = dbRepository.getCountries();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/jobs"
          className="p-2 rounded-xl border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
          title="Back to Jobs List"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)] flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-[var(--color-accent)]" />
            <span>Add Human-Verified AI Role</span>
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-0.5">
            Rapid workflow (&lt;2 minutes). Country eligibility grid and automated 14-day SLA clock.
          </p>
        </div>
      </div>

      <JobForm platforms={platforms} countries={countries} />
    </div>
  );
}
