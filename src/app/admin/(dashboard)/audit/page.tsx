import React from 'react';
import { dbRepository } from '@/lib/db/repository';
import { AuditLogViewer } from './AuditLogViewer';
import { History, ShieldCheck } from 'lucide-react';
import { connection } from 'next/server';

export default async function AdminAuditPage() {
  await connection();
  const auditLogs = dbRepository.getAuditLogs(100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)] flex items-center gap-2">
            <History className="w-5 h-5 text-[var(--color-accent)]" />
            <span>Administrative Audit Log</span>
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-0.5">
            Tamper-evident, immutable event stream tracking every verification, edit, and automated sweeper action.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-muted)]">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Section 12 Compliant</span>
        </div>
      </div>

      <AuditLogViewer initialLogs={auditLogs} />
    </div>
  );
}
