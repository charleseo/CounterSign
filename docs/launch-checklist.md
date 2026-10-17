# Countersign production launch readiness checklist

This document defines the pre-flight verification checklist for Countersign's production release as an independent, human-verified remote AI work hub and evaluation studio.

---

## 1. Honesty and content integrity
- [x] **Sample data quarantine**: Confirm every seed role, platform review, and evaluation benchmark has `is_sample: true` and displays `Sample entry` (grey) badges. Verify production builds filter out `is_sample` entries from live public sitemaps and directories when `SHOW_SAMPLE_DATA=false`.
- [x] **Zero fabricated data**: Verify no fake contributor counts, employer logos, inflated pay rates, synthetic match scores, or unverified testimonials exist anywhere in production copy.
- [x] **No em dashes**: Verify user-facing copy contains zero em dash characters (`—`). Use commas, colons, or separate sentences instead.
- [x] **Standard date formatting**: Verify dates across job ledger, change logs, and privacy receipts strictly follow the standard format: `12 Oct 2026` or `14 October 2026`.
- [x] **Employer currency transparency**: Verify pay rates are presented in original employer currency (such as USD, GBP, EUR) without unauthorized automatic conversions.

---

## 2. Multi-country and regional coverage
- [x] **Initial launch hubs**: United States (`US`), United Kingdom (`GB`), Canada (`CA`).
- [x] **Regional coverage hubs (Africa and Asia)**:
  - Africa: Nigeria (`NG`), Ghana (`GH`), Kenya (`KE`), South Africa (`ZA`).
  - Asia: India (`IN`), Philippines (`PH`), Pakistan (`PK`), Bangladesh (`BD`), Indonesia (`ID`).
- [x] **Worldwide fallback (`WW`)**: Confirmed fallback behavior for unspecified or global users.
- [x] **Country hub status**: Unverified country hubs remain in draft mode (`isPublished: false`) with prominent draft notice and `robots: { index: false, follow: false }` until fully calibrated.
- [x] **Regional sharing links**: WhatsApp and Telegram links prioritized for Africa and Asia; LinkedIn, X, and direct copy prioritized for North America and UK.

---

## 3. Performance and tier budgets
- [x] **Initial JS bundle**: Under 150 KB gzipped on cold entry.
- [x] **Web fonts budget**: Under 100 KB total font assets.
- [x] **Home page payload**: Under 250 KB total initial transfer.
- [x] **Mobile responsiveness**: Zero horizontal overflow on 360 px, 375 px, and 390 px viewports (`npm test` passed).
- [x] **Touch target size**: Minimum 44 px by 44 px for all buttons, select inputs, and links on mobile screens.
- [x] **Three-tier architecture**:
  - **Full tier**: SVG sequence animations, refined borders, and glass headers.
  - **Lite tier**: Data Saver active; blur removed, animations suppressed, and web fonts replaced with system-ui stack.
  - **Basic tier**: Strict minimal HTML/CSS baseline for low-bandwidth connections.

---

## 4. Privacy, legal, and regulatory compliance
- [x] **NDPA 2023 baseline**: 30-day statutory response clock enforced for Data Subject Access Requests (SAR), erasure, and rectification at `/privacy/request`.
- [x] **Country-aware privacy queue**: Privacy request form captures country of residence to apply relevant local statutes.
- [x] **Lawyer review draft notice**: Banner placed on `/privacy` detailing the Nigerian legal baseline and flagging US state (CCPA/CPRA), UK GDPR, Canada PIPEDA, and EU GDPR review needs.
- [x] **Do not sell or share compliance**: Section `#do-not-sell` active, explaining zero data sales, zero ad retargeting, and automatic Global Privacy Control (GPC) support.
- [x] **72-hour security incident SLA**: Documented in `docs/incident-response-runbook.md` and public privacy policy.

---

## 5. Security and bot defense
- [x] **Bot honeypots**: Invisible honeypot inputs on all public forms (`/privacy/request`, `/contact`, `/corrections`, `/scam-check`).
- [x] **Input validation**: Strict Zod schemas validating all server actions and API route payloads.
- [x] **Demo mode lock**: Demo admin login bypass strictly locked to `NODE_ENV === 'development'`.
- [x] **Rate limiting**: Public submission rate limits configured for production endpoints.

---

## 6. Admin and editorial operations
- [x] **Live role recheck capacity**: `max_live_roles` setting configured (default: 35) to prevent verification backlog.
- [x] **Mobile-friendly fast recheck**: One-tap verification flow ("Still open", "Changed", "Closed") sorted by due date.
- [x] **Multi-checker initials**: Admin check logs record reviewer initials (`CO`, `EO`, `JD`, `MK` or custom), displayed on the public changes ledger.
- [x] **Rechecks paused control**: Setting `rechecks_paused_until` displays a calm public banner on `/jobs` and role pages when verification is paused for holidays or audits.
- [x] **Moderation queues**:
  - Weekly scam alerts moderation with automatic personal information sanitization.
  - Platform correction submissions reviewed within 48 hours.
  - Community experience logs verified before aggregation.

---

## 7. Email deliverability and analytics
- [x] **Email sender configured**: `EMAIL_FROM` variable configured with domain matching `countersign.ai`.
- [x] **Authentication records**: SPF, DKIM, and DMARC (`p=none`) documented in `docs/email-setup.md`.
- [x] **RFC 8058 one-click unsubscribe**: `List-Unsubscribe` and `List-Unsubscribe-Post` headers included on all outbound mail.
- [x] **Plain text fallback**: Every transactional email renders a clean plain text version.
- [x] **Cookieless analytics**: 5 core events tracked without cookies:
  - `apply_click`: outbound application clicks with role slug and platform.
  - `scam_check_complete`: completed offer checks with score and risk category.
  - `alert_signup`: weekly role digest signups with country code.
  - `share_click`: role or tool shares with channel (WhatsApp, Telegram, LinkedIn, X, copy).
  - `scope_submit`: evaluation scope submissions.
- [x] **Admin metrics dashboard**: 7-day and 30-day view switcher with 5 key event count cards.

---

## 8. Evaluation studio and commercial rules
- [x] **Direct booking action**: "Book a 20-minute call" linked to `NEXT_PUBLIC_BOOKING_URL` across hero and evaluation landing sections.
- [x] **Pilot pricing display**: Clear, non-deceptive pilot pricing text via `NEXT_PUBLIC_PILOT_PRICE_TEXT`.
- [x] **Downloadable audit report**: Valid PDF audit summary generated natively at `/evaluation/sample-audit.pdf`.
- [x] **Commercial neutrality pledge**: Strict policy on `/disclosure` stating referral earnings never alter verification status or ranking.
- [x] **Sponsored placement policy**: Explicit policy published on `/disclosure` explaining amber `Sponsored` badge and separate placement if sponsored listings are ever accepted.

---

## 9. Accessibility, design, and user testing
- [x] **Accessibility audit report**: Documented in `docs/accessibility-report.md` covering WCAG 2.1 AA, contrast >= 4.5:1, touch targets >= 44x44 px, and 360 px viewport.
- [x] **Dark mode default**: Dark theme set by default without glow effects or cyan deviations.
- [x] **User test kit**: 5-person test kit documented in `docs/user-test-kit.md` with 5-second test, 3 core user tasks, and recruitment profile (3 US/UK/CA + 2 NG).
- [x] **Automated copy lint**: Script `scripts/copy-lint.ts` verified against public routes for banned words, em dashes, and sentence case.

---

## 10. Environment variables and deployment
- [ ] `DATABASE_URL` configured and connected to production database.
- [ ] `ADMIN_PASSWORD` or production auth session provider configured.
- [ ] `RESEND_API_KEY` configured for double opt-in confirmation emails.
- [ ] `SHOW_SAMPLE_DATA` set to `false` in production environment.
- [ ] `NEXT_PUBLIC_SITE_URL` set to `https://countersign.ai`.
- [ ] `NEXT_PUBLIC_BOOKING_URL` set to live calendar booking URL.
- [ ] Production build verified via `npm run build && npm start`.
