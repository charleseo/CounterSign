"use client";

import React, { useState } from "react";
import { CheckCircle2, RotateCcw } from "lucide-react";

export interface EvaluationGraphProps {
  className?: string;
  isMobileVertical?: boolean;
}

/**
 * EvaluationGraph (Section 10.2a & 10.11)
 * Bespoke inline SVG showing the 5-step verification instrument:
 * Prompt -> Bot Answer -> Source Check -> Human Verdict -> Report.
 * Uses pure CSS stroke-dashoffset (~1.2s) signal animation.
 * Solid surfaces where people read, under 10KB total, fully lit and static in Lite/Basic tiers.
 */
export function EvaluationGraph({
  className = "",
  isMobileVertical = false,
}: EvaluationGraphProps) {
  const [animKey, setAnimKey] = useState(0);

  const nodes = [
    { id: 1, label: "1. Prompt", sub: "User Query", x: 40, y: 70 },
    { id: 2, label: "2. Bot Answer", sub: "Raw Completion", x: 160, y: 70 },
    { id: 3, label: "3. Source Check", sub: "Doc Extraction", x: 280, y: 70 },
    { id: 4, label: "4. Human Verdict", sub: "Specialist Audit", x: 400, y: 70 },
    { id: 5, label: "5. Audit Report", sub: "Citations & Fixes", x: 520, y: 70 },
  ];

  return (
    <div
      className={`rounded-2xl border border-subtle bg-surface p-5 sm:p-6 space-y-5 ${className}`}
      aria-label="Five-step evaluation signal graph"
    >
      <div className="flex items-center justify-between pb-3 border-b border-subtle">
        <div className="space-y-0.5">
          <h3 className="text-sm font-semibold text-primary font-mono tracking-tight">
            How we check an answer
          </h3>
          <p className="text-xs text-secondary font-mono">
            How model answers are countersigned against reference truth
          </p>
        </div>

        <button
          type="button"
          onClick={() => setAnimKey((k) => k + 1)}
          className="p-1.5 rounded border border-subtle bg-void text-secondary hover:text-accent-cyan text-xs font-mono flex items-center gap-1 btn-tactile"
          title="Replay signal trace animation"
          aria-label="Replay evaluation signal trace"
        >
          <RotateCcw size={12} aria-hidden="true" />
          <span className="hidden sm:inline">Trace</span>
        </button>
      </div>

      {/* Responsive Graph Presentation */}
      <div className="relative">
        {/* Desktop Horizontal SVG Flow */}
        <div className={isMobileVertical ? "hidden sm:block" : "block"}>
          <div className="overflow-x-auto pb-2">
            <svg
              key={animKey}
              width="580"
              height="140"
              viewBox="0 0 580 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
              aria-hidden="true"
            >
              {/* Background Static Connection Line */}
              <path
                d="M40 70 H520"
                stroke="var(--border-subtle)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Travelling Signal Line Animation (Full Tier) */}
              <path
                d="M40 70 H520"
                stroke="var(--accent-cyan)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="signal-line-animating"
              />

              {/* Five Luminous Nodes */}
              {nodes.map((n) => (
                <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                  {/* Outer Glow Halo */}
                  <circle
                    r="16"
                    fill="var(--bg-void)"
                    stroke="var(--border-focus)"
                    strokeWidth="1.5"
                  />
                  {/* Inner Node Accent */}
                  <circle r="6" fill="var(--accent-cyan)" />

                  {/* Node Label Text */}
                  <text
                    y="36"
                    textAnchor="middle"
                    fill="var(--text-primary)"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="600"
                  >
                    {n.label}
                  </text>
                  <text
                    y="50"
                    textAnchor="middle"
                    fill="var(--text-secondary)"
                    fontSize="9.5"
                    fontFamily="monospace"
                  >
                    {n.sub}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Mobile Vertical Sequence View */}
        <div className={isMobileVertical ? "block sm:hidden" : "hidden"}>
          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-accent-cyan/60">
            {nodes.map((n) => (
              <div key={n.id} className="relative flex items-center gap-3 text-xs font-mono">
                <div className="absolute -left-6 top-1 w-5 h-5 rounded-full border border-focus bg-void flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-accent-cyan" />
                </div>
                <div>
                  <div className="font-semibold text-primary">{n.label}</div>
                  <div className="text-[11px] text-secondary">{n.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decision Record Telemetry Box */}
      <div className="p-4 rounded-xl border border-subtle bg-void space-y-2 text-xs font-mono">
        <div className="flex items-center justify-between text-secondary text-[11px]">
          <span>Live decision record #CS-8924</span>
          <span className="text-[#45F5C5] flex items-center gap-1 font-semibold">
            <CheckCircle2 size={12} aria-hidden="true" />
            Human verdict: fail
          </span>
        </div>
        <p className="text-readable text-[11px] leading-relaxed">
          Ground-truth document explicitly bounds maximum loan tenure to 36 months. Model asserted 60 months with a hallucinated citation (Section 4.2). Verdict: Citation Discrepancy.
        </p>
      </div>
    </div>
  );
}
