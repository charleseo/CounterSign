import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { dbRepository } from "@/lib/db/repository";
import { AccountClient } from "./AccountClient";
import { absoluteUrl } from "@/lib/utils/siteUrl";

export const metadata: Metadata = {
  title: "My Contributor Account | TraceBase",
  description:
    "Manage your saved AI evaluation jobs, set country-specific role alerts, and exercise your NDPA 2023 personal data rights.",
  alternates: {
    canonical: absoluteUrl("/account"),
  },
};

export const instant = false;

export default async function AccountPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("tracebase_session")?.value || cookieStore.get("countersign_session")?.value;

  if (!sessionToken) {
    redirect("/account/login");
  }

  const user = dbRepository.getSessionUser(sessionToken);
  if (!user) {
    redirect("/account/login?error=invalid_or_expired_token");
  }

  const savedJobs = dbRepository.getSavedJobs(user.id);
  const alertPreferences = dbRepository.getUserAlertPreferences(user.id);
  const applications = dbRepository.getUserApplications(user.id);
  const testScores = dbRepository.getUserTestScores(user.id);
  const userCvs = dbRepository.getUserCvs(user.id);
  const userPayouts = dbRepository.getUserPayouts(user.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      <AccountClient
        user={user}
        savedJobs={savedJobs}
        alertPreferences={alertPreferences}
        applications={applications}
        testScores={testScores}
        userCvs={userCvs}
        userPayouts={userPayouts}
      />
    </div>
  );
}
