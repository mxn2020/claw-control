import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    orgId: v.optional(v.id("organizations")),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.userId) {
      return await ctx.db
        .query("cronJobs")
        .withIndex("by_user", (q) => q.eq("userId", args.userId!))
        .collect();
    }
    if (args.orgId) {
      return await ctx.db
        .query("cronJobs")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId!))
        .collect();
    }
    return await ctx.db.query("cronJobs").collect();
  },
});

export const get = query({
  args: { id: v.id("cronJobs") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    orgId: v.id("organizations"),
    userId: v.string(),
    agentId: v.optional(v.string()),
    name: v.string(),
    schedule: v.string(),
    instruction: v.optional(v.string()),
    outputChannel: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("cronJobs", {
      orgId: args.orgId,
      userId: args.userId,
      agentId: args.agentId,
      name: args.name,
      schedule: args.schedule,
      instruction: args.instruction,
      enabled: true,
      outputChannel: args.outputChannel,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("cronJobs"),
    enabled: v.optional(v.boolean()),
    lastRunAt: v.optional(v.number()),
    lastRunStatus: v.optional(
      v.union(v.literal("success"), v.literal("failed"), v.literal("skipped"))
    ),
    nextRunAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const updates: Record<string, unknown> = {};
    if (fields.enabled !== undefined) updates.enabled = fields.enabled;
    if (fields.lastRunAt !== undefined) updates.lastRunAt = fields.lastRunAt;
    if (fields.lastRunStatus !== undefined) updates.lastRunStatus = fields.lastRunStatus;
    if (fields.nextRunAt !== undefined) updates.nextRunAt = fields.nextRunAt;
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("cronJobs") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
