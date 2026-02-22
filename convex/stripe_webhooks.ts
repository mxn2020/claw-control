import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const handleEvent = internalMutation({
    args: {
        type: v.string(),
        data: v.any(),
    },
    handler: async (ctx, args) => {
        const { type, data } = args;

        console.log(`[Stripe Webhook] Processing event: ${type}`);

        if (type === "checkout.session.completed") {
            // A user successfully subscribed
            const customerId = data.customer;
            const subscriptionId = data.subscription;
            // The clientReferenceId is passed from the checkout creation
            const orgId = data.client_reference_id as import("./_generated/dataModel").Id<"organizations">;

            if (orgId) {
                await ctx.db.patch(orgId, {
                    stripeCustomerId: customerId,
                    stripeSubscriptionId: subscriptionId,
                    plan: "pro", // Default upgrade
                });
            }
        }

        if (type === "customer.subscription.deleted" || type === "customer.subscription.canceled") {
            const customerId = data.customer as string;

            const org = await ctx.db
                .query("organizations")
                .withIndex("by_owner") // No customer fallback, ideally query by customerId directly
                .filter(q => q.eq(q.field("stripeCustomerId"), customerId))
                .first();

            if (org) {
                await ctx.db.patch(org._id, {
                    plan: "free",
                    stripeSubscriptionId: undefined,
                });
            }
        }
    }
});
