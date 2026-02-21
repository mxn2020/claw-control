# ClawControl — Implementation Checklist (Phased)

---

## Phase 1: OSS MVP

> Goal: Ship a fully functional, self-hostable control plane that a solo operator or small team can use to manage OpenClaw instances.

### Auth & Identity
- [ ] Local username/password login (`/auth/login`)
- [ ] Registration with email verification (`/auth/register`)
- [ ] Basic session management (JWT or cookie-based)
- [ ] Password recovery (`/auth/recovery`)
- [ ] Device pairing flow (`/auth/device`)
- [ ] Optional MFA (TOTP only — WebAuthn deferred)

### Fleet & Instance Management
- [x] Fleet overview grid (`/fleet/overview`)
- [ ] BYO Server provisioning path (`/fleet/instances/new` — Path 2)
- [ ] Cloud provisioning path (`/fleet/instances/new` — Path 1, at least one provider)
- [x] Instance overview dashboard (`/fleet/instances/:instanceId/overview`)
- [ ] Secure web terminal (`/fleet/instances/:instanceId/terminal/shell`)
- [ ] Remote file explorer & editor (`/fleet/instances/:instanceId/files`)
- [x] Instance config management (`/fleet/instances/:instanceId/config/*`)
- [ ] Instance personality management (`/fleet/instances/:instanceId/personalities/*`)
- [ ] Instance channel connectors (`/fleet/instances/:instanceId/channels`)

### Agent Management
- [x] Agent catalog (`/agents/catalog`)
- [x] Agent creation wizard (`/agents/new`)
- [ ] Agent personality editor with inheritance UI (`/agents/:agentId/personality/*`)
- [ ] Agent tool policy management (`/agents/:agentId/tools/*`)
- [ ] Agent skill management (`/agents/:agentId/skills/*`)
- [ ] Agent channel bindings (`/agents/:agentId/channels/*`)
- [ ] Agent memory browser & editor (`/agents/:agentId/memory/*`)
- [x] Agent model configuration (`/agents/:agentId/model/*`)

### Sessions
- [x] Unified session inbox (`/sessions/inbox`)
- [x] Session detail view with conversation thread (`/sessions/:sessionId/conversation`)
- [ ] Session trace waterfall (`/sessions/:sessionId/trace`)
- [ ] God Mode message injection

### Skills
- [x] Skill marketplace browser (`/skills/marketplace/browse`)
- [ ] Skill security scanner (`/skills/marketplace/:skillId/scan`)
- [ ] Skill install/deploy flow (`/skills/marketplace/:skillId/deploy`)
- [x] Installed skill overview (`/skills/installed`)

### Channels
- [x] Channel connectors (Telegram, Discord, WhatsApp — minimum viable set)
- [x] Routing rule editor (`/channels/routing/rules`)
- [ ] Channel health monitoring (`/channels/health`)

### Observability
- [x] Live mission control stream (`/observe/live`)
- [ ] Trace waterfall viewer (`/observe/traces/waterfall`)
- [x] Log stream viewer (`/observe/logs/stream`)
- [x] Cost dashboard (`/observe/cost/dashboard`)

### Security
- [x] Security posture overview (`/security/posture/overview`)
- [x] Instance/agent quarantine (`/security/quarantine`)
- [x] Secrets vault (`/security/secrets/vault`)
- [ ] Global kill switch (always visible)

### Audit
- [ ] Immutable tool execution ledger (`/audit/tools`)
- [x] Config change log (`/audit/config-changes`)
- [x] Incident log (`/audit/incidents`)

### Configure
- [x] LLM provider key vault (`/configure/providers`)
- [x] Org-wide defaults (`/configure/defaults`)
- [x] Self-hosting configuration page (`/configure/self-hosting`)

### Settings
- [x] User profile (`/settings/profile`)
- [ ] Personal API keys (`/settings/api-keys`)
- [x] Appearance/theme (`/settings/appearance`)

### Public Pages
- [ ] Homepage (`/`)
- [ ] Docs site (`/docs/*`)
- [ ] Public security page (`/security`)
- [ ] Changelog (`/changelog`)
- [ ] Status page (`/status`)

---

## Phase 2: Managed SaaS Launch

> Goal: Layer enterprise auth, multi-tenancy, billing, and compliance on top of the OSS core to ship the managed SaaS offering.

### Enterprise Auth
- [ ] SSO with SAML 2.0 and OIDC (`/auth/sso`)
- [ ] Org-wide MFA enforcement
- [ ] WebAuthn (hardware key) MFA support
- [ ] Audit-attributed sessions (login events with IP, user agent, actor)

### Multi-Org & RBAC
- [ ] Multi-org support (`/org/switch`, `/org/new`)
- [ ] Full member management with roles (`/org/members` with Owner/Admin/Operator/Viewer/Custom)
- [ ] Team-based access scoping (`/org/teams`)
- [ ] Org-level audit log (`/org/audit`)

### Billing
- [ ] Plan management (`/org/billing/plan`)
- [ ] Invoice generation (`/org/billing/invoices`)
- [ ] Usage metering (`/org/billing/usage`)
- [ ] Pricing page with usage calculator (`/pricing`)

### Managed Instance Provisioning
- [ ] Managed instance path in provision wizard (`/fleet/instances/new` — Path 3)

### Audit & Compliance
- [ ] Access audit log (`/audit/access`)
- [ ] SIEM export (`/audit/export`)
- [ ] Audit "scope of engagement" mode for forensic investigation
- [ ] Compliance: data residency map (`/security/compliance/regions`)
- [ ] Compliance: report generation (`/security/compliance/exports`)
- [ ] Compliance: data subject deletion requests

### Integrations
- [x] Outbound webhooks with HMAC signing (`/configure/integrations`)
- [ ] SIEM push destinations (Splunk, Datadog, Elastic)
- [ ] Alerting channels (PagerDuty, Slack webhook, email)

### Notifications
- [x] Full notification preferences (`/settings/notifications`)
- [ ] Webhook delivery log (`/settings/webhooks`)

---

## Phase 3: Post-Launch

> Goal: Scale the platform with advanced orchestration, analytics, and ecosystem features.

### Swarms
- [ ] Swarm creation wizard (`/swarms/new`)
- [ ] Swarm topology canvas — React Flow (`/swarms/:swarmId/topology`)
- [ ] Rolling deploy with health gates (`/swarms/:swarmId/deploy/rolling`)
- [ ] Swarm kill-switch (`/swarms/:swarmId/kill-switch`)
- [ ] Swarm topology templates (`/swarms/templates`)
- [ ] Swarm-wide config push (`/swarms/:swarmId/config`)
- [ ] Swarm-wide channel load balancing (`/swarms/:swarmId/channels`)

### Blueprints
- [ ] Blueprint library & gallery (`/blueprints/library`)
- [ ] Blueprint editor with versioning (`/blueprints/:blueprintId/editor`)
- [ ] Blueprint deploy with staged rollout (`/blueprints/:blueprintId/deploy`)
- [ ] Blueprint sandbox test environment (`/blueprints/:blueprintId/test`)

### Advanced Observability
- [ ] Slow trace analysis (`/observe/traces/slow`)
- [ ] Cost projections & scenario modeling (`/observe/cost/projections`)
- [ ] Cost attribution by cost center (`/observe/cost/attribution`)
- [ ] Business KPI dashboard (`/observe/analytics/kpis`)
- [ ] Activity heatmap (`/observe/analytics/activity`)
- [ ] Tool usage analytics (`/observe/analytics/tools`)
- [ ] Channel volume analytics (`/observe/analytics/channels`)

### Advanced Security
- [ ] Exposure detection (`/security/posture/exposure`)
- [ ] Version CVE matrix (`/security/posture/versions`)
- [ ] Weak config detector (`/security/posture/configs`)
- [ ] Secret rotation scheduling (`/security/secrets/rotation`)
- [ ] Secret distribution matrix (`/security/secrets/distribution`)
- [ ] Full incident management lifecycle (`/security/incidents/*`)
- [ ] Postmortem templates

### Advanced Agent Features
- [x] Agent compare / side-by-side diff (`/agents/compare`)
- [ ] A/B personality testing
- [ ] Memory health scoring & conflict detection (`/agents/:agentId/memory/health`)
- [ ] Skill drift detector (`/skills/installed/drift`)
- [ ] Hallucination detector in sessions
- [ ] Session replay mode (`/sessions/:sessionId/replay`)

### Advanced Fleet
- [ ] Terminal TUI mirror mode (`/fleet/instances/:instanceId/terminal/tui`)
- [ ] Named terminal sessions (`/fleet/instances/:instanceId/terminal/sessions`)
- [ ] File sync drift detection (`/fleet/instances/:instanceId/files/sync`)
- [ ] Command palette with CLI snippets

### Ecosystem
- [ ] Budget rules with auto-pause (`/observe/cost/budgets`)
- [ ] Time-of-day model scheduling (`/agents/:agentId/model/schedule`)
- [ ] Time-based channel routing (`/channels/routing/schedules`)
- [ ] Routing rule tester / simulator (`/channels/routing/tester`)
