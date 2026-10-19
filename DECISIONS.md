# TraceBase Architectural & Product Decisions (DECISIONS.md)

This log records the safe defaults and product decisions made during implementation in accordance with `TRACEBASE_MASTER_BUILD_PLAN_V5.md` (Section 20.1 & Section 23).

---

## 1. Brand & Identity
- **Product Name:** TraceBase.
- **Domains:** Primary `tracebase.work` / `tracebase.ai`, localized hub `tracebase.ng`.
- **Core Promise:** "AI work, checked by a human. Model answers, checked against the source."
- **Logo Device:** The TraceBase Mark (geometric verification mark with dual-color palette).
- **Typography:** Inter (`--font-sans`) and JetBrains Mono (`--font-mono`). All typography loaded via `next/font/google` with strict `< 100 KB` total font weight budget.
- **Copy Guardrail:** Absolute prohibition of em dashes in any public-facing text across all pages.

---

## 2. Audience & Journey Architecture
- **Dual Engine:**
  1. *Track 2 (The Audience Engine):* Independent AI work hub (`/jobs`, `/platforms`, `/countries`, `/compare`, `/guides`, `/scam-check`).
  2. *Track 1 (The Commercial Business):* Model evaluation studio (`/evaluation`, `/evaluation/services/rag-and-citation-audit`, `/evaluation/scope`, `/evaluation/sample-audit`).
- **Account Policy (Section 23.1, Decision 9):**
  - Applying for jobs never requires an account. Job seekers can browse, search, and click outbound application links freely without walls.
  - Accounts are optional, passwordless (magic link), providing bookmarking, country role alerts, and 1-click NDPA 2023 data deletion.

---

## 3. Data Protection & Regulatory Compliance (NDPA 2023)
- **Zero Profiling / Minimal Data:** No mandatory user accounts for browsing, no biometric or webcam tracking, no invasive assessment telemetry.
- **One-Click Deletion (`/account`):** Under NDPA 2023 Section 34, a registered user can delete their account, saved jobs, notification preferences, active sessions, and consent records in a single click.
- **Cryptographic Consent Logging (`consent_log` table):** Tracks consent timestamps, purpose, user agent, and explicit revocation.
- **72-Hour Security Incident Clock (`/admin/incidents`):** Admin dashboard displays a real-time countdown to notify the Nigeria Data Protection Commission (NDPC) in case of any reportable breach.
- **Row-Level Security (RLS):** All 17 database tables enforce RLS with granular policies separating anonymous visitors, authenticated contributors, and administrative consoles.

---

## 4. Evaluation Studio Scope & Services
- **Headline:** "Know where your AI is wrong. Understand why." with pillar subtitle "Model answers, checked against the source."
- **Initial Launch Service:** RAG & Citation Audit (`/evaluation/services/rag-and-citation-audit`). Additional services (multimodal verification, legal hallucination checks) are deferred until paid pilot validation.
- **Scope Intake Form (`/evaluation/scope`):** 3-step structured inquiry capturing model family, retrieval context, evaluation tier, and reference ID generation (`CS-EVAL-XXXX`). Idempotent submission prevents double-clicking.
- **Sample Audit (`/evaluation/sample-audit`):** 5-case real-world benchmark with prompt, source ground truth, model output, verdict, root cause analysis, and actionable remediation. Fully downloadable as machine-readable JSON and CSV.

---

## 5. Performance Tiers & Mobile Constraints (Section 10.10 & Section 16)
- **Default Theme:** Dark theme (`data-theme="dark"`).
- **Three Performance Tiers:**
  1. *Full:* Subtle CSS radial glows, card spotlight hover effects, and interactive constraint check linter.
  2. *Lite:* Flattened borders, zero CSS glow filters, zero transforms, instant transitions, minimal battery consumption.
  3. *Basic:* Plain high-contrast monochrome layout with fallback styling for resource-constrained browsers.
- **Persisted Toggle:** Controllable via the footer or system `prefers-reduced-motion` detection.
- **Strict Budget Ceiling:**
  - Initial JS < 150 KB gzipped.
  - Fonts < 100 KB.
  - Home page total payload < 250 KB.
  - 360 px mobile-first viewport design.

---

## 6. Community Truth & Platform Intelligence
- **Aggregation Threshold (Section 13.5):** Community experience reports (`/platforms/[slug]/report`) undergo mandatory admin moderation. Statistical aggregations (task availability, onboarding pay reality, deactivation rates) are strictly suppressed until at least 3 approved reports exist for a platform to avoid misleading unrepresentative metrics.
- **Non-Dead-End Architecture (Section 7.5a):** On `/platforms/[slug]/[code]`, if a platform is unconfirmed or does not accept contributors from a given country (e.g. DataAnnotation in Nigeria), the page renders alternative platforms with verified openings for that jurisdiction.
- **Scam Protection (`/scam-check`):** 10-point checklist addressing rented accounts, Telegram fee scams, fake recruiter emails, and proxy risks.
