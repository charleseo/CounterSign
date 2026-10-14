import { z } from 'zod';

export const jobFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase alphanumeric characters and hyphens'),
  platform_id: z.string().min(1, 'Platform is required'),
  work_type: z.string().min(2, 'Work type is required'),
  domains: z.array(z.string()).min(1, 'Select at least one domain'),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
  degree_levels: z.array(z.string()).default([]),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  requirements: z.string().optional().nullable(),
  pay_text: z.string().optional().nullable(),
  pay_verified: z.boolean().default(false),
  pay_source_url: z.string().url('Must be a valid URL').optional().or(z.literal('')).nullable(),
  official_url: z.string().url('Official platform URL must be valid'),
  apply_url: z.string().url('Application URL must be valid'),
  link: z.enum(['direct', 'referral']).default('direct'),
  eligibility: z
    .array(
      z.object({
        country_code: z.string().length(2),
        status: z.enum(['accepted', 'not_accepted', 'unconfirmed']),
        source_url: z.string().url().optional().or(z.literal('')).nullable(),
      })
    )
    .default([]),
});

export type JobFormInput = z.infer<typeof jobFormSchema>;

export const quickCheckSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  notes: z.string().min(3, 'Verification note must be at least 3 characters'),
});

export const closeJobSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  reason: z.string().min(3, 'Reason must be at least 3 characters'),
});

export const platformStepSchema = z.object({
  position: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]),
  title: z.string().min(2, 'Step title is required'),
  detail: z.string().optional().nullable(),
  label: z.enum(['official', 'reported', 'unknown']).default('unknown'),
  source_url: z.string().url().optional().or(z.literal('')).nullable(),
});

export const platformFormSchema = z.object({
  name: z.string().min(2, 'Platform name is required'),
  official_url: z.string().url('Valid URL required'),
  description: z.string().optional().nullable(),
  who_it_suits: z.string().optional().nullable(),
  payout_methods: z.string().optional().nullable(),
  assessment_style: z.string().optional().nullable(),
  referral: z.enum(['public', 'invitation_only', 'not_found', 'unavailable', 'confirmed_partner']),
  referral_terms_url: z.string().url().optional().or(z.literal('')).nullable(),
  steps: z.array(platformStepSchema).length(5, 'Platforms must define all 5 timeline steps'),
});

export type PlatformFormInput = z.infer<typeof platformFormSchema>;

export const adminLoginSchema = z.object({
  email: z.string().email('Please enter a valid administrative email address'),
  code: z.string().length(6, '2FA code must be exactly 6 digits').optional(),
});
