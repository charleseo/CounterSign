'use client';

import React from 'react';
import Link from 'next/link';
import { MessageSquare, Bell, ArrowRight, ShieldCheck } from 'lucide-react';

export function WhatsAppAlertBanner() {
  return (
    <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-800 dark:text-emerald-400">
          <MessageSquare size={18} />
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-bold text-primary">
              Get verified role drops on WhatsApp &amp; Telegram
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
              Zero spam
            </span>
          </div>
          <p className="text-xs text-secondary leading-relaxed">
            We post 1 message per day only when a new human-verified role opens for your country. Never promotional ads.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <Link
          href="/official-channels"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 text-xs font-bold transition-colors min-h-[40px]"
        >
          <span>Join official channel</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
