"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, AlertCircle, ArrowRight, MessageCircle, Send } from "lucide-react";
import { useSelectedCountry } from "@/components/ui/CountrySelector";
import { getCountryMeta } from "@/lib/utils/country";

import { subscribeNewsletterAction } from "@/app/newsletter/actions";
import { trackEvent } from "@/lib/analytics/tracker";

export interface EmailCaptureProps {
  headline?: string;
  subtext?: string;
  title?: string;
  description?: string;
  source?: string;
  buttonText?: string;
  className?: string;
  onSubscribe?: (email: string) => Promise<boolean>;
}

/**
 * EmailCapture (Section 7.1, 7.12 & 10.11)
 * Single email field with inline validation, NDPA 2023 explicit consent line,
 * double opt-in email dispatch, and in-place state transitions.
 */
export function EmailCapture({
  headline,
  subtext,
  title,
  description,
  buttonText = "Subscribe",
  className = "",
  onSubscribe,
}: EmailCaptureProps) {
  const displayHeadline = headline || title || "Get verified AI roles in your inbox";
  const displaySubtext = subtext || description || "Weekly digest of human-checked opportunities open to your country. Zero spam.";
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationUrl, setConfirmationUrl] = useState<string | null>(null);
  const selectedCountryCode = useSelectedCountry();
  const region = getCountryMeta(selectedCountryCode).region;

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("sending");

    try {
      if (onSubscribe) {
        const ok = await onSubscribe(email);
        if (!ok) throw new Error("Subscription failed");
      } else {
        const res = await subscribeNewsletterAction({
          email,
          honeypot,
        });

        if (!res.success) {
          throw new Error(res.message);
        }

        if (res.confirmationUrl) {
          setConfirmationUrl(res.confirmationUrl);
        }
      }
      try {
        trackEvent('alert_signup', {
          source: 'newsletter_capture',
          country: selectedCountryCode,
        });
      } catch {
        // Non-blocking telemetry
      }
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Could not complete subscription. Please retry."
      );
    }
  };

  return (
    <div
      className={`rounded-2xl border border-subtle bg-surface p-6 sm:p-8 space-y-4 ${className}`}
    >
      <div className="space-y-1">
        <h3 className="text-lg sm:text-xl font-bold text-primary tracking-tight">
          {displayHeadline}
        </h3>
        <p className="text-xs sm:text-sm text-readable leading-relaxed">
          {displaySubtext}
        </p>
      </div>

      {status === "success" ? (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-start gap-3 text-xs animate-in fade-in duration-200">
          <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <div className="font-semibold text-primary">Check your inbox to confirm.</div>
            <p className="text-readable">
              A double opt-in confirmation link has been sent to <span className="font-mono text-accent-cyan">{email}</span>. Click it to activate your weekly verified digest.
            </p>
            {confirmationUrl && (
              <div className="pt-1">
                <a
                  href={confirmationUrl}
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-accent-cyan hover:underline"
                >
                  <span>Instant Verification: Click to confirm &rarr;</span>
                </a>
              </div>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3" noValidate>
          {/* Honeypot field for bot protection */}
          <input
            type="text"
            name="website_profile_hp"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Broadcast channels: shown first for Africa and Asia, smaller secondary links for others */}
          {Boolean(process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL || process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL) &&
            (region === "africa" || region === "asia") && (
              <div className="p-3.5 rounded-xl border border-rule bg-sheet space-y-2">
                <div className="flex items-center justify-between text-xs text-secondary font-medium">
                  <span>Instant broadcast channels</span>
                  <span className="text-[11px] text-muted">Never collects phone numbers</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL && (
                    <a
                      href={process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-xs font-semibold text-[#128C7E] dark:text-[#25D366] transition-colors min-h-[44px]"
                    >
                      <MessageCircle size={15} />
                      <span>Follow on WhatsApp</span>
                    </a>
                  )}
                  {process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL && (
                    <a
                      href={process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0088cc]/15 hover:bg-[#0088cc]/25 border border-[#0088cc]/30 text-xs font-semibold text-[#0088cc] transition-colors min-h-[44px]"
                    >
                      <Send size={14} />
                      <span>Follow on Telegram</span>
                    </a>
                  )}
                </div>
              </div>
            )}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                disabled={status === "sending"}
                placeholder="name@domain.com"
                aria-label="Email address for weekly verified jobs"
                aria-invalid={status === "error"}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border bg-surface text-xs sm:text-sm text-ink placeholder:text-secondary focus:outline-none focus:border-[#5A35C8] transition-colors ${
                  status === "error" ? "border-accent-danger" : "border-rule"
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="px-5 py-2.5 rounded-lg bg-[#5A35C8] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 min-h-[44px] cursor-pointer"
            >
              <span>{status === "sending" ? "Subscribing..." : buttonText}</span>
              {status !== "sending" && <ArrowRight size={14} aria-hidden="true" />}
            </button>
          </div>

          {/* Secondary links for US, UK, Canada & Worldwide */}
          {Boolean(process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL || process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL) &&
            region !== "africa" &&
            region !== "asia" && (
              <div className="flex flex-wrap items-center gap-3 text-xs text-secondary pt-0.5">
                <span>Or follow broadcast feeds:</span>
                {process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL && (
                  <a
                    href={process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-secondary hover:text-ink hover:underline min-h-[44px]"
                  >
                    <MessageCircle size={13} className="text-[#25D366]" />
                    <span>Follow on WhatsApp</span>
                  </a>
                )}
                {process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL && process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL && (
                  <span aria-hidden="true">&bull;</span>
                )}
                {process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL && (
                  <a
                    href={process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-secondary hover:text-ink hover:underline min-h-[44px]"
                  >
                    <Send size={13} className="text-[#0088cc]" />
                    <span>Follow on Telegram</span>
                  </a>
                )}
              </div>
            )}

          {status === "error" && (
            <div className="flex items-center gap-1.5 text-xs text-[#FF6B6B] font-mono">
              <AlertCircle size={13} aria-hidden="true" />
              <span>{errorMessage}</span>
            </div>
          )}

          <p className="text-[11px] text-secondary leading-normal">
            By subscribing, you agree to receive weekly verified role notices. Unsubscribe anytime in one click. Protected under NDPA 2023.
          </p>
        </form>
      )}
    </div>
  );
}
