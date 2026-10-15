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

  const glowColors = {
    cyan: "#3DEBFF",
    emerald: "#45F5C5",
    violet: "#8B7CFF",
    amber: "#FFC66D",
  }[variant];

  return (
    <Link
      ref={tileRef}
      href={href}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-3xl glass-card spotlight-card card-press p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-all ${className}`}
    >
      {/* Ambient variant corner glow */}
      <div
        className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-3xl pointer-events-none opacity-20 group-hover:opacity-45 transition-opacity"
        style={{ backgroundColor: glowColors }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-2xl border ${variantColors} group-hover:scale-105 transition-transform shadow-sm`}>
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
