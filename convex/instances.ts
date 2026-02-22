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

export const update = mutation({
  args: {
    id: v.id("instances"),
    name: v.optional(v.string()),
    provider: v.optional(v.string()),
    region: v.optional(v.string()),
    version: v.optional(v.string()),
    cpuUsage: v.optional(v.number()),
    memoryUsage: v.optional(v.number()),
    lastHeartbeat: v.optional(v.number()),
    config: v.optional(v.object({
      providers: v.optional(v.array(v.string())),
      defaultModel: v.optional(v.string()),
      sandboxMode: v.optional(v.boolean()),
    })),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    // Filter out undefined values
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
  args: { id: v.id("instances") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const quarantine = mutation({
  args: {
    id: v.id("instances"),
    reason: v.string(),
  },
  handler: async (ctx, args) => {
    const instance = await ctx.db.get(args.id);
    if (!instance) throw new Error("Instance not found");

    await ctx.db.patch(args.id, { status: "quarantined" });

    await ctx.db.insert("auditLogs", {
      orgId: instance.orgId,
      action: "quarantine_instance",
      resourceType: "instance",
      resourceId: instance._id,
      details: args.reason,
      createdAt: Date.now(),
    });
  },
});

export const unquarantine = mutation({
  args: {
    id: v.id("instances"),
    reason: v.string(),
  },
  handler: async (ctx, args) => {
    const instance = await ctx.db.get(args.id);
    if (!instance) throw new Error("Instance not found");

    await ctx.db.patch(args.id, { status: "offline" }); // Unquarantine usually reverts to offline state for safe restart

    await ctx.db.insert("auditLogs", {
      orgId: instance.orgId,
      action: "unquarantine_instance",
      resourceType: "instance",
      resourceId: instance._id,
      details: args.reason,
      createdAt: Date.now(),
    });
  },
});

export const pauseAll = mutation({
  args: { orgId: v.id("organizations") },
  handler: async (ctx, args) => {
    const instances = await ctx.db
      .query("instances")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .collect();
    for (const instance of instances) {
      if (instance.status !== "offline") {
        await ctx.db.patch(instance._id, { status: "offline" });
      }
    }
    // Log the kill switch activation
    await ctx.db.insert("auditLogs", {
      orgId: args.orgId,
      action: "kill_switch_activated",
      resourceType: "fleet",
      details: `Paused ${instances.length} instances`,
      createdAt: Date.now(),
    });
    return { paused: instances.length };
  },
});

export const resumeAll = mutation({
  args: { orgId: v.id("organizations") },
  handler: async (ctx, args) => {
    const instances = await ctx.db
      .query("instances")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .collect();
    for (const instance of instances) {
      if (instance.status === "offline") {
        await ctx.db.patch(instance._id, { status: "online" });
      }
    }
    await ctx.db.insert("auditLogs", {
      orgId: args.orgId,
      action: "kill_switch_deactivated",
      resourceType: "fleet",
      details: `Resumed ${instances.length} instances`,
      createdAt: Date.now(),
    });
    return { resumed: instances.length };
  },
});
