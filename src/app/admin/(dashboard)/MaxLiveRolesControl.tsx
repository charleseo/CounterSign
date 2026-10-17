'use client';

import React, { useState, useTransition } from 'react';
import { updateMaxLiveRolesAction } from '@/lib/actions/admin';
import { Sliders, Check, RefreshCw } from 'lucide-react';

export function MaxLiveRolesControl({ currentLimit }: { currentLimit: number }) {
  const [limit, setLimit] = useState(currentLimit);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await updateMaxLiveRolesAction(limit);
      if (res.success && res.data) {
        setFeedback(res.message);
        setIsEditing(false);
        setTimeout(() => setFeedback(null), 3000);
      }
    });
  };

  if (!isEditing) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="text-[var(--color-muted)]">
          Target Cap: <strong className="text-[var(--color-text)] font-mono">{limit}</strong> roles
        </span>
        <button
          onClick={() => setIsEditing(true)}
          className="text-[#5A35C8] hover:underline inline-flex items-center gap-1 cursor-pointer"
        >
          <Sliders className="w-3 h-3" />
          <span>Edit cap</span>
        </button>
        {feedback && (
          <span className="text-emerald-400 font-medium">{feedback}</span>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="flex items-center gap-2 text-xs">
      <input
        type="number"
        min={5}
        max={150}
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        className="w-16 px-2 py-1 rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] font-mono outline-none"
      />
      <button
        type="submit"
        disabled={isPending}
        className="px-2.5 py-1 rounded bg-[#5A35C8] text-white font-medium text-[11px] hover:bg-[#4D2BAE] disabled:opacity-50 cursor-pointer flex items-center gap-1"
      >
        {isPending ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
        <span>Save</span>
      </button>
      <button
        type="button"
        onClick={() => {
          setLimit(currentLimit);
          setIsEditing(false);
        }}
        className="px-2 py-1 rounded border border-[var(--color-border)] text-[var(--color-muted)] text-[11px]"
      >
        Cancel
      </button>
    </form>
  );
}
