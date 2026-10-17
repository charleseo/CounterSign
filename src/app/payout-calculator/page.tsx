import type { Metadata } from 'next';
import { DollarSign, Percent } from 'lucide-react';
import { PayoutCalculatorClient } from './PayoutCalculatorClient';

export const metadata: Metadata = {
  title: 'Real Payout & Take-Home Calculator | Remote AI Work | TraceBase',
  description:
    'Calculate your real take-home earnings from AI work platforms. Compare withdrawal fees, exchange rate spreads, and local payouts across Deel, Geegpay, AirTM, and domiciliary accounts.',
  alternates: {
    canonical: '/payout-calculator',
  },
  openGraph: {
    title: 'Real Payout & Take-Home Calculator | TraceBase',
    description:
      'Compare what platforms like Outlier and Alignerr pay in gross USD versus what actually lands in your local bank account.',
    url: '/payout-calculator',
    type: 'website',
  },
};

export default function PayoutCalculatorPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-rule">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule bg-sheet text-xs text-secondary">
          <Percent size={14} className="text-emerald-600 dark:text-emerald-400" />
          <span>Real Net Earnings Estimator</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink">
          Real Payout &amp; Take-Home Calculator
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          See what an hourly USD rate actually pays into your local bank account after processor fees and currency exchange spreads. Compare Deel, Geegpay, AirTM, and direct wire options.
        </p>
      </div>

      {/* Interactive Tool */}
      <PayoutCalculatorClient />
    </div>
  );
}
