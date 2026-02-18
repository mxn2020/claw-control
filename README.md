# ClawControl — Complete Route & Feature Blueprint

## Core Design Principles

**Two-level hierarchy that the prior docs missed:**
1. **Instance level** — the OpenClaw gateway daemon (global config, global tools/skills/personalities, channels)
2. **Agent level** — each agent within an instance has its own `SOUL.md`, `AGENTS.md`, tools, skills, memory, sessions

Everything in this blueprint respects that hierarchy. Global settings cascade down; agent settings override up.

**Swarm Scale Naming:**

| Scale | Name | Count |
|---|---|---|
| **Micro-swarm** | `μ-swarm` | 2–10 instances or agents |
| **Meso-swarm** | `m-swarm` | 11–100 |
| **Macro-swarm** | `M-swarm` | 101–1,000 |
| **Mega-swarm** | `Ω-swarm` | 1,001–10,000 |

---

# Route Tree (Complete)

```
/                                          # Marketing homepage
/pricing
/security
/changelog
/status
/docs
  /docs/quickstart
  /docs/self-hosting
  /docs/api
  /docs/swarms

/auth
  /auth/login
  /auth/register
  /auth/sso
  /auth/mfa
  /auth/recovery
  /auth/device                             # Headless/VPS pairing flow

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

# ─────────────────────────────────────────
# FLEET — OpenClaw Instance Management
# ─────────────────────────────────────────

/fleet
  /fleet/overview                          # All instances, global health grid

  /fleet/instances
    /fleet/instances/new                   # Provision wizard
    /fleet/instances/:instanceId
      /fleet/instances/:instanceId/overview
      /fleet/instances/:instanceId/terminal
      /fleet/instances/:instanceId/files

      # Instance-level global config (affects all agents on this instance)
      /fleet/instances/:instanceId/config
        /fleet/instances/:instanceId/config/general
        /fleet/instances/:instanceId/config/providers   # LLM API keys for this instance
        /fleet/instances/:instanceId/config/tools       # Global tool allow/deny defaults
        /fleet/instances/:instanceId/config/skills      # Global skills installed instance-wide
        /fleet/instances/:instanceId/config/policies    # Baseline security policies
        /fleet/instances/:instanceId/config/environment # Env vars, secrets

      # Instance-level global personalities/prompts (inherited by agents unless overridden)
      /fleet/instances/:instanceId/personalities
        /fleet/instances/:instanceId/personalities/soul        # Global SOUL.md
        /fleet/instances/:instanceId/personalities/agents-md   # Global AGENTS.md
        /fleet/instances/:instanceId/personalities/blueprints  # Instance blueprint library

      # Instance-level global channels
      /fleet/instances/:instanceId/channels
        /fleet/instances/:instanceId/channels/connectors
        /fleet/instances/:instanceId/channels/routing
        /fleet/instances/:instanceId/channels/health

      # All agents on this instance
      /fleet/instances/:instanceId/agents
        /fleet/instances/:instanceId/agents/new
        /fleet/instances/:instanceId/agents/:agentId    # → deep agent management (see /agents section)

      /fleet/instances/:instanceId/sessions             # All sessions on this instance
      /fleet/instances/:instanceId/skills               # Instance-wide skill inventory
      /fleet/instances/:instanceId/observe              # Instance-scoped observability
      /fleet/instances/:instanceId/security             # Instance security posture

# ─────────────────────────────────────────
# AGENTS — Cross-Fleet Agent Management
# ─────────────────────────────────────────

/agents
  /agents/catalog                          # All agents across all instances
  /agents/new                              # Create agent (pick target instance)
  /agents/compare                          # Side-by-side agent config diff

  /agents/:agentId
    /agents/:agentId/overview

    # Agent-specific personality (overrides instance globals)
    /agents/:agentId/personality
      /agents/:agentId/personality/soul           # This agent's SOUL.md
      /agents/:agentId/personality/agents-md      # This agent's AGENTS.md
      /agents/:agentId/personality/user-md        # USER.md context
      /agents/:agentId/personality/variables      # Template variables {{role}}, {{timezone}}
      /agents/:agentId/personality/history        # Version history + rollback

    # Agent-specific tools (extends or restricts instance defaults)
    /agents/:agentId/tools
      /agents/:agentId/tools/allowed              # allow/deny list for this agent
      /agents/:agentId/tools/sandbox              # Sandbox mode config
      /agents/:agentId/tools/policies             # Agent-scoped policy fences
      /agents/:agentId/tools/simulator            # Test a tool call against policies

    # Agent-specific skills (on top of instance-wide skills)
    /agents/:agentId/skills
      /agents/:agentId/skills/installed           # Skills specific to this agent
      /agents/:agentId/skills/permissions         # Permission viewer + editor
      /agents/:agentId/skills/marketplace         # Install skills scoped to this agent

    # Agent-specific channel bindings
    /agents/:agentId/channels
      /agents/:agentId/channels/bindings          # Which channels/accounts map to this agent
      /agents/:agentId/channels/overrides         # Peer-level routing overrides

    # Agent memory
    /agents/:agentId/memory
      /agents/:agentId/memory/browser             # File explorer into agent workspace
      /agents/:agentId/memory/editor              # Inline fact/file editor
      /agents/:agentId/memory/inject              # Quick fact injector
      /agents/:agentId/memory/health              # Conflict detection, stale fact flags

    # Agent sessions
    /agents/:agentId/sessions
      /agents/:agentId/sessions/inbox
      /agents/:agentId/sessions/:sessionId

    # Agent model settings
    /agents/:agentId/model
      /agents/:agentId/model/provider             # Which LLM provider + model
      /agents/:agentId/model/limits               # Token/spend caps for this agent
      /agents/:agentId/model/schedule             # Time-of-day model switching

    # Agent observability
    /agents/:agentId/observe
      /agents/:agentId/observe/traces
      /agents/:agentId/observe/logs
      /agents/:agentId/observe/cost

    /agents/:agentId/security
      /agents/:agentId/security/posture
      /agents/:agentId/security/quarantine
      /agents/:agentId/security/audit

# ─────────────────────────────────────────
# SESSIONS — Unified Cross-Fleet Inbox
# ─────────────────────────────────────────

/sessions
  /sessions/inbox                          # All sessions, all instances, all agents
  /sessions/search
  /sessions/:sessionId
    /sessions/:sessionId/conversation
    /sessions/:sessionId/trace             # Tool-call waterfall for this session
    /sessions/:sessionId/replay            # Step-by-step replay mode
    /sessions/:sessionId/audit             # What actions were taken

# ─────────────────────────────────────────
# SKILLS — Global Marketplace & Governance
# ─────────────────────────────────────────

/skills
  /skills/overview                         # Fleet-wide skill inventory matrix
  /skills/installed                        # All skills across all instances/agents
    /skills/installed/drift                # Version mismatch detector across fleet
  /skills/policies                         # Global policy templates
    /skills/policies/new
    /skills/policies/:policyId
  /skills/marketplace
    /skills/marketplace/browse
    /skills/marketplace/:skillId
      /skills/marketplace/:skillId/readme
      /skills/marketplace/:skillId/scan    # Security scan results
      /skills/marketplace/:skillId/deploy  # Deploy to instance(s) / agent(s)
  /skills/scan
    /skills/scan/queue                     # Pending scans
    /skills/scan/results
    /skills/scan/quarantine                # Flagged skills awaiting review

# ─────────────────────────────────────────
# CHANNELS — Global Connectivity
# ─────────────────────────────────────────

/channels
  /channels/overview                       # All channel connections across fleet
  /channels/connectors
    /channels/connectors/new               # Platform wizard
    /channels/connectors/:connectorId
  /channels/routing
    /channels/routing/rules                # Global routing rules
    /channels/routing/tester               # Mock message → agent resolver
    /channels/routing/schedules            # Time-of-day routing schedules
  /channels/health
    /channels/health/status
    /channels/health/latency
    /channels/health/errors

# ─────────────────────────────────────────
# BLUEPRINTS — Reusable Agent Templates
# ─────────────────────────────────────────

/blueprints
  /blueprints/library
  /blueprints/new
  /blueprints/:blueprintId
    /blueprints/:blueprintId/editor        # Personality + tools + skills + channels
    /blueprints/:blueprintId/variables     # Template variable definitions
    /blueprints/:blueprintId/history       # Version history + diff viewer
    /blueprints/:blueprintId/deploy        # Deploy to instance(s) / agent(s)
    /blueprints/:blueprintId/test          # Sandbox test run

# ─────────────────────────────────────────
# SWARMS — Bulk Fleet & Agent Operations
# ─────────────────────────────────────────

/swarms
  /swarms/overview                         # All active swarms

  /swarms/new                              # Swarm creation wizard
    # Scale selector: μ-swarm / m-swarm / M-swarm / Ω-swarm
    # Naming pattern: support-{{n}}-μswarm
    # Blueprint assignment per node or agent
    # Provider selection + region spread
    # Progressive rollout config

  /swarms/:swarmId
    /swarms/:swarmId/overview
    /swarms/:swarmId/instances             # All instances in this swarm
    /swarms/:swarmId/agents                # All agents in this swarm
    /swarms/:swarmId/topology              # Visual canvas (React Flow)
      # Manager/worker graph
      # Live edge animation on task handoff
      # Node pulse on activity
    /swarms/:swarmId/deploy                # Bulk deploy operations
      /swarms/:swarmId/deploy/rolling      # Canary → staged → full rollout
      /swarms/:swarmId/deploy/history      # Past deployments + rollback
    /swarms/:swarmId/config                # Swarm-wide config push
    /swarms/:swarmId/skills                # Swarm-wide skill operations
    /swarms/:swarmId/channels              # Swarm-wide channel routing
    /swarms/:swarmId/observe               # Aggregated observability for swarm
    /swarms/:swarmId/sessions              # All sessions across swarm
    /swarms/:swarmId/kill-switch           # Pause entire swarm

  /swarms/templates                        # Swarm topology templates
    # "Support factory", "Research cluster", "Trading floor", etc.

# ─────────────────────────────────────────
# OBSERVE — Cross-Fleet Observability
# ─────────────────────────────────────────

/observe
  /observe/live                            # Mission control real-time stream
    # Event feed: all instances, all agents
    # Global kill switch (always visible)
    # Filter by instance / agent / swarm / channel

  /observe/traces
    /observe/traces/waterfall              # LLM → tool → network Gantt
    /observe/traces/slow                   # Top slowest interactions
    /observe/traces/search
    /observe/traces/:traceId
      /observe/traces/:traceId/replay

  /observe/logs
    /observe/logs/stream                   # Live structured log view
    /observe/logs/search
    /observe/logs/export                   # CSV / JSON / SIEM push

  /observe/cost
    /observe/cost/dashboard                # Spend by instance / agent / provider / channel
    /observe/cost/budgets                  # Budget rules + alert thresholds
    /observe/cost/projections              # Monthly spend forecast
    /observe/cost/attribution              # Cost center / department tagging

  /observe/analytics
    /observe/analytics/activity            # Heatmap: agent activity by day/hour
    /observe/analytics/tools               # Most-called tools/skills fleet-wide
    /observe/analytics/channels            # Message volume per channel over time
    /observe/analytics/kpis                # Custom business metric widgets

# ─────────────────────────────────────────
# SECURITY — First-Class Security Center
# ─────────────────────────────────────────

/security
  /security/posture
    /security/posture/overview             # Fleet-wide risk score
    /security/posture/exposure             # Open ports, public endpoints
    /security/posture/versions             # CVE badges per instance version
    /security/posture/configs              # Weak config detector

  /security/secrets
    /security/secrets/vault                # All stored credentials
    /security/secrets/rotation             # Rotation scheduler + history
    /security/secrets/distribution         # Which secrets go to which agents

  /security/quarantine
    /security/quarantine/instances         # Isolated instances
    /security/quarantine/agents            # Isolated agents
    /security/quarantine/skills            # Flagged skills
    /security/quarantine/actions           # Log of containment actions

  /security/compliance
    /security/compliance/regions           # Data residency map
    /security/compliance/retention         # Log/session retention policies
    /security/compliance/exports           # Compliance report generation

  /security/incidents
    /security/incidents/timeline
    /security/incidents/:incidentId
      /security/incidents/:incidentId/timeline
      /security/incidents/:incidentId/containment
      /security/incidents/:incidentId/postmortem

# ─────────────────────────────────────────
# AUDIT — Immutable Ledger
# ─────────────────────────────────────────

/audit
  /audit/tools                             # Immutable tool execution ledger
  /audit/config-changes                    # Who changed what config, when
  /audit/access                            # Who accessed the control plane
  /audit/incidents                         # Security incident log
  /audit/export                            # SIEM export (Splunk / Datadog / Elastic)

# ─────────────────────────────────────────
# CONFIGURE — Global Platform Settings
# ─────────────────────────────────────────

/configure
  /configure/providers                     # Global LLM provider key vault
    /configure/providers/new
    /configure/providers/:providerId
  /configure/defaults                      # Default tool/skill/policy for new agents
  /configure/integrations                  # Webhooks, SIEM, alerting channels
  /configure/self-hosting                  # Self-host config (Docker, K8s, env vars)
```

---

# Feature Overview by Section

## `/fleet` — Instance Management

### `/fleet/overview`
The "global war room." Shows every OpenClaw instance registered to your org as a status card: heartbeat, version, active agent count, resource pressure, and tunnel health. One-click jump to any instance. Global kill switch always in the top bar.

### `/fleet/instances/new` — Provision Wizard
Three paths: **Cloud** (DigitalOcean, Hetzner, AWS, Vultr — provision directly via API), **BYO Server** (generate a bootstrap script with your `OPENCLAW_TOKEN` + `CONTROL_PLANE_URL` baked in), or **Managed** (ClawControl fully hosts and manages the instance). Config wizard generates `docker-compose.yml` or systemd unit with toggle options: headless browser, Redis, sandbox mode, Tailscale mesh join.

### `/fleet/instances/:instanceId/config` — Instance Global Config
This is what the prior blueprints missed: **instance-level globals that cascade to all agents**. Here you manage the `openclaw.json` root config: which LLM providers are available, which tools are enabled by default, which skills are installed instance-wide, baseline security policies, and environment variables. Changes here propagate to all agents on this instance unless an agent explicitly overrides.

### `/fleet/instances/:instanceId/personalities` — Instance Global Personalities
The global `SOUL.md` and `AGENTS.md` that every agent on this instance inherits unless they define their own. Editing here pushes to `~/.openclaw/` on the VPS via the secure tunnel. Full Monaco editor with Markdown preview, version history, and git-style diffs before commit.

### `/fleet/instances/:instanceId/terminal`
Browser-based terminal via xterm.js over WebSocket tunnel. No exposed ports. TUI mirror mode renders OpenClaw's own status screens in-browser. Command palette with pre-built OpenClaw CLI snippets.

### `/fleet/instances/:instanceId/files`
Scoped file explorer into `~/.openclaw/` — workspace files, memory, config, personality files. Safe editor with diff/rollback. Policy-aware write restrictions (can block editing certain files in production). Sync status shows what's drifted from control-plane desired state.

---

## `/agents` — Per-Agent Deep Management

This is the most nuanced section and where the hierarchy really matters. Each agent page has two layers clearly distinguished: **what this agent inherits from its instance** vs. **what this agent overrides**.

### `/agents/:agentId/personality`
Each agent's own `SOUL.md`, `AGENTS.md`, and `USER.md`. The editor clearly shows when a file is "inherited from instance" (grayed header) vs. "overridden here" (active). Template variable support (`{{role}}`, `{{timezone}}`, `{{username}}`). Full version history with rollback and diff view before every save. A/B testing: deploy two prompt variants across two agent instances and compare session quality side by side.

### `/agents/:agentId/tools`
Agent-specific tool allow/deny list that extends or restricts instance defaults. Visual checkbox grid for `exec`, `read`, `write`, `edit`, `browser`, `canvas`, `cron`, `nodes`. Sandbox mode toggle (off / on / all) with Docker setup command. Policy Simulator: input a hypothetical tool call and see if it would be allowed or denied, with the matching rule highlighted.

### `/agents/:agentId/skills`
Skills installed specifically for this agent, on top of instance-wide skills. Permission viewer shows exactly what each skill declared (`Filesystem: /home/ubuntu/docs`, `Network: unrestricted outbound`). Scoped policy editor restricts skill access to specific paths or domains. One-click disable per skill without uninstalling.

### `/agents/:agentId/memory`
File browser scoped to this agent's workspace directory. Inline editor for `USER.md` and knowledge files. Quick fact injector (single field → appends to memory). Memory conflict detector surfaces contradictory facts (e.g., "User is in Berlin" and "User is in NYC") and presents a resolution UI. Memory health score flags stale or overly broad facts.

### `/agents/:agentId/model`
Which LLM provider and model this agent uses (overrides instance default). Hot-swap without gateway restart. Per-agent token and spend caps. Time-of-day model schedule: "Business hours → Claude Opus, Off-hours → Claude Haiku."

---

## `/swarms` — Bulk Operations

### `/swarms/new` — Swarm Creation Wizard
Select your scale tier (μ / m / M / Ω), define a naming pattern (`research-{{n}}-μswarm`), assign a blueprint to all instances/agents, pick provider and region spread, set progressive rollout gates (canary 1 → staged 10% → full). The wizard estimates cost before provisioning.

### `/swarms/:swarmId/topology`
React Flow canvas. At creation time it's a drag-and-drop composer: place Manager Agent nodes, Worker Agent nodes, draw handoff connections, assign blueprints and channel bindings per node. At runtime it becomes a live visualization: edges pulse on task handoff, nodes glow while busy, errors appear as red badges. Toggle between "design mode" and "live mode."

### Swarm-level bulk operations
Any config change, skill install, personality update, or channel binding can be pushed fleet-wide to all instances/agents in a swarm. Rolling deploy with health gates prevents a bad config from hitting everything at once. One-click rollback to previous swarm state.

---

## `/sessions` — Unified Inbox

Aggregated real-time feed across all instances, agents, and channels. Filters by instance, agent, swarm, channel, account, sentiment, escalation state, and date. Thread view mirrors the full conversation from the VPS session store. "God Mode" lets an operator inject a message as the agent for human-in-the-loop correction (logged with attribution). Debug overlay toggle reveals the raw LLM reasoning trace and tool call JSON alongside each message. Hallucination detector flags sessions where the agent repeated the same tool call more than three times or entered a recognizable loop.

---

## `/skills` — Marketplace & Governance

### `/skills/marketplace/:skillId/scan`
Before any install, the scanner runs static heuristics against the skill source: checks for API keys leaking into LLM context, known malware signatures, suspicious outbound network calls, and dangerous shell patterns. Risk is rated LOW / MEDIUM / HIGH / CRITICAL. HIGH and CRITICAL block installation by default. Results are cached and shown to all users considering the same skill.

### `/skills/installed/drift`
Cross-fleet drift detector: flags where the same skill is at different versions across instances or agents. One-click "normalize all to latest vetted version."

---

## `/observe/live` — Mission Control

The always-on command center. Real-time event stream from every instance. Filterable by instance, agent, swarm, or channel. The **global kill switch** is always visible here and in the top nav — one click pauses all agents across all instances, revokes active API keys, and logs the event with attribution. Bill shock prevention: live spend velocity meter with configurable auto-pause threshold.

---

## `/security` — First-Class Security

Given the current threat environment (exposed instances, malicious skills, enterprise bans), this is top-level nav, not buried in settings. Posture score aggregates: open port exposure, CVE count for running versions, risky skill permissions, and weak config patterns. Quarantine flow isolates an instance or agent: blocks egress, disables all skills, preserves state for forensics. Secrets vault manages all credentials with rotation scheduling and least-privilege distribution to agents.

---

# Key Design Decisions

**Inheritance model is explicit everywhere.** Every agent settings page shows what's inherited from its instance vs. locally overridden. Users always know which layer they're editing.

**No feature is "instance-only" or "agent-only."** Skills, personalities, tools, channels, and policies exist at both levels with clear override semantics — mirroring how OpenClaw actually works with global vs. per-agent config files.

**Swarm naming as product identity.** The μ/m/M/Ω tiering isn't just labeling — it gates UI complexity. A μ-swarm shows a simple list; an Ω-swarm shows region maps, cost projections, and rolling deploy controls. Users only see what's relevant to their scale.

**Security is architecture, not a checkbox.** The control plane never opens inbound ports on agent nodes. All communication is agent-initiated outbound tunnel. Secrets are write-only after entry. Audit log is immutable. Quarantine is one click away from anywhere.
