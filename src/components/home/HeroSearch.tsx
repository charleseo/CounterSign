'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight } from 'lucide-react';

export function HeroSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/jobs?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push('/jobs');
    }
  };

  const handleOpenPalette = () => {
    window.dispatchEvent(new CustomEvent('countersign:open-search'));
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-xl mx-auto flex items-center rounded-2xl glass-panel shadow-[0_12px_40px_rgba(0,0,0,0.45)] hover:border-cyan-400/50 focus-within:border-cyan-400 focus-within:shadow-[0_0_30px_rgba(61,235,255,0.25)] p-2 transition-all"
    >
      <button
        type="button"
        onClick={handleOpenPalette}
        className="p-2 text-secondary hover:text-accent-cyan transition-colors"
        aria-label="Open full command palette search"
      >
        <Search size={18} className="text-cyan-400" />
      </button>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search roles, platforms, guides (e.g. Outlier, STEM)..."
        className="w-full bg-transparent px-3 py-1 text-xs sm:text-sm text-primary placeholder:text-secondary/70 focus:outline-none font-sans"
      />

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={handleOpenPalette}
          className="hidden sm:inline-flex items-center px-2 py-1 rounded-lg border border-subtle bg-void/60 text-[10px] font-mono text-secondary hover:text-primary transition-colors"
          title="Press Cmd+K to search"
        >
          ⌘K
        </button>

        <button
          type="submit"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-300 text-void font-mono font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity btn-tactile shadow-[0_0_20px_rgba(61,235,255,0.35)] shimmer-sweep"
        >
          <span>Find</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </form>
  );
}
