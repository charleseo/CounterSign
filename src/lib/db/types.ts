// TypeScript definitions for TraceBase Master Schema (Milestone 3)
// Corresponds directly to PostgreSQL DDL in supabase/migrations/20261014000000_m3_schema.sql

export type JobStatus = 'verified' | 'needs_recheck' | 'closed' | 'unconfirmed';
export type EligStatus = 'accepted' | 'not_accepted' | 'unconfirmed';
export type LinkType = 'direct' | 'referral';
export type ReferralStatus = 'public' | 'invitation_only' | 'not_found' | 'unavailable' | 'confirmed_partner';
export type LabelKind = 'official' | 'reported' | 'unknown';
export type ReportKind = 'job_problem' | 'platform_experience' | 'scam';
export type ReportStatus = 'pending' | 'approved' | 'rejected';
export type LeadStatus = 'new' | 'replied' | 'call_booked' | 'pilot' | 'won' | 'lost';
export type PrivacyRequestKind = 'access' | 'correction' | 'deletion' | 'withdraw_consent' | 'objection';
export type IncidentStatus = 'open' | 'reported' | 'closed';

export interface Platform {
  id: string;
  slug: string;
  name: string;
  official_url: string;
  description: string | null;
  who_it_suits: string | null;
  payout_methods: string | null;
  assessment_style: string | null;
  referral: ReferralStatus;
  referral_terms_url: string | null;
  last_reviewed_at: string | null;
  created_at: string;
}

export interface PlatformStep {
  id: string;
  platform_id: string;
  position: 1 | 2 | 3 | 4 | 5;
  title: string;
  detail: string | null;
  label: LabelKind;
  source_url: string | null;
}

export interface Job {
  id: string;
  slug: string;
  platform_id: string;
  title: string;
  work_type: string;
  domains: string[];
  languages: string[];
  degree_levels: string[];
  summary: string;
  requirements: string | null;
  pay_text: string | null;
  pay_verified: boolean;
  pay_source_url: string | null;
  official_url: string;
  apply_url: string;
  link: LinkType;
  status: JobStatus;
  last_checked_at: string | null;
  next_check_at: string | null;
  closed_at: string | null;
  created_by: string | null;
  created_at: string;
  daysAgo?: number;
  is_sample?: boolean;
  is_managed?: boolean;
}

export interface Country {
  code: string;
  name: string;
  notes: string | null;
}

export interface JobEligibility {
  job_id: string;
  country_code: string;
  status: EligStatus;
  source_url: string | null;
  checked_at: string;
}

export interface CheckLog {
  id: number;
  job_id: string | null;
  platform_id: string | null;
  result: JobStatus;
  note: string;
  checked_by: string | null;
  checked_at: string;
  daysAgo?: number;
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  tags: string[];
  reading_time_mins: number;
  published_at: string | null;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  country_code: string | null;
  interests: string[];
  consent_marketing: boolean;
  consent_at: string | null;
  created_at: string;
}

export interface SavedJob {
  user_id: string;
  job_id: string;
  created_at: string;
}

export interface AlertSubscription {
  id: string;
  email: string;
  user_id: string | null;
  country_code: string | null;
  work_types: string[];
  frequency: string;
  token?: string;
  status?: 'pending' | 'active' | 'unsubscribed';
  confirmed_at: string | null;
  created_at: string;
}

export type AnalyticsEventType =
  | 'home_view'
  | 'country_selected'
  | 'search_used'
  | 'hero_cta_click'
  | 'filter_used'
  | 'sort_changed'
  | 'job_card_click'
  | 'load_more'
  | 'job_view'
  | 'truth_strip_source_click'
  | 'apply_click'
  | 'report_problem_open'
  | 'report_problem_submit'
  | 'platform_view'
  | 'platform_official_click'
  | 'timeline_expand'
  | 'guide_read'
  | 'newsletter_signup'
  | 'alert_signup'
  | 'scam_check_view'
  | 'scam_report_submit'
  | 'studio_view'
  | 'sample_audit_open'
  | 'eval_form_submit'
  | 'lite_mode_toggle'
  | 'outbound_redirect'
  | 'scope_step_completed'
  | 'scope_submit'
  | 'service_page_view'
  | 'comparison_tab_change'
  | 'practice_exercise_submit';

export interface AnalyticsEvent {
  id: string;
  event: AnalyticsEventType | string;
  path?: string;
  properties?: Record<string, unknown>;
  timestamp: string;
}

export interface DigestDraft {
  id: string;
  issueNumber: number;
  weekStarting: string;
  subject: string;
  previewText: string;
  featuredGuide: {
    title: string;
    slug: string;
    summary: string;
  };
  rolesByCountry: Array<{
    country: string;
    flag: string;
    roles: Array<{
      title: string;
      platform: string;
      payText: string;
      slug: string;
    }>;
  }>;
  scamRadarNote?: string;
  markdownContent: string;
  htmlContent: string;
  created_at: string;
}

export interface Report {
  id: string;
  kind: ReportKind;
  target_id: string | null;
  body: string;
  contact_email: string | null;
  status: ReportStatus;
  moderation_notes: string | null;
  created_at: string;
}

export interface WeeklyScamPost {
  id: string;
  slug: string;
  title: string;
  reported_date: string;
  message_paraphrased: string;
  warning_signs: string[];
  what_to_do: string[];
  published: boolean;
  source_report_id?: string | null;
  created_at: string;
}

export interface EvalLead {
  id: string;
  reference_id: string;
  name: string;
  work_email: string;
  company: string | null;
  product_url: string | null;
  service: string | null;
  volume: string | null;
  source_type: string | null;
  timeline: string | null;
  has_rubric: boolean;
  sensitivity: string | null;
  message: string | null;
  status: LeadStatus;
  idempotency_key: string | null;
  created_at: string;
}

export interface AuditLog {
  id: number;
  actor: string | null;
  action: string;
  entity: string;
  entity_id: string | null;
  diff: Record<string, unknown> | null;
  at: string;
  daysAgo?: number;
}

export interface OutboundClick {
  id: number;
  job_id: string | null;
  link: LinkType;
  country_code: string | null;
  clicked_on: string;
}

export interface ConsentLog {
  id: number;
  email_hash: string;
  purpose: 'newsletter' | 'alerts' | 'eval_contact' | 'account';
  policy_version: string;
  given: boolean;
  at: string;
}

export interface PrivacyRequest {
  id: string;
  kind: PrivacyRequestKind;
  contact_email: string;
  country_code?: string | null;
  received_at: string;
  due_at: string;
  closed_at: string | null;
  note: string | null;
}

export interface IncidentLog {
  id: string;
  detected_at: string;
  report_due_at: string;
  summary: string;
  data_categories: string[];
  people_affected_estimate: number | null;
  reported_at: string | null;
  status: IncidentStatus;
}

// Joined views & admin types
export interface JobWithPlatform extends Job {
  platform: Platform;
  eligibility: JobEligibility[];
}

export interface AdminStats {
  totalJobs: number;
  verifiedJobs: number;
  needsRecheckJobs: number;
  closedJobs: number;
  complianceRate: number; // Percentage checked within 14 days
  activeIncidents: number;
  pendingReports: number;
  openPrivacyRequests: number;
  newLeads?: number;
  totalLeads?: number;
  pendingCommunityReports?: number;
  evaluatorApplications?: number;
  maxLiveRoles?: number;
  activeJobs?: number;
  recheckCapacityWarning?: boolean;
}

// Milestone 11: Phase 1 Feature Types

export interface MagicLinkToken {
  token: string;
  email: string;
  expires_at: string;
  created_at: string;
}

export interface UserSession {
  token: string;
  userId: string;
  email: string;
  expiresAt: string;
}

export type TaskAvailability = 'regular' | 'intermittent' | 'empty_queue';

export interface CommunityExperienceReport {
  id: string;
  platform_id: string;
  period_month_year: string;
  onboarding_paid: boolean;
  tasks_available: TaskAvailability;
  removed_without_explanation: boolean;
  optional_note: string | null;
  contact_email: string | null;
  status: ReportStatus;
  moderation_notes: string | null;
  created_at: string;
}

export interface AggregatedPlatformExperience {
  platform_id: string;
  sample_size: number;
  has_sufficient_reports: boolean;
  onboarding_paid_percent: number;
  tasks_regular_percent: number;
  tasks_intermittent_percent: number;
  tasks_empty_queue_percent: number;
  removed_without_explanation_percent: number;
  onboarding_paid_count: number;
  tasks_regular_count: number;
  tasks_intermittent_count: number;
  tasks_empty_queue_count: number;
  removed_without_explanation_count: number;
  earliest_period: string | null;
  latest_period: string | null;
}

export interface EvaluatorLead {
  id: string;
  name: string;
  email: string;
  country_code: string;
  domain: string;
  credentials: string;
  years_experience: string;
  portfolio_url: string | null;
  weekly_hours: string;
  status: 'new' | 'reviewed' | 'contacted' | 'archived';
  created_at: string;
}

export interface PlatformCountryEligibilityResult {
  platform: Platform;
  country: Country;
  eligibilityStatus: EligStatus;
  checkedAt: string;
  sourceUrl: string | null;
  openRoles: JobWithPlatform[];
  alternativePlatforms: Array<{
    platform: Platform;
    openRolesCount: number;
  }>;
  steps: PlatformStep[];
}
