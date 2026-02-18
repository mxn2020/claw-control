import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getByUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("voiceSettings")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
  },
});

export const upsert = mutation({
  args: {
    orgId: v.id("organizations"),
    userId: v.string(),
    wakeWord: v.optional(v.string()),
    ttsVoice: v.optional(v.string()),
    speakingRate: v.optional(v.number()),
    sttEngine: v.optional(v.string()),
    language: v.optional(v.string()),
    enabled: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("voiceSettings")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (existing) {
      const updates: Record<string, unknown> = {};
      if (args.wakeWord !== undefined) updates.wakeWord = args.wakeWord;
      if (args.ttsVoice !== undefined) updates.ttsVoice = args.ttsVoice;
      if (args.speakingRate !== undefined) updates.speakingRate = args.speakingRate;
      if (args.sttEngine !== undefined) updates.sttEngine = args.sttEngine;
      if (args.language !== undefined) updates.language = args.language;
      if (args.enabled !== undefined) updates.enabled = args.enabled;
      await ctx.db.patch(existing._id, updates);
      return existing._id;
    }

    return await ctx.db.insert("voiceSettings", {
      orgId: args.orgId,
      userId: args.userId,
      wakeWord: args.wakeWord,
      ttsVoice: args.ttsVoice,
      speakingRate: args.speakingRate,
      sttEngine: args.sttEngine,
      language: args.language,
      enabled: args.enabled ?? true,
      createdAt: Date.now(),
    });
  },
});
