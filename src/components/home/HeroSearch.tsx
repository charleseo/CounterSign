'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

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
      className="w-full max-w-xl mx-auto flex items-center rounded-xl bg-sheet border border-rule shadow-sm hover:border-rule-strong focus-within:border-[#5A35C8] p-1.5 transition-all"
    >
      <button
        type="button"
        onClick={handleOpenPalette}
        className="p-2.5 text-secondary hover:text-ink transition-colors"
        aria-label="Open search dialog"
      >
        <Search size={18} className="text-secondary" />
      </button>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search roles, platforms, guides (e.g. Outlier, STEM)..."
        className="w-full bg-transparent px-2 py-1 text-xs sm:text-sm text-ink placeholder:text-muted focus:outline-none font-sans"
      />

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={handleOpenPalette}
          className="hidden sm:inline-flex items-center px-2 py-1 rounded bg-surface border border-rule text-[11px] text-secondary hover:text-ink transition-colors"
          title="Press Cmd+K to search"
        >
          ⌘K
        </button>

        <button
          type="submit"
          className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-lg bg-[#5A35C8] text-white font-medium text-xs hover:bg-[#4828AC] transition-colors cursor-pointer"
        >
          <span>Find</span>
        </button>
      </div>
    </form>
  );
}
