# ClawControl — Comprehensive Route & Feature Blueprint

## Core Architecture Principles

**Two-level hierarchy:**
1. **Instance level** — the OpenClaw gateway daemon running on a VPS/server. Has its own global `openclaw.json`, global tools, global skills, global personality files (`SOUL.md`, `AGENTS.md`), and global channel connectors. Everything here cascades down to all agents on that instance unless overridden.
2. **Agent level** — each individual agent within an instance. Has its own `SOUL.md`, `AGENTS.md`, `USER.md`, tool allow/deny list, skill set, channel bindings, memory workspace, and session store. Agent settings override instance globals.

**Inheritance is always explicit in the UI.** Every agent settings page clearly distinguishes "inherited from instance" (shown with a cascade indicator) from "overridden here" (shown as active/local). Users always know which layer they are editing and what the effective resolved value is.

**Security architecture:** The control plane never opens inbound ports on agent nodes. All communication is agent-initiated outbound tunnel. Secrets are write-only after entry. The audit log is immutable and append-only. Quarantine and kill-switch are always one click away.

**Swarm Scale Naming:**

| Tier | Name | Count | UI Complexity |
|---|---|---|---|
| **μ-swarm** | Micro-swarm | 2–10 | Simple list |
| **m-swarm** | Meso-swarm | 11–100 | Grid + filters |
| **M-swarm** | Macro-swarm | 101–1,000 | Region maps + rolling deploy |
| **Ω-swarm** | Mega-swarm | 1,001–10,000 | Full orchestration suite + cost projections |

---

# Complete Route Tree

```
/                                                    # Marketing homepage
/pricing
/security
/changelog
/status
/docs
  /docs/quickstart
  /docs/self-hosting
  /docs/api
  /docs/swarms
  /docs/security
  /docs/blueprints
  /docs/channels

/auth
  /auth/login
  /auth/register
  /auth/sso
  /auth/mfa
  /auth/recovery
  /auth/device                                       # Headless/VPS device pairing

/org
  /org/switch
  /org/new
  /org/members
  /org/teams
  /org/audit
  /org/billing
    /org/billing/plan
    /org/billing/invoices
    /org/billing/usage

/settings
  /settings/profile
  /settings/api-keys
  /settings/webhooks
  /settings/notifications
  /settings/appearance

/fleet
  /fleet/overview
  /fleet/instances
    /fleet/instances/new
    /fleet/instances/:instanceId
      /fleet/instances/:instanceId/overview
      /fleet/instances/:instanceId/terminal
        /fleet/instances/:instanceId/terminal/shell
        /fleet/instances/:instanceId/terminal/tui
        /fleet/instances/:instanceId/terminal/history
        /fleet/instances/:instanceId/terminal/sessions
      /fleet/instances/:instanceId/files
        /fleet/instances/:instanceId/files/explorer
        /fleet/instances/:instanceId/files/editor
        /fleet/instances/:instanceId/files/sync
      /fleet/instances/:instanceId/config
        /fleet/instances/:instanceId/config/general
        /fleet/instances/:instanceId/config/providers
        /fleet/instances/:instanceId/config/tools
        /fleet/instances/:instanceId/config/skills
        /fleet/instances/:instanceId/config/policies
        /fleet/instances/:instanceId/config/environment
        /fleet/instances/:instanceId/config/sandbox
      /fleet/instances/:instanceId/personalities
        /fleet/instances/:instanceId/personalities/soul
        /fleet/instances/:instanceId/personalities/agents-md
        /fleet/instances/:instanceId/personalities/user-md
        /fleet/instances/:instanceId/personalities/blueprints
        /fleet/instances/:instanceId/personalities/history
      /fleet/instances/:instanceId/channels
        /fleet/instances/:instanceId/channels/connectors
        /fleet/instances/:instanceId/channels/routing
        /fleet/instances/:instanceId/channels/health
      /fleet/instances/:instanceId/agents
        /fleet/instances/:instanceId/agents/new
        /fleet/instances/:instanceId/agents/:agentId     # mirrors /agents/:agentId
      /fleet/instances/:instanceId/sessions
      /fleet/instances/:instanceId/skills
      /fleet/instances/:instanceId/observe
      /fleet/instances/:instanceId/security

/agents
  /agents/catalog
  /agents/new
  /agents/compare
  /agents/:agentId
    /agents/:agentId/overview
    /agents/:agentId/personality
      /agents/:agentId/personality/soul
      /agents/:agentId/personality/agents-md
      /agents/:agentId/personality/user-md
      /agents/:agentId/personality/variables
      /agents/:agentId/personality/history
    /agents/:agentId/tools
      /agents/:agentId/tools/allowed
      /agents/:agentId/tools/sandbox
      /agents/:agentId/tools/policies
      /agents/:agentId/tools/simulator
    /agents/:agentId/skills
      /agents/:agentId/skills/installed
      /agents/:agentId/skills/permissions
      /agents/:agentId/skills/marketplace
    /agents/:agentId/channels
      /agents/:agentId/channels/bindings
      /agents/:agentId/channels/overrides
    /agents/:agentId/memory
      /agents/:agentId/memory/browser
      /agents/:agentId/memory/editor
      /agents/:agentId/memory/inject
      /agents/:agentId/memory/health
    /agents/:agentId/sessions
      /agents/:agentId/sessions/inbox
      /agents/:agentId/sessions/:sessionId
    /agents/:agentId/model
      /agents/:agentId/model/provider
      /agents/:agentId/model/limits
      /agents/:agentId/model/schedule
    /agents/:agentId/observe
      /agents/:agentId/observe/traces
      /agents/:agentId/observe/logs
      /agents/:agentId/observe/cost
    /agents/:agentId/security
      /agents/:agentId/security/posture
      /agents/:agentId/security/quarantine
      /agents/:agentId/security/audit

/sessions
  /sessions/inbox
  /sessions/search
  /sessions/:sessionId
    /sessions/:sessionId/conversation
    /sessions/:sessionId/trace
    /sessions/:sessionId/replay
    /sessions/:sessionId/audit

/skills
  /skills/overview
  /skills/installed
    /skills/installed/drift
  /skills/policies
    /skills/policies/new
    /skills/policies/:policyId
  /skills/marketplace
    /skills/marketplace/browse
    /skills/marketplace/:skillId
      /skills/marketplace/:skillId/readme
      /skills/marketplace/:skillId/scan
      /skills/marketplace/:skillId/deploy
  /skills/scan
    /skills/scan/queue
    /skills/scan/results
    /skills/scan/quarantine

/channels
  /channels/overview
  /channels/connectors
    /channels/connectors/new
    /channels/connectors/:connectorId
  /channels/routing
    /channels/routing/rules
    /channels/routing/tester
    /channels/routing/schedules
  /channels/health
    /channels/health/status
    /channels/health/latency
    /channels/health/errors

/blueprints
  /blueprints/library
  /blueprints/new
  /blueprints/:blueprintId
    /blueprints/:blueprintId/editor
    /blueprints/:blueprintId/variables
    /blueprints/:blueprintId/history
    /blueprints/:blueprintId/deploy
    /blueprints/:blueprintId/test

/swarms
  /swarms/overview
  /swarms/new
  /swarms/templates
  /swarms/:swarmId
    /swarms/:swarmId/overview
    /swarms/:swarmId/instances
    /swarms/:swarmId/agents
    /swarms/:swarmId/topology
    /swarms/:swarmId/deploy
      /swarms/:swarmId/deploy/rolling
      /swarms/:swarmId/deploy/history
    /swarms/:swarmId/config
    /swarms/:swarmId/skills
    /swarms/:swarmId/channels
    /swarms/:swarmId/observe
    /swarms/:swarmId/sessions
    /swarms/:swarmId/kill-switch

/observe
  /observe/live
  /observe/traces
    /observe/traces/waterfall
    /observe/traces/slow
    /observe/traces/search
    /observe/traces/:traceId
      /observe/traces/:traceId/replay
  /observe/logs
    /observe/logs/stream
    /observe/logs/search
    /observe/logs/export
  /observe/cost
    /observe/cost/dashboard
    /observe/cost/budgets
    /observe/cost/projections
    /observe/cost/attribution
  /observe/analytics
    /observe/analytics/activity
    /observe/analytics/tools
    /observe/analytics/channels
    /observe/analytics/kpis

/security
  /security/posture
    /security/posture/overview
    /security/posture/exposure
    /security/posture/versions
    /security/posture/configs
  /security/secrets
    /security/secrets/vault
    /security/secrets/rotation
    /security/secrets/distribution
  /security/quarantine
    /security/quarantine/instances
    /security/quarantine/agents
    /security/quarantine/skills
    /security/quarantine/actions
  /security/compliance
    /security/compliance/regions
    /security/compliance/retention
    /security/compliance/exports
  /security/incidents
    /security/incidents/timeline
    /security/incidents/:incidentId
      /security/incidents/:incidentId/timeline
      /security/incidents/:incidentId/containment
      /security/incidents/:incidentId/postmortem

/audit
  /audit/tools
  /audit/config-changes
  /audit/access
  /audit/incidents
  /audit/export

/configure
  /configure/providers
    /configure/providers/new
    /configure/providers/:providerId
  /configure/defaults
  /configure/integrations
  /configure/self-hosting
```

---

# Full Feature Documentation

---

## Public Routes

### `/` — Marketing Homepage

The homepage establishes trust and positions ClawControl clearly against the backdrop of OpenClaw's security news cycle. Above the fold: the three value propositions that matter most right now — "no inbound ports required," "supply chain skill scanning," and "full fleet control plane." Below: a live demo embed showing the unified session inbox. Social proof from community users. A clear split between the self-hosted open-source path and the managed SaaS path, modeled after how Supabase presents its offering. The nav includes a persistent link to the security posture page and the status page, because trust is earned through transparency.

### `/pricing`

Two tracks presented side by side. The **open-source track** explains what you get for free (the control plane software itself, self-hosted) and links to the GitHub repo and self-hosting docs. The **managed SaaS track** meters by active instance-nodes per month, with add-ons for additional storage, advanced skill scanning, compliance exports, and Ω-swarm support. A usage calculator lets prospects estimate cost by entering node count, agent count, and approximate daily message volume. Enterprise tier unlocks SSO, dedicated infrastructure, SLA, and custom data residency.

### `/security` (public page)

Not to be confused with the in-app `/security` section. This public page is the company's security posture statement: threat model, responsible disclosure policy, the tunnel architecture explanation (why no inbound ports), how secrets are stored, and a link to the CVE disclosure history. Updated every time a significant security event touches the OpenClaw ecosystem. This page is referenced in sales conversations and enterprise procurement reviews.

### `/changelog`

Versioned changelog with entries tagged by category: Feature, Security, Bug Fix, Breaking Change. RSS feed available. Each entry links to the relevant docs section. Security-tagged entries are highlighted in red to surface them above the fold.

### `/status`

Live status page showing control plane API uptime, tunnel relay uptime, skill scanner service uptime, and marketplace availability. Historical incident timeline. Subscribeable via email or webhook for status change notifications.

### `/docs`

Full documentation site. Structured as: Quickstart (get your first instance connected in under 10 minutes), Concepts (instance vs. agent hierarchy, inheritance model, tunnel architecture), Guides (provisioning on Hetzner, setting up WhatsApp, building a blueprint, creating a swarm), API Reference (REST + webhook event schema), and Security (hardening checklist, secret rotation, compliance). Docs are versioned to match ClawControl releases.

---

## Auth Routes

### `/auth/login`

Email + password login with optional SSO redirect. On failed attempts, lockout with exponential backoff. Login events are written to the org audit log with IP, user agent, and timestamp.

### `/auth/register`

Standard registration with email verification. On completion, the user is prompted to either connect their first OpenClaw instance or invite team members. No credit card required to start on the free tier.

### `/auth/sso`

SAML 2.0 and OIDC configuration. Enterprise orgs can enforce SSO so that all members must authenticate through their identity provider. SSO bypass is disabled when enforcement is active.

### `/auth/mfa`

TOTP (authenticator app) and WebAuthn (hardware key) support. MFA can be enforced org-wide by an admin. Recovery codes are shown once at setup and stored hashed. Lost MFA recovery flows through org admin approval.

### `/auth/recovery`

Email-based account recovery for standard accounts. For SSO accounts, recovery is handled through the identity provider. All recovery events are flagged in the org audit log.

### `/auth/device`

The device pairing flow for headless VPS installations. When a user runs the bootstrap installer on a new server, the installer prints a short device code. The user visits this page, enters the code, and the server is linked to their org with the appropriate token injected. Inspired by OAuth device flow. This eliminates the need to copy-paste long tokens into server environment files manually.

---

## Org Routes

### `/org/switch`

Multi-org switcher. Users who belong to multiple orgs (common for consultants managing multiple client deployments) can switch context without logging out. The current org is always shown in the top nav.

### `/org/new`

Create a new org. Sets the org slug (used in webhooks and API), display name, and default timezone. The creator becomes the first Owner. Up to three orgs are allowed on the free tier.

### `/org/members`

Member directory with roles: Owner, Admin, Operator, Viewer, and a custom role builder for enterprise. Invite by email with role pre-assignment. Pending invites shown with resend and revoke options. Each member's last active time and MFA status are visible to admins. Bulk role changes supported.

### `/org/teams`

Teams are named groups of members used for access scoping. A team can be granted access to specific instances, specific swarms, or specific agents — without granting org-wide access. Useful for separating a "Support Ops" team from a "Engineering Agents" team. Teams are also used in the audit log to attribute changes.

### `/org/audit`

Org-level audit log covering: member invites and removals, role changes, billing changes, SSO config changes, and API key creation/revocation. Searchable and filterable by actor, event type, and date. Exportable to CSV or pushed to a SIEM via the integrations config.

### `/org/billing`

**Plan:** Current plan, next renewal date, and a clear upgrade/downgrade path. **Invoices:** Downloadable PDF invoices with line-item breakdown. **Usage:** Real-time meter showing current-period consumption — active nodes, agents, messages processed, skill scans run, storage used. Usage is broken down by instance so you can see which deployments are driving cost.

---

## Settings Routes

### `/settings/profile`

Display name, avatar, timezone, and notification preferences. Language selection. Danger zone: delete account (with confirmation that org ownership must be transferred first).

### `/settings/api-keys`

Personal API tokens for the ClawControl REST API. Tokens are named, scoped (read-only vs. read-write, scoped to specific resources), and have optional expiry. The full token value is shown only once at creation. Revoke any token immediately. Last-used timestamp shown to help identify stale tokens.

### `/settings/webhooks`

Configure outbound webhooks that fire on ClawControl events: instance status change, agent status change, session escalation, skill scan result, security incident, budget threshold hit. Each webhook has a secret for HMAC signature verification. Webhook delivery log shows recent attempts with response codes and retry history.

### `/settings/notifications`

Granular notification preferences: which events trigger email vs. in-app vs. webhook. Notification digest options for high-volume orgs (hourly or daily digest instead of per-event). Quiet hours configuration.

### `/settings/appearance`

Light/dark/system theme. Compact vs. comfortable density. Sidebar collapsed by default option. Dashboard widget layout preferences (saved per user, not per org).

---

## Fleet Routes

### `/fleet/overview` — Global War Room

The first screen most operators see after logging in. Every registered OpenClaw instance is shown as a status card in a responsive grid. Each card displays: instance name and provider icon, current status (Online / Idle / Busy / Degraded / Offline), active agent count, tunnel latency, running version with CVE badge if vulnerable, and resource pressure bar (CPU/RAM). Cards are color-coded by health. Clicking any card goes to that instance's overview.

Above the grid: a summary bar with total instances, total active agents, total active sessions, and fleet-wide spend velocity. A persistent **Global Kill Switch** button sits in the top-right corner of every fleet page — one click pauses all agents across all instances simultaneously and opens a confirmation dialog with impact summary before executing.

Sorting and filtering: filter by provider, region, status, version, swarm membership, or tag. Sort by name, status, last heartbeat, or risk score.

### `/fleet/instances/new` — Provision Wizard

A three-path wizard for adding a new OpenClaw instance.

**Path 1 — Cloud Provision:** Connect a cloud provider API key (DigitalOcean, Hetzner, AWS, Vultr) and ClawControl provisions a VM directly. Select instance size, region, and OS. The wizard generates and injects a `docker-compose.yml` with toggle options: headless browser module on/off, Redis cache on/off, sandbox mode on/off, Tailscale mesh join token. The instance is provisioned, OpenClaw installed, and the sidecar tunnel agent started — all within the wizard. The instance appears in the fleet grid within about two minutes.

**Path 2 — BYO Server:** For users who already have a VPS. The wizard generates a one-liner bootstrap script embedding the org token and control plane URL. The user pastes it into their server's terminal (or uses `/auth/device` pairing). The script installs OpenClaw, configures the sidecar tunnel agent, and phones home to register the instance. Step-by-step instructions are shown for Ubuntu, Debian, and Docker-based setups.

**Path 3 — Managed Instance:** ClawControl fully hosts and operates the OpenClaw gateway. The user picks a region and plan tier. No server access needed. Suitable for teams who want the benefits of OpenClaw without infrastructure management. Priced as an add-on to the SaaS subscription.

After provisioning via any path: the wizard walks through baseline hardening — rotate the default gateway token, confirm the public gateway port is closed, select a baseline security policy template, and optionally assign the new instance to an existing swarm or blueprint.

---

### `/fleet/instances/:instanceId/overview` — Instance Dashboard

The single-pane view for one OpenClaw instance. Split into four quadrants.

**Status quadrant:** Tunnel status (connected / reconnecting / offline), gateway version with last-checked CVE status, uptime since last restart, and active session count. Quick action buttons: restart gateway, pause all agents on this instance, push config, force heartbeat.

**Resource quadrant:** Live charts for CPU, RAM, and disk usage over selectable windows (1h / 6h / 24h / 7d). Alert thresholds shown as horizontal lines on the chart. If any metric breaches its threshold, the chart border turns orange or red and a notification is triggered.

**Agents quadrant:** List of all agents on this instance with their current status, bound channels, active session count, and last activity time. One-click navigate to any agent. "Add agent" shortcut.

**Events quadrant:** Chronological event log scoped to this instance: restarts, config reloads, skill installs, security events, tunnel reconnects, agent status changes. Each event links to the relevant audit entry.

---

### `/fleet/instances/:instanceId/terminal` — Secure Web Terminal

The web-based SSH replacement. No inbound ports are ever opened on the VPS. The agent node maintains an outbound encrypted tunnel to the control plane, and the terminal session is proxied back through that tunnel via WebSocket. Authentication is via the user's ClawControl session — no SSH keys to manage or distribute.

#### `/fleet/instances/:instanceId/terminal/shell`

Full interactive terminal rendered with xterm.js in the browser. Supports color output, cursor movement, copy/paste, terminal resize on window resize, and all standard ANSI escape sequences. Keyboard shortcuts work as expected. The connection authenticates with a short-lived signed token derived from the user's session, scoped to this instance only.

A persistent banner at the top of the terminal reminds the operator: "Commands executed here bypass agent policies and are logged to the audit trail." Destructive commands (detected by pattern: `rm -rf`, `dd`, `mkfs`, truncating pipes) trigger an inline confirmation prompt before the keystroke is forwarded.

**Access control:** Terminal access is a separate permission, distinct from config-read or config-write. Roles: `terminal:view` allows read-only TUI mirror access. `terminal:exec` allows full shell. Neither is granted to the Viewer role by default. Admins can grant terminal access per-team or per-member for specific instances.

#### `/fleet/instances/:instanceId/terminal/tui`

OpenClaw's own native Terminal UI rendered in the browser. This is the same interactive status dashboard and setup wizard that a user would see if they SSH'd into the server and ran the OpenClaw TUI directly. Useful for: initial agent setup via the guided wizard, inspecting real-time agent status in OpenClaw's native format, and running the interactive channel login flows (e.g., WhatsApp QR pairing from the TUI). Because it's the native UI, no translation layer is needed — operators familiar with the CLI feel at home.

#### `/fleet/instances/:instanceId/terminal/history`

Every command executed through the web shell is logged here with: timestamp, the authenticated ClawControl user who ran it, the raw command string, the exit code, and a truncated preview of stdout. Commands are stored in the immutable audit trail and mirrored to this view for convenience. Searchable by user, command pattern, date, and exit code. Exportable to CSV. This is the key accountability advantage over raw SSH — every action is attributed to a named user regardless of which shared key or account they used.

#### `/fleet/instances/:instanceId/terminal/sessions`

Named terminal sessions, similar to tmux windows but managed by ClawControl. A session is a persistent shell context on the server that survives browser disconnects. When reconnecting, the user can resume an active session and see the scrollback buffer from where they left off. Sessions are labeled (e.g., "skill migration," "config debug") and timestamped. Session history is capped by the org's retention policy. Useful for long-running operations where the operator may need to disconnect and return.

**Command Palette:** Available in both shell and TUI modes. A keyboard shortcut (Ctrl+P) opens a searchable dropdown of pre-built OpenClaw CLI commands with argument hints: `openclaw agents list --bindings`, `openclaw channels login --channel whatsapp --account biz`, `openclaw skills install <name>`, `openclaw status`, `openclaw config validate`. Selecting a command inserts it into the terminal ready to execute, reducing typos and learning curve.

---

### `/fleet/instances/:instanceId/files` — Remote File Manager

Because OpenClaw is fundamentally file-first — all state lives in `~/.openclaw/` as flat files — remote file management is not a convenience feature, it is core management infrastructure.

#### `/fleet/instances/:instanceId/files/explorer`

A file explorer UI scoped to the OpenClaw working directory on the remote server. The directory tree is fetched via the secure tunnel. Folders shown include: the main config directory, workspace/memory files, personality files (`SOUL.md`, `AGENTS.md`, `USER.md` at both instance and per-agent level), skills directory, logs directory, and session store. Files can be opened for inline editing. New files can be created. Files can be downloaded locally. Deletion requires a confirmation and is logged to audit.

**Scope restrictions:** The file explorer is scoped to the OpenClaw directory by default. Expanding scope to the broader filesystem requires the `terminal:exec` permission and is logged separately. This prevents accidental system-file modification while still allowing full access to operators who need it.

**File type awareness:** `.md` files open in a Markdown editor with live preview. `.json` and `.yaml` files open in a code editor with syntax highlighting and schema validation (the OpenClaw config schema is built in). `.log` files open in the log viewer with filtering controls.

#### `/fleet/instances/:instanceId/files/editor`

The inline editor for files opened from the explorer. Monaco editor (same as VS Code) with: syntax highlighting for all relevant file types, JSON5 schema validation for `openclaw.json`, Markdown preview toggle for `.md` files, line numbers, find/replace, and keyboard shortcuts. Before saving, a git-style diff panel shows exactly what changed. The user must confirm the diff before the write is sent to the server. All saves are logged to the audit trail with the before/after diff stored.

**Rollback:** The last 10 versions of any edited file are retained by ClawControl. A version history sidebar shows each save with timestamp, author, and a one-line change summary. Any version can be restored with one click, which itself creates a new audit entry.

#### `/fleet/instances/:instanceId/files/sync`

Shows the sync status between the control plane's desired state and the actual state on the VPS. If a config was pushed from ClawControl but the server has since been modified directly (via SSH), the drift is shown here as a diff. The operator can choose to: push the ClawControl version (overwrite local changes), pull the server version (adopt the local changes into ClawControl), or view the diff and manually resolve. This is especially useful for teams where some operators prefer CLI access and others prefer the dashboard.

---

### `/fleet/instances/:instanceId/config` — Instance Global Configuration

This is the most important section that prior blueprints underemphasized. Instance-level config is the **source of truth that all agents on this instance inherit**. Changes here propagate automatically to all agents unless an agent explicitly overrides a specific setting.

#### `/fleet/instances/:instanceId/config/general`

Core instance settings: display name, description, tags (used for filtering in the fleet overview), assigned swarm, timezone, and the instance's unique identifier. Gateway restart behavior (auto-restart on crash: on/off). Maintenance window configuration (scheduled downtime that suppresses alerts). Contact/owner information for multi-team orgs.

#### `/fleet/instances/:instanceId/config/providers`

Which LLM providers are available to agents on this instance. For each provider: API key (encrypted, write-only after entry), enabled/disabled toggle, default model selection, and daily spend limit. Providers supported: Anthropic (Claude), OpenAI (GPT series), Ollama (local models — with auto-discovery for Ollama instances on the same network), DeepSeek, Groq, OpenRouter. The model picker for each provider fetches the live model list from that provider's API, so you're never typing model names manually. Agents can use any enabled provider unless further restricted at the agent level.

#### `/fleet/instances/:instanceId/config/tools`

The global tool allow/deny defaults for this instance. All agents inherit this list unless they override it. Presented as a checkbox grid: `exec` (shell command execution), `read` (filesystem read), `write` (filesystem write), `edit` (file modification), `browser` (headless browser), `canvas` (image/media generation), `cron` (scheduled tasks), `nodes` (multi-agent messaging). Enabling a tool here makes it available to all agents; an agent can further restrict but cannot expand beyond the instance-level grants. This is the core security leverage point — a locked-down instance cannot be escaped by a misconfigured agent.

#### `/fleet/instances/:instanceId/config/skills`

Skills installed at the instance level are available to all agents. This is where you install foundational skills that every agent needs (e.g., a file system skill, a web search skill) without repeating the installation per agent. The skill list shows name, version, install date, permission footprint, and status. Skills can be enabled/disabled globally here, and their effective permission scope can be narrowed.

#### `/fleet/instances/:instanceId/config/policies`

Baseline security policies applied to all agents on this instance. Policies are structured rules: filesystem path allowlists (agents can only write to `/tmp/sandbox`), network egress allowlists/denylists (block all outbound except approved domains), shell command restrictions (deny `rm`, `dd`, `curl` with certain flags), and rate limits (max tool calls per minute per agent). Policies can be selected from built-in templates (Strict, Standard, Permissive) or composed from scratch in the visual policy editor. A policy simulator lets you test whether a specific tool call would be allowed or denied under the current policy.

#### `/fleet/instances/:instanceId/config/environment`

Environment variables and secrets available to the instance and all its agents. Displayed as key-value pairs with values masked by default. Used for things like `CALENDAR_API_KEY`, `SMTP_HOST`, database connection strings. Variables can be marked as "agent-visible" (passed to agents) or "instance-only" (used only by the gateway). New entries are encrypted at rest. Deleting a variable that is referenced by a skill triggers a warning listing the affected skills.

#### `/fleet/instances/:instanceId/config/sandbox`

Sandbox mode configuration for the entire instance. Sandbox mode runs agent tool executions in an isolated Docker container, preventing them from touching the host filesystem or network beyond what's explicitly permitted. Toggle sandbox on/off for the instance. If on, configure the Docker image used for sandboxing, resource limits (CPU/RAM caps per sandbox), and the path mounts that are allowed into the sandbox. Sandbox status is shown prominently on the instance overview.

---

### `/fleet/instances/:instanceId/personalities` — Instance Global Personalities

This section manages the personality files that all agents on this instance inherit unless they define their own. This is the layer that prior blueprints missed: a global persona scaffold that makes all agents on the instance consistent in tone, role framing, and core instructions, without requiring per-agent duplication.

#### `/fleet/instances/:instanceId/personalities/soul`

The global `SOUL.md` file for this instance. Defines the foundational identity, values, communication style, and behavioral constraints that all agents inherit. The editor is Monaco with Markdown preview. A split panel shows the raw file on the left and the rendered preview on the right. A banner at the top indicates how many agents on this instance are inheriting this file vs. how many have overridden it with their own.

Changes trigger a confirmation dialog showing exactly which agents will be affected. The push is atomic — all affected agents receive the new file simultaneously via the tunnel.

#### `/fleet/instances/:instanceId/personalities/agents-md`

The global `AGENTS.md` file. Defines the operational instructions, task scope, tool usage guidelines, and escalation rules that apply instance-wide. Same editor and inheritance indicator as the `SOUL.md` page.

#### `/fleet/instances/:instanceId/personalities/user-md`

The global `USER.md` context file. Contains background information about the user or organization that all agents on this instance should know. Typically includes: user preferences, communication style, key facts about the business, important contacts. Edited here at the instance level; agents can extend it locally.

#### `/fleet/instances/:instanceId/personalities/blueprints`

A library of saved persona blueprints scoped to this instance. Blueprints are named, versioned combinations of `SOUL.md` + `AGENTS.md` + tool policy + skill set. An operator can define a "Support Agent" blueprint and a "Researcher" blueprint, then apply either to any new agent created on this instance with one click. Instance-scoped blueprints are distinct from the global blueprint library at `/blueprints` — they are local to this instance and visible only to its operators.

#### `/fleet/instances/:instanceId/personalities/history`

Full version history for all personality files on this instance. Each entry shows: which file changed, timestamp, author (ClawControl user), and a diff. Any version of any file can be restored. History is retained according to the org's data retention policy.

---

### `/fleet/instances/:instanceId/channels` — Instance Channel Management

Manages the channel connections and routing at the instance level. Channels configured here are available to all agents on the instance for routing.

#### `/fleet/instances/:instanceId/channels/connectors`

Lists all messaging platform connections configured on this instance: Telegram bots, Discord bots, WhatsApp accounts, Slack workspaces, Signal accounts, Mattermost instances. Each connector shows its current status (Connected / Expired / Auth Required), account identifier, and which agents it is currently routed to.

Adding a new connector launches a platform-specific setup wizard. For Telegram: paste bot token, verify via Telegram API, confirm bot name. For Discord: authorize via OAuth, select server, confirm permissions including Message Content Intent. For WhatsApp: the wizard renders the QR code generated by the OpenClaw CLI directly in the browser — no SSH needed to scan it. For Slack: standard OAuth app install flow. All tokens and secrets are encrypted at rest immediately on submission and never shown again in full.

#### `/fleet/instances/:instanceId/channels/routing`

The routing rule table for this instance. Rules define how inbound messages are dispatched to agents based on the channel, account identifier, and optionally the peer (specific user, group, or channel ID). The binding system uses most-specific-wins logic: a peer-level rule beats an account-level rule which beats a channel-level rule.

Rules are edited in a table with inline controls: channel dropdown, account dropdown (populated from connected connectors), optional peer field, and agent assignment dropdown. Drag to reorder for priority within the same specificity tier. A visual canvas mode is available as an alternative: channels listed on the left, agents on the right, arrows drawn between them representing bindings. Drag an arrow from a channel account to an agent to create a binding.

Advanced routing options: conditional rules (route to Agent B if Agent A is offline), load-balanced routing (round-robin across multiple identical agents), and time-based routing (route to "Night Agent" between 22:00 and 08:00 in the instance timezone).

#### `/fleet/instances/:instanceId/channels/health`

Per-channel health monitoring. For each connected channel account: connection status, last successful message receive, last successful message send, webhook delivery success rate over the past 24h, and recent error log. A latency chart shows message delivery round-trip time over time. Alerts can be configured per channel: "Alert me if WhatsApp loses connection for more than 5 minutes." Reconnect action available per connector.

---

### `/fleet/instances/:instanceId/sessions`

All active and recent sessions across all agents on this instance. Same session inbox features as the global `/sessions/inbox` but scoped to this instance. Useful for instance operators who don't have org-wide session visibility.

### `/fleet/instances/:instanceId/skills`

Aggregated view of all skills installed on this instance — both instance-level skills and agent-level skills. Useful for understanding the full skill surface area of an instance at a glance. Links to the relevant install location for each skill.

### `/fleet/instances/:instanceId/observe`

Scoped observability for this instance: resource telemetry, traces, logs, and cost — all filtered to this instance. Same sub-features as the global `/observe` section but pre-filtered. Useful for per-instance billing attribution.

### `/fleet/instances/:instanceId/security`

Security posture view scoped to this instance. Shows the instance's risk score, open exposure findings, CVE status, sandbox configuration status, and active security policies. Quick access to quarantine this instance (pause all agents, block egress, preserve state). Links to the global `/security` center for org-wide operations.

---

## Agent Routes

### `/agents/catalog` — Cross-Fleet Agent Directory

A searchable, filterable table of every agent across every instance in the org. Columns: agent name, instance, model in use, blueprint version, active session count, status, last active, and risk score. Tags for role categories (support, engineering, research, finance, media). Bulk operations: pause selected agents, push a config update to selected agents, apply a blueprint to selected agents. Useful for org-wide agent governance.

### `/agents/new` — Create Agent

A guided wizard for creating a new agent. Steps: select the target instance, choose a name and agent ID, select a starting blueprint (or start from scratch), configure model and provider, set channel bindings, configure tool policy (inherit from instance or customize), configure skill set (inherit from instance or customize), and set spend limits. On completion, the agent is created on the remote instance via the tunnel and appears immediately in the catalog.

### `/agents/compare` — Side-by-Side Agent Diff

Select any two agents from the org. The compare view shows their configuration side by side with diffs highlighted: personality files, tool policy, skills, model, channel bindings, and spend limits. Useful for understanding why two supposedly identical agents are behaving differently, and for auditing configuration drift between agents in a swarm.

---

### `/agents/:agentId/overview` — Agent Dashboard

The agent-level equivalent of the instance overview. Shows: current status (Active / Idle / Awaiting Tool / Paused / Error), which instance it runs on, bound channels and accounts, active sessions, last activity, and current model. Quick actions: pause/resume, rotate secrets, quarantine, view live sessions, jump to personality editor.

An inheritance summary panel shows at a glance which settings are inherited from the instance vs. overridden locally. Clicking any inherited setting jumps to the instance config page where it is defined.

---

### `/agents/:agentId/personality` — Agent Personality Management

The agent's own personality layer. This is where the per-agent identity is defined, distinct from the instance-level globals.

#### `/agents/:agentId/personality/soul`

This agent's `SOUL.md`. If no local file exists, the page shows the inherited instance-level `SOUL.md` in a read-only "inherited" state with a prominent "Override for this agent" button. Clicking override creates a local copy that the operator can customize. The override status and the instance parent are always shown. The editor is Monaco with Markdown preview. Saving shows a diff vs. the previous version and requires confirmation.

#### `/agents/:agentId/personality/agents-md`

This agent's `AGENTS.md`. Same inherited/override pattern as `SOUL.md`. Typically more specific than the instance version — where the instance `AGENTS.md` might say "you are a helpful assistant," the agent-level file might say "you specifically handle Tier 1 support tickets for product X."

#### `/agents/:agentId/personality/user-md`

This agent's `USER.md`. Contains the specific user context for whoever this agent primarily interacts with. For a personal assistant agent, this might contain the user's preferences, contacts, and schedule format. For a customer support agent, it might contain common customer profiles and FAQs.

#### `/agents/:agentId/personality/variables`

Template variables defined for this agent's personality files. Variables like `{{role}}`, `{{timezone}}`, `{{username}}`, `{{company}}` are listed with their current values. Changing a variable value here propagates through all personality files that reference it without requiring manual edits to each file. Variable values can be different per agent even if they share the same blueprint template.

#### `/agents/:agentId/personality/history`

Version history for all personality files on this agent. Timestamped, attributed to the ClawControl user who made the change, with full diffs. Rollback to any prior version. History is especially important here because personality changes directly affect agent behavior — a bad prompt change can cause regressions that need quick rollback.

---

### `/agents/:agentId/tools` — Agent Tool Policy

#### `/agents/:agentId/tools/allowed`

The tool allow/deny list for this specific agent. Displayed in two columns: "Effective policy" (the resolved combination of instance defaults and agent overrides) and "This agent's overrides" (what is set locally). Operators can restrict any tool that is enabled at the instance level. They cannot grant a tool that is denied at the instance level — the instance is the ceiling. Changes are pushed to the agent's config on the remote instance immediately.

#### `/agents/:agentId/tools/sandbox`

Sandbox configuration specific to this agent. Can be enabled independently of the instance-wide sandbox setting. Shows current mode (off / on / all), the Docker image and resource limits in use if sandbox is active, and the path mounts currently permitted into the sandbox. Changing sandbox mode for a single agent does not affect other agents on the instance.

#### `/agents/:agentId/tools/policies`

Fine-grained policy rules for this agent, layered on top of instance policies. A visual rule builder: select a tool, select a constraint type (filesystem path allowlist, network egress domain allowlist, rate limit, command pattern denylist), and set the value. Rules are shown in priority order with drag-to-reorder. The effective combined policy (instance + agent) is shown in a resolved preview panel.

#### `/agents/:agentId/tools/simulator`

A dry-run tool call simulator. Enter a hypothetical tool call: tool name, arguments, and any relevant context. The simulator resolves the tool call against the agent's effective policy (instance + agent layers) and returns: ALLOW or DENY, the specific rule that matched, and which policy layer it came from. Invaluable for testing whether a new policy will actually block what you intend, and for debugging why a specific tool call failed in a session.

---

### `/agents/:agentId/skills` — Agent Skill Management

#### `/agents/:agentId/skills/installed`

Skills installed specifically for this agent, in addition to any instance-wide skills. The list shows both instance-inherited skills (grayed, with an "inherited" badge) and agent-specific skills (active). For each skill: name, version, author, install date, and the permissions it declared at install time. Disable any skill on this agent with a toggle (does not uninstall, just blocks loading). Uninstall removes it from this agent's config.

#### `/agents/:agentId/skills/permissions`

A detailed permission viewer for each skill installed on this agent. For each skill, shows every permission it declared: filesystem paths it can read/write, network domains it connects to, shell commands it can run, other APIs it calls. The operator can set permission fences — restrictions narrower than what the skill declared. For example, a file system skill that declares access to `/home/ubuntu/` can be fenced to only `/home/ubuntu/docs/`. Fences are serialized into a `policy.yaml` and enforced at the gateway level.

#### `/agents/:agentId/skills/marketplace`

The skill marketplace filtered and scoped to this agent. Selecting a skill and clicking Install installs it only on this agent, not instance-wide. The deploy modal shows: which instance the agent is on, the skill's required environment variables (pre-populated from the instance environment vault where possible), and the security scan result. Cannot install skills rated CRITICAL risk.

---

### `/agents/:agentId/channels` — Agent Channel Bindings

#### `/agents/:agentId/channels/bindings`

The channel-to-agent routing rules that direct inbound messages to this specific agent. Shows all active bindings: each binding's channel, account identifier, and priority. The operator can add new bindings (connecting an additional channel account to this agent), modify existing ones, or remove them. The binding editor mirrors the instance-level routing page but is pre-filtered to this agent.

An inheritance indicator shows which bindings come from instance-level routing rules vs. which are agent-specific. Instance-level bindings cannot be deleted from this page — they must be modified at the instance level. Agent-specific bindings can be freely managed here.

#### `/agents/:agentId/channels/overrides`

Peer-level routing overrides for this agent. A peer is a specific conversation partner: a phone number, a Discord user ID, a Slack channel ID. Adding a peer override means that messages from that specific peer are always routed to this agent, regardless of the broader account-level binding. Useful for: routing a specific high-value customer to a premium agent, routing a test user to a staging agent, or routing a specific Discord channel to a specialized agent.

---

### `/agents/:agentId/memory` — Agent Memory Management

#### `/agents/:agentId/memory/browser`

A file explorer scoped to this agent's workspace directory: `~/.openclaw/agents/:agentId/workspace/`. Shows all memory files — `.md` knowledge files, `.json` structured data, `.yaml` config snippets. Folders mirror the agent's organizational structure. Files can be opened for inline editing, downloaded, or deleted. The browser shows file size and last-modified date to help identify stale knowledge.

#### `/agents/:agentId/memory/editor`

The inline editor for any file opened from the memory browser. Monaco editor with Markdown preview for `.md` files and schema validation for `.json` files. Saves are pushed to the VPS via the tunnel with a diff confirmation step. Every save is logged to the audit trail with a before/after diff.

#### `/agents/:agentId/memory/inject`

A quick-injection form for adding facts to the agent's memory without navigating the file system. The operator types a fact in natural language (e.g., "Client Acme Corp prefers to be contacted only on Tuesday and Thursday mornings"), selects which memory file to append to (or creates a new file), and clicks Inject. The fact is formatted and appended immediately. Useful for on-the-fly knowledge updates during live operations.

#### `/agents/:agentId/memory/health`

Automated memory quality analysis. Runs periodically and on demand. Reports: total memory file count and size, last-modified distribution (highlights files not updated in over 90 days as potentially stale), conflict detection (pairs of facts that appear semantically contradictory, surfaced using embedding similarity and presented as side-by-side cards with a Resolve button), redundancy detection (near-duplicate facts that could be consolidated), and a memory health score (0–100) summarizing overall quality. Resolving a conflict presents both versions and asks the operator which is correct, then archives the incorrect version with a timestamp.

---

### `/agents/:agentId/model` — Agent Model Configuration

#### `/agents/:agentId/model/provider`

Which LLM provider and specific model this agent uses. Dropdown of enabled providers (from instance config). For each provider, the model picker fetches the live model list. Shows the currently active provider/model with a clear inheritance indicator if it matches the instance default. Override to set a different model for this agent. Common use case: the instance default is Claude Haiku for cost efficiency, but this specific agent is a complex reasoning agent that needs Claude Opus.

#### `/agents/:agentId/model/limits`

Per-agent token and spend limits. Daily token cap (agent pauses and sends an escalation notification when hit). Daily spend cap in currency (calculated from token usage × provider pricing). Monthly spend cap. What happens on limit hit: pause agent, send notification, or switch to a cheaper fallback model. Fallback model selector. Current period usage shown against limits with a progress bar.

#### `/agents/:agentId/model/schedule`

Time-of-day model switching for this agent. Configure a schedule: during business hours (defined by timezone + hour range), use Model A; outside business hours, switch to Model B. Example: Claude Opus during 09:00–18:00 for high-quality responses, Claude Haiku overnight for routine processing. Schedule is shown as a 24-hour visual timeline with model assignments color-coded. Multiple time windows supported per day.

---

### `/agents/:agentId/sessions` — Agent Session Inbox

#### `/agents/:agentId/sessions/inbox`

The session inbox scoped to this specific agent. Same features as the global session inbox (real-time feed, filters, sentiment indicators, God Mode injection) but showing only this agent's conversations. Useful for an operator responsible for a single agent or a small team of agents.

#### `/agents/:agentId/sessions/:sessionId`

Full session view — same as the global session detail page but reached via the agent context. Shows the conversation thread, tool-call trace panel, and replay controls. See the `/sessions/:sessionId` section for full detail.

---

### `/agents/:agentId/observe` — Agent Observability

#### `/agents/:agentId/observe/traces`

Execution traces scoped to this agent. LLM call waterfall showing time breakdown per turn: LLM processing, tool execution, network latency, queue wait. Searchable by date, session, tool name, and error status. The top 5 slowest interactions of the past 24h are highlighted. Clicking any trace opens the full replay view.

#### `/agents/:agentId/observe/logs`

Structured log stream for this agent. Filterable by log level (debug, info, warn, error), time range, and keyword. Auto-redacts API keys, tokens, and password patterns before displaying. Download filtered log segments as CSV or JSON.

#### `/agents/:agentId/observe/cost`

Token usage and spend for this agent only. Broken down by provider, by session, and by time period. Projected monthly spend based on current velocity. Links to the instance-level and org-level cost views for broader context.

---

### `/agents/:agentId/security` — Agent Security

#### `/agents/:agentId/security/posture`

Security posture score for this specific agent. Factors: sandbox status, tool policy restrictiveness, installed skill risk scores, model provider data residency, and memory scope (how broadly the agent can read/write). Actionable recommendations listed in priority order.

#### `/agents/:agentId/security/quarantine`

Quarantine controls for this agent. Quarantine mode: pauses the agent, blocks all egress (network calls from skills), disables all tools except read-only file access, and preserves the full current state for forensic analysis. Shows current quarantine status. Log of past quarantine events with duration and resolution.

#### `/agents/:agentId/security/audit`

The agent-scoped audit trail: every config change, skill install/remove, tool policy change, personality edit, and security event attributed to this agent. Timestamped, attributed to the ClawControl user who performed the action. Immutable and exportable.

---

## Session Routes

### `/sessions/inbox` — Global Unified Inbox

The aggregated real-time feed of every conversation across every instance, agent, and channel in the org. This is what operators monitor during live operations.

Each session card shows: the source channel icon and account name, the agent handling it, the instance it runs on, the last message preview, timestamp, sentiment indicator (green / neutral / yellow / red), and escalation status. New messages cause the card to pulse briefly. High-sentiment (frustrated user) sessions are pinned to the top with a red border.

Filters: instance, agent, swarm, channel, channel account, sentiment range, escalation state (escalated / human-takeover / normal), session status (active / idle / ended), date range. Multiple filters can be combined. Filter sets can be saved as named views (e.g., "Tier 1 Support - WhatsApp" or "All Urgent Sessions").

**God Mode:** Any session can be taken over. The operator types a message in the session's input box and clicks "Inject as Agent." The message is sent to the conversation as if the agent sent it, but it is flagged in the audit trail as a human injection with the operator's identity. The agent's context is updated to include the injected message so subsequent AI responses are coherent. All injections are logged.

**Escalation:** Sessions can be escalated (flagged for human review) either automatically (by sentiment threshold or keyword) or manually. Escalated sessions are surfaced in a dedicated filtered view and trigger notifications to the configured escalation contacts.

### `/sessions/search`

Full-text search across all session history in the org. Search by message content (with regex support), agent, instance, channel, date range, and session outcome. Results show matching message snippets with context. Clicking a result opens the full session. Search history is saved per user for the past 30 days.

---

### `/sessions/:sessionId` — Session Detail

The full view for a single conversation.

#### `/sessions/:sessionId/conversation`

The conversation thread rendered chronologically. Each message shows: sender (human user or agent), timestamp, channel, and delivery status. Agent messages include a subtle indicator showing which model generated them. A debug overlay toggle reveals the raw LLM reasoning trace and tool call JSON for any agent message — showing exactly what the agent was thinking and which tools it invoked when producing that response. Images, files, and media shared in the conversation are rendered inline.

#### `/sessions/:sessionId/trace`

The execution trace for this session. A Gantt-style waterfall chart showing every LLM call and tool execution in the session plotted against time. Each row is one "turn": LLM processing (blue), tool execution (green), network latency (yellow), and queue wait (gray). Hovering any segment shows the raw input, output, and timing. The total token count and estimated cost for the session is shown in the header.

#### `/sessions/:sessionId/replay`

Step-by-step replay mode. The session is replayed from the beginning, with each turn advanced manually using a "next step" button or automatically at configurable speed. At each step, the current context window is shown: what the agent knew, what tool calls it made, and what it received back. Used for post-mortem analysis of unexpected behavior, or for demonstrating agent decision-making to stakeholders.

#### `/sessions/:sessionId/audit`

Every action taken during this session: messages received and sent, tool calls made (with arguments and results), memory files read or written, skills invoked, model API calls made. Timestamped and immutable. Exportable as a structured JSON report for forensic or compliance purposes.

---

## Skills Routes

### `/skills/overview` — Fleet-Wide Skill Matrix

A cross-instance, cross-agent view of every skill deployed in the org. Each skill appears as a row with columns: skill name, version, install count (how many agents have it), highest risk rating across all installs, and whether any instances are on different versions (drift indicator). Clicking a skill opens its detail view showing every agent and instance it is installed on, with version and permission scope per install.

### `/skills/installed` — Installed Skill Management

#### `/skills/installed` (list)

All skills installed across the org, sorted by install count. Filter by instance, agent, version, permission scope, or risk rating. Select multiple skills and perform bulk operations: update all to latest, uninstall from selected agents, or apply a permission fence across all installs.

#### `/skills/installed/drift`

Skills where version mismatches exist across the fleet. For each drifted skill: the versions in use, which instances/agents are on each version, and the changelog between versions. Actions: normalize all to latest vetted version (pushed fleet-wide via tunnel), or lock all to a specific version. Drift is a security and consistency concern — this page makes it visible and actionable.

---

### `/skills/policies` — Global Policy Templates

#### `/skills/policies` (list)

Named policy templates that can be applied to any instance or agent. A policy template is a reusable set of tool restrictions, filesystem path allowlists, network egress rules, and rate limits. Built-in templates: Strict (heavily restricted, suitable for public-facing agents), Standard (balanced for most use cases), Developer (permissive, for coding agents with broad tool needs), Isolated (read-only, for research agents). Custom templates can be created and saved.

#### `/skills/policies/new`

Policy template builder. A visual rule composer: select a restriction type from a dropdown (filesystem fence, network denylist, tool disable, rate limit, command pattern block), configure the rule parameters, and add it to the template. Rules are listed in order with drag-to-reorder for priority. A preview panel shows what a sample tool call would look like when processed through this policy. Save with a name and optional description.

#### `/skills/policies/:policyId`

Policy detail and editor. Shows all rules in the template, when it was last modified, which instances and agents are currently using it, and an audit trail of changes. Modifying a policy that is actively used shows a warning listing all affected deployments. Changes propagate to all deployments immediately or can be staged for a scheduled push.

---

### `/skills/marketplace` — Safe Harbor Marketplace

#### `/skills/marketplace/browse`

The curated skill registry browser. Skills are fetched from the ClawHub registry and displayed in a grid with: skill name, author, category, install count, star rating, last updated date, and a risk badge (from the ClawControl scanner). Category filters: Productivity, Communication, Finance, Development, Data, Media, Security, Utilities. Search by name or keyword. Sort by popularity, recency, or trust score. Skills with CRITICAL risk rating are hidden by default (toggle to show with a warning).

#### `/skills/marketplace/:skillId`

Skill detail page. Shows full README, author information, version history with changelogs, install count, user ratings and reviews (community trust signals), required environment variables, and declared permissions. Two action buttons: Install and Scan.

#### `/skills/marketplace/:skillId/readme`

Full rendered README for the skill. Includes usage documentation, configuration examples, and known limitations. Rendered from the skill's repository.

#### `/skills/marketplace/:skillId/scan`

The security scan results for this skill. The scanner runs heuristic static analysis on the skill source code and checks against known malware signature databases. Findings are categorized:

**Critical findings** (blocks installation): known malware signature, exfiltration pattern (sending data to unrecognized external endpoints), obfuscated code, or permission escalation attempt.

**High findings** (warns before installation): API keys passed into LLM context (leaky patterns), broad filesystem access without justification, shell execution with dangerous command patterns.

**Medium findings** (shown informally): network calls to third-party services, use of `eval` or dynamic code execution, access to sensitive OS paths.

**Low findings**: style issues, deprecated API usage, missing input validation.

The scan result shows a confidence score, the specific code locations of each finding, and the scanner version. Results are cached and shared — if 1,000 orgs have scanned the same skill version, they all see the same cached result. New versions trigger fresh scans. The scan page is publicly accessible (no login required) to promote ecosystem transparency.

#### `/skills/marketplace/:skillId/deploy`

The deploy modal for installing a skill. Steps: select target (instance-wide or specific agent(s)), fill in required environment variables (with validation against the declared schema), review the permission footprint, review any scan findings, and confirm. Installation is executed via the tunnel to the target instance(s) simultaneously. Progress is shown per target. Failures are logged and surfaced without aborting successful installs on other targets.

---

### `/skills/scan` — Scan Queue & Quarantine

#### `/skills/scan/queue`

Skills currently being scanned. Shows skill name, version, requester, scan start time, and estimated completion. The scanner runs asynchronously — submitting a scan request from the marketplace or install flow adds the skill to this queue. High-priority scans (triggered by a security alert) are surfaced at the top.

#### `/skills/scan/results`

All completed scan results for skills used in the org. Filterable by risk rating, skill name, scan date, and whether the skill is currently installed anywhere. Results link to the full scan detail page for each skill.

#### `/skills/scan/quarantine`

Skills that have been flagged after installation — either by a new scan finding or by a security alert from the community or ClawControl's threat intelligence feed. Each quarantined skill shows: which instances and agents it is currently installed on, the finding that triggered quarantine, and available actions. Actions: uninstall from all affected deployments (fleet-wide rip and replace), isolate (disable without uninstalling to preserve for forensics), or dismiss (mark as acceptable risk with an acknowledgment audit entry). All quarantine actions are logged with attribution.

---

## Channels Routes

### `/channels/overview` — Fleet-Wide Channel Status

A dashboard showing all channel connections across all instances in the org. Each connector appears as a row: instance, platform, account identifier, connection status, last message received, last message sent, and error count in the past 24h. Sort by status to surface all disconnected or erroring connectors. One-click reconnect where available. Useful for a morning health check: "Is everything connected?"

### `/channels/connectors/new` — New Connector Wizard

Platform-specific wizard for adding a new messaging channel connection. The wizard adapts its steps to the selected platform:

**Telegram:** Enter the bot token from BotFather. ClawControl verifies it via the Telegram API and retrieves the bot name. Select which instance to attach it to. The connector is created and ready for routing rules.

**Discord:** OAuth flow to authorize ClawControl's app to your Discord server. Select the server. Confirm required permissions (Read Messages, Send Messages, Read Message History, Message Content Intent). Select which instance to attach to.

**WhatsApp:** Initiates a WhatsApp web login on the target instance via the tunnel. The QR code generated by the OpenClaw CLI is fetched and displayed directly in the browser. The user scans with their phone. Session credentials are stored on the instance and the connection status updates in real time.

**Slack:** OAuth app install flow for a workspace. Select which channels the bot should have access to. Configure whether the bot responds only when mentioned or in all messages.

**Signal, Mattermost, Email (SMTP/IMAP):** Similar guided flows adapted to each platform's auth mechanism.

After connecting, the wizard immediately prompts: "Set up routing rules for this connector?" and offers to open the routing editor pre-filtered to this new connector.

### `/channels/connectors/:connectorId`

Detail page for a single channel connector. Shows: platform, account identifier, connection status history (uptime timeline), associated routing rules, and recent error log. Edit the connector's credentials (triggers re-authentication). Delete the connector (warns about and lists all routing rules that will be broken). Manually trigger a reconnect. View the raw webhook events received by this connector in the past 24h.

---

### `/channels/routing` — The Global Switchboard

#### `/channels/routing/rules`

The complete list of all routing rules across all instances in the org. Each rule: source instance, channel, account, optional peer override, target agent, and priority. Filterable by instance, channel, agent. The rules list is read-only at this global level for instances the current user doesn't manage — but navigating to a specific instance's routing page allows editing. Admins can edit all rules from this view.

#### `/channels/routing/tester`

A routing rule test simulator. Input a hypothetical inbound message event: select instance, select channel, select account, and optionally enter a peer identifier. Click "Resolve" and the simulator walks through the routing rule priority chain for that instance and shows exactly which agent would receive the message, which rule matched, and its specificity level. Invaluable for debugging routing misconfigurations before they cause live issues.

#### `/channels/routing/schedules`

Time-based routing schedule manager. Schedules layer on top of base routing rules and temporarily redirect traffic based on time. Examples: "After 22:00 and before 08:00, route all WhatsApp:biz messages to NightAgent instead of DayAgent." Schedules are shown on a weekly calendar view. Overlap conflicts are flagged with a warning. The schedule respects the timezone configured on each instance.

---

### `/channels/health`

#### `/channels/health/status`

Current connection status for every channel connector in the org. Color-coded: green (connected and healthy), yellow (connected but with recent errors), red (disconnected). Clicking any connector goes to its detail page. A summary bar shows total connected vs. total connectors for a quick percentage health view.

#### `/channels/health/latency`

Message delivery latency charts per connector over selectable time windows. Shows: time from inbound message received to agent response sent (end-to-end latency), time from message sent to delivery confirmation from the platform (delivery latency). Useful for identifying slow channels or slow agents and optimizing routing.

#### `/channels/health/errors`

Error log aggregated across all channel connectors. Each error entry: timestamp, connector, error type, message, and resolution status. Common error types: auth token expired, webhook delivery failure, rate limit hit, message too long. Filterable and exportable. Recurring errors on the same connector trigger an alert recommendation.

---

## Blueprint Routes

### `/blueprints/library` — Blueprint Gallery

All blueprints available in the org — both global blueprints (usable across all instances) and instance-scoped blueprints (visible here for discovery). Each blueprint card shows: name, description, category tag, last modified date, version number, and a preview of the model and key skills it includes. Filter by category, model, or creator. Sort by popularity (how many agents are currently using it) or recency. Clone any blueprint to create a customized variant.

### `/blueprints/new` — Blueprint Creator

A guided builder for creating a new blueprint. Steps: give it a name and description, select the base personality approach (start from scratch, import from an existing agent's config, or fork an existing blueprint), configure the model and provider, set the tool policy, select skills to include, configure default channel binding patterns, and set default spend limits. Preview the resolved `SOUL.md` and `AGENTS.md` before saving. Blueprints are versioned from creation.

---

### `/blueprints/:blueprintId/editor`

The full blueprint editor. Tabs for each component: Personality (SOUL.md and AGENTS.md editors with Markdown preview), Model (provider and model selection with fallback config), Tools (allow/deny checkbox grid), Skills (skill list with add/remove), Channels (default binding pattern), and Limits (token and spend caps). Changes in any tab are tracked as unsaved — a "Publish new version" button creates a new immutable version with an optional changelog entry.

### `/blueprints/:blueprintId/variables`

Template variable definitions for this blueprint. Variables are placeholders in the personality files that are filled at deploy time. Define each variable: name, description, default value, whether it is required, and validation rules. When this blueprint is deployed to an agent, the deploy wizard shows a form with these variable fields for the operator to fill. Well-defined variables make a blueprint reusable across many different agent contexts without manual editing.

### `/blueprints/:blueprintId/history`

Version history for this blueprint. Each version: timestamp, author, changelog note, and a full diff showing what changed across all components (personality, tools, skills, model, limits). Clicking any version shows the complete snapshot of that version. One-click rollback: creates a new version identical to the selected historical version (does not overwrite history — creates a forward rollback entry).

### `/blueprints/:blueprintId/deploy`

Deploy this blueprint to one or more agents. Target selector: search for specific agents or select by instance, swarm, or tag. Fill in template variable values for the deployment. Preview the effective config that will be applied. Select whether to deploy immediately or schedule for a maintenance window. Staged rollout option: deploy to 10% of selected agents first, wait for health confirmation, then continue to the rest. Deployment progress shown in real time. Failures isolated per agent with error details.

### `/blueprints/:blueprintId/test`

A sandboxed test environment for the blueprint. Launches a temporary agent instance using this blueprint (on a shared ClawControl test infrastructure, not the user's instances). The operator can send test messages and observe responses, inspect tool calls, and evaluate personality behavior — all without affecting production agents. Test sessions are discarded after the session ends. Useful for validating a new blueprint version before deploying it to production agents.

---

## Swarm Routes

### `/swarms/overview` — Active Swarms

A grid of all active swarms in the org. Each swarm card shows: swarm name, scale tier badge (μ / m / M / Ω), instance count, agent count, aggregate status (percentage healthy), current spend velocity, and last deployment. Quick actions per swarm: view topology, push config update, pause all, open sessions inbox.

### `/swarms/new` — Swarm Creation Wizard

The most powerful provisioning tool in ClawControl. A multi-step wizard:

**Step 1 — Scale & Naming:** Select the scale tier (μ / m / M / Ω). The UI adapts its options to the selected tier — Ω-swarm unlocks region spread and advanced rollout controls that aren't shown for μ-swarm. Define the naming pattern: `support-{{n}}-μswarm` generates `support-1-μswarm`, `support-2-μswarm`, etc. For instance names vs. agent names, separate patterns are configured. Total count input.

**Step 2 — Blueprint Assignment:** Select a blueprint to apply to all instances and agents in the swarm, or configure different blueprints for different roles (manager agents vs. worker agents). Variable values for template variables in the blueprint are set here and can be individualized per agent or set uniform.

**Step 3 — Infrastructure:** Select cloud provider and region (or regions, for multi-region swarms). Instance size per node. Network configuration: isolated VPC, Tailscale mesh join, or standard networking. For M-swarm and Ω-swarm, a region distribution map is shown where the operator allocates nodes across regions.

**Step 4 — Channels & Routing:** Configure the channel bindings that will be applied across the swarm. For support swarms: route load across all agents in round-robin. For specialized swarms: each agent gets specific channel bindings.

**Step 5 — Rollout Config:** Immediate (provision all at once) or progressive (canary → staged → full). Canary deploys to 1 instance first, waits for health gate confirmation (configurable: wait 5 minutes, confirm all agents online and no errors), then staged (10%), then full. Health gates can be manual (operator confirms) or automatic (based on heartbeat and error rate thresholds).

**Step 6 — Review & Cost Estimate:** Summary of everything configured. Estimated monthly cost based on instance count, size, and current LLM usage patterns of the selected blueprint. Confirm to launch.

### `/swarms/templates` — Swarm Topology Templates

Pre-built swarm configurations for common use cases. Templates include: Support Factory (inbound message handling with tiered escalation), Research Cluster (manager agent distributes research tasks to worker agents), Coding Team (architect agent + coder agents + reviewer agent), Trading Floor (market data agents + strategy agents + execution agents), and Media Factory (content planning agent + writer agents + editor agent). Each template shows a topology diagram, estimated agent count, and suggested scale tier. Clone any template as a starting point for the swarm creation wizard.

---

### `/swarms/:swarmId/overview`

Swarm dashboard. Aggregate health metrics: total instances, total agents, percentage healthy, aggregate CPU/RAM usage, total active sessions, and current spend velocity. An event feed shows recent swarm-level events: instances provisioned, agents paused, deployments completed, security incidents. Quick actions: deploy new blueprint version, pause all, open topology view.

### `/swarms/:swarmId/instances`

All instances in this swarm, in a filterable table identical to the fleet overview but scoped to this swarm. Useful for identifying unhealthy instances within a large swarm without seeing unrelated instances. Bulk operations on selected instances: restart, push config, upgrade, remove from swarm.

### `/swarms/:swarmId/agents`

All agents across all instances in this swarm. Filterable by instance, status, model, blueprint version. Bulk operations: apply blueprint update, push personality change, change model, pause/resume. Sort by session count to find the most-loaded agents.

---

### `/swarms/:swarmId/topology` — Visual Swarm Canvas

The topology canvas is the most visually distinctive feature in ClawControl. It serves dual purpose:

**Design mode** (when editing): A drag-and-drop canvas built on React Flow. Node types: Manager Agent, Worker Agent, OpenClaw Instance, Channel Source. Edges represent: agent-to-agent messaging relationships (task handoff contracts), channel-to-agent bindings, and instance membership. Drag nodes onto the canvas, connect them with edges, and configure each node by clicking it to open a properties panel. The properties panel for an agent node lets you assign a blueprint, set channel bindings, and configure the tool policy — all inline without leaving the canvas. Export the topology as a Docker Compose or Kubernetes manifest via the Deploy button.

**Live mode** (during operation): The same canvas but now reflecting real-time state. Edges pulse and animate when agents pass tasks to each other (sourced from the session and trace event stream). Agent nodes have a color halo: green for idle, blue for active (processing), yellow for awaiting tool result, red for error. A live traffic counter on each edge shows messages per minute. Clicking any live node opens the agent's session inbox in a side panel without leaving the topology view. The entire canvas is zoomable and pannable. For Ω-swarms with thousands of nodes, clusters are shown as collapsed groups with aggregate health, expanding on click.

---

### `/swarms/:swarmId/deploy` — Swarm Deployment Operations

#### `/swarms/:swarmId/deploy/rolling`

The active deployment controller. Push a new blueprint version, config change, or personality update to the entire swarm using a controlled rollout. Configure rollout parameters: batch size (number of agents updated per batch), inter-batch delay (wait 5 minutes between batches), health gates (automatic or manual confirmation between batches), and rollback trigger (automatically roll back if error rate exceeds a threshold after a batch). Monitor rollout progress as a live timeline showing each batch and its status. Pause the rollout at any point. Rollback the entire swarm to the previous state with one click.

#### `/swarms/:swarmId/deploy/history`

History of all deployments to this swarm. Each entry: deployment type (blueprint update, config push, personality change, skill install), timestamp, operator, target agent count, success count, failure count, and duration. Clicking any entry shows the batch-by-batch progression, error details for failed agents, and the option to roll back to that state.

---

### `/swarms/:swarmId/config` — Swarm-Wide Config Push

Push configuration changes to all instances and agents in the swarm simultaneously. Tabs: Providers (update LLM provider settings fleet-wide), Tools (change the default tool policy), Skills (install or uninstall a skill across the swarm), Policies (apply a new policy template), and Environment (update environment variables). Changes are previewed showing which instances and agents will be affected and what the diff is. All changes are pushed via rolling deploy with configurable health gates — or immediately for urgent security patches.

### `/swarms/:swarmId/channels` — Swarm Channel Management

Channel routing configuration for the swarm as a whole. Add a new channel connector and configure how its traffic is distributed across the swarm's agents: round-robin, least-busy, hash-by-peer (same peer always goes to the same agent for conversation continuity), or time-based. Load balancing for high-volume channels is configured here — for example, a high-traffic WhatsApp account can be distributed across 10 identical support agents in a m-swarm.

### `/swarms/:swarmId/sessions` — Swarm Session Inbox

The unified session inbox scoped to this swarm. Same functionality as the global inbox but showing only sessions from agents within this swarm. Useful for a team responsible for one swarm (e.g., the support team monitoring the Support Factory swarm) without visibility into other swarms.

### `/swarms/:swarmId/kill-switch` — Emergency Halt

A dedicated, confirmation-gated page for pausing the entire swarm. Displays a clear impact summary: number of instances that will be paused, number of agents, number of active sessions that will be interrupted. Two confirmation steps: first an acknowledgment checkbox, then a text confirmation entry (type the swarm name). On execution: all agents on all instances in the swarm receive a pause signal simultaneously, all active API keys are revoked, all active sessions are flagged as interrupted, and a quarantine-mode log is started for forensics. The event is written to the org audit trail. A one-click resume is available once the incident is resolved.

---

## Observe Routes

### `/observe/live` — Mission Control

The real-time command center. A continuously updating event stream from every instance and agent in the org. Events shown: agent messages sent/received (with channel badge), tool calls (name, agent, outcome, latency), skill executions, error events, security alerts, and heartbeat status changes. Each event is a row with: timestamp, source (instance → agent), event type icon, and a brief description. Clicking any event opens its detail panel on the right without leaving the stream.

Filters applied from the left sidebar scope the stream to: specific instances, specific agents, specific swarms, specific channels, specific event types, or minimum severity level. Saved filter sets allow quick switching between views (e.g., "Security Events Only," "Support Swarm Activity").

**Spend Velocity Meter:** Always visible in the header. Shows current org-wide LLM spend per hour with a colored indicator (green / yellow / red) based on configured thresholds. Clicking opens the cost dashboard.

**Global Kill Switch:** A prominent red button always visible in the mission control header. Labeled "Emergency Halt — All Agents." Click opens a confirmation dialog listing: total agents that will be paused, active sessions that will be interrupted. Confirmation requires typing "HALT" and clicking confirm. Execution is immediate and logged.

---

### `/observe/traces` — Execution Tracing

#### `/observe/traces/waterfall`

The primary trace browser. Each trace represents one "turn" — one user message and the agent's complete response process. Listed in reverse chronological order with columns: timestamp, agent, instance, latency (total end-to-end), token count, cost, and outcome (success / error / timeout). Click any trace to open the waterfall detail. The waterfall chart is a Gantt-style horizontal bar chart showing each phase of the turn plotted against time: LLM processing, tool execution (one bar per tool call), network latency, and queue wait. Multiple tool calls in one turn are shown as stacked bars. Hovering any segment shows the raw input and output for that phase.

#### `/observe/traces/slow`

Automatically compiled list of the slowest traces in the past 24h, past 7d, and all time. Grouped by agent and by tool (which tool calls are consistently slow). Actionable: from a slow trace, the operator can jump directly to the agent's model config to consider switching to a faster model, or to the skill's permission page to investigate whether the tool is making excessive external calls.

#### `/observe/traces/search`

Search traces by: agent, instance, swarm, channel, session ID, specific tool name, error message, latency threshold (e.g., "only traces over 10 seconds"), cost threshold, date range, and outcome. Multiple criteria combined with AND logic. Results shown in the same list format as the waterfall browser.

#### `/observe/traces/:traceId/replay`

Step-by-step replay of a specific trace. The replay shows the agent's full context at each step: the system prompt, the conversation history, the tool call that was made (with exact arguments), and the tool's response. Navigation buttons advance or rewind one step at a time. The current step's LLM context is shown in a side panel rendered as it would appear to the model. Used for post-mortem analysis and for demonstrating agent behavior to non-technical stakeholders.

---

### `/observe/logs` — Structured Log Viewer

#### `/observe/logs/stream`

Live log stream from all instances and agents. Each log entry: timestamp, instance, agent, log level (DEBUG / INFO / WARN / ERROR, color-coded), and message. Rendered in a virtualized list that handles high log volumes without browser performance issues. The stream can be paused to inspect entries without new entries scrolling them away.

Filters: instance, agent, log level, keyword search (with regex support), date range. Multi-filter combinations are supported. **Auto-redaction** is always active: API keys, auth tokens, JWT tokens, passwords, and credit card numbers detected in log entries are replaced with `[REDACTED]` before rendering. Admins with appropriate permissions can toggle redaction off temporarily for debugging (this action itself is logged to the audit trail).

#### `/observe/logs/search`

Historical log search. Search across all retained logs. Search parameters: keyword or regex, instance, agent, log level, date range. Results shown with surrounding context lines (configurable: show 5 lines before and after each match). Highlighting the search term in results. Useful for forensic investigation: "Find all log entries where the TradeBot mentioned 'API key' in the past 7 days."

#### `/observe/logs/export`

Export log segments for offline analysis or SIEM integration. Configure: scope (all orgs / specific instance / specific agent), log level filter, date range, and format (JSON, CSV, or structured syslog). For SIEM integration: configure a push destination (Splunk HEC endpoint, Datadog API, Elasticsearch endpoint) with authentication. Set up a recurring export schedule (hourly, daily) or trigger on-demand. All exports are logged to the audit trail.

---

### `/observe/cost` — Cost & Budget Management

#### `/observe/cost/dashboard`

LLM spend visualization. Primary chart: spend over time (selectable: day / week / month). Breakdown dimensions (toggle between): by provider (Anthropic vs. OpenAI vs. Groq), by instance, by agent, by swarm, by channel, by blueprint. Each dimension can be shown as a stacked bar chart, a pie chart, or a table. The table view shows the exact token counts and cost per dimension with sortable columns. A "Top 5 Spenders" summary card in the header shows the five agents or instances driving the most cost.

#### `/observe/cost/budgets`

Budget rule management. Each budget rule: scope (org-wide, per-instance, per-agent, per-swarm), period (hourly, daily, monthly), limit in currency, and action on breach (alert only, pause agent(s), switch to fallback model, or block all LLM calls). Rules are shown in a table and can overlap — an agent-level rule and an instance-level rule can both apply. The more restrictive rule wins on breach. A visual timeline shows the current period's spend against each active budget rule.

#### `/observe/cost/projections`

Monthly spend forecast based on current usage velocity. Shows: current month-to-date spend, projected end-of-month spend (with confidence interval), and projected spend for the next 3 months. Projections account for day-of-week patterns (many deployments are more active on weekdays). Scenario modeling: "What if I add 10 more agents at this blueprint's average cost?" Alerts when projection exceeds a configured threshold (configurable in the budget rules).

#### `/observe/cost/attribution`

Cost center and department tagging. Instances and agents can be tagged with a cost center (e.g., "Sales," "Engineering," "Support"). This page generates per-cost-center spend reports for the selected period. Exportable as CSV for finance team consumption. Useful for internal chargebacks or for understanding which business function is driving LLM spend.

---

### `/observe/analytics` — Business Intelligence

#### `/observe/analytics/activity`

A calendar heatmap of agent activity across the org. Each day is a colored cell: darker = more activity (messages processed, tool calls executed). Clicking a day drills down to an hourly breakdown. Filter by instance, agent, or swarm. Useful for understanding when agents are most active, identifying dead periods, and planning maintenance windows.

#### `/observe/analytics/tools`

Tool and skill usage analytics. A ranked list of the most-called tools across the fleet. For each tool: call count, average latency, error rate, and which agents use it most. A time-series chart shows call volume for the top tools over the selected period. Used for: identifying which tools are bottlenecks (high latency, high error rate), understanding which capabilities are driving the most value, and informing skill upgrade decisions.

#### `/observe/analytics/channels`

Message volume per channel over time. A time-series chart with one line per channel (Telegram, WhatsApp, Discord, etc.). Shows both inbound and outbound message counts. Helps identify peak load periods per channel, seasonal patterns, and the relative importance of each channel to overall operation.

#### `/observe/analytics/kpis`

Custom business metric dashboard. Operators can define custom KPI widgets using data available from the trace and session events. Widget types: count (e.g., "sessions completed without human takeover"), rate (e.g., "sessions escalated per day"), average (e.g., "average session duration"), and sum (e.g., "total tokens used by support swarm"). Widgets are arranged in a configurable dashboard layout. For teams running autonomous business operations, this page is the board-level reporting view.

---

## Security Routes

### `/security/posture` — Fleet-Wide Security Posture

#### `/security/posture/overview`

The org-wide security score. A composite score (0–100) computed from weighted sub-scores: exposed port count, CVE status across instances, skill risk distribution, secret rotation recency, sandbox coverage, and policy strictness. Each sub-score has its own card with a trend indicator (improving / stable / degrading). Actionable recommendations are listed in priority order. Clicking any recommendation jumps to the relevant remediation page. The score history over the past 30 days is shown as a sparkline.

#### `/security/posture/exposure`

Instances with potentially exposed endpoints. Checks: is the gateway port (18789) reachable from the public internet (ClawControl probes this), are there any public IP addresses bound to OpenClaw processes, and are there any known-bad configurations (e.g., auth disabled, default tokens unchanged). Findings are listed with severity and remediation steps. Resolved findings are tracked and contribute to the posture score improvement.

#### `/security/posture/versions`

Version matrix for all instances. Each instance's running version is checked against the OpenClaw CVE database. Instances running versions with known vulnerabilities are highlighted with the CVE identifier, severity (Critical / High / Medium / Low), description, and a one-click update trigger. Instances running the latest version are shown with a green checkmark.

#### `/security/posture/configs`

Weak configuration detector. Checks for: default API tokens that haven't been rotated, sandbox disabled on public-facing agents, overly permissive tool policies (exec enabled without justification), skills with CRITICAL findings still installed, and channels with expired tokens that haven't been reconnected. Each finding is a row with severity, description, affected resource, and a remediation action button.

---

### `/security/secrets` — Secret & Credential Management

#### `/security/secrets/vault`

The org-wide secret inventory. Every secret stored in ClawControl: LLM API keys, channel tokens, environment variable secrets, and bootstrap tokens. Each entry shows: secret name, type, associated resource (instance/agent it is used on), creation date, last rotated date, and rotation status (green if within policy, yellow if overdue, red if expired). Secret values are never shown — only that they exist and their metadata. Clicking any entry opens a side panel with full metadata and available actions.

#### `/security/secrets/rotation`

Secret rotation management. Rotation policies can be defined: all LLM API keys must be rotated every 90 days, channel tokens every 30 days. The rotation page shows all secrets approaching their rotation deadline (within 14 days) and all overdue secrets. For each: the current rotation age, the policy deadline, and a rotate action. Rotation for LLM keys: the user pastes the new key, ClawControl pushes it to all associated instances simultaneously via the tunnel, verifies the new key is valid before deleting the old one. Rotation history is logged per secret with timestamps.

#### `/security/secrets/distribution`

Visualization of which secrets are distributed to which instances and agents. A matrix view: secrets on one axis, resources on the other. Each cell shows whether that secret is present on that resource. Useful for identifying over-distribution (a secret being present on more resources than necessary for least-privilege) or under-distribution (a secret missing from a resource that needs it). Clicking a cell allows revoking that distribution or adding a distribution.

---

### `/security/quarantine` — Isolation & Containment

#### `/security/quarantine/instances`

Instances currently in quarantine. Quarantine mode: all agents on the instance are paused, all outbound network access from skills is blocked at the tunnel level, all API keys associated with the instance are revoked, and the instance's state is preserved read-only for forensic analysis. Each quarantined instance shows: quarantine start time, triggering event, responsible operator, and a log of actions taken since quarantine. Actions available: investigate (open read-only files and logs), release (restore to normal operation), or decommission (delete the instance permanently with a final audit export).

#### `/security/quarantine/agents`

Individual agents in quarantine. Same as instance quarantine but scoped to one agent. The agent's sessions are halted, its tool access is revoked, but other agents on the same instance continue operating. Useful when one agent shows suspicious behavior without needing to take down the entire instance.

#### `/security/quarantine/skills`

Skills flagged by the scanner or a threat intelligence alert after they were already installed. Shows: skill name, version, the finding that triggered the flag, which instances and agents currently have it installed, and the recommended action. Actions: rip and replace (uninstall from all affected resources immediately, rotate any secrets the skill had access to, log the full action sequence), isolate (disable without uninstalling), or dismiss with acknowledgment.

#### `/security/quarantine/actions`

Log of all containment actions across the org. Every quarantine trigger, isolation action, and release is logged here with: timestamp, actor (human or automated rule), target resource, action taken, and outcome. Immutable and exportable.

---

### `/security/compliance` — Compliance & Data Governance

#### `/security/compliance/regions`

Data residency map. Shows where each instance is physically located and where the data it handles originates (based on channel origins). For EU-based operators, flags any configuration where EU-origin data is processed outside the EU. For operators with HIPAA or other regional requirements, shows compliance status per instance. Allows tagging instances with data classification labels.

#### `/security/compliance/retention`

Log and session data retention policies. Configure per resource type: how long session transcripts are retained, how long execution traces are retained, how long audit logs are retained. Minimum and maximum retention can be set by org policy. Automatic purge of data beyond the retention window is confirmed by the policy. Data subject deletion requests can be processed here: search for a specific user identifier across all sessions and purge all associated records.

#### `/security/compliance/exports`

Generate compliance reports for auditors. Report types: Access log report (all user logins and actions for a period), Data processing activity report (what data was processed by which agents), Security incident summary, Skills audit (all skills installed with their permissions and scan results), Secret rotation compliance (which secrets met rotation policy and which did not). Reports are generated as signed PDF or structured JSON, with a tamper-evident hash. Delivery via download or push to a configured S3 bucket.

---

### `/security/incidents` — Incident Management

#### `/security/incidents/timeline`

Chronological list of all security incidents in the org. An incident is created when: a skill is flagged post-install, an instance is quarantined, a posture check finds a critical exposure, or an operator manually opens an incident. Each incident card shows: severity, title, affected resources, status (Open / Investigating / Contained / Resolved / Postmortem), and assigned responder.

#### `/security/incidents/:incidentId/timeline`

The event timeline for one incident. Every action taken — quarantine trigger, skill removal, secret rotation, agent pause, operator note — is plotted on a time axis. Used to understand the sequence of events and response actions for postmortems.

#### `/security/incidents/:incidentId/containment`

The active response workspace for an open incident. Operators can trigger containment actions directly from this page: quarantine affected instances, quarantine affected agents, revoke specific secrets, uninstall flagged skills, block egress domains, and add operator notes. Each action is immediately executed and logged to the incident timeline. The containment status shows which actions have been completed and which are pending.

#### `/security/incidents/:incidentId/postmortem`

A structured postmortem template populated with incident data. Sections: Timeline (auto-populated from the incident event log), Root Cause, Impact Assessment, Immediate Response Actions, Long-term Remediation, and Lessons Learned. The template is editable by the incident responder. Completed postmortems are signed off by an org admin and stored immutably. Postmortem templates follow industry standard formats (Google, Atlassian style) and are exportable as PDF.

---

## Audit Routes

### `/audit/tools` — Immutable Tool Execution Ledger

Every tool call made by any agent across the org, logged immutably. Each entry: timestamp, agent, instance, tool name, input arguments (with secrets redacted), output summary, duration, and outcome. The ledger is append-only — no entry can be modified or deleted. Searchable by all fields. Filterable by time range, agent, tool, and outcome. Exportable for forensic or compliance purposes. "Scope of engagement" mode available for security teams: a defined time window is flagged and every tool execution during that window is captured with full unredacted detail for authorized investigators.

### `/audit/config-changes`

Every configuration change across the org: personality file edits, tool policy changes, skill installs and removals, provider key rotations, routing rule changes, and swarm deployments. Each entry: timestamp, actor (ClawControl user), resource affected, change type, and a diff. The before/after diff for every change is stored for 90 days (or the org's configured retention period). Filterable by actor, resource type, and date.

### `/audit/access`

Access log covering: user logins (with IP and user agent), terminal sessions (every command executed via the web terminal, attributed to the logged-in user), API key usage (which API key accessed which resource), and team permission changes. Particularly important for terminal access — every command run via the web terminal is logged here with full attribution, which is the core accountability advantage over shared SSH keys.

### `/audit/incidents`

Security incident records linked from the `/security/incidents` section. The audit perspective shows incidents as events in the overall audit timeline rather than as managed objects to respond to.

### `/audit/export`

Configure audit log exports to external SIEM systems. Supported destinations: Splunk (via HTTP Event Collector), Datadog (Logs API), Elastic (Elasticsearch bulk API), and generic HTTPS webhook for custom destinations. Configure: which event types to export, the destination endpoint and authentication, and the push frequency (real-time streaming or batch). Export history shows recent push attempts with success/failure status and record counts.

---

## Configure Routes

### `/configure/providers` — Global LLM Provider Key Vault

#### `/configure/providers` (list)

All LLM providers configured at the org level. These are the defaults that new instances inherit. Each provider: logo, name, connection status (verified / unverified / error), configured models, and the number of instances currently using it. Add new provider via the `/configure/providers/new` wizard. Disable a provider org-wide from this list (affects all instances that haven't overridden to a different key).

#### `/configure/providers/new`

Wizard for adding a new LLM provider. Select the provider type. Enter the API key (encrypted immediately on submission, never shown in full again). ClawControl immediately validates the key by making a minimal API call. Configure: which models are available for agents to select (toggle individual models on/off), daily spend limit, and whether this provider can be used for high-sensitivity agents. Ollama (local models): instead of an API key, provide the Ollama server endpoint. An "Auto-discover" button scans the network for running Ollama instances on port 11434.

#### `/configure/providers/:providerId`

Provider detail page. Shows: API key status (verified / expired), last validation check, associated instances, current period token usage, and daily spend limit. Update the API key (triggers re-validation). Adjust per-model availability. Set a usage alert threshold. View the token usage time-series chart for this provider.

---

### `/configure/defaults` — Org-Wide Defaults

Default settings that are applied to every new instance and agent created in the org. Covers: default model provider and model, default tool policy template, default sandbox mode, default spend limits, default retention period, and default security policy. Changing defaults here does not affect existing resources — only newly created ones. Used to enforce org-wide standards without manual configuration of every new resource.

### `/configure/integrations` — External Integrations

Webhook configuration: outbound webhooks that fire on ClawControl events. For each webhook: target URL, authentication (HMAC secret), subscribed event types (instance status change, agent status change, session escalation, skill scan result, budget threshold, security incident), and recent delivery log with response codes and retry status.

SIEM integration: configure push destinations for audit and log exports (same config as `/audit/export` but accessible from the general settings context).

Alerting channels: where notifications are sent for important events. Supported: email, Slack webhook, PagerDuty, and generic HTTP. Configure separate channels for different severity levels (P1 security incidents go to PagerDuty; budget alerts go to Slack).

### `/configure/self-hosting` — Self-Host Configuration

Documentation and tooling for teams running the ClawControl control plane itself on their own infrastructure (as opposed to using the managed SaaS). Provides: Docker Compose and Kubernetes manifests for the ClawControl backend, configuration reference for environment variables, a health check endpoint spec, an upgrade runbook, and a migration guide between ClawControl versions. Also shows the current self-hosted instance's version, configuration status, and any required actions (e.g., pending database migrations).

---

## Org Routes (detailed)

### `/org/members`

Full member management. The table shows: display name, email, role, team memberships, MFA status (enabled / disabled), last login (with IP), and account status (active / suspended). Actions per member: change role, assign to teams, suspend (prevents login without deleting the account), and remove from org. Inviting a new member: enter email, select role, optionally assign to teams. The invitee receives an email with a time-limited join link. Pending invites are shown with resend and revoke options. Bulk invite via CSV upload for enterprise onboarding.

### `/org/teams`

Teams are permission scopes. Each team has: a name, a description, member list, and resource access grants. Resource access grants specify which instances, swarms, and agents the team can access and at what permission level (Viewer, Operator, or Admin). Viewing is read-only access to dashboards and sessions. Operator adds the ability to pause/resume agents and inject into sessions. Admin adds config editing and terminal access. A member can belong to multiple teams and receives the union of their grants. Teams are also used for audit attribution — config changes are tagged with the actor's team membership at the time of the change.

### `/org/billing` (detailed)

**Plan:** Current plan name, included limits (node count, agent count, message volume), current usage against limits, and renewal date. Upgrade, downgrade, and cancel actions. For the managed instance add-on: shows each managed instance, its region, and its individual cost contribution.

**Invoices:** Downloadable PDF invoices. Each invoice has a line-item breakdown: base plan fee, usage overage (if any) broken down by type, add-ons (managed instances, extra storage, enterprise support). VAT handling for EU customers. Invoice delivery can be configured to go directly to a billing email.

**Usage:** Real-time meter showing the current billing period's consumption. Updated hourly. Breakdown by: active instance-nodes (the primary billing metric), agent count, messages processed, skill scans performed, and storage used. A projected end-of-period usage chart based on current velocity. Alerts configured here trigger when usage approaches the plan limit.

