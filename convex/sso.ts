import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { protectedMutation, protectedQuery } from "./custom_auth";

// Public endpoint: check if an email domain maps to an SSO connection
export const discoverSso = query({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        const domain = args.email.split("@")[1]?.toLowerCase();
        if (!domain) return null;

        const connection = await ctx.db
            .query("ssoConnections")
            .withIndex("by_domain", (q) => q.eq("domain", domain))
            .first();

        if (connection && connection.active) {
            return {
                provider: connection.provider,
                ssoUrl: connection.ssoUrl,
            };
        }
        return null;
    }
});

// Admin endpoint: configure SSO for an organization
export const configureSso = protectedMutation(
    {
        orgId: v.id("organizations"),
        provider: v.union(v.literal("saml"), v.literal("oidc")),
        domain: v.string(),
        issuer: v.string(),
        clientId: v.optional(v.string()),
        clientSecret: v.optional(v.string()),
        ssoUrl: v.optional(v.string()),
        x509Certificate: v.optional(v.string()),
        active: v.boolean(),
    },
    // Only Owners can configure SSO
    "owner",
    async (ctx, args) => {
        // Ensure no other active connection holds this domain
        const existing = await ctx.db
            .query("ssoConnections")
            .withIndex("by_domain", (q) => q.eq("domain", args.domain))
            .first();

        if (existing && existing.orgId !== args.orgId) {
            throw new Error(`Domain ${args.domain} is already registered by another organization.`);
        }

        // Upsert connection
        const current = await ctx.db
            .query("ssoConnections")
            .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
            .first();

        if (current) {
            // Update
            await ctx.db.patch(current._id, {
                provider: args.provider,
                domain: args.domain,
                issuer: args.issuer,
                clientId: args.clientId,
                clientSecret: args.clientSecret,
                ssoUrl: args.ssoUrl,
                x509Certificate: args.x509Certificate,
                active: args.active,
            });
        } else {
            // Insert
            await ctx.db.insert("ssoConnections", {
                orgId: args.orgId,
                provider: args.provider,
                domain: args.domain,
                issuer: args.issuer,
                clientId: args.clientId,
                clientSecret: args.clientSecret,
                ssoUrl: args.ssoUrl,
                x509Certificate: args.x509Certificate,
                active: args.active,
                createdAt: Date.now(),
            });
        }

        // Audit log
        await ctx.db.insert("auditLogs", {
            orgId: args.orgId,
            action: "sso_configured",
            resourceType: "organization",
            resourceId: args.orgId,
            createdAt: Date.now(),
        });

        return { success: true };
    }
);

// View SSO configs
export const getSsoConfig = protectedQuery(
    { orgId: v.id("organizations") },
    "admin",
    async (ctx, args) => {
        return await ctx.db
            .query("ssoConnections")
            .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
            .first();
    }
);

export const ssoCallback = mutation({
    args: {
        domain: v.string(),
        email: v.string(),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const connection = await ctx.db
            .query("ssoConnections")
            .withIndex("by_domain", (q) => q.eq("domain", args.domain))
            .first();

        if (!connection || !connection.active) {
            throw new Error("SSO connection not found or inactive.");
        }

        // Find or create user
        let user = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase()))
            .first();

        if (!user) {
            const userId = await ctx.db.insert("users", {
                email: args.email.toLowerCase(),
                name: args.name,
                passwordHash: "SSO_PROVIDED",
                createdAt: Date.now(),
            });
            user = await ctx.db.get(userId);
        }

        // Find or create org membership
        const existingMember = await ctx.db
            .query("orgMembers")
            .withIndex("by_org", (q) => q.eq("orgId", connection.orgId))
            .filter((q) => q.eq(q.field("userId"), user!._id.toString()))
            .first();

        if (!existingMember) {
            await ctx.db.insert("orgMembers", {
                orgId: connection.orgId,
                userId: user!._id.toString(),
                role: "viewer", // Default SSO role
                joinedAt: Date.now(),
            });
        }

        // Generate token
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let token = "";
        for (let i = 0; i < 48; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        await ctx.db.insert("userSessions", {
            userId: user!._id,
            token,
            expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
            mfaVerified: true, // SSO implies MFA handled by IdP
            createdAt: Date.now(),
        });

        // Audit Log
        await ctx.db.insert("auditLogs", {
            orgId: connection.orgId,
            userId: user!._id.toString(),
            action: "sso_login",
            resourceType: "user",
            resourceId: user!._id.toString(),
            createdAt: Date.now(),
        });

        return { token, userId: user!._id, orgId: connection.orgId };
    },
});
