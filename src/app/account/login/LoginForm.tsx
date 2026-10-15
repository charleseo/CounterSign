"use client";

import React, { useState } from "react";
import { requestMagicLinkAction } from "@/lib/actions/account";
import { Mail, ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export function LoginForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [directUrl, setDirectUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");
    setDirectUrl(null);

    const formData = new FormData(e.currentTarget);
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

  if (status === "success") {
    return (
      <div className="p-6 rounded-2xl glass-panel border border-emerald-500/40 space-y-4 animate-in fade-in">
        <div className="flex items-center gap-2.5 text-accent-emerald font-semibold">
          <CheckCircle2 size={20} />
          <span>Magic Link Generated</span>
        </div>
        <p className="text-xs sm:text-sm text-readable leading-relaxed">
          {message} We do not use passwords. Click the link below to access your saved jobs and alerts.
        </p>

        {directUrl && (
          <div className="pt-2">
            <a
              href={directUrl}
              className="relative group inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-400 to-teal-400 text-void hover:shadow-[0_0_20px_rgba(61,235,255,0.4)] transition-all overflow-hidden"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
              <span className="relative z-10">Click to Enter Your Account</span>
              <ArrowRight size={14} className="relative z-10 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <p className="text-[11px] text-secondary text-center mt-2 font-mono">
              (Direct link active for 15 minutes)
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === "error" && (
        <div className="p-3.5 rounded-xl glass-panel border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
          <AlertCircle size={15} className="text-red-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-xs font-mono font-medium text-secondary uppercase tracking-wider">
          Email Address
        </label>
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="contributor@example.com"
            disabled={status === "submitting"}
            className="w-full px-3.5 py-2.5 pl-10 rounded-xl bg-surface/70 border border-subtle focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(61,235,255,0.2)] text-primary placeholder:text-secondary/50 text-xs sm:text-sm outline-none transition-all"
          />
          <Mail size={16} className="absolute left-3.5 top-3 text-secondary" />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="relative group w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-400 to-teal-400 text-void hover:shadow-[0_0_20px_rgba(61,235,255,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer overflow-hidden"
      >
        <div className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
        {status === "submitting" ? (
          <>
            <Loader2 size={16} className="animate-spin relative z-10" />
            <span className="relative z-10">Sending Login Link...</span>
          </>
        ) : (
          <>
            <span className="relative z-10">Send Magic Login Link</span>
            <ArrowRight size={14} className="relative z-10 group-hover:translate-x-0.5 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}
