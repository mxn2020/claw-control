# ClawControl — Implementation Checklist (Phased)

---

## Phase 1: OSS MVP

> Goal: Ship a fully functional, self-hostable control plane that a solo operator or small team can use to manage OpenClaw instances.

### Auth & Identity
- [x] Local username/password login (`/auth/login`)
- [x] Registration with email verification (`/auth/register`)
- [x] Basic session management (JWT or cookie-based)
- [x] Password recovery (`/auth/recovery`)
- [ ] Device pairing flow (`/auth/device`)
- [ ] Optional MFA (TOTP only — WebAuthn deferred)

### Fleet & Instance Management
- [x] Fleet overview grid (`/fleet/overview`)
- [x] Instance provisioning wizard (`/fleet/instances/new`)
- [x] Instance overview dashboard (`/fleet/instances/:instanceId/overview`)
- [x] Instance config management (`/fleet/instances/:instanceId/config/*`)
- [x] Instance personality management (`/fleet/instances/:instanceId/personalities/*`)
- [x] Instance channel connectors (`/fleet/instances/:instanceId/channels`)
- [x] Instance terminal page (`/fleet/instances/:instanceId/terminal`)
- [x] Instance file explorer (`/fleet/instances/:instanceId/files`)
- [ ] Secure web terminal — live xterm.js shell (requires tunnel infrastructure)
- [ ] Remote file explorer — live file sync (requires tunnel infrastructure)

### Agent Management
- [x] Agent catalog (`/agents/catalog`)
- [x] Agent creation wizard (`/agents/new`)
- [x] Agent personality editor (`/agents/:agentId/personality/*`)
- [x] Agent tool policy management (`/agents/:agentId/tools/*`)
- [x] Agent skill management (`/agents/:agentId/skills/*`)
- [x] Agent channel bindings (`/agents/:agentId/channels/*`)
- [x] Agent memory browser & editor (`/agents/:agentId/memory/*`)
- [x] Agent model configuration (`/agents/:agentId/model/*`)
- [x] Agent observability pages (`/agents/:agentId/observe/*`)
- [x] Agent security pages (`/agents/:agentId/security/*`)
- [x] Agent sessions inbox (`/agents/:agentId/sessions/*`)

### Sessions
- [x] Unified session inbox (`/sessions/inbox`)
- [x] Session detail view with conversation thread (`/sessions/:sessionId/conversation`)
- [x] Session trace view (`/sessions/:sessionId/trace`)
- [ ] God Mode message injection

### Skills
- [x] Skill marketplace browser (`/skills/marketplace/browse`)
- [x] Skill security scanner page (`/skills/marketplace/:skillId/scan`)
- [x] Installed skill overview (`/skills/installed`)
- [x] Skill policies page (`/skills/policies`)
- [x] Skill scan queue/results pages (`/skills/scan/*`)
- [ ] Skill install/deploy flow — functional backend

### Channels
- [x] Channel connectors (Telegram, Discord, WhatsApp — minimum viable set)
- [x] Routing rule editor (`/channels/routing/rules`)
- [ ] Channel health monitoring — live status (requires tunnel infrastructure)

### Observability
- [x] Live mission control stream (`/observe/live`)
- [x] Trace viewer (`/observe/traces`)
- [x] Log stream viewer (`/observe/logs/stream`)
- [x] Cost dashboard (`/observe/cost/dashboard`)

### Security
- [x] Security posture overview (`/security/posture/overview`)
- [x] Instance/agent quarantine (`/security/quarantine`)
- [x] Secrets vault (`/security/secrets/vault`)
- [x] CVE matrix page (`/security/cves`)
- [x] Incidents page (`/security/incidents`)
- [x] Compliance pages (`/security/compliance/*`)
- [ ] Global kill switch (always visible) — functional backend

### Audit
- [x] Tool execution ledger (`/audit/tools`)
- [x] Config change log (`/audit/config-changes`)
- [x] Incident log (`/audit/incidents`)
- [x] Access log (`/audit/access`)

### Configure
- [x] LLM provider key vault (`/configure/providers`)
- [x] Org-wide defaults (`/configure/defaults`)
- [x] Self-hosting configuration page (`/configure/self-hosting`)

### Settings
- [x] User profile (`/settings/profile`)
- [x] Personal API keys (`/settings/api-keys`)
- [x] Appearance/theme (`/settings/appearance`)
- [x] Notifications (`/settings/notifications`)
- [x] Webhooks (`/settings/webhooks`)

### Public Pages
- [x] Homepage (`/`)
- [x] Docs site (`/docs/*`)
- [x] Public security page (`/security`)
- [x] Changelog (`/changelog`)
- [x] Status page (`/status`)

---

## Phase 2: Managed SaaS Launch

> Goal: Layer enterprise auth, multi-tenancy, billing, and compliance on top of the OSS core to ship the managed SaaS offering.

### Enterprise Auth
- [ ] SSO with SAML 2.0 and OIDC (`/auth/sso`)
- [ ] Org-wide MFA enforcement
- [ ] WebAuthn (hardware key) MFA support
- [ ] Audit-attributed sessions (login events with IP, user agent, actor)

### Multi-Org & RBAC
- [x] Multi-org support pages (`/org/switch`, `/org/new`)
- [x] Full member management page (`/org/members`)
- [x] Team-based access scoping page (`/org/teams`)
- [x] Org-level audit log page (`/org/audit`)
- [ ] Multi-org support — functional backend (org switching, invitation flow)
- [ ] Full RBAC — functional backend (Owner/Admin/Operator/Viewer/Custom roles)
- [ ] Team-based access scoping — functional backend

### Billing
- [x] Billing pages (`/org/billing`)
- [x] SSO configuration page (`/org/sso`)
- [x] Compliance page (`/org/compliance`)
- [x] SIEM export page (`/org/siem`)
- [ ] Stripe/payment integration — functional backend
- [ ] Invoice generation — functional backend
- [ ] Usage metering — functional backend (beyond basic records)
- [ ] Pricing page with usage calculator (`/pricing`)

### Managed Instance Provisioning
- [ ] Managed instance path in provision wizard (`/fleet/instances/new` — Path 3)

### Audit & Compliance
- [ ] SIEM export — functional backend (`/audit/export`)
- [ ] Audit "scope of engagement" mode for forensic investigation
- [ ] Compliance: data residency enforcement — functional backend
- [ ] Compliance: report generation — functional backend
- [ ] Compliance: data subject deletion requests

### Integrations
- [x] Outbound webhooks with HMAC signing (`/configure/integrations`)
- [ ] SIEM push destinations (Splunk, Datadog, Elastic)
- [ ] Alerting channels (PagerDuty, Slack webhook, email)

### Notifications
- [x] Full notification preferences (`/settings/notifications`)
- [x] Webhook delivery log page (`/settings/webhooks`)

---

## Phase 3: Post-Launch

> Goal: Scale the platform with advanced orchestration, analytics, and ecosystem features.

### Swarms
- [x] Swarm creation wizard page (`/swarms/new`)
- [x] Swarm topology canvas — React Flow page (`/swarms/:swarmId/topology`)
- [x] Swarm overview/detail pages
- [x] Swarm templates page (`/swarms/templates`)
- [ ] Swarm creation — functional backend (multi-instance provisioning)
- [ ] Rolling deploy with health gates — functional backend
- [ ] Swarm kill-switch — functional backend
- [ ] Swarm-wide config push — functional backend
- [ ] Swarm-wide channel load balancing — functional backend

### Blueprints
- [x] Blueprint library & gallery page (`/blueprints/library`)
- [x] Blueprint editor page (`/blueprints/:blueprintId/editor`)
- [x] Blueprint deploy page (`/blueprints/:blueprintId/deploy`)
- [x] Blueprint test page (`/blueprints/:blueprintId/test`)
- [ ] Blueprint versioning — functional backend
- [ ] Blueprint staged rollout — functional backend

### Advanced Observability
- [x] Analytics pages: activity, tools, channels, KPIs (`/observe/analytics/*`)
- [ ] Slow trace analysis — functional backend
- [ ] Cost projections & scenario modeling — functional backend
- [ ] Cost attribution by cost center — functional backend

### Advanced Security
- [x] CVE matrix page (`/security/posture/versions`)
- [x] Incident management pages (`/security/incidents/*`)
- [ ] Exposure detection — functional backend
- [ ] Weak config detector — functional backend
- [ ] Secret rotation scheduling — functional backend
- [ ] Secret distribution matrix — functional backend
- [ ] Postmortem templates

### Advanced Agent Features
- [x] Agent compare / side-by-side diff (`/agents/compare`)
- [x] Memory health page (`/agents/:agentId/memory/health`)
- [ ] A/B personality testing
- [ ] Memory health scoring — functional backend (conflict detection)
- [ ] Skill drift detector (`/skills/installed/drift`)
- [ ] Hallucination detector in sessions
- [ ] Session replay mode (`/sessions/:sessionId/replay`)

### Advanced Fleet
- [x] Terminal page (`/fleet/instances/:instanceId/terminal`)
- [x] Files page (`/fleet/instances/:instanceId/files`)
- [ ] Terminal TUI mirror mode — functional backend
- [ ] Named terminal sessions — functional backend
- [ ] File sync drift detection — functional backend
- [ ] Command palette with CLI snippets

### Ecosystem
- [ ] Budget rules with auto-pause (`/observe/cost/budgets`)
- [x] Time-of-day model scheduling page (`/agents/:agentId/model/schedule`)
- [ ] Time-based channel routing (`/channels/routing/schedules`)
- [ ] Routing rule tester / simulator (`/channels/routing/tester`)

---

## Summary

> **Note:** Many items above distinguish between "page exists" (UI scaffold is built) and "functional backend" (the feature actually works end-to-end). The UI scaffold is complete for ~90% of all routes. The functional backend work focuses primarily on infrastructure that requires real OpenClaw instances (tunnels, terminals, file sync) or third-party integrations (Stripe, SIEM, SSO providers).
