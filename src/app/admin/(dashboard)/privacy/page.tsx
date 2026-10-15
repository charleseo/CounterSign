import React from 'react';
import { dbRepository } from '@/lib/db/repository';
import { PrivacyQueueClient } from './PrivacyQueueClient';
import { Clock } from 'lucide-react';
import { connection } from 'next/server';

export default async function AdminPrivacyPage() {
  await connection();
  const requests = dbRepository.getPrivacyRequests();
  const openCount = requests.filter((r) => !r.closed_at).length;
  const nowMs = dbRepository.getCurrentTimestamp();

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)]">
              Privacy Requests & SAR Queue
            </h1>
            {openCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {openCount} Pending
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-0.5">
            Subject Access Requests, deletion demands, and consent revocations under NDPA 2023 Section 34.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted)] p-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>Statutory Due Window: 30 Days</span>
        </div>
      </div>

      {/* Interactive Queue */}
      <PrivacyQueueClient initialRequests={requests} nowMs={nowMs} />
    </div>
  );
}
