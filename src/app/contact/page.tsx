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
        <div className="glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-secondary">
          <MessageSquare className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
          <span>Direct Contact Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient-cyan">
          Get in Touch
        </h1>
        <p className="text-sm sm:text-base text-secondary leading-relaxed max-w-2xl">
          Countersign is managed by Jo (Ebube Okeke). We read every message directly and respond within two working days. Pick the dedicated inbox that matches your inquiry or use the form below.
        </p>
      </div>

      {/* Dedicated Inboxes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Editorial Desk */}
        <div className="glass-card rounded-xl p-4 space-y-2 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-[radial-gradient(circle,rgba(69,245,197,0.06)_0%,transparent_70%)] pointer-events-none" />
          <div className="text-xs font-mono font-semibold text-[var(--accent-emerald)] relative">
            Editorial &amp; Sourcing
          </div>
          <p className="text-xs text-secondary relative">
            Suggest a legitimate AI work opportunity or report a broken job link.
          </p>
          <a
            href="mailto:editorial@countersign.ai"
            className="text-xs font-mono text-[var(--accent-cyan)] hover:underline block truncate relative"
          >
            editorial@countersign.ai
          </a>
        </div>

        {/* Evaluation Studio */}
        <div className="glass-card rounded-xl p-4 space-y-2 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-[radial-gradient(circle,rgba(139,124,255,0.06)_0%,transparent_70%)] pointer-events-none" />
          <div className="text-xs font-mono font-semibold text-[var(--accent-violet)] relative">
            Evaluation Studio Pilots
          </div>
          <p className="text-xs text-secondary relative">
            RAG citation audits, hallucination analysis, and benchmark evaluation for AI startups.
          </p>
          <a
            href="mailto:jo@countersign.ai"
            className="text-xs font-mono text-[var(--accent-cyan)] hover:underline block truncate relative"
          >
            jo@countersign.ai
          </a>
        </div>

        {/* Platform Corrections */}
        <div className="glass-card rounded-xl p-4 space-y-2 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-[radial-gradient(circle,rgba(255,198,109,0.06)_0%,transparent_70%)] pointer-events-none" />
          <div className="text-xs font-mono font-semibold text-[var(--accent-amber)] relative">
            Corrections &amp; Takedowns
          </div>
          <p className="text-xs text-secondary relative">
            Platform updates, closed roles, country eligibility adjustments (3-day SLA).
          </p>
          <a
            href="mailto:corrections@countersign.ai"
            className="text-xs font-mono text-[var(--accent-cyan)] hover:underline block truncate relative"
          >
            corrections@countersign.ai
          </a>
        </div>

        {/* Legal & Privacy */}
        <div className="glass-card rounded-xl p-4 space-y-2 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-[radial-gradient(circle,rgba(61,235,255,0.06)_0%,transparent_70%)] pointer-events-none" />
          <div className="text-xs font-mono font-semibold text-[var(--accent-cyan)] relative">
            Privacy &amp; NDPA 2023
          </div>
          <p className="text-xs text-secondary relative">
            Data Subject Access Requests (SAR), deletion requests, and compliance inquiries.
          </p>
          <a
            href="mailto:privacy@countersign.ai"
            className="text-xs font-mono text-[var(--accent-cyan)] hover:underline block truncate relative"
          >
            privacy@countersign.ai
          </a>
        </div>
      </div>

      {/* Direct Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-primary">
            Send a Direct Message
          </h2>
          <ContactForm />
        </div>

        <div className="glass-panel rounded-2xl p-5 space-y-4 text-xs text-secondary relative overflow-hidden">
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[radial-gradient(circle,rgba(61,235,255,0.05)_0%,transparent_70%)] pointer-events-none" />

          <h3 className="font-semibold text-sm text-primary relative">
            Operating Location
          </h3>
          <div className="flex items-start gap-2.5 relative">
            <MapPin className="w-4 h-4 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-primary">Countersign Headquarters</p>
              <p>Lagos, Nigeria</p>
              <p className="mt-1 text-[11px]">Primary time zone: West Africa Time (UTC+1)</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 pt-3 border-t border-[var(--border-subtle)] relative">
            <Clock className="w-4 h-4 text-[var(--accent-emerald)] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-primary">Response Horizon</p>
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
