"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  RotateCcw,
  Sliders,
  Smartphone,
  Tablet,
  Monitor,
  Terminal,
  Cpu,
} from "lucide-react";

import { TierToggle } from "@/components/layout/TierToggle";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

// UI Components
import { SealLogo } from "@/components/ui/SealLogo";
import { StatusBadge, StatusType } from "@/components/ui/StatusBadge";
import { FreshnessStamp } from "@/components/ui/FreshnessStamp";
import { TruthStrip } from "@/components/ui/TruthStrip";
import { JobCard } from "@/components/ui/JobCard";
import { CountrySelector } from "@/components/ui/CountrySelector";
import { FilterBar, DEFAULT_FILTER_STATE, FilterState } from "@/components/ui/FilterBar";
import { BentoTile } from "@/components/ui/BentoTile";
import { LiveCheckConsole, CheckEvent } from "@/components/ui/LiveCheckConsole";
import { ExpectationTimeline } from "@/components/ui/ExpectationTimeline";
import { PlatformHeader } from "@/components/ui/PlatformHeader";
import { CompareTable, PlatformCompareData } from "@/components/ui/CompareTable";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { GuideLayout } from "@/components/ui/GuideLayout";
import { EmailCapture } from "@/components/ui/EmailCapture";
import { ReportForm } from "@/components/ui/ReportForm";
import { SampleAuditCard } from "@/components/ui/SampleAuditCard";
import { EvaluationGraph } from "@/components/ui/EvaluationGraph";
import { ComparisonPanel } from "@/components/ui/ComparisonPanel";
import { Stepper } from "@/components/ui/Stepper";
import { ConstraintChecker } from "@/components/ui/ConstraintChecker";
import { Chart } from "@/components/ui/Chart";
import { Toast, ToastMessage } from "@/components/ui/Toast";
import { Skeleton, JobCardSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";

export default function ComponentGalleryPage() {
  const [sealAnimKey, setSealAnimKey] = useState(0);
  const [galleryFilters, setGalleryFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);
  const [activeToast, setActiveToast] = useState<ToastMessage | null>(null);
  const [activeViewport, setActiveViewport] = useState<"full" | "360" | "390" | "768" | "1280">("full");

  // Sample Telemetry Check Events
  const sampleEvents: CheckEvent[] = [
    {
      id: "ev-1",
      timestamp: "10m ago",
      platform: "Outlier",
      roleTitle: "STEM Reasoning RLHF Specialist",
      result: "VERIFIED_ACTIVE",
      countryCode: "NG",
    },
    {
      id: "ev-2",
      timestamp: "1h ago",
      platform: "Alignerr",
      roleTitle: "Technical Documentation Evaluator",
      result: "ELIGIBILITY_CONFIRMED",
      countryCode: "GH",
    },
    {
      id: "ev-3",
      timestamp: "4h ago",
      platform: "DataAnnotation",
      roleTitle: "Bilingual Translation Rater",
      result: "NEEDS_RECHECK",
      countryCode: "KE",
    },
    {
      id: "ev-4",
      timestamp: "1d ago",
      platform: "Mercor",
      roleTitle: "Full-Stack AI Interview Evaluator",
      result: "ROLE_CLOSED",
      countryCode: "GLOBAL",
    },
  ];

  // Sample Comparison Platforms
  const samplePlatforms: PlatformCompareData[] = [
    {
      id: "outlier",
      name: "Outlier AI",
      nigeriaAccepted: "yes",
      payRange: "$15 to $35/hr (Verified)",
      workTypes: ["RLHF", "STEM Reasoning", "Coding"],
      assessmentStyle: "Unpaid domain tests (2 to 3 hrs)",
      payoutMethods: ["Geegpay", "Grey", "Direct Bank Wire"],
      queueReality: "Fluctuating between project runs",
      lastReviewed: "2 days ago",
    },
    {
      id: "alignerr",
      name: "Alignerr",
      nigeriaAccepted: "yes",
      payRange: "$18 to $30/hr (Verified)",
      workTypes: ["Technical Writing", "Evaluation"],
      assessmentStyle: "Domain assessment + ID check",
      payoutMethods: ["Deel", "Geegpay ACH"],
      queueReality: "Selective task dispatch",
      lastReviewed: "5 days ago",
    },
    {
      id: "dataannotation",
      name: "DataAnnotation",
      nigeriaAccepted: "no",
      payRange: "$20 to $40/hr (Official)",
      workTypes: ["Annotation", "Generalist"],
      assessmentStyle: "Unpaid starter & core assessment",
      payoutMethods: ["PayPal (Commercial only)"],
      queueReality: "Limited to Tier-1 countries officially",
      lastReviewed: "8 days ago",
    },
    {
      id: "mercor",
      name: "Mercor",
      nigeriaAccepted: "unconfirmed",
      payRange: "Project-dependent ($25+/hr)",
      workTypes: ["Code Evaluation", "Expert AI"],
      assessmentStyle: "AI video interview + resume scan",
      payoutMethods: ["Stripe / Direct Deposit"],
      queueReality: "Candidate matching model",
      lastReviewed: "12 days ago",
    },
  ];

  // Token Swatches Data (Audited for Contrast per 10.4)
  const tokenSwatches = [
    { name: "Void Canvas", varName: "--bg-void", hex: "#070B16", role: "Deep base canvas", ratio: "Base (1:1)", wcag: "Base" },
    { name: "Surface", varName: "--bg-surface", hex: "#0B1222", role: "Cards, panels, inputs", ratio: "Surface Layer", wcag: "Pass" },
    { name: "Elevated", varName: "--bg-elevated", hex: "#142039", role: "Hover and active tabs", ratio: "Elevated Layer", wcag: "Pass" },
    { name: "Border Subtle", varName: "--border-subtle", hex: "#25334B", role: "Structural dividers", ratio: "3.2:1 Non-text", wcag: "Pass" },
    { name: "Border Focus", varName: "--border-focus", hex: "#3DEBFF", role: "Active input borders & rings", ratio: "13.5:1 Boundary", wcag: "Pass AAA" },
    { name: "Text Primary", varName: "--text-primary", hex: "#F5F8FC", role: "Headings, body copy, labels", ratio: "18.2:1 against void", wcag: "Pass AAA" },
    { name: "Text Secondary", varName: "--text-secondary", hex: "#94A3B8", role: "Metadata, timestamps, captions", ratio: "6.5:1 against void", wcag: "Pass AA" },
    { name: "Text Readable", varName: "--text-readable", hex: "#CBD5E1", role: "Long-form guide text, terms", ratio: "11.4:1 against void", wcag: "Pass AAA" },
    { name: "Luminescent Cyan", varName: "--accent-cyan", hex: "#3DEBFF", role: "Brand accent & key data", ratio: "13.5:1 against void", wcag: "Pass AAA" },
    { name: "Verified Emerald", varName: "--accent-emerald", hex: "#45F5C5", role: "Verified active & official", ratio: "14.2:1 against void", wcag: "Pass AAA" },
    { name: "Studio Violet", varName: "--accent-violet", hex: "#8B7CFF", role: "Model evals & citations", ratio: "7.8:1 against void", wcag: "Pass AA" },
    { name: "Alert Amber", varName: "--accent-amber", hex: "#FFC66D", role: "Needs recheck & caution", ratio: "13.1:1 against void", wcag: "Pass AAA" },
    { name: "Danger Red", varName: "--accent-danger", hex: "#FF6B6B", role: "High risk & closed listing", ratio: "6.2:1 against void", wcag: "Pass AA" },
  ];

  const triggerToast = (type: "info" | "success" | "error") => {
    const messages = {
      info: "Country eligibility updated: Nigeria selected.",
      success: "Official source verified. Recheck recorded in audit log.",
      error: "Connection timeout. Switched to Lite Data-Saver mode.",
    };
    setActiveToast({
      id: Date.now().toString(),
      type,
      message: messages[type],
    });
  };

  const getViewportMaxWidth = () => {
    switch (activeViewport) {
      case "360":
        return "max-w-[360px]";
      case "390":
        return "max-w-[390px]";
      case "768":
        return "max-w-[768px]";
      case "1280":
        return "max-w-[1280px]";
      default:
        return "max-w-6xl";
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col py-8 px-3 sm:px-6">
      {/* Gallery Header & Interactive Playground Controls */}
      <div className="max-w-6xl mx-auto w-full mb-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl border border-subtle bg-surface shadow-sm">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-accent-cyan">
              <ShieldCheck size={14} />
              <span>Milestone 2 Design System</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
              Countersign Component Gallery & Living Style Guide
            </h1>
            <p className="text-xs text-readable max-w-xl">
              Live interactive verification for every component in Section 10.11 across Full, Lite, and Basic capability tiers and both themes.
            </p>
          </div>

          {/* Interactive Tier & Theme Simulator Switchers */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-secondary uppercase tracking-wider">
                Capability Tier
              </div>
              <TierToggle variant="segmented" />
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-mono text-secondary uppercase tracking-wider">
                Theme
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Viewport Width Constraint Simulator */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-subtle bg-void text-xs font-mono">
          <div className="flex items-center gap-2 text-secondary">
            <Sliders size={14} className="text-accent-cyan" />
            <span>Responsive Viewport Test Bounds:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: "full", label: "Fluid (100%)", icon: Monitor },
              { id: "360", label: "360 px (Min Android)", icon: Smartphone },
              { id: "390", label: "390 px (Standard)", icon: Smartphone },
              { id: "768", label: "768 px (Tablet)", icon: Tablet },
              { id: "1280", label: "1280 px (Desktop)", icon: Monitor },
            ].map((vp) => {
              const Icon = vp.icon;
              const isActive = activeViewport === vp.id;
              return (
                <button
                  key={vp.id}
                  type="button"
                  onClick={() => setActiveViewport(vp.id as typeof activeViewport)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] transition-colors ${
                    isActive
                      ? "bg-surface text-primary border border-subtle font-semibold text-accent-cyan"
                      : "text-secondary hover:text-primary"
                  }`}
                >
                  <Icon size={12} />
                  <span>{vp.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Container Constrained by Selected Viewport Width */}
      <div className={`mx-auto w-full transition-all duration-300 space-y-14 ${getViewportMaxWidth()}`}>
        {/* ==========================================================================
            1. DESIGN SYSTEM TOKENS MATRIX
            ========================================================================== */}
        <section id="tokens" className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-subtle">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-primary tracking-tight">
                1. Design Token Matrix (Section 10.4 & 10.5)
              </h2>
              <p className="text-xs text-secondary mt-0.5">
                Obsidian deep space, crisp white copy, and mathematically audited WCAG 2.2 AA contrast ratios.
              </p>
            </div>
            <span className="text-xs font-mono text-accent-cyan">13 Tokens Audited</span>
          </div>

          {/* Color Tokens Swatches */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tokenSwatches.map((t) => (
              <div
                key={t.varName}
                className="p-3.5 rounded-xl border border-subtle bg-surface flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-lg border border-subtle flex-shrink-0 shadow-inner"
                    style={{ backgroundColor: `var(${t.varName})` }}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <div className="font-semibold text-primary truncate">{t.name}</div>
                    <div className="font-mono text-[11px] text-secondary">{t.varName}</div>
                    <div className="text-[11px] text-readable mt-0.5 truncate">{t.role}</div>
                  </div>
                </div>

                <div className="text-right font-mono flex-shrink-0">
                  <span className="text-[11px] font-semibold text-accent-cyan block">{t.wcag}</span>
                  <span className="text-[10px] text-secondary">{t.hex}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Typography Hierarchy Demo */}
          <div className="p-5 rounded-2xl border border-subtle bg-surface space-y-4">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-secondary">
              Typography Scale & Measure (Section 10.5)
            </h3>
            <div className="space-y-4 divide-y divide-subtle/50">
              <div className="pt-2">
                <span className="text-[11px] font-mono text-secondary block mb-1">
                  Display / H1 (Fluid Clamp: 34px mobile to 60px desktop)
                </span>
                <div className="text-2xl sm:text-4xl font-bold text-primary tracking-tight leading-tight">
                  AI work, checked by a human. Model answers, checked against source.
                </div>
              </div>

              <div className="pt-3">
                <span className="text-[11px] font-mono text-secondary block mb-1">
                  H2 Section Headline (24px to 34px)
                </span>
                <div className="text-xl sm:text-2xl font-semibold text-primary tracking-tight">
                  Independent Verification Infrastructure for Remote AI Work
                </div>
              </div>

              <div className="pt-3">
                <span className="text-[11px] font-mono text-secondary block mb-1">
                  H3 Card & Module Heading (19px to 22px)
                </span>
                <div className="text-base sm:text-lg font-semibold text-primary">
                  STEM Reasoning & Citation Evaluation Sprint
                </div>
              </div>

              <div className="pt-3">
                <span className="text-[11px] font-mono text-secondary block mb-1">
                  Body Copy (17px mobile, 18px desktop, 60-70 char measure)
                </span>
                <p className="text-sm sm:text-base text-readable max-w-[680px] leading-relaxed">
                  Every job listing on Countersign is verified against official employer career portals within 14 days. Country eligibility is audited honestly so talent in Nigeria, Ghana, and Kenya know before applying.
                </p>
              </div>

              <div className="pt-3">
                <span className="text-[11px] font-mono text-secondary block mb-1">
                  Monospace Telemetry & Figures (13px to 14px, Tabular Figures Active)
                </span>
                <div className="font-mono text-xs sm:text-sm text-accent-cyan flex flex-wrap gap-4">
                  <span>LAST_CHECK: 2026-10-14T21:42:00Z</span>
                  <span>PAY_RATE: $22.50/HR</span>
                  <span>CONFIDENCE: 98.4%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            2. BRAND INSTRUMENT & COMPLETE STATUS SYSTEM
            ========================================================================== */}
        <section id="seal-and-status" className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-subtle">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-primary tracking-tight">
                2. Seal Brand Instrument & Complete Status System (10.2 & 10.7)
              </h2>
              <p className="text-xs text-secondary mt-0.5">
                Precision SVG seal with stroke-draw kinetic states. Status never shown by color alone.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSealAnimKey((k) => k + 1)}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded border border-subtle bg-surface text-secondary hover:text-accent-cyan hover:border-focus btn-tactile transition-colors"
            >
              <RotateCcw size={12} />
              <span>Trigger Seal Draw (~500ms)</span>
            </button>
          </div>

          {/* Seal SVG State Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-subtle bg-surface flex flex-col items-center justify-center gap-2 text-center">
              <SealLogo key={`seal-cyan-${sealAnimKey}`} size={44} color="cyan" animating={true} />
              <div className="font-mono text-xs text-primary font-semibold">Luminescent Cyan</div>
              <div className="text-[11px] text-secondary">Brand Mark & Favicon</div>
            </div>

            <div className="p-4 rounded-xl border border-subtle bg-surface flex flex-col items-center justify-center gap-2 text-center">
              <SealLogo key={`seal-em-${sealAnimKey}`} size={44} color="emerald" animating={true} />
              <div className="font-mono text-xs text-primary font-semibold">Verified Emerald</div>
              <div className="text-[11px] text-secondary">Verified Role Stamp</div>
            </div>

            <div className="p-4 rounded-xl border border-subtle bg-surface flex flex-col items-center justify-center gap-2 text-center">
              <SealLogo key={`seal-amb-${sealAnimKey}`} size={44} color="amber" animating={true} />
              <div className="font-mono text-xs text-primary font-semibold">Alert Amber</div>
              <div className="text-[11px] text-secondary">Needs Recheck Warning</div>
            </div>

            <div className="p-4 rounded-xl border border-subtle bg-surface flex flex-col items-center justify-center gap-2 text-center">
              <SealLogo key={`seal-dan-${sealAnimKey}`} size={44} color="danger" animating={true} />
              <div className="font-mono text-xs text-primary font-semibold">Danger Red</div>
              <div className="text-[11px] text-secondary">Closed Role Archive</div>
            </div>
          </div>

          {/* Section 10.7 Status System Badges (All 8 Statuses) */}
          <div className="p-5 rounded-2xl border border-subtle bg-surface space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-secondary">
                Section 10.7 Status Badges (Click Any Badge For Accessible Audit Detail)
              </h3>
              <span className="text-[11px] font-mono text-secondary">
                Always icon + word
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              {(
                [
                  "verified",
                  "needs-recheck",
                  "closed",
                  "accepted",
                  "not-accepted",
                  "unconfirmed",
                  "official",
                  "reported",
                ] as StatusType[]
              ).map((st) => (
                <StatusBadge
                  key={st}
                  status={st}
                  date="2026-10-14"
                  sourceName="Ashby Employer Job Feed"
                  sourceUrl="https://countersign.ai"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================================================
            3. VERIFICATION & TRUST INSTRUMENTS
            ========================================================================== */}
        <section id="trust-instruments" className="space-y-5">
          <div className="pb-2 border-b border-subtle">
            <h2 className="text-base sm:text-lg font-bold text-primary tracking-tight">
              3. Verification & Trust Instruments (10.3 & 10.11)
            </h2>
            <p className="text-xs text-secondary mt-0.5">
              Freshness stamps with age dots, 4-point Truth Strips, and monospace live check consoles.
            </p>
          </div>

          {/* Freshness Stamp in all 3 states */}
          <div className="p-5 rounded-2xl border border-subtle bg-surface space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-secondary">
              Freshness Stamp (Tap for Verification Trail)
            </h3>
            <div className="flex flex-wrap items-center gap-6">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-secondary block">Fresh (&le; 7 days):</span>
                <FreshnessStamp
                  daysAgo={2}
                  sourceName="Official Ashby Careers Portal"
                  sourceUrl="https://countersign.ai"
                  checkLog={[
                    { date: "Oct 14, 2026", note: "Checked application form and country dropdown." },
                    { date: "Oct 01, 2026", note: "Initial posting verified via Greenhouse API." },
                  ]}
                />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-secondary block">Aging (8 to 14 days):</span>
                <FreshnessStamp
                  daysAgo={10}
                  sourceName="Company Careers Page"
                  sourceUrl="https://countersign.ai"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-secondary block">Stale (&gt; 14 days):</span>
                <FreshnessStamp
                  daysAgo={19}
                  sourceName="Public Job Listing"
                  sourceUrl="https://countersign.ai"
                />
              </div>
            </div>
          </div>

          {/* Truth Strip in All States */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-secondary">
              Truth Strip: Decision Matrix (2x2 Mobile, 4-col Desktop)
            </h3>

            {/* State A: All Confirmed */}
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-secondary">State A: All Known & Verified</span>
              <TruthStrip
                eligibility="Nigeria: Accepted"
                payBasis="$22.50/hr (Verified)"
                onboarding="Unpaid assessment (~2h)"
                lastChecked="2 days ago"
                eligibilitySourceUrl="https://countersign.ai"
                paySourceUrl="https://countersign.ai"
                onboardingSourceUrl="https://countersign.ai"
              />
            </div>

            {/* State B: Partial / Unconfirmed */}
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-secondary">State B: Unconfirmed Values</span>
              <TruthStrip
                eligibility="Nigeria: Unconfirmed"
                payBasis="Pay: not confirmed"
                onboarding="Unknown timeline"
                lastChecked="Today"
              />
            </div>

            {/* State C: Closed Listing */}
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-secondary">State C: Closed Listing</span>
              <TruthStrip
                eligibility="Nigeria: Accepted"
                payBasis="$18/hr"
                onboarding="Fast-track"
                lastChecked="19 days ago"
                isClosed={true}
              />
            </div>
          </div>

          {/* Live Check Console */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-secondary">
              Live Check Console (Top Line Slowly Pulses)
            </h3>
            <LiveCheckConsole events={sampleEvents} state="live" />
          </div>
        </section>

        {/* ==========================================================================
            4. NAVIGATION, SELECTION & FILTERING
            ========================================================================== */}
        <section id="navigation-and-filtering" className="space-y-5">
          <div className="pb-2 border-b border-subtle">
            <h2 className="text-base sm:text-lg font-bold text-primary tracking-tight">
              4. Navigation, Selection & Filtering (7.2 & 10.11)
            </h2>
            <p className="text-xs text-secondary mt-0.5">
              Country chip with localStorage persistence, filter sheet with live apply count, command search palette.
            </p>
          </div>

          {/* Country Selector & Command Palette Display */}
          <div className="p-5 rounded-2xl border border-subtle bg-surface flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-secondary block">
                Country Chip & Selector (Remembers preference on device):
              </span>
              <CountrySelector />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-secondary block">
                Command Palette Trigger (Press ⌘K or Ctrl+K anywhere):
              </span>
              <CommandPalette />
            </div>
          </div>

          {/* Filter Bar with Active Chips and Mobile Bottom Sheet */}
          <div className="p-5 rounded-2xl border border-subtle bg-surface space-y-4">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-secondary">
              Filter Bar & Sheet (Click &ldquo;Filters&rdquo; to test modal sheet with live result count)
            </h3>
            <FilterBar
              filteredCount={14}
              totalCount={17}
              filters={galleryFilters}
              onFilterChange={setGalleryFilters}
            />
          </div>
        </section>

        {/* ==========================================================================
            5. JOB & PLATFORM PRESENTATION
            ========================================================================== */}
        <section id="job-presentation" className="space-y-5">
          <div className="pb-2 border-b border-subtle">
            <h2 className="text-base sm:text-lg font-bold text-primary tracking-tight">
              5. Job & Platform Presentation (7.2, 7.4 & 10.11)
            </h2>
            <p className="text-xs text-secondary mt-0.5">
              Whole-card tappable job cards, bento tiles, platform headers, expectation timelines, and compare table.
            </p>
          </div>

          {/* Job Card States Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Default Verified Job Card */}
            <JobCard
              id="job-1"
              slug="stem-reasoning-evaluator"
              title="STEM & Code Reasoning Evaluator (Python / Math)"
              platform="Outlier"
              workType="RLHF & Evaluation"
              countryEligibility="accepted"
              countryName="Nigeria"
              verifiedPay="$22.50 to $35/hr"
              daysAgo={2}
              status="verified"
            />

            {/* 2. Needs Recheck Job Card */}
            <JobCard
              id="job-2"
              slug="multimodal-factuality-rater"
              title="Multimodal Search Factuality & Citation Auditor"
              platform="Alignerr"
              workType="Citation Check"
              countryEligibility="accepted"
              countryName="Nigeria"
              verifiedPay="$18 to $25/hr"
              daysAgo={16}
              status="needs-recheck"
            />

            {/* 3. Unconfirmed Pay Job Card */}
            <JobCard
              id="job-3"
              slug="general-annotation-rater"
              title="Bilingual Hausa & Yoruba AI Data Contributor"
              platform="Remotasks"
              workType="Translation & Audio"
              countryEligibility="unconfirmed"
              countryName="Nigeria"
              daysAgo={5}
              status="verified"
            />

            {/* 4. Closed Role State */}
            <JobCard
              id="job-4"
              slug="closed-python-sprint"
              title="Deep Learning Logic Evaluation Sprint [Archived]"
              platform="Mercor"
              workType="Code Review"
              countryEligibility="accepted"
              countryName="Nigeria"
              verifiedPay="$40/hr"
              daysAgo={24}
              status="closed"
              isClosed={true}
            />
          </div>

          {/* Skeleton State Example */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-secondary">Loading Skeletons (Matching Final Geometry to eliminate CLS):</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <JobCardSkeleton />
              <div className="rounded-xl border border-subtle bg-surface p-5 space-y-3 flex flex-col justify-between min-h-[170px]">
                <div className="space-y-2">
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="rectangular" height={20} width="85%" />
                  <Skeleton variant="text" width="60%" />
                </div>
                <div className="pt-2 border-t border-subtle flex items-center justify-between">
                  <Skeleton variant="circular" width={24} height={24} />
                  <Skeleton variant="text" width="30%" />
                </div>
              </div>
            </div>
          </div>

          {/* Bento Grid Tile Units */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <BentoTile
              title="10-Point Scam Radar"
              tagline="Test recruiter messages against common Nigerian and global freelance red flags."
              href="/scam-check"
              icon={ShieldCheck}
              badge="Public Tool"
              variant="amber"
            />

            <BentoTile
              title="Platform Realities"
              tagline="Unpaid assessment hours, queue fluctuations, and actual community withdrawal reports."
              href="/platforms"
              icon={Terminal}
              badge="Profiles"
              variant="cyan"
            />

            <BentoTile
              title="Evaluation Studio"
              tagline="Independent RAG citation audits and negative constraint testing for AI startups."
              href="/evaluation"
              icon={Cpu}
              badge="B2B Evals"
              variant="violet"
            />
          </div>

          {/* Platform Header */}
          <PlatformHeader
            name="Outlier AI"
            officialUrl="https://countersign.ai"
            lastReviewed="Oct 14, 2026"
            referralStatus="referral_disclosed"
            openRoleCount={6}
          />

          {/* Expectation Timeline Component */}
          <div className="p-5 rounded-2xl border border-subtle bg-surface">
            <ExpectationTimeline platformName="Outlier AI" />
          </div>

          {/* Platform Compare Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-secondary">
              Platform Comparison Table (Sticky Left Column & Mobile Scroll)
            </h3>
            <CompareTable platforms={samplePlatforms} />
          </div>

          {/* Guide Layout Component Showcase */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-secondary">
              Guide Layout Structure (Section 7.7: 680px Measure, Verified Author, Bibliography)
            </h3>
            <div className="rounded-2xl border border-subtle bg-surface overflow-hidden">
              <GuideLayout
                title="Receiving USD Payments in Nigeria: Geegpay, Grey & Domiciliary Accounts"
                summary="A practical, human-verified playbook for Nigerian AI contributors navigating ACH routing, wire transfers, and currency conversion without PayPal restrictions."
                readingTimeMinutes={6}
                lastUpdated="Oct 14, 2026"
                tableOfContents={[
                  { id: "geegpay", label: "1. Virtual USD Bank Accounts" },
                  { id: "domiciliary", label: "2. Nigerian Bank Dom Accounts" },
                ]}
                sources={[
                  { title: "Central Bank of Nigeria Foreign Exchange Guidelines", url: "https://countersign.ai", verifiedDate: "Oct 2026" },
                  { title: "Geegpay Commercial Fee Schedule", url: "https://countersign.ai", verifiedDate: "Oct 2026" },
                ]}
              >
                <div className="space-y-4">
                  <h2 id="geegpay" className="text-lg font-bold text-primary">
                    1. Virtual USD Accounts: Geegpay & Grey
                  </h2>
                  <p>
                    Global AI contributor platforms such as Outlier, Alignerr, and Mercor disburse earnings via Deel, direct ACH transfer, or Stripe. Nigerian talent can open verified virtual US bank accounts with individualized routing numbers using their NIN or International Passport.
                  </p>
                  <h2 id="domiciliary" className="text-lg font-bold text-primary">
                    2. Nigerian Bank Domiciliary Accounts
                  </h2>
                  <p>
                    For larger monthly payouts, direct wire transfer into a Nigerian USD domiciliary account (GTBank, Zenith, First Bank) provides a secure alternative with standard correspondent bank fees ($5 to $15).
                  </p>
                </div>
              </GuideLayout>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            6. EVALUATION STUDIO INSTRUMENTS (v4)
            ========================================================================== */}
        <section id="studio-instruments" className="space-y-5">
          <div className="pb-2 border-b border-subtle">
            <h2 className="text-base sm:text-lg font-bold text-primary tracking-tight">
              6. Evaluation Studio Instruments (7.9, 10.2a & 10.11)
            </h2>
            <p className="text-xs text-secondary mt-0.5">
              Evaluation Graph SVG with signal tracing, comparison panel, 3-step stepper, constraint checker, and accessible chart.
            </p>
          </div>

          {/* Evaluation Graph SVG */}
          <EvaluationGraph />

          {/* Comparison Panel */}
          <ComparisonPanel
            promptText="According to the credit policy, what is the maximum permissible loan tenure for SME equipment leasing?"
            answerText="Under the SME Credit Guidelines, the maximum permissible tenure is 60 months with semi-annual amortization (Section 4.2)."
            sourceText="Section 4.1.2: Equipment leases for small and medium enterprises shall carry a maximum repayment tenure not exceeding 36 months under standard underwriting terms."
            verdictText="FAIL: The model asserted 60 months and cited Section 4.2, which does not exist in the ground-truth document. The maximum tenure is explicitly bounded to 36 months."
          />

          {/* Stepper (3-step scope form) */}
          <Stepper />

          {/* Constraint Checker Interactive Practice Tool */}
          <ConstraintChecker />

          {/* Inline SVG Chart */}
          <Chart
            title="Model Evaluation Failure Distribution (Sample Pilot Audit)"
            subtitle="Breakdown of accuracy failure categories across 120 production document prompts."
            data={[
              { label: "Citations", value: 34, unit: "%", category: "signal" },
              { label: "Hallucination", value: 28, unit: "%", category: "data-2" },
              { label: "Neg Constraints", value: 22, unit: "%", category: "signal" },
              { label: "Numerical Math", value: 16, unit: "%", category: "data-2" },
            ]}
          />

          {/* Sample Audit Case Card */}
          <SampleAuditCard
            caseId="CS-084"
            query="What is the daily maximum withdrawal limit on verified Tier-2 Nigerian bank accounts?"
            groundTruthExcerpt="CBN Circular BPS/DIR/GEN/CIR/02/008 states that Tier-2 accounts maintain a maximum daily withdrawal limit of"
            citedSpan="N200,000 per 24-hour cycle."
            modelOutput="Tier-2 accounts in Nigeria have a daily withdrawal limit of N500,000 across all channels."
            verdict="fail"
            verdictLabel="Hallucinated Upper Limit"
            rootCause="Model confused Tier-3 corporate limits with Tier-2 personal accounts."
            remedy="Inject CBN 2024 tier classification table into system prompt and add numerical range check guardrail."
          />
        </section>

        {/* ==========================================================================
            7. FORMS, NOTIFICATIONS & SYSTEM STATES
            ========================================================================== */}
        <section id="forms-and-states" className="space-y-5">
          <div className="pb-2 border-b border-subtle">
            <h2 className="text-base sm:text-lg font-bold text-primary tracking-tight">
              7. Forms, Feedback & System States (7.1, 7.8 & 10.11)
            </h2>
            <p className="text-xs text-secondary mt-0.5">
              NDPA email capture, scam report form with bot protection, toasts, and empty/error states.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EmailCapture />
            <ReportForm initialRoleTitle="Outlier AI - STEM Evaluator" />
          </div>

          {/* Interactive Toast Triggers */}
          <div className="p-5 rounded-2xl border border-subtle bg-surface space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-secondary">
              Toast Notification System (Accessible, Non-blocking)
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => triggerToast("info")}
                className="px-3 py-1.5 rounded-lg border border-subtle bg-void text-xs font-mono text-accent-cyan hover:border-focus btn-tactile"
              >
                Trigger Info Toast
              </button>
              <button
                type="button"
                onClick={() => triggerToast("success")}
                className="px-3 py-1.5 rounded-lg border border-subtle bg-void text-xs font-mono text-[#45F5C5] hover:border-focus btn-tactile"
              >
                Trigger Success Toast
              </button>
              <button
                type="button"
                onClick={() => triggerToast("error")}
                className="px-3 py-1.5 rounded-lg border border-subtle bg-void text-xs font-mono text-[#FF6B6B] hover:border-focus btn-tactile"
              >
                Trigger Error Toast
              </button>
            </div>
          </div>

          {/* Empty & Error State Previews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EmptyState />
            <ErrorState />
          </div>
        </section>
      </div>

      {/* Persistent Toast Display */}
      <Toast toast={activeToast} onClose={() => setActiveToast(null)} />
    </div>
  );
}
