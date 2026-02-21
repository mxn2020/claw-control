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

export const update = mutation({
  args: {
    id: v.id("blueprints"),
    name: v.optional(v.string()),
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
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const updates: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) updates[key] = value;
    }
    updates.updatedAt = Date.now();
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("blueprints") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
