import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { dbRepository } from "@/lib/db/repository";
import { LoginForm } from "./LoginForm";
import { Lock, Bookmark, Trash2 } from "lucide-react";

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
    <div className="max-w-md mx-auto px-4 py-12 sm:py-16 space-y-8">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
          Sign In to Countersign
        </h1>
        <p className="text-xs sm:text-sm text-readable leading-relaxed">
          Passwordless magic link sign-in. Save verified jobs, manage country alerts, and control your data.
        </p>
      </div>

      {/* Notifications */}
      {status === "account_deleted" && (
        <div className="p-3.5 rounded-xl border border-accent-emerald/40 bg-accent-emerald/5 text-xs text-accent-emerald space-y-1">
          <p className="font-semibold">Account and Data Deleted</p>
          <p className="text-readable">
            In accordance with NDPA 2023, your profile, saved jobs, alert subscriptions, and consent records have been completely purged from our systems.
          </p>
        </div>
      )}

      {error === "invalid_or_expired_token" && (
        <div className="p-3.5 rounded-xl border border-accent-danger/40 bg-accent-danger/5 text-xs text-accent-danger">
          That login link has expired or has already been used. Please request a new one below.
        </div>
      )}

      {/* Login Card */}
      <div className="p-6 rounded-xl border border-subtle bg-surface space-y-5">
        <LoginForm />

        <div className="pt-3 border-t border-subtle space-y-2 text-xs text-secondary">
          <div className="flex items-center gap-2">
            <Lock size={13} className="text-accent-cyan shrink-0" />
            <span>Zero passwords to remember or compromise.</span>
          </div>
          <div className="flex items-center gap-2">
            <Bookmark size={13} className="text-accent-cyan shrink-0" />
            <span>Bookmark roles across devices.</span>
          </div>
          <div className="flex items-center gap-2">
            <Trash2 size={13} className="text-accent-cyan shrink-0" />
            <span>One-click complete account deletion under NDPA 2023.</span>
          </div>
        </div>
      </div>

      {/* Privacy note */}
      <p className="text-center text-[11px] text-secondary">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="text-primary hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
        . Data minimization enforced.
      </p>
    </div>
  );
}
