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

  return (
    <div>
      <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-[32em] m-0">
        {heroSubtext}
      </p>

      <div id="hero-actions" className="flex flex-wrap gap-3 mt-8">
        <Link
          href="#roles"
          className="cs-btn cs-btn-primary cs-btn-shimmer min-h-[52px] text-base sm:text-lg font-bold inline-flex items-center gap-2.5 group hover:shadow-xl hover:shadow-[var(--brand-ink)]/25 transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>{heroButtonText}</span>
          <ArrowRight className="w-5 h-5 text-white/90 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="#check"
          className="cs-btn cs-btn-secondary min-h-[52px] text-base sm:text-lg font-bold inline-flex items-center gap-2 hover:border-ink/50 transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
        >
          <ShieldCheck className="w-5 h-5 text-secondary group-hover:text-ink transition-colors" />
          <span>Check a job offer</span>
        </Link>
      </div>

      <p className="mt-5 text-sm sm:text-base text-secondary m-0">
        {trustLine}
      </p>
    </div>
  );
}
