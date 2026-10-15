"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { dbRepository } from "@/lib/db/repository";
import { TaskAvailability, ReportStatus } from "@/lib/db/types";

const CommunityReportSchema = z.object({
  platform_id: z.string().min(1, "Platform is required."),
  period_month_year: z.string().min(3, "Please specify the month and year of experience."),
  onboarding_paid: z.boolean(),
  tasks_available: z.enum(["regular", "intermittent", "empty_queue"]),
  removed_without_explanation: z.boolean(),
  optional_note: z.string().max(500, "Notes are limited to 500 characters.").optional().or(z.literal("")),
  contact_email: z.string().email("Invalid email").optional().or(z.literal("")),
});

export async function submitCommunityReportAction(formData: FormData) {
  const honeypot = formData.get("organization") as string;
  if (honeypot && honeypot.length > 0) {
    return { success: false, error: "Submission rejected." };
  }

  const raw = {
    platform_id: formData.get("platform_id") as string,
    period_month_year: formData.get("period_month_year") as string,
    onboarding_paid: formData.get("onboarding_paid") === "true",
    tasks_available: formData.get("tasks_available") as TaskAvailability,
    removed_without_explanation: formData.get("removed_without_explanation") === "true",
    optional_note: (formData.get("optional_note") as string) || "",
    contact_email: (formData.get("contact_email") as string) || "",
  };

  const parsed = CommunityReportSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Invalid input." };
  }

  const report = dbRepository.submitCommunityReport({
    platform_id: parsed.data.platform_id,
    period_month_year: parsed.data.period_month_year,
    onboarding_paid: parsed.data.onboarding_paid,
    tasks_available: parsed.data.tasks_available,
    removed_without_explanation: parsed.data.removed_without_explanation,
    optional_note: parsed.data.optional_note || null,
    contact_email: parsed.data.contact_email || null,
  });

  return {
    success: true,
    message: "Thank you for sharing your experience. Reports are moderated before inclusion in aggregated statistics.",
    id: report.id,
  };
}

export async function moderateCommunityReportAction(
  id: string,
  status: ReportStatus,
  moderation_notes?: string
) {
  const success = dbRepository.moderateCommunityReport(id, status, moderation_notes);
  revalidatePath("/admin/reports");
  revalidatePath("/platforms");
  return { success };
}
