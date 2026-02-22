import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Auth — Users
  users: defineTable({
    email: v.string(),
    name: v.string(),
    passwordHash: v.string(),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  // Auth — Sessions (token-based, OSS)
  userSessions: defineTable({
    userId: v.id("users"),
    token: v.string(),
    expiresAt: v.number(),
    createdAt: v.number(),
  }).index("by_token", ["token"]).index("by_user", ["userId"]),

  // API Keys (for CLI / integrations)
  apiKeys: defineTable({
    userId: v.id("users"),
    name: v.string(),
    keyHash: v.string(),
    lastUsedAt: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_user", ["userId"]).index("by_hash", ["keyHash"]),

  // Organizations
  organizations: defineTable({
    name: v.string(),
    slug: v.string(),
    ownerId: v.string(),
    plan: v.union(v.literal("free"), v.literal("pro"), v.literal("enterprise")),
    createdAt: v.number(),
  }).index("by_slug", ["slug"]).index("by_owner", ["ownerId"]),

  // Organization members
  orgMembers: defineTable({
    orgId: v.id("organizations"),
    userId: v.string(),
    role: v.union(v.literal("owner"), v.literal("admin"), v.literal("member"), v.literal("viewer")),
    joinedAt: v.number(),
  }).index("by_org", ["orgId"]).index("by_user", ["userId"]),

  // Teams
  teams: defineTable({
    orgId: v.id("organizations"),
    name: v.string(),
    description: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_org", ["orgId"]),

  // Team Members
  teamMembers: defineTable({
    orgId: v.id("organizations"),
    teamId: v.id("teams"),
    userId: v.string(),
    joinedAt: v.number(),
  }).index("by_org", ["orgId"]).index("by_team", ["teamId"]).index("by_user", ["userId"]),

  // Fleet Instances
  instances: defineTable({
    orgId: v.id("organizations"),
    name: v.string(),
    status: v.union(
      v.literal("online"),
      v.literal("offline"),
      v.literal("provisioning"),
      v.literal("error"),
      v.literal("quarantined")
    ),
    provider: v.optional(v.string()),
    region: v.optional(v.string()),
    version: v.optional(v.string()),
    agentCount: v.number(),
    cpuUsage: v.optional(v.number()),
    memoryUsage: v.optional(v.number()),
    lastHeartbeat: v.optional(v.number()),
    config: v.optional(v.object({
      providers: v.optional(v.array(v.string())),
      defaultModel: v.optional(v.string()),
      sandboxMode: v.optional(v.boolean()),
    })),
    createdAt: v.number(),
  }).index("by_org", ["orgId"]).index("by_status", ["status"]),

  // Agents
  agents: defineTable({
    orgId: v.id("organizations"),
    instanceId: v.id("instances"),
    name: v.string(),
    status: v.union(
      v.literal("active"),
      v.literal("idle"),
      v.literal("error"),
      v.literal("paused"),
      v.literal("quarantined")
    ),
    model: v.optional(v.string()),
    personality: v.optional(v.object({
      soulMd: v.optional(v.string()),
      agentsMd: v.optional(v.string()),
      userMd: v.optional(v.string()),
    })),
    toolsConfig: v.optional(v.object({
      allowed: v.optional(v.array(v.string())),
      denied: v.optional(v.array(v.string())),
      sandboxMode: v.optional(v.boolean()),
    })),
    channelBindings: v.optional(v.array(v.string())),
    sessionCount: v.number(),
    totalTokens: v.optional(v.number()),
    totalCost: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_org", ["orgId"]).index("by_instance", ["instanceId"]).index("by_status", ["status"]),

  // Sessions
  sessions: defineTable({
    orgId: v.id("organizations"),
    agentId: v.id("agents"),
    instanceId: v.id("instances"),
    channel: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("closed"), v.literal("escalated")),
    title: v.optional(v.string()),
    messageCount: v.number(),
    tokensUsed: v.optional(v.number()),
    cost: v.optional(v.number()),
    startedAt: v.number(),
    lastMessageAt: v.optional(v.number()),
    closedAt: v.optional(v.number()),
  }).index("by_org", ["orgId"]).index("by_agent", ["agentId"]).index("by_instance", ["instanceId"]).index("by_status", ["status"]),

  // Session Messages
  messages: defineTable({
    sessionId: v.id("sessions"),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system"), v.literal("tool")),
    content: v.string(),
    toolCalls: v.optional(v.array(v.object({
      name: v.string(),
      arguments: v.optional(v.string()),
      result: v.optional(v.string()),
    }))),
    tokens: v.optional(v.number()),
    timingMs: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_session", ["sessionId"]),

  // Skills
  skills: defineTable({
    orgId: v.id("organizations"),
    name: v.string(),
    description: v.optional(v.string()),
    version: v.string(),
    author: v.optional(v.string()),
    riskLevel: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("critical"))),
    installedOn: v.optional(v.array(v.string())),
    permissions: v.optional(v.array(v.string())),
    isEnabled: v.boolean(),
    installedAt: v.number(),
  }).index("by_org", ["orgId"]),

  // Channels / Connectors
  channels: defineTable({
    orgId: v.id("organizations"),
    name: v.string(),
    platform: v.string(),
    status: v.union(v.literal("connected"), v.literal("disconnected"), v.literal("error")),
    config: v.optional(v.string()),
    messageCount: v.optional(v.number()),
    lastActivity: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_org", ["orgId"]),

  // Blueprints
  blueprints: defineTable({
    orgId: v.id("organizations"),
    name: v.string(),
    description: v.optional(v.string()),
    personality: v.optional(v.object({
      soulMd: v.optional(v.string()),
      agentsMd: v.optional(v.string()),
    })),
    toolsConfig: v.optional(v.object({
      allowed: v.optional(v.array(v.string())),
      denied: v.optional(v.array(v.string())),
    })),
    skills: v.optional(v.array(v.string())),
    channels: v.optional(v.array(v.string())),
    variables: v.optional(v.array(v.object({
      key: v.string(),
      defaultValue: v.optional(v.string()),
      description: v.optional(v.string()),
    }))),
    deployCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }).index("by_org", ["orgId"]),

  // Swarms
  swarms: defineTable({
    orgId: v.id("organizations"),
    name: v.string(),
    tier: v.union(v.literal("micro"), v.literal("meso"), v.literal("macro"), v.literal("mega")),
    status: v.union(v.literal("active"), v.literal("provisioning"), v.literal("paused"), v.literal("error")),
    instanceIds: v.array(v.id("instances")),
    agentIds: v.array(v.id("agents")),
    blueprintId: v.optional(v.id("blueprints")),
    config: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_org", ["orgId"]),

  // Secrets Vault
  secrets: defineTable({
    orgId: v.id("organizations"),
    name: v.string(),
    value: v.string(),
    description: v.optional(v.string()),
    type: v.union(v.literal("api_key"), v.literal("token"), v.literal("password"), v.literal("certificate")),
    instanceIds: v.optional(v.array(v.id("instances"))),
    status: v.union(v.literal("active"), v.literal("stale"), v.literal("expired")),
    createdAt: v.number(),
  }).index("by_org", ["orgId"]),

  // Audit Log
  auditLogs: defineTable({
    orgId: v.id("organizations"),
    userId: v.optional(v.string()),
    action: v.string(),
    resourceType: v.string(),
    resourceId: v.optional(v.string()),
    details: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_org", ["orgId"]).index("by_resource", ["resourceType", "resourceId"]),

  // Tasks
  tasks: defineTable({
    orgId: v.id("organizations"),
    userId: v.string(),
    agentId: v.optional(v.string()),
    title: v.string(),
    description: v.optional(v.string()),
    status: v.union(
      v.literal("queued"),
      v.literal("running"),
      v.literal("needs_review"),
      v.literal("done"),
      v.literal("failed")
    ),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    deadline: v.optional(v.number()),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }).index("by_org", ["orgId"]).index("by_user", ["userId"]).index("by_status", ["status"]),

  // Canvases
  canvases: defineTable({
    orgId: v.id("organizations"),
    userId: v.string(),
    agentId: v.optional(v.string()),
    title: v.string(),
    content: v.optional(v.string()),
    type: v.union(
      v.literal("dashboard"),
      v.literal("form"),
      v.literal("board"),
      v.literal("code_preview"),
      v.literal("chart"),
      v.literal("custom")
    ),
    sessionId: v.optional(v.string()),
    thumbnail: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }).index("by_org", ["orgId"]).index("by_user", ["userId"]),

  // Voice Settings
  voiceSettings: defineTable({
    orgId: v.id("organizations"),
    userId: v.string(),
    wakeWord: v.optional(v.string()),
    ttsVoice: v.optional(v.string()),
    speakingRate: v.optional(v.number()),
    sttEngine: v.optional(v.string()),
    language: v.optional(v.string()),
    enabled: v.boolean(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  // Memory Files
  memoryFiles: defineTable({
    orgId: v.id("organizations"),
    userId: v.string(),
    agentId: v.optional(v.string()),
    path: v.string(),
    content: v.string(),
    fileType: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }).index("by_org", ["orgId"]).index("by_user", ["userId"]).index("by_agent", ["agentId"]),

  // Browser Sessions
  browserSessions: defineTable({
    orgId: v.id("organizations"),
    userId: v.string(),
    agentId: v.optional(v.string()),
    url: v.optional(v.string()),
    taskDescription: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("completed"), v.literal("failed")),
    pagesVisited: v.optional(v.array(v.string())),
    outcome: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_org", ["orgId"]).index("by_user", ["userId"]),

  // Nodes
  nodes: defineTable({
    orgId: v.id("organizations"),
    userId: v.string(),
    name: v.string(),
    deviceType: v.union(
      v.literal("macos"),
      v.literal("iphone"),
      v.literal("android"),
      v.literal("linux"),
      v.literal("windows")
    ),
    status: v.union(v.literal("online"), v.literal("offline"), v.literal("sleeping")),
    osVersion: v.optional(v.string()),
    capabilities: v.optional(v.object({
      camera: v.optional(v.boolean()),
      screenRecord: v.optional(v.boolean()),
      location: v.optional(v.boolean()),
      notifications: v.optional(v.boolean()),
      voiceWake: v.optional(v.boolean()),
    })),
    lastSeen: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_org", ["orgId"]).index("by_user", ["userId"]),

  // Discover Items
  discoverItems: defineTable({
    orgId: v.optional(v.id("organizations")),
    type: v.union(v.literal("skill"), v.literal("automation"), v.literal("showcase")),
    title: v.string(),
    description: v.optional(v.string()),
    author: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    installCount: v.optional(v.number()),
    rating: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_type", ["type"]),

  // Usage Records
  usageRecords: defineTable({
    orgId: v.id("organizations"),
    userId: v.string(),
    agentId: v.optional(v.string()),
    model: v.optional(v.string()),
    tokensUsed: v.number(),
    cost: v.number(),
    taskType: v.optional(v.string()),
    date: v.string(),
    createdAt: v.number(),
  }).index("by_org", ["orgId"]).index("by_user", ["userId"]).index("by_date", ["date"]),

  // Approvals
  approvals: defineTable({
    orgId: v.id("organizations"),
    userId: v.string(),
    agentId: v.string(),
    description: v.string(),
    actionDetail: v.optional(v.string()),
    riskLevel: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("deferred")
    ),
    decidedBy: v.optional(v.string()),
    decidedAt: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_org", ["orgId"]).index("by_user", ["userId"]).index("by_status", ["status"]),

  // Cron Jobs
  cronJobs: defineTable({
    orgId: v.id("organizations"),
    userId: v.string(),
    agentId: v.optional(v.string()),
    name: v.string(),
    schedule: v.string(),
    instruction: v.optional(v.string()),
    enabled: v.boolean(),
    lastRunAt: v.optional(v.number()),
    lastRunStatus: v.optional(v.union(v.literal("success"), v.literal("failed"), v.literal("skipped"))),
    nextRunAt: v.optional(v.number()),
    outputChannel: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_org", ["orgId"]).index("by_user", ["userId"]),
});
