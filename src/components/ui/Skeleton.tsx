import React from "react";

export interface SkeletonProps {
  className?: string;
  variant?: "text" | "rectangular" | "circular" | "card";
  width?: string | number;
  height?: string | number;
}

/**
 * Skeleton (Section 10.11)
 * Accessible placeholder shapes that match final layout geometry to eliminate Cumulative Layout Shift (CLS).
 */
export function Skeleton({
  className = "",
  variant = "rectangular",
  width,
  height,
}: SkeletonProps) {
  const baseClasses = "animate-pulse bg-subtle/50 rounded";

  const variantClasses = {
    text: "h-3 w-full rounded",
    rectangular: "rounded-lg",
    circular: "rounded-full",
    card: "h-40 w-full rounded-xl border border-subtle bg-surface",
  }[variant];

  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <div
      aria-hidden="true"
      className={`${baseClasses} ${variantClasses} ${className}`}
      style={style}
    />
  );
}

/**
 * JobCardSkeleton: Matches exact dimensions of JobCard
 */
export function JobCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="rounded-xl border border-subtle bg-surface p-4 sm:p-5 flex flex-col justify-between gap-3 min-h-[170px] animate-pulse"
    >
      <div className="flex items-center justify-between">
        <div className="h-4 bg-void border border-subtle rounded w-28" />
        <div className="h-5 bg-void border border-subtle rounded-full w-20" />
      </div>
      <div className="space-y-2">
        <div className="h-5 bg-void border border-subtle rounded w-3/4" />
        <div className="h-4 bg-void border border-subtle rounded w-1/2" />
      </div>
      <div className="pt-2 border-t border-subtle flex items-center justify-between">
        <div className="h-4 bg-void border border-subtle rounded w-24" />
        <div className="h-4 bg-void border border-subtle rounded w-20" />
      </div>
    </div>
  );
}
