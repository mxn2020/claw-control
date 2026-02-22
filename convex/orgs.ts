import { v } from "convex/values";
import { protectedMutation, protectedQuery } from "./custom_auth";

// Basic token generator for invites
function generateToken(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < 32; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}

export const getMembers = protectedQuery(
    {},
    // Any member can read members list
    "viewer",
    async (ctx, args, auth) => {
        const members = await ctx.db
            .query("orgMembers")
            .withIndex("by_org", (q) => q.eq("orgId", args.orgId as import("./_generated/dataModel").Id<"organizations">))
            .collect();

        return Promise.all(
            members.map(async (m) => {
                const user = await ctx.db.get(m.userId as import("./_generated/dataModel").Id<"users">);
                return {
                    id: m._id,
                    userId: m.userId,
                    name: user?.name ?? "Unknown",
                    email: user?.email ?? "Unknown",
                    role: m.role,
                    joinedAt: m.joinedAt
                };
            })
        );
    }
);

export const inviteMember = protectedMutation(
    {
        email: v.string(),
        role: v.union(
            v.literal("admin"),
            v.literal("operator"),
            v.literal("viewer")
        ),
    },
    // Only admins or owners can invite
    "admin",
    async (ctx, args, auth) => {
        const email = args.email.toLowerCase().trim();

        // Check if user is already a member
        const user = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", email))
            .first();

        if (user) {
            const existingMember = await ctx.db
                .query("orgMembers")
                .withIndex("by_user", (q) => q.eq("userId", user._id))
                .filter(q => q.eq(q.field("orgId"), args.orgId as import("./_generated/dataModel").Id<"organizations">))
                .first();

            if (existingMember) {
                throw new Error("User is already a member of this organization");
            }
        }

        // Check for existing pending invitation
        const existingInvite = await ctx.db
            .query("orgInvitations")
            .withIndex("by_email", (q) => q.eq("email", email))
            .filter(q => q.eq(q.field("orgId"), args.orgId as import("./_generated/dataModel").Id<"organizations">))
            .filter(q => q.eq(q.field("status"), "pending"))
            .first();

        if (existingInvite && existingInvite.expiresAt > Date.now()) {
            throw new Error("A pending invitation already exists for this email");
        }

        const inviteToken = generateToken();
        const inviteId = await ctx.db.insert("orgInvitations", {
            orgId: args.orgId,
            inviterId: auth.user._id,
            email,
            role: args.role,
            token: inviteToken,
            expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
            status: "pending",
            createdAt: Date.now()
        });

        // MVP: In a real system, send email here. For now, returning token.
        return { inviteId, token: inviteToken };
    }
);

export const acceptInvitation = protectedMutation(
    {
        token: v.string(), // The user's own auth token
        inviteToken: v.string() // The invite link token
    },
    // No specific org required initially as they aren't a member yet
    null,
    async (ctx, args, auth) => {
        const invite = await ctx.db
            .query("orgInvitations")
            .withIndex("by_token", (q) => q.eq("token", args.inviteToken))
            .first();

        if (!invite) throw new Error("Invalid invitation token");
        if (invite.status !== "pending") throw new Error("Invitation has already been used or expired");
        if (invite.expiresAt < Date.now()) {
            await ctx.db.patch(invite._id, { status: "expired" });
            throw new Error("Invitation has expired");
        }

        if (auth.user.email !== invite.email) {
            throw new Error("Invitation email does not match registered user email");
        }

        // Execute the join
        await ctx.db.insert("orgMembers", {
            orgId: invite.orgId,
            userId: auth.user._id,
            role: invite.role,
            joinedAt: Date.now()
        });

        await ctx.db.patch(invite._id, { status: "accepted" });

        return { orgId: invite.orgId };
    }
);

export const updateMemberRole = protectedMutation(
    {
        memberId: v.id("orgMembers"),
        newRole: v.union(
            v.literal("owner"),
            v.literal("admin"),
            v.literal("operator"),
            v.literal("viewer")
        ),
    },
    // Only owners can escalate to owner, but admins can manage others
    "admin",
    async (ctx, args, auth) => {
        const targetMember = await ctx.db.get(args.memberId as import("./_generated/dataModel").Id<"orgMembers">);
        if (!targetMember || targetMember.orgId !== args.orgId) {
            throw new Error("Member not found");
        }

        // Prevent admin from making someone an owner or modifying an owner
        if (auth.member!.role === "admin") {
            if (args.newRole === "owner") throw new Error("Only owners can grant owner role");
            if (targetMember.role === "owner") throw new Error("Admins cannot modify owner roles");
        }

        // Prevent removing the last owner
        if (targetMember.role === "owner" && args.newRole !== "owner") {
            const ownersCount = (
                await ctx.db
                    .query("orgMembers")
                    .withIndex("by_org", q => q.eq("orgId", args.orgId as import("./_generated/dataModel").Id<"organizations">))
                    .filter(q => q.eq(q.field("role"), "owner"))
                    .collect()
            ).length;

            if (ownersCount <= 1) {
                throw new Error("Cannot demote the last owner of the organization");
            }
        }

        await ctx.db.patch(args.memberId as import("./_generated/dataModel").Id<"orgMembers">, { role: args.newRole });
        return { success: true };
    }
);

export const removeMember = protectedMutation(
    {
        memberId: v.id("orgMembers"),
    },
    "admin",
    async (ctx, args, auth) => {
        const targetMember = await ctx.db.get(args.memberId as import("./_generated/dataModel").Id<"orgMembers">);
        if (!targetMember || targetMember.orgId !== args.orgId) {
            throw new Error("Member not found");
        }

        // Admins cannot remove owners
        if (targetMember.role === "owner" && auth.member!.role !== "owner") {
            throw new Error("Admins cannot remove owners");
        }

        // Prevent removing the last owner
        if (targetMember.role === "owner") {
            const ownersCount = (
                await ctx.db
                    .query("orgMembers")
                    .withIndex("by_org", q => q.eq("orgId", args.orgId as import("./_generated/dataModel").Id<"organizations">))
                    .filter(q => q.eq(q.field("role"), "owner"))
                    .collect()
            ).length;

            if (ownersCount <= 1) {
                throw new Error("Cannot remove the last owner of the organization");
            }
        }

        await ctx.db.delete(args.memberId as import("./_generated/dataModel").Id<"orgMembers">);
        return { success: true };
    }
);

export const createOrg = protectedMutation(
    {
        name: v.string(),
        slug: v.string(),
    },
    null,
    async (ctx, args, auth) => {
        // Enforce unique slug
        const existing = await ctx.db
            .query("organizations")
            .withIndex("by_slug", q => q.eq("slug", args.slug))
            .first();

        if (existing) {
            throw new Error("Organization with this URL slug already exists.");
        }

        const orgId = await ctx.db.insert("organizations", {
            name: args.name,
            slug: args.slug,
            ownerId: auth.user._id,
            plan: "free",
            createdAt: Date.now()
        });

        await ctx.db.insert("orgMembers", {
            orgId,
            userId: auth.user._id,
            role: "owner",
            joinedAt: Date.now()
        });

        return { orgId, slug: args.slug };
    }
);
