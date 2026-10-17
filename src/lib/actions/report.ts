"use server";

import { dbRepository } from '@/lib/db/repository';
import { reportFormSchema, ReportFormInput } from '@/lib/validations/report';
import { revalidatePath } from 'next/cache';

export interface ReportActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function submitReportAction(data: ReportFormInput): Promise<ReportActionResult> {
  // 1. Zod Validation on server
  const parsed = reportFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: 'Validation failed. Please correct the highlighted errors.',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // 2. Honeypot bot protection: silent discard if filled
  if (parsed.data.honeypot && parsed.data.honeypot.trim().length > 0) {
    return {
      success: true,
      message: 'Report received for human verification.',
    };
  }

  // 3. Persist to repository
  try {
    const kind = parsed.data.reason === 'scam' ? 'scam' : 'job_problem';
    const body = `[Problem: ${parsed.data.reason}] Target: ${parsed.data.urlOrRole}. Details: ${parsed.data.details}`;

    dbRepository.createReport({
      kind,
      body,
      contact_email: parsed.data.contactEmail || null,
    });

    revalidatePath('/jobs');
    revalidatePath('/admin');

    return {
      success: true,
      message: 'Report received. Our editors recheck flagged listings against official feeds within 24 hours.',
    };
  } catch {
    return {
      success: false,
      message: 'An error occurred while transmitting your report. Please try again.',
    };
  }
}

export async function moderateDirectReportAction(
  id: string,
  status: 'pending' | 'approved' | 'rejected',
  notes?: string
) {
  const success = dbRepository.updateReportStatus(id, status, notes);
  revalidatePath('/admin/reports');
  revalidatePath('/admin');
  return { success };
}
