import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    orgId: v.optional(v.id("organizations")),
    userId: v.optional(v.string()),
    date: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.date) {
      return await ctx.db
        .query("usageRecords")
        .withIndex("by_date", (q) => q.eq("date", args.date!))
        .collect();
    }
    if (args.userId) {
      return await ctx.db
        .query("usageRecords")
        .withIndex("by_user", (q) => q.eq("userId", args.userId!))
        .collect();
    }
    if (args.orgId) {
      return await ctx.db
        .query("usageRecords")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId!))
        .collect();
    }
    return await ctx.db.query("usageRecords").collect();
  },
});

export const create = mutation({
  args: {
    orgId: v.id("organizations"),
    userId: v.string(),
    agentId: v.optional(v.string()),
    model: v.optional(v.string()),
    tokensUsed: v.number(),
    cost: v.number(),
    taskType: v.optional(v.string()),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("usageRecords", {
      orgId: args.orgId,
      userId: args.userId,
      agentId: args.agentId,
      model: args.model,
      tokensUsed: args.tokensUsed,
      cost: args.cost,
      taskType: args.taskType,
      date: args.date,
      createdAt: Date.now(),
    });
  },
});

export const aggregate = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const records = await ctx.db
      .query("usageRecords")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    let totalTokens = 0;
    let totalCost = 0;
    for (const record of records) {
      totalTokens += record.tokensUsed;
      totalCost += record.cost;
    }

    return { totalTokens, totalCost };
  },
});
