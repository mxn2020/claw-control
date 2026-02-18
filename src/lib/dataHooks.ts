// Data hooks — thin wrappers around mock data.
// When Convex is connected, swap each mock return for useQuery(api.*.list, {}).

import {
  mockInstances,
  mockAgents,
  mockTasks,
  mockCanvases,
  mockCronJobs,
  mockApprovals,
  mockUsageRecords,
  mockDiscoverItems,
  mockBrowserSessions,
  mockNodes,
  mockMemoryFiles,
  mockVoiceSettings,
} from "./mockData";

export function useInstances() {
  // Ready for Convex: const data = useQuery(api.instances.list, {})
  return mockInstances;
}

export function useAgents(instanceId?: string) {
  // Ready for Convex: const data = useQuery(api.agents.list, { instanceId })
  const agents = mockAgents;
  if (instanceId) return agents.filter((a) => a.instanceId === instanceId);
  return agents;
}

export function useTasks(options?: { status?: string; userId?: string }) {
  // Ready for Convex: const data = useQuery(api.tasks.list, options ?? {})
  let data = [...mockTasks];
  if (options?.status) data = data.filter((t) => t.status === options.status);
  if (options?.userId) data = data.filter((t) => t.userId === options.userId);
  return data;
}

export function useCanvases(options?: { userId?: string; type?: string }) {
  // Ready for Convex: const data = useQuery(api.canvases.list, options ?? {})
  let data = [...mockCanvases];
  if (options?.type) data = data.filter((c) => c.type === options.type);
  if (options?.userId) data = data.filter((c) => c.userId === options.userId);
  return data;
}

export function useCronJobs(options?: { userId?: string; enabled?: boolean }) {
  // Ready for Convex: const data = useQuery(api.cronJobs.list, options ?? {})
  let data = [...mockCronJobs];
  if (options?.enabled !== undefined)
    data = data.filter((j) => j.enabled === options.enabled);
  if (options?.userId) data = data.filter((j) => j.userId === options.userId);
  return data;
}

export function useApprovals(options?: { status?: string; userId?: string }) {
  // Ready for Convex: const data = useQuery(api.approvals.list, options ?? {})
  let data = [...mockApprovals];
  if (options?.status)
    data = data.filter((a) => a.status === options.status);
  if (options?.userId)
    data = data.filter((a) => a.userId === options.userId);
  return data;
}

export function useUsageRecords(options?: {
  userId?: string;
  agentId?: string;
  date?: string;
}) {
  // Ready for Convex: const data = useQuery(api.usageRecords.list, options ?? {})
  let data = [...mockUsageRecords];
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
  // Ready for Convex: const data = useQuery(api.discoverItems.list, options ?? {})
  let data = [...mockDiscoverItems];
  if (options?.type) data = data.filter((i) => i.type === options.type);
  if (options?.category)
    data = data.filter((i) => i.category === options.category);
  return data;
}

export function useBrowserSessions(options?: {
  userId?: string;
  status?: string;
}) {
  // Ready for Convex: const data = useQuery(api.browserSessions.list, options ?? {})
  let data = [...mockBrowserSessions];
  if (options?.status)
    data = data.filter((s) => s.status === options.status);
  if (options?.userId)
    data = data.filter((s) => s.userId === options.userId);
  return data;
}

export function useNodes(options?: { userId?: string; status?: string }) {
  // Ready for Convex: const data = useQuery(api.nodes.list, options ?? {})
  let data = [...mockNodes];
  if (options?.status) data = data.filter((n) => n.status === options.status);
  if (options?.userId) data = data.filter((n) => n.userId === options.userId);
  return data;
}

export function useMemoryFiles(options?: {
  userId?: string;
  agentId?: string;
}) {
  // Ready for Convex: const data = useQuery(api.memoryFiles.list, options ?? {})
  let data = [...mockMemoryFiles];
  if (options?.userId) data = data.filter((f) => f.userId === options.userId);
  if (options?.agentId)
    data = data.filter((f) => f.agentId === options.agentId);
  return data;
}

export function useVoiceSettings(userId?: string) {
  // Ready for Convex: const data = useQuery(api.voiceSettings.get, { userId })
  if (userId && mockVoiceSettings.userId !== userId) return null;
  return mockVoiceSettings;
}
