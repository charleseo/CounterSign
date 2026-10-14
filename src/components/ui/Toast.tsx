"use client";

import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "info" | "success" | "error";
  message: string;
  duration?: number;
}

export interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
  className?: string;
}

/**
 * Toast (Section 10.11)
 * Accessible, non-blocking notification toast.
 * Never color alone: pairs icon + text. Automatically dismisses after duration.
 */
export function Toast({ toast, onClose, className = "" }: ToastProps) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, toast.duration || 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const config = {
    info: {
      icon: Info,
      color: "text-[#3DEBFF]",
      border: "border-[#3DEBFF]/30",
      bg: "bg-[#0B1222]",
    },
    success: {
      icon: CheckCircle2,
      color: "text-[#45F5C5]",
      border: "border-[#45F5C5]/30",
      bg: "bg-[#0B1222]",
    },
    error: {
      icon: AlertCircle,
      color: "text-[#FF6B6B]",
      border: "border-[#FF6B6B]/30",
      bg: "bg-[#0B1222]",
    },
  }[toast.type];

  const Icon = config.icon;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-5 right-5 z-50 max-w-sm rounded-xl border ${config.border} ${config.bg} p-3.5 shadow-2xl flex items-center gap-3 text-xs font-mono animate-in slide-in-from-bottom duration-200 ${className}`}
    >
      <Icon size={16} className={`${config.color} flex-shrink-0`} aria-hidden="true" />
      <span className="text-primary flex-1 leading-snug">{toast.message}</span>
      <button
        type="button"
        onClick={onClose}
        className="text-secondary hover:text-primary p-1 rounded"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}
