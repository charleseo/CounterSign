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
      <div className="p-6 sm:p-7 rounded-2xl glass-panel relative overflow-hidden border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[radial-gradient(circle,rgba(61,235,255,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="space-y-1.5 relative z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-bold text-lg sm:text-xl text-primary">
              {user.email}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full glass-pill text-accent-cyan border border-cyan-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Verified Contributor</span>
            </span>
          </div>
          <p className="text-xs text-secondary">
            Preferred country: <strong className="text-primary font-medium">{user.country_code || "Nigeria (NG)"}</strong> &bull; Member since{" "}
            {new Date(user.created_at).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        <form action={logoutAction} className="relative z-10 shrink-0">
          <button
            type="submit"
            className="px-4 py-2 rounded-xl border border-subtle hover:border-cyan-400/50 bg-void/60 text-xs text-secondary hover:text-primary transition-all flex items-center gap-2 cursor-pointer"
          >
            <LogOut size={14} className="text-secondary" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-subtle gap-2 sm:gap-6 text-xs sm:text-sm font-medium">
        <button
          type="button"
          onClick={() => setActiveTab("saved")}
          className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "saved"
              ? "border-accent-cyan text-accent-cyan font-bold shadow-[0_2px_10px_rgba(61,235,255,0.3)]"
              : "border-transparent text-secondary hover:text-primary"
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
              ? "border-accent-cyan text-accent-cyan font-bold shadow-[0_2px_10px_rgba(61,235,255,0.3)]"
              : "border-transparent text-secondary hover:text-primary"
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
              ? "border-accent-cyan text-accent-cyan font-bold shadow-[0_2px_10px_rgba(61,235,255,0.3)]"
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
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-secondary">
              Bookmarked Opportunities
            </h2>
            <Link
              href="/jobs"
              className="text-xs text-accent-cyan hover:underline font-medium"
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
            <div className="p-10 rounded-2xl glass-panel text-center space-y-4 border border-white/[0.08] shadow-lg">
              <div className="w-14 h-14 rounded-2xl glass-pill text-accent-cyan mx-auto flex items-center justify-center border border-cyan-500/20">
                <Bookmark size={24} />
              </div>
              <p className="text-base font-bold text-primary">
                No saved roles yet
              </p>
              <p className="text-xs text-secondary max-w-sm mx-auto leading-relaxed">
                Tap the bookmark icon on any job card to save listings for offline review or application tracking.
              </p>
              <div className="pt-2">
                <Link
                  href="/jobs"
                  className="relative group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-400 to-teal-400 text-void hover:shadow-[0_0_20px_rgba(61,235,255,0.4)] transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                  <span className="relative z-10">Browse Verified Roles</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Job Alerts Preferences */}
      {activeTab === "alerts" && (
        <div className="p-6 sm:p-8 rounded-2xl glass-panel relative overflow-hidden border border-cyan-500/20 space-y-6 shadow-xl">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-primary">
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
                className="w-full sm:w-80 px-3.5 py-2.5 rounded-xl bg-surface/70 border border-subtle focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(61,235,255,0.2)] text-primary text-xs sm:text-sm outline-none transition-all"
              >
                <option value="NG" className="bg-void text-primary">Nigeria (NG)</option>
                <option value="US" className="bg-void text-primary">United States (US)</option>
                <option value="GB" className="bg-void text-primary">United Kingdom (GB)</option>
                <option value="KE" className="bg-void text-primary">Kenya (KE)</option>
                <option value="CA" className="bg-void text-primary">Canada (CA)</option>
                <option value="GH" className="bg-void text-primary">Ghana (GH)</option>
                <option value="IN" className="bg-void text-primary">India (IN)</option>
              </select>
            </div>

            {/* Work Types */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-medium text-secondary uppercase tracking-wider">
                Work Domains of Interest
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
                      className="p-3.5 rounded-xl glass-card border border-white/[0.08] hover:border-cyan-400/40 flex items-center gap-2.5 cursor-pointer transition-all"
                    >
                      <input
                        type="checkbox"
                        name="work_types"
                        value={wt}
                        defaultChecked={isChecked}
                        className="rounded border-subtle text-accent-cyan focus:ring-accent-cyan cursor-pointer"
                      />
                      <span className="text-readable font-medium">{wt}</span>
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
                className="w-full sm:w-80 px-3.5 py-2.5 rounded-xl bg-surface/70 border border-subtle focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(61,235,255,0.2)] text-primary text-xs sm:text-sm outline-none transition-all"
              >
                <option value="weekly" className="bg-void text-primary">Weekly Verified Digest (Recommended)</option>
                <option value="instant" className="bg-void text-primary">Instant Notification (When role verifies)</option>
              </select>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                className="relative group px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-400 to-teal-400 text-void hover:shadow-[0_0_20px_rgba(61,235,255,0.4)] transition-all cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                <span className="relative z-10">Save Alert Settings</span>
              </button>

              {saveStatus === "saved" && (
                <span className="text-xs text-accent-emerald flex items-center gap-1.5 font-medium animate-in fade-in">
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
          <div className="p-6 sm:p-7 rounded-2xl glass-panel relative overflow-hidden border border-cyan-500/20 space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-accent-cyan" size={20} />
              <h2 className="text-base font-bold text-primary">
                Your Rights Under NDPA 2023
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-readable leading-relaxed">
              The Nigeria Data Protection Act (NDPA) 2023 guarantees you full ownership over your personal data. Countersign adheres to strict data minimization: we do not collect National Identification Numbers, bank credentials, biometric scans, or browser keystrokes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <Link
                href="/privacy/request"
                className="p-3.5 rounded-xl glass-card border border-white/[0.08] hover:border-cyan-400/40 flex items-center justify-between text-secondary hover:text-primary transition-all font-medium"
              >
                <span>Submit Statutory Subject Access Request (SAR)</span>
                <ExternalLink size={13} className="text-accent-cyan" />
              </Link>
              <Link
                href="/privacy"
                className="p-3.5 rounded-xl glass-card border border-white/[0.08] hover:border-cyan-400/40 flex items-center justify-between text-secondary hover:text-primary transition-all font-medium"
              >
                <span>View NDPA Processing Record (ROPA)</span>
                <ExternalLink size={13} className="text-accent-cyan" />
              </Link>
            </div>
          </div>

          {/* Destructive One-Click Deletion */}
          <div className="p-6 sm:p-7 rounded-2xl glass-panel border border-red-500/30 text-xs space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-red-400 font-bold text-base">
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
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-accent-danger text-white hover:bg-accent-danger/90 transition-all cursor-pointer shadow-md"
              >
                Delete My Account and Personal Data
              </button>
            ) : (
              <div className="p-4 rounded-xl glass-panel border border-red-500/50 space-y-3">
                <div className="flex items-center gap-2 text-xs text-red-400 font-semibold">
                  <AlertTriangle size={16} />
                  <span>Are you absolutely certain? This cannot be undone.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-accent-danger text-white hover:bg-accent-danger/90 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isDeleting ? "Purging All Data..." : "Yes, Permanently Erase All My Data"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    disabled={isDeleting}
                    className="px-4 py-2 rounded-xl text-xs font-medium glass-card border border-subtle text-secondary hover:text-primary transition-all cursor-pointer"
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
