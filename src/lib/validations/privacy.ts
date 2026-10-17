import { z } from 'zod';

export const privacyRequestSchema = z.object({
  kind: z.enum(['access', 'correction', 'deletion', 'withdraw_consent', 'objection'], {
    message: 'Please select a valid privacy request kind.',
  }),
  contact_email: z.string().email('Please enter a valid email address.'),
  country_code: z.string().min(2).max(4).optional().default('WW'),
  note: z.string().max(2000, 'Note must not exceed 2,000 characters.').optional().nullable(),
  honeypot: z.string().max(0, 'Bot detected.').optional(),
});

export const incidentFormSchema = z.object({
  summary: z.string().min(5, 'Summary must be at least 5 characters.').max(1000),
  data_categories: z.string().min(2, 'Enter at least one data category.'),
  people_affected_estimate: z.coerce.number().int().min(0).default(0),
});

export const correctionFormSchema = z.object({
  platform_name: z.string().min(2, 'Platform or company name is required.').max(100),
  contact_email: z.string().email('Valid official contact email required.'),
  disputed_url: z.string().url('Must be a valid URL.'),
  issue_type: z.enum(['closed_role', 'wrong_eligibility', 'incorrect_pay', 'trademark_concern', 'other']),
  source_url: z.string().url('Official verification source URL is required.'),
  details: z.string().min(10, 'Please provide specific details for our review team.').max(2000),
  honeypot: z.string().max(0, 'Bot detected.').optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required.').max(100),
  email: z.string().email('Valid email address is required.'),
  topic: z.enum(['general', 'editorial', 'pilot', 'privacy', 'corrections']),
  message: z.string().min(10, 'Message must be at least 10 characters.').max(3000),
  honeypot: z.string().max(0, 'Bot detected.').optional(),
});

export type PrivacyRequestInput = z.infer<typeof privacyRequestSchema>;
export type IncidentFormInput = z.infer<typeof incidentFormSchema>;
export type CorrectionFormInput = z.infer<typeof correctionFormSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
