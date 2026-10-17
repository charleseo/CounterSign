"use client";

import React, { useState, useId } from "react";
import { Globe, Search, Check, ChevronDown, X } from "lucide-react";
import {
  ALL_SUPPORTED_COUNTRIES,
  POPULAR_COUNTRIES,
  AFRICA_COUNTRIES,
  ASIA_COUNTRIES,
  COUNTRIES,
  CountryMeta,
} from "@/lib/utils/country";

export interface CountryOption {
  code: string;
  name: string;
  flag: string;
  verifiedCount?: number;
}

export const SUPPORTED_COUNTRIES: CountryOption[] = ALL_SUPPORTED_COUNTRIES.map((c) => ({
  code: c.code,
  name: c.name,
  flag: c.flag,
}));

export const COUNTRY_STORAGE_KEY = "countersign_country";

function subscribeCountry(callback: () => void) {
  window.addEventListener("countrychange", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("countrychange", callback);
    window.removeEventListener("storage", callback);
  };
}

function getCountrySnapshot(): string {
  if (typeof window === "undefined") return "WW";
  try {
    const params = new URLSearchParams(window.location.search);
    let qCountry = params.get("country");
    if (qCountry) {
      qCountry = qCountry.toUpperCase();
      if (qCountry === "UK") qCountry = "GB";
      if (COUNTRIES[qCountry]) {
        return qCountry;
      }
    }
    let stored = localStorage.getItem(COUNTRY_STORAGE_KEY);
    if (!stored) {
      const match = document.cookie.match(new RegExp(`(?:^|; )${COUNTRY_STORAGE_KEY}=([^;]*)`));
      if (match) stored = decodeURIComponent(match[1]);
    }
    if (stored) {
      stored = stored.toUpperCase();
      if (stored === "UK") stored = "GB";
      if (COUNTRIES[stored]) return stored;
    }
    return "WW";
  } catch {
    return "WW";
  }
}

function getServerCountrySnapshot(): string {
  return "WW";
}

export function useSelectedCountry(): string {
  return React.useSyncExternalStore(
    subscribeCountry,
    getCountrySnapshot,
    getServerCountrySnapshot
  );
}

export interface CountrySelectorProps {
  className?: string;
  compact?: boolean;
  onCountryChange?: (country: CountryOption) => void;
}

function persistCountryPreference(code: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(COUNTRY_STORAGE_KEY, code);
    document.cookie = `${COUNTRY_STORAGE_KEY}=${code};path=/;max-age=31536000;SameSite=Lax`;
    window.dispatchEvent(new CustomEvent("countrychange", { detail: code }));
  } catch {
    // Ignore storage errors
  }
}

export function CountrySelector({ className = "", compact = false, onCountryChange }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCode = React.useSyncExternalStore(
    subscribeCountry,
    getCountrySnapshot,
    getServerCountrySnapshot
  );
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputId = useId();

  const selectedMeta = COUNTRIES[selectedCode.toUpperCase()] || COUNTRIES["WW"];

  const handleSelect = (country: CountryMeta) => {
    persistCountryPreference(country.code);
    setIsOpen(false);
    setSearchQuery("");
    if (onCountryChange) {
      onCountryChange({
        code: country.code,
        name: country.name,
        flag: country.flag,
      });
    }
  };

  const query = searchQuery.trim().toLowerCase();
  const searchResults = query
    ? ALL_SUPPORTED_COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.code.toLowerCase().includes(query) ||
          c.withArticle.toLowerCase().includes(query)
      )
    : null;

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Header Chip Trigger (≥44px tap target) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={`Change country, currently ${selectedMeta.name}`}
        className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 sm:px-4 text-xs sm:text-sm font-semibold rounded-full border border-rule bg-sheet text-ink hover:border-ink/50 transition-colors shadow-xs cursor-pointer select-none"
        title={`Country set to ${selectedMeta.name}. Click to change.`}
      >
        <span className="text-sm" aria-hidden="true">{selectedMeta.flag}</span>
        <span className={compact ? "hidden xs:inline" : "inline"}>
          {selectedMeta.code === "WW" ? "Worldwide" : selectedMeta.short}
        </span>
        <ChevronDown size={14} className="text-secondary opacity-70" aria-hidden="true" />
      </button>

      {/* Dropdown / Modal Sheet */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Select country"
          className="absolute right-0 sm:left-0 sm:right-auto mt-2 z-50 w-72 sm:w-84 rounded-xl border border-rule bg-sheet shadow-2xl p-4 space-y-3"
        >
          <div className="flex items-center justify-between pb-2 border-b border-rule">
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-[#5A35C8]" aria-hidden="true" />
              <span className="font-semibold text-sm text-ink">Where do you work from?</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-secondary hover:text-ink rounded-lg hover:bg-surface transition-colors cursor-pointer"
              aria-label="Close country dialog"
            >
              <X size={16} />
            </button>
          </div>

          {/* Search Input with ≥44px height */}
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
              aria-hidden="true"
            />
            <input
              id={searchInputId}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country (e.g. US, UK, Canada)..."
              className="w-full pl-9 pr-3 min-h-[44px] text-xs sm:text-sm rounded-lg border border-rule bg-surface text-ink placeholder:text-muted focus:outline-none focus:border-[#5A35C8]"
              autoFocus
            />
          </div>

          {/* Country List */}
          <div className="max-h-72 overflow-y-auto space-y-3 pr-1 text-xs sm:text-sm" role="listbox">
            {searchResults ? (
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-secondary block px-2">
                  Search results ({searchResults.length})
                </span>
                {searchResults.map((c) => {
                  const isSelected = c.code === selectedMeta.code;
                  return (
                    <button
                      key={c.code}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(c)}
                      className={`w-full flex items-center justify-between px-3 min-h-[44px] rounded-lg text-left transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-violet-50 text-[#5A35C8] font-bold"
                          : "text-ink hover:bg-surface"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base" aria-hidden="true">{c.flag}</span>
                        <span>{c.name}</span>
                      </div>
                      {isSelected && (
                        <Check size={16} className="text-[#5A35C8] shrink-0" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <>
                {/* Pinned Current Country */}
                <div className="space-y-1 pb-2 border-b border-rule">
                  <span className="text-[11px] font-semibold text-secondary block px-2">
                    Current country
                  </span>
                  <div className="flex items-center justify-between px-3 min-h-[44px] rounded-lg bg-surface border border-rule">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base" aria-hidden="true">{selectedMeta.flag}</span>
                      <span className="font-semibold text-ink">{selectedMeta.name}</span>
                    </div>
                    <span className="text-[11px] font-medium text-secondary">Active</span>
                  </div>
                </div>

                {/* Most Popular Group */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-secondary block px-2">
                    Most popular
                  </span>
                  {POPULAR_COUNTRIES.map((c) => {
                    const isSelected = c.code === selectedMeta.code;
                    return (
                      <button
                        key={c.code}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelect(c)}
                        className={`w-full flex items-center justify-between px-3 min-h-[44px] rounded-lg text-left transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-violet-50 text-[#5A35C8] font-bold"
                            : "text-ink hover:bg-surface"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base" aria-hidden="true">{c.flag}</span>
                          <span>{c.name}</span>
                        </div>
                        {isSelected && (
                          <Check size={16} className="text-[#5A35C8] shrink-0" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Africa Group */}
                <div className="space-y-1 pt-1">
                  <span className="text-[11px] font-semibold text-secondary block px-2">
                    Africa
                  </span>
                  {AFRICA_COUNTRIES.map((c) => {
                    const isSelected = c.code === selectedMeta.code;
                    return (
                      <button
                        key={c.code}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelect(c)}
                        className={`w-full flex items-center justify-between px-3 min-h-[44px] rounded-lg text-left transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-violet-50 text-[#5A35C8] font-bold"
                            : "text-ink hover:bg-surface"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base" aria-hidden="true">{c.flag}</span>
                          <span>{c.name}</span>
                        </div>
                        {isSelected && (
                          <Check size={16} className="text-[#5A35C8] shrink-0" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Asia Group */}
                <div className="space-y-1 pt-1">
                  <span className="text-[11px] font-semibold text-secondary block px-2">
                    Asia
                  </span>
                  {ASIA_COUNTRIES.map((c) => {
                    const isSelected = c.code === selectedMeta.code;
                    return (
                      <button
                        key={c.code}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelect(c)}
                        className={`w-full flex items-center justify-between px-3 min-h-[44px] rounded-lg text-left transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-violet-50 text-[#5A35C8] font-bold"
                            : "text-ink hover:bg-surface"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base" aria-hidden="true">{c.flag}</span>
                          <span>{c.name}</span>
                        </div>
                        {isSelected && (
                          <Check size={16} className="text-[#5A35C8] shrink-0" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Global Option */}
                <div className="space-y-1 pt-1 border-t border-rule">
                  <button
                    type="button"
                    role="option"
                    aria-selected={selectedMeta.code === "WW"}
                    onClick={() => handleSelect(COUNTRIES["WW"])}
                    className={`w-full flex items-center justify-between px-3 min-h-[44px] rounded-lg text-left transition-colors cursor-pointer ${
                      selectedMeta.code === "WW"
                        ? "bg-violet-50 text-[#5A35C8] font-bold"
                        : "text-ink hover:bg-surface"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base" aria-hidden="true">🌐</span>
                      <span>Worldwide (All countries)</span>
                    </div>
                    {selectedMeta.code === "WW" && (
                      <Check size={16} className="text-[#5A35C8] shrink-0" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="pt-2 border-t border-rule text-[11px] text-secondary text-center">
            We show roles you can apply for from where you live.
          </div>
        </div>
      )}
    </div>
  );
}
