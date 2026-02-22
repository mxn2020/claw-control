import { protectedQuery, protectedMutation } from "./custom_auth";
import { v } from "convex/values";

export const listInstalled = protectedQuery(
    { orgId: v.optional(v.id("organizations")) },
    "viewer",
    async (ctx, args, auth) => {
        const orgId = args.orgId || auth.orgId;
        if (orgId) {
            return await ctx.db
                .query("skills")
                .withIndex("by_org", (q) => q.eq("orgId", orgId as any))
                .collect();
        }
        return await ctx.db.query("skills").collect();
    }
);

export const install = protectedMutation(
    {
        orgId: v.id("organizations"),
        discoverItemId: v.id("discoverItems"),
        targetType: v.union(v.literal("global"), v.literal("instance"), v.literal("agent")),
        targetId: v.optional(v.string()),
    },
    "operator",
    async (ctx, args) => {
        const item = await ctx.db.get(args.discoverItemId);
        if (!item) throw new Error("Skill not found in discover items");

        const targetPath = args.targetType === "global" ? "global" : `${args.targetType}:${args.targetId}`;

        await ctx.db.insert("skills", {
            orgId: args.orgId,
            name: (item as any).title,
            description: (item as any).description,
            version: "1.0.0",
            author: (item as any).author,
            isEnabled: true,
            installedAt: Date.now(),
            installedOn: [targetPath],
        });

        if ((item as any).installCount !== undefined) {
            await ctx.db.patch(item._id, { installCount: (item as any).installCount + 1 } as any);
        }

        return true;
    }
);

export const uninstall = protectedMutation(
    { id: v.id("skills") },
    "operator",
    async (ctx, args) => {
        await ctx.db.delete(args.id);
    }
);
