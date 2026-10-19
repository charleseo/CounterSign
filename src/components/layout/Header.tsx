"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { CountrySelector } from "@/components/ui/CountrySelector";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { TraceBaseLogo } from "@/components/ui/TraceBaseLogo";
import { ChevronDown, FileText, CheckSquare, ShieldAlert, Calculator, Award, BookOpen } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const toolsMenuRef = useRef<HTMLDivElement>(null);

  // Close tools dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(e.target as Node)) {
        setToolsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toolItems = [
    { label: "CV builder", href: "/cv-builder", desc: "1-page ATS resume with verification ID", icon: FileText },
    { label: "Task pre-check", href: "/task-check", desc: "Catch word count and negative constraint traps", icon: CheckSquare },
    { label: "Check an offer", href: "/scam-check", desc: "10-point recruiter and scam offer check", icon: ShieldAlert },
    { label: "Payout calculator", href: "/payout-calculator", desc: "Compare fees across Deel, Geegpay and AirTM", icon: Calculator },
    { label: "Model benchmark", href: "/benchmark", desc: "Negative constraint leaderboards by human audit", icon: Award },
    { label: "Jargon decoder", href: "/glossary", desc: "SFT, RLHF, DPO and reviewer notes explained", icon: BookOpen },
  ];

  return (
    <div className="cs-glass-head sticky top-0 z-50 w-full transition-colors">
      <header className="max-w-[1240px] mx-auto px-3 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Logo (≥44px tap target) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/"
            className="group inline-flex items-center min-h-[44px] min-w-[44px] text-ink transition-colors focus-visible:outline-offset-2"
            aria-label="TraceBase home"
          >
            <TraceBaseLogo size={32} showWordmark={true} />
          </Link>
        </div>

        {/* Desktop Navigation Links (Compact, perfectly aligned) */}
        <nav className="max-lg:hidden lg:flex items-center gap-5 xl:gap-7 text-[15px] font-semibold" aria-label="Main Navigation">
          <Link
            href="/jobs"
            className="py-2 text-secondary hover:text-ink transition-colors"
          >
            Roles
          </Link>

          <Link
            href="/platforms"
            className="py-2 text-secondary hover:text-ink transition-colors"
          >
            Platforms & rates
          </Link>

          <Link
            href="/training"
            className="py-2 text-secondary hover:text-ink transition-colors"
          >
            Training
          </Link>

          {/* Tools Dropdown */}
          <div ref={toolsMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              className="py-2 inline-flex items-center gap-1 text-secondary hover:text-ink transition-colors cursor-pointer select-none"
              aria-expanded={toolsDropdownOpen}
              aria-haspopup="true"
            >
              <span>Tools</span>
              <ChevronDown size={14} className={`transition-transform duration-150 ${toolsDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {toolsDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 rounded-2xl border border-rule bg-sheet shadow-2xl p-2 z-50 space-y-1 animate-in fade-in duration-100">
                {toolItems.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setToolsDropdownOpen(false)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-elevated/60 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-surface border border-rule text-[var(--brand-ink)] group-hover:border-[var(--brand-ink)] shrink-0">
                        <Icon size={15} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-ink group-hover:text-[var(--brand-ink)] transition-colors">
                          {tool.label}
                        </div>
                        <div className="text-[11px] text-secondary line-clamp-1 mt-0.5">
                          {tool.desc}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            href="/evaluation"
            className="py-2 text-secondary hover:text-ink transition-colors"
          >
            For AI teams
          </Link>
        </nav>

        {/* Right Side: Country Chip + Command Search + Theme Toggle + Mobile Menu Button */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <CountrySelector compact={true} />
          <CommandPalette />

          {/* Theme toggle visible on desktop */}
          <div className="hidden sm:inline-flex">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Hamburger (≥44px tap target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-subtle bg-sheet text-secondary hover:text-ink transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Organized into structured categories) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-rule bg-sheet px-4 py-5 space-y-5 shadow-2xl max-h-[85vh] overflow-y-auto animate-in fade-in duration-150">
          <nav className="space-y-4" aria-label="Mobile Navigation">
            {/* Core Links */}
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-muted px-3 normal-case">
                Explore
              </div>
              <Link
                href="/jobs"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center px-3 min-h-[44px] rounded-lg text-sm font-bold text-ink hover:bg-[var(--brand-tint)] hover:text-[var(--brand-ink)] transition-colors"
              >
                Roles
              </Link>
              <Link
                href="/platforms"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center px-3 min-h-[44px] rounded-lg text-sm font-bold text-ink hover:bg-[var(--brand-tint)] hover:text-[var(--brand-ink)] transition-colors"
              >
                Platforms & rates
              </Link>
              <Link
                href="/training"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center px-3 min-h-[44px] rounded-lg text-sm font-bold text-ink hover:bg-[var(--brand-tint)] hover:text-[var(--brand-ink)] transition-colors"
              >
                Training & certificates
              </Link>
              <Link
                href="/evaluation"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center px-3 min-h-[44px] rounded-lg text-sm font-bold text-ink hover:bg-[var(--brand-tint)] hover:text-[var(--brand-ink)] transition-colors"
              >
                For AI teams
              </Link>
            </div>

            {/* Tools Grid in Mobile Menu */}
            <div className="space-y-1 pt-2 border-t border-rule/60">
              <div className="text-[11px] font-bold text-muted px-3 normal-case">
                Contributor tools
              </div>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {toolItems.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-lg border border-rule/60 bg-surface text-xs font-semibold text-ink hover:border-[var(--brand-ink)] transition-colors flex flex-col justify-center min-h-[48px]"
                  >
                    <span>{tool.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="pt-3 border-t border-subtle flex items-center justify-between">
            <span className="text-xs font-semibold text-secondary">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  );
}
