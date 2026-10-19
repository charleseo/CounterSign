'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import {
  Search,
  Briefcase,
  Building2,
  BookOpen,
  ShieldAlert,
  Cpu,
  Scale,
  X,
  CornerDownLeft,
  ArrowRight,
} from 'lucide-react';

export interface SearchItem {
  id: string;
  title: string;
  category: 'Jobs' | 'Platforms' | 'Guides' | 'Studio' | 'Tools' | 'Legal';
  href: string;
  meta?: string;
}

const STATIC_SEARCH_ITEMS: SearchItem[] = [
  // Platforms
  { id: 'p-outlier', title: 'Outlier AI Reality Profile', category: 'Platforms', href: '/platforms/outlier', meta: 'PayPal, AirTM • Onboarding steps' },
  { id: 'p-alignerr', title: 'Alignerr Reality Profile', category: 'Platforms', href: '/platforms/alignerr', meta: 'Deel payouts • TestGorilla tests' },
  { id: 'p-dataannotation', title: 'DataAnnotation Tech Reality Profile', category: 'Platforms', href: '/platforms/dataannotation', meta: 'PayPal • 45m starter test' },
  { id: 'p-mercor', title: 'Mercor Reality Profile', category: 'Platforms', href: '/platforms/mercor', meta: 'Stripe, Wise • AI video interview' },
  { id: 'p-invisible', title: 'Invisible Technologies Reality Profile', category: 'Platforms', href: '/platforms/invisible-tech', meta: 'Deel, Direct Wire • Technical review' },
  // Guides
  { id: 'g-1', title: 'How to Tell if an AI Work Listing is Real', category: 'Guides', href: '/guides/how-to-tell-if-an-ai-work-listing-is-real', meta: 'Verification guide • ATS & domain check' },
  { id: 'g-2', title: 'Getting Paid in USD from Nigeria', category: 'Guides', href: '/guides/getting-paid-in-usd-from-nigeria', meta: 'Geegpay, Grey, Dom accounts' },
  { id: 'g-3', title: 'Checking Claims Against Sources', category: 'Guides', href: '/guides/checking-claims-against-sources-simple-method', meta: 'Citation audit • Practice exercise' },
  // Tools & Hubs
  { id: 't-task-check', title: 'Task Pre-Submission Check', category: 'Tools', href: '/task-check', meta: 'Verify negative constraints & word counts' },
  { id: 't-payout', title: 'Real Payout & Take-Home Calculator', category: 'Tools', href: '/payout-calculator', meta: 'Net earnings across Deel, Geegpay & AirTM' },
  { id: 't-rates', title: 'Real Contributor Pay Rate Directory', category: 'Tools', href: '/platforms?tab=rates', meta: 'Compare hourly pay by platform and domain' },
  { id: 't-cv-builder', title: 'AI Contributor CV Builder', category: 'Tools', href: '/cv-builder', meta: 'ATS single-page PDF with verified certificate' },
  { id: 't-appeals', title: 'Account Dispute & Ban Appeal Kit', category: 'Tools', href: '/appeals', meta: 'Appeal empty queues & location flags' },
  { id: 't-scam', title: '10-Point AI Work Scam Checklist', category: 'Tools', href: '/scam-check', meta: 'Check recruiter offers & red flags' },
  { id: 't-benchmark', title: 'AI Model Constraint & Truth Benchmark', category: 'Tools', href: '/benchmark', meta: 'Human-audited negative constraint leaderboard' },
  { id: 't-glossary', title: 'AI Evaluation Jargon & Reviewer Decoder', category: 'Tools', href: '/glossary', meta: 'Understand EQ, SFT, DPO, and reviewer notes' },
  { id: 't-w8ben', title: 'Form W-8BEN International Tax Guide', category: 'Tools', href: '/w8ben', meta: 'Avoid 30% US tax withholding on Deel & Outlier' },
  { id: 't-drills', title: '2-Minute Daily Screening Drills', category: 'Tools', href: '/training/drills', meta: 'Practice negative constraints and trap detection' },
  { id: 't-invoice', title: 'Remote Contractor Invoice Generator', category: 'Tools', href: '/invoice', meta: 'Print clean PDF invoices for bank FX clearance' },
  { id: 't-jobs', title: 'Browse All Verified Jobs', category: 'Jobs', href: '/jobs', meta: 'Filter by country, pay, and status' },
  { id: 't-platforms', title: 'Platform Reality Directory', category: 'Platforms', href: '/platforms', meta: '5 verified platform profiles & queue radar' },
  // Studio & Trust
  { id: 's-about', title: 'About TraceBase & Ebubechukwu Okeke', category: 'Studio', href: '/about', meta: 'Independence pledge & 10 FAQs' },
  { id: 's-demo', title: 'Interactive Grounding & RAG Audit Demo', category: 'Studio', href: '/evaluation/demo', meta: 'Test prompt against docs to catch hallucinations' },
  { id: 's-whitepaper', title: 'State of RAG & Hallucinations Whitepaper', category: 'Studio', href: '/evaluation/whitepaper', meta: 'Research briefing on 500 frontier model technical queries' },
  { id: 's-estimator', title: 'Evaluation Sprint Estimator', category: 'Studio', href: '/evaluation/estimator', meta: 'Self-serve SLA, volume & capacity calculator' },
  { id: 's-methodology', title: '10-Point Verification Methodology', category: 'Studio', href: '/methodology', meta: '14-day recheck standard' },
  { id: 's-studio', title: 'Evaluation Studio: RAG & Citation Audits', category: 'Studio', href: '/evaluation', meta: 'Technical docs verification for AI teams' },
  { id: 's-sample-audit', title: 'Sample Audit Report: 5 Illustrative Cases', category: 'Studio', href: '/evaluation/sample-audit', meta: 'Postgres, Stripe, Next.js, Bedrock, Tailwind' },
  { id: 's-scope', title: 'Scope an Evaluation Audit (3 Steps)', category: 'Studio', href: '/evaluation/scope', meta: 'Propose an audit for your docs bot' },
  // Legal & Contact
  { id: 'l-privacy', title: 'Privacy Policy & NDPA 2023 Compliance', category: 'Legal', href: '/privacy', meta: '30-day purge & minimal collection' },
  { id: 'l-sar', title: 'Data Subject Rights Request (SAR Portal)', category: 'Legal', href: '/privacy/request', meta: 'Access, rectify, or delete your data' },
  { id: 'l-disclosure', title: 'Referral Disclosure & Neutrality Pledge', category: 'Legal', href: '/disclosure', meta: 'Direct vs referral links declared' },
  { id: 'l-corrections', title: 'Platform Corrections & Takedowns', category: 'Legal', href: '/corrections', meta: '3-day editorial turnaround SLA' },
  { id: 'l-terms', title: 'Terms of Service & Disclaimers', category: 'Legal', href: '/terms', meta: 'Independent service & acceptable use' },
  { id: 'l-contact', title: 'Contact Desk & Inboxes', category: 'Legal', href: '/contact', meta: 'Editorial, pilots, corrections, privacy' },
];

export interface CommandPaletteProps {
  className?: string;
  triggerLabel?: string;
}

export function CommandPalette({ className = '', triggerLabel }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [apiJobs, setApiJobs] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Listen for custom search open event (e.g. from hero search bar)
  useEffect(() => {
    const handleOpenEvent = () => {
      setSelectedIndex(0);
      setIsOpen(true);
    };
    window.addEventListener('countersign:open-search', handleOpenEvent);
    return () => window.removeEventListener('countersign:open-search', handleOpenEvent);
  }, []);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSelectedIndex(0);
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);

      // Fetch dynamic jobs list from /api/jobs.json if not already fetched
      if (apiJobs.length === 0) {
        fetch('/api/jobs.json')
          .then((res) => res.json())
          .then((data: Array<{ id: string; slug: string; title: string; platform: string; work_type: string; verifiedPay?: string | null }>) => {
            if (Array.isArray(data)) {
              const formatted: SearchItem[] = data.map((j) => {
                const cleanTitle = (j.title || '').replace(/\[SAMPLE\]/gi, '').trim();
                const cleanPlatform = (j.platform || '').replace(/\[SAMPLE\]/gi, '').trim();
                return {
                  id: `job-${j.id}`,
                  title: cleanTitle,
                  category: 'Jobs',
                  href: `/jobs/${j.slug}`,
                  meta: `${cleanPlatform} • ${j.work_type}${j.verifiedPay ? ` • ${j.verifiedPay}` : ''}`,
                };
              });
              setApiJobs(formatted);
            }
          })
          .catch(() => {
            // Silently fall back to static items
          });
      }

      return () => clearTimeout(timer);
    }
  }, [isOpen, apiJobs.length]);

  // Combine items and filter
  const allItems = useMemo(() => {
    return [...apiJobs, ...STATIC_SEARCH_ITEMS];
  }, [apiJobs]);

  const filteredItems = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return allItems.slice(0, 8);
    }

    const tokens = trimmed.split(/\s+/).filter(Boolean);
    const compactQuery = trimmed.replace(/[^a-z0-9]/g, '');

    return allItems.filter((item) => {
      const fullText = `${item.title} ${item.meta || ''} ${item.category}`.toLowerCase();
      const compactFullText = fullText.replace(/[^a-z0-9]/g, '');

      if (compactQuery.length > 2 && compactFullText.includes(compactQuery)) {
        return true;
      }

      return tokens.every((token) => {
        if (fullText.includes(token)) return true;
        const compactToken = token.replace(/[^a-z0-9]/g, '');
        return compactToken.length > 2 && compactFullText.includes(compactToken);
      });
    }).slice(0, 10);
  }, [allItems, query]);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    setSelectedIndex(0);
  };

  // Navigate to selected item
  const handleSelect = useCallback((item: SearchItem) => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
    router.push(item.href);
  }, [router]);

  // Keyboard navigation within the list (ArrowUp, ArrowDown, Enter)
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredItems.length === 0) {
      if (e.key === 'Enter' && query.trim()) {
        e.preventDefault();
        const searchTarget = query.trim();
        handleClose();
        router.push(`/jobs?q=${encodeURIComponent(searchTarget)}`);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = filteredItems[selectedIndex];
      if (current) {
        handleSelect(current);
      } else if (query.trim()) {
        const searchTarget = query.trim();
        handleClose();
        router.push(`/jobs?q=${encodeURIComponent(searchTarget)}`);
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
  };

  const getCategoryIcon = (category: SearchItem['category']) => {
    switch (category) {
      case 'Jobs':
        return <Briefcase size={14} className="text-accent-cyan" />;
      case 'Platforms':
        return <Building2 size={14} className="text-accent-violet" />;
      case 'Guides':
        return <BookOpen size={14} className="text-accent-emerald" />;
      case 'Tools':
        return <ShieldAlert size={14} className="text-accent-rose" />;
      case 'Studio':
        return <Cpu size={14} className="text-accent-cyan" />;
      case 'Legal':
        return <Scale size={14} className="text-amber-400" />;
    }
  };

  return (
    <>
      {/* Trigger Button in Header or elsewhere */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center justify-center gap-2 p-2 sm:px-3 sm:py-1.5 min-h-[44px] min-w-[44px] sm:min-w-0 rounded-lg border border-subtle bg-surface hover:border-focus text-secondary hover:text-primary transition-colors text-xs font-sans font-medium select-none ${className}`}
        aria-label="Open command palette search"
      >
        <Search size={16} className="text-secondary" />
        <span className="hidden sm:inline">
          {triggerLabel || 'Search roles, platforms, guides...'}
        </span>
        <kbd className="hidden sm:inline-block ml-1.5 px-1.5 py-0.5 rounded border border-subtle bg-void text-[10px] text-secondary font-sans font-medium">
          ⌘K
        </kbd>
      </button>

      {/* Modal Overlay / Full-Screen Search Sheet on Mobile */}
      {isOpen && mounted && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command search palette"
          className="fixed inset-0 z-[9999] flex items-start sm:items-center justify-center p-0 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
        >
          {/* Backdrop click dismiss */}
          <div
            className="absolute inset-0 -z-10"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Dialog Container: Full-screen on mobile, centered card on desktop */}
          <div className="relative w-full h-full sm:h-auto sm:max-h-[85vh] sm:max-w-xl sm:rounded-2xl border-0 sm:border border-subtle bg-surface shadow-2xl overflow-hidden flex flex-col">
            {/* Search Input Bar */}
            <div className="p-3.5 sm:p-4 border-b border-subtle flex items-center gap-3 bg-void min-h-[56px]">
              <Search size={18} className="text-brand-ink shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Type to search roles, platforms, guides..."
                className="w-full min-h-[44px] bg-transparent text-sm text-primary placeholder:text-secondary focus:outline-none font-sans"
              />
              <button
                type="button"
                onClick={handleClose}
                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-subtle text-secondary hover:text-primary hover:bg-elevated transition-colors"
                aria-label="Close search"
              >
                <X size={16} />
              </button>
            </div>

            {/* Results List */}
            <div
              ref={listRef}
              className="p-2 overflow-y-auto flex-1 divide-y divide-subtle/30"
              role="listbox"
            >
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;

                  return (
                    <div
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-elevated border border-accent-cyan/30 text-primary'
                          : 'hover:bg-elevated/50 text-readable'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 rounded-lg bg-void border border-subtle shrink-0">
                          {getCategoryIcon(item.category)}
                        </div>
                        <div className="min-w-0">
                          <div className={`text-xs sm:text-sm font-semibold truncate ${isSelected ? 'text-accent-cyan' : 'text-primary'}`}>
                            {item.title}
                          </div>
                          {item.meta && (
                            <div className="text-[11px] font-mono text-secondary truncate mt-0.5">
                              {item.meta}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 font-mono text-[11px] text-secondary">
                        <span className="hidden sm:inline px-1.5 py-0.5 rounded bg-void border border-subtle text-[10px]">
                          {item.category}
                        </span>
                        <CornerDownLeft
                          size={13}
                          className={`transition-opacity ${
                            isSelected ? 'opacity-100 text-accent-cyan' : 'opacity-0'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center space-y-2">
                  <p className="text-xs font-sans text-secondary">
                    No verified items found matching &ldquo;{query}&rdquo;.
                  </p>
                  <p className="text-[11px] text-secondary">
                    Try searching for &quot;Outlier&quot;, &quot;Nigeria&quot;, &quot;RLHF&quot;, or &quot;Scam Check&quot;.
                  </p>
                </div>
              )}
            </div>

            {/* Footer Navigation Hints */}
            <div className="p-2.5 sm:p-3 bg-void border-t border-subtle flex items-center justify-between text-[11px] font-sans text-secondary">
              <div className="flex items-center gap-2">
                <span>
                  Navigate:{' '}
                  <kbd className="px-1 py-0.5 rounded border border-subtle bg-surface">↑</kbd>{' '}
                  <kbd className="px-1 py-0.5 rounded border border-subtle bg-surface">↓</kbd>
                </span>
                <span className="hidden sm:inline">
                  Select:{' '}
                  <kbd className="px-1 py-0.5 rounded border border-subtle bg-surface">↵</kbd>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline">Esc to close</span>
                <button
                  type="button"
                  onClick={() => {
                    const searchTarget = query.trim();
                    handleClose();
                    router.push(searchTarget ? `/jobs?q=${encodeURIComponent(searchTarget)}` : '/jobs');
                  }}
                  className="text-accent-cyan hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Search in jobs</span>
                  <ArrowRight size={11} />
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
