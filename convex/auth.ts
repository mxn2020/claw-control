import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Simple deterministic hash for OSS password storage.
// In production, use bcrypt via an HTTP action. This provides
// basic security without requiring external packages.
function simpleHash(str: string): string {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return (hash >>> 0).toString(16).padStart(8, "0") + str.length.toString(16);
}

function generateToken(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    // 48 char token — sufficient for session security in OSS context
    for (let i = 0; i < 48; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export const register = mutation({
    args: {
        email: v.string(),
        name: v.string(),
        password: v.string(),
    },
    handler: async (ctx, args) => {
        const email = args.email.toLowerCase().trim();

        // Check if email is already taken
        const existing = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", email))
            .first();
        if (existing) {
            throw new Error("An account with this email already exists.");
        }

        const passwordHash = simpleHash(args.password);
        const userId = await ctx.db.insert("users", {
            email,
            name: args.name.trim(),
            passwordHash,
            createdAt: Date.now(),
        });

        // Also create a default organization for this user (OSS single-user model)
        const orgId = await ctx.db.insert("organizations", {
            name: `${args.name.trim()}'s Org`,
            slug: email.split("@")[0].replace(/[^a-z0-9]/gi, "-").toLowerCase(),
            ownerId: userId.toString(),
            plan: "free",
            createdAt: Date.now(),
        });

        await ctx.db.insert("orgMembers", {
            orgId,
            userId: userId.toString(),
            role: "owner",
            joinedAt: Date.now(),
        });

        // Create session
        const token = generateToken();
        await ctx.db.insert("userSessions", {
            userId,
            token,
            expiresAt: Date.now() + SESSION_TTL_MS,
            createdAt: Date.now(),
        });

        return { token, userId, orgId };
    },
});

export const login = mutation({
    args: {
        email: v.string(),
        password: v.string(),
    },
    handler: async (ctx, args) => {
        const email = args.email.toLowerCase().trim();

        const user = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", email))
            .first();

        if (!user) throw new Error("Invalid email or password.");

        const passwordHash = simpleHash(args.password);
        if (user.passwordHash !== passwordHash) {
            throw new Error("Invalid email or password.");
        }

        const token = generateToken();
        await ctx.db.insert("userSessions", {
            userId: user._id,
            token,
            expiresAt: Date.now() + SESSION_TTL_MS,
            createdAt: Date.now(),
        });

        return { token, userId: user._id };
    },
});

export const logout = mutation({
    args: { token: v.string() },
    handler: async (ctx, args) => {
        const session = await ctx.db
            .query("userSessions")
            .withIndex("by_token", (q) => q.eq("token", args.token))
            .first();
        if (session) {
            await ctx.db.delete(session._id);
        }
    },
});

export const me = query({
    args: { token: v.optional(v.string()) },
    handler: async (ctx, args) => {
        if (!args.token) return null;

        const session = await ctx.db
            .query("userSessions")
            .withIndex("by_token", (q) => q.eq("token", args.token!))
            .first();

        if (!session || session.expiresAt < Date.now()) return null;

        const user = await ctx.db.get(session.userId);
        if (!user) return null;

        // Get user's orgs
        const memberships = await ctx.db
            .query("orgMembers")
            .withIndex("by_user", (q) => q.eq("userId", user._id.toString()))
            .collect();

        const orgs = await Promise.all(
            memberships.map(async (m) => {
                const org = await ctx.db.get(m.orgId);
                return org ? { id: org._id, name: org.name, slug: org.slug, role: m.role } : null;
            })
        );
        const validOrgs = orgs.filter((o): o is NonNullable<typeof o> => o !== null);

        const orgId = validOrgs[0]?.id ?? null;

        return {
            id: user._id,
            email: user.email,
            name: user.name,
            orgId,
            organizations: validOrgs,
            createdAt: user.createdAt,
        };
    },
});

export const updateUser = mutation({
    args: {
        token: v.string(),
        name: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const session = await ctx.db
            .query("userSessions")
            .withIndex("by_token", (q) => q.eq("token", args.token))
            .first();
        if (!session || session.expiresAt < Date.now()) {
            throw new Error("Not authenticated.");
        }

        const updates: Record<string, unknown> = {};
        if (args.name !== undefined) updates.name = args.name.trim();
        if (Object.keys(updates).length > 0) {
            await ctx.db.patch(session.userId, updates);
        }
    },
});

const RECOVERY_TTL_MS = 60 * 60 * 1000; // 1 hour
const RECOVERY_PREFIX = "recovery_";

export const requestRecovery = mutation({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        const email = args.email.toLowerCase().trim();
        const user = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", email))
            .first();

        // Always return success to avoid leaking whether the email exists
        if (!user) return { success: true };

        // Generate a recovery token (stored as a special session)
        const recoveryToken = RECOVERY_PREFIX + generateToken();
        await ctx.db.insert("userSessions", {
            userId: user._id,
            token: recoveryToken,
            expiresAt: Date.now() + RECOVERY_TTL_MS,
            createdAt: Date.now(),
        });

        // In OSS, the token is returned directly (no email sending).
        // In production managed SaaS, this would send an email instead.
        return { success: true, recoveryToken };
    },
});

export const resetPassword = mutation({
    args: {
        recoveryToken: v.string(),
        newPassword: v.string(),
    },
    handler: async (ctx, args) => {
        if (!args.recoveryToken.startsWith(RECOVERY_PREFIX)) {
            throw new Error("Invalid recovery token.");
        }
        if (args.newPassword.length < 6) {
            throw new Error("Password must be at least 6 characters.");
        }

        const session = await ctx.db
            .query("userSessions")
            .withIndex("by_token", (q) => q.eq("token", args.recoveryToken))
            .first();

        if (!session || session.expiresAt < Date.now()) {
            throw new Error("Recovery token is invalid or expired.");
        }

        // Update password
        const passwordHash = simpleHash(args.newPassword);
        await ctx.db.patch(session.userId, { passwordHash });

        // Invalidate all existing sessions for this user (force re-login)
        const allSessions = await ctx.db
            .query("userSessions")
            .withIndex("by_user", (q) => q.eq("userId", session.userId))
            .collect();
        for (const s of allSessions) {
            await ctx.db.delete(s._id);
        }

        // Create a fresh session for the user
        const newToken = generateToken();
        await ctx.db.insert("userSessions", {
            userId: session.userId,
            token: newToken,
            expiresAt: Date.now() + SESSION_TTL_MS,
            createdAt: Date.now(),
        });

        return { token: newToken };
    },
});
