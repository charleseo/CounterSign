import { z } from 'zod';

export const reportFormSchema = z.object({
  reason: z.enum(['closed', 'misleading', 'scam', 'other']).default('closed'),
  urlOrRole: z.string().min(2, 'Role title or URL is required'),
  details: z.string().min(10, 'Details must be at least 10 characters'),
  contactEmail: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  honeypot: z.string().optional(),
  mathAnswer: z.string().refine((val) => val.trim() === '7', {
    message: 'Challenge answer is incorrect (4 + 3 = 7)',
  }),
});

export type ReportFormInput = z.infer<typeof reportFormSchema>;
