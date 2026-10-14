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
    { label: "Nigeria Hub", href: "/countries/nigeria" },
    { label: "Scam Check", href: "/scam-check" },
    { label: "Studio", href: "/studio" },
    { label: "Gallery", href: "/gallery" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-subtle glass-header transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Name + Country Selector */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-primary hover:opacity-90 transition-opacity"
            aria-label="Countersign Homepage"
          >
            <SealLogo size={28} color="cyan" />
            <span className="font-semibold text-lg tracking-tight text-primary">
              Countersign
            </span>
          </Link>
          <CountrySelector />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-secondary hover:text-primary transition-colors"
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
