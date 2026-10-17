/**
 * Privacy and Data Stripping Utility for TraceBase
 * Strips personal identifiable information (PII) before publication or external display.
 */

export function stripPersonalData(input: string): string {
  if (!input) return '';

  let sanitized = input;

  // 1. Email addresses
  sanitized = sanitized.replace(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi,
    '[email redacted]'
  );

  // 2. International and domestic phone numbers (including +234, +1, +44, etc.)
  sanitized = sanitized.replace(
    /(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g,
    '[phone redacted]'
  );

  // 3. BVN, NIN, SSN, SIN, NI numbers (sequences of 9, 10, or 11 digits)
  sanitized = sanitized.replace(
    /\b\d{9,11}\b/g,
    '[number redacted]'
  );

  // 4. US SSN format (XXX-XX-XXXX)
  sanitized = sanitized.replace(
    /\b\d{3}-\d{2}-\d{4}\b/g,
    '[SSN redacted]'
  );

  // 5. UK National Insurance Number format (e.g., QQ 12 34 56 A)
  sanitized = sanitized.replace(
    /\b[A-CEGHJ-PR-TW-Z]{1}[A-CEGHJ-NPR-TW-Z]{1}\s*\d{2}\s*\d{2}\s*\d{2}\s*[A-D]{1}\b/gi,
    '[NI number redacted]'
  );

  // 6. Direct WhatsApp and Telegram chat/join links that include personal numbers or private invite hashes
  sanitized = sanitized.replace(
    /(?:https?:\/\/)?(?:wa\.me|api\.whatsapp\.com|t\.me|telegram\.me)\/[+a-zA-Z0-9_]+/gi,
    '[chat link redacted]'
  );

  // 7. Strip query parameters from any remaining URLs (protect tracking IDs, user IDs)
  sanitized = sanitized.replace(
    /(https?:\/\/[^\s?#]+)\?[^\s#]*/gi,
    '$1'
  );

  return sanitized.trim();
}
