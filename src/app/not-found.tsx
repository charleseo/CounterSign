import React from 'react';
import Link from 'next/link';
import { Search, Briefcase, BookOpen, ShieldCheck, Scale, ArrowRight, Home } from 'lucide-react';
import { SealLogo } from '@/components/ui/SealLogo';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Seal Icon & Error Code */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl glass-panel animate-float">
            <SealLogo size={28} color="amber" />
          </div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-amber)]">
            Error 404 : Resource Not Found
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient-cyan">
            We could not find that page.
          </h1>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed">
            Try search, or start from the jobs list. Every role we list has an official source, a verified date, and an honest note on who can apply.
          </p>
        </div>

        {/* Quick Search Redirect Input */}
        <form action="/jobs" method="GET" className="relative">
          <input
            type="text"
            name="q"
            placeholder="Search roles, platforms, guides..."
            className="w-full pl-10 pr-24 py-3 rounded-xl glass-panel text-xs text-primary outline-none transition-colors focus:border-[var(--border-focus)] focus:ring-1 focus:ring-[var(--accent-cyan)]"
          />
          <Search className="w-4 h-4 text-secondary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <button
            type="submit"
            className="shimmer-sweep absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-[var(--accent-cyan)] text-[var(--bg-void)] text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Top Suggested Navigation Links */}
        <div className="pt-2 border-t border-[var(--border-subtle)] space-y-2 text-left">
          <div className="text-[11px] font-mono text-secondary uppercase tracking-wider">
            Verified Navigation Alternatives
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Link
              href="/jobs"
              className="glass-card p-3 rounded-xl flex items-center justify-between text-xs text-primary group"
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-[var(--accent-emerald)]" />
                <span className="font-medium">Verified AI Jobs</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/guides"
              className="glass-card p-3 rounded-xl flex items-center justify-between text-xs text-primary group"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                <span className="font-medium">Practical Guides</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/scam-check"
              className="glass-card p-3 rounded-xl flex items-center justify-between text-xs text-primary group"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
                <span className="font-medium">10-Point Scam Check</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/evaluation"
              className="glass-card p-3 rounded-xl flex items-center justify-between text-xs text-primary group"
            >
              <div className="flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-[var(--accent-violet)]" />
                <span className="font-medium">Evaluation Studio</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>

        {/* Home link */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-primary transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Countersign home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
