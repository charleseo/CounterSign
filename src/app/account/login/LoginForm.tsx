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
      <div className="p-6 rounded-xl bg-sheet border border-emerald-500/40 space-y-4">
        <div className="flex items-center gap-2.5 text-emerald-700 dark:text-emerald-400 font-semibold">
          <CheckCircle2 size={20} />
          <span>Magic Link Generated</span>
        </div>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          {message} We do not use passwords. Click the link below to access your saved jobs and alerts.
        </p>

        {directUrl && (
          <div className="pt-2">
            <a
              href={directUrl}
              className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg text-xs font-semibold bg-[#5A35C8] hover:bg-[#4A2AB0] text-white transition-colors min-h-[44px]"
            >
              <span>Click to Enter Your Account</span>
              <ArrowRight size={14} />
            </a>
            <p className="text-[11px] text-secondary text-center mt-2 tabular-nums">
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
        <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
          <AlertCircle size={15} className="text-red-600 dark:text-red-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-xs font-medium text-secondary">
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
            className="w-full px-3.5 py-2.5 pl-10 rounded-lg bg-sheet border border-rule focus:border-[#5A35C8] focus:ring-1 focus:ring-[#5A35C8] text-primary placeholder:text-secondary/50 text-xs sm:text-sm outline-none transition-all min-h-[44px]"
          />
          <Mail size={16} className="absolute left-3.5 top-3 text-secondary" />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold bg-[#5A35C8] hover:bg-[#4A2AB0] text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer min-h-[44px]"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Sending Login Link...</span>
          </>
        ) : (
          <>
            <span>Send Magic Login Link</span>
            <ArrowRight size={14} />
          </>
        )}
      </button>
    </form>
  );
}
