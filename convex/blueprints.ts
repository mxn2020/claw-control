import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { orgId: v.optional(v.id("organizations")) },
  handler: async (ctx, args) => {
    if (args.orgId) {
      return await ctx.db
        .query("blueprints")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId!))
        .collect();
    }
    return await ctx.db.query("blueprints").collect();
  },
});

export const get = query({
  args: { id: v.id("blueprints") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    orgId: v.id("organizations"),
    name: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("blueprints", {
      orgId: args.orgId,
      name: args.name,
      description: args.description,
      deployCount: 0,
      createdAt: Date.now(),
    });
  },
});
