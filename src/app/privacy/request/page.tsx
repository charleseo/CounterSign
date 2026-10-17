import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PrivacyRequestForm } from './PrivacyRequestForm';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Submit Privacy Rights Request (NDPA 2023) | TraceBase',
  description: 'Exercise your statutory rights to access, rectify, or permanently delete your personal data under the Nigeria Data Protection Act 2023.',
};

export default function PrivacyRequestPage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-2xl mx-auto space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/privacy"
          className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Privacy Policy</span>
        </Link>
      </div>

      {/* Page Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-rule bg-sheet text-xs text-secondary font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-ink" />
          <span>NDPA 2023 Statutory Rights Portal</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-primary">
          Data Subject Rights Request
        </h1>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          Under the Nigeria Data Protection Act (NDPA) 2023, you have the right to request access to, correction of, or permanent deletion of your recorded email address and subscription preferences. All valid requests are resolved within 30 days.
        </p>
      </div>

      {/* Form Component */}
      <PrivacyRequestForm />
    </div>
  );
}
