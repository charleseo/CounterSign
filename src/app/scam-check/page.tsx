import type { Metadata } from 'next';
import { ShieldAlert } from 'lucide-react';
import { ScamCheckClient } from './ScamCheckClient';

export const metadata: Metadata = {
  title: 'Scam Check: 10-Point AI Job Verification Checklist | Countersign',
  description:
    'Evaluate whether an AI job offer or recruiter contact is legitimate before sharing personal details. Interactive 10-point red flag checklist and moderation report form.',
  alternates: {
    canonical: '/scam-check',
  },
  openGraph: {
    title: 'Scam Check: 10-Point AI Job Verification Checklist | Countersign',
    description:
      'Spot fake AI jobs, crypto payment traps, and advance-fee schemes with our interactive 10-point checklist.',
    url: '/scam-check',
    type: 'website',
  },
};

export default function ScamCheckPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="space-y-3 pb-6 border-b border-subtle">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-subtle bg-surface text-xs font-mono text-secondary">
          <ShieldAlert size={14} className="text-accent-rose" />
          <span>Section 7.8 &amp; 9.6 Verification Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-primary">
          AI Work Scam Check &amp; Red Flag Audit
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          Verify whether an AI work opportunity or recruiter contact is legitimate before sharing personal information, payment details, or government identification.
        </p>
      </div>

      {/* Interactive Tool */}
      <ScamCheckClient />
    </div>
  );
}
