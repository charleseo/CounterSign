"use client";

import { useSyncExternalStore } from "react";
import { chooseTier, setTier, CapabilityTier } from "@/lib/tiers";

interface TierToggleProps {
  className?: string;
  showExplanation?: boolean;
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

export function TierToggle({ className = "", showExplanation = false }: TierToggleProps) {
  const tier = useSyncExternalStore(subscribeTier, getTierSnapshot, getServerTierSnapshot);
  const isLite = tier === "lite";

  const handleToggle = () => {
    const nextTier: CapabilityTier = isLite ? "full" : "lite";
    setTier(nextTier);
  };

  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        aria-pressed={isLite}
        title={
          isLite
            ? "Data-Saver is Active (<48KB payload, zero blur). Click to switch to Full experience."
            : "Click to activate Data-Saver mode for slow or expensive mobile connections."
        }
        className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono font-medium rounded border transition-colors border-subtle bg-surface text-secondary hover:text-primary hover:border-focus"
      >
        <span
          className={`w-2 h-2 rounded-full transition-colors ${
            isLite ? "bg-[#45F5C5]" : "bg-[#94A3B8]"
          }`}
          aria-hidden="true"
        />
        <span>Data-Saver: {isLite ? "ON" : "OFF"}</span>
      </button>

      {showExplanation && (
        <span className="mt-1 text-[11px] text-secondary">
          {isLite
            ? "Lite mode active: minimal data, flat surfaces, under 48 KB."
            : "Full mode: enhanced glass and subtle card spotlights."}
        </span>
      )}
    </div>
  );
}
