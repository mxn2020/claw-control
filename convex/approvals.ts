import { v } from "convex/values";
import { protectedQuery, protectedMutation } from "./custom_auth";

export const list = protectedQuery(
  {
    orgId: v.optional(v.id("organizations")),
    userId: v.optional(v.string()),
    status: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("approved"),
        v.literal("rejected"),
        v.literal("deferred")
      )
    ),
  },
  "viewer",
  async (ctx, args, auth) => {
    if (args.status) {
      return await ctx.db
        .query("approvals")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .collect();
    }
    if (args.userId) {
      return await ctx.db
        .query("approvals")
        .withIndex("by_user", (q) => q.eq("userId", args.userId!))
        .collect();
    }
    const orgId = args.orgId || auth.orgId;
    if (orgId) {
      return await ctx.db
        .query("approvals")
        .withIndex("by_org", (q) => q.eq("orgId", orgId as any))
        .collect();
    }
    return await ctx.db.query("approvals").collect();
  }
);

export const get = protectedQuery(
  { id: v.id("approvals") },
  "viewer",
  async (ctx, args) => {
    return await ctx.db.get(args.id);
  }
);

export const create = protectedMutation(
  {
    orgId: v.id("organizations"),
    userId: v.string(),
    agentId: v.string(),
    description: v.string(),
    actionDetail: v.optional(v.string()),
    riskLevel: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
  },
  "operator",
  async (ctx, args) => {
    return await ctx.db.insert("approvals", {
      orgId: args.orgId,
      userId: args.userId,
      agentId: args.agentId,
      description: args.description,
      actionDetail: args.actionDetail,
      riskLevel: args.riskLevel,
      status: "pending",
      createdAt: Date.now(),
    });
  }
);

export const decide = protectedMutation(
  {
    id: v.id("approvals"),
    status: v.union(v.literal("approved"), v.literal("rejected"), v.literal("deferred")),
    decidedBy: v.string(),
  },
  "operator",
  async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      decidedBy: args.decidedBy,
      decidedAt: Date.now(),
    });
  }
);
