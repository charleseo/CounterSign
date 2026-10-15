import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { dbRepository } from "../src/lib/db/repository";

console.log("Starting Milestone 11 Verification Suite...\n");

// 1. Verify RLS policies in schema.sql
console.log("1. Verifying Row Level Security (RLS) in schema.sql...");
const schemaPath = path.resolve(process.cwd(), "supabase/migrations/20261014000000_m3_schema.sql");
const schemaSql = fs.readFileSync(schemaPath, "utf8");

const requiredRlsTables = [
  "platforms",
  "platform_steps",
  "jobs",
  "countries",
  "job_eligibility",
  "check_log",
  "guides",
  "users",
  "saved_jobs",
  "alert_subscriptions",
  "reports",
  "eval_leads",
  "audit_log",
  "outbound_clicks",
  "consent_log",
  "privacy_requests",
  "incident_log",
];

for (const table of requiredRlsTables) {
  assert(
    schemaSql.includes(`alter table ${table} enable row level security;`),
    `Missing RLS enable statement for table: ${table}`
  );
}
console.log("Passed: All 17 tables have explicit Row Level Security enabled.");

// 2. User Account & Magic Link Verification
console.log("\n2. Verifying User Accounts & Magic Link Flow...");
const testEmail = "test-contributor@countersign.ai";
const magicLink = dbRepository.requestMagicLink(testEmail);
assert(magicLink.token.startsWith("magic_"), "Token format mismatch");
assert(magicLink.email === testEmail, "Email mismatch");

const verifyRes = dbRepository.verifyMagicLink(magicLink.token);
assert(verifyRes !== null, "Magic link verification failed");
assert(verifyRes.user.email === testEmail, "Verified user email mismatch");
assert(verifyRes.sessionToken.startsWith("sess_"), "Session token format mismatch");

// Verify session user retrieval
const sessionUser = dbRepository.getSessionUser(verifyRes.sessionToken);
assert(sessionUser?.id === verifyRes.user.id, "Session user lookup failed");
console.log("Passed: Magic link requested, verified, and session established.");

// 3. Saved Jobs Persistence
console.log("\n3. Verifying Saved Jobs Bookmark Flow...");
const jobs = dbRepository.getJobs();
assert(jobs.length > 0, "No jobs in repository");
const testJob = jobs[0];

// Toggle save
const saveRes1 = dbRepository.toggleSavedJob(verifyRes.user.id, testJob.id);
assert(saveRes1.saved === true, "Job save failed");
assert(dbRepository.isJobSaved(verifyRes.user.id, testJob.id) === true, "isJobSaved returned false");

const userSavedJobs = dbRepository.getSavedJobs(verifyRes.user.id);
assert(userSavedJobs.some((j) => j.id === testJob.id), "Saved job not in user saved list");

// Alert preferences
dbRepository.saveUserAlertPreferences(
  verifyRes.user.id,
  testEmail,
  "NG",
  ["RLHF & Alignment"],
  "weekly"
);
const alerts = dbRepository.getUserAlertPreferences(verifyRes.user.id);
assert(alerts?.country_code === "NG", "Alert preference country mismatch");
console.log("Passed: Saved jobs and alert preferences saved.");

// 4. One-Click Complete Account Deletion under NDPA 2023
console.log("\n4. Verifying One-Click Account & Personal Data Deletion under NDPA 2023...");
const deleteRes = dbRepository.deleteUserAndData(verifyRes.user.id);
assert(deleteRes.success === true, "Account deletion returned false");
assert(deleteRes.deletedCount >= 2, "Account deletion did not cascade purge");

// Verify user is gone
assert(dbRepository.getUser(verifyRes.user.id) === null, "User still exists after deletion");
assert(dbRepository.getUserByEmail(testEmail) === null, "User email still searchable after deletion");
assert(dbRepository.getSavedJobs(verifyRes.user.id).length === 0, "Saved jobs remain after deletion");
assert(dbRepository.getUserAlertPreferences(verifyRes.user.id) === null, "Alerts remain after deletion");
assert(dbRepository.getSessionUser(verifyRes.sessionToken) === null, "Session still valid after deletion");

// Verify audit log has record
const auditLogs = dbRepository.getAuditLogs(5);
assert(
  auditLogs.some((a) => a.action === "user.delete_account_and_data"),
  "Audit log missing account deletion record"
);
console.log("Passed: One-click account deletion completely purges profile, bookmarks, alerts, and sessions.");

// 5. Community Experience Reports & Aggregation
console.log("\n5. Verifying Community Experience Reports Moderation & Aggregation...");
const platforms = dbRepository.getPlatforms();
const outlierPlatform = platforms.find((p) => p.slug === "outlier")!;

// Outlier has 3 seed approved reports -> should have sufficient reports
const outlierExp = dbRepository.getAggregatedPlatformExperience(outlierPlatform.id);
assert(outlierExp.has_sufficient_reports === true, "Outlier should have sufficient reports");
assert(outlierExp.sample_size >= 3, "Outlier sample size should be at least 3");
assert(typeof outlierExp.tasks_regular_percent === "number", "tasks_regular_percent must be a number");
assert(typeof outlierExp.onboarding_paid_percent === "number", "onboarding_paid_percent must be a number");

// Create a new platform with 0 reports -> should NOT have sufficient reports
const newReport = dbRepository.submitCommunityReport({
  platform_id: "00000000-0000-0000-0000-000000000004", // Mercor (0 approved seed reports)
  period_month_year: "Sep 2026",
  onboarding_paid: true,
  tasks_available: "regular",
  removed_without_explanation: false,
  optional_note: "Confidential reviewer note",
  contact_email: "test@example.com",
});

assert(newReport.status === "pending", "New reports must default to pending");
const mercorExpBefore = dbRepository.getAggregatedPlatformExperience("00000000-0000-0000-0000-000000000004");
assert(
  mercorExpBefore.has_sufficient_reports === false,
  "Platform with fewer than 3 approved reports must NOT display aggregated metrics"
);

// Approve report
dbRepository.moderateCommunityReport(newReport.id, "approved");
const pending = dbRepository.getPendingCommunityReports();
assert(!pending.some((r) => r.id === newReport.id), "Approved report should not be pending");
console.log("Passed: Community experience reports default to pending; aggregated metrics require minimum sample size threshold.");

// 6. Platform x Country Detailed Eligibility (Section 7.5a)
console.log("\n6. Verifying Platform x Country Eligibility (Section 7.5a)...");
const outlierNg = dbRepository.getPlatformCountryEligibility("outlier", "NG");
assert(outlierNg !== null, "outlier x NG returned null");
assert(outlierNg.eligibilityStatus === "accepted", "Outlier in Nigeria should be accepted");
assert(outlierNg.openRoles.length > 0, "Outlier should have open roles for Nigeria");

const dataAnnotationNg = dbRepository.getPlatformCountryEligibility("dataannotation", "NG");
assert(dataAnnotationNg !== null, "dataannotation x NG returned null");
assert(dataAnnotationNg.eligibilityStatus === "not_accepted", "DataAnnotation in Nigeria should be not_accepted");
assert(
  dataAnnotationNg.alternativePlatforms.length > 0,
  "Unaccepted platforms MUST offer alternatives that DO accept that country (no dead ends)"
);
console.log("Passed: Platform x Country eligibility handles accepted status, and unaccepted routes never dead-end.");

console.log("\nALL MILESTONE 11 CHECKS PASSED SUCCESSFULLY!");
