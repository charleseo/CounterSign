import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { dbRepository } from "@/lib/db/repository";
import { LoginForm } from "./LoginForm";
import { Lock, Bookmark, Trash2, ShieldCheck } from "lucide-react";
import { absoluteUrl } from "@/lib/utils/siteUrl";

export const metadata: Metadata = {
  title: "Account Login | TraceBase",
  description:
    "Passwordless sign-in to TraceBase. Access saved jobs, adjust verified role alerts, and manage your data preferences.",
  alternates: {
    canonical: absoluteUrl("/account/login"),
  },
};

export const instant = false;

interface LoginPageProps {
  searchParams: Promise<{ status?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("tracebase_session")?.value || cookieStore.get("countersign_session")?.value;
  if (sessionToken) {
    const user = dbRepository.getSessionUser(sessionToken);
    if (user) {
      redirect("/account");
    }
  }

  const { status, error } = await searchParams;

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-16 space-y-8">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-rule bg-sheet text-xs text-secondary font-medium mx-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-[#5A35C8]" />
          <span>Contributor sign in</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
          Sign in to your account
        </h1>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          Sign in with email and password or a magic link. Save verified jobs, manage alerts, and track applications.
        </p>
      </div>

      {/* Notifications */}
      {status === "account_deleted" && (
        <div className="p-4 rounded-xl bg-sheet border border-emerald-500/40 text-xs text-emerald-800 dark:text-emerald-300 space-y-1.5">
          <p className="font-semibold text-emerald-700 dark:text-emerald-400">Account and data deleted</p>
          <p className="text-secondary leading-relaxed">
            Under NDPA 2023, your profile, saved jobs, alert subscriptions, and consent records have been purged from our systems.
          </p>
        </div>
      )}

      {error === "invalid_or_expired_token" && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-xs text-red-700 dark:text-red-300">
          That login link has expired or has already been used. Please request a new one below.
        </div>
      )}

      {/* Login Card */}
      <div className="p-6 sm:p-7 rounded-xl bg-sheet border border-rule space-y-6">
        <LoginForm />

        <div className="pt-4 border-t border-rule space-y-2.5 text-xs text-secondary">
          <div className="flex items-center gap-2.5">
            <Lock size={14} className="text-brand-ink shrink-0" />
            <span>Zero passwords to remember or compromise.</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Bookmark size={14} className="text-brand-ink shrink-0" />
            <span>Bookmark roles across devices.</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Trash2 size={14} className="text-brand-ink shrink-0" />
            <span>One-click complete account deletion under NDPA 2023.</span>
          </div>
        </div>
      </div>

      {/* Privacy note */}
      <p className="text-center text-[11px] text-secondary">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="text-brand-ink underline hover:text-[#4A2AB0] transition-colors">
          terms of service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-brand-ink underline hover:text-[#4A2AB0] transition-colors">
          privacy policy
        </Link>
        . Data minimization enforced.
      </p>
    </div>
  );
}
