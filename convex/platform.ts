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

export const getSecurityPosture = query({
  args: { orgId: v.optional(v.id("organizations")) },
  handler: async (ctx, args) => {
    const instances = args.orgId
      ? await ctx.db.query("instances").withIndex("by_org", (q) => q.eq("orgId", args.orgId!)).collect()
      : await ctx.db.query("instances").collect();
    const agents = args.orgId
      ? await ctx.db.query("agents").withIndex("by_org", (q) => q.eq("orgId", args.orgId!)).collect()
      : await ctx.db.query("agents").collect();
    const skills = args.orgId
      ? await ctx.db.query("skills").withIndex("by_org", (q) => q.eq("orgId", args.orgId!)).collect()
      : await ctx.db.query("skills").collect();
    const auditLogs = await ctx.db.query("auditLogs").order("desc").take(200);

    const quarantinedInstances = instances.filter((i) => i.status === "quarantined");
    const quarantinedAgents = agents.filter((a) => a.status === "quarantined");
    const highRiskSkills = skills.filter((s) => s.riskLevel === "high" || s.riskLevel === "critical");
    const securityEvents = auditLogs.filter((l) =>
      l.action.includes("quarantine") ||
      l.action.includes("suspend") ||
      l.action.includes("security") ||
      l.action.includes("block") ||
      l.action.includes("isolate")
    );

    // Compute posture score: start at 100, deduct for issues
    let score = 100;
    score -= quarantinedInstances.length * 10;
    score -= quarantinedAgents.length * 5;
    score -= highRiskSkills.length * 3;
    score -= Math.min(securityEvents.length, 10) * 2;
    score = Math.max(0, Math.min(100, score));

    const scoreLabel = score >= 80 ? "Good" : score >= 60 ? "Fair" : "Poor";
    const scoreColor = score >= 80 ? "emerald" : score >= 60 ? "amber" : "red";

    return {
      score,
      scoreLabel,
      scoreColor,
      totalInstances: instances.length,
      quarantinedInstances: quarantinedInstances.map((i) => ({
        _id: i._id,
        name: i.name,
        status: i.status,
        provider: i.provider,
        region: i.region,
        createdAt: i.createdAt,
      })),
      quarantinedAgents: quarantinedAgents.map((a) => ({
        _id: a._id,
        name: a.name,
        status: a.status,
        instanceId: a.instanceId,
        createdAt: a.createdAt,
      })),
      highRiskSkills: highRiskSkills.map((s) => ({
        _id: s._id,
        name: s.name,
        riskLevel: s.riskLevel,
        isEnabled: s.isEnabled,
      })),
      recentSecurityEvents: securityEvents.slice(0, 20).map((e) => ({
        _id: e._id,
        action: e.action,
        userId: e.userId,
        resourceId: e.resourceId,
        details: e.details,
        createdAt: e.createdAt,
      })),
      totalAgents: agents.length,
      totalSkills: skills.length,
      issueCount:
        quarantinedInstances.length +
        quarantinedAgents.length +
        highRiskSkills.length,
    };
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
