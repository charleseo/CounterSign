'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ExternalLink, ArrowUpRight, Building2, DollarSign, ShieldCheck } from 'lucide-react';
import { QueueHealthRadar } from './QueueHealthRadar';
import { RatesClient } from '@/app/rates/RatesClient';

interface PlatformItem {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  payout_methods?: string | null;
  assessment_style?: string | null;
  official_url: string;
  last_reviewed_at?: string | null;
}

interface JobItem {
  id: string;
  platform_id?: string | null;
  status: string;
}

interface Props {
  platforms: PlatformItem[];
  allJobs: JobItem[];
  initialTab?: 'platforms' | 'rates';
}

export function PlatformsCombinedExplorer({ platforms, allJobs, initialTab = 'platforms' }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentTabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'platforms' | 'rates'>(() => {
    if (currentTabParam === 'rates') return 'rates';
    return initialTab;
  });

  useEffect(() => {
    if (currentTabParam === 'rates') {
      setActiveTab('rates');
    } else if (currentTabParam === 'platforms') {
      setActiveTab('platforms');
    }
  }, [currentTabParam]);

  const handleTabChange = (tab: 'platforms' | 'rates') => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    router.replace(url.pathname + url.search, { scroll: false });
  };

  return (
    <div className="space-y-8">
      {/* Top Segmented Tab Switcher */}
      <div className="flex p-1 rounded-2xl border border-rule bg-sheet max-w-md">
        <button
          type="button"
          onClick={() => handleTabChange('platforms')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all inline-flex items-center justify-center gap-2 ${
            activeTab === 'platforms'
              ? 'bg-[#5A35C8] text-white shadow-sm'
              : 'text-secondary hover:text-ink'
          }`}
        >
          <Building2 size={16} />
          <span>Platform profiles</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
              activeTab === 'platforms' ? 'bg-white/20 text-white' : 'bg-surface text-secondary'
            }`}
          >
            {platforms.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('rates')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all inline-flex items-center justify-center gap-2 ${
            activeTab === 'rates'
              ? 'bg-[#5A35C8] text-white shadow-sm'
              : 'text-secondary hover:text-ink'
          }`}
        >
          <DollarSign size={16} />
          <span>Pay rates benchmark</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
              activeTab === 'rates' ? 'bg-white/20 text-white' : 'bg-surface text-secondary'
            }`}
          >
            11
          </span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'platforms' ? (
        <div className="space-y-10">
          {/* Live Queue Health Radar */}
          <QueueHealthRadar />

          {/* Platforms Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-ink">
                Verified platform directory
              </h2>
              <span className="text-xs text-secondary">
                Showing {platforms.length} vetted platforms
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {platforms.map((platform) => {
                const platformJobs = allJobs.filter((j) => j.platform_id === platform.id);
                const activeJobsCount = platformJobs.filter((j) => j.status !== 'closed').length;
                const cleanName = platform.name.replace(/\[SAMPLE\]/g, '').trim();

                return (
                  <div
                    key={platform.id}
                    className="rounded-xl border border-rule bg-sheet p-5 sm:p-6 flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-lg border border-rule bg-surface flex items-center justify-center font-bold text-[#5A35C8] text-sm">
                            {cleanName.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-ink">
                              {cleanName}
                            </h3>
                            <span className="text-xs text-secondary tabular-nums">
                              Last reviewed:{' '}
                              {platform.last_reviewed_at
                                ? new Date(platform.last_reviewed_at).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })
                                : 'Recently'}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs px-2.5 py-1 rounded-full border border-rule bg-surface text-ink tabular-nums">
                          {activeJobsCount} {activeJobsCount === 1 ? 'role' : 'roles'}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-readable line-clamp-2 leading-relaxed">
                        {platform.description}
                      </p>

                      <div className="space-y-1.5 text-xs pt-2 border-t border-rule">
                        <div className="flex items-center justify-between">
                          <span className="text-secondary">Payout rails:</span>
                          <span className="text-ink font-medium">
                            {platform.payout_methods || 'Direct ACH / PayPal'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-secondary">Assessment style:</span>
                          <span className="text-readable truncate max-w-[200px]">
                            {platform.assessment_style || 'Domain testing'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-rule flex items-center justify-between gap-2">
                      <a
                        href={platform.official_url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1 text-xs text-secondary hover:text-ink transition-colors min-h-[44px]"
                      >
                        <span>Official site</span>
                        <ExternalLink size={12} />
                      </a>

                      <Link
                        href={`/platforms/${platform.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5A35C8] hover:underline px-2 py-1 rounded-lg min-h-[44px]"
                      >
                        <span>View full reality profile</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <RatesClient />
        </div>
      )}
    </div>
  );
}
