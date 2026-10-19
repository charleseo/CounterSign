# TraceBase: Record of Processing Activities (ROPA)
## In Compliance with Section 38 of the Nigeria Data Protection Act (NDPA) 2023

**Data Controller:** TraceBase (`tracebase.work` / `tracebase.ai` / `tracebase.ng`)  
**Lead & DPO:** Jo (Ebube Okeke), Founder & Lead Evaluator  
**Contact:** `privacy@tracebase.work` | Lagos, Nigeria  
**Version:** 1.0 (Audited 15 October 2026)

---

### 1. Categories of Data Subjects
1. **Job Seekers & Community Contributors:** Visitors exploring remote AI evaluation roles, subscribing to weekly verified role digests, reporting suspicious listings, or submitting community feedback.
2. **Enterprise Evaluation Prospects:** Startup founders, engineering managers, and AI leads requesting technical documentation citation audits or RAG benchmark evaluations.
3. **Platform Representatives:** Platform managers, recruiters, or company representatives submitting listing updates or corrections.

---

### 2. Categories of Personal Data Collected
- **Newsletter Subscribers:** Email address, optional country code selection, optional work interests.
- **Consent Ledger (`consent_log`):** Cryptographic SHA-256 hash of the subscriber's email address (never plain text), timestamp, purpose (`newsletter`, `eval_contact`), and policy version (`v1.0.0`).
- **Evaluation Studio Leads (`eval_leads`):** Work email, representative name, company name, product documentation URL, service requested, project scope details.
- **Community Problem & Scam Reports (`reports`):** Target URL/platform, problem category, details, and optional submitter contact email.
- **Privacy Rights Requests (`privacy_requests`):** Submitter contact email, request kind (`access`, `correction`, `deletion`, `withdraw_consent`, `objection`), received timestamp, statutory due timestamp (30 days), resolution note.
- **Prohibited Data Categories (Never Collected):** National Identity Numbers (NIN), Bank Verification Numbers (BVN), physical home addresses, government passport scans, payment card numbers, user keystroke telemetry.

---

### 3. Purposes and Lawful Bases of Processing (NDPA 2023)

| Processing Activity | Purpose | Lawful Basis (NDPA 2023) |
|---|---|---|
| Weekly Digest Delivery | Dispatch verified AI jobs and practical guides | Explicit Consent (Section 25) with double opt-in |
| Evaluation Scoping | Evaluate client docs bots and schedule audit pilots | Pre-contractual steps / Contractual performance |
| Community Problem Reports | Protect community from scams and closed links | Legitimate Interest (Section 25) |
| Outbound Click Counting | Measure job demand by link type and country chip | Legitimate Interest (strictly anonymous, no IP) |
| Data Rights Fulfillment | Resolve statutory access and erasure requests | Legal Obligation (Section 34) |

---

### 4. Third-Party Data Processors & Locations

| Processor | Processing Role | Location | Safeguards |
|---|---|---|---|
| **Vercel Inc.** | Edge cloud hosting, SSR compute, serverless API execution | United States & Global Edge Nodes | SOC 2 Type II, encrypted transit (TLS 1.3), edge caching |
| **Resend Inc.** | Transactional email dispatch (double opt-in links, receipts) | United States | DPA executed, encrypted API transit, transient mail queue |
| **TraceBase DB** | Encrypted relational store for jobs, audit logs, leads, consent | Cloud / Encrypted storage | RLS policies enabled, service role restricted to server |

---

### 5. Retention Schedules & Statutory Purges

| Data Entity | Retention Horizon | Action at End of Horizon |
|---|---|---|
| Unsubscribed Newsletter Emails | 30 calendar days from unsubscribe | Irrevocable permanent purge from database |
| Pending Opt-in Tokens | 7 calendar days | Automatic deletion |
| Community Problem Reports | 12 months from submission | Contact email scrubbed; body text anonymized |
| Evaluation Inquiries (Uncontracted) | 6 months from last communication | Hard delete upon client request |
| Anonymized Telemetry Counts | 90 calendar days | Rolled over into monthly aggregate counts |

---

### 6. Technical and Organizational Security Measures (TOMs)
- **Encryption:** HTTPS enforcement with HTTP Strict Transport Security (HSTS), TLS 1.3, encrypted database storage.
- **Zero-Secret Client Bundles:** All service keys and environment variables restricted to server runtime.
- **Access Control:** Multi-factor authentication on administrative console; immutable audit log tracking every data modification.
- **Input Sanitization:** Server-side Zod validation on every public form with bot honeypots and rate limiting.
- **72-Hour Breach Clock:** Real-time administrative incident manager enforcing regulatory notification within 72 hours under NDPA Section 40.
