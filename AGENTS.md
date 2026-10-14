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
- Do not add features that are not in the plan.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->
