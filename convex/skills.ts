import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listInstalled = query({
    args: { orgId: v.optional(v.id("organizations")) },
    handler: async (ctx, args) => {
        if (args.orgId) {
            return await ctx.db
                .query("skills")
                .withIndex("by_org", (q) => q.eq("orgId", args.orgId!))
                .collect();
        }
        return await ctx.db.query("skills").collect();
    },
});

export const install = mutation({
    args: {
        orgId: v.id("organizations"),
        discoverItemId: v.id("discoverItems"),
        targetType: v.union(v.literal("global"), v.literal("instance"), v.literal("agent")),
        targetId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const item = await ctx.db.get(args.discoverItemId);
        if (!item) throw new Error("Skill not found in discover items");

        // Compute the target string to store
        const targetPath = args.targetType === "global" ? "global" : `${args.targetType}:${args.targetId}`;

        // Create the installed skill record
        await ctx.db.insert("skills", {
            orgId: args.orgId,
            name: item.title,
            description: item.description,
            version: "1.0.0", // default versioning
            author: item.author,
            isEnabled: true,
            installedAt: Date.now(),
            installedOn: [targetPath],
        });

        // We can also increment the install count on the discover item
        if (item.installCount !== undefined) {
            await ctx.db.patch(item._id, { installCount: item.installCount + 1 });
        }

        return true;
    },
});

export const uninstall = mutation({
    args: { id: v.id("skills") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
