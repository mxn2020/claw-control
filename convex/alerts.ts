import { v } from "convex/values";
import { protectedMutation, protectedQuery } from "./custom_auth";

// Fetch all configured alert channels for an organization
export const list = protectedQuery(
    { orgId: v.id("organizations") },
    "operator",
    async (ctx, args) => {
        return await ctx.db
            .query("alertChannels")
            .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
            .collect();
    }
);

// Add a new alerting channel
export const create = protectedMutation(
    {
        orgId: v.id("organizations"),
        name: v.string(),
        type: v.union(v.literal("slack"), v.literal("pagerduty"), v.literal("email")),
        webhookUrl: v.optional(v.string()),
        emailAddress: v.optional(v.string()),
        events: v.array(v.union(
            v.literal("instance_down"),
            v.literal("agent_error"),
            v.literal("billing_alert"),
            v.literal("security_alert")
        )),
    },
    "admin", // Minimum admin role to configure incident response
    async (ctx, args, auth) => {
        const id = await ctx.db.insert("alertChannels", {
            orgId: args.orgId,
            name: args.name,
            type: args.type,
            webhookUrl: args.webhookUrl,
            emailAddress: args.emailAddress,
            events: args.events,
            active: true,
            createdAt: Date.now()
        });

        await ctx.db.insert("auditLogs", {
            orgId: args.orgId,
            userId: auth.user._id.toString(),
            action: "alert_channel_created",
            resourceType: "alertChannel",
            resourceId: id.toString(),
            createdAt: Date.now()
        });

        return id;
    }
);

// Remove an alert channel
export const remove = protectedMutation(
    {
        orgId: v.id("organizations"),
        channelId: v.id("alertChannels")
    },
    "admin",
    async (ctx, args, auth) => {
        const channel = await ctx.db.get(args.channelId as import("./_generated/dataModel").Id<"alertChannels">);
        if (!channel || channel.orgId !== args.orgId) {
            throw new Error("Channel not found");
        }

        await ctx.db.delete(args.channelId);

        await ctx.db.insert("auditLogs", {
            orgId: args.orgId,
            userId: auth.user._id.toString(),
            action: "alert_channel_removed",
            resourceType: "alertChannel",
            resourceId: args.channelId.toString(),
            createdAt: Date.now()
        });

        return { success: true };
    }
);

// Mock utility to fire an alert manually (e.g. testing)
export const testAlert = protectedMutation(
    {
        orgId: v.id("organizations"),
        channelId: v.id("alertChannels")
    },
    "operator",
    async (ctx, args) => {
        const channel = await ctx.db.get(args.channelId as import("./_generated/dataModel").Id<"alertChannels">);
        if (!channel || channel.orgId !== args.orgId) {
            throw new Error("Channel not found");
        }

        // MVP: In production, trigger a Node Action that runs fetch() to the webhook.
        // For local development, store a mock trace in the db
        await ctx.db.insert("auditLogs", {
            orgId: args.orgId,
            action: "alert_fired",
            resourceType: "alertChannel",
            resourceId: args.channelId.toString(),
            metadata: { type: channel.type, status: "mocked" },
            createdAt: Date.now()
        });

        return { success: true, mocked: true };
    }
);
