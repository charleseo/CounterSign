"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cleanRoleTitle, cleanOrgName, isSampleRole, getRoleStatus } from "@/lib/utils/roleStatus";
import { COUNTRY_STORAGE_KEY } from "@/components/ui/CountrySelector";
import { countryLabel } from "@/lib/utils/country";

export interface LedgerRoleItem {
  id: string;
  slug: string;
  title: string;
  platformName: string;
  ngStatus: string;
  ngTone: "accepted" | "unconfirmed" | "not_accepted" | "recheck" | "sample" | "due" | "not";
  payText: string;
  hasPayStated: boolean;
  checkedText: string;
  isDue: boolean;
  isSample?: boolean;
  eligibility?: Array<{ country_code: string; status: string }>;
}

export interface LedgerSectionProps {
  roles: LedgerRoleItem[];
  totalCount: number;
}

export function LedgerSection({ roles }: LedgerSectionProps) {
  const [filter, setFilter] = useState<"all" | "open" | "pay">("all");
  const [countryCode, setCountryCode] = useState("WW");

  useEffect(() => {
    const updateCountry = () => {
      try {
        const code = localStorage.getItem(COUNTRY_STORAGE_KEY) || "WW";
        setCountryCode(code);
      } catch {
        // Fallback
      }
    };
    updateCountry();
    window.addEventListener("countrychange", updateCountry);
    window.addEventListener("storage", updateCountry);
    return () => {
      window.removeEventListener("countrychange", updateCountry);
      window.removeEventListener("storage", updateCountry);
    };
  }, []);

  const displayName = countryLabel(countryCode, "name");
  const articleName = countryLabel(countryCode, "withArticle");

  const filterOptions = [
    { id: "all" as const, label: "All" },
    {
      id: "open" as const,
      label: countryCode === "WW" ? "Open to all" : `Open to ${articleName}`,
    },
    { id: "pay" as const, label: "Pay stated" },
  ];

  const filteredRoles = roles.filter((r) => {
    const statusInfo = getRoleStatus(r, countryCode);
    if (filter === "open") return statusInfo.tone === "accepted";
    if (filter === "pay") return r.hasPayStated;
    return true;
  });

  return (
    <section id="roles" aria-labelledby="roles-h" className="w-full bg-sheet border-y border-rule transition-colors">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-14 sm:py-20">
        {/* Header & Filter Chips */}
        <div className="flex flex-wrap justify-between items-end gap-6 pb-6">
          <div>
            <h2 id="roles-h" className="text-3xl sm:text-5xl font-extrabold tracking-tight m-0 text-ink font-sans">
              Recently checked
            </h2>
            <p className="mt-2 text-base sm:text-lg text-secondary m-0">
              Showing roles for {displayName}. Sample entries until launch.
            </p>
          </div>

          {/* Filter Chips with aria-pressed */}
          <div role="group" aria-label="Filter verified roles" className="flex flex-wrap gap-2">
            {filterOptions.map((opt) => {
              const isActive = filter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setFilter(opt.id)}
                  className={`cs-chip min-h-[44px] px-4 sm:px-5 text-sm sm:text-base font-semibold rounded-full border cursor-pointer select-none transition-colors ${
                    isActive
                      ? "bg-ink text-white border-ink"
                      : "bg-sheet text-ink border-rule hover:border-ink/50"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Ledger Table */}
        <div role="table" aria-label="Recently checked AI roles" className="mt-4 text-base sm:text-lg">
          {/* Table Header: Hidden under 768px (md), Schibsted Grotesk sentence case on desktop */}
          <div
            role="row"
            className="hidden md:grid cs-row cs-head px-4 py-3 border-b-2 border-ink text-sm sm:text-base font-semibold text-secondary font-sans normal-case"
          >
            <span role="columnheader">Role</span>
            <span role="columnheader">{countryCode === "WW" ? "Location" : `From ${displayName}`}</span>
            <span role="columnheader">Pay</span>
            <span role="columnheader">Checked</span>
          </div>

          {/* Rows with Dividers */}
          {filteredRoles.map((role) => {
            const isSample = role.isSample ?? isSampleRole(role);
            const cleanTitle = cleanRoleTitle(role.title);
            const cleanOrg = cleanOrgName(role.platformName);
            const statusInfo = getRoleStatus(role, countryCode);

            return (
              <Link
                key={role.id}
                role="row"
                href={`/jobs/${role.slug}`}
                className="cs-row cs-row-link block px-4 py-4 sm:py-5 border-b border-subtle text-ink no-underline focus-visible:outline-offset-2"
              >
                {/* Mobile Stacked Record Row */}
                <div className="sm:hidden space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-base text-ink line-clamp-2">
                      {cleanTitle}
                    </span>
                    {isSample && (
                      <span className="shrink-0 whitespace-nowrap text-[10px] font-semibold text-secondary bg-subtle border border-rule px-1.5 py-0.5 rounded">
                        Sample entry
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-secondary">{cleanOrg}</div>
                  <div className="flex items-center justify-between text-xs text-secondary pt-1.5 border-t border-subtle/60">
                    <span className={`font-semibold ${statusInfo.colorClass}`}>
                      {statusInfo.label}
                    </span>
                    <span className="tabular-nums font-medium text-ink">{role.payText}</span>
                    <span className={`tabular-nums ${role.isDue ? "font-bold text-[var(--status-recheck)]" : "text-secondary"}`}>
                      {role.checkedText}
                    </span>
                  </div>
                </div>

                {/* Desktop 4-Column Table Row */}
                <div className="hidden sm:contents">
                  <span role="cell" className="min-w-0 pr-4">
                    <span className="flex items-center gap-2 font-bold text-base sm:text-lg text-ink">
                      <span className="min-w-0">{cleanTitle}</span>
                      {isSample && (
                        <span className="shrink-0 whitespace-nowrap text-[10px] font-semibold text-secondary bg-subtle border border-rule px-1.5 py-0.5 rounded">
                          Sample entry
                        </span>
                      )}
                    </span>
                    <span className="block text-sm text-secondary">
                      {cleanOrg}
                    </span>
                  </span>

                  <span role="cell" className={`font-semibold text-sm sm:text-base ${statusInfo.colorClass}`}>
                    {statusInfo.label}
                  </span>

                  <span role="cell" className="text-sm sm:text-base text-secondary tabular-nums">
                    {role.payText}
                  </span>

                  <span role="cell" className="flex items-center justify-between gap-2 text-sm sm:text-base">
                    <span className={`tabular-nums ${role.isDue ? "font-bold text-[var(--status-recheck)]" : "text-secondary"}`}>
                      {role.checkedText}
                    </span>

                    <svg
                      className="cs-mini text-[var(--brand-ink)] shrink-0"
                      width="28"
                      height="28"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <circle cx="16" cy="16" r="13.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
                      <path d="M10.5 16.4l3.6 3.6 7-7.4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}

          {filteredRoles.length === 0 && (
            <div className="py-12 px-4 text-center border-b border-subtle space-y-3">
              <p className="text-base text-secondary m-0">No roles match.</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className="min-h-[44px] px-4 py-2 text-sm font-semibold rounded-lg bg-sheet border border-rule text-ink hover:bg-elevated transition-colors cursor-pointer"
                >
                  Clear filter
                </button>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent("countersign:open-alert-modal"))}
                  className="min-h-[44px] px-4 py-2 text-sm font-semibold rounded-lg bg-[var(--brand-ink)] text-white hover:opacity-95 transition-opacity cursor-pointer"
                >
                  Email me when one appears
                </button>
              </div>
            </div>
          )}
        </div>

        {/* View All Roles Link (≥44px tap target) */}
        <div className="mt-8 flex">
          <Link
            href="/jobs"
            className="inline-flex items-center min-h-[44px] py-2 text-base sm:text-lg font-bold text-ink hover:text-[var(--brand-ink)] underline underline-offset-4 decoration-rule hover:decoration-[var(--brand-ink)] transition-colors"
          >
            See all roles
          </Link>
        </div>
      </div>
    </section>
  );
}
