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
