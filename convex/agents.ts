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
