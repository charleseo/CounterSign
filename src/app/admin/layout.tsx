import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'TraceBase Admin Console',
  description: 'Human-verification back-office, 14-day compliance monitor, and audit log.',
  robots: {
    index: false,
    follow: false,
  },
};

export const instant = false;

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] antialiased font-sans">
      <React.Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center p-8 text-xs text-[var(--color-muted)] font-mono">
            Loading TraceBase Admin...
          </div>
        }
      >
        {children}
      </React.Suspense>
    </div>
  );
}
