"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Briefcase, Building2, BookOpen, ShieldAlert, Cpu, X, CornerDownLeft } from "lucide-react";

export interface SearchItem {
  id: string;
  title: string;
  category: "Jobs" | "Platforms" | "Guides" | "Studio" | "Tools";
  href: string;
  meta?: string;
}

const SAMPLE_SEARCH_INDEX: SearchItem[] = [
  { id: "1", title: "AI Model Reasoning & Fact-Checking Evaluator", category: "Jobs", href: "/jobs/sample-outlier-rlhf-generalist", meta: "Outlier • $15-$22/hr" },
  { id: "2", title: "Multimodal Image & Visual Reasoning Specialist", category: "Jobs", href: "/jobs/sample-alignerr-multimodal-evaluator", meta: "Alignerr • $24-$32/hr" },
  { id: "3", title: "Outlier AI Reality Profile", category: "Platforms", href: "/platforms/outlier", meta: "PayPal, AirTM • Onboarding steps" },
  { id: "4", title: "Alignerr Reality Profile", category: "Platforms", href: "/platforms/alignerr", meta: "Deel payouts • TestGorilla assessment" },
  { id: "5", title: "Invisible Technologies Reality Profile", category: "Platforms", href: "/platforms/invisible-tech", meta: "Deel, Direct Wire • Technical interview" },
  { id: "6", title: "How to Tell if an AI Work Listing is Real", category: "Guides", href: "/guides/how-to-tell-if-an-ai-work-listing-is-real", meta: "Forensic guide • ATS & domain check" },
  { id: "7", title: "Getting Paid in USD from Nigeria", category: "Guides", href: "/guides/getting-paid-in-usd-from-nigeria", meta: "Geegpay, Grey, Dom accounts" },
  { id: "8", title: "Checking Claims Against Sources", category: "Guides", href: "/guides/checking-claims-against-sources-simple-method", meta: "Citation audit • Practice exercise" },
  { id: "9", title: "10-Point AI Work Scam Checklist", category: "Tools", href: "/scam-check", meta: "Test recruiter offers & red flags" },
  { id: "10", title: "About Countersign & Jo (Ebube Okeke)", category: "Studio", href: "/about", meta: "Independence pledge & FAQs" },
  { id: "11", title: "10-Point Verification Methodology", category: "Studio", href: "/methodology", meta: "14-day recheck standard" },
];

export interface CommandPaletteProps {
  className?: string;
}

/**
 * CommandPalette (Section 10.3 & 10.11)
 * Fast keyboard-driven command palette (Ctrl+K / Cmd+K).
 * Full-screen search sheet on mobile devices.
 * Key states: closed, open, results, empty.
 */
export function CommandPalette({ className = "" }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const filteredItems = query.trim()
    ? SAMPLE_SEARCH_INDEX.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          (item.meta && item.meta.toLowerCase().includes(query.toLowerCase())) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : SAMPLE_SEARCH_INDEX.slice(0, 5);

  const getCategoryIcon = (category: SearchItem["category"]) => {
    switch (category) {
      case "Jobs":
        return <Briefcase size={14} className="text-[#3DEBFF]" />;
      case "Platforms":
        return <Building2 size={14} className="text-[#8B7CFF]" />;
      case "Guides":
        return <BookOpen size={14} className="text-[#45F5C5]" />;
      case "Tools":
        return <ShieldAlert size={14} className="text-[#FFC66D]" />;
      case "Studio":
        return <Cpu size={14} className="text-[#8B7CFF]" />;
    }
  };

  return (
    <>
      {/* Quick Search Button in Header */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-subtle bg-surface hover:border-focus text-secondary hover:text-primary transition-colors text-xs font-mono ${className}`}
        aria-label="Open command palette"
      >
        <Search size={14} className="text-secondary" />
        <span className="hidden sm:inline">Search roles, platforms, guides...</span>
        <span className="sm:hidden">Search...</span>
        <kbd className="hidden sm:inline-block ml-2 px-1.5 py-0.5 rounded border border-subtle bg-void text-[10px] text-secondary">
          ⌘K
        </kbd>
      </button>

      {/* Modal Overlay & Command Palette */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command search palette"
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150"
        >
          <div className="relative w-full max-w-xl rounded-2xl border border-subtle bg-surface shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Search Input Bar */}
            <div className="p-3.5 sm:p-4 border-b border-subtle flex items-center gap-3 bg-void">
              <Search size={18} className="text-accent-cyan flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search verified jobs, platform guides, tools..."
                className="w-full bg-transparent text-sm text-primary placeholder:text-secondary focus:outline-none"
              />
              <button
                type="button"
                onClick={handleClose}
                className="p-1 rounded text-secondary hover:text-primary"
                aria-label="Close command palette"
              >
                <X size={16} />
              </button>
            </div>

            {/* Results List */}
            <div className="p-2 overflow-y-auto divide-y divide-subtle/30">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-elevated transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded bg-void border border-subtle flex-shrink-0">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-medium text-primary group-hover:text-accent-cyan truncate">
                          {item.title}
                        </div>
                        {item.meta && (
                          <div className="text-[11px] font-mono text-secondary truncate">
                            {item.meta}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 font-mono text-[11px] text-secondary">
                      <span className="hidden sm:inline">{item.category}</span>
                      <CornerDownLeft size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-6 text-center text-xs font-mono text-secondary">
                  No verified items found matching &ldquo;{query}&rdquo;.
                </div>
              )}
            </div>

            {/* Footer Navigation Hints */}
            <div className="p-2.5 bg-void border-t border-subtle flex items-center justify-between text-[11px] font-mono text-secondary">
              <div className="flex items-center gap-2">
                <span>Navigate: <kbd className="px-1 py-0.5 rounded border border-subtle bg-surface">↑</kbd> <kbd className="px-1 py-0.5 rounded border border-subtle bg-surface">↓</kbd></span>
                <span>Select: <kbd className="px-1 py-0.5 rounded border border-subtle bg-surface">↵</kbd></span>
              </div>
              <div>Esc to close</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
