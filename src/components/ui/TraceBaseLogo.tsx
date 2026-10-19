'use client';

import React from 'react';

interface TraceBaseLogoProps {
  size?: number;
  className?: string;
  showWordmark?: boolean;
  subtitle?: string;
}

export function TraceBaseLogo({
  size = 32,
  className = '',
  showWordmark = false,
  subtitle,
}: TraceBaseLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 group cursor-pointer ${className}`}>
      {/* SVG Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 group-hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          {/* Brand Primary Linear Gradient */}
          <linearGradient id="tb-shield-border" x1="4" y1="2" x2="32" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8A65FF" />
            <stop offset="50%" stopColor="#5A35C8" />
            <stop offset="100%" stopColor="#00C48C" />
          </linearGradient>

          {/* Core Radial Glow Gradient */}
          <radialGradient id="tb-core-glow" cx="18" cy="18" r="8" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8A65FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#5A35C8" stopOpacity="0.05" />
          </radialGradient>

          {/* Trace Circuit Gradient */}
          <linearGradient id="tb-circuit" x1="9" y1="9" x2="27" y2="27" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8A65FF" />
            <stop offset="100%" stopColor="#00C48C" />
          </linearGradient>
        </defs>

        {/* Outer Hexagonal Shield Foundation (Chamber) */}
        <path
          d="M18 3L31 10.5V25.5L18 33L5 25.5V10.5L18 3Z"
          stroke="url(#tb-shield-border)"
          strokeWidth="2.2"
          strokeLinejoin="round"
          className="opacity-95"
        />

        {/* Inner Precision Hexagon Ring */}
        <path
          d="M18 6.5L28 12.3V23.7L18 29.5L8 23.7V12.3L18 6.5Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
          className="text-rule opacity-40 group-hover:opacity-70 transition-opacity"
        />

        {/* Grounding Core Glow */}
        <circle cx="18" cy="18" r="7" fill="url(#tb-core-glow)" />

        {/* Cardinal Verification Traces */}
        {/* Top input trace */}
        <path d="M18 6.5V11.5" stroke="#8A65FF" strokeWidth="1.6" strokeLinecap="round" />
        {/* Bottom verification trace */}
        <path d="M18 24.5V29.5" stroke="#00C48C" strokeWidth="1.6" strokeLinecap="round" />
        {/* Left balance trace */}
        <path d="M8 18H12" stroke="#5A35C8" strokeWidth="1.6" strokeLinecap="round" />
        {/* Right evidence trace */}
        <path d="M24 18H28" stroke="#8A65FF" strokeWidth="1.6" strokeLinecap="round" />

        {/* Center Grounding Node (Diamond Core) */}
        <path
          d="M18 12.5L23.5 18L18 23.5L12.5 18L18 12.5Z"
          fill="#5A35C8"
          fillOpacity="0.25"
          stroke="url(#tb-circuit)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Verification Checkmark (Center) */}
        <path
          d="M15.5 18.2L17.2 19.9L21.2 15.8"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Micro Anchor Pins */}
        <circle cx="18" cy="6.5" r="1.3" fill="#8A65FF" />
        <circle cx="18" cy="29.5" r="1.3" fill="#00C48C" />
        <circle cx="8" cy="18" r="1.3" fill="#5A35C8" />
        <circle cx="28" cy="18" r="1.3" fill="#00C48C" />
      </svg>

      {/* Wordmark and Optional Subtitle */}
      {showWordmark && (
        <div className="flex flex-col">
          <span className="font-extrabold text-[19px] sm:text-[21px] tracking-[-0.03em] text-ink select-none leading-none">
            Trace<span className="text-[var(--brand-ink)]">Base</span>
          </span>
          {subtitle && (
            <span className="text-[10px] font-semibold text-secondary tracking-normal mt-0.5 select-none">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
