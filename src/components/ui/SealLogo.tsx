import React from "react";

interface SealLogoProps {
  className?: string;
  size?: number;
  color?: "cyan" | "emerald" | "current";
}

/**
 * The Seal logo: a precision circular ring with an inner check mark.
 * Serves as Countersign's primary brand mark, favicon, and verification stamp.
 */
export function SealLogo({ className = "", size = 28, color = "cyan" }: SealLogoProps) {
  const colorMap = {
    cyan: "var(--accent-cyan)",
    emerald: "var(--accent-emerald)",
    current: "currentColor",
  };

  const strokeColor = colorMap[color];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Precision Ring */}
      <circle
        cx="16"
        cy="16"
        r="14"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Subtle Inner Concentric Ring Accent */}
      <circle
        cx="16"
        cy="16"
        r="11.5"
        stroke={strokeColor}
        strokeWidth="0.75"
        strokeDasharray="2 3"
        opacity="0.5"
      />
      {/* Precision Inner Checkmark (Countersign Approval) */}
      <path
        d="M10 16.5L14 20.5L22 11.5"
        stroke={strokeColor}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
