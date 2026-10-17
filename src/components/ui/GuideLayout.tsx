import React from "react";
import { Clock, ShieldCheck, BookOpen, ExternalLink, User } from "lucide-react";

export interface GuideSource {
  title: string;
  url: string;
  verifiedDate: string;
}

export interface GuideLayoutProps {
  title: string;
  summary: string;
  readingTimeMinutes: number;
  lastUpdated: string;
  author?: string;
  sources?: GuideSource[];
  tableOfContents?: Array<{ id: string; label: string }>;
  children: React.ReactNode;
  className?: string;
}

/**
 * GuideLayout (Section 7.7 & 10.11)
 * Optimized 680px reading column, desktop table of contents,
 * verified author sign-off ("Checked by Jo"), and source bibliography.
 */
export function GuideLayout({
  title,
  summary,
  readingTimeMinutes,
  lastUpdated,
  author = "Jo (Ebube Okeke)",
  sources = [],
  tableOfContents = [],
  children,
  className = "",
}: GuideLayoutProps) {
  return (
    <div className={`w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 ${className}`}>
      {/* Header Block */}
      <header className="max-w-[680px] mx-auto space-y-4 pb-8 border-b border-subtle">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-secondary">
          <span className="inline-flex items-center gap-1">
            <Clock size={13} aria-hidden="true" />
            <span>{readingTimeMinutes} min read</span>
          </span>
          <span aria-hidden="true">&bull;</span>
          <span>Last updated {lastUpdated}</span>
          <span aria-hidden="true">&bull;</span>
          <span className="inline-flex items-center gap-1 text-accent-cyan">
            <ShieldCheck size={13} aria-hidden="true" />
            <span>Verified Guide</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold text-primary tracking-tight leading-tight">
          {title}
        </h1>

        <p className="text-base sm:text-lg text-readable leading-relaxed">
          {summary}
        </p>

        <div className="pt-2 flex items-center gap-2 text-xs font-mono text-secondary">
          <User size={13} aria-hidden="true" />
          <span>Curated and human-checked by {author}</span>
        </div>
      </header>

      {/* Main Content Layout with Desktop Table of Contents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Desktop Sticky Table of Contents (3 cols) */}
        {tableOfContents.length > 0 && (
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 p-4 rounded-xl border border-subtle bg-surface text-xs font-mono space-y-3">
              <div className="text-secondary font-semibold text-[11px] flex items-center gap-1.5">
                <BookOpen size={13} />
                <span>Contents</span>
              </div>
              <ul className="space-y-2">
                {tableOfContents.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-secondary hover:text-accent-cyan transition-colors block py-0.5 leading-snug"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}

        {/* 680px Reading Column (lg:col-span-8 or 9) */}
        <article
          className={`prose prose-invert max-w-[680px] mx-auto text-readable leading-relaxed text-sm sm:text-base space-y-6 ${
            tableOfContents.length > 0 ? "lg:col-span-9" : "lg:col-span-12"
          }`}
        >
          {children}

          {/* Sources Bibliography Block */}
          {sources.length > 0 && (
            <div className="mt-12 pt-6 border-t border-subtle not-prose space-y-3">
              <h3 className="text-xs font-mono font-semibold text-secondary flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-accent-cyan" />
                <span>Verified sources and references</span>
              </h3>
              <ul className="space-y-2 font-mono text-xs">
                {sources.map((src, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-lg border border-subtle bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-1.5"
                  >
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-cyan hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      <span>{src.title}</span>
                      <ExternalLink size={12} aria-hidden="true" />
                    </a>
                    <span className="text-[11px] text-secondary">
                      Verified {src.verifiedDate}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Guide Sign-off */}
          <div className="mt-8 p-4 rounded-xl border border-subtle bg-surface not-prose flex items-start gap-3">
            <div className="w-10 h-10 rounded-full border border-subtle bg-void flex items-center justify-center font-mono font-bold text-accent-cyan flex-shrink-0">
              JO
            </div>
            <div className="text-xs space-y-1">
              <div className="font-semibold text-primary">Written & Verified by Jo</div>
              <p className="text-secondary leading-relaxed">
                Independent AI evaluation specialist based in Nigeria. If any information in this guide has changed or needs correction, submit a report for immediate update.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
