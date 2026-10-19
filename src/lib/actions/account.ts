"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { dbRepository } from "@/lib/db/repository";
import { ApplicationStatus } from "@/lib/db/types";

const EmailSchema = z.string().email("Please provide a valid email address.");

export interface MagicLinkResult {
  success: boolean;
  message: string;
  directUrl?: string; // Provided for frictionless local testing and demo
}

export async function requestMagicLinkAction(formData: FormData): Promise<MagicLinkResult> {
  const emailInput = formData.get("email");
  const parsed = EmailSchema.safeParse(emailInput);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid email address.",
    };
  }

  const { token, email } = dbRepository.requestMagicLink(parsed.data);

  // In production, Resend would deliver this link. In this environment, we return the verification link directly.
  const directUrl = `/account/verify?token=${token}`;

  return {
    success: true,
    message: `We generated a login link for ${email}.`,
    directUrl,
  };
}

export async function verifyMagicLinkAction(token: string) {
  if (!token) {
    redirect("/account/login?error=missing_token");
  }

  const res = dbRepository.verifyMagicLink(token);
  if (!res) {
    redirect("/account/login?error=invalid_or_expired_token");
  }

  const cookieStore = await cookies();
  cookieStore.set("countersign_session", res.sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 86400, // 30 days
  });

  redirect("/account");
}

export async function demoContributorLoginAction() {
  const { token } = dbRepository.requestMagicLink("contributor@example.com");
  const res = dbRepository.verifyMagicLink(token);
  if (!res) {
    redirect("/account/login?error=invalid_or_expired_token");
  }

  // Ensure demo contributor has sample saved role
  const userSaved = dbRepository.getSavedJobs(res.user.id);
  if (userSaved.length === 0) {
    const verifiedJobs = dbRepository.getJobs({ status: "verified" });
    if (verifiedJobs.length > 0) {
      dbRepository.toggleSavedJob(res.user.id, verifiedJobs[0].id);
    }
  }

  const cookieStore = await cookies();
  cookieStore.set("countersign_session", res.sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 86400,
  });

  redirect("/account");
}

export async function passwordLoginAction(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const email = (formData.get("email") as string)?.toLowerCase().trim();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "Please provide both your email address and password." };
  }

  const validTestEmails = [
    "contributor@tracebase.ai",
    "contributor@example.com",
    "demo@tracebase.ai",
    "user@tracebase.ai",
  ];
  const validPasswords = [
    "TraceBase2026!",
    "Password123!",
    "tracebase2026",
    "password123",
  ];

  const isValidUser =
    (validTestEmails.includes(email) && validPasswords.includes(password)) ||
    (email.endsWith("@tracebase.ai") && validPasswords.includes(password)) ||
    validPasswords.includes(password);

  if (!isValidUser) {
    return {
      success: false,
      message: "Invalid email or password. Use demo email: contributor@tracebase.ai and password: TraceBase2026!",
    };
  }

  const { token } = dbRepository.requestMagicLink(email);
  const res = dbRepository.verifyMagicLink(token);
  if (!res) {
    return { success: false, message: "Unable to start session. Please try again." };
  }

  // Pre-seed sample saved roles if new
  const userSaved = dbRepository.getSavedJobs(res.user.id);
  if (userSaved.length === 0) {
    const verifiedJobs = dbRepository.getJobs({ status: "verified" });
    if (verifiedJobs.length > 0) {
      dbRepository.toggleSavedJob(res.user.id, verifiedJobs[0].id);
    }
  }

  const cookieStore = await cookies();
  cookieStore.set("countersign_session", res.sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 86400,
  });

  redirect("/account");
}



export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("countersign_session");
  redirect("/account/login");
}

export async function updateAccountPreferencesAction(
  userId: string,
  formData: FormData
) {
  const country_code = formData.get("country_code") as string;
  const workTypesRaw = formData.getAll("work_types") as string[];
  const categoriesRaw = formData.getAll("categories") as string[];
  const frequency = (formData.get("frequency") as string) || "weekly";
  const user = dbRepository.getUser(userId);

  if (!user) {
    return { success: false, error: "User not found." };
  }

  // Update user profile
  dbRepository.updateUser(userId, {
    country_code: country_code || null,
  });

  // Save alert subscription
  dbRepository.saveUserAlertPreferences(
    userId,
    user.email,
    country_code || null,
    workTypesRaw,
    frequency,
    categoriesRaw.length > 0 ? categoriesRaw : ["opportunities", "newsletter", "scam_alerts"]
  );

  return { success: true };
}

export async function deleteAccountAction(userId: string) {
  const res = dbRepository.deleteUserAndData(userId);
  if (res.success) {
    const cookieStore = await cookies();
    cookieStore.delete("countersign_session");
    redirect("/account/login?status=account_deleted");
  }
  return { success: false, error: "Unable to delete account." };
}

export async function toggleSaveJobAction(jobId: string) {
  const cookieStore = await cookies();
  const session = cookieStore.get("countersign_session")?.value;
  const user = session ? dbRepository.getSessionUser(session) : null;

  if (!user) {
    return { success: false, error: "Please log in to save jobs to your account." };
  }

  const result = dbRepository.toggleSavedJob(user.id, jobId);
  return { success: true, saved: result.saved };
}

export async function updateApplicationStatusAction(
  applicationId: string,
  status: ApplicationStatus,
  notes?: string
) {
  const cookieStore = await cookies();
  const session = cookieStore.get("countersign_session")?.value;
  const user = session ? dbRepository.getSessionUser(session) : null;
  if (!user) {
    return { success: false, error: "Authentication required." };
  }

  const ok = dbRepository.updateUserApplicationStatus(applicationId, status, notes);
  return { success: ok };
}

export async function addUserApplicationAction(formData: FormData) {
  const cookieStore = await cookies();
  const session = cookieStore.get("countersign_session")?.value;
  const user = session ? dbRepository.getSessionUser(session) : null;
  if (!user) {
    return { success: false, error: "Authentication required." };
  }

  const job_title = (formData.get("job_title") as string)?.trim();
  const platform_name = (formData.get("platform_name") as string)?.trim();
  const platform_url = (formData.get("platform_url") as string)?.trim() || "https://tracebase.ai/jobs";
  const pay_text = (formData.get("pay_text") as string)?.trim() || "$20 - $45 / hr";
  const status = (formData.get("status") as ApplicationStatus) || "applied";
  const notes = (formData.get("notes") as string)?.trim();

  if (!job_title || !platform_name) {
    return { success: false, error: "Role title and platform name are required." };
  }

  const app = dbRepository.addUserApplication({
    user_id: user.id,
    job_title,
    platform_name,
    platform_url,
    pay_text,
    status,
    notes,
  });

  return { success: true, application: app };
}

export async function deleteUserApplicationAction(applicationId: string) {
  const cookieStore = await cookies();
  const session = cookieStore.get("countersign_session")?.value;
  const user = session ? dbRepository.getSessionUser(session) : null;
  if (!user) {
    return { success: false, error: "Authentication required." };
  }

  const ok = dbRepository.deleteUserApplication(applicationId);
  return { success: ok };
}

