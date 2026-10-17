'use client';

import React, { useState, useTransition } from 'react';
import { updateRechecksPausedAction } from '@/lib/actions/admin';
import { Calendar, Check, RefreshCw } from 'lucide-react';

export function RechecksPausedControl({
  currentDate,
}: {
  currentDate: string | null;
}) {
  const [dateValue, setDateValue] = useState(currentDate || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const val = dateValue.trim() ? dateValue.trim() : null;
      const res = await updateRechecksPausedAction(val);
      if (res.success) {
        setFeedback(res.message);
        setIsEditing(false);
        setTimeout(() => setFeedback(null), 3000);
      }
    });
  };

  const handleResume = () => {
    startTransition(async () => {
      const res = await updateRechecksPausedAction(null);
      if (res.success) {
        setDateValue('');
        setFeedback('Rechecks active');
        setIsEditing(false);
        setTimeout(() => setFeedback(null), 3000);
      }
    });
  };

  if (!isEditing) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="text-[var(--color-muted)]">
          Rechecks:{' '}
          <strong
            className={`font-mono ${
              currentDate ? 'text-amber-400' : 'text-emerald-400'
            }`}
          >
            {currentDate ? `Paused until ${currentDate}` : 'Running normally'}
          </strong>
        </span>
        <button
          onClick={() => setIsEditing(true)}
          className="text-[#5A35C8] hover:underline inline-flex items-center gap-1 cursor-pointer"
        >
          <Calendar className="w-3 h-3" />
          <span>{currentDate ? 'Change' : 'Pause'}</span>
        </button>
        {feedback && (
          <span className="text-emerald-400 font-medium">{feedback}</span>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="flex flex-wrap items-center gap-2 text-xs">
      <input
        type="text"
        placeholder="e.g. 24 October 2026"
        value={dateValue}
        onChange={(e) => setDateValue(e.target.value)}
        className="w-36 px-2 py-1 rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] outline-none"
      />
      <button
        type="submit"
        disabled={isPending}
        className="px-2.5 py-1 rounded bg-[#5A35C8] text-white font-medium text-[11px] hover:bg-[#4D2BAE] disabled:opacity-50 cursor-pointer flex items-center gap-1"
      >
        {isPending ? (
          <RefreshCw className="w-3 h-3 animate-spin" />
        ) : (
          <Check className="w-3 h-3" />
        )}
        <span>Save</span>
      </button>
      {currentDate && (
        <button
          type="button"
          onClick={handleResume}
          disabled={isPending}
          className="px-2 py-1 rounded border border-emerald-500/40 text-emerald-400 text-[11px] hover:bg-emerald-500/10 cursor-pointer"
        >
          Resume
        </button>
      )}
      <button
        type="button"
        onClick={() => {
          setDateValue(currentDate || '');
          setIsEditing(false);
        }}
        className="px-2 py-1 rounded border border-[var(--color-border)] text-[var(--color-muted)] text-[11px] cursor-pointer"
      >
        Cancel
      </button>
    </form>
  );
}
