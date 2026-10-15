'use server';

import { z } from 'zod';
import { dbRepository } from '@/lib/db/repository';

const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address').trim().toLowerCase(),
  countryCode: z.string().optional().nullable(),
  workTypes: z.array(z.string()).optional(),
  honeypot: z.string().optional(),
});

export interface NewsletterActionResponse {
  success: boolean;
  message: string;
  confirmationUrl?: string;
  error?: string;
}

/**
 * Double opt-in newsletter subscription action
 * Master Plan Section 7.12 & 17.2a
 */
export async function subscribeNewsletterAction(
  data: {
    email: string;
    countryCode?: string | null;
    workTypes?: string[];
    honeypot?: string;
  }
): Promise<NewsletterActionResponse> {
  try {
    const parse = subscribeSchema.safeParse(data);
    if (!parse.success) {
      return {
        success: false,
        message: parse.error.issues[0]?.message || 'Invalid email address provided',
        error: 'validation_error',
      };
    }

    // Bot trap: reject silently if honeypot was filled
    if (parse.data.honeypot && parse.data.honeypot.trim().length > 0) {
      return {
        success: true,
        message: 'Check your inbox to confirm.',
      };
    }

    const { email, countryCode, workTypes } = parse.data;
    const { token, isNew } = dbRepository.subscribeNewsletter({
      email,
      country_code: countryCode,
      work_types: workTypes || [],
    });

    const confirmationUrl = `/newsletter/confirm?token=${encodeURIComponent(token)}`;

    // In a live environment with an SMTP service configured, we would send the email here.
    // For development and testing, we generate the verification link and log it.
    console.log(
      `[Newsletter Double Opt-in] ${isNew ? 'New subscriber' : 'Re-subscribe'} for ${email}. Confirmation link: ${confirmationUrl}`
    );

    // Track analytics event: newsletter_signup
    dbRepository.recordAnalyticsEvent({
      event: 'newsletter_signup',
      path: '/newsletter',
      properties: {
        country_code: countryCode || 'unspecified',
      },
    });

    return {
      success: true,
      message: 'Check your inbox to confirm.',
      confirmationUrl,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Subscription error';
    return {
      success: false,
      message: errorMsg,
      error: 'server_error',
    };
  }
}

/**
 * Confirm double opt-in verification token
 */
export async function confirmNewsletterTokenAction(
  token: string
): Promise<{ success: boolean; message: string; email?: string }> {
  try {
    if (!token || !token.trim()) {
      return { success: false, message: 'Invalid or missing confirmation token.' };
    }

    const sub = dbRepository.confirmSubscription(token.trim());
    if (!sub) {
      return {
        success: false,
        message: 'This confirmation link is invalid or has already expired. Please re-subscribe.',
      };
    }

    return {
      success: true,
      message: 'Subscription confirmed! You will receive the weekly verified jobs digest.',
      email: sub.email,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Confirmation failed';
    return { success: false, message: msg };
  }
}

/**
 * One-click unsubscribe action (NDPA 2023 compliance)
 */
export async function unsubscribeNewsletterAction(
  tokenOrEmail: string
): Promise<{ success: boolean; message: string }> {
  try {
    if (!tokenOrEmail || !tokenOrEmail.trim()) {
      return { success: false, message: 'Missing unsubscribe identifier.' };
    }

    const ok = dbRepository.unsubscribeSubscription(tokenOrEmail.trim());
    if (!ok) {
      return {
        success: false,
        message: 'Could not find an active subscription with that token or email.',
      };
    }

    return {
      success: true,
      message: 'You have been unsubscribed. In accordance with NDPA 2023, your address will be fully purged after 30 days.',
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unsubscribe failed';
    return { success: false, message: msg };
  }
}
