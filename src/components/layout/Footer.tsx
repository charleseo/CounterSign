import React from "react";
import Link from "next/link";
import { SealLogo } from "@/components/ui/SealLogo";
import { TierToggle } from "@/components/layout/TierToggle";

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-subtle bg-surface transition-colors py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <SealLogo size={24} color="emerald" />
              <span className="font-semibold text-base text-primary tracking-tight">
                Countersign
              </span>
            </div>
            <p className="text-sm text-readable max-w-md leading-relaxed">
              AI work, checked by a human. Model answers, checked against the source.
            </p>
            <p className="text-xs text-secondary max-w-md leading-relaxed">
              Every job listing verified within 14 days. Independent service. We never sell ranking.
            </p>
          </div>

          {/* Quick Directory Links */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary">
              Directory
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jobs" className="text-secondary hover:text-primary transition-colors">
                  Verified AI Jobs
                </Link>
              </li>
              <li>
                <Link href="/platforms" className="text-secondary hover:text-primary transition-colors">
                  Platform Profiles
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-secondary hover:text-primary transition-colors">
                  Practical Guides
                </Link>
              </li>
              <li>
                <Link href="/scam-check" className="text-secondary hover:text-primary transition-colors">
                  10-Point Scam Check
                </Link>
              </li>
            </ul>
          </div>

          {/* Evaluation & Legal */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary">
              Platform & Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-secondary hover:text-primary transition-colors">
                  About Countersign
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="text-secondary hover:text-primary transition-colors">
                  Verification Methodology
                </Link>
              </li>
              <li>
                <Link href="/evaluation" className="text-secondary hover:text-primary transition-colors">
                  Evaluation Studio
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-secondary hover:text-primary transition-colors">
                  Privacy & NDPA 2023
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-secondary hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier & Preference Bar */}
        <div className="pt-6 border-t border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs text-secondary">Connection Preference:</span>
            <TierToggle showExplanation={true} />
          </div>

          <p className="text-xs text-secondary font-mono">
            &copy; 2026 Countersign. Human-verified AI infrastructure.
          </p>
        </div>
      </div>
    </footer>
  );
}
