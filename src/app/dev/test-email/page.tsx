import React from 'react';
import { notFound } from 'next/navigation';
import { dbRepository } from '@/lib/db/repository';
import { getEmailFrom, generateUnsubscribeUrl } from '@/lib/email/service';
import { getSiteUrl } from '@/lib/utils/siteUrl';
import { TestEmailClient } from './TestEmailClient';

export const metadata = {
  title: 'Test Email Preview (Development Only) | TraceBase',
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestEmailPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const fromAddress = getEmailFrom();
  const digestDraft = dbRepository.generateWeeklyDigestDraft();
  const unsubscribeUrl = generateUnsubscribeUrl('tester@example.com');

  const templates = [
    {
      id: 'digest',
      name: 'Weekly Digest',
      subject: digestDraft.subject,
      from: fromAddress,
      to: 'tester@example.com',
      unsubscribeUrl,
      html: digestDraft.htmlContent,
      text: digestDraft.markdownContent,
    },
    {
      id: 'role_alert',
      name: 'Role Alert (New Openings)',
      subject: '3 new verified AI evaluation roles open to your country',
      from: fromAddress,
      to: 'subscriber@example.com',
      unsubscribeUrl,
      html: `<!DOCTYPE html><html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px 16px; color: #111;">
<h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">3 new verified roles open to your country</h2>
<p style="font-size: 14px; color: #555; line-height: 1.5;">Every listing below has been checked by hand against official employer career ATS feeds.</p>
<hr style="border: 0; border-top: 1px solid #eee; margin: 16px 0;" />
<div style="margin-bottom: 16px;">
  <h3 style="font-size: 16px; margin: 0 0 4px 0;"><a href="${siteUrl}/jobs/outlier-python-reasoning-evaluator" style="color: #5A35C8; text-decoration: none; font-weight: 600;">Python Reasoning Evaluator</a></h3>
  <p style="font-size: 13px; color: #666; margin: 0 0 4px 0;">Outlier AI &bull; $25 - $40 / hr (USD) &bull; 1099 Contractor</p>
  <p style="font-size: 13px; color: #333; margin: 0;">Verified active. Requires coding assessment. Payouts via PayPal or AirTM.</p>
</div>
<hr style="border: 0; border-top: 1px solid #eee; margin: 16px 0;" />
<p style="font-size: 12px; color: #777; line-height: 1.6;">
  TraceBase &bull; Independent, human-verified AI work hub<br />
  <a href="${unsubscribeUrl}" style="color: #777;">Unsubscribe in one click</a>
</p>
</body></html>`,
      text: `TraceBase Role Alert\n\n3 new verified roles open to your country:\n\n1. Python Reasoning Evaluator (Outlier AI)\nPay: $25 - $40 / hr (USD)\nLink: ${siteUrl}/jobs/outlier-python-reasoning-evaluator\n\nTo unsubscribe: ${unsubscribeUrl}`,
    },
    {
      id: 'login_link',
      name: 'Account Magic Link',
      subject: 'Your TraceBase sign-in link',
      from: fromAddress,
      to: 'contributor@example.com',
      unsubscribeUrl,
      html: `<!DOCTYPE html><html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px 16px; color: #111;">
<h2 style="font-size: 20px; font-weight: 700;">Sign in to TraceBase</h2>
<p style="font-size: 14px; color: #444; line-height: 1.5;">Tap the button below to sign in to your saved roles and alert preferences. This link expires in 15 minutes.</p>
<p style="margin: 24px 0;">
  <a href="${siteUrl}/account/verify?token=sample-magic-token-xyz" style="display: inline-block; padding: 12px 24px; background: #5A35C8; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600;">Sign in to my account</a>
</p>
<p style="font-size: 12px; color: #777;">If you did not request this link, you can safely ignore this email.</p>
</body></html>`,
      text: `Sign in to TraceBase\n\nTap the link below to sign in to your saved roles:\n${siteUrl}/account/verify?token=sample-magic-token-xyz\n\nThis link expires in 15 minutes.`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-200 text-xs flex items-center justify-between gap-3">
        <span>
          <strong>Dev-only route.</strong> This email preview test page returns 404 in production.
        </span>
        <span className="font-mono text-[11px] bg-amber-500/20 px-2 py-0.5 rounded">
          NODE_ENV: {process.env.NODE_ENV}
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
          Email system & template preview
        </h1>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          Test MIME multi-part layouts, RFC 8058 headers (List-Unsubscribe), plain text fallbacks, and sender alignment.
        </p>
      </div>

      <TestEmailClient initialTemplates={templates} defaultSender={fromAddress} />
    </div>
  );
}
