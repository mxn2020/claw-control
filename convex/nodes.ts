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
        .query("nodes")
        .withIndex("by_user", (q) => q.eq("userId", args.userId!))
        .collect();
    }
    if (args.orgId) {
      return await ctx.db
        .query("nodes")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId!))
        .collect();
    }
    return await ctx.db.query("nodes").collect();
  },
});

export const get = query({
  args: { id: v.id("nodes") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    orgId: v.id("organizations"),
    userId: v.string(),
    name: v.string(),
    deviceType: v.union(
      v.literal("macos"),
      v.literal("iphone"),
      v.literal("android"),
      v.literal("linux"),
      v.literal("windows")
    ),
    osVersion: v.optional(v.string()),
    capabilities: v.optional(
      v.object({
        camera: v.optional(v.boolean()),
        screenRecord: v.optional(v.boolean()),
        location: v.optional(v.boolean()),
        notifications: v.optional(v.boolean()),
        voiceWake: v.optional(v.boolean()),
      })
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("nodes", {
      orgId: args.orgId,
      userId: args.userId,
      name: args.name,
      deviceType: args.deviceType,
      status: "online",
      osVersion: args.osVersion,
      capabilities: args.capabilities,
      lastSeen: Date.now(),
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("nodes"),
    status: v.optional(
      v.union(v.literal("online"), v.literal("offline"), v.literal("sleeping"))
    ),
    lastSeen: v.optional(v.number()),
    capabilities: v.optional(
      v.object({
        camera: v.optional(v.boolean()),
        screenRecord: v.optional(v.boolean()),
        location: v.optional(v.boolean()),
        notifications: v.optional(v.boolean()),
        voiceWake: v.optional(v.boolean()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const updates: Record<string, unknown> = {};
    if (fields.status !== undefined) updates.status = fields.status;
    if (fields.lastSeen !== undefined) updates.lastSeen = fields.lastSeen;
    if (fields.capabilities !== undefined) updates.capabilities = fields.capabilities;
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("nodes") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
