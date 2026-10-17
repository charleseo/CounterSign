import { getSiteUrl } from '../utils/siteUrl';
import { dbRepository } from '../db/repository';

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text: string;
  from?: string;
  unsubscribeUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface EmailSendResult {
  success: boolean;
  messageId: string;
  headers: Record<string, string>;
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}

export function getEmailFrom(): string {
  return process.env.EMAIL_FROM || 'TraceBase <alerts@tracebase.work>';
}

export function generateUnsubscribeUrl(email: string): string {
  const siteUrl = getSiteUrl();
  const token = Buffer.from(email.toLowerCase().trim()).toString('base64url');
  return `${siteUrl}/newsletter/unsubscribe?token=${token}`;
}

export async function sendEmail(payload: EmailPayload): Promise<EmailSendResult> {
  const from = payload.from || getEmailFrom();
  const unsubscribeUrl = payload.unsubscribeUrl || generateUnsubscribeUrl(payload.to);
  const messageId = `<cs-${Date.now()}-${Math.random().toString(36).substring(2, 9)}@tracebase.work>`;

  const headers: Record<string, string> = {
    From: from,
    To: payload.to,
    Subject: payload.subject,
    'Message-ID': messageId,
    'List-Unsubscribe': `<${unsubscribeUrl}>`,
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    'X-Entity-Ref-ID': messageId,
    'Auto-Submitted': 'auto-generated',
  };

  // Log in dbRepository audit
  dbRepository.logAudit({
    actor: 'email-service',
    action: 'email.sent',
    entity: 'emails',
    entity_id: messageId,
    diff: {
      from,
      to: payload.to,
      subject: payload.subject,
      hasPlainText: Boolean(payload.text),
      hasHtml: Boolean(payload.html),
      headers,
    },
  });

  return {
    success: true,
    messageId,
    headers,
    from,
    to: payload.to,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  };
}
