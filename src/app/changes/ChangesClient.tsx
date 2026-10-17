"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, Archive, Filter } from "lucide-react";
import { countryLabel, ALL_SUPPORTED_COUNTRIES } from "@/lib/utils/country";
import { SampleBadge } from "@/components/ui/SampleBadge";

export interface ChangeEntry {
  id: number;
  jobId: string | null;
  jobSlug: string;
  roleTitle: string;
  platformName: string;
  platformSlug: string;
  result: "verified" | "needs_recheck" | "closed";
  actionText: string;
  note: string;
  checkedBy: string;
  checkedAt: string;
  formattedDate: string;
  isSample: boolean;
  supportedCountries: string[];
}

interface ChangesClientProps {
  initialEntries: ChangeEntry[];
}

export function ChangesClient({ initialEntries }: ChangesClientProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("ALL");

  const filteredEntries = initialEntries.filter((item) => {
    if (selectedCountry === "ALL") return true;
    return item.supportedCountries.includes(selectedCountry);
  });

  return (
    <div className="space-y-6">
      {/* Country Filter Chips */}
      <div className="p-4 sm:p-5 rounded-xl border border-rule bg-sheet space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-secondary">
          <Filter size={14} className="text-[#5A35C8]" />
          <span>Filter verification events by country</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCountry("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer min-h-[44px] ${
              selectedCountry === "ALL"
                ? "bg-[#5A35C8] text-white shadow-sm"
                : "border border-rule bg-surface text-secondary hover:text-ink hover:border-[#5A35C8]"
            }`}
          >
            All countries
          </button>
          {ALL_SUPPORTED_COUNTRIES.filter((c) => c.code !== "WW").map((c) => {
            const isSelected = selectedCountry === c.code;
            return (
              <button
                key={c.code}
                type="button"
                onClick={() => setSelectedCountry(c.code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 min-h-[44px] ${
                  isSelected
                    ? "bg-[#5A35C8] text-white shadow-sm"
                    : "border border-rule bg-surface text-secondary hover:text-ink hover:border-[#5A35C8]"
                }`}
              >
                <span>{c.flag}</span>
                <span>{countryLabel(c.code, "short")}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Change Log Timeline */}
      <div className="rounded-xl border border-rule bg-sheet divide-y divide-rule overflow-hidden shadow-sm">
        {filteredEntries.length === 0 ? (
          <div className="p-8 sm:p-12 text-center text-secondary text-xs sm:text-sm space-y-2">
            <div className="font-semibold text-ink">
              {initialEntries.length === 0
                ? "No checks recorded yet."
                : "No checks recorded for this country yet."}
            </div>
            <p className="max-w-md mx-auto leading-relaxed">
              {initialEntries.length === 0
                ? "New checks will appear here with the checker's initials and verified findings."
                : "Try selecting another country filter or clear the filter to see all events."}
            </p>
          </div>
        ) : (
          filteredEntries.map((entry) => {
            const isVerified = entry.result === "verified";
            const isClosed = entry.result === "closed";

            const icon = isVerified ? (
              <CheckCircle2 size={16} className="text-[#17663F] shrink-0" />
            ) : isClosed ? (
              <Archive size={16} className="text-[#A8322A] shrink-0" />
            ) : (
              <Clock size={16} className="text-[#8A5300] shrink-0" />
            );

            return (
              <div
                key={entry.id}
                className="p-4 sm:p-5 hover:bg-surface/50 transition-colors space-y-2 text-xs sm:text-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {icon}
                    <span className="font-bold text-ink">
                      {entry.actionText}:{" "}
                      <Link
                        href={`/jobs/${entry.jobSlug}`}
                        className="hover:text-[#5A35C8] hover:underline"
                      >
                        {entry.roleTitle}
                      </Link>{" "}
                      at{" "}
                      <Link
                        href={`/platforms/${entry.platformSlug}`}
                        className="hover:text-[#5A35C8] hover:underline"
                      >
                        {entry.platformName}
                      </Link>
                    </span>
                    {entry.isSample && <SampleBadge />}
                  </div>

                  <div className="flex items-center gap-2 text-secondary font-mono text-xs tabular-nums">
                    {entry.checkedBy && (
                      <span className="px-1.5 py-0.5 rounded bg-surface border border-rule text-[11px] text-ink font-semibold">
                        Checked by {entry.checkedBy}
                      </span>
                    )}
                    <span>{entry.formattedDate}</span>
                  </div>
                </div>

                <p className="text-readable text-xs pl-6 leading-relaxed">
                  {entry.note}
                </p>

                {entry.supportedCountries.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pl-6 pt-1 text-[11px] text-secondary">
                    <span>Applicable:</span>
                    {entry.supportedCountries.map((cc) => (
                      <span
                        key={cc}
                        className="px-1.5 py-0.2 rounded bg-surface border border-rule font-mono font-medium"
                      >
                        {cc}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
