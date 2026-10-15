"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SealLogo } from "@/components/ui/SealLogo";
import { TierToggle } from "@/components/layout/TierToggle";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

import { CountrySelector } from "@/components/ui/CountrySelector";
import { CommandPalette } from "@/components/ui/CommandPalette";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Jobs", href: "/jobs" },
    { label: "Platforms", href: "/platforms" },
    { label: "Compare", href: "/compare" },
    { label: "Hub (NG)", href: "/countries/nigeria" },
    { label: "Guides", href: "/guides" },
    { label: "Scam Check", href: "/scam-check" },
    { label: "Studio", href: "/evaluation" },
    { label: "Account", href: "/account" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-header transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-cyan-400/30 after:to-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Name + Country Selector */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-primary group"
            aria-label="Countersign Homepage"
          >
            <div className="relative flex items-center justify-center transition-transform group-hover:scale-105">
              <SealLogo size={28} color="cyan" />
              <div className="absolute inset-0 rounded-full bg-cyan-400/25 blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-primary group-hover:text-cyan-300 transition-colors">
              Countersign
            </span>
          </Link>
          <CountrySelector />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-secondary hover:text-primary hover:bg-white/[0.06] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side: Command Palette + Data-Saver Toggle + Theme Toggle + Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <CommandPalette />
          <TierToggle />
          <ThemeToggle />

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded border border-subtle bg-surface text-secondary hover:text-primary transition-colors"
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
      </div>

      {/* Mobile Drawer (Accessible at 360 px) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-subtle bg-surface px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2.5" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-secondary hover:text-primary py-1.5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
