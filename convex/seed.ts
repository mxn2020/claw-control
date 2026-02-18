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

    return { message: "Seed data created successfully", orgId };
  },
});
