// Data hooks — read from DataContext (populated by Convex).
// When ConvexDataProvider is in the tree, hooks return live Convex data.
// If data is currently loading from Convex, these will return undefined.

import { useDataContext } from "./dataContext";

export function useInstances() {
  const ctx = useDataContext();
  return ctx?.instances;
}

export function useAgents(instanceId?: string) {
  const ctx = useDataContext();
  const agents = ctx?.agents;
  if (!agents) return undefined;
  if (instanceId) return agents.filter((a) => a.instanceId === instanceId);
  return agents;
}

export function useTasks(options?: { status?: string; userId?: string }) {
  const ctx = useDataContext();
  const data = ctx?.tasks;
  if (!data) return undefined;
  if (options?.status) return data.filter((t) => t.status === options.status);
  if (options?.userId) return data.filter((t) => t.userId === options.userId);
  return data;
}

export function useCanvases(options?: { userId?: string; type?: string }) {
  const ctx = useDataContext();
  let data = ctx?.canvases;
  if (!data) return undefined;
  if (options?.type) data = data.filter((c) => c.type === options.type);
  if (options?.userId) data = data.filter((c) => c.userId === options.userId);
  return data;
}

export function useCronJobs(options?: { userId?: string; enabled?: boolean }) {
  const ctx = useDataContext();
  let data = ctx?.cronJobs;
  if (!data) return undefined;
  if (options?.enabled !== undefined)
    data = data.filter((j) => j.enabled === options.enabled);
  if (options?.userId) data = data.filter((j) => j.userId === options.userId);
  return data;
}

export function useApprovals(options?: { status?: string; userId?: string }) {
  const ctx = useDataContext();
  const data = ctx?.approvals;
  if (!data) return undefined;
  if (options?.status) return data.filter((a) => a.status === options.status);
  if (options?.userId) return data.filter((a) => a.userId === options.userId);
  return data;
}

export function useUsageRecords(options?: {
  userId?: string;
  agentId?: string;
  date?: string;
}) {
  const ctx = useDataContext();
  let data = ctx?.usageRecords;
  if (!data) return undefined;
  if (options?.userId) data = data.filter((r) => r.userId === options.userId);
  if (options?.agentId)
    data = data.filter((r) => r.agentId === options.agentId);
  if (options?.date) data = data.filter((r) => r.date === options.date);
  return data;
}

export function useDiscoverItems(options?: {
  type?: string;
  category?: string;
}) {
  const ctx = useDataContext();
  let data = ctx?.discoverItems;
  if (!data) return undefined;
  if (options?.type) data = data.filter((i) => i.type === options.type);
  if (options?.category)
    data = data.filter((i) => i.category === options.category);
  return data;
}

export function useBrowserSessions(options?: {
  userId?: string;
  status?: string;
}) {
  const ctx = useDataContext();
  let data = ctx?.browserSessions;
  if (!data) return undefined;
  if (options?.status)
    data = data.filter((s) => s.status === options.status);
  if (options?.userId)
    data = data.filter((s) => s.userId === options.userId);
  return data;
}

export function useSessions(options?: {
  agentId?: string;
  status?: string;
}) {
  const ctx = useDataContext();
  let data = ctx?.sessions;
  if (!data) return undefined;
  if (options?.status)
    data = data.filter((s) => s.status === options.status);
  if (options?.agentId)
    data = data.filter((s) => s.agentId === options.agentId);
  return data;
}

export function useNodes(options?: { userId?: string; status?: string }) {
  const ctx = useDataContext();
  let data = ctx?.nodes;
  if (!data) return undefined;
  if (options?.status) data = data.filter((n) => n.status === options.status);
  if (options?.userId) data = data.filter((n) => n.userId === options.userId);
  return data;
}

export function useMemoryFiles(options?: {
  userId?: string;
  agentId?: string;
}) {
  const ctx = useDataContext();
  let data = ctx?.memoryFiles;
  if (!data) return undefined;
  if (options?.userId) data = data.filter((f) => f.userId === options.userId);
  if (options?.agentId)
    data = data.filter((f) => f.agentId === options.agentId);
  return data;
}

export function useVoiceSettings(userId?: string) {
  const ctx = useDataContext();
  const settings = ctx?.voiceSettings;
  if (!settings) return undefined;
  if (userId && settings.userId !== userId) return null;
  return settings;
}
