# Countersign Security Threat Model (v1)

**Product:** Countersign (Dual-Sided AI Model Evaluation Studio & Human-Verified AI Work Hub)  
**Author:** Security & Engineering  
**Version:** 1.0 (Milestone 3, Oct 2026)  
**Applicability:** Public website forms, `/go/[id]` redirector, admin authentication, enterprise lead data, and NDPA 2023 compliance.

---

## 1. System Overview & Asset Classification

Countersign operates on a strict principle of least-privilege data collection:

| Asset Tier | Data Description | Confidentiality | Integrity | Availability |
|---|---|---|---|---|
| **Tier 1: Public Open Data** | Verified job postings, platform profiles, guidelines, public verification check events | Public | High (Must not be tampered with) | High |
| **Tier 2: Contributor & Candidate Data** | Newsletter emails, country preferences, problem reports, alert subscriptions | High (NDPA Protected) | High | Medium |
| **Tier 3: Enterprise Client Data** | Evaluation audit leads, RAG assistant queries, proprietary reference documents, pilot scopes | Critical (Strict NDA) | Critical | High |
| **Tier 4: Administrative Control** | Admin session tokens, 2FA credentials, audit trail records, database service keys | Critical | Critical | High |

---

## 2. Attack Surface Analysis

### 2.1 Public Forms (Newsletter, Report a Problem, Evaluation Scope)
- **Threat:** Automated bot spam, distributed denial of service (DDoS), SQL/NoSQL injection, stored cross-site scripting (XSS), defamation submissions.
- **Defenses:**
  - Mandatory server-side schema validation via **Zod** on all inputs.
  - Multi-tier bot defense: Hidden CSS honeypot fields (`website_hp`) combined with zero-friction arithmetic verification challenges.
  - Rate limiting enforced on all public submission endpoints.
  - **Defamation Safeguard:** Submitted scam reports are marked `pending` in an isolated moderation queue. The system never publishes automated accusatory blacklists or unverified personal data.

### 2.2 Outbound Apply Link Redirector (`/go/[id]`)
- **Threat:** Open redirect vulnerabilities, phishers hijacking redirect IDs to disguise malicious links, referral tampering, user fingerprinting.
- **Defenses:**
  - The redirect target is strictly derived from the verified database record (`jobs.apply_url`). User-supplied arbitrary query redirects (e.g. `/go?url=http://evil.com`) are rejected.
  - Outbound link logging is strictly anonymous: records only `job_id`, `link_type`, `date`, and client country chip code. No IP addresses, user agents, or tracking cookies are ever retained.
  - Framework safety: HTTP 302 redirects are executed outside try/catch blocks to prevent Next.js navigation interception.

### 2.3 Admin Console & Authentication
- **Threat:** Credential stuffing, brute force, session hijacking, privilege escalation.
- **Defenses:**
  - **Passwordless Authentication:** Admins authenticate via time-sensitive cryptographic email magic links paired with a mandatory Time-Based One-Time Password (**2FA / TOTP**).
  - Admin endpoints are marked `noindex` and prohibited in `robots.txt`.
  - Service role database keys reside exclusively in secure server environments (`process.env.SUPABASE_SERVICE_ROLE_KEY`) and are never exposed to browser bundles.
  - Every administrative action (status update, job edit, platform review) writes an immutable record to `audit_log`.

### 2.4 Enterprise Evaluation Lead Handling
- **Threat:** Accidental disclosure of enterprise client documents, leaks of pre-release AI model outputs, cross-tenant data leakage.
- **Defenses:**
  - Client queries, ground-truth documents, and audit logs are treated as untrusted and isolated per client reference ID.
  - Client data is never transmitted to third-party public AI APIs without prior written authorization.
  - Input deduplication via cryptographic `idempotency_key` preventing duplicate submissions.

### 2.5 Privacy & Regulatory Requests (NDPA 2023)
- **Threat:** Non-compliance with statutory deletion or access requests; data breaches unnotified within statutory windows.
- **Defenses:**
  - Consent is recorded explicitly with timestamp and policy version in append-only `consent_log`.
  - Privacy requests are logged in `privacy_requests` with a strict 30-day resolution due date.
  - Security incidents or near-misses are tracked in `incident_log` with an automated 72-hour regulatory reporting clock matching NDPC requirements.

---

## 3. OWASP Top 10 (2025/2026 Edition) Matrix

| OWASP Vulnerability | Risk Level | Mitigation in Countersign Architecture |
|---|---|---|
| **A01: Broken Access Control** | High | Row-Level Security (RLS) enabled on all 16 tables. User tables restricted to owner UUID; leads and reports are write-only for public, read-only for admin. |
| **A02: Cryptographic Failures** | Medium | HTTPS enforced with HSTS. Email addresses hashed via SHA-256 for consent verification logs. Environment secrets separated across dev, preview, and prod. |
| **A03: Injection** | High | Parameterized queries exclusively via Supabase/PostgreSQL. Zero dynamic SQL string concatenation. Server-side Zod input sanitation. |
| **A04: Insecure Design** | High | Defamation protection built into schema. 14-day verification expiry sweeper prevents stale/misleading job listings. |
| **A05: Security Misconfiguration** | Medium | Strict Content Security Policy (CSP), X-Content-Type-Options: nosniff, X-Frame-Options: DENY, and Referrer-Policy: strict-origin-when-cross-origin. |
| **A06: Vulnerable Dependencies** | Low | Pinned versions in package-lock.json; zero heavy client-side animation/charting libraries. |
| **A07: Identification Failures** | High | Email magic link + 2FA TOTP for administrative access. Password authentication completely eliminated. |
| **A08: Software & Data Integrity** | Medium | All admin actions logged in immutable audit_log with actor, diff, and timestamp. Nightly cron pings verify external apply link integrity. |
| **A09: Security Logging & Monitoring** | Medium | Tamper-evident check_log and audit_log. Incident log triggers 72h alert countdown. Full email addresses never logged in telemetry. |
| **A10: Server-Side Request Forgery** | Low | Nightly link checker restricts outgoing requests to whitelist of known career portal protocols (HTTPS only, RFC1918 private ranges blocked). |

---

## 4. Operational Security Runbook

1. **Pre-Deployment Check:** Run `npx tsc --noEmit` and `npm run lint`. Validate that zero secret environment variables are prefixed with `NEXT_PUBLIC_`.
2. **Preview Isolation:** Vercel/staging preview deployments must point to isolated staging database instances, never production databases.
3. **Data Breach Protocol:** If an unauthorized data access event is identified, record immediately in `incident_log`. The 72-hour notification countdown commences toward the Nigerian Data Protection Commission (NDPC).
4. **Database Backup & Recovery:** Point-in-time recovery (PITR) enabled on production Postgres. Tested disaster recovery restores executed before onboarding the first paid client.
