import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("organizations").collect();
  },
});

export const get = query({
  args: { id: v.id("organizations") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("organizations")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    ownerId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("organizations", {
      name: args.name,
      slug: args.slug,
      ownerId: args.ownerId,
      plan: "free",
      createdAt: Date.now(),
    });
  },
});

export const listMembers = query({
  args: { orgId: v.id("organizations") },
  handler: async (ctx, args) => {
    const members = await ctx.db
      .query("orgMembers")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .collect();

    // Map user info (Since users are internal auth DB, we do an async mapping)
    // Note: In OSS mode, users is a table. We can join on userId -> users._id
    return await Promise.all(
      members.map(async (m) => {
        let name = "Unknown";
        let email = "unknown@example.com";
        try {
          // If userId matches the internal users table format
          const user = (await ctx.db.get(m.userId as any)) as any;
          if (user) {
            name = user.name;
            email = user.email;
          }
        } catch (e) {
          // Ignore parse errors for mock/external users
        }

        return {
          id: m._id,
          userId: m.userId,
          role: m.role,
          joinedAt: m.joinedAt,
          name,
          email,
        };
      })
    );
  },
});

export const updateRole = mutation({
  args: {
    memberId: v.id("orgMembers"),
    role: v.union(v.literal("owner"), v.literal("admin"), v.literal("member"), v.literal("viewer")),
  },
  handler: async (ctx, args) => {
    // In a real app we'd check if the caller is an owner/admin
    await ctx.db.patch(args.memberId, { role: args.role });
  },
});

export const removeMember = mutation({
  args: { memberId: v.id("orgMembers") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.memberId);
  },
});

export const inviteMember = mutation({
  args: {
    orgId: v.id("organizations"),
    email: v.string(),
    role: v.union(v.literal("owner"), v.literal("admin"), v.literal("member"), v.literal("viewer")),
  },
  handler: async (ctx, args) => {
    // Basic mock implementation for OSS:
    // If the user already exists, add them directly.
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase()))
      .first();

    if (!user) {
      throw new Error("No user found with that email. They must register first.");
    }

    // Check if already in org
    const existing = await ctx.db
      .query("orgMembers")
      .withIndex("by_user", (q) => q.eq("userId", user._id.toString()))
      .filter(q => q.eq(q.field("orgId"), args.orgId))
      .first();

    if (existing) {
      throw new Error("User is already a member of this organization.");
    }

    await ctx.db.insert("orgMembers", {
      orgId: args.orgId,
      userId: user._id.toString(),
      role: args.role,
      joinedAt: Date.now(),
    });
  },
});
