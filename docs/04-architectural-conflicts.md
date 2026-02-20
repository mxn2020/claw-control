# ClawControl — Architectural Conflicts: Managed-Only Behavior Described as Universal

This document flags every place in the existing blueprint documents where the design assumes managed-only behavior but is described as if it applies universally (including OSS). Each conflict includes a recommended resolution.

---

## 1. `/auth/login` — SSO redirect assumed universal

**Location:** `01-management-layer.md`, Auth Routes → `/auth/login`

**Conflict:** The original text says "Email + password login with **optional SSO redirect**." SSO is a managed-only feature, but the login route description presents it as always available.

**Resolution:** ✅ Fixed. Login description now annotates SSO redirect as `[MANAGED]`. OSS login is username/password only.

---

## 2. `/auth/login` — Audit log attribution assumed

**Location:** `01-management-layer.md`, Auth Routes → `/auth/login`

**Conflict:** The original text says "Login events are written to the **org audit log** with IP, user agent, and timestamp." The org audit log (`/org/audit`) is a managed-only feature. OSS has no multi-user org-level audit.

**Resolution:** ✅ Fixed. OSS login events are now described as written to the local log file. Org audit attribution is `[MANAGED]`.

---

## 3. `/auth/mfa` — Org-wide enforcement assumed

**Location:** `01-management-layer.md`, Auth Routes → `/auth/mfa`

**Conflict:** "MFA can be **enforced org-wide** by an admin." Org-wide enforcement requires multi-user auth and org admin roles — both managed-only features.

**Resolution:** ✅ Fixed. OSS MFA is described as optional for the local admin user. Org-wide enforcement is `[MANAGED]`.

---

## 4. `/auth/recovery` — SSO recovery path assumed

**Location:** `01-management-layer.md`, Auth Routes → `/auth/recovery`

**Conflict:** "For **SSO accounts**, recovery is handled through the identity provider." SSO doesn't exist in OSS, but the recovery page describes it as a normal flow.

**Resolution:** ✅ Fixed. SSO recovery path is now annotated as `[MANAGED]`.

---

## 5. `/auth/register` — Team invite on registration

**Location:** `01-management-layer.md`, Auth Routes → `/auth/register`

**Conflict:** "The user is prompted to either connect their first OpenClaw instance or **invite team members**." Team invites require multi-user and org features, which are managed-only.

**Resolution:** ✅ Fixed. OSS registration now prompts only to connect an instance. Team invite prompt is `[MANAGED]`.

---

## 6. `/org/members` — Full RBAC assumed universal

**Location:** `01-management-layer.md`, Org Routes → `/org/members`

**Conflict:** The original describes a full member directory with roles (Owner, Admin, Operator, Viewer, custom role builder) as a universal feature. Multi-user with roles is only optional in OSS, and RBAC teams are managed-only.

**Resolution:** ✅ Fixed. `/org/members` is now `[MANAGED]` with a note that OSS supports single admin by default with optional basic multi-user.

---

## 7. `/org/audit` — Org-level audit as universal

**Location:** `01-management-layer.md`, Org Routes → `/org/audit`

**Conflict:** The org-level audit log (covering member invites, role changes, billing changes, SSO config) is described as universally available. All of these events only make sense with multi-user and multi-org — both managed features.

**Resolution:** ✅ Fixed. `/org/audit` is now `[MANAGED]` with a note that OSS provides basic config-change audit via `/audit/config-changes`.

---

## 8. `/audit/access` — Multi-user access log

**Location:** `01-management-layer.md`, Audit Routes → `/audit/access`

**Conflict:** The access log covers "user logins," "terminal sessions attributed to the logged-in user," and "team permission changes." All of these require multi-user auth and RBAC, which are managed-only features.

**Resolution:** ✅ Fixed. `/audit/access` is now `[MANAGED]` with a note indicating it requires multi-user auth.

---

## 9. `/audit/export` — SIEM integration as universal

**Location:** Both documents, Audit Routes → `/audit/export`

**Conflict:** SIEM export (Splunk, Datadog, Elastic) is described as universally available. This is an enterprise integration feature suitable for the managed tier.

**Resolution:** ✅ Fixed. `/audit/export` is now `[MANAGED]`.

---

## 10. `/configure/integrations` — Webhooks, SIEM, alerting as universal

**Location:** `01-management-layer.md`, Configure Routes → `/configure/integrations`

**Conflict:** Outbound webhooks with HMAC signing, SIEM push destinations, and alerting channels (PagerDuty, Slack webhook) are described as universally available platform features. These integrations are enterprise-grade and suited to the managed tier.

**Resolution:** ✅ Fixed. `/configure/integrations` is now `[MANAGED]` with a note that OSS users can configure basic webhook integrations via environment variables.

---

## 11. `/security/compliance/regions` — Data residency map

**Location:** `01-management-layer.md`, Security Routes → `/security/compliance/regions`

**Conflict:** Data residency mapping, EU data processing flags, and HIPAA compliance status are described as universal features. These are enterprise compliance features that require the managed infrastructure to enforce.

**Resolution:** ✅ Fixed. `/security/compliance/regions` is now `[MANAGED]`.

---

## 12. `/security/compliance/exports` — Compliance report generation

**Location:** `01-management-layer.md`, Security Routes → `/security/compliance/exports`

**Conflict:** Signed PDF compliance reports, tamper-evident hashes, and S3 bucket delivery are described as universal. These are enterprise audit features.

**Resolution:** ✅ Fixed. `/security/compliance/exports` is now `[MANAGED]`.

---

## 13. `/fleet/instances/new` Path 3 — Managed instance provisioning

**Location:** Both documents, Fleet Routes → `/fleet/instances/new`

**Conflict:** "Path 3 — Managed Instance: ClawControl fully hosts and operates the OpenClaw gateway" is listed as one of three equal provisioning paths, with no indication that it's only available in the managed SaaS.

**Resolution:** ✅ Fixed. Path 3 is now annotated as `[MANAGED]` in both documents.

---

## 14. `/pricing` — "Enterprise tier unlocks SSO" without tier annotation

**Location:** `README.md`, Public Routes → `/pricing`
**Location:** `01-management-layer.md`, Public Routes → `/pricing`

**Conflict:** The pricing page description mentions "Enterprise tier unlocks SSO, dedicated infrastructure, SLA, and custom data residency" as if SSO is only an Enterprise add-on within the managed service. The auth decision says SSO is categorically managed-only (not an enterprise upsell within managed). The pricing page should make clear that SSO is included in the managed service, not gated behind a separate Enterprise sub-tier.

**Resolution:** ⚠️ **Not yet fixed in the documents.** Recommend clarifying the pricing page description: SSO is included in all managed SaaS plans, not restricted to an Enterprise sub-tier. The current text conflates "Enterprise" (the pricing tier within managed) with "Managed" (the tier distinction from OSS).

---

## 15. Terminal access control — Role-based permissions assumed

**Location:** `01-management-layer.md`, Fleet Routes → `/fleet/instances/:instanceId/terminal`

**Conflict:** "Terminal access is a separate permission... Roles: `terminal:view` allows read-only TUI mirror access. `terminal:exec` allows full shell. Neither is granted to the Viewer role by default." This entire permission model depends on RBAC and multi-user, which are managed-only features. In OSS, the single admin user would have full terminal access with no role distinction.

**Resolution:** ⚠️ **Not yet annotated inline.** Recommend adding a note: In OSS, the local admin user has unrestricted terminal access. Role-based terminal permissions are `[MANAGED]`.

---

## 16. God Mode injection — Audit attribution assumes multi-user

**Location:** `01-management-layer.md`, Session Routes → `/sessions/inbox`

**Conflict:** "The message is sent to the conversation as if the agent sent it, but it is flagged in the audit trail as a **human injection with the operator's identity**." Operator identity attribution requires multi-user auth. In OSS single-user mode, all injections would be attributed to "admin."

**Resolution:** ⚠️ **Not a blocking conflict** — the feature works in OSS, but the audit attribution is less meaningful. Recommend documenting that in OSS, God Mode injections are logged as "admin" without team/role attribution.

---

## Summary

| Status | Count |
|---|---|
| ✅ Fixed in this update | 13 |
| ⚠️ Needs further attention | 3 |
| **Total conflicts identified** | **16** |
