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
      className="w-full max-w-xl mx-auto flex items-center rounded-xl border border-subtle bg-surface shadow-lg hover:border-focus focus-within:border-focus focus-within:ring-1 focus-within:ring-accent-cyan p-1.5 transition-all"
    >
      <button
        type="button"
        onClick={handleOpenPalette}
        className="p-2 text-secondary hover:text-accent-cyan transition-colors"
        aria-label="Open full command palette search"
      >
        <Search size={16} />
      </button>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search roles, platforms, guides (e.g. Outlier, STEM)..."
        className="w-full bg-transparent px-2 py-1 text-xs sm:text-sm text-primary placeholder:text-secondary focus:outline-none font-sans"
      />

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={handleOpenPalette}
          className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded border border-subtle bg-void text-[10px] font-mono text-secondary hover:text-primary transition-colors"
          title="Press Cmd+K to search"
        >
          ⌘K
        </button>

        <button
          type="submit"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent-cyan text-void font-mono font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity btn-tactile"
        >
          <span>Find</span>
          <ArrowRight size={12} />
        </button>
      </div>
    </form>
  );
}
