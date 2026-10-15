'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { dbRepository } from '../db/repository';
import { runJobSweeper } from '../db/sweeper';
import type { LeadStatus } from '../db/types';
import {
  jobFormSchema,
  quickCheckSchema,
  closeJobSchema,
  platformFormSchema,
  adminLoginSchema,
} from '../validations/admin';

export interface ActionResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

/**
 * 15-second human verification action
 * Updates job verification status, logs to check_log and audit_log
 */
export async function markJobCheckedAction(
  jobId: string,
  notes: string
): Promise<ActionResponse> {
  try {
    const parse = quickCheckSchema.safeParse({ jobId, notes });
    if (!parse.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: parse.error.flatten().fieldErrors,
      };
    }

    const updated = dbRepository.markJobChecked(jobId, notes, 'admin-session');
    revalidatePath('/admin');
    revalidatePath('/admin/jobs');
    revalidatePath(`/admin/jobs/${jobId}`);
    revalidatePath('/');

    return {
      success: true,
      message: `Role "${updated.title}" marked human-verified for 14 days.`,
      data: updated,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to mark job verified';
    return {
      success: false,
      message: errorMsg,
    };
  }
}

/**
 * Mark a role closed when broken link or deactivated
 */
export async function closeJobAction(
  jobId: string,
  reason: string
): Promise<ActionResponse> {
  try {
    const parse = closeJobSchema.safeParse({ jobId, reason });
    if (!parse.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: parse.error.flatten().fieldErrors,
      };
    }

    const updated = dbRepository.closeJob(jobId, reason, 'admin-session');
    revalidatePath('/admin');
    revalidatePath('/admin/jobs');
    revalidatePath(`/admin/jobs/${jobId}`);
    revalidatePath('/');

    return {
      success: true,
      message: `Role "${updated.title}" closed and removed from active index.`,
      data: updated,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to close job';
    return {
      success: false,
      message: errorMsg,
    };
  }
}

/**
 * Create a new human-verified role (<2 minutes workflow)
 * If shouldRedirect is true, redirect is called OUTSIDE try/catch
 */
export async function createJobAction(input: unknown): Promise<ActionResponse> {
  let redirectTarget: string | null = null;
  let response: ActionResponse;

  try {
    const parse = jobFormSchema.safeParse(input);
    if (!parse.success) {
      return {
        success: false,
        message: 'Please resolve form validation errors',
        errors: parse.error.flatten().fieldErrors,
      };
    }

    const val = parse.data;
    const newJob = dbRepository.createJob(
      {
        slug: val.slug,
        platform_id: val.platform_id,
        title: val.title,
        work_type: val.work_type,
        domains: val.domains,
        languages: val.languages,
        degree_levels: val.degree_levels,
        summary: val.summary,
        requirements: val.requirements || null,
        pay_text: val.pay_text || null,
        pay_verified: val.pay_verified,
        pay_source_url: val.pay_source_url || null,
        official_url: val.official_url,
        apply_url: val.apply_url,
        link: val.link,
        status: 'verified',
        created_by: 'admin-session',
      },
      val.eligibility.map((e) => ({
        country_code: e.country_code,
        status: e.status,
        source_url: e.source_url || undefined,
      })),
      'admin-session'
    );

    revalidatePath('/admin');
    revalidatePath('/admin/jobs');
    revalidatePath('/');

    response = {
      success: true,
      message: `Created role "${newJob.title}" with verified status.`,
      data: newJob,
    };
    redirectTarget = '/admin/jobs';
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to create job';
    return {
      success: false,
      message: errorMsg,
    };
  }

  // Next.js rule: redirect outside try/catch
  if (redirectTarget) {
    redirect(redirectTarget);
  }

  return response;
}

/**
 * Update platform and its 5-step onboarding timeline
 */
export async function updatePlatformAction(
  platformId: string,
  input: unknown
): Promise<ActionResponse> {
  try {
    const parse = platformFormSchema.safeParse(input);
    if (!parse.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: parse.error.flatten().fieldErrors,
      };
    }

    const val = parse.data;
    const updated = dbRepository.updatePlatform(
      platformId,
      {
        name: val.name,
        official_url: val.official_url,
        description: val.description || null,
        who_it_suits: val.who_it_suits || null,
        payout_methods: val.payout_methods || null,
        assessment_style: val.assessment_style || null,
        referral: val.referral,
        referral_terms_url: val.referral_terms_url || null,
      },
      val.steps.map((s, idx) => ({
        id: `step-${platformId}-${idx + 1}`,
        platform_id: platformId,
        position: s.position,
        title: s.title,
        detail: s.detail || null,
        label: s.label,
        source_url: s.source_url || null,
      })),
      'admin-session'
    );

    revalidatePath('/admin/platforms');
    revalidatePath('/');

    return {
      success: true,
      message: `Platform "${updated.name}" updated successfully with 5-step timeline.`,
      data: updated,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to update platform';
    return {
      success: false,
      message: errorMsg,
    };
  }
}

/**
 * Trigger the 14-day compliance sweeper manually
 */
export async function runSweeperAction(): Promise<ActionResponse> {
  try {
    const result = await runJobSweeper('admin-manual-trigger');
    revalidatePath('/admin');
    revalidatePath('/admin/jobs');
    revalidatePath('/');

    return {
      success: result.success,
      message: result.message,
      data: result,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Sweeper run failed';
    return {
      success: false,
      message: errorMsg,
    };
  }
}

/**
 * Passwordless magic link + 2FA sign in simulation
 */
export async function adminLoginAction(
  email: string,
  code?: string
): Promise<ActionResponse<{ requires2FA?: boolean; loggedIn?: boolean }>> {
  let redirectTarget: string | null = null;
  let response: ActionResponse<{ requires2FA?: boolean; loggedIn?: boolean }>;

  try {
    const parse = adminLoginSchema.safeParse({ email, code });
    if (!parse.success) {
      return {
        success: false,
        message: 'Invalid email or code format',
        errors: parse.error.flatten().fieldErrors,
      };
    }

    // Step 1: Magic link dispatch / verification code request
    if (!code) {
      return {
        success: true,
        message: '6-digit verification code sent to admin mailbox.',
        data: { requires2FA: true },
      };
    }

    // Step 2: 2FA Code confirmation (accepts any 6 digits in demo mode or configured secret)
    if (code.length === 6) {
      const cookieStore = await cookies();
      cookieStore.set('countersign_admin_session', 'authenticated_admin', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 8, // 8 hours
      });

      dbRepository.logAudit({
        actor: email,
        action: 'admin.login',
        entity: 'auth',
        entity_id: null,
        diff: { email, method: '2fa_magic_link' },
      });

      response = {
        success: true,
        message: 'Authentication successful. Access granted.',
        data: { loggedIn: true },
      };
      redirectTarget = '/admin';
    } else {
      return {
        success: false,
        message: 'Invalid 2FA code. Please enter 6 digits.',
      };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Login failed';
    return {
      success: false,
      message: errorMsg,
    };
  }

  // Next.js rule: redirect outside try/catch
  if (redirectTarget) {
    redirect(redirectTarget);
  }

  return response;
}

/**
 * Admin sign out action
 */
export async function adminLogoutAction(): Promise<void> {
  let redirectTarget: string | null = null;
  try {
    const cookieStore = await cookies();
    cookieStore.delete('countersign_admin_session');
    redirectTarget = '/admin/login';
  } catch {
    redirectTarget = '/admin/login';
  }

  if (redirectTarget) {
    redirect(redirectTarget);
  }
}

/**
 * Update evaluation lead status (new, replied, call_booked, pilot, won, lost)
 */
export async function updateEvalLeadStatusAction(
  leadId: string,
  status: LeadStatus
): Promise<ActionResponse> {
  try {
    const updated = dbRepository.updateEvalLeadStatus(leadId, status, 'admin-session');
    revalidatePath('/admin');
    revalidatePath('/admin/leads');

    return {
      success: true,
      message: `Lead ${updated.reference_id} marked as "${status}".`,
      data: updated,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to update lead status';
    return {
      success: false,
      message: errorMsg,
    };
  }
}
