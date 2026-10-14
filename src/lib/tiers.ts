/**
 * lib/tiers.ts
 * Capability Tier and Theme detection according to Section 10.10 & Section 16 of the Master Plan.
 */

export type CapabilityTier = "full" | "lite" | "basic";
export type ThemeMode = "dark" | "light";

export const TIER_STORAGE_KEY = "countersign_tier";
export const THEME_STORAGE_KEY = "countersign_theme";

/**
 * Determine the initial capability tier.
 * Prioritizes user preference, reduced motion/data hints, and slow connection indicators.
 */
export function chooseTier(): CapabilityTier {
  if (typeof window === "undefined") return "full";

  const stored = localStorage.getItem(TIER_STORAGE_KEY);
  if (stored === "lite" || stored === "full" || stored === "basic") {
    return stored;
  }

  // Auto-detect slow connections or low-power indicators
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const prefersReducedData = window.matchMedia("(prefers-reduced-data: reduce)").matches;

  // @ts-expect-error Network Information API is not in all browser type definitions
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const hasSaveData = connection && connection.saveData === true;
  const isSlowNetwork = connection && /2g|3g/.test(connection.effectiveType || "");

  // @ts-expect-error Device Memory API
  const isLowMemory = navigator.deviceMemory && navigator.deviceMemory <= 2;

  if (isSlowNetwork && connection.effectiveType === "slow-2g") {
    return "basic";
  }

  if (prefersReducedMotion || prefersReducedData || hasSaveData || isSlowNetwork || isLowMemory) {
    return "lite";
  }

  return "full";
}

/**
 * Apply and persist the capability tier.
 */
export function setTier(tier: CapabilityTier): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TIER_STORAGE_KEY, tier);
  document.documentElement.dataset.tier = tier;
  window.dispatchEvent(new CustomEvent("tierchange", { detail: tier }));
}

/**
 * Determine theme mode. Dark theme is default.
 */
export function chooseTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return "dark"; // Dark is default per Master Plan
}

/**
 * Apply and persist theme mode.
 */
export function setTheme(theme: ThemeMode): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
}
