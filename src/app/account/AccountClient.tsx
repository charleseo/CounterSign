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
      <div className="p-6 rounded-xl border border-subtle bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base sm:text-lg text-primary">
              {user.email}
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
              Verified Contributor
            </span>
          </div>
          <p className="text-xs text-secondary">
            Preferred country: {user.country_code || "Nigeria (NG)"} &bull; Member since{" "}
            {new Date(user.created_at).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg border border-subtle hover:border-focus bg-void text-xs text-secondary hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </form>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-subtle gap-2 sm:gap-6 text-xs sm:text-sm font-medium">
        <button
          type="button"
          onClick={() => setActiveTab("saved")}
          className={`pb-3 px-1 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "saved"
              ? "border-accent-cyan text-accent-cyan font-semibold"
              : "border-transparent text-secondary hover:text-primary"
          }`}
        >
          <Bookmark size={16} />
          <span>Saved Roles ({savedJobs.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("alerts")}
          className={`pb-3 px-1 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "alerts"
              ? "border-accent-cyan text-accent-cyan font-semibold"
              : "border-transparent text-secondary hover:text-primary"
          }`}
        >
          <Bell size={16} />
          <span>Job Alerts</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("privacy")}
          className={`pb-3 px-1 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "privacy"
              ? "border-accent-cyan text-accent-cyan font-semibold"
              : "border-transparent text-secondary hover:text-primary"
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
            <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">
              Bookmarked Opportunities
            </h2>
            <Link
              href="/jobs"
              className="text-xs text-accent-cyan hover:underline"
            >
              Explore all verified roles &rarr;
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
            <div className="p-8 rounded-xl border border-subtle bg-surface text-center space-y-3">
              <Bookmark className="mx-auto text-secondary" size={28} />
              <p className="text-sm font-semibold text-primary">
                No saved roles yet
              </p>
              <p className="text-xs text-secondary max-w-sm mx-auto leading-relaxed">
                Tap the bookmark icon on any job card to save listings for offline review or application tracking.
              </p>
              <div className="pt-2">
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-accent-cyan text-[#04080F] hover:bg-accent-cyan/90 transition-colors"
                >
                  Browse Verified Roles
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Job Alerts Preferences */}
      {activeTab === "alerts" && (
        <div className="p-6 rounded-xl border border-subtle bg-surface space-y-6">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-primary">
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
                className="block text-xs font-mono font-medium text-secondary uppercase tracking-wider"
              >
                Primary Working Jurisdiction
              </label>
              <select
                id="country_code"
                name="country_code"
                defaultValue={initialAlerts?.country_code || user.country_code || "NG"}
                className="w-full sm:w-72 px-3 py-2 rounded-lg border border-subtle bg-void text-primary text-xs sm:text-sm focus:outline-none focus:border-focus"
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
              <label className="block text-xs font-mono font-medium text-secondary uppercase tracking-wider">
                Work Domains of Interest
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
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
                      className="p-3 rounded-lg border border-subtle bg-void flex items-center gap-2 cursor-pointer hover:border-focus"
                    >
                      <input
                        type="checkbox"
                        name="work_types"
                        value={wt}
                        defaultChecked={isChecked}
                        className="rounded border-subtle text-accent-cyan focus:ring-accent-cyan"
                      />
                      <span className="text-readable">{wt}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Frequency */}
            <div className="space-y-1.5">
              <label
                htmlFor="frequency"
                className="block text-xs font-mono font-medium text-secondary uppercase tracking-wider"
              >
                Alert Frequency
              </label>
              <select
                id="frequency"
                name="frequency"
                defaultValue={initialAlerts?.frequency || "weekly"}
                className="w-full sm:w-72 px-3 py-2 rounded-lg border border-subtle bg-void text-primary text-xs sm:text-sm focus:outline-none focus:border-focus"
              >
                <option value="weekly">Weekly Verified Digest (Recommended)</option>
                <option value="instant">Instant Notification (When role verifies)</option>
              </select>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-accent-cyan text-[#04080F] hover:bg-accent-cyan/90 transition-colors"
              >
                Save Alert Settings
              </button>

              {saveStatus === "saved" && (
                <span className="text-xs text-accent-emerald flex items-center gap-1">
                  <CheckCircle2 size={14} />
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
          <div className="p-6 rounded-xl border border-subtle bg-surface space-y-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="text-accent-cyan" size={20} />
              <h2 className="text-base font-semibold text-primary">
                Your Rights Under NDPA 2023
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-readable leading-relaxed">
              The Nigeria Data Protection Act (NDPA) 2023 guarantees you full ownership over your personal data. Countersign adheres to strict data minimization: we do not collect National Identification Numbers, bank credentials, biometric scans, or browser keystrokes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <Link
                href="/privacy/request"
                className="p-3 rounded-lg border border-subtle hover:border-focus bg-void flex items-center justify-between text-secondary hover:text-primary transition-colors"
              >
                <span>Submit Statutory Subject Access Request (SAR)</span>
                <ExternalLink size={13} />
              </Link>
              <Link
                href="/privacy"
                className="p-3 rounded-lg border border-subtle hover:border-focus bg-void flex items-center justify-between text-secondary hover:text-primary transition-colors"
              >
                <span>View NDPA Processing Record (ROPA)</span>
                <ExternalLink size={13} />
              </Link>
            </div>
          </div>

          {/* Destructive One-Click Deletion */}
          <div className="p-6 rounded-xl border border-accent-danger/40 bg-accent-danger/5 space-y-4">
            <div className="flex items-center gap-2 text-accent-danger font-semibold text-base">
              <Trash2 size={20} />
              <span>One-Click Complete Account Deletion</span>
            </div>
            <p className="text-xs text-readable leading-relaxed">
              Clicking the button below will immediately and permanently erase your account profile, all {savedJobs.length} saved jobs, your alert subscriptions, and session tokens. In compliance with NDPA Section 38, your consent withdrawal will be recorded as a cryptographic hash in our append-only log with zero plaintext data retained.
            </p>

            {!confirmDelete ? (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-accent-danger text-white hover:bg-accent-danger/90 transition-colors"
              >
                Delete My Account and Personal Data
              </button>
            ) : (
              <div className="p-4 rounded-lg border border-accent-danger/50 bg-void space-y-3">
                <div className="flex items-center gap-2 text-xs text-accent-danger font-semibold">
                  <AlertTriangle size={16} />
                  <span>Are you absolutely certain? This cannot be undone.</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-accent-danger text-white hover:bg-accent-danger/90 transition-colors"
                  >
                    {isDeleting ? "Purging All Data..." : "Yes, Permanently Erase All My Data"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    disabled={isDeleting}
                    className="px-3 py-2 rounded-lg text-xs font-medium border border-subtle text-secondary hover:text-primary transition-colors"
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
