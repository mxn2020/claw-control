import { v } from "convex/values";
import { protectedMutation, protectedQuery } from "./custom_auth";
import { mutation } from "./_generated/server";

export const getCredentials = protectedQuery(
    {},
    null,
    async (ctx, args, auth) => {
        return await ctx.db
            .query("webAuthnCredentials")
            .withIndex("by_user", (q) => q.eq("userId", auth.user._id))
            .collect();
    }
);

// Mock implementation wrapper representing registering a WebAuthn device
export const registerDevice = protectedMutation(
    {
        credentialId: v.string(),
        publicKey: v.string(),
        deviceType: v.string(),
    },
    null,
    async (ctx, args, auth) => {
        const id = await ctx.db.insert("webAuthnCredentials", {
            userId: auth.user._id,
            credentialId: args.credentialId,
            publicKey: args.publicKey,
            counter: 0,
            deviceType: args.deviceType,
            backedUp: false,
            createdAt: Date.now(),
        });

        // Also enable MFA on the user record if this is their first device
        await ctx.db.patch(auth.user._id, { mfaEnabled: true });

        // Audit Log
        if (auth.orgId) {
            await ctx.db.insert("auditLogs", {
                orgId: auth.orgId as import("./_generated/dataModel").Id<"organizations">,
                userId: auth.user._id.toString(),
                action: "webauthn_registered",
                resourceType: "credential",
                resourceId: id.toString(),
                createdAt: Date.now()
            });
        }

        return { success: true };
    }
);

// Mock wrapper to delete a WebAuthn credential
export const removeDevice = protectedMutation(
    { credentialId: v.id("webAuthnCredentials") },
    null,
    async (ctx, args, auth) => {
        const cred = await ctx.db.get(args.credentialId as import("./_generated/dataModel").Id<"webAuthnCredentials">);
        if (!cred || cred.userId !== auth.user._id) {
            throw new Error("Credential not found");
        }

        await ctx.db.delete(args.credentialId as import("./_generated/dataModel").Id<"webAuthnCredentials">);

        // Audit log
        if (auth.orgId) {
            await ctx.db.insert("auditLogs", {
                orgId: auth.orgId as import("./_generated/dataModel").Id<"organizations">,
                userId: auth.user._id.toString(),
                action: "webauthn_removed",
                resourceType: "credential",
                resourceId: args.credentialId,
                createdAt: Date.now()
            });
        }

        return { success: true };
    }
);

export const verifyWebAuthn = mutation({
    args: {
        userId: v.id("users"),
        credentialId: v.string(),
        authenticatorData: v.string(),
        clientDataJSON: v.string(),
        signature: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);
        if (!user || !user.mfaEnabled) throw new Error("Invalid request");

        const cred = await ctx.db
            .query("webAuthnCredentials")
            .withIndex("by_credential", (q) => q.eq("credentialId", args.credentialId))
            .filter((q) => q.eq(q.field("userId"), user._id))
            .first();

        if (!cred) throw new Error("Invalid credential");

        // MVP MOCK: In production, verify the signature with @simplewebauthn/server here

        // Generate token
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let token = "";
        for (let i = 0; i < 48; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        await ctx.db.insert("userSessions", {
            userId: user._id,
            token,
            expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
            mfaVerified: true,
            createdAt: Date.now(),
        });

        await ctx.db.insert("auditLogs", {
            userId: user._id.toString(),
            action: "webauthn_login",
            resourceType: "user",
            resourceId: user._id.toString(),
            createdAt: Date.now()
        });

        return { token, userId: user._id };
    }
});
