import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    orgId: v.optional(v.id("organizations")),
    userId: v.optional(v.string()),
    agentId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.agentId) {
      return await ctx.db
        .query("memoryFiles")
        .withIndex("by_agent", (q) => q.eq("agentId", args.agentId!))
        .collect();
    }
    if (args.userId) {
      return await ctx.db
        .query("memoryFiles")
        .withIndex("by_user", (q) => q.eq("userId", args.userId!))
        .collect();
    }
    if (args.orgId) {
      return await ctx.db
        .query("memoryFiles")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId!))
        .collect();
    }
    return await ctx.db.query("memoryFiles").collect();
  },
});

export const get = query({
  args: { id: v.id("memoryFiles") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    orgId: v.id("organizations"),
    userId: v.string(),
    agentId: v.optional(v.string()),
    path: v.string(),
    content: v.string(),
    fileType: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("memoryFiles", {
      orgId: args.orgId,
      userId: args.userId,
      agentId: args.agentId,
      path: args.path,
      content: args.content,
      fileType: args.fileType,
      tags: args.tags,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("memoryFiles"),
    content: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    updatedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const updates: Record<string, unknown> = {};
    if (fields.content !== undefined) updates.content = fields.content;
    if (fields.tags !== undefined) updates.tags = fields.tags;
    updates.updatedAt = fields.updatedAt ?? Date.now();
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("memoryFiles") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
