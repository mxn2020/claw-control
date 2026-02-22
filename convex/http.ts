import { httpRouter } from "convex/server";
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

// Webhook receiver for Stripe subscription events
http.route({
    path: "/stripe",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const signature = request.headers.get("stripe-signature") as string;
        if (!signature) {
            return new Response("Missing stripe-signature header", { status: 400 });
        }

        try {
            const body = await request.text();

            // TODO: In production, verify the webhook signature using the raw body
            // const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

            const event = JSON.parse(body);

            // Dispatch to an internal mutation to update the database
            await ctx.runMutation(internal.stripe_webhooks.handleEvent, {
                type: event.type,
                data: event.data.object,
            });

            return new Response("Webhook processed", { status: 200 });
        } catch (error: any) {
            console.error("Stripe webhook failed:", error);
            return new Response(`Webhook Error: ${error.message}`, { status: 400 });
        }
    }),
});

export default http;
