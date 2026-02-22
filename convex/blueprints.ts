import { v } from "convex/values";
import { protectedQuery, protectedMutation } from "./custom_auth";

export const list = protectedQuery(
  { orgId: v.optional(v.id("organizations")) },
  "viewer",
  async (ctx, args, auth) => {
    const orgId = args.orgId || auth.orgId;
    if (orgId) {
      return await ctx.db
        .query("blueprints")
        .withIndex("by_org", (q) => q.eq("orgId", orgId as any))
        .collect();
    }
    return await ctx.db.query("blueprints").collect();
  }
);

export const get = protectedQuery(
  { id: v.id("blueprints") },
  "viewer",
  async (ctx, args) => {
    return await ctx.db.get(args.id);
  }
);

export const create = protectedMutation(
  {
    orgId: v.id("organizations"),
    name: v.string(),
    description: v.optional(v.string()),
  },
  "admin",
  async (ctx, args) => {
    return await ctx.db.insert("blueprints", {
      orgId: args.orgId,
      name: args.name,
      description: args.description,
      deployCount: 0,
      createdAt: Date.now(),
    });
  }
);

export const update = protectedMutation(
  {
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
  "operator",
  async (ctx, args) => {
    const { id, ...fields } = args;
    const updates: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) updates[key] = value;
    }
    updates.updatedAt = Date.now();
    await ctx.db.patch(id, updates);
  }
);

export const remove = protectedMutation(
  { id: v.id("blueprints") },
  "admin",
  async (ctx, args) => {
    await ctx.db.delete(args.id);
  }
);

export const deploy = protectedMutation(
  {
    blueprintId: v.id("blueprints"),
    orgId: v.id("organizations"),
    instanceIds: v.array(v.id("instances")),
  },
  "admin",
  async (ctx, args) => {
    const bp = await ctx.db.get(args.blueprintId);
    if (!bp) throw new Error("Blueprint not found");

    await ctx.db.patch(args.blueprintId, {
      deployCount: ((bp as any).deployCount || 0) + 1,
      updatedAt: Date.now(),
    } as any);

    await ctx.db.insert("auditLogs", {
      orgId: args.orgId,
      action: "deploy",
      resourceType: "blueprint",
      resourceId: args.blueprintId,
      details: `Deployed to ${args.instanceIds.length} instances`,
      createdAt: Date.now(),
    });
  }
);
