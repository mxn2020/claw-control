import { v } from "convex/values";
import { protectedMutation, protectedQuery, getTeamIdsForUser, hasPermission } from "./custom_auth";

export const list = protectedQuery(
  {
    orgId: v.optional(v.id("organizations")),
    instanceId: v.optional(v.id("instances")),
  },
  "viewer",
  async (ctx, args, auth) => {
    let agents = [];
    if (args.instanceId) {
      agents = await ctx.db
        .query("agents")
        .withIndex("by_instance", (q) => q.eq("instanceId", args.instanceId!))
        .collect();
    } else if (args.orgId) {
      agents = await ctx.db
        .query("agents")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId!))
        .collect();
    } else {
      agents = await ctx.db.query("agents").collect();
    }

    if (auth.orgId) {
      agents = agents.filter((a: any) => a.orgId === auth.orgId);
    }

    if (auth.member && !hasPermission(auth.member.role, "admin")) {
      const userTeams = await getTeamIdsForUser(ctx, auth.orgId!, auth.user._id);
      agents = agents.filter((a: any) => !a.teamId || userTeams.includes(a.teamId));
    }

    return agents;
  }
);

export const get = protectedQuery(
  { id: v.id("agents") },
  "viewer",
  async (ctx, args, auth) => {
    const agent = (await ctx.db.get(args.id)) as any;
    if (!agent || (auth.orgId && agent.orgId !== auth.orgId)) return null;

    if (auth.member && !hasPermission(auth.member.role, "admin")) {
      if (agent.teamId) {
        const userTeams = await getTeamIdsForUser(ctx, agent.orgId, auth.user._id);
        if (!userTeams.includes(agent.teamId)) return null;
      }
    }
    return agent;
  }
);

export const create = protectedMutation(
  {
    orgId: v.id("organizations"),
    instanceId: v.id("instances"),
    name: v.string(),
    model: v.optional(v.string()),
    teamId: v.optional(v.id("teams"))
  },
  "admin",
  async (ctx, args, _auth) => {
    const agentId = await ctx.db.insert("agents", {
      orgId: args.orgId,
      instanceId: args.instanceId,
      name: args.name,
      status: "idle",
      model: args.model,
      teamId: args.teamId,
      sessionCount: 0,
      createdAt: Date.now(),
    } as any);

    const instance = (await ctx.db.get(args.instanceId)) as any;
    if (instance) {
      await ctx.db.patch(args.instanceId, {
        agentCount: instance.agentCount + 1,
      });
    }

    return agentId;
  }
);

export const updateStatus = protectedMutation(
  {
    id: v.id("agents"),
    status: v.union(
      v.literal("active"),
      v.literal("idle"),
      v.literal("error"),
      v.literal("paused"),
      v.literal("quarantined")
    ),
  },
  "operator",
  async (ctx, args, auth) => {
    const agent = (await ctx.db.get(args.id)) as any;
    if (!agent) throw new Error("Not found");
    if (auth.member && !hasPermission(auth.member.role, "admin")) {
      if (agent.teamId) {
        const userTeams = await getTeamIdsForUser(ctx, agent.orgId, auth.user._id);
        if (!userTeams.includes(agent.teamId)) throw new Error("Permission Denied.");
      }
    }
    await ctx.db.patch(args.id, { status: args.status });
  }
);

export const updatePersonality = protectedMutation(
  {
    id: v.id("agents"),
    personality: v.object({
      soulMd: v.optional(v.string()),
      agentsMd: v.optional(v.string()),
      userMd: v.optional(v.string()),
    }),
  },
  "admin",
  async (ctx, args) => {
    await ctx.db.patch(args.id, { personality: args.personality });
  }
);

export const update = protectedMutation(
  {
    id: v.id("agents"),
    model: v.optional(v.string()),
    teamId: v.optional(v.id("teams")),
    toolsConfig: v.optional(v.object({
      allowed: v.optional(v.array(v.string())),
      denied: v.optional(v.array(v.string())),
      sandboxMode: v.optional(v.boolean()),
    })),
    channelBindings: v.optional(v.array(v.string())),
  },
  "admin",
  async (ctx, args) => {
    const { id, ...fields } = args;
    const patch: Record<string, unknown> = {};
    if (fields.model !== undefined) patch.model = fields.model;
    if (fields.teamId !== undefined) (patch as any).teamId = fields.teamId;
    if (fields.toolsConfig !== undefined) patch.toolsConfig = fields.toolsConfig;
    if (fields.channelBindings !== undefined) patch.channelBindings = fields.channelBindings;
    await ctx.db.patch(id, patch);
  }
);

export const remove = protectedMutation(
  { id: v.id("agents") },
  "admin",
  async (ctx, args) => {
    const agent = (await ctx.db.get(args.id)) as any;
    if (agent) {
      const instance = (await ctx.db.get(agent.instanceId)) as any;
      if (instance) {
        await ctx.db.patch(agent.instanceId, {
          agentCount: Math.max(0, instance.agentCount - 1),
        });
      }
    }
    await ctx.db.delete(args.id);
  }
);

export const quarantine = protectedMutation(
  {
    id: v.id("agents"),
    reason: v.string(),
  },
  "operator",
  async (ctx, args, auth) => {
    const agent = (await ctx.db.get(args.id)) as any;
    if (!agent) throw new Error("Agent not found");
    if (auth.member && !hasPermission(auth.member.role, "admin")) {
      if (agent.teamId) {
        const userTeams = await getTeamIdsForUser(ctx, agent.orgId, auth.user._id);
        if (!userTeams.includes(agent.teamId)) throw new Error("Permission Denied.");
      }
    }

    await ctx.db.patch(args.id, { status: "quarantined" });

    await ctx.db.insert("auditLogs", {
      orgId: agent.orgId,
      userId: auth.user._id.toString(),
      action: "quarantine_agent",
      resourceType: "agent",
      resourceId: agent._id,
      details: args.reason,
      createdAt: Date.now(),
    });
  }
);

export const unquarantine = protectedMutation(
  {
    id: v.id("agents"),
    reason: v.string(),
  },
  "operator",
  async (ctx, args, auth) => {
    const agent = (await ctx.db.get(args.id)) as any;
    if (!agent) throw new Error("Agent not found");
    if (auth.member && !hasPermission(auth.member.role, "admin")) {
      if (agent.teamId) {
        const userTeams = await getTeamIdsForUser(ctx, agent.orgId, auth.user._id);
        if (!userTeams.includes(agent.teamId)) throw new Error("Permission Denied.");
      }
    }

    await ctx.db.patch(args.id, { status: "paused" });

    await ctx.db.insert("auditLogs", {
      orgId: agent.orgId,
      userId: auth.user._id.toString(),
      action: "unquarantine_agent",
      resourceType: "agent",
      resourceId: agent._id,
      details: args.reason,
      createdAt: Date.now(),
    });
  }
);

export const pauseAll = protectedMutation(
  { orgId: v.id("organizations"), teamScope: v.optional(v.id("teams")) },
  "operator",
  async (ctx, args, auth) => {
    let agents = await ctx.db
      .query("agents")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .collect();

    if (args.teamScope) {
      agents = agents.filter((a: any) => a.teamId === args.teamScope);
    }

    if (auth.member && !hasPermission(auth.member.role, "admin")) {
      const userTeams = await getTeamIdsForUser(ctx, args.orgId, auth.user._id);
      agents = agents.filter((a: any) => !a.teamId || userTeams.includes(a.teamId));
    }

    for (const agent of agents) {
      if (agent.status !== "paused") {
        await ctx.db.patch(agent._id, { status: "paused" });
      }
    }
    return { paused: agents.length };
  }
);

export const resumeAll = protectedMutation(
  { orgId: v.id("organizations"), teamScope: v.optional(v.id("teams")) },
  "operator",
  async (ctx, args, auth) => {
    let agents = await ctx.db
      .query("agents")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .collect();

    if (args.teamScope) {
      agents = agents.filter((a: any) => a.teamId === args.teamScope);
    }

    if (auth.member && !hasPermission(auth.member.role, "admin")) {
      const userTeams = await getTeamIdsForUser(ctx, args.orgId, auth.user._id);
      agents = agents.filter((a: any) => !a.teamId || userTeams.includes(a.teamId));
    }

    for (const agent of agents) {
      if (agent.status === "paused") {
        await ctx.db.patch(agent._id, { status: "idle" });
      }
    }
    return { resumed: agents.length };
  }
);
