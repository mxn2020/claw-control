import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { orgId: v.optional(v.id("organizations")) },
  handler: async (ctx, args) => {
    if (args.orgId) {
      return await ctx.db
        .query("instances")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId!))
        .collect();
    }
    return await ctx.db.query("instances").collect();
  },
});

export const get = query({
  args: { id: v.id("instances") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    orgId: v.id("organizations"),
    name: v.string(),
    provider: v.optional(v.string()),
    region: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("instances", {
      orgId: args.orgId,
      name: args.name,
      status: "provisioning",
      provider: args.provider,
      region: args.region,
      agentCount: 0,
      createdAt: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("instances"),
    status: v.union(
      v.literal("online"),
      v.literal("offline"),
      v.literal("provisioning"),
      v.literal("error"),
      v.literal("quarantined")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const remove = mutation({
  args: { id: v.id("instances") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
