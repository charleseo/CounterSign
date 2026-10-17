"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, JobWithPlatform, AlertSubscription } from "@/lib/db/types";
import { JobCard } from "@/components/ui/JobCard";
import {
  logoutAction,
  updateAccountPreferencesAction,
  deleteAccountAction,
  toggleSaveJobAction,
} from "@/lib/actions/account";
import {
  Bookmark,
  Bell,
  ShieldAlert,
  LogOut,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

interface AccountClientProps {
  user: User;
  savedJobs: JobWithPlatform[];
  alertPreferences: AlertSubscription | null;
}

export function AccountClient({
  user,
  savedJobs: initialSavedJobs,
  alertPreferences: initialAlerts,
}: AccountClientProps) {
  const [activeTab, setActiveTab] = useState<"saved" | "alerts" | "privacy">("saved");
  const [savedJobs, setSavedJobs] = useState<JobWithPlatform[]>(initialSavedJobs);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleJobSaveToggle = async (jobId: string, isSaved: boolean) => {
    if (!isSaved) {
      setSavedJobs((prev) => prev.filter((j) => j.id !== jobId));
    }
    await toggleSaveJobAction(jobId);
  };

  const handlePreferencesSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaveStatus("saving");
    const formData = new FormData(e.currentTarget);
    const res = await updateAccountPreferencesAction(user.id, formData);
    if (res.success) {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(null), 3500);
    } else {
      setSaveStatus("error");
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    await deleteAccountAction(user.id);
  };

  return (
    <div className="space-y-8">
      {/* User Header Card */}
      <div className="p-6 sm:p-7 rounded-xl bg-sheet border border-rule flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-semibold text-lg sm:text-xl text-ink">
              {user.email}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full bg-violet-50 text-brand-violet border border-violet-200">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-violet" />
              <span>Verified Contributor</span>
            </span>
          </div>
          <p className="text-xs text-secondary">
            Preferred country: <strong className="text-ink font-medium">{user.country_code || "Nigeria (NG)"}</strong> &bull; Member since{" "}
            <span className="tabular-nums">
              {new Date(user.created_at).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
          </p>
        </div>

        <form action={logoutAction} className="shrink-0">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg border border-rule hover:border-ink/30 bg-surface text-xs text-secondary hover:text-ink transition-all flex items-center gap-2 cursor-pointer"
          >
            <LogOut size={14} className="text-secondary" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-rule gap-2 sm:gap-6 text-xs sm:text-sm font-medium">
        <button
          type="button"
          onClick={() => setActiveTab("saved")}
          className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "saved"
              ? "border-[#5A35C8] text-[#5A35C8] font-bold"
              : "border-transparent text-secondary hover:text-ink"
          }`}
        >
          <Bookmark size={16} />
          <span>Saved Roles ({savedJobs.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("alerts")}
          className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "alerts"
              ? "border-[#5A35C8] text-[#5A35C8] font-bold"
              : "border-transparent text-secondary hover:text-ink"
          }`}
        >
          <Bell size={16} />
          <span>Job Alerts</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("privacy")}
          className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "privacy"
              ? "border-[#5A35C8] text-[#5A35C8] font-bold"
              : "border-transparent text-secondary hover:text-ink"
          }`}
        >
          <ShieldAlert size={16} />
          <span>NDPA 2023 & Data Rights</span>
        </button>
      </div>

      {/* Tab 1: Saved Jobs */}
      {activeTab === "saved" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-secondary">
              Bookmarked roles
            </h2>
            <Link
              href="/jobs"
              className="text-xs text-brand-violet hover:underline font-medium"
            >
              Explore all roles &rarr;
            </Link>
          </div>

          {savedJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {savedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  slug={job.slug}
                  title={job.title}
                  platform={job.platform.name.replace(/\[SAMPLE\]/g, "").trim()}
                  workType={job.work_type}
                  countryEligibility="accepted"
                  countryName="Nigeria"
                  verifiedPay={job.pay_text || undefined}
                  daysAgo={job.daysAgo ?? 2}
                  status={job.status}
                  isClosed={job.status === "closed"}
                  initialSaved={true}
                  onSaveToggle={handleJobSaveToggle}
                />
              ))}
            </div>
          ) : (
            <div className="p-10 rounded-xl bg-sheet border border-rule text-center space-y-4">
              <div className="w-14 h-14 rounded-xl bg-surface text-brand-violet mx-auto flex items-center justify-center border border-rule">
                <Bookmark size={24} />
              </div>
              <p className="text-base font-semibold text-ink">
                No saved roles yet
              </p>
              <p className="text-xs text-secondary max-w-sm mx-auto leading-relaxed">
                Tap the bookmark icon on any job card to save listings for offline review or application tracking.
              </p>
              <div className="pt-2">
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#5A35C8] text-white hover:bg-[#4828AC] transition-all"
                >
                  <span>Browse Roles</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Job Alerts Preferences */}
      {activeTab === "alerts" && (
        <div className="p-6 sm:p-8 rounded-xl bg-sheet border border-rule space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-ink">
              Job Alert Preferences
            </h2>
            <p className="text-xs text-secondary leading-relaxed">
              Receive verified opportunities filtered by your country and domains. No marketing spam, no paywalled roles.
            </p>
          </div>

          <form onSubmit={handlePreferencesSubmit} className="space-y-5">
            {/* Preferred Country */}
            <div className="space-y-1.5">
              <label
                htmlFor="country_code"
                className="block text-xs font-medium text-secondary"
              >
                Where do you work from?
              </label>
              <select
                id="country_code"
                name="country_code"
                defaultValue={initialAlerts?.country_code || user.country_code || "NG"}
                className="w-full sm:w-80 px-3.5 py-2.5 rounded-lg bg-surface border border-rule focus:border-[#5A35C8] text-ink text-xs sm:text-sm outline-none transition-all"
              >
                <option value="NG">Nigeria (NG)</option>
                <option value="US">United States (US)</option>
                <option value="GB">United Kingdom (GB)</option>
                <option value="KE">Kenya (KE)</option>
                <option value="CA">Canada (CA)</option>
                <option value="GH">Ghana (GH)</option>
                <option value="IN">India (IN)</option>
              </select>
            </div>

            {/* Work Types */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-secondary">
                Work domains of interest
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {[
                  "RLHF & Alignment",
                  "Code Verification",
                  "Search Evaluation",
                  "Multilingual Translation",
                  "Medical Annotation",
                  "Legal Reasoning",
                ].map((wt) => {
                  const isChecked = initialAlerts?.work_types.includes(wt) ?? true;
                  return (
                    <label
                      key={wt}
                      className="p-3.5 rounded-lg bg-surface border border-rule hover:border-[#5A35C8]/40 flex items-center gap-2.5 cursor-pointer transition-all"
                    >
                      <input
                        type="checkbox"
                        name="work_types"
                        value={wt}
                        defaultChecked={isChecked}
                        className="rounded border-rule text-[#5A35C8] focus:ring-[#5A35C8] cursor-pointer"
                      />
                      <span className="text-ink font-medium">{wt}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Frequency */}
            <div className="space-y-1.5">
              <label
                htmlFor="frequency"
                className="block text-xs font-medium text-secondary"
              >
                Alert frequency
              </label>
              <select
                id="frequency"
                name="frequency"
                defaultValue={initialAlerts?.frequency || "weekly"}
                className="w-full sm:w-80 px-3.5 py-2.5 rounded-lg bg-surface border border-rule focus:border-[#5A35C8] text-ink text-xs sm:text-sm outline-none transition-all"
              >
                <option value="weekly">Weekly verified digest (recommended)</option>
                <option value="instant">Instant notification (when role verifies)</option>
              </select>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#5A35C8] text-white hover:bg-[#4828AC] transition-all cursor-pointer"
              >
                <span>Save Alert Settings</span>
              </button>

              {saveStatus === "saved" && (
                <span className="text-xs text-emerald-600 flex items-center gap-1.5 font-medium animate-in fade-in">
                  <CheckCircle2 size={15} />
                  <span>Preferences saved</span>
                </span>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: NDPA 2023 & Data Rights & One-Click Deletion */}
      {activeTab === "privacy" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-7 rounded-xl bg-sheet border border-rule space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-brand-violet" size={20} />
              <h2 className="text-base font-semibold text-ink">
                Your Rights Under NDPA 2023
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed">
              The Nigeria Data Protection Act (NDPA) 2023 guarantees you full ownership over your personal data. TraceBase adheres to strict data minimization: we do not collect National Identification Numbers, bank credentials, biometric scans, or browser keystrokes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <Link
                href="/privacy/request"
                className="p-3.5 rounded-lg bg-surface border border-rule hover:border-[#5A35C8]/40 flex items-center justify-between text-secondary hover:text-ink transition-all font-medium"
              >
                <span>Submit Statutory Subject Access Request (SAR)</span>
                <ExternalLink size={13} className="text-brand-violet" />
              </Link>
              <Link
                href="/privacy"
                className="p-3.5 rounded-lg bg-surface border border-rule hover:border-[#5A35C8]/40 flex items-center justify-between text-secondary hover:text-ink transition-all font-medium"
              >
                <span>View NDPA Processing Record (ROPA)</span>
                <ExternalLink size={13} className="text-brand-violet" />
              </Link>
            </div>
          </div>

          {/* Destructive One-Click Deletion */}
          <div className="p-6 sm:p-7 rounded-xl bg-sheet border border-red-200 text-xs space-y-4">
            <div className="flex items-center gap-2 text-red-700 font-semibold text-base">
              <Trash2 size={20} />
              <span>One-Click Complete Account Deletion</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Clicking the button below will immediately and permanently erase your account profile, all <span className="tabular-nums">{savedJobs.length}</span> saved jobs, your alert subscriptions, and session tokens. In compliance with NDPA Section 38, your consent withdrawal will be recorded as a cryptographic hash in our append-only log with zero plaintext data retained.
            </p>

            {!confirmDelete ? (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="px-4 py-2.5 rounded-lg text-xs font-semibold bg-red-600 text-white hover:bg-red-700 transition-all cursor-pointer"
              >
                Delete My Account and Personal Data
              </button>
            ) : (
              <div className="p-4 rounded-lg bg-red-50/60 border border-red-200 space-y-3">
                <div className="flex items-center gap-2 text-xs text-red-700 font-semibold">
                  <AlertTriangle size={16} />
                  <span>Are you absolutely certain? This cannot be undone.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-red-600 text-white hover:bg-red-700 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isDeleting ? "Purging All Data..." : "Yes, Permanently Erase All My Data"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    disabled={isDeleting}
                    className="px-4 py-2 rounded-lg text-xs font-medium bg-surface border border-rule text-secondary hover:text-ink transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
