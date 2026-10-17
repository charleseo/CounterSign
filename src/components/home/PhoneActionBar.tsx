"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { COUNTRY_STORAGE_KEY } from "@/components/ui/CountrySelector";
import { countryLabel } from "@/lib/utils/country";

export function PhoneActionBar() {
  const [heroButtonsPassed, setHeroButtonsPassed] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
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

    const heroActions = document.getElementById("hero-actions");
    let heroObserver: IntersectionObserver | null = null;
    if (heroActions) {
      heroObserver = new IntersectionObserver(
        ([entry]) => {
          const isAbove = entry.boundingClientRect.bottom < 0;
          setHeroButtonsPassed(isAbove && !entry.isIntersecting);
        },
        { threshold: 0 }
      );
      heroObserver.observe(heroActions);
    } else {
      const frame = requestAnimationFrame(() => setHeroButtonsPassed(true));
      return () => cancelAnimationFrame(frame);
    }

    const footer = document.getElementById("site-footer") || document.querySelector("footer");
    let footerObserver: IntersectionObserver | null = null;
    if (footer) {
      footerObserver = new IntersectionObserver(
        ([entry]) => {
          setFooterVisible(entry.isIntersecting);
        },
        { threshold: 0.05 }
      );
      footerObserver.observe(footer);
    }

    const handleScroll = () => {
      if (heroActions) {
        const rect = heroActions.getBoundingClientRect();
        setHeroButtonsPassed(rect.bottom < 0);
      }
      if (footer) {
        const fRect = footer.getBoundingClientRect();
        setFooterVisible(fRect.top < window.innerHeight);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("countrychange", updateCountry);
      window.removeEventListener("storage", updateCountry);
      window.removeEventListener("scroll", handleScroll);
      if (heroObserver) heroObserver.disconnect();
      if (footerObserver) footerObserver.disconnect();
    };
  }, []);

  const isVisible = heroButtonsPassed && !footerVisible;

  return (
    <aside
      aria-label="Quick mobile actions"
      className={`sm:hidden fixed bottom-3 left-3 right-3 z-40 p-glass-bar rounded-xl p-2 flex items-center gap-2 shadow-xl transition-all duration-200 ${
        isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <Link
        href="#roles"
        className="flex-1 min-h-[46px] flex items-center justify-center rounded-lg bg-[var(--brand-ink)] text-white font-bold text-sm tracking-tight hover:opacity-95 transition-opacity"
      >
        {countryCode === "WW"
          ? "See all verified roles"
          : `See roles open from ${countryLabel(countryCode, "withArticle")}`}
      </Link>
      <Link
        href="#check"
        aria-label="Check a job offer on scam checklist"
        className="shrink-0 w-[46px] h-[46px] flex items-center justify-center rounded-lg bg-sheet border border-rule text-ink hover:bg-elevated transition-colors"
      >
        <ShieldCheck size={20} className="text-[var(--brand-ink)]" />
      </Link>
    </aside>
  );
}
