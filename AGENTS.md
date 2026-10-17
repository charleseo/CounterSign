# Project rules

Product: an independent, human-verified AI work hub plus an evaluation studio. The full plan is in /docs/plan.md. Read it before any task.

## Honesty
- Never invent data: no fake counts, logos, testimonials, pay figures, match scores or case studies.
- Seed data is marked SAMPLE and hidden in production.
- No em dashes in user-facing copy.

## Performance and design
- Mobile first at 360 px. Dark theme default. Full, Lite and Basic tiers.
- Futuristic effects are CSS and SVG only. No WebGL, video, Lottie or animation libraries.
- Budgets: initial JS 150 KB gzipped, fonts 100 KB, home page 250 KB. CI fails the build if exceeded.
- Glass only on the header and bottom sheets. Status is never shown by color alone.

## Code
- TypeScript strict, no `any`. Server components by default; mark client components only at interactive leaves.
- Follow the pinned framework version's docs. Check version-specific behavior instead of assuming it.
- Validate every input on the server with Zod. Bot protection and rate limits on every public form.
- Row level security enabled on every table with explicit policies. Service keys only on the server.
- In server actions and route handlers, call redirect outside try/catch.

## Process
- Small commits. Run lint, type check and tests after each change. Report what passed and what failed.
- Never commit secrets. Never run destructive production migrations without approval.
## Copy rules (user-facing text)

Voice: plain, specific, kind, short. Write for a smart person reading on a phone in their second language.

Rules
- Sentence case everywhere. No all-caps labels, buttons, tags or headings.
- No em dashes. Use a full stop or a comma.
- Use everyday words. If a 14-year-old would not know the word, pick another.
- Say what a thing does, not what it is called internally.
- Buttons say exactly what happens: "Apply on the employer's site", "Check an offer", "Email me when one appears".
- Never promise income, jobs, acceptance or task volume.
- Never state a fact about a platform without a source, or label it "Reported" or "Not confirmed".
- Never show internal words to visitors: priority, tier names, table names, section numbers, SAMPLE outside sample data.

Banned words in user-facing text
jurisdiction, immutable, forensic, telemetry, nexus, utility, protocol, instrument(s),
leverage, seamless, cutting-edge, revolutionary, world-class, robust, empower, unlock,
synergy, ecosystem, frictionless, best-in-class, guaranteed, "priority 1", "priority 2"

Before and after
1. "Choose working jurisdiction" -> "Where do you work from?"
2. "Public Immutable Verification Log" -> "Change log"
3. "Anti-Impersonation & Brand Verification Directory" -> "Our only official channels"
4. "Platform Incident Log" -> "Platform problems we have recorded"
5. "10-Point Security Utility" -> "Check a job offer"
6. "Evaluation Nexus Pipeline" -> "How we check an answer"
7. "Live Check Telemetry" -> "Recent checks"
8. "Forensic verification guides" -> "Guides to checking a job"
9. "Scope an Evaluation Sprint" -> "Scope an audit"
10. "Eligibility and compensation verification adapt to your selected jurisdiction" -> "We show roles you can apply for from where you live."

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
