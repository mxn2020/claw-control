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

export const deploy = mutation({
  args: {
    blueprintId: v.id("blueprints"),
    orgId: v.id("organizations"),
    instanceIds: v.array(v.id("instances")),
  },
  handler: async (ctx, args) => {
    const bp = await ctx.db.get(args.blueprintId);
    if (!bp) throw new Error("Blueprint not found");

    // Increment deploy count
    await ctx.db.patch(args.blueprintId, {
      deployCount: (bp.deployCount || 0) + 1,
      updatedAt: Date.now(),
    });

    // Log audit event
    await ctx.db.insert("auditLogs", {
      orgId: args.orgId,
      action: "deploy",
      resourceType: "blueprint",
      resourceId: args.blueprintId,
      details: `Deployed to ${args.instanceIds.length} instances`,
      createdAt: Date.now(),
    });
  },
});

