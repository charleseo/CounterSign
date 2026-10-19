"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { RotateCcw, ShieldCheck, Check, ExternalLink, Terminal, CheckCircle2 } from "lucide-react";
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

const PRESET_PLATFORMS = [
  {
    id: "outlier",
    name: "Outlier AI",
    role: "Search quality rater",
    domain: "outlier.ai",
    url: "https://outlier.ai/careers/rater",
    pay: "$18 to $45/hr",
    payNote: "Direct client contract, 0% agency cut",
    geo: "Ghana, India, Kenya, Nigeria, South Africa, US, UK",
    checked: "Today",
    dnsStatus: "Cloudflare TLS 1.3 • Ashby ATS",
    auditor: "Auditor #0142",
    hash: "0x9f4a...31b",
    test: "Unpaid test, ~2 hours (reported)",
  },
  {
    id: "dataannotation",
    name: "DataAnnotation",
    role: "AI reasoning specialist",
    domain: "dataannotation.tech",
    url: "https://dataannotation.tech/roles",
    pay: "$20 to $40/hr",
    payNote: "Direct client contract, 0% agency cut",
    geo: "Canada, United Kingdom, United States, South Africa",
    checked: "18 Oct",
    dnsStatus: "AWS Route53 TLS 1.3 • Proprietary portal",
    auditor: "Auditor #0089",
    hash: "0x3e12...89a",
    test: "45-minute starter assessment (reported)",
  },
  {
    id: "mercor",
    name: "Mercor",
    role: "Frontier AI alignment auditor",
    domain: "mercor.com",
    url: "https://mercor.com/apply/auditor",
    pay: "$60 to $110/hr",
    payNote: "Direct client contract, 0% agency cut",
    geo: "Worldwide remote",
    checked: "17 Oct",
    dnsStatus: "Vercel Edge TLS 1.3 • Direct interview",
    auditor: "Auditor #0054",
    hash: "0x7b88...42c",
    test: "AI video screening, ~20 mins (reported)",
  },
  {
    id: "alignerr",
    name: "Alignerr",
    role: "Visual reasoning specialist",
    domain: "alignerr.com",
    url: "https://alignerr.com/apply/multimodal",
    pay: "$24 to $32/hr",
    payNote: "Direct client contract, 0% agency cut",
    geo: "Worldwide remote",
    checked: "16 Oct",
    dnsStatus: "Cloudflare TLS 1.3 • TestGorilla assessment",
    auditor: "Auditor #0112",
    hash: "0x2a91...55e",
    test: "TestGorilla assessment, ~30 mins (reported)",
  },
];

export function HeroSequence({
  roleTitle = "Search quality rater [SAMPLE]",
  orgName = "Northwind Labs [SAMPLE]",
  sourceDomain = "northwindlabs.example/careers/rater",
  checkedDate = "18 Oct 2026",
  eligibleCountries = "Ghana, India, Kenya, Nigeria, Philippines",
  isSample = true,
}: HeroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("outlier");
  const [activeTab, setActiveTab] = useState<"record" | "terminal">("record");
  const [isVerifying, setIsVerifying] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  const selectedCountryCode = useSelectedCountry();
  const countryName = countryLabel(selectedCountryCode, "name");
  const fromCountryLabel = selectedCountryCode === "WW" ? "From your country" : `From ${countryName}`;

  const currentPreset = PRESET_PLATFORMS.find((p) => p.id === selectedPlatform) || PRESET_PLATFORMS[0];

  const displayedEligibleCountries =
    selectedCountryCode === "US"
      ? "Canada, United Kingdom, United States"
      : selectedCountryCode === "GB"
      ? "Canada, United Kingdom, United States"
      : selectedCountryCode === "CA"
      ? "Canada, United Kingdom, United States"
      : selectedCountryCode === "NG"
      ? "Ghana, Kenya, Nigeria, South Africa"
      : currentPreset.geo;

  const handleSelectPlatform = (id: string) => {
    if (id === selectedPlatform) return;
    setSelectedPlatform(id);
    triggerVerificationPulse();
  };

  const triggerVerificationPulse = () => {
    setIsVerifying(true);
    setPulseKey((k) => k + 1);
    setTimeout(() => {
      setIsVerifying(false);
    }, 900);
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center lg:items-end max-w-[520px]">
      {/* Outer macOS / Engineer Console Frame */}
      <div className="w-full ts-card overflow-hidden shadow-xl border border-rule bg-sheet">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-elevated/70 border-b border-rule font-mono text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-secondary font-medium hidden sm:inline">
              tracebase-mesh: ~ / audit-node
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400 font-semibold">
            <span className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${isVerifying ? "animate-ping" : "animate-pulse"}`} />
            <span>4 verified nodes active</span>
          </div>
        </div>

        {/* Platform Selector Tabs (Segmented Control) */}
        <div className="p-2 sm:p-2.5 bg-surface/50 border-b border-rule">
          <div className="grid grid-cols-4 gap-1 p-1 bg-elevated rounded-xl border border-rule">
            {PRESET_PLATFORMS.map((p) => {
              const isActive = p.id === selectedPlatform;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPlatform(p.id)}
                  className={`py-1.5 px-1 sm:px-2 text-[11px] font-mono font-medium rounded-lg text-center transition-all cursor-pointer truncate ${
                    isActive
                      ? "bg-sheet text-ink shadow-xs border border-rule font-semibold"
                      : "text-secondary hover:text-ink hover:bg-sheet/40 border border-transparent"
                  }`}
                  aria-pressed={isActive}
                >
                  {p.name.split(" ")[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Verification Topology Mesh Visual (The Heart of the Tailscale Vibe) */}
        <div className="p-3 sm:p-4 bg-canvas/40 border-b border-rule">
          <div className="flex items-center justify-between gap-1 sm:gap-2">
            {/* Left Node: Platform Endpoint */}
            <div className="flex-1 min-w-0 p-2 sm:p-2.5 rounded-xl bg-sheet border border-rule shadow-2xs font-mono">
              <div className="text-[10px] text-secondary flex items-center justify-between pb-1 mb-1 border-b border-subtle">
                <span className="truncate">Source</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <div className="text-xs font-bold text-ink truncate">{currentPreset.domain}</div>
              <div className="text-[10px] text-emerald-800 dark:text-emerald-400 font-semibold truncate mt-0.5">
                0% agency cut
              </div>
            </div>

            {/* Connecting Wire 1 */}
            <div className="w-6 sm:w-10 shrink-0 flex items-center justify-center">
              <svg className="w-full h-3" viewBox="0 0 40 12" preserveAspectRatio="none" aria-hidden="true">
                <line
                  x1="0"
                  y1="6"
                  x2="40"
                  y2="6"
                  stroke="#10B981"
                  strokeWidth="2"
                  className="ts-animated-wire"
                />
              </svg>
            </div>

            {/* Center Node: TraceBase Auditor Node */}
            <div className="flex-1 min-w-0 p-2 sm:p-2.5 rounded-xl bg-sheet border border-emerald-500/30 shadow-2xs font-mono bg-emerald-500/5">
              <div className="text-[10px] text-emerald-800 dark:text-emerald-400 flex items-center justify-between pb-1 mb-1 border-b border-emerald-500/20 font-semibold">
                <span className="truncate">TraceBase</span>
                <ShieldCheck size={11} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-xs font-bold text-ink truncate">{currentPreset.auditor}</div>
              <div className="text-[10px] text-secondary truncate mt-0.5">
                Hand-checked
              </div>
            </div>

            {/* Connecting Wire 2 */}
            <div className="w-6 sm:w-10 shrink-0 flex items-center justify-center">
              <svg className="w-full h-3" viewBox="0 0 40 12" preserveAspectRatio="none" aria-hidden="true">
                <line
                  x1="0"
                  y1="6"
                  x2="40"
                  y2="6"
                  stroke="#10B981"
                  strokeWidth="2"
                  className="ts-animated-wire"
                />
              </svg>
            </div>

            {/* Right Node: Contributor Direct Payout */}
            <div className="flex-1 min-w-0 p-2 sm:p-2.5 rounded-xl bg-sheet border border-rule shadow-2xs font-mono">
              <div className="text-[10px] text-secondary flex items-center justify-between pb-1 mb-1 border-b border-subtle">
                <span className="truncate">Your rate</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 truncate">
                {currentPreset.pay.split(" ")[0]}
              </div>
              <div className="text-[10px] text-ink font-semibold truncate mt-0.5">
                100% kept
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Inspector Navigation */}
        <div className="flex items-center justify-between px-3.5 py-1.5 bg-elevated/40 border-b border-rule">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("record")}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === "record"
                  ? "bg-sheet text-ink font-semibold shadow-2xs border border-rule"
                  : "text-secondary hover:text-ink"
              }`}
            >
              Audit record
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("terminal")}
              className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                activeTab === "terminal"
                  ? "bg-sheet text-ink font-semibold shadow-2xs border border-rule"
                  : "text-secondary hover:text-ink"
              }`}
            >
              <Terminal size={12} />
              <span>Terminal log</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-secondary">
            Verified {currentPreset.checked}
          </span>
        </div>

        {/* Tab Content 1: Audit Record Card */}
        {activeTab === "record" && (
          <div key={`rec-${pulseKey}`} className="p-4 sm:p-5 space-y-3.5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-ink m-0 tracking-tight">
                  {currentPreset.role}
                </h3>
                <p className="text-xs sm:text-sm text-secondary m-0 mt-0.5">
                  {currentPreset.name}, remote contractor
                </p>
              </div>
              <span className="shrink-0 text-[11px] font-mono font-medium text-emerald-800 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                <Check size={11} />
                <span>Verified</span>
              </span>
            </div>

            {/* Fact Rows */}
            <div className="space-y-2 text-xs sm:text-sm border-t border-subtle pt-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-secondary">{fromCountryLabel}</span>
                <span className="font-semibold text-emerald-800 dark:text-emerald-400 inline-flex items-center gap-1 font-mono text-xs">
                  <Check size={12} />
                  <span>Remote worldwide</span>
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-secondary">Direct compensation</span>
                <span className="font-semibold text-ink font-mono text-xs">
                  {currentPreset.pay} <span className="text-secondary font-normal">(0% agency fee)</span>
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-secondary">Pre-work screening</span>
                <span className="text-secondary text-xs truncate max-w-[200px]">
                  {currentPreset.test}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-secondary">Official portal</span>
                <a
                  href={currentPreset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink font-mono text-xs font-semibold hover:underline inline-flex items-center gap-1 truncate max-w-[200px]"
                >
                  <span>{currentPreset.domain}</span>
                  <ExternalLink size={11} className="text-secondary" />
                </a>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center justify-between gap-2 border-t border-subtle text-xs">
              <span className="font-mono text-[11px] text-muted truncate">
                Hash: {currentPreset.hash}
              </span>
              <a
                href={currentPreset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cs-btn cs-btn-secondary min-h-[36px] py-1 px-3 text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <span>Apply on employer&apos;s site</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        )}

        {/* Tab Content 2: Monospace Live Terminal Stream */}
        {activeTab === "terminal" && (
          <div key={`term-${pulseKey}`} className="p-3.5 sm:p-4 bg-canvas font-mono text-[11px] sm:text-xs space-y-1.5 leading-relaxed text-secondary select-text overflow-x-auto">
            <div className="text-ink font-semibold flex items-center gap-1.5">
              <span className="text-muted">$</span>
              <span>tracebase verify {currentPreset.domain} --strict</span>
            </div>
            <div className="text-muted pt-1">
              [16:22:01] Querying DNS infrastructure: {currentPreset.domain} ... <span className="text-emerald-800 dark:text-emerald-400 font-semibold">OK</span>
            </div>
            <div>
              [16:22:02] Transport security: {currentPreset.dnsStatus}
            </div>
            <div>
              [16:22:03] Intermediary broker scan: <span className="text-emerald-800 dark:text-emerald-400 font-semibold">0 middleman agencies found</span>
            </div>
            <div>
              [16:22:04] Direct client compensation verified: <span className="text-ink font-semibold">{currentPreset.pay}</span>
            </div>
            <div>
              [16:22:05] Hand-checked by {currentPreset.auditor} ({currentPreset.checked})
            </div>
            <div className="text-emerald-800 dark:text-emerald-400 font-semibold pt-1 border-t border-rule/60">
              [✓] 200 OK • Verified official employer listing
            </div>
          </div>
        )}
      </div>

      {/* Re-run Inspection Control */}
      <button
        type="button"
        onClick={triggerVerificationPulse}
        disabled={isVerifying}
        aria-label="Re-run verification check"
        className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-mono font-medium text-secondary hover:text-ink transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-elevated/80"
      >
        <RotateCcw size={12} className={isVerifying ? "animate-spin text-emerald-800 dark:text-emerald-400" : ""} />
        <span>{isVerifying ? "Verifying platform node..." : "Re-run verification test"}</span>
      </button>
    </div>
  );
}
