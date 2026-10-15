"use server";

import { z } from "zod";
import { dbRepository } from "@/lib/db/repository";

const EvaluatorApplicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please provide a valid email address."),
  country_code: z.string().min(2, "Please select your country of residence."),
  domain: z.string().min(2, "Please select your domain specialization."),
  credentials: z.string().min(2, "Please enter your degree or credential."),
  years_experience: z.string().min(1, "Please specify your years of experience."),
  portfolio_url: z.string().url("Please provide a valid URL.").optional().or(z.literal("")),
  weekly_hours: z.string().min(1, "Please specify your weekly availability."),
  honeypot: z.string().max(0, "Bot detected.").optional(),
});

export interface EvaluatorSubmitResult {
  success: boolean;
  message: string;
  referenceId?: string;
  error?: string;
}

export async function submitEvaluatorApplicationAction(
  formData: FormData
): Promise<EvaluatorSubmitResult> {
  const honeypot = formData.get("website") as string;
  if (honeypot && honeypot.length > 0) {
    return { success: false, message: "Submission rejected." };
  }

  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    country_code: formData.get("country_code") as string,
    domain: formData.get("domain") as string,
    credentials: formData.get("credentials") as string,
    years_experience: formData.get("years_experience") as string,
    portfolio_url: (formData.get("portfolio_url") as string) || "",
    weekly_hours: formData.get("weekly_hours") as string,
  };

  const parsed = EvaluatorApplicationSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid input.",
    };
  }

  const lead = dbRepository.submitEvaluatorLead({
    name: parsed.data.name,
    email: parsed.data.email,
    country_code: parsed.data.country_code,
    domain: parsed.data.domain,
    credentials: parsed.data.credentials,
    years_experience: parsed.data.years_experience,
    portfolio_url: parsed.data.portfolio_url || null,
    weekly_hours: parsed.data.weekly_hours,
  });

  return {
    success: true,
    message: "Thank you for joining our specialist evaluation network.",
    referenceId: lead.id,
  };
}
