'use server';

import { revalidatePath } from 'next/cache';
import { dbRepository } from '@/lib/db/repository';
import type { IncidentStatus, PrivacyRequestKind } from '@/lib/db/types';
import {
  privacyRequestSchema,
  incidentFormSchema,
  correctionFormSchema,
  contactFormSchema,
} from '@/lib/validations/privacy';

export interface ActionResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

/**
 * Public Data Subject Access / Privacy Rights Request (NDPA 2023)
 * Section 17.2a: 30-day statutory clock, append-only consent/audit log
 */
export async function submitPrivacyRequestAction(
  formData: FormData
): Promise<ActionResponse<{ id: string; due_at: string; kind: string }>> {
  try {
    const raw = {
      kind: formData.get('kind'),
      contact_email: formData.get('contact_email'),
      note: formData.get('note') || undefined,
      honeypot: formData.get('website') || undefined, // Honeypot field
    };

    const parsed = privacyRequestSchema.safeParse(raw);
    if (!parsed.success) {
      return {
        success: false,
        message: 'Please review your input.',
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    if (parsed.data.honeypot && parsed.data.honeypot.length > 0) {
      // Bot detected; silently pretend success without persisting
      return {
        success: true,
        message: 'Your request has been logged. Our data protection team will reply within 30 days.',
        data: {
          id: 'pr-ack-pending',
          due_at: new Date(Date.now() + 30 * 86400000).toISOString(),
          kind: parsed.data.kind,
        },
      };
    }

    const request = dbRepository.createPrivacyRequest({
      kind: parsed.data.kind as PrivacyRequestKind,
      contact_email: parsed.data.contact_email,
      note: parsed.data.note,
    });

    revalidatePath('/admin');
    revalidatePath('/admin/privacy');

    return {
      success: true,
      message: 'Your privacy rights request has been received. In accordance with NDPA 2023, our response will be provided within 30 days.',
      data: {
        id: request.id,
        due_at: request.due_at,
        kind: request.kind,
      },
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to submit privacy request.';
    return {
      success: false,
      message: msg,
    };
  }
}

/**
 * Admin action to close/resolve a privacy request
 */
export async function closePrivacyRequestAction(
  id: string,
  resolutionNote?: string
): Promise<ActionResponse> {
  try {
    const updated = dbRepository.closePrivacyRequest(id, resolutionNote || null, 'admin-session');
    revalidatePath('/admin');
    revalidatePath('/admin/privacy');

    return {
      success: true,
      message: `Privacy request ${id} marked closed.`,
      data: updated,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to close request.';
    return {
      success: false,
      message: msg,
    };
  }
}

/**
 * Admin action to log a security incident or near-miss with 72-hour regulatory clock
 */
export async function logIncidentAction(formData: FormData): Promise<ActionResponse> {
  try {
    const raw = {
      summary: formData.get('summary'),
      data_categories: formData.get('data_categories'),
      people_affected_estimate: formData.get('people_affected_estimate') || 0,
    };

    const parsed = incidentFormSchema.safeParse(raw);
    if (!parsed.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const categories = parsed.data.data_categories
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const incident = dbRepository.createIncident(
      {
        summary: parsed.data.summary,
        data_categories: categories,
        people_affected_estimate: parsed.data.people_affected_estimate,
        reported_at: null,
        status: 'open',
      },
      'admin-session'
    );

    revalidatePath('/admin');
    revalidatePath('/admin/incidents');

    return {
      success: true,
      message: 'Incident logged. 72-hour regulatory notification clock started.',
      data: incident,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to log incident.';
    return {
      success: false,
      message: msg,
    };
  }
}

/**
 * Admin action to update incident status (e.g. reported to NDPC regulator or closed)
 */
export async function updateIncidentStatusAction(
  id: string,
  status: IncidentStatus
): Promise<ActionResponse> {
  try {
    const updated = dbRepository.updateIncidentStatus(id, status, 'admin-session');
    revalidatePath('/admin');
    revalidatePath('/admin/incidents');

    return {
      success: true,
      message: `Incident status updated to ${status}.`,
      data: updated,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update incident.';
    return {
      success: false,
      message: msg,
    };
  }
}

/**
 * Public Correction / Platform Takedown Submission (Section 8.6 & 17.3)
 * SLA: response within three working days
 */
export async function submitCorrectionAction(formData: FormData): Promise<ActionResponse> {
  try {
    const raw = {
      platform_name: formData.get('platform_name'),
      contact_email: formData.get('contact_email'),
      disputed_url: formData.get('disputed_url'),
      issue_type: formData.get('issue_type'),
      source_url: formData.get('source_url'),
      details: formData.get('details'),
      honeypot: formData.get('corporate_pin') || undefined,
    };

    const parsed = correctionFormSchema.safeParse(raw);
    if (!parsed.success) {
      return {
        success: false,
        message: 'Please review the highlighted fields.',
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    if (parsed.data.honeypot && parsed.data.honeypot.length > 0) {
      return {
        success: true,
        message: 'Your report has been received. Our editorial team will review it within three working days.',
      };
    }

    // Create report entry in dbRepository
    dbRepository.createReport({
      kind: 'platform_experience',
      body: `[Correction Request] Platform: ${parsed.data.platform_name} | Issue: ${parsed.data.issue_type} | URL: ${parsed.data.disputed_url} | Source: ${parsed.data.source_url} | Details: ${parsed.data.details}`,
      contact_email: parsed.data.contact_email,
    });

    return {
      success: true,
      message: 'Correction received. We respond within three working days and publish a fix or explain why not.',
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to submit correction.';
    return {
      success: false,
      message: msg,
    };
  }
}

/**
 * Public Contact Form Submission (Section 7.15 & 8.6)
 */
export async function submitContactAction(formData: FormData): Promise<ActionResponse> {
  try {
    const raw = {
      name: formData.get('name'),
      email: formData.get('email'),
      topic: formData.get('topic'),
      message: formData.get('message'),
      honeypot: formData.get('url_address') || undefined,
    };

    const parsed = contactFormSchema.safeParse(raw);
    if (!parsed.success) {
      return {
        success: false,
        message: 'Please fill in all required fields.',
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    if (parsed.data.honeypot && parsed.data.honeypot.length > 0) {
      return {
        success: true,
        message: 'Thanks for writing. We read every message and reply within two working days.',
      };
    }

    // Log contact audit
    dbRepository.logAudit({
      actor: null,
      action: 'contact.submit',
      entity: 'contact_messages',
      entity_id: null,
      diff: {
        name: parsed.data.name,
        email: parsed.data.email,
        topic: parsed.data.topic,
      },
    });

    return {
      success: true,
      message: 'Thanks for writing. We read every message and reply within two working days.',
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to send message.';
    return {
      success: false,
      message: msg,
    };
  }
}
