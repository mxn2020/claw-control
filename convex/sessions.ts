import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    orgId: v.optional(v.id("organizations")),
    agentId: v.optional(v.id("agents")),
    instanceId: v.optional(v.id("instances")),
  },
  handler: async (ctx, args) => {
    if (args.instanceId) {
      return await ctx.db
        .query("sessions")
        .withIndex("by_instance", (q) => q.eq("instanceId", args.instanceId!))
        .collect();
    }
    if (args.agentId) {
      return await ctx.db
        .query("sessions")
        .withIndex("by_agent", (q) => q.eq("agentId", args.agentId!))
        .collect();
    }
    if (args.orgId) {
      return await ctx.db
        .query("sessions")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId!))
        .collect();
    }
    return await ctx.db.query("sessions").collect();
  },
});

export const get = query({
  args: { id: v.id("sessions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getMessages = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();
  },
});

export const create = mutation({
  args: {
    orgId: v.id("organizations"),
    agentId: v.id("agents"),
    instanceId: v.id("instances"),
    channel: v.optional(v.string()),
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("sessions", {
      orgId: args.orgId,
      agentId: args.agentId,
      instanceId: args.instanceId,
      channel: args.channel,
      status: "active",
      title: args.title,
      messageCount: 0,
      startedAt: Date.now(),
    });
  },
});

export const addMessage = mutation({
  args: {
    sessionId: v.id("sessions"),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system"), v.literal("tool")),
    content: v.string(),
    tokens: v.optional(v.number()),
    timingMs: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", {
      sessionId: args.sessionId,
      role: args.role,
      content: args.content,
      tokens: args.tokens,
      timingMs: args.timingMs,
      createdAt: Date.now(),
    });

    const session = await ctx.db.get(args.sessionId);
    if (session) {
      await ctx.db.patch(args.sessionId, {
        messageCount: session.messageCount + 1,
        lastMessageAt: Date.now(),
      });
    }

    return messageId;
  },
});

export const close = mutation({
  args: {
    id: v.id("sessions"),
    status: v.optional(v.union(v.literal("closed"), v.literal("escalated"))),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status ?? "closed",
      closedAt: Date.now(),
    });
  },
});
