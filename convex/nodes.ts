import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { protectedQuery, protectedMutation } from "./custom_auth";

export const list = protectedQuery(
  {
    orgId: v.optional(v.id("organizations")),
    userId: v.optional(v.string()),
  },
  "viewer",
  async (ctx, args, auth) => {
    if (args.userId) {
      return await ctx.db
        .query("nodes")
        .withIndex("by_user", (q) => q.eq("userId", args.userId!))
        .collect();
    }
    const orgId = args.orgId || auth.orgId;
    if (orgId) {
      return await ctx.db
        .query("nodes")
        .withIndex("by_org", (q) => q.eq("orgId", orgId as any))
        .collect();
    }
    return await ctx.db.query("nodes").collect();
  }
);

export const get = protectedQuery(
  { id: v.id("nodes") },
  "viewer",
  async (ctx, args) => {
    return await ctx.db.get(args.id);
  }
);

export const create = protectedMutation(
  {
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
  "admin",
  async (ctx, args) => {
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
  }
);

export const update = protectedMutation(
  {
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
  "operator",
  async (ctx, args) => {
    const { id, ...fields } = args;
    const updates: Record<string, unknown> = {};
    if (fields.status !== undefined) updates.status = fields.status;
    if (fields.lastSeen !== undefined) updates.lastSeen = fields.lastSeen;
    if (fields.capabilities !== undefined) updates.capabilities = fields.capabilities;
    await ctx.db.patch(id, updates);
  }
);

export const remove = protectedMutation(
  { id: v.id("nodes") },
  "admin",
  async (ctx, args) => {
    await ctx.db.delete(args.id);
  }
);

export const initiatePairing = protectedMutation(
  {
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
  },
  "admin",
  async (ctx, args) => {
    const pairingCode = Math.floor(100000 + Math.random() * 900000).toString();
    const pairingExpiresAt = Date.now() + 15 * 60 * 1000;

    const nodeId = await ctx.db.insert("nodes", {
      orgId: args.orgId,
      userId: args.userId,
      name: args.name,
      deviceType: args.deviceType,
      status: "offline",
      pairingCode,
      pairingExpiresAt,
      createdAt: Date.now(),
    });

    return { nodeId, pairingCode, pairingExpiresAt };
  }
);

// Device claim stays unauthenticated — called by the device itself with a pairing code
export const claimDevice = mutation({
  args: {
    pairingCode: v.string(),
    osVersion: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const nodes = await ctx.db
      .query("nodes")
      .filter((q) => q.eq(q.field("pairingCode"), args.pairingCode))
      .collect();

    const node = nodes[0];

    if (!node || !node.pairingExpiresAt || node.pairingExpiresAt < Date.now()) {
      throw new Error("Invalid or expired pairing code");
    }

    await ctx.db.patch(node._id, {
      status: "online",
      osVersion: args.osVersion,
      pairingCode: undefined,
      pairingExpiresAt: undefined,
      lastSeen: Date.now(),
    });

    return { success: true, nodeId: node._id, orgId: node.orgId, userId: node.userId };
  },
});
