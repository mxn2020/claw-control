import { mutation } from "./_generated/server";

export const seed = mutation({
  handler: async (ctx) => {
    // Check if data already exists
    const existing = await ctx.db.query("organizations").first();
    if (existing) {
      return { message: "Data already seeded" };
    }

    // Create organization
    const orgId = await ctx.db.insert("organizations", {
      name: "Acme Corp",
      slug: "acme",
      ownerId: "user_demo",
      plan: "pro",
      createdAt: Date.now(),
    });

    // Create instances
    const instance1Id = await ctx.db.insert("instances", {
      orgId,
      name: "Production Gateway",
      status: "online",
      provider: "DigitalOcean",
      region: "nyc3",
      version: "1.2.0",
      agentCount: 3,
      cpuUsage: 42,
      memoryUsage: 68,
      lastHeartbeat: Date.now(),
      createdAt: Date.now() - 86400000 * 30,
    });

    const instance2Id = await ctx.db.insert("instances", {
      orgId,
      name: "Staging Server",
      status: "online",
      provider: "Hetzner",
      region: "eu-central",
      version: "1.3.0-beta",
      agentCount: 2,
      cpuUsage: 15,
      memoryUsage: 32,
      lastHeartbeat: Date.now(),
      createdAt: Date.now() - 86400000 * 14,
    });

    const instance3Id = await ctx.db.insert("instances", {
      orgId,
      name: "Dev Instance",
      status: "offline",
      provider: "Local",
      region: "local",
      version: "1.3.0-dev",
      agentCount: 1,
      cpuUsage: 0,
      memoryUsage: 0,
      createdAt: Date.now() - 86400000 * 7,
    });

    // Create agents
    const agent1Id = await ctx.db.insert("agents", {
      orgId,
      instanceId: instance1Id,
      name: "Support Agent",
      status: "active",
      model: "claude-3.5-sonnet",
      personality: {
        soulMd: "You are a friendly and helpful customer support agent for Acme Corp.",
        agentsMd: "Handle customer inquiries with empathy and precision.",
      },
      toolsConfig: {
        allowed: ["read", "browser", "exec"],
        denied: ["write"],
        sandboxMode: true,
      },
      sessionCount: 142,
      totalTokens: 2500000,
      totalCost: 12.50,
      createdAt: Date.now() - 86400000 * 28,
    });

    const agent2Id = await ctx.db.insert("agents", {
      orgId,
      instanceId: instance1Id,
      name: "Research Agent",
      status: "active",
      model: "claude-3-opus",
      personality: {
        soulMd: "You are a thorough research assistant specialized in market analysis.",
      },
      toolsConfig: {
        allowed: ["read", "browser", "exec"],
        sandboxMode: false,
      },
      sessionCount: 38,
      totalTokens: 890000,
      totalCost: 8.90,
      createdAt: Date.now() - 86400000 * 20,
    });

    const agent3Id = await ctx.db.insert("agents", {
      orgId,
      instanceId: instance1Id,
      name: "Code Review Bot",
      status: "idle",
      model: "claude-3.5-sonnet",
      sessionCount: 67,
      totalTokens: 1200000,
      totalCost: 6.00,
      createdAt: Date.now() - 86400000 * 15,
    });

    await ctx.db.insert("agents", {
      orgId,
      instanceId: instance2Id,
      name: "QA Tester",
      status: "active",
      model: "gpt-4o",
      sessionCount: 23,
      totalTokens: 450000,
      totalCost: 2.25,
      createdAt: Date.now() - 86400000 * 10,
    });

    await ctx.db.insert("agents", {
      orgId,
      instanceId: instance2Id,
      name: "Docs Writer",
      status: "idle",
      model: "claude-3.5-sonnet",
      sessionCount: 15,
      totalTokens: 320000,
      totalCost: 1.60,
      createdAt: Date.now() - 86400000 * 5,
    });

    await ctx.db.insert("agents", {
      orgId,
      instanceId: instance3Id,
      name: "Dev Sandbox Agent",
      status: "idle",
      model: "claude-3-haiku",
      sessionCount: 5,
      totalTokens: 50000,
      totalCost: 0.25,
      createdAt: Date.now() - 86400000 * 2,
    });

    // Create sessions
    const session1Id = await ctx.db.insert("sessions", {
      orgId,
      agentId: agent1Id,
      instanceId: instance1Id,
      channel: "webchat",
      status: "active",
      title: "Billing inquiry - John D.",
      messageCount: 8,
      tokensUsed: 4500,
      cost: 0.02,
      startedAt: Date.now() - 3600000,
      lastMessageAt: Date.now() - 120000,
    });

    await ctx.db.insert("sessions", {
      orgId,
      agentId: agent1Id,
      instanceId: instance1Id,
      channel: "discord",
      status: "active",
      title: "API integration help",
      messageCount: 12,
      tokensUsed: 8200,
      cost: 0.04,
      startedAt: Date.now() - 7200000,
      lastMessageAt: Date.now() - 300000,
    });

    await ctx.db.insert("sessions", {
      orgId,
      agentId: agent2Id,
      instanceId: instance1Id,
      channel: "webchat",
      status: "closed",
      title: "Market analysis Q4 2024",
      messageCount: 24,
      tokensUsed: 45000,
      cost: 0.45,
      startedAt: Date.now() - 86400000,
      lastMessageAt: Date.now() - 82800000,
      closedAt: Date.now() - 82800000,
    });

    await ctx.db.insert("sessions", {
      orgId,
      agentId: agent3Id,
      instanceId: instance1Id,
      channel: "github",
      status: "closed",
      title: "PR #421 review",
      messageCount: 6,
      tokensUsed: 12000,
      cost: 0.06,
      startedAt: Date.now() - 172800000,
      lastMessageAt: Date.now() - 169200000,
      closedAt: Date.now() - 169200000,
    });

    // Add sample messages to the first session
    await ctx.db.insert("messages", {
      sessionId: session1Id,
      role: "user",
      content: "Hi, I have a question about my recent invoice.",
      createdAt: Date.now() - 3600000,
    });

    await ctx.db.insert("messages", {
      sessionId: session1Id,
      role: "assistant",
      content: "Hello! I'd be happy to help with your billing question. Could you provide your account number or the invoice number you're referring to?",
      tokens: 350,
      createdAt: Date.now() - 3590000,
    });

    await ctx.db.insert("messages", {
      sessionId: session1Id,
      role: "user",
      content: "Sure, it's invoice #INV-2024-0892",
      createdAt: Date.now() - 3500000,
    });

    await ctx.db.insert("messages", {
      sessionId: session1Id,
      role: "assistant",
      content: "Thank you! I can see invoice #INV-2024-0892. It was issued on January 15th for $299.00 on the Pro plan. What specific question do you have about it?",
      tokens: 520,
      createdAt: Date.now() - 3490000,
    });

    // Create skills
    await ctx.db.insert("skills", {
      orgId,
      name: "web-search",
      description: "Search the web and return structured results",
      version: "2.1.0",
      author: "openclaw",
      riskLevel: "low",
      permissions: ["network:outbound"],
      isEnabled: true,
      installedAt: Date.now() - 86400000 * 20,
    });

    await ctx.db.insert("skills", {
      orgId,
      name: "code-interpreter",
      description: "Execute Python code in a sandboxed environment",
      version: "1.5.2",
      author: "openclaw",
      riskLevel: "medium",
      permissions: ["exec:sandbox", "filesystem:temp"],
      isEnabled: true,
      installedAt: Date.now() - 86400000 * 15,
    });

    await ctx.db.insert("skills", {
      orgId,
      name: "email-sender",
      description: "Send emails via SMTP or API",
      version: "1.0.3",
      author: "community",
      riskLevel: "medium",
      permissions: ["network:outbound", "secrets:smtp"],
      isEnabled: true,
      installedAt: Date.now() - 86400000 * 10,
    });

    await ctx.db.insert("skills", {
      orgId,
      name: "file-manager",
      description: "Read and write files in the agent workspace",
      version: "3.0.0",
      author: "openclaw",
      riskLevel: "high",
      permissions: ["filesystem:read", "filesystem:write"],
      isEnabled: false,
      installedAt: Date.now() - 86400000 * 5,
    });

    // Create channels
    await ctx.db.insert("channels", {
      orgId,
      name: "Main WebChat",
      platform: "webchat",
      status: "connected",
      messageCount: 1842,
      lastActivity: Date.now() - 120000,
      createdAt: Date.now() - 86400000 * 25,
    });

    await ctx.db.insert("channels", {
      orgId,
      name: "Support Discord",
      platform: "discord",
      status: "connected",
      messageCount: 567,
      lastActivity: Date.now() - 300000,
      createdAt: Date.now() - 86400000 * 20,
    });

    await ctx.db.insert("channels", {
      orgId,
      name: "GitHub Integration",
      platform: "github",
      status: "connected",
      messageCount: 234,
      lastActivity: Date.now() - 3600000,
      createdAt: Date.now() - 86400000 * 15,
    });

    await ctx.db.insert("channels", {
      orgId,
      name: "Slack Workspace",
      platform: "slack",
      status: "disconnected",
      messageCount: 0,
      createdAt: Date.now() - 86400000 * 2,
    });

    // Create blueprints
    await ctx.db.insert("blueprints", {
      orgId,
      name: "Customer Support Agent",
      description: "Pre-configured support agent with empathetic personality and common support tools",
      personality: {
        soulMd: "You are a friendly, patient, and empathetic customer support agent.",
        agentsMd: "Prioritize customer satisfaction. Escalate complex issues.",
      },
      toolsConfig: {
        allowed: ["read", "browser"],
        denied: ["exec", "write"],
      },
      skills: ["web-search", "email-sender"],
      deployCount: 5,
      createdAt: Date.now() - 86400000 * 20,
    });

    await ctx.db.insert("blueprints", {
      orgId,
      name: "Research Assistant",
      description: "Deep research agent with web access and code execution",
      personality: {
        soulMd: "You are a thorough research assistant. Always cite sources.",
      },
      toolsConfig: {
        allowed: ["read", "browser", "exec"],
      },
      skills: ["web-search", "code-interpreter"],
      deployCount: 3,
      createdAt: Date.now() - 86400000 * 15,
    });

    // Create a swarm
    await ctx.db.insert("swarms", {
      orgId,
      name: "Support μ-Swarm",
      tier: "micro",
      status: "active",
      instanceIds: [instance1Id],
      agentIds: [agent1Id],
      createdAt: Date.now() - 86400000 * 10,
    });

    // Create audit logs
    await ctx.db.insert("auditLogs", {
      orgId,
      userId: "user_demo",
      action: "instance.create",
      resourceType: "instance",
      resourceId: instance1Id,
      details: "Created Production Gateway instance",
      createdAt: Date.now() - 86400000 * 30,
    });

    await ctx.db.insert("auditLogs", {
      orgId,
      userId: "user_demo",
      action: "agent.create",
      resourceType: "agent",
      resourceId: agent1Id,
      details: "Created Support Agent on Production Gateway",
      createdAt: Date.now() - 86400000 * 28,
    });

    await ctx.db.insert("auditLogs", {
      orgId,
      userId: "user_demo",
      action: "agent.update_personality",
      resourceType: "agent",
      resourceId: agent2Id,
      details: "Updated SOUL.md for Research Agent",
      createdAt: Date.now() - 86400000 * 5,
    });

    // Create tasks
    await ctx.db.insert("tasks", {
      orgId,
      userId: "user_demo",
      agentId: agent1Id,
      title: "Respond to pending support tickets",
      description: "Triage and respond to 12 unread support tickets from the weekend.",
      status: "running",
      priority: "high",
      createdAt: Date.now() - 3600000,
      updatedAt: Date.now() - 1800000,
    });

    await ctx.db.insert("tasks", {
      orgId,
      userId: "user_demo",
      agentId: agent2Id,
      title: "Generate Q1 market report",
      description: "Compile market analysis data and generate a comprehensive Q1 report.",
      status: "needs_review",
      priority: "high",
      output: "## Q1 Market Report\n\nKey findings: Revenue up 18% QoQ...",
      deadline: Date.now() + 86400000,
      createdAt: Date.now() - 86400000,
      updatedAt: Date.now() - 7200000,
    });

    await ctx.db.insert("tasks", {
      orgId,
      userId: "user_demo",
      agentId: agent3Id,
      title: "Review PR #445 for security issues",
      description: "Scan the latest pull request for potential security vulnerabilities.",
      status: "done",
      priority: "medium",
      output: "No critical issues found. 2 minor suggestions added as comments.",
      createdAt: Date.now() - 172800000,
      updatedAt: Date.now() - 86400000,
    });

    await ctx.db.insert("tasks", {
      orgId,
      userId: "user_demo",
      agentId: agent1Id,
      title: "Update FAQ knowledge base",
      description: "Incorporate recent product changes into the FAQ document.",
      status: "queued",
      priority: "low",
      deadline: Date.now() + 86400000 * 3,
      createdAt: Date.now() - 1800000,
    });

    await ctx.db.insert("tasks", {
      orgId,
      userId: "user_demo",
      agentId: agent2Id,
      title: "Scrape competitor pricing pages",
      description: "Collect current pricing data from top 5 competitors.",
      status: "failed",
      priority: "medium",
      error: "Rate limited by target site after 3 of 5 pages. Retry with backoff recommended.",
      createdAt: Date.now() - 259200000,
      updatedAt: Date.now() - 172800000,
    });

    // Create canvases
    await ctx.db.insert("canvases", {
      orgId,
      userId: "user_demo",
      title: "Agent Performance Dashboard",
      type: "dashboard",
      content: JSON.stringify({
        widgets: [
          { type: "metric", label: "Active Sessions", value: 14 },
          { type: "metric", label: "Avg Response Time", value: "1.2s" },
          { type: "chart", label: "Tokens Used (7d)", data: [12000, 15000, 9800, 22000, 18000, 16500, 20100] },
        ],
      }),
      createdAt: Date.now() - 86400000 * 7,
      updatedAt: Date.now() - 3600000,
    });

    await ctx.db.insert("canvases", {
      orgId,
      userId: "user_demo",
      agentId: agent2Id,
      title: "Research Pipeline Board",
      type: "board",
      content: JSON.stringify({
        columns: ["Backlog", "In Progress", "Review", "Done"],
        items: [
          { title: "Competitor analysis", column: "Done" },
          { title: "Market sizing", column: "In Progress" },
          { title: "Customer interviews", column: "Backlog" },
        ],
      }),
      createdAt: Date.now() - 86400000 * 3,
      updatedAt: Date.now() - 86400000,
    });

    await ctx.db.insert("canvases", {
      orgId,
      userId: "user_demo",
      title: "Token Usage Breakdown",
      type: "chart",
      createdAt: Date.now() - 86400000 * 2,
    });

    // Create voice settings
    await ctx.db.insert("voiceSettings", {
      orgId,
      userId: "user_demo",
      wakeWord: "hey claw",
      ttsVoice: "nova",
      speakingRate: 1.1,
      sttEngine: "whisper",
      language: "en-US",
      enabled: true,
      createdAt: Date.now() - 86400000 * 14,
    });

    // Create memory files
    await ctx.db.insert("memoryFiles", {
      orgId,
      userId: "user_demo",
      agentId: agent1Id,
      path: "SOUL.md",
      content: "# Support Agent Soul\n\nYou are a friendly and professional support agent for Acme Corp.\n\n## Core Values\n- Empathy first\n- Clear communication\n- Quick resolution\n\n## Tone\nWarm but professional. Use the customer's name when possible.",
      fileType: "markdown",
      tags: ["personality", "core"],
      createdAt: Date.now() - 86400000 * 28,
      updatedAt: Date.now() - 86400000 * 5,
    });

    await ctx.db.insert("memoryFiles", {
      orgId,
      userId: "user_demo",
      path: "contacts.json",
      content: JSON.stringify({
        team: [
          { name: "Alice Chen", role: "Engineering Lead", email: "alice@acme.corp" },
          { name: "Bob Martinez", role: "Product Manager", email: "bob@acme.corp" },
          { name: "Carol Wu", role: "Support Lead", email: "carol@acme.corp" },
        ],
      }, null, 2),
      fileType: "json",
      tags: ["contacts", "team"],
      createdAt: Date.now() - 86400000 * 20,
      updatedAt: Date.now() - 86400000 * 2,
    });

    await ctx.db.insert("memoryFiles", {
      orgId,
      userId: "user_demo",
      agentId: agent2Id,
      path: "journal.md",
      content: "# Research Journal\n\n## 2024-01-15\nCompleted competitive analysis for Q4. Key insight: Market shifting toward AI-native solutions.\n\n## 2024-01-10\nFinished customer survey analysis. NPS score improved to 72 from 65.\n\n## 2024-01-05\nStarted new market sizing project for APAC region.",
      fileType: "markdown",
      tags: ["journal", "research"],
      createdAt: Date.now() - 86400000 * 15,
      updatedAt: Date.now() - 86400000,
    });

    await ctx.db.insert("memoryFiles", {
      orgId,
      userId: "user_demo",
      path: "preferences.json",
      content: JSON.stringify({
        theme: "dark",
        defaultModel: "claude-3.5-sonnet",
        notifications: { email: true, slack: true, desktop: false },
        timezone: "America/New_York",
        dateFormat: "YYYY-MM-DD",
      }, null, 2),
      fileType: "json",
      tags: ["preferences", "settings"],
      createdAt: Date.now() - 86400000 * 25,
      updatedAt: Date.now() - 86400000 * 3,
    });

    // Create browser sessions
    await ctx.db.insert("browserSessions", {
      orgId,
      userId: "user_demo",
      agentId: agent2Id,
      url: "https://www.gartner.com/en/research",
      taskDescription: "Collect latest analyst reports on AI agent market trends",
      status: "active",
      pagesVisited: [
        "https://www.gartner.com/en/research",
        "https://www.gartner.com/en/articles/ai-agents",
      ],
      createdAt: Date.now() - 1800000,
    });

    await ctx.db.insert("browserSessions", {
      orgId,
      userId: "user_demo",
      agentId: agent1Id,
      url: "https://docs.acme.corp/api/v2",
      taskDescription: "Verify API documentation accuracy for customer inquiry",
      status: "completed",
      pagesVisited: [
        "https://docs.acme.corp/api/v2",
        "https://docs.acme.corp/api/v2/authentication",
        "https://docs.acme.corp/api/v2/endpoints",
      ],
      outcome: "Documentation verified. Found 1 outdated example in the auth section.",
      createdAt: Date.now() - 7200000,
    });

    await ctx.db.insert("browserSessions", {
      orgId,
      userId: "user_demo",
      agentId: agent2Id,
      url: "https://competitor-site.example.com/pricing",
      taskDescription: "Scrape competitor pricing for market analysis",
      status: "failed",
      pagesVisited: [
        "https://competitor-site.example.com/pricing",
      ],
      outcome: "Blocked by Cloudflare challenge page. Manual access required.",
      createdAt: Date.now() - 259200000,
    });

    // Create nodes
    await ctx.db.insert("nodes", {
      orgId,
      userId: "user_demo",
      name: "MacBook Pro — Office",
      deviceType: "macos",
      status: "online",
      osVersion: "macOS 15.2",
      capabilities: {
        camera: true,
        screenRecord: true,
        location: false,
        notifications: true,
        voiceWake: true,
      },
      lastSeen: Date.now() - 60000,
      createdAt: Date.now() - 86400000 * 60,
    });

    await ctx.db.insert("nodes", {
      orgId,
      userId: "user_demo",
      name: "iPhone 16 Pro",
      deviceType: "iphone",
      status: "sleeping",
      osVersion: "iOS 18.2",
      capabilities: {
        camera: true,
        screenRecord: false,
        location: true,
        notifications: true,
        voiceWake: true,
      },
      lastSeen: Date.now() - 3600000,
      createdAt: Date.now() - 86400000 * 30,
    });

    // Create discover items
    await ctx.db.insert("discoverItems", {
      type: "skill",
      title: "Web Scraper Pro",
      description: "Advanced web scraping with anti-detection, proxy rotation, and structured data extraction.",
      author: "openclaw",
      category: "Data Collection",
      tags: ["scraping", "data", "browser"],
      installCount: 1240,
      rating: 4.7,
      createdAt: Date.now() - 86400000 * 45,
    });

    await ctx.db.insert("discoverItems", {
      type: "automation",
      title: "Daily Standup Summary",
      description: "Automatically collects updates from Slack, GitHub, and Jira and posts a formatted standup summary.",
      author: "community",
      category: "Productivity",
      tags: ["slack", "github", "jira", "standup"],
      installCount: 870,
      rating: 4.5,
      createdAt: Date.now() - 86400000 * 30,
    });

    await ctx.db.insert("discoverItems", {
      type: "showcase",
      title: "AI Customer Support — Case Study",
      description: "How Acme Corp reduced response times by 60% using autonomous support agents.",
      author: "acme-team",
      category: "Case Studies",
      tags: ["support", "case-study", "roi"],
      installCount: 320,
      rating: 4.9,
      createdAt: Date.now() - 86400000 * 20,
    });

    await ctx.db.insert("discoverItems", {
      type: "skill",
      title: "PDF Document Analyzer",
      description: "Extract text, tables, and metadata from PDF documents with OCR support.",
      author: "openclaw",
      category: "Document Processing",
      tags: ["pdf", "ocr", "documents"],
      installCount: 2100,
      rating: 4.8,
      createdAt: Date.now() - 86400000 * 60,
    });

    // Create usage records
    await ctx.db.insert("usageRecords", {
      orgId,
      userId: "user_demo",
      agentId: agent1Id,
      model: "claude-3.5-sonnet",
      tokensUsed: 45000,
      cost: 0.68,
      taskType: "support",
      date: "2025-01-15",
      createdAt: Date.now() - 86400000 * 2,
    });

    await ctx.db.insert("usageRecords", {
      orgId,
      userId: "user_demo",
      agentId: agent2Id,
      model: "claude-3-opus",
      tokensUsed: 82000,
      cost: 2.46,
      taskType: "research",
      date: "2025-01-15",
      createdAt: Date.now() - 86400000 * 2,
    });

    await ctx.db.insert("usageRecords", {
      orgId,
      userId: "user_demo",
      agentId: agent1Id,
      model: "claude-3.5-sonnet",
      tokensUsed: 38000,
      cost: 0.57,
      taskType: "support",
      date: "2025-01-14",
      createdAt: Date.now() - 86400000 * 3,
    });

    await ctx.db.insert("usageRecords", {
      orgId,
      userId: "user_demo",
      agentId: agent3Id,
      model: "claude-3.5-sonnet",
      tokensUsed: 12000,
      cost: 0.18,
      taskType: "code_review",
      date: "2025-01-14",
      createdAt: Date.now() - 86400000 * 3,
    });

    await ctx.db.insert("usageRecords", {
      orgId,
      userId: "user_demo",
      agentId: agent2Id,
      model: "claude-3-opus",
      tokensUsed: 95000,
      cost: 2.85,
      taskType: "research",
      date: "2025-01-13",
      createdAt: Date.now() - 86400000 * 4,
    });

    // Create approvals
    await ctx.db.insert("approvals", {
      orgId,
      userId: "user_demo",
      agentId: agent1Id,
      description: "Send bulk email to 150 customers about service update",
      actionDetail: "email-sender: batch send to customer segment 'active-pro'",
      riskLevel: "high",
      status: "pending",
      createdAt: Date.now() - 3600000,
    });

    await ctx.db.insert("approvals", {
      orgId,
      userId: "user_demo",
      agentId: agent2Id,
      description: "Access external API to pull financial data",
      actionDetail: "web-search: fetch from finance.api.example.com/market-data",
      riskLevel: "medium",
      status: "approved",
      decidedBy: "user_demo",
      decidedAt: Date.now() - 7200000,
      createdAt: Date.now() - 14400000,
    });

    await ctx.db.insert("approvals", {
      orgId,
      userId: "user_demo",
      agentId: agent3Id,
      description: "Execute shell command to run test suite",
      actionDetail: "exec: npm run test -- --coverage",
      riskLevel: "medium",
      status: "rejected",
      decidedBy: "user_demo",
      decidedAt: Date.now() - 86400000,
      createdAt: Date.now() - 86400000 * 2,
    });

    // Create cron jobs
    await ctx.db.insert("cronJobs", {
      orgId,
      userId: "user_demo",
      agentId: agent1Id,
      name: "Daily Support Digest",
      schedule: "0 9 * * *",
      instruction: "Compile a summary of all support tickets from the past 24 hours and post to #support-digest in Slack.",
      enabled: true,
      lastRunAt: Date.now() - 86400000,
      lastRunStatus: "success",
      nextRunAt: Date.now() + 43200000,
      outputChannel: "slack",
      createdAt: Date.now() - 86400000 * 14,
    });

    await ctx.db.insert("cronJobs", {
      orgId,
      userId: "user_demo",
      agentId: agent2Id,
      name: "Hourly Competitor Price Check",
      schedule: "0 * * * *",
      instruction: "Check competitor pricing pages for changes and alert if any price modifications are detected.",
      enabled: true,
      lastRunAt: Date.now() - 3600000,
      lastRunStatus: "failed",
      nextRunAt: Date.now() + 3600000,
      createdAt: Date.now() - 86400000 * 7,
    });

    await ctx.db.insert("cronJobs", {
      orgId,
      userId: "user_demo",
      agentId: agent3Id,
      name: "Weekly Code Quality Report",
      schedule: "0 10 * * 1",
      instruction: "Analyze the codebase for code quality metrics, test coverage, and dependency updates. Generate a markdown report.",
      enabled: false,
      lastRunAt: Date.now() - 86400000 * 7,
      lastRunStatus: "success",
      nextRunAt: Date.now() + 86400000 * 5,
      outputChannel: "github",
      createdAt: Date.now() - 86400000 * 21,
    });

    return { message: "Seed data created successfully", orgId };
  },
});
