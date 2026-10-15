'use client';

import React, { useSyncExternalStore } from 'react';
import { WifiOff } from 'lucide-react';

function subscribeOnline(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getOnlineSnapshot() {
  return navigator.onLine;
}

function getServerOnlineSnapshot() {
  return true; // Server is considered online
}

export function OfflineBanner() {
  const isOnline = useSyncExternalStore(
    subscribeOnline,
    getOnlineSnapshot,
    getServerOnlineSnapshot
  );

  if (!isOnline) {
    return (
      <aside
        aria-label="Offline status notification"
        className="sticky top-0 z-[60] w-full bg-amber-950/90 border-b border-amber-500/30 text-amber-300 py-2 px-4 text-xs font-medium flex items-center justify-center gap-2 shadow-md animate-in slide-in-from-top duration-200"
      >
        <WifiOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>You are offline. Saved pages still open.</span>
      </aside>
    );
  }

  return null;
}
