import React from 'react';

export function SampleBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold text-secondary bg-subtle border border-rule px-2 py-0.5 rounded ${className}`}
    >
      Sample entry
    </span>
  );
}

export function RecordNumberBadge({
  id,
  className = '',
}: {
  id: string;
  className?: string;
}) {
  return (
    <span className={`tabular-nums text-xs font-semibold text-secondary ${className}`}>
      Record {id}
    </span>
  );
}
