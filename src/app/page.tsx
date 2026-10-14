import Link from "next/link";
import { SealLogo } from "@/components/ui/SealLogo";
import { TierToggle } from "@/components/layout/TierToggle";

export default function Home() {
  const tokenSwatches = [
    { name: "Void Canvas", varName: "--bg-void", hex: "#070B16", role: "Deep base canvas" },
    { name: "Surface", varName: "--bg-surface", hex: "#0B1222", role: "Cards and panels" },
    { name: "Elevated", varName: "--bg-elevated", hex: "#142039", role: "Hover and active tabs" },
    { name: "Border Subtle", varName: "--border-subtle", hex: "#25334B", role: "Structural dividers" },
    { name: "Luminescent Cyan", varName: "--accent-cyan", hex: "#3DEBFF", role: "Brand accent & active data" },
    { name: "Verified Emerald", varName: "--accent-emerald", hex: "#45F5C5", role: "Verified active & passed" },
    { name: "Studio Violet", varName: "--accent-violet", hex: "#8B7CFF", role: "Model evals & citations" },
    { name: "Alert Amber", varName: "--accent-amber", hex: "#FFC66D", role: "Needs recheck & caution" },
    { name: "Danger Red", varName: "--accent-danger", hex: "#FF6B6B", role: "High risk & expired" },
  ];

  return (
    <div className="w-full flex-1 flex flex-col py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto w-full space-y-12">
        {/* Foundation Hero */}
        <section className="text-center space-y-5 pt-4 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-subtle bg-surface text-xs font-mono text-secondary">
            <SealLogo size={16} color="emerald" animating={true} />
            <span className="text-[#45F5C5] font-semibold">Milestone 2 Complete:</span>
            <span>Design System & Component Gallery</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-primary">
            Countersign
          </h1>

          <p className="text-lg sm:text-xl text-readable max-w-2xl mx-auto leading-relaxed">
            AI work, checked by a human. Model answers, checked against the source.
          </p>

          <p className="text-sm text-secondary max-w-xl mx-auto">
            Independent verification infrastructure connecting remote AI trainers with verified opportunities and enterprise teams with rigorous LLM evaluation.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-semibold border border-focus text-void bg-accent-cyan hover:opacity-90 transition-opacity btn-tactile"
            >
              <span>Explore Component Gallery</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-medium border border-subtle text-primary bg-surface hover:bg-elevated transition-colors btn-tactile"
            >
              <span>Verified Jobs</span>
            </Link>
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-medium border border-subtle text-secondary hover:text-primary bg-surface hover:bg-elevated transition-colors btn-tactile"
            >
              <span>Evaluation Studio</span>
            </Link>
          </div>
        </section>

        {/* Capability Tier Test Card */}
        <section className="p-6 rounded-lg border border-subtle bg-surface card-interactive space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-subtle">
            <div>
              <h2 className="text-base font-semibold text-primary">
                Capability Tier Verification (Section 10.10)
              </h2>
              <p className="text-xs text-secondary mt-0.5">
                Test the bandwidth bridge: Full mode (subtle glass) versus Lite Data-Saver (flat surfaces, &lt;48KB).
              </p>
            </div>
            <TierToggle showExplanation={false} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 rounded border border-subtle bg-void">
              <span className="text-secondary block mb-1">Full Tier Settings:</span>
              <span className="text-readable">Glassmorphism active, smooth CSS view transitions, card spotlights.</span>
            </div>
            <div className="p-3 rounded border border-subtle bg-void">
              <span className="text-secondary block mb-1">Lite (Data-Saver) Settings:</span>
              <span className="text-readable">Blur disabled, flat 1px borders, zero layout shift, ultra-lean payload.</span>
            </div>
          </div>
        </section>

        {/* Design System Token Swatches */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-primary">
              Design Token Matrix (Section 10.4)
            </h2>
            <span className="text-xs font-mono text-secondary">
              Audited for WCAG 2.2 AA Contrast
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {tokenSwatches.map((token) => (
              <div
                key={token.varName}
                className="p-3 rounded-lg border border-subtle bg-surface flex items-center gap-3"
              >
                <div
                  className="w-8 h-8 rounded border border-subtle flex-shrink-0"
                  style={{ backgroundColor: `var(${token.varName})` }}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <div className="text-xs font-medium text-primary truncate">
                    {token.name}
                  </div>
                  <div className="text-[11px] font-mono text-secondary">
                    {token.hex}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Milestone Roadmap Discovery Cards */}
        <section className="space-y-4">
          <h2 className="text-base font-semibold text-primary">
            Upcoming Milestone Modules
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/gallery"
              className="p-5 rounded-lg border border-[#45F5C5]/40 bg-surface card-interactive space-y-2 block group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-secondary">Milestone 2</span>
                <span className="text-xs font-mono text-[#45F5C5] font-semibold flex items-center gap-1">
                  <SealLogo size={12} color="emerald" />
                  <span>Completed</span>
                </span>
              </div>
              <h3 className="text-sm font-semibold text-primary group-hover:text-accent-cyan transition-colors">
                Design System & Component Gallery &rarr;
              </h3>
              <p className="text-xs text-readable leading-relaxed">
                Living style guide, Seal SVG states, Freshness Stamp, Truth Strip, Job Card, and filter sheets.
              </p>
            </Link>

            <div className="p-5 rounded-lg border border-subtle bg-surface card-interactive space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-secondary">Milestone 3</span>
                <span className="text-xs font-mono text-[#3DEBFF] font-semibold">Next</span>
              </div>
              <h3 className="text-sm font-semibold text-primary">Database & Secure Admin Console</h3>
              <p className="text-xs text-readable leading-relaxed">
                Supabase schema, 14-day verification sweeper, audit logging, and rapid editor workflows.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
