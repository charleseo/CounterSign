# Countersign

> **AI work, checked by a human. Model answers, checked against the source.**  
> Independent verification for remote AI trainers and enterprise AI teams.

Countersign (`countersign.ai` / `countersign.ng`) is a dual-sided web platform engineered according to the **Countersign Master Build Plan v5**:
1. **The Audience Engine (Track 2):** An honest, human-verified remote AI training opportunity hub with country-specific playbooks, payout guides, scam protection, and side-by-side platform comparisons.
2. **The Commercial Business (Track 1):** A high-integrity AI model evaluation studio specializing in RAG retrieval citation auditing, hallucination detection, and domain specialist evaluation.

---

## Key Principles & Guardrails

- **Absolute Honesty:** Zero fake logos, invented customer counts, fabricated pay figures, or synthetic match scores. All sample seed records are marked `[SAMPLE]` and hidden in production.
- **Strict Copy Standards:** Zero em dashes across all public-facing copy. Crisp, factual, short sentences.
- **Mobile First at 360 px:** Built for real-world devices, including mid-range Android hardware running on metered or costly cellular data.
- **Three Performance Tiers:**
  - `Full`: Ambient dark aesthetics, subtle CSS spotlights, interactive constraint linter.
  - `Lite`: Zero transforms, flattened borders, instant CSS transitions, battery-conserving.
  - `Basic`: High-contrast, minimal layout for low-end browsers.
- **Zero WebGL / Zero Heavy Animation Libraries:** Pure SVG and CSS transitions keep initial JavaScript bundles under 150 KB gzipped.
- **NDPA 2023 Compliant:** Complete data minimization, cryptographic consent logging, real-time 72-hour breach notification clock, and 1-click personal data and account erasure.

---

## Site Architecture

### Public Opportunity Hub (Track 2)
- `/`: Home page featuring Live Check Console, verified job feed, platform highlights, and search palette.
- `/jobs`: Filterable remote AI evaluation opportunity index with live count chips, work-type filters, and country selectors.
- `/jobs/[slug]`: In-depth role verification profile with Freshness Stamp, Truth Strip, payout method, degree requirements, and Expectation Timeline.
- `/platforms`: Platform directory featuring verified onboarding stages, community ratings, and payout rails.
- `/platforms/[slug]`: Deep reality breakdown of major platforms (Outlier, Alignerr, Mercor, DataAnnotation, OneForma).
- `/platforms/[slug]/[code]`: Country-specific platform verification matrix (e.g. `/platforms/outlier/ng`) with non-dead-end fallback suggestions.
- `/platforms/[slug]/report`: Community experience submission form (onboarding pay, task availability, deactivations).
- `/countries/nigeria`: The Nigerian contributor playbook (USD virtual accounts, Grey/Geegpay ACH routing, degree equivalencies, router UPS power advice, local scam radar).
- `/compare`: Side-by-side comparative matrix of 2 to 4 platforms with sticky column navigation.
- `/guides`: Educational guides with interactive sentence-and-word constraint checkers.
- `/scam-check`: 10-point checklist protecting contributors from account rental schemes and upfront fee traps.
- `/about` & `/methodology`: Verification standards, editorial ethics, and funding disclosure.

### Evaluation Studio (Track 1)
- `/evaluation`: Studio homepage outlining evaluation capabilities and the Evaluation Graph hero.
- `/evaluation/services/rag-and-citation-audit`: Core enterprise service for auditing RAG citations against ground truth sources.
- `/evaluation/methodology`: Rigorous scoring criteria, error taxonomies, and inter-annotator agreement standards.
- `/evaluation/scope`: 3-step structured scope inquiry with reference ID generation (`CS-EVAL-XXXX`) and idempotent submission.
- `/evaluation/sample-audit`: 5-case real-world benchmark with prompt, source ground truth, model output, verdict, root cause analysis, and actionable remediation. Fully downloadable as CSV and JSON.
- `/evaluation/evaluators`: Talent network interest registration for medical, legal, STEM, and linguistic specialists.

### Contributor Accounts & Legal
- `/account/login`: Passwordless magic link sign-in.
- `/account`: Contributor dashboard for saved roles, country job alerts, and 1-click NDPA 2023 account deletion.
- `/privacy`: Comprehensive privacy notice aligned with the Nigeria Data Protection Act (NDPA 2023).
- `/privacy/request`: Formal data subject rights request intake.
- `/terms`: Terms of service emphasizing independent editorial neutrality.
- `/disclosure`: Referral transparency and commercial independence disclosure.
- `/corrections`: Platform takedown and correction procedure.
- `/contact`: Editorial and evaluation desk contact channels.

### Administrative Operations Console
- `/admin/login`: Secure 6-digit PIN authentication with session cookie.
- `/admin`: Operational dashboard tracking active verified roles, 14-day SLA recheck compliance, and lead pipeline.
- `/admin/jobs`: Job management with instant "Mark Checked" (under 15s) and automated status sweepers.
- `/admin/jobs/new` & `/admin/jobs/[id]`: Comprehensive job creation and editing with country eligibility checkboxes.
- `/admin/platforms`: Platform profile manager and timeline stage configurator.
- `/admin/leads`: Evaluation Studio inbound lead tracker with reference IDs and status pipelines.
- `/admin/reports`: Community experience moderation queue (approve/reject workflow).
- `/admin/evaluators`: Specialist talent network applications with direct contact links.
- `/admin/incidents`: 72-hour regulatory breach reporting countdown clock.
- `/admin/privacy`: NDPA 2023 data subject access and erasure request queue.
- `/admin/digest`: Weekly email newsletter preview and manual dispatch review.
- `/admin/metrics`: Privacy-friendly aggregated event telemetry.
- `/admin/audit`: Immutable audit log recording all administrative modifications.

---

## Tech Stack

- **Framework:** Next.js 16.4 (App Router, Turbopack, Partial Prerendering, Cache Components).
- **Language:** TypeScript 5.8 (Strict mode, no `any`).
- **Styling:** Tailwind CSS with custom CSS design tokens (`globals.css`).
- **Icons:** Lucide React.
- **Database / Store:** PostgreSQL / SQLite-compatible Repository abstraction with full Row-Level Security (RLS) schema (`src/lib/db/schema.sql`).
- **Validation:** Zod schemas on all server actions and public forms.
- **Testing:** Custom automated verification suites and TypeScript runner.

---

## Getting Started

### 1. Prerequisites
- Node.js 18.18+ or 20+
- npm 10+

### 2. Environment Setup
Copy the example environment configuration:
```bash
cp .env.example .env.local
```

Default administrative credentials for local evaluation:
- **Admin PIN:** `248163`

### 3. Installation
```bash
npm install
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Testing & Quality Assurance

Run the comprehensive verification suites covering database schemas, RLS policies, magic link authentication, saved jobs, NDPA deletion, and community aggregation:

```bash
# Run Milestone 11 verification suite
npx tsx tests/m11-verification.ts

# Type check
npx tsc --noEmit

# Lint check
npm run lint

# Production build verification (122 static and dynamic routes)
npm run build
```

---

## License

Confidential and Proprietary. All rights reserved by Countersign.
