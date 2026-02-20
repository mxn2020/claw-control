Let me first research existing OpenClaw applications to make sure we're not missing anything.Now I have comprehensive research. Let me identify what Document 1 missed from the actual OpenClaw feature set, then build Document 2.

---

# Gap Analysis: What Document 1 Missed

Before Document 2, here are features present in the real OpenClaw ecosystem that Document 1 (the management layer) didn't fully cover:

**Missing from the management layer:**
- **Live Canvas / A2UI** — agent-driven visual workspace where agents render interactive UI components, forms, charts, and dashboards in real time. This is a first-class surface, not just a monitoring feature.
- **Voice Wake + Talk Mode** — always-on speech with ElevenLabs TTS and local Whisper STT. Push-to-talk and continuous conversation modes. Needs a ClawControl UI surface.
- **WebChat surface** — the built-in web chat UI served directly from the gateway. ClawControl should expose this per-agent.
- **Device Nodes** — macOS menu bar app, iOS/Android companion apps. Camera snap, screen record, location services, system notifications. These are pairable devices, not just channels.
- **Gmail Pub/Sub triggers** — real-time email triggers, not just SMTP.
- **Cron / scheduled tasks** — the gateway-native scheduler. Covered lightly but deserves a full management surface in Document 1 (adding `/cron` to the route tree).
- **Exec approval / command queue** — the human-in-the-loop approval queue for dangerous tool calls that the Control UI surfaces natively.
- **Token usage dashboard** — built into the official Control UI, should be in ClawControl.
- **MoltBook / social layer** — community showcase and agent sharing (a separate emerging surface).

These gaps will be patched into Document 2 where they belong as user-facing features, and called out explicitly.

---

# ClawControl — Document 2: The User Layer

## **ClawVerse — The User Experience Platform**

*Built on top of ClawControl's management infrastructure. Where users actually live with their agents.*

---

## Design Philosophy

Document 1 is the **engine room** — provisioning, security, fleet governance, observability. Document 2 is the **cockpit and cabin** — where the user talks to their agents, sees what they're doing, gives them tasks, reviews their output, and builds their personal AI-powered world.

The core insight from real community usage: people don't think in terms of "managing an instance." They think in terms of: *"What can my agent do for me today?"* The user layer must feel like a **personal command center**, not a server dashboard.

Every route in this document assumes the underlying ClawControl infrastructure is set up. ClawVerse connects to it and presents a human-centered face on top.

**Four user personas served:**
1. **Personal** — life admin, health, family, home, finances, learning
2. **Project** — building things, shipping software, creative work
3. **Work** — professional workflows, client management, team coordination
4. **Power** — automation design, multi-agent orchestration, autonomous systems

---

# Complete Route Tree — ClawVerse (User Layer)

```
/app                                           # ClawVerse app shell (user home)
  /app/home                                    # Personal mission control

  # ─────────────────────────────────────────
  # CHAT — Core Conversation Surfaces
  # ─────────────────────────────────────────

  /app/chat
    /app/chat/new                              # Start a new conversation
    /app/chat/:agentId                         # Chat with a specific agent
      /app/chat/:agentId/session/:sessionId    # Named/resumed session
    /app/chat/all                              # Multi-agent unified inbox (user view)
    /app/chat/search                           # Search across all conversations

  # ─────────────────────────────────────────
  # CANVAS — Live Visual Workspace
  # ─────────────────────────────────────────

  /app/canvas
    /app/canvas/live                           # Active A2UI canvas from agent
    /app/canvas/history                        # Past canvas snapshots
    /app/canvas/:canvasId                      # Specific canvas session
      /app/canvas/:canvasId/view
      /app/canvas/:canvasId/replay
      /app/canvas/:canvasId/export

  # ─────────────────────────────────────────
  # VOICE — Voice Interaction Center
  # ─────────────────────────────────────────

  /app/voice
    /app/voice/talk                            # Talk Mode (continuous voice conversation)
    /app/voice/settings                        # Wake word, TTS voice, STT config
    /app/voice/history                         # Voice session transcripts

  # ─────────────────────────────────────────
  # BRIEFING — Daily Intelligence Hub
  # ─────────────────────────────────────────

  /app/briefing
    /app/briefing/today                        # Today's morning briefing
    /app/briefing/history                      # Past briefings archive
    /app/briefing/configure                    # Briefing builder / composer
    /app/briefing/sources                      # Connected data sources

  # ─────────────────────────────────────────
  # TASKS — Agent Task Management
  # ─────────────────────────────────────────

  /app/tasks
    /app/tasks/inbox                           # Tasks assigned to agents
    /app/tasks/active                          # Currently running agent tasks
    /app/tasks/pending-approval                # Tasks awaiting human approval
    /app/tasks/completed                       # Completed task archive
    /app/tasks/new                             # Create a task for an agent
    /app/tasks/:taskId                         # Task detail + execution trace

  # ─────────────────────────────────────────
  # CRON — Scheduled Automation Manager
  # ─────────────────────────────────────────

  /app/cron
    /app/cron/jobs                             # All scheduled jobs
    /app/cron/new                              # Create a scheduled job
    /app/cron/:jobId                           # Job detail + run history
    /app/cron/templates                        # Pre-built job templates
    /app/cron/calendar                         # Calendar view of upcoming runs

  # ─────────────────────────────────────────
  # APPROVALS — Human-in-the-Loop Queue
  # ─────────────────────────────────────────

  /app/approvals
    /app/approvals/queue                       # Pending approval requests
    /app/approvals/history                     # Past approvals and rejections
    /app/approvals/:approvalId                 # Approval detail + context

  # ─────────────────────────────────────────
  # PERSONAL — Life Management Domain
  # ─────────────────────────────────────────

  /app/personal
    /app/personal/overview                     # Personal dashboard

    /app/personal/inbox                        # Email & message triage
      /app/personal/inbox/email
        /app/personal/inbox/email/triage       # AI-triaged email queue
        /app/personal/inbox/email/drafts       # Agent-drafted replies awaiting review
        /app/personal/inbox/email/rules        # Triage and auto-reply rules
      /app/personal/inbox/messages             # Cross-channel message summary

    /app/personal/calendar
      /app/personal/calendar/view              # Unified calendar view
      /app/personal/calendar/agenda            # Natural language agenda
      /app/personal/calendar/conflicts         # Agent-detected scheduling conflicts
      /app/personal/calendar/itinerary         # Trip/event itinerary builder

    /app/personal/tasks-and-goals
      /app/personal/tasks-and-goals/today      # Today's prioritized task list
      /app/personal/tasks-and-goals/goals      # Long-term goal tracking
      /app/personal/tasks-and-goals/weekly     # Weekly review
      /app/personal/tasks-and-goals/habits     # Habit tracking

    /app/personal/health
      /app/personal/health/dashboard           # Health data overview
      /app/personal/health/sleep               # Sleep tracking + coaching
      /app/personal/health/fitness             # Workout logging + planning
      /app/personal/health/nutrition           # Meal planning + logging
      /app/personal/health/labs                # Lab result analysis
      /app/personal/health/journal             # Health journal with AI insights

    /app/personal/finance
      /app/personal/finance/overview           # Financial dashboard
      /app/personal/finance/transactions       # Transaction monitoring
      /app/personal/finance/budgets            # Budget tracking
      /app/personal/finance/subscriptions      # Subscription tracker
      /app/personal/finance/invoices           # Invoice management
      /app/personal/finance/tax                # Tax prep assistant

    /app/personal/home
      /app/personal/home/smart-home            # Smart home control + status
      /app/personal/home/shopping              # Grocery & shopping lists
      /app/personal/home/meals                 # Meal planning
      /app/personal/home/maintenance           # Home maintenance tracker
      /app/personal/home/family                # Family coordination hub

    /app/personal/travel
      /app/personal/travel/upcoming            # Upcoming trips
      /app/personal/travel/planner             # Trip planning workspace
      /app/personal/travel/documents           # Travel document vault
      /app/personal/travel/:tripId             # Trip detail page

    /app/personal/learning
      /app/personal/learning/library           # Learning queue
      /app/personal/learning/notes             # Study notes + summaries
      /app/personal/learning/flashcards        # AI-generated flashcards
      /app/personal/learning/reading           # Reading list + progress

    /app/personal/social
      /app/personal/social/contacts            # Contact intelligence
      /app/personal/social/follow-ups          # Relationship follow-up reminders
      /app/personal/social/events              # Social event tracking

  # ─────────────────────────────────────────
  # PROJECTS — Creative & Technical Work
  # ─────────────────────────────────────────

  /app/projects
    /app/projects/overview                     # All projects dashboard

    /app/projects/:projectId
      /app/projects/:projectId/overview
      /app/projects/:projectId/chat            # Project-scoped agent chat
      /app/projects/:projectId/canvas          # Project canvas workspace
      /app/projects/:projectId/tasks           # Project tasks + agent assignments
      /app/projects/:projectId/files           # Project file browser
      /app/projects/:projectId/memory          # Project knowledge base
      /app/projects/:projectId/agents          # Agents assigned to this project
      /app/projects/:projectId/timeline        # Project timeline + milestones
      /app/projects/:projectId/activity        # Activity log + agent actions

    /app/projects/new                          # New project wizard

    # Development Projects
    /app/projects/dev
      /app/projects/dev/repos                  # GitHub/GitLab repo connections
      /app/projects/dev/prs                    # PR monitoring + agent review
      /app/projects/dev/deployments            # Deployment tracking
      /app/projects/dev/issues                 # Issue triage + resolution
      /app/projects/dev/code-review            # Agent code review queue
      /app/projects/dev/docs                   # Auto-generated documentation

    # Creative Projects
    /app/projects/creative
      /app/projects/creative/content           # Content creation workspace
      /app/projects/creative/media             # Image/video generation queue
      /app/projects/creative/writing           # Long-form writing workspace
      /app/projects/creative/social            # Social media content pipeline
      /app/projects/creative/brand             # Brand asset management

    # Research Projects
    /app/projects/research
      /app/projects/research/topics            # Research topic workspace
      /app/projects/research/papers            # Paper/article library
      /app/projects/research/synthesis         # Agent-synthesized reports
      /app/projects/research/notes             # Research notes

  # ─────────────────────────────────────────
  # WORK — Professional Domain
  # ─────────────────────────────────────────

  /app/work
    /app/work/overview                         # Work dashboard

    /app/work/inbox                            # Professional inbox triage
      /app/work/inbox/email                    # Work email triage
      /app/work/inbox/slack                    # Slack summary + drafts
      /app/work/inbox/tickets                  # Support ticket queue

    /app/work/meetings
      /app/work/meetings/upcoming              # Upcoming meetings
      /app/work/meetings/prep                  # Meeting prep briefs
      /app/work/meetings/notes                 # Meeting notes + action items
      /app/work/meetings/follow-ups            # Post-meeting follow-up queue
      /app/work/meetings/:meetingId            # Meeting detail

    /app/work/clients
      /app/work/clients/directory              # Client directory
      /app/work/clients/:clientId              # Client profile + history
        /app/work/clients/:clientId/overview
        /app/work/clients/:clientId/communications
        /app/work/clients/:clientId/projects
        /app/work/clients/:clientId/invoices
        /app/work/clients/:clientId/notes

    /app/work/crm
      /app/work/crm/pipeline                   # Sales/deal pipeline
      /app/work/crm/contacts                   # Contact management
      /app/work/crm/activities                 # Activity log
      /app/work/crm/reports                    # AI-generated CRM reports

    /app/work/documents
      /app/work/documents/drafts               # Agent-drafted documents
      /app/work/documents/templates            # Document templates
      /app/work/documents/contracts            # Contract review queue
      /app/work/documents/reports              # Generated reports

    /app/work/support
      /app/work/support/queue                  # Support ticket queue
      /app/work/support/responses              # Agent-drafted responses
      /app/work/support/knowledge-base         # Support knowledge base
      /app/work/support/analytics              # Support volume + trends

    /app/work/content
      /app/work/content/pipeline               # Content production pipeline
      /app/work/content/calendar               # Content calendar
      /app/work/content/drafts                 # Content drafts
      /app/work/content/published              # Published content tracker
      /app/work/content/seo                    # SEO research + optimization

    /app/work/finance
      /app/work/finance/invoicing              # Invoice creation + tracking
      /app/work/finance/expenses               # Expense management
      /app/work/finance/payroll                # Payroll assistant
      /app/work/finance/reports                # Financial report generation

  # ─────────────────────────────────────────
  # AUTOMATIONS — User-Built Workflows
  # ─────────────────────────────────────────

  /app/automations
    /app/automations/overview                  # All automations dashboard
    /app/automations/new                       # Automation builder
    /app/automations/:automationId             # Automation detail + run history
    /app/automations/templates                 # Community automation templates
    /app/automations/triggers                  # Trigger management
      /app/automations/triggers/webhooks
      /app/automations/triggers/email          # Gmail Pub/Sub triggers
      /app/automations/triggers/cron
      /app/automations/triggers/events
    /app/automations/logs                      # Automation run logs

  # ─────────────────────────────────────────
  # MEMORY — Personal Knowledge Base
  # ─────────────────────────────────────────

  /app/memory
    /app/memory/overview                       # Memory health + overview
    /app/memory/browse                         # File + knowledge browser
    /app/memory/search                         # Semantic search across memory
    /app/memory/inject                         # Quick fact injection
    /app/memory/journal                        # Personal journal (agent reads)
    /app/memory/contacts                       # Contact knowledge cards
    /app/memory/topics                         # Topic knowledge clusters
    /app/memory/timeline                       # Memory timeline view

  # ─────────────────────────────────────────
  # BROWSER — Agent Web Automation
  # ─────────────────────────────────────────

  /app/browser
    /app/browser/live                          # Live browser session view
    /app/browser/sessions                      # Past browser sessions
    /app/browser/screenshots                   # Screenshot archive
    /app/browser/tasks                         # Queued browser tasks
    /app/browser/profiles                      # Browser profiles per agent

  # ─────────────────────────────────────────
  # NODES — Device & Companion Management
  # ─────────────────────────────────────────

  /app/nodes
    /app/nodes/overview                        # All paired devices
    /app/nodes/:nodeId
      /app/nodes/:nodeId/overview
      /app/nodes/:nodeId/camera                # Camera snap/clip controls
      /app/nodes/:nodeId/screen               # Screen record controls
      /app/nodes/:nodeId/voice                 # Voice wake config
      /app/nodes/:nodeId/location              # Location services

  # ─────────────────────────────────────────
  # DISCOVER — ClawHub & Community
  # ─────────────────────────────────────────

  /app/discover
    /app/discover/skills                       # User-facing skill browser
    /app/discover/automations                  # Community automation library
    /app/discover/blueprints                   # Community agent blueprints
    /app/discover/showcase                     # User showcase / MoltBook
    /app/discover/trending                     # Trending use cases

  # ─────────────────────────────────────────
  # USAGE — Personal Cost & Activity
  # ─────────────────────────────────────────

  /app/usage
    /app/usage/overview                        # My personal usage dashboard
    /app/usage/tokens                          # Token consumption breakdown
    /app/usage/cost                            # Spend by agent and period
    /app/usage/activity                        # Activity heatmap
    /app/usage/limits                          # Personal budget settings
```

---

# Full Feature Documentation — ClawVerse

---

## `/app/home` — Personal Mission Control

The first screen a user sees when they open ClawVerse. This is not a dashboard for managing infrastructure — it's a daily command center that answers "what's happening with my agents and my life right now?"

The home page is composed of **adaptive widgets** that the user can arrange and configure. Each widget is either agent-generated (the agent filled it with content during its morning run) or live (pulling real-time data from connected sources). Default widget set on first use:

**Today's Briefing widget:** A card showing the morning briefing summary — key agenda items, top emails, active tasks, weather, and any agent alerts from overnight. Clicking expands to the full briefing at `/app/briefing/today`.

**Active Agents widget:** Live status of all the user's agents — which are idle, which are currently processing, which have pending approvals. One-click to open any agent's chat.

**Pending Approvals widget:** A compact list of any tool calls or actions waiting for human sign-off. Approval or rejection directly from the widget without navigating away.

**Task Pipeline widget:** A Kanban-style mini-board showing tasks the user has delegated to agents: queued, running, review needed, done.

**Morning Briefing countdown / Cron status widget:** Next scheduled jobs with countdown timers. Useful for knowing "my briefing runs in 45 minutes."

**Canvas preview widget:** If an agent pushed a live canvas in the last session, a thumbnail preview of it is shown with a "resume" button.

**Recent Conversations widget:** The last 5 conversations across all agents, with timestamps and source channel badges.

**Spend Today widget:** A simple gauge showing today's LLM spend vs. the user's daily budget. Color-coded green / yellow / red.

The widget layout is drag-to-rearrange and saved per user. Widgets can be added from a picker, resized, or removed. The entire home page reflows responsively for mobile.

---

## Chat Routes

### `/app/chat/new` — Start a Conversation

New conversation launcher. The user selects which agent to talk to (or accepts the default agent), optionally names the session for future reference, and types their first message. Supports file attachment (images, PDFs, documents). Supports voice input (microphone button records and transcribes). The agent responds with streaming output — text appears token-by-token as it's generated. If the agent invokes tools during the response, a collapsible "thinking" panel shows what it's doing in real time.

### `/app/chat/:agentId` — Chat with an Agent

The primary conversation surface. Designed to feel like a high-quality messaging app, not a developer tool.

**Message rendering:** Markdown is rendered fully — tables, code blocks with syntax highlighting, numbered lists, embedded images. Agent messages show a subtle model indicator (which LLM generated this response) on hover. Tool call indicators appear inline when the agent invoked a skill: a collapsible callout showing the tool name, inputs, and output. The user can expand any tool call to see the full detail.

**Input area:** Rich text input with slash commands. Typing `/` opens a command picker: `/task` (create a formal task), `/remind` (set a reminder), `/browse` (ask agent to open a URL), `/canvas` (request a canvas), `/voice` (switch to voice mode), `/file` (attach a file). File drag-and-drop onto the input area is supported.

**Session context bar:** A slim bar above the conversation shows: which agent, which model, current session token count, and a "context window" indicator showing how full the context is. A "Compress context" button triggers a context compaction to free window space without losing key information.

**Presence and typing:** When the agent is "thinking" (the LLM is generating), a typing indicator is shown — the same animated dots familiar from messaging apps. This removes the blank-waiting-screen anxiety of long inference times.

**Multi-modal input:** The user can send images, audio clips, PDFs, and documents. The agent receives them as context. Audio clips are transcribed before being passed to the agent.

**Reaction and flagging:** Users can react to agent messages with quick emoji reactions (for rating quality — thumbs up/down feeds back into the agent's memory). Users can flag any message for review (if God Mode is enabled for a team, a flagged message notifies an operator).

**Channel source toggle:** If the same agent handles multiple channels (WhatsApp + WebChat + Telegram), the user can see all conversations in one thread view or filter by source channel with a toggle.

### `/app/chat/all` — Multi-Agent Unified Inbox (User View)

The aggregated view of all conversations across all the user's agents, presented from the user's perspective (not the operator's). Unlike the management layer's session inbox which is for monitoring, this is the user's "messages from all my AIs" view — similar to how iMessage shows all conversations. Each conversation thread shows: agent name, channel icon, last message preview, timestamp, and unread indicator. Clicking opens the full conversation.

### `/app/chat/search`

Full-text search across all conversations with all agents. Regex support, date filtering, agent filtering. Results show message snippets with context. The search is local (against cached session data) for speed, with a "search server history" fallback for older conversations.

---

## Canvas Routes

### `/app/canvas/live` — Live A2UI Canvas

The Live Canvas is one of OpenClaw's most distinctive features and the one most underrepresented in third-party dashboards. When an agent pushes a Canvas event (via `canvas.push`), the content appears here in real time. The canvas is a WebView-based rendering surface where agents can display:

**Interactive dashboards:** The agent generates a live Grafana-style metrics panel — charts, gauges, and tables the user can interact with (zoom, filter, click to drill down). Example: ask "show my server metrics" and receive a live interactive panel without leaving the chat.

**Dynamic forms:** The agent renders a form for the user to fill out — a survey, a structured intake form, a configuration wizard. Form submission is sent back to the agent as context. Replaces back-and-forth text exchanges for structured data collection.

**Visual planning boards:** The agent creates a Kanban board, a timeline, or a mind map for a project. The user can drag items, check things off, and add notes — the agent reads the resulting state.

**Code previews and outputs:** The agent renders a live HTML/CSS/JS preview of code it just wrote. The user can see the output immediately and request changes conversationally.

**Charts and reports:** The agent renders a bar chart, pie chart, scatter plot, or heatmap for data it has processed. Exportable as PNG or SVG.

**Custom UI components:** Via A2UI, the agent can render buttons, toggles, sliders, dropdown menus, and text inputs. The user interacts with them and the state is sent back to the agent. Enables genuinely interactive agent-user collaborations.

The canvas is synchronized in real time using CRDT (conflict-free replicated data type) so it stays consistent across devices — what you see on your laptop is the same as on your phone.

**Canvas toolbar:** Zoom, pan, snapshot (takes a screenshot), share (generates a read-only link), and export (PNG / PDF). A "lock" toggle prevents accidental interaction while reviewing.

### `/app/canvas/history`

A gallery of all past canvas sessions. Each entry shows: timestamp, agent that generated it, a thumbnail screenshot, and the session it was associated with. Clicking reopens the canvas in a frozen replay state. Old canvases are retained according to the user's storage quota.

### `/app/canvas/:canvasId/replay`

Step-by-step replay of how an agent built a canvas — seeing each `canvas.push` event in sequence. Useful for understanding how the agent arrived at a complex visualization, or for presentations showing an agent's reasoning process visually.

---

## Voice Routes

### `/app/voice/talk` — Talk Mode

The full-screen voice conversation interface. This brings the ElevenLabs-powered Talk Mode to the web, for users who aren't on the native macOS/iOS/Android apps.

The interface is minimal by design: a waveform visualization, a transcript panel showing what was said and what the agent responded, and a mute button. The user speaks; the speech is transcribed locally (Whisper.cpp if available, cloud fallback); the transcript is sent to the selected agent; the agent responds; the response is synthesized to speech via ElevenLabs and played back. The full loop targets under 1.5 seconds end-to-end on good hardware.

**Modes:** Push-to-Talk (hold spacebar or the microphone button to record), Voice Activity Detection (automatic detection of speech start/end — hands-free), and Continuous (the agent is always listening for the wake word).

**Agent selection:** A compact agent picker in the corner lets the user switch which agent they're talking to mid-session. Useful for "switching hats" between a personal assistant agent and a work coding agent.

**Transcript:** Every spoken exchange is saved as a session transcript accessible at `/app/voice/history`. The transcript is searchable and can be reviewed later.

### `/app/voice/settings`

Voice configuration:

**Wake word:** Configure a custom wake word (default: "Hey Molty" — the mascot's name). Wake word detection runs locally using a lightweight model. No audio leaves the device until the wake word is detected.

**TTS voice:** Select the ElevenLabs voice profile to use for the agent's speech. Preview voices before selecting. Configure speaking rate, stability, and expressiveness. Different voices can be assigned to different agents — your personal assistant speaks differently from your coding agent.

**STT configuration:** Select the transcription engine (local Whisper.cpp, cloud Whisper API, or native OS speech recognition). Set the language. Configure silence detection threshold.

**Per-agent voice settings:** Override the global voice settings for individual agents — each agent can have its own distinct voice identity.

### `/app/voice/history`

Archive of all voice session transcripts. Timestamped, attributed to the agent. Searchable by keyword. Each session shows the duration, word count, and a summary (auto-generated by the agent). Sessions can be shared or exported as plain text.

---

## Briefing Routes

### `/app/briefing/today` — Morning Briefing

The morning briefing is the most popular real-world OpenClaw use case — a personalized daily summary pushed to the user at a configured time. ClawVerse presents it as a beautifully formatted reading experience, not just a wall of text.

The briefing is structured into sections (configured by the user). Default sections:

**Daily overview:** Today's date, weather at the user's location, a one-line summary of what kind of day is ahead (busy / light / mixed).

**Calendar agenda:** Today's meetings and events in chronological order, with prep notes if the agent generated them (e.g., "10:00 AM — Call with Sarah Chen about Q2 roadmap. Her recent LinkedIn shows she's focused on enterprise expansion.").

**Email highlights:** Top 3–5 emails that matter today, with the agent's suggested action (reply, defer, delete, forward). One-click to open each email.

**Task focus:** The 3 most important things to accomplish today, derived from the user's goals, calendar, and outstanding tasks. The agent explains why each was selected.

**News & information:** Curated from the user's configured sources — industry news, competitor mentions, topics of interest. Summaries only; click to read full articles.

**Health & wellness prompt:** If health data sources are connected (Apple Health, Whoop, Garmin), a one-line status: sleep score, readiness, and a recommendation.

**Reminders:** Any time-sensitive reminders the agent flagged from the user's memory or recent conversations.

**Agent actions taken overnight:** A log of what agents did while the user slept — emails processed, tasks completed, research gathered.

Each section is collapsible. The user can acknowledge the briefing (marks it as read and dismisses it from the home widget). A "reply" input at the bottom lets the user respond to the agent with any immediate follow-ups from the briefing content.

### `/app/briefing/configure` — Briefing Builder

A visual composer for the morning briefing. Drag-and-drop section builder: add, remove, and reorder sections. For each section, configure: which agent runs it, which data sources it pulls from, the desired length (concise / standard / detailed), and the output format (bullet list / narrative prose / structured card). Set the delivery time (with timezone), the delivery channel (WebChat, Telegram, WhatsApp, email), and the days it runs (weekdays only, every day, custom).

Preview mode: run the briefing right now against live data to see what it will look like. Useful for tuning before the first scheduled run.

### `/app/briefing/sources` — Data Source Connections

The briefing (and many other user-facing features) draws from connected data sources. This page manages them. Source types:

**Calendar:** Google Calendar, Apple Calendar, Outlook. OAuth connection per provider.

**Email:** Gmail (via OAuth + Pub/Sub for real-time triggers), Outlook, IMAP for any provider.

**Task managers:** Notion, Todoist, Things 3, Linear, Jira, Asana, Trello.

**Health:** Apple Health (via HealthKit export), Whoop API, Garmin Connect API, Oura Ring API.

**News & RSS:** Any RSS feed, plus configured keywords for news monitoring. Google News, Hacker News, Reddit subreddit digests.

**Finance:** Bank/account read-only connections via Plaid, crypto wallet balance monitoring, stock/portfolio watchlist.

**Productivity:** Obsidian vault (via local file sync), Notion workspace, Roam Research.

**Communication:** Slack workspace (for message summaries), Discord servers.

Each source shows its connection status, last sync time, and which briefing sections use it. Disconnected sources are flagged with a warning on the briefing page.

---

## Task Routes

### `/app/tasks/inbox` — Agent Task Inbox

All tasks that have been delegated to agents. A task is a unit of work with a clear goal, defined scope, success criteria, and an agent assigned to complete it. Tasks are different from conversations — they're tracked through completion, not just in a chat thread.

The inbox shows tasks in a Kanban view: Queued (agent hasn't started), Running (agent is actively working), Needs Review (agent finished but wants human sign-off), Done, and Failed. Each task card shows: title, assigned agent, creation time, estimated completion (if the agent projected it), and a progress indicator (for multi-step tasks).

Filters: by agent, by project, by status, by creation date, by priority. Sort by urgency (deadline-based) or by agent-estimated complexity.

### `/app/tasks/pending-approval` — Approval Queue

The most security-critical user-facing surface in ClawVerse. When an agent reaches a decision point where it wants to take an action that requires human authorization — sending an email, executing a shell command, making an API call that costs money, deleting a file — it pauses and creates an approval request.

Each approval request shows: what the agent is trying to do (plain English description), the exact action it will take (raw tool call with arguments, shown in a readable format), the context that led to this decision (the last few turns of the conversation that caused the agent to want to take this action), the risk assessment (low / medium / high, computed from the action type and scope), and any alternatives the agent suggested.

Action buttons: Approve (executes immediately), Reject (agent is notified and asked to try a different approach), Approve with Modification (the user can edit the arguments before approval — e.g., change the email recipient before sending), and Defer (snooze for N minutes, the agent waits).

All approvals and rejections are logged immutably to the audit trail. The user can set a "trusted actions" list — action types that are pre-approved and never require a manual approval step (e.g., "reading a file is always approved").

### `/app/tasks/new` — Create a Task

A structured task creation form. Title, description, assigned agent, project context, success criteria (what does "done" look like?), deadline, priority, and any attached files or context. The user can also create a task conversationally — just telling the agent in chat "handle this" and a task is created automatically from the conversation context. The structured form is for cases where precision matters.

### `/app/tasks/:taskId` — Task Detail

Full view of one task. Shows: the task definition, which agent is handling it, the execution trace (every action the agent took, in order, with timestamps), the current status, any approval requests generated during the task, and the final output. If the task failed, shows the error and the agent's explanation. The user can restart a failed task, reassign it to a different agent, or close it manually.

---

## Cron Routes

### `/app/cron/jobs` — Scheduled Jobs

All scheduled recurring jobs across the user's agents. A job is a cron-triggered task: "Every morning at 7 AM, run the briefing agent." Each job shows: name, schedule (human-readable: "every weekday at 7:00 AM"), assigned agent, last run time, last run status (success / failed / skipped), and next run time.

Toggle switches to enable/disable individual jobs without deleting them. One-click to run a job immediately (useful for testing). Pause all jobs during a vacation period with a date range picker.

### `/app/cron/new` — Create a Job

A job creation wizard. Steps: give it a name, select the triggering agent, write the instruction (what the agent should do when the job fires — in plain English), configure the schedule (natural language: "every weekday morning at 7," "every Friday at 6 PM," "on the 1st and 15th of every month"), and optionally configure what the output should do (send to a channel, save to memory, create a task). Test run button fires the job immediately with a preview of the output.

### `/app/cron/templates` — Job Template Library

Pre-built cron job templates from the community and from ClawControl's library. Categories:

**Daily briefings:** Morning summary, weather + agenda, health check, market briefing.

**Email & communication:** Inbox zero run, newsletter digest, team standup summary.

**Finance:** Daily spend summary, invoice check, crypto price alert, subscription renewal reminder.

**Development:** Daily GitHub activity summary, PR aging report, deployment health check.

**Health:** Sleep score report, workout reminder, nutrition log prompt.

**Content:** Social media engagement summary, RSS digest, YouTube new video alert.

**Research:** Daily news digest on configured topics, competitor mention monitoring, Reddit subreddit digest.

Each template is shown with: a description, required skills/connections, estimated API cost per run, and community install count. One-click to install and customize.

### `/app/cron/calendar` — Upcoming Job Calendar

A weekly calendar view showing all upcoming scheduled job runs as time blocks. Useful for seeing when jobs cluster (e.g., every job fires at 7 AM Monday) and spreading them out to avoid API rate limit spikes. Drag jobs to different time slots to reschedule. Hovering any block shows the job's details.

---

## Approvals Routes

### `/app/approvals/queue`

Covered under tasks above, but the approvals queue is also its own top-level destination for users who want to process all pending approvals across all agents at once. Sorted by urgency (deadline-sensitive approvals first) and by risk (high-risk actions surfaced first).

**Batch mode:** Select multiple approvals of the same type and approve/reject them all at once. Useful when an agent generates many similar approval requests for a bulk operation (e.g., approving 50 email draft sends from a campaign).

### `/app/approvals/history`

Log of every approval decision: who approved/rejected, when, what the outcome was. If a rejected action later caused a problem (because the user rejected a necessary step), the log shows the downstream consequence. Filterable by agent, action type, decision, and date.

---

## Personal Domain Routes

### `/app/personal/overview` — Personal Dashboard

The personal life management hub. A dashboard composed of widgets across all personal domains: today's calendar, email triage status, task focus, health snapshot, finance pulse, and home status. Each widget is a preview that links to its full section. The layout is configurable — a user who doesn't use the finance section can remove that widget.

---

### Email & Inbox — `/app/personal/inbox/email`

#### `/app/personal/inbox/email/triage`

The AI-triaged email inbox. The agent reads the user's email (via Gmail OAuth or IMAP), classifies each email, and presents them in a triage view. Classification categories: Urgent (action required today), Important (should be read soon), FYI (informational, no action), Newsletter (subscription content), Automated (receipts, notifications), and Spam. The user sees a prioritized list rather than the raw inbox.

For each email: sender, subject, a one-sentence AI summary, and the agent's suggested action (Reply, Archive, Delete, Delegate, Defer). The user can approve the suggestion with one click or override it. Reply drafts are pre-generated by the agent — the user reviews and approves the draft or edits it before sending.

**Inbox Zero mode:** A guided "work through the queue" mode where emails are shown one at a time, full-screen, with approve/skip/reject buttons. Gamified — shows a progress bar and a "you've processed X emails" completion message.

#### `/app/personal/inbox/email/drafts`

All emails that the agent has drafted but not yet sent, waiting for user review. Each draft shows: to, subject, the drafted body, the original email it's responding to (for replies), and the agent's brief explanation of its drafting approach. Editing is a full email compose interface with rich text. One-click to approve and send, or reject and ask the agent to redraft with feedback.

#### `/app/personal/inbox/email/rules`

The auto-triage and auto-reply rules the user has configured. Rules can be natural language ("anything from my bank is Financial, archive after reading") or structured (sender domain → category). Auto-reply rules configure which email types get automatic responses (e.g., "if I receive a meeting request from a known client, auto-reply confirming availability based on my calendar and draft a full reply for my review").

---

### Calendar — `/app/personal/calendar`

#### `/app/personal/calendar/view`

A full calendar view (month / week / day toggle) pulling from all connected calendar sources. Events from Google Calendar, Apple Calendar, and Outlook are shown in a unified view, color-coded by source. Agent-created events are shown with a special badge. Clicking any event shows: full details, attendees, location, the agent's pre-generated meeting prep brief (if applicable), and a "prep" button to request a briefing if one wasn't auto-generated.

Creating an event: the user types in natural language ("lunch with Sarah next Tuesday at noon at that Italian place near the office"). The agent parses the intent, resolves ambiguities (which Sarah? which Italian place?), and creates the event — or asks one clarifying question if needed.

#### `/app/personal/calendar/agenda`

A natural language view of the user's upcoming schedule. Instead of a grid, the agent narrates the week: "Your Tuesday starts with a 9 AM team standup (30 min), then you have a 3-hour focus block. At 2 PM there's a call with the client — I've pulled their recent emails and prepared a brief. Wednesday is completely free." This is the calendar surface the agent uses for briefings.

#### `/app/personal/calendar/conflicts`

The agent continuously monitors the calendar for scheduling conflicts, back-to-back meetings without travel time, and overcommitted days. This page surfaces all detected issues: overlapping events, meetings with insufficient prep time, deadlines that clash with blocked time. For each conflict: the agent proposes a resolution (reschedule X, decline Y, block travel time before Z) that the user can approve or modify.

---

### Tasks & Goals — `/app/personal/tasks-and-goals`

#### `/app/personal/tasks-and-goals/today`

The daily task list, prioritized by the agent based on: deadlines, user-defined importance scores, calendar context (what do you need before today's meetings?), and energy level (if health data suggests low energy, lighter tasks are surfaced first). Tasks are shown in a simple checklist. The user can drag to reorder, check off completed items, and delegate any task to an agent with a "have agent do this" button.

#### `/app/personal/tasks-and-goals/goals`

Long-term goal tracking. Each goal has: a title, a description, a target date, a success metric, and a set of milestones. The agent is connected to each goal and periodically (on a configurable schedule) reports progress: "Based on your task completions this week, you're on track for the fitness goal but behind on the book chapter target." The agent can propose corrective actions.

#### `/app/personal/tasks-and-goals/weekly`

The weekly review interface. Every Sunday (configurable), the agent prepares a weekly review: what was accomplished this week, what was left undone and why, progress on goals, patterns noticed (e.g., "you tend to skip tasks scheduled after 4 PM"), and a preview of next week. The user can respond to the review and the agent updates the plan for the coming week accordingly.

---

### Health — `/app/personal/health`

#### `/app/personal/health/dashboard`

A unified health dashboard pulling from connected health data sources (Apple Health, Whoop, Garmin, Oura). Displays: sleep score and trend, readiness/recovery score, daily step count vs. goal, active calories, heart rate variability trend, and weight/body composition if tracked. The agent generates a plain-English interpretation of the data: "Your recovery is lower than usual. Your sleep last night was fragmented — you woke up twice. Consider a lighter workout today and aim for bed by 10 PM."

#### `/app/personal/health/labs`

Medical lab result analysis. The user uploads a PDF of blood work results (from a lab, doctor's office, or health app export). The agent reads the PDF, identifies all measured values, flags any that are outside the reference range, and provides a plain-English explanation of what each value means and what trends are concerning. **Critically, the agent always includes a disclaimer that this is informational only and not medical advice, and encourages the user to discuss with their doctor.** Lab results are stored in the user's memory vault for longitudinal tracking — "your ferritin has been trending down over the last 3 tests."

---

### Finance — `/app/personal/finance`

#### `/app/personal/finance/overview`

Financial dashboard. Net worth snapshot (if accounts connected via Plaid), monthly income vs. expenses, top spending categories, upcoming bills, and any anomalies the agent detected (unusual charges, subscriptions that went up in price, a recurring charge the agent can't identify).

#### `/app/personal/finance/subscriptions`

The agent continuously monitors connected accounts and identifies recurring charges. Each subscription is listed with: service name, amount, frequency, and the date of the last charge. The agent categorizes them (streaming, SaaS tools, memberships, insurance) and flags ones that might be unused or duplicated. A "cancel assistant" mode lets the user select subscriptions to cancel and the agent identifies the cancellation method (some can be cancelled via API, others require a browser session, others require a phone call — the agent handles the ones it can and provides step-by-step instructions for the rest).

#### `/app/personal/finance/invoices`

For freelancers and solopreneurs: invoice creation and tracking. The user describes the work done and the agent generates a professional invoice (with the user's branding details from their memory/profile), outputs it as a PDF, and can send it directly to the client. Invoice status tracking: sent, viewed, overdue, paid. Overdue invoices trigger agent-drafted follow-up reminders.

---

### Home — `/app/personal/home`

#### `/app/personal/home/smart-home`

Smart home control and status via connected home platforms (Home Assistant, Google Home, Apple HomeKit). Device status at a glance: lights, thermostats, security cameras, door locks, appliances. Natural language control: "turn the living room lights to 40% and set the thermostat to 20°C." Automation suggestions: the agent notices patterns ("you always turn the porch light off at 11 PM") and proposes automations. Scene management: save named states ("movie mode," "morning routine") that the agent can activate on request or on schedule.

#### `/app/personal/home/meals`

Full weekly meal planning powered by the agent. The user specifies preferences (dietary restrictions, cuisine preferences, cooking time available per night, number of people). The agent generates a weekly meal plan with recipes. Clicking any recipe shows full ingredients and instructions. A "generate shopping list" button aggregates ingredients across all planned meals into a consolidated shopping list, organized by store section. The shopping list can be sent to the user's phone via WhatsApp or Telegram, or pushed to a grocery delivery app if connected.

---

### Travel — `/app/personal/travel`

#### `/app/personal/travel/planner`

An agentic travel planning workspace. The user describes a trip in natural language ("10 days in Japan, early April, budget around €3,000, interested in food and temples, not too much walking"). The agent researches: flight options (using the browser automation to check live prices), accommodation recommendations for the itinerary, must-see locations organized by city, day-by-day itinerary draft, estimated costs, and weather forecast.

The output is an interactive itinerary card shown on the Canvas — the user can drag activities to different days, swap accommodations, add notes, and adjust the budget. When satisfied, the user can have the agent: book flights (via browser automation on booking sites), add all events to the calendar, create a packing list based on the destination's weather, and set up check-in reminders.

#### `/app/personal/travel/:tripId`

A dedicated workspace for a specific trip. Contains: the full itinerary (editable), all booking confirmations (extracted from email and stored here), travel documents (passport info, visa details, insurance), packing list with checkboxes, local emergency contacts, currency conversion reference, and a "trip assistant" chat widget connected to the travel agent. During the trip, the user can ask the trip assistant things like "find a good ramen place near our hotel for tonight" or "what's the local SIM card option at the airport."

---

## Project Routes

### `/app/projects/overview` — Projects Dashboard

All active projects listed with: project name, description, type tag (Dev / Creative / Research / Work), assigned agents, task count (open / completed), and last activity date. A "recently active" section shows projects with agent activity in the last 24h. Progress bars show milestone completion.

### `/app/projects/:projectId` — Project Workspace

The primary project management surface. Each project is a bounded workspace that the agent operates within. The workspace contains:

**Chat:** Project-scoped conversations with the assigned agents. Messages sent here are in the context of this project — the agent knows the project's goals, files, and history.

**Canvas:** Project-specific canvas sessions. The agent can render project timelines, architecture diagrams, design mockups, and progress boards on the canvas.

**Tasks:** All tasks within this project, tracked through completion.

**Files:** The project's file system — code, documents, designs, research. The agent can read, write, and organize these files. Changes are tracked with diffs.

**Memory:** Project-specific knowledge base. The agent accumulates information about the project that persists across sessions: decisions made, context established, patterns learned.

**Timeline:** Milestone-based timeline for the project. The agent updates milestone status as tasks are completed.

---

### Development Projects — `/app/projects/dev`

#### `/app/projects/dev/repos`

Connected GitHub, GitLab, or Bitbucket repositories. For each repo: name, last commit, open PR count, open issue count, CI/CD status, and the agent assigned to it. The agent can: review code changes, summarize PR diffs in plain English, identify potential bugs in new code, check CI logs when a build fails and propose fixes, and answer questions about the codebase.

#### `/app/projects/dev/prs` — PR Monitoring and Agent Review

All open pull requests across connected repos. For each PR: title, author, age, lines changed, review status. The agent automatically generates a review summary for any PR it hasn't reviewed: what the PR does, potential concerns, questions for the author. The user can have the agent post the review as a GitHub comment with one click. PRs that have been open longer than a configured threshold are flagged as stale.

#### `/app/projects/dev/deployments`

Deployment tracking across connected CI/CD systems (GitHub Actions, Railway, Vercel, Render, Heroku). Each deployment: environment (prod / staging / dev), status (in progress / succeeded / failed), timestamp, and the commit it deployed. When a deployment fails, the agent automatically fetches the build log, diagnoses the failure, and presents a proposed fix. The user can approve the fix and the agent commits it, triggering a re-deploy.

#### `/app/projects/dev/code-review`

A dedicated code review workspace. The user pastes code, attaches a file, or selects a file from a connected repo. The agent reviews it with configurable focus areas: security vulnerabilities, performance issues, code style, test coverage, documentation. The review is presented as inline comments on the code, just like a GitHub PR review. The user can ask follow-up questions about any comment. The review session can be exported as a markdown document.

---

### Creative Projects — `/app/projects/creative`

#### `/app/projects/creative/content`

The content creation workspace for a creative project. The user describes what they need — blog post, newsletter, social media thread, video script, product description — and the agent drafts it. The draft appears in a rich text editor where the user can edit directly or give feedback ("make it more conversational," "add a call to action," "shorten by 30%"). Multiple drafts can be requested and compared. The approved content is saved to the project's files and can be pushed directly to the target platform (Medium, Substack, LinkedIn, Twitter/X) via connected skills.

#### `/app/projects/creative/social`

Social media content pipeline. The user defines a content strategy (topics, tone, posting frequency, target platforms). The agent generates a week's worth of posts in advance, organized in the content calendar. Each post shows the text, suggested image prompt (if visuals are needed), and the target platform. The user reviews the batch, edits individual posts, and approves the schedule. Approved posts are queued for automated publishing via platform skills.

**Performance feedback loop:** After posts are published, the agent monitors engagement metrics (if platform APIs are connected) and reports which content performed well, informing the next week's strategy.

---

### Research Projects — `/app/projects/research`

#### `/app/projects/research/topics`

Research topic workspaces. Each topic is a bounded research question. The agent continuously monitors connected sources (RSS feeds, Reddit, academic databases, news APIs) for new information relevant to the topic, and surfaces it with summaries. The user can prompt deep dives: "give me a comprehensive overview of the current state of X" and the agent uses browser automation to research, synthesizes across sources, and produces a structured report.

#### `/app/projects/research/synthesis`

The synthesis view for a research project. All gathered information — web pages fetched, documents uploaded, agent summaries — is organized here. The agent can produce a synthesis report: a structured document that combines all sources into a coherent narrative, with citations. The report is generated on demand and updated as new sources are added. Exportable as Markdown, PDF, or Notion page.

---

## Work Domain Routes

### `/app/work/meetings`

#### `/app/work/meetings/prep`

For each upcoming meeting, the agent automatically generates a prep brief: who are the attendees (LinkedIn summaries if accessible), what was discussed in the last meeting with this person or group (from the meeting notes history), what's on the agenda, and suggested questions or talking points. Briefs are delivered to the briefing channel (WhatsApp, Telegram, email) 30 minutes before the meeting, or available here for on-demand review.

#### `/app/work/meetings/notes`

During or after a meeting, the user uploads a transcript (from Zoom, Google Meet, etc.) or pastes notes. The agent processes it and generates: a structured summary, a list of action items (with suggested assignees and deadlines), decisions made, and open questions. Action items can be turned into tasks with one click. The summary is saved to the meeting's memory and can be shared with attendees via email or Slack (agent drafts the share message).

---

### `/app/work/clients` — Client Intelligence

#### `/app/work/clients/:clientId`

A comprehensive client profile assembled by the agent from all available data: email history, meeting notes, project history, contracts, invoices, and any notes the user has made. The agent maintains a "relationship health score" — are communications timely, are projects on track, is the client engaged? The profile page shows: contact information, relationship timeline, active projects, invoice status, recent communications, and the agent's assessment of the relationship.

**Pre-meeting brief:** Click "prepare for meeting" and the agent generates a tailored brief for an upcoming client meeting, incorporating everything it knows about the client and what's been discussed recently.

---

### `/app/work/support` — Customer Support Operations

#### `/app/work/support/queue`

Incoming support requests aggregated from configured sources (email, Slack, Discord, Zendesk, Linear). Each ticket shows: source, priority, the user's issue, and the agent's draft response. The draft is generated by the agent using the knowledge base and past ticket resolutions as context. The operator reviews and approves the draft (or edits it) before it's sent. Tickets that the agent can resolve with full confidence (matched against knowledge base with high certainty) can be configured to auto-send.

#### `/app/work/support/knowledge-base`

The support knowledge base — articles, FAQs, past resolutions — that the agent uses to draft responses. Managed as Markdown files in the project workspace. The agent can suggest additions: "this question was asked 5 times this week and there's no KB article for it — want me to draft one based on how you answered it?" Approving the suggestion adds the article immediately.

---

## Automation Routes

### `/app/automations/new` — Automation Builder

A visual workflow builder for creating multi-step automations. The user describes what they want in natural language — "when I receive an email with an invoice attachment, extract the amount, add it to my expenses spreadsheet, and send me a WhatsApp confirmation" — and the agent parses it into a structured workflow. The workflow is presented as a node graph: trigger → condition → actions → output.

**Triggers:** Email received, calendar event starts/ends, webhook fired, cron schedule, file changed in workspace, Slack message received, WhatsApp message received, manual button.

**Conditions:** Filter by sender, subject, content keyword, time of day, day of week, value threshold.

**Actions:** Send email, create calendar event, update a file, run a shell command, call a skill, send a message via any connected channel, create a task, call a webhook, push to canvas.

**Output:** Where results go — channel message, file append, task creation, canvas update.

The visual graph can be edited directly after the agent generates it. A test button runs the automation against a sample event to verify it works before enabling. All enabled automations appear in the cron jobs list if they're schedule-triggered, or in the webhook list if webhook-triggered.

---

## Memory Routes

### `/app/memory/overview`

The user's personal knowledge base — everything the agent knows about them and their world. A health score (0–100) assessing the memory's quality: completeness, freshness (when were files last updated), consistency (are there contradictions?), and relevance (are there large chunks of outdated information?). Actionable recommendations: "you have 3 contacts with conflicting phone numbers," "your GOALS.md was last updated 45 days ago — want to review it?"

### `/app/memory/search`

Semantic search across all memory files. Not keyword search — the user can ask "what do I know about the project I was working on in December?" and the agent finds relevant memory files based on meaning, not exact text matches. Results show the matching file, the relevant excerpt, and when it was last updated. Clicking opens the file in the editor.

### `/app/memory/journal`

A personal journal that the agent reads and writes. The user can add journal entries (text or voice) from any chat surface. The agent summarizes journal entries periodically and extracts facts relevant to the user's goals, preferences, and patterns — adding them to structured memory files. The journal timeline view shows all entries chronologically with AI-generated theme tags and mood indicators.

### `/app/memory/contacts`

Each person the user knows is a contact card in memory. The agent builds these from email history, calendar events, and explicit user notes. Each contact shows: name, relationship context, last interaction, key facts the agent remembers (their role, their interests, what they're working on), and a history of interactions. The agent can be asked "what do I know about X?" and the contact card is the source of truth.

---

## Browser Routes

### `/app/browser/live` — Live Browser Session

When an agent is performing browser automation (filling a form, scraping data, booking a ticket, navigating a site), this page shows a live view of the browser session. The user can watch what the agent is doing in real time — seeing the web page as the agent sees it, watching it click and type.

**Intervention:** If the agent encounters a CAPTCHA, a two-factor authentication prompt, or an unexpected page state, it pauses and notifies the user. The live view shows the current page, and the user can either take manual control for a moment (typing in a CAPTCHA solution) or give the agent a new instruction. After the intervention, the agent resumes.

**Screenshot overlay:** Each major action the agent takes is captured as a screenshot and shown in a timeline below the live view. The user can scroll back through the screenshots to review what happened.

### `/app/browser/sessions`

Archive of past browser sessions. Each session: timestamp, agent, the task it was performing, the pages visited, screenshots captured, and the outcome. Useful for verifying that the agent did exactly what was requested (e.g., confirming the correct flight was booked).

### `/app/browser/profiles`

Browser profiles per agent — separate browser contexts with different cookies, saved passwords (stored in the secure vault), and browser fingerprints. A "personal assistant" agent might use one profile (logged into Gmail, Amazon, personal sites), while a "research agent" uses a clean profile with no cookies. Profiles prevent cross-agent data leakage.

---

## Node Routes

### `/app/nodes/overview` — Paired Devices

The Device Nodes system lets the user pair physical devices — macOS computers, iPhones, Android phones — to their OpenClaw instance. Paired devices provide local capabilities that the server-based gateway can't do: camera access, screen recording, location services, system notifications, voice wake, and local file system access.

This page shows all paired devices: device name, type, operating system version, OpenClaw node version, last seen, and which capabilities are enabled. Unpair a device with one click.

### `/app/nodes/:nodeId` — Device Detail

#### `/app/nodes/:nodeId/camera`

Camera capabilities for this device. The agent can request a camera snapshot (still image) or a short camera clip. When requested, the device captures the image and sends it to the agent as context. Use cases: "take a photo of the document on my desk and extract the text," "take a look at what I'm working on and give me feedback," "capture the whiteboard diagram and convert it to structured notes." The user can configure which agents have camera access and set a confirmation prompt (requires user to tap "allow" on the device before the camera fires).

#### `/app/nodes/:nodeId/screen`

Screen recording and screenshot capabilities. The agent can capture the current screen state. Use cases: "screenshot my current task and add it to the project notes," "record a short screen capture of the bug I'm seeing," "take a screenshot of the error and help me debug it." Screen recording sessions are stored in the canvas history.

#### `/app/nodes/:nodeId/voice`

Voice Wake configuration for this specific device. Custom wake word for this device (can be different from the global default). Sensitivity adjustment. Which agent responds to voice input on this device. Schedule: only activate voice wake during configured hours (e.g., not while sleeping). Status: whether the voice wake listener is currently active.

---

## Discover Routes

### `/app/discover/skills` — User-Facing Skill Browser

A consumer-friendly view of the ClawHub marketplace. Unlike the management layer's skill marketplace (which focuses on security scans and policy configuration), this view focuses on: what can this skill do for me, how do I install it, and what do others say about it. Browsable by life category (Productivity, Finance, Health, Smart Home, Development, Communication). Each skill card shows a plain-English description of what it does, example prompts to use it, real user reviews, and a one-click "Add to my agent" button.

### `/app/discover/automations` — Community Automation Library

Community-shared automation recipes. Each automation is a complete workflow that another user published. Shown with: a description, the trigger and action summary, required skills and connections, the original author, and a "clone to my automations" button that installs the automation into the user's account (ready to configure and enable). Top automations by category: Morning Routines, Email Automation, Development Workflows, Finance Trackers, Health Monitoring, Smart Home Scenes.

### `/app/discover/showcase` — Community Showcase / MoltBook

The social layer for OpenClaw users — inspired by the real community practice of sharing setups on X and Reddit, but built natively into ClawVerse. Users can post: "What I built with my agent" stories, with screenshots, canvas snapshots, and descriptions. Posts can be: a workflow description ("here's how I automated my weekly client reports"), a canvas screenshot ("my agent built this project dashboard"), or a setup guide ("how I run a multi-agent research team on a €10 VPS").

Browsable by category, sorted by recency or community upvotes. Users can follow other users, save posts to their inspiration library, and fork any shared automation or blueprint directly from a post. The showcase is the discovery engine for new use cases — the place where "what can I do with this thing?" gets answered by the community.

---

## Usage Routes

### `/app/usage/overview` — Personal Usage Dashboard

The user-facing equivalent of the management layer's cost dashboard. Simpler and more human-centered: "You've spent $3.20 this week," "Your briefing agent is your most active agent," "You have $6.80 left in your weekly budget."

### `/app/usage/tokens`

Token consumption breakdown — by agent, by day, by task type. Shown as charts, not tables. A "what's using the most tokens?" section highlights the top consumers with plain-English explanations of why (e.g., "your code review agent processes large files, which uses more tokens per task").

### `/app/usage/limits`

Where the user sets their personal budget. Daily spend limit (in currency). Weekly cap. Per-agent caps. What happens when a cap is hit: pause that agent, notify via WhatsApp, auto-switch to a cheaper model, or just alert (don't stop). The limits here are the user-facing version of the budget rules in the management layer — same underlying system, simpler interface.

---

# Feature Gaps from Real OpenClaw (Added in ClawVerse)

These are features present in the official OpenClaw Control UI and community apps that were missing from Document 1 and are now covered in Document 2:

**Live Canvas / A2UI** — fully documented at `/app/canvas`. This is a core OpenClaw first-class surface that no third-party dashboard had properly represented.

**Voice Wake + Talk Mode** — documented at `/app/voice`. Includes ElevenLabs TTS, Whisper STT, push-to-talk, VAD mode, and custom wake words.

**WebChat surface** — the native web chat UI is represented as `/app/chat/:agentId`. In the official Control UI this is served directly from the gateway; in ClawVerse it's tunneled through the control plane.

**Device Nodes** — documented at `/app/nodes`. Camera, screen recording, location, voice wake — all managed from the user layer.

**Gmail Pub/Sub triggers** — covered in `/app/automations/triggers/email` and `/app/briefing/sources`. Real-time email triggering, not just polling.

**Exec approval / command queue** — the human-in-the-loop approval surface is now a first-class user experience at `/app/approvals`. The official Control UI has this but it was missing from Document 1.

**Token usage dashboard** — present in the official Control UI and now in ClawVerse at `/app/usage`.

**Community showcase (MoltBook)** — documented at `/app/discover/showcase`. The real community is doing this organically on X and Reddit; ClawVerse makes it native.

**Context window management** — the context compression control in the chat interface reflects the real OpenClaw context window compaction feature.

**Browser live view with intervention** — documented at `/app/browser/live`. The official Control UI shows browser sessions; ClawVerse makes them interactive with a user intervention model.
