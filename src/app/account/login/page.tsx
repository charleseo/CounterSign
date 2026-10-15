import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { dbRepository } from "@/lib/db/repository";
import { LoginForm } from "./LoginForm";
import { Lock, Bookmark, Trash2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Account Login | Countersign",
  description:
    "Passwordless sign-in to Countersign. Access saved jobs, adjust verified role alerts, and manage your data preferences.",
  alternates: {
    canonical: "https://countersign.ai/account/login",
  },
};

export const instant = false;

interface LoginPageProps {
  searchParams: Promise<{ status?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("countersign_session")?.value;
  if (sessionToken) {
    const user = dbRepository.getSessionUser(sessionToken);
    if (user) {
      redirect("/account");
    }
  }

  const { status, error } = await searchParams;

  return (
    <div className="relative max-w-md mx-auto px-4 py-12 sm:py-16 space-y-8">
      {/* Ambient background glow accents */}
      <div className="absolute top-10 -left-20 w-72 h-72 bg-[radial-gradient(circle,rgba(61,235,255,0.08)_0%,transparent_70%)] pointer-events-none -z-10" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-[radial-gradient(circle,rgba(0,229,153,0.05)_0%,transparent_70%)] pointer-events-none -z-10" />

      {/* Brand Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium glass-pill text-accent-cyan border border-cyan-500/30 shadow-sm mx-auto">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Passwordless Sovereign Auth</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
          <span className="text-gradient-cyan">Sign In to Countersign</span>
        </h1>
        <p className="text-xs sm:text-sm text-readable leading-relaxed">
          Passwordless magic link sign-in. Save verified jobs, manage country alerts, and control your data.
        </p>
      </div>

      {/* Notifications */}
      {status === "account_deleted" && (
        <div className="p-4 rounded-2xl glass-panel border border-emerald-500/40 text-xs text-accent-emerald space-y-1.5 shadow-lg">
          <p className="font-semibold text-emerald-400">Account and Data Deleted</p>
          <p className="text-secondary leading-relaxed">
            In accordance with NDPA 2023, your profile, saved jobs, alert subscriptions, and consent records have been completely purged from our systems.
          </p>
        </div>
      )}

      {error === "invalid_or_expired_token" && (
        <div className="p-4 rounded-2xl glass-panel border border-red-500/40 text-xs text-red-300 shadow-lg">
          That login link has expired or has already been used. Please request a new one below.
        </div>
      )}

      {/* Login Card */}
      <div className="p-6 sm:p-7 rounded-2xl glass-panel relative overflow-hidden border border-cyan-500/20 space-y-6 shadow-2xl">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[radial-gradient(circle,rgba(61,235,255,0.1)_0%,transparent_70%)] pointer-events-none" />
        <LoginForm />

        <div className="pt-4 border-t border-white/[0.08] space-y-2.5 text-xs text-secondary">
          <div className="flex items-center gap-2.5">
            <Lock size={14} className="text-accent-cyan shrink-0" />
            <span>Zero passwords to remember or compromise.</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Bookmark size={14} className="text-accent-cyan shrink-0" />
            <span>Bookmark roles across devices.</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Trash2 size={14} className="text-accent-cyan shrink-0" />
            <span>One-click complete account deletion under NDPA 2023.</span>
          </div>
        </div>
      </div>

      {/* Privacy note */}
      <p className="text-center text-[11px] text-secondary">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="text-primary hover:text-accent-cyan hover:underline transition-colors">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-primary hover:text-accent-cyan hover:underline transition-colors">
          Privacy Policy
        </Link>
        . Data minimization enforced.
      </p>
    </div>
  );
}
