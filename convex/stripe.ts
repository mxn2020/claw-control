import { v } from "convex/values";
import { protectedMutation, protectedQuery } from "./custom_auth";

// TODO: Replace with official Stripe Node library
// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { ... });

export const createCheckoutSession = protectedMutation(
    {
        orgId: v.id("organizations"),
        priceId: v.string(),
    },
    // Only owners can modify billing
    "owner",
    async (ctx, args, _auth) => {
        const org = await ctx.db.get(args.orgId as import("./_generated/dataModel").Id<"organizations">);
        if (!org) throw new Error("Organization not found");

        /* Mock Stripe Implementation */
        console.log(`[Stripe Mock] Creating checkout session for org ${org.name} (${args.orgId}) on price ${args.priceId}`);
        const mockUrl = `https://checkout.stripe.com/pay/mock_${args.orgId}_${Date.now()}`;

        return { url: mockUrl };
    }
);

export const createPortalSession = protectedMutation(
    {
        orgId: v.id("organizations"),
    },
    "owner",
    async (ctx, args, _auth) => {
        const org = await ctx.db.get(args.orgId as import("./_generated/dataModel").Id<"organizations">);
        if (!org || !org.stripeCustomerId) {
            throw new Error("No active billing profile found for this organization");
        }

        /* Mock Stripe Implementation */
        console.log(`[Stripe Mock] Creating portal session for customer ${org.stripeCustomerId}`);
        const mockUrl = `https://billing.stripe.com/p/session/mock_${org.stripeCustomerId}`;

        return { url: mockUrl };
    }
);

export const getSubscription = protectedQuery(
    {
        orgId: v.id("organizations"),
    },
    "viewer",
    async (ctx, args, _auth) => {
        const org = await ctx.db.get(args.orgId as import("./_generated/dataModel").Id<"organizations">);
        if (!org) throw new Error("Organization not found");

        return {
            plan: org.plan,
            status: org.stripeSubscriptionId ? "active" : "incomplete",
            billingEmail: org.billingEmail,
        };
    }
);
