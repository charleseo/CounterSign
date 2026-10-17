import React from "react";
import { BarChart3 } from "lucide-react";

export interface ChartDataPoint {
  label: string;
  value: number; // e.g. percentage or count
  unit?: string;
  category?: "signal" | "data-2";
}

export interface ChartProps {
  title: string;
  subtitle?: string;
  yAxisLabel?: string;
  xAxisLabel?: string;
  sourceNote?: string;
  data?: ChartDataPoint[];
  isLoading?: boolean;
  className?: string;
}

/**
 * Chart (Section 10.11 & 10.8)
 * Lightweight inline SVG bar chart. Named axes, explicit units, verified source note,
 * and semantic accessible <table> fallback for screen readers.
 * Uses only brand signal cyan and studio violet tokens. No heavy third-party libraries.
 */
export function Chart({
  title,
  subtitle,
  yAxisLabel = "Audit Failure Rate (%)",
  xAxisLabel = "Evaluation Test Category",
  sourceNote = "Source: TraceBase Evaluation Studio Q3 Benchmark (n=120 audit pairs).",
  data = [],
  isLoading = false,
  className = "",
}: ChartProps) {
  if (isLoading) {
    return (
      <div className={`p-6 rounded-2xl border border-subtle bg-surface font-mono text-xs text-secondary animate-pulse ${className}`}>
        Rendering chart data...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`p-6 rounded-2xl border border-subtle bg-surface text-center font-mono text-xs text-secondary ${className}`}>
        No evaluation chart data available.
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value), 10);
  const chartHeight = 160;
  const barWidth = 36;
  const gap = 32;
  const chartWidth = data.length * (barWidth + gap) + 60;

  return (
    <div
      className={`rounded-2xl border border-subtle bg-surface p-5 sm:p-6 space-y-4 ${className}`}
      aria-label={`${title} chart`}
    >
      {/* Chart Header */}
      <div className="flex items-start justify-between gap-4 pb-3 border-b border-subtle">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-accent-cyan" aria-hidden="true" />
            <h3 className="text-sm font-semibold text-primary font-mono">{title}</h3>
          </div>
          {subtitle && (
            <p className="text-xs text-secondary font-mono mt-0.5">{subtitle}</p>
          )}
        </div>
        <span className="text-[11px] font-mono text-secondary">{yAxisLabel}</span>
      </div>

      {/* SVG Bar Visualisation */}
      <div className="overflow-x-auto pb-2">
        <svg
          width={chartWidth}
          height={chartHeight + 40}
          viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto"
          aria-hidden="true"
        >
          {/* Y Axis Guide Lines */}
          {[0, 25, 50, 75, 100].map((pct) => {
            const y = chartHeight - (pct / 100) * chartHeight + 10;
            return (
              <g key={pct}>
                <line
                  x1="35"
                  y1={y}
                  x2={chartWidth - 10}
                  y2={y}
                  stroke="var(--border-subtle)"
                  strokeDasharray="2 3"
                  strokeWidth="0.75"
                />
                <text
                  x="28"
                  y={y + 3}
                  textAnchor="end"
                  fill="var(--text-secondary)"
                  fontSize="9.5"
                  fontFamily="monospace"
                >
                  {pct}%
                </text>
              </g>
            );
          })}

          {/* Data Bars */}
          {data.map((d, idx) => {
            const barHeight = (d.value / maxValue) * (chartHeight - 20);
            const x = 50 + idx * (barWidth + gap);
            const y = chartHeight - barHeight + 10;
            const barColor =
              d.category === "data-2" ? "var(--accent-violet)" : "var(--accent-cyan)";

            return (
              <g key={d.label}>
                {/* Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx="4"
                  fill={barColor}
                  opacity="0.85"
                />
                {/* Value Text Above Bar */}
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  fill="var(--text-primary)"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="600"
                >
                  {d.value}
                  {d.unit || "%"}
                </text>
                {/* X Axis Label Beneath Bar */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 25}
                  textAnchor="middle"
                  fill="var(--text-secondary)"
                  fontSize="9.5"
                  fontFamily="monospace"
                >
                  {d.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Accessible Table Alternative for Screen Readers */}
      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">{xAxisLabel}</th>
            <th scope="col">{yAxisLabel}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.label}>
              <td>{d.label}</td>
              <td>{d.value}{d.unit || "%"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Source Citation Footer */}
      <div className="pt-2 border-t border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] font-mono text-secondary">
        <span>{sourceNote}</span>
        <span>Signal Cyan & Studio Violet tokens only</span>
      </div>
    </div>
  );
}
