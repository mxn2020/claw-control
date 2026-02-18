import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { orgId: v.optional(v.id("organizations")) },
  handler: async (ctx, args) => {
    if (args.orgId) {
      return await ctx.db
        .query("skills")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId!))
        .collect();
    }
    return await ctx.db.query("skills").collect();
  },
});

export const listChannels = query({
  args: { orgId: v.optional(v.id("organizations")) },
  handler: async (ctx, args) => {
    if (args.orgId) {
      return await ctx.db
        .query("channels")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId!))
        .collect();
    }
    return await ctx.db.query("channels").collect();
  },
});

export const listAuditLogs = query({
  args: {
    orgId: v.optional(v.id("organizations")),
  },
  handler: async (ctx, args) => {
    if (args.orgId) {
      return await ctx.db
        .query("auditLogs")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId!))
        .order("desc")
        .take(100);
    }
    return await ctx.db.query("auditLogs").order("desc").take(100);
  },
});

export const getStats = query({
  args: { orgId: v.optional(v.id("organizations")) },
  handler: async (ctx, args) => {
    const instances = args.orgId
      ? await ctx.db.query("instances").withIndex("by_org", (q) => q.eq("orgId", args.orgId!)).collect()
      : await ctx.db.query("instances").collect();
    const agents = args.orgId
      ? await ctx.db.query("agents").withIndex("by_org", (q) => q.eq("orgId", args.orgId!)).collect()
      : await ctx.db.query("agents").collect();
    const sessions = args.orgId
      ? await ctx.db.query("sessions").withIndex("by_org", (q) => q.eq("orgId", args.orgId!)).collect()
      : await ctx.db.query("sessions").collect();
    const skills = args.orgId
      ? await ctx.db.query("skills").withIndex("by_org", (q) => q.eq("orgId", args.orgId!)).collect()
      : await ctx.db.query("skills").collect();

    return {
      totalInstances: instances.length,
      onlineInstances: instances.filter((i) => i.status === "online").length,
      totalAgents: agents.length,
      activeAgents: agents.filter((a) => a.status === "active").length,
      totalSessions: sessions.length,
      activeSessions: sessions.filter((s) => s.status === "active").length,
      totalSkills: skills.length,
    };
  },
});
