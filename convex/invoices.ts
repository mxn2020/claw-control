import { protectedQuery } from "./custom_auth";
import { v } from "convex/values";

export const list = protectedQuery(
    {
        orgId: v.id("organizations"),
    },
    // Viewers can see invoices
    "viewer",
    async (ctx, args, _auth) => {
        // We only allow fetching invoices for the user's active org context
        const invoices = await ctx.db
            .query("invoices")
            .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
            .order("desc")
            .collect();

        return invoices;
    }
);
