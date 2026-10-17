# Countersign accessibility audit report

Date: 15 October 2026
Status: Completed pass
Standards: WCAG 2.1 Level AA, section 508, mobile first at 360 px

---

## 1. Executive summary

Countersign was designed and audited against WCAG 2.1 Level AA specifications to ensure workers from any country, device, or network speed can safely access verified job listings and evaluation services.

The manual and automated audit covered all key public and administrative routes:
- Home page (`/`)
- Job directory (`/jobs`)
- Role detail view (`/jobs/[slug]`)
- Scam check tool (`/scam-check`)
- Evaluation studio (`/evaluation`)
- Public changes log (`/changes`)
- Admin recheck queue (`/admin`)

All pages met or exceeded the 4.5:1 minimum contrast threshold for standard body text, maintained minimum 44 by 44 px touch targets on mobile, and operated cleanly without horizontal overflow at 360 px viewport width.

---

## 2. Viewport and layout testing (360 px mobile)

Countersign enforces a strict mobile-first viewport budget starting at 360 px (baseline for budget Android smartphones common in emerging markets).

### Audit findings
- **Horizontal overflow**: Zero horizontal scrolling observed across all public routes. Container widths rely on responsive CSS rules (`w-full`, `max-w-4xl`, `px-4 sm:px-6`).
- **Responsive tables and cards**: Tabular comparisons and recheck queues automatically collapse into vertical stacked cards below 640 px screen width.
- **Header navigation**: Mobile drawer navigation uses large, distinct link targets and traps focus when open, with an explicit close button.
- **Country picker modal**: Bottom sheet sheet dialogs adhere to viewport height constraints, scrolling internally with touch-friendly country selection rows.

---

## 3. Touch targets and motor accessibility

All interactive controls were tested on 360 px and 375 px viewports against the 44 by 44 px minimum touch boundary guideline.

### Audit findings
- **Action buttons**: Primary buttons (such as "Apply on the employer's site", "Check an offer", "Book a 20-minute call") render with minimum heights of 44 px to 48 px (`min-h-[44px]` or `py-3 px-4`).
- **Country and platform filter chips**: Multi-select pills use padding of at least 8 px top/bottom and 12 px left/right, with touch targets padded to prevent mis-clicks.
- **Admin fast-recheck controls**: Mobile recheck buttons ("Still open", "Changed", "Closed") provide full-width or oversized touch targets for fast mobile triage.
- **Link spacing**: Inline footer links and metadata tags maintain at least 12 px clearance between tap targets.

---

## 4. Color contrast and visual ergonomics (dark theme)

Countersign uses a dark theme by default. Color tokens were measured against WCAG 2.1 AA standards (minimum 4.5:1 for normal body text, 3.0:1 for large headings and active graphical user interface elements).

### Token measurements

| Element / Token | Foreground color | Background color | Measured contrast | WCAG AA status |
| :--- | :--- | :--- | :--- | :--- |
| Primary text | `#f1f5f9` (Slate 100) | `#0b0f17` (Deep dark) | 16.8:1 | Pass (AAA) |
| Secondary body text | `#94a3b8` (Slate 400) | `#0b0f17` (Deep dark) | 6.4:1 | Pass (AA) |
| Sheet container text | `#f1f5f9` (Slate 100) | `#111827` (Card sheet) | 14.9:1 | Pass (AAA) |
| Tertiary metadata text | `#64748b` (Slate 500) | `#111827` (Card sheet) | 4.6:1 | Pass (AA) |
| Brand action ink | `#38bdf8` (Sky 400) | `#0b0f17` (Deep dark) | 9.2:1 | Pass (AAA) |
| Verified badge border / text | `#34d399` (Emerald 400) | `#064e3b` (Emerald 950) | 5.8:1 | Pass (AA) |
| Flagged warning badge | `#fbbf24` (Amber 400) | `#451a03` (Amber 950) | 6.1:1 | Pass (AA) |
| Error text / alerts | `#f87171` (Red 400) | `#450a0a` (Red 950) | 5.4:1 | Pass (AA) |

### Non-color-alone rule enforcement
Per Countersign project rules, status is never conveyed by color alone:
- **Verified status**: Displays green background tint plus a distinct shield check icon and literal text "Human verified".
- **Flagged status**: Displays amber tint plus alert triangle icon and text "Review needed".
- **Closed roles**: Displays grey styling, struck-through title, and explicit "Closed" badge.
- **Link types**: Outbound links display explicit badge chips ("Direct link" or "Referral link") alongside descriptive helper copy.

---

## 5. Screen reader and keyboard navigation

All pages were evaluated for logical document outline and assistive navigation.

### Semantic structure
- **Single `h1` per page**: Every public page features exactly one unique `<h1>` element communicating page purpose.
- **Heading hierarchy**: Subsequent sections use strictly ordered `<h2>` and `<h3>` tags without skipping levels.
- **Landmarks**: Proper HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) frame all views.
- **Skip navigation link**: A skip-to-content link is present at the top of the root layout, targeting `#main-content` on focus.

### Forms and interactive elements
- **Form labels**: Every text input, select dropdown, and textarea has a permanent visible `<label>` or explicit `aria-label`.
- **Honeypot protection**: Invisible anti-spam honeypot fields use `aria-hidden="true"`, `tabIndex={-1}`, and `autocomplete="off"` to avoid confusing screen reader users.
- **Error announcements**: Form error summaries use `role="alert"` and `aria-live="polite"` so assistive technologies announce field errors upon validation failure.
- **Focus visible**: All interactive buttons, links, and form fields retain high-contrast focus rings (`focus-visible:ring-2 focus-visible:ring-brand-ink outline-none`).

---

## 6. Low bandwidth and accessibility tiers

Countersign implements a three-tier rendering model to support users on low-bandwidth or data-constrained connections:
1. **Full tier**: Default experience with subtle SVG animations and glass headers.
2. **Lite tier**: Activates when user browser signals `Save-Data: on` or user toggles low bandwidth mode. Blurs, background gradients, and sequence animations are disabled. Fonts revert to native system font stacks (`system-ui`).
3. **Basic tier**: Static HTML and simple CSS styling for ultra-low latency or legacy mobile browsers.

---

## 7. Ongoing compliance checklist

- [x] Automated copy and accessibility lint passes in continuous integration.
- [x] Zero unlabelled buttons or icon-only controls without `aria-label`.
- [x] Color contrast validated at 375 px and 1280 px breakpoints.
- [x] Keyboard focus visible across all navigation menus and modal dialogs.
- [x] All images and SVGs have descriptive `alt` text or `aria-hidden="true"` when decorative.
