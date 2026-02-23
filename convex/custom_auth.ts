import { mutation, query, type QueryCtx, type MutationCtx } from "./_generated/server";
import { v } from "convex/values";

type Role = "owner" | "admin" | "operator" | "viewer";

// RBAC Hierarchy: Higher index = more permissions
const ROLE_HIERARCHY: Record<Role, number> = {
    viewer: 0,
    operator: 1,
    admin: 2,
    owner: 3,
};

export function hasPermission(userRole: string, requiredRole: Role): boolean {
    const userLevel = ROLE_HIERARCHY[userRole as Role] ?? -1;
    const requiredLevel = ROLE_HIERARCHY[requiredRole];
    return userLevel >= requiredLevel;
}

export async function getAuthContext(ctx: QueryCtx | MutationCtx, token?: string, orgId?: string) {
    if (!token) throw new Error("Not authenticated");

    const session = await ctx.db
        .query("userSessions")
        .withIndex("by_token", (q) => q.eq("token", token))
        .first();

    if (!session || session.expiresAt < Date.now()) {
        throw new Error("Session invalid or expired");
    }

    const user = await ctx.db.get(session.userId);
    if (!user) throw new Error("User not found");

    if (!orgId) {
        return { user, session };
    }

    const member = await ctx.db
        .query("orgMembers")
        .withIndex("by_org", (q) => q.eq("orgId", orgId as import("./_generated/dataModel").Id<"organizations">))
        .filter((q) => q.eq(q.field("userId"), user._id))
        .first();

    if (!member) throw new Error("User is not a member of this organization");

    const org = await ctx.db.get(orgId as import("./_generated/dataModel").Id<"organizations">);
    if (!org) throw new Error("Organization not found");

    if (org.requireMfa && !session.mfaVerified) {
        throw new Error("MFA_REQUIRED_FOR_ORG");
    }

    return { user, session, member, orgId };
}

export async function getTeamIdsForUser(ctx: QueryCtx | MutationCtx, orgId: string, userId: string): Promise<string[]> {
    const memberships = await ctx.db
        .query("teamMembers")
        .withIndex("by_org", (q) => q.eq("orgId", orgId as import("./_generated/dataModel").Id<"organizations">))
        .filter((q) => q.eq(q.field("userId"), userId))
        .collect();

    return memberships.map((m) => m.teamId);
}

// Wrapper for queries that require authentication and optional RBAC
export function protectedQuery<ArgsValidator extends Record<string, any>, R>(
    args: ArgsValidator,
    requiredRole: Role | null,
    handler: (ctx: QueryCtx, args: any, auth: { user: import("./_generated/dataModel").Doc<"users">, session: import("./_generated/dataModel").Doc<"userSessions">, member?: import("./_generated/dataModel").Doc<"orgMembers">, orgId?: string }) => Promise<R>
) {
    return query({
        args: {
            ...args,
            token: v.optional(v.string()),
            orgId: v.optional(v.string())
        },
        handler: async (ctx, args: any) => {
            const auth = await getAuthContext(ctx, args.token, args.orgId);

            if (requiredRole && auth.member) {
                if (!hasPermission(auth.member.role, requiredRole)) {
                    throw new Error(`Permission denied: Requires ${requiredRole} access.`);
                }
            }

            return handler(ctx, args, auth) as any;
        },
    });
}

// Wrapper for mutations that require authentication and optional RBAC
export function protectedMutation<ArgsValidator extends Record<string, any>, R>(
    args: ArgsValidator,
    requiredRole: Role | null,
    handler: (ctx: MutationCtx, args: any, auth: { user: import("./_generated/dataModel").Doc<"users">, session: import("./_generated/dataModel").Doc<"userSessions">, member?: import("./_generated/dataModel").Doc<"orgMembers">, orgId?: string }) => Promise<R>
) {
    return mutation({
        args: {
            ...args,
            token: v.optional(v.string()),
            orgId: v.optional(v.string())
        },
        handler: async (ctx, args: any) => {
            const auth = await getAuthContext(ctx, args.token, args.orgId);

            if (requiredRole && auth.member) {
                if (!hasPermission(auth.member.role, requiredRole)) {
                    throw new Error(`Permission denied: Requires ${requiredRole} access.`);
                }
            }

            return handler(ctx, args, auth) as any;
        },
    });
}

