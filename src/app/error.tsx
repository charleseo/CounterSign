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
    console.error('TraceBase Application Error:', error?.message);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-6 text-center">
        {/* Seal Icon & Code */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-sheet border border-rule shadow-sm">
            <SealLogo size={28} color="danger" />
          </div>
          <div className="text-xs font-semibold text-red-700 dark:text-red-400">
            System Notice : Recoverable View Error
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
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
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#5A35C8] hover:bg-[#4A2AB0] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Operation</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-sheet border border-rule text-xs text-primary font-semibold flex items-center justify-center gap-2 hover:border-brand-ink transition-colors min-h-[44px]"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Error Digest (if available, without stack trace) */}
        {error.digest && (
          <div className="pt-4 border-t border-rule text-[11px] tabular-nums text-secondary">
            Diagnostic reference: {error.digest}
          </div>
        )}
      </div>
    </div>
  );
}
