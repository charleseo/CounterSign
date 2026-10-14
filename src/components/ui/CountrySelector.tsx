"use client";

import React, { useState, useId } from "react";
import { Globe, Search, Check, ChevronDown, X } from "lucide-react";

export interface CountryOption {
  code: string;
  name: string;
  flag: string;
  verifiedCount?: number;
}

export const SUPPORTED_COUNTRIES: CountryOption[] = [
  { code: "NG", name: "Nigeria", flag: "🇳🇬", verifiedCount: 14 },
  { code: "GH", name: "Ghana", flag: "🇬🇭", verifiedCount: 8 },
  { code: "KE", name: "Kenya", flag: "🇰🇪", verifiedCount: 11 },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", verifiedCount: 9 },
  { code: "IN", name: "India", flag: "🇮🇳", verifiedCount: 18 },
  { code: "PH", name: "Philippines", flag: "🇵🇭", verifiedCount: 12 },
  { code: "PK", name: "Pakistan", flag: "🇵🇰", verifiedCount: 7 },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩", verifiedCount: 6 },
  { code: "US", name: "United States", flag: "🇺🇸", verifiedCount: 22 },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", verifiedCount: 16 },
  { code: "CA", name: "Canada", flag: "🇨🇦", verifiedCount: 15 },
  { code: "GLOBAL", name: "Worldwide (Anywhere)", flag: "🌐", verifiedCount: 20 },
];

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
  if (typeof window === "undefined") return "NG";
  try {
    return localStorage.getItem(COUNTRY_STORAGE_KEY) || "NG";
  } catch {
    return "NG";
  }
}

function getServerCountrySnapshot(): string {
  return "NG";
}

export interface CountrySelectorProps {
  className?: string;
  onCountryChange?: (country: CountryOption) => void;
}

/**
 * CountryChip & CountrySelector (Section 10.3 & 10.11)
 * Permanent country selector remembered in browser localStorage.
 * Personalizes eligibility badges, counts, and search defaults.
 */
export function CountrySelector({ className = "", onCountryChange }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCode = React.useSyncExternalStore(
    subscribeCountry,
    getCountrySnapshot,
    getServerCountrySnapshot
  );
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputId = useId();

  const selectedCountry =
    SUPPORTED_COUNTRIES.find((c) => c.code === selectedCode) || SUPPORTED_COUNTRIES[0];

  const handleSelect = (country: CountryOption) => {
    try {
      localStorage.setItem(COUNTRY_STORAGE_KEY, country.code);
      window.dispatchEvent(new CustomEvent("countrychange", { detail: country.code }));
    } catch {
      // Ignore storage errors
    }
    setIsOpen(false);
    setSearchQuery("");
    if (onCountryChange) {
      onCountryChange(country);
    }
  };

  const filteredCountries = SUPPORTED_COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Header Chip Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded border border-subtle bg-surface text-primary hover:border-focus transition-colors"
        title={`Country set to ${selectedCountry.name}. Click to change.`}
      >
        <span className="text-sm" aria-hidden="true">{selectedCountry.flag}</span>
        <span>{selectedCountry.code}</span>
        <ChevronDown size={12} className="text-secondary" aria-hidden="true" />
      </button>

      {/* Dropdown / Modal Sheet */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Select country for eligibility"
          className="absolute right-0 sm:left-0 sm:right-auto mt-2 z-50 w-72 sm:w-80 rounded-xl border border-subtle bg-surface shadow-2xl p-3.5 space-y-3"
        >
          <div className="flex items-center justify-between pb-2 border-b border-subtle">
            <div className="flex items-center gap-2">
              <Globe size={15} className="text-accent-cyan" aria-hidden="true" />
              <span className="font-semibold text-sm text-primary">Your Country</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-secondary hover:text-primary transition-colors"
              aria-label="Close country selector"
            >
              <X size={15} aria-hidden="true" />
            </button>
          </div>

          <div className="relative">
            <label htmlFor={searchInputId} className="sr-only">
              Search country or code
            </label>
            <Search
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
              aria-hidden="true"
            />
            <input
              id={searchInputId}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country or code..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-void border border-subtle rounded text-primary placeholder:text-secondary focus:outline-none focus:border-focus"
              autoFocus
            />
          </div>

          <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => {
                const isSelected = c.code === selectedCountry.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleSelect(c)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-colors ${
                      isSelected
                        ? "bg-accent-cyan/15 text-accent-cyan font-medium"
                        : "text-readable hover:bg-elevated hover:text-primary"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base" aria-hidden="true">{c.flag}</span>
                      <span>{c.name}</span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[11px] text-secondary">
                      {c.verifiedCount && (
                        <span>{c.verifiedCount} roles</span>
                      )}
                      {isSelected && <Check size={14} className="text-accent-cyan" aria-hidden="true" />}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-3 text-center text-xs text-secondary font-mono">
                No matching countries found.
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-subtle text-[11px] text-secondary leading-tight">
            Remembered on this device. No account required.
          </div>
        </div>
      )}
    </div>
  );
}
