"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { dbRepository } from "@/lib/db/repository";

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
    frequency
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
