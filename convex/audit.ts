import { v } from "convex/values";
import { protectedMutation, protectedQuery } from "./custom_auth";

// Public-facing queries to export SIEM logs for an org
export const list = protectedQuery(
    {
        orgId: v.id("organizations"),
        limit: v.optional(v.number()),
        cursor: v.optional(v.string()),
    },
    "admin", // Minimum role to view audit logs
    async (ctx, args) => {
        return await ctx.db
            .query("auditLogs")
            .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
            .order("desc")
            .paginate({ cursor: args.cursor ?? null, numItems: args.limit ?? 100 });
    }
);

// Mock implementation of a SIEM Push stream
// In production, this would be an http endpoint or node action pushing to Splunk/Datadog HEC
export const exportBundle = protectedMutation(
    {
        orgId: v.id("organizations"),
        timeRangeMs: v.number() // How far back to export
    },
    "owner",
    async (ctx, args) => {
        const threshold = Date.now() - args.timeRangeMs;
        const logs = await ctx.db
            .query("auditLogs")
            .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
            .order("desc")
            .collect();

        const filtered = logs.filter(l => l.createdAt >= threshold);

        // Audit log the export itself!
        await ctx.db.insert("auditLogs", {
            orgId: args.orgId,
            action: "siem_export_generated",
            resourceType: "system",
            metadata: { count: filtered.length },
            createdAt: Date.now()
        });

        // For MVP, we'd just return the payload or a presigned URL to a CSV blob
        return {
            success: true,
            downloadUrl: "mock://aws/s3/audit_logs.json" // mocked external link
        };
    }
);
