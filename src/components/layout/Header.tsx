"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { CountrySelector } from "@/components/ui/CountrySelector";
import { CommandPalette } from "@/components/ui/CommandPalette";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Roles", href: "/jobs" },
    { label: "Platforms", href: "/platforms" },
    { label: "Pay rates", href: "/rates" },
    { label: "Training", href: "/training" },
    { label: "Task check", href: "/task-check" },
    { label: "CV builder", href: "/cv-builder" },
    { label: "Benchmark", href: "/benchmark" },
    { label: "Check an offer", href: "/scam-check" },
    { label: "For AI teams", href: "/evaluation" },
  ];

  return (
    <div className="cs-glass-head sticky top-0 z-50 w-full transition-colors">
      <header className="max-w-[1240px] mx-auto px-3 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Logo + Seal (≥44px tap target) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 min-h-[44px] min-w-[44px] text-ink hover:text-[var(--brand-ink)] transition-colors focus-visible:outline-offset-2"
            aria-label="TraceBase home"
          >
            <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true" className="shrink-0 text-[var(--brand-ink)]">
              <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2.4" />
              <circle cx="16" cy="16" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M11.5 16.4l3.1 3.1 6-6.4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-extrabold text-[19px] sm:text-[21px] tracking-[-0.025em]">
              TraceBase
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[16px] font-semibold" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 text-secondary hover:text-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side: Country Chip + Search + Theme Toggle + Mobile Menu Button */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <CountrySelector compact={true} />
          <CommandPalette />
          
          {/* Theme toggle visible on desktop; moved into mobile menu below 640px to eliminate header overflow */}
          <div className="hidden sm:inline-flex">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Hamburger (≥44px tap target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-subtle bg-sheet text-secondary hover:text-ink transition-colors"
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-rule bg-sheet px-4 py-4 space-y-4 shadow-lg animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center px-3 min-h-[44px] rounded-lg text-base font-bold text-ink hover:bg-[var(--brand-tint)] hover:text-[var(--brand-ink)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-subtle flex items-center justify-between">
            <span className="text-sm font-semibold text-secondary">Appearance</span>
            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  );
}
