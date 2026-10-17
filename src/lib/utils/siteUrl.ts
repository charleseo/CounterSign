/**
 * Centralized site URL helper.
 * Reads NEXT_PUBLIC_SITE_URL from environment variables without hardcoding.
 */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return url.replace(/\/+$/, '');
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export function getSiteHost(): string {
  try {
    const url = new URL(getSiteUrl());
    return url.host;
  } catch {
    return 'localhost:3000';
  }
}
