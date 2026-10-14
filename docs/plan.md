# Countersign: Master Website Build Plan (v5, Definitive)
## Dual-Sided AI Model Evaluation Studio & Human-Verified AI Work Hub

Prepared for Jo (Ebube Okeke), 14 Oct 2026.  
Hand this whole file to your coding agent. It covers strategy, competitor research, every page specification, copy deck, futuristic design tokens, database schema, coding agent prompt sequence, practical NDPA data protection rules, and the 90-day launch roadmap.

### What changed in v5 (Definitive Master Plan):
1. **Brand Name Locked:** Adopted **Countersign** (`countersign.ai` | `countersign.ng` | `getcountersign.com`). Meaning: To countersign means to add a second signature confirming something is genuine. On the talent side, every job is countersigned (human-checked against official employer sources). On the enterprise AI side, every model answer is countersigned (checked against source documents by domain specialists). Fits the Seal logo mark naturally.
2. **Nigeria Hub Content:** Integrated practical playbooks for receiving USD payments in Nigeria (Geegpay, Grey, Nigerian bank domiciliary accounts), mapping Nigerian university degrees (B.Sc., B.Eng., HND) to global evaluation qualification tiers, and local tips for backup power (mini DC UPS) and mobile data conservation.
3. **Expanded Scam Checklist:** Integrated high-signal warning signs—demanding cryptocurrency or gift card payments, requesting BVN or online banking passwords, entities unlisted in the CAC public register, and fake recruiters using WhatsApp/Telegram with no official corporate domain email. Reinforced legal safety: risk scores and warning signs only, never automated defamatory public blacklists.
4. **Nightly Link Checker:** Added an automated cron helper that pings Apply links nightly to catch dead 404s/redirects, explicitly paired with the mandatory 14-day human recheck.
5. **Strict Sourcing Mandate:** Enforced taking listings only from official company job feeds (Ashby, Greenhouse, Lever) or direct partnerships, never third-party scraping.
6. **Later Evaluation Tooling (Operations MVP):** Defined immutable rubric versioning, balanced 5-point pairwise A-vs-B grading scales, mandatory excerpt text citations for verdicts, and correctly specified Cohen's Kappa as a batch-level agreement statistic.
7. **Enhanced Data-Saver Engine:** Added auto-detection for `navigator.connection.saveData` and 2G/3G connections alongside the permanent top navigation toggle, ensuring an instant, sub-50KB mobile load in Nigeria.
8. **Absolute Honesty & Compliance Integrity:** Maintained strict prohibition against fake metrics, income promises, unverified corporate claims, and unnecessary data collection (NIN, passport scans, keystroke/extension tracking).

## Contents

Part A: Strategy and research
1. The brief
2. Audience and jobs to be done
3. Competitor and market research
4. Positioning, voice and naming
5. Scope by phase

Part B: Product
6. Information architecture and URLs
7. Page-by-page specs
8. Copy deck
9. Content plan and templates

Part C: Design
10. Art direction and design system (futuristic)

Part D: Engineering
11. Architecture and stack
12. Data model
13. Verification workflow and admin
14. Routes, server actions and integrations
15. SEO and structured data
16. Performance and capability tiers
17. Security, privacy and legal
18. Analytics and KPIs
19. Testing and QA

Part E: Execution
20. Milestones and prompts for the coding agent
21. 90-day launch roadmap
22. Risk register
23. Open decisions and assumptions
24. Sources

Part F: Merge record [v4]
25. What was taken from the ChatGPT and Gemini blueprints, and what was not
26. Later phases: Operations MVP spec (from the ChatGPT blueprint)

---

# PART A: STRATEGY AND RESEARCH

## 1. The brief

Build a fast, mobile-first, futuristic-looking website with two jobs.

Job one: be the most trustworthy place to find legitimate remote AI training and evaluation work. Every listing is human-checked, country eligibility is honest, and people are told what the work is really like before they apply.

Job two: be the credible front door for a solo AI evaluation service (technical-docs RAG and citation audits for AI startups). The job side builds audience and trust. The service side earns money. Both share one brand and one reputation.

### 1.1 Goals for the first 90 days (experiments, not promises)

| Goal | Target | How we know |
|---|---|---|
| Supply | 10 or more verified roles live by end of week 2 | Admin dashboard count with check dates under 14 days |
| Audience | 25 relevant newsletter subscribers by day 30 | Newsletter tool |
| Trust | 5 people in a 5-second test say they would trust the site | Test notes |
| Service | 5 serious conversations with potential evaluation clients by day 45 | Lead log |
| Revenue | First paid evaluation pilot by day 90 (hypothesis) | Invoice |
| Quality | Share of live roles checked in the last 14 days stays at 90 percent or more | Admin dashboard |

### 1.2 Non-goals for v1

- No marketplace, no payments, no candidate profiles.
- No large-scale scraping or copying of other sites' job text.
- No non-AI job categories yet.
- No native app (a fast web app is enough; installable PWA later).
- No paid ads, no custom domain spend until validation signals appear.

### 1.3 Constraints

- One person runs this beside a main business. Operations MUST fit 20 to 30 minutes a day for listings plus one weekly content drop.
- Free or near-free tools at the start.
- Primary users are on mid-range Android phones in Nigeria with expensive mobile data.
- Honesty rules in section 17 override growth tactics.

### 1.4 What "world-class" means here

1. A visitor sees real value in under 10 seconds.
2. The facts that matter (eligibility, pay basis, onboarding, last checked) are visible without clicking.
3. The site loads fast on a weak phone and still looks ahead of every competitor.
4. Nothing on the site is invented.

---

## 2. Audience and jobs to be done

These are archetypes to validate with real conversations, not real people.

### 2.1 Archetypes

**The Newcomer.** Recent graduate or career switcher, mostly on a phone, hears that AI training jobs exist, cannot tell real from fake, afraid of scams, unsure of the vocabulary (annotation, RLHF, evaluator, rater).
- Job to be done: "Help me find real AI work I can apply to from my country, without wasting data or getting scammed."
- Needs: plain language, country filter, scam check, what to expect, prep guidance.

**The Switcher.** Already on one platform and the task queue is empty or they were removed. Knows the jargon.
- Job to be done: "Show me where else I can work, which options are open from my country, and what to expect before I spend hours on unpaid onboarding."
- Needs: fast alerts, platform comparison, honest reports of onboarding and queue reality, freshness.

**The Startup Lead.** Founder or engineer with a docs bot or RAG assistant, wants proof their answers are accurate.
- Job to be done: "Give me quick, credible evidence of where my bot is wrong, without a big procurement process."
- Needs: sample audit, clear pilot scope, data-handling honesty, one easy contact form.

**The Platform Representative.** Someone at a listed company who checks how we describe them.
- Job to be done: "Let me correct inaccurate facts quickly."
- Needs: visible correction contact, methodology, clear independence statement.

### 2.2 Needs to features

| Need | Feature |
|---|---|
| Can I apply from my country? | Country chip, eligibility labels with source and date |
| Is it real? | Verified status, Freshness Stamp, official links, scam check |
| What will this really be like? | Expectation timeline, community reports (Phase 1) |
| Where else can I work? | Platform directory, compare page, alerts |
| How do I pass screening? | General-skill guides and original practice exercises |
| Can I trust the site? | Methodology page, named author, disclosure, corrections path |
| Is this evaluation service credible? | Sample audit rendered as a real report, plain scope, contact form |

---

## 3. Competitor and market research

Found on 14 Oct 2026 from the competitors' own pages and public posts. Not an audit.

### 3.1 AI work boards (direct competitors)

| Site | Model and features | Gap for us |
|---|---|---|
| AIWorkfinder | Solo-built aggregator. Scrapes Mercor, Outlier, Alignerr, Abaka and Micro1 daily. Filters: platform, location, domain, skills, minimum pay. No account needed to browse, saved jobs, CV tool, blog. Discloses referral links. | Volume play with no visible human verification. Privacy and Terms links were empty placeholders on the page fetched. |
| AITrainer.Jobs | Aggregator claiming 10,000+ listings from 25 companies, refreshed twice daily. Filters by skill and language. Alerts via RSS, email and social. Its builder says growth came through Reddit and social posts. | Scale over truth. No eligibility or expectation data seen. |
| aitrainer.work | SEO-first curated board with guides and news about platform removals, plus a free academy with a certificate. Built on Astro with a semi-manual scraper. Offers partner platforms priority ranking in exchange for a recurring commission (10 to 15 percent of referred earnings) on referred workers. | Ranking can be bought, which weakens neutrality. This is our clearest opening. |
| aitrainingjobsfinder.com | Tracks 12 platforms and about 1,200 gigs by reading public job feeds. No signup wall, ads or heavy tracking. Marks jobs inactive when removed. | Aggregation only, thin guidance. |
| Alterwork, AlignList | More aggregators (17+ platforms; Scale, Mercor, Micro1, Surge and others). Free and filterable. | Undifferentiated feeds. |

Takeaway: the board space is crowded with scrapers competing on count. Nobody visibly competes on verification, eligibility honesty or realistic expectations.

### 3.2 Handshake AI and marketplaces

- Handshake AI is a fellowship, not an open link board. Applications are reviewed, people are matched to projects, Handshake contracts and pays fellows through Stripe, and its own help pages say there is no guarantee of continuous work. It has a referral program.
- OpenTrain AI is a marketplace where trainers build a profile, get matched to employer projects by skills and languages, and apply with proposals. Filters include software, data type, label type, experience level, budget and project length. Some jobs require a short AI interview before applying. Agencies get team accounts. This is close to a long-term marketplace idea. Study its flow, do not copy it in v1.

### 3.3 What workers complain about (the unmet need)

Reviews of the big platforms on Trustpilot, Glassdoor, Indeed and Reddit repeat the same themes: long unpaid onboarding and assessments, empty task queues, projects ending without warning, and account deactivations with template replies and no explanation. Some reviews are positive about pay when work flows. Job boards almost never prepare people for this. We will.

### 3.4 Lessons from the best general job boards

These are third-party reviews and comparisons, so treat them as direction.
- Remote OK is praised for a minimal, scannable layout with location and salary filters. A 2026 comparison reports it has since moved salary figures and its best filters behind a paid subscription. Lesson: pay and eligibility are what a job seeker needs to decide, so we show them free, always.
- Wellfound shows salary and equity, is free for candidates, and one 2026 blog comparison reported the best reply rate among the boards it studied (5.95 percent). Read that as indicative. Lesson: transparency and clean applications earn response.
- Otta is praised by developers for curation, onboarding and polish. Lesson: a short onboarding that asks what you want and then shows fewer, better results feels premium.
- We Work Remotely tags roles by who can apply (US only versus anywhere). Lesson: eligibility is a first-class label, and it is our core feature.

### 3.5 Who we design for: Nigeria-first, mobile-first, data-expensive

- Mobile dominates. An older TechCabal analysis put mobile at about 76 percent of Nigerian web traffic.
- Data is costly. After a 50 percent tariff increase approved in January 2025, 1 GB reportedly rose from about N287.50 to N431.25 (TechCabal, Aug 2025), and the same report says internet subscriptions fell by over a million in the first half of 2025 as device prices rose.
- Older Android is common. StatCounter (June 2026) shows Nigeria's Android versions: 13 at 17.65 percent, 12 at 16.5, 11 at 12.99, 14 at 12.42, 15 at 11.71 and 10 at 9.68. Roughly one in five Android visitors is on Android 10 or 11.
- Data-saving browsers matter. Opera has described Nigeria as one of its biggest Opera Mini markets.

Design consequence: text first, tiny pages, graceful fallbacks, no autoplay, no heavy hero images, and a path that works on a weak connection.

### 3.6 Trust research

- Nielsen Norman Group names four ways a site communicates trustworthiness: design quality, up-front disclosure, comprehensive and current content, and connection to the rest of the web. Typos and broken links damage credibility fast.
- NN/g also reports many users leave a page within 10 to 20 seconds unless it shows value, and a Stanford credibility study (cited by UXPin) found visual design is a leading credibility cue.
- Design consequence: visible freshness dates, source links on every claim, disclosures placed before the click, zero typos, one consistent component system, a named human behind the site, and a public methodology page.

### 3.7 Filter and list research

Baymard's research studies e-commerce, but the patterns transfer to job lists.
- Show applied filters in a visible overview with one-tap removal. Without it, mobile users must reopen the filter screen to check what is on.
- On mobile, avoid trips back and forth between the list and a separate filter screen. Show the result count on the apply button and update counts live.
- Disable options that would return zero results, and let people combine several values of the same type.
- Practitioners advise against endless scroll for lists people compare. Use a Load more button with position kept in the URL.

### 3.8 Scam patterns to design against

Reports citing the US Federal Trade Commission describe fake remote-job schemes that copy real company sites, run text-only fake interviews, send people to fake onboarding portals, make instant offers, or ask people to deposit a large check before work starts. A first contact on WhatsApp, Telegram or social media instead of a company email address is a classic red flag. Our scam-check page, job-page trust strip and guides teach these signs in plain words, and our own channels never behave this way (we never message first, never ask for money, never ask for ID documents).

### 3.9 Evaluation-service competitors

- Appen sells enterprise human RAG evaluation (faithfulness, citation accuracy, benchmarking).
- Techment sells Gen AIR, a RAG evaluation platform mixing automated scoring and human validation.
- Freelancers on Fiverr sell chatbot and RAG evaluation gigs.

Big vendors are heavy and slow for a seed-stage startup. Gig sellers are generic. Our angle: small, fast, evidence-first audits of a startup's own docs bot with reproducible logs.

### 3.9a [v4] Extra competitor detail reported in the Gemini blueprint (unverified)

The Gemini blueprint added detail on how the big contributor platforms run onboarding. None of it was checked for this plan, and some of it comes from third-party review sites. Treat every line as a lead to verify on the official page before it appears anywhere on the site.

| Platform | Reported by Gemini | Why it matters to us |
|---|---|---|
| Handshake AI | Core fellowship limited to people with US work authorization. Seven-step signup (account, school link with a skip option, SMS code, work-authorization questions, resume, legal agreements, ID check). Job cards show an upper hourly rate and degree badges (Associate to Postdoc). | If confirmed, Nigerian visitors hit a wall here. Our eligibility labels answer exactly this question. Degree badges are a pattern worth copying as a requirements field. |
| DataAnnotation | Onboarding mainly for US, UK, Canada, Australia, Ireland and New Zealand. Unpaid starter and core assessments. Reports of no reply after rejection, only a static thank-you screen. | Strong material for the "what to expect" timeline and the empty-queue guide, labeled Reported. |
| Mercor | A single AI video interview gates all matching roles, with retakes. Requires ID verification and heavy browser monitoring. Candidates complain about the bot interrupting answers. | Useful for the expectation timeline and a guide on AI interviews. Never publish interview questions. |
| Alignerr (Labelbox) | Six-stage process ending in an AI interview and domain tests. Candidates are sent from Alignerr's portal to a separate Labelbox workspace, which confuses people. | Good example of a cross-site handoff. Our platform profiles can warn people about it. |
| Aggregators (AITraining.jobs, AIGigJobs) | Programmatic pages per platform and country, for example a Handshake page for Nigeria that lists zero roles. Paid through referral commissions. | Confirms the dead-end problem. Our platform-by-country pages must give a real answer even when nothing is open (see 7.5a). |

Gemini also profiled B2B evaluation tools (Patronus AI, Braintrust, Labelbox, Scale's GenAI Platform). The lesson worth keeping: technical buyers trust products that show the actual work (a real trace, a real rubric, a real decision) over marketing claims. That supports our sample audit and the Studio's evidence-first design. We do not copy their leaderboards or trace playgrounds (section 25 explains why).

Gemini's market statistics (for example "85 percent of AI projects fail because of poor data" and regulator enforcement totals) had no checkable source in the document. Do not use them.

### 3.9b [v4] Wider competitor set to study (from the ChatGPT blueprint)

ChatGPT grouped the space in three bands. Study each for clarity and workflow, not visual imitation. Re-check every site at build time.

| Group | Examples | Learn | Avoid |
|---|---|---|---|
| Enterprise data and evaluation | Scale AI, Surge AI, Sama, TELUS Digital | Outcome-led messaging, clear services, quality controls, case studies | Claiming enterprise breadth we cannot deliver |
| Expert and contributor networks | Outlier, micro1, Alignerr, Mercor, DataAnnotation, OneForma, CrowdGen | Clear skill paths, eligibility, qualification steps, visible status | Vague earning promises, opaque queues, treating signup as a job |
| Annotation software | Toloka, Labelbox, Label Studio | Structured tasks, review flows, configurable criteria, export and traceability | Building an annotation suite before demand exists |

### 3.10 Gaps we can own

1. Human-verified listings with a visible last-checked date and status.
2. Honest country eligibility (Nigeria first, then Africa, then global).
3. Platform reality profiles: onboarding pay, task availability and removal reports, with sample sizes.
4. Neutrality: ranking is never sold, referral links are labeled.
5. Prep guides built on general skills, never leaked tests.
6. A futuristic but fast mobile experience that works on weak phones.
7. A real service behind the brand, which none of the board sites have.

---

## 4. Positioning, voice and naming

**Brand name:** **Countersign**  
*Origin & Meaning:* To countersign means to add a second signature confirming that a document or record is genuine. This is the exact promise Countersign delivers on both sides of the market:
- **For AI Job Seekers:** Every role is countersigned—meaning an independent human verified it against the official employer source before it was published.
- **For Enterprise AI Teams:** Every model answer is countersigned—meaning human domain evaluators verified the completion against the ground-truth reference context.

**Brand device:** The Seal: a precision circular ring with an inner check mark. Used as logo, favicon, verification stamp, and status glyph across both the work hub and evaluation studio.

**Domains & Handles Strategy:**
- Primary web domain targets: `countersign.ai`, `countersign.ng`, or `getcountersign.com`.
- Immediate validation checks:
  1. Check domain availability on Cloudflare Registrar or Namecheap.
  2. Run a business name availability search on the Nigerian **Corporate Affairs Commission (CAC)** public portal (`search.cac.gov.ng`).
  3. Search the Nigerian trademark registry and WIPO Global Brand Database.
  4. Secure matching handles on GitHub, LinkedIn, and X.

**Core Tagline:**
> **"AI work, checked by a human. Model answers, checked against the source."**

**Promise lines (OPEN, pick one):**
- "AI work, checked by a human." (Recommended for initial launch)
- "Every role countersigned. Every answer verified."
- "Real AI jobs. Real answers. Checked."
- "Know before you apply."

**Value propositions:**
1. **Countersigned listings:** Every role has a verified status, an official employer source, and a visible last-checked date.
2. **Honest country eligibility:** We tell you if your country is accepted, or that we could not confirm it.
3. **Transparent onboarding reality:** We tell you what the first month actually looks like, and label what is official versus community-reported.
4. **Uncompromising neutrality:** We never sell ranking, we never charge candidates, and referral links are always disclosed.
5. **Enterprise rigor:** Production LLMs audited against immutable rubrics with cited textual evidence.

**Brand voice:**
- Calm, direct, factual, plain English.
- No hype, no buzzwords, no income promises, no exaggerated claims.
- Never sneer at competitors, never publish unverified accusations, and never act as an offshore gig mill.

---

## 5. Scope by phase

| Feature | Phase | Priority |
|---|---|---|
| Home, jobs list, job detail, platform profiles, guides, scam check, about and methodology | 0 | MUST |
| Country chip and eligibility labels | 0 | MUST |
| Status system and Freshness Stamp | 0 | MUST |
| Evaluation Studio page and sample audit | 0 | MUST |
| Newsletter signup (double opt-in) | 0 | MUST |
| Admin screens for jobs, platforms, eligibility and check log | 0 | MUST |
| Legal pages (privacy, terms, referral disclosure, corrections) | 0 | MUST |
| Command palette and search | 0 | SHOULD |
| Dark and light themes, Lite mode toggle | 0 | MUST |
| Optional accounts, saved jobs, alerts by country and work type | 1 | SHOULD |
| Country hub pages (Nigeria first) | 1 | SHOULD |
| Compare platforms page | 1 | SHOULD |
| Report-a-problem on jobs, moderated community experience reports | 1 | SHOULD |
| Simple analytics dashboard | 1 | SHOULD |
| Semi-automated ingestion from official public feeds, recheck reminders | 2 | MAY |
| Opt-in talent profiles | 2 | MAY |
| Labeled sponsored listings | 2 | MAY |
| "Ask the checker" transparent AI assistant | 2 | MAY |
| PWA install, saved jobs offline | 2 | MAY |
| [v4] Evaluation service pages, Studio methodology page, 3-step scope form with reference ID | 0 | MUST |
| [v4] Outbound link redirect (/go/[id]) with anonymous click counts | 0 | SHOULD |
| [v4] Interactive practice exercises in guides (constraint checker) | 1 | SHOULD |
| [v4] Platform-by-country pages, only where verified content exists | 1 | SHOULD |
| [v4] Opt-in evaluator interest form (before any full talent profiles) | 1 | SHOULD |
| [v4] Operations MVP for running paid pilots (section 26) | 3 | MAY, only after a paid pilot |
| Non-AI job categories, marketplace features, client portal | 3 | MAY |

Do not start Phase 2 or 3 work until Phase 0 is live and getting traffic.

---

# PART B: PRODUCT

## 6. Information architecture and URLs

```
/                         Home
/jobs                     Job list (filters, search, sort)
/jobs/[slug]              Job detail
/platforms                Platform directory
/platforms/[slug]         Platform reality profile
/countries                Country index
/countries/[code]         Country hub (ng, gh, ke, za, in, ph, pk, bd first)
/compare                  Compare platforms (Phase 1)
/guides                   Guide index
/guides/[slug]            Guide
/scam-check               Scam checklist and report form
/evaluation               Evaluation Studio (B2B)
/evaluation/sample        Sample audit report
/evaluation/rag-citation-audit     [v4] Service page (launch service)
/evaluation/failure-analysis       [v4] Service page
/evaluation/preference-ranking     [v4] Service page (only once Jo can deliver it)
/evaluation/methodology            [v4] Rubrics, calibration, review, limits
/evaluation/scope                  [v4] 3-step scope form
/platforms/[slug]/[code]  [v4] Platform x country page (Phase 1, verified only)
/go/[id]                  [v4] Outbound redirect for Apply links (noindex)
/experts                  [v4] Phase 1: opt-in evaluator interest (honest, no promises)
/about                    About, who runs this, methodology
/methodology              How we verify (can live inside /about)
/newsletter               Signup and archive
/account                  Phase 1: saved jobs, alerts, settings
/admin                    Private admin (never indexed)
/privacy  /terms  /disclosure  /corrections  /contact
/sitemap.xml  /robots.txt  /rss.xml (new verified roles)
```

Navigation (five items maximum): Jobs, Platforms, Guides, Scam check, Evaluation. Plus the country chip, search, and a Lite mode toggle in the footer.

URL rules:
- Lowercase, hyphens, readable slugs. Job slug example: `evaluator-search-quality-example-platform`. A short id suffix is allowed only to resolve duplicates.
- Slugs never change after publishing. If a title changes, the old URL still works.
- A closed job keeps its URL, returns 200, shows a Closed banner, offers similar open roles, and is removed from lists and from structured data.
- Every public page has one canonical URL. Filter combinations use query parameters and set noindex unless they are a curated hub.
- Admin and account routes are noindex and disallowed in robots.txt.

---

## 7. Page-by-page specs

Each page lists its purpose, blocks in order, data, interactions, states, SEO and the analytics events it must fire. All pages follow the design system in Part C and the performance budgets in section 16.

### 7.1 Home

**Purpose.** In 10 seconds: what this is, why it can be trusted, and one clear action.

**Blocks, in order**
1. Header: wordmark with Seal, country chip, search, menu.
2. Hero: promise line, one supporting sentence, search field, country-aware primary button ("See 14 roles open for Nigeria"). Live Check Console beneath, showing real recent check events.
3. Latest verified roles: five job cards with Freshness Stamps.
4. Bento grid: Scam check tile, Platform reality tile, Guides tile, Check log tile, Evaluation Studio tile.
5. How we verify: three steps (find the official source, check eligibility and status, recheck every 14 days) with a link to the methodology page.
6. Newsletter capture: one field, consent line, inline success.
7. Footer: independence statement, disclosure, corrections, privacy, terms, Lite mode toggle.

**Data.** Counts by country, latest 5 verified jobs, last 5 check events, 3 featured platforms.

**States.** No verified roles yet for the selected country: show the nearest alternatives and the alert signup. Empty check log: hide the console and show the three verification steps instead (never fake events).

**[v4] Country preselect and "why you see this".** Gemini suggested reordering content by the visitor's location. Adopt a light, honest version:
- On first visit, prefill the country chip from the hosting platform's coarse country header (for example Vercel's geolocation header). Never store the IP. The visitor can change it in one tap, and their choice is remembered on the device.
- Whenever content is sorted or filtered by country, show a small label: "Showing roles for Nigeria. Change". Nothing on the site is personalized without saying so.
- No "match score" or "rubric fit" percentages anywhere until a real, explainable matching system exists.

**SEO.** Title, meta description, Organization and WebSite structured data, Open Graph card.

**Events.** home_view, country_selected, search_used, hero_cta_click, newsletter_signup.

**Acceptance.** First screen on a 360 px phone shows the promise, search and a real card edge without scrolling. LCP element is the headline in server HTML.

### 7.2 Jobs list

**Purpose.** Find real roles you can apply for, fast.

**Layout.** Mobile: sticky bar (search, Filters button) with the applied-chips row under it, one column of cards, Load more button. Desktop: 280 px left filter sidebar and a results column.

**Filters**
- Country eligibility (default from the country chip): Accepted, plus a toggle "Include unconfirmed".
- Work type: annotation, evaluation, search rating, writing, coding, domain expert, data collection, translation, other.
- Domain: general, math, coding, science, medicine, law, finance, languages, other.
- Language.
- Platform.
- Pay basis: shows only verified pay. Options: hourly, per task, project, not confirmed.
- Status: Verified (default), Needs recheck.
- Freshness: checked within 7 days, 14 days, any.

**Behavior**
- Applied filters appear as chips above the list with one-tap removal and Clear all.
- Live result count on the mobile apply button ("Show 14 roles"). Options that would return zero are disabled and show counts.
- Sort: Newest verified (default), Recently checked, Pay (verified only).
- URL carries all filters, sort and the Load more position. Back button restores scroll.
- Search uses Postgres full-text on title, platform, work type and domain, with typo tolerance later.

**Card contents.** Title, platform, work type, eligibility badge for the selected country, verified pay if any, Freshness Stamp, status badge, save icon (Phase 1).

**Wireframe (mobile, example text)**

```
+------------------------------------+
| [ Search roles...        ] [Filter]|
| [NG x] [Evaluation x]   Clear all  |
| 14 roles                           |
|                                    |
| +--------------------------------+ |
| | Example Role Title          [] | |
| | Example Platform - Evaluation  | |
| | [Verified] [Nigeria: accepted] | |
| | Pay: not confirmed             | |
| | * Checked 2 days ago           | |
| +--------------------------------+ |
| (more cards)                       |
| [        Load more (14 left)     ] |
+------------------------------------+
```

**States.** Loading skeletons matching card height. Empty: "No verified roles match. Get an alert when one lands." with the alert field. Error: kind message and retry.

**SEO.** Indexable base page. Parameter pages noindex, except curated country and work-type hubs in Phase 1.

**Events.** filter_used (with filter name), sort_changed, job_card_click, load_more, alert_signup.

### 7.3 Job detail

**Purpose.** Everything needed to decide, then one honest apply button.

**Blocks, in order (mobile)**
1. Title, platform, work type, status badge, Freshness Stamp.
2. Truth Strip: Eligibility, Pay basis, Onboarding, Last checked. Each with icon, value and source link.
3. Short original summary written by us (never the employer's pasted text).
4. What to expect: the Expectation timeline for this platform, with source labels.
5. Requirements (skills, languages, equipment).
6. What we could not confirm (listed plainly).
7. Check log: last 5 checks with dates and notes.
8. Related roles and the platform's profile link.
9. Report a problem.
10. Sticky bottom Apply bar on mobile: "Apply on official site", link type label (Direct or Referral), disclosure line, independence line.

**Desktop.** Two columns: details left, sticky summary and Apply right.

**Rules**
- The Apply link is always the official application or project page.
- If the link is a referral, label it Referral and show the disclosure next to the button.
- Closed roles show a banner, hide Apply, and show similar open roles.
- Needs recheck shows an amber note: "Last checked 19 days ago. Check the official page before you apply."
- [v4] Requirements may include degree-level pills (Associate, Bachelor's, Master's, PhD, Postdoc), shown only when the official page states them. This pattern comes from Handshake's job cards as reported by Gemini.
- [v4] The Apply button points to /go/[job-id], which counts the click anonymously (job id, link type, date, country chip value) and sends a 302 redirect to the official URL. No cookies, no fingerprinting, no IP storage. In the server code, call the redirect outside any try/catch used for logging, because some frameworks (Next.js among them) implement redirect by throwing, and a catch block can swallow it. If logging fails, the redirect still happens.
- [v4] No "Sign in to apply" wall. Gemini's blueprint gates applying behind an account modal; that is rejected for v1 (see section 25).

**Structured data.** JobPosting JSON-LD only behind a feature flag and only for listings we are entitled to publish (see section 15).

**Events.** job_view, truth_strip_source_click, apply_click (link_type), report_problem_open, report_problem_submit.

### 7.4 Platform directory and platform detail

**Directory.** Grid of platform tiles: name, work types, countries summary, number of open verified roles, last reviewed date, referral status label if any. Filter by work type and country. Monogram tile if no logo permission.

**Platform detail blocks**
1. Header: name, official link, last reviewed date, independence note.
2. Quick facts: what they do, who it suits, countries, payout methods (official sources only), assessment style (general description).
3. Expectation timeline: Apply, Verify identity, Assessment, Onboarding, First task, each step labeled Official, Reported by workers, or Unknown.
4. Open roles on this platform.
5. Community experience (Phase 1): aggregated counts with sample size and date range, clearly labeled unverified self-reports.
6. Related guides.
7. Referral status and disclosure (if any).
8. Corrections link for the platform.

**Rules.** Facts need an official source link. Anything else is Reported or Unknown. No accusation is stated as fact. A right-of-reply and takedown contact is always visible.

**Events.** platform_view, platform_official_click, timeline_expand.

### 7.5 Country hub (Phase 1, Nigeria first)

`/countries/nigeria`

Targeted, practical guide for Nigerian candidates navigating international AI work. Clean, text-first, mobile-optimized.

**1. Header:** Country flag glyph, title ("AI Work in Nigeria: Verified Platforms, Payouts & Credentials"), last reviewed date, and honest summary note.

**2. USD Payout & Banking Playbook:**
- **Virtual USD Bank Accounts (Geegpay & Grey):**
  - Explains how to open verified US virtual accounts (with individual ACH routing and account numbers) using Nigerian credentials (NIN / International Passport).
  - How to connect these US routing details to global payroll platforms like Deel, Outlier, Alignerr, and Mercor.
  - Clear breakdown of typical withdrawal fees (1% to 1.5%) and current conversion rates into Nigerian Naira (NGN) directly into local bank accounts (GTBank, Access, Zenith, Kuda, etc.).
- **Nigerian Bank Domiciliary Accounts:**
  - When to use direct USD domiciliary accounts (GTBank, Zenith Bank, First Bank) for larger wire transfers.
  - How wire transfers (SWIFT) work, typical correspondent bank fees ($5 to $15 per transaction), and withdrawal options (over-the-counter USD cash withdrawal vs FX conversion).
- **Payment Methods to Avoid:**
  - Clear explanation of why personal PayPal accounts opened in Nigeria cannot receive incoming commercial payments, and warning against risky "bypass" methods that lead to frozen balances.

**3. Nigerian Degree & Qualification Mapping:**
- How Nigerian university degrees map to international evaluation qualification requirements:
  - B.Sc. / B.Eng. in STEM fields (Computer Science, Mathematics, Electrical Engineering, Physics) from accredited institutions (e.g., UNILAG, UI, OAU, ABU, FUTA, UNN, Covenant) map directly to Bachelor's degree qualification tiers for coding and reasoning RLHF.
  - HND (Higher National Diploma) with verifiable programming or domain experience: maps to technical qualification tiers for coding and translation tracks.
  - Medical (MBBS), Pharmacy (B.Pharm), and Law (LL.B / BL) degrees: qualify for specialized high-tier domain annotation sprints ($40–$80+/hr when available).
- Documentation advice: keeping clean PDF scans of degree certificates or official statements of result ready.

**4. Electricity, Backup Power & Data Conservation:**
- **Power Reliability Setup:** Recommends affordable mini DC UPS devices (12V / mini-UPS) to keep Wi-Fi routers powered during national grid load-shedding, alongside high-capacity power banks for laptops and smartphones.
- **Mobile Data Conservation:** Practical browser settings to save bandwidth, advice on using Countersign's Data-Saver mode (<48 KB initial load), and optimizing image/video download settings.

**5. Active Platforms for Nigerians:**
- Filtered subset of platforms that currently accept Nigerian residents, with explicit status: *Official support*, *Reported working by community*, or *Currently waitlisted*.

**6. Local Scam Radar:**
- Warning alerts specifically targeting Nigerian job seekers (e.g., WhatsApp groups claiming to sell verified Outlier/DataAnnotation accounts, fake training fee demands).

### 7.5a [v4] Platform x country pages (Phase 1)

Adapted from the aggregator pattern Gemini described (for example /platforms/handshake/nigeria), with one big change: no dead ends and no thin pages.

**URL.** /platforms/[slug]/[code], for example /platforms/example-platform/ng.

**Publish rule.** A page exists only when Jo has verified that platform's eligibility for that country from an official source. Otherwise the URL returns 404 and is not in the sitemap.

**Blocks.**
1. Plain answer first, in one line: "Accepted from Nigeria", "Not accepted from Nigeria" or "We could not confirm". Source link and check date.
2. If accepted: open verified roles on that platform for that country, payout methods that work from there (official sources only), and the expectation timeline.
3. If not accepted or unconfirmed: say so kindly, then show platforms that do accept that country, with live verified roles. This turns a dead end into a useful page.
4. Warning box if the only workarounds people discuss break the platform's rules (VPNs, borrowed accounts, remote-desktop "account rental"). Gemini's research mentions these workarounds circulate. We never recommend them, because they get people banned and can be fraud.
5. Alert signup: "Tell me if this changes for Nigeria".

**SEO.** Indexable only when the page holds unique, verified content. Each page has a "last verified" date in the visible content and the sitemap.

### 7.6 Compare platforms (Phase 1)

Up to four platforms side by side: work types, countries, onboarding steps, payout methods, referral status, open roles, last reviewed. Sticky first column, horizontal scroll with edge shadows on mobile. Unknown values read "Not confirmed", never blank.

### 7.7 Guides index and guide

**Index.** Cards with title, reading time, last updated, topic tags.
**Guide layout.** Single reading column (680 px), table of contents on desktop, summary at the top, sources at the end, "Checked by" sign-off with date, related roles, newsletter capture at the end.
**Rules.** General skills only. No confidential screening questions or answers. Original practice exercises. Every factual claim about a platform links to its official source or is labeled as reported.

**[v4] Interactive practice exercises (Phase 1).** Gemini proposed a full assessment studio with a live "constraint linter". The useful, cheap part is a practice widget inside guides:
- An original prompt Jo writes, two sample AI answers, and a text box for the reader's rating and short rationale.
- A live constraint checker under the text box: counts sentences and words against the exercise's stated limit (for example "2 to 3 sentences") and shows "2 of 3 sentences, within limit" or "4 sentences, over the limit" with an icon and a word, not color alone.
- After the reader submits, show Jo's model answer and the reasoning. No score, no grading claims, nothing sent to a server, nothing stored.
- Runs as a small client component under 10 KB, works in the Lite tier, and still works as plain text without JavaScript (the model answer sits in a details element).
- Exercises are original. They never copy or describe any platform's real assessment.

### 7.8 Scam check

`/scam-check`

Public utility to help candidates evaluate whether an AI work opportunity or recruiter contact is legitimate before sharing personal details.

**Design:** Clean card layout with an input field, quick-check criteria, and clear risk analysis results.

**Input:** URL, employer name, recruiter email, or message text.

**10-Point Verification Checklist:**
1. **Upfront Payment Demanded:** Does the poster ask for money for training, equipment, software licenses, or account activation? (Automatic high risk).
2. **Crypto or Gift Card Payouts:** Are payments offered via Bitcoin, USDT to anonymous wallets, or Amazon gift cards instead of recognized payroll (Deel, direct bank transfer, Geegpay, PayPal)?
3. **Sensitive Financial Credential Requests:** Does the poster ask for Bank Verification Number (BVN), ATM PINs, online banking passwords, or card OTPs? (Immediate critical danger).
4. **Missing CAC Registration:** For Nigerian-based recruiting entities, can the company be found in the Corporate Affairs Commission (CAC) public portal (`search.cac.gov.ng`)?
5. **Exclusive Messaging App Hiring:** Is communication conducted exclusively via WhatsApp, Telegram, or Signal with no verifiable email from the company's official corporate domain?
6. **Free Email / Typosquatting Domain:** Does the recruiter email come from a free provider (gmail.com, hotmail.com) or a lookalike domain (e.g. `outlier-work-portal.com` instead of the official domain)?
7. **Unrealistic Compensation:** Does the role promise $100+/hr for basic data entry, text typing, or CAPTCHA solving with zero skills required?
8. **Instant Offer Without Testing:** Is a contract offered immediately without any skill verification, assessment, or portfolio review?
9. **High-Pressure Urgency:** Does the recruiter demand immediate signing within minutes or threaten loss of opportunity?
10. **Website Freshness & Provenance:** Is the hiring website less than 30 days old with copied text or broken links?

**Output & Legal Safety:**
- Displays an objective **Risk Score** (Low, Moderate, High Risk) accompanied by specific detected warning signals.
- **Defamation Safeguard:** The system NEVER stamps an automated label like "CONFIRMED SCAM [Company Name]", nor does it publish personal names or phone numbers on an unmoderated public blacklist. It provides an objective breakdown of risk factors with guidance on how to verify directly.
- **Human-Reviewed Report Form:** Candidates can submit suspicious listings for staff moderation. Reports are reviewed manually before any public warning note is added.

### 7.9 Evaluation Studio

**Purpose.** Convert AI startup leads, honestly.

**Blocks, in order**
1. Plain pitch: what we audit (citation accuracy, hallucinations, negative-constraint failures in docs bots and RAG assistants).
2. Sample audit teaser rendered as a report card with real verdicts.
3. How a pilot runs: scope, sample size, turnaround, deliverables, price discussion after reviewing the client's data.
4. Data handling: what we ask for, how it is stored, retention and deletion, NDA available.
5. About the evaluator: Jo, experience, portfolio link, honest note on being a solo specialist who brings in vetted reviewers as volume requires.
6. Contact form: name, work email, company, product URL, short message, bot protection.
7. FAQ.

**Rules.** No invented client logos, testimonials or team sizes. Price is not shown on the page; it is agreed after scope.

**Events.** studio_view, sample_audit_open, eval_form_submit.

**[v4] Studio upgrade, adapted from the ChatGPT blueprint.** The Studio becomes a small section with its own journey (service page, sample, scope form, confirmation, call), kept separate from the job seeker journey but under one brand. Updated block order for /evaluation:

1. Hero: the Studio headline from section 4, two buttons (Scope an audit, See a sample audit), and the Evaluation Graph (section 10.2a) on the right on desktop, beneath the buttons on mobile.
2. Proof pillars strip: Defined criteria, Reviewable decisions, Traceable evidence. Each pillar links to the part of the methodology page that proves it. No logos.
3. Three buyer problems: answers that cite the wrong page, answers that invent options the docs never mention, and no repeatable way to measure either.
4. Service cards (one per service page below), each with deliverables in one line.
5. Interactive comparison panel: a real prompt from the sample audit, the bot's answer, the source excerpt, and Jo's decision with rationale. Tabs for each step. Keyboard and touch friendly. Labeled "From our sample audit" with the run date.
6. How a pilot runs: scope, sample size, turnaround, deliverables.
7. Data handling, about the evaluator, FAQ, final button.

### 7.9a [v4] Service pages

One page per service, all using the same template:
- Who it is for and when to use it.
- Inputs we need, the unit of work (for example one question and answer pair), the criteria, the outputs, and what is not included.
- How uncertainty and disagreement are handled (a "cannot verify" verdict exists; Jo does not guess).
- One annotated example row from the sample audit.
- Metric definitions and their limits.
- A button to the scope form with the service already selected.

Launch with RAG and citation audit (the chosen vertical). Add failure analysis when the taxonomy is written. Add preference ranking only when Jo can deliver it with a second reviewer. Never list a service that cannot be delivered next week.

### 7.9b [v4] Studio methodology page

Explains, in plain words: how rubrics are written and versioned, how a check is done against the source, when a second reviewer is used, how disagreements are resolved, and how every finding can be traced back to its prompt, source and output. It must say plainly that agreement between reviewers does not by itself prove an answer is correct, and that metrics appear only when the data behind them exists. Show one finding's full trail as an example.

### 7.9c [v4] Scope form (3 steps)

| Step | Fields |
|---|---|
| 1. You | Name, work email, company, product URL, service (prefilled if coming from a service page), one-line problem |
| 2. Scope | Rough volume, what the bot answers from (public docs, private docs), timeline, existing rubric (yes or no), data sensitivity |
| 3. Review | Summary of answers, privacy notice, consent checkbox (never pre-ticked), submit |

On submit: a reference ID (for example EV-2026-0042), an on-page receipt, an auto-reply email that quotes the ID, a row in eval_leads with source and status, and an email to Jo. Server-side validation, Turnstile, rate limit, idempotent submit (a double tap does not create two leads). No file uploads until a private, access-controlled storage path exists; until then the form says "Please do not send confidential data here. We will set up a secure way after a call."

### 7.10 Sample audit

A real report rendered in the site's design: five cases, each with prompt, source excerpt with URL and access date, model output, verdict, root cause, fix. Built only from real model runs. Include model name, version and date for every run. A methods note and limitations box ("five cases are a demonstration, not a measure of overall model quality").

[v4] From the ChatGPT blueprint: anchor navigation (setup, cases, findings, limitations), and downloads of the same data as CSV and JSON with stable case IDs, rubric version and run dates. If any case ever uses invented data, it carries a visible "Illustrative, not a real run" label. Real runs remain the default and the goal.

### 7.11 About and methodology

Who runs this (name, photo optional, links), why it exists, how verification works step by step, the check statuses and their meanings, how referral links work, how we handle corrections, independence statement, contact. This page is a trust asset; write it carefully.

### 7.12 Newsletter

Single field, consent line, double opt-in. Archive of past digests (Phase 1). Weekly digest: new verified roles by country, one guide, one scam warning if relevant.

### 7.13 Account (Phase 1)

Email sign-in with magic link. Settings: country, work types, alert frequency, delete my account. Saved jobs list. Data minimal: email, country, optional interests.

### 7.14 Admin (private)

Screens in section 13. Strong auth, 2FA, audit log on every change.

### 7.15 Legal and utility pages

Privacy, terms, referral disclosure, corrections, contact, 404, 500, offline page (PWA later). The 404 offers search and top pages.

---

## 8. Copy deck

All copy is plain, specific and short. Jo reviews every line before launch. Sentence case everywhere.

### 8.1 Hero options (OPEN: pick one)

| Option | Headline | Supporting line |
|---|---|---|
| A | AI work, checked by a human. | Every role has a source, a date and an honest note on who can apply. |
| B | Know before you apply. | Real AI training and evaluation jobs, with the facts other lists skip. |
| C | Real AI jobs. Real answers. | We check each listing, tell you if your country is accepted, and say what to expect. |

Primary button: "See [N] roles open for [Country]". Fallback when none: "Browse verified roles".

### 8.2 Microcopy

| Place | Copy |
|---|---|
| Freshness Stamp, fresh | Checked 2 days ago |
| Freshness Stamp, aging | Last checked 12 days ago |
| Freshness Stamp, stale | Last checked 19 days ago. Check the official page before you apply. |
| Eligibility accepted | Nigeria: accepted (source, checked Oct 14) |
| Eligibility unknown | We could not confirm if Nigeria is accepted. Here is what the official page says. |
| Eligibility not accepted | Nigeria: not accepted (source, checked Oct 14) |
| Pay unknown | Pay: not confirmed |
| Referral link label | Referral link: we may earn a bonus if you qualify. It costs you nothing. |
| Direct link label | Direct link. No referral. |
| Independence line | Independent site. Not affiliated with the platforms we list. |
| No guarantee line | Listing a role does not guarantee acceptance, tasks or income. |
| Country chip prompt | Which country do you work from? |
| Search placeholder | Search roles, platforms, guides |
| Filters button | Filters (3) |
| Apply button | Apply on official site |
| Report link | Something wrong? Tell us |
| Newsletter field label | Email for the weekly digest |
| Newsletter consent | One email a week with new verified roles and one guide. Unsubscribe any time. |
| Newsletter success | Check your inbox to confirm. |
| Empty list | No verified roles match yet. Get an alert when one lands. |
| Empty alert field label | Email me when a role matches |
| Form error | That did not send. Your text is still here. Try again. |
| Offline | You are offline. Saved pages still open. |
| 404 | We could not find that page. Try search, or start from the jobs list. |
| Closed role banner | This role is closed. Here are similar open roles. |
| Needs recheck banner | Last checked 19 days ago. Details may have changed. |
| Reported info label | Reported by workers, not confirmed by the platform. |
| Official info label | From the platform's official page. |
| Unknown info label | Not confirmed. |
| [v4] Country sort label | Showing roles for Nigeria. Change |
| [v4] Constraint checker, within | 2 of 3 sentences. Within the limit. |
| [v4] Constraint checker, over | 4 sentences. The limit is 3. |
| [v4] Scope form receipt | Got it. Your reference is EV-2026-0042. I reply within two working days. |
| [v4] Scope form data warning | Please do not send confidential data here. We set up a secure way after a call. |
| [v4] Platform x country, not accepted | Example Platform does not accept applicants from Nigeria (source, checked Oct 14). These platforms do: |
| [v4] Workaround warning | Some people suggest VPNs or renting accounts. Platforms ban this, and it can be fraud. We never recommend it. |

### 8.3 Short FAQ (home and about)

1. **Do you charge people to use this site?** No. Never. If anyone asks you for money in our name, it is not us.
2. **Is this an official site of the platforms you list?** No. We are independent and not affiliated with them.
3. **How do you check roles?** A person opens the official page, records what it says and when, and rechecks within 14 days. See the methodology.
4. **Why do some listings say "not confirmed"?** Because the official page does not say. We do not guess.
5. **Do you earn money from referral links?** Sometimes, where a platform allows it. Those links are labeled Referral, and they never change a role's ranking or status.
6. **Can you get me a job?** No. We list opportunities and explain what to expect. Hiring decisions belong to the platforms.
7. **A role I saw is closed. Why?** Roles change fast. Tell us and we will update it.
8. **How do I report a scam?** Use the form on the scam-check page. We review it by hand.
9. **Can a platform correct something about itself?** Yes. Use the corrections page and we respond with a fix or a reason.
10. **Do you sell my data?** No. We collect the minimum (email and country) and never sell or share individual details.

### 8.4 Emails

**Double opt-in confirmation**
Subject: Confirm your email for the weekly digest
Body: Tap the button to confirm. You will get one email a week with new verified roles and one guide. If this was not you, ignore this message. [Confirm email]

**Welcome (after confirmation)**
Subject: You are in. Here is how this works
Body: Every role we list has a source and a date. We say what we could not confirm. We never charge you, and we never ask for ID documents or money. Start here: [Scam check], [How we verify], [Roles open for your country].

**Weekly digest template**
Subject: [N] new verified roles for [Country] this week
Blocks: new verified roles (title, platform, eligibility, last checked), one guide of the week, one scam warning (only if there is one), one honest note ("what changed this week"). Footer: referral disclosure, unsubscribe, corrections contact.

**Evaluation lead auto-reply**
Subject: Got your message
Body: Thanks for writing. I read every message myself and reply within two working days. If you can send 5 to 10 example prompts and answers from your bot (no confidential data), I can tell you quickly what a pilot would cover. Jo

### 8.5 Meta descriptions (starting points)

- Home: Verified remote AI training and evaluation jobs, with honest country eligibility and a plain note on what to expect.
- Jobs: Browse human-checked AI training and evaluation roles. Filter by country, work type and freshness.
- Scam check: How to spot fake AI job offers, with a checklist and a way to report suspicious links.
- Evaluation: Evidence-first audits of AI docs bots and RAG assistants: citation accuracy, hallucinations and instruction failures.

### 8.6 Corrections and report text

**Corrections page.** "If something about your company or a role is wrong, tell us. Send the page link, what is wrong, and a source. We respond within three working days and publish a fix or explain why not."

**Report a problem form.** Fields: what is wrong (broken link, closed, wrong country, wrong pay, scam concern, other), details, optional email. Text: "We read every report. If you leave an email, we will tell you what we did."

---

## 9. Content plan and templates

### 9.1 Job record template

```
platform:            Example Platform (select)
title:               Example Role Title
slug:                example-role-title-example-platform
work_type:           evaluation
domains:             [general]
languages:           [English]
summary (ours):      Two or three sentences in our own words.
requirements:        Short bullets.
official_url:        https://...  (the page we verified)
apply_url:           https://...  (the official application page)
link_type:           direct | referral
pay_text:            Not confirmed   (or the exact official wording)
pay_verified:        false
pay_source_url:      (blank unless verified)
eligibility:         NG accepted (source URL, date) | KE unconfirmed | US accepted
onboarding_notes:    Assessment first (official) | Unpaid onboarding reported (reported)
status:              verified | needs_recheck | closed | unconfirmed
last_checked_at:     2026-10-14
next_check_at:       2026-10-28
check_note:          Apply link works. Countries listed on the page.
```

### 9.2 Platform profile template

```
name, slug, official_url
what_they_do:        Plain description from official sources
who_it_suits:        Skills and backgrounds that fit
work_types:          [evaluation, annotation]
countries:           Summary with sources
payout_methods:      Official sources only
assessment_style:    General description, never specific test content
onboarding_steps:    [apply, identity, assessment, onboarding, first task] each with label official | reported | unknown
referral_status:     public | invitation_only | not_found | unavailable | confirmed_partner
referral_terms_url:  (if any)
reviewed_at:         date
corrections_contact: how to reach us
```

### 9.3 Check log entry format

`2026-10-14 | verified | Example Role | apply link works; countries listed on page; pay not stated`

Every status change creates a log row. The Live Check Console and the job page both read from this table.

### 9.4 Verification checklist (every listing, every check)

1. Open the official page directly, not through a third-party link.
2. Confirm the role or project is open and the apply link works.
3. Record countries exactly as the page states them. If the page is silent, mark Unconfirmed.
4. Record pay only if the page states it. Copy the exact basis (hourly, per task, project).
5. Note onboarding steps the page states (assessment, ID check, interview).
6. Confirm the company domain looks right and matches the platform profile.
7. Check for red flags: fees, chat-only contact, instant offers, mismatched domains.
8. Write a short original summary. Do not paste the employer's text.
9. Save, set next check date 14 days out, and add the log line.
10. If anything fails, mark Needs recheck or Closed and say why.

### 9.5 Starting guide list (12)

1. How to tell if an AI work listing is real (flagship, write first)
2. What the first month on an AI training platform usually looks like
3. Empty task queues: common causes and what to do
4. Instruction following: practice exercises you can do today
5. Checking claims against sources: a simple method
6. Reading a rubric the way a reviewer does
7. Getting paid from Nigeria: general options and what to confirm first
8. Why accounts get removed and how to lower the risk (general, reported)
9. Writing a clear short profile or CV for AI evaluation roles
10. Evaluation vocabulary explained (annotation, RLHF, rater, rubric)
11. Time and tax basics for contract work (general, point to a professional)
12. Building a portfolio of real evaluation samples

Outline for guides 1 to 3 is the first writing task. Each guide: summary, sections with sources, practice or checklist, sign-off, update date.

### 9.6 Scam-check checklist (10 points)

1. They ask you to pay for anything: a fee, a kit, a course, "training".
2. First contact came through WhatsApp, Telegram or social media, not a company email.
3. The offer came instantly with no real assessment.
4. They ask for a large check, a deposit or your bank login.
5. The interview is by text only.
6. The website address does not match the company, or copies a real company site.
7. Pay is far above normal for the work and nothing else is specific.
8. They push urgency ("answer today").
9. They ask for ID documents before any work is confirmed on an official portal.
10. You cannot find the role on the company's own official page.

If two or more are true, stop and use the report form.

### 9.7 First eight weeks of content

| Week | Publish |
|---|---|
| 1 | Launch with 10 verified roles, scam-check page, methodology, guide 1 |
| 2 | Guide 2, first newsletter, 2 platform profiles |
| 3 | Guide 3, 2 more platform profiles, Nigeria hub draft |
| 4 | Guide 4 with practice exercises, sample audit published |
| 5 | Guide 5, platform reality update |
| 6 | Guide 6, Nigeria hub live |
| 7 | Guide 7, compare page draft |
| 8 | Review analytics, decide Phase 1 priorities |

Weekly rhythm (30 minutes): verify 2 or 3 roles, publish one useful post or guide, send the digest, scan reports.

---

# PART C: DESIGN

## 10. Art direction and design system (futuristic)

### 10.1 Thesis

**A verification instrument from the near future.** The site must look and feel futuristic: dark-first, luminous, layered and precise, like an instrument built to check things. Underneath, it stays honest and fast. Within 10 seconds a visitor should think two things: this looks ahead of everything else in the space, and someone actually checked this.

Four qualities, in priority order: Exact, Calm, Warm, Fast. Futuristic is the look. These four are the behavior.

Why this direction: 2026 design write-ups point to dark-first palettes with vivid accents, spatial depth on flat screens, bento layouts, purposeful micro-interactions, and AI features that stay transparent and overridable. The same write-ups warn that glass effects and dark palettes create contrast and performance risks when overdone. We take the strong parts and keep the discipline.

Anti-goals: stock photos of laptops, fake live counters, popups, infinite feeds, crowded sidebars, cheap sci-fi cliches (matrix rain, fake hacker terminals, neon on everything, robot or brain imagery), purple-pink gradients, lens flares, and anything that resembles the scam sites we warn about.

Craft references to study, not copy: Linear, Vercel, Raycast and Stripe for dark-first depth, restraint, typography and motion discipline.

### 10.2 Concept: the Verification Instrument

- **The Seal.** A ring with an inner check mark. Logo, favicon, status glyph and loader. When a role shows Verified, the seal draws itself once (SVG stroke, about 500 ms).
- **Lighting and depth.** Three layers: base, raised, floating. Raised surfaces get a 1px top highlight and a faint inner glow. Floating layers add a soft shadow.
- **Rationed glow.** Only on focus, the primary button, Verified status and the active filter.
- **Static background.** Deep base color, one soft radial accent wash near the top, a faint SVG grid that fades out under a mask. No animated backgrounds.
- **Glass on two surfaces only.** The sticky header and bottom sheets. Static blur up to 12px, never animated, with an opaque fallback. Never combine glass with scroll-linked effects on the same element.
- **Data as visual language.** Small SVG sparklines and tick bars, mono readouts, tabular numerals, counters that tick up once on first view. Every number is real.
- **Live Check Console.** The hero shows real recent check events from the check log in mono type, newest on top, with a slow pulse on the newest line. If the log is quiet, show the last real events with true dates. Never fake data.

### 10.2a [v4] Additions to the concept from the two blueprints

**The Evaluation Graph (Studio hero, from ChatGPT's "Evaluation Nexus").** A bespoke inline SVG showing how one finding is made: Prompt, then Bot answer, then Source check, then Human verdict, then Report. Thin luminous lines connect the nodes. When the hero enters the viewport, a signal travels along the path once (stroke-dashoffset, about 1.2 s total), and each node lights as it is reached. A small legible panel beside it shows one real decision record from the sample audit. Rules:
- Nodes and glow sit behind the text layer, never across it.
- On mobile, the graph becomes a compact vertical sequence under the buttons.
- In Lite tier and with reduced motion, it renders fully lit and still.
- Under 10 KB of SVG, no canvas, no WebGL.

**Signal tracing (both blueprints).** The same travelling-signal treatment, used sparingly, marks progress in two other places only: the "How we verify" three steps on the home page and the scope form's step indicator. Nowhere else.

**Spotlight edge on cards (from Gemini, toned down).** On desktop with a fine pointer, in Full tier only, job cards and bento tiles show a faint radial highlight that follows the cursor along the card edge (a CSS radial gradient driven by two custom properties, updated with one passive pointermove listener, throttled with requestAnimationFrame). Opacity no higher than 0.08. Never on touch devices, never in Lite.

**Tactile press (from Gemini).** Primary buttons move down 1 px and lose a little glow when pressed. This replaces the scale-to-0.98 press on buttons only; cards keep the scale press.

**Solid where people read and type (from ChatGPT).** Glass stays limited to the header and bottom sheets. Tables, forms, the reading column and the sample audit sit on solid surfaces. Never put glow behind body copy.

**Every effect explains something (from ChatGPT).** An animation must show a real concept: a check happening, a step completing, a status changing. If it explains nothing, cut it.

### 10.3 Signature features (what people remember)

1. Freshness Stamp on every job: "Checked 2 days ago" with an age dot (fresh, aging, stale). Tap for the source and a check log.
2. Truth Strip on every job: Eligibility, Pay basis, Onboarding, Last checked, each with icon and source link.
3. Country-first: a country chip in the header, remembered, personalizing everything.
4. Expectation timeline on platform profiles with Official, Reported, Unknown labels.
5. Auditable by design: public methodology and a per-listing change log.
6. The Studio proves itself: the sample audit is rendered as a real report using the same status system.
7. Command palette: Ctrl or Cmd plus K on desktop, a full-screen search sheet on mobile.
8. Transparent AI layer (Phase 2): "Ask the checker" answers only from our verified database, cites the listing and check date, says when it does not know.
9. Bento home grid with tiles that each have one job.
10. Lite mode: a footer toggle, and automatic when the visitor's device or settings call for it.

### 10.4 Color tokens

The palette builds on obsidian deep space, crisp white text, and focused functional accents. Every text pairing is mathematically audited to surpass WCAG 2.2 AA (minimum 4.5:1 contrast ratio) against dark canvas surfaces.

| Token | Hex | Role | Contrast Ratio against #070B16 |
|---|---|---|---|
| `--bg-void` | `#070B16` | Deep base canvas | Base (1:1) |
| `--bg-surface` | `#0B1222` | Cards, panels, input backgrounds | Surface layer |
| `--bg-elevated` | `#142039` | Hover states, active tabs, dropdown menus | Layer contrast |
| `--border-subtle` | `#25334B` | Structural border lines, dividers (decorative) | Non-text decorative |
| `--border-focus` | `#3DEBFF` | Active input borders, highlighted card edges | Accent boundary |
| `--text-primary` | `#F5F8FC` | Headings, primary body copy, button labels | **18.2:1 (Passes AAA)** |
| `--text-secondary` | `#94A3B8` | Subtitles, metadata, timestamps, table text | **6.5:1 (Passes AA)** |
| `--text-readable` | `#CBD5E1` | Long-form guide body text, terms, descriptions | **11.4:1 (Passes AAA)** |
| `--accent-cyan` | `#3DEBFF` | Brand accent: active states, key data phrases, hero link | **13.5:1 (Passes AAA)** |
| `--accent-emerald` | `#45F5C5` | Status: Verified active, passed check, official source | **14.2:1 (Passes AAA)** |
| `--accent-violet` | `#8B7CFF` | Studio accent: model evaluation data, citation spans | **7.8:1 (Passes AA)** |
| `--accent-amber` | `#FFC66D` | Status: Needs recheck, reported by community, caution | **13.1:1 (Passes AAA)** |
| `--accent-danger` | `#FF6B6B` | High risk alert, closed listing, expired deadline | **6.2:1 (Passes AA)** |

*Accessibility Rule:* Never use low-contrast grey (`#475569`) for readable text on `#070B16`. Secondary text must strictly use `--text-secondary` (`#94A3B8`) or `--text-readable` (`#CBD5E1`).

### 10.5 Typography

A geometric technical display face for headlines and large numbers, a clean sans for UI and body, a mono face for readouts. Starting suggestion, all open licensed: Sora (display), Geist Sans (UI and body), Geist Mono (dates, pay, counts, tabular figures). The agent confirms licenses and may substitute equivalents after a visual test.

Loading rules:
- Self-host WOFF2, subset to Latin plus Latin Extended.
- Prefer variable files only where they save bytes.
- font-display swap, with a fallback face tuned using size-adjust and ascent-override to prevent layout shift.
- Preload only the single critical file.
- Keep all fonts to roughly 100 KB total. If over budget, the display face becomes headings-only and body uses the system font.
- In the Lite tier, or when the browser sends Save-Data, skip webfonts entirely.

Scale (fluid with clamp):

| Role | Mobile | Desktop | Notes |
|---|---|---|---|
| Display / H1 | 34 px [v4, was 30] | 60 px [v4, was 52] | display face, tight leading (1.05 to 1.1), tracking -0.02em, no more than 3 lines on mobile |
| H2 | 24 px | 34 px | display face |
| H3 | 19 px | 22 px | UI sans, semibold |
| Body | 17 px | 18 px | line height 1.55, measure 60 to 70 characters |
| Small | 14 px | 14 px | metadata, captions |
| Readout (mono) | 13 px | 14 px | tabular figures, dates, counts, pay |

Sentence case everywhere. No all-caps paragraphs. Tiny all-caps labels are allowed only for the Truth Strip cell labels.

[v4] Both blueprints suggested Space Grotesk as a display option, and Gemini suggested JetBrains Mono for readouts. Either may replace Sora or Geist Mono after a side-by-side test on a real phone, as long as the 100 KB font budget holds. One short phrase in a headline may be colored signal cyan; never a gradient across the whole headline.

### 10.6 Layout, spacing and shape

- 4 px spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- One column on mobile. 12-column grid on desktop, 1200 px maximum content width, 680 px reading column for guides.
- Bento tiles: 12 px gaps on mobile, 16 px on desktop.
- 14 px radius on cards and sheets, full pills for chips and badges.
- Borders over shadows. Shadows only on floating layers.
- Tap targets 44 px minimum with space between.
- Generous rhythm around decisions (Apply, Filter), tighter inside cards.
- [v4] Breakpoints (from the ChatGPT blueprint): below 390 px prevent overflow and wrap labels; 390 to 767 px single column, simplified effects; 768 to 1023 px stack dense blocks, no three-column text cards; 1024 px and up full composition. Test at 360 px as the smallest common width.

### 10.7 Status system

| Status | Icon | Word | Color token | Meaning |
|---|---|---|---|---|
| Verified | seal-check | Verified | verified | Official source checked within 14 days |
| Needs recheck | clock | Needs recheck | recheck | 14 to 30 days since check |
| Closed | archive | Closed | closed | Role closed or link dead |
| Accepted | check | Accepted | verified | Country accepted per official source |
| Not accepted | slash | Not accepted | not-accepted | Country not accepted per official source |
| Unconfirmed | help-circle | Unconfirmed | unconfirmed | Official page silent |
| Official | seal | Official | signal | Fact from the platform's official page |
| Reported | users | Reported | unconfirmed | Worker-reported, not confirmed |

### 10.8 Icons and imagery

- One icon set (Lucide), 1.5 px stroke, 20 px default. Custom Seal and status glyphs as inline SVG.
- No stock photography. Visuals are typographic, data-driven or simple diagrams.
- Platform logos only where the platform permits it. Otherwise a monogram tile. Always state that we are independent and unaffiliated, and use platform names only to identify them.
- Open Graph cards generated per job and guide from the same tokens.

### 10.9 Motion

Short, purposeful, tied to meaning.
- The Verified seal draws itself. Status dots pulse slowly (opacity only, paused when off-screen).
- List to detail uses a view transition where supported, so the title and badge morph.
- Elements reveal on scroll using CSS scroll-driven animations where supported, and simply appear elsewhere.
- Press feedback: scale to 0.98 and a brief glow change. Hover sheen on desktop pointers only.
- Never animate blur radius, layout properties or large shadows. Animate opacity and transform only.
- 120 to 250 ms with ease-out. No more than two ambient animations on screen at once.
- No parallax, no scroll-jacking, no autoplay.
- Everything respects prefers-reduced-motion and the Lite tier.

### 10.10 Capability tiers (how futuristic stays fast)

Countersign guarantees that visitors in Lagos on 3G mobile experience the exact same speed and legibility as enterprise buyers in San Francisco on fiber broadband:

**1. Full Tier (Fast broadband, desktop, modern mobile):**
- Hardware-accelerated CSS subtle spotlight edges on interactive cards.
- Smooth CSS view transitions between list and detail views.
- Monospace telemetry status indicators with subtle kinetic glow.
- Strict budget: <180 KB compressed total page payload; zero heavy 3D WebGL or canvas dependencies.

**2. Data-Saver Tier (Mobile data, slow connections, user preference):**
- **Permanent Navigation Switch:** A clean toggle button permanently anchored in the header menu: `[Data-Saver: ON/OFF]`.
- **Automatic Connection Detection:** Automatically activates if `navigator.connection && (navigator.connection.saveData === true || ['slow-2g', '2g', '3g'].includes(navigator.connection.effectiveType))`.
- **Under the Hood:**
  - All blur filters and background radial gradients are suppressed.
  - Surfaces render as crisp solid hex with 1px border lines.
  - Images are constrained to inline SVGs.
  - Payload stays strictly **under 48 KB** total.
  - Initial server-rendered HTML renders in under 500 ms on mobile networks.

### 10.11 Component inventory

| Component | What it must do | Key states |
|---|---|---|
| Header | Wordmark with Seal, country chip, search, menu. Glass in Full tier, compresses on scroll. | default, scrolled, menu open |
| Country chip and selector | Searchable list, recent countries, remembered in the browser, no account needed. | closed, open, no results |
| Search and command palette | Jump to platform, country, guide or job, with recent items. Keyboard first on desktop. | closed, open, results, empty |
| Job card | Title, platform, work type, eligibility badge for the selected country, verified pay if any, Freshness Stamp, status badge. Whole card tappable. | default, focus, pressed, saved, closed, skeleton |
| Status badge | Icon, word and color. Tap opens a short explanation with date and source. | all statuses in 10.7 |
| Freshness Stamp | Age text plus age dot. Tap shows source and check log. | fresh, aging, stale |
| Truth Strip | Four facts with icon, value and source link. 2 by 2 grid on mobile. | all known, some unconfirmed, closed |
| Filter bar and sheet | Applied chips with one-tap removal and Clear all. Mobile bottom sheet with live count on the apply button. Desktop 280 px sidebar. Zero-result options disabled with counts. | idle, open, applying, zero results |
| Expectation timeline | Five steps, each with a source label. | official, reported, unknown |
| Platform header | Name, official link, referral disclosure, last reviewed date. | referral public, none, unknown |
| Compare table | Sticky first column, horizontal scroll with edge shadows. Up to 4 platforms. | loading, overflow |
| Bento tile | One job per tile. Press shifts depth slightly. | default, hover, pressed |
| Live Check Console | Real recent check events in mono type, newest first, slow pulse on top line. | live, quiet (hidden), loading |
| Guide layout | Reading time, last updated, author, sources, desktop table of contents, sign-off. | default |
| Email capture | One field, inline validation, consent line, success shown in place. | idle, error, success |
| Report form | Short structured form with bot protection and a note on what happens next. | idle, sending, sent, failed |
| Sample audit case card | Prompt, source excerpt, output, verdict, root cause, fix. | pass, fail, uncertain |
| [v4] Evaluation Graph | Five-node SVG with a one-time signal trace, real decision record beside it. | animating, lit (static), mobile vertical |
| [v4] Comparison panel | Tabs for prompt, answer, source, verdict. Keyboard arrows switch tabs. | each tab, focus |
| [v4] Stepper (scope form) | Three steps with signal tracing between them, back and next, keeps answers. | step 1 to 3, error, submitted |
| [v4] Constraint checker | Live sentence and word count against a limit, icon plus word. | within, over, empty |
| [v4] Chart | Named axes, units, a source note and an accessible table alternative. Uses signal and data-2 only. | loading, empty, data |
| Toast | Brief confirmation, never blocks. | info, success, error |
| Empty and error states | Specific and kind with a next action. | n/a |
| Skeletons | Match final layout to avoid shift. | n/a |

### 10.12 Page layout rules

- Home (mobile order): promise and search, country chip with today's count, Live Check Console, five latest cards, How we verify, bento tiles, newsletter, footer. One primary action per screen.
- Jobs list: sticky bar with search and Filters, chips row, one column of cards, Load more with URL state.
- Job page: title, Truth Strip, sticky bottom Apply bar on mobile with disclosure line, What to expect, details, requirements, what we could not confirm, check log, related roles, report link.
- Platform page: header, Expectation timeline, open roles, community experience (Phase 1), guides.
- Evaluation Studio: calmer and more editorial than the job pages. Plain pitch, sample audit as a report, honest scope. No invented logos or counts.

### 10.13 Accessibility (WCAG 2.2 AA target)

- Contrast as in 10.4, tested in both themes and with glow on.
- Full keyboard use, a visible accent focus ring, a skip-to-content link, logical heading order.
- Touch targets at least 44 px.
- Never color alone: every status has an icon and a word.
- Filter changes announce result counts to screen readers through a live region. Sheets trap focus and close on Escape.
- Forms: visible labels (never placeholder-only), errors tied to fields, correct autocomplete attributes.
- Respect reduced motion. Layouts hold at 200 percent zoom and larger system font sizes.
- Language attributes, plain language, alt text only for informative images.
- Automated axe checks in CI plus a manual TalkBack pass on Android before launch.

### 10.14 Design acceptance

- Tokens file and component gallery exist and show every state in both themes and all three tiers.
- In a test with 5 people, at least 4 describe the site as modern or advanced within 5 seconds, and at least 4 still say they would trust it.
- Lighthouse mobile performance stays at 90 or above on key pages.
- Checked on a real Android 10 or 11 phone in Full and Lite tiers.

---

# PART D: ENGINEERING

## 11. Architecture and stack

Choose boring, fast, free-tier friendly tools. The coding agent MUST pin exact current stable versions and avoid anything released in the last two weeks. Check each tool's current free-tier terms before relying on them.

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (App Router), TypeScript | Server components by default. Static generation with timed revalidation for job, platform and guide pages. |
| Styling | Tailwind CSS with CSS variable tokens (section 10.4) | No runtime CSS-in-JS. |
| Database | Postgres (Supabase, or Neon with Auth.js) | Row level security on user tables. |
| Auth | Email magic link, Phase 1 only | No passwords. Admin gets 2FA. |
| Hosting | Vercel free tier to start | CDN, Brotli, edge caching. |
| Email | Resend for transactional, a newsletter tool such as Buttondown for digests | Double opt-in. |
| Analytics | Privacy-friendly (Plausible or Umami) | No cookies if possible, so no cookie banner needed. |
| Forms | Server actions, Zod validation, Cloudflare Turnstile | |
| Search | Postgres full-text first | Revisit when volume grows. |
| Content | Guides in MDX or markdown in the repo | |
| Testing | Vitest, Playwright, axe-core, Lighthouse CI | |
| Errors | Sentry free tier or similar | No personal data in events. |
| [v4] Geo hint | Hosting platform's country header | Prefills the country chip only. Never stored. |

[v4] Gemini's stack adds Upstash Redis, server-sent events, BroadcastChannel tab sync, Inngest, Arcjet, Persona ID checks, Stripe metered billing, Paystack and Wise payouts, Three.js and Framer Motion. None of that is needed for a site with tens of verified roles and no payments. Each one adds cost, keys to protect and things to break. They are deferred until a feature in section 26 needs them. If the bot protection or rate limiting in the table above falls short, Arcjet is an acceptable swap.

[v4] Pin the framework to its current stable version and follow that version's own docs. Gemini's note that Next.js 15 and later pass route params as Promises that must be awaited is an example of version-specific behavior the agent must check, not assume.

Repo structure:

```
/app                 routes (public, /admin, /account)
/components          ui primitives and feature components
/lib                 db, validation, seo, status rules, tiers
/content             guides (mdx), static copy
/db                  schema, migrations, seed
/scripts             recheck reminders, sitemap helpers
/public              seal svg, og fonts, icons
/tests               unit, e2e, a11y
```

Environment: separate dev and production. Secrets only in environment variables. A seed script creates 5 platforms and sample jobs that are clearly marked SAMPLE and hidden in production.

---

## 12. Data model

Postgres. Adjust types to the chosen provider.

```sql
create type job_status as enum ('verified','needs_recheck','closed','unconfirmed');
create type elig_status as enum ('accepted','not_accepted','unconfirmed');
create type link_type as enum ('direct','referral');
create type referral_status as enum ('public','invitation_only','not_found','unavailable','confirmed_partner');
create type label_kind as enum ('official','reported','unknown');

create table platforms (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  official_url text not null,
  description text,
  who_it_suits text,
  payout_methods text,
  assessment_style text,
  referral referral_status not null default 'not_found',
  referral_terms_url text,
  last_reviewed_at timestamptz,
  created_at timestamptz default now()
);

create table platform_steps (
  id uuid primary key default gen_random_uuid(),
  platform_id uuid references platforms(id) on delete cascade,
  position int not null,              -- 1 apply, 2 identity, 3 assessment, 4 onboarding, 5 first task
  title text not null,
  detail text,
  label label_kind not null default 'unknown',
  source_url text
);

create table jobs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  platform_id uuid not null references platforms(id),
  title text not null,
  work_type text not null,
  domains text[] default '{}',
  languages text[] default '{}',
  summary text not null,              -- our own words
  requirements text,
  pay_text text,
  pay_verified boolean not null default false,
  pay_source_url text,
  official_url text not null,
  apply_url text not null unique,
  link link_type not null default 'direct',
  status job_status not null default 'unconfirmed',
  last_checked_at timestamptz,
  next_check_at timestamptz,
  closed_at timestamptz,
  created_by uuid,
  created_at timestamptz default now(),
  search tsvector
);
create index jobs_status_idx on jobs(status, last_checked_at desc);
create index jobs_search_idx on jobs using gin(search);

create table countries (
  code char(2) primary key,
  name text not null,
  notes text
);

create table job_eligibility (
  job_id uuid references jobs(id) on delete cascade,
  country_code char(2) references countries(code),
  status elig_status not null,
  source_url text,
  checked_at timestamptz not null default now(),
  primary key (job_id, country_code)
);

create table check_log (
  id bigserial primary key,
  job_id uuid references jobs(id) on delete cascade,
  platform_id uuid references platforms(id),
  result job_status not null,
  note text not null,
  checked_by uuid,
  checked_at timestamptz not null default now()
);

create table guides (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  tags text[] default '{}',
  published_at timestamptz,
  updated_at timestamptz
);

create table users (            -- Phase 1
  id uuid primary key,
  email text unique not null,
  country_code char(2),
  interests text[] default '{}',
  consent_marketing boolean not null default false,
  consent_at timestamptz,
  created_at timestamptz default now()
);

create table saved_jobs (user_id uuid references users(id) on delete cascade, job_id uuid references jobs(id) on delete cascade, primary key (user_id, job_id));

create table alert_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  user_id uuid,
  country_code char(2),
  work_types text[] default '{}',
  frequency text not null default 'weekly',
  confirmed_at timestamptz,
  created_at timestamptz default now()
);

create table reports (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('job_problem','platform_experience','scam')),
  target_id uuid,
  body text not null,
  contact_email text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz default now()
);

create table eval_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  work_email text not null,
  company text,
  product_url text,
  message text,
  created_at timestamptz default now()
);

create table audit_log (
  id bigserial primary key,
  actor uuid,
  action text not null,
  entity text not null,
  entity_id uuid,
  diff jsonb,
  at timestamptz default now()
);

-- [v4] additions ------------------------------------------------------

alter table jobs add column degree_levels text[] default '{}';  -- only when the official page states them

alter table eval_leads
  add column reference_id text unique,          -- e.g. EV-2026-0042
  add column service text,
  add column volume text,
  add column source_type text,                  -- public docs | private docs
  add column timeline text,
  add column has_rubric boolean,
  add column sensitivity text,
  add column status text not null default 'new'
    check (status in ('new','replied','call_booked','pilot','won','lost')),
  add column idempotency_key text unique;       -- stops double submits

create table outbound_clicks (                  -- anonymous, from /go/[id]
  id bigserial primary key,
  job_id uuid references jobs(id) on delete set null,
  link link_type not null,
  country_code char(2),                         -- the chip value, not geolocation
  clicked_on date not null default current_date
);
create index outbound_clicks_job_idx on outbound_clicks(job_id, clicked_on);

create table consent_log (                      -- append-only
  id bigserial primary key,
  email_hash text not null,                     -- sha-256 of the lowercased email
  purpose text not null check (purpose in ('newsletter','alerts','eval_contact','account')),
  policy_version text not null,
  given boolean not null,                       -- false records a withdrawal
  at timestamptz not null default now()
);

create table privacy_requests (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('access','correction','deletion','withdraw_consent','objection')),
  contact_email text not null,
  received_at timestamptz not null default now(),
  due_at timestamptz not null default now() + interval '30 days',
  closed_at timestamptz,
  note text
);

create table incident_log (                     -- data breaches and near misses
  id uuid primary key default gen_random_uuid(),
  detected_at timestamptz not null,
  report_due_at timestamptz not null,           -- detected_at + 72 hours, see 17.2a
  summary text not null,
  data_categories text[] default '{}',
  people_affected_estimate int,
  reported_at timestamptz,
  status text not null default 'open' check (status in ('open','reported','closed'))
);
```

Rules:
- A DB function or server code keeps `jobs.status` consistent with `last_checked_at` (see section 13.2).
- Row level security on `users`, `saved_jobs`, `alert_subscriptions` so a person only sees their own rows. Admin uses a service role on the server only.
- `reports` and `eval_leads` are write-only for the public. Reads are admin only.
- Seed `countries` with all ISO countries. Sort Nigeria first in the selector.
- [v4] `outbound_clicks`, `consent_log`, `privacy_requests` and `incident_log` are server-write, admin-read. Enable row level security on every table, including these, with explicit policies (a rule both blueprints stress).
- [v4] Seed data never includes real company case studies, real pay figures or real platform claims. Gemini's seed plan loads other companies' published results (for example a named customer's precision gain) as if they were ours; that is rejected.

---

## 13. Verification workflow and admin

### 13.1 Sourcing rules

1. **Official Feeds Only:** Every job record must come directly from an official company career feed (Ashby, Greenhouse, Lever, Workable) or an authorized employer partnership.
2. **Zero Aggregator Scraping:** Countersign never scrapes third-party job boards, community aggregators, or unverified social media posts. This prevents stale listings, copyright issues, and scraper IP bans.
3. **Automated Nightly Link Ping Helper:**
   - A scheduled serverless cron worker (`/api/cron/verify-links`) runs nightly at 02:00 UTC.
   - It performs an HTTP HEAD or lightweight GET request on every active external `apply_url`.
   - If a URL returns HTTP 404, 410, an unexpected redirect, or text signatures indicating closed applications, the listing is automatically flagged as `needs_review` in the admin queue.
   - **Crucial Rule:** The nightly link ping *assists*, but does *not* replace the mandatory human 14-day recheck. A 200 OK HTTP response only proves the server responded; it does not confirm the platform is still actively hiring or reviewing applicants.
4. **Mandatory 14-Day Human Recheck:** Every listing must be manually re-verified by an editor every 14 days. If not rechecked by day 15, the status automatically degrades to `needs_recheck` and is hidden from the main verified feed.

### 13.2 Status rules

- Verified: official source checked within the last 14 days.
- Needs recheck: 14 to 30 days since the last check. Shown with a visible warning.
- Closed or hidden from lists: link dead, role closed, or unverified past 30 days. The URL stays alive with a Closed banner.
- A scheduled job runs daily: set `needs_recheck` at 14 days and hide from lists at 30 days. It writes a check_log row for each automatic change.

### 13.3 Eligibility rules

Never infer worldwide eligibility from the word remote. If the official source does not state countries, mark Unconfirmed and say so on the page.

### 13.4 Admin screens

1. **Dashboard.** Verified count, share checked in the last 14 days, recheck queue (sorted by next_check_at), open reports, new leads.
2. **Jobs.** List with filters, quick edit, "Mark checked" button (updates dates and adds a log row in two taps), Close button.
3. **Job editor.** Form that mirrors the template in 9.1. Eligibility grid by country. Preview of the public page.
4. **Platforms.** Editor with the five timeline steps and their labels.
5. **Reports.** Queue with approve, reject, reply by email. Moderation notes.
6. **Leads.** Evaluation leads with status (new, replied, call booked, pilot, closed).
7. **Subscribers.** Counts only in the UI; exports restricted.
8. **Audit log.** Who changed what, when.

Admin MUST be quick: adding a job under 2 minutes, marking a recheck under 15 seconds. Mobile-friendly, because Jo may update from a phone.

### 13.5 Community experience reports (Phase 1)

- Structured form: platform, month and year, onboarding paid or unpaid, tasks available, removed or not, free-text note (optional).
- Moderate before publishing. No staff names. No accusations stated as fact.
- Publish only aggregated counts with sample size and date range. Label as unverified self-reports.
- Offer platforms a right of reply and a takedown or correction path.

---

## 14. Routes, server actions and integrations

| Route or action | Purpose | Notes |
|---|---|---|
| GET /jobs | List with filters via query params | Cached, revalidated on admin save |
| GET /jobs/[slug] | Detail | Static with revalidation |
| GET /platforms, /platforms/[slug] | Directory and profile | Static with revalidation |
| GET /countries/[code] | Hub | Phase 1 |
| GET /guides, /guides/[slug] | Guides | MDX, static |
| POST action subscribeNewsletter | Create pending subscriber, send confirm | Turnstile, rate limit |
| GET /api/confirm?token= | Confirm email | Signed, expiring token |
| POST action submitReport | Create report | Turnstile, rate limit, honeypot |
| POST action submitLead | Create eval lead and notify Jo | Turnstile, rate limit |
| POST action markChecked (admin) | Update check dates and log | Auth and role check |
| GET /api/jobs.json | Public read-only list for the command palette | Cached, small |
| GET /rss.xml | New verified roles | |
| [v4] GET /go/[id] | Count anonymous click, 302 to official URL | Redirect outside try/catch; logging failure never blocks the redirect |
| [v4] POST action submitScope | 3-step scope form, issues reference ID | Turnstile, rate limit, idempotency key, auto-reply quoting the ID |
| [v4] POST action submitPrivacyRequest | Access, correction, deletion, withdrawal requests | Creates privacy_requests row, emails Jo, 30-day due date |
| [v4] Cron (daily) | Email Jo about privacy requests due within 7 days and open incidents | |
| Cron (daily) | Status sweeper, recheck reminder email to Jo | |
| Cron (weekly) | Build and send digest draft to Jo for review | Never auto-send in v1 |

Integrations: email provider, Turnstile, analytics, error monitoring. Each integration is optional behind environment variables so local development works offline.

---

## 15. SEO and structured data

- Server-render every public page. Clean URLs, one H1 per page, descriptive titles and meta, canonical tags, sitemap.xml, robots.txt, Open Graph images generated per job and guide.
- JobPosting structured data (JSON-LD) only on a single job's detail page, never on list pages, and only behind a feature flag. Data in the markup must match what is visible on the page. Mark closed jobs closed or remove the markup. Only use it where the page genuinely holds the posting details we are entitled to publish. Before enabling it, read Google's current JobPosting guidelines and test with the Rich Results Test. Eligibility for rich results is never guaranteed, and misuse can cause a manual action.
- Other structured data: Organization, WebSite with SearchAction, BreadcrumbList, Article for guides, FAQPage only where a real FAQ is visible.
- Programmatic pages (country hubs, platform pages) must have unique, useful content. Thin template pages are a risk.
- Internal links: jobs to platform to country to guides.
- Content engine: one strong guide or platform update per week. Target real searches such as how to check if an AI training job is legit, empty task queue explainers, and country-specific eligibility questions.

Example JSON-LD shape (flagged feature, fill from real data only):

```json
{
  "@context": "https://schema.org/",
  "@type": "JobPosting",
  "title": "Example Role Title",
  "description": "<p>Our own short summary. See the official page for the full posting.</p>",
  "datePosted": "2026-10-14",
  "validThrough": "2026-11-13T00:00:00Z",
  "employmentType": "CONTRACTOR",
  "hiringOrganization": { "@type": "Organization", "name": "Example Platform", "sameAs": "https://example.com" },
  "jobLocationType": "TELECOMMUTE",
  "applicantLocationRequirements": { "@type": "Country", "name": "Nigeria" }
}
```

---

## 16. Performance and capability tiers

Google's published good thresholds are LCP 2.5 s or less, INP 200 ms or less and CLS 0.1 or less, judged at the 75th percentile of real users. We aim tighter because our users have weaker devices and pay for data.

Targets at p75 on a mid-range Android over 4G:
- LCP 2.0 s or less. The LCP element (headline or first card) is in the raw server HTML.
- INP 200 ms or less. CLS 0.05 or less, with no font-caused shifts.
- Weight: home page first visit 250 KB or less including fonts and images. Initial JavaScript 150 KB gzipped or less on any page. No decorative image above 30 KB.
- Images: AVIF or WebP, explicit width and height, lazy-loaded below the fold.
- Save-Data: skip webfonts, non-essential images and prefetching.
- Delivery: static generation with timed revalidation, CDN caching, Brotli compression.
- Progressive enhancement: jobs, guides and platform pages read fine with little or no JavaScript.
- Measure real users with the web-vitals library, since Google ranks on field data and not only lab scores.
- Support: the last two years of Chrome and Samsung Internet on Android 10 or newer, Safari on iOS 16 or newer, and basic readability in Opera Mini.

Tier selection sketch (decide by feature, remember the choice):

```ts
// lib/tiers.ts (sketch)
export function chooseTier(): "full" | "lite" {
  const prefersLite =
    localStorage.getItem("tier") === "lite" ||
    matchMedia("(prefers-reduced-motion: reduce)").matches ||
    matchMedia("(prefers-reduced-data: reduce)").matches ||
    // @ts-ignore network hints are not in every browser
    (navigator.connection && (navigator.connection.saveData || /2g|3g/.test(navigator.connection.effectiveType))) ||
    // @ts-ignore
    (navigator.deviceMemory && navigator.deviceMemory <= 2);
  return prefersLite ? "lite" : "full";
}
// Set <html data-tier="..."> early (inline, tiny) to avoid a flash.
```

---

## 17. Security, privacy and legal

### 17.1 Security checklist

- HTTPS everywhere, HSTS, strict security headers and a CSP.
- Rate limit forms and sign-in. Bot protection on every public form.
- Server-side validation and output escaping. Parameterized queries only.
- Admin behind strong auth with 2FA, role-based access and an audit log.
- Row level security on all user tables. No secrets in client bundles.
- Backups and a tested restore. Error monitoring with no personal data.
- Pinned dependencies, committed lockfile, automated vulnerability checks.
- Never log full emails in analytics events.
- [v4] From the ChatGPT blueprint: write a one-page threat model before M3 covering the public forms, admin sign-in, the redirect route, the lead data and the privacy request path. Check the build against the current OWASP Top 10 (ChatGPT cites the 2025 edition; confirm the latest). Test a database restore before taking the first client lead. Treat anything a visitor or client submits (form text, URLs, later any prompts or model outputs) as untrusted: escape it, never execute it, and never send client data to an outside AI service without written permission.
- [v4] Separate secrets and settings for development, preview and production. Preview deployments never connect to the production database.

### 17.2 Privacy

- Collect the minimum: email, country, optional work interests.
- Clear opt-in consent for emails, timestamped. Easy unsubscribe and delete-my-data.
- Retention: unsubscribed emails removed after 30 days, closed reports anonymized after 12 months, leads kept while the conversation is active, then deleted on request.
- Follow Nigeria's data protection law (the Nigeria Data Protection Act 2023 and its regulator). Treat other regions' rules as relevant to visitors. Check with a Nigerian lawyer on any registration duties.
- Aggregate and anonymous only when using data in client pitches (for example, share of visitors by country), and only real numbers. Never sell or share individual details.

### 17.2a [v4] Nigeria data protection: practical build rules

The Gemini blueprint went deep on the Nigeria Data Protection Act 2023 and the NDPC's General Application and Implementation Directive (GAID) 2025. The points below are worth building in now, because they are cheap and protect Jo. The specific figures Gemini gave (registration tiers by number of people whose data you hold in six months, fees, penalties) were not verified for this plan. Confirm them on the NDPC's official site and with a Nigerian lawyer before acting on them.

Build now:
1. Consent is never pre-ticked, never bundled, and always recorded with time and policy version (consent_log).
2. A privacy request path (form plus email) for access, correction, deletion and withdrawal, tracked with a 30-day due date (privacy_requests). Confirm the exact legal deadline with the lawyer.
3. An incident procedure: log any breach or near miss the moment it is found (incident_log), with a 72-hour reporting clock shown in admin. Gemini reports the NDPA requires notifying the regulator within 72 hours of discovering a breach; confirm and write the steps into a one-page runbook.
4. A short record of processing (a markdown file in the repo is enough at the start): what data, why, where it is stored, which processors (hosting, email, analytics), how long it is kept.
5. Data leaves Nigeria the moment it sits on a foreign cloud host or email tool. Name those processors and their countries in the privacy policy, and check with the lawyer what the Act requires for these transfers.

Watch, do not build yet:
- Gemini reports that controllers above certain thresholds must register with the NDPC, and that profiling or automated scoring of people needs a data protection impact assessment. v1 collects only emails and a country, with no profiling, so this is unlikely to bite early. It becomes real the moment Phase 1 or 2 adds evaluator profiles, assessments or ID checks. Before building any of those, get a lawyer's view and do the assessment.
- Gemini's "compliance command center" dashboard with live threshold counters and filing generators is overkill for v1. The tables above plus a monthly check are enough.

### 17.3 Legal pages to write before launch

1. **Privacy policy:** what we collect, why, how long, who processes it (hosting, email, analytics), rights and how to exercise them, contact.
2. **Terms of use:** independent information service, no guarantee of acceptance or income, user-submitted reports, acceptable use, limitation of liability, governing law (confirm with a lawyer).
3. **Referral disclosure:** when we earn from a link, how links are labeled, that earnings never affect ranking or verification status.
4. **Corrections and takedown:** how a platform or person asks for a fix and our response time.
5. **Contact.**

### 17.4 Content rules

- Never publish confidential assessment questions or answers.
- Never charge job seekers. Never ask for ID documents. Never message first.
- Use platform names only to identify them. State independence on every page footer.
- Do not copy full job descriptions or logos without permission.
- Check each platform's terms before promoting it or using referral links, and check Jo's own contractor agreements for conflicts or confidentiality clauses.

---

## 18. Analytics and KPIs

### 18.1 Events

home_view, country_selected, search_used, hero_cta_click, filter_used, sort_changed, job_card_click, load_more, job_view, truth_strip_source_click, apply_click (with link_type), report_problem_open, report_problem_submit, platform_view, platform_official_click, timeline_expand, guide_read (scroll 75 percent), newsletter_signup, alert_signup, scam_check_view, scam_report_submit, studio_view, sample_audit_open, eval_form_submit, lite_mode_toggle.

[v4] Added: outbound_redirect (server side, from /go/[id]), scope_step_completed (step number), scope_submit, service_page_view (service), comparison_tab_change, practice_exercise_submit (client only, no text sent), platform_country_view, privacy_request_submit, country_label_change.

### 18.2 Weekly dashboard

| Metric | Why |
|---|---|
| Verified active roles | Supply |
| Share checked within 14 days | Trust and discipline |
| Unique and repeat visitors | Audience and usefulness |
| Apply clicks per role and by link_type | Value of listings |
| Newsletter and alert signups | Retention potential |
| Top countries | Where to build hubs |
| Lite versus Full tier share | Device reality |
| p75 LCP, INP, CLS from real users | Performance |
| Reports received and resolved | Quality |
| Eval leads, calls, pilots | The business that earns |
| Hours spent on listings per week | Sustainability |

A useful rule: clicks validate interest, repeat visits validate usefulness, partner approval validates the referral route, and paid pilots validate commercial demand. They are different milestones.

---

## 19. Testing and QA

| Layer | Tooling | What it covers |
|---|---|---|
| Unit | Vitest | Status rules, freshness calculation, eligibility logic, slug generation, tier selection |
| Component | Playwright component tests or Storybook | Every state of every component in 10.11, both themes |
| End to end | Playwright | Choose country, filter, open a job, apply (link out), subscribe, report a problem, submit a lead |
| Visual | Screenshot tests at 360, 390, 768, 1280 px, light and dark, Full and Lite | No regressions |
| Accessibility | axe-core in CI, manual TalkBack pass | Zero serious issues |
| Performance | Lighthouse CI with budgets that fail the build, WebPageTest on throttled 4G | Budgets in section 16 |
| Security | Dependency audit, header checks, form abuse tests | Section 17.1 |
| Content | Link checker, spell check, "no em dash" and tone lint on copy | No broken links, no typos |
| Device | A real mid-range Android (Android 10 or 11) | Full and Lite tiers |
| [v4] Permissions | Integration tests with anonymous, user and admin roles | Every table's row level security policy, admin-only reads, a user cannot read another user's rows |
| [v4] Forms | Integration tests | Double submit creates one lead, redirect still works when click logging fails, privacy request gets a due date |
| [v4] States | Component tests | Loading, empty, success, recoverable error, validation error, permission denied, expired session for every form and admin screen |

Human tests for Jo with 5 Nigerian job seekers: a 5-second test (what does this site do, would you trust it, does it look modern; target 4 of 5 positive on each) and a task test (find a role open to your country, then say how fresh the information is).

---

# PART E: EXECUTION

## 20. Milestones and prompts for the coding agent

Build in order. Each milestone must meet its acceptance criteria before the next starts. Paste the master prompt first, attach this whole file, then give one milestone prompt at a time.

### 20.1 Master prompt

```
You are building the website described in the attached plan. Read the whole plan first.

Rules:
- Follow the plan's sections exactly. Where something is marked OPEN, pick the safest default and list it in a DECISIONS.md file for me to confirm.
- Build mobile first and test at 360 px. Dark theme is the default.
- Futuristic look comes from CSS and SVG only. No WebGL, video, Lottie or heavy animation libraries.
- Respect the budgets in section 16 and the tiers in section 10.10. Build the Lite tier from the start, not at the end.
- Never invent data. Seed content must be clearly marked SAMPLE and hidden in production.
- No em dashes in any copy. Keep copy plain, specific and short.
- Pin exact current stable versions. Avoid packages released in the last two weeks.
- Work in small commits. After each milestone, run the tests and report what passed, what failed and what you changed.
- Do not add features that are not in the plan.
- [v4] Before writing code, inspect the repository and anything already built. Do not overwrite working features or rewrite wholesale.
- [v4] Never say an integration works until it is configured and tested. Report test results truthfully, including failures.
- [v4] Never commit secrets. Never run a destructive production migration without my explicit approval.
- [v4] Sections 25 and 26 list ideas that were rejected or deferred. Do not build them unless I ask.
Start by confirming you understand the plan in 10 bullet points, then wait for the first milestone prompt.
```

### 20.1a [v4] Project rules file (AGENTS.md / CLAUDE.md)

Gemini recommended committing standing rules into the repo so every coding session starts with them. Create one root file named AGENTS.md (and a CLAUDE.md that simply says "Read AGENTS.md") in M1 with:

```
# Project rules

Product: an independent, human-verified AI work hub plus an evaluation studio. The full plan is in /docs/plan.md. Read it before any task.

Honesty
- Never invent data: no fake counts, logos, testimonials, pay figures, match scores or case studies.
- Seed data is marked SAMPLE and hidden in production.
- No em dashes in user-facing copy.

Performance and design
- Mobile first at 360 px. Dark theme default. Full, Lite and Basic tiers.
- Futuristic effects are CSS and SVG only. No WebGL, video, Lottie or animation libraries.
- Budgets: initial JS 150 KB gzipped, fonts 100 KB, home page 250 KB. CI fails the build if exceeded.
- Glass only on the header and bottom sheets. Status is never shown by color alone.

Code
- TypeScript strict, no `any`. Server components by default; mark client components only at interactive leaves.
- Follow the pinned framework version's docs. Check version-specific behavior instead of assuming it.
- Validate every input on the server with Zod. Bot protection and rate limits on every public form.
- Row level security enabled on every table with explicit policies. Service keys only on the server.
- In server actions and route handlers, call redirect outside try/catch.

Process
- Small commits. Run lint, type check and tests after each change. Report what passed and what failed.
- Never commit secrets. Never run destructive production migrations without approval.
- Do not add features that are not in the plan.
```

Copy the whole plan into the repo at /docs/plan.md so the rules file can point to it.

### 20.1b [v4] Definition of done (every milestone)

Adapted from the ChatGPT blueprint. A milestone is done only when:
- The feature works with real saved data wherever saving is required.
- Loading, empty, success and error states exist and are designed.
- Permissions are enforced on the server and tested.
- Tests pass and the results are reported truthfully.
- README and the example environment file are updated.
- No placeholder claims or fake production data remain.
- Jo can check the result by following written steps.

### 20.2 Milestone prompts

**M1 Foundation.**
```
Milestone 1: set up the repo, commit AGENTS.md (section 20.1a) and /docs/plan.md, Next.js with TypeScript and Tailwind, the CSS variable tokens from section 10.4, light and dark themes, tier detection from section 16 (data-tier on html, Lite toggle in the footer), base layout with header and footer, linting, formatting, CI, and Lighthouse CI with the budgets from section 16.
Accept: deploys to a preview URL, passes accessibility lint, budgets enforced in CI, Lite toggle works and persists.
```

**M2 Design system.**
```
Milestone 2: build the tokens file as a living style guide page and the component gallery for every component in 10.11, with all states, in both themes and all three tiers. Include the Seal SVG, the status system from 10.7, the Freshness Stamp, Truth Strip, job card, filter bar and sheet, bento tile, Live Check Console (with a quiet state), email capture and report form. Also the v4 components from 10.2a and 10.11: Evaluation Graph, comparison panel, stepper, constraint checker, chart, spotlight edge and tactile press.
Accept: every component shows all its states, axe reports zero serious issues, screenshot tests pass at 360, 390, 768 and 1280 px, fonts stay within the 100 KB budget, and the Full, Lite and Basic tiers all render correctly.
```

**M3 Database and admin.**
```
Milestone 3: write the one-page threat model (17.1), then implement the schema in section 12 (including the v4 tables) with migrations and a seed script (SAMPLE data only), row level security, and the secure admin from section 13.4 with email magic link and 2FA. Include Mark checked, Close, the job editor with the eligibility grid, the platform editor with five timeline steps, and the audit log.
Accept: I can add a job in under 2 minutes and mark a recheck in under 15 seconds from a phone, every edit writes an audit row, and the daily status sweeper sets needs_recheck at 14 days and hides at 30.
```

**M4 Public jobs.**
```
Milestone 4: build the jobs list and job detail pages per 7.2 and 7.3, including the country chip (prefilled from the hosting country header, with the "Showing roles for" label), filters with applied chips and live counts, the /go/[id] redirect with anonymous click counts, Load more with URL state, closed-job handling, the Truth Strip, Freshness Stamp, Expectation timeline block, sticky mobile Apply bar with disclosure line, and the report-a-problem form.
Accept: filters work on mobile with the bottom sheet, back button restores scroll, stale jobs are flagged automatically, closed jobs keep their URL with a banner, and LCP is under 2.0 s on throttled 4G.
```

**M5 Platforms, guides, scam check, about.**
```
Milestone 5: build the platform directory and profiles (7.4), guides index and layout with MDX (7.7), the scam-check page with the 10-point checklist (9.6) and the report form, and the about and methodology page (7.11). Use my real copy where I have provided it and clearly marked placeholders elsewhere.
Accept: 5 platform profiles and 3 guides can be published from content files, all pages meet the budgets, and every claim about a platform shows a source label (official, reported or unknown).
```

**M6 Home and search.**
```
Milestone 6: build the home page per 7.1 with the hero, Live Check Console reading the check_log table, five latest verified roles, bento tiles, how-we-verify block and newsletter capture. Add the command palette and search sheet using a small cached JSON list.
Accept: the first screen at 360 px shows the promise, search and a card edge without scrolling, the console never shows fake events and hides itself when there are none, and the command palette is keyboard accessible.
```

**M7 SEO.**
```
Milestone 7: add sitemap.xml, robots.txt, canonical tags, metadata, Open Graph image generation per job and guide, Organization, WebSite and BreadcrumbList structured data, and the JobPosting JSON-LD behind a feature flag that is OFF by default.
Accept: Rich Results Test is clean on samples with the flag on in a test environment, no structured data appears on list pages, and noindex is set on admin, account and filter-parameter pages.
```

**M8 Evaluation Studio.**
```
Milestone 8: build the Evaluation Studio page with the v4 block order (7.9), the RAG and citation audit service page (7.9a), the Studio methodology page (7.9b), the 3-step scope form with reference IDs, receipt, auto-reply and idempotent submit (7.9c), and the sample audit page (7.10) with anchor navigation and CSV and JSON downloads.
Accept: a submission appears in the admin Leads screen with its reference ID and in my inbox, a double tap creates one lead, the Evaluation Graph animates once and is static in Lite, the sample audit cards show prompt, source excerpt, output, verdict, root cause and fix, and no fake logos or counts appear anywhere.
```

**M9 Newsletter and analytics.**
```
Milestone 9: build the newsletter signup with double opt-in and consent timestamp, the welcome email, the weekly digest draft generator (sent to me for review, never auto-sent), privacy-friendly analytics with the events in 18.1, and a simple admin metrics view for 18.2.
Accept: double opt-in works end to end, unsubscribe works, events are visible, and no personal data is stored in analytics.
```

**M10 Legal and polish.**
```
Milestone 10: add privacy, terms, referral disclosure, corrections and contact pages from the outlines in 17.3, the privacy request form and admin queue, the incident log screen with its 72-hour clock (17.2a), the 404 and 500 pages, empty and error states, an offline-friendly fallback, and a final performance and accessibility pass.
Accept: Lighthouse mobile performance 90 or above on key pages, axe zero serious issues, all copy matches section 8, and a real Android 10 or 11 phone passes in Full and Lite tiers.
```

**M11 Phase 1 features.**
```
Milestone 11 (after launch traffic): add optional accounts with magic link, saved jobs, alerts by country and work type, country hubs starting with Nigeria, platform x country pages (7.5a), the compare page, practice exercises with the constraint checker (7.7), the opt-in evaluator interest form, and moderated community experience reports with aggregated counts.
Accept: row level security tests pass, a user can delete their account and data, and only aggregated report data is public.
```

---

## 21. 90-day launch roadmap

Two tracks. Track 1 is the evaluation business and gets most of the energy. Track 2 is this website and the opportunity hub.

| Weeks | Track 1: Evaluation (main) | Track 2: Website and hub |
|---|---|---|
| 1 | Run the first PostgreSQL docs test across the three models. Log raw outputs. Check the brand name. | Choose brand shortlist. Write 5 verified roles by hand in a spreadsheet. Draft the verification checklist and scam-check page. |
| 2 | Build the 5-case sample audit from real model runs. Draft the one-page pilot offer. | Hand the plan and M1 prompt to the coding agent. Write 3 platform profiles. |
| 3 | Start bug-report outreach: 1 or 2 verified reports a day. Track in a sheet. | M2 and M3 done. Enter first 10 verified roles in admin. |
| 4 | First discovery calls. Refine the offer from what buyers say. | M4 and M5 done. Write guide 1. |
| 5 | Send follow-ups (one polite nudge after 5 to 7 days). | M6 and M7 done. Internal test with 5 people. |
| 6 | Run first paid pilot if one lands. Measure real time per task and agreement. | M8 and M9 done. Fix issues from the test. |
| 7 | Publish the sample audit on the site. | M10 done. Run the 5-second test on real phones. |
| 8 | Keep outreach steady. | Launch to a small audience (WhatsApp, X, LinkedIn). Send the first digest. |
| 9 to 10 | Deliver pilot, collect permission for a case study. | Weekly rhythm: verify roles, one guide, one digest. Ask for reader feedback. |
| 11 | Review: close rate, price, time per task. | Review analytics: repeat visits, apply clicks, signups. Decide Phase 1 priorities. |
| 12 | Decide whether to hire a second reviewer. | Start Phase 1 work only if traffic and trust signals justify it. |

Validation rule: spend money on a domain, company registration or tools only after two of three signals appear: a paid pilot (register the business before taking a deposit), a repeat audience, or written referral approval from a platform.

**[v4] Budget ceiling once spending is allowed (adapted from the ChatGPT blueprint).** ChatGPT proposed launching under N200,000. That fits as a ceiling for the first months after the validation rule is met. It is a planning split, not a price quote; check real prices before paying.

| Item | Ceiling | Notes |
|---|---|---|
| Domain, business email, basic identity | N25,000 | Avoid premium domains |
| Hosting and essential services | N20,000 | Free tiers first, after checking commercial-use limits |
| Outreach | N35,000 | Direct prospecting and the sample audit, not ads |
| Pilot operations and QA | N30,000 | A second reviewer for a pilot, test credits |
| Reserve | N90,000 | Not for visual effects or UI kits |
| Total | N200,000 | Keep recurring costs low |

Before the validation signals, the spend stays at zero, as sections 1.2 and 1.3 say. Never start a paid pilot that needs a paid reviewer without the money to pay them.

---

## 22. Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Stale listings erode trust | High | High | 14-day recheck rule, visible dates, automatic needs_recheck, hide at 30 days |
| Time overload for a solo founder | High | High | 20 to 30 minutes a day cap, Track 1 first, defer Phase 1 and 2 |
| Platform objects to our content | Medium | Medium | Link only to official pages, use own summaries, independence line, corrections path |
| Terms or copyright issues from copying text | Medium | High | Own summaries only, no scraping against terms, official feeds with permission |
| Referral income stays near zero | High | Low | Never budget on it; label clearly; focus on the evaluation business |
| A conflict with Jo's own contractor agreements | Medium | High | Read each agreement before promoting or referring |
| Inaccurate worker reports cause defamation risk | Low | High | Moderation, aggregate only, label unverified, right of reply, takedown path |
| Scam copycats use our name | Medium | Medium | Public "what we never do" list, official channels only, report path |
| Futuristic effects slow weak phones | Medium | High | CSS and SVG only, budgets in CI, Lite tier, real-device test |
| Contrast or accessibility failures from glow and glass | Medium | Medium | Measure contrast, prefers-contrast fallback, axe in CI |
| Data protection non-compliance | Medium | High | Minimal data, consent, retention rules, lawyer check on registration duties |
| Overbuilding before validation | High | High | Phase gates, the validation rule in section 21 |
| Fake or invented content slips in | Low | High | SAMPLE markers, hidden in production, content lint, Jo reviews every public claim |
| Google structured data misuse | Low | Medium | Feature flag off by default, follow current guidelines, test before enabling |
| [v4] Unverified facts from AI-written blueprints slip onto the site | Medium | High | Everything from the ChatGPT and Gemini documents is a lead, not a fact. Verify on the official source before publishing |
| [v4] Platform x country pages become thin or wrong | Medium | Medium | Publish only verified pairs, show the check date, 404 the rest |
| [v4] Data protection duties grow when profiles or assessments arrive | Medium | High | Lawyer review and impact assessment before Phase 2 profiles or any assessment feature |
| [v4] Scope creep toward a full marketplace too early | High | High | Section 26 stays gated behind a paid pilot |

---

## 23. Open decisions and assumptions

### 23.1 Decisions Jo must make

1. Brand name and domain (after availability, CAC and social checks).
2. Final promise line (8.1) and logo direction around the Seal.
3. Which 10 platforms to launch with.
4. Whether to keep accounts in Phase 1 or defer until traffic proves it.
5. Where the community lives: WhatsApp, Telegram, or both.
6. Month-one budget ceiling for domain and tools.
7. Whether to show Jo's name and photo on the site (recommended, for trust).
8. Whether to turn on JobPosting structured data after reading Google's current guidelines.
9. [v4] Accounts to apply. You suggested requiring an account before applying so you can learn about visitors. This plan keeps applying open in v1 and offers an optional account with saved jobs and alerts instead, because a wall on a new, unknown site drives people away and your Apply links leave the site anyway. Gemini's blueprint also proposes a "Sign in to apply" modal. If you still want the wall, it can be switched on later as a test on a few listings, with a clear privacy notice.
10. [v4] Studio headline: "Know where your AI is wrong. Understand why." or keep it closer to citations ("Every answer, checked against the source").
11. [v4] Which services to show at launch. Recommended: RAG and citation audit only.
12. [v4] Display face after the phone test: Sora or Space Grotesk.

### 23.2 Assumptions made in this plan

- Most early visitors are in Nigeria on mid-range Android phones.
- A small set of verified roles beats a large unverified feed.
- Dark-first, CSS-only futuristic design can feel advanced without hurting speed.
- The evaluation service earns more than referrals in the first six months.
- Tool free tiers and market data may change. Check current terms before depending on them.

---

## 24. Sources and notes

Research for this plan used public pages and third-party articles found on 14 Oct 2026. Re-check before quoting publicly.

- AIWorkfinder: https://aiworkfinder.com/
- AITrainer.Jobs, aitrainer.work, aitrainingjobsfinder.com, AlignList and Alterwork: their own public pages and posts
- Handshake AI help pages, OpenTrain AI documentation, Appen and Techment evaluation pages
- TechCabal on Nigerian data costs: https://techcabal.com/2025/08/06/nigeria-loses-one-million-internet-users/
- StatCounter Android versions, Nigeria: https://gs.statcounter.com/android-version-market-share/mobile-tablet%20/nigeria
- Nielsen Norman Group on trustworthy design: https://nngroup.com/articles/trustworthy-design/
- Baymard on applied filters: https://baymard.com/research-articles/how-to-design-applied-filters
- Job board comparisons: https://owlapply.com/en/blog/30-best-websites-for-remote-job-listings, https://www.remoteweek.io/blog/best-remote-job-websites, https://dev.to/bigsondev/7-best-remote-job-boards-to-land-your-next-dev-work-in-2024-53l0
- Font loading: https://blog.openreplay.com/modern-font-loading-strategies/, https://arielsalminen.com/2025/optimizing-webfont-performance/
- CSS view transitions and scroll-driven animations: https://blog.codercops.com/blog/css-view-transitions-scroll-animations-2026, https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026
- Job board scraping risks: https://www.jobboardly.com/blog/job-board-scraping-complete-guide-2025, https://niceboard.co/blog/job-board-scraping
- 2026 design trend write-ups used for the futuristic direction: elements.envato.com (UX/UI design trends for 2026), stan.vision (UX/UI trends 2026), lucky.graphics (UI design trends 2026)
- [v4] ChatGPT blueprint, "Futuristic AI Evaluation Platform" (shared by Jo, 14 Oct 2026). Its competitor list to re-check: scale.com, surgehq.ai, telusdigital.com, crowdgen.com, sama.com, micro1.ai, outlier.ai, dataannotation.tech, oneforma.com, mercor.com, alignerr.com, labelbox.com, toloka.ai, labelstud.io
- [v4] Gemini blueprint, "Website Plan and Competitor Research" (shared by Jo, 14 Oct 2026). Its competitor and legal claims were not verified for this plan. Its own citations lean on third-party review sites such as aitraining.jobs and aitrainingjobs.it, so check every claim against the platform's or regulator's official page (for the law: ndpc.gov.ng)

---

# PART F: MERGE RECORD [v4]

## 25. What was taken from the ChatGPT and Gemini blueprints, and what was not

### 25.1 How to read the two blueprints

- **ChatGPT's blueprint** is evaluation-first. It treats the business as an AI evaluation company with a contributor network, and the public site as a front door for clients. It is disciplined about honesty, security and phasing, and it fits this plan well. Its main gap: it barely covers the job hub, which is the audience engine in this plan.
- **Gemini's blueprint** is ambitious and detailed, with useful competitor and legal research. But it designs a venture-scale platform (3D hero, live trace playgrounds, leaderboards, assessments with anti-cheat, ID checks, payouts, billing) for a solo founder with no budget, and it fills the site with numbers that belong to other companies. Much of it would break this plan's honesty and performance rules.

### 25.2 Adopted

| Idea | From | Where it now lives |
|---|---|---|
| Studio as its own journey: service pages, methodology, sample, scope form | ChatGPT | 7.9 to 7.9c |
| Studio message hierarchy and proof pillars | ChatGPT | 4 |
| Evaluation Graph hero with one-time signal trace | ChatGPT (Evaluation Nexus), Gemini (tracing beams) | 10.2a |
| "Every effect must explain something" and solid surfaces for reading and forms | ChatGPT | 10.2a |
| 3-step scope form, reference ID, receipt, idempotent submit, no uploads before secure storage | ChatGPT | 7.9c, 12, 14 |
| "Agreement does not prove correctness" on the methodology page | ChatGPT | 7.9b |
| Sample audit anchors plus CSV and JSON downloads; label anything illustrative | ChatGPT | 7.10 |
| Wider competitor map in three bands | ChatGPT | 3.9b |
| Breakpoint rules, larger display type, one cyan phrase per headline | ChatGPT | 10.5, 10.6 |
| Violet as a data-only second color | ChatGPT | 10.4 |
| Threat model, OWASP check, restore test, untrusted input, separate environments | ChatGPT | 17.1 |
| Definition of done and stricter agent rules | ChatGPT | 20.1, 20.1b |
| Required UI states list (permission denied, expired session and so on) | ChatGPT | 19 |
| N200,000 budget ceiling, used only after validation | ChatGPT | 21 |
| Operations MVP data model and task states for later | ChatGPT | 26 |
| Onboarding and eligibility detail on Handshake AI, DataAnnotation, Mercor, Alignerr (to verify) | Gemini | 3.9a |
| Platform x country pages, rebuilt to never dead-end | Gemini | 7.5a |
| Degree-level requirement pills | Gemini (from Handshake) | 7.3, 12 |
| Country prefill from location, with a visible "why you see this" label | Gemini | 7.1 |
| Outbound redirect route that logs clicks, redirect outside try/catch | Gemini | 7.3, 14 |
| Practice exercises with a live constraint checker (no grading, no storage) | Gemini | 7.7 |
| Spotlight edge on cards (desktop, Full tier) and tactile button press | Gemini | 10.2a |
| NDPA build rules: consent log, privacy requests, 72-hour incident clock, processing record | Gemini | 12, 17.2a |
| AGENTS.md rules file committed to the repo | Gemini | 20.1a |
| Space Grotesk and JetBrains Mono as font alternatives | Both | 10.5 |

### 25.3 Deferred (good later, wrong now)

| Idea | From | Why deferred | Revisit when |
|---|---|---|---|
| Contributor accounts, assessments, project tasks, reviews, exports | ChatGPT, Gemini | Needed only to run paid work at volume | After the first paid pilot (section 26) |
| Earnings ledger and payout reconciliation | ChatGPT, Gemini | No contributors are paid through the site yet | When a second reviewer is paid per task |
| Client workspace (project status, deliverables, invoices) | ChatGPT | A shared folder and email work for the first clients | Three or more repeat clients |
| Opt-in evaluator interest form | ChatGPT | Useful, but only with honest copy and NDPA consent | Phase 1 |
| A 3D element on the Studio page | Gemini | Too heavy for the audience now | If real-user data shows capable devices on that page |
| Assessment studio with integrity signals | Gemini | Profiling people triggers heavier data protection duties | Only if Jo runs her own evaluator vetting, after a lawyer's review |

### 25.4 Rejected (conflicts with this plan's rules)

| Idea | From | Why rejected |
|---|---|---|
| Live stats like "144 agent sessions running" and "$1M+ weekly payouts" in the header | Gemini | These are other companies' figures. Showing them on our site would be false. |
| ROI calculator and seed data using other companies' case studies (named customers' precision gains, hours saved) | Gemini | Presenting another vendor's customer results as ours is misleading. |
| Elo and TrueSkill model leaderboards, multi-agent trace playground, prompt playground | Gemini | Needs data, models and engineering we do not have. A fake one would destroy trust with the technical buyers it targets. |
| Three.js globe, aurora background, particle mesh, Lottie, Framer Motion everywhere | Gemini | Breaks the performance budgets for mid-range Android on costly data. |
| "100/100 Lighthouse" and "sub-400 ms" guarantees | Gemini | Not realistic promises. This plan uses measured budgets instead. |
| "Sign in to apply" modal | Gemini | Adds friction on a new site and the Apply link leaves the site anyway. Optional accounts instead (see 23.1, item 9). |
| Pay slider from $13 to $350 per hour and upfront rate badges on every card | Gemini | Pay is shown only when an official source states it. A slider over mostly unknown values misleads. |
| "94% rubric fit" match pills | Gemini | Fake precision without a real matching system. |
| Six-step onboarding with SMS codes, ID checks, 50 MB resume upload and payout setup | Gemini | Contradicts "we never ask for ID", collects data we do not need, and triggers data protection duties. |
| Webcam-free but still invasive assessment telemetry (tab switches, paste tracking) | Gemini | Out of scope; revisit only with a lawyer if own vetting ever starts. |
| Personal referral codes for every user, commission dashboard | Gemini | Turns users into promoters and drifts toward pyramid-style recruiting. Referral links stay labeled and site-level only. |
| Routing applicants by visa status to partner platforms for commission ("Stream B") | Gemini | Ranking or routing driven by commission breaks the neutrality promise. Alternatives are shown by verified eligibility only. |
| Dual-mode hero toggle (Enterprise vs Talent) on the home page | Gemini | Mixes two audiences in one hero. The home page serves job seekers; the Studio has its own page and nav item. |
| Upstash, SSE, BroadcastChannel, Inngest, Stripe metered billing, Paystack and Wise payouts | Gemini | No feature in v1 needs them. Each adds cost and risk. |
| Market statistics without checkable sources | Gemini | Unverified. |
| Studio-first home page | ChatGPT | The job hub is the audience engine; the Studio stays one click away. |
| Synthetic sample report as the default | ChatGPT | Real runs are more credible. Synthetic is allowed only with a visible label. |

## 26. Later phases: Operations MVP spec (from the ChatGPT blueprint)

Build none of this until a client has paid for a pilot and the work is too much for a spreadsheet. It is here so the database, routes, and data models do not need to be rewritten when pilot volume scales.

### 26.1 Roles & Tenant Isolation
- **Roles:** Client, contributor, reviewer, admin. Permissions enforced strictly on the server and via Supabase Row-Level Security (RLS).
- **Core Entities:** `organizations`, `org_members`, `contributor_profiles`, `qualifications`, `projects`, `rubric_versions`, `tasks`, `submissions`, `reviews`, `deliverables`.

### 26.2 Immutable Rubric Architecture
- Rubrics are version-locked (`v1.0.0`, `v1.1.0`). Once an evaluation project begins, its rubric criteria cannot be altered.
- Every task trace is linked to the immutable rubric version under which it was evaluated, ensuring scientific reproducibility.

### 26.3 Pairwise Response Ranking Specification
- **Task Presentation:** Original prompt/question presented alongside Response A and Response B with randomized presentation order (no default preference).
- **Balanced 5-Point Rating Scale:**
  1. `Response A is Significantly Better`
  2. `Response A is Slightly Better`
  3. `Both Responses are Equal / Tie (or Insufficient Evidence)`
  4. `Response B is Slightly Better`
  5. `Response B is Significantly Better`
- **Mandatory Text Citation:**
  - Evaluators MUST highlight the exact text span from the source document or model completion that justifies their verdict.
  - Empty or generic rationales are rejected by client-side and server-side validation.

### 26.4 Inter-Annotator Agreement (IAA) Statistical Standard
- **Batch-Level Measurement:** Inter-annotator agreement metrics—such as Cohen's Kappa for categorical pairwise decisions and Krippendorff's Alpha for continuous grading—are evaluated **across task batches** (minimum 30 overlapping items).
- *Methodology Rule:* Agreement metrics are never calculated on individual tasks. A batch agreement threshold of Kappa >= 0.70 is required for final client deliverables.

### 26.5 Deliverables
- Machine-readable JSON and CSV exports containing stable task IDs, rubric version, evaluator verdict, cited text evidence, review result, and UTC timestamps.
- Zero contributor PII is exposed to enterprise clients unless contractually required and explicitly authorized.

---

# PART G: MERGE RECORD [v5]

## 27. Summary of Changes in v5 (Definitive Master Plan)

| Change Category | What Was Updated | Rationale |
|---|---|---|
| **Brand Identity** | Renamed platform to **Countersign** (`countersign.ai` / `countersign.ng`) | Plain English, high trust, exact alignment with human sign-off on jobs and AI ground truth. Matches the Seal logo. |
| **Nigeria Hub** | Added USD payout guide (Geegpay, Grey, Domiciliary), degree mapping, and power/data tips | Provides original, high-utility guidance tailored to Nigerian STEM graduates. |
| **Scam Checklist** | Added crypto/giftcard pay, BVN/password requests, and CAC checks | Catches the most prevalent modern job scams without defamation risk. |
| **Link Verification** | Added automated nightly link ping (`/api/cron/verify-links`) | Catches broken apply URLs automatically while preserving the 14-day human recheck. |
| **Job Sourcing** | Enforced direct official employer feeds only | Eliminates scrapers, copyright friction, and stale aggregator data. |
| **Evaluation Tooling** | Added locked rubric versioning, 5-point pairwise scale, and mandatory text citations | Prepares professional evaluation specs for Phase 2 without overbuilding Phase 1. |
| **Statistical Rigor** | Corrected Cohen's Kappa specification to batch-level evaluation | Prevents statistical misuse on single tasks. |
| **Data-Saver Mode** | Added auto-activation on `saveData` / 2G/3G connections | Ensures instant <48 KB page loads for bandwidth-constrained users. |
| **Accessibility** | Audited all text colors against WCAG 2.2 AA standards | Replaced low-contrast text with `#94A3B8` / `#CBD5E1` (contrast >6.5:1). |
| **Integrity & Speed** | Maintained zero fake stats, zero income hype, and zero intrusive surveillance | Protects legal compliance, founder reputation, and authentic user trust. |


Build none of this until a client has paid for a pilot and the work is too much for a spreadsheet. It is here so the v1 data model does not block it.

**Roles.** Client, contributor, reviewer, admin. Permissions enforced on the server and in row level security. Never trust a role or record ID sent by the browser.

**Core records.** organizations and memberships; contributor_profiles (skills, languages); qualifications; projects and project_members; rubric_versions (immutable once used); tasks and assignments; submissions (the original decision, never edited); reviews and adjudications (separate records); deliverables (export metadata); invoices; earnings_ledger and payouts (append-only financial events, no balance edits); audit_events.

**Task states.** draft, ready, assigned, in_progress, submitted, under_review, then accepted or needs_revision, then optionally adjudicated, then exported. Only valid transitions are allowed, and every transition is logged.

**First task type.** For the RAG audit service: one question, the bot's answer, the source excerpt with URL and date, a verdict (supported, contradicted, not in source, cannot verify), a rationale and a failure category. Pairwise ranking (A better, B better, tie, cannot tell) comes later if preference ranking is sold.

**Quality.** Calibration items before live work, gold items only where a defensible answer exists, a second reviewer on a sample, recorded disagreements and their resolution. Metrics (agreement, override rate, rework) only with written definitions, and never used alone to judge a person.

**Deliverables.** CSV and JSON with stable IDs, rubric version, verdict, evidence, review result and timestamps, plus a readable report. No contributor personal data in client exports unless a contract requires it.

**Private storage.** Client files in private storage with short-lived signed download links. No public buckets.

**Before building it.** A lawyer-reviewed contractor agreement, a data processing agreement template for clients, the data protection impact assessment from 17.2a, and the money to pay contributors on time.

End of plan.
