'use client';

import React, { useState } from 'react';
import { JobWithPlatform } from '@/lib/db/types';
import { QuickRecheckCard } from '../QuickRecheckCard';
import { Search, Filter } from 'lucide-react';

export function JobsListTable({ initialJobs }: { initialJobs: JobWithPlatform[] }) {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = initialJobs.filter((job) => {
    if (statusFilter !== 'all' && job.status !== statusFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchPlatform = job.platform.name.toLowerCase().includes(q);
      const matchType = job.work_type.toLowerCase().includes(q);
      return matchTitle || matchPlatform || matchType;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 bg-[var(--color-surface)] p-1 rounded-xl border border-[var(--color-border)] overflow-x-auto">
          {[
            { id: 'all', label: 'All Roles', count: initialJobs.length },
            {
              id: 'verified',
              label: 'Verified',
              count: initialJobs.filter((j) => j.status === 'verified').length,
            },
            {
              id: 'needs_recheck',
              label: 'Needs Recheck',
              count: initialJobs.filter((j) => j.status === 'needs_recheck').length,
            },
            {
              id: 'closed',
              label: 'Closed',
              count: initialJobs.filter((j) => j.status === 'closed').length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-[var(--color-surface-hover)] text-[var(--color-text)] shadow-sm'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              <span>{tab.label}</span>
              <span className="font-mono text-[10px] opacity-75">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--color-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles, platforms, types..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
          />
        </div>
      </div>

      {/* Roles List */}
      {filteredJobs.length === 0 ? (
        <div className="p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center">
          <Filter className="w-8 h-8 text-[var(--color-muted)] mx-auto mb-2 opacity-50" />
          <h3 className="text-sm font-semibold text-[var(--color-text)]">No matching roles found</h3>
          <p className="text-xs text-[var(--color-muted)] mt-1">
            Try resetting your search query or status filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <QuickRecheckCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
