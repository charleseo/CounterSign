"use client";

import React, { useState, useEffect, useRef } from "react";
import { Share2, Copy, Check, Mail, MessageCircle, Send, X as CloseIcon } from "lucide-react";
import { useSelectedCountry } from "@/components/ui/CountrySelector";
import { getCountryMeta } from "@/lib/utils/country";
import { getSiteUrl } from "@/lib/utils/siteUrl";
import { trackEvent } from "@/lib/analytics/tracker";

export type SharePageType = "role" | "platform" | "guide" | "scam-check" | "scam_alert";

export interface ShareButtonProps {
  title: string;
  shareText?: string;
  text?: string;
  url?: string;
  pageType: SharePageType;
  className?: string;
  buttonText?: string;
}

type ChannelActionItem = {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  type: "action";
  onClick: () => Promise<void>;
};

type ChannelLinkItem = {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  type: "link";
  href: string;
  action: () => void;
};

type ChannelItem = ChannelActionItem | ChannelLinkItem;

const LinkedInIcon = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0-.01-3.28 1.64 1.64 0 0 0 .01 3.28M5.07 18.5h2.78v-8.37H5.07v8.37z" />
  </svg>
);

const XTwitterIcon = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function ShareButton({
  title,
  shareText,
  text,
  url,
  pageType,
  className = "",
  buttonText = "Share",
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const selectedCountryCode = useSelectedCountry();
  const countryRegion = getCountryMeta(selectedCountryCode).region;

  const effectiveShareText = shareText || text || title;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getFullUrl = () => {
    const siteUrl = getSiteUrl();
    if (url) {
      if (url.startsWith("http")) return url;
      if (typeof window !== "undefined") {
        return `${window.location.origin}${url.startsWith("/") ? "" : "/"}${url}`;
      }
      return `${siteUrl}${url.startsWith("/") ? "" : "/"}${url}`;
    }
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return siteUrl;
  };

  const trackShare = (channel: string) => {
    try {
      trackEvent('share_click', { pageType, channel });
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("countersign:share_click", {
            detail: {
              pageType,
              channel,
              timestamp: new Date().toISOString(),
            },
          })
        );
      }
    } catch {
      // Telemetry silence
    }
  };

  const handleShareClick = async () => {
    const fullUrl = getFullUrl();

    // On mobile devices supporting Web Share API, open native share sheet first
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: effectiveShareText,
          url: fullUrl,
        });
        trackShare("web_share_api");
        return;
      } catch (err: unknown) {
        if ((err as Error)?.name === "AbortError") {
          return; // User cancelled native sheet
        }
      }
    }

    // Fallback dropdown menu
    setIsOpen(!isOpen);
  };

  const handleCopy = async () => {
    const fullUrl = getFullUrl();
    try {
      await navigator.clipboard.writeText(`${effectiveShareText} ${fullUrl}`.trim());
      setCopied(true);
      trackShare("copy_link");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const fullUrl = getFullUrl();
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedText = encodeURIComponent(effectiveShareText);
  const encodedWhatsApp = encodeURIComponent(`${effectiveShareText} ${fullUrl}`);

  const channels: Record<string, ChannelItem> = {
    whatsapp: {
      type: "link",
      name: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedWhatsApp}`,
      action: () => trackShare("whatsapp"),
    },
    telegram: {
      type: "link",
      name: "Telegram",
      icon: Send,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      action: () => trackShare("telegram"),
    },
    copy: {
      type: "action",
      name: copied ? "Copied link!" : "Copy link",
      icon: copied ? Check : Copy,
      onClick: handleCopy,
    },
    linkedin: {
      type: "link",
      name: "LinkedIn",
      icon: LinkedInIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      action: () => trackShare("linkedin"),
    },
    x: {
      type: "link",
      name: "X (Twitter)",
      icon: XTwitterIcon,
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      action: () => trackShare("x"),
    },
    email: {
      type: "link",
      name: "Email",
      icon: Mail,
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(effectiveShareText + "\n\n" + fullUrl)}`,
      action: () => trackShare("email"),
    },
  };

  // Region order:
  // Africa and Asia: WhatsApp, Telegram, Copy link, X, LinkedIn, Email
  // US, UK, Canada & Default: Copy link, LinkedIn, X, Email, WhatsApp, Telegram
  const isAfricaOrAsia = countryRegion === "africa" || countryRegion === "asia";
  const channelList: ChannelItem[] = isAfricaOrAsia
    ? [channels.whatsapp, channels.telegram, channels.copy, channels.x, channels.linkedin, channels.email]
    : [channels.copy, channels.linkedin, channels.x, channels.email, channels.whatsapp, channels.telegram];

  return (
    <div className={`relative inline-block ${className}`} ref={menuRef}>
      <button
        type="button"
        onClick={handleShareClick}
        aria-expanded={isOpen}
        aria-label="Share this page"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rule bg-surface hover:bg-sheet text-xs font-semibold text-ink transition-colors min-h-[44px] cursor-pointer"
      >
        <Share2 size={14} className="text-[#5A35C8]" />
        <span>{buttonText}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl border border-rule bg-sheet p-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-subtle mb-1 text-[11px] font-semibold text-secondary">
            <span>Share this page</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-secondary hover:text-ink cursor-pointer"
              aria-label="Close share menu"
            >
              <CloseIcon size={12} />
            </button>
          </div>

          <div className="space-y-0.5">
            {channelList.map((ch, idx) => {
              const IconComp = ch.icon;
              if (ch.type === "action") {
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      ch.onClick();
                    }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-ink hover:bg-surface text-left transition-colors cursor-pointer min-h-[40px]"
                  >
                    <IconComp size={14} className="text-[#5A35C8] shrink-0" />
                    <span>{ch.name}</span>
                  </button>
                );
              }

              return (
                <a
                  key={idx}
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    ch.action();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-ink hover:bg-surface text-left transition-colors min-h-[40px]"
                >
                  <IconComp size={14} className="text-[#5A35C8] shrink-0" />
                  <span>{ch.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
