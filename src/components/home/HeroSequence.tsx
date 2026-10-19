"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { cleanRoleTitle, cleanOrgName } from "@/lib/utils/roleStatus";
import { useSelectedCountry } from "@/components/ui/CountrySelector";
import { countryLabel } from "@/lib/utils/country";

export interface HeroSequenceProps {
  roleTitle?: string;
  orgName?: string;
  sourceDomain?: string;
  checkedDate?: string;
  eligibleCountries?: string;
  isSample?: boolean;
}

export function HeroSequence({
  roleTitle = "Search quality rater [SAMPLE]",
  orgName = "Northwind Labs [SAMPLE]",
  sourceDomain = "northwindlabs.example/careers/rater",
  checkedDate = "12 Oct 2026",
  eligibleCountries = "Ghana, India, Kenya, Nigeria, Philippines",
  isSample = true,
}: HeroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const [isReplaying, setIsReplaying] = useState(false);
  const selectedCountryCode = useSelectedCountry();
  const countryName = countryLabel(selectedCountryCode, "name");
  const fromCountryLabel = selectedCountryCode === "WW" ? "From your country" : `From ${countryName}`;

  const displayedEligibleCountries =
    selectedCountryCode === "US"
      ? "Canada, United Kingdom, United States"
      : selectedCountryCode === "GB"
      ? "Canada, United Kingdom, United States"
      : selectedCountryCode === "CA"
      ? "Canada, United Kingdom, United States"
      : selectedCountryCode === "NG"
      ? "Ghana, Kenya, Nigeria, South Africa"
      : eligibleCountries;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setHasEntered(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleReplay = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isReplaying) return;
    setIsReplaying(true);
    setHasEntered(true);
    setPlayKey((k) => k + 1);

    const isReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = isReducedMotion ? 600 : 4000;
    setTimeout(() => {
      setIsReplaying(false);
    }, duration);
  };

  const anim = hasEntered;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center lg:items-start">
      <div key={playKey} className="relative w-full max-w-[480px] pt-8 pr-4 sm:pr-8 pb-4">
        {/* Source Page Paper (rotates in behind) */}
        <div
          className={`absolute top-0 right-[-4px] sm:right-[-8px] w-[74%] h-[78%] bg-sheet border border-rule rounded-md shadow-lg overflow-hidden pointer-events-none select-none z-[1] ${
            anim ? "cs-src" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <div className="flex items-center gap-2 px-3 py-2 border-b border-subtle text-[11px] sm:text-xs text-secondary bg-elevated/40">
            <span className="w-2 h-2 rounded-full border border-subtle bg-canvas" />
            <span className="truncate">{sourceDomain}</span>
          </div>
          <div className="p-3.5 space-y-2">
            <div className="h-2 w-[60%] bg-subtle rounded-xs" />
            <div className="h-1.5 w-[85%] bg-subtle/70 rounded-xs" />
            <div className="h-1.5 w-[75%] bg-subtle/70 rounded-xs" />
            <div className="text-[10px] leading-snug text-muted bg-[var(--brand-tint)] p-1.5 rounded-xs border border-[var(--brand-ink)]/20 font-medium">
              Eligible: {displayedEligibleCountries}
            </div>
            <div className="h-1.5 w-[80%] bg-subtle/70 rounded-xs" />
            <div className="h-1.5 w-[65%] bg-subtle/70 rounded-xs" />
          </div>
        </div>

        {/* Checked Record Sheet (bumping on stamp impact) - Solid White in Front */}
        <div className={`relative w-[90%] sm:w-[88%] z-[2] ${anim ? "cs-sheet-shadow" : ""}`}>
          <article
            className={`relative bg-sheet border border-rule rounded-sm shadow-xl p-5 sm:p-7 ${
              anim ? "cs-sheet" : "opacity-0"
            }`}
            aria-label="Example of a checked role record"
          >
            <div className="flex justify-between items-center text-xs font-semibold text-secondary">
              <span className="tabular-nums">Record 0142</span>
              {isSample ? (
                <span className="text-[11px] font-bold text-secondary bg-subtle border border-rule px-2 py-0.5 rounded">
                  Sample entry
                </span>
              ) : (
                <span>Checked listing</span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold mt-3 mb-1 tracking-tight text-ink">
              {cleanRoleTitle(roleTitle)}
            </h2>
            <p className="text-sm sm:text-base text-secondary m-0">
              {cleanOrgName(orgName)}, remote contract
            </p>

            {/* Fact Rows with Stepping Reading Ruler */}
            <dl className="relative mt-5 grid grid-cols-[minmax(0,7.5em)_minmax(0,1fr)_22px] text-sm sm:text-base">
              {/* Row 1: Eligibility */}
              <dt className="py-2.5 sm:py-3 border-t border-subtle text-secondary font-medium">{fromCountryLabel}</dt>
              <dd className="m-0 py-2.5 sm:py-3 border-t border-subtle font-bold text-[var(--status-recheck)]">
                Sample entry until launch
              </dd>
              <dd className="m-0 py-2.5 sm:py-3 border-t border-subtle flex items-center justify-end">
                <svg className="cs-tick cs-t1 text-[var(--brand-ink)]" width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </dd>

              {/* Row 2: Pay */}
              <dt className="py-2.5 sm:py-3 border-t border-subtle text-secondary font-medium">Pay</dt>
              <dd className="m-0 py-2.5 sm:py-3 border-t border-subtle font-bold text-ink">
                Not stated by employer
              </dd>
              <dd className="m-0 py-2.5 sm:py-3 border-t border-subtle flex items-center justify-end">
                <svg className="cs-tick cs-t2 text-[var(--brand-ink)]" width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </dd>

              {/* Row 3: Qualification Test */}
              <dt className="py-2.5 sm:py-3 border-t border-subtle text-secondary font-medium">Before paid work</dt>
              <dd className="m-0 py-2.5 sm:py-3 border-t border-subtle font-bold text-ink">
                Unpaid test, <span className="tabular-nums">~2 hours</span><span className="font-normal text-secondary text-xs sm:text-sm">, reported</span>
              </dd>
              <dd className="m-0 py-2.5 sm:py-3 border-t border-subtle flex items-center justify-end">
                <svg className="cs-tick cs-t3 text-[var(--brand-ink)]" width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </dd>

              {/* Row 4: Source */}
              <dt className="py-2.5 sm:py-3 border-t border-b border-subtle text-secondary font-medium">Source</dt>
              <dd className="m-0 py-2.5 sm:py-3 border-t border-b border-subtle">
                <Link href="#roles" className="font-bold text-[var(--brand-ink)] hover:underline">
                  Official careers page
                </Link>
              </dd>
              <dd className="m-0 py-2.5 sm:py-3 border-t border-b border-subtle flex items-center justify-end">
                <svg className="cs-tick cs-t4 text-[var(--brand-ink)]" width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </dd>

              {/* Reading Ruler Glass Bar (Steps through 4 rows) */}
              {anim && <div className="cs-ruler" aria-hidden="true" />}
            </dl>

            {/* Signature Draw */}
            <div className="mt-4 flex items-end justify-between">
              <div>
                <svg width="150" height="38" viewBox="0 0 170 44" aria-hidden="true" className="text-ink">
                  <path
                    className={anim ? "cs-sig" : ""}
                    d="M4 32 C12 8 24 6 22 26 C20 40 32 38 40 20 C46 8 50 32 58 28 C66 24 68 12 76 16 C84 20 80 36 92 32 C104 28 110 14 122 18 C132 22 128 34 142 30 L166 22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="border-t border-rule pt-1 text-[11px] sm:text-xs text-secondary font-medium">
                  Checked by hand, <span className="tabular-nums">{checkedDate}</span>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* SVG TraceBaseed Stamp (Lands at 3.4s) */}
        <div
          className={`absolute right-[-10px] sm:right-[-2px] bottom-[-10px] sm:bottom-[-6px] w-[140px] sm:w-[168px] h-[140px] sm:h-[168px] text-[var(--brand-ink)] pointer-events-none select-none z-[3] ${
            anim ? "cs-stamp" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 200 200" width="100%" height="100%" role="img" aria-label="TraceBase verified seal stamp">
            <defs>
              <filter id="inkMainHero" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
                <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" />
              </filter>
              <path id="ringMainHero" d="M100,100 m-73,0 a73,73 0 1,1 146,0 a73,73 0 1,1 -146,0" />
            </defs>
            <g filter="url(#inkMainHero)" opacity="0.94">
              <circle cx="100" cy="100" r="93" fill="none" stroke="currentColor" strokeWidth="5" />
              <circle cx="100" cy="100" r="57" fill="none" stroke="currentColor" strokeWidth="2" />
              <text fontFamily="'Schibsted Grotesk', sans-serif" fontSize="16" fontWeight="800" letterSpacing="2.6" fill="currentColor">
                <textPath href="#ringMainHero">TraceBase • Checked by hand •</textPath>
              </text>
              <path d="M78 92l14 14 30-32" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              <text x="100" y="128" textAnchor="middle" fontFamily="'Schibsted Grotesk', sans-serif" fontSize="13.5" fontWeight="800" letterSpacing="1.5" fill="currentColor" className="tabular-nums">
                {checkedDate.toUpperCase()}
              </text>
              <text x="100" y="146" textAnchor="middle" fontFamily="'Schibsted Grotesk', sans-serif" fontSize="12" fontWeight="700" fill="currentColor">
                E.O.
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Replay Control (≥44px tap target) */}
      <button
        type="button"
        onClick={handleReplay}
        disabled={isReplaying}
        aria-busy={isReplaying}
        aria-label={isReplaying ? "Replaying check sequence" : "Watch a check again"}
        className="group inline-flex items-center gap-2 min-h-[44px] px-3 py-1.5 mt-2 rounded-full text-sm font-semibold text-secondary hover:text-ink hover:bg-surface/80 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        <RotateCcw
          size={15}
          className={isReplaying ? "animate-spin text-accent" : "transition-transform group-hover:-rotate-45"}
          aria-hidden="true"
        />
        <span>{isReplaying ? "Replaying check..." : "Watch a check again"}</span>
      </button>
    </div>
  );
}
