import React from 'react';
import type { Metadata } from 'next';
import { ContactForm } from './ContactForm';
import { MessageSquare, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Editorial & Evaluation Desk | Countersign',
  description: 'Reach Countersign: editorial job verification, enterprise AI evaluation pilots, platform corrections, and NDPA privacy requests. Response within two working days.',
};

export default function ContactPage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[var(--color-surface-hover)] text-[var(--color-accent)] border border-[var(--color-border)]">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Direct Contact Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-text)]">
          Get in Touch
        </h1>
        <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed max-w-2xl">
          Countersign is managed by Jo (Ebube Okeke). We read every message directly and respond within two working days. Pick the dedicated inbox that matches your inquiry or use the form below.
        </p>
      </div>

      {/* Dedicated Inboxes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Editorial Desk */}
        <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2">
          <div className="text-xs font-mono font-semibold text-emerald-400">
            Editorial & Sourcing
          </div>
          <p className="text-xs text-[var(--color-muted)]">
            Suggest a legitimate AI work opportunity or report a broken job link.
          </p>
          <a
            href="mailto:editorial@countersign.ai"
            className="text-xs font-mono text-[var(--color-accent)] hover:underline block truncate"
          >
            editorial@countersign.ai
          </a>
        </div>

        {/* Evaluation Studio */}
        <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2">
          <div className="text-xs font-mono font-semibold text-purple-400">
            Evaluation Studio Pilots
          </div>
          <p className="text-xs text-[var(--color-muted)]">
            RAG citation audits, hallucination analysis, and benchmark evaluation for AI startups.
          </p>
          <a
            href="mailto:jo@countersign.ai"
            className="text-xs font-mono text-[var(--color-accent)] hover:underline block truncate"
          >
            jo@countersign.ai
          </a>
        </div>

        {/* Platform Corrections */}
        <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2">
          <div className="text-xs font-mono font-semibold text-amber-400">
            Corrections & Takedowns
          </div>
          <p className="text-xs text-[var(--color-muted)]">
            Platform updates, closed roles, country eligibility adjustments (3-day SLA).
          </p>
          <a
            href="mailto:corrections@countersign.ai"
            className="text-xs font-mono text-[var(--color-accent)] hover:underline block truncate"
          >
            corrections@countersign.ai
          </a>
        </div>

        {/* Legal & Privacy */}
        <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2">
          <div className="text-xs font-mono font-semibold text-blue-400">
            Privacy & NDPA 2023
          </div>
          <p className="text-xs text-[var(--color-muted)]">
            Data Subject Access Requests (SAR), deletion requests, and compliance inquiries.
          </p>
          <a
            href="mailto:privacy@countersign.ai"
            className="text-xs font-mono text-[var(--color-accent)] hover:underline block truncate"
          >
            privacy@countersign.ai
          </a>
        </div>
      </div>

      {/* Direct Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-[var(--color-text)]">
            Send a Direct Message
          </h2>
          <ContactForm />
        </div>

        <div className="space-y-4 p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-muted)]">
          <h3 className="font-semibold text-sm text-[var(--color-text)]">
            Operating Location
          </h3>
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[var(--color-text)]">Countersign Headquarters</p>
              <p>Lagos, Nigeria</p>
              <p className="mt-1 text-[11px]">Primary time zone: West Africa Time (UTC+1)</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 pt-3 border-t border-[var(--color-border)]">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[var(--color-text)]">Response Horizon</p>
              <p>Standard inquiries: within two working days.</p>
              <p>Platform corrections: within three working days.</p>
              <p>Privacy rights (NDPA): within 30 statutory days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
