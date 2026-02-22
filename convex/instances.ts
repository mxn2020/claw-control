import { v } from "convex/values";
import { protectedMutation, protectedQuery, getTeamIdsForUser, hasPermission } from "./custom_auth";

export const list = protectedQuery(
  { orgId: v.id("organizations") },
  "viewer",
  async (ctx, args, auth) => {
    let instances = await ctx.db
      .query("instances")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .collect();

    // If they aren't an admin, filter by their team
    if (auth.member && !hasPermission(auth.member.role, "admin")) {
      const userTeams = await getTeamIdsForUser(ctx, args.orgId, auth.user._id);
      instances = instances.filter(i => !i.teamId || userTeams.includes(i.teamId));
    }

    return instances;
  }
);

export const get = protectedQuery(
  { id: v.id("instances") },
  "viewer",
  async (ctx, args, auth) => {
    const instance = (await ctx.db.get(args.id)) as any;
    if (!instance || (auth.orgId && instance.orgId !== auth.orgId)) return null;

    if (auth.member && !hasPermission(auth.member.role, "admin")) {
      if (instance.teamId) {
        const userTeams = await getTeamIdsForUser(ctx, instance.orgId, auth.user._id);
        if (!userTeams.includes(instance.teamId)) return null;
      }
    }

    return instance;
  }
);

export const create = protectedMutation(
  {
    orgId: v.id("organizations"),
    name: v.string(),
    provider: v.optional(v.string()),
    region: v.optional(v.string()),
    teamId: v.optional(v.id("teams")),
    tier: v.optional(v.string())
  },
  "admin", // Only admins can spin up instances
  async (ctx, args) => {
    return await ctx.db.insert("instances", {
      orgId: args.orgId,
      name: args.name,
      status: "provisioning",
      provider: args.provider,
      region: args.region,
      tier: args.tier,
      teamId: args.teamId,
      agentCount: 0,
      createdAt: Date.now(),
    });
  }
);

export const updateStatus = protectedMutation(
  {
    id: v.id("instances"),
    status: v.union(
      v.literal("online"),
      v.literal("offline"),
      v.literal("provisioning"),
      v.literal("error"),
      v.literal("quarantined")
    ),
  },
  "operator",
  async (ctx, args, auth) => {
    const inst = (await ctx.db.get(args.id)) as any;
    if (!inst) throw new Error("Not found");
    if (auth.member && !hasPermission(auth.member.role, "admin")) {
      if (inst.teamId) {
        const userTeams = await getTeamIdsForUser(ctx, inst.orgId, auth.user._id);
        if (!userTeams.includes(inst.teamId)) throw new Error("Permission Denied.");
      }
    }

    await ctx.db.patch(args.id, { status: args.status });
  }
);

export const update = protectedMutation(
  {
    id: v.id("instances"),
    name: v.optional(v.string()),
    provider: v.optional(v.string()),
    region: v.optional(v.string()),
    version: v.optional(v.string()),
    cpuUsage: v.optional(v.number()),
    memoryUsage: v.optional(v.number()),
    lastHeartbeat: v.optional(v.number()),
    teamId: v.optional(v.id("teams")),
    tier: v.optional(v.string()),
    config: v.optional(v.object({
      providers: v.optional(v.array(v.string())),
      defaultModel: v.optional(v.string()),
      sandboxMode: v.optional(v.boolean()),
    })),
  },
  "admin",
  async (ctx, args) => {
    const { id, ...fields } = args;
    const updates: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) updates[key] = value;
    }
    if (Object.keys(updates).length > 0) {
      await ctx.db.patch(id, updates);
    }
  }
);

export const remove = protectedMutation(
  { id: v.id("instances") },
  "admin",
  async (ctx, args) => {
    await ctx.db.delete(args.id);
  }
);

export const quarantine = protectedMutation(
  {
    id: v.id("instances"),
    reason: v.string(),
  },
  "operator", // Operators can quarantine
  async (ctx, args, auth) => {
    const instance = (await ctx.db.get(args.id)) as any;
    if (!instance) throw new Error("Instance not found");

    if (auth.member && !hasPermission(auth.member.role, "admin")) {
      if (instance.teamId) {
        const userTeams = await getTeamIdsForUser(ctx, instance.orgId, auth.user._id);
        if (!userTeams.includes(instance.teamId)) throw new Error("Permission Denied.");
      }
    }

    await ctx.db.patch(args.id, { status: "quarantined" });

    await ctx.db.insert("auditLogs", {
      orgId: instance.orgId,
      userId: auth.user._id.toString(),
      action: "quarantine_instance",
      resourceType: "instance",
      resourceId: instance._id,
      details: args.reason,
      createdAt: Date.now(),
    });
  }
);

export const unquarantine = protectedMutation(
  {
    id: v.id("instances"),
    reason: v.string(),
  },
  "operator",
  async (ctx, args, auth) => {
    const instance = (await ctx.db.get(args.id)) as any;
    if (!instance) throw new Error("Instance not found");

    if (auth.member && !hasPermission(auth.member.role, "admin")) {
      if (instance.teamId) {
        const userTeams = await getTeamIdsForUser(ctx, instance.orgId, auth.user._id);
        if (!userTeams.includes(instance.teamId)) throw new Error("Permission Denied.");
      }
    }

    await ctx.db.patch(args.id, { status: "offline" });

    await ctx.db.insert("auditLogs", {
      orgId: instance.orgId,
      userId: auth.user._id.toString(),
      action: "unquarantine_instance",
      resourceType: "instance",
      resourceId: instance._id,
      details: args.reason,
      createdAt: Date.now(),
    });
  }
);

export const pauseAll = protectedMutation(
  { orgId: v.id("organizations"), teamScope: v.optional(v.id("teams")) },
  "operator",
  async (ctx, args, auth) => {
    let instances = await ctx.db
      .query("instances")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .collect();

    if (args.teamScope) {
      instances = instances.filter(i => i.teamId === args.teamScope);
    }

    if (auth.member && !hasPermission(auth.member.role, "admin")) {
      const userTeams = await getTeamIdsForUser(ctx, args.orgId, auth.user._id);
      instances = instances.filter(i => !i.teamId || userTeams.includes(i.teamId));
    }

    let count = 0;
    for (const instance of instances) {
      if (instance.status !== "offline") {
        await ctx.db.patch(instance._id, { status: "offline" });
        count++;
      }
    }

    await ctx.db.insert("auditLogs", {
      orgId: args.orgId,
      userId: auth.user._id.toString(),
      action: "kill_switch_activated",
      resourceType: "fleet",
      details: `Paused ${count} instances`,
      createdAt: Date.now(),
    });
    return { paused: count };
  }
);

export const resumeAll = protectedMutation(
  { orgId: v.id("organizations"), teamScope: v.optional(v.id("teams")) },
  "operator",
  async (ctx, args, auth) => {
    let instances = await ctx.db
      .query("instances")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .collect();

    if (args.teamScope) {
      instances = instances.filter(i => i.teamId === args.teamScope);
    }

    if (auth.member && !hasPermission(auth.member.role, "admin")) {
      const userTeams = await getTeamIdsForUser(ctx, args.orgId, auth.user._id);
      instances = instances.filter(i => !i.teamId || userTeams.includes(i.teamId));
    }

    let count = 0;
    for (const instance of instances) {
      if (instance.status === "offline") {
        await ctx.db.patch(instance._id, { status: "online" });
        count++;
      }
    }

    await ctx.db.insert("auditLogs", {
      orgId: args.orgId,
      userId: auth.user._id.toString(),
      action: "kill_switch_deactivated",
      resourceType: "fleet",
      details: `Resumed ${count} instances`,
      createdAt: Date.now(),
    });
    return { resumed: count };
  }
);
