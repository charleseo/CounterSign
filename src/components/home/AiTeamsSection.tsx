"use client";

import React from "react";
import Link from "next/link";

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
          <p className="font-bold text-[#B9A6FF] text-base sm:text-lg m-0">
            For AI teams
          </p>
          <h2
            id="teams-h"
            className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-[#EEF1F5] m-0 max-w-[14ch]"
          >
            We check your docs bot against your docs.
          </h2>
          <p className="mt-5 text-lg sm:text-xl leading-relaxed text-[#C6CCD8] max-w-[32em] m-0">
            Send us 100 real questions. For each answer we quote the page it should have used and say whether it holds up. You get every finding with its source, ready to fix.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/evaluation/scope"
              className="cs-btn min-h-[48px] px-6 rounded-md bg-white text-[#121826] font-bold text-base hover:bg-white/90 transition-all"
            >
              Scope an audit
            </Link>
            <Link
              href="/evaluation/sample-audit"
              className="cs-btn min-h-[48px] px-6 rounded-md border-2 border-[#EEF1F5] text-[#EEF1F5] font-bold text-base hover:bg-white/10 transition-all"
            >
              Read a sample finding
            </Link>
          </div>
        </div>

        {/* Right Column: Glass Finding Card (.cs-glass-dark) */}
        <article
          className="cs-glass-dark flex-1 basis-[440px] min-w-0 rounded-xl p-6 sm:p-8 relative border border-white/20 shadow-2xl"
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
