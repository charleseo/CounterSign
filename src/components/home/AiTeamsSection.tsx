"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export function AiTeamsSection() {
  return (
    <section
      id="teams"
      aria-labelledby="teams-h"
      className="relative overflow-hidden bg-[#0F1420] text-[#EEF1F5] py-24 sm:py-28"
    >
      {/* Faint Source Documentation Text in Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pt-16 pl-[44%] text-[14px] sm:text-[15px] leading-[2.1] text-white/[0.14] font-mono whitespace-nowrap pointer-events-none select-none overflow-hidden"
      >
        <div>CREATE INDEX CONCURRENTLY</div>
        <div>Transactions cannot run concurrently with CREATE INDEX CONCURRENTLY.</div>
        <div>Building Indexes Concurrently</div>
        <div>Creating an index can interfere with regular operation of a database.</div>
        <div>Regular CREATE INDEX locks the table against writes.</div>
        <div>postgresql.org/docs/current/sql-createindex.html</div>
        <div>Cannot be run inside a transaction block.</div>
        <div>Automatic rollback on error is not supported for concurrent index creation.</div>
      </div>

      {/* Subtle Glow Orb Behind Glass Card */}
      <div
        aria-hidden="true"
        className="absolute right-[5%] top-[20%] w-[480px] h-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(124,92,255,0.3),rgba(124,92,255,0))] pointer-events-none"
      />

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-8 flex flex-wrap gap-12 sm:gap-16 items-center">
        {/* Left Column: Heading + Copy + Action Buttons */}
        <div className="flex-1 basis-[420px] min-w-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B9A6FF]/30 bg-[#B9A6FF]/10 text-xs font-semibold text-[#B9A6FF] mb-2">
            <span>48-hour startup pilot sprint: $1,500 flat fee</span>
          </div>

          <h2
            id="teams-h"
            style={{ color: '#EEF1F5' }}
            className="mt-1 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] !text-[#EEF1F5] m-0 max-w-[14ch]"
          >
            We check your docs bot against your docs.
          </h2>
          <p className="mt-5 text-lg sm:text-xl leading-relaxed text-[#C6CCD8] max-w-[32em] m-0">
            Send us 100 real questions. For each answer we quote the page it should have used and say whether it holds up. You get every finding with its source, ready to fix. Turnaround in 48 hours, led by Ebubechukwu Okeke.
          </p>

          {/* Lead Evaluator Badge */}
          <div className="mt-6 flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-white/10 max-w-[32em]">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-white/20 shrink-0">
              <Image
                src="/images/founder/ebube-okeke.jpg"
                alt="Ebubechukwu Okeke, Principal Evaluator"
                fill
                className="object-cover"
                sizes="44px"
              />
            </div>
            <div className="text-xs">
              <div className="text-white font-semibold">Led directly by Ebubechukwu Okeke</div>
              <div className="text-[#AEB6C5]">Principal Evaluator &amp; Founder • 48-hour pilot turnaround</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-7">
            <Link
              href="/evaluation/scope"
              style={{ color: '#121826' }}
              className="cs-btn cs-btn-shimmer min-h-[48px] px-6 rounded-xl bg-white !text-[#121826] font-bold text-base hover:bg-white/95 transition-all shadow-lg hover:shadow-white/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              Scope 48-hour sprint ($1,500)
            </Link>
            <Link
              href="/evaluation/demo"
              style={{ color: '#FFFFFF' }}
              className="cs-btn min-h-[48px] px-6 rounded-xl border border-white/30 !text-white font-bold text-base hover:bg-white/10 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Try live audit demo
            </Link>
            <Link
              href="/evaluation/sample-audit"
              style={{ color: '#C6CCD8' }}
              className="cs-btn min-h-[48px] px-6 rounded-xl border border-white/20 !text-[#C6CCD8] hover:!text-white font-semibold text-base hover:bg-white/5 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Read sample finding
            </Link>
          </div>
        </div>

        {/* Right Column: Glass Finding Card (.cs-glass-dark) */}
        <article
          className="cs-glass-dark flex-1 basis-[440px] min-w-0 rounded-2xl p-6 sm:p-8 relative border border-white/20 shadow-2xl cs-card-lift cs-glow-breathe transition-all duration-300"
          aria-label="Illustrative audit finding"
        >
          <div className="flex justify-between items-center text-xs font-semibold text-[#AEB6C5]">
            <span>Finding 03</span>
            <span className="text-amber-300">Illustrative, not a real run</span>
          </div>

          <h3 className="mt-4 font-bold text-xs text-[#AEB6C5] m-0">
            Question
          </h3>
          <p className="mt-1.5 text-base sm:text-lg text-white font-medium m-0 leading-snug">
            Can I run CREATE INDEX CONCURRENTLY inside a transaction?
          </p>

          <h3 className="mt-5 font-bold text-xs text-[#AEB6C5] m-0">
            The bot said
          </h3>
          <p className="mt-1.5 text-base sm:text-lg text-white font-medium m-0 leading-snug">
            &ldquo;Yes, wrap it in BEGIN and COMMIT so it rolls back on failure.&rdquo;
          </p>

          <h3 className="mt-5 font-bold text-xs text-[#AEB6C5] m-0">
            The docs say
          </h3>
          <blockquote className="mt-1.5 pl-3 border-l-2 border-[#B9A6FF] text-base sm:text-lg text-[#D5DAE4] italic m-0 leading-relaxed">
            &ldquo;CREATE INDEX CONCURRENTLY cannot be executed within a transaction block.&rdquo;
          </blockquote>

          {/* Red contradiction badge */}
          <div className="cs-red mt-6 inline-flex items-center gap-2 px-3.5 py-2 border-2 border-[#FF7A6E] rounded-md text-[#FF7A6E] font-bold text-sm sm:text-base select-none">
            Contradicts the source
          </div>
        </article>
      </div>
    </section>
  );
}
