"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface PlatformCountryAlertFormProps {
  platformSlug: string;
  platformName: string;
  countryCode: string;
  countryName: string;
}

export function PlatformCountryAlertForm({
  platformSlug,
  platformName,
  countryCode,
  countryName,
}: PlatformCountryAlertFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          country_code: countryCode,
          work_types: [platformSlug],
          frequency: "instant",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to register alert.");
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("That did not send. Your text is still here. Try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="p-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 flex items-start gap-3">
        <CheckCircle2 size={18} className="text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-semibold text-emerald-800 dark:text-emerald-300">Alert Registered</p>
          <p className="text-secondary">
            We will email <strong>{email}</strong> immediately if {platformName}&apos;s contributor eligibility policy changes for {countryName}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={`Enter email for ${countryName} updates`}
          required
          disabled={status === "submitting"}
          className="flex-1 px-3 py-2.5 rounded-lg border border-rule bg-sheet text-primary placeholder:text-secondary/60 text-xs sm:text-sm focus:outline-none focus:border-[#5A35C8] focus:ring-1 focus:ring-[#5A35C8] transition-colors min-h-[44px]"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#5A35C8] hover:bg-[#4A2AB0] text-white transition-colors shrink-0 flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <span>Notify Me</span>
          )}
        </button>
      </div>

      {status === "error" && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
          <AlertCircle size={14} />
          <span>{errorMessage}</span>
        </div>
      )}

      <p className="text-[11px] text-secondary">
        Protected under NDPA 2023. We only use your email to notify you of verified status changes.
      </p>
    </form>
  );
}
