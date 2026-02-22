import { v } from "convex/values";
import { protectedMutation, protectedQuery } from "./custom_auth";

export const list = protectedQuery(
    { orgId: v.id("organizations") },
    "operator", // minimum role operator
    async (ctx, args) => {
        return await ctx.db
            .query("teams")
            .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
            .collect();
    }
);

export const create = protectedMutation(
    {
        orgId: v.id("organizations"),
        name: v.string(),
        description: v.optional(v.string()),
    },
    "admin", // minimum role admin
    async (ctx, args, auth) => {
        const teamId = await ctx.db.insert("teams", {
            orgId: args.orgId,
            name: args.name,
            description: args.description,
            createdAt: Date.now(),
        });

        await ctx.db.insert("auditLogs", {
            orgId: args.orgId,
            userId: auth.user._id.toString(),
            action: "team_created",
            resourceType: "team",
            resourceId: teamId,
            details: `Created team ${args.name}`,
            createdAt: Date.now(),
        });

        return teamId;
    }
);

export const remove = protectedMutation(
    {
        orgId: v.id("organizations"),
        teamId: v.id("teams")
    },
    "admin",
    async (ctx, args, auth) => {
        const team = await ctx.db.get(args.teamId as import("./_generated/dataModel").Id<"teams">);
        if (!team || team.orgId !== args.orgId) throw new Error("Team not found");

        const teamName = team.name;

        // Delete team members first
        const members = await ctx.db
            .query("teamMembers")
            .withIndex("by_team", (q) => q.eq("teamId", args.teamId))
            .collect();

        for (const m of members) {
            await ctx.db.delete(m._id);
        }

        // Wipe scoping
        const instances = await ctx.db.query("instances").withIndex("by_org", (q) => q.eq("orgId", args.orgId)).collect();
        for (const inst of instances) {
            if ((inst as any).teamId === args.teamId) {
                await ctx.db.patch(inst._id, { teamId: undefined } as any);
            }
        }

        const agents = await ctx.db.query("agents").withIndex("by_org", (q) => q.eq("orgId", args.orgId)).collect();
        for (const agent of agents) {
            if ((agent as any).teamId === args.teamId) {
                await ctx.db.patch(agent._id, { teamId: undefined } as any);
            }
        }

        await ctx.db.delete(args.teamId);

        await ctx.db.insert("auditLogs", {
            orgId: args.orgId,
            userId: auth.user._id.toString(),
            action: "team_removed",
            resourceType: "team",
            resourceId: args.teamId,
            details: `Deleted team ${teamName}`,
            createdAt: Date.now(),
        });
    }
);

export const getTeamMembers = protectedQuery(
    { orgId: v.id("organizations"), teamId: v.id("teams") },
    "operator",
    async (ctx, args) => {
        const team = await ctx.db.get(args.teamId as import("./_generated/dataModel").Id<"teams">);
        if (!team || team.orgId !== args.orgId) throw new Error("Team not found");

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
    }
);

export const addMember = protectedMutation(
    {
        orgId: v.id("organizations"),
        teamId: v.id("teams"),
        userId: v.string(),
    },
    "admin",
    async (ctx, args, auth) => {
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

        await ctx.db.insert("auditLogs", {
            orgId: args.orgId,
            userId: auth.user._id.toString(),
            action: "team_member_added",
            resourceType: "team",
            resourceId: args.teamId,
            details: `Added user ${args.userId} to team`,
            createdAt: Date.now(),
        });
    }
);

export const removeMember = protectedMutation(
    {
        orgId: v.id("organizations"),
        teamId: v.id("teams"),
        membershipId: v.id("teamMembers")
    },
    "admin",
    async (ctx, args, auth) => {
        const mem = await ctx.db.get(args.membershipId as import("./_generated/dataModel").Id<"teamMembers">);
        if (!mem || mem.teamId !== args.teamId || mem.orgId !== args.orgId) throw new Error("Invalid membership");

        await ctx.db.delete(args.membershipId);

        await ctx.db.insert("auditLogs", {
            orgId: args.orgId,
            userId: auth.user._id.toString(),
            action: "team_member_removed",
            resourceType: "team",
            resourceId: args.teamId,
            details: `Removed user from team`,
            createdAt: Date.now(),
        });
    }
);
