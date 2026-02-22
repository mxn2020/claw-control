import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    orgId: v.optional(v.id("organizations")),
    instanceId: v.optional(v.id("instances")),
  },
  handler: async (ctx, args) => {
    if (args.instanceId) {
      return await ctx.db
        .query("agents")
        .withIndex("by_instance", (q) => q.eq("instanceId", args.instanceId!))
        .collect();
    }
    if (args.orgId) {
      return await ctx.db
        .query("agents")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId!))
        .collect();
    }
    return await ctx.db.query("agents").collect();
  },
});

export const get = query({
  args: { id: v.id("agents") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    orgId: v.id("organizations"),
    instanceId: v.id("instances"),
    name: v.string(),
    model: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const agentId = await ctx.db.insert("agents", {
      orgId: args.orgId,
      instanceId: args.instanceId,
      name: args.name,
      status: "idle",
      model: args.model,
      sessionCount: 0,
      createdAt: Date.now(),
    });

    // Update instance agent count
    const instance = await ctx.db.get(args.instanceId);
    if (instance) {
      await ctx.db.patch(args.instanceId, {
        agentCount: instance.agentCount + 1,
      });
    }

    return agentId;
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("agents"),
    status: v.union(
      v.literal("active"),
      v.literal("idle"),
      v.literal("error"),
      v.literal("paused"),
      v.literal("quarantined")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const updatePersonality = mutation({
  args: {
    id: v.id("agents"),
    personality: v.object({
      soulMd: v.optional(v.string()),
      agentsMd: v.optional(v.string()),
      userMd: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { personality: args.personality });
  },
});

export const update = mutation({
  args: {
    id: v.id("agents"),
    model: v.optional(v.string()),
    toolsConfig: v.optional(v.object({
      allowed: v.optional(v.array(v.string())),
      denied: v.optional(v.array(v.string())),
      sandboxMode: v.optional(v.boolean()),
    })),
    channelBindings: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    // Filter out undefined fields
    const patch: Record<string, unknown> = {};
    if (fields.model !== undefined) patch.model = fields.model;
    if (fields.toolsConfig !== undefined) patch.toolsConfig = fields.toolsConfig;
    if (fields.channelBindings !== undefined) patch.channelBindings = fields.channelBindings;
    await ctx.db.patch(id, patch);
  },
});

export const remove = mutation({
  args: { id: v.id("agents") },
  handler: async (ctx, args) => {
    const agent = await ctx.db.get(args.id);
    if (agent) {
      const instance = await ctx.db.get(agent.instanceId);
      if (instance) {
        await ctx.db.patch(agent.instanceId, {
          agentCount: Math.max(0, instance.agentCount - 1),
        });
      }
    }
    await ctx.db.delete(args.id);
  },
});

export const quarantine = mutation({
  args: {
    id: v.id("agents"),
    reason: v.string(),
  },
  handler: async (ctx, args) => {
    const agent = await ctx.db.get(args.id);
    if (!agent) throw new Error("Agent not found");

    await ctx.db.patch(args.id, { status: "quarantined" });

    await ctx.db.insert("auditLogs", {
      orgId: agent.orgId,
      action: "quarantine_agent",
      resourceType: "agent",
      resourceId: agent._id,
      details: args.reason,
      createdAt: Date.now(),
    });
  }
});

export const unquarantine = mutation({
  args: {
    id: v.id("agents"),
    reason: v.string(),
  },
  handler: async (ctx, args) => {
    const agent = await ctx.db.get(args.id);
    if (!agent) throw new Error("Agent not found");

    await ctx.db.patch(args.id, { status: "paused" }); // Usually unquarantine resumes to paused or idle

    await ctx.db.insert("auditLogs", {
      orgId: agent.orgId,
      action: "unquarantine_agent",
      resourceType: "agent",
      resourceId: agent._id,
      details: args.reason,
      createdAt: Date.now(),
    });
  }
});

export const pauseAll = mutation({
  args: { orgId: v.id("organizations") },
  handler: async (ctx, args) => {
    const agents = await ctx.db
      .query("agents")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .collect();
    for (const agent of agents) {
      if (agent.status !== "paused") {
        await ctx.db.patch(agent._id, { status: "paused" });
      }
    }
    return { paused: agents.length };
  },
});

export const resumeAll = mutation({
  args: { orgId: v.id("organizations") },
  handler: async (ctx, args) => {
    const agents = await ctx.db
      .query("agents")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .collect();
    for (const agent of agents) {
      if (agent.status === "paused") {
        await ctx.db.patch(agent._id, { status: "idle" });
      }
    }
    return { resumed: agents.length };
  },
});
