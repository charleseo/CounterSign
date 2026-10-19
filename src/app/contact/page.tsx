import React from 'react';
import type { Metadata } from 'next';
import { ContactForm } from './ContactForm';
import { MessageSquare, MapPin, Clock } from 'lucide-react';
import { getSiteHost } from '@/lib/utils/siteUrl';

export const metadata: Metadata = {
  title: 'Contact Editorial & Evaluation Desk | TraceBase',
  description: 'Reach TraceBase: editorial job verification, enterprise AI evaluation pilots, platform corrections, and NDPA privacy requests. Response within two working days.',
};

export default function ContactPage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-rule bg-sheet text-xs text-secondary font-medium">
          <MessageSquare className="w-3.5 h-3.5 text-brand-ink" />
          <span>Direct Contact Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
          Get in Touch
        </h1>
        <p className="text-sm sm:text-base text-secondary leading-relaxed max-w-2xl">
          TraceBase is managed by Ebubechukwu Okeke. We read every message directly and respond within two working days. Pick the dedicated inbox that matches your inquiry or use the form below.
        </p>
      </div>

      {/* Dedicated Inboxes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Editorial Desk */}
        <div className="bg-sheet border border-rule rounded-xl p-4 space-y-2">
          <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            Editorial &amp; Sourcing
          </div>
          <p className="text-xs text-secondary">
            Suggest a legitimate AI work opportunity or report a broken job link.
          </p>
          <a
            href={`mailto:editorial@${getSiteHost()}`}
            className="text-xs text-brand-ink underline hover:text-[#4A2AB0] block truncate"
          >
            editorial@{getSiteHost()}
          </a>
        </div>

        {/* Evaluation Studio */}
        <div className="bg-sheet border border-rule rounded-xl p-4 space-y-2">
          <div className="text-xs font-semibold text-brand-ink">
            Evaluation Studio Pilots
          </div>
          <p className="text-xs text-secondary">
            RAG citation audits, hallucination analysis, and benchmark evaluation for AI startups.
          </p>
          <a
            href={`mailto:ebube@${getSiteHost()}`}
            className="text-xs text-brand-ink underline hover:text-[#4A2AB0] block truncate"
          >
            ebube@{getSiteHost()}
          </a>
        </div>

        {/* Platform Corrections */}
        <div className="bg-sheet border border-rule rounded-xl p-4 space-y-2">
          <div className="text-xs font-semibold text-amber-700 dark:text-amber-400">
            Corrections &amp; Takedowns
          </div>
          <p className="text-xs text-secondary">
            Platform updates, closed roles, country eligibility adjustments (3-day SLA).
          </p>
          <a
            href={`mailto:corrections@${getSiteHost()}`}
            className="text-xs text-brand-ink underline hover:text-[#4A2AB0] block truncate"
          >
            corrections@{getSiteHost()}
          </a>
        </div>

        {/* Legal & Privacy */}
        <div className="bg-sheet border border-rule rounded-xl p-4 space-y-2">
          <div className="text-xs font-semibold text-primary">
            Privacy &amp; NDPA 2023
          </div>
          <p className="text-xs text-secondary">
            Data Subject Access Requests (SAR), deletion requests, and compliance inquiries.
          </p>
          <a
            href={`mailto:privacy@${getSiteHost()}`}
            className="text-xs text-brand-ink underline hover:text-[#4A2AB0] block truncate"
          >
            privacy@{getSiteHost()}
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

        <div className="bg-sheet border border-rule rounded-xl p-5 space-y-4 text-xs text-secondary">
          <h3 className="font-semibold text-sm text-primary">
            Operating Location
          </h3>
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-brand-ink shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-primary">TraceBase Headquarters</p>
              <p>Lagos, Nigeria</p>
              <p className="mt-1 text-[11px]">Primary time zone: West Africa Time (UTC+1)</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 pt-3 border-t border-rule">
            <Clock className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
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
