"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { countryLabel, getCountryMeta } from "@/lib/utils/country";
import { COUNTRY_STORAGE_KEY } from "@/components/ui/CountrySelector";

interface HeroCallToActionProps {
  initialCountryCode?: string;
}

export function HeroCallToAction({ initialCountryCode = "WW" }: HeroCallToActionProps) {
  const [countryCode, setCountryCode] = useState(initialCountryCode);

  useEffect(() => {
    const updateCountry = () => {
      try {
        const stored = localStorage.getItem(COUNTRY_STORAGE_KEY);
        if (stored) {
          setCountryCode(stored);
        } else if (initialCountryCode) {
          setCountryCode(initialCountryCode);
        }
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
  }, [initialCountryCode]);

  const articleName = countryLabel(countryCode, "withArticle");
  const meta = getCountryMeta(countryCode);

  const heroButtonText =
    countryCode === "WW"
      ? "See all verified roles"
      : `See roles open from ${articleName}`;

  const heroSubtext =
    countryCode === "WW"
      ? "We open every listing on the employer's own page, write down country eligibility, and sign it with the date we checked. If we could not confirm something, we say so."
      : `We open every listing on the employer's own page, write down who can apply from ${articleName}, and sign it with the date we checked. If we could not confirm something, we say so.`;

  const trustLine = `We never charge you, never ask for your ${meta.idNumberName || "ID or bank login"}, and never message you first.`;
  const [copied, setCopied] = useState(false);

  const handleCopyCommand = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText("tracebase check outlier.ai/careers");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      <p className="mt-5 text-base sm:text-lg text-secondary leading-relaxed max-w-[34em] m-0">
        {heroSubtext}
      </p>

      {/* Primary & Secondary Action Buttons */}
      <div id="hero-actions" className="flex flex-wrap items-center gap-3 mt-7">
        <Link
          href="#roles"
          className="cs-btn cs-btn-primary min-h-[46px] sm:min-h-[48px] px-6 py-2.5 text-sm sm:text-base font-semibold inline-flex items-center gap-2 group cursor-pointer"
        >
          <span>{heroButtonText}</span>
          <ArrowRight className="w-4 h-4 text-white dark:text-gray-900 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="#check"
          className="cs-btn cs-btn-secondary min-h-[46px] sm:min-h-[48px] px-5 py-2.5 text-sm sm:text-base font-semibold inline-flex items-center gap-2 group cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 text-secondary group-hover:text-ink transition-colors" />
          <span>Check a job offer</span>
        </Link>
      </div>

      {/* Tailscale-style Verification Command Bar */}
      <div className="mt-5 max-w-[38em] p-2 sm:p-2.5 rounded-xl bg-sheet border border-rule shadow-2xs flex items-center justify-between gap-2 font-mono text-xs">
        <div className="flex items-center gap-2 truncate">
          <span className="text-muted select-none">$</span>
          <span className="text-ink font-semibold truncate">tracebase check outlier.ai/careers</span>
        </div>
        <button
          type="button"
          onClick={handleCopyCommand}
          className="px-2.5 py-1 rounded-md bg-elevated hover:bg-subtle text-secondary hover:text-ink text-[11px] font-mono font-medium border border-rule transition-colors shrink-0 cursor-pointer"
          aria-label="Copy verification command"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* Trust Guarantee Strip */}
      <div className="mt-3.5 flex items-start sm:items-center gap-2.5 text-xs text-secondary bg-surface/80 border border-rule px-3.5 py-2 rounded-lg max-w-[38em]">
        <ShieldCheck className="w-4 h-4 text-emerald-800 dark:text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
        <span className="leading-snug">{trustLine}</span>
      </div>
    </div>
  );
}
