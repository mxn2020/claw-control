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
        .query("canvases")
        .withIndex("by_user", (q) => q.eq("userId", args.userId!))
        .collect();
    }
    if (args.orgId) {
      return await ctx.db
        .query("canvases")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId!))
        .collect();
    }
    return await ctx.db.query("canvases").collect();
  },
});

export const get = query({
  args: { id: v.id("canvases") },
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("canvases", {
      orgId: args.orgId,
      userId: args.userId,
      agentId: args.agentId,
      title: args.title,
      content: args.content,
      type: args.type,
      sessionId: args.sessionId,
      thumbnail: args.thumbnail,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("canvases"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    thumbnail: v.optional(v.string()),
    updatedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const updates: Record<string, unknown> = {};
    if (fields.title !== undefined) updates.title = fields.title;
    if (fields.content !== undefined) updates.content = fields.content;
    if (fields.thumbnail !== undefined) updates.thumbnail = fields.thumbnail;
    updates.updatedAt = fields.updatedAt ?? Date.now();
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("canvases") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
