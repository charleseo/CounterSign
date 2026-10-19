'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { SealLogo } from '@/components/ui/SealLogo';
import { adminLoginAction } from '@/lib/actions/admin';
import {
  KeyRound,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react';

export default function AdminLoginPage() {
  const [authMode, setAuthMode] = useState<'password' | 'code'>('password');
  const [email, setEmail] = useState('admin@tracebase.ai');
  const [password, setPassword] = useState('AdminTraceBase2026!');
  const [code, setCode] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);

    startTransition(async () => {
      const res = await adminLoginAction(email, password);
      if (!res.success) {
        setErrorMessage(res.message);
      }
    });
  };

  const handleCodeLogin = (e: React.FormEvent) => {
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

  const handleSendCode = () => {
    setErrorMessage(null);
    setStatusMessage(null);

    startTransition(async () => {
      const res = await adminLoginAction(email);
      if (res.success) {
        setAuthMode('code');
        setStatusMessage(res.message);
      } else {
        setErrorMessage(res.message);
      }
    });
  };

  const fillTestAdminCredentials = () => {
    setEmail('admin@tracebase.ai');
    setPassword('AdminTraceBase2026!');
    setCode('123456');
    setAuthMode('password');
  };

  const handleQuickDemoAccess = () => {
    startTransition(async () => {
      await adminLoginAction('admin@tracebase.ai', 'AdminTraceBase2026!');
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--color-bg)]">
      <div className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 md:p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="inline-flex justify-center mb-4">
            <SealLogo size={48} priority />
          </div>
          <div className="inline-block px-2.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
            Restricted console
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">
            TraceBase admin
          </h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            Human verification and compliance console
          </p>
        </div>

        {/* Demo Credentials Helper Box */}
        <div className="mb-6 p-3.5 sm:p-4 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--color-text)] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>Test admin credentials</span>
            </span>
            <button
              type="button"
              onClick={fillTestAdminCredentials}
              className="text-[11px] font-semibold text-[var(--color-accent)] hover:underline cursor-pointer"
            >
              Fill credentials
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-lg bg-[var(--color-bg)]/80 border border-[var(--color-border)]">
              <span className="text-[10px] text-[var(--color-muted)] font-medium block">Staff email</span>
              <code className="text-[var(--color-text)] font-mono text-[11px] select-all">admin@tracebase.ai</code>
            </div>
            <div className="p-2 rounded-lg bg-[var(--color-bg)]/80 border border-[var(--color-border)]">
              <span className="text-[10px] text-[var(--color-muted)] font-medium block">Admin password</span>
              <code className="text-[var(--color-text)] font-mono text-[11px] select-all">AdminTraceBase2026!</code>
            </div>
          </div>

          <button
            type="button"
            onClick={handleQuickDemoAccess}
            disabled={isPending}
            className="w-full py-2 px-3 rounded-lg bg-[var(--color-accent)] text-[var(--color-accent-fg)] text-xs font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer min-h-[38px]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Signing in to admin console...</span>
              </>
            ) : (
              <>
                <span>1-click test admin sign in</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Auth Mode Toggle */}
        <div className="grid grid-cols-2 p-1 mb-5 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-xs font-medium">
          <button
            type="button"
            onClick={() => {
              setAuthMode('password');
              setErrorMessage(null);
            }}
            className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'password'
                ? 'bg-[var(--color-surface)] text-[var(--color-text)] font-bold shadow-xs'
                : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Password sign in</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('code');
              setErrorMessage(null);
            }}
            className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'code'
                ? 'bg-[var(--color-surface)] text-[var(--color-text)] font-bold shadow-xs'
                : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>2FA code</span>
          </button>
        </div>

        {statusMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {authMode === 'password' ? (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
                Staff email address
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

            <div>
              <label htmlFor="admin-password" className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
                Admin password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)]" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-text)] cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2.5 px-4 rounded-xl bg-[var(--color-accent)] text-[var(--color-accent-fg)] font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer min-h-[44px]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isPending ? 'Verifying admin password...' : 'Sign in to admin console'}</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleCodeLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-code-email" className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
                Staff email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)]" />
                <input
                  id="admin-code-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tracebase.ai"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="admin-code" className="block text-xs font-medium text-[var(--color-muted)]">
                  6-digit 2FA code
                </label>
                <button
                  type="button"
                  onClick={handleSendCode}
                  className="text-xs text-[var(--color-accent)] hover:underline cursor-pointer"
                >
                  Request new code
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
                Sample code: <span className="font-mono text-emerald-400">123456</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={isPending || code.length !== 6}
              className="w-full py-2.5 px-4 rounded-xl bg-[var(--color-accent)] text-[var(--color-accent-fg)] font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer min-h-[44px]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isPending ? 'Authenticating...' : 'Verify code and enter'}</span>
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
          <Link
            href="/"
            className="text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors inline-block"
          >
            ← Return to public work hub
          </Link>
        </div>
      </div>
    </div>
  );
}
