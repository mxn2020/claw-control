import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

function generateKey(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let key = "ck_";
    for (let i = 0; i < 40; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
}

function hashKey(key: string): string {
    let hash = 5381;
    for (let i = 0; i < key.length; i++) {
        hash = (hash * 33) ^ key.charCodeAt(i);
    }
    return (hash >>> 0).toString(16).padStart(8, "0") + key.length.toString(16);
}

export const list = query({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("apiKeys")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .collect();
    },
});

export const create = mutation({
    args: {
        userId: v.id("users"),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const rawKey = generateKey();
        const keyHash = hashKey(rawKey);

        await ctx.db.insert("apiKeys", {
            userId: args.userId,
            name: args.name,
            keyHash,
            createdAt: Date.now(),
        });

        // Return the raw key only once — it can't be retrieved later
        return { key: rawKey, name: args.name };
    },
});

export const revoke = mutation({
    args: { id: v.id("apiKeys") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
