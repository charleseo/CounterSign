"use client";

import React, { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import {
  User,
  JobWithPlatform,
  AlertSubscription,
  UserApplication,
  UserTestScore,
  UserCv,
  UserPayoutLog,
  ApplicationStatus,
} from "@/lib/db/types";
import { JobCard } from "@/components/ui/JobCard";
import {
  logoutAction,
  updateAccountPreferencesAction,
  deleteAccountAction,
  toggleSaveJobAction,
  updateApplicationStatusAction,
  addUserApplicationAction,
  deleteUserApplicationAction,
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
  Briefcase,
  Award,
  FileText,
  DollarSign,
  Plus,
  ArrowRight,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Download,
  Edit,
  Copy,
  Check,
  Target,
  HelpCircle,
  TrendingUp,
  Mail,
  Send,
  Inbox,
} from "lucide-react";

interface AccountClientProps {
  user: User;
  savedJobs: JobWithPlatform[];
  alertPreferences: AlertSubscription | null;
  applications: UserApplication[];
  testScores: UserTestScore[];
  userCvs: UserCv[];
  userPayouts: UserPayoutLog[];
}

export function AccountClient({
  user,
  savedJobs: initialSavedJobs,
  alertPreferences: initialAlerts,
  applications: initialApplications,
  testScores: initialTestScores,
  userCvs: initialUserCvs,
  userPayouts: initialUserPayouts,
}: AccountClientProps) {
  const [activeTab, setActiveTab] = useState<
    "applied" | "scores" | "cvs" | "saved" | "drills" | "payouts" | "alerts" | "privacy"
  >("applied");
  const [currency, setCurrency] = useState<"USD" | "NGN">("USD");
  const [applications, setApplications] = useState<UserApplication[]>(initialApplications);
  const [testScores] = useState<UserTestScore[]>(initialTestScores);
  const [userCvs] = useState<UserCv[]>(initialUserCvs);
  const [userPayouts] = useState<UserPayoutLog[]>(initialUserPayouts);
  const [savedJobs, setSavedJobs] = useState<JobWithPlatform[]>(initialSavedJobs);
  const [isAddingApp, setIsAddingApp] = useState(false);
  const [appFilter, setAppFilter] = useState<string>("all");
  const [expandedCvId, setExpandedCvId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [, startTransition] = useTransition();

  // Interactive Mini Drill State
  const [drillAnswer, setDrillAnswer] = useState<number | null>(null);
  const [drillSubmitted, setDrillSubmitted] = useState(false);

  // Email newsletter and alert preferences state
  const [frequency, setFrequency] = useState<string>(initialAlerts?.frequency || "weekly");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialAlerts?.categories || ["opportunities", "newsletter", "scam_alerts", "drills"]
  );
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [emailPreviewMode, setEmailPreviewMode] = useState<"weekly" | "daily">("weekly");
  const [testEmailSent, setTestEmailSent] = useState(false);

  // Time-aware greeting
  const [greeting, setGreeting] = useState("Hello");
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const contributorId = `TRC-${user.id.slice(0, 6).toUpperCase() || "882194"}`;

  const copyContributorId = () => {
    navigator.clipboard?.writeText(contributorId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2500);
  };

  // Metrics summary
  const acceptedAppsCount = applications.filter((a) => a.status === "accepted").length;
  const inProgressAppsCount = applications.filter((a) =>
    ["assessment_pending", "interviewing", "applied"].includes(a.status)
  ).length;

  const totalScore = testScores.reduce((acc, curr) => acc + curr.score, 0);
  const avgScore = testScores.length > 0 ? Math.round(totalScore / testScores.length) : 93;
  const passedScoresCount = testScores.filter((t) => t.passed).length;

  const totalGrossUsd = userPayouts.reduce((acc, curr) => acc + curr.gross_usd, 0);
  const totalHoursLogged = userPayouts.reduce((acc, curr) => acc + curr.hours_logged, 0);
  const totalNetNgnApprox = totalGrossUsd * 1500;

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

  const handleStatusChange = (appId: string, newStatus: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((a) =>
        a.id === appId
          ? { ...a, status: newStatus, last_updated_at: new Date().toISOString() }
          : a
      )
    );
    startTransition(async () => {
      await updateApplicationStatusAction(appId, newStatus);
    });
  };

  const handleDeleteApplication = (appId: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== appId));
    startTransition(async () => {
      await deleteUserApplicationAction(appId);
    });
  };

  const handleAddApplicationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await addUserApplicationAction(formData);
    if (res.success && res.application) {
      setApplications((prev) => [res.application!, ...prev]);
      setIsAddingApp(false);
    }
  };

  const filteredApplications = applications.filter((app) => {
    if (appFilter === "all") return true;
    return app.status === appFilter;
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case "accepted":
        return {
          label: "Accepted and onboarding",
          className: "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30",
          dot: "bg-emerald-500",
          stepIndex: 3,
        };
      case "interviewing":
        return {
          label: "Screening and review",
          className: "bg-blue-500/10 text-blue-800 dark:text-blue-300 border-blue-500/30",
          dot: "bg-blue-500",
          stepIndex: 2,
        };
      case "assessment_pending":
        return {
          label: "Assessment pending",
          className: "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30",
          dot: "bg-amber-500",
          stepIndex: 1,
        };
      case "applied":
        return {
          label: "Profile and CV submitted",
          className: "bg-[#5A35C8]/10 text-[#5A35C8] dark:text-[#a78bfa] border-[#5A35C8]/30",
          dot: "bg-[#5A35C8]",
          stepIndex: 0,
        };
      case "rejected":
      case "archived":
        return {
          label: "Archived",
          className: "bg-surface text-secondary border-rule",
          dot: "bg-muted",
          stepIndex: -1,
        };
    }
  };

  // Pipeline stages definition
  const pipelineSteps = [
    { key: "applied", label: "CV sent" },
    { key: "assessment_pending", label: "Screening test" },
    { key: "interviewing", label: "Review" },
    { key: "accepted", label: "Active contract" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Sovereign Contributor Identity Banner */}
      <div className="relative overflow-hidden p-5 sm:p-7 rounded-2xl bg-sheet border border-rule shadow-sm">
        {/* Ambient background glow */}
        <div
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#5A35C8]/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#5A35C8] to-[#3B1F8C] flex items-center justify-center text-xl sm:text-2xl shadow-md shrink-0 text-white">
              <span>🛡️</span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-[#8B5CF6]">
                  {greeting}, contributor
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Verified evaluator</span>
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink m-0">
                {user.email}
              </h1>

              <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs text-secondary">
                <button
                  type="button"
                  onClick={copyContributorId}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-surface border border-rule hover:border-ink/30 font-mono text-[11px] text-ink cursor-pointer transition-colors"
                  title="Click to copy contributor ID"
                >
                  <span>{contributorId}</span>
                  {copiedId ? (
                    <Check size={11} className="text-emerald-500" />
                  ) : (
                    <Copy size={11} className="text-secondary" />
                  )}
                </button>
                <span>&bull;</span>
                <span>Active from <strong className="text-ink">{user.country_code || "Nigeria (NG)"}</strong></span>
                <span>&bull;</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">14-day check compliance</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center shrink-0">
            {/* Currency Switcher */}
            <div className="inline-flex items-center p-0.5 rounded-xl bg-surface border border-rule text-xs font-semibold">
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  currency === "USD"
                    ? "bg-[#5A35C8] text-white shadow-xs"
                    : "text-secondary hover:text-ink"
                }`}
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => setCurrency("NGN")}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  currency === "NGN"
                    ? "bg-[#5A35C8] text-white shadow-xs"
                    : "text-secondary hover:text-ink"
                }`}
              >
                NGN (₦)
              </button>
            </div>

            <form action={logoutAction}>
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl border border-rule hover:border-ink/30 bg-surface text-xs font-semibold text-secondary hover:text-ink transition-all flex items-center gap-1.5 cursor-pointer min-h-[38px]"
              >
                <LogOut size={13} className="text-secondary" />
                <span>Sign out</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 2. Top Metric Cards with Circular SVG Gauge */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Applied Platforms */}
        <button
          type="button"
          onClick={() => setActiveTab("applied")}
          className={`p-4 sm:p-5 rounded-2xl bg-sheet border text-left transition-all space-y-2 shadow-xs cursor-pointer group ${
            activeTab === "applied"
              ? "border-[#5A35C8] ring-1 ring-[#5A35C8]"
              : "border-rule hover:border-[#5A35C8]/40"
          }`}
        >
          <div className="flex items-center justify-between text-xs text-secondary">
            <span className="font-semibold group-hover:text-ink">Applied platforms</span>
            <span className="text-base">💼</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-ink tabular-nums">
            {applications.length}
          </div>
          <div className="text-[11px] text-muted flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>
              {acceptedAppsCount > 0
                ? `${acceptedAppsCount} active, ${inProgressAppsCount} in pipeline`
                : `${inProgressAppsCount} in pipeline`}
            </span>
          </div>
        </button>

        {/* Card 2: Test Readiness Gauge */}
        <button
          type="button"
          onClick={() => setActiveTab("scores")}
          className={`p-4 sm:p-5 rounded-2xl bg-sheet border text-left transition-all space-y-2 shadow-xs cursor-pointer group ${
            activeTab === "scores"
              ? "border-emerald-500 ring-1 ring-emerald-500"
              : "border-rule hover:border-emerald-500/40"
          }`}
        >
          <div className="flex items-center justify-between text-xs text-secondary">
            <span className="font-semibold group-hover:text-ink">Test readiness</span>
            <span className="text-base">🎯</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-800 dark:text-emerald-300 tabular-nums">
              {avgScore}%
            </div>

            {/* Circular SVG Gauge */}
            <div className="w-10 h-10 relative shrink-0">
              <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  className="stroke-surface"
                  strokeWidth="3.5"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  className="stroke-emerald-500"
                  strokeWidth="3.5"
                  strokeDasharray={`${(avgScore / 100) * 88} 88`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-emerald-800 dark:text-emerald-300">
                ✓
              </div>
            </div>
          </div>

          <div className="text-[11px] text-muted">
            {passedScoresCount} of {testScores.length} tests passed
          </div>
        </button>

        {/* Card 3: Active Resumes & CVs */}
        <button
          type="button"
          onClick={() => setActiveTab("cvs")}
          className={`p-4 sm:p-5 rounded-2xl bg-sheet border text-left transition-all space-y-2 shadow-xs cursor-pointer group ${
            activeTab === "cvs"
              ? "border-sky-500 ring-1 ring-sky-500"
              : "border-rule hover:border-sky-500/40"
          }`}
        >
          <div className="flex items-center justify-between text-xs text-secondary">
            <span className="font-semibold group-hover:text-ink">Tailored CVs</span>
            <span className="text-base">📄</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-ink tabular-nums">
            {userCvs.length}
          </div>
          <div className="text-[11px] text-muted flex items-center gap-1.5">
            <span className="text-sky-700 dark:text-sky-400 font-mono font-medium">96%</span>
            <span>average ATS match</span>
          </div>
        </button>

        {/* Card 4: Estimated Payouts */}
        <button
          type="button"
          onClick={() => setActiveTab("payouts")}
          className={`p-4 sm:p-5 rounded-2xl bg-sheet border text-left transition-all space-y-2 shadow-xs cursor-pointer group ${
            activeTab === "payouts"
              ? "border-amber-500 ring-1 ring-amber-500"
              : "border-rule hover:border-amber-500/40"
          }`}
        >
          <div className="flex items-center justify-between text-xs text-secondary">
            <span className="font-semibold group-hover:text-ink">Logged pay</span>
            <span className="text-base">💵</span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold font-mono text-ink tabular-nums truncate">
            {currency === "USD"
              ? `$${totalGrossUsd.toLocaleString()}`
              : `₦${totalNetNgnApprox.toLocaleString()}`}
          </div>
          <div className="text-[11px] text-muted truncate">
            {totalHoursLogged} hrs @ $36/hr avg
          </div>
        </button>
      </div>

      {/* 3. Workbench Launch Strip */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface/60 border border-rule space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-ink flex items-center gap-1.5">
            <span>🛠️</span>
            <span>Quick contributor tools</span>
          </span>
          <span className="text-[11px] text-secondary font-medium">Free and direct</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <Link
            href="/task-check"
            className="p-3 sm:p-3.5 rounded-xl bg-sheet border border-rule hover:border-[#5A35C8] transition-all flex flex-col gap-1 group min-h-[44px]"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-ink group-hover:text-[#5A35C8]">Task check</span>
              <Target size={14} className="text-[#8B5CF6]" />
            </div>
            <span className="text-[11px] text-secondary">Scan word limits &amp; traps</span>
          </Link>

          <Link
            href="/payout-calculator"
            className="p-3 sm:p-3.5 rounded-xl bg-sheet border border-rule hover:border-emerald-500 transition-all flex flex-col gap-1 group min-h-[44px]"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-ink group-hover:text-emerald-700 dark:group-hover:text-emerald-300">Net payout</span>
              <DollarSign size={14} className="text-emerald-500" />
            </div>
            <span className="text-[11px] text-secondary">USD to NGN net calculator</span>
          </Link>

          <Link
            href="/cv-builder"
            className="p-3 sm:p-3.5 rounded-xl bg-sheet border border-rule hover:border-[#5A35C8] transition-all flex flex-col gap-1 group min-h-[44px]"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-ink group-hover:text-[#5A35C8]">ATS CV builder</span>
              <FileText size={14} className="text-[#8B5CF6]" />
            </div>
            <span className="text-[11px] text-secondary">1-page evaluator resume</span>
          </Link>

          <Link
            href="/training?tab=simulator"
            className="p-3 sm:p-3.5 rounded-xl bg-sheet border border-rule hover:border-sky-500 transition-all flex flex-col gap-1 group min-h-[44px]"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-ink group-hover:text-sky-700 dark:group-hover:text-sky-300">Mock screening</span>
              <ShieldCheck size={14} className="text-sky-500" />
            </div>
            <span className="text-[11px] text-secondary">5-minute timed test drills</span>
          </Link>
        </div>
      </div>

      {/* 4. Tabs Navigation Bar */}
      <div className="flex border-b border-rule gap-1.5 sm:gap-3 text-xs sm:text-sm font-semibold overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab("applied")}
          className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[44px] ${
            activeTab === "applied"
              ? "border-[#5A35C8] text-[#5A35C8] font-bold"
              : "border-transparent text-secondary hover:text-ink"
          }`}
        >
          <Briefcase size={15} />
          <span>Applied platforms ({applications.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("scores")}
          className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[44px] ${
            activeTab === "scores"
              ? "border-[#5A35C8] text-[#5A35C8] font-bold"
              : "border-transparent text-secondary hover:text-ink"
          }`}
        >
          <Award size={15} />
          <span>Test scores ({testScores.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("cvs")}
          className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[44px] ${
            activeTab === "cvs"
              ? "border-[#5A35C8] text-[#5A35C8] font-bold"
              : "border-transparent text-secondary hover:text-ink"
          }`}
        >
          <FileText size={15} />
          <span>Resumes &amp; CVs ({userCvs.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("drills")}
          className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[44px] ${
            activeTab === "drills"
              ? "border-[#5A35C8] text-[#5A35C8] font-bold"
              : "border-transparent text-secondary hover:text-ink"
          }`}
        >
          <span>🧪</span>
          <span>Practice drills</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("saved")}
          className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[44px] ${
            activeTab === "saved"
              ? "border-[#5A35C8] text-[#5A35C8] font-bold"
              : "border-transparent text-secondary hover:text-ink"
          }`}
        >
          <Bookmark size={15} />
          <span>Saved roles ({savedJobs.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("payouts")}
          className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[44px] ${
            activeTab === "payouts"
              ? "border-[#5A35C8] text-[#5A35C8] font-bold"
              : "border-transparent text-secondary hover:text-ink"
          }`}
        >
          <DollarSign size={15} />
          <span>Payouts &amp; earnings</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("alerts")}
          className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[44px] ${
            activeTab === "alerts"
              ? "border-[#5A35C8] text-[#5A35C8] font-bold"
              : "border-transparent text-secondary hover:text-ink"
          }`}
        >
          <Mail size={15} />
          <span>Email &amp; newsletter</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("privacy")}
          className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[44px] ${
            activeTab === "privacy"
              ? "border-[#5A35C8] text-[#5A35C8] font-bold"
              : "border-transparent text-secondary hover:text-ink"
          }`}
        >
          <ShieldAlert size={15} />
          <span>Privacy</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: APPLIED PLATFORMS TRACKER (WITH VISUAL PIPELINE)
          ========================================================================= */}
      {activeTab === "applied" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-ink m-0">
                Platforms and roles you applied to
              </h2>
              <p className="text-xs text-secondary m-0">
                Visual pipeline stages across your active applications and onboarding statuses.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddingApp(!isAddingApp)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#5A35C8] hover:bg-[#4828AC] text-white text-xs font-semibold transition-all self-start sm:self-auto cursor-pointer shadow-xs min-h-[38px]"
            >
              <Plus size={14} />
              <span>{isAddingApp ? "Close form" : "Log an application"}</span>
            </button>
          </div>

          {/* Inline Form to Log Application */}
          {isAddingApp && (
            <form
              onSubmit={handleAddApplicationSubmit}
              className="p-5 rounded-2xl bg-sheet border border-[#5A35C8]/40 space-y-4 animate-in fade-in"
            >
              <div className="flex items-center justify-between border-b border-rule pb-3">
                <span className="text-xs font-bold text-ink">
                  Log a new platform application
                </span>
                <span className="text-[11px] text-secondary">TraceBase application log</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label htmlFor="job_title" className="font-medium text-secondary">
                    Role title
                  </label>
                  <input
                    id="job_title"
                    name="job_title"
                    required
                    placeholder="e.g. AI Generalist Evaluator"
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-rule text-ink outline-none focus:border-[#5A35C8] min-h-[40px]"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="platform_name" className="font-medium text-secondary">
                    Platform
                  </label>
                  <input
                    id="platform_name"
                    name="platform_name"
                    required
                    placeholder="e.g. Outlier AI, Alignerr, Mercor"
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-rule text-ink outline-none focus:border-[#5A35C8] min-h-[40px]"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="pay_text" className="font-medium text-secondary">
                    Pay rate
                  </label>
                  <input
                    id="pay_text"
                    name="pay_text"
                    defaultValue="$25 - $40 / hr"
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-rule text-ink outline-none focus:border-[#5A35C8] min-h-[40px]"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="status" className="font-medium text-secondary">
                    Current stage
                  </label>
                  <select
                    id="status"
                    name="status"
                    defaultValue="applied"
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-rule text-ink outline-none focus:border-[#5A35C8] min-h-[40px] cursor-pointer"
                  >
                    <option value="applied">Profile and CV submitted</option>
                    <option value="assessment_pending">Assessment pending (screening test)</option>
                    <option value="interviewing">Screening and review</option>
                    <option value="accepted">Accepted and onboarding</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label htmlFor="platform_url" className="font-medium text-secondary">
                    Platform portal or job listing link
                  </label>
                  <input
                    id="platform_url"
                    name="platform_url"
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-rule text-ink outline-none focus:border-[#5A35C8] min-h-[40px]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label htmlFor="notes" className="font-medium text-secondary">
                    Notes or progress log
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    placeholder="e.g. Completed initial quiz, awaiting test invitation link"
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-rule text-ink outline-none focus:border-[#5A35C8]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#5A35C8] hover:bg-[#4828AC] text-white text-xs font-semibold transition-all cursor-pointer min-h-[38px]"
                >
                  Save application
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingApp(false)}
                  className="px-4 py-2 rounded-lg border border-rule hover:bg-surface text-secondary text-xs font-medium cursor-pointer min-h-[38px]"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { id: "all", label: `All (${applications.length})` },
              { id: "assessment_pending", label: "Assessment pending" },
              { id: "accepted", label: "Accepted" },
              { id: "interviewing", label: "In review" },
              { id: "applied", label: "Submitted" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setAppFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  appFilter === f.id
                    ? "bg-[#5A35C8] text-white border-[#5A35C8] shadow-xs"
                    : "bg-sheet border-rule text-secondary hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Applications List with Visual Progress Pipeline */}
          {filteredApplications.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredApplications.map((app) => {
                const badge = getStatusBadge(app.status);
                const currentStep = badge.stepIndex;

                return (
                  <div
                    key={app.id}
                    className="p-5 sm:p-6 rounded-2xl bg-sheet border border-rule hover:border-ink/20 transition-all space-y-4 shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-base text-ink">
                            {app.job_title.replace(/\[SAMPLE\]/g, "").trim()}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${badge.className}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                            <span>{badge.label}</span>
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-secondary">
                          <span className="font-semibold text-ink">
                            {app.platform_name.replace(/\[SAMPLE\]/g, "").trim()}
                          </span>
                          <span>&bull;</span>
                          <span className="text-emerald-700 dark:text-emerald-300 font-mono font-medium">
                            {app.pay_text}
                          </span>
                          <span>&bull;</span>
                          <span className="text-muted">
                            Applied{" "}
                            {new Date(app.applied_at).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Status Selector Dropdown */}
                      <div className="flex items-center gap-2 shrink-0">
                        <select
                          value={app.status}
                          onChange={(e) =>
                            handleStatusChange(app.id, e.target.value as ApplicationStatus)
                          }
                          aria-label="Update application status"
                          className="px-2.5 py-1.5 rounded-lg bg-surface border border-rule text-xs font-medium text-ink focus:border-[#5A35C8] outline-none cursor-pointer"
                        >
                          <option value="applied">Applied (CV sent)</option>
                          <option value="assessment_pending">Assessment pending</option>
                          <option value="interviewing">Screening in progress</option>
                          <option value="accepted">Accepted / active</option>
                          <option value="archived">Archived</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => handleDeleteApplication(app.id)}
                          title="Remove application"
                          className="p-1.5 rounded-lg border border-rule hover:border-red-400 hover:text-red-600 text-secondary transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Visual 4-Step Pipeline Bar */}
                    <div className="pt-2 pb-1">
                      <div className="grid grid-cols-4 gap-2 text-center">
                        {pipelineSteps.map((step, idx) => {
                          const isComplete = currentStep > idx;
                          const isCurrent = currentStep === idx;

                          return (
                            <div key={step.key} className="space-y-1.5">
                              {/* Step indicator bar */}
                              <div
                                className={`h-1.5 rounded-full transition-all ${
                                  isComplete
                                    ? "bg-emerald-500"
                                    : isCurrent
                                    ? "bg-[#5A35C8] ring-2 ring-[#5A35C8]/30"
                                    : "bg-surface border border-rule"
                                }`}
                              />
                              <span
                                className={`text-[10px] sm:text-[11px] block truncate ${
                                  isComplete
                                    ? "text-emerald-700 dark:text-emerald-300 font-semibold"
                                    : isCurrent
                                    ? "text-ink font-bold"
                                    : "text-secondary"
                                }`}
                              >
                                {step.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Notes & Progress detail */}
                    {app.notes && (
                      <div className="p-3 rounded-xl bg-surface/70 border border-subtle text-xs text-secondary space-y-1">
                        <span className="text-[11px] font-semibold text-ink block">Application notes:</span>
                        <p className="m-0 leading-relaxed">{app.notes}</p>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="pt-2 border-t border-subtle flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <a
                          href={app.platform_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-[#5A35C8] hover:underline"
                        >
                          <span>Open platform portal</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>

                      <span className="text-[11px] text-muted">
                        Updated{" "}
                        {new Date(app.last_updated_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-10 rounded-2xl bg-sheet border border-rule text-center space-y-3">
              <span className="text-3xl">💼</span>
              <p className="text-sm font-semibold text-ink m-0">
                No applications matching this filter
              </p>
              <p className="text-xs text-secondary max-w-sm mx-auto m-0">
                You can log applications you have submitted to keep track of test deadlines and onboarding progress.
              </p>
              <button
                type="button"
                onClick={() => setIsAddingApp(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#5A35C8] text-white text-xs font-semibold cursor-pointer"
              >
                <Plus size={14} />
                <span>Log an application</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 2: TEST SCORES & BENCHMARKS
          ========================================================================= */}
      {activeTab === "scores" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-sheet border border-rule space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                  <Award size={13} />
                  <span>Frontier qualification index</span>
                </div>
                <h2 className="text-lg font-bold text-ink m-0">
                  Your evaluation test scores
                </h2>
                <p className="text-xs text-secondary leading-relaxed m-0">
                  Scored against frontier lab screening criteria (TestGorilla, arithmetic precision, and rubric rigor).
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-3xl font-extrabold font-mono text-emerald-800 dark:text-emerald-300">
                  {avgScore}%
                </span>
                <span className="text-[11px] text-secondary block">Average score</span>
              </div>
            </div>

            {/* Visual meter */}
            <div className="w-full bg-surface rounded-full h-2.5 overflow-hidden border border-rule">
              <div
                className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${avgScore}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-muted">
              <span>Bench status: Ready for tier 1 platforms</span>
              <span>{passedScoresCount} of {testScores.length} passed</span>
            </div>
          </div>

          {/* Test Scores List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testScores.map((score) => (
              <div
                key={score.id}
                className="p-5 rounded-2xl bg-sheet border border-rule hover:border-emerald-500/40 transition-all flex flex-col justify-between gap-4 shadow-xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-surface border border-rule text-secondary">
                      {score.category}
                    </span>
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                      {score.score}% score
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-ink m-0">
                    {score.title}
                  </h3>

                  <p className="text-xs text-secondary m-0">
                    Target: <strong className="text-ink">{score.platform_target}</strong>
                  </p>
                </div>

                <div className="pt-3 border-t border-subtle flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-secondary text-[11px]">
                    <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                    <span>{score.accuracy}</span>
                  </div>

                  <Link
                    href="/training?tab=simulator"
                    className="font-bold text-[#5A35C8] hover:underline inline-flex items-center gap-1 min-h-[32px]"
                  >
                    <span>Retake drill</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: RESUMES & CVS
          ========================================================================= */}
      {activeTab === "cvs" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-sheet border border-rule flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#5A35C8]/10 text-[#5A35C8] dark:text-[#a78bfa] border border-[#5A35C8]/30 text-xs font-semibold">
                <FileText size={13} />
                <span>Single-page ATS resumes</span>
              </div>
              <h2 className="text-lg font-bold text-ink m-0">
                Your evaluator resumes and CVs
              </h2>
              <p className="text-xs text-secondary leading-relaxed m-0">
                Formatted for automated scanning software and human recruiter screening.
              </p>
            </div>

            <Link
              href="/cv-builder"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#5A35C8] hover:bg-[#4828AC] text-white text-xs font-semibold transition-all shrink-0 cursor-pointer min-h-[40px]"
            >
              <Plus size={14} />
              <span>Build new CV</span>
            </Link>
          </div>

          {/* CVs Cards List */}
          <div className="grid grid-cols-1 gap-4">
            {userCvs.map((cv) => {
              const isExpanded = expandedCvId === cv.id;
              return (
                <div
                  key={cv.id}
                  className="p-5 sm:p-6 rounded-2xl bg-sheet border border-rule hover:border-ink/20 transition-all space-y-4 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-bold text-base text-ink">
                          {cv.title}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 font-mono">
                          <span>{cv.ats_score}% ATS match</span>
                        </span>
                      </div>
                      <p className="text-xs text-secondary m-0">
                        Target: <strong className="text-ink">{cv.target_role}</strong> &bull; Format:{" "}
                        <span className="font-mono text-muted">{cv.density} layout (PDF)</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <Link
                        href="/cv-builder"
                        className="px-3 py-1.5 rounded-lg border border-rule hover:border-[#5A35C8] text-secondary hover:text-ink text-xs font-medium transition-colors flex items-center gap-1.5 min-h-[36px]"
                      >
                        <Edit size={13} />
                        <span>Edit</span>
                      </Link>

                      <Link
                        href="/cv-builder"
                        className="px-3 py-1.5 rounded-lg bg-[#5A35C8] hover:bg-[#4828AC] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 min-h-[36px]"
                      >
                        <Download size={13} />
                        <span>Download</span>
                      </Link>
                    </div>
                  </div>

                  <p className="text-xs text-secondary leading-relaxed m-0 bg-surface/50 p-3 rounded-xl border border-subtle">
                    {cv.summary_snippet}
                  </p>

                  <div className="pt-2 border-t border-subtle flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => setExpandedCvId(isExpanded ? null : cv.id)}
                      className="text-secondary hover:text-ink font-medium inline-flex items-center gap-1 cursor-pointer min-h-[32px]"
                    >
                      <span>{isExpanded ? "Hide ATS details" : "Preview ATS details"}</span>
                      {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>

                    <span className="text-[11px] text-muted">
                      Updated{" "}
                      {new Date(cv.last_updated_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="p-4 rounded-xl bg-surface border border-rule text-xs space-y-3 animate-in fade-in">
                      <div className="space-y-1">
                        <span className="font-bold text-ink block">Verified skills:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {["RLHF Rubrics", "Truthfulness Verification", "Python Testing", "Negative Constraints", "Deel Invoicing", "NDPA 2023"].map((s) => (
                            <span key={s} className="px-2 py-0.5 rounded-md bg-sheet border border-rule text-[11px] text-secondary">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-[11px] text-secondary flex items-center justify-between pt-2 border-t border-subtle">
                        <span>File: <code className="font-mono text-ink">{cv.filename}</code></span>
                        <Link href="/cv-builder" className="text-[#5A35C8] font-bold hover:underline">
                          Open in full editor &rarr;
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: INTERACTIVE PRACTICE DRILLS
          ========================================================================= */}
      {activeTab === "drills" && (
        <div className="space-y-6">
          {/* Interactive Live Challenge Widget */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#5A35C8]/15 via-sheet to-sheet border border-[#5A35C8]/30 space-y-4 shadow-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5A35C8]/20 text-[#8B5CF6] text-xs font-semibold border border-[#5A35C8]/40">
                <Sparkles size={13} />
                <span>Quick drill challenge</span>
              </span>
              <span className="text-[11px] text-secondary font-mono">30-second benchmark</span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-ink m-0">
                Prompt: &quot;Summarize the water cycle in exactly 2 bullet points. Do not mention clouds.&quot;
              </h3>
              <p className="text-xs text-secondary m-0">
                Which model response follows all instructions and negative constraints?
              </p>
            </div>

            <div className="space-y-2 text-xs">
              {[
                {
                  id: 0,
                  text: "Response A: \n• Water evaporates from oceans into vapor.\n• Water condenses to form rain and returns to rivers.",
                  isCorrect: true,
                  feedback: "Correct! Exactly 2 bullet points and zero mention of clouds.",
                },
                {
                  id: 1,
                  text: "Response B: \n• Evaporation lifts moisture high into the atmosphere.\n• Clouds cool down and precipitate as rain.\n• Runoff returns water to bodies.",
                  isCorrect: false,
                  feedback: "Fails two constraints: 3 bullet points (instead of 2) and explicitly mentions clouds.",
                },
                {
                  id: 2,
                  text: "Response C: \nWater evaporates from bodies of water into the sky. It then cools into moisture and falls back as rain.",
                  isCorrect: false,
                  feedback: "Fails format constraint: written as paragraph instead of bullet points.",
                },
              ].map((opt) => {
                const isSelected = drillAnswer === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setDrillAnswer(opt.id);
                      setDrillSubmitted(true);
                    }}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer whitespace-pre-line leading-relaxed ${
                      isSelected && opt.isCorrect
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-800 dark:text-emerald-300"
                        : isSelected && !opt.isCorrect
                        ? "bg-red-500/10 border-red-500 text-red-700 dark:text-red-300"
                        : "bg-surface hover:bg-sheet border-rule text-ink"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium">{opt.text}</span>
                      {isSelected && (
                        <span className="text-sm shrink-0">
                          {opt.isCorrect ? "✅" : "❌"}
                        </span>
                      )}
                    </div>
                    {isSelected && drillSubmitted && (
                      <p className="mt-2 text-[11px] font-semibold pt-1.5 border-t border-current/20 m-0">
                        {opt.feedback}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Drill Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                id: "arithmetic",
                title: "Math & chain-of-thought slip detection",
                platform: "Alignerr & Outlier",
                time: "3 to 5 mins",
                badge: "High frequency",
                emoji: "🧮",
                desc: "Spot intermediate arithmetic errors in multi-step word problems where the final answer looks confident but fails basic math.",
              },
              {
                id: "legal-citation",
                title: "Legal citation & statutory hallucination",
                platform: "DataAnnotation & Mercor",
                time: "4 to 6 mins",
                badge: "Critical flaw",
                emoji: "⚖️",
                desc: "Detect invented statutory section numbers, fictional court precedents, and hallucinated regulatory clauses.",
              },
              {
                id: "non-sycophantic",
                title: "Pairwise justification & non-sycophancy",
                platform: "Alignerr & Mercor",
                time: "4 to 5 mins",
                badge: "Scored strictly",
                emoji: "📝",
                desc: "Write objective, non-sycophantic critique explaining why Model B fails without flattering Model A.",
              },
              {
                id: "testgorilla",
                title: "TestGorilla 5-minute screening drill",
                platform: "Alignerr onboarding",
                time: "5 mins",
                badge: "Timed test",
                emoji: "⏱️",
                desc: "Rapid-fire instruction following and constraint tracking under a real 5-minute countdown clock.",
              },
              {
                id: "negative-constraint",
                title: "Instruction following & negative constraints",
                platform: "Outlier & DataAnnotation",
                time: "3 to 4 mins",
                badge: "Common fail",
                emoji: "🎯",
                desc: 'Catch subtle negative instruction violations like "do not mention dates" or "under 120 words".',
              },
              {
                id: "ambiguity",
                title: "Prompt ambiguity & clarification",
                platform: "General RLHF",
                time: "3 to 5 mins",
                badge: "Core skill",
                emoji: "🔍",
                desc: "Evaluate when a model should clarify ambiguous requests vs. making unverified assumptions.",
              },
            ].map((drill) => (
              <div
                key={drill.id}
                className="p-5 rounded-2xl bg-sheet border border-rule hover:border-[#5A35C8]/40 transition-all flex flex-col justify-between gap-4 shadow-xs"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xl" aria-hidden="true">{drill.emoji}</span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-surface border border-rule text-secondary">
                      {drill.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-ink m-0">
                    {drill.title}
                  </h3>
                  <p className="text-xs text-secondary leading-relaxed m-0">
                    {drill.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-subtle flex items-center justify-between text-xs">
                  <span className="text-[11px] text-muted">
                    {drill.platform} &bull; {drill.time}
                  </span>
                  <Link
                    href={`/training?tab=simulator`}
                    className="font-bold text-[#5A35C8] hover:underline inline-flex items-center gap-1 min-h-[36px]"
                  >
                    <span>Practice now</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: SAVED ROLES
          ========================================================================= */}
      {activeTab === "saved" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-secondary">
              Bookmarked roles
            </h2>
            <Link
              href="/jobs"
              className="text-xs text-[#5A35C8] hover:underline font-medium"
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
              <div className="w-14 h-14 rounded-xl bg-surface text-[#5A35C8] mx-auto flex items-center justify-center border border-rule">
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#5A35C8] text-white hover:bg-[#4828AC] transition-all min-h-[44px]"
                >
                  <span>Browse roles</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 6: PAYOUTS & EARNINGS
          ========================================================================= */}
      {activeTab === "payouts" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-sheet border border-rule space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                  <DollarSign size={13} />
                  <span>Verified contractor payout log</span>
                </div>
                <h2 className="text-lg font-bold text-ink m-0">
                  Estimated earnings &amp; payouts
                </h2>
                <p className="text-xs text-secondary leading-relaxed m-0">
                  Track hours worked across platforms, gross USD earnings, and estimated local net pay.
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-ink">
                  {currency === "USD"
                    ? `$${totalGrossUsd.toLocaleString()} USD`
                    : `₦${totalNetNgnApprox.toLocaleString()} NGN`}
                </span>
                <span className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold block">
                  {currency === "USD" ? `≈ ₦${totalNetNgnApprox.toLocaleString()} NGN` : `≈ $${totalGrossUsd.toLocaleString()} USD`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-surface border border-rule space-y-0.5">
                <span className="text-[11px] text-secondary">Hours logged</span>
                <span className="text-lg font-bold font-mono text-ink block">{totalHoursLogged} hrs</span>
              </div>
              <div className="p-3 rounded-xl bg-surface border border-rule space-y-0.5">
                <span className="text-[11px] text-secondary">Average rate</span>
                <span className="text-lg font-bold font-mono text-ink block">
                  ${totalHoursLogged > 0 ? Math.round(totalGrossUsd / totalHoursLogged) : 0} / hr
                </span>
              </div>
              <div className="p-3 rounded-xl bg-surface border border-rule space-y-0.5 col-span-2 sm:col-span-1">
                <span className="text-[11px] text-secondary">Exchange rate benchmark</span>
                <span className="text-lg font-bold font-mono text-ink block">1 USD = ₦1,500 NGN</span>
              </div>
            </div>
          </div>

          {/* Payout Records Table */}
          <div className="p-5 sm:p-6 rounded-2xl bg-sheet border border-rule space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-ink m-0">
              Recent platform payout batches
            </h3>

            <div className="divide-y divide-subtle">
              {userPayouts.map((pay) => (
                <div key={pay.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-ink">{pay.platform_name}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                          pay.status === "paid"
                            ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30"
                            : pay.status === "processing"
                            ? "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30"
                            : "bg-surface text-secondary border-rule"
                        }`}
                      >
                        {pay.status === "paid" ? "Paid" : pay.status === "processing" ? "Processing" : "Logged"}
                      </span>
                    </div>
                    <span className="text-[11px] text-muted">
                      {pay.period} &bull; {pay.hours_logged} hrs @ ${pay.rate_usd}/hr
                    </span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="font-mono font-bold text-ink block">
                      ${pay.gross_usd.toLocaleString()} USD
                    </span>
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-mono">
                      {pay.net_local_currency}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-subtle flex flex-wrap items-center justify-between gap-3 text-xs">
              <Link
                href="/payout-calculator"
                className="font-semibold text-[#5A35C8] hover:underline inline-flex items-center gap-1"
              >
                <span>Launch take-home pay calculator</span>
                <span>&rarr;</span>
              </Link>
              <Link
                href="/compare"
                className="text-secondary hover:text-ink font-medium"
              >
                Compare platform payment terms
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 7: EMAIL NEWSLETTER & OPPORTUNITY ALERTS HUB
          ========================================================================= */}
      {activeTab === "alerts" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-sheet border border-rule space-y-6 shadow-xs">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#5A35C8]/10 text-[#5A35C8] dark:text-[#a78bfa] border border-[#5A35C8]/30 text-xs font-semibold">
                <Mail size={13} />
                <span>Inbox dispatch &amp; newsletter preferences</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-ink m-0">
                Email newsletter &amp; opportunity alerts
              </h2>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed m-0">
                Choose whether you receive newsletters on a weekly or daily basis, and select which verified opportunity updates get sent directly to your inbox.
              </p>
            </div>

            <form onSubmit={handlePreferencesSubmit} className="space-y-6">
              {/* 1. Cadence Selector */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-ink">
                  1. Delivery cadence (how often we email you)
                </label>
                <input type="hidden" name="frequency" value={frequency} />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: "weekly",
                      title: "Weekly newsletter digest",
                      badge: "Recommended",
                      desc: "Curated summary sent every Monday morning featuring all verified roles, pay trends, and platform advisories.",
                      emoji: "📬",
                    },
                    {
                      id: "daily",
                      title: "Daily opportunity alerts",
                      badge: "High frequency",
                      desc: "Emailed within hours whenever a new human-verified role matches your location and skill domains.",
                      emoji: "⚡",
                    },
                    {
                      id: "instant",
                      title: "Instant breaking alerts",
                      badge: "Fastest",
                      desc: "Immediate notice as soon as any high-priority verified listing opens up for your country.",
                      emoji: "🔔",
                    },
                  ].map((f) => {
                    const isSelected = frequency === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFrequency(f.id)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-2 ${
                          isSelected
                            ? "bg-[#5A35C8]/10 border-[#5A35C8] ring-1 ring-[#5A35C8]"
                            : "bg-surface border-rule hover:border-[#5A35C8]/40"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="text-xl" aria-hidden="true">{f.emoji}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sheet border border-rule text-secondary">
                            {f.badge}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-ink block">{f.title}</span>
                          <p className="text-[11px] text-secondary leading-relaxed mt-1 m-0">
                            {f.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. What we email directly to your inbox */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-ink">
                  2. What we email directly to your inbox
                </label>
                <p className="text-xs text-secondary m-0">
                  Select which updates you want delivered to <strong className="text-ink font-mono">{user.email}</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    {
                      id: "opportunities",
                      label: "Verified AI job opportunities",
                      desc: "New evaluator listings filtered for your country with confirmed pay rates and direct portal links.",
                      emoji: "💼",
                    },
                    {
                      id: "newsletter",
                      label: "Weekly intelligence newsletter",
                      desc: "Pay index, currency benchmarks, and platform payout terms.",
                      emoji: "📰",
                    },
                    {
                      id: "scam_alerts",
                      label: "Scam warnings & platform advisories",
                      desc: "Urgent alerts when fraudulent recruiters appear or when platforms experience payout delays.",
                      emoji: "🚨",
                    },
                    {
                      id: "drills",
                      label: "Screening test drills & CV guides",
                      desc: "Invitations to new TestGorilla practice drills, prompt constraint guides, and ATS CV formats.",
                      emoji: "🧪",
                    },
                  ].map((cat) => {
                    const isChecked = selectedCategories.includes(cat.id);
                    return (
                      <label
                        key={cat.id}
                        className={`p-3.5 sm:p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                          isChecked
                            ? "bg-surface border-[#5A35C8]/60 shadow-xs"
                            : "bg-surface/50 border-rule opacity-75 hover:opacity-100"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="categories"
                          value={cat.id}
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategories([...selectedCategories, cat.id]);
                            } else {
                              setSelectedCategories(selectedCategories.filter((c) => c !== cat.id));
                            }
                          }}
                          className="mt-0.5 rounded border-rule text-[#5A35C8] focus:ring-[#5A35C8] cursor-pointer"
                        />
                        <div className="space-y-1">
                          <span className="font-bold text-ink flex items-center gap-1.5">
                            <span>{cat.emoji}</span>
                            <span>{cat.label}</span>
                          </span>
                          <p className="text-[11px] text-secondary leading-relaxed m-0">
                            {cat.desc}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 3. Location and Role Domains */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-subtle">
                <div className="space-y-1.5">
                  <label htmlFor="country_code" className="block text-xs font-bold text-ink">
                    Where do you work from?
                  </label>
                  <p className="text-[11px] text-secondary m-0">
                    We filter out opportunities that do not hire from your location.
                  </p>
                  <select
                    id="country_code"
                    name="country_code"
                    defaultValue={initialAlerts?.country_code || user.country_code || "NG"}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-surface border border-rule focus:border-[#5A35C8] text-ink text-xs sm:text-sm outline-none transition-all cursor-pointer min-h-[44px]"
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

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-ink">
                    Skill and role domains
                  </label>
                  <p className="text-[11px] text-secondary m-0">
                    Receive opportunities matching these specialties.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
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
                          className="p-2 rounded-lg bg-surface border border-rule hover:border-[#5A35C8]/40 flex items-center gap-2 cursor-pointer transition-all"
                        >
                          <input
                            type="checkbox"
                            name="work_types"
                            value={wt}
                            defaultChecked={isChecked}
                            className="rounded border-rule text-[#5A35C8] focus:ring-[#5A35C8] cursor-pointer"
                          />
                          <span className="text-ink text-[11px] font-medium truncate">{wt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-subtle flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#5A35C8] text-white hover:bg-[#4828AC] transition-all cursor-pointer shadow-xs min-h-[44px]"
                  >
                    <span>Save email preferences</span>
                  </button>

                  {saveStatus === "saved" && (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-semibold animate-in fade-in">
                      <CheckCircle2 size={16} />
                      <span>Preferences saved</span>
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setShowEmailPreview(!showEmailPreview)}
                  className="px-3.5 py-2 rounded-xl border border-rule hover:border-[#5A35C8] bg-surface text-secondary hover:text-ink text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer min-h-[40px]"
                >
                  <Inbox size={14} className="text-[#8B5CF6]" />
                  <span>{showEmailPreview ? "Hide email preview" : "Preview next email edition"}</span>
                  {showEmailPreview ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>
              </div>
            </form>
          </div>

          {/* 4. Interactive Live Email Preview Mockup */}
          {showEmailPreview && (
            <div className="p-5 sm:p-7 rounded-2xl bg-sheet border border-[#5A35C8]/40 space-y-4 animate-in fade-in shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rule pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#5A35C8]/10 text-[#5A35C8] flex items-center justify-center">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-ink block">
                      Live inbox preview
                    </span>
                    <span className="text-[11px] text-secondary">
                      Simulated dispatch for {user.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="inline-flex p-0.5 rounded-lg bg-surface border border-rule text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => setEmailPreviewMode("weekly")}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        emailPreviewMode === "weekly"
                          ? "bg-sheet text-ink font-bold shadow-xs"
                          : "text-secondary hover:text-ink"
                      }`}
                    >
                      Weekly digest
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmailPreviewMode("daily")}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        emailPreviewMode === "daily"
                          ? "bg-sheet text-ink font-bold shadow-xs"
                          : "text-secondary hover:text-ink"
                      }`}
                    >
                      Daily opportunity
                    </button>
                  </div>
                </div>
              </div>

              {/* Mock Email Message Header */}
              <div className="p-4 rounded-xl bg-surface border border-rule text-xs space-y-1.5 font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-secondary w-16 shrink-0">From:</span>
                  <span className="text-ink font-semibold">TraceBase Alerts &lt;alerts@tracebase.ai&gt;</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-secondary w-16 shrink-0">To:</span>
                  <span className="text-ink">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-secondary w-16 shrink-0">Subject:</span>
                  <span className="text-ink font-bold">
                    {emailPreviewMode === "daily"
                      ? `[TraceBase Alert] New verified role: Multimodal Evaluator ($35 to $60 / hr)`
                      : `TraceBase Weekly Digest #12: 4 verified roles fresh for Nigeria`}
                  </span>
                </div>
              </div>

              {/* Mock Email Body */}
              <div className="p-5 sm:p-6 rounded-xl bg-surface/50 border border-rule space-y-4 text-xs leading-relaxed text-secondary">
                <div className="flex items-center justify-between border-b border-rule pb-2">
                  <span className="font-bold text-ink text-sm">TraceBase Work Hub</span>
                  <span className="text-[10px] text-muted font-mono">Sent via Sovereign Dispatch</span>
                </div>

                <p className="m-0 text-ink">
                  Hello evaluator, here are your latest verified opportunities checked by our human review team in the last 24 hours:
                </p>

                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-lg bg-sheet border border-rule space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-ink">Outlier AI &bull; AI Generalist Evaluator</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">$25 to $40 / hr</span>
                    </div>
                    <p className="text-[11px] m-0 text-secondary">
                      Confirmed hiring from Nigeria, US, UK, and Kenya. 1-page ATS resume required. TestGorilla assessment.
                    </p>
                    <span className="text-[10px] text-[#5A35C8] font-semibold block pt-1">
                      Direct apply link: https://tracebase.ai/jobs/outlier-ai-generalist-evaluator
                    </span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-sheet border border-rule space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-ink">Alignerr &bull; Code &amp; Logic Specialist</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">$35 to $60 / hr</span>
                    </div>
                    <p className="text-[11px] m-0 text-secondary">
                      Verified payout via Deel in USD or local bank transfer. 14-day recheck passed.
                    </p>
                    <span className="text-[10px] text-[#5A35C8] font-semibold block pt-1">
                      Direct apply link: https://tracebase.ai/jobs/alignerr-code-specialist
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-[11px] space-y-0.5">
                  <span className="font-bold block">Scam radar note:</span>
                  <p className="m-0">
                    TraceBase never charges fees, and real platforms never request recruitment payments on Telegram or WhatsApp.
                  </p>
                </div>

                <div className="pt-2 text-[10px] text-muted border-t border-subtle flex flex-wrap items-center justify-between gap-2">
                  <span>Protected under NDPA 2023. Double opt-in active.</span>
                  <span className="text-secondary underline">Unsubscribe in 1 click</span>
                </div>
              </div>

              {/* Test Dispatch Button */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-secondary">
                  Ready to test? Send a live sample email to your address.
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setTestEmailSent(true);
                    setTimeout(() => setTestEmailSent(false), 4000);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#5A35C8] hover:bg-[#4828AC] text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer min-h-[36px]"
                >
                  <Send size={12} />
                  <span>{testEmailSent ? "Sample email sent!" : "Send test email to my inbox"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 8: NDPA 2023 & DATA RIGHTS & ONE-CLICK DELETION
          ========================================================================= */}
      {activeTab === "privacy" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-7 rounded-xl bg-sheet border border-rule space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-[#5A35C8]" size={20} />
              <h2 className="text-base font-semibold text-ink">
                Your rights under NDPA 2023
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed">
              The Nigeria Data Protection Act (NDPA) 2023 guarantees you full ownership over your personal data. TraceBase adheres to strict data minimization: we do not collect National Identification Numbers, bank credentials, biometric scans, or browser keystrokes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <Link
                href="/privacy/request"
                className="p-3.5 rounded-lg bg-surface border border-rule hover:border-[#5A35C8]/40 flex items-center justify-between text-secondary hover:text-ink transition-all font-medium min-h-[44px]"
              >
                <span>Submit statutory subject access request (SAR)</span>
                <ExternalLink size={13} className="text-[#5A35C8]" />
              </Link>
              <Link
                href="/privacy"
                className="p-3.5 rounded-lg bg-surface border border-rule hover:border-[#5A35C8]/40 flex items-center justify-between text-secondary hover:text-ink transition-all font-medium min-h-[44px]"
              >
                <span>View NDPA processing record (ROPA)</span>
                <ExternalLink size={13} className="text-[#5A35C8]" />
              </Link>
            </div>
          </div>

          {/* Destructive One-Click Deletion */}
          <div className="p-6 sm:p-7 rounded-xl bg-sheet border border-red-200 dark:border-red-900/40 text-xs space-y-4">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-semibold text-base">
              <Trash2 size={20} />
              <span>One-click complete account deletion</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Clicking the button below will immediately and permanently erase your account profile, all <span className="tabular-nums">{savedJobs.length}</span> saved jobs, your alert subscriptions, applications, test scores, CVs, and session tokens. In compliance with NDPA Section 38, your consent withdrawal will be recorded as a cryptographic hash in our append-only log with zero plaintext data retained.
            </p>

            {!confirmDelete ? (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="px-4 py-2.5 rounded-lg text-xs font-semibold bg-red-600 text-white hover:bg-red-700 transition-all cursor-pointer min-h-[44px]"
              >
                Delete my account and personal data
              </button>
            ) : (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 space-y-3">
                <div className="flex items-center gap-2 text-xs text-red-700 dark:text-red-300 font-semibold">
                  <AlertTriangle size={16} />
                  <span>Are you absolutely certain? This cannot be undone.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-red-600 text-white hover:bg-red-700 transition-all cursor-pointer disabled:opacity-50 min-h-[40px]"
                  >
                    {isDeleting ? "Purging all data..." : "Yes, permanently erase all my data"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    disabled={isDeleting}
                    className="px-4 py-2 rounded-lg text-xs font-medium bg-surface border border-rule text-secondary hover:text-ink transition-all cursor-pointer min-h-[40px]"
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
