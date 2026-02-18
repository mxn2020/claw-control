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
        .query("browserSessions")
        .withIndex("by_user", (q) => q.eq("userId", args.userId!))
        .collect();
    }
    if (args.orgId) {
      return await ctx.db
        .query("browserSessions")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId!))
        .collect();
    }
    return await ctx.db.query("browserSessions").collect();
  },
});

export const get = query({
  args: { id: v.id("browserSessions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    orgId: v.id("organizations"),
    userId: v.string(),
    agentId: v.optional(v.string()),
    url: v.optional(v.string()),
    taskDescription: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("browserSessions", {
      orgId: args.orgId,
      userId: args.userId,
      agentId: args.agentId,
      url: args.url,
      taskDescription: args.taskDescription,
      status: "active",
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("browserSessions"),
    status: v.optional(
      v.union(v.literal("active"), v.literal("completed"), v.literal("failed"))
    ),
    url: v.optional(v.string()),
    pagesVisited: v.optional(v.array(v.string())),
    outcome: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const updates: Record<string, unknown> = {};
    if (fields.status !== undefined) updates.status = fields.status;
    if (fields.url !== undefined) updates.url = fields.url;
    if (fields.pagesVisited !== undefined) updates.pagesVisited = fields.pagesVisited;
    if (fields.outcome !== undefined) updates.outcome = fields.outcome;
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("browserSessions") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
