import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    orgId: v.optional(v.id("organizations")),
    userId: v.optional(v.string()),
    status: v.optional(
      v.union(
        v.literal("queued"),
        v.literal("running"),
        v.literal("needs_review"),
        v.literal("done"),
        v.literal("failed")
      )
    ),
  },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("tasks")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .collect();
    }
    if (args.userId) {
      return await ctx.db
        .query("tasks")
        .withIndex("by_user", (q) => q.eq("userId", args.userId!))
        .collect();
    }
    if (args.orgId) {
      return await ctx.db
        .query("tasks")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId!))
        .collect();
    }
    return await ctx.db.query("tasks").collect();
  },
});

export const get = query({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    orgId: v.id("organizations"),
    userId: v.string(),
    agentId: v.optional(v.string()),
    title: v.string(),
    description: v.optional(v.string()),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    deadline: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tasks", {
      orgId: args.orgId,
      userId: args.userId,
      agentId: args.agentId,
      title: args.title,
      description: args.description,
      priority: args.priority,
      deadline: args.deadline,
      status: "queued",
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("tasks"),
    status: v.optional(
      v.union(
        v.literal("queued"),
        v.literal("running"),
        v.literal("needs_review"),
        v.literal("done"),
        v.literal("failed")
      )
    ),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
    updatedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const updates: Record<string, unknown> = {};
    if (fields.status !== undefined) updates.status = fields.status;
    if (fields.output !== undefined) updates.output = fields.output;
    if (fields.error !== undefined) updates.error = fields.error;
    updates.updatedAt = fields.updatedAt ?? Date.now();
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
