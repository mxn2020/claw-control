import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
    args: {
        orgId: v.optional(v.id("organizations")),
    },
    handler: async (ctx, args) => {
        if (args.orgId) {
            return await ctx.db
                .query("secrets")
                .withIndex("by_org", (q) => q.eq("orgId", args.orgId!))
                .collect();
        }
        return await ctx.db.query("secrets").collect();
    },
});

export const create = mutation({
    args: {
        orgId: v.id("organizations"),
        name: v.string(),
        value: v.string(),
        description: v.optional(v.string()),
        type: v.union(v.literal("api_key"), v.literal("token"), v.literal("password"), v.literal("certificate")),
        instanceIds: v.optional(v.array(v.id("instances"))),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("secrets", {
            orgId: args.orgId,
            name: args.name,
            value: args.value,
            description: args.description,
            type: args.type,
            instanceIds: args.instanceIds,
            status: "active",
            createdAt: Date.now(),
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("secrets"),
        name: v.optional(v.string()),
        value: v.optional(v.string()),
        description: v.optional(v.string()),
        type: v.optional(v.union(v.literal("api_key"), v.literal("token"), v.literal("password"), v.literal("certificate"))),
        instanceIds: v.optional(v.array(v.id("instances"))),
        status: v.optional(v.union(v.literal("active"), v.literal("stale"), v.literal("expired"))),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        await ctx.db.patch(id, updates);
    },
});

export const remove = mutation({
    args: { id: v.id("secrets") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
