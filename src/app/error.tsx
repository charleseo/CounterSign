'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home } from 'lucide-react';
import { SealLogo } from '@/components/ui/SealLogo';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console without personal details
    console.error('Countersign Application Error:', error?.message);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-6 text-center">
        {/* Seal Icon & Code */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl glass-panel animate-float" style={{ borderColor: 'rgba(255, 107, 107, 0.2)' }}>
            <SealLogo size={28} color="danger" />
          </div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-danger)]">
            System Notice : Recoverable View Error
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient-cyan">
            That did not send. Your text is still here. Try again.
          </h1>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed">
            We encountered a temporary processing interruption while rendering this view. Your input has been preserved in memory. Tap below to re-verify and retry.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="shimmer-sweep w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[var(--accent-cyan)] text-[var(--bg-void)] text-xs font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer glow-cyan-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Operation</span>
          </button>
          <Link
            href="/"
            className="glass-card w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs text-primary font-semibold flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Error Digest (if available, without stack trace) */}
        {error.digest && (
          <div className="pt-4 border-t border-[var(--border-subtle)] text-[11px] font-mono text-secondary">
            Diagnostic reference: {error.digest}
          </div>
        )}
      </div>
    </div>
  );
}
