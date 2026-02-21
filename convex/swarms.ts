import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { orgId: v.optional(v.id("organizations")) },
  handler: async (ctx, args) => {
    if (args.orgId) {
      return await ctx.db
        .query("swarms")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId!))
        .collect();
    }
    return await ctx.db.query("swarms").collect();
  },
});

export const get = query({
  args: { id: v.id("swarms") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    orgId: v.id("organizations"),
    name: v.string(),
    tier: v.union(v.literal("micro"), v.literal("meso"), v.literal("macro"), v.literal("mega")),
    blueprintId: v.optional(v.id("blueprints")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("swarms", {
      orgId: args.orgId,
      name: args.name,
      tier: args.tier,
      status: "provisioning",
      instanceIds: [],
      agentIds: [],
      blueprintId: args.blueprintId,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("swarms"),
    name: v.optional(v.string()),
    status: v.optional(v.union(v.literal("active"), v.literal("provisioning"), v.literal("paused"), v.literal("error"))),
    instanceIds: v.optional(v.array(v.id("instances"))),
    agentIds: v.optional(v.array(v.id("agents"))),
    config: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const updates: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) updates[key] = value;
    }
    if (Object.keys(updates).length > 0) {
      await ctx.db.patch(id, updates);
    }
  },
});

export const remove = mutation({
  args: { id: v.id("swarms") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
