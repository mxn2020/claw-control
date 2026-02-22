import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
    args: { orgId: v.id("organizations") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("teams")
            .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
            .collect();
    },
});

export const create = mutation({
    args: {
        orgId: v.id("organizations"),
        name: v.string(),
        description: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("teams", {
            orgId: args.orgId,
            name: args.name,
            description: args.description,
            createdAt: Date.now(),
        });
    },
});

export const remove = mutation({
    args: { teamId: v.id("teams") },
    handler: async (ctx, args) => {
        // Delete team members first
        const members = await ctx.db
            .query("teamMembers")
            .withIndex("by_team", (q) => q.eq("teamId", args.teamId))
            .collect();

        for (const m of members) {
            await ctx.db.delete(m._id);
        }

        await ctx.db.delete(args.teamId);
    },
});

export const getTeamMembers = query({
    args: { teamId: v.id("teams") },
    handler: async (ctx, args) => {
        const members = await ctx.db
            .query("teamMembers")
            .withIndex("by_team", (q) => q.eq("teamId", args.teamId))
            .collect();

        return await Promise.all(
            members.map(async (m) => {
                let name = "Unknown";
                let email = "unknown@example.com";
                try {
                    const user = (await ctx.db.get(m.userId as any)) as any;
                    if (user) {
                        name = user.name;
                        email = user.email;
                    }
                } catch (e) {
                    // ignore external users
                }

                return {
                    id: m._id,
                    userId: m.userId,
                    joinedAt: m.joinedAt,
                    name,
                    email,
                };
            })
        );
    },
});

export const addMember = mutation({
    args: {
        orgId: v.id("organizations"),
        teamId: v.id("teams"),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        // Ensure user is in org first
        const isOrgMember = await ctx.db
            .query("orgMembers")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .filter((q) => q.eq(q.field("orgId"), args.orgId))
            .first();

        if (!isOrgMember) {
            throw new Error("User must be part of the organization to join a team.");
        }

        // Check if already in team
        const inTeam = await ctx.db
            .query("teamMembers")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .filter((q) => q.eq(q.field("teamId"), args.teamId))
            .first();

        if (inTeam) {
            throw new Error("User is already in this team.");
        }

        await ctx.db.insert("teamMembers", {
            orgId: args.orgId,
            teamId: args.teamId,
            userId: args.userId,
            joinedAt: Date.now(),
        });
    },
});

export const removeMember = mutation({
    args: { membershipId: v.id("teamMembers") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.membershipId);
    },
});
