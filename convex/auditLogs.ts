import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
    args: {
        orgId: v.optional(v.id("organizations")),
        resourceType: v.optional(v.string()),
        limit: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        let q = ctx.db.query("auditLogs");
        if (args.orgId) {
            const results = await q
                .withIndex("by_org", (q2) => q2.eq("orgId", args.orgId!))
                .order("desc")
                .take(args.limit ?? 100);
            if (args.resourceType) {
                return results.filter((r) => r.resourceType === args.resourceType);
            }
            return results;
        }
        return await q.order("desc").take(args.limit ?? 100);
    },
});

export const create = mutation({
    args: {
        orgId: v.id("organizations"),
        userId: v.optional(v.string()),
        action: v.string(),
        resourceType: v.string(),
        resourceId: v.optional(v.string()),
        details: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("auditLogs", {
            orgId: args.orgId,
            userId: args.userId,
            action: args.action,
            resourceType: args.resourceType,
            resourceId: args.resourceId,
            details: args.details,
            createdAt: Date.now(),
        });
    },
});
