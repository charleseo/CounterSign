"use client";

import React, { useState, useTransition } from "react";
import {
  requestMagicLinkAction,
  passwordLoginAction,
  demoContributorLoginAction,
} from "@/lib/actions/account";
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Eye,
  EyeOff,
  KeyRound,
} from "lucide-react";

export function LoginForm() {
  const [authMode, setAuthMode] = useState<"password" | "magic">("password");
  const [email, setEmail] = useState("contributor@tracebase.ai");
  const [password, setPassword] = useState("TraceBase2026!");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [directUrl, setDirectUrl] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const result = await passwordLoginAction(formData);
    if (result && !result.success) {
      setStatus("error");
      setMessage(result.message || "Invalid credentials. Please try again.");
    }
  };

  const handleMagicSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");
    setDirectUrl(null);

    const formData = new FormData();
    formData.append("email", email);

    const result = await requestMagicLinkAction(formData);
    if (result.success) {
      setStatus("success");
      setMessage(result.message);
      if (result.directUrl) {
        setDirectUrl(result.directUrl);
      }
    } else {
      setStatus("error");
      setMessage(result.message || "That did not send. Your text is still here. Try again.");
    }
  };

  const fillTestCredentials = () => {
    setEmail("contributor@tracebase.ai");
    setPassword("TraceBase2026!");
    setAuthMode("password");
  };

  return (
    <div className="space-y-5">
      {/* Demo Credentials Helper Box */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-[#5A35C8]/10 border border-[#5A35C8]/30 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-ink flex items-center gap-1.5">
            <Sparkles size={14} className="text-[#8B5CF6]" />
            <span>Test contributor credentials</span>
          </span>
          <button
            type="button"
            onClick={fillTestCredentials}
            className="text-[11px] font-semibold text-[#8B5CF6] hover:underline cursor-pointer"
          >
            Fill credentials
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded-lg bg-surface/80 border border-rule">
            <span className="text-[10px] text-secondary font-medium block">Email</span>
            <code className="text-ink font-mono text-[11px] select-all">contributor@tracebase.ai</code>
          </div>
          <div className="p-2 rounded-lg bg-surface/80 border border-rule">
            <span className="text-[10px] text-secondary font-medium block">Password</span>
            <code className="text-ink font-mono text-[11px] select-all">TraceBase2026!</code>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            startTransition(async () => {
              await demoContributorLoginAction();
            })
          }
          disabled={isPending || status === "submitting"}
          className="w-full py-2 px-3 rounded-lg bg-[#5A35C8] hover:bg-[#4A2AB0] text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer min-h-[38px]"
        >
          {isPending ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              <span>Opening account...</span>
            </>
          ) : (
            <>
              <span>1-click test contributor sign in</span>
              <ArrowRight size={13} />
            </>
          )}
        </button>
      </div>

      {/* Mode Switcher */}
      <div className="grid grid-cols-2 p-1 rounded-xl bg-surface border border-rule text-xs font-medium">
        <button
          type="button"
          onClick={() => {
            setAuthMode("password");
            setStatus("idle");
            setMessage("");
          }}
          className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            authMode === "password"
              ? "bg-sheet text-ink font-bold shadow-xs"
              : "text-secondary hover:text-ink"
          }`}
        >
          <KeyRound size={13} />
          <span>Password sign in</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setAuthMode("magic");
            setStatus("idle");
            setMessage("");
          }}
          className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            authMode === "magic"
              ? "bg-sheet text-ink font-bold shadow-xs"
              : "text-secondary hover:text-ink"
          }`}
        >
          <Mail size={13} />
          <span>Magic link</span>
        </button>
      </div>

      {status === "error" && (
        <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
          <AlertCircle size={15} className="text-red-600 dark:text-red-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {status === "success" && (
        <div className="p-4 rounded-xl bg-sheet border border-emerald-500/40 space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-xs sm:text-sm">
            <CheckCircle2 size={18} />
            <span>Magic link generated</span>
          </div>
          <p className="text-xs text-secondary leading-relaxed">
            {message} Click the link below to enter your account immediately.
          </p>

          {directUrl && (
            <div className="pt-1">
              <a
                href={directUrl}
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-xs font-semibold bg-[#5A35C8] hover:bg-[#4A2AB0] text-white transition-colors min-h-[44px]"
              >
                <span>Click to enter your account</span>
                <ArrowRight size={14} />
              </a>
              <p className="text-[11px] text-secondary text-center mt-2 tabular-nums">
                Direct link active for 15 minutes
              </p>
            </div>
          )}
        </div>
      )}

      {/* Forms */}
      {authMode === "password" ? (
        <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
          <div className="space-y-1.5">
            <label htmlFor="user-email" className="block text-xs font-medium text-secondary">
              Email address
            </label>
            <div className="relative">
              <input
                id="user-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contributor@tracebase.ai"
                disabled={status === "submitting" || isPending}
                className="w-full px-3.5 py-2.5 pl-10 rounded-lg bg-sheet border border-rule focus:border-[#5A35C8] focus:ring-1 focus:ring-[#5A35C8] text-primary placeholder:text-secondary/50 text-xs sm:text-sm outline-none transition-all min-h-[44px]"
              />
              <Mail size={16} className="absolute left-3.5 top-3 text-secondary" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="user-password" className="block text-xs font-medium text-secondary">
              Password
            </label>
            <div className="relative">
              <input
                id="user-password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                disabled={status === "submitting" || isPending}
                className="w-full px-3.5 py-2.5 pl-10 pr-10 rounded-lg bg-sheet border border-rule focus:border-[#5A35C8] focus:ring-1 focus:ring-[#5A35C8] text-primary placeholder:text-secondary/50 text-xs sm:text-sm outline-none transition-all min-h-[44px]"
              />
              <Lock size={16} className="absolute left-3.5 top-3 text-secondary" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-secondary hover:text-ink cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "submitting" || isPending}
            className="w-full py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold bg-[#5A35C8] hover:bg-[#4A2AB0] text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer min-h-[44px]"
          >
            {status === "submitting" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign in to account</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handleMagicSubmit} className="space-y-3.5">
          <div className="space-y-1.5">
            <label htmlFor="magic-email" className="block text-xs font-medium text-secondary">
              Email address
            </label>
            <div className="relative">
              <input
                id="magic-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contributor@example.com"
                disabled={status === "submitting" || isPending}
                className="w-full px-3.5 py-2.5 pl-10 rounded-lg bg-sheet border border-rule focus:border-[#5A35C8] focus:ring-1 focus:ring-[#5A35C8] text-primary placeholder:text-secondary/50 text-xs sm:text-sm outline-none transition-all min-h-[44px]"
              />
              <Mail size={16} className="absolute left-3.5 top-3 text-secondary" />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "submitting" || isPending}
            className="w-full py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold bg-[#5A35C8] hover:bg-[#4A2AB0] text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer min-h-[44px]"
          >
            {status === "submitting" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Sending link...</span>
              </>
            ) : (
              <>
                <span>Send magic login link</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
