'use client';

import React, { useTransition, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { runSweeperAction } from '@/lib/actions/admin';
import { AdminStats } from '@/lib/db/types';
import { RefreshCw, PlusCircle, CheckCircle2 } from 'lucide-react';

export function AdminHeaderNav({ stats }: { stats: AdminStats }) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [sweeperResult, setSweeperResult] = useState<string | null>(null);

  const handleRunSweeper = () => {
    startTransition(async () => {
      const res = await runSweeperAction();
      setSweeperResult(res.message);
      setTimeout(() => setSweeperResult(null), 5000);
    });
  };

  const navItems = [
    { href: '/admin', label: 'Overview' },
    {
      href: '/admin/jobs',
      label: 'Jobs',
      badge: stats.needsRecheckJobs > 0 ? stats.needsRecheckJobs : undefined,
    },
    { href: '/admin/platforms', label: 'Platforms' },
    { href: '/admin/audit', label: 'Audit Log' },
  ];

  return (
    <div className="flex items-center gap-3">
      {/* Navigation links */}
      <nav className="hidden md:flex items-center gap-1 bg-[var(--color-surface-hover)] p-1 rounded-xl border border-[var(--color-border)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sweeper trigger */}
      <button
        onClick={handleRunSweeper}
        disabled={isPending}
        title="Execute 14-day compliance sweeper"
        className="px-2.5 py-1.5 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] bg-[var(--color-surface)] text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isPending ? 'animate-spin text-[var(--color-accent)]' : ''}`} />
        <span className="hidden lg:inline">{isPending ? 'Sweeping...' : 'Run Sweeper'}</span>
      </button>

      {/* Add Job button */}
      <Link
        href="/admin/jobs/new"
        className="px-3 py-1.5 rounded-lg bg-[var(--color-accent)] text-[var(--color-accent-fg)] text-xs font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5"
      >
        <PlusCircle className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Add Verified Job</span>
        <span className="sm:hidden">Add</span>
      </Link>

      {/* Sweeper toast banner */}
      {sweeperResult && (
        <div className="fixed top-16 right-4 z-50 p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/30 text-emerald-300 text-xs shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{sweeperResult}</span>
        </div>
      )}
    </div>
  );
}
