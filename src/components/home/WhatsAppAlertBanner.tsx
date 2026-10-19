'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, Send, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function WhatsAppAlertBanner() {
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'telegram'>('whatsapp');

  const whatsappUrl =
    process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL || 'https://whatsapp.com/channel/0029Vb4vF7x5474W1c2ZqD3d';
  const telegramUrl =
    process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL || 'https://t.me/tracebase_ai';

  return (
    <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-7 space-y-4">
      {/* Header with Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#5A35C8]/10 border border-[#5A35C8]/30 flex items-center justify-center shrink-0 text-[#5A35C8]">
            {activeChannel === 'whatsapp' ? <MessageSquare size={19} /> : <Send size={19} />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-ink m-0">
                Verified role drops on WhatsApp and Telegram
              </h3>
            </div>
            <p className="text-xs text-secondary m-0">
              Direct notifications for new human-verified AI evaluation listings.
            </p>
          </div>
        </div>

        {/* Guarantees */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
            Zero spam
          </span>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-surface text-secondary border border-rule">
            1 message / day max
          </span>
        </div>
      </div>

      {/* Channel Switcher & Details */}
      <div className="p-4 rounded-xl border border-rule bg-surface space-y-3 text-xs">
        {/* Switcher Tabs */}
        <div className="flex items-center gap-2 border-b border-subtle pb-2.5">
          <span className="text-secondary font-medium mr-1">Choose platform:</span>
          <button
            type="button"
            onClick={() => setActiveChannel('whatsapp')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer min-h-[34px] ${
              activeChannel === 'whatsapp'
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-bold'
                : 'border-rule bg-sheet text-secondary hover:text-ink'
            }`}
          >
            <MessageSquare size={13} />
            <span>WhatsApp Channel</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveChannel('telegram')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer min-h-[34px] ${
              activeChannel === 'telegram'
                ? 'border-sky-500 bg-sky-500/10 text-sky-800 dark:text-sky-300 font-bold'
                : 'border-rule bg-sheet text-secondary hover:text-ink'
            }`}
          >
            <Send size={13} />
            <span>Telegram Channel</span>
          </button>
        </div>

        {/* Description per channel */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="space-y-1">
            <p className="text-secondary leading-relaxed m-0">
              {activeChannel === 'whatsapp'
                ? 'Join our private WhatsApp announcement channel. Your phone number is never visible to other members. We only send verified job announcements when applications are actively open.'
                : 'Subscribe to our public Telegram broadcast channel. Instant alerts with pay rates, qualification criteria, and verified application links.'}
            </p>
            <div className="flex items-center gap-3 text-[11px] text-muted pt-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400" />
                <span>One-way broadcasts only</span>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-[#5A35C8]" />
                <span>Anti-scam verified</span>
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href={activeChannel === 'whatsapp' ? whatsappUrl : telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-white font-bold transition-colors min-h-[42px] ${
                activeChannel === 'whatsapp'
                  ? 'bg-emerald-700 hover:bg-emerald-800'
                  : 'bg-sky-700 hover:bg-sky-800'
              }`}
            >
              <span>{activeChannel === 'whatsapp' ? 'Join WhatsApp channel' : 'Join Telegram channel'}</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="flex items-center justify-between text-[11px] text-muted">
        <span>We never direct message you first or ask for banking credentials.</span>
        <Link href="/official-channels" className="text-[#5A35C8] hover:underline font-medium">
          Check our official channels directory
        </Link>
      </div>
    </div>
  );
}
