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
      <div className="p-6 rounded-xl border border-accent-emerald/40 bg-accent-emerald/5 space-y-4">
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
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-xs font-semibold bg-accent-cyan text-[#04080F] hover:bg-accent-cyan/90 transition-colors"
            >
              <span>Click to Enter Your Account</span>
              <ArrowRight size={14} />
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
            className="w-full px-3.5 py-2.5 pl-10 rounded-lg border border-subtle bg-void text-primary placeholder:text-secondary text-sm focus:outline-none focus:border-focus transition-colors"
          />
          <Mail size={16} className="absolute left-3.5 top-3 text-secondary" />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold bg-accent-cyan text-[#04080F] hover:bg-accent-cyan/90 transition-colors flex items-center justify-center gap-2"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Sending Login Link...</span>
          </>
        ) : (
          <>
            <span>Send Magic Sign-In Link</span>
            <ArrowRight size={14} />
          </>
        )}
      </button>

      {status === "error" && (
        <div className="p-3 rounded-lg border border-accent-danger/30 bg-accent-danger/5 flex items-center gap-2 text-xs text-accent-danger">
          <AlertCircle size={15} />
          <span>{message}</span>
        </div>
      )}
    </form>
  );
}
