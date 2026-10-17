# Countersign email setup and deliverability guide

This document details the production email architecture, DNS records (SPF, DKIM, DMARC), and deliverability standards for Countersign.

## 1. Sender configuration

The sending identity is read dynamically from the `EMAIL_FROM` environment variable.

```env
# Default production sender
EMAIL_FROM="Countersign <alerts@countersign.work>"

# Dedicated review/contact sender
EMAIL_CONTACT="hello@countersign.work"
```

If `EMAIL_FROM` is unset, the system defaults to `"Countersign <alerts@countersign.work>"`.

## 2. DNS authentication records

To guarantee that job alert emails and weekly digests arrive in user inboxes without being flagged as spam or spoofed by bad actors, the sending domain must have SPF, DKIM, and DMARC configured.

### SPF (Sender Policy Framework)
Add a TXT record to the root sending domain (`countersign.work`):

| Host | Type | Value | TTL |
| :--- | :--- | :--- | :--- |
| `@` | TXT | `v=spf1 include:_spf.resend.com include:mailgun.org ~all` | 3600 |

*(Replace the include directives with your designated transactional email ESP).*

### DKIM (DomainKeys Identified Mail)
Add the public DKIM key provided by your ESP. Example for selector `resend._domainkey`:

| Host | Type | Value | TTL |
| :--- | :--- | :--- | :--- |
| `resend._domainkey` | TXT | `k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0...` | 3600 |

### DMARC (Domain-based Message Authentication)
For launch readiness, configure DMARC with `p=none` to monitor alignment and gather aggregate forensic reports without risking false-positive bounces:

| Host | Type | Value | TTL |
| :--- | :--- | :--- | :--- |
| `_dmarc` | TXT | `v=DMARC1; p=none; rua=mailto:dmarc-reports@countersign.work; pct=100; sp=none; aspf=r;` | 3600 |

> [!NOTE]
> Once delivery reports confirm 100% DKIM and SPF alignment across all recipient mailboxes (Gmail, Yahoo, Outlook, iCloud), upgrade the policy from `p=none` to `p=quarantine` and eventually `p=reject`.

## 3. RFC 8058 one-click unsubscribe compliance

Every outbound email message sent by Countersign includes both header-level and body-level unsubscribe mechanisms compliant with RFC 2369 and RFC 8058:

```http
List-Unsubscribe: <https://countersign.work/newsletter/unsubscribe?token=...>
List-Unsubscribe-Post: List-Unsubscribe=One-Click
Auto-Submitted: auto-generated
```

This guarantees:
1. Native one-click unsubscribe buttons in Gmail, Apple Mail, and Yahoo Mail.
2. Direct compliance with 2024 Google & Yahoo bulk sender requirements (spam rate < 0.10%).
3. Immediate one-click opt-out without requiring the user to log in or enter passwords.

## 4. Multi-part MIME format (HTML + Plain text)

Every transactional email must provide an equivalent plain text alternative (`text/plain`).
- No hidden tracking pixels or invisible text.
- Plain text versions must contain all role URLs, verification timestamps, and legal contact notes.
- Links formatted clearly as plain text URLs.

## 5. Development preview & testing

A developer preview page is available at `/dev/test-email` (returns 404 in production). It allows engineering and editorial teams to:
1. Inspect the exact raw HTML and plain text output for Weekly Digests and Job Alerts.
2. Verify all RFC headers (`From`, `List-Unsubscribe`, `Subject`).
3. Send test dispatches to verify SPF/DKIM alignment with tools like mail-tester.com before broad distribution.
