"use client";

import { useSyncExternalStore } from "react";
import { chooseTier, setTier, CapabilityTier } from "@/lib/tiers";

interface TierToggleProps {
  className?: string;
  showExplanation?: boolean;
  variant?: "toggle" | "segmented";
}

function subscribeTier(callback: () => void) {
  window.addEventListener("tierchange", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("tierchange", callback);
    window.removeEventListener("storage", callback);
  };
}

function getTierSnapshot(): CapabilityTier {
  return chooseTier();
}

function getServerTierSnapshot(): CapabilityTier {
  return "full";
}

export function TierToggle({
  className = "",
  showExplanation = false,
  variant = "toggle",
}: TierToggleProps) {
  const tier = useSyncExternalStore(subscribeTier, getTierSnapshot, getServerTierSnapshot);

  const handleToggle = () => {
    // Cycle: full -> lite -> basic -> full
    const nextTier: CapabilityTier =
      tier === "full" ? "lite" : tier === "lite" ? "basic" : "full";
    setTier(nextTier);
  };

  if (variant === "segmented") {
    return (
      <div className={`inline-flex items-center p-1 rounded-lg border border-subtle bg-void font-mono text-xs ${className}`}>
        {(["full", "lite", "basic"] as CapabilityTier[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTier(t)}
            className={`px-3 py-1 rounded capitalize transition-colors ${
              tier === t
                ? "bg-surface text-primary border border-subtle font-semibold shadow-sm text-accent-cyan"
                : "text-secondary hover:text-primary"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    );
  }

  const isDataSaver = tier === "lite" || tier === "basic";

  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        aria-pressed={isDataSaver}
        title={`Current mode: ${tier.toUpperCase()}. Click to cycle (Full, Lite, Basic).`}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded border transition-colors border-subtle bg-surface text-secondary hover:text-primary hover:border-focus"
      >
        <span
          className={`w-2 h-2 rounded-full transition-colors ${
            tier === "full"
              ? "bg-[#94A3B8]"
              : tier === "lite"
              ? "bg-[#45F5C5]"
              : "bg-[#FFC66D]"
          }`}
          aria-hidden="true"
        />
        <span>Tier: <span className="uppercase text-primary font-semibold">{tier}</span></span>
      </button>

      {showExplanation && (
        <span className="mt-1 text-[11px] text-secondary">
          {tier === "full"
            ? "Full mode: glass headers and card spotlight edges."
            : tier === "lite"
            ? "Lite mode: minimal mobile data (<48KB), flat surfaces."
            : "Basic mode: ultra-lean text-first, zero animations, maximum battery conservation."}
        </span>
      )}
    </div>
  );
}
