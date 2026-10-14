import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { connection } from 'next/server';
import { redirect } from 'next/navigation';
import { SealLogo } from '@/components/ui/SealLogo';
import { dbRepository } from '@/lib/db/repository';
import { adminLogoutAction } from '@/lib/actions/admin';
import { AdminHeaderNav } from './AdminHeaderNav';
import { LayoutDashboard, Briefcase, Layers, History, LogOut } from 'lucide-react';

export const instant = false;

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  const cookieStore = await cookies();
  const session = cookieStore.get('countersign_admin_session')?.value;

  if (session !== 'authenticated_admin') {
    redirect('/admin/login');
  }

  const stats = dbRepository.getAdminStats();

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col pb-16 md:pb-0">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[var(--color-surface)]/85 backdrop-blur-md border-b border-[var(--color-border)] px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2.5">
              <SealLogo size={30} priority />
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-sm tracking-tight text-[var(--color-text)]">
                  Countersign
                </span>
                <span className="text-[10px] font-mono font-semibold uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Admin
                </span>
              </div>
            </Link>

            {/* Compliance pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-[var(--color-surface-hover)] border border-[var(--color-border)]">
              <span
                className={`w-2 h-2 rounded-full ${
                  stats.complianceRate >= 90
                    ? 'bg-emerald-400 animate-pulse'
                    : stats.complianceRate >= 70
                    ? 'bg-amber-400'
                    : 'bg-rose-400'
                }`}
              />
              <span className="text-[var(--color-muted)]">14d SLA:</span>
              <span className="font-semibold text-[var(--color-text)]">{stats.complianceRate}%</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <AdminHeaderNav stats={stats} />

          {/* User & Sign Out */}
          <div className="flex items-center gap-2">
            <form action={adminLogoutAction}>
              <button
                type="submit"
                title="Sign out of Admin Console"
                className="p-2 rounded-lg text-[var(--color-muted)] hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer text-xs flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
        <React.Suspense
          fallback={
            <div className="p-8 text-center text-xs text-[var(--color-muted)] font-mono">
              Loading operations console...
            </div>
          }
        >
          {children}
        </React.Suspense>
      </main>

      {/* Mobile Sticky Bottom Bar (360px usability) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-surface)]/95 backdrop-blur-md border-t border-[var(--color-border)] px-2 py-2 flex items-center justify-around">
        <Link
          href="/admin"
          className="flex flex-col items-center gap-0.5 p-1 text-[var(--color-muted)] hover:text-[var(--color-accent)]"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="text-[10px] font-medium">Overview</span>
        </Link>
        <Link
          href="/admin/jobs"
          className="flex flex-col items-center gap-0.5 p-1 text-[var(--color-muted)] hover:text-[var(--color-accent)]"
        >
          <Briefcase className="w-4 h-4" />
          <span className="text-[10px] font-medium">Jobs</span>
        </Link>
        <Link
          href="/admin/jobs/new"
          className="flex flex-col items-center justify-center -mt-4 w-10 h-10 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-fg)] shadow-lg"
          title="Add New Job"
        >
          <span className="text-xl font-bold leading-none">+</span>
        </Link>
        <Link
          href="/admin/platforms"
          className="flex flex-col items-center gap-0.5 p-1 text-[var(--color-muted)] hover:text-[var(--color-accent)]"
        >
          <Layers className="w-4 h-4" />
          <span className="text-[10px] font-medium">Platforms</span>
        </Link>
        <Link
          href="/admin/audit"
          className="flex flex-col items-center gap-0.5 p-1 text-[var(--color-muted)] hover:text-[var(--color-accent)]"
        >
          <History className="w-4 h-4" />
          <span className="text-[10px] font-medium">Audit</span>
        </Link>
      </nav>
    </div>
  );
}
