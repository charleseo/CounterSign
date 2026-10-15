'use server';

import { z } from 'zod';
import { dbRepository } from '@/lib/db/repository';

const ScopeFormSchema = z.object({
  name: z.string().min(2, 'Please enter your full name.'),
  work_email: z.string().email('Please enter a valid work email address.'),
  company: z.string().optional().nullable(),
  product_url: z.string().optional().nullable(),
  service: z.string().default('rag_and_citation_audit'),
  volume: z.string().default('100_to_300_pairs'),
  source_type: z.enum(['public_docs', 'private_docs']).default('public_docs'),
  timeline: z.string().default('standard_2_weeks'),
  has_rubric: z.boolean().default(false),
  sensitivity: z.string().default('standard'),
  message: z.string().optional().nullable(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must confirm that you understand our privacy notice before submitting.',
  }),
  idempotency_key: z.string().min(8, 'Invalid submission token.'),
});

export type ScopeFormInput = z.infer<typeof ScopeFormSchema>;

export interface ScopeFormResult {
  success: boolean;
  referenceId?: string;
  lead?: {
    reference_id: string;
    name: string;
    work_email: string;
    company: string | null;
    service: string | null;
    created_at: string;
  };
  error?: string;
}

export async function submitEvaluationScope(
  rawData: unknown
): Promise<ScopeFormResult> {
  try {
    const validated = ScopeFormSchema.parse(rawData);

    // Create or retrieve idempotent lead
    const lead = dbRepository.createEvalLead({
      name: validated.name,
      work_email: validated.work_email,
      company: validated.company,
      product_url: validated.product_url,
      service: validated.service,
      volume: validated.volume,
      source_type: validated.source_type,
      timeline: validated.timeline,
      has_rubric: validated.has_rubric,
      sensitivity: validated.sensitivity,
      message: validated.message,
      idempotency_key: validated.idempotency_key,
    });

    return {
      success: true,
      referenceId: lead.reference_id,
      lead: {
        reference_id: lead.reference_id,
        name: lead.name,
        work_email: lead.work_email,
        company: lead.company,
        service: lead.service,
        created_at: lead.created_at,
      },
    };
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return {
        success: false,
        error: err.issues[0]?.message || 'Please verify the highlighted fields.',
      };
    }
    return {
      success: false,
      error: 'An unexpected error occurred while saving your scope. Please try again.',
    };
  }
}
