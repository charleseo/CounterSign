"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TraceBaseLogo } from "@/components/ui/TraceBaseLogo";
import { COUNTRY_STORAGE_KEY } from "@/components/ui/CountrySelector";

function subscribeTier(callback: () => void) {
  window.addEventListener("tierchange", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("tierchange", callback);
    window.removeEventListener("storage", callback);
  };
}

function getTierSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const currentTier = document.documentElement.dataset.tier || localStorage.getItem("countersign_tier");
    return currentTier === "lite" || currentTier === "basic";
  } catch {
    return false;
  }
}

export function Footer() {
  const pathname = usePathname();
  const dataSaver = React.useSyncExternalStore(subscribeTier, getTierSnapshot, () => false);
  const [countryCode, setCountryCode] = useState("WW");

  useEffect(() => {
    const readCountry = () => {
      try {
        const qCountry = new URLSearchParams(window.location.search).get("country");
        if (qCountry) {
          setCountryCode(qCountry.toUpperCase());
          return;
        }
        const stored = localStorage.getItem(COUNTRY_STORAGE_KEY);
        setCountryCode(stored ? stored.toUpperCase() : "WW");
      } catch {
        setCountryCode("WW");
      }
    };

    readCountry();
    window.addEventListener("countrychange", readCountry);
    window.addEventListener("storage", readCountry);
    return () => {
      window.removeEventListener("countrychange", readCountry);
      window.removeEventListener("storage", readCountry);
    };
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const toggleDataSaver = () => {
    const nextTier = dataSaver ? "full" : "lite";
    try {
      localStorage.setItem("countersign_tier", nextTier);
      document.documentElement.dataset.tier = nextTier;
      window.dispatchEvent(new CustomEvent("tierchange", { detail: nextTier }));
    } catch {
      // Ignore storage error
    }
  };

  return (
    <footer id="site-footer" className="w-full border-t border-rule bg-canvas text-secondary text-sm mt-auto">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-10">
        {/* Brand and Mission Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-rule">
          <div className="space-y-2 max-w-xl">
            <Link href="/" className="inline-flex items-center gap-2 group focus:outline-none">
              <TraceBaseLogo size={24} />
              <span className="font-bold text-lg tracking-tight select-none">
                <span className="text-[#5A35C8] dark:text-[#9D7BFF]">Trace</span>
                <span className="text-[#009E6D] dark:text-[#00E5A3]">Base</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed m-0">
              Independent AI contributor directory, practical tools, and model evaluation studio. Human verified and direct.
            </p>
          </div>

          {countryCode === "NG" && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#5A35C8]/30 bg-[#5A35C8]/10 text-xs text-ink">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Viewing regional rates for <strong>Nigeria</strong></span>
              <Link href="/countries/nigeria" className="font-semibold text-[#5A35C8] hover:underline ml-1">
                Open hub
              </Link>
            </div>
          )}
        </div>

        {/* Organized 5-Column Navigation */}
        <nav aria-label="Footer navigation" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-xs">
          {/* Column 1: Work & Platforms */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold normal-case text-ink m-0">
              Work & platforms
            </h3>
            <ul className="space-y-2 p-0 m-0 list-none text-secondary">
              <li>
                <Link href="/jobs" className="hover:text-ink transition-colors inline-block py-1">
                  Verified roles
                </Link>
              </li>
              <li>
                <Link href="/platforms" className="hover:text-ink transition-colors inline-block py-1">
                  Platforms & pay rates
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-ink transition-colors inline-block py-1">
                  Compare platforms
                </Link>
              </li>
              <li>
                <Link href="/scams-this-week" className="hover:text-ink transition-colors inline-block py-1">
                  Scams this week
                </Link>
              </li>
              {countryCode === "NG" && (
                <li>
                  <Link href="/countries/nigeria" className="text-[#5A35C8] font-semibold hover:underline inline-block py-1">
                    Nigeria contributor hub
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Column 2: Contributor Tools */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold normal-case text-ink m-0">
              Contributor tools
            </h3>
            <ul className="space-y-2 p-0 m-0 list-none text-secondary">
              <li>
                <Link href="/cv-builder" className="hover:text-ink transition-colors inline-block py-1">
                  One-page CV builder
                </Link>
              </li>
              <li>
                <Link href="/scam-check" className="hover:text-ink transition-colors inline-block py-1">
                  Check a job offer
                </Link>
              </li>
              <li>
                <Link href="/task-check" className="hover:text-ink transition-colors inline-block py-1">
                  Task pre-submission check
                </Link>
              </li>
              <li>
                <Link href="/payout-calculator" className="hover:text-ink transition-colors inline-block py-1">
                  Take-home pay calculator
                </Link>
              </li>
              <li>
                <Link href="/invoice" className="hover:text-ink transition-colors inline-block py-1">
                  Contractor invoice maker
                </Link>
              </li>
              <li>
                <Link href="/appeals" className="hover:text-ink transition-colors inline-block py-1">
                  Account appeal kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Training & Guides */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold normal-case text-ink m-0">
              Training & learning
            </h3>
            <ul className="space-y-2 p-0 m-0 list-none text-secondary">
              <li>
                <Link href="/training" className="hover:text-ink transition-colors inline-block py-1">
                  Training courses & certs
                </Link>
              </li>
              <li>
                <Link href="/training/drills" className="hover:text-ink transition-colors inline-block py-1">
                  Interactive evaluation drills
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-ink transition-colors inline-block py-1">
                  Step-by-step guides
                </Link>
              </li>
              <li>
                <Link href="/w8ben" className="hover:text-ink transition-colors inline-block py-1">
                  Tax guide (W-8BEN)
                </Link>
              </li>
              <li>
                <Link href="/benchmark" className="hover:text-ink transition-colors inline-block py-1">
                  Benchmark standards
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="hover:text-ink transition-colors inline-block py-1">
                  AI evaluation glossary
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Studio for AI Teams */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold normal-case text-ink m-0">
              For AI teams
            </h3>
            <ul className="space-y-2 p-0 m-0 list-none text-secondary">
              <li>
                <Link href="/evaluation" className="hover:text-ink transition-colors inline-block py-1">
                  Human evaluation studio
                </Link>
              </li>
              <li>
                <Link href="/evaluation/demo" className="hover:text-ink transition-colors inline-block py-1">
                  Live audit demo
                </Link>
              </li>
              <li>
                <Link href="/evaluation/whitepaper" className="hover:text-ink transition-colors inline-block py-1">
                  Research whitepaper
                </Link>
              </li>
              <li>
                <Link href="/evaluation/estimator" className="hover:text-ink transition-colors inline-block py-1">
                  Scope and cost estimator
                </Link>
              </li>
              <li>
                <Link href="/evaluation/sample-audit" className="hover:text-ink transition-colors inline-block py-1">
                  Sample audit report
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Trust & Company */}
          <div className="space-y-3 col-span-2 sm:col-span-1">
            <h3 className="text-xs font-bold normal-case text-ink m-0">
              Trust & company
            </h3>
            <ul className="space-y-2 p-0 m-0 list-none text-secondary">
              <li>
                <Link href="/about" className="hover:text-ink transition-colors inline-block py-1">
                  About TraceBase
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-ink transition-colors inline-block py-1">
                  How we check
                </Link>
              </li>
              <li>
                <Link href="/official-channels" className="hover:text-ink transition-colors inline-block py-1">
                  Our official channels
                </Link>
              </li>
              <li>
                <Link href="/changes" className="hover:text-ink transition-colors inline-block py-1">
                  Change log
                </Link>
              </li>
              <li>
                <Link href="/corrections" className="hover:text-ink transition-colors inline-block py-1">
                  Report a correction
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-ink transition-colors inline-block py-1">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-ink transition-colors inline-block py-1">
                  Terms of service
                </Link>
              </li>
              <li>
                <Link href="/privacy#do-not-sell" className="hover:text-ink transition-colors inline-block py-1">
                  Do not sell my personal info
                </Link>
              </li>
              <li>
                <Link href="/rss.xml" className="hover:text-ink transition-colors inline-block py-1">
                  RSS feed
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Bottom Bar: Independence Statement + Data Saver Switch */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-6 border-t border-rule">
          <p className="max-w-[48em] leading-relaxed text-xs text-secondary m-0">
            TraceBase is independent. We are not affiliated with the platforms we list, and some links may earn us a referral bonus. They are always labelled and never change a role&apos;s place.
          </p>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              role="switch"
              aria-checked={dataSaver}
              onClick={toggleDataSaver}
              className="inline-flex items-center gap-2.5 min-h-[44px] py-1 border-0 bg-transparent font-inherit text-ink cursor-pointer select-none"
            >
              <span
                className={`relative inline-block w-10 h-6 rounded-full transition-colors ${
                  dataSaver ? "bg-[var(--brand-ink)]" : "bg-[#C9CFD9]"
                }`}
              >
                <span
                  className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white transition-all shadow-xs ${
                    dataSaver ? "left-[19px]" : "left-[3px]"
                  }`}
                />
              </span>
              <span className="font-semibold text-xs sm:text-sm">Data saver</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
