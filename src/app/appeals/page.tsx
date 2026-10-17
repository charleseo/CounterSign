import type { Metadata } from 'next';
import { ShieldAlert, FileText } from 'lucide-react';
import { AppealsClient } from './AppealsClient';

export const metadata: Metadata = {
  title: 'Account Dispute & Ban Appeal Kit | Remote AI Work | TraceBase',
  description:
    'Professional appeal letter templates and dispute guides for Outlier, Alignerr, and DataAnnotation. Evidence-based escalation for empty queues, false location flags, and reviewer discrepancies.',
  alternates: {
    canonical: '/appeals',
  },
  openGraph: {
    title: 'Account Dispute & Ban Appeal Kit | TraceBase',
    description:
      'Professional appeal templates and escalation advice for remote AI contributors experiencing account pauses or empty queues.',
    url: '/appeals',
    type: 'website',
  },
};

export default function AppealsPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-rule">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule bg-sheet text-xs text-secondary">
          <ShieldAlert size={14} className="text-amber-500" />
          <span>Contributor Advocacy &amp; Appeals</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink">
          Account Dispute &amp; Appeal Kit
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          Generate structured, professional appeal letters for Outlier, Alignerr, and DataAnnotation. Escalate empty queue flags, false network alerts, and reviewer rating discrepancies with clear evidence.
        </p>
      </div>

      {/* Interactive Tool */}
      <AppealsClient />
    </div>
  );
}
