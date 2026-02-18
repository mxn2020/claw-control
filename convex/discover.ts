import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    type: v.optional(
      v.union(v.literal("skill"), v.literal("automation"), v.literal("showcase"))
    ),
  },
  handler: async (ctx, args) => {
    if (args.type) {
      return await ctx.db
        .query("discoverItems")
        .withIndex("by_type", (q) => q.eq("type", args.type!))
        .collect();
    }
    return await ctx.db.query("discoverItems").collect();
  },
});

export const get = query({
  args: { id: v.id("discoverItems") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    orgId: v.optional(v.id("organizations")),
    type: v.union(v.literal("skill"), v.literal("automation"), v.literal("showcase")),
    title: v.string(),
    description: v.optional(v.string()),
    author: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    installCount: v.optional(v.number()),
    rating: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("discoverItems", {
      orgId: args.orgId,
      type: args.type,
      title: args.title,
      description: args.description,
      author: args.author,
      category: args.category,
      tags: args.tags,
      installCount: args.installCount,
      rating: args.rating,
      createdAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("discoverItems") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
