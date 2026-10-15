"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface BentoTileProps {
  title: string;
  tagline: string;
  href: string;
  icon: React.ReactNode | React.ComponentType<{ className?: string; size?: number }>;
  badge?: string;
  variant?: "cyan" | "emerald" | "violet" | "amber";
  className?: string;
  children?: React.ReactNode;
}

/**
 * BentoTile (Section 10.6 & 10.11)
 * Modular bento grid unit with subtle depth shift, fine-pointer cursor spotlight (Full tier),
 * and clean typography.
 */
export function BentoTile({
  title,
  tagline,
  href,
  icon,
  badge,
  variant = "cyan",
  className = "",
  children,
}: BentoTileProps) {
  const tileRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!tileRef.current) return;
    const rect = tileRef.current.getBoundingClientRect();
    tileRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    tileRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const variantColors = {
    cyan: "text-[#3DEBFF] border-[#3DEBFF]/30 bg-[#3DEBFF]/10",
    emerald: "text-[#45F5C5] border-[#45F5C5]/30 bg-[#45F5C5]/10",
    violet: "text-[#8B7CFF] border-[#8B7CFF]/30 bg-[#8B7CFF]/10",
    amber: "text-[#FFC66D] border-[#FFC66D]/30 bg-[#FFC66D]/10",
  }[variant];

  return (
    <Link
      ref={tileRef}
      href={href}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-2xl border border-subtle bg-surface spotlight-card card-interactive card-press p-5 sm:p-6 flex flex-col justify-between overflow-hidden transition-all hover:border-focus ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2.5 rounded-xl border ${variantColors}`}>
            {React.isValidElement(icon)
              ? icon
              : icon
              ? React.createElement(icon as React.ComponentType<{ size?: number; className?: string }>, {
                  size: 20,
                  className: "stroke-[2]",
                })
              : null}
          </div>

          <div className="flex items-center gap-2">
            {badge && (
              <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-full border ${variantColors}`}>
                {badge}
              </span>
            )}
            <ArrowUpRight
              size={18}
              className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity"
              aria-hidden="true"
            />
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-semibold text-primary group-hover:text-accent-cyan transition-colors">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-readable mt-1.5 leading-relaxed">
          {tagline}
        </p>
      </div>

      {children && <div className="mt-4 pt-3 border-t border-subtle">{children}</div>}
    </Link>
  );
}
