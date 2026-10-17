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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-sheet border border-rule shadow-sm">
            <SealLogo size={28} color="amber" />
          </div>
          <div className="text-xs font-semibold text-amber-700 dark:text-amber-400">
            Error 404 : Resource Not Found
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
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
            className="w-full pl-10 pr-24 py-3 rounded-lg bg-sheet border border-rule text-xs text-primary outline-none transition-colors focus:border-[#5A35C8] focus:ring-1 focus:ring-[#5A35C8] min-h-[44px]"
          />
          <Search className="w-4 h-4 text-secondary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-[#5A35C8] hover:bg-[#4A2AB0] text-white text-xs font-semibold transition-colors cursor-pointer min-h-[36px]"
          >
            Search
          </button>
        </form>

        {/* Top Suggested Navigation Links */}
        <div className="pt-2 border-t border-rule space-y-2 text-left">
          <div className="text-xs font-semibold text-secondary">
            Verified Navigation Alternatives
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Link
              href="/jobs"
              className="bg-sheet border border-rule p-3 rounded-lg flex items-center justify-between text-xs text-primary hover:border-brand-ink transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span className="font-medium">Verified AI Jobs</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/guides"
              className="bg-sheet border border-rule p-3 rounded-lg flex items-center justify-between text-xs text-primary hover:border-brand-ink transition-colors group"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-brand-ink" />
                <span className="font-medium">Practical Guides</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/scam-check"
              className="bg-sheet border border-rule p-3 rounded-lg flex items-center justify-between text-xs text-primary hover:border-brand-ink transition-colors group"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span className="font-medium">10-Point Scam Check</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/evaluation"
              className="bg-sheet border border-rule p-3 rounded-lg flex items-center justify-between text-xs text-primary hover:border-brand-ink transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-brand-ink" />
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
            <span>Return to TraceBase home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
