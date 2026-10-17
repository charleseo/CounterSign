"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10 sm:py-12 space-y-8">
        {/* One set of links only with plain names */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 p-0 m-0 list-none text-sm text-secondary">
            <li>
              <Link href="/jobs" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Roles
              </Link>
            </li>
            <li>
              <Link href="/platforms" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Platforms
              </Link>
            </li>
            <li>
              <Link href="/training" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Training & certificates
              </Link>
            </li>
            <li>
              <Link href="/guides" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Guides
              </Link>
            </li>
            <li>
              <Link href="/scam-check" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Check an offer
              </Link>
            </li>
            <li>
              <Link href="/task-check" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Task check
              </Link>
            </li>
            <li>
              <Link href="/cv-builder" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                CV builder
              </Link>
            </li>
            <li>
              <Link href="/payout-calculator" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Payout calculator
              </Link>
            </li>
            <li>
              <Link href="/rates" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Pay rates
              </Link>
            </li>
            <li>
              <Link href="/appeals" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Appeal kit
              </Link>
            </li>
            <li>
              <Link href="/benchmark" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Benchmark
              </Link>
            </li>
            <li>
              <Link href="/glossary" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Glossary
              </Link>
            </li>
            <li>
              <Link href="/w8ben" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Tax guide (W-8BEN)
              </Link>
            </li>
            <li>
              <Link href="/training/drills" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Practice drills
              </Link>
            </li>
            <li>
              <Link href="/invoice" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Invoice maker
              </Link>
            </li>
            <li>
              <Link href="/evaluation" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                For AI teams
              </Link>
            </li>
            <li>
              <Link href="/evaluation/demo" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Live audit demo
              </Link>
            </li>
            <li>
              <Link href="/evaluation/whitepaper" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Research whitepaper
              </Link>
            </li>
            <li>
              <Link href="/methodology" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                How we check
              </Link>
            </li>
            <li>
              <Link href="/changes" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Change log
              </Link>
            </li>
            <li>
              <Link href="/official-channels" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Official channels
              </Link>
            </li>
            <li>
              <Link href="/about" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/corrections" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Corrections
              </Link>
            </li>
            <li>
              <Link href="/privacy#do-not-sell" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                Do not sell or share my personal information
              </Link>
            </li>
            <li>
              <Link href="/rss.xml" className="min-h-[44px] inline-flex items-center hover:text-ink transition-colors">
                RSS
              </Link>
            </li>
            {/* The Nigeria hub link appears only when Nigeria is selected */}
            {countryCode === "NG" && (
              <li>
                <Link href="/countries/nigeria" className="min-h-[44px] inline-flex items-center text-[#5A35C8] font-medium hover:underline">
                  Nigeria hub
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Bottom Bar: Independence Statement + Data Saver Switch */}
        <div className="flex flex-wrap justify-between items-center gap-6 pt-6 border-t border-subtle">
          <p className="max-w-[44em] leading-relaxed text-xs sm:text-sm text-secondary m-0">
            TraceBase is independent. We are not affiliated with the platforms we list, and some links may earn us a referral bonus. They are always labelled and never change a role&apos;s place.
          </p>

          <div className="flex items-center gap-3">
            {/* Data Saver Switch (role="switch") */}
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
                  className={`absolute top-[3px] w-[18px] height-[18px] h-[18px] rounded-full bg-white transition-all shadow-xs ${
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
