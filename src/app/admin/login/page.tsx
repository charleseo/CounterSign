'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { SealLogo } from '@/components/ui/SealLogo';
import { adminLoginAction } from '@/lib/actions/admin';
import { KeyRound, Mail, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState(process.env.NODE_ENV === 'development' ? 'admin@tracebase.ai' : '');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | '2fa'>('email');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);

    startTransition(async () => {
      const res = await adminLoginAction(email);
      if (res.success) {
        setStep('2fa');
        setStatusMessage(res.message);
        if (process.env.NODE_ENV === 'development') {
          setCode('123456'); // Pre-fill sample 2FA code in development only
        }
      } else {
        setErrorMessage(res.message);
      }
    });
  };

  const handleVerify2FA = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);

    startTransition(async () => {
      const res = await adminLoginAction(email, code);
      if (!res.success) {
        setErrorMessage(res.message);
      }
    });
  };

  const handleQuickDemoAccess = () => {
    startTransition(async () => {
      await adminLoginAction('admin@tracebase.ai', '123456');
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--color-bg)]">
      <div className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 md:p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex justify-center mb-4">
            <SealLogo size={48} priority />
          </div>
          <div className="inline-block px-2.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
            Restricted System
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">
            TraceBase Admin
          </h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            Human verification and 14-day compliance console
          </p>
        </div>

        {statusMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {step === 'email' ? (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)]" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tracebase.ai"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2.5 px-4 rounded-xl bg-[var(--color-accent)] text-[var(--color-accent-fg)] font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <span>{isPending ? 'Requesting Magic Link...' : 'Continue with Magic Link'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify2FA} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="admin-code" className="block text-xs font-medium text-[var(--color-muted)]">
                  6-Digit 2FA Code
                </label>
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="text-xs text-[var(--color-accent)] hover:underline"
                >
                  Change Email
                </button>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)]" />
                <input
                  id="admin-code"
                  type="text"
                  maxLength={6}
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-sm font-mono tracking-widest text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                />
              </div>
              <p className="text-[11px] text-[var(--color-muted)] mt-1.5">
                Sent to {email}.{process.env.NODE_ENV === 'development' ? <> Demo code: <span className="font-mono text-emerald-400">123456</span></> : ''}
              </p>
            </div>

            <button
              type="submit"
              disabled={isPending || code.length !== 6}
              className="w-full py-2.5 px-4 rounded-xl bg-[var(--color-accent)] text-[var(--color-accent-fg)] font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isPending ? 'Authenticating...' : 'Verify & Enter Console'}</span>
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
          {process.env.NODE_ENV === 'development' && (
            <button
              type="button"
              onClick={handleQuickDemoAccess}
              disabled={isPending}
              className="w-full py-2 px-3 rounded-lg border border-dashed border-[var(--color-border)] hover:border-[var(--color-accent)] text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors mb-3 cursor-pointer"
            >
              ⚡ Quick 1-Click Demo Admin Sign-In
            </button>
          )}
          <Link
            href="/"
            className="text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors inline-block"
          >
            ← Return to Public Work Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
