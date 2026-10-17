"use client";

import React, { useState, useMemo, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, X, RotateCcw, SlidersHorizontal, Globe, ArrowUpDown, Clock } from "lucide-react";
import { JobWithPlatform, Country } from "@/lib/db/types";
import { JobCard } from "@/components/ui/JobCard";
import { FilterBar, FilterState, DEFAULT_FILTER_STATE, FilterOption } from "@/components/ui/FilterBar";
import { EmailCapture } from "@/components/ui/EmailCapture";
import { COUNTRY_STORAGE_KEY, SUPPORTED_COUNTRIES } from "@/components/ui/CountrySelector";
import { WhatsAppAlertBanner } from "@/components/home/WhatsAppAlertBanner";

interface JobsExplorerProps {
  initialJobs: JobWithPlatform[];
  countries: Country[];
  rechecksPausedUntil?: string | null;
}

const ITEMS_PER_PAGE = 6;

export function JobsExplorer({ initialJobs, countries, rechecksPausedUntil }: JobsExplorerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Read initial country from localStorage or searchParams
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>(() => {
    const urlCountry = searchParams.get("country");
    if (urlCountry) return urlCountry.toUpperCase();
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem(COUNTRY_STORAGE_KEY) || "NG";
      } catch {
        return "NG";
      }
    }
    return "NG";
  });

  // Search input state
  const [query, setQuery] = useState(searchParams.get("q") || "");

  // Sort state
  const [sort, setSort] = useState<"newest" | "freshness" | "pay">(
    (searchParams.get("sort") as "newest" | "freshness" | "pay") || "newest"
  );

  // Pagination state
  const [visibleCount, setVisibleCount] = useState<number>(() => {
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    return Math.max(1, pageParam) * ITEMS_PER_PAGE;
  });

  const [showEmailAlert, setShowEmailAlert] = useState(false);

  // Filter state
  const [filters, setFilters] = useState<FilterState>(() => {
    const wt = searchParams.get("workTypes");
    const dm = searchParams.get("domains");
    const fr = searchParams.get("freshness");
    const st = searchParams.get("status");
    const unc = searchParams.get("includeUnconfirmed") === "true";

    return {
      workTypes: wt ? wt.split(",") : [],
      domains: dm ? dm.split(",") : [],
      payBasis: [],
      freshness: fr || "any",
      status: st || "verified",
      includeUnconfirmed: unc,
    };
  });

  // Listen for global country changes from the header CountrySelector
  useEffect(() => {
    const handleCountryChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setSelectedCountryCode(customEvent.detail);
      } else {
        const stored = localStorage.getItem(COUNTRY_STORAGE_KEY);
        if (stored) setSelectedCountryCode(stored);
      }
    };

    window.addEventListener("countrychange", handleCountryChange);
    window.addEventListener("storage", handleCountryChange);
    return () => {
      window.removeEventListener("countrychange", handleCountryChange);
      window.removeEventListener("storage", handleCountryChange);
    };
  }, []);

  // Update document cookie whenever country changes so SSR/edge routes read it
  useEffect(() => {
    try {
      document.cookie = `countersign_country=${selectedCountryCode}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore in non-standard environments
    }
  }, [selectedCountryCode]);

  // Sync state with URL search params
  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (selectedCountryCode && selectedCountryCode !== "NG") {
      params.set("country", selectedCountryCode);
    }
    if (filters.workTypes.length > 0) {
      params.set("workTypes", filters.workTypes.join(","));
    }
    if (filters.domains.length > 0) {
      params.set("domains", filters.domains.join(","));
    }
    if (filters.freshness !== "any") {
      params.set("freshness", filters.freshness);
    }
    if (filters.status !== "verified") {
      params.set("status", filters.status);
    }
    if (filters.includeUnconfirmed) {
      params.set("includeUnconfirmed", "true");
    }
    if (sort !== "newest") {
      params.set("sort", sort);
    }
    const pageNum = Math.ceil(visibleCount / ITEMS_PER_PAGE);
    if (pageNum > 1) {
      params.set("page", String(pageNum));
    }

    const currentUrl = `?${params.toString()}`;
    const windowUrl = window.location.search;
    if (currentUrl !== windowUrl) {
      startTransition(() => {
        router.replace(params.toString() ? `/jobs?${params.toString()}` : "/jobs", {
          scroll: false,
        });
      });
    }
  }, [query, selectedCountryCode, filters, sort, visibleCount, router]);

  // Country metadata
  const currentCountryName = useMemo(() => {
    const match = SUPPORTED_COUNTRIES.find((c) => c.code === selectedCountryCode);
    if (match) return match.name;
    const fromList = countries.find((c) => c.code === selectedCountryCode);
    return fromList?.name || selectedCountryCode;
  }, [selectedCountryCode, countries]);

  // Dynamic filter option counts based on the country-filtered pool
  const { workTypeOptions, domainOptions, freshnessOptions } = useMemo(() => {
    const wtCounts: Record<string, number> = {
      evaluation: 0,
      annotation: 0,
      coding: 0,
      writing: 0,
      domain_expert: 0,
      search_rating: 0,
    };

    const dmCounts: Record<string, number> = {
      general: 0,
      coding: 0,
      stem: 0,
      medicine: 0,
      law: 0,
    };

    let f7 = 0;
    let f14 = 0;
    let fAny = 0;

    initialJobs.forEach((job) => {
      // Check country eligibility first
      if (selectedCountryCode !== "ALL" && selectedCountryCode !== "GLOBAL") {
        const elig = job.eligibility.find((e) => e.country_code === selectedCountryCode);
        const isEligible =
          elig?.status === "accepted" ||
          (filters.includeUnconfirmed && elig?.status === "unconfirmed");
        if (!isEligible) return;
      }

      // Work type count
      const jwt = job.work_type.toLowerCase();
      if (jwt.includes("eval")) wtCounts.evaluation = (wtCounts.evaluation || 0) + 1;
      if (jwt.includes("annotat") || jwt.includes("rlhf")) wtCounts.annotation = (wtCounts.annotation || 0) + 1;
      if (jwt.includes("code") || jwt.includes("benchmark")) wtCounts.coding = (wtCounts.coding || 0) + 1;
      if (jwt.includes("writ")) wtCounts.writing = (wtCounts.writing || 0) + 1;
      if (jwt.includes("domain") || jwt.includes("specialist")) wtCounts.domain_expert = (wtCounts.domain_expert || 0) + 1;
      if (jwt.includes("search") || jwt.includes("rating")) wtCounts.search_rating = (wtCounts.search_rating || 0) + 1;

      // Domain count
      const jdm = job.domains.map((d) => d.toLowerCase());
      if (jdm.some((d) => d.includes("general") || d.includes("fact"))) dmCounts.general = (dmCounts.general || 0) + 1;
      if (jdm.some((d) => d.includes("python") || d.includes("code") || d.includes("software"))) dmCounts.coding = (dmCounts.coding || 0) + 1;
      if (jdm.some((d) => d.includes("math") || d.includes("physic") || d.includes("stem"))) dmCounts.stem = (dmCounts.stem || 0) + 1;
      if (jdm.some((d) => d.includes("medic") || d.includes("clinical") || d.includes("bio"))) dmCounts.medicine = (dmCounts.medicine || 0) + 1;
      if (jdm.some((d) => d.includes("law") || d.includes("legal") || d.includes("compliance"))) dmCounts.law = (dmCounts.law || 0) + 1;

      // Freshness count
      const days = job.daysAgo ?? 0;
      if (days <= 7) f7++;
      if (days <= 14) f14++;
      fAny++;
    });

    const wtOpts: FilterOption[] = [
      { id: "evaluation", label: "Model Evaluation", count: wtCounts.evaluation || 0 },
      { id: "annotation", label: "RLHF & Annotation", count: wtCounts.annotation || 0 },
      { id: "coding", label: "Code Reasoning", count: wtCounts.coding || 0 },
      { id: "writing", label: "Creative & Technical Writing", count: wtCounts.writing || 0 },
      { id: "domain_expert", label: "Domain Specialist", count: wtCounts.domain_expert || 0 },
      { id: "search_rating", label: "Search & Multimodal Rating", count: wtCounts.search_rating || 0 },
    ];

    const dmOpts: FilterOption[] = [
      { id: "general", label: "General Knowledge", count: dmCounts.general || 0 },
      { id: "coding", label: "Software & Python", count: dmCounts.coding || 0 },
      { id: "stem", label: "Mathematics & Physics", count: dmCounts.stem || 0 },
      { id: "medicine", label: "Medicine & Healthcare", count: dmCounts.medicine || 0 },
      { id: "law", label: "Legal & Compliance", count: dmCounts.law || 0 },
    ];

    const frOpts: FilterOption[] = [
      { id: "7", label: "Within 7 days (Fresh)", count: f7 },
      { id: "14", label: "Within 14 days", count: f14 },
      { id: "any", label: "Any checked date", count: fAny },
    ];

    return { workTypeOptions: wtOpts, domainOptions: dmOpts, freshnessOptions: frOpts };
  }, [initialJobs, selectedCountryCode, filters.includeUnconfirmed]);

  // Compute filtered jobs list
  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      // 1. Status Filter
      if (filters.status && filters.status !== "all") {
        if (job.status !== filters.status) return false;
      } else {
        // Default: active roles (verified and needs_recheck)
        if (job.status === "closed") return false;
      }

      // 2. Country Eligibility Filter
      if (selectedCountryCode !== "ALL" && selectedCountryCode !== "GLOBAL") {
        const elig = job.eligibility.find((e) => e.country_code === selectedCountryCode);
        if (!elig) {
          if (!filters.includeUnconfirmed) return false;
        } else if (elig.status === "not_accepted") {
          return false;
        } else if (elig.status === "unconfirmed" && !filters.includeUnconfirmed) {
          return false;
        }
      }

      // 3. Work Type Filter
      if (filters.workTypes.length > 0) {
        const jwt = job.work_type.toLowerCase();
        const matches = filters.workTypes.some((t) => {
          if (t === "evaluation") return jwt.includes("eval");
          if (t === "annotation") return jwt.includes("annotat") || jwt.includes("rlhf");
          if (t === "coding") return jwt.includes("code") || jwt.includes("benchmark");
          if (t === "writing") return jwt.includes("writ");
          if (t === "domain_expert") return jwt.includes("domain") || jwt.includes("specialist");
          if (t === "search_rating") return jwt.includes("search") || jwt.includes("rating");
          return jwt.includes(t);
        });
        if (!matches) return false;
      }

      // 4. Domain Filter
      if (filters.domains.length > 0) {
        const jdm = job.domains.map((d) => d.toLowerCase());
        const matches = filters.domains.some((d) => {
          if (d === "general") return jdm.some((x) => x.includes("general") || x.includes("fact"));
          if (d === "coding") return jdm.some((x) => x.includes("python") || x.includes("code") || x.includes("software"));
          if (d === "stem") return jdm.some((x) => x.includes("math") || x.includes("physic") || x.includes("stem"));
          if (d === "medicine") return jdm.some((x) => x.includes("medic") || x.includes("clinical") || x.includes("bio"));
          if (d === "law") return jdm.some((x) => x.includes("law") || x.includes("legal") || x.includes("compliance"));
          return jdm.some((x) => x.includes(d));
        });
        if (!matches) return false;
      }

      // 5. Freshness Filter
      if (filters.freshness !== "any") {
        const maxDays = parseInt(filters.freshness, 10);
        if (!isNaN(maxDays) && (job.daysAgo ?? 0) > maxDays) {
          return false;
        }
      }

      // 6. Search Query Filter
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const inTitle = job.title.toLowerCase().includes(q);
        const inPlatform = job.platform.name.toLowerCase().includes(q);
        const inWorkType = job.work_type.toLowerCase().includes(q);
        const inSummary = job.summary.toLowerCase().includes(q);
        const inDomains = job.domains.some((d) => d.toLowerCase().includes(q));
        const inLanguages = job.languages.some((l) => l.toLowerCase().includes(q));

        if (!inTitle && !inPlatform && !inWorkType && !inSummary && !inDomains && !inLanguages) {
          return false;
        }
      }

      return true;
    });
  }, [initialJobs, selectedCountryCode, filters, query]);

  // Sort filtered jobs
  const sortedJobs = useMemo(() => {
    const list = [...filteredJobs];
    if (sort === "freshness") {
      return list.sort((a, b) => (a.daysAgo ?? 0) - (b.daysAgo ?? 0));
    }
    if (sort === "pay") {
      return list.sort((a, b) => {
        const aPay = a.pay_verified ? 1 : 0;
        const bPay = b.pay_verified ? 1 : 0;
        return bPay - aPay;
      });
    }
    // "newest" (default)
    return list.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [filteredJobs, sort]);

  // Visible sliced list
  const visibleJobs = useMemo(() => {
    return sortedJobs.slice(0, visibleCount);
  }, [sortedJobs, visibleCount]);

  const hasMore = visibleCount < sortedJobs.length;
  const remainingCount = Math.max(0, sortedJobs.length - visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  // Active filter chip helpers
  const activeChips = useMemo(() => {
    const chips: { id: string; label: string; onRemove: () => void }[] = [];

    // Country chip
    if (selectedCountryCode && selectedCountryCode !== "ALL" && selectedCountryCode !== "GLOBAL") {
      chips.push({
        id: `country-${selectedCountryCode}`,
        label: `Open to ${currentCountryName}`,
        onRemove: () => setSelectedCountryCode("ALL"),
      });
    }

    // Work types
    filters.workTypes.forEach((wt) => {
      const opt = workTypeOptions.find((o) => o.id === wt);
      chips.push({
        id: `wt-${wt}`,
        label: opt ? opt.label : wt,
        onRemove: () => {
          setFilters((f) => ({
            ...f,
            workTypes: f.workTypes.filter((x) => x !== wt),
          }));
        },
      });
    });

    // Domains
    filters.domains.forEach((dm) => {
      const opt = domainOptions.find((o) => o.id === dm);
      chips.push({
        id: `dm-${dm}`,
        label: opt ? opt.label : dm,
        onRemove: () => {
          setFilters((f) => ({
            ...f,
            domains: f.domains.filter((x) => x !== dm),
          }));
        },
      });
    });

    // Freshness
    if (filters.freshness !== "any") {
      chips.push({
        id: `fr-${filters.freshness}`,
        label: `Within ${filters.freshness} days`,
        onRemove: () => setFilters((f) => ({ ...f, freshness: "any" })),
      });
    }

    // Include unconfirmed
    if (filters.includeUnconfirmed) {
      chips.push({
        id: "unc",
        label: "Include unconfirmed",
        onRemove: () => setFilters((f) => ({ ...f, includeUnconfirmed: false })),
      });
    }

    return chips;
  }, [selectedCountryCode, currentCountryName, filters, workTypeOptions, domainOptions]);

  const clearAllFilters = () => {
    setQuery("");
    setFilters(DEFAULT_FILTER_STATE);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Page Header (Mobile first) */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink">
              Verified AI Work Hub
            </h1>
            <p className="text-sm text-secondary mt-1">
              Every role human-checked against official employer feeds within 14 days. Zero scraping.
            </p>
          </div>

          {/* Active Country Indicator & Change Prompt */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rule bg-sheet text-xs text-secondary shadow-sm">
            <Globe size={14} className="text-[#5A35C8]" aria-hidden="true" />
            <span className="text-readable">
              Open to <strong className="text-ink font-semibold">{currentCountryName}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Layout: 280px Desktop Sidebar + Results Area */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block sticky top-20 rounded-2xl border border-rule bg-sheet p-5 sm:p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-rule">
            <div className="flex items-center gap-2 text-xs font-semibold text-ink">
              <SlidersHorizontal size={14} className="text-[#5A35C8]" />
              <span>Filter Roles</span>
            </div>
            {activeChips.length > 0 && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs text-secondary hover:text-[#5A35C8] transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          <FilterBar
            filteredCount={sortedJobs.length}
            totalCount={initialJobs.length}
            filters={filters}
            onFilterChange={setFilters}
            isDesktopSidebar={true}
            workTypeOptions={workTypeOptions}
            domainOptions={domainOptions}
            freshnessOptions={freshnessOptions}
          />
        </aside>

        {/* Results Area */}
        <main className="space-y-4">
          {/* Rechecks Paused Calm Banner */}
          {rechecksPausedUntil && (
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-200 text-xs sm:text-sm flex items-start gap-3">
              <Clock size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="font-semibold text-ink">
                  Manual checks are paused until {rechecksPausedUntil}
                </div>
                <p className="text-xs text-secondary leading-relaxed">
                  We paused new checks while our review queue is caught up. Roles listed below were verified on the dates shown.
                </p>
              </div>
            </div>
          )}

          {/* Sticky Mobile Search Bar + Filter Trigger */}
          <div className="sticky top-16 z-30 w-full py-2.5 sm:py-0 bg-surface/90 sm:bg-transparent backdrop-blur sm:backdrop-blur-none border-b sm:border-b-0 border-rule flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
              {/* Search Input Bar */}
              <div className="relative flex-1 min-w-0">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by role, platform, skill (e.g. Python, STEM, RLHF)..."
                  aria-label="Search roles"
                  className="w-full pl-9 pr-9 py-2.5 min-h-[44px] text-xs sm:text-sm rounded-xl border border-rule bg-sheet text-ink placeholder:text-secondary/60 focus:outline-none focus:border-[#5A35C8] focus:ring-1 focus:ring-[#5A35C8] transition-all"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary hover:text-ink min-h-[44px] min-w-[44px] flex items-center justify-center p-1"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Controls Group: Filter Button + Sort Selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Mobile Filter Button (opens bottom sheet) */}
                <div className="lg:hidden flex-1 sm:flex-initial">
                  <FilterBar
                    filteredCount={sortedJobs.length}
                    totalCount={initialJobs.length}
                    filters={filters}
                    onFilterChange={setFilters}
                    isDesktopSidebar={false}
                    workTypeOptions={workTypeOptions}
                    domainOptions={domainOptions}
                    freshnessOptions={freshnessOptions}
                  />
                </div>

                {/* Sort Selector Dropdown */}
                <div className="relative flex-1 sm:flex-initial min-w-0">
                  <label htmlFor="job-sort-select" className="sr-only">
                    Sort roles
                  </label>
                  <div className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl border border-rule bg-sheet text-xs text-secondary hover:border-[#5A35C8] transition-colors shadow-sm w-full">
                    <ArrowUpDown size={13} className="text-secondary shrink-0" aria-hidden="true" />
                    <select
                      id="job-sort-select"
                      value={sort}
                      onChange={(e) => setSort(e.target.value as "newest" | "freshness" | "pay")}
                      className="bg-transparent text-ink text-xs focus:outline-none cursor-pointer w-full truncate"
                    >
                      <option value="newest" className="bg-sheet text-ink">
                        Newest
                      </option>
                      <option value="freshness" className="bg-sheet text-ink">
                        Recently checked
                      </option>
                      <option value="pay" className="bg-sheet text-ink">
                        Verified pay first
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Applied Filter Chips Row */}
            {activeChips.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {activeChips.map((chip) => (
                  <span
                    key={chip.id}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border border-rule bg-surface text-ink"
                  >
                    <span>{chip.label}</span>
                    <button
                      type="button"
                      onClick={chip.onRemove}
                      aria-label={`Remove filter ${chip.label}`}
                      className="hover:text-[#5A35C8] text-secondary p-0.5"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs text-secondary hover:text-[#5A35C8] transition-colors"
                >
                  <RotateCcw size={11} />
                  <span>Clear all</span>
                </button>
              </div>
            )}
          </div>

          {/* Calm low-count note when 1 to 10 roles */}
          {sortedJobs.length >= 1 && sortedJobs.length <= 10 && (
            <div className="p-3.5 rounded-xl border border-rule bg-sheet text-xs text-secondary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>
                We only show roles where human checks passed. Right now that means {sortedJobs.length} verified {sortedJobs.length === 1 ? 'role' : 'roles'}.
              </span>
            </div>
          )}

          {/* Result Count Status Bar */}
          <div className="flex items-center justify-between text-xs text-secondary pt-1">
            <span>
              Showing <strong className="text-ink font-semibold tabular-nums">{visibleJobs.length}</strong> of{" "}
              <strong className="text-ink font-semibold tabular-nums">{sortedJobs.length}</strong> roles
            </span>
            {selectedCountryCode !== "ALL" && (
              <span className="text-[11px] text-secondary">
                Open to <span className="text-ink font-medium">{currentCountryName}</span>
              </span>
            )}
          </div>

          {/* Cards List or Empty State */}
          {sortedJobs.length === 0 ? (
            <div className="p-8 sm:p-12 rounded-xl border border-rule bg-sheet text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full border border-rule bg-surface flex items-center justify-center text-secondary">
                <Search size={22} />
              </div>
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-ink">
                  {activeChips.length > 0 || query.trim()
                    ? "No roles match your search."
                    : "No verified roles right now."}
                </h2>
                <p className="text-xs text-secondary max-w-md mx-auto leading-relaxed">
                  {activeChips.length > 0 || query.trim()
                    ? "Try clearing your filters or sign up below to get an email when a role appears."
                    : "We only list work we have independently checked. Sign up below to get an email when we verify the next role."}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {(activeChips.length > 0 || query.trim()) && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="px-4 py-2.5 rounded-xl border border-rule bg-surface text-ink hover:border-[#5A35C8] text-xs font-medium min-h-[44px] transition-colors"
                  >
                    Clear filters
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowEmailAlert(!showEmailAlert)}
                  className="px-4 py-2.5 rounded-xl bg-[#5A35C8] text-white hover:bg-[#4927AB] text-xs font-medium min-h-[44px] transition-colors"
                >
                  Email me when one appears
                </button>
                <Link
                  href="/contact"
                  className="px-4 py-2.5 rounded-xl border border-rule bg-surface text-secondary hover:text-ink hover:border-[#5A35C8] text-xs font-medium min-h-[44px] inline-flex items-center transition-colors"
                >
                  Tell us about a platform to check
                </Link>
              </div>

              {showEmailAlert && (
                <div className="max-w-md mx-auto pt-4 text-left">
                  <EmailCapture
                    title="Role alert"
                    description={`Get an email when new roles open to ${currentCountryName} are confirmed.`}
                    source="jobs_empty_state"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {visibleJobs.map((job) => {
                // Determine country eligibility status for the selected country
                let countryEligibility: "accepted" | "not-accepted" | "unconfirmed" = "unconfirmed";
                if (selectedCountryCode !== "ALL" && selectedCountryCode !== "GLOBAL") {
                  const match = job.eligibility.find((e) => e.country_code === selectedCountryCode);
                  if (match) {
                    if (match.status === "accepted") countryEligibility = "accepted";
                    else if (match.status === "not_accepted") countryEligibility = "not-accepted";
                    else countryEligibility = "unconfirmed";
                  }
                } else {
                  countryEligibility = "accepted";
                }

                return (
                  <JobCard
                    key={job.id}
                    id={job.id}
                    slug={job.slug}
                    title={job.title}
                    platform={job.platform.name}
                    workType={job.work_type}
                    countryEligibility={countryEligibility}
                    countryName={currentCountryName}
                    verifiedPay={job.pay_verified ? job.pay_text || undefined : undefined}
                    daysAgo={job.daysAgo ?? 0}
                    status={job.status}
                    isClosed={job.status === "closed"}
                    linkType={job.link}
                    isManaged={Boolean((job as unknown as { is_managed?: boolean }).is_managed)}
                  />
                );
              })}

              {/* Load More Button with remaining count */}
              {hasMore && (
                <div className="pt-4 text-center">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl border border-rule bg-sheet hover:bg-surface text-ink text-xs font-medium transition-colors min-h-[44px]"
                  >
                    Load more (<span className="tabular-nums">{remainingCount}</span> left)
                  </button>
                </div>
              )}

              {/* WhatsApp Broadcast Channel Banner */}
              <div className="pt-6">
                <WhatsAppAlertBanner />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
