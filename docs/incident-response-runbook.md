# Countersign: 72-Hour Data Incident Response Runbook
## Mandatory Procedure under Section 40 of the Nigeria Data Protection Act (NDPA) 2023

**Document Owner:** Jo (Ebube Okeke), Data Protection Lead  
**Contact:** `privacy@countersign.ai` | Emergency Phone: Private  
**Applicability:** All security incidents, credential leaks, or near-misses affecting personal data.

---

### Regulatory Mandate
Under Section 40 of the Nigeria Data Protection Act (NDPA) 2023, where a personal data breach occurs that is likely to result in a risk to the rights and freedoms of individuals, the data controller must notify the **Nigeria Data Protection Commission (NDPC)** without undue delay and, where feasible, **not later than 72 hours** after having become aware of it.

---

### Immediate 4-Step Incident Protocol

```
[Detection: Hour 0]
       │
       ▼
1. CONTAIN & ISOLATE (Hours 0 - 6)
   - Rotate compromised API tokens, database passwords, or webhook secrets.
   - Revoke active administrative sessions in the admin console.
   - Check edge firewall and disable vulnerable routes if an active exploit is detected.
       │
       ▼
2. ASSESS & CLASSIFY (Hours 6 - 24)
   - Query immutable audit log: identify exactly which rows were accessed or modified.
   - Determine personal data categories involved (e.g. email addresses, work inquiries).
   - Estimate number of affected individuals and potential impact.
   - Record in admin incident log (`/admin/incidents`) to start the 72-hour countdown clock.
       │
       ▼
3. NOTIFY THE REGULATOR (Hours 24 - 72)
   - If personal data was compromised, submit formal notification to the NDPC:
     * Portal: https://ndpc.gov.ng
     * Email: reports@ndpc.gov.ng / info@ndpc.gov.ng
   - Notification must contain:
     1. Nature of the personal data breach and estimated categories/numbers of individuals.
     2. Name and contact details of the Data Protection Lead (Jo).
     3. Likely consequences of the personal data breach.
     4. Measures taken or proposed to address and mitigate the breach.
   - If high risk to affected individuals: dispatch email alert directly to affected subscribers.
       │
       ▼
4. REMEDIATION & ROOT CAUSE AUDIT (Post 72 Hours)
   - Deploy technical patch to prevent recurrence.
   - Update repository threat model (`docs/threat-model.md`).
   - Mark incident as "Closed" in the admin console, recording final post-incident findings.
```

---

### Incident Severity Classification

| Tier | Description | Action Required |
|---|---|---|
| **Tier 1: Near Miss** | Canary token access attempt, failed brute-force, or automated scanner probe blocked by rate limiter. Zero data exposed. | Log in `incident_log` for tracking. No regulatory filing needed. |
| **Tier 2: Minor Incident** | Non-sensitive diagnostic log leak or temporary public route misconfiguration. Fewer than 10 email addresses exposed with no sensitive data. | Remediate within 24 hours. Log audit trail. Evaluate NDPC filing threshold. |
| **Tier 3: Serious Breach** | Database dump, compromised administrative credentials, or unauthorized export of subscriber lists. | Immediate execution of Steps 1-4. Mandatory NDPC notification within 72 hours. |

---

### NDPC Contact Channels
- **Regulator:** Nigeria Data Protection Commission (NDPC)
- **Headquarters:** No 12, Lake Chad Crescent, Maitama, Abuja, Nigeria
- **Statutory Incident Email:** `reports@ndpc.gov.ng`
- **Official Website:** `https://ndpc.gov.ng`
